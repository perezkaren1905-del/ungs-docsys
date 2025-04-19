--
-- PostgreSQL database dump
--

-- Dumped from database version 17.4 (Debian 17.4-1.pgdg120+2)
-- Dumped by pg_dump version 17.0

-- Started on 2025-04-19 11:19:38

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE docsys;
--
-- TOC entry 3481 (class 1262 OID 16404)
-- Name: docsys; Type: DATABASE; Schema: -; Owner: admin
--

CREATE DATABASE docsys WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';


ALTER DATABASE docsys OWNER TO admin;

\connect docsys

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 6 (class 2615 OID 16405)
-- Name: recruitment; Type: SCHEMA; Schema: -; Owner: admin
--

CREATE SCHEMA recruitment;


ALTER SCHEMA recruitment OWNER TO admin;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 221 (class 1259 OID 16417)
-- Name: app_user; Type: TABLE; Schema: recruitment; Owner: admin
--

CREATE TABLE recruitment.app_user (
    id bigint NOT NULL,
    email character varying(100) NOT NULL,
    password_hash character varying(255) NOT NULL,
    active boolean DEFAULT true NOT NULL,
    created_date timestamp without time zone,
    updated_date timestamp without time zone
);


ALTER TABLE recruitment.app_user OWNER TO admin;

--
-- TOC entry 220 (class 1259 OID 16416)
-- Name: app_user_id_seq; Type: SEQUENCE; Schema: recruitment; Owner: admin
--

CREATE SEQUENCE recruitment.app_user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE recruitment.app_user_id_seq OWNER TO admin;

--
-- TOC entry 3482 (class 0 OID 0)
-- Dependencies: 220
-- Name: app_user_id_seq; Type: SEQUENCE OWNED BY; Schema: recruitment; Owner: admin
--

ALTER SEQUENCE recruitment.app_user_id_seq OWNED BY recruitment.app_user.id;


--
-- TOC entry 227 (class 1259 OID 16452)
-- Name: identification_type; Type: TABLE; Schema: recruitment; Owner: admin
--

CREATE TABLE recruitment.identification_type (
    id bigint NOT NULL,
    code character varying(25) NOT NULL,
    description character varying(100) NOT NULL
);


ALTER TABLE recruitment.identification_type OWNER TO admin;

--
-- TOC entry 226 (class 1259 OID 16451)
-- Name: identification_type_id_seq; Type: SEQUENCE; Schema: recruitment; Owner: admin
--

CREATE SEQUENCE recruitment.identification_type_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE recruitment.identification_type_id_seq OWNER TO admin;

--
-- TOC entry 3483 (class 0 OID 0)
-- Dependencies: 226
-- Name: identification_type_id_seq; Type: SEQUENCE OWNED BY; Schema: recruitment; Owner: admin
--

ALTER SEQUENCE recruitment.identification_type_id_seq OWNED BY recruitment.identification_type.id;


--
-- TOC entry 225 (class 1259 OID 16440)
-- Name: loging_history; Type: TABLE; Schema: recruitment; Owner: admin
--

CREATE TABLE recruitment.loging_history (
    id bigint NOT NULL,
    user_id bigint NOT NULL,
    login_time timestamp without time zone NOT NULL
);


ALTER TABLE recruitment.loging_history OWNER TO admin;

--
-- TOC entry 224 (class 1259 OID 16439)
-- Name: loging_history_id_seq; Type: SEQUENCE; Schema: recruitment; Owner: admin
--

CREATE SEQUENCE recruitment.loging_history_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE recruitment.loging_history_id_seq OWNER TO admin;

--
-- TOC entry 3484 (class 0 OID 0)
-- Dependencies: 224
-- Name: loging_history_id_seq; Type: SEQUENCE OWNED BY; Schema: recruitment; Owner: admin
--

ALTER SEQUENCE recruitment.loging_history_id_seq OWNED BY recruitment.loging_history.id;


--
-- TOC entry 229 (class 1259 OID 16461)
-- Name: nationality; Type: TABLE; Schema: recruitment; Owner: admin
--

