import { GetEmployeeAccessPayload } from "@/server/actions";
import { GetEmployeeById, GetShop } from "@/client/api";
import { Employee, Shop } from "@next-orders/api-sdk";
import {
  IconBuildingCommunity,
  IconThumbUp,
  IconUserScan,
} from "@tabler/icons-react";
import { getLocale } from "@/client/locale";
import { getDictionary, Locale } from "@/dictionaries";

const events = [
  {
    id: "1",
    text: 'After receiving his delivery, John Doe rates his experience. He gives the restaurant "Good Eats" a 4-star rating and the delivery partner "D4321" a 5-star rating. This rating event is logged on 02 April 2023 at 8:20 PM.',
    createdAt: new Date(),
  },
  {
    id: "2",
    text: 'John Doe makes payment for the order "O7892" using his credit card. The platform confirms the payment on 02 April 2023 at 8:15 PM.',
    createdAt: new Date(),
  },
  {
    id: "3",
    text: "Jennifer applies a promo code to her order, which she got from a friend who referred her to the platform. The promo code provides a 20% discount on her first order.",
    createdAt: new Date(),
  },
  {
    id: "4",
    text: "The platform manager sets daily goals for the team, such as making 200 orders and maintaining a 95% customer satisfaction rate.",
    createdAt: new Date(),
  },
  {
    id: "5",
    text: "When a 5-star review comes in praising the quality and taste of a meal, the cook who prepared it is informed and appreciated, highlighting their exceptional work for the day.",
    createdAt: new Date(),
  },
];

export default async function Page() {
  const locale = getLocale();

  const me = await GetEmployeeAccessPayload();

  const employee = await GetEmployeeById(me.user.id);
  if (!employee) {
    return null;
  }

  const shop = await GetShop();
  if (!shop) {
    return null;
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-2">
        <ShopCard shop={shop} />
        <EmployeeCard
          employee={employee}
          permissions={me.user.permissions}
          locale={locale}
        />
      </div>

      <EventsBlock />
    </div>
  );
}

const EventsBlock = () => {
  const showEvents = events.map((event) => (
    <Event key={event.id} event={event} />
  ));

  return (
    <div className="mt-6 max-w-md mx-auto">
      <h2 className="mb-2 text-center text-zinc-500">Latest Events</h2>

      {showEvents}
    </div>
  );
};

const Event = ({ event }: { event: any }) => {
  const date = <>{new Date(event.createdAt).toLocaleTimeString()}</>;

  return (
    <div className="mb-4 px-4 py-4 bg-zinc-50 rounded-2xl">
      <p>{event.text}</p>

      <div className="mt-3 flex flex-row gap-2 justify-between items-center">
        <div className="text-sm text-zinc-500">{date}</div>

        <div>
          <IconThumbUp stroke={1.5} className="w-6 h-6 text-zinc-500" />
        </div>
      </div>
    </div>
  );
};

const ShopCard = ({ shop }: { shop: Shop }) => {
  return (
    <div className="flex flex-row gap-4 items-center px-4 py-4 bg-zinc-50 rounded-2xl">
      <div>
        <IconBuildingCommunity
          stroke={1.5}
          className="mx-auto w-12 h-12 text-zinc-500"
        />
      </div>

      <div>
        <div className="text-xl font-medium">{shop.name}</div>
        <div className="text-sm">{shop.description}</div>
      </div>
    </div>
  );
};

const EmployeeCard = ({
  employee,
  permissions,
  locale,
}: {
  employee: Employee;
  permissions: string[];
  locale: Locale;
}) => {
  const { HI_LABEL } = getDictionary(locale);

  const Permission = ({ permission }: { permission: string }) => {
    return (
      <div className="inline-block px-2 py-1 mr-1 mb-0 text-xs text-zinc-500 bg-zinc-100 rounded-2xl">
        {permission}
      </div>
    );
  };

  const showPermissions = permissions.map((p, index) => (
    <Permission key={index} permission={p} />
  ));

  return (
    <div className="flex flex-row gap-4 items-center px-4 py-4 bg-zinc-50 rounded-2xl">
      <div>
        <IconUserScan
          stroke={1.5}
          className="mx-auto w-12 h-12 text-zinc-500"
        />
      </div>

      <div>
        <div className="text-xl font-medium">
          {HI_LABEL}, {employee.firstName}!
        </div>
        <div>{showPermissions}</div>
      </div>
    </div>
  );
};
