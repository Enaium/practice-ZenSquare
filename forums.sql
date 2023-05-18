--
-- PostgreSQL database dump
--

-- Dumped from database version 15.2
-- Dumped by pg_dump version 15.2

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

--
-- Name: forums; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA forums;


ALTER SCHEMA forums OWNER TO postgres;

--
-- Name: report_type; Type: TYPE; Schema: forums; Owner: postgres
--

CREATE TYPE forums.report_type AS ENUM (
    'member',
    'thread',
    'reply'
);


ALTER TYPE forums.report_type OWNER TO postgres;

--
-- Name: thread_type; Type: TYPE; Schema: forums; Owner: postgres
--

CREATE TYPE forums.thread_type AS ENUM (
    'post',
    'conversation'
);


ALTER TYPE forums.thread_type OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: alert; Type: TABLE; Schema: forums; Owner: postgres
--

CREATE TABLE forums.alert (
    deleted boolean DEFAULT false NOT NULL,
    created_time timestamp without time zone NOT NULL,
    modified_time timestamp without time zone NOT NULL,
    id uuid NOT NULL,
    alert_type_id uuid NOT NULL,
    source_member_id uuid NOT NULL,
    target_member_id uuid NOT NULL,
    target uuid NOT NULL,
    unread boolean DEFAULT true NOT NULL
);


ALTER TABLE forums.alert OWNER TO postgres;

--
-- Name: alert_type; Type: TABLE; Schema: forums; Owner: postgres
--

CREATE TABLE forums.alert_type (
    deleted boolean DEFAULT false NOT NULL,
    created_time timestamp without time zone NOT NULL,
    modified_time timestamp without time zone NOT NULL,
    id uuid NOT NULL,
    name character varying(10) NOT NULL,
    description character varying(20) NOT NULL
);


ALTER TABLE forums.alert_type OWNER TO postgres;

--
-- Name: category; Type: TABLE; Schema: forums; Owner: postgres
--

CREATE TABLE forums.category (
    deleted boolean DEFAULT false NOT NULL,
    created_time timestamp without time zone NOT NULL,
    modified_time timestamp without time zone NOT NULL,
    id uuid NOT NULL,
    name character varying(10) NOT NULL,
    description character varying(300) NOT NULL
);


ALTER TABLE forums.category OWNER TO postgres;

--
-- Name: conversation_mapping; Type: TABLE; Schema: forums; Owner: postgres
--

CREATE TABLE forums.conversation_mapping (
    thread_id uuid NOT NULL,
    member_id uuid NOT NULL
);


ALTER TABLE forums.conversation_mapping OWNER TO postgres;

--
-- Name: follow_mapping; Type: TABLE; Schema: forums; Owner: postgres
--

CREATE TABLE forums.follow_mapping (
    follower_id uuid NOT NULL,
    following_id uuid NOT NULL
);


ALTER TABLE forums.follow_mapping OWNER TO postgres;

--
-- Name: forum; Type: TABLE; Schema: forums; Owner: postgres
--

CREATE TABLE forums.forum (
    deleted boolean DEFAULT false NOT NULL,
    created_time timestamp without time zone NOT NULL,
    modified_time timestamp without time zone NOT NULL,
    id uuid NOT NULL,
    name character varying(30) NOT NULL,
    description character varying(100) NOT NULL,
    category_id uuid NOT NULL,
    icon uuid
);


ALTER TABLE forums.forum OWNER TO postgres;

--
-- Name: image; Type: TABLE; Schema: forums; Owner: postgres
--

CREATE TABLE forums.image (
    deleted boolean DEFAULT false NOT NULL,
    created_time timestamp without time zone NOT NULL,
    modified_time timestamp without time zone NOT NULL,
    id uuid NOT NULL,
    hash character varying(32) NOT NULL
);


ALTER TABLE forums.image OWNER TO postgres;

--
-- Name: member; Type: TABLE; Schema: forums; Owner: postgres
--

CREATE TABLE forums.member (
    deleted boolean DEFAULT false NOT NULL,
    created_time timestamp without time zone NOT NULL,
    modified_time timestamp without time zone NOT NULL,
    id uuid NOT NULL,
    username character varying(18) NOT NULL,
    password character varying(60) NOT NULL
);


ALTER TABLE forums.member OWNER TO postgres;

--
-- Name: member_like; Type: TABLE; Schema: forums; Owner: postgres
--

CREATE TABLE forums.member_like (
    disabled boolean DEFAULT false NOT NULL,
    created_time timestamp without time zone NOT NULL,
    modified_time timestamp without time zone NOT NULL,
    id uuid NOT NULL,
    member_id uuid NOT NULL,
    target uuid NOT NULL,
    dislike boolean NOT NULL
);


ALTER TABLE forums.member_like OWNER TO postgres;

--
-- Name: member_profile; Type: TABLE; Schema: forums; Owner: postgres
--

CREATE TABLE forums.member_profile (
    deleted boolean DEFAULT false NOT NULL,
    created_time timestamp without time zone NOT NULL,
    modified_time timestamp without time zone NOT NULL,
    id uuid NOT NULL,
    member_id uuid NOT NULL,
    nickname character varying(18) NOT NULL,
    birthday date,
    location character varying(50),
    website character varying(20),
    description character varying(100),
    github character varying(50),
    bilibili character varying(50),
    email character varying(25),
    role_id uuid DEFAULT '8ef8b336-d2e3-4808-86a3-a8344d4c355b'::uuid NOT NULL,
    avatar uuid
);


ALTER TABLE forums.member_profile OWNER TO postgres;

--
-- Name: permission; Type: TABLE; Schema: forums; Owner: postgres
--

CREATE TABLE forums.permission (
    deleted boolean DEFAULT false NOT NULL,
    created_time timestamp without time zone NOT NULL,
    modified_time timestamp without time zone NOT NULL,
    id uuid NOT NULL,
    name character varying(20) NOT NULL,
    description character varying(50) NOT NULL
);


ALTER TABLE forums.permission OWNER TO postgres;

--
-- Name: reply; Type: TABLE; Schema: forums; Owner: postgres
--

CREATE TABLE forums.reply (
    deleted boolean DEFAULT false NOT NULL,
    created_time timestamp without time zone NOT NULL,
    modified_time timestamp without time zone NOT NULL,
    id uuid NOT NULL,
    content character varying(500) NOT NULL,
    member_id uuid NOT NULL,
    thread_id uuid NOT NULL,
    parent_id uuid
);


ALTER TABLE forums.reply OWNER TO postgres;

--
-- Name: report; Type: TABLE; Schema: forums; Owner: postgres
--

CREATE TABLE forums.report (
    deleted boolean DEFAULT false NOT NULL,
    created_time timestamp without time zone NOT NULL,
    modified_time timestamp without time zone NOT NULL,
    id uuid NOT NULL,
    member_id uuid NOT NULL,
    target uuid NOT NULL,
    reason character varying(500) NOT NULL,
    type forums.report_type NOT NULL
);


ALTER TABLE forums.report OWNER TO postgres;

--
-- Name: role; Type: TABLE; Schema: forums; Owner: postgres
--

CREATE TABLE forums.role (
    deleted boolean DEFAULT false NOT NULL,
    created_time timestamp without time zone NOT NULL,
    modified_time timestamp without time zone NOT NULL,
    id uuid NOT NULL,
    name character varying(20) NOT NULL,
    description character varying(50) NOT NULL
);


ALTER TABLE forums.role OWNER TO postgres;