CREATE TABLE recruitment.nationality (
    id bigint NOT NULL,
    code character varying(3) NOT NULL,
    description character varying(150) NOT NULL,
    iso_2 character varying(2) NOT NULL,
    iso_3 character varying(3) NOT NULL
);


ALTER TABLE recruitment.nationality OWNER TO admin;

--
-- TOC entry 228 (class 1259 OID 16460)
-- Name: nationality_id_seq; Type: SEQUENCE; Schema: recruitment; Owner: admin
--

CREATE SEQUENCE recruitment.nationality_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE recruitment.nationality_id_seq OWNER TO admin;

--
-- TOC entry 3485 (class 0 OID 0)
-- Dependencies: 228
-- Name: nationality_id_seq; Type: SEQUENCE OWNED BY; Schema: recruitment; Owner: admin
--

ALTER SEQUENCE recruitment.nationality_id_seq OWNED BY recruitment.nationality.id;


--
-- TOC entry 223 (class 1259 OID 16427)
-- Name: password_reset; Type: TABLE; Schema: recruitment; Owner: admin
--

CREATE TABLE recruitment.password_reset (
    id bigint NOT NULL,
    user_id bigint NOT NULL,
    expiration_date timestamp without time zone NOT NULL,
    used boolean DEFAULT false NOT NULL,
    created_date timestamp without time zone,
    updated_date timestamp without time zone
);


ALTER TABLE recruitment.password_reset OWNER TO admin;

--
-- TOC entry 222 (class 1259 OID 16426)
-- Name: password_reset_id_seq; Type: SEQUENCE; Schema: recruitment; Owner: admin
--

CREATE SEQUENCE recruitment.password_reset_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE recruitment.password_reset_id_seq OWNER TO admin;

--
-- TOC entry 3486 (class 0 OID 0)
-- Dependencies: 222
-- Name: password_reset_id_seq; Type: SEQUENCE OWNED BY; Schema: recruitment; Owner: admin
--

ALTER SEQUENCE recruitment.password_reset_id_seq OWNED BY recruitment.password_reset.id;


--
-- TOC entry 237 (class 1259 OID 16525)
-- Name: permission; Type: TABLE; Schema: recruitment; Owner: admin
--

CREATE TABLE recruitment.permission (
    id bigint NOT NULL,
    name character varying(100) NOT NULL,
    description character varying(255) NOT NULL
);


ALTER TABLE recruitment.permission OWNER TO admin;

--
-- TOC entry 236 (class 1259 OID 16524)
-- Name: permission_id_seq; Type: SEQUENCE; Schema: recruitment; Owner: admin
--

CREATE SEQUENCE recruitment.permission_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE recruitment.permission_id_seq OWNER TO admin;

--
-- TOC entry 3487 (class 0 OID 0)
-- Dependencies: 236
-- Name: permission_id_seq; Type: SEQUENCE OWNED BY; Schema: recruitment; Owner: admin
--

ALTER SEQUENCE recruitment.permission_id_seq OWNED BY recruitment.permission.id;


--
-- TOC entry 233 (class 1259 OID 16492)
-- Name: role; Type: TABLE; Schema: recruitment; Owner: admin
--

CREATE TABLE recruitment.role (
    id bigint NOT NULL,
    name character varying(100) NOT NULL,
    description character varying(255) NOT NULL
);


ALTER TABLE recruitment.role OWNER TO admin;

--
-- TOC entry 232 (class 1259 OID 16491)
-- Name: role_id_seq; Type: SEQUENCE; Schema: recruitment; Owner: admin
--

CREATE SEQUENCE recruitment.role_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE recruitment.role_id_seq OWNER TO admin;

--
-- TOC entry 3488 (class 0 OID 0)
-- Dependencies: 232
-- Name: role_id_seq; Type: SEQUENCE OWNED BY; Schema: recruitment; Owner: admin
--

ALTER SEQUENCE recruitment.role_id_seq OWNED BY recruitment.role.id;


--
-- TOC entry 239 (class 1259 OID 16534)
-- Name: role_permission; Type: TABLE; Schema: recruitment; Owner: admin
--

