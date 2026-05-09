// =============================================
// SJF vs Priority Scheduling Simulator
// Both algorithms: Non-Preemptive
// Priority Rule: Lower number = Higher priority
// Tie-breaking: Earlier arrival time wins
// =============================================

var processes = [];

// ── SCENARIOS ──────────────────────────────
// Scenario A: Basic mixed workload - different arrival times and burst times
// Scenario B: Conflict - short-burst low-priority vs long-burst high-priority
// Scenario C: Starvation sensitive - one process waits much longer under Priority

var SCENARIOS = {
  A: [
    { pid: 'P1', at: 0, bt: 5, pr: 2 },
    { pid: 'P2', at: 1, bt: 3, pr: 1 },
    { pid: 'P3', at: 2, bt: 8, pr: 4 },
    { pid: 'P4', at: 3, bt: 6, pr: 2 }
  ],
  B: [
    { pid: 'P1', at: 0, bt: 2,  pr: 5 },
    { pid: 'P2', at: 0, bt: 10, pr: 1 },
    { pid: 'P3', at: 1, bt: 4,  pr: 3 },
    { pid: 'P4', at: 2, bt: 1,  pr: 4 }
  ],
  C: [
    { pid: 'P1', at: 0, bt: 10, pr: 5 },
    { pid: 'P2', at: 1, bt: 2,  pr: 1 },
    { pid: 'P3', at: 2, bt: 2,  pr: 1 },
    { pid: 'P4', at: 3, bt: 2,  pr: 1 },
    { pid: 'P5', at: 4, bt: 3,  pr: 2 }
  ]
};

function loadScenario(key) {
  if (key === 'D') {
    hideResults();
    document.getElementById('validation-section').classList.remove('hidden');
    return;
  }
  processes = SCENARIOS[key].map(function(p) { return Object.assign({}, p); });
  renderTable();
  showErr('');
  hideResults();
}

// Reset input fields only
function resetInputs() {
  document.getElementById('i-pid').value = '';
  document.getElementById('i-at').value  = '';
  document.getElementById('i-bt').value  = '';
  document.getElementById('i-pr').value  = '';
  var msgEl = document.getElementById('err-msg');
  msgEl.textContent = '';
  msgEl.style.color = '#e74c3c';
}

// Delete all process data
function deleteData() {
  processes = [];
  renderTable();
  var msgEl = document.getElementById('err-msg');
  msgEl.textContent = '';
  msgEl.style.color = '#e74c3c';
  hideResults();
}

function hideResults() {
  document.getElementById('gantt-section').classList.add('hidden');
  document.getElementById('results-section').classList.add('hidden');
  document.getElementById('comparison-section').classList.add('hidden');
  document.getElementById('validation-section').classList.add('hidden');
}

// ── VALIDATION & ADD ───────────────────────
function showErr(msg) {
  document.getElementById('err-msg').textContent = msg;
}

function addProcess() {
  var pid  = document.getElementById('i-pid').value.trim();
  var atV  = document.getElementById('i-at').value.trim();
  var btV  = document.getElementById('i-bt').value.trim();
  var prV  = document.getElementById('i-pr').value.trim();

  // Check all fields filled
  if (!pid || atV === '' || btV === '' || prV === '') {
    return showErr('All fields are required.');
  }

  // Check numeric
  if (isNaN(atV) || isNaN(btV) || isNaN(prV)) {
    return showErr('Arrival Time, Burst Time, and Priority must be numbers.');
  }

  var at = parseInt(atV);
  var bt = parseInt(btV);
  var pr = parseInt(prV);

  // Check valid values
  if (at < 0)          return showErr('Arrival Time cannot be negative.');
  if (bt <= 0)         return showErr('Burst Time must be greater than zero.');
  if (pr < 1 || pr > 99) return showErr('Priority must be between 1 and 99.');

  // Check duplicate
  for (var i = 0; i < processes.length; i++) {
    if (processes[i].pid === pid) {
      return showErr('Duplicate Process ID — each process must be unique.');
    }
  }

  processes.push({ pid: pid, at: at, bt: bt, pr: pr });
  showErr('');
  document.getElementById('i-pid').value = '';
  document.getElementById('i-at').value  = '';
  document.getElementById('i-bt').value  = '';
  document.getElementById('i-pr').value  = '';
  renderTable();
}

function removeProcess(pid) {
  processes = processes.filter(function(p) { return p.pid !== pid; });
  renderTable();
}

