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

**Alternate Design 5**

Lab3fig1

lab3fig2
One feature we changed from alternate design 4 was “Delete all completed buttons'. Before our changes, it would appear even when there were no completed items. Now when there is only one task that is completed, the “Delete Task” button will appear and the “Delete all completed task” button will be hidden. Only when there is more than one task completed will the “Delete all completed task” button appear. We also added a feature where you can sort by different categories. The last feature we added was a priority dropdown, which allows the user to rank their task in priority before adding their task (and changing it afterwards). This is useful because the user can then click our “Sort by Priority” button and have their most pressing tasks be at the top of the screen. Another important change we made, that the user may not notice immediately, is that we implemented the app’s functionality with firebase rather than states. This allowed us to implement sorting easily and, most importantly, save the contents of the todo list upon reload or when closing and revisiting the app later.
We also added a feature on our app that lets you sort ascending or descending order.

For style changes, we decided to go with a blue screen since the dark purple was hard to read. We also made the tasks smaller so it was easier to read. We also made the buttons smaller and clustered together so they were associated together. Before, they were not aligned and took up the whole screen so you couldn’t view the tasks unless you were scrolling.

**FINAL DESIGN **

Here is what our new interface looks like for a list. The one major change was changing the sort button into radio buttons so you can see which sorting button you chose. And the order direction button has become a toggle button for ascending and descending.

* **TASK:** * Add support for multiple lists
  **Lab 4 Fig. 1**
![](lab4fig1.png)s
Here is a picture of our new design. We created a page where you can create a list and see multiple lists. Here is

**Lab 4 Fig. 2**
![](lab4fig2.png)
Here it is with multiple lists.
* **TASK:** * Make application accessible
  **Lab 4 Fig. 3**
![](lab4fig3.png)
Here is a picture of the desktop version of our application zoomed in at 200%. All of the text and buttons are still visible at this size.

**Lab 4 Fig. 4**
![](lab4fig4.png)

Here is a picture of what happens when a user uses the tab button rather than their mouse to navigate the page: any modifiable/clickable element of the page is selectable. In this picture, a particular list is selected, and the user needs to hit the enter button in order to navigate into that list.


* **TASK:** * Add support for multiple screen sizes (desktop/mobile/landscape/portrait).

**Lab 4 Fig. 5**
![](lab4fig5.png)
![](lab4fig5a.png)
Here is a picture of what the full desktop view looks like for our list of lists and lists page. As you can see, the input bar is larger than in the mobile view so you can see more of what you type.

**Lab 4 Fig. 6a.**
![](lab4fig6a.png)


**Lab 4 Fig. 6b.**
![](lab4fig6b.png)

Here is a picture of what the mobile portrait view looks like for our multiple lists and singular list page.
As you can see the input bar of the list items and the input bar has become smaller in reaction to becoming smaller.

**Lab 4 Fig. 7a.**
![](lab4fig7a.png)

**Lab 4 Fig. 7b.**
![](lab4fig7b.png)
Here are pictures of what the mobile landscape view looks like for our list of lists and singular list. The user can scroll up and down to view the “Delete List” and “Return Home” buttons. As you can see, the input bar is larger than in the mobile view so you can see more of what you type.

**TASK:**  Keyboard Accessibility and Screen Reader