CREATE TABLE recruitment.role_permission (
    id bigint NOT NULL,
    role_id bigint NOT NULL,
    permission_id bigint NOT NULL
);


ALTER TABLE recruitment.role_permission OWNER TO admin;

--
-- TOC entry 238 (class 1259 OID 16533)
-- Name: role_permission_id_seq; Type: SEQUENCE; Schema: recruitment; Owner: admin
--

CREATE SEQUENCE recruitment.role_permission_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE recruitment.role_permission_id_seq OWNER TO admin;

--
-- TOC entry 3489 (class 0 OID 0)
-- Dependencies: 238
-- Name: role_permission_id_seq; Type: SEQUENCE OWNED BY; Schema: recruitment; Owner: admin
--

ALTER SEQUENCE recruitment.role_permission_id_seq OWNED BY recruitment.role_permission.id;


--
-- TOC entry 231 (class 1259 OID 16470)
-- Name: user_info; Type: TABLE; Schema: recruitment; Owner: admin
--

CREATE TABLE recruitment.user_info (
    id bigint NOT NULL,
    user_id bigint NOT NULL,
    first_name character varying(150) NOT NULL,
    last_name character varying(150) NOT NULL,
    identification_type_id bigint NOT NULL,
    identification_number character varying(50) NOT NULL,
    phone character varying(50) NOT NULL,
    birth_date date NOT NULL,
    nationality_id bigint NOT NULL,
    created_date timestamp without time zone,
    updated_date timestamp without time zone
);


ALTER TABLE recruitment.user_info OWNER TO admin;

--
-- TOC entry 230 (class 1259 OID 16469)
-- Name: user_info_id_seq; Type: SEQUENCE; Schema: recruitment; Owner: admin
--

CREATE SEQUENCE recruitment.user_info_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE recruitment.user_info_id_seq OWNER TO admin;

--
-- TOC entry 3490 (class 0 OID 0)
-- Dependencies: 230
-- Name: user_info_id_seq; Type: SEQUENCE OWNED BY; Schema: recruitment; Owner: admin
--

ALTER SEQUENCE recruitment.user_info_id_seq OWNED BY recruitment.user_info.id;


--
-- TOC entry 235 (class 1259 OID 16501)
-- Name: user_role; Type: TABLE; Schema: recruitment; Owner: admin
--

CREATE TABLE recruitment.user_role (
    id bigint NOT NULL,
    user_id bigint NOT NULL,
    role_id bigint NOT NULL
);


ALTER TABLE recruitment.user_role OWNER TO admin;

--
-- TOC entry 234 (class 1259 OID 16500)
-- Name: user_role_id_seq; Type: SEQUENCE; Schema: recruitment; Owner: admin
--

CREATE SEQUENCE recruitment.user_role_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE recruitment.user_role_id_seq OWNER TO admin;

--
-- TOC entry 3491 (class 0 OID 0)
-- Dependencies: 234
-- Name: user_role_id_seq; Type: SEQUENCE OWNED BY; Schema: recruitment; Owner: admin
--

ALTER SEQUENCE recruitment.user_role_id_seq OWNED BY recruitment.user_role.id;


--
-- TOC entry 3260 (class 2604 OID 16420)
-- Name: app_user id; Type: DEFAULT; Schema: recruitment; Owner: admin
--

ALTER TABLE ONLY recruitment.app_user ALTER COLUMN id SET DEFAULT nextval('recruitment.app_user_id_seq'::regclass);


--
-- TOC entry 3265 (class 2604 OID 16455)
-- Name: identification_type id; Type: DEFAULT; Schema: recruitment; Owner: admin
--

ALTER TABLE ONLY recruitment.identification_type ALTER COLUMN id SET DEFAULT nextval('recruitment.identification_type_id_seq'::regclass);


--
-- TOC entry 3264 (class 2604 OID 16443)
-- Name: loging_history id; Type: DEFAULT; Schema: recruitment; Owner: admin
--

ALTER TABLE ONLY recruitment.loging_history ALTER COLUMN id SET DEFAULT nextval('recruitment.loging_history_id_seq'::regclass);


