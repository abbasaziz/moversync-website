const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

const leads = [
  {id:3346,name:'Jay Ramasamy',email:'jay.ramasamy@example.co.uk',phone:'+44 7515 830942',source:'Getamover',status:'New lead',date:'2026-10-03',from:'E14 3QL',to:'SE10 8NE',quote:780,owner:'Khunsha',property:'4 bedroom house'},
  {id:3345,name:'Mike Boyle',email:'mike.boyle@example.co.uk',phone:'+44 7739 224900',source:'Compare My Move',status:'New lead',date:'2026-10-12',from:'M20 4WX',to:'LS6 2AB',quote:735,owner:'Fawad',property:'2 bedroom flat'},
  {id:3344,name:'Michael Clark',email:'michael.clark@example.co.uk',phone:'+44 7766 751351',source:'Pinlocal',status:'Contacted',date:'2026-09-28',from:'BS6 5AQ',to:'BA1 7HL',quote:735,owner:'Wasiq',property:'3 bedroom house'},
  {id:3343,name:'Ben Watson',email:'ben.watson@example.co.uk',phone:'+44 7786 005725',source:'Sirelo',status:'Quote sent',date:'2026-11-02',from:'G12 8QQ',to:'EH4 2AP',quote:780,owner:'Mohsib',property:'2 bedroom flat'},
  {id:3342,name:'Ian Pledger',email:'ian.pledger@example.co.uk',phone:'+44 7900 825030',source:'Triglobal',status:'Survey booked',date:'2026-10-23',from:'B15 2TT',to:'CV3 6RE',quote:1185,owner:'Khunsha',property:'4 bedroom house'},
  {id:3341,name:'George McGuire',email:'george.mcguire@example.co.uk',phone:'+44 7960 782944',source:'Compare My Move',status:'Quote sent',date:'2026-12-11',from:'NE2 1XL',to:'YO24 1AA',quote:735,owner:'Fawad',property:'2 bedroom flat'},
  {id:3340,name:'Kitty Ray',email:'kitty.ray@example.co.uk',phone:'+44 7427 600730',source:'Website',status:'Booked',date:'2026-09-17',from:'SW16 2AB',to:'RG1 4QA',quote:735,owner:'Wasiq',property:'2 bedroom flat'},
  {id:3339,name:'Chris Lee',email:'chris.lee@example.co.uk',phone:'+44 7515 354414',source:'Pinlocal',status:'Contacted',date:'2026-09-17',from:'EC2A 4BX',to:'W1T 2BH',quote:1200,owner:'Mohsib',property:'Commercial office'},
  {id:3338,name:'Aisha Patel',email:'aisha.patel@example.co.uk',phone:'+44 7720 118408',source:'Compare My Move',status:'Booked',date:'2026-09-18',from:'CR0 5RD',to:'KT2 6AA',quote:1420,owner:'Khunsha',property:'3 bedroom house'},
  {id:3337,name:'Oliver Shaw',email:'oliver.shaw@example.co.uk',phone:'+44 7700 116291',source:'Getamover',status:'New lead',date:'2026-09-25',from:'M14 6QL',to:'YO1 7PR',quote:1240,owner:'Fawad',property:'3 bedroom house'},
  {id:3336,name:'Isla Thompson',email:'isla.thompson@example.co.uk',phone:'+44 7700 802448',source:'Sirelo',status:'Quote sent',date:'2026-09-22',from:'CF10 1EP',to:'BS1 5AH',quote:920,owner:'Wasiq',property:'2 bedroom flat'},
  {id:3335,name:'Daniel Wright',email:'daniel.wright@example.co.uk',phone:'+44 7700 901773',source:'Triglobal',status:'Survey booked',date:'2026-10-06',from:'L1 8JQ',to:'CH1 2AN',quote:1760,owner:'Mohsib',property:'4 bedroom house'}
];

