import Image from "next/image";

export default function Page() {
  return (
    <div className="mt-16 text-center">
      <h1 className="mb-2 text-3xl font-medium">Checkout will be here soon</h1>
      <p className="mx-auto text-base max-w-lg">
        Delivery conditions, preparation time, address, ordered goods,
        additional sale, payment options, total
      </p>

      <Image
        src="/static/eggs.png"
        alt=""
        width={96}
        height={96}
        className="mx-auto mt-8 mb-2"
      />
    </div>
  );
}
