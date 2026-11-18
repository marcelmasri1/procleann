DROP POLICY IF EXISTS "Anyone can place an order" ON public.orders;
REVOKE INSERT ON public.orders FROM anon, authenticated;
GRANT ALL ON public.orders TO service_role;