--
-- Name: role_permission_mapping; Type: TABLE; Schema: forums; Owner: postgres
--

CREATE TABLE forums.role_permission_mapping (
    role_id uuid NOT NULL,
    permission_id uuid NOT NULL
);


ALTER TABLE forums.role_permission_mapping OWNER TO postgres;

--
-- Name: thread; Type: TABLE; Schema: forums; Owner: postgres
--

CREATE TABLE forums.thread (
    deleted boolean DEFAULT false NOT NULL,
    created_time timestamp without time zone NOT NULL,
    modified_time timestamp without time zone NOT NULL,
    id uuid NOT NULL,
    title character varying(50) NOT NULL,
    content text NOT NULL,
    member_id uuid NOT NULL,
    forum_id uuid,
    type forums.thread_type NOT NULL
);


ALTER TABLE forums.thread OWNER TO postgres;

--
-- Data for Name: alert; Type: TABLE DATA; Schema: forums; Owner: postgres
--

COPY forums.alert (deleted, created_time, modified_time, id, alert_type_id, source_member_id, target_member_id, target, unread) FROM stdin;
\.


--
-- Data for Name: alert_type; Type: TABLE DATA; Schema: forums; Owner: postgres
--

COPY forums.alert_type (deleted, created_time, modified_time, id, name, description) FROM stdin;
\.


--
-- Data for Name: category; Type: TABLE DATA; Schema: forums; Owner: postgres
--

COPY forums.category (deleted, created_time, modified_time, id, name, description) FROM stdin;
f	2023-05-04 02:02:44.784642	2023-05-04 02:02:44.784642	0f5ca4a1-2f71-400d-9997-d69f3e0ee4dc	ZenSquare	ZenSquare - "Zen" can express the concepts of inner peace, meditation and simplicity, while "Square" can mean square, space and communication. The overall name can be understood as a square focused on creating a comfortable, natural and balanced communication.
\.


--
-- Data for Name: conversation_mapping; Type: TABLE DATA; Schema: forums; Owner: postgres
--

COPY forums.conversation_mapping (thread_id, member_id) FROM stdin;
53dfc14b-b2cd-4c84-8283-f25a0b641b24	0cee6d54-c445-4fff-9c04-895b53441dad
53dfc14b-b2cd-4c84-8283-f25a0b641b24	5b36da4a-80ab-494d-b7b0-8c548b8adebe
\.


--
-- Data for Name: follow_mapping; Type: TABLE DATA; Schema: forums; Owner: postgres
--

COPY forums.follow_mapping (follower_id, following_id) FROM stdin;
5b36da4a-80ab-494d-b7b0-8c548b8adebe	0cee6d54-c445-4fff-9c04-895b53441dad
\.


--
-- Data for Name: forum; Type: TABLE DATA; Schema: forums; Owner: postgres
--

COPY forums.forum (deleted, created_time, modified_time, id, name, description, category_id, icon) FROM stdin;
f	2023-05-04 02:07:45.434759	2023-05-04 02:07:45.434759	f6cf0cfe-2d69-4e7d-a2ae-92e74eca3dd6	Announcements	Updates and notices about what's new with ZenSquare!	0f5ca4a1-2f71-400d-9997-d69f3e0ee4dc	\N
f	2023-05-04 02:13:31.068988	2023-05-04 02:13:31.068988	9b5d2890-4dea-4f98-a418-afe51a42d82a	Feedback & Suggestions	Tell us what you think about all things ZenSquare.	0f5ca4a1-2f71-400d-9997-d69f3e0ee4dc	\N
\.


--
-- Data for Name: image; Type: TABLE DATA; Schema: forums; Owner: postgres
--

COPY forums.image (deleted, created_time, modified_time, id, hash) FROM stdin;
f	2023-05-04 21:07:40.35961	2023-05-04 21:07:40.35961	34289f06-5fc2-4fab-9c75-0b704b4dd5e3	fa8fabe0d847a018387f57bcca757aea
f	2023-05-06 19:38:51.911234	2023-05-06 19:38:51.910721	5be57fe4-ec09-47a0-8abe-739de5835b1f	118d225faad0e555ccf4a803f3db7d41
\.


--
-- Data for Name: member; Type: TABLE DATA; Schema: forums; Owner: postgres
--

COPY forums.member (deleted, created_time, modified_time, id, username, password) FROM stdin;
f	2023-05-04 11:11:02.842339	2023-05-04 11:11:02.841823	5b36da4a-80ab-494d-b7b0-8c548b8adebe	admin	$2a$10$wSIhyxFTchfHpEK3PvvC7.YabLjkJ5w8pIXCk5lNFk4e4P7EB4l3m
f	2023-05-04 19:47:14.181918	2023-05-15 16:42:21.446138	0cee6d54-c445-4fff-9c04-895b53441dad	test	$2a$10$4Iwvj5yi.QgIKzXczlUF/OajX0tE/WDo7Ypyd1sZ30WKVjliOToSi
\.


--
-- Data for Name: member_like; Type: TABLE DATA; Schema: forums; Owner: postgres
--

COPY forums.member_like (disabled, created_time, modified_time, id, member_id, target, dislike) FROM stdin;
\.


--
-- Data for Name: member_profile; Type: TABLE DATA; Schema: forums; Owner: postgres
--

COPY forums.member_profile (deleted, created_time, modified_time, id, member_id, nickname, birthday, location, website, description, github, bilibili, email, role_id, avatar) FROM stdin;
f	2023-05-05 15:43:31.003228	2023-05-05 15:43:31.002716	09686101-fc02-4e64-ac2e-b120ca98a3dd	5b36da4a-80ab-494d-b7b0-8c548b8adebe	Enaium	\N	\N	\N	\N	\N	\N	\N	3b4d9552-879b-450e-afaf-6e17c1a74875	\N
f	2023-05-10 22:10:35.366774	2023-05-15 15:03:35.988823	d81eeac4-5b60-4d93-9b2f-72ecc0f7ad7e	0cee6d54-c445-4fff-9c04-895b53441dad	Test	\N	\N	\N	\N	\N	\N	\N	8ef8b336-d2e3-4808-86a3-a8344d4c355b	5be57fe4-ec09-47a0-8abe-739de5835b1f
\.


--
-- Data for Name: permission; Type: TABLE DATA; Schema: forums; Owner: postgres
--

COPY forums.permission (deleted, created_time, modified_time, id, name, description) FROM stdin;
f	2023-05-04 05:53:33.585438	2023-05-04 05:53:33.585438	94b1b81e-a4ca-4441-a021-cf86cdb42c83	recycle-reply	Recycle a reply
f	2023-05-04 06:03:03.710807	2023-05-04 06:03:03.710807	0fcbc615-2f8e-4053-9db3-a4ff8c0d49a0	put-category	Create a new category or edit a category
f	2023-05-04 05:50:44.331411	2023-05-04 05:50:44.331411	d85486b4-b9ed-4204-b9bc-42d73be198fb	put-reply	Publish a new reply or edit a reply
f	2023-05-04 06:09:10.526066	2023-05-04 06:09:10.526066	169f4365-99b6-4587-aac4-44bb43e3030b	recycle-category	Recycle a category
f	2023-05-04 06:02:29.385676	2023-05-04 06:02:29.385676	91d04c2b-6d23-4852-b8ac-45e0e6fcfead	put-forum	Create a new forum or edit a forum
f	2023-05-04 05:42:53.382359	2023-05-04 05:42:53.382359	34706b4b-4f5c-4875-bcaa-e8f4b80f87b4	put-thread	Publish a new thread or edit a thread
f	2023-05-04 06:09:01.250691	2023-05-04 06:09:01.250691	6e425eb0-a863-4c76-9c94-ad8294f54081	recycle-forum	Recycle a forum
f	2023-05-04 05:53:25.754451	2023-05-04 05:53:25.754451	3d8333d9-0ae1-4503-ab38-aac4568cd0bf	recycle-thread	Recycle a thread
\.