Here is a link to a video showing how you can access the functionality of our app without a keyboard and how the screen reader is able to read out-loud.
https://www.youtube.com/watch?v=m79B8PYgvNY
[Video](https://www.youtube.com/watch?v=m79B8PYgvNY)

We added aria-labels on the checkboxes so it says “You have selected… [name of task]” so you know what the checkbox corresponds to.

We also added an aria-label on the priority dropdown that tells the user “This is a priority dropdown. The options are low, medium and high” . Before it simply said “low” to announce the option selected.

We also added an aria label on the order toggle button so is says “You are on the descending button. This is a toggle button between Ascending and Descending”. This provided more information than announcing “Descending button”

**Below is a workflow for each task. The workflow for Alternate Design 5 and our final design is the same so we kept the pictures from lab 2 and lab 3. We only updated the task workflows that changed from lab2**


* **TASK:** In a empty list, create an item named “Buy new John Grisham Book”

**Fig 2a**
![](Fig2a.png)

_Fig 2a shows what the interface looks like when it’s empty. As you can see, we increased the font and buttons so it was easier to use. Notice “Add” button doesn’t show so you can’t add empty items._

**Fig 2b**
![](Fig2b.png)

_Fig 2b how the user would type into the input box to put in the task. They would click the “I need to” input box and type into the box. Then, press “Add”._

**Fig 2c**
![](Fig2c.png)
_Fig. 2c shows how the interface will look after the item is put in the list. We let the user be able to edit their elements at all times. Notice how the input bar is now blank so that the user can write their next task without backspacing to write their next task._

* **TASK:** In a non-empty list, create an item named “eat lunch”

**Fig 3a.**
![](Fig3a.png)
_Fig 3a shows what the interface looks like when it’s a non-empty list._

**Fig 3b**
![](fig3b.png)
_Fig. 3b Shows what typing in eat lunch looks like._

**Fig 3c**
![](Fig3c.png)
_Fig 3c. shows how the added task is put to the bottom of the list. This will help the viewer see their oldest to do list items first so they are encouraged to get older to do list items done._

* **TASK:** Mark the Item named “Call Mom” Completed
  **Fig. lab34a**
  ![](lab3fig4a.png)
  _Fig. 4a shows what it looks like before marking the “call mom” item
  Completed. Note how the “delete all completed tasks” button isn’t showing.

**Fig. lab34b**
![](lab3fig4b.png)
_4b shows what it looks like after marking the “Call Mom” Completed. Notice how once you click the checkmark, the “Delete Task” button is showing. Notice the “Delete All completed tasks” button isn’t showing. When you check only one box, the “Delete Task” button will show up. If you check more than one box, the “delete all” button will show.



* **TASK:** Rename the item “Text John” to “Text John about Bank Statements”

**Fig. 5a**
![](Fig5a.png)
_Fig. 5a what it looks like when there is a “Text John” item in the list._

**Fig. 5b**
![](Fig5b.png)
_Fig 5b shows what it looks like when you are in the process of editing “Text John about Bank Statements”.
The user would click on the “Text John” element and type in their edit. We made all the task elements editable at all times._

**Fig. 5c**
![](Fig5c.png)
_Fig. 5c shows what it looks like after the user has finished editing their task._

* **TASK:** Show only uncompleted items

**Fig. 6a**
![](Fig6a.png)
_Fig. 6a shows what it looks like when there is a variety of completed and uncompleted elements. Notice that the "My List" title is no longer visible; that is because we have scrolled down in the page in order to view all of the list items._

**Fig. 6b**
![](Fig6b.png)
_The user would click on the “Show Uncompleted” button, and then the button would be highlighted so the user know what filter is on. The elements that are uncompleted are not showing now. The other tasks are still accessible by clicking “Show Completed” and “Show All”. “Show Completed” will show only completed tasks and hide “Uncompleted Tasks”. “Show All” will let you see both incomplete and completed tasks._

* **TASK:** Delete all completed items.

**Fig. 7a**

lab3fig6a
_This is what it looks like before “Delete All completed tasks”. Here we have a variety of complete and incomplete tasks. “Delete All Completed Tasks” button would be present at the bottom of the screen. Since we have more than one task completed _

**Fig. 7b**
lab3fig6b
_The user would press “Delete All Completed Tasks” and the completed tasks would be removed. They are removed and no longer accessible to the user. Notice the “Delete All completed” button is hidden now that there are no completed tasks. _



**USER TESTING**
Draft of Final Design
User A found the sort button dropdown menu to require extra effort (two clicks) from the user, and suggested instead that we use a radio button menu. User A also found the order button menu to be excessive.
User B thought that the desktop version of the todo list didn’t make the best use of the space available to us, since all of the text was clustered in the middle of the screen and was a small font size.

_Decisions Made After User Testing:_
We converted the order button dropdown menu into simply one button that toggles between “Ascending” and “Descending”. We also took User A’s input and converted the sort button dropdown menu to a radio button menu, which also solved our problem of not displaying which sort category is currently selected.

Based on User B’s input, we stretched out the input bar to line up with the heading and take up more space on the screen so that the user could see more of their input (for long items). We also increased the font size of the home screen.


**CHALLENGES WE FACED:**
We encountered a lot of difficulty with implementing a homepage that redirects you to a particular list, because the task meant changing several parts of our existing code, which also meant that we had to modify all of the components that depended on the changed code. We ran into several roadblocks while reorganizing and refactoring our code after splitting up the firebase collection into several subcollections, since several components of our code needed refactoring and it was difficult to keep track of what exactly needed modifying. However, after going through our code thoroughly to ensure that all of the necessary changes were made, we were able to overcome this challenge.


**PARTS OF THE DESIGN WE’RE MOST PROUD OF:**
We’re most proud of the ascending/descending button that toggles when you click on it, because it is an elegant way to switch between ascending and descending order that only requires one click by the user. Using radio buttons for displaying “Sort by ____” felt like a very user-friendly and intuitive solution, because it also only requires one click by the user, and removes ambiguity about what is currently being sorted.