--
-- TOC entry 3266 (class 2604 OID 16464)
-- Name: nationality id; Type: DEFAULT; Schema: recruitment; Owner: admin
--

ALTER TABLE ONLY recruitment.nationality ALTER COLUMN id SET DEFAULT nextval('recruitment.nationality_id_seq'::regclass);


--
-- TOC entry 3262 (class 2604 OID 16430)
-- Name: password_reset id; Type: DEFAULT; Schema: recruitment; Owner: admin
--

ALTER TABLE ONLY recruitment.password_reset ALTER COLUMN id SET DEFAULT nextval('recruitment.password_reset_id_seq'::regclass);


--
-- TOC entry 3270 (class 2604 OID 16528)
-- Name: permission id; Type: DEFAULT; Schema: recruitment; Owner: admin
--

ALTER TABLE ONLY recruitment.permission ALTER COLUMN id SET DEFAULT nextval('recruitment.permission_id_seq'::regclass);


--
-- TOC entry 3268 (class 2604 OID 16495)
-- Name: role id; Type: DEFAULT; Schema: recruitment; Owner: admin
--

ALTER TABLE ONLY recruitment.role ALTER COLUMN id SET DEFAULT nextval('recruitment.role_id_seq'::regclass);


--
-- TOC entry 3271 (class 2604 OID 16537)
-- Name: role_permission id; Type: DEFAULT; Schema: recruitment; Owner: admin
--

ALTER TABLE ONLY recruitment.role_permission ALTER COLUMN id SET DEFAULT nextval('recruitment.role_permission_id_seq'::regclass);


--
-- TOC entry 3267 (class 2604 OID 16473)
-- Name: user_info id; Type: DEFAULT; Schema: recruitment; Owner: admin
--

ALTER TABLE ONLY recruitment.user_info ALTER COLUMN id SET DEFAULT nextval('recruitment.user_info_id_seq'::regclass);


--
-- TOC entry 3269 (class 2604 OID 16504)
-- Name: user_role id; Type: DEFAULT; Schema: recruitment; Owner: admin
--

ALTER TABLE ONLY recruitment.user_role ALTER COLUMN id SET DEFAULT nextval('recruitment.user_role_id_seq'::regclass);


--
-- TOC entry 3457 (class 0 OID 16417)
-- Dependencies: 221
-- Data for Name: app_user; Type: TABLE DATA; Schema: recruitment; Owner: admin
--

COPY recruitment.app_user (id, email, password_hash, active, created_date, updated_date) FROM stdin;
\.


--
-- TOC entry 3463 (class 0 OID 16452)
-- Dependencies: 227
-- Data for Name: identification_type; Type: TABLE DATA; Schema: recruitment; Owner: admin
--

COPY recruitment.identification_type (id, code, description) FROM stdin;
\.


--
-- TOC entry 3461 (class 0 OID 16440)
-- Dependencies: 225
-- Data for Name: loging_history; Type: TABLE DATA; Schema: recruitment; Owner: admin
--

COPY recruitment.loging_history (id, user_id, login_time) FROM stdin;
\.


--
-- TOC entry 3465 (class 0 OID 16461)
-- Dependencies: 229
-- Data for Name: nationality; Type: TABLE DATA; Schema: recruitment; Owner: admin
--

COPY recruitment.nationality (id, code, description, iso_2, iso_3) FROM stdin;
\.


--
-- TOC entry 3459 (class 0 OID 16427)
-- Dependencies: 223
-- Data for Name: password_reset; Type: TABLE DATA; Schema: recruitment; Owner: admin
--

COPY recruitment.password_reset (id, user_id, expiration_date, used, created_date, updated_date) FROM stdin;
\.


--
-- TOC entry 3473 (class 0 OID 16525)
-- Dependencies: 237
-- Data for Name: permission; Type: TABLE DATA; Schema: recruitment; Owner: admin
--

COPY recruitment.permission (id, name, description) FROM stdin;
\.


--
-- TOC entry 3469 (class 0 OID 16492)
-- Dependencies: 233
-- Data for Name: role; Type: TABLE DATA; Schema: recruitment; Owner: admin
--