const followups = [
  {id:1,day:'16',month:'SEP',name:'Daniel Wright',detail:'Day 4 quote follow-up · £1,760',email:'daniel.wright@example.co.uk',due:'Overdue by 18 minutes'},
  {id:2,day:'16',month:'SEP',name:'Isla Thompson',detail:'Day 1 availability reminder · £920',email:'isla.thompson@example.co.uk',due:'Due at 12:30'},
  {id:3,day:'16',month:'SEP',name:'Ben Watson',detail:'Day 9 final follow-up · £780',email:'ben.watson@example.co.uk',due:'Due at 14:00'},
  {id:4,day:'17',month:'SEP',name:'George McGuire',detail:'Day 1 availability reminder · £735',email:'george.mcguire@example.co.uk',due:'Scheduled tomorrow'},
  {id:5,day:'18',month:'SEP',name:'Michael Clark',detail:'Post-survey quote check-in · £735',email:'michael.clark@example.co.uk',due:'Scheduled Friday'}
];

const invoices = [
  {number:'INV-2098',customer:'Aisha Patel',issue:'12 Sep 2026',due:'18 Sep 2026',total:1420,balance:1278,status:'Sent'},
  {number:'INV-2097',customer:'Kitty Ray',issue:'11 Sep 2026',due:'17 Sep 2026',total:735,balance:0,status:'Paid'},
  {number:'INV-2096',customer:'Robert Hall',issue:'06 Sep 2026',due:'13 Sep 2026',total:2180,balance:2180,status:'Overdue'},
  {number:'INV-2095',customer:'Sophie Turner',issue:'04 Sep 2026',due:'10 Sep 2026',total:980,balance:0,status:'Paid'},
  {number:'INV-2094',customer:'Luke Morgan',issue:'02 Sep 2026',due:'09 Sep 2026',total:1640,balance:820,status:'Sent'}
];

const templates = [
  {name:'Quote confirmation',use:'Sent immediately after a quote',subject:'Your removal quote from {company_name}',body:'Hi {first_name},\n\nThank you for speaking with us. Your removal quote is £{quote_total}.\n\nYour proposed move date is {move_date}. If you would like us to hold the date, reply to this email and we will confirm the next step.\n\nKind regards,\n{company_name}'},
  {name:'Day 1 availability reminder',use:'First automated follow-up',subject:'Checking your move date',body:'Hi {first_name},\n\nI wanted to check that you received our quote for £{quote_total}. We still have availability around {move_date}.\n\nIf you have any questions, reply here and I will help.\n\nKind regards,\n{company_name}'},
  {name:'Day 4 helpful check-in',use:'Second automated follow-up',subject:'Any questions about your removal quote?',body:'Hi {first_name},\n\nAre there any details you would like us to clarify before your move? We can adjust the quote if your inventory or access details have changed.\n\nKind regards,\n{company_name}'},
  {name:'Day 9 final note',use:'Final automated follow-up',subject:'Final availability check for {move_date}',body:'Hi {first_name},\n\nThis is our final availability check for {move_date}. If your plans have changed, no problem. If you still need help, reply and we will confirm what is available.\n\nKind regards,\n{company_name}'},
  {name:'Survey confirmation',use:'After a survey is booked',subject:'Your removal survey is confirmed',body:'Hi {first_name},\n\nYour removal survey is booked. We will review the property, access and inventory so we can confirm the right vehicle, crew and price.\n\nKind regards,\n{company_name}'},
  {name:'Deposit received',use:'After a deposit is recorded',subject:'Deposit received for your move',body:'Hi {first_name},\n\nWe have received your deposit. Your move on {move_date} is now confirmed in our calendar.\n\nKind regards,\n{company_name}'}
];

const calendarEvents = [
  {date:'2026-09-17',type:'move',label:'Kitty Ray · Van 1'},
  {date:'2026-09-17',type:'move',label:'Chris Lee · Van 3'},
  {date:'2026-09-18',type:'move',label:'Aisha Patel · Van 2'},
  {date:'2026-09-18',type:'survey',label:'Ian Pledger · video survey'},
  {date:'2026-09-22',type:'move',label:'Isla Thompson · Van 1'},
  {date:'2026-09-23',type:'reminder',label:'Invoice INV-2098 due'},
  {date:'2026-09-25',type:'survey',label:'Oliver Shaw · on-site survey'},
  {date:'2026-09-28',type:'move',label:'Michael Clark · Van 2'}
];

const unallocated = [
  {id:1,name:'Charlotte Evans',route:'SW16 to RG1',time:'08:00 · £950'},
  {id:2,name:'Daniel Wright',route:'L1 to CH1',time:'09:30 · £1,760'},
  {id:3,name:'Isla Thompson',route:'CF10 to BS1',time:'13:00 · £920'}
];

