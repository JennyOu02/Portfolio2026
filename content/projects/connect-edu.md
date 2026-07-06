---
title: Connect.edu — CRM Matching System
tagline: A SaaS platform that pairs students with the best-fit agent for every programme, automatically.
category: Web Apps
kind: Academic
org: Queen Mary University of London — Final Year Project
role: Full-Stack Engineer
period: Oct 2023 – Apr 2024
location: London, UK
cover: /img/project_img/connectpic.png
featured: true
order: 4
tags:
  - Python
  - Django
  - Vue.js
  - REST API
  - PostgreSQL
  - AJAX
  - jQuery
  - SaaS
context: >-
  International educational institutions offer multiple programmes at once —
  study abroad, summer trips, J1 placements — and each student needs to be
  paired with the agent best suited to their specific requirements.
problem: >-
  Matching students to agents was manual, inconsistent and dependent on staff
  memory. Institutions needed accurate, customised matching that internal staff
  could operate with no IT background at all.
solution:
  - Engineered a prioritised-condition matching system delivered as a SaaS platform, using Python Django (backend) and Vue.js (frontend) with an ORM-integrated REST API architecture.
  - Built a no-code rule system — administrators add matching categories and tags per programme, which automatically become the questions students and agents answer on their forms.
  - "Automated the pairing: when a student books an appointment, the engine matches them with the best available agent for that programme."
  - Implemented AJAX-driven asynchronous data updates and CRUD operations over the database for scalable data management, and validated matching logic against external data sources.
impact:
  - value: No-code
    label: rule setup operable by non-technical staff
  - value: Auto
    label: student–agent matching at the moment of booking
  - value: 3 portals
    label: dedicated admin, student and agent experiences
gallery:
  - src: /img/proj_1/loginpage.png
    caption: Login page
  - src: /img/proj_1/adminprogramme.png
    caption: Admin — programme setup
  - src: /img/proj_1/admincate.png
    caption: Admin — matching categories
  - src: /img/proj_1/adminrule.png
    caption: Admin — rule configuration
  - src: /img/proj_1/adminmatch.png
    caption: Admin — match results
  - src: /img/proj_1/studentmain.png
    caption: Student — main dashboard
  - src: /img/proj_1/studentgeneral.png
    caption: Student — general information
  - src: /img/proj_1/studentbook.png
    caption: Student — booking an appointment
  - src: /img/proj_1/studentprofile.png
    caption: Student — profile
  - src: /img/proj_1/agentmain.png
    caption: Agent — main dashboard
  - src: /img/proj_1/agentgeneral.png
    caption: Agent — general information
  - src: /img/proj_1/agentjoin.png
    caption: Agent — joining a programme
  - src: /img/proj_1/agentprofile.png
    caption: Agent — profile
links:
  - label: Showcase Video
    url: https://www.youtube.com/watch?v=BRutAykgeG8
---
