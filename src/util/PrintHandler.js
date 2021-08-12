import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const downloadPdf = (divId) => {
    const el = document.getElementById(divId);
    html2canvas(el).then((canvas) => { 
        el.remove(); 
        var imgData = canvas.toDataURL(
            'image/png');              
        var doc = new jsPDF('l', 'in', [8.35, 4.65]);
        doc.addImage(imgData, 'PNG', 0, 0);
        doc.save('certificate.pdf');
    });
};

const generateCertificate = (event) => {
    const name = `${event.participant.userObj.f_name} ${event.participant.userObj.l_name}`;
        const e_Date = event.e_date.toDate().toLocaleDateString();
        const wrapper = document.createElement('div');
        wrapper.setAttribute('id', 'certificate-wrapper');
        const nameDiv = document.createElement('div');
        nameDiv.setAttribute('id', 'name-div');
        nameDiv.innerHTML = name;
        wrapper.appendChild(nameDiv);
        const dateDiv = document.createElement('div');
        dateDiv.setAttribute('id', 'date-div');
        dateDiv.innerHTML = e_Date;
        wrapper.appendChild(dateDiv);
        const testDiv = document.getElementById('certificate-test');
        testDiv.appendChild(wrapper);
        downloadPdf('certificate-wrapper');
}

export default generateCertificate;

