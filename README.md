### &#x09;			**SJF vs Priority Scheduling Simulator**

### &#x09;		   **CPU Scheduling Comparison Project Documentation**

&#x09;					\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*





#### ***1. Project Overview:***

\-------------------------------------



This project is a web-based CPU Scheduling Simulator designed to compare Shortest Job First (SJF) Scheduling and Priority Scheduling algorithms. The simulator helps students understand how different scheduling algorithms affect process execution order, waiting time, turnaround time, and response time.

The system allows users to enter processes with arrival time, burst time, and priority values, then displays the execution order using Gantt Charts and result tables for both algorithms.



***\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_***



#### ***2. Technologies Used:***

\--------------------------------------



•	HTML: Used to build the structure of the web page and input forms.

•	CSS: Used to design the interface, colors, layout, and responsive styling.

•	JavaScript: Used to implement the scheduling algorithms, validation, calculations, and dynamic interaction.



***\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_***



#### ***3. Main Features:***

\----------------------------------



•	Add and remove processes dynamically.

•	Validate user input values.

•	Simulate SJF Non-Preemptive Scheduling.

•	Simulate Priority Non-Preemptive Scheduling.

•	Display Gantt Charts for both algorithms.

•	Calculate Waiting Time (WT), Turnaround Time (TAT), and Response Time (RT).

•	Compare the results between the two scheduling methods.





***\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_***



#### ***4. Scheduling Algorithms:***

\----------------------------------------------



4.1 Shortest Job First (SJF)

Shortest Job First (SJF) selects the process with the smallest burst time among the available processes. This algorithm is efficient for reducing average waiting time but may cause starvation for long processes.

4.2 Priority Scheduling

Priority Scheduling selects the process with the highest priority first. In this project, lower priority numbers represent higher importance (Priority 1 is the highest). If two processes have the same priority, the process with the earlier arrival time is selected first.



***\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_***



#### ***5.Run Instructions:***

\------------------------------------



Step 1: Create a Project Folder

Create a new folder on your computer and name it something like CPU-Scheduler.



Step 2: Save the Files

Save the code you provided into three separate files inside that folder. Make sure the names match exactly, as they link to one another:



index.html (or scheduler.html if you prefer the second HTML version you provided)



scheduler.css 3.  scheduler.js



Step 3: Open in a Browser

Since this is a static web project, all you need is a web browser (Chrome, Firefox, Edge, Safari, etc.).



&#x20;Simply double-click your index.html file. It will open directly in your default web browser, and the simulator will be fully functional.



***\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_***



#### ***6.Calculated Metrics:***

***--------------------------------------***



• Completion Time (CT): The absolute time on the timeline when a

process completely finishes its execution.

• Waiting Time (WT): The total time a process spends waiting in the ready

queue before and during execution. Calculated as WT = CT - Arrival Time

\- Burst Time.

• Turnaround Time (TAT): The total time taken from the process's arrival to

its complete execution. Calculated as TAT = CT - Arrival Time.

• Response Time (RT): The time elapsed from when a process arrives to

the first time it is allocated the CPU. Calculated as RT = Start Time -

Arrival Time.

• Averages: The system computes the Average Waiting Time, Average

Turnaround Time, and Average Response Time across all processes to

determine the overall efficiency of the algorithm.



***\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_***



#### ***7.Project Utilities \& Features:***

***--------------------------------------------------------***



**1) Algorithm Simulation: Executes non-preemptive Shortest Job First (SJF) and**

**non-preemptive Priority Scheduling, utilizing custom tie-breaking logic (earlier**

**arrival time wins).**



**2) Dynamic Gantt Chart Generation: Visually maps out the CPU timeline,**

**rendering scaled blocks for each process execution phase and clearly**

**marking CPU "Idle" periods.**



**3) Interactive Input \& Strict Validation: Allows users to build custom**

**workloads with process IDs, arrival times, burst times, and priority levels. The**

**system includes robust validation to reject duplicate IDs, negative arrival**

**times, zero/negative burst times, and non-numeric inputs.**



**4) Pre-loaded Test Scenarios: Features built-in workload scenarios to quickly**

**demonstrate specific scheduling concepts:**

**• Scenario A (Mixed Workload): Standard test with varied arrivals and**

**bursts.**

**• Scenario B (Conflict): Pits a short-burst/low-priority job against a longburst/high-priority job.**

**• Scenario C (Starvation): Demonstrates how lower-priority jobs can be**

**indefinitely delayed (starved) by continuous higher-priority arrivals.**



**5) Automated Comparison Engine: Displays results side-by-side and**

**automatically calculates the "winner" for each metric (lowest average WT, TAT,**

**and RT).**



**6) Analytical Conclusion Generation: Synthesizes the data to answer**

**conceptual questions. It assesses if SJF actually favored short jobs, flags**

**potential starvation risks in the Priority algorithm, evaluates the "fairer"**

**algorithm based on maximum wait times, and provides a final**

**recommendation on which algorithm suits the given workload best.**



**\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_**

#### 

#### ***8. Team Names:***

\--------------------------



1. Mahmoud Hossam Kamal El Din Saleh Kassim (20240896)
2. Mohab Mahmoud Ramadan (20241027)
3. Dalia Gamal Salman Sultan (20240333)
4. Alaa Awad Ahmed Mohammed (20240147)
5. Ziad Yasser (20240393)
6. Seif Ahmed Saad (20240452)

