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
    post_id uuid NOT NULL,
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
-- Name: permission_mapping; Type: TABLE; Schema: forums; Owner: postgres
--

CREATE TABLE forums.permission_mapping (
    role_id uuid NOT NULL,
    permission_id uuid NOT NULL
);


ALTER TABLE forums.permission_mapping OWNER TO postgres;

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
    thread_id uuid NOT NULL
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
    report_type_id uuid NOT NULL,
    description character varying(500) NOT NULL
);


ALTER TABLE forums.report OWNER TO postgres;

--
-- Name: report_type; Type: TABLE; Schema: forums; Owner: postgres
--

CREATE TABLE forums.report_type (
    deleted boolean DEFAULT false NOT NULL,
    created_time timestamp without time zone NOT NULL,
    modified_time timestamp without time zone NOT NULL,
    id uuid NOT NULL,
    name character varying(10) NOT NULL,
    description character varying(20) NOT NULL
);


ALTER TABLE forums.report_type OWNER TO postgres;

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
    reply_time timestamp without time zone NOT NULL,
    thread_type_id uuid NOT NULL
);


ALTER TABLE forums.thread OWNER TO postgres;

--
-- Name: thread_type; Type: TABLE; Schema: forums; Owner: postgres
--

CREATE TABLE forums.thread_type (
    deleted boolean DEFAULT false NOT NULL,
    created_time timestamp without time zone NOT NULL,
    modified_time timestamp without time zone NOT NULL,
    id uuid NOT NULL,
    name character varying(10) NOT NULL,
    description character varying(20) NOT NULL
);


ALTER TABLE forums.thread_type OWNER TO postgres;

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

COPY forums.conversation_mapping (post_id, member_id) FROM stdin;
\.


--
-- Data for Name: follow_mapping; Type: TABLE DATA; Schema: forums; Owner: postgres
--

COPY forums.follow_mapping (follower_id, following_id) FROM stdin;
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
\.


--
-- Data for Name: member; Type: TABLE DATA; Schema: forums; Owner: postgres
--

COPY forums.member (deleted, created_time, modified_time, id, username, password) FROM stdin;
f	2023-05-04 11:11:02.842339	2023-05-04 11:11:02.841823	5b36da4a-80ab-494d-b7b0-8c548b8adebe	admin	$2a$10$wSIhyxFTchfHpEK3PvvC7.YabLjkJ5w8pIXCk5lNFk4e4P7EB4l3m
f	2023-05-04 19:47:14.181918	2023-05-04 19:47:14.180898	0cee6d54-c445-4fff-9c04-895b53441dad	test	$2a$10$.rcAdUGfRSsPRnlNcdH6duavwyhMJg9gpCizmHup4ljg7GaPQXSne
\.


--
-- Data for Name: member_profile; Type: TABLE DATA; Schema: forums; Owner: postgres
--

COPY forums.member_profile (deleted, created_time, modified_time, id, member_id, nickname, birthday, location, website, description, github, bilibili, email, role_id, avatar) FROM stdin;
f	2023-05-05 15:43:31.003228	2023-05-05 15:43:31.002716	09686101-fc02-4e64-ac2e-b120ca98a3dd	5b36da4a-80ab-494d-b7b0-8c548b8adebe	Enaium	\N	\N	\N	\N	\N	\N	\N	8ef8b336-d2e3-4808-86a3-a8344d4c355b	\N
\.


--
-- Data for Name: permission; Type: TABLE DATA; Schema: forums; Owner: postgres
--