function renderTable() {
  var tbody = document.getElementById('proc-tbody');
  var hint  = document.getElementById('empty-hint');
  var table = document.getElementById('proc-table');

  if (processes.length === 0) {
    tbody.innerHTML = '';
    hint.style.display  = 'block';
    table.style.display = 'none';
    return;
  }

  hint.style.display  = 'none';
  table.style.display = '';

  tbody.innerHTML = '';
  for (var i = 0; i < processes.length; i++) {
    var p = processes[i];
    var row = '<tr>' +
      '<td>' + p.pid + '</td>' +
      '<td>' + p.at  + '</td>' +
      '<td>' + p.bt  + '</td>' +
      '<td>' + p.pr  + '</td>' +
      '<td><button class="del-btn" onclick="removeProcess(\'' + p.pid + '\')">Remove</button></td>' +
      '</tr>';
    tbody.innerHTML += row;
  }
}

// ── SJF — NON-PREEMPTIVE ───────────────────
// At each step, pick the process with the shortest burst time
// from those that have already arrived. Ties: earlier arrival wins.
function runSJF(procs) {
  var jobs = procs.map(function(p) {
    return { pid: p.pid, at: p.at, bt: p.bt, pr: p.pr,
             start: -1, finish: -1, done: false };
  });

  var time = 0;
  var completed = 0;
  var gantt = [];

  while (completed < jobs.length) {

    // Find all arrived and not done
    var ready = [];
    for (var i = 0; i < jobs.length; i++) {
      if (!jobs[i].done && jobs[i].at <= time) ready.push(jobs[i]);
    }

    // Nobody arrived yet — CPU idle
    if (ready.length === 0) {
      var nextAT = Infinity;
      for (var i = 0; i < jobs.length; i++) {
        if (!jobs[i].done && jobs[i].at > time) nextAT = Math.min(nextAT, jobs[i].at);
      }
      gantt.push({ pid: 'Idle', start: time, end: nextAT });
      time = nextAT;
      continue;
    }

    // Sort by burst time, then arrival time (tie-break)
    ready.sort(function(a, b) {
      if (a.bt !== b.bt) return a.bt - b.bt;
      return a.at - b.at;
    });

    var job = ready[0];
    job.start = time;
    gantt.push({ pid: job.pid, start: time, end: time + job.bt });
    time += job.bt;
    job.finish = time;
    job.done = true;
    completed++;
  }

  return { gantt: gantt, jobs: jobs };
}

// ── PRIORITY — NON-PREEMPTIVE ──────────────
// At each step, pick the process with the highest priority (lowest number)
// from those that have already arrived. Ties: earlier arrival wins.
function runPriority(procs) {
  var jobs = procs.map(function(p) {
    return { pid: p.pid, at: p.at, bt: p.bt, pr: p.pr,
             start: -1, finish: -1, done: false };
  });

  var time = 0;
  var completed = 0;
  var gantt = [];

  while (completed < jobs.length) {

    // Find all arrived and not done
    var ready = [];
    for (var i = 0; i < jobs.length; i++) {
      if (!jobs[i].done && jobs[i].at <= time) ready.push(jobs[i]);
    }

    // Nobody arrived yet — CPU idle
    if (ready.length === 0) {
      var nextAT = Infinity;
      for (var i = 0; i < jobs.length; i++) {
        if (!jobs[i].done && jobs[i].at > time) nextAT = Math.min(nextAT, jobs[i].at);
      }
      gantt.push({ pid: 'Idle', start: time, end: nextAT });
      time = nextAT;
      continue;
    }

    // Sort by priority (lower = higher), then arrival time (tie-break)
    ready.sort(function(a, b) {
      if (a.pr !== b.pr) return a.pr - b.pr;
      return a.at - b.at;
    });

    var job = ready[0];
    job.start = time;
    gantt.push({ pid: job.pid, start: time, end: time + job.bt });
    time += job.bt;
    job.finish = time;
    job.done = true;
    completed++;
  }

  return { gantt: gantt, jobs: jobs };
}

// ── METRICS ────────────────────────────────
function calcMetrics(jobs) {
  return jobs.map(function(j) {
    return {
      pid: j.pid,
      at:  j.at,
      bt:  j.bt,
      pr:  j.pr,
      ct:  j.finish,
      wt:  j.finish - j.at - j.bt,   // WT  = CT - AT - BT
      tat: j.finish - j.at,           // TAT = CT - AT
      rt:  j.start  - j.at            // RT  = Start - AT
    };
  });
}