const vehicles = [
  {name:'Van 1',type:'Luton · GK21 LTN',job:{name:'Kitty Ray',detail:'08:00 · Team A · SW16 to RG1'}},
  {name:'Van 2',type:'Luton · LM19 VAN',job:{name:'Aisha Patel',detail:'09:00 · Team B · CR0 to KT2'}},
  {name:'Van 3',type:'5.5 tonne · MV22 MOV',job:{name:'Chris Lee',detail:'07:30 · Team C · Office move'}},
  {name:'Van 4',type:'Transit · DN20 BOX',job:null}
];

let activeLead = null;
let activeRecordTab = 'overview';
let activeTemplate = 0;
let calendarDate = new Date(2026, 8, 1);
let toastTimer;

const money = number => `£${Number(number).toLocaleString('en-GB', {minimumFractionDigits:0,maximumFractionDigits:0})}`;
const prettyDate = iso => new Date(`${iso}T12:00:00`).toLocaleDateString('en-GB', {day:'2-digit',month:'short',year:'numeric'});
const initials = name => name.split(' ').map(part => part[0]).join('').slice(0,2).toUpperCase();

function showToast(message) {
  const toast = $('#toast');
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 3000);
}

function goToView(view) {
  $$('.app-view').forEach(panel => panel.classList.toggle('active', panel.dataset.viewPanel === view));
  $$('.nav-item').forEach(item => item.classList.toggle('active', item.dataset.view === view));
  $('#sidebar').classList.remove('open');
  window.scrollTo({top:0,behavior:'smooth'});
  if (view === 'calendar') renderCalendar();
}

$$('.nav-item').forEach(button => button.addEventListener('click', () => goToView(button.dataset.view)));
document.addEventListener('click', event => {
  const target = event.target.closest('[data-go-view]');
  if (target) goToView(target.dataset.goView);
});

$('#mobileNavToggle').addEventListener('click', () => $('#sidebar').classList.add('open'));
$('#sidebarClose').addEventListener('click', () => $('#sidebar').classList.remove('open'));
$('#dismissNotice').addEventListener('click', event => event.currentTarget.parentElement.remove());

function openModal(id) {
  $('#modalBackdrop').hidden = false;
  $(`#${id}`).hidden = false;
  document.body.style.overflow = 'hidden';
  setTimeout(() => $(`#${id} input, #${id} select, #${id} textarea`)?.focus(), 40);
}
function closeModals() {
  $('#modalBackdrop').hidden = true;
  $$('.modal').forEach(modal => modal.hidden = true);
  document.body.style.overflow = '';
}
document.addEventListener('click', event => {
  const trigger = event.target.closest('[data-open-modal]');
  if (trigger) openModal(trigger.dataset.openModal);
  if (event.target.closest('[data-close-modal]')) closeModals();
});
$('#modalBackdrop').addEventListener('click', closeModals);
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeModals(); });

function renderPriority() {
  const items = [
    ['D','Daniel Wright','Quote follow-up overdue · £1,760','Follow up'],
    ['I','INV-2096','Invoice overdue · £2,180','View invoice'],
    ['S','Ian Pledger','Survey tomorrow at 10:30','View lead'],
    ['L','Oliver Shaw','New Getamover lead · 4 minutes ago','Open lead']
  ];
  $('#priorityList').innerHTML = items.map((item,index) => `<div class="priority-item"><span class="priority-icon">${item[0]}</span><div><b>${item[1]}</b><small>${item[2]}</small></div><button type="button" data-priority="${index}">${item[3]}</button></div>`).join('');
  $$('[data-priority]').forEach(button => button.addEventListener('click', () => {
    const index = Number(button.dataset.priority);
    if (index === 0) goToView('followups');
    else if (index === 1) goToView('invoices');
    else openLead(leads[index === 2 ? 4 : 9].id);
  }));
}

function renderUpcoming() {
  const items = [{day:'17',month:'SEP',name:'Kitty Ray',route:'SW16 to RG1',value:735},{day:'17',month:'SEP',name:'Chris Lee',route:'EC2A to W1T',value:1200},{day:'18',month:'SEP',name:'Aisha Patel',route:'CR0 to KT2',value:1420}];
  $('#upcomingMoves').innerHTML = items.map(item => `<div class="move-row"><span class="move-date"><b>${item.day}</b>${item.month}</span><div><b>${item.name}</b><small>${item.route}</small></div><strong>${money(item.value)}</strong></div>`).join('');
}

