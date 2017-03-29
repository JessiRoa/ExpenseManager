<%-- The following 4 lines are ASP.NET directives needed when using SharePoint components --%>

<%@ Page Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" MasterPageFile="~masterurl/default.master" Language="C#" %>

<%@ Register TagPrefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

<%-- The markup and script in the following Content element will be placed in the <head> of the page --%>
<asp:Content ContentPlaceHolderID="PlaceHolderAdditionalPageHead" runat="server">
    <meta name="WebPartPageExpansion" content="full" />
    <link type="text/css" href="../Content/bootstrap.min.css" rel="stylesheet" />
    <%--<link type="text/css" href="../Content/bootstrap-dialog.css" rel="stylesheet" />--%>
    <link href="../Content/materialize/css/materialize.min.css" rel="stylesheet" />
    <link type="text/css" href="../Content/App.css" rel="Stylesheet"/>

    <!-- javascript references added to the following file -->
    <script type="text/javascript" src="../Scripts/jquery-3.1.1.min.js"></script>
    <script type="text/javascript" src="../Scripts/bootstrap.min.js"></script>
    <%--<script type="text/javascript" src="../Scripts/bootstrap-dialog.js"></script>--%>
    <script src="../Scripts/materialize/materialize.min.js"></script>
    <script src="../Scripts/moment-with-locales.min.js"></script>
    <script type="text/javascript" src="../Scripts/App.js"></script>
</asp:Content>

<%-- The markup in the following Content element will be placed in the TitleArea of the page --%>
<asp:Content ContentPlaceHolderID="PlaceHolderPageTitleInTitleArea" runat="server">
    Expense Manager
</asp:Content>

<%-- The markup and script in the following Content element will be placed in the <body> of the page --%>
<asp:Content ContentPlaceHolderID="PlaceHolderMain" runat="server">
    <div class="container">
        <div class="col s12">
            <div class="row">
                <div class="col s12" id="display">
                    <div class="row" id="list">
                        <table class="bordered" id="detailList">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Description</th>
                                   <%-- <th>Date</th>--%>
                                    <th>Category</th>
                                    <th>Amount</th>
                                </tr>
                            </thead>
                           <tbody></tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col s12">
                    <a class="waves-effect waves-light btn" id="addIncome" onclick='addNewFile();' data-toggle="modal" data-target="#newIncome">Add Income</a>
                    <a class="waves-effect waves-light btn" id="addPayment" data-toggle="modal" data-target="#newPayment">Add Payment</a>
                </div>
            </div>
        </div>


        <!-- Modal dialog -->
        <div class="modal fade" id="newIncome">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title" id="myModalLabel">New Income</h4>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <form class="col s12">
                              <div class="row">
                                <div class="input-field col s12">
                                  <input id="name" type="text" class="validate">
                                  <label for="name">Name</label>
                                </div>
                              </div>
                              <div class="row">
                                <div class="input-field col s12">
                                  <input id="amount" type="number" class="validate">
                                  <label for="name">Amount</label>
                                </div>
                              </div>
                             <div class="row">
                                <div class="input-field col s12">
                                    <input type="text" id="description" class="validate">
                                  <label for="description">Description</label>
                                </div>
                              </div>
                            </form>
                          </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary" id="submitForm">Save</button>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->

        <!-- Modal dialog -->
        <div class="modal fade" id="newPayment">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title">New Payment</h4>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <form class="col s12">
                              <div class="row">
                                <div class="input-field col s12">
                                  <input id="name" type="text" class="validate">
                                  <label for="name">Name</label>
                                </div>
                              </div>
                              <div class="row">
                                <div class="input-field col s12">
                                  <input id="amount" type="number" class="validate">
                                  <label for="name">Amount</label>
                                </div>
                              </div>
                              <div class="row">
                                <div class="input-field col s12">
                                 <input type="date" id="date" class="datepicker">
                                    <label for="date">Date</label>
                                </div>
                              </div>
                                <div class="row">
                                    <div class="input-field col s12">
                                        <select id="cateogries">
                                            <option value="" disabled selected>Choose category</option>
                                        </select>
                                        <label>Category</label>
                                    </div>
                                </div>
                              <div class="row">
                                <div class="input-field col s12">
                                  <textarea id="description" class="materialize-textarea"></textarea>
                                    <label for="description">Description</label>
                                </div>
                              </div>
                            </form>
                          </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary" id="submitForm">Save</button>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->

        
    </div>
    <script type="text/javascript">
        $('.datepicker').pickadate({
            selectMonths: true, // Creates a dropdown to control month
            selectYears: 15 // Creates a dropdown of 15 years to control year
        });


        
    </script>
    
</asp:Content>