COPY forums.permission (deleted, created_time, modified_time, id, name, description) FROM stdin;
f	2023-05-04 05:53:25.754451	2023-05-04 05:53:25.754451	3d8333d9-0ae1-4503-ab38-aac4568cd0bf	recycle-post	Recycle a post
f	2023-05-04 05:53:33.585438	2023-05-04 05:53:33.585438	94b1b81e-a4ca-4441-a021-cf86cdb42c83	recycle-reply	Recycle a reply
f	2023-05-04 06:03:03.710807	2023-05-04 06:03:03.710807	0fcbc615-2f8e-4053-9db3-a4ff8c0d49a0	put-category	Create a new category or edit a category
f	2023-05-04 05:50:44.331411	2023-05-04 05:50:44.331411	d85486b4-b9ed-4204-b9bc-42d73be198fb	put-reply	Publish a new reply or edit a reply
f	2023-05-04 06:09:01.250691	2023-05-04 06:09:01.250691	6e425eb0-a863-4c76-9c94-ad8294f54081	recycle-thread	Recycle a thread
f	2023-05-04 06:09:10.526066	2023-05-04 06:09:10.526066	169f4365-99b6-4587-aac4-44bb43e3030b	recycle-category	Recycle a category
f	2023-05-04 06:02:29.385676	2023-05-04 06:02:29.385676	91d04c2b-6d23-4852-b8ac-45e0e6fcfead	put-forum	Create a new forum or edit a forum
f	2023-05-04 05:42:53.382359	2023-05-04 05:42:53.382359	34706b4b-4f5c-4875-bcaa-e8f4b80f87b4	put-thread	Publish a new thread or edit a thread
\.


--
-- Data for Name: permission_mapping; Type: TABLE DATA; Schema: forums; Owner: postgres
--

COPY forums.permission_mapping (role_id, permission_id) FROM stdin;
8ef8b336-d2e3-4808-86a3-a8344d4c355b	34706b4b-4f5c-4875-bcaa-e8f4b80f87b4
8ef8b336-d2e3-4808-86a3-a8344d4c355b	d85486b4-b9ed-4204-b9bc-42d73be198fb
59ed7c97-e236-42d3-9b4c-25674c89c7d1	34706b4b-4f5c-4875-bcaa-e8f4b80f87b4
59ed7c97-e236-42d3-9b4c-25674c89c7d1	d85486b4-b9ed-4204-b9bc-42d73be198fb
59ed7c97-e236-42d3-9b4c-25674c89c7d1	3d8333d9-0ae1-4503-ab38-aac4568cd0bf
59ed7c97-e236-42d3-9b4c-25674c89c7d1	94b1b81e-a4ca-4441-a021-cf86cdb42c83
\.


--
-- Data for Name: reply; Type: TABLE DATA; Schema: forums; Owner: postgres
--

COPY forums.reply (deleted, created_time, modified_time, id, content, member_id, thread_id) FROM stdin;
\.


--
-- Data for Name: report; Type: TABLE DATA; Schema: forums; Owner: postgres
--

COPY forums.report (deleted, created_time, modified_time, id, member_id, target, report_type_id, description) FROM stdin;
\.


--
-- Data for Name: report_type; Type: TABLE DATA; Schema: forums; Owner: postgres
--

COPY forums.report_type (deleted, created_time, modified_time, id, name, description) FROM stdin;
\.


--
-- Data for Name: role; Type: TABLE DATA; Schema: forums; Owner: postgres
--

COPY forums.role (deleted, created_time, modified_time, id, name, description) FROM stdin;
f	2023-05-04 05:00:51.939287	2023-05-04 05:00:51.939287	3b4d9552-879b-450e-afaf-6e17c1a74875	admin	Manage all content
f	2023-05-04 05:15:47.612685	2023-05-04 05:15:47.612685	59ed7c97-e236-42d3-9b4c-25674c89c7d1	post-manager	Manage all post and its junior
f	2023-05-04 05:14:20.690088	2023-05-04 05:14:20.690088	6b644f5a-7fd2-4fbb-9cc1-c5bd5e8bae19	thread-manager	Manage all thread and its junior
f	2023-05-04 05:04:48.925108	2023-05-04 05:04:48.925108	fe1f2744-9d6c-47d4-aef1-0898ba822bc6	category-manager	Manage all category and its junior
f	2023-05-04 05:39:17.825175	2023-05-04 05:39:17.825175	8ef8b336-d2e3-4808-86a3-a8344d4c355b	general	General role
\.