COPY recruitment.role (id, name, description) FROM stdin;
\.


--
-- TOC entry 3475 (class 0 OID 16534)
-- Dependencies: 239
-- Data for Name: role_permission; Type: TABLE DATA; Schema: recruitment; Owner: admin
--

COPY recruitment.role_permission (id, role_id, permission_id) FROM stdin;
\.


--
-- TOC entry 3467 (class 0 OID 16470)
-- Dependencies: 231
-- Data for Name: user_info; Type: TABLE DATA; Schema: recruitment; Owner: admin
--

COPY recruitment.user_info (id, user_id, first_name, last_name, identification_type_id, identification_number, phone, birth_date, nationality_id, created_date, updated_date) FROM stdin;
\.


--
-- TOC entry 3471 (class 0 OID 16501)
-- Dependencies: 235
-- Data for Name: user_role; Type: TABLE DATA; Schema: recruitment; Owner: admin
--

COPY recruitment.user_role (id, user_id, role_id) FROM stdin;
\.


--
-- TOC entry 3492 (class 0 OID 0)
-- Dependencies: 220
-- Name: app_user_id_seq; Type: SEQUENCE SET; Schema: recruitment; Owner: admin
--

SELECT pg_catalog.setval('recruitment.app_user_id_seq', 1, false);


--
-- TOC entry 3493 (class 0 OID 0)
-- Dependencies: 226
-- Name: identification_type_id_seq; Type: SEQUENCE SET; Schema: recruitment; Owner: admin
--

SELECT pg_catalog.setval('recruitment.identification_type_id_seq', 1, false);


--
-- TOC entry 3494 (class 0 OID 0)
-- Dependencies: 224
-- Name: loging_history_id_seq; Type: SEQUENCE SET; Schema: recruitment; Owner: admin
--

SELECT pg_catalog.setval('recruitment.loging_history_id_seq', 1, false);


--
-- TOC entry 3495 (class 0 OID 0)
-- Dependencies: 228
-- Name: nationality_id_seq; Type: SEQUENCE SET; Schema: recruitment; Owner: admin
--

SELECT pg_catalog.setval('recruitment.nationality_id_seq', 1, false);


--
-- TOC entry 3496 (class 0 OID 0)
-- Dependencies: 222
-- Name: password_reset_id_seq; Type: SEQUENCE SET; Schema: recruitment; Owner: admin
--

SELECT pg_catalog.setval('recruitment.password_reset_id_seq', 1, false);


--
-- TOC entry 3497 (class 0 OID 0)
-- Dependencies: 236
-- Name: permission_id_seq; Type: SEQUENCE SET; Schema: recruitment; Owner: admin
--

SELECT pg_catalog.setval('recruitment.permission_id_seq', 1, false);


--
-- TOC entry 3498 (class 0 OID 0)
-- Dependencies: 232
-- Name: role_id_seq; Type: SEQUENCE SET; Schema: recruitment; Owner: admin
--

SELECT pg_catalog.setval('recruitment.role_id_seq', 1, false);


--
-- TOC entry 3499 (class 0 OID 0)
-- Dependencies: 238
-- Name: role_permission_id_seq; Type: SEQUENCE SET; Schema: recruitment; Owner: admin
--

SELECT pg_catalog.setval('recruitment.role_permission_id_seq', 1, false);


--
-- TOC entry 3500 (class 0 OID 0)
-- Dependencies: 230
-- Name: user_info_id_seq; Type: SEQUENCE SET; Schema: recruitment; Owner: admin
--

SELECT pg_catalog.setval('recruitment.user_info_id_seq', 1, false);


--
-- TOC entry 3501 (class 0 OID 0)
-- Dependencies: 234
-- Name: user_role_id_seq; Type: SEQUENCE SET; Schema: recruitment; Owner: admin
--

SELECT pg_catalog.setval('recruitment.user_role_id_seq', 1, false);


--
-- TOC entry 3273 (class 2606 OID 16425)
-- Name: app_user app_user_email_key; Type: CONSTRAINT; Schema: recruitment; Owner: admin
--

ALTER TABLE ONLY recruitment.app_user
    ADD CONSTRAINT app_user_email_key UNIQUE (email);


