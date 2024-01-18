import TokenManager from "../services/TokenManager";
import styles from "./userDetails.module.css";
import LogoPNG from '../assets/images/LogoPNG.png';
import Avatar from '../assets/images/Avatar.png';
import warning from '../assets/images/warning.png'
import React, { useState } from 'react';
import ReportService from "../services/ReportService";


function ReportModal({ onClose, onReport }) {
const [reportText, setReportText] = useState('');

const handleReport = () => {
    onReport(reportText);

    onClose();
};

return (
    <div className={styles['modal-overlay']}>
    <div className={styles['report-modal']}>
        <textarea
        placeholder="Enter your report..."
        value={reportText}
        onChange={(e) => setReportText(e.target.value)}
        />
        <div className={styles['report-buttons-box']}>
            <button onClick={handleReport} className={styles['report-buttons']}>Submit Report</button>
            <button onClick={onClose} className={styles['report-buttons']}>Cancel</button>
        </div>        
    </div>
    </div>
    );
}


function UserDetails(props) {
    const userDetails = props.userDetails.data;
    const claims = TokenManager.getClaims();
    const id = claims.userId;

    const [isReportModalOpen, setReportModalOpen] = useState(false);
    const openReportModal = () => setReportModalOpen(true);
    const closeReportModal = () => setReportModalOpen(false);

    const sendReport = (report) =>{
        ReportService.sendReport(report)
        .then(data => {
            alert(`Report sent. Report ID: ${data.id}`);
        })
        .catch(response => {
            alert(response.code);
        })
        .finally(() => {
            console.log('Sent');
        })
    }

    const handleReportSubmit = async (reportText) => {
        console.log(`Report submitted: ${reportText}`);

        const report = {
            reporter: id,
            reported: userDetails.id,
            reason: reportText
        };

        try {
            await sendReport(report);            
        } catch(error) {
            console.log('Error sending report:', error);
            alert(error.code);
        }

    };

    const showWarningImage = id !== userDetails.id && !isReportModalOpen;

    return (
        <div className={styles['user-details-container']}>

            <div className={styles['user-details-top-container']}>

                <div className={styles['avatar-container']}>
                    <img src={Avatar} alt='Logo' className={styles['avatar']}/>
                </div>

                <div className={styles['logo-container']}>
                    <img src={LogoPNG} alt='Logo' className={styles['logo']}/>  
                </div>  

            </div>


            <div className={styles['user-details-bootom-container']}>
                <div className={styles['user-details-bootom-container-left']}>
                    <p className={styles['user-info']}><b>{userDetails.name}</b></p>
                    <p className={styles['user-info']}><b>{userDetails.email}</b></p>
                </div>
                <div className={styles['user-details-bootom-container-right']}>
                    {showWarningImage && <img src={warning} alt='Logo' className={styles['report']} onClick={openReportModal}/>}
                </div>
                
            </div>
            {isReportModalOpen && (
                <ReportModal
                onClose={closeReportModal}
                onReport={handleReportSubmit}
                />
            )}
        </div>
    );
}
export default UserDetails;
