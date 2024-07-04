CREATE TABLE IF NOT EXISTS "Authendication" (
	"auth_id" serial PRIMARY KEY NOT NULL,
	"user_id" integer,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "booking" (
	"booking _id" serial PRIMARY KEY NOT NULL,
	"user_id" integer,
	"vehicle_id" integer,
	"location_id" integer,
	"booking_date" text,
	"return_date" text,
	"total_amount" text,
	"booking_status" text DEFAULT 'pending',
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "customerSupport" (
	"ticket_id" serial PRIMARY KEY NOT NULL,
	"user_id" integer,
	"subject" text,
	"description" text,
	"status" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "location" (
	"location_id" serial PRIMARY KEY NOT NULL,
	"name" text,
	"address" text,
	"contact_phone" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "management" (
	"fleet_id" serial PRIMARY KEY NOT NULL,
	"vehicle_id" integer,
	"date" text,
	"depreciation_rate" text,
	"current_value" text,
	"maintainance_cost" text,
	"status" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "payment" (
	"payment_id" serial PRIMARY KEY NOT NULL,
	"amount" text,
	"payment_status" text DEFAULT 'pending',
	"payment_date" text,
	"method" text,
	"transaction_id" integer,
	"created_at" timestamp DEFAULT now(),
	"udated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "specifications" (
	"vehicle_id" serial PRIMARY KEY NOT NULL,
	"manufacturer" text,
	"model" text,
	"year" integer,
	"fuel_type" text,
	"engine_capacity" text,
	"transmission" text,
	"color" text,
	"seating _capacity" integer,
	"features" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"full_name" text,
	"email" text,
	"contact_phone" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "vehicle" (
	"id" serial PRIMARY KEY NOT NULL,
	"vehicleSpec_id" integer,
	"avalilability" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Authendication" ADD CONSTRAINT "Authendication_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "booking" ADD CONSTRAINT "booking_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "booking" ADD CONSTRAINT "booking_vehicle_id_specifications_vehicle_id_fk" FOREIGN KEY ("vehicle_id") REFERENCES "public"."specifications"("vehicle_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "booking" ADD CONSTRAINT "booking_location_id_location_location_id_fk" FOREIGN KEY ("location_id") REFERENCES "public"."location"("location_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "customerSupport" ADD CONSTRAINT "customerSupport_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "management" ADD CONSTRAINT "management_vehicle_id_specifications_vehicle_id_fk" FOREIGN KEY ("vehicle_id") REFERENCES "public"."specifications"("vehicle_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "vehicle" ADD CONSTRAINT "vehicle_vehicleSpec_id_specifications_vehicle_id_fk" FOREIGN KEY ("vehicleSpec_id") REFERENCES "public"."specifications"("vehicle_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
