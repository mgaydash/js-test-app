<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <script src="../js/jquery-1.7.2.min.js" type="text/javascript"></script>
        <script src="../js/jquery-ui-1.8.21.custom.min.js" type="text/javascript"></script>
        <script src="../js/menubuilder.js" type="text/javascript"></script>
        <script src="//localhost:35729/livereload.js"></script>
        <title>
            XXXXXXXXXX
        </title>
        <script type="text/javascript">
            jQuery(document).ready(function(){
                menubuilder();
            });
        </script>
        <style>
            .prjnwd {
                background-color: #ffffff;
                border: 1px solid #5d5d5d;
                color: #333333;
                display: none;
                font-family: Arial, sans-serif;
                padding: 10px;
                position:fixed;
            }

            .prjnwd_title {
                font-size: 23px;
            }

            .prjnwd_heading {
                font-size: 18px;
            }

            .prjnwd > div {
                margin-bottom: 15px;
            }

            .prjnwd > div:last-child {
                margin-bottom: 0px;
            }

            .prjnwd_prjs_pick {
                /*text-align: center;*/
            }

            .prjnwd_prjs_pick_none {
                color: #c0c0c0;
            }

            .prjnwd_prjs_prj {
                margin-bottom: 5px;
            }

            .prjnwd_notes_label {
                display: block;
            }

            .prjnwd_notes_text {
                width: 98%;
            }

            .prjnwd_btns button {
                float: right;
                margin-left: 10px;
            }

            .prjnwd_dates_endlabel {
                margin-left: 10px;
            }
        </style>
    </head>
    <body>
        <div class="prjnwd">
            <div class="prjnwd_title">Non-working Day</div>
            <div class="prjnwd_dates">
                <label class="prjnwd_heading">Start Date</label>
                <input class="prjnwd_dates_startdate" type="text">
                <label class="prjnwd_dates_endlabel prjnwd_heading">End Date</label>
                <input class="prjnwd_dates_enddate" type="text">
            </div>
            <div class="prjnwd_prjs">
                <div class="prjnwd_heading">Projects</div>
                <div class="prjnwd_prjs_pick">
                    <!-- <span class="prjnwd_prjs_pick_none">No Projects In Date Range</span> -->
                    <div class="prjnwd_prjs_prj">
                        <input class="prjnwd_prjs_prj_cb" type="checkbox">
                        <a class="prjnwd_prjs_prj_ancor" href="#">PRJ #441 Anytime Fitness 2015 RR</a>
                        <span class="prjnwd_prjs_prj_date">7/27/15 - 7/31/15</span>
                    </div>
                    <div class="prjnwd_prjs_prj">
                        <input class="prjnwd_prjs_prj_cb" type="checkbox">
                        <a class="prjnwd_prjs_prj_ancor" href="#">PRJ #440 2014 Buffalo Wild Wings ReRoof</a>
                        <span class="prjnwd_prjs_prj_date">7/27/15 - 7/31/15</span>
                    </div>
                    <div class="prjnwd_prjs_prj">
                        <input class="prjnwd_prjs_prj_cb" type="checkbox">
                        <a class="prjnwd_prjs_prj_ancor" href="#">PRJ #435 2013 Buffalo Wild Wings: New Construction</a>
                        <span class="prjnwd_prjs_prj_date">7/27/15 - 7/31/15</span>
                    </div>
                </div>
            </div>
            <div class="prjnwd_notes">
                <label class="prjnwd_notes_label prjnwd_heading">NWD Notes</label>
                <textarea class="prjnwd_notes_text"></textarea>
            </div>
            <div class="prjnwd_btns">
                <button class="prjnwd_btns_cancel">Cancel</button>
                <button class="prjnwd_btns_save">Save</button>
            </div>
        </div>
    </body>
</html>