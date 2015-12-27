<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Warehouse - Finder</title>
  	<link href="https://fonts.googleapis.com/css?family=Lato:100" rel="stylesheet" type="text/css">

	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" type="text/css">
	<link rel="stylesheet" href="assets/css/main.css" type="text/css">

	<script src="assets/js/jquery.js"></script>
	<script src="assets/js/main.js"></script>
</head>
<body>
	<div class="container col-md-offset-1 col-xs-offset-1 col-sm-offset-1">

		<h1 class="title-text">Warehouse <small>Finder</small></h1>
		<hr>

		<div class="container col-md-offset-4 col-xs-offset-3 col-sm-offset-4"><br>

			<div class="row">
				<div class="alert alert-danger col-xs-7 col-md-3 col-sm-4 msg-error">
					<button type="button" class="close">
						<span>&times;</span>
					</button>
					<div class="msg-error-text"></div>
				</div>
			</div>
			<form action="" method="post">

				<div class="row">
					<div class="form-group col-xs-7 col-md-3 col-sm-4">
						<select name="stores" id="stores" class="form-control">
							<option disabled selected> Choose Store</option>
							<option value="store_value">Store 1</option>
							<option value="store_value">Store 2</option>
						</select>
					</div>
				</div>

				<div class="row">
					<div class="form-group col-xs-7 col-md-3 col-sm-4">
						<select name="level" id="level" class="form-control">
							<option disabled selected> Choose Level</option>
							<option value="info">Info</option>
							<option value="warning">Warning</option>
							<option value="critical">Critical</option>
						</select>
					</div>
				</div>

				<div class="row">
					<div class="form-group col-xs-7 col-md-3 col-sm-4">	
						<input type="text" id="logname" placeholder="Log Name" class="form-control">
					</div>
				</div>

				<div class="row">
					<div class="form-group col-xs-7 col-md-3 col-sm-4">
						<input type="text" id="identifier" placeholder="Identifier"  class="form-control">
					</div>
				</div>

				<div class="row">
					<div class="form-group col-xs-7 col-md-3 col-sm-4">
						<input type="number" id="limit" placeholder="Return limit (default 15)"  class="form-control" min="1" max="400">
					</div>
				</div>
				
				<!--div class="row">
					<div class="form-group col-xs-7 col-md-3 col-sm-4">	
						<input type="text" id="message" placeholder="Message part" class="form-control">
					</div>
				</div-->
				
				<div class="row">
					<div class="form-group col-xs-2 col-md-1 col-sm-1"></div>
						<button class="glyphicon glyphicon-search btn btn-default" id="search" type="button"> Search!</button>
						<button class="glyphicon glyphicon-erase btn btn-default" id="clear-request" type="button" disabled> Clear</button>
					</div>
				</div>
			</form>
		</div>

		<hr>

		<div class="container">
			<table class="table table-responsive table-hover" id="logs" hidden>
				<thead>
					<tr>
						<td>#</td>
						<td>created at</td>
						<td>updated in</td>
						<td>incidents</td>
						<td>identifier</td>
						<td>log name</td>
						<td>messages</td>
					</tr>
				</thead>
				<tbody class="table-row">
				</tbody>
			</table>
		</div>
	</div>
</body>
</html>