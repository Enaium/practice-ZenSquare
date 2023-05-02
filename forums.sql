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
    description character varying(50) NOT NULL
);


ALTER TABLE forums.category OWNER TO postgres;

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
-- Name: member_member_relationship; Type: TABLE; Schema: forums; Owner: postgres
--

CREATE TABLE forums.member_member_relationship (
    follower uuid NOT NULL,
    following uuid NOT NULL
);


ALTER TABLE forums.member_member_relationship OWNER TO postgres;

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
    role_id uuid NOT NULL
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
    name character varying(10) NOT NULL,
    description character varying(20) NOT NULL
);


ALTER TABLE forums.permission OWNER TO postgres;

--
-- Name: post; Type: TABLE; Schema: forums; Owner: postgres
--

CREATE TABLE forums.post (
    deleted boolean DEFAULT false NOT NULL,
    created_time timestamp without time zone NOT NULL,
    modified_time timestamp without time zone NOT NULL,
    id uuid NOT NULL,
    title character varying(50) NOT NULL,
    content text NOT NULL,
    member_id uuid NOT NULL,
    thread_id uuid,
    reply_count integer DEFAULT 0 NOT NULL,
    view_count integer DEFAULT 0 NOT NULL,
    like_count integer DEFAULT 0 NOT NULL,
    reply_time timestamp without time zone NOT NULL,
    post_type_id uuid NOT NULL
);


ALTER TABLE forums.post OWNER TO postgres;

--
-- Name: post_member_relationship; Type: TABLE; Schema: forums; Owner: postgres
--

CREATE TABLE forums.post_member_relationship (
    post_id uuid NOT NULL,
    member_id uuid NOT NULL
);


ALTER TABLE forums.post_member_relationship OWNER TO postgres;

--
-- Name: post_type; Type: TABLE; Schema: forums; Owner: postgres
--

CREATE TABLE forums.post_type (
    deleted boolean DEFAULT false NOT NULL,
    created_time timestamp without time zone NOT NULL,
    modified_time timestamp without time zone NOT NULL,
    id uuid NOT NULL,
    name character varying(10) NOT NULL,
    description character varying(20) NOT NULL
);


ALTER TABLE forums.post_type OWNER TO postgres;

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
    post_id uuid NOT NULL
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
    name character varying(10) NOT NULL,
    description character varying(20) NOT NULL
);


ALTER TABLE forums.role OWNER TO postgres;

--
-- Name: role_permission_relationship; Type: TABLE; Schema: forums; Owner: postgres
--

CREATE TABLE forums.role_permission_relationship (
    role_id uuid NOT NULL,
    permission_id uuid NOT NULL
);


ALTER TABLE forums.role_permission_relationship OWNER TO postgres;

--
-- Name: thread; Type: TABLE; Schema: forums; Owner: postgres
--

