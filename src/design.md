Ria Gopu
Waverly Wang
CS124


ALTERNATIVE DESIGNS

**Alternate design 1**

![](Huncompletedtasksbefore.png)

_Above is the first draft of our design from Lab1. We realized that this design was too small for 320x640  screen. The text and user interface was tiny on a phone. We were initially going to only have a button that said “Delete Completed Items” that would delete all completed items. It would only show up whenever there would be a completed item. Later, we realized we would want there to be an ability to delete either incomplete or completed items as people might want to trash either. We also didn't delete individual task functionality._


**Alternate Design 2**
![](AlternateDesign.png)

Here was a rough design for our app later. We have the delete task. We expanded the text and made the buttons bigger. We decided to have the user only be able to delete a list item once they selected the task. The elements are still close together and we want to spread them out more. We also chose to have nicer colors rather than the white and blue.

**Alternate Design 3**

**Fig 1a**
![](EmptyList.png)
_We increased the font and buttons so it was easier to touch. We also separated the buttons out so it’s not so visually cluttered._


**Fig 1b.**
![](EmptyListIntermediate.png)
_how the user would type into the input box to put in the task. They would click the “I need to” input box and type into the box. Then, press “Add”._


**Fig. 1c**
![](eatlunchthree.png)

Fig. 1c shows how the interface will look after the item is put in the list. We let the user be able to edit their elements at all times.



**Alternate Design 4:**

We improved on the input bar so that when the user types in a task and presses “Add”, the input bar clears out any letters so that the user can type in a new task without having to press backspace several times. We also formatted the app so it was more intuitive for a 320x640 phone layout - stacking the buttons vertically rather than horizontally, and standardizing the size of the buttons. We made the buttons highlight with color when you pressed “Show Completed” and “Show Uncompleted” so you would know which one was selected. We also made the checkbox and fonts larger for easy use.
We made the delete task button so it only shows up when you select a task. The task can be completed or uncompleted when deleting. We also made the checkboxes bigger to easily check. We made the delete buttons red to clearly differentiate them. The buttons for show uncompleted items and show completed items will turn purple so you know which one you pressed.

**Alternate Design 4**

* We also added a feature where when there is nothing in the input bar, the add button will not show up! This will prevent the user from adding empty items. Once the input bar is empty after typing, the add button will disappear.

**Final Design:**

Here is what our final design looks like.

**fig. 1** [lab 3]
![](lab3fig1.png)
**fig. 2** [lab 3]
![](lab3fig2.png)

One feature we changed from alternate design 4 was “Delete all completed buttons'. Before our changes, it would appear even when there were no completed items. Now when there is only one task that is completed, the “Delete Task” button will appear and the “Delete all completed task” button will be hidden. Only when there is more than one task completed will the “Delete all completed task” button appear. We also added a feature where you can sort by different categories. The last feature we added was a priority dropdown, which allows the user to rank their task in priority before adding their task (and changing it afterwards). This is useful because the user can then click our “Sort by Priority” button and have their most pressing tasks be at the top of the screen. Another important change we made, that the user may not notice immediately, is that we implemented the app’s functionality with firebase rather than states. This allowed us to implement sorting easily and, most importantly, save the contents of the todo list upon reload or when closing and revisiting the app later.
We also added a feature on our app that lets you sort ascending or descending order.

**fig. 3** [lab 3]
![](lab3fig3.png)


Above is a picture of how we let the user set priority of a task next to the input bar. You click the arrow on the priority dropdown in order to change the priority level from low to medium or high.

**fig. 3a** [lab 3]
![](settingpriorityforlistitem.png)


Above is how you would edit the individual priority of each task.
We also added a feature for sorting by creation date descending (oldest to youngest), name of task ascending, and priority descending.

**fig. 4** [lab 3]
![](lab3fig4.png)
Here is what it would look like before sorting by creation date. Our app actually puts in items oldest to youngest. But this image shows a case where you would click sort by priority and the list would be sorted differently.

**fig. 5** [lab 3]
![](lab3fig5.png)
	
Here is what it would look like after sorting by creation date oldest to youngest. We highlighted “Creation by Creation Date” in blue so you know which one you pressed.

**fig. 6** [lab 3]
![](lab3fig6.png)

Here is what it looks like before sorting by name.

**fig. 7** [lab 3]
![](lab3fig7.png)
After clicking sort by name, it sorts alphabetically.

**fig. 8** [lab 3]
![](lab3fig8.png)
Here is what it looks like before sorting by priority.

**fig. 9** [lab 3]
![](lab3fig9.png) 
And after sorting by priority.

For style changes, we decided to go with a blue screen since the dark purple was hard to read. We also made the tasks smaller so it was easier to read. We also made the buttons smaller and clustered together so they were associated together. Before, they were not aligned and took up the whole screen so you couldn’t view the tasks unless you were scrolling.


**Below is a workflow for each task. The workflow for Alternate Design 4 and our final design is the same so we kept the pictures from lab 2. We only updated the task workflows that changed from lab2**

* **TASK:** In a empty list, create an item named “Buy new John Grisham Book”

**Fig 2a** [lab 2]
![](Fig2a.png) 