function renderLeads() {
  const query = $('#leadSearch').value.trim().toLowerCase();
  const source = $('#sourceFilter').value;
  const status = $('#statusFilter').value;
  const filtered = leads.filter(lead => {
    const matchesQuery = [lead.name,lead.email,lead.phone,lead.source,lead.from,lead.to].join(' ').toLowerCase().includes(query);
    return matchesQuery && (source === 'all' || lead.source === source) && (status === 'all' || lead.status === status);
  });
  $('#leadTableBody').innerHTML = filtered.map(lead => `<tr><td class="customer-cell"><b>${lead.name}</b><small>#${lead.id} · ${lead.phone}</small></td><td><span class="source-tag">${lead.source}</span></td><td><select class="status-select" data-status-id="${lead.id}">${['New lead','Contacted','Quote sent','Survey booked','Booked'].map(option => `<option${option === lead.status ? ' selected' : ''}>${option}</option>`).join('')}</select></td><td>${prettyDate(lead.date)}</td><td>${lead.from} → ${lead.to}</td><td><b>${money(lead.quote)}</b></td><td><span class="table-avatar">${initials(lead.owner)}</span>${lead.owner}</td><td><button class="row-action" type="button" data-open-lead="${lead.id}">Open →</button></td></tr>`).join('');
  $('#leadEmpty').hidden = filtered.length > 0;
  $('#leadSummary').textContent = `${filtered.length} active sample lead${filtered.length === 1 ? '' : 's'} across all sources.`;
  $('#leadNavCount').textContent = leads.length;
  $$('[data-status-id]').forEach(select => select.addEventListener('change', () => {
    leads.find(item => item.id === Number(select.dataset.statusId)).status = select.value;
    showToast(`Lead status changed to ${select.value}.`);
  }));
  $$('[data-open-lead]').forEach(button => button.addEventListener('click', () => openLead(Number(button.dataset.openLead))));
}

function openLead(id) {
  activeLead = leads.find(lead => lead.id === id);
  if (!activeLead) return;
  activeRecordTab = 'overview';
  $('#recordSource').textContent = `Lead #${activeLead.id} · ${activeLead.source}`;
  $('#recordName').textContent = activeLead.name;
  $('#recordContact').textContent = `${activeLead.email} · ${activeLead.phone}`;
  $$('.record-tabs button').forEach(button => button.classList.toggle('active', button.dataset.recordTab === 'overview'));
  renderRecord();
  openModal('recordModal');
}

function renderRecord() {
  const lead = activeLead;
  if (!lead) return;
  const views = {
    overview:`<div class="record-overview"><div class="record-box"><span>Status</span><b>${lead.status}</b></div><div class="record-box"><span>Assigned to</span><b>${lead.owner}</b></div><div class="record-box"><span>Move date</span><b>${prettyDate(lead.date)}</b></div><div class="record-box"><span>Property</span><b>${lead.property}</b></div><div class="record-box"><span>Moving from</span><b>${lead.from}</b></div><div class="record-box"><span>Moving to</span><b>${lead.to}</b></div></div>`,
    messages:`<div class="message-timeline"><div class="timeline-item"><b>Quote sent by ${lead.owner}</b><span>Today at 10:42 · ${lead.email}</span></div><div class="timeline-item"><b>Automatic acknowledgement delivered</b><span>16 September at 09:18</span></div><div class="timeline-item"><b>Lead received from ${lead.source}</b><span>16 September at 09:17</span></div></div>`,
    pricing:`<div class="pricing-box"><label>Moving service<input id="recordMovePrice" type="number" value="${lead.quote}"></label><label>Packing service<input type="number" value="0"></label><label>Storage<input type="number" value="0"></label><label>Discount<input type="number" value="0"></label><div class="record-box"><span>Grand total</span><b>${money(lead.quote)}</b></div><div class="record-box"><span>10% deposit</span><b>${money(lead.quote * .1)}</b></div></div>`,
    activity:`<div class="activity-timeline"><div class="timeline-item"><b>Reminder created</b><span>Follow up in 1 day if no reply</span></div><div class="timeline-item"><b>Lead assigned to ${lead.owner}</b><span>Rule: round-robin sales assignment</span></div><div class="timeline-item"><b>Customer record created</b><span>Source: ${lead.source}</span></div></div>`
  };
  $('#recordContent').innerHTML = views[activeRecordTab];
}