--
-- TOC entry 3275 (class 2606 OID 16423)
-- Name: app_user app_user_pkey; Type: CONSTRAINT; Schema: recruitment; Owner: admin
--

ALTER TABLE ONLY recruitment.app_user
    ADD CONSTRAINT app_user_pkey PRIMARY KEY (id);


--
-- TOC entry 3281 (class 2606 OID 16459)
-- Name: identification_type identification_type_code_key; Type: CONSTRAINT; Schema: recruitment; Owner: admin
--

ALTER TABLE ONLY recruitment.identification_type
    ADD CONSTRAINT identification_type_code_key UNIQUE (code);


--
-- TOC entry 3283 (class 2606 OID 16457)
-- Name: identification_type identification_type_pkey; Type: CONSTRAINT; Schema: recruitment; Owner: admin
--

ALTER TABLE ONLY recruitment.identification_type
    ADD CONSTRAINT identification_type_pkey PRIMARY KEY (id);


--
-- TOC entry 3279 (class 2606 OID 16445)
-- Name: loging_history loging_history_pkey; Type: CONSTRAINT; Schema: recruitment; Owner: admin
--

ALTER TABLE ONLY recruitment.loging_history
    ADD CONSTRAINT loging_history_pkey PRIMARY KEY (id);


--
-- TOC entry 3285 (class 2606 OID 16468)
-- Name: nationality nationality_code_key; Type: CONSTRAINT; Schema: recruitment; Owner: admin
--

ALTER TABLE ONLY recruitment.nationality
    ADD CONSTRAINT nationality_code_key UNIQUE (code);


--
-- TOC entry 3287 (class 2606 OID 16466)
-- Name: nationality nationality_pkey; Type: CONSTRAINT; Schema: recruitment; Owner: admin
--

ALTER TABLE ONLY recruitment.nationality
    ADD CONSTRAINT nationality_pkey PRIMARY KEY (id);


--
-- TOC entry 3277 (class 2606 OID 16433)
-- Name: password_reset password_reset_pkey; Type: CONSTRAINT; Schema: recruitment; Owner: admin
--

ALTER TABLE ONLY recruitment.password_reset
    ADD CONSTRAINT password_reset_pkey PRIMARY KEY (id);


--
-- TOC entry 3297 (class 2606 OID 16532)
-- Name: permission permission_name_key; Type: CONSTRAINT; Schema: recruitment; Owner: admin
--

ALTER TABLE ONLY recruitment.permission
    ADD CONSTRAINT permission_name_key UNIQUE (name);


--
-- TOC entry 3299 (class 2606 OID 16530)
-- Name: permission permission_pkey; Type: CONSTRAINT; Schema: recruitment; Owner: admin
--

ALTER TABLE ONLY recruitment.permission
    ADD CONSTRAINT permission_pkey PRIMARY KEY (id);


--
-- TOC entry 3291 (class 2606 OID 16499)
-- Name: role role_name_key; Type: CONSTRAINT; Schema: recruitment; Owner: admin
--

ALTER TABLE ONLY recruitment.role
    ADD CONSTRAINT role_name_key UNIQUE (name);


--
-- TOC entry 3301 (class 2606 OID 16539)
-- Name: role_permission role_permission_pkey; Type: CONSTRAINT; Schema: recruitment; Owner: admin
--

ALTER TABLE ONLY recruitment.role_permission
    ADD CONSTRAINT role_permission_pkey PRIMARY KEY (id);


--
-- TOC entry 3293 (class 2606 OID 16497)
-- Name: role role_pkey; Type: CONSTRAINT; Schema: recruitment; Owner: admin
--

ALTER TABLE ONLY recruitment.role
    ADD CONSTRAINT role_pkey PRIMARY KEY (id);


--
-- TOC entry 3289 (class 2606 OID 16475)
-- Name: user_info user_info_pkey; Type: CONSTRAINT; Schema: recruitment; Owner: admin
--

ALTER TABLE ONLY recruitment.user_info
    ADD CONSTRAINT user_info_pkey PRIMARY KEY (id);


