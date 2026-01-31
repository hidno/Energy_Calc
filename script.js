let virsrakstasGrafiks = null;
let metriskaisMode = true;

document.querySelectorAll('.unit-btn').forEach(btn => {
    btn.addEventListener('click', e => {
        document.querySelectorAll('.unit-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        metriskaisMode = e.target.dataset.units === 'metriskais';
        document.getElementById('svarEtiķete').textContent = metriskaisMode ? 'Svars (kg):' : 'Svars (lbs):';
        document.getElementById('augumEtiķete').textContent = metriskaisMode ? 'Augums (cm):' : 'Augums (in):';});});

document.getElementById('aprekeinu').addEventListener('click', () => {
    const dzimums = document.getElementById('dzimums').value;
    const vecums = parseFloat(document.getElementById('vecums').value);
    const svars = parseFloat(document.getElementById('svars').value);
    const augums = parseFloat(document.getElementById('augums').value);
    const aktivitate = parseFloat(document.getElementById('aktivitate').value);
    const merkis = document.getElementById('merkis').value;

    if (!vecums || !svars || !augums) {alert('Lūdzu, ievadiet visus datus');return;}

    let svarsSvarigi = svars;
    let augumsSvarigi = augums;
    if (!metriskaisMode) {svarsSvarigi = svars * 0.453592;augumsSvarigi = augums * 2.54;}

    const bmr = dzimums === 'virs'
        ? 88.362 + (13.397 * svarsSvarigi) + (4.799 * augumsSvarigi) - (5.677 * vecums)
        : 447.593 + (9.247 * svarsSvarigi) + (3.098 * augumsSvarigi) - (4.330 * vecums);

    const tdee = bmr * aktivitate;

    let dienaMerkis = tdee;
    if (merkis === 'zaudetSvaru') dienaMerkis = tdee - 500;
    else if (merkis === 'paaugstinaSvaru') dienaMerkis = tdee + 500;

    const olbG = (dienaMerkis * 0.30) / 4;
    const takuG = (dienaMerkis * 0.25) / 9;
    const oglG = (dienaMerkis * 0.45) / 4;
    const olbKcal = olbG * 4;
    const takuKcal = takuG * 9;
    const oglKcal = oglG * 4;

    document.getElementById('bmrVert').textContent = Math.round(bmr);
    document.getElementById('tdeeVert').textContent = Math.round(tdee);
    document.getElementById('merkisVert').textContent = Math.round(dienaMerkis);

    document.getElementById('olbG').textContent = Math.round(olbG);
    document.getElementById('takuG').textContent = Math.round(takuG);
    document.getElementById('oglG').textContent = Math.round(oglG);
    document.getElementById('olbKcal').textContent = Math.round(olbKcal);
    document.getElementById('takuKcal').textContent = Math.round(takuKcal);
    document.getElementById('oglKcal').textContent = Math.round(oglKcal);
    document.getElementById('olbProc').textContent = Math.round((olbKcal / dienaMerkis) * 100) + '%';
    document.getElementById('takuProc').textContent = Math.round((takuKcal / dienaMerkis) * 100) + '%';
    document.getElementById('oglProc').textContent = Math.round((oglKcal / dienaMerkis) * 100) + '%';

    const brokal = dienaMerkis * 0.28;
    const pus = dienaMerkis * 0.35;
    const vak = dienaMerkis * 0.25;
    const uzk = dienaMerkis * 0.12;

    document.getElementById('brokalKcal').textContent = Math.round(brokal);
    document.getElementById('brokalOlb').textContent = Math.round((brokal * 0.30) / 4) + 'g';
    document.getElementById('brokalTak').textContent = Math.round((brokal * 0.25) / 9) + 'g';
    document.getElementById('brokalOgl').textContent = Math.round((brokal * 0.45) / 4) + 'g';

    document.getElementById('pusKcal').textContent = Math.round(pus);
    document.getElementById('pusOlb').textContent = Math.round((pus * 0.30) / 4) + 'g';
    document.getElementById('pusTak').textContent = Math.round((pus * 0.25) / 9) + 'g';
    document.getElementById('pusOgl').textContent = Math.round((pus * 0.45) / 4) + 'g';

    document.getElementById('vakKcal').textContent = Math.round(vak);
    document.getElementById('vakOlb').textContent = Math.round((vak * 0.30) / 4) + 'g';
    document.getElementById('vakTak').textContent = Math.round((vak * 0.25) / 9) + 'g';
    document.getElementById('vakOgl').textContent = Math.round((vak * 0.45) / 4) + 'g';

    document.getElementById('uzkKcal').textContent = Math.round(uzk);
    document.getElementById('uzkOlb').textContent = Math.round((uzk * 0.30) / 4) + 'g';
    document.getElementById('uzkTak').textContent = Math.round((uzk * 0.25) / 9) + 'g';
    document.getElementById('uzkOgl').textContent = Math.round((uzk * 0.45) / 4) + 'g';

    document.getElementById('rezultati').classList.remove('hidden');

    const ctx = document.getElementById('makroGrafiks').getContext('2d');
    if (virsrakstasGrafiks) virsrakstasGrafiks.destroy();
    virsrakstasGrafiks = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Olbaltumvielas', 'Tauki', 'Ogļhidrāti'],
            datasets: [{
                data: [Math.round(olbG), Math.round(takuG), Math.round(oglG)],
                backgroundColor: ['#1fa84f', '#16a34a', '#22c55e']}]},
        options: {responsive: true,maintainAspectRatio: false,plugins: {legend: { position: 'bottom' }}}});});
