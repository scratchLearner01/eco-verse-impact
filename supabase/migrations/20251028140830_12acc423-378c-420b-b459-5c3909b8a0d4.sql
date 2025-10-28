-- Create enum types
CREATE TYPE user_type AS ENUM ('individual', 'industry');
CREATE TYPE action_type AS ENUM ('smart_bin', 'tree_plant', 'public_transport', 'donation', 'industry_report', 'solar_install', 'ev_purchase');
CREATE TYPE verification_status AS ENUM ('pending', 'auto_verified', 'manual_verified', 'rejected');
CREATE TYPE industry_sector AS ENUM ('manufacturing', 'energy', 'construction', 'agriculture', 'services', 'technology', 'other');

-- Users/Profiles table
CREATE TABLE public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  phone TEXT,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  user_type user_type DEFAULT 'individual',
  eco_points INTEGER DEFAULT 0,
  trust_score INTEGER DEFAULT 100,
  vehicle_type TEXT,
  has_solar BOOLEAN DEFAULT false,
  monthly_electricity INTEGER,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Industries table
CREATE TABLE public.industries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  company_name TEXT NOT NULL,
  gst_cin TEXT UNIQUE,
  sector industry_sector NOT NULL,
  location TEXT NOT NULL,
  eco_score INTEGER DEFAULT 0,
  monthly_co2_tons DECIMAL(10,2),
  energy_kwh DECIMAL(10,2),
  renewable_percent INTEGER DEFAULT 0,
  waste_recycled_percent INTEGER DEFAULT 0,
  water_reuse_percent INTEGER DEFAULT 0,
  logo_url TEXT,
  verified BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Actions table (user submissions)
CREATE TABLE public.actions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  action_type action_type NOT NULL,
  status verification_status DEFAULT 'pending',
  proof_url TEXT,
  metadata JSONB,
  points_awarded INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Verifications table
CREATE TABLE public.verifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  action_id UUID REFERENCES public.actions(id) ON DELETE CASCADE,
  verifier_id UUID REFERENCES public.users(id),
  status verification_status NOT NULL,
  confidence_score DECIMAL(3,2),
  notes TEXT,
  verified_at TIMESTAMPTZ DEFAULT NOW()
);

-- States table (seeded data)
CREATE TABLE public.states (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  avg_eco_points INTEGER DEFAULT 0,
  aqi INTEGER,
  water_purity_index INTEGER,
  trees_per_sqkm INTEGER,
  population BIGINT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Districts table
CREATE TABLE public.districts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  state_id UUID NOT NULL REFERENCES public.states(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  avg_eco_points INTEGER DEFAULT 0,
  aqi INTEGER,
  population INTEGER
);

-- Marketplace items
CREATE TABLE public.marketplace_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  seller_id UUID NOT NULL REFERENCES public.users(id),
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  price_per_kg DECIMAL(10,2) NOT NULL,
  stock_kg DECIMAL(10,2) NOT NULL,
  location TEXT NOT NULL,
  verified_seller BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Transactions
CREATE TABLE public.transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  buyer_id UUID NOT NULL REFERENCES public.users(id),
  seller_id UUID NOT NULL REFERENCES public.users(id),
  item_id UUID NOT NULL REFERENCES public.marketplace_items(id),
  quantity_kg DECIMAL(10,2) NOT NULL,
  total_amount DECIMAL(10,2) NOT NULL,
  buyer_points_awarded INTEGER DEFAULT 0,
  seller_points_awarded INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Badges
CREATE TABLE public.badges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  icon_url TEXT,
  criteria TEXT,
  points_required INTEGER
);

-- User badges
CREATE TABLE public.user_badges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  badge_id UUID NOT NULL REFERENCES public.badges(id) ON DELETE CASCADE,
  earned_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, badge_id)
);

