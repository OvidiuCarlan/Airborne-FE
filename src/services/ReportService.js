import axios from "axios";

const hostname = 'http://localhost:8080'

function sendReport(ReportItem){
    return axios.post(`${hostname}/reports`, {
        reporterId: ReportItem.reporter,
        reportedId: ReportItem.reported,
        reason: ReportItem.reason
    })
    .then(response => response.data)
}
export default{
    sendReport
}