--
-- Data for Name: reply; Type: TABLE DATA; Schema: forums; Owner: postgres
--

COPY forums.reply (deleted, created_time, modified_time, id, content, member_id, thread_id, parent_id) FROM stdin;
f	2023-05-07 16:39:31.804297	2023-05-07 16:39:31.804297	af5a1841-7ed5-4d6c-83f4-6e99478559f9	Congratulations for new forum!\n\nI wish luck to ZenSquare.	5b36da4a-80ab-494d-b7b0-8c548b8adebe	b692ea79-12a8-4e10-aad1-9a35d76bc561	\N
f	2023-05-08 14:47:49.991115	2023-05-08 14:47:49.990082	a5dc8021-7d8d-48c5-b0e3-737001e9287b	1	5b36da4a-80ab-494d-b7b0-8c548b8adebe	2748fe13-42e4-42fb-aee2-ed795834ab94	\N
f	2023-05-08 14:47:52.224806	2023-05-08 14:47:52.224806	b981a8c0-0d02-4494-b736-a9f0e926ea8f	2	5b36da4a-80ab-494d-b7b0-8c548b8adebe	2748fe13-42e4-42fb-aee2-ed795834ab94	\N
f	2023-05-08 14:47:53.786742	2023-05-08 14:47:53.786742	8505d583-817f-4a48-8a83-eca3f1e54179	3	5b36da4a-80ab-494d-b7b0-8c548b8adebe	2748fe13-42e4-42fb-aee2-ed795834ab94	\N
f	2023-05-08 14:47:56.276291	2023-05-08 14:47:56.276291	797e1d54-38ad-41c1-9118-957829209c7b	4	5b36da4a-80ab-494d-b7b0-8c548b8adebe	2748fe13-42e4-42fb-aee2-ed795834ab94	\N
f	2023-05-08 14:47:57.910616	2023-05-08 14:47:57.910616	0231e5cc-c620-42b0-94b2-7dad247475ca	5	5b36da4a-80ab-494d-b7b0-8c548b8adebe	2748fe13-42e4-42fb-aee2-ed795834ab94	\N
f	2023-05-08 14:47:59.905599	2023-05-08 14:47:59.905599	2980b120-a177-410b-a29a-ee251dbb150a	6	5b36da4a-80ab-494d-b7b0-8c548b8adebe	2748fe13-42e4-42fb-aee2-ed795834ab94	\N
f	2023-05-08 14:48:01.309407	2023-05-08 14:48:01.309407	ae5aa60c-5887-4d2c-b4dd-05b3861656ff	7	5b36da4a-80ab-494d-b7b0-8c548b8adebe	2748fe13-42e4-42fb-aee2-ed795834ab94	\N
f	2023-05-08 14:48:03.36059	2023-05-08 14:48:03.36059	470a8992-efe3-4a2e-85ba-bb97af53eac2	8	5b36da4a-80ab-494d-b7b0-8c548b8adebe	2748fe13-42e4-42fb-aee2-ed795834ab94	\N
f	2023-05-08 14:48:05.703788	2023-05-08 14:48:05.703788	2e2d60b8-de05-434e-a10a-67f9c8b2102f	9	5b36da4a-80ab-494d-b7b0-8c548b8adebe	2748fe13-42e4-42fb-aee2-ed795834ab94	\N
f	2023-05-08 14:48:08.175276	2023-05-08 14:48:08.175276	4e6221e1-6256-4f37-bb59-b3165cfa370a	10	5b36da4a-80ab-494d-b7b0-8c548b8adebe	2748fe13-42e4-42fb-aee2-ed795834ab94	\N
f	2023-05-08 14:48:11.100403	2023-05-08 14:48:11.100403	9b20f062-98d8-4133-875f-77c83e51d7c2	11	5b36da4a-80ab-494d-b7b0-8c548b8adebe	2748fe13-42e4-42fb-aee2-ed795834ab94	\N
f	2023-05-08 14:48:12.665443	2023-05-08 14:48:12.665443	e2fe980e-8365-43f8-a982-cf9a473935be	12	5b36da4a-80ab-494d-b7b0-8c548b8adebe	2748fe13-42e4-42fb-aee2-ed795834ab94	\N
f	2023-05-08 14:48:14.131259	2023-05-08 14:48:14.131259	b8cec871-0dd4-45bb-a953-c3f9f8bb44be	13	5b36da4a-80ab-494d-b7b0-8c548b8adebe	2748fe13-42e4-42fb-aee2-ed795834ab94	\N
f	2023-05-08 14:48:16.009338	2023-05-08 14:48:16.009338	38ab859a-c38f-49ba-a12a-3b12fd44f508	14	5b36da4a-80ab-494d-b7b0-8c548b8adebe	2748fe13-42e4-42fb-aee2-ed795834ab94	\N
f	2023-05-08 14:49:19.022158	2023-05-08 14:49:19.022158	aaa7856c-20e7-4149-9fc2-c647a6344f07	15	5b36da4a-80ab-494d-b7b0-8c548b8adebe	2748fe13-42e4-42fb-aee2-ed795834ab94	\N
f	2023-05-08 15:01:30.267165	2023-05-08 15:01:30.267165	655f8aae-8c69-4b4f-9775-912e14df5160	16	5b36da4a-80ab-494d-b7b0-8c548b8adebe	2748fe13-42e4-42fb-aee2-ed795834ab94	\N
f	2023-05-10 14:56:25.691488	2023-05-10 14:56:25.690976	5894d0cb-1a09-4b0a-972d-0ee2dd68940f	👍	0cee6d54-c445-4fff-9c04-895b53441dad	b692ea79-12a8-4e10-aad1-9a35d76bc561	26a271e7-f487-403e-a123-c8811a72a0c9
f	2023-05-10 14:57:59.237953	2023-05-10 14:57:59.237953	7a8367d5-6693-4c5d-8c4e-708cb96d6a4b	🖖	0cee6d54-c445-4fff-9c04-895b53441dad	b692ea79-12a8-4e10-aad1-9a35d76bc561	e31df840-a856-4fda-960c-c14f5831c438
f	2023-05-10 15:07:04.318171	2023-05-10 15:07:04.318171	8c9ee339-c89b-49a9-b651-2c5a79009960	👍	0cee6d54-c445-4fff-9c04-895b53441dad	b692ea79-12a8-4e10-aad1-9a35d76bc561	26a271e7-f487-403e-a123-c8811a72a0c9
f	2023-05-10 15:07:04.799272	2023-05-10 15:07:04.799272	29c9c1b1-5302-401c-a313-e77061c3ad40	👍	0cee6d54-c445-4fff-9c04-895b53441dad	b692ea79-12a8-4e10-aad1-9a35d76bc561	26a271e7-f487-403e-a123-c8811a72a0c9
f	2023-05-10 15:07:05.084257	2023-05-10 15:07:05.084257	7b599ebf-bf7e-48a9-8362-8f3e4d064656	👍	0cee6d54-c445-4fff-9c04-895b53441dad	b692ea79-12a8-4e10-aad1-9a35d76bc561	26a271e7-f487-403e-a123-c8811a72a0c9
f	2023-05-10 15:07:05.224074	2023-05-10 15:07:05.224074	2f1d57cb-01a7-4653-a80b-45c3078e30d4	👍	0cee6d54-c445-4fff-9c04-895b53441dad	b692ea79-12a8-4e10-aad1-9a35d76bc561	26a271e7-f487-403e-a123-c8811a72a0c9
f	2023-05-10 15:07:05.388952	2023-05-10 15:07:05.388952	270e728d-5318-4b2f-b03d-97a294c1508b	👍	0cee6d54-c445-4fff-9c04-895b53441dad	b692ea79-12a8-4e10-aad1-9a35d76bc561	26a271e7-f487-403e-a123-c8811a72a0c9
f	2023-05-10 15:07:05.655661	2023-05-10 15:07:05.655661	01364df9-ce3a-40c9-adec-b3435ed2fdf6	👍	0cee6d54-c445-4fff-9c04-895b53441dad	b692ea79-12a8-4e10-aad1-9a35d76bc561	26a271e7-f487-403e-a123-c8811a72a0c9
f	2023-05-10 15:07:05.848526	2023-05-10 15:07:05.848526	636f3390-7090-40ed-948d-1d5d162f94b4	👍	0cee6d54-c445-4fff-9c04-895b53441dad	b692ea79-12a8-4e10-aad1-9a35d76bc561	26a271e7-f487-403e-a123-c8811a72a0c9
f	2023-05-10 15:07:06.025208	2023-05-10 15:07:06.025208	915f75a3-46b8-45df-a641-f3fa15afc78e	👍	0cee6d54-c445-4fff-9c04-895b53441dad	b692ea79-12a8-4e10-aad1-9a35d76bc561	26a271e7-f487-403e-a123-c8811a72a0c9
f	2023-05-10 15:07:06.237769	2023-05-10 15:07:06.237769	5bf1a485-deb7-4a0a-9cd7-ba52f3c41bfa	👍	0cee6d54-c445-4fff-9c04-895b53441dad	b692ea79-12a8-4e10-aad1-9a35d76bc561	26a271e7-f487-403e-a123-c8811a72a0c9
f	2023-05-10 15:07:06.546744	2023-05-10 15:07:06.546744	92941077-fc3d-44f1-a4a4-d676498eba2a	👍	0cee6d54-c445-4fff-9c04-895b53441dad	b692ea79-12a8-4e10-aad1-9a35d76bc561	26a271e7-f487-403e-a123-c8811a72a0c9
f	2023-05-10 15:07:06.70147	2023-05-10 15:07:06.70147	e093ed5f-33f9-4a15-b106-486dc734ecf5	👍	0cee6d54-c445-4fff-9c04-895b53441dad	b692ea79-12a8-4e10-aad1-9a35d76bc561	26a271e7-f487-403e-a123-c8811a72a0c9
f	2023-05-10 15:07:06.847234	2023-05-10 15:07:06.847234	2bbe5b12-bdd3-48cb-9d4e-f9e737d19336	👍	0cee6d54-c445-4fff-9c04-895b53441dad	b692ea79-12a8-4e10-aad1-9a35d76bc561	26a271e7-f487-403e-a123-c8811a72a0c9
f	2023-05-10 15:07:06.980286	2023-05-10 15:07:06.980286	93e136ac-dccb-4a52-bee1-6265ae794642	👍	0cee6d54-c445-4fff-9c04-895b53441dad	b692ea79-12a8-4e10-aad1-9a35d76bc561	26a271e7-f487-403e-a123-c8811a72a0c9
f	2023-05-10 15:07:07.113512	2023-05-10 15:07:07.113512	ceb13876-47dc-4e28-b42e-b9e6c2cc2a4f	👍	0cee6d54-c445-4fff-9c04-895b53441dad	b692ea79-12a8-4e10-aad1-9a35d76bc561	26a271e7-f487-403e-a123-c8811a72a0c9
f	2023-05-10 15:07:07.20478	2023-05-10 15:07:07.20478	507148f4-6914-495e-97e1-2b43dead36e6	👍	0cee6d54-c445-4fff-9c04-895b53441dad	b692ea79-12a8-4e10-aad1-9a35d76bc561	26a271e7-f487-403e-a123-c8811a72a0c9
f	2023-05-10 17:12:21.435693	2023-05-10 17:12:21.435693	9ef27af3-65df-4c02-b2ba-cc0d601370cb	👍	0cee6d54-c445-4fff-9c04-895b53441dad	b692ea79-12a8-4e10-aad1-9a35d76bc561	26a271e7-f487-403e-a123-c8811a72a0c9
f	2023-05-10 19:46:05.692663	2023-05-10 19:46:05.692663	bf74342d-fc54-48f4-9024-d155bcaeed23	👍	5b36da4a-80ab-494d-b7b0-8c548b8adebe	b692ea79-12a8-4e10-aad1-9a35d76bc561	5894d0cb-1a09-4b0a-972d-0ee2dd68940f
f	2023-05-11 10:49:33.94718	2023-05-11 10:49:33.946664	f9a8f6c0-50fb-42cc-95a5-7db21b64267a	👍	5b36da4a-80ab-494d-b7b0-8c548b8adebe	b692ea79-12a8-4e10-aad1-9a35d76bc561	bf74342d-fc54-48f4-9024-d155bcaeed23
f	2023-05-11 10:49:42.733895	2023-05-11 10:49:42.733895	755c09d5-fd79-41be-8cb9-08b6de44ec3a	👍	5b36da4a-80ab-494d-b7b0-8c548b8adebe	b692ea79-12a8-4e10-aad1-9a35d76bc561	f9a8f6c0-50fb-42cc-95a5-7db21b64267a
f	2023-05-10 12:33:40.528539	2023-05-11 15:25:23.22392	e31df840-a856-4fda-960c-c14f5831c438	🖖	0cee6d54-c445-4fff-9c04-895b53441dad	b692ea79-12a8-4e10-aad1-9a35d76bc561	\N
f	2023-05-11 15:26:07.653452	2023-05-11 15:26:07.653452	84f6e0ba-3b19-462f-ad97-63de389a6565	🖖	5b36da4a-80ab-494d-b7b0-8c548b8adebe	b692ea79-12a8-4e10-aad1-9a35d76bc561	\N
f	2023-05-11 16:24:19.413696	2023-05-11 16:24:19.412653	c07117e5-b2bd-4d6e-b2d5-7d8984cf7fc3	123	5b36da4a-80ab-494d-b7b0-8c548b8adebe	be55dc0d-750e-41c7-8c51-a8ca807b8253	\N
f	2023-05-14 21:02:22.598193	2023-05-14 21:02:22.598193	4458a7b9-6925-4563-b749-5af80ef24541	👍	5b36da4a-80ab-494d-b7b0-8c548b8adebe	b692ea79-12a8-4e10-aad1-9a35d76bc561	\N
f	2023-05-14 21:02:26.870893	2023-05-14 21:02:26.870893	5dce1161-e380-48b8-81ce-2d809426b890	👍	5b36da4a-80ab-494d-b7b0-8c548b8adebe	b692ea79-12a8-4e10-aad1-9a35d76bc561	\N
f	2023-05-14 21:03:22.256287	2023-05-14 21:03:22.256287	3f6d8f61-1391-40ce-b2a7-2f0d8506f89d	🖖\n	5b36da4a-80ab-494d-b7b0-8c548b8adebe	b692ea79-12a8-4e10-aad1-9a35d76bc561	\N
f	2023-05-07 17:14:51.697343	2023-05-14 21:19:48.396588	26a271e7-f487-403e-a123-c8811a72a0c9	🖖🖖🖖🖖	5b36da4a-80ab-494d-b7b0-8c548b8adebe	b692ea79-12a8-4e10-aad1-9a35d76bc561	\N
f	2023-05-16 08:41:42.869812	2023-05-16 08:41:42.869302	7ce084e1-003f-49a5-a259-ed81efa83f25	test	5b36da4a-80ab-494d-b7b0-8c548b8adebe	b692ea79-12a8-4e10-aad1-9a35d76bc561	e31df840-a856-4fda-960c-c14f5831c438
f	2023-05-16 08:42:38.98842	2023-05-16 08:42:38.98842	a76dfc93-f901-4f6c-a2e9-a1899b2590f8	test	5b36da4a-80ab-494d-b7b0-8c548b8adebe	b692ea79-12a8-4e10-aad1-9a35d76bc561	e31df840-a856-4fda-960c-c14f5831c438
f	2023-05-16 08:45:03.999524	2023-05-16 08:45:03.999013	759e0f6a-eda0-4c79-bd7b-8a46471baf34	test	5b36da4a-80ab-494d-b7b0-8c548b8adebe	b692ea79-12a8-4e10-aad1-9a35d76bc561	e31df840-a856-4fda-960c-c14f5831c438
f	2023-05-16 08:46:07.604542	2023-05-16 08:46:07.604542	6f6f6628-b10d-4a3c-a79e-1885591af0a5	test	5b36da4a-80ab-494d-b7b0-8c548b8adebe	b692ea79-12a8-4e10-aad1-9a35d76bc561	e31df840-a856-4fda-960c-c14f5831c438
f	2023-05-16 08:50:34.443425	2023-05-16 08:50:34.443425	bfa6d1c1-e832-4bff-8ae2-0fa9d6d14866	test	5b36da4a-80ab-494d-b7b0-8c548b8adebe	b692ea79-12a8-4e10-aad1-9a35d76bc561	e31df840-a856-4fda-960c-c14f5831c438
f	2023-05-16 09:37:09.759235	2023-05-16 09:37:09.759235	28e4ee5c-df38-4014-b37a-3d24f07b6496	r	5b36da4a-80ab-494d-b7b0-8c548b8adebe	b692ea79-12a8-4e10-aad1-9a35d76bc561	26a271e7-f487-403e-a123-c8811a72a0c9
f	2023-05-17 18:41:31.351975	2023-05-17 18:41:31.35095	4453e729-b5c2-44cc-865e-a02f83cb3546	test	0cee6d54-c445-4fff-9c04-895b53441dad	b692ea79-12a8-4e10-aad1-9a35d76bc561	\N
f	2023-05-17 19:31:17.583822	2023-05-17 19:31:17.583822	a62fd8dc-db5f-454b-9b46-9fca705b5aee	123	0cee6d54-c445-4fff-9c04-895b53441dad	b692ea79-12a8-4e10-aad1-9a35d76bc561	26a271e7-f487-403e-a123-c8811a72a0c9
f	2023-05-18 14:57:06.358138	2023-05-18 14:57:06.357108	80c23f4a-a9ae-4db2-b20d-d01332b0d834	test	0cee6d54-c445-4fff-9c04-895b53441dad	53dfc14b-b2cd-4c84-8283-f25a0b641b24	\N
\.


