function reportListQuery() {

    $('#reportListTable').empty();

    var reportListQueryUrl = config.fhirRoot + "/DiagnosticReport?subject=Patient/" + patientResourceId;

    $.ajax({
        url: reportListQueryUrl,
        headers: {
            "Accept" : "application/json"
        },
        success: function(data) {
            console.log(data);
            data.entry.forEach(function(report) {
                var dateTime = report.content.issued;
                var text = report.content.name.text;
                var acc = report.content.identifier ? report.content.identifier.value : '';
                var reportRow = '<tr><td>' +
                    dateTime + '</td><td>' +
                    acc +'</td><td>' +
                    text + '</td><td>' +
                    '</tr>';
                var reportRowElement = $(reportRow).appendTo('#reportListTable');
                $(reportRowElement).click(function() {
                    reportViewInit(report.id);
                });
            });
            reportViewInit(data.entry[0].id);
        },
        error: function() {
        alert('error');
        }
    });
}

function reportListInit() {
    reportListQuery();


}