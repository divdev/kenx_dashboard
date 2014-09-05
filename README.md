gopher_dashboard
================

Dashboard for Gopher EHR

This is eventually going to be an interactive tool for exploration into the patient's record of events and for modifying their charts quickly (adding a visit note, ordering a couple of medications, easily renewing/discontinuing medications, and so on).

Quite a few things don't yet work on the exploration side of things:
The timeline slider should begin on the last event in the patient's record
Scrubbing the timeline should display the note for that session
It should also display which meds were in the medlist, problems in the problems list, and allergies in the allergies list
It should remove (and animate out) all meds (and other) that didn't exist prior to the date the timeline slider is on
It should add meds (and other) that were added for a given date and also provide info about what happened to them on a given date (e.g., did the patient report taking the medications?)