-- IoT Devices
CREATE TABLE public.devices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  industry_id UUID NOT NULL REFERENCES public.industries(id) ON DELETE CASCADE,
  device_type TEXT NOT NULL,
  device_id TEXT NOT NULL UNIQUE,
  last_reading JSONB,
  registered_at TIMESTAMPTZ DEFAULT NOW()
);

-- National stats (for ticker)
CREATE TABLE public.national_stats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  recycled_plastics_kg BIGINT DEFAULT 0,
  trees_planted BIGINT DEFAULT 0,
  co2_saved_kg BIGINT DEFAULT 0,
  week_start DATE NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.industries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.actions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.verifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.states ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.districts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.marketplace_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.devices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.national_stats ENABLE ROW LEVEL SECURITY;

-- RLS Policies for users
CREATE POLICY "Users can view all profiles" ON public.users FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON public.users FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON public.users FOR INSERT WITH CHECK (auth.uid() = id);

-- RLS Policies for industries
CREATE POLICY "Industries are viewable by everyone" ON public.industries FOR SELECT USING (true);
CREATE POLICY "Users can update own industry" ON public.industries FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own industry" ON public.industries FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for actions
CREATE POLICY "Users can view own actions" ON public.actions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own actions" ON public.actions FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own actions" ON public.actions FOR UPDATE USING (auth.uid() = user_id);

-- Public read for other tables
CREATE POLICY "States are viewable by everyone" ON public.states FOR SELECT USING (true);
CREATE POLICY "Districts are viewable by everyone" ON public.districts FOR SELECT USING (true);
CREATE POLICY "Marketplace items viewable by everyone" ON public.marketplace_items FOR SELECT USING (true);
CREATE POLICY "Users can create marketplace items" ON public.marketplace_items FOR INSERT WITH CHECK (auth.uid() = seller_id);
CREATE POLICY "Badges viewable by everyone" ON public.badges FOR SELECT USING (true);
CREATE POLICY "User badges viewable by everyone" ON public.user_badges FOR SELECT USING (true);
CREATE POLICY "National stats viewable by everyone" ON public.national_stats FOR SELECT USING (true);
CREATE POLICY "Transactions viewable by participants" ON public.transactions FOR SELECT USING (auth.uid() = buyer_id OR auth.uid() = seller_id);

-- Seed states with real India data
INSERT INTO public.states (name, avg_eco_points, aqi, water_purity_index, trees_per_sqkm, population) VALUES
('Karnataka', 45000, 78, 72, 145, 61095297),
('Maharashtra', 52000, 95, 68, 132, 112374333),
('Tamil Nadu', 48000, 82, 74, 156, 72147030),
('Delhi', 38000, 164, 58, 89, 16787941),
('Gujarat', 43000, 88, 65, 98, 60439692),
('Rajasthan', 35000, 102, 61, 76, 68548437),
('Uttar Pradesh', 32000, 112, 54, 112, 199812341),
('West Bengal', 41000, 93, 66, 178, 91276115),
('Kerala', 55000, 45, 84, 234, 33406061),
('Punjab', 39000, 108, 63, 87, 27743338);

-- Seed badges
INSERT INTO public.badges (name, description, icon_url, points_required) VALUES
('Eco Warrior', 'Earned 10,000 eco points', NULL, 10000),
('Tree Hugger', 'Planted 50 trees', NULL, 5000),
('Clean City Champion', 'Used smart bins 100 times', NULL, 8000),
('Green Commuter', 'Used public transport 200 times', NULL, 15000),
('Solar Pioneer', 'Installed solar panels', NULL, 20000);

-- Seed national stats
INSERT INTO public.national_stats (recycled_plastics_kg, trees_planted, co2_saved_kg, week_start) VALUES
(1248567, 45231, 892345, CURRENT_DATE - INTERVAL '7 days');

-- Function to update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for users
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Trigger for states
CREATE TRIGGER update_states_updated_at BEFORE UPDATE ON public.states
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();