_Fig 2a shows what the interface looks like when it’s empty. As you can see, we increased the font and buttons so it was easier to use. Notice “Add” button doesn’t show so you can’t add empty items._

**Fig 2b**[lab 2]
![](Fig2b.png) 

_Fig 2b how the user would type into the input box to put in the task. They would click the “I need to” input box and type into the box. Then, press “Add”._

**Fig 2c** [lab 2]
![](Fig2c.png) 
_Fig. 2c shows how the interface will look after the item is put in the list. We let the user be able to edit their elements at all times. Notice how the input bar is now blank so that the user can write their next task without backspacing to write their next task._

* **TASK:** In a non-empty list, create an item named “eat lunch”

**Fig 3a.** [lab 2]
![](Fig3a.png)
_Fig 3a shows what the interface looks like when it’s a non-empty list._

**Fig 3b** [lab 2]
![](fig3b.png) 
_Fig. 3b Shows what typing in eat lunch looks like._

**Fig 3c** [lab 2]
![](Fig3c.png) 
_Fig 3c. shows how the added task is put to the bottom of the list. This will help the viewer see their oldest to do list items first so they are encouraged to get older to do list items done._

* **TASK:** Mark the Item named “Call Mom” Completed
  **Fig. lab34a**[lab 3]
* ![](lab3fig4a.png) 
  _Fig. 4a shows what it looks like before marking the “call mom” item
  Completed. Note how the “delete all completed tasks” button isn’t showing.

**Fig. lab34b** [lab 3]
![](lab3fig4b.png)
_4b shows what it looks like after marking the “Call Mom” Completed. Notice how once you click the checkmark, the “Delete Task” button is showing. Notice the “Delete All completed tasks” button isn’t showing. When you check only one box, the “Delete Task” button will show up. If you check more than one box, the “delete all” button will show.



* **TASK:** Rename the item “Text John” to “Text John about Bank Statements”

**Fig. 5a** [lab 2]
![](Fig5a.png)
_Fig. 5a what it looks like when there is a “Text John” item in the list._

**Fig. 5b** [lab 2]
![](Fig5b.png)
_Fig 5b shows what it looks like when you are in the process of editing “Text John about Bank Statements”.
The user would click on the “Text John” element and type in their edit. We made all the task elements editable at all times._

**Fig. 5c** [lab 2]
![](Fig5c.png)
_Fig. 5c shows what it looks like after the user has finished editing their task._

* **TASK:** Show only uncompleted items

**Fig. 6a** [lab 3]
![](lab3fig6a.png)
_Fig. 6a shows what it looks like when there is a variety of completed and uncompleted elements. Notice that the "My List" title is no longer visible; that is because we have scrolled down in the page in order to view all of the list items._

**Fig. 6b** [lab 3]
![](lab3fig6b.png)
_The user would click on the “Show Uncompleted” button, and then the button would be highlighted so the user know what filter is on. The elements that are uncompleted are not showing now. The other tasks are still accessible by clicking “Show Completed” and “Show All”. “Show Completed” will show only completed tasks and hide “Uncompleted Tasks”. “Show All” will let you see both incomplete and completed tasks._

* **TASK:** Delete all completed items.

**Fig. 7a** [lab 2]

lab3fig6a
_This is what it looks like before “Delete All completed tasks”. Here we have a variety of complete and incomplete tasks. “Delete All Completed Tasks” button would be present at the bottom of the screen. Since we have more than one task completed _

**Fig. 7b** [lab 2]
lab3fig6b
_The user would press “Delete All Completed Tasks” and the completed tasks would be removed. They are removed and no longer accessible to the user. Notice the “Delete All completed” button is hidden now that there are no completed tasks. _


**USER TESTING**
Draft of Final Design
User A made an item in the list and set a priority to “high”. But when they clicked the sort buttons, the priority would switch back to “low”.

User B didn’t have trouble navigating. They were able to add tasks and complete items easily and sort easily. They did not notice their priority changed.

User C had a great time navigating. They were able to easily navigate between completed and uncompleted tasks they completed. They were at first having a hard time entering the input bar because they hadn’t clicked it. They asked how you would be able to select certain completed tasks out of many tasks in order to delete.

_Decisions Made After User Testing:_
After User A’s mistake, we fixed the bug so that the list items would keep their value that the user selected for priority even after reloading the page or clicking the sorting buttons.
Per User C’s suggestion, we will try to implement a way to delete some tasks out of many completed tasks in the future.


**CHALLENGES WE FACED:**
One challenge we faced was maintaining the priority levels of each task. Since we gave each task a dropdown menu for the user to change the task priority level, we ran into the issue of the dropdown menu resetting to a default value every time we clicked any of our sorting buttons or refreshed the page. Using print statements, we realized that the priority level was being saved, and was just not displayed. In order to fix this issue, we had to make a helper function that retrieves the priority level and sets the dropdown menus to the current level.

**PARTS OF THE DESIGN WE’RE MOST PROUD OF:**
We’re proud of our sort button dropdown menu, because it condenses the number of buttons displayed on the screen and organizes them in a way that intuitively makes sense. We’re also proud of the concept of each task having a priority dropdown, allowing the user to change the priority level without having to enter anything.