--
-- TOC entry 3295 (class 2606 OID 16506)
-- Name: user_role user_role_pkey; Type: CONSTRAINT; Schema: recruitment; Owner: admin
--

ALTER TABLE ONLY recruitment.user_role
    ADD CONSTRAINT user_role_pkey PRIMARY KEY (id);


--
-- TOC entry 3303 (class 2606 OID 16446)
-- Name: loging_history fk_loging_history_user; Type: FK CONSTRAINT; Schema: recruitment; Owner: admin
--

ALTER TABLE ONLY recruitment.loging_history
    ADD CONSTRAINT fk_loging_history_user FOREIGN KEY (user_id) REFERENCES recruitment.app_user(id) ON DELETE CASCADE;


--
-- TOC entry 3302 (class 2606 OID 16434)
-- Name: password_reset fk_password_reset_user; Type: FK CONSTRAINT; Schema: recruitment; Owner: admin
--

ALTER TABLE ONLY recruitment.password_reset
    ADD CONSTRAINT fk_password_reset_user FOREIGN KEY (user_id) REFERENCES recruitment.app_user(id) ON DELETE CASCADE;


--
-- TOC entry 3309 (class 2606 OID 16540)
-- Name: role_permission fk_role_permission_permission; Type: FK CONSTRAINT; Schema: recruitment; Owner: admin
--

ALTER TABLE ONLY recruitment.role_permission
    ADD CONSTRAINT fk_role_permission_permission FOREIGN KEY (permission_id) REFERENCES recruitment.permission(id) ON DELETE CASCADE;


--
-- TOC entry 3310 (class 2606 OID 16545)
-- Name: role_permission fk_role_permission_role; Type: FK CONSTRAINT; Schema: recruitment; Owner: admin
--

ALTER TABLE ONLY recruitment.role_permission
    ADD CONSTRAINT fk_role_permission_role FOREIGN KEY (role_id) REFERENCES recruitment.role(id) ON DELETE CASCADE;


--
-- TOC entry 3304 (class 2606 OID 16481)
-- Name: user_info fk_user_info_identification_type; Type: FK CONSTRAINT; Schema: recruitment; Owner: admin
--

ALTER TABLE ONLY recruitment.user_info
    ADD CONSTRAINT fk_user_info_identification_type FOREIGN KEY (identification_type_id) REFERENCES recruitment.identification_type(id) ON DELETE CASCADE;


--
-- TOC entry 3305 (class 2606 OID 16486)
-- Name: user_info fk_user_info_nationality; Type: FK CONSTRAINT; Schema: recruitment; Owner: admin
--

ALTER TABLE ONLY recruitment.user_info
    ADD CONSTRAINT fk_user_info_nationality FOREIGN KEY (nationality_id) REFERENCES recruitment.nationality(id) ON DELETE CASCADE;


--
-- TOC entry 3306 (class 2606 OID 16476)
-- Name: user_info fk_user_info_user; Type: FK CONSTRAINT; Schema: recruitment; Owner: admin
--

ALTER TABLE ONLY recruitment.user_info
    ADD CONSTRAINT fk_user_info_user FOREIGN KEY (user_id) REFERENCES recruitment.app_user(id) ON DELETE CASCADE;


--
-- TOC entry 3307 (class 2606 OID 16512)
-- Name: user_role fk_user_role_role; Type: FK CONSTRAINT; Schema: recruitment; Owner: admin
--

ALTER TABLE ONLY recruitment.user_role
    ADD CONSTRAINT fk_user_role_role FOREIGN KEY (role_id) REFERENCES recruitment.role(id) ON DELETE CASCADE;


--
-- TOC entry 3308 (class 2606 OID 16507)
-- Name: user_role fk_user_role_user; Type: FK CONSTRAINT; Schema: recruitment; Owner: admin
--

ALTER TABLE ONLY recruitment.user_role
    ADD CONSTRAINT fk_user_role_user FOREIGN KEY (user_id) REFERENCES recruitment.app_user(id) ON DELETE CASCADE;


-- Completed on 2025-04-19 11:19:38

--
-- PostgreSQL database dump complete
--

