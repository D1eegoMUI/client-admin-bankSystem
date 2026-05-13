import React, { useEffect, useState } from 'react';
import { Search } from 'lucide-react';

import { CardItem } from '../Card/components/CardItem';
import { CreditCardItem } from '../CreditCard/components/CreditCardItem';
import { CustomerProfile } from './CustomerProfile';
import { AccountDetail } from './AccountDetails';

import {
    useUserStore,
    useAccountStore,
    useLoanStore,
    useTransactionStore,
    usePurchaseStore,
} from '../../features/User/Store/adminStore';

import * as api from '../../shared/Api/admin';

export const AccountLookupView = () => {

    const [searchQuery, setSearchQuery] = useState("");
    const [result, setResult] = useState(null);
    const [allCards, setAllCards] = useState([]);

    const { users, getUsers } = useUserStore();
    const { accounts, getAccounts } = useAccountStore();
    const { loans, fetchAllLoans } = useLoanStore();
    const { transactions, fetchAllTransactions } = useTransactionStore();
    const { purchases, getPurchases } = usePurchaseStore();

    useEffect(() => {
        const loadData = async () => {
            await getUsers();
            await getAccounts();
            await fetchAllLoans();
            await getPurchases();
            await fetchAllTransactions();

            const [creditRes, debitRes] = await Promise.all([
                api.getCreditCards(),
                api.getCards(),
            ]);

            const creditCards = (creditRes.data?.data || []).map(c => ({ ...c, entityType: 'CREDIT' }));
            const debitCards = (debitRes.data?.data || []).map(c => ({ ...c, entityType: 'DEBIT' }));

            setAllCards([...creditCards, ...debitCards]);
        };
        loadData();
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();

        const query = searchQuery.toLowerCase().trim();

        const foundUser = users.find(user => {
            const fullName = `${user.UserName} ${user.UserSurname}`.toLowerCase();
            return (
                user.UserName?.toLowerCase().includes(query) ||
                user.UserSurname?.toLowerCase().includes(query) ||
                fullName.includes(query)
            );
        });

        if (!foundUser) {
            setResult("NOT_FOUND");
            return;
        }

        const userId = String(foundUser.uid);

        const userAccounts = accounts.filter(acc => {
            const accUserId = acc.user?.uid || acc.user?._id || acc.user;
            return String(accUserId) === userId;
        });

        const accountIds = userAccounts.map(acc => String(acc._id || acc.uid));

        const userLoans = loans.filter(loan => {
            const loanUserId =
                loan.borrower?.uid || loan.borrower?._id || loan.borrower ||
                loan.user?.uid || loan.user?._id || loan.user;
            return String(loanUserId) === userId;
        });

        const userCards = allCards.filter(card => {
            const cardUserId = card.user?.uid || card.user?._id || card.user;
            const accountId = card.account?._id || card.account?.uid || card.account;
            return (
                String(cardUserId) === userId ||
                accountIds.includes(String(accountId))
            );
        });

        const cardIds = userCards.map(c => String(c._id || c.uid));

        const userTransactions = transactions.filter(tx => {
            const originId = String(tx.originAccount?._id || tx.originAccount || '');
            const destId = String(tx.destinationAccount?._id || tx.destinationAccount || '');
            return accountIds.includes(originId) || accountIds.includes(destId);
        });

        const userPurchases = purchases.filter(p => {
            const purchaseCardId = String(p.cardId || '');
            return cardIds.includes(purchaseCardId);
        });
        
        setResult({
            user: foundUser,
            accounts: userAccounts,
            loans: userLoans,
            cards: userCards,
            transactions: userTransactions,
            purchases: userPurchases,
        });
    };

    const creditCards = result?.cards?.filter(c => c.entityType === 'CREDIT') ?? [];
    const debitCards = result?.cards?.filter(c => c.entityType === 'DEBIT') ?? [];

    return (
        <div className="space-y-8 pb-10">

            <header className="bg-white p-8 rounded-[2rem] shadow-sm border border-emerald-100 flex flex-col md:flex-row justify-between items-center gap-6">
                <div>
                    <h1 className="text-3xl font-black text-emerald-950">Consulta Integral</h1>
                    <p className="text-emerald-600">Busca clientes por nombre</p>
                </div>

                <form onSubmit={handleSearch} className="flex bg-gray-100 p-2 rounded-2xl">
                    <input
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="px-4 py-2 w-80 bg-transparent outline-none font-bold"
                        placeholder="Buscar usuario..."
                    />
                    <button className="bg-emerald-600 text-white p-3 rounded-xl">
                        <Search size={20} />
                    </button>
                </form>
            </header>

            {result === "NOT_FOUND" && (
                <div className="bg-red-50 p-6 text-red-700 font-bold rounded-2xl text-center">
                    Usuario no encontrado
                </div>
            )}

            {result && result !== "NOT_FOUND" && (
                <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">

                    <aside>
                        <CustomerProfile user={result.user} />
                    </aside>

                    <main className="xl:col-span-3 space-y-8">

                        <AccountDetail
                            accounts={result.accounts}
                            loans={result.loans}
                            cards={result.cards}
                            transactions={result.transactions}
                            purchases={result.purchases}
                        />

                        {/* Tarjetas de Débito */}
                        <section>
                            <h3 className="text-xl font-black mb-4">Tarjetas de Débito</h3>
                            {debitCards.length === 0 ? (
                                <p className="text-gray-400">No posee tarjetas de débito</p>
                            ) : (
                                <div className="grid md:grid-cols-2 gap-6">
                                    {debitCards.map(card => (
                                        <CardItem key={card._id} card={card} />
                                    ))}
                                </div>
                            )}
                        </section>

                        {/* Tarjetas de Crédito */}
                        <section>
                            <h3 className="text-xl font-black mb-4">Tarjetas de Crédito</h3>
                            {creditCards.length === 0 ? (
                                <p className="text-gray-400">No posee tarjetas de crédito</p>
                            ) : (
                                <div className="grid md:grid-cols-2 gap-6">
                                    {creditCards.map(card => (
                                        <CreditCardItem key={card._id} card={card} />
                                    ))}
                                </div>
                            )}
                        </section>

                    </main>
                </div>
            )}
        </div>
    );
};