--
-- Data for Name: report; Type: TABLE DATA; Schema: forums; Owner: postgres
--

COPY forums.report (deleted, created_time, modified_time, id, member_id, target, reason, type) FROM stdin;
f	2023-05-16 09:26:04.158687	2023-05-16 09:26:04.158169	700e4be8-4bfe-4802-ae9f-6cf0751a9756	5b36da4a-80ab-494d-b7b0-8c548b8adebe	e31df840-a856-4fda-960c-c14f5831c438	test	reply
f	2023-05-16 09:44:36.228556	2023-05-16 09:44:36.228044	36e74e3f-b477-48c4-aca3-a7035b276680	5b36da4a-80ab-494d-b7b0-8c548b8adebe	e31df840-a856-4fda-960c-c14f5831c438	test	reply
f	2023-05-16 09:44:54.992226	2023-05-16 09:44:54.991715	02d7b306-f419-4bb9-bcfa-68bc2f1ec14d	5b36da4a-80ab-494d-b7b0-8c548b8adebe	e31df840-a856-4fda-960c-c14f5831c438	test	reply
f	2023-05-16 09:47:36.665467	2023-05-16 09:47:36.664436	e6c182fc-4a53-4863-ac4a-76c1699820ff	5b36da4a-80ab-494d-b7b0-8c548b8adebe	e31df840-a856-4fda-960c-c14f5831c438	test	reply
f	2023-05-16 09:49:18.897662	2023-05-16 09:49:18.89715	7b062ff8-db92-4914-98a9-8ed9dfab804f	5b36da4a-80ab-494d-b7b0-8c548b8adebe	e31df840-a856-4fda-960c-c14f5831c438	test	reply
f	2023-05-17 19:00:17.26366	2023-05-17 19:00:17.26366	d37c5265-9a62-4ca7-b5be-0a5931098e18	0cee6d54-c445-4fff-9c04-895b53441dad	b692ea79-12a8-4e10-aad1-9a35d76bc561	test	thread
\.


