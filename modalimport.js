
function getmymodal(currenttag){

var modaldisplay = '<div class="modal fade popovercallModal"><div class="modal-dialog modal-sm"><div class="modal-content"><div class="modal-header" style=" background: #A40017;"><button type="button" class="close" data-dismiss="modal" aria-hidden="true" style="color: white" >&times;</button><h4 class="modal-title" style="color: white">Hash Tag</h4></div><div class="modal-body"><div id = "popovertext"></div><input type = "text" id = "popoverinputtext" value = "'+currenttag+'"> </div><div class="modal-footer"><button type="button" class="btn btn-primary" data-dismiss="modal" style=" background: #A40017; padding: 10px 20px 10px 20px;  border-radius: 0px; outline-color: white; border: solid #000000 0px;" >Close</button><button type="button" class="btn btn-primary popsubmit"  data-dismiss = "modal" id = "popsubmit1" style=" background: #A40017; padding: 10px 20px 10px 20px;  border-radius: 0px; outline-color: white; border: solid #000000 0px;">Submit</button></div></div></div></div>';
return modaldisplay;
}

function getmodal(currenttag){

var modaldisplay = '<div class="modal fade popovercallModal"><div class="modal-dialog modal-sm"><div class="modal-content"><div class="modal-header" style=" background: #A40017;"><button type="button" class="close" data-dismiss="modal" aria-hidden="true" style="color: white" >&times;</button><h4 class="modal-title" style="color: white">Annotation</h4></div><div class="modal-body"><div id = "popovertext"></div><input type = "text" id = "popoverinputtext" value = "'+currenttag+'"> </div><div class="modal-footer"><button type="button" class="btn btn-primary" data-dismiss="modal" style=" background: #A40017; padding: 10px 20px 10px 20px;  border-radius: 0px; outline-color: white; border: solid #000000 0px;" >Close</button><button type="button" class="btn btn-primary popsubmit"  data-dismiss = "modal" id = "popsubmit1" style=" background: #A40017; padding: 10px 20px 10px 20px;  border-radius: 0px; outline-color: white; border: solid #000000 0px;">Submit</button></div></div></div></div>';
return modaldisplay;
}

function getmergemodal(){

var mergemodaldisplay = '<div id="mergemodal" class="modal fade"><div class="modal-dialog modal-sm"><div class="modal-content"><div class="modal-header" style=" background: #A40017;"><button type="button" class="close" data-dismiss="modal" aria-hidden="true" style="color: white" >&times;</button><h4 class="modal-title" style="color: white">Merge</h4></div><div class="modal-body"><div id = "mergeptextall"></div><input type = "text" value = "default" id = "mergekeytext" value = "Default"><div id = "checkboxformerge"></div></div><div class="modal-footer"><button type="button" class="btn btn-primary" data-dismiss="modal" style=" background: #A40017; padding: 10px 20px 10px 20px;  border-radius: 0px; outline-color: white; border: solid #000000 0px;" >Close</button><button type="button" class="btn btn-primary"  data-dismiss = "modal" id = "mergesubmit" style=" background: #A40017; padding: 10px 20px 10px 20px;  border-radius: 0px; outline-color: white; border: solid #000000 0px;">Submit</button></div></div></div></div>';
return mergemodaldisplay;
}


function getsavemodal(){

var savemmodaldisplay = '<div id="savecallModal" class="modal fade"><div class="modal-dialog modal-sm"><div class="modal-content"><div class="modal-header" style=" background: #A40017;"><button type="button" class="close" data-dismiss="modal" aria-hidden="true" style="color: white" >&times;</button><h4 class="modal-title" style="color: white">Save</h4></div><div class="modal-body"><div id = "ptextall"></div><input type = "text" value = "default" id = "keytext" value = "Default"></div><div class="modal-footer"><button type="button" class="btn btn-primary" data-dismiss="modal" style=" background: #A40017; padding: 10px 20px 10px 20px;  border-radius: 0px; outline-color: white; border: solid #000000 0px;" >Close</button><button type="button" class="btn btn-primary savesubmit"  data-dismiss = "modal" id = "savesubmit2" style=" background: #A40017; padding: 10px 20px 10px 20px;  border-radius: 0px; outline-color: white; border: solid #000000 0px;">Submit</button></div></div></div></div>';
return savemmodaldisplay;
}

function getsavefoldermodal(){
	var savefoldermodaldisplay = '<div id="savefoldermodal" class="modal fade"><div class="modal-dialog modal-sm"><div class="modal-content"><div class="modal-header" style=" background: #A40017;"><button type="button" class="close" data-dismiss="modal" aria-hidden="true" style="color: white" >&times;</button><h4 class="modal-title" style="color: white">Save to folder</h4></div><div class="modal-body"><div id = "savefoldertextall"></div><input type = "text" value = "default" id = "savefolderkeytext" value = "Default"><div id = "checkboxforsavefolder"></div></div><div class="modal-footer"><button type="button" class="btn btn-primary" data-dismiss="modal" style=" background: #A40017; padding: 10px 20px 10px 20px;  border-radius: 0px; outline-color: white; border: solid #000000 0px;" >Close</button><button type="button" class="btn btn-primary"  data-dismiss = "modal" id = "savefoldersubmit" style=" background: #A40017; padding: 10px 20px 10px 20px;  border-radius: 0px; outline-color: white; border: solid #000000 0px;">OK</button></div></div></div></div>';
	return savefoldermodaldisplay;
}

function getclearallclick(){
	var clearclickmodal = '<div id="clearclickmodal" class="modal fade"><div class="modal-dialog modal-sm"><div class="modal-content"><div class="modal-header" style=" background: #A40017;"><button type="button" class="close" data-dismiss="modal" aria-hidden="true" style="color: white" >&times;</button><h4 class="modal-title" style="color: white">clear all</h4></div><div class="modal-body"><div>Are You sure you want to clear all</div></div><div class="modal-footer"><button type="button" class="btn btn-primary" data-dismiss="modal" style=" background: #A40017; padding: 10px 20px 10px 20px;  border-radius: 0px; outline-color: white; border: solid #000000 0px;" >Close</button><button type="button" class="btn btn-primary"  data-dismiss = "modal" id = "clearclicksubmit" style=" background: #A40017; padding: 10px 20px 10px 20px;  border-radius: 0px; outline-color: white; border: solid #000000 0px;">Clear</button></div></div></div></div>';
	return clearclickmodal;
}

function getfolderdelete(){
	var clearclickmodal = '<div id="folderdeletemodal" class="modal fade"><div class="modal-dialog modal-sm"><div class="modal-content"><div class="modal-header" style=" background: #A40017;"><button type="button" class="close" data-dismiss="modal" aria-hidden="true" style="color: white" >&times;</button><h4 class="modal-title" style="color: white">clear all</h4></div><div class="modal-body"><div>Are you sure?<br> Undo is disabled for folder</div></div><div class="modal-footer"><button type="button" class="btn btn-primary" data-dismiss="modal" style=" background: #A40017; padding: 10px 20px 10px 20px;  border-radius: 0px; outline-color: white; border: solid #000000 0px;" >Close</button><button type="button" class="btn btn-primary"  data-dismiss = "modal" id = "folderdeletesubmit" style=" background: #A40017; padding: 10px 20px 10px 20px;  border-radius: 0px; outline-color: white; border: solid #000000 0px;">Delete</button></div></div></div></div>';
	return clearclickmodal;
}