function average(arr, key) {
  var sum = 0;
  for (var i = 0; i < arr.length; i++) sum += arr[i][key];
  return sum / arr.length;
}

// ── GANTT RENDER ───────────────────────────
function renderGantt(ganttId, tlId, gantt) {
  var total = gantt[gantt.length - 1].end - gantt[0].start;
  var scale = Math.max(30, Math.min(80, 700 / total));

  var ganttEl = document.getElementById(ganttId);
  var tlEl    = document.getElementById(tlId);

  ganttEl.innerHTML = '';
  for (var i = 0; i < gantt.length; i++) {
    var b = gantt[i];
    var w = (b.end - b.start) * scale;
    var div = document.createElement('div');
    div.className = b.pid === 'Idle' ? 'g-block g-idle' : 'g-block';
    div.style.width = w + 'px';
    div.innerHTML = '<span>' + b.pid + '</span><small>' + b.start + '–' + b.end + '</small>';
    ganttEl.appendChild(div);
  }

  // Timeline numbers
  var times = [];
  for (var i = 0; i < gantt.length; i++) {
    if (times.indexOf(gantt[i].start) === -1) times.push(gantt[i].start);
    if (times.indexOf(gantt[i].end)   === -1) times.push(gantt[i].end);
  }
  times.sort(function(a, b) { return a - b; });

  tlEl.style.position = 'relative';
  tlEl.style.width = (total * scale) + 'px';
  tlEl.innerHTML = '';
  for (var i = 0; i < times.length; i++) {
    var span = document.createElement('span');
    span.className = 'tl-mark';
    span.style.left = ((times[i] - gantt[0].start) * scale) + 'px';
    span.textContent = times[i];
    tlEl.appendChild(span);
  }
}

// ── RESULTS TABLE RENDER ───────────────────
function renderResults(tbodyId, tfootId, metrics) {
  var tbody = document.getElementById(tbodyId);
  var tfoot = document.getElementById(tfootId);

  tbody.innerHTML = '';
  for (var i = 0; i < metrics.length; i++) {
    var m = metrics[i];
    tbody.innerHTML += '<tr>' +
      '<td>' + m.pid + '</td>' +
      '<td>' + m.at  + '</td>' +
      '<td>' + m.bt  + '</td>' +
      '<td>' + m.pr  + '</td>' +
      '<td>' + m.ct  + '</td>' +
      '<td>' + m.wt  + '</td>' +
      '<td>' + m.tat + '</td>' +
      '<td>' + m.rt  + '</td>' +
      '</tr>';
  }

  var avgWT  = average(metrics, 'wt').toFixed(2);
  var avgTAT = average(metrics, 'tat').toFixed(2);
  var avgRT  = average(metrics, 'rt').toFixed(2);

  tfoot.innerHTML = '<tr>' +
    '<td colspan="5" style="text-align:right"><b>Average</b></td>' +
    '<td><b>' + avgWT  + '</b></td>' +
    '<td><b>' + avgTAT + '</b></td>' +
    '<td><b>' + avgRT  + '</b></td>' +
    '</tr>';
}