--
-- Data for Name: role; Type: TABLE DATA; Schema: forums; Owner: postgres
--

COPY forums.role (deleted, created_time, modified_time, id, name, description) FROM stdin;
f	2023-05-04 05:04:48.925108	2023-05-04 05:04:48.925108	fe1f2744-9d6c-47d4-aef1-0898ba822bc6	category-manager	Manage all category and its junior
f	2023-05-04 05:39:17.825175	2023-05-04 05:39:17.825175	8ef8b336-d2e3-4808-86a3-a8344d4c355b	general	General role
f	2023-05-04 05:00:51.939287	2023-05-04 05:00:51.939287	3b4d9552-879b-450e-afaf-6e17c1a74875	administrator	Manage all content
f	2023-05-04 05:14:20.690088	2023-05-04 05:14:20.690088	6b644f5a-7fd2-4fbb-9cc1-c5bd5e8bae19	forum-manager	Manage all forum and its junior
f	2023-05-04 05:15:47.612685	2023-05-04 05:15:47.612685	59ed7c97-e236-42d3-9b4c-25674c89c7d1	thread-manager	Manage all thread and its junior
\.


--
-- Data for Name: role_permission_mapping; Type: TABLE DATA; Schema: forums; Owner: postgres
--

COPY forums.role_permission_mapping (role_id, permission_id) FROM stdin;
8ef8b336-d2e3-4808-86a3-a8344d4c355b	34706b4b-4f5c-4875-bcaa-e8f4b80f87b4
8ef8b336-d2e3-4808-86a3-a8344d4c355b	d85486b4-b9ed-4204-b9bc-42d73be198fb
59ed7c97-e236-42d3-9b4c-25674c89c7d1	34706b4b-4f5c-4875-bcaa-e8f4b80f87b4
59ed7c97-e236-42d3-9b4c-25674c89c7d1	d85486b4-b9ed-4204-b9bc-42d73be198fb
59ed7c97-e236-42d3-9b4c-25674c89c7d1	3d8333d9-0ae1-4503-ab38-aac4568cd0bf
59ed7c97-e236-42d3-9b4c-25674c89c7d1	94b1b81e-a4ca-4441-a021-cf86cdb42c83
6b644f5a-7fd2-4fbb-9cc1-c5bd5e8bae19	34706b4b-4f5c-4875-bcaa-e8f4b80f87b4
6b644f5a-7fd2-4fbb-9cc1-c5bd5e8bae19	d85486b4-b9ed-4204-b9bc-42d73be198fb
6b644f5a-7fd2-4fbb-9cc1-c5bd5e8bae19	3d8333d9-0ae1-4503-ab38-aac4568cd0bf
6b644f5a-7fd2-4fbb-9cc1-c5bd5e8bae19	94b1b81e-a4ca-4441-a021-cf86cdb42c83
6b644f5a-7fd2-4fbb-9cc1-c5bd5e8bae19	91d04c2b-6d23-4852-b8ac-45e0e6fcfead
6b644f5a-7fd2-4fbb-9cc1-c5bd5e8bae19	6e425eb0-a863-4c76-9c94-ad8294f54081
fe1f2744-9d6c-47d4-aef1-0898ba822bc6	34706b4b-4f5c-4875-bcaa-e8f4b80f87b4
fe1f2744-9d6c-47d4-aef1-0898ba822bc6	d85486b4-b9ed-4204-b9bc-42d73be198fb
fe1f2744-9d6c-47d4-aef1-0898ba822bc6	3d8333d9-0ae1-4503-ab38-aac4568cd0bf
fe1f2744-9d6c-47d4-aef1-0898ba822bc6	94b1b81e-a4ca-4441-a021-cf86cdb42c83
fe1f2744-9d6c-47d4-aef1-0898ba822bc6	91d04c2b-6d23-4852-b8ac-45e0e6fcfead
fe1f2744-9d6c-47d4-aef1-0898ba822bc6	6e425eb0-a863-4c76-9c94-ad8294f54081
fe1f2744-9d6c-47d4-aef1-0898ba822bc6	0fcbc615-2f8e-4053-9db3-a4ff8c0d49a0
fe1f2744-9d6c-47d4-aef1-0898ba822bc6	169f4365-99b6-4587-aac4-44bb43e3030b
3b4d9552-879b-450e-afaf-6e17c1a74875	34706b4b-4f5c-4875-bcaa-e8f4b80f87b4
3b4d9552-879b-450e-afaf-6e17c1a74875	d85486b4-b9ed-4204-b9bc-42d73be198fb
3b4d9552-879b-450e-afaf-6e17c1a74875	3d8333d9-0ae1-4503-ab38-aac4568cd0bf
3b4d9552-879b-450e-afaf-6e17c1a74875	94b1b81e-a4ca-4441-a021-cf86cdb42c83
3b4d9552-879b-450e-afaf-6e17c1a74875	91d04c2b-6d23-4852-b8ac-45e0e6fcfead
3b4d9552-879b-450e-afaf-6e17c1a74875	6e425eb0-a863-4c76-9c94-ad8294f54081
3b4d9552-879b-450e-afaf-6e17c1a74875	0fcbc615-2f8e-4053-9db3-a4ff8c0d49a0
3b4d9552-879b-450e-afaf-6e17c1a74875	169f4365-99b6-4587-aac4-44bb43e3030b
\.


