document.getElementById('student-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const form = e.target;
    const data = {
      name: form.name.value,
      dob: form.dob.value,
      subject: form.subject.value,
      location: form.location.value
    };
  
    const res = await fetch('/.netlify/functions/submit-form', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  
    const status = document.getElementById('status');
    if (res.ok) {
      status.innerText = '✅ Submitted!';
      form.reset();
    } else {
      status.innerText = '❌ Submission failed.';
    }
  });
  