// ── COMPARISON & CONCLUSION ────────────────
function renderComparison(mSJF, mPRI) {
  var s = {
    wt:  +average(mSJF, 'wt').toFixed(2),
    tat: +average(mSJF, 'tat').toFixed(2),
    rt:  +average(mSJF, 'rt').toFixed(2)
  };
  var p = {
    wt:  +average(mPRI, 'wt').toFixed(2),
    tat: +average(mPRI, 'tat').toFixed(2),
    rt:  +average(mPRI, 'rt').toFixed(2)
  };

  var wtWin  = s.wt  <= p.wt  ? 'SJF' : 'Priority';
  var tatWin = s.tat <= p.tat ? 'SJF' : 'Priority';
  var rtWin  = s.rt  <= p.rt  ? 'SJF' : 'Priority';

  // Comparison table
  document.getElementById('comp-tbody').innerHTML =
    '<tr><td>Waiting Time (WT)</td><td>' + s.wt + '</td><td>' + p.wt + '</td><td class="winner">' + wtWin + ' ✓</td></tr>' +
    '<tr><td>Turnaround Time (TAT)</td><td>' + s.tat + '</td><td>' + p.tat + '</td><td class="winner">' + tatWin + ' ✓</td></tr>' +
    '<tr><td>Response Time (RT)</td><td>' + s.rt + '</td><td>' + p.rt + '</td><td class="winner">' + rtWin + ' ✓</td></tr>';

  // Starvation check
  var avgWTPRI = average(mPRI, 'wt');
  var starvation = false;
  for (var i = 0; i < mPRI.length; i++) {
    if (mPRI[i].wt > avgWTPRI * 3 && mPRI.length > 2) starvation = true;
  }

  // Short job favor
  var minBT = Infinity;
  for (var i = 0; i < mSJF.length; i++) if (mSJF[i].bt < minBT) minBT = mSJF[i].bt;
  var shortJob = null;
  for (var i = 0; i < mSJF.length; i++) if (mSJF[i].bt === minBT) { shortJob = mSJF[i]; break; }
  var sjfFavors = shortJob && shortJob.wt <= average(mSJF, 'wt');

  document.getElementById('analysis-box').innerHTML =
    '<p><b>Did SJF favor short jobs?</b> ' + (sjfFavors ? 'Yes — SJF selected shorter burst-time processes first.' : 'Not strongly in this dataset.') + '</p>' +
    '<p><b>Did Priority favor urgent processes?</b> Yes — Priority always selects the lowest priority number first.</p>' +
    '<p><b>Starvation Risk:</b> ' + (starvation ? '⚠ Possible starvation in Priority — one process waited significantly longer.' : 'No clear starvation in this dataset.') + '</p>' +
    '<p><b>Core Trade-off:</b> SJF optimizes efficiency (shorter jobs first), Priority optimizes urgency (important jobs first).</p>';

  // Conclusion
  var sjfWins = 0;
  if (wtWin === 'SJF') sjfWins++;
  if (tatWin === 'SJF') sjfWins++;
  if (rtWin === 'SJF') sjfWins++;
  var overall = sjfWins >= 2 ? 'SJF' : 'Priority';

  var maxWTSJF = 0, maxWTPRI = 0;
  for (var i = 0; i < mSJF.length; i++) if (mSJF[i].wt > maxWTSJF) maxWTSJF = mSJF[i].wt;
  for (var i = 0; i < mPRI.length; i++) if (mPRI[i].wt > maxWTPRI) maxWTPRI = mPRI[i].wt;
  var fairer = maxWTSJF <= maxWTPRI ? 'SJF' : 'Priority';

  document.getElementById('conclusion-box').innerHTML =
    '<ul>' +
    '<li><b>Best Average WT:</b> ' + wtWin + '</li>' +
    '<li><b>Best Average TAT:</b> ' + tatWin + '</li>' +
    '<li><b>Best Average RT:</b> ' + rtWin + '</li>' +
    '<li><b>Overall Better Algorithm:</b> <span class="highlight">' + overall + '</span></li>' +
    '<li><b>Fairer Algorithm:</b> ' + fairer + ' (lower maximum waiting time)</li>' +
    '<li><b>Main Trade-off:</b> SJF improves efficiency but ignores urgency. Priority respects importance but may delay short low-priority processes.</li>' +
    '<li><b>Recommendation:</b> ' + (overall === 'SJF' ? 'SJF is better for this workload — minimizes average waiting and turnaround time.' : 'Priority is better for this workload — serves urgent processes faster.') + '</li>' +
    '</ul>';
}

// ── MAIN ───────────────────────────────────
function runSimulation() {
  if (processes.length < 2) {
    return showErr('Please add at least 2 processes.');
  }
  showErr('');
  hideResults();

  var sjf = runSJF(processes);
  var pri = runPriority(processes);
  var mSJF = calcMetrics(sjf.jobs);
  var mPRI = calcMetrics(pri.jobs);

  renderGantt('gantt-sjf', 'tl-sjf', sjf.gantt);
  renderGantt('gantt-pri', 'tl-pri', pri.gantt);
  renderResults('res-sjf', 'foot-sjf', mSJF);
  renderResults('res-pri', 'foot-pri', mPRI);
  renderComparison(mSJF, mPRI);

  document.getElementById('gantt-section').classList.remove('hidden');
  document.getElementById('results-section').classList.remove('hidden');
  document.getElementById('comparison-section').classList.remove('hidden');

  document.getElementById('gantt-section').scrollIntoView({ behavior: 'smooth' });
}

// Enter key support
document.addEventListener('DOMContentLoaded', function() {
  renderTable();
  var fields = ['i-pid', 'i-at', 'i-bt', 'i-pr'];
  for (var i = 0; i < fields.length; i++) {
    document.getElementById(fields[i]).addEventListener('keydown', function(e) {
      if (e.key === 'Enter') addProcess();
    });
  }
});