--
-- Data for Name: thread; Type: TABLE DATA; Schema: forums; Owner: postgres
--

COPY forums.thread (deleted, created_time, modified_time, id, title, content, member_id, forum_id, type) FROM stdin;
f	2023-05-08 10:57:12.724329	2023-05-08 10:57:12.723818	2748fe13-42e4-42fb-aee2-ed795834ab94	Test	Test	5b36da4a-80ab-494d-b7b0-8c548b8adebe	9b5d2890-4dea-4f98-a418-afe51a42d82a	post
f	2023-05-11 16:14:06.859017	2023-05-11 16:14:06.857461	be55dc0d-750e-41c7-8c51-a8ca807b8253	test	test	5b36da4a-80ab-494d-b7b0-8c548b8adebe	9b5d2890-4dea-4f98-a418-afe51a42d82a	post
f	2023-05-11 16:50:24.157192	2023-05-11 16:50:24.157192	f29ac71b-ad67-401e-900a-5cc46723fa4d	t	t	5b36da4a-80ab-494d-b7b0-8c548b8adebe	9b5d2890-4dea-4f98-a418-afe51a42d82a	post
f	2023-05-11 16:50:25.889803	2023-05-11 16:50:25.889803	b9b30116-51bd-4ba3-a342-ab2e53af6f65	t	t	5b36da4a-80ab-494d-b7b0-8c548b8adebe	9b5d2890-4dea-4f98-a418-afe51a42d82a	post
f	2023-05-11 16:50:26.245645	2023-05-11 16:50:26.245645	05f97b25-d34e-40de-879d-3484de077308	t	t	5b36da4a-80ab-494d-b7b0-8c548b8adebe	9b5d2890-4dea-4f98-a418-afe51a42d82a	post
f	2023-05-11 16:50:26.882128	2023-05-11 16:50:26.882128	f795ae4c-d7c4-4d26-8033-a93b476ef712	t	t	5b36da4a-80ab-494d-b7b0-8c548b8adebe	9b5d2890-4dea-4f98-a418-afe51a42d82a	post
f	2023-05-11 16:50:27.093543	2023-05-11 16:50:27.093543	a07e2bce-a6c4-4919-9f26-d3cf07cd4d01	t	t	5b36da4a-80ab-494d-b7b0-8c548b8adebe	9b5d2890-4dea-4f98-a418-afe51a42d82a	post
f	2023-05-11 16:50:27.546678	2023-05-11 16:50:27.546678	804e613f-276c-47e7-a89c-67bfb5173e81	t	t	5b36da4a-80ab-494d-b7b0-8c548b8adebe	9b5d2890-4dea-4f98-a418-afe51a42d82a	post
f	2023-05-11 16:50:28.034152	2023-05-11 16:50:28.034152	29238542-05f0-4716-9043-4f2733627a63	t	t	5b36da4a-80ab-494d-b7b0-8c548b8adebe	9b5d2890-4dea-4f98-a418-afe51a42d82a	post
f	2023-05-11 16:50:28.391084	2023-05-11 16:50:28.391084	2774e359-6ffd-490e-91c5-8085a66cef77	t	t	5b36da4a-80ab-494d-b7b0-8c548b8adebe	9b5d2890-4dea-4f98-a418-afe51a42d82a	post
f	2023-05-11 16:50:28.800708	2023-05-11 16:50:28.800708	1c68e296-e70b-4bf6-a424-49c856c0a4a6	t	t	5b36da4a-80ab-494d-b7b0-8c548b8adebe	9b5d2890-4dea-4f98-a418-afe51a42d82a	post
f	2023-05-11 16:50:29.247294	2023-05-11 16:50:29.246791	aea5ed2e-f00a-45b9-8086-5a1759abae7f	t	t	5b36da4a-80ab-494d-b7b0-8c548b8adebe	9b5d2890-4dea-4f98-a418-afe51a42d82a	post
f	2023-05-11 16:50:29.75933	2023-05-11 16:50:29.75933	b020f1d3-1bff-45e0-9a1e-3061bb0a0c6d	t	t	5b36da4a-80ab-494d-b7b0-8c548b8adebe	9b5d2890-4dea-4f98-a418-afe51a42d82a	post
f	2023-05-12 09:01:31.831156	2023-05-12 09:01:31.830645	f885e58b-daba-4c64-91fd-4ea075ce3841	t	t	0cee6d54-c445-4fff-9c04-895b53441dad	9b5d2890-4dea-4f98-a418-afe51a42d82a	post
f	2023-05-12 09:01:32.339339	2023-05-12 09:01:32.339339	eb542d9b-c4fd-4602-a025-2edffac648a0	t	t	0cee6d54-c445-4fff-9c04-895b53441dad	9b5d2890-4dea-4f98-a418-afe51a42d82a	post
f	2023-05-12 09:01:32.739002	2023-05-12 09:01:32.739002	68a37270-95b7-4bf3-aad3-777d0e76bf64	t	t	0cee6d54-c445-4fff-9c04-895b53441dad	9b5d2890-4dea-4f98-a418-afe51a42d82a	post
f	2023-05-12 09:01:33.108001	2023-05-12 09:01:33.108001	5cf62bf1-5570-4422-baf1-1df362515875	t	t	0cee6d54-c445-4fff-9c04-895b53441dad	9b5d2890-4dea-4f98-a418-afe51a42d82a	post
f	2023-05-12 09:01:33.664268	2023-05-12 09:01:33.664268	1a812d76-a231-4166-8dc4-61886a2191ef	t	t	0cee6d54-c445-4fff-9c04-895b53441dad	9b5d2890-4dea-4f98-a418-afe51a42d82a	post
f	2023-05-12 09:01:34.307129	2023-05-12 09:01:34.307129	2227ff20-a2e8-4ed1-a227-3a77ca272a9b	t	t	0cee6d54-c445-4fff-9c04-895b53441dad	9b5d2890-4dea-4f98-a418-afe51a42d82a	post
f	2023-05-12 09:01:34.425681	2023-05-12 09:01:34.425681	2d9d3863-830f-4fee-bf4b-119b7d38e8ae	t	t	0cee6d54-c445-4fff-9c04-895b53441dad	9b5d2890-4dea-4f98-a418-afe51a42d82a	post
f	2023-05-12 09:01:34.847722	2023-05-12 09:01:34.847722	9a76cf20-f570-43bd-ad64-4887c1bb8307	t	t	0cee6d54-c445-4fff-9c04-895b53441dad	9b5d2890-4dea-4f98-a418-afe51a42d82a	post
f	2023-05-12 09:01:35.197421	2023-05-12 09:01:35.197421	a2529d4c-c219-4d06-b5fd-f6f5aaeab951	t	t	0cee6d54-c445-4fff-9c04-895b53441dad	9b5d2890-4dea-4f98-a418-afe51a42d82a	post
f	2023-05-12 09:01:35.664859	2023-05-12 09:01:35.664859	c5a814a5-44af-48ab-bc8a-ef800b21be0d	t	t	0cee6d54-c445-4fff-9c04-895b53441dad	9b5d2890-4dea-4f98-a418-afe51a42d82a	post
f	2023-05-12 09:01:37.463032	2023-05-12 09:01:37.463032	caff84e6-7142-420e-b14a-43a00c9c4598	t	t	0cee6d54-c445-4fff-9c04-895b53441dad	9b5d2890-4dea-4f98-a418-afe51a42d82a	post
f	2023-05-12 09:01:37.763683	2023-05-12 09:01:37.763683	14243b20-3f3d-411d-a855-b2811ec1c4eb	t	t	0cee6d54-c445-4fff-9c04-895b53441dad	9b5d2890-4dea-4f98-a418-afe51a42d82a	post
f	2023-05-07 11:30:13.115439	2023-05-17 19:32:44.339098	b692ea79-12a8-4e10-aad1-9a35d76bc561	Welcome to ZenSquare	Welcome to ZenSquare! This is the community forum space for our open source community - here we ask questions, give answers and talk about everything related to our projects.	5b36da4a-80ab-494d-b7b0-8c548b8adebe	f6cf0cfe-2d69-4e7d-a2ae-92e74eca3dd6	post
f	2023-05-17 19:32:54.782313	2023-05-17 19:32:54.782313	8701320d-4f8d-484c-bd6c-5e9da6209d10	test	test	5b36da4a-80ab-494d-b7b0-8c548b8adebe	f6cf0cfe-2d69-4e7d-a2ae-92e74eca3dd6	post
f	2023-05-17 15:13:22.492426	2023-05-18 14:50:12.7765	53dfc14b-b2cd-4c84-8283-f25a0b641b24	Conversations	test	5b36da4a-80ab-494d-b7b0-8c548b8adebe	\N	conversation
\.