$$('.record-tabs button').forEach(button => button.addEventListener('click', () => {
  activeRecordTab = button.dataset.recordTab;
  $$('.record-tabs button').forEach(item => item.classList.toggle('active', item === button));
  renderRecord();
}));
$('#recordSaveButton').addEventListener('click', () => {
  const price = $('#recordMovePrice');
  if (price && activeLead) activeLead.quote = Number(price.value);
  renderLeads();
  closeModals();
  showToast('Lead changes saved in this demo session.');
});
$('#recordEmailButton').addEventListener('click', () => {
  closeModals();
  populateEmail(activeLead?.email);
  openModal('emailModal');
});

['leadSearch','sourceFilter','statusFilter'].forEach(id => $(`#${id}`).addEventListener(id === 'leadSearch' ? 'input' : 'change', renderLeads));
$('#clearFilters').addEventListener('click', () => { $('#leadSearch').value='';$('#sourceFilter').value='all';$('#statusFilter').value='all';renderLeads(); });
$('#leadForm').addEventListener('submit', event => {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(event.currentTarget));
  leads.unshift({id:Math.max(...leads.map(item=>item.id))+1,name:`${data.firstName} ${data.lastName}`,email:data.email,phone:data.phone,source:data.source,status:'New lead',date:data.moveDate,from:data.from,to:data.to,quote:Number(data.quote),owner:data.owner,property:'Details pending'});
  event.currentTarget.reset();
  closeModals();
  renderLeads();
  goToView('leads');
  showToast('New lead created and assigned.');
});

function renderFollowups() {
  $('#followupList').innerHTML = followups.map(item => `<article class="followup-card" data-followup-id="${item.id}"><span class="followup-date"><b>${item.day}</b>${item.month}</span><div><h3>${item.name}</h3><p>${item.detail} · ${item.due}</p></div><div class="followup-actions"><button type="button" data-preview-followup="${item.id}">Preview</button><button type="button" data-send-followup="${item.id}">Send now</button></div></article>`).join('') || '<div class="empty-state"><b>Queue complete</b><span>There are no follow-ups waiting.</span></div>';
  $('#followupNavCount').textContent = followups.length;
  $$('[data-preview-followup]').forEach(button => button.addEventListener('click', () => {
    const item = followups.find(entry => entry.id === Number(button.dataset.previewFollowup));
    populateEmail(item.email, 1);
    openModal('emailModal');
  }));
  $$('[data-send-followup]').forEach(button => button.addEventListener('click', () => sendFollowup(Number(button.dataset.sendFollowup))));
}
function sendFollowup(id) {
  const index = followups.findIndex(item => item.id === id);
  if (index < 0) return;
  const [item] = followups.splice(index,1);
  renderFollowups();
  showToast(`Follow-up sent to ${item.name}.`);
}
$('#sendAllDue').addEventListener('click', () => {
  const due = followups.filter(item => item.day === '16').length;
  for (let index = followups.length - 1; index >= 0; index -= 1) if (followups[index].day === '16') followups.splice(index,1);
  renderFollowups();
  showToast(`${due} due follow-up${due === 1 ? '' : 's'} sent.`);
});

function renderInvoices() {
  $('#invoiceTableBody').innerHTML = invoices.map(invoice => `<tr><td><b>${invoice.number}</b></td><td>${invoice.customer}</td><td>${invoice.issue}</td><td>${invoice.due}</td><td>${money(invoice.total)}</td><td><b>${money(invoice.balance)}</b></td><td><span class="status-${invoice.status.toLowerCase()}">${invoice.status}</span></td><td><button class="row-action" type="button" data-invoice="${invoice.number}">View →</button></td></tr>`).join('');
  $$('[data-invoice]').forEach(button => button.addEventListener('click', () => showToast(`${button.dataset.invoice} opened in preview mode.`)));
}
$('#invoiceForm').addEventListener('submit', event => {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(event.currentTarget));
  const next = 2099 + invoices.length;
  invoices.unshift({number:`INV-${next}`,customer:data.customer,issue:'16 Sep 2026',due:prettyDate(data.dueDate),total:Number(data.amount),balance:Number(data.amount),status:'Sent'});
  renderInvoices();closeModals();goToView('invoices');showToast('Invoice created and added to the ledger.');
});

