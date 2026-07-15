-- SQL script to create the tables in Supabase for the complete clinic registry and billing system.
-- Copy and run this script in your Supabase SQL Editor:

-- 1. Create Patient Consent Records Table (Intake Form)
create table public.patient_consent_records (
    id int8 generated always as identity primary key,
    created_at timestamptz default now() not null,
    patient_name text not null,
    age text not null,
    gender text not null,
    occupation text,
    email text,
    mobile_number text not null,
    emergency_contact_name text not null,
    emergency_contact_number text,
    emergency_relationship text not null,
    primary_complaint text not null,
    pain_scale int2 not null,
    medical_history text,
    allergies text not null,
    pregnant text,
    health_history jsonb not null,
    physio_consent text not null,
    refusal_consent text not null,
    contact_consent text not null,
    media_consent text not null,
    privacy_consent text not null,
    tele_consent text not null,
    needling_consent text,
    declaration_agree text not null,
    signature_image text not null -- Stores patient signature as Base64 Data URL string
);

alter table public.patient_consent_records enable row level security;
create policy "Enable insert access for all" on public.patient_consent_records for insert with check (true);
create policy "Enable read access for all select queries" on public.patient_consent_records for select using (true);
create policy "Enable delete access for all" on public.patient_consent_records for delete using (true);


-- 2. Create Billing Patients (Master Table)
create table public.billing_patients (
    id int8 generated always as identity primary key,
    created_at timestamptz default now() not null,
    patient_name text not null unique,
    phone_number text,
    start_date text not null, -- YYYY-MM-DD format
    planned_sessions int4 default 10 not null
);

alter table public.billing_patients enable row level security;
create policy "Enable all access for billing_patients" on public.billing_patients for all using (true) with check (true);


-- 3. Create Patient Sessions (Child Table)
create table public.patient_sessions (
    id int8 generated always as identity primary key,
    created_at timestamptz default now() not null,
    patient_name text not null,
    therapy_type text not null,
    sessions_count int4 default 1 not null,
    fee_amount int4 not null,
    status text not null, -- 'Paid' or 'Pending'
    session_date text not null -- YYYY-MM-DD format
);

alter table public.patient_sessions enable row level security;
create policy "Enable all access for patient_sessions" on public.patient_sessions for all using (true) with check (true);


-- 4. Create Custom Therapy Types Table
create table public.custom_therapy_types (
    id int8 generated always as identity primary key,
    created_at timestamptz default now() not null,
    type_name text not null unique
);

alter table public.custom_therapy_types enable row level security;
create policy "Enable all access for custom_therapy_types" on public.custom_therapy_types for all using (true) with check (true);

-- Insert default therapy type options
insert into public.custom_therapy_types (type_name) values 
('Physiyoga')
on conflict (type_name) do nothing;