--
-- Name: alert alert_pk; Type: CONSTRAINT; Schema: forums; Owner: postgres
--

ALTER TABLE ONLY forums.alert
    ADD CONSTRAINT alert_pk PRIMARY KEY (id);


--
-- Name: alert_type alert_type_pk; Type: CONSTRAINT; Schema: forums; Owner: postgres
--

ALTER TABLE ONLY forums.alert_type
    ADD CONSTRAINT alert_type_pk PRIMARY KEY (id);


--
-- Name: category category_pk; Type: CONSTRAINT; Schema: forums; Owner: postgres
--

ALTER TABLE ONLY forums.category
    ADD CONSTRAINT category_pk PRIMARY KEY (id);


--
-- Name: image image_pk; Type: CONSTRAINT; Schema: forums; Owner: postgres
--

ALTER TABLE ONLY forums.image
    ADD CONSTRAINT image_pk PRIMARY KEY (id);


--
-- Name: member_like member_like_pk; Type: CONSTRAINT; Schema: forums; Owner: postgres
--

ALTER TABLE ONLY forums.member_like
    ADD CONSTRAINT member_like_pk PRIMARY KEY (id);


--
-- Name: member member_pk; Type: CONSTRAINT; Schema: forums; Owner: postgres
--

ALTER TABLE ONLY forums.member
    ADD CONSTRAINT member_pk PRIMARY KEY (id);


--
-- Name: member member_pk2; Type: CONSTRAINT; Schema: forums; Owner: postgres
--

ALTER TABLE ONLY forums.member
    ADD CONSTRAINT member_pk2 UNIQUE (username);


--
-- Name: member_profile member_profile_pk; Type: CONSTRAINT; Schema: forums; Owner: postgres
--

ALTER TABLE ONLY forums.member_profile
    ADD CONSTRAINT member_profile_pk PRIMARY KEY (id);


--
-- Name: member_profile member_profile_pk2; Type: CONSTRAINT; Schema: forums; Owner: postgres
--

ALTER TABLE ONLY forums.member_profile
    ADD CONSTRAINT member_profile_pk2 UNIQUE (member_id);


--
-- Name: member_profile member_profile_pk3; Type: CONSTRAINT; Schema: forums; Owner: postgres
--

ALTER TABLE ONLY forums.member_profile
    ADD CONSTRAINT member_profile_pk3 UNIQUE (nickname);


--
-- Name: permission permission_pk; Type: CONSTRAINT; Schema: forums; Owner: postgres
--

ALTER TABLE ONLY forums.permission
    ADD CONSTRAINT permission_pk PRIMARY KEY (id);


--
-- Name: permission permission_pk2; Type: CONSTRAINT; Schema: forums; Owner: postgres
--

ALTER TABLE ONLY forums.permission
    ADD CONSTRAINT permission_pk2 UNIQUE (name);


--
-- Name: thread post_pk; Type: CONSTRAINT; Schema: forums; Owner: postgres
--