function renderTemplates() {
  $('#templateList').innerHTML = templates.map((template,index) => `<button class="template-item${index === activeTemplate ? ' active' : ''}" type="button" data-template="${index}"><b>${template.name}</b><span>${template.use}</span></button>`).join('');
  const template = templates[activeTemplate];
  $('#templateTitle').textContent = template.name;
  $('#templateSubject').value = template.subject;
  $('#templateBody').value = template.body;
  $$('[data-template]').forEach(button => button.addEventListener('click', () => { activeTemplate=Number(button.dataset.template);renderTemplates(); }));
  populateTemplateSelect();
}
function populateTemplateSelect() {
  const select = $('#emailTemplateSelect');
  select.innerHTML = templates.map((template,index)=>`<option value="${index}">${template.name}</option>`).join('');
}
function populateEmail(to='',templateIndex=0) {
  const template = templates[templateIndex];
  $('#emailTo').value = to || '';
  $('#emailTemplateSelect').value = String(templateIndex);
  $('#emailSubject').value = template.subject;
  $('#emailBody').value = template.body;
}
$('#emailTemplateSelect').addEventListener('change', event => populateEmail($('#emailTo').value,Number(event.target.value)));
$('#emailForm').addEventListener('submit', event => { event.preventDefault();const to=$('#emailTo').value;closeModals();event.currentTarget.reset();showToast(`Email queued to ${to}.`); });
$('#saveTemplate').addEventListener('click', () => { templates[activeTemplate].subject=$('#templateSubject').value;templates[activeTemplate].body=$('#templateBody').value;showToast('Template changes saved for this demo session.'); });
$('#previewTemplate').addEventListener('click', () => { populateEmail('test@example-removals.co.uk',activeTemplate);openModal('emailModal'); });
$('#newTemplate').addEventListener('click', () => { templates.push({name:'Untitled template',use:'Custom message',subject:'New message from {company_name}',body:'Hi {first_name},\n\nWrite your message here.\n\nKind regards,\n{company_name}'});activeTemplate=templates.length-1;renderTemplates();showToast('New template added.'); });
$$('.merge-tags button').forEach(button => button.addEventListener('click', () => { const textarea=$('#templateBody');const start=textarea.selectionStart;textarea.value=textarea.value.slice(0,start)+button.textContent+textarea.value.slice(textarea.selectionEnd);textarea.focus();textarea.selectionStart=textarea.selectionEnd=start+button.textContent.length; }));

