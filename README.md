### &#x09;			**SJF vs Priority Scheduling Simulator**

### &#x09;		   **CPU Scheduling Comparison Project Documentation**







#### ***1. Project Overview:***

This project is a web-based CPU Scheduling Simulator designed to compare Shortest Job First (SJF) Scheduling and Priority Scheduling algorithms. The simulator helps students understand how different scheduling algorithms affect process execution order, waiting time, turnaround time, and response time.

The system allows users to enter processes with arrival time, burst time, and priority values, then displays the execution order using Gantt Charts and result tables for both algorithms.







#### ***2. Technologies Used:***

•	HTML: Used to build the structure of the web page and input forms.

•	CSS: Used to design the interface, colors, layout, and responsive styling.

•	JavaScript: Used to implement the scheduling algorithms, validation, calculations, and dynamic interaction.







#### ***3. Main Features:***

•	Add and remove processes dynamically.

•	Validate user input values.

•	Simulate SJF Non-Preemptive Scheduling.

•	Simulate Priority Non-Preemptive Scheduling.

•	Display Gantt Charts for both algorithms.

•	Calculate Waiting Time (WT), Turnaround Time (TAT), and Response Time (RT).

•	Compare the results between the two scheduling methods.







#### ***4. Scheduling Algorithms:***

4.1 Shortest Job First (SJF)

Shortest Job First (SJF) selects the process with the smallest burst time among the available processes. This algorithm is efficient for reducing average waiting time but may cause starvation for long processes.

4.2 Priority Scheduling

Priority Scheduling selects the process with the highest priority first. In this project, lower priority numbers represent higher importance (Priority 1 is the highest). If two processes have the same priority, the process with the earlier arrival time is selected first.



