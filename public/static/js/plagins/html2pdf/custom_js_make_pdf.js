



$(document).ready(_ => {
    const options = {
        margin: 0.5,
        filename: 'result-sheet.pdf',
        image: {
            type: 'jpeg',
            quality: 500
        },
        html2canvas: {
            scale: 1
        },
        jsPDF: {
            unit: 'in',
            format: 'letter',
            orientation: 'portrait'
        }
    }

    $('.pdf-download-btn').click(function (e) {
        e.preventDefault();
        const element = document.getElementById('printable');
        html2pdf().from(element).set(options).save();
    });
})
