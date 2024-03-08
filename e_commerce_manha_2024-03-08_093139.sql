--
-- PostgreSQL database dump
--

-- Dumped from database version 16.1
-- Dumped by pg_dump version 16.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: category; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.category (
    id integer NOT NULL,
    image character varying NOT NULL,
    name character varying NOT NULL
);


ALTER TABLE public.category OWNER TO postgres;

--
-- Name: category_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.category_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.category_id_seq OWNER TO postgres;

--
-- Name: category_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.category_id_seq OWNED BY public.category.id;


--
-- Name: items; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.items (
    id integer NOT NULL,
    id_user integer NOT NULL,
    id_product integer NOT NULL,
    id_sale integer NOT NULL,
    quantity integer NOT NULL,
    price real NOT NULL
);


ALTER TABLE public.items OWNER TO postgres;

--
-- Name: items_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.items_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.items_id_seq OWNER TO postgres;

--
-- Name: items_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.items_id_seq OWNED BY public.items.id;


--
-- Name: products; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.products (
    id integer NOT NULL,
    name character varying NOT NULL,
    description character varying NOT NULL,
    price real NOT NULL,
    quantity integer NOT NULL,
    image character varying NOT NULL,
    id_category integer NOT NULL
);


ALTER TABLE public.products OWNER TO postgres;

--
-- Name: products_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.products_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.products_id_seq OWNER TO postgres;

--
-- Name: products_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.products_id_seq OWNED BY public.products.id;


--
-- Name: sales; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sales (
    id integer NOT NULL,
    date timestamp without time zone NOT NULL
);


ALTER TABLE public.sales OWNER TO postgres;

--
-- Name: sales_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.sales_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.sales_id_seq OWNER TO postgres;

--
-- Name: sales_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.sales_id_seq OWNED BY public.sales.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying NOT NULL,
    avatar character varying,
    email character varying NOT NULL,
    password character varying NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: category id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.category ALTER COLUMN id SET DEFAULT nextval('public.category_id_seq'::regclass);


--
-- Name: items id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.items ALTER COLUMN id SET DEFAULT nextval('public.items_id_seq'::regclass);


--
-- Name: products id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products ALTER COLUMN id SET DEFAULT nextval('public.products_id_seq'::regclass);


