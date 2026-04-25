-- Parishes
CREATE TABLE public.parishes (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  serial_number INT,
  physical_address TEXT,
  church_info TEXT,
  elder_in_charge TEXT,
  parish_secretary TEXT,
  contact_details TEXT,
  parish_direction TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.parishes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Parishes are publicly readable" ON public.parishes FOR SELECT USING (true);

-- Events
CREATE TABLE public.events (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  event_date DATE,
  location TEXT,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Events are publicly readable" ON public.events FOR SELECT USING (true);

-- Prayer requests
CREATE TABLE public.prayer_requests (
  id BIGSERIAL PRIMARY KEY,
  name TEXT,
  request TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.prayer_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit a prayer request"
  ON public.prayer_requests FOR INSERT WITH CHECK (
    request IS NOT NULL AND length(request) BETWEEN 1 AND 2000
  );
-- Intentionally no SELECT policy — prayer requests are private to staff/service role.