import { ClientCard } from '../../../components/ClientCard';
import { ErrorBlock } from '../../../components/ErrorBlock';
import { GetClients } from '../../../client/access';

export default async function ClientsBlock() {
  const clients = await GetClients();

  if (clients instanceof Error) {
    return <ErrorBlock error={clients} />;
  }

  if (!clients) {
    return <div>You have no Clients</div>;
  }

  return (
    <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8 gap-2">
      {clients?.map((client) => <ClientCard key={client.id} client={client} />)}
    </div>
  );
}