--
-- Name: sales id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sales ALTER COLUMN id SET DEFAULT nextval('public.sales_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: category; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.category (id, image, name) FROM stdin;
1	https://images.tcdn.com.br/img/img_prod/752803/tenis_masculino_adidas_galaxy_6m_gw3848_running_academia_12203848_1_24aed5586879b080425573d97c464b99_20231213214557.jpg	Tênis
2	https://cdn.awsli.com.br/800x800/865/865489/produto/63424658/e693c8f429.jpg	Acessórios
3	https://loja.comerciomix.com.br/media/catalog/product/cache/fb4f878514d02efd710032ded901d118/c/a/camiseta-azul-royal-para-sublima_o-tradicional_1.jpg	Camiseta
\.


--
-- Data for Name: items; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.items (id, id_user, id_product, id_sale, quantity, price) FROM stdin;
1	4	2	1	10	249.99
2	4	1	1	5	200
3	4	1	2	1	200
4	4	1	3	1	200
36	4	1	29	1	200
37	4	2	29	1	249.99
38	7	1	30	1	200
\.


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.products (id, name, description, price, quantity, image, id_category) FROM stdin;
3	Nique Air Max	Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum, vero. At nesciunt vel, quo deserunt, officiis ipsa possimus amet velit quam ipsum porro. Quia maiores dolorem voluptate quidem eos? Cumque!	319.99	100	https://imgnike-a.akamaihd.net/1300x1300/022104ID.jpg	1
8	Camiseta Nique Blue	Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum, vero. At nesciunt vel, quo deserunt, officiis ipsa possimus amet velit quam ipsum porro. Quia maiores dolorem voluptate quidem eos? Cumque!	169.99	100	https://images.tcdn.com.br/img/img_prod/1127564/camiseta_nike_dry_fit_miler_azul_112_1_be5eee26b7a20ea2c9f0676422e1e9c6.jpg	3
9	Camiseta Nique Red	Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum, vero. At nesciunt vel, quo deserunt, officiis ipsa possimus amet velit quam ipsum porro. Quia maiores dolorem voluptate quidem eos? Cumque!	245.99	100	https://images.tcdn.com.br/img/img_prod/1034143/camiseta_nike_masculina_sportswear_ar4993_2181_2_e493bc1bb066486bcbd03a28b9dafe3d.jpg	3
2	Smart Watt	Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum, vero. At nesciunt vel, quo deserunt, officiis ipsa possimus amet velit quam ipsum porro. Quia maiores dolorem voluptate quidem eos? Cumque!	249.99	94	https://images-americanas.b2w.io/produtos/6672441651/imagens/smart-watch-branco-c-nota-fiscal-varias-funcoes/6672441651_1_large.jpg	2
1	Nique Air Surf	Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum, vero. At nesciunt vel, quo deserunt, officiis ipsa possimus amet velit quam ipsum porro. Quia maiores dolorem voluptate quidem eos? Cumque!	199.99	97	https://t-static.dafiti.com.br/8hN4QoH1WUISIiUSah-UBlJgiVQ=/fit-in/430x623/static.dafiti.com.br/p/nike-tênis-nike-air-versitile-branco%2fazul-5350-1674282-1-zoom.jpg	1
5	Me Band 6	Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum, vero. At nesciunt vel, quo deserunt, officiis ipsa possimus amet velit quam ipsum porro. Quia maiores dolorem voluptate quidem eos? Cumque!	225.99	100	https://m.media-amazon.com/images/I/619syjM2gxL._AC_UF1000,1000_QL80_.jpg	2
6	Camiseta Nique	Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum, vero. At nesciunt vel, quo deserunt, officiis ipsa possimus amet velit quam ipsum porro. Quia maiores dolorem voluptate quidem eos? Cumque!	149.99	100	https://static.netshoes.com.br/produtos/camisa-nike-park-dri-fit-masculina/12/HZM-6253-012/HZM-6253-012_zoom1.jpg?ts=1695700114&ims=544x	3
7	Camiseta Nique SB	Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum, vero. At nesciunt vel, quo deserunt, officiis ipsa possimus amet velit quam ipsum porro. Quia maiores dolorem voluptate quidem eos? Cumque!	125.99	100	https://static.ativaesportes.com.br/public/ativaesportes/imagens/produtos/camiseta-nike-sb-logo-masculina-dc7817-010-64765331acb73.jpg	3
\.


--
-- Data for Name: sales; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.sales (id, date) FROM stdin;
1	2024-03-04 09:27:17.3091
2	2024-03-04 09:52:45.418891
3	2024-03-05 10:50:02.174193
29	2024-03-06 08:35:17.410447
30	2024-03-06 09:59:07.888664
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, name, avatar, email, password) FROM stdin;
5	qqqq	https://i.pinimg.com/736x/0d/64/98/0d64989794b1a4c9d89bff571d3d5842.jpg	w@a.com	12345
6	Teste	https://i.pinimg.com/736x/0d/64/98/0d64989794b1a4c9d89bff571d3d5842.jpg	a@a.com	12345
7	Teste	https://i.pinimg.com/736x/0d/64/98/0d64989794b1a4c9d89bff571d3d5842.jpg	t@email.com	12345
4	Thiago de Sousa Paiva	https://i.pinimg.com/736x/0d/64/98/0d64989794b1a4c9d89bff571d3d5842.jpg	t@gmail.com	12345
\.


--
-- Name: category_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.category_id_seq', 2, true);


--
-- Name: items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.items_id_seq', 38, true);


--
-- Name: products_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.products_id_seq', 5, true);


--
-- Name: sales_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.sales_id_seq', 30, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 7, true);


--
-- Name: category category_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.category
    ADD CONSTRAINT category_name_key UNIQUE (name);


--
-- Name: category category_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.category
    ADD CONSTRAINT category_pkey PRIMARY KEY (id);


--
-- Name: items items_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.items
    ADD CONSTRAINT items_pkey PRIMARY KEY (id);


--
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);


--
-- Name: sales sales_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sales
    ADD CONSTRAINT sales_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: items items_id_product_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.items
    ADD CONSTRAINT items_id_product_fkey FOREIGN KEY (id_product) REFERENCES public.products(id);


--
-- Name: items items_id_sale_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.items
    ADD CONSTRAINT items_id_sale_fkey FOREIGN KEY (id_sale) REFERENCES public.sales(id);


--
-- Name: items items_id_user_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.items
    ADD CONSTRAINT items_id_user_fkey FOREIGN KEY (id_user) REFERENCES public.users(id);


--
-- Name: products products_id_category_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_id_category_fkey FOREIGN KEY (id_category) REFERENCES public.category(id);


--
-- PostgreSQL database dump complete
--