CREATE TABLE forums.thread (
    deleted boolean DEFAULT false NOT NULL,
    created_time timestamp without time zone NOT NULL,
    modified_time timestamp without time zone NOT NULL,
    id uuid NOT NULL,
    name character varying(10) NOT NULL,
    description character varying(50) NOT NULL,
    category_id uuid NOT NULL
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
\.


--
-- Data for Name: image; Type: TABLE DATA; Schema: forums; Owner: postgres
--

COPY forums.image (deleted, created_time, modified_time, id, hash) FROM stdin;
\.


--
-- Data for Name: member; Type: TABLE DATA; Schema: forums; Owner: postgres
--

COPY forums.member (deleted, created_time, modified_time, id, username, password) FROM stdin;
\.


--
-- Data for Name: member_member_relationship; Type: TABLE DATA; Schema: forums; Owner: postgres
--

COPY forums.member_member_relationship (follower, following) FROM stdin;
\.


--
-- Data for Name: member_profile; Type: TABLE DATA; Schema: forums; Owner: postgres
--

COPY forums.member_profile (deleted, created_time, modified_time, id, member_id, nickname, birthday, location, website, description, github, bilibili, email, role_id) FROM stdin;
\.


--
-- Data for Name: permission; Type: TABLE DATA; Schema: forums; Owner: postgres
--

COPY forums.permission (deleted, created_time, modified_time, id, name, description) FROM stdin;
\.


--
-- Data for Name: post; Type: TABLE DATA; Schema: forums; Owner: postgres
--

COPY forums.post (deleted, created_time, modified_time, id, title, content, member_id, thread_id, reply_count, view_count, like_count, reply_time, post_type_id) FROM stdin;
\.


--
-- Data for Name: post_member_relationship; Type: TABLE DATA; Schema: forums; Owner: postgres
--

COPY forums.post_member_relationship (post_id, member_id) FROM stdin;
\.


--
-- Data for Name: post_type; Type: TABLE DATA; Schema: forums; Owner: postgres
--

COPY forums.post_type (deleted, created_time, modified_time, id, name, description) FROM stdin;
\.


--
-- Data for Name: reply; Type: TABLE DATA; Schema: forums; Owner: postgres
--

COPY forums.reply (deleted, created_time, modified_time, id, content, member_id, post_id) FROM stdin;
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
\.


--
-- Data for Name: role_permission_relationship; Type: TABLE DATA; Schema: forums; Owner: postgres
--

COPY forums.role_permission_relationship (role_id, permission_id) FROM stdin;
\.


--
-- Data for Name: thread; Type: TABLE DATA; Schema: forums; Owner: postgres
--

COPY forums.thread (deleted, created_time, modified_time, id, name, description, category_id) FROM stdin;
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
-- Name: post post_pk; Type: CONSTRAINT; Schema: forums; Owner: postgres
--

ALTER TABLE ONLY forums.post
    ADD CONSTRAINT post_pk PRIMARY KEY (id);


--
-- Name: post_type post_type_pk; Type: CONSTRAINT; Schema: forums; Owner: postgres
--

ALTER TABLE ONLY forums.post_type
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
-- Name: thread thread_pk; Type: CONSTRAINT; Schema: forums; Owner: postgres
--

ALTER TABLE ONLY forums.thread
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
-- Name: member_member_relationship member_follow_member_id_fk; Type: FK CONSTRAINT; Schema: forums; Owner: postgres
--

ALTER TABLE ONLY forums.member_member_relationship
    ADD CONSTRAINT member_follow_member_id_fk FOREIGN KEY (follower) REFERENCES forums.member(id);


--
-- Name: member_member_relationship member_follow_member_id_fk2; Type: FK CONSTRAINT; Schema: forums; Owner: postgres
--

ALTER TABLE ONLY forums.member_member_relationship
    ADD CONSTRAINT member_follow_member_id_fk2 FOREIGN KEY (following) REFERENCES forums.member(id);


--
-- Name: post post_member_id_fk; Type: FK CONSTRAINT; Schema: forums; Owner: postgres
--

ALTER TABLE ONLY forums.post
    ADD CONSTRAINT post_member_id_fk FOREIGN KEY (member_id) REFERENCES forums.member(id);


--
-- Name: post_member_relationship post_member_relationship_member_id_fk; Type: FK CONSTRAINT; Schema: forums; Owner: postgres
--

ALTER TABLE ONLY forums.post_member_relationship
    ADD CONSTRAINT post_member_relationship_member_id_fk FOREIGN KEY (member_id) REFERENCES forums.member(id);


--
-- Name: post_member_relationship post_member_relationship_post_id_fk; Type: FK CONSTRAINT; Schema: forums; Owner: postgres
--

ALTER TABLE ONLY forums.post_member_relationship
    ADD CONSTRAINT post_member_relationship_post_id_fk FOREIGN KEY (post_id) REFERENCES forums.post(id);


--
-- Name: post post_post_type_id_fk; Type: FK CONSTRAINT; Schema: forums; Owner: postgres
--

ALTER TABLE ONLY forums.post
    ADD CONSTRAINT post_post_type_id_fk FOREIGN KEY (post_type_id) REFERENCES forums.post_type(id);


--
-- Name: post post_thread_id_fk; Type: FK CONSTRAINT; Schema: forums; Owner: postgres
--

ALTER TABLE ONLY forums.post
    ADD CONSTRAINT post_thread_id_fk FOREIGN KEY (thread_id) REFERENCES forums.thread(id);


--
-- Name: reply reply_member_id_fk; Type: FK CONSTRAINT; Schema: forums; Owner: postgres
--

ALTER TABLE ONLY forums.reply
    ADD CONSTRAINT reply_member_id_fk FOREIGN KEY (member_id) REFERENCES forums.member(id);


--
-- Name: reply reply_post_id_fk; Type: FK CONSTRAINT; Schema: forums; Owner: postgres
--

ALTER TABLE ONLY forums.reply
    ADD CONSTRAINT reply_post_id_fk FOREIGN KEY (post_id) REFERENCES forums.post(id);


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
-- Name: role_permission_relationship role_to_permission_permission_id_fk; Type: FK CONSTRAINT; Schema: forums; Owner: postgres
--

ALTER TABLE ONLY forums.role_permission_relationship
    ADD CONSTRAINT role_to_permission_permission_id_fk FOREIGN KEY (permission_id) REFERENCES forums.permission(id);


--
-- Name: role_permission_relationship role_to_permission_role_id_fk; Type: FK CONSTRAINT; Schema: forums; Owner: postgres
--

ALTER TABLE ONLY forums.role_permission_relationship
    ADD CONSTRAINT role_to_permission_role_id_fk FOREIGN KEY (role_id) REFERENCES forums.role(id);


--
-- Name: thread thread_category_id_fk; Type: FK CONSTRAINT; Schema: forums; Owner: postgres
--

ALTER TABLE ONLY forums.thread
    ADD CONSTRAINT thread_category_id_fk FOREIGN KEY (category_id) REFERENCES forums.category(id);


--
-- PostgreSQL database dump complete
--