--
-- Data for Name: thread; Type: TABLE DATA; Schema: forums; Owner: postgres
--

COPY forums.thread (deleted, created_time, modified_time, id, title, content, member_id, forum_id, reply_time, thread_type_id) FROM stdin;
\.


--
-- Data for Name: thread_type; Type: TABLE DATA; Schema: forums; Owner: postgres
--

COPY forums.thread_type (deleted, created_time, modified_time, id, name, description) FROM stdin;
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
-- Name: thread_type post_type_pk; Type: CONSTRAINT; Schema: forums; Owner: postgres
--

ALTER TABLE ONLY forums.thread_type
    ADD CONSTRAINT post_type_pk PRIMARY KEY (id);


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
-- Name: report_type report_type_pk; Type: CONSTRAINT; Schema: forums; Owner: postgres
--

ALTER TABLE ONLY forums.report_type
    ADD CONSTRAINT report_type_pk PRIMARY KEY (id);


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
-- Name: member_profile member_profile_image_id_fk; Type: FK CONSTRAINT; Schema: forums; Owner: postgres
--

ALTER TABLE ONLY forums.member_profile
    ADD CONSTRAINT member_profile_image_id_fk FOREIGN KEY (avatar) REFERENCES forums.image(id);


--
-- Name: thread post_member_id_fk; Type: FK CONSTRAINT; Schema: forums; Owner: postgres
--

ALTER TABLE ONLY forums.thread
    ADD CONSTRAINT post_member_id_fk FOREIGN KEY (member_id) REFERENCES forums.member(id);


--
-- Name: conversation_mapping post_member_relationship_member_id_fk; Type: FK CONSTRAINT; Schema: forums; Owner: postgres
--

ALTER TABLE ONLY forums.conversation_mapping
    ADD CONSTRAINT post_member_relationship_member_id_fk FOREIGN KEY (member_id) REFERENCES forums.member(id);


--
-- Name: conversation_mapping post_member_relationship_post_id_fk; Type: FK CONSTRAINT; Schema: forums; Owner: postgres
--

ALTER TABLE ONLY forums.conversation_mapping
    ADD CONSTRAINT post_member_relationship_post_id_fk FOREIGN KEY (post_id) REFERENCES forums.thread(id);


--
-- Name: thread post_post_type_id_fk; Type: FK CONSTRAINT; Schema: forums; Owner: postgres
--

ALTER TABLE ONLY forums.thread
    ADD CONSTRAINT post_post_type_id_fk FOREIGN KEY (thread_type_id) REFERENCES forums.thread_type(id);


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
-- Name: report report_member_id_fk; Type: FK CONSTRAINT; Schema: forums; Owner: postgres
--

ALTER TABLE ONLY forums.report
    ADD CONSTRAINT report_member_id_fk FOREIGN KEY (member_id) REFERENCES forums.member(id);


--
-- Name: report report_report_type_id_fk; Type: FK CONSTRAINT; Schema: forums; Owner: postgres
--

ALTER TABLE ONLY forums.report
    ADD CONSTRAINT report_report_type_id_fk FOREIGN KEY (report_type_id) REFERENCES forums.report_type(id);


--
-- Name: permission_mapping role_to_permission_permission_id_fk; Type: FK CONSTRAINT; Schema: forums; Owner: postgres
--

ALTER TABLE ONLY forums.permission_mapping
    ADD CONSTRAINT role_to_permission_permission_id_fk FOREIGN KEY (permission_id) REFERENCES forums.permission(id);


--
-- Name: permission_mapping role_to_permission_role_id_fk; Type: FK CONSTRAINT; Schema: forums; Owner: postgres
--

ALTER TABLE ONLY forums.permission_mapping
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