ALTER TABLE ONLY forums.thread
    ADD CONSTRAINT post_pk PRIMARY KEY (id);


--
-- Name: reply reply_pk; Type: CONSTRAINT; Schema: forums; Owner: postgres
--

ALTER TABLE ONLY forums.reply
    ADD CONSTRAINT reply_pk PRIMARY KEY (id);


--
-- Name: report report_pk; Type: CONSTRAINT; Schema: forums; Owner: postgres
--

ALTER TABLE ONLY forums.report
    ADD CONSTRAINT report_pk PRIMARY KEY (id);


--
-- Name: role role_pk; Type: CONSTRAINT; Schema: forums; Owner: postgres
--

ALTER TABLE ONLY forums.role
    ADD CONSTRAINT role_pk PRIMARY KEY (id);


--
-- Name: role role_pk2; Type: CONSTRAINT; Schema: forums; Owner: postgres
--

ALTER TABLE ONLY forums.role
    ADD CONSTRAINT role_pk2 UNIQUE (name);


--
-- Name: forum thread_pk; Type: CONSTRAINT; Schema: forums; Owner: postgres
--

ALTER TABLE ONLY forums.forum
    ADD CONSTRAINT thread_pk PRIMARY KEY (id);


--
-- Name: alert alert_alert_type_id_fk; Type: FK CONSTRAINT; Schema: forums; Owner: postgres
--

ALTER TABLE ONLY forums.alert
    ADD CONSTRAINT alert_alert_type_id_fk FOREIGN KEY (alert_type_id) REFERENCES forums.alert_type(id);


--
-- Name: alert alert_member_id_fk; Type: FK CONSTRAINT; Schema: forums; Owner: postgres
--

ALTER TABLE ONLY forums.alert
    ADD CONSTRAINT alert_member_id_fk FOREIGN KEY (target_member_id) REFERENCES forums.member(id);


--
-- Name: alert alert_member_id_fk2; Type: FK CONSTRAINT; Schema: forums; Owner: postgres
--

ALTER TABLE ONLY forums.alert
    ADD CONSTRAINT alert_member_id_fk2 FOREIGN KEY (source_member_id) REFERENCES forums.member(id);


--
-- Name: conversation_mapping conversation_mapping_member_id_fk; Type: FK CONSTRAINT; Schema: forums; Owner: postgres
--

ALTER TABLE ONLY forums.conversation_mapping
    ADD CONSTRAINT conversation_mapping_member_id_fk FOREIGN KEY (member_id) REFERENCES forums.member(id);


--
-- Name: conversation_mapping conversation_mapping_thread_id_fk; Type: FK CONSTRAINT; Schema: forums; Owner: postgres
--

ALTER TABLE ONLY forums.conversation_mapping
    ADD CONSTRAINT conversation_mapping_thread_id_fk FOREIGN KEY (thread_id) REFERENCES forums.thread(id);


--
-- Name: follow_mapping member_follow_member_id_fk; Type: FK CONSTRAINT; Schema: forums; Owner: postgres
--

ALTER TABLE ONLY forums.follow_mapping
    ADD CONSTRAINT member_follow_member_id_fk FOREIGN KEY (follower_id) REFERENCES forums.member(id);


--
-- Name: follow_mapping member_follow_member_id_fk2; Type: FK CONSTRAINT; Schema: forums; Owner: postgres
--

ALTER TABLE ONLY forums.follow_mapping
    ADD CONSTRAINT member_follow_member_id_fk2 FOREIGN KEY (following_id) REFERENCES forums.member(id);


--
-- Name: member_like member_like_member_id_fk; Type: FK CONSTRAINT; Schema: forums; Owner: postgres
--

ALTER TABLE ONLY forums.member_like
    ADD CONSTRAINT member_like_member_id_fk FOREIGN KEY (member_id) REFERENCES forums.member(id);


--
-- Name: member_profile member_profile_image_id_fk; Type: FK CONSTRAINT; Schema: forums; Owner: postgres
--

ALTER TABLE ONLY forums.member_profile
    ADD CONSTRAINT member_profile_image_id_fk FOREIGN KEY (avatar) REFERENCES forums.image(id);


--
-- Name: member_profile member_profile_member_id_fk; Type: FK CONSTRAINT; Schema: forums; Owner: postgres
--

ALTER TABLE ONLY forums.member_profile
    ADD CONSTRAINT member_profile_member_id_fk FOREIGN KEY (member_id) REFERENCES forums.member(id);


--
-- Name: thread post_member_id_fk; Type: FK CONSTRAINT; Schema: forums; Owner: postgres
--

ALTER TABLE ONLY forums.thread
    ADD CONSTRAINT post_member_id_fk FOREIGN KEY (member_id) REFERENCES forums.member(id);


--
-- Name: thread post_thread_id_fk; Type: FK CONSTRAINT; Schema: forums; Owner: postgres
--

ALTER TABLE ONLY forums.thread
    ADD CONSTRAINT post_thread_id_fk FOREIGN KEY (forum_id) REFERENCES forums.forum(id);


--
-- Name: reply reply_member_id_fk; Type: FK CONSTRAINT; Schema: forums; Owner: postgres
--

ALTER TABLE ONLY forums.reply
    ADD CONSTRAINT reply_member_id_fk FOREIGN KEY (member_id) REFERENCES forums.member(id);


--
-- Name: reply reply_post_id_fk; Type: FK CONSTRAINT; Schema: forums; Owner: postgres
--

ALTER TABLE ONLY forums.reply
    ADD CONSTRAINT reply_post_id_fk FOREIGN KEY (thread_id) REFERENCES forums.thread(id);


--
-- Name: reply reply_reply_id_fk; Type: FK CONSTRAINT; Schema: forums; Owner: postgres
--

ALTER TABLE ONLY forums.reply
    ADD CONSTRAINT reply_reply_id_fk FOREIGN KEY (parent_id) REFERENCES forums.reply(id);


--
-- Name: report report_member_id_fk; Type: FK CONSTRAINT; Schema: forums; Owner: postgres
--

ALTER TABLE ONLY forums.report
    ADD CONSTRAINT report_member_id_fk FOREIGN KEY (member_id) REFERENCES forums.member(id);


--
-- Name: role_permission_mapping role_to_permission_permission_id_fk; Type: FK CONSTRAINT; Schema: forums; Owner: postgres
--

ALTER TABLE ONLY forums.role_permission_mapping
    ADD CONSTRAINT role_to_permission_permission_id_fk FOREIGN KEY (permission_id) REFERENCES forums.permission(id);


--
-- Name: role_permission_mapping role_to_permission_role_id_fk; Type: FK CONSTRAINT; Schema: forums; Owner: postgres
--

ALTER TABLE ONLY forums.role_permission_mapping
    ADD CONSTRAINT role_to_permission_role_id_fk FOREIGN KEY (role_id) REFERENCES forums.role(id);


--
-- Name: forum thread_category_id_fk; Type: FK CONSTRAINT; Schema: forums; Owner: postgres
--

ALTER TABLE ONLY forums.forum
    ADD CONSTRAINT thread_category_id_fk FOREIGN KEY (category_id) REFERENCES forums.category(id);


--
-- Name: forum thread_image_id_fk; Type: FK CONSTRAINT; Schema: forums; Owner: postgres
--

ALTER TABLE ONLY forums.forum
    ADD CONSTRAINT thread_image_id_fk FOREIGN KEY (icon) REFERENCES forums.image(id);


--
-- PostgreSQL database dump complete
--

