-- CreateTable
CREATE TABLE "checkout_receiver" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "type" TEXT NOT NULL,
    "data" JSONB,
    "channel_id" TEXT NOT NULL,

    CONSTRAINT "checkout_receiver_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "checkout_receiver" ADD CONSTRAINT "checkout_receiver_channel_id_fkey" FOREIGN KEY ("channel_id") REFERENCES "channel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