function renderCalendar() {
  const year=calendarDate.getFullYear();const month=calendarDate.getMonth();
  $('#calendarTitle').textContent=calendarDate.toLocaleDateString('en-GB',{month:'long',year:'numeric'});
  const first=new Date(year,month,1);const startOffset=(first.getDay()+6)%7;const days=new Date(year,month+1,0).getDate();const prevDays=new Date(year,month,0).getDate();
  const cells=[];
  for(let index=0;index<42;index+=1){let day;let date;let other=false;if(index<startOffset){day=prevDays-startOffset+index+1;date=new Date(year,month-1,day);other=true;}else if(index>=startOffset+days){day=index-startOffset-days+1;date=new Date(year,month+1,day);other=true;}else{day=index-startOffset+1;date=new Date(year,month,day);}const iso=`${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;const events=calendarEvents.filter(item=>item.date===iso);const today=iso==='2026-09-16';cells.push(`<div class="calendar-day${other?' other':''}${today?' today':''}"><b>${day}</b>${events.map(item=>`<button class="calendar-event ${item.type}" type="button" data-calendar-event="${item.label}">${item.label}</button>`).join('')}</div>`);}
  $('#calendarGrid').innerHTML=cells.join('');
  $$('[data-calendar-event]').forEach(button=>button.addEventListener('click',()=>showToast(button.dataset.calendarEvent)));
}
$('#calendarPrev').addEventListener('click',()=>{calendarDate.setMonth(calendarDate.getMonth()-1);renderCalendar();});
$('#calendarNext').addEventListener('click',()=>{calendarDate.setMonth(calendarDate.getMonth()+1);renderCalendar();});
$('#calendarToday').addEventListener('click',()=>{calendarDate=new Date(2026,8,1);renderCalendar();});
$('#scheduleForm').addEventListener('submit',event=>{event.preventDefault();const data=Object.fromEntries(new FormData(event.currentTarget));calendarEvents.push({date:data.date,type:'move',label:`${data.job.split(' · ')[0]} · ${data.vehicle.split(' · ')[0]}`});closeModals();goToView('calendar');showToast('Job added to the operations calendar.');});

function renderSchedule(){
  $('#unallocatedJobs').innerHTML=unallocated.map(job=>`<article class="job-card"><b>${job.name}</b><span>${job.route}</span><small>${job.time}</small><button type="button" data-assign-job="${job.id}">Assign to next vehicle</button></article>`).join('')||'<div class="empty-state"><b>All jobs allocated</b><span>No jobs are waiting for a vehicle.</span></div>';
  $('#unallocatedCount').textContent=unallocated.length;
  $('#vehicleList').innerHTML=vehicles.map(vehicle=>`<div class="vehicle-row"><div class="vehicle-info"><b>${vehicle.name}</b><span>${vehicle.type}</span></div><div class="vehicle-lane">${vehicle.job?`<div class="assigned-job"><b>${vehicle.job.name}</b><small>${vehicle.job.detail}</small></div>`:'<span class="vehicle-empty">Available for assignment</span>'}</div></div>`).join('');
  $$('[data-assign-job]').forEach(button=>button.addEventListener('click',()=>{const id=Number(button.dataset.assignJob);const index=unallocated.findIndex(item=>item.id===id);const vehicle=vehicles.find(item=>!item.job);if(!vehicle){showToast('No empty vehicle is available in this demo.');return;}const [job]=unallocated.splice(index,1);vehicle.job={name:job.name,detail:`08:30 · Unassigned crew · ${job.route}`};renderSchedule();showToast(`${job.name} assigned to ${vehicle.name}.`);}));
}

function renderRevenueBars(){const values=[36,42,39,55,51,65,58,72,68,79,83,94];$('#revenueBars').innerHTML=values.map((height,index)=>`<div style="--h:${height}%;--o:${.45+index*.045}"><span>W${index+1}</span></div>`).join('');}
$('#printReport').addEventListener('click',()=>window.print());
$('#saveSettings').addEventListener('click',()=>showToast('Workspace settings saved for this demo session.'));

function exportCsv(){const rows=[['ID','Customer','Email','Phone','Source','Status','Move date','From','To','Quote','Owner'],...leads.map(lead=>[lead.id,lead.name,lead.email,lead.phone,lead.source,lead.status,lead.date,lead.from,lead.to,lead.quote,lead.owner])];const csv=rows.map(row=>row.map(value=>`"${String(value).replaceAll('"','""')}"`).join(',')).join('\n');const blob=new Blob([csv],{type:'text/csv'});const link=document.createElement('a');link.href=URL.createObjectURL(blob);link.download='moversync-demo-leads.csv';link.click();URL.revokeObjectURL(link.href);showToast('Sample lead CSV downloaded.');}
$('#exportLeads').addEventListener('click',exportCsv);

$('#notificationButton').addEventListener('click',event=>{event.stopPropagation();const pop=$('#notificationPopover');pop.hidden=!pop.hidden;$('#userPopover').hidden=true;});
$('#userMenuButton').addEventListener('click',event=>{event.stopPropagation();const pop=$('#userPopover');pop.hidden=!pop.hidden;$('#notificationPopover').hidden=true;});
document.addEventListener('click',event=>{if(!event.target.closest('.popover')){$('#notificationPopover').hidden=true;$('#userPopover').hidden=true;}});

$('#globalSearch').addEventListener('keydown',event=>{if(event.key!=='Enter')return;event.preventDefault();goToView('leads');$('#leadSearch').value=event.currentTarget.value;renderLeads();});

renderPriority();renderUpcoming();renderLeads();renderFollowups();renderInvoices();renderTemplates();renderCalendar();renderSchedule();renderRevenueBars();populateEmail();
