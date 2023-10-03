document.getElementById('copyCalculatorUrl').addEventListener('click', function() {
    const el = document.createElement('textarea');
    el.value = document.getElementById('meeting-cost-url').innerText;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    alert('Link copied to clipboard!');
});