//=============================================================================
// VisuStella MZ - Main Menu Core
// VisuMZ_1_MainMenuCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_MainMenuCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.MainMenuCore = VisuMZ.MainMenuCore || {};
VisuMZ.MainMenuCore.version = 1.12;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.12] [MainMenuCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Main_Menu_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Main Menu Core plugin is designed to give you more control over the Main
 * Menu outside of RPG Maker MZ's editor's control. Game devs are given control
 * over how commands work, visual aesthetics pertaining to the Main Menu, and 
 * assign menu images to actors as background portraits.
 *
 * Features include all (but not limited to) the following:
 *
 * * Control over general Main Menu settings.
 * * The ability to set Menu Background Portraits for individual actors.
 * * Flexibility in changing which commands appear in the Main Menu.
 * * Add new windows like the Playtime Window and Variable windows.
 * * Change the style of how the windows are arranged in the Main Menu.
 * * Change the way the status list is displayed and the way it's displayed.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 1 ------
 *
 * This plugin is a Tier 1 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * The following are notetags that have been added through this plugin. These
 * notetags will not work with your game if this plugin is OFF or not present.
 *
 * ---
 *
 * <Menu Portrait: filename>
 *
 * - Used for: Actor
 * - This is used with the "Portrait" style Main Menu List.
 * - Sets the menu image for the actor to 'filename'.
 * - Replace 'filename' with a picture found within your game project's
 *   img/pictures/ folder. Filenames are case sensitive. Leave out the filename
 *   extension from the notetag.
 *
 * ---
 * 
 * <Menu Portrait Offset: +x, +y>
 * <Menu Portrait Offset: -x, -y>
 * 
 * <Menu Portrait Offset X: +x>
 * <Menu Portrait Offset X: -x>
 * 
 * <Menu Portrait Offset Y: +y>
 * <Menu Portrait Offset Y: -y>
 *
 * - Used for: Actor
 * - This is used with the "Portrait" style Main Menu List.
 * - Offsets the X and Y coordinates for the menu image.
 * - Replace 'x' with a number value that offsets the x coordinate.
 * - Negative x values offset left. Positive x values offset right.
 * - Replace 'y' with a number value that offsets the y coordinate.
 * - Negative y values offset up. Positive x values offset down.
 * - This only applies to the Main Menu portraits.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * The following are Plugin Commands that come with this plugin. They can be
 * accessed through the Plugin Command event command.
 *
 * ---
 * 
 * === Actor Plugin Commands ===
 * 
 * ---
 *
 * Actor: Change Menu Image (Group)
 * Actor: Change Menu Image (Range)
 * Actor: Change Menu Image (JS)
 * - Changes the actor's Menu Image.
 * - Each version has a different means of selecting Actor ID's.
 *
 *   Step 1: Actor:
 *   - Select which ID(s) to affect.
 *
 *     Single:
 *     - Select which specific ID to affect.
 *
 *     Variable Reference:
 *     - Which variable is used to determine which ID to affect?
 *
 *     Range Start:
 *     - Select where the ID range begins.
 *
 *     Range End:
 *     - Select where the ID range ends.
 *
 *     Group:
 *     - Select which group of ID(s) to affect.
 *
 *     JavaScript:
 *     - JavaScript code to return an array on which ID(s) to affect.
 *
 *   Step 2: Target:
 *   - Select operation on what to change the switch(es) to.
 *   - Depending on what you pick here, one of the following actions are used
 *     in combination with the ID's picked from Step 1.
 *
 *     Filename:
 *     - Selected actor(s) will have their menu images changed to this.
 *
 *     Variable Reference:
 *     - Select the variable used to determine filename used for the selected
 *       actor(s).
 *
 *     JavaScript:
 *     - JavaScript code to determine what filename is used for the selected
 *       actor(s).
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * These general settings contain various settings on how the Main Menu scene
 * displays certain windows, alters how specific windows behave, and determines
 * which scenes would display actor menu images as background portraits.
 *
 * ---
 *
 * Gold Window
 * 
 *   Thinner Gold Window:
 *   - Make the Gold Window thinner in the Main Menu?
 *   - Used to match the Playtime and Variable Windows.
 * 
 *   Auto Adjust Height:
 *   - Automatically adjust the height for the thinner Gold Window?
 *
 *   Auto Adjust Y:
 *   - Automatically adjust the Y position for the thinner Gold Window?
 *
 * ---
 * 
 * Status Window
 * 
 *   Select Last?:
 *   - When picking a personal command from the Command Window, select the
 *     last picked actor or always the first?
 * 
 * ---
 *
 * Solo Party
 *
 *   Solo Quick Mode:
 *   - When selecting "Skills", "Equip", or "Status" with one party member,
 *     immediately go to the scene.
 *
 * ---
 *
 * Sub Menus
 *
 *   Menus with Actor BG's:
 *   - A list of the menus that would be compatible with Actor Menu Backgrounds
 *
 *   JS: Actor BG Action:
 *   - Code used to determine how to display the sprites upon loading.
 *
 * ---
 * 
 * Party Window
 * 
 *   Show Reserve Memebers:
 *   - Show reserve members while on the Main Menu scene?
 * 
 *   Hide Main Menu Only
 *   - If reserve members are hidden, hide them only in the main menu or
 *     all scenes?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Command Window List
 * ============================================================================
 *
 * The Command Window functions as a hub to the various scenes linked from the
 * Main Menu. These include 'Item', 'Skill', 'Equip', 'Status', 'Save', and
 * so on. This Plugin Parameter is an array that lets you add, remove, and/or
 * alter the Command Window's various commands, how they're handled, whether or
 * not they're visible, and how they react when selected.
 *
 * These will require knowledge of JavaScript to use them properly.
 *
 * ---
 *
 * Command Window List
 * 
 *   Symbol:
 *   - The symbol used for this command.
 *
 *   Icon:
 *   - Icon used for this command.
 *   - Use 0 for no icon.
 * 
 *   STR: Text:
 *   - Displayed text used for this title command.
 *   - If this has a value, ignore the JS: Text version.
 *
 *   JS: Text:
 *   - JavaScript code used to determine string used for the displayed name.
 * 
 *   JS: Show:
 *   - JavaScript code used to determine if the item is shown or not.
 * 
 *   JS: Enable:
 *   - JavaScript code used to determine if the item is enabled or not.
 * 
 *   JS: Ext:
 *   - JavaScript code used to determine any ext data that should be added.
 * 
 *   JS: Run Code:
 *   - JavaScript code that runs once this command is selected.
 * 
 *   JS: Personal Code:
 *   - JavaScript code that runs once the actor list is selected with this
 *     command highlighted.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Playtime Window
 * ============================================================================
 *
 * The Playtime Window is an optional feature that can be displayed in the
 * Main Menu. As its name suggests, it displays the playtime of the player's
 * current play through.
 *
 * ---
 *
 * Playtime Window
 * 
 *   Enable:
 *   - Use the Playtime Window?
 * 
 *   Adjust Command Window:
 *   - Adjust the command window's height to fit in the Playtime Window?
 *
 *   Background Type:
 *   - Select background type for the Playtime window.
 * 
 *   Font Size:
 *   - Font size used for displaying Gold inside the Playtime window.
 * 
 *   Time Icon:
 *   - Icon displayed for the 'Time' label.
 * 
 *   Time Text:
 *   - Text for the display of 'Time' in the Playtime window.
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for the Playtime window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Variable Window
 * ============================================================================
 *
 * The Variable Window is an optional feature that can be displayed in the
 * Main Menu. If enabled, the Variable Window will display variables of the
 * game dev's choice in the Main Menu itself.
 *
 * ---
 *
 * Variable Window
 * 
 *   Enable:
 *   - Use the Variable Window?
 * 
 *   Adjust Command Window:
 *   - Adjust the command window's height to fit in the Variable Window?
 *
 *   Background Type:
 *   - Select background type for the Variable window.
 * 
 *   Font Size:
 *   - Font size used for displaying Gold inside the Variable window.
 * 
 *   Variable List:
 *   - Select variables to be displayed into the window.
 *     Use \i[x] to determine their icon.
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for the Variable window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Command Window Style & Command Style Settings
 * ============================================================================
 *
 * This determines how the Main Menu appears based on the Command Window Style.
 * If anything but the 'Default' is used, then these settings will take over
 * the window placement settings for the Main Menu. This means that even if you
 * are using VisuStella's Core Engine, the window layouts will be overwritten.
 *
 * ---
 *
 * Command Window Style:
 * - Choose the positioning and style of the Main Menu Command Window.
 * - This will automatically rearrange windows.
 * 
 *   Default Vertical Side Style:
 *   - The default Main Menu layout style.
 *   - Affected by VisuStella's Core Engine's Plugin Parameter settings.
 * 
 *   Top Horizontal Style:
 *   - Puts the Command Window at the top of the screen.
 *   - Gold, Playlist, and Variable Windows are moved to the bottom.
 *   - The Actor List Window is placed in the middle.
 *   - Unaffected by VisuStella's Core Engine's Plugin Parameter settings.
 *
 *   Bottom Horizontal Style:
 *   - Puts the Command Window at the bottom of the screen.
 *   - Gold, Playlist, and Variable Windows are moved to the top.
 *   - The Actor List Window is placed in the middle.
 *   - Unaffected by VisuStella's Core Engine's Plugin Parameter settings.
 * 
 *   Mobile Full Screen Style:
 *   - Puts the Command Window at the center of the screen with larger buttons.
 *   - Gold, Playlist, and Variable Windows are moved to the bottom.
 *   - The Actor List Window is hidden until prompted to be selected.
 *   - Unaffected by VisuStella's Core Engine's Plugin Parameter settings.
 *
 * ---
 *
 * Command Style Settings
 *
 *   Style:
 *   - How do you wish to draw command entries in the Command Window?
 *   - Text Only: displays only text.
 *   - Icon Only: displays only the icon.
 *   - Icon + Text: displays icon first, then text.
 *   - Automatic: determines the best fit for the size
 *
 *   Text Alignment:
 *   - Decide how you want the text to be aligned.
 *   - Left, Center, or Right
 * 
 *   Rows:
 *   - Number of visible rows.
 *   - Applies only to Top, Bottom, and Mobile styles.
 * 
 *   Columns:
 *   - Number of maximum columns.
 *   - Applies only to Top, Bottom, and Mobile styles.
 * 
 *   Mobile Thickness:
 *   - The thickness of the buttons for mobile version.
 *   - Applies only to Top, Bottom, and Mobile styles.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Status Graphic, Status List Style, & List Style Settings
 * ============================================================================
 *
 * Choose how the contents Actor Status List Window in the Main Menu appears.
 * This can range from the which actor graphic is drawn to the style used for
 * the data that's displayed.
 *
 * ---
 *
 * Status Graphic:
 * - Choose how the graphic for actor graphics appear in status-like menus.
 * 
 *   None:
 *   - Don't display any graphic for the actors.
 * 
 *   Face:
 *   - Display the actors' faces. This is the default option in RPG Maker MZ.
 *
 *   Map Sprite:
 *   - Display the actors' map sprites.
 * 
 *   Sideview Battler:
 *   - Display the actors' sideview battlers.
 *
 * ---
 *
 * Main Menu List Style
 * - Choose how the actor status list looks in the Main Menu.
 *
 * Inner-Menu List Style
 * - Choose how the actor status list looks in the inner menus like Scene_Item,
 *   Scene_Skill, etc.
 *
 *   Default Horizontal Style:
 *   - This is the default style found in RPG Maker MZ's Main Menu.
 *
 *   Vertical Style:
 *   - Makes the display for the actor list vertical instead of horizontal.
 *
 *   Portrait Style:
 *   - Similar to the vertical style, except each actor's Menu Image is
 *     displayed in the background instead. Portraits are required.
 *   - If there is no Menu Image used, this will switch over to the Vertical
 *     Style and use a face graphic instead.
 *
 *   Solo Style:
 *   - Used for solo party member games. Extends the whole view of the Status
 *     Window to accomodate a single actor.
 *
 *   Thin Horizontal Style:
 *   - Makes the selectable menu entries for the actors a single line thin.
 *
 *   Thicker Horizontal Style:
 *   - Makes the selectable menu entries for the actors two lines thick.
 *
 * ---
 *
 * List Styles
 *   JavaScript code used to determine how the individual styles are drawn.
 *
 *   JS: Default:
 *   JS: Vertical:
 *   JS: Portrait:
 *   JS: Solo:
 *   JS: Thin:
 *   JS: Thicker:
 *   - Code used to draw the data for these styles.
 *
 * ---
 *
 * ============================================================================
 * Terms of Use
 * ============================================================================
 *
 * 1. These plugins may be used in free or commercial games provided that they
 * have been acquired through legitimate means at VisuStella.com and/or any
 * other official approved VisuStella sources. Exceptions and special
 * circumstances that may prohibit usage will be listed on VisuStella.com.
 * 
 * 2. All of the listed coders found in the Credits section of this plugin must
 * be given credit in your games or credited as a collective under the name:
 * "VisuStella".
 * 
 * 3. You may edit the source code to suit your needs, so long as you do not
 * claim the source code belongs to you. VisuStella also does not take
 * responsibility for the plugin if any changes have been made to the plugin's
 * code, nor does VisuStella take responsibility for user-provided custom code
 * used for custom control effects including advanced JavaScript notetags
 * and/or plugin parameters that allow custom JavaScript code.
 * 
 * 4. You may NOT redistribute these plugins nor take code from this plugin to
 * use as your own. These plugins and their code are only to be downloaded from
 * VisuStella.com and other official/approved VisuStella sources. A list of
 * official/approved sources can also be found on VisuStella.com.
 *
 * 5. VisuStella is not responsible for problems found in your game due to
 * unintended usage, incompatibility problems with plugins outside of the
 * VisuStella MZ library, plugin versions that aren't up to date, nor
 * responsible for the proper working of compatibility patches made by any
 * third parties. VisuStella is not responsible for errors caused by any
 * user-provided custom code used for custom control effects including advanced
 * JavaScript notetags and/or plugin parameters that allow JavaScript code.
 *
 * 6. If a compatibility patch needs to be made through a third party that is
 * unaffiliated with VisuStella that involves using code from the VisuStella MZ
 * library, contact must be made with a member from VisuStella and have it
 * approved. The patch would be placed on VisuStella.com as a free download
 * to the public. Such patches cannot be sold for monetary gain, including
 * commissions, crowdfunding, and/or donations.
 *
 * ============================================================================
 * Credits
 * ============================================================================
 * 
 * If you are using this plugin, credit the following people in your game:
 * 
 * Team VisuStella
 * * Yanfly
 * * Arisu
 * * Olivia
 * * Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.12: July 16, 2021
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * * Feature Update!
 * ** Updated the default Plugin Parameters for 'Command Window List' to
 *    include a 'Message Log' command.
 * *** This is for the upcoming VisuMZ_3_MessageLog plugin.
 * *** Projects with the Main Menu Core already installed will not have this
 *     update, but you can copy over the settings from a new project with the
 *     following steps:
 * **** Create a new project. Install Main Menu Core. Open up the new project's
 *      'Command Window List'. Right click the 'MessageLog' option and click
 *      copy. Go to the target project's Main Menu Core's 'Command Window List'
 *      plugin parameter. Paste the command where you want it to go.
 * 
 * Version 1.11: May 14, 2021
 * * Feature Update!
 * ** Updated the default Plugin Parameters for 'Command Window List' to
 *    include a 'Load' command after the 'Save' command.
 * *** This allows players to access the load game screen from the Main Menu.
 * *** Projects with the Main Menu Core already installed will not have this
 *     update, but you can copy over the settings from a new project with the
 *     following steps:
 * **** Create a new project. Install Main Menu Core. Open up the new project's
 *      'Command Window List'. Right click the 'Load' option and click copy.
 *      Go to the target project's Main Menu Core's 'Command Window List'
 *      plugin parameter. Paste the command where you want it to go.
 * 
 * Version 1.10: April 16, 2021
 * * Feature Update!
 * ** Default style for List Styles now have its code updated with the
 *    JS: Default plugin parameter for games whose vertical screen resolution
 *    is larger than normal.
 * *** To update this, do either of the following:
 * **** Open up the Main Menu Core Plugin Parameters. Select and press delete 
 *      on "List Style Settings". Press Enter. New updated settings will be
 *      replaced for the JS: Default settings.
 * **** Or Delete the existing VisuMZ_1_MainMenuCore.js in the Plugin Manager
 *      list and install the newest version.
 * 
 * Version 1.09: March 19, 2021
 * * Documentation Update!
 * ** Added clarity for the "Portrait Style" in Plugin Parameters section for
 *    "Status Graphic, Status List Style, & List Style Settings":
 * *** If there is no Menu Image used, this will switch over to the Vertical
 *     Style and use a face graphic instead.
 * 
 * Version 1.08: February 26, 2021
 * * Feature Update!
 * ** Default Plugin Parameters for the List Style Settings defaults have been
 *    updated with tighter coordinate values to allow for more accurate display
 *    of UI element positioning. Update made by Olivia.
 * 
 * Version 1.07: January 1, 2021
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * ** Removed "<Menu Image: filename>" version of notetag to reduce confusion
 *    and to stick with the norm declared by the Battle Core.
 * * New Features!
 * ** New notetags added by Yanfly:
 * *** <Menu Portrait Offset: +x, +y>
 * *** <Menu Portrait Offset X: +x>
 * *** <Menu Portrait Offset Y: +y>
 * **** This is used with the "Portrait" style Main Menu list.
 * **** Offsets the X and Y coordinates for the menu portrait.
 * 
 * Version 1.06: December 11, 2020
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.05: October 11, 2020
 * * Documentation Update!
 * ** Documentation added for the new plugin parameter.
 * * New Features!
 * ** New plugin parameter added by Yanfly.
 * *** Plugin Parameters > General > Status Window > Select Last?
 * **** When picking a personal command from the Command Window, select the
 *      last picked actor or always the first?
 * 
 * Version 1.04: October 4, 2020
 * * Feature Update!
 * ** Certain windows will now pre-load all associated image types for the
 *    actor upon being created to avoid custom JS drawing problems.
 *    Change made by Irina.
 * ** Failsafes have been added to prevent non-existent variables from crashing
 *    the game if a user does not remove them from the variable list. Change
 *    made by Irina.
 * 
 * Version 1.03: September 20, 2020
 * * Documentation Update!
 * ** Added the alternative notetag <Menu Portrait: filename> that also works
 *    the same way as <Menu Image: filename>.
 * 
 * Version 1.02: September 13, 2020
 * * Compatibility Update!
 * ** Better compatibility for SV Actor graphics.
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** Skill check plugin parameter for show fixed. Fixed by Yanfly and Shaz.
 * *** Users updating from version 1.00 will need to fix this problem by either
 *     removing the plugin from the Plugin Manager list and reinstalling it, or
 *     going to Plugin Parameters > Command Window List > skill >
 *     JS: Show > and changing 'this.needsCommand("item")' to
 *     'this.needsCommand("skill")'
 *
 * Version 1.00: August 20, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ChangeActorMenuImageGroup
 * @text Actor: Change Menu Image (Group)
 * @desc Changes the actor's Menu Image.
 * Select from a group of actor ID's to change.
 *
 * @arg Step1:arraynum
 * @text Step 1: Target ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg Step2:str
 * @text Step 2: Filename
 * @type file
 * @dir img/pictures/
 * @desc Selected actor(s) will have their menu images changed to this.
 * @default 
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ChangeActorMenuImageRange
 * @text Actor: Change Menu Image (Range)
 * @desc Changes the actor's Menu Image.
 * Select from a range of actor ID's to change.
 *
 * @arg Step1
 * @text Step 1: ID Range
 *
 * @arg Step1Start:num
 * @text Range Start
 * @parent Step1
 * @type actor
 * @desc Select which Actor ID to start from.
 * @default 1
 *
 * @arg Step1End:num
 * @text Range End
 * @parent Step1
 * @type actor
 * @desc Select which Actor ID to end at.
 * @default 4
 *
 * @arg Step2:str
 * @text Step 2: Filename
 * @type file
 * @dir img/pictures/
 * @desc Selected actor(s) will have their menu images changed to this.
 * @default 
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ChangeActorMenuImageJS
 * @text Actor: Change Menu Image (JS)
 * @desc Changes the actor's Menu Image.
 * Select from a group of actor ID's using JavaScript.
 *
 * @arg Step1:arrayeval
 * @text Step 1: Target ID(s)
 * @type string[]
 * @desc Enter which Actor ID(s) to affect.
 * You may use JavaScript code.
 * @default ["$gameVariables.value(1)"]
 *
 * @arg Step2:str
 * @text Step 2: Filename
 * @type file
 * @dir img/pictures/
 * @desc Selected actor(s) will have their menu images changed to this.
 * @default 
 *
 * @ --------------------------------------------------------------------------
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param MainMenuCore
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param General:struct
 * @text General Settings
 * @type struct<General>
 * @desc General settings pertaining to the Main Menu and related.
 * @default {"GoldWindow":"","ThinGoldWindow:eval":"true","AutoGoldHeight:eval":"true","AutoGoldY:eval":"true","StatusWindow":"","StatusSelectLast:eval":"false","SoloParty":"","SoloQuick:eval":"true","SubMenus":"","ActorBgMenus:arraystr":"[\"Scene_Skill\"]","ActorBgMenuJS:func":"\"this.anchor.x = 0.5;\\nconst scale = 1.25;\\nthis.scale.x = this.scale.y = scale;\\nthis.x = Graphics.width;\\nthis.y = Graphics.height - (this.bitmap.height * Math.abs(scale));\\nthis._targetX = Graphics.width * 3 / 4;\\nthis._targetY = Graphics.height - (this.bitmap.height * Math.abs(scale));\\nthis._duration = 10;\\nthis.opacity = 0;\"","PartyWindow":"","ShowReserve:eval":"true","HideMainMenuOnly:eval":"true"}
 *
 * @param CommandList:arraystruct
 * @text Command Window List
 * @type struct<Command>[]
 * @desc Window commands used by the Main Menu.
 * Add new commands here.
 * @default ["{\"Symbol:str\":\"item\",\"Icon:num\":\"208\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.item;\\\"\",\"ShowJS:func\":\"\\\"return this.needsCommand(\\\\\\\"item\\\\\\\");\\\"\",\"EnableJS:func\":\"\\\"return this.areMainCommandsEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandItem();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"classChange\",\"Icon:num\":\"133\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.classChangeMenuCommand;\\\"\",\"ShowJS:func\":\"\\\"return Imported.VisuMZ_2_ClassChangeSystem &&\\\\n    this.isClassChangeCommandVisible();\\\"\",\"EnableJS:func\":\"\\\"return this.areMainCommandsEnabled() &&\\\\n    this.isClassChangeCommandEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandPersonal();\\\"\",\"PersonalHandlerJS:func\":\"\\\"SceneManager.push(Scene_ClassChange);\\\"\"}","{\"Symbol:str\":\"skill\",\"Icon:num\":\"101\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.skill;\\\"\",\"ShowJS:func\":\"\\\"return this.needsCommand(\\\\\\\"skill\\\\\\\");\\\"\",\"EnableJS:func\":\"\\\"return this.areMainCommandsEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandPersonal();\\\"\",\"PersonalHandlerJS:func\":\"\\\"SceneManager.push(Scene_Skill);\\\"\"}","{\"Symbol:str\":\"equip\",\"Icon:num\":\"137\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.equip;\\\"\",\"ShowJS:func\":\"\\\"return this.needsCommand(\\\\\\\"equip\\\\\\\");\\\"\",\"EnableJS:func\":\"\\\"return this.areMainCommandsEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandPersonal();\\\"\",\"PersonalHandlerJS:func\":\"\\\"SceneManager.push(Scene_Equip);\\\"\"}","{\"Symbol:str\":\"status\",\"Icon:num\":\"82\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.status;\\\"\",\"ShowJS:func\":\"\\\"return this.needsCommand(\\\\\\\"status\\\\\\\");\\\"\",\"EnableJS:func\":\"\\\"return this.areMainCommandsEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandPersonal();\\\"\",\"PersonalHandlerJS:func\":\"\\\"SceneManager.push(Scene_Status);\\\"\"}","{\"Symbol:str\":\"itemCrafting\",\"Icon:num\":\"223\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.ItemCraftingMenuCommand;\\\"\",\"ShowJS:func\":\"\\\"return Imported.VisuMZ_2_ItemCraftingSys &&\\\\n    this.isItemCraftingCommandVisible();\\\"\",\"EnableJS:func\":\"\\\"return this.isItemCraftingCommandEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandItemCrafting();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"quest\",\"Icon:num\":\"186\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.questCommandName;\\\"\",\"ShowJS:func\":\"\\\"return Imported.VisuMZ_2_QuestSystem &&\\\\n    this.isQuestCommandVisible();\\\"\",\"EnableJS:func\":\"\\\"return this.isQuestCommandEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandQuest();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"messageLog\",\"Icon:num\":\"193\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.MessageLogMenuCommand;\\\"\",\"ShowJS:func\":\"\\\"return Imported.VisuMZ_3_MessageLog &&\\\\n    this.isMessageLogCommandVisible();\\\"\",\"EnableJS:func\":\"\\\"return this.isMessageLogCommandEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandMessageLog();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"combatLog\",\"Icon:num\":\"189\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.combatLog_BattleCmd_Name;\\\"\",\"ShowJS:func\":\"\\\"return Imported.VisuMZ_4_CombatLog &&\\\\n    this.isCombatLogCommandVisible();\\\"\",\"EnableJS:func\":\"\\\"return this.isCombatLogCommandEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandCombatLog();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"formation\",\"Icon:num\":\"75\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.formation;\\\"\",\"ShowJS:func\":\"\\\"return this.needsCommand(\\\\\\\"formation\\\\\\\");\\\"\",\"EnableJS:func\":\"\\\"return this.isFormationEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandFormation();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"options\",\"Icon:num\":\"83\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.options;\\\"\",\"ShowJS:func\":\"\\\"return this.needsCommand(\\\\\\\"options\\\\\\\");\\\"\",\"EnableJS:func\":\"\\\"return this.isOptionsEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandOptions();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"save\",\"Icon:num\":\"189\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.save;\\\"\",\"ShowJS:func\":\"\\\"return this.needsCommand(\\\\\\\"save\\\\\\\");\\\"\",\"EnableJS:func\":\"\\\"return this.isSaveEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandSave();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"load\",\"Icon:num\":\"191\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return 'Load';\\\"\",\"ShowJS:func\":\"\\\"return this.needsCommand(\\\\\\\"save\\\\\\\");\\\"\",\"EnableJS:func\":\"\\\"return DataManager.isAnySavefileExists();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandLoad();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"commonEvent1\",\"Icon:num\":\"88\",\"TextStr:str\":\"Common Event 1\",\"TextJS:func\":\"\\\"return 'Text';\\\"\",\"ShowJS:func\":\"\\\"return false;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return 1;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandCommonEvent();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}","{\"Symbol:str\":\"commonEvent2\",\"Icon:num\":\"87\",\"TextStr:str\":\"Common Event 2\",\"TextJS:func\":\"\\\"return 'Text';\\\"\",\"ShowJS:func\":\"\\\"return false;\\\"\",\"EnableJS:func\":\"\\\"return this.areMainCommandsEnabled();\\\"\",\"ExtJS:func\":\"\\\"return 2;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandPersonal();\\\"\",\"PersonalHandlerJS:func\":\"\\\"// Declare Ext\\\\nconst ext = arguments[0];\\\\n\\\\n// Declare Status Window\\\\nconst statusWindow = SceneManager._scene._statusWindow;\\\\n\\\\n// Declare Actor ID\\\\nconst actorId = statusWindow.actor(statusWindow.index()).actorId();\\\\n\\\\n// Set variable 1 to Actor ID\\\\n$gameVariables.setValue(1, actorId);\\\\n\\\\n// Prepare Common Event ext to run\\\\n$gameTemp.reserveCommonEvent(ext);\\\\n\\\\n// Exit Main Menu\\\\nSceneManager._scene.popScene();\\\"\"}","{\"Symbol:str\":\"gameEnd\",\"Icon:num\":\"187\",\"TextStr:str\":\"\",\"TextJS:func\":\"\\\"return TextManager.gameEnd;\\\"\",\"ShowJS:func\":\"\\\"return this.needsCommand(\\\\\\\"gameEnd\\\\\\\");\\\"\",\"EnableJS:func\":\"\\\"return this.isGameEndEnabled();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandGameEnd();\\\"\",\"PersonalHandlerJS:func\":\"\\\"const ext = arguments[0];\\\"\"}"]
 *
 * @param Playtime:struct
 * @text Playtime Window
 * @type struct<Playtime>
 * @desc Settings for the Playtime Window.
 * @default {"Enable:eval":"true","AdjustCommandHeight:func":"true","BgType:num":"0","FontSize:num":"24","Icon:num":"75","Time:str":"Time","WindowRect:func":"\"const rows = 1;\\nconst ww = this.mainCommandWidth();\\nconst wh = this.calcWindowHeight(rows, false);\\nconst wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;\\nlet wy = this.mainAreaBottom() - wh;\\nif (this._goldWindow) wy -= this._goldWindow.height;\\nif (this.canCreateVariableWindow()) wy -= this.variableWindowRect().height;\\nreturn new Rectangle(wx, wy, ww, wh);\""}
 *
 * @param Variable:struct
 * @text Variable Window
 * @type struct<Variable>
 * @desc Settings for the Variable Window.
 * @default {"Enable:eval":"false","AdjustCommandHeight:func":"true","BgType:num":"0","FontSize:num":"24","VarList:arraynum":"[\"1\",\"2\"]","WindowRect:func":"\"const rows = VisuMZ.MainMenuCore.Settings.Variable.VarList.length;\\nconst ww = this.mainCommandWidth();\\nconst wh = this.calcWindowHeight(rows, false);\\nconst wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;\\nlet wy = this.mainAreaBottom() - wh;\\nif (this._goldWindow) wy -= this._goldWindow.height;\\nreturn new Rectangle(wx, wy, ww, wh);\""}
 *
 * @param ParamBreak1
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param CommandWindowStyle:str
 * @text Command Window Style
 * @type select
 * @option Default Vertical Side Style
 * @value default
 * @option Top Horizontal Style
 * @value top
 * @option Thin Top Horizontal Style
 * @value thinTop
 * @option Bottom Horizontal Style
 * @value bottom
 * @option Thin Bottom Horizontal Style
 * @value thinBottom
 * @option Mobile Full Screen Style
 * @value mobile
 * @desc Choose the positioning and style of the Main Menu Command Window. This will automatically rearrange windows.
 * @default top
 *
 * @param CustomCmdWin:struct
 * @text Command Style Settings
 * @parent CommandWindowStyle:str
 * @type struct<CustomCmdWin>
 * @desc Settings for the non-default Command Window Styles.
 * @default {"Style:str":"auto","TextAlign:str":"center","Rows:num":"2","Cols:num":"4","MobileThickness:num":"5"}
 *
 * @param ParamBreak2
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param StatusGraphic:str
 * @text Status Graphic
 * @type select
 * @option None
 * @value none
 * @option Face
 * @value face
 * @option Map Sprite
 * @value sprite
 * @option Sideview Battler
 * @value svbattler
 * @desc Choose how the actor graphics appear in status-like menus.
 * @default face
 *
 * @param StatusListStyle:str
 * @text Main Menu List Style
 * @type select
 * @option Default Horizontal Style
 * @value default
 * @option Vertical Style
 * @value vertical
 * @option Portrait Style
 * @value portrait
 * @option Solo Style
 * @value solo
 * @option Thin Horizontal Style
 * @value thin
 * @option Thicker Horizontal Style
 * @value thicker
 * @desc Choose how the actor status list looks in the Main Menu.
 * @default portrait
 *
 * @param InnerMenuListStyle:str
 * @text Inner-Menu List Style
 * @parent StatusListStyle:str
 * @type select
 * @option Default Horizontal Style
 * @value default
 * @option Vertical Style
 * @value vertical
 * @option Portrait Style
 * @value portrait
 * @option Solo Style
 * @value solo
 * @option Thin Horizontal Style
 * @value thin
 * @option Thicker Horizontal Style
 * @value thicker
 * @desc Choose how the actor status list looks in the inner menus
 * like Scene_Item, Scene_Skill, etc.
 * @default default
 *
 * @param ListStyles:struct
 * @text List Style Settings
 * @parent StatusListStyle:str
 * @type struct<ListStyles>
 * @desc JavaScript code used to determine how the individual styles are drawn.
 * @default {"DefaultStyle:func":"\"// Declare Constants\\nconst actor = arguments[0];\\nconst rect = arguments[1];\\n\\n// Draw Actor Graphic\\nconst gx = rect.x + (this.graphicType() === 'face' ? 1 : 0);\\nconst gy = rect.y + (this.graphicType() === 'face' ? 1 : 0);\\nconst gw = Math.min(rect.width, ImageManager.faceWidth);\\nconst gh = Math.min(rect.height, ImageManager.faceHeight);\\nthis.drawActorGraphic(actor, gx, gy, gw, gh);\\n\\n// Draw Status Stuff\\nconst sx = rect.x + 180;\\nconst sy = rect.y + rect.height / 2 - this.lineHeight() * 1.5;\\nconst lineHeight = this.lineHeight();\\nconst sx2 = sx + 180;\\nthis.drawActorName(actor, sx, sy);\\nthis.drawActorLevel(actor, sx, sy + lineHeight * 1);\\nthis.drawActorIcons(actor, sx, sy + lineHeight * 2);\\nthis.drawActorClass(actor, sx2, sy);\\n\\n// Place Gauges\\nconst sy2 = sy + lineHeight;\\nconst gaugeLineHeight = this.gaugeLineHeight();\\nthis.placeGauge(actor, \\\"hp\\\", sx2, sy2);\\nthis.placeGauge(actor, \\\"mp\\\", sx2, sy2 + gaugeLineHeight);\\nconst roomForTp = (sy2 + gaugeLineHeight * 3) <= rect.y + rect.height;\\nif ($dataSystem.optDisplayTp && roomForTp) {\\n    this.placeGauge(actor, \\\"tp\\\", sx2, sy2 + gaugeLineHeight * 2);\\n}\\n\\n// Following Requires VisuStella MZ's Core Engine\\n// Draw Additional Parameter Data if Enough Room\\nconst sx3 = sx2 + 180;\\nconst sw = rect.width - sx3 - 2;\\nif (Imported.VisuMZ_0_CoreEngine && sw >= 300) {\\n    const params = VisuMZ.CoreEngine.Settings.Param.DisplayedParams;\\n    const pw = Math.floor(sw / 2) - 24;\\n    let px = sx3;\\n    let py = rect.y + Math.floor((rect.height - (Math.ceil(params.length / 2) * gaugeLineHeight)) / 2);\\n    let counter = 0;\\n    for (const param of params) {\\n        this.resetFontSettings();\\n        this.drawParamText(px, py, pw, param, true);\\n        this.resetTextColor();\\n        this.contents.fontSize -= 8;\\n        const paramValue = actor.paramValueByName(param, true);\\n        this.contents.drawText(paramValue, px, py, pw, gaugeLineHeight, 'right');\\n        counter++;\\n        if (counter % 2 === 0) {\\n            px = sx3;\\n            py += gaugeLineHeight;\\n        } else {\\n            px += pw + 24;\\n        }\\n    }\\n}\"","VerticalStyle:func":"\"// Declare Constants\\nconst actor = arguments[0];\\nconst rect = arguments[1];\\n\\n\\nconst lineHeight = this.lineHeight();\\nconst gaugeLineHeight = this.gaugeLineHeight();\\nconst totalHeight = (lineHeight * 4.5) + (gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2));\\n\\n// Draw Actor Graphic\\nconst gw = rect.width;\\nconst gh = Math.min(rect.height, ImageManager.faceHeight);\\nconst gx = rect.x;\\nconst gy = Math.max(rect.y, rect.y + (rect.height - totalHeight - gh) / 2);\\nthis.drawActorGraphic(actor, gx, gy, gw, gh);\\n\\n// Draw Actor Name\\nlet sx = rect.x;\\nlet sy = Math.max(gy + gh, rect.y + (rect.height - totalHeight + gh) / 2);\\nlet sw = rect.width;\\nthis.drawText(actor.name(), sx, sy, sw, 'center');\\n\\n// Draw Actor Level\\nsx = rect.x + Math.round((rect.width - 128) / 2);\\nsy += lineHeight;\\nthis.drawActorLevel(actor, sx, sy);\\n\\n// Draw Actor Class\\nconst className = actor.currentClass().name;\\nsx = rect.x + Math.round((rect.width - this.textSizeEx(className).width) / 2);\\nsy += lineHeight;\\nthis.drawTextEx(className, sx, sy, sw);\\n\\n// Draw Actor Icons\\nsx = rect.x + Math.round((rect.width - 128) / 2);\\nsy += lineHeight;\\nthis.drawActorIcons(actor, sx, sy);\\n\\n// Draw Gauges\\nsx = rect.x + Math.round((rect.width - 128) / 2);\\nsy += lineHeight;\\nthis.placeGauge(actor, \\\"hp\\\", sx, sy);\\nsy += gaugeLineHeight;\\nthis.placeGauge(actor, \\\"mp\\\", sx, sy);\\nsy += gaugeLineHeight;\\nif ($dataSystem.optDisplayTp) {\\n    this.placeGauge(actor, \\\"tp\\\", sx, sy);\\n}\"","PortraitStyle:func":"\"// Declare Constants\\nconst actor = arguments[0];\\nconst rect = arguments[1];\\n\\n// Make Constants\\nconst lineHeight = this.lineHeight();\\nconst gaugeLineHeight = this.gaugeLineHeight();\\nconst totalHeight = (lineHeight * 4.5) + (gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2));\\n\\n// Draw Actor Graphic\\nconst gw = rect.width;\\nconst gh = rect.height;\\nconst gx = rect.x;\\nconst gy = rect.y;\\nthis.drawItemActorMenuImage(actor, gx, gy, gw, gh);\\n\\n// Draw Dark Rectangle\\nlet sx = rect.x;\\nlet sy = Math.max(rect.y, rect.y + (rect.height - totalHeight));\\nlet sw = rect.width;\\nlet sh = rect.y + rect.height - sy;\\nthis.contents.fillRect(sx+1, sy+lineHeight/2, sw-2, sh-1-lineHeight/2, ColorManager.dimColor1());\\nthis.contents.gradientFillRect(sx+1, sy-lineHeight/2, sw-2, lineHeight, ColorManager.dimColor2(), ColorManager.dimColor1(), true);\\n\\n// Draw Actor Name\\nthis.drawText(actor.name(), sx, sy, sw, 'center');\\n\\n// Draw Actor Level\\nsx = rect.x + Math.round((rect.width - 128) / 2);\\nsy += lineHeight;\\nthis.drawActorLevel(actor, sx, sy);\\n\\n// Draw Actor Class\\nconst className = actor.currentClass().name;\\nsx = rect.x + Math.round((rect.width - this.textSizeEx(className).width) / 2);\\nsy += lineHeight;\\nthis.drawTextEx(className, sx, sy, sw);\\n\\n// Draw Actor Icons\\nsx = rect.x + Math.round((rect.width - 128) / 2);\\nsy += lineHeight;\\nthis.drawActorIcons(actor, sx, sy);\\n\\n// Draw Gauges\\nsx = rect.x + Math.round((rect.width - 128) / 2);\\nsy += lineHeight;\\nthis.placeGauge(actor, \\\"hp\\\", sx, sy);\\nsy += gaugeLineHeight;\\nthis.placeGauge(actor, \\\"mp\\\", sx, sy);\\nsy += gaugeLineHeight;\\nif ($dataSystem.optDisplayTp) {\\n    this.placeGauge(actor, \\\"tp\\\", sx, sy);\\n}\"","SoloStyle:func":"\"// Declare Constants\\nconst actor = arguments[0];\\nconst rect = arguments[1];\\n\\n// Make Constants\\nconst lineHeight = this.lineHeight();\\nconst gaugeLineHeight = this.gaugeLineHeight();\\n\\n// Draw Actor Graphic\\nlet sx = rect.x;\\nlet sy = rect.y;\\nlet sw = rect.width;\\nlet sh = rect.height;\\n\\n// Portrait\\nif (actor.getMenuImage() !== '') {\\n    this.drawItemActorMenuImage(actor, rect.x, rect.y, rect.width, rect.height);\\n\\n// Everything Else\\n} else {\\n    const gx = Math.max(0, rect.x + Math.floor(((rect.width / 2) - ImageManager.faceWidth) / 2));\\n    const gy = Math.max(0, rect.y + rect.height - Math.ceil(lineHeight * 4.5) - ImageManager.faceHeight);\\n    this.drawActorGraphic(actor, gx, gy, ImageManager.faceWidth, ImageManager.faceHeight);\\n}\\n\\n// Draw Dark Rectangle\\nsh = Math.ceil(lineHeight * 4.5);\\nsy = rect.y + rect.height - sh;\\nthis.contents.fillRect(sx+1, sy+lineHeight/2, sw-2, sh-1-lineHeight/2, ColorManager.dimColor1());\\nthis.contents.gradientFillRect(sx+1, sy-lineHeight/2, sw-2, lineHeight, ColorManager.dimColor2(), ColorManager.dimColor1(), true);\\n\\n// Draw Actor Name\\nsw = Math.round(rect.width / 2);\\nthis.drawText(actor.name(), sx, sy, sw, 'center');\\n\\n// Draw Actor Level\\nsx = Math.max(0, rect.x + Math.floor(((rect.width / 2) - 128) / 2));\\nsy += lineHeight;\\nthis.drawActorLevel(actor, sx, sy);\\n\\n// Draw Actor Class\\nconst className = actor.currentClass().name;\\nsx = rect.x + Math.round(((rect.width / 2) - this.textSizeEx(className).width) / 2);\\nsy += lineHeight;\\nthis.drawTextEx(className, sx, sy, sw);\\n\\n// Draw Actor Icons\\nsx = rect.x + Math.round(((rect.width / 2) - 128) / 2);\\nsy += lineHeight;\\nthis.drawActorIcons(actor, sx, sy);\\n\\n// Prepare Stat Coordinates\\nsx = rect.x + Math.floor(rect.width / 2);\\nsw = rect.width / 2;\\nsh = rect.height;\\nconst sx3 = sx;\\nconst cw = rect.width - sx3 - 2;\\n\\n// Prepare Total Content Height to vertically center the content.\\nlet totalHeight = gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2);\\nif (Imported.VisuMZ_0_CoreEngine && cw >= 300) {\\n    const params = VisuMZ.CoreEngine.Settings.Param.DisplayedParams;\\n    totalHeight += lineHeight;\\n    totalHeight += Math.ceil(params.length / 2) * gaugeLineHeight;\\n}\\nconst equips = actor.equips();\\ntotalHeight += lineHeight;\\ntotalHeight += equips.length * lineHeight;\\nsy = Math.max(rect.y, rect.y + Math.floor((rect.height - totalHeight) / 2));\\n\\n// Place Gauges\\nthis.placeGauge(actor, \\\"hp\\\", sx, sy);\\nsy += gaugeLineHeight;\\nthis.placeGauge(actor, \\\"mp\\\", sx, sy);\\nif ($dataSystem.optDisplayTp) {\\n    sy += gaugeLineHeight;\\n    this.placeGauge(actor, \\\"tp\\\", sx, sy);\\n    sy += gaugeLineHeight;\\n}\\nlet ny = sy;\\n\\n// Following Requires VisuStella MZ's Core Engine\\n// Draw Additional Parameter Data if Enough Room\\nif (Imported.VisuMZ_0_CoreEngine && cw >= 300) {\\n    const params = VisuMZ.CoreEngine.Settings.Param.DisplayedParams;\\n    sy += lineHeight;\\n    const pw = Math.floor(cw / 2) - 24;\\n    let px = sx3;\\n    let counter = 0;\\n    for (const param of params) {\\n        this.resetFontSettings();\\n        this.drawParamText(px, sy, pw, param, true);\\n        this.resetTextColor();\\n        this.contents.fontSize -= 8;\\n        const paramValue = actor.paramValueByName(param, true);\\n        this.contents.drawText(paramValue, px, sy, pw, gaugeLineHeight, 'right');\\n        counter++;\\n        if (counter % 2 === 0) {\\n            px = sx3;\\n            sy += gaugeLineHeight;\\n        } else {\\n            px += pw + 24;\\n        }\\n    }\\n    ny += lineHeight;\\n    ny += Math.ceil(params.length / 2) * gaugeLineHeight;\\n}\\n\\n// Draw Actor Equipment\\nthis.resetFontSettings();\\nsx = rect.x + Math.floor(rect.width / 2);\\nsy = ny + lineHeight;\\nsw = rect.width / 2;\\nfor (const equip of equips) {\\n    if (equip) {\\n        this.drawItemName(equip, sx, sy, sw);\\n        sy += lineHeight;\\n        if (sy + lineHeight > rect.y + rect.height) return;\\n    }\\n}\"","ThinStyle:func":"\"// Declare Constants\\nconst actor = arguments[0];\\nconst rect = arguments[1];\\n\\n// Draw Actor Graphic\\nconst gx = rect.x + (this.graphicType() === 'face' ? 1 : 0);\\nconst gy = rect.y + (this.graphicType() === 'face' ? 1 : 0);\\nconst gw = Math.min(rect.width, ImageManager.faceWidth);\\nconst gh = Math.min(rect.height, ImageManager.faceHeight);\\nthis.drawActorGraphic(actor, gx, gy, gw, gh);\\n\\n// Draw Status Stuff\\nconst lineHeight = this.lineHeight();\\nlet sx = rect.x + 160;\\nlet sy = rect.y + ((rect.height - lineHeight) / 2) - 2;\\n\\n// Draw Actor Data\\nthis.drawActorName(actor, sx, sy);\\nthis.drawActorLevel(actor, gx+8, rect.y + rect.height - lineHeight +1);\\n\\n// Place Gauges\\nsx += 180;\\nsy += (lineHeight - this.gaugeLineHeight()) / 2;\\nthis.placeGauge(actor, \\\"hp\\\", sx, sy);\\nsx += 140;\\nif ((sx + 128) > rect.x + rect.width) return;\\nthis.placeGauge(actor, \\\"mp\\\", sx, sy);\\nsx += 140;\\nif ((sx + 128) > rect.x + rect.width) return;\\nif ($dataSystem.optDisplayTp) this.placeGauge(actor, \\\"tp\\\", sx, sy);\"","ThickerStyle:func":"\"// Declare Constants\\nconst actor = arguments[0];\\nconst rect = arguments[1];\\n\\n// Draw Actor Graphic\\nconst gx = rect.x + (this.graphicType() === 'face' ? 1 : 0);\\nconst gy = rect.y + (this.graphicType() === 'face' ? 1 : 0);\\nconst gw = Math.min(rect.width, ImageManager.faceWidth);\\nconst gh = Math.min(rect.height, ImageManager.faceHeight);\\nthis.drawActorGraphic(actor, gx, gy, gw, gh);\\n\\n// Draw Status Stuff\\nconst lineHeight = this.lineHeight();\\nconst gaugeLineHeight = this.gaugeLineHeight();\\nlet sx = rect.x + 160;\\nlet sy = rect.y + ((rect.height - (lineHeight * 2)) / 2) - 2;\\n\\n// Draw Actor Data\\nthis.drawActorLevel(actor, gx+8, rect.y + rect.height - lineHeight +1);\\nthis.drawActorName(actor, sx, sy);\\nthis.drawActorClass(actor, sx, sy + lineHeight);\\n//this.drawActorLevel(actor, sx, sy + lineHeight);\\n\\n// Place Gauges\\nsx += 180;\\nsy = rect.y + ((rect.height - (gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2))) / 2) - 2;\\nthis.placeGauge(actor, \\\"hp\\\", sx, sy);\\nthis.placeGauge(actor, \\\"mp\\\", sx, sy + gaugeLineHeight);\\nif ($dataSystem.optDisplayTp) this.placeGauge(actor, \\\"tp\\\", sx, sy + (gaugeLineHeight * 2));\\nsx += 160;\\n\\n// Following Requires VisuStella MZ's Core Engine\\n// Draw Additional Parameter Data if Enough Room\\nconst sx3 = sx;\\nconst sw = rect.width - sx3 - 2;\\nif (Imported.VisuMZ_0_CoreEngine && sw >= 300) {\\n    const params = VisuMZ.CoreEngine.Settings.Param.DisplayedParams;\\n    const pw = Math.floor(sw / 2) - 24;\\n    sy = rect.y + ((rect.height - (gaugeLineHeight * Math.ceil(params.length / 2))) / 2) - 2;\\n    let px = sx3;\\n    let py = rect.y + Math.floor((rect.height - (Math.ceil(params.length / 2) * gaugeLineHeight)) / 2);\\n    let counter = 0;\\n    for (const param of params) {\\n        this.resetFontSettings();\\n        this.drawParamText(px, py, pw, param, true);\\n        this.resetTextColor();\\n        this.contents.fontSize -= 8;\\n        const paramValue = actor.paramValueByName(param, true);\\n        this.contents.drawText(paramValue, px, py, pw, gaugeLineHeight, 'right');\\n        counter++;\\n        if (counter % 2 === 0) {\\n            px = sx3;\\n            py += gaugeLineHeight;\\n        } else {\\n            px += pw + 24;\\n        }\\n    }\\n}\""}
 *
 * @param BreakEnd1
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param End Of
 * @default Plugin Parameters
 *
 * @param BreakEnd2
 * @text --------------------------
 * @default ----------------------------------
 *
 */
/* ----------------------------------------------------------------------------
 * Commands Struct
 * ----------------------------------------------------------------------------
 */
/*~struct~Command:
 *
 * @param Symbol:str
 * @text Symbol
 * @desc The symbol used for this command.
 * @default Symbol
 *
 * @param Icon:num
 * @text Icon
 * @desc Icon used for this command.
 * Use 0 for no icon.
 * @default 0
 *
 * @param TextStr:str
 * @text STR: Text
 * @desc Displayed text used for this menu command.
 * If this has a value, ignore the JS: Text version.
 * @default Untitled
 *
 * @param TextJS:func
 * @text JS: Text
 * @type note
 * @desc JavaScript code used to determine string used for the displayed name.
 * @default "return 'Text';"
 *
 * @param ShowJS:func
 * @text JS: Show
 * @type note
 * @desc JavaScript code used to determine if the item is shown or not.
 * @default "return true;"
 *
 * @param EnableJS:func
 * @text JS: Enable
 * @type note
 * @desc JavaScript code used to determine if the item is enabled or not.
 * @default "return true;"
 *
 * @param ExtJS:func
 * @text JS: Ext
 * @type note
 * @desc JavaScript code used to determine any ext data that should be added.
 * @default "return null;"
 *
 * @param CallHandlerJS:func
 * @text JS: Run Code
 * @type note
 * @desc JavaScript code that runs once this command is selected.
 * @default "const ext = arguments[0];"
 *
 * @param PersonalHandlerJS:func
 * @text JS: Personal Code
 * @type note
 * @desc JavaScript code that runs once the actor list is selected with this command highlighted.
 * @default "const ext = arguments[0];"
 *
 */
/* ----------------------------------------------------------------------------
 * General Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~General:
 *
 * @param GoldWindow
 * @text Gold Window
 *
 * @param ThinGoldWindow:eval
 * @text Thinner Gold Window
 * @parent GoldWindow
 * @type boolean
 * @on Thinner
 * @off Normal
 * @desc Make the Gold Window thinner in the Main Menu?
 * Used to match the Playtime and Variable Windows.
 * @default true
 *
 * @param AutoGoldHeight:eval
 * @text Auto Adjust Height
 * @parent GoldWindow
 * @type boolean
 * @on Automatic
 * @off Manual
 * @desc Automatically adjust the height for the thinner Gold Window?
 * @default true
 *
 * @param AutoGoldY:eval
 * @text Auto Adjust Y
 * @parent GoldWindow
 * @type boolean
 * @on Automatic
 * @off Manual
 * @desc Automatically adjust the Y position for the thinner Gold Window?
 * @default true
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusSelectLast:eval
 * @text Select Last?
 * @parent StatusWindow
 * @type boolean
 * @on Last Picked Actor
 * @off Always First Actor
 * @desc When picking a personal command from the Command Window,
 * select the last picked actor or always the first?
 * @default false
 *
 * @param SoloParty
 * @text Solo Party
 *
 * @param SoloQuick:eval
 * @text Solo Quick Mode
 * @parent SoloParty
 * @type boolean
 * @on Quick
 * @off Normal
 * @desc When selecting "Skills", "Equip", or "Status" with one party member, immediately go to the scene.
 * @default true
 *
 * @param SubMenus
 * @text Sub Menus
 *
 * @param ActorBgMenus:arraystr
 * @text Menus with Actor BG's
 * @parent SubMenus
 * @type string[]
 * @desc A list of the menus that would be compatible with Actor Menu Backgrounds.
 * @default ["Scene_Skill","Scene_Equip","Scene_Status"]
 *
 * @param ActorBgMenuJS:func
 * @text JS: Actor BG Action
 * @parent SubMenus
 * @type note
 * @desc Code used to determine how to display the sprites upon loading.
 * @default "this.anchor.x = 0.5;\nconst scale = 1.25;\nthis.scale.x = this.scale.y = scale;\nthis.x = Graphics.width;\nthis.y = Graphics.height - (this.bitmap.height * Math.abs(scale));\nthis._targetX = Graphics.width * 3 / 4;\nthis._targetY = Graphics.height - (this.bitmap.height * Math.abs(scale));\nthis._duration = 10;\nthis.opacity = 0;"
 *
 * @param PartyWindow
 * @text Party Window
 *
 * @param ShowReserve:eval
 * @text Show Reserve Memebers
 * @parent PartyWindow
 * @type boolean
 * @on Show Reserve Members
 * @off Hide Reserve Members
 * @desc Show reserve members while on the Main Menu scene?
 * @default true
 *
 * @param HideMainMenuOnly:eval
 * @text Hide Main Menu Only
 * @parent ShowReserve:eval
 * @type boolean
 * @on Hide in Main Menu Only
 * @off Hide in all Scenes
 * @desc If reserve members are hidden, hide them only in the main menu or all scenes?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Playtime Window
 * ----------------------------------------------------------------------------
 */
/*~struct~Playtime:
 *
 * @param Enable:eval
 * @text Use Window
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc Use the Playtime Window?
 * @default true
 *
 * @param AdjustCommandHeight:func
 * @text Adjust Command Window
 * @type boolean
 * @on Enable
 * @off Normal
 * @desc Adjust the command window's height to fit in the Playtime Window?
 * @default true
 *
 * @param BgType:num
 * @text Background Type
 * @type select
 * @option Window
 * @value 0
 * @option Dim
 * @value 1
 * @option Transparent
 * @value 2
 * @desc Select background type for the Playtime window.
 * @default 0
 *
 * @param FontSize:num
 * @text Font Size
 * @type number
 * @min 1
 * @desc Font size used for displaying Gold inside the Playtime window.
 * Default: 26
 * @default 20
 *
 * @param Icon:num
 * @text Time Icon
 * @desc Icon displayed for the 'Time' label.
 * @default 75
 *
 * @param Time:str
 * @text Time Text
 * @desc Text for the display of 'Time' in the Playtime window.
 * @default Time
 *
 * @param WindowRect:func
 * @text JS: X, Y, W, H
 * @type note
 * @desc Code used to determine the dimensions for the Playtime window.
 * @default "const rows = 1;\nconst ww = this.mainCommandWidth();\nconst wh = this.calcWindowHeight(rows, false);\nconst wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;\nlet wy = this.mainAreaBottom() - wh;\nif (this._goldWindow) wy -= this._goldWindow.height;\nif (this.canCreateVariableWindow()) wy -= this.variableWindowRect().height;\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 */
/* ----------------------------------------------------------------------------
 * Variable Window
 * ----------------------------------------------------------------------------
 */
/*~struct~Variable:
 *
 * @param Enable:eval
 * @text Use Window
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc Use the Variable Window?
 * @default false
 *
 * @param AdjustCommandHeight:func
 * @text Adjust Command Window
 * @type boolean
 * @on Enable
 * @off Normal
 * @desc Adjust the command window's height to fit in the Variable Window?
 * @default true
 *
 * @param BgType:num
 * @text Background Type
 * @type select
 * @option Window
 * @value 0
 * @option Dim
 * @value 1
 * @option Transparent
 * @value 2
 * @desc Select background type for the Variable window.
 * @default 0
 *
 * @param FontSize:num
 * @text Font Size
 * @type number
 * @min 1
 * @desc Font size used for displaying Gold inside the Variable window.
 * Default: 26
 * @default 20
 *
 * @param VarList:arraynum
 * @text Variable List
 * @type variable[]
 * @desc Select variables to be displayed into the window.
 * Use \i[x] to determine their icon.
 * @default ["1","2","3"]
 *
 * @param WindowRect:func
 * @text JS: X, Y, W, H
 * @type note
 * @desc Code used to determine the dimensions for the Variable window.
 * @default "const rows = VisuMZ.MainMenuCore.Settings.Variable.VarList.length;\nconst ww = this.mainCommandWidth();\nconst wh = this.calcWindowHeight(rows, false);\nconst wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;\nlet wy = this.mainAreaBottom() - wh;\nif (this._goldWindow) wy -= this._goldWindow.height;\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 */
/* ----------------------------------------------------------------------------
 * Horizontal Command Window Style
 * ----------------------------------------------------------------------------
 */
/*~struct~CustomCmdWin:
 *
 * @param Style:str
 * @text Command Style
 * @parent MainList
 * @type select
 * @option Text Only
 * @value text
 * @option Icon Only
 * @value icon
 * @option Icon + Text
 * @value iconText
 * @option Automatic
 * @value auto
 * @desc How do you wish to draw command entries in the Command Window?
 * @default auto
 *
 * @param TextAlign:str
 * @text Text Alignment
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Decide how you want the text to be aligned.
 * @default center
 *
 * @param Rows:num
 * @text Rows
 * @type number
 * @min 1
 * @desc Number of visible rows.
 * @default 2
 *
 * @param Cols:num
 * @text Columns
 * @type number
 * @min 1
 * @desc Number of maximum columns.
 * @default 4
 *
 * @param MobileThickness:num
 * @text Mobile Thickness
 * @type number
 * @min 1
 * @desc The thickness of the buttons for mobile version.
 * @default 5
 *
 */
/* ----------------------------------------------------------------------------
 * List Style Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ListStyles:
 *
 * @param DefaultStyle:func
 * @text JS: Default
 * @type note
 * @desc Code used to draw the data for this particular style.
 * @default "// Declare Constants\nconst actor = arguments[0];\nconst rect = arguments[1];\n\n// Draw Actor Graphic\nconst gw = Math.min(rect.width, ImageManager.faceWidth);\nconst gh = Math.min(rect.height, ImageManager.faceHeight);\nconst gx = rect.x + (this.graphicType() === 'face' ? 1 : 0);\nconst gy = rect.y + Math.floor((rect.height - gh) / 2);\nthis.drawActorGraphic(actor, gx, gy, gw, gh);\n\n// Draw Status Stuff\nconst sx = rect.x + 180;\nconst sy = rect.y + rect.height / 2 - this.lineHeight() * 1.5;\nconst lineHeight = this.lineHeight();\nconst sx2 = sx + 180;\nthis.drawActorName(actor, sx, sy);\nthis.drawActorLevel(actor, sx, sy + lineHeight * 1);\nthis.drawActorIcons(actor, sx, sy + lineHeight * 2);\nthis.drawActorClass(actor, sx2, sy);\n\n// Place Gauges\nconst sy2 = sy + lineHeight;\nconst gaugeLineHeight = this.gaugeLineHeight();\nthis.placeGauge(actor, \"hp\", sx2, sy2);\nthis.placeGauge(actor, \"mp\", sx2, sy2 + gaugeLineHeight);\nconst roomForTp = (sy2 + gaugeLineHeight * 3) <= rect.y + rect.height;\nif ($dataSystem.optDisplayTp && roomForTp) {\n    this.placeGauge(actor, \"tp\", sx2, sy2 + gaugeLineHeight * 2);\n}\n\n// Following Requires VisuStella MZ's Core Engine\n// Draw Additional Parameter Data if Enough Room\nconst sx3 = sx2 + 180;\nconst sw = rect.width - sx3 - 2;\nif (Imported.VisuMZ_0_CoreEngine && sw >= 300) {\n    const params = VisuMZ.CoreEngine.Settings.Param.DisplayedParams;\n    const pw = Math.floor(sw / 2) - 24;\n    let px = sx3;\n    let py = rect.y + Math.floor((rect.height - (Math.ceil(params.length / 2) * gaugeLineHeight)) / 2);\n    let counter = 0;\n    for (const param of params) {\n        this.resetFontSettings();\n        this.drawParamText(px, py, pw, param, true);\n        this.resetTextColor();\n        this.contents.fontSize -= 8;\n        const paramValue = actor.paramValueByName(param, true);\n        this.contents.drawText(paramValue, px, py, pw, gaugeLineHeight, 'right');\n        counter++;\n        if (counter % 2 === 0) {\n            px = sx3;\n            py += gaugeLineHeight;\n        } else {\n            px += pw + 24;\n        }\n    }\n}"
 *
 * @param VerticalStyle:func
 * @text JS: Vertical
 * @type note
 * @desc Code used to draw the data for this particular style.
 * @default "// Declare Constants\nconst actor = arguments[0];\nconst rect = arguments[1];\n\n\nconst lineHeight = this.lineHeight();\nconst gaugeLineHeight = this.gaugeLineHeight();\nconst totalHeight = (lineHeight * 4.5) + (gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2));\n\n// Draw Actor Graphic\nconst gw = rect.width;\nconst gh = Math.min(rect.height, ImageManager.faceHeight);\nconst gx = rect.x;\nconst gy = Math.max(rect.y, rect.y + (rect.height - totalHeight - gh) / 2);\nthis.drawActorGraphic(actor, gx, gy, gw, gh);\n\n// Draw Actor Name\nlet sx = rect.x;\nlet sy = Math.max(gy + gh, rect.y + (rect.height - totalHeight + gh) / 2);\nlet sw = rect.width;\nthis.drawText(actor.name(), sx, sy, sw, 'center');\n\n// Draw Actor Level\nsx = rect.x + Math.round((rect.width - 128) / 2);\nsy += lineHeight;\nthis.drawActorLevel(actor, sx, sy);\n\n// Draw Actor Class\nconst className = actor.currentClass().name;\nsx = rect.x + Math.round((rect.width - this.textSizeEx(className).width) / 2);\nsy += lineHeight;\nthis.drawTextEx(className, sx, sy, sw);\n\n// Draw Actor Icons\nsx = rect.x + Math.round((rect.width - 128) / 2);\nsy += lineHeight;\nthis.drawActorIcons(actor, sx, sy);\n\n// Draw Gauges\nsx = rect.x + Math.round((rect.width - 128) / 2);\nsy += lineHeight;\nthis.placeGauge(actor, \"hp\", sx, sy);\nsy += gaugeLineHeight;\nthis.placeGauge(actor, \"mp\", sx, sy);\nsy += gaugeLineHeight;\nif ($dataSystem.optDisplayTp) {\n    this.placeGauge(actor, \"tp\", sx, sy);\n}"
 *
 * @param PortraitStyle:func
 * @text JS: Portrait
 * @type note
 * @desc Code used to draw the data for this particular style.
 * @default "// Declare Constants\nconst actor = arguments[0];\nconst rect = arguments[1];\n\n// Make Constants\nconst lineHeight = this.lineHeight();\nconst gaugeLineHeight = this.gaugeLineHeight();\nconst totalHeight = (lineHeight * 4.5) + (gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2));\n\n// Draw Actor Graphic\nconst gw = rect.width;\nconst gh = rect.height;\nconst gx = rect.x;\nconst gy = rect.y;\nthis.drawItemActorMenuImage(actor, gx, gy, gw, gh);\n\n// Draw Dark Rectangle\nlet sx = rect.x;\nlet sy = Math.max(rect.y, rect.y + (rect.height - totalHeight));\nlet sw = rect.width;\nlet sh = rect.y + rect.height - sy;\nthis.contents.fillRect(sx+1, sy+lineHeight/2, sw-2, sh-1-lineHeight/2, ColorManager.dimColor1());\nthis.contents.gradientFillRect(sx+1, sy-lineHeight/2, sw-2, lineHeight, ColorManager.dimColor2(), ColorManager.dimColor1(), true);\n\n// Draw Actor Name\nthis.drawText(actor.name(), sx, sy, sw, 'center');\n\n// Draw Actor Level\nsx = rect.x + Math.round((rect.width - 128) / 2);\nsy += lineHeight;\nthis.drawActorLevel(actor, sx, sy);\n\n// Draw Actor Class\nconst className = actor.currentClass().name;\nsx = rect.x + Math.round((rect.width - this.textSizeEx(className).width) / 2);\nsy += lineHeight;\nthis.drawTextEx(className, sx, sy, sw);\n\n// Draw Actor Icons\nsx = rect.x + Math.round((rect.width - 128) / 2);\nsy += lineHeight;\nthis.drawActorIcons(actor, sx, sy);\n\n// Draw Gauges\nsx = rect.x + Math.round((rect.width - 128) / 2);\nsy += lineHeight;\nthis.placeGauge(actor, \"hp\", sx, sy);\nsy += gaugeLineHeight;\nthis.placeGauge(actor, \"mp\", sx, sy);\nsy += gaugeLineHeight;\nif ($dataSystem.optDisplayTp) {\n    this.placeGauge(actor, \"tp\", sx, sy);\n}"
 *
 * @param SoloStyle:func
 * @text JS: Solo
 * @type note
 * @desc Code used to draw the data for this particular style.
 * @default "// Declare Constants\nconst actor = arguments[0];\nconst rect = arguments[1];\n\n// Make Constants\nconst lineHeight = this.lineHeight();\nconst gaugeLineHeight = this.gaugeLineHeight();\n\n// Draw Actor Graphic\nlet sx = rect.x;\nlet sy = rect.y;\nlet sw = rect.width;\nlet sh = rect.height;\n\n// Portrait\nif (actor.getMenuImage() !== '') {\n    this.drawItemActorMenuImage(actor, rect.x, rect.y, rect.width, rect.height);\n\n// Everything Else\n} else {\n    const gx = Math.max(0, rect.x + Math.floor(((rect.width / 2) - ImageManager.faceWidth) / 2));\n    const gy = Math.max(0, rect.y + rect.height - Math.ceil(lineHeight * 4.5) - ImageManager.faceHeight);\n    this.drawActorGraphic(actor, gx, gy, ImageManager.faceWidth, ImageManager.faceHeight);\n}\n\n// Draw Dark Rectangle\nsh = Math.ceil(lineHeight * 4.5);\nsy = rect.y + rect.height - sh;\nthis.contents.fillRect(sx+1, sy+lineHeight/2, sw-2, sh-1-lineHeight/2, ColorManager.dimColor1());\nthis.contents.gradientFillRect(sx+1, sy-lineHeight/2, sw-2, lineHeight, ColorManager.dimColor2(), ColorManager.dimColor1(), true);\n\n// Draw Actor Name\nsw = Math.round(rect.width / 2);\nthis.drawText(actor.name(), sx, sy, sw, 'center');\n\n// Draw Actor Level\nsx = Math.max(0, rect.x + Math.floor(((rect.width / 2) - 128) / 2));\nsy += lineHeight;\nthis.drawActorLevel(actor, sx, sy);\n\n// Draw Actor Class\nconst className = actor.currentClass().name;\nsx = rect.x + Math.round(((rect.width / 2) - this.textSizeEx(className).width) / 2);\nsy += lineHeight;\nthis.drawTextEx(className, sx, sy, sw);\n\n// Draw Actor Icons\nsx = rect.x + Math.round(((rect.width / 2) - 128) / 2);\nsy += lineHeight;\nthis.drawActorIcons(actor, sx, sy);\n\n// Prepare Stat Coordinates\nsx = rect.x + Math.floor(rect.width / 2);\nsw = rect.width / 2;\nsh = rect.height;\nconst sx3 = sx;\nconst cw = rect.width - sx3 - 2;\n\n// Prepare Total Content Height to vertically center the content.\nlet totalHeight = gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2);\nif (Imported.VisuMZ_0_CoreEngine && cw >= 300) {\n    const params = VisuMZ.CoreEngine.Settings.Param.DisplayedParams;\n    totalHeight += lineHeight;\n    totalHeight += Math.ceil(params.length / 2) * gaugeLineHeight;\n}\nconst equips = actor.equips();\ntotalHeight += lineHeight;\ntotalHeight += equips.length * lineHeight;\nsy = Math.max(rect.y, rect.y + Math.floor((rect.height - totalHeight) / 2));\n\n// Place Gauges\nthis.placeGauge(actor, \"hp\", sx, sy);\nsy += gaugeLineHeight;\nthis.placeGauge(actor, \"mp\", sx, sy);\nif ($dataSystem.optDisplayTp) {\n    sy += gaugeLineHeight;\n    this.placeGauge(actor, \"tp\", sx, sy);\n    sy += gaugeLineHeight;\n}\nlet ny = sy;\n\n// Following Requires VisuStella MZ's Core Engine\n// Draw Additional Parameter Data if Enough Room\nif (Imported.VisuMZ_0_CoreEngine && cw >= 300) {\n    const params = VisuMZ.CoreEngine.Settings.Param.DisplayedParams;\n    sy += lineHeight;\n    const pw = Math.floor(cw / 2) - 24;\n    let px = sx3;\n    let counter = 0;\n    for (const param of params) {\n        this.resetFontSettings();\n        this.drawParamText(px, sy, pw, param, true);\n        this.resetTextColor();\n        this.contents.fontSize -= 8;\n        const paramValue = actor.paramValueByName(param, true);\n        this.contents.drawText(paramValue, px, sy, pw, gaugeLineHeight, 'right');\n        counter++;\n        if (counter % 2 === 0) {\n            px = sx3;\n            sy += gaugeLineHeight;\n        } else {\n            px += pw + 24;\n        }\n    }\n    ny += lineHeight;\n    ny += Math.ceil(params.length / 2) * gaugeLineHeight;\n}\n\n// Draw Actor Equipment\nthis.resetFontSettings();\nsx = rect.x + Math.floor(rect.width / 2);\nsy = ny + lineHeight;\nsw = rect.width / 2;\nfor (const equip of equips) {\n    if (equip) {\n        this.drawItemName(equip, sx, sy, sw);\n        sy += lineHeight;\n        if (sy + lineHeight > rect.y + rect.height) return;\n    }\n}"
 *
 * @param ThinStyle:func
 * @text JS: Thin
 * @type note
 * @desc Code used to draw the data for this particular style.
 * @default "// Declare Constants\nconst actor = arguments[0];\nconst rect = arguments[1];\n\n// Draw Actor Graphic\nconst gx = rect.x + (this.graphicType() === 'face' ? 1 : 0);\nconst gy = rect.y + (this.graphicType() === 'face' ? 1 : 0);\nconst gw = Math.min(rect.width, ImageManager.faceWidth);\nconst gh = Math.min(rect.height, ImageManager.faceHeight);\nthis.drawActorGraphic(actor, gx, gy, gw, gh);\n\n// Draw Status Stuff\nconst lineHeight = this.lineHeight();\nlet sx = rect.x + 160;\nlet sy = rect.y + ((rect.height - lineHeight) / 2) - 2;\n\n// Draw Actor Data\nthis.drawActorName(actor, sx, sy);\nthis.drawActorLevel(actor, gx+8, rect.y + rect.height - lineHeight +1);\n\n// Place Gauges\nsx += 180;\nsy += (lineHeight - this.gaugeLineHeight()) / 2;\nthis.placeGauge(actor, \"hp\", sx, sy);\nsx += 140;\nif ((sx + 128) > rect.x + rect.width) return;\nthis.placeGauge(actor, \"mp\", sx, sy);\nsx += 140;\nif ((sx + 128) > rect.x + rect.width) return;\nif ($dataSystem.optDisplayTp) this.placeGauge(actor, \"tp\", sx, sy);"
 *
 * @param ThickerStyle:func
 * @text JS: Thicker
 * @type note
 * @desc Code used to draw the data for this particular style.
 * @default "// Declare Constants\nconst actor = arguments[0];\nconst rect = arguments[1];\n\n// Draw Actor Graphic\nconst gx = rect.x + (this.graphicType() === 'face' ? 1 : 0);\nconst gy = rect.y + (this.graphicType() === 'face' ? 1 : 0);\nconst gw = Math.min(rect.width, ImageManager.faceWidth);\nconst gh = Math.min(rect.height, ImageManager.faceHeight);\nthis.drawActorGraphic(actor, gx, gy, gw, gh);\n\n// Draw Status Stuff\nconst lineHeight = this.lineHeight();\nconst gaugeLineHeight = this.gaugeLineHeight();\nlet sx = rect.x + 160;\nlet sy = rect.y + ((rect.height - (lineHeight * 2)) / 2) - 2;\n\n// Draw Actor Data\nthis.drawActorLevel(actor, gx+8, rect.y + rect.height - lineHeight +1);\nthis.drawActorName(actor, sx, sy);\nthis.drawActorClass(actor, sx, sy + lineHeight);\n//this.drawActorLevel(actor, sx, sy + lineHeight);\n\n// Place Gauges\nsx += 180;\nsy = rect.y + ((rect.height - (gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2))) / 2) - 2;\nthis.placeGauge(actor, \"hp\", sx, sy);\nthis.placeGauge(actor, \"mp\", sx, sy + gaugeLineHeight);\nif ($dataSystem.optDisplayTp) this.placeGauge(actor, \"tp\", sx, sy + (gaugeLineHeight * 2));\nsx += 160;\n\n// Following Requires VisuStella MZ's Core Engine\n// Draw Additional Parameter Data if Enough Room\nconst sx3 = sx;\nconst sw = rect.width - sx3 - 2;\nif (Imported.VisuMZ_0_CoreEngine && sw >= 300) {\n    const params = VisuMZ.CoreEngine.Settings.Param.DisplayedParams;\n    const pw = Math.floor(sw / 2) - 24;\n    sy = rect.y + ((rect.height - (gaugeLineHeight * Math.ceil(params.length / 2))) / 2) - 2;\n    let px = sx3;\n    let py = rect.y + Math.floor((rect.height - (Math.ceil(params.length / 2) * gaugeLineHeight)) / 2);\n    let counter = 0;\n    for (const param of params) {\n        this.resetFontSettings();\n        this.drawParamText(px, py, pw, param, true);\n        this.resetTextColor();\n        this.contents.fontSize -= 8;\n        const paramValue = actor.paramValueByName(param, true);\n        this.contents.drawText(paramValue, px, py, pw, gaugeLineHeight, 'right');\n        counter++;\n        if (counter % 2 === 0) {\n            px = sx3;\n            py += gaugeLineHeight;\n        } else {\n            px += pw + 24;\n        }\n    }\n}"
 *
 */
//=============================================================================

const _0xc683=['drawItem','tFPsi','createCommandNameWindow','systemColor','ThickerStyle','createBackground','maxVisibleItems','Scene_Menu_commandPersonal','close','default','commandNameWindowDrawBackground','StatusSelectLast','right','addCommand','solo','normalColor','SoloStyle','adjustCommandHeightByVariable','mainAreaHeight','version','ExtJS','SoloQuick','addSaveCommand','create','YcbZQ','updateDuration','XGZsW','addOptionsCommand','drawTimeIcon','height','value','Step1Start','nxoLn','commandWindowRectThinTopStyle','playtimeWindowRect','AXXyN','svbattler','_variableWindow','makeCommandList','loadBitmap','EIqkm','mjbNp','Settings','commandWindowRectThinBottomStyle','CommandList','bfWqw','initialize','lineHeight','map','topIndex','addGameEndCommand','refresh','currentExt','return\x200','includes','format','vAlsl','kmspS','playtimeText','bind','callUpdateHelp','getMenuImageOffsetY','USxyf','svActorVertCells','thinTop','_actor','mainAreaTop','innerWidth','PRjCt','Window_StatusBase_loadFaceImages','Scene_Menu_statusWindowRect','addFormationCommand','MainMenuCore','AqzeO','createActorMenuBackgroundImageSprite','gtLAy','drawTimeLabel','createStatusWindow','resetTextColor','opacity','loadCharacter','loadSvActor','eKDKo','58079daTLdw','faceWidth','commandWindowRectTopStyle','NJjYa','isExpGaugeDrawn','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','DefaultStyle','drawItemStatusDefaultStyle','adjustStatusWindowMobile','drawItemActorFace','length','needsDummyWindow','ThinGoldWindow','Scene_Menu_onPersonalCancel','drawItemStatusThickerStyle','characterIndex','Time','Game_Actor_setup','graphicType','commandPersonal','ARRAYSTR','jjQgX','getMenuImage','goldWindowRectBottomStyle','variableWindowRectTopStyle','open','ShowReserve','goldWindowRectTopStyle','mainAreaBottom','maxItems','_menuImage','vertical','_statusWindow','setTargetActor','uWYfg','drawItemActorSprite','commandFormation','Untitled','updateActor','thinBottom','171121OQMLCv','fMNbX','max','variableWindowRect','replace','VLIzr','commandCommonEvent','maxBattleMembers','addLoadListener','openness','TextAlign','_goldWindow','AdjustCommandHeight','_duration','round','_actorMenuBgSprite','concat','1CyRDZq','registerCommand','battleMembers','changePaintOpacity','itemTextAlign','NUM','sprite','blt','20843YSSiCG','Step1End','VarList','exit','onFormationCancel','AutoGoldHeight','drawTextEx','smoothSelect','thicker','Scene_Menu_createStatusWindow','mXdef','commandNameWindowCenter','setHandler','Scene_Menu_commandFormation','match','_commandNameWindow','none','_list','loadPicture','playtimeWindowRectTopStyle','345599ruZrxq','commandWindowRect','2msIBUR','PvlyZ','iconHeight','Playtime','prototype','_data','trim','center','thinGoldWindow','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','mgxyr','textSizeEx','fontSize','addOriginalCommands','drawItemImage','ARRAYSTRUCT','actor','Scene_Menu_onFormationCancel','updateCommandNameWindow','svActorHorzCells','note','_targetX','call','boxWidth','statusWindowRect','tVRSx','drawItemStatusPortraitStyle','General','Symbol','statusWindowRectTopStyle','setup','EnableJS','Variable','listStyle','commandWindowStyle','loadOtherActorImages','drawItemBackground','PortraitStyle','activate','itemLineRect','formation','hzxsQ','bottom','addSymbolBridge','portrait','Rows','drawItemActorMenuImage','options','applyThinnerGoldWindowRect','TextStr','hAeqU','ARRAYEVAL','WindowRect','text','drawPendingItemBackground','commandNameWindowDrawText','ListStyles','addChild','goldWindowRect','calcWindowHeight','Step2','sJTbV','colSpacing','gameEnd','CustomCmdWin','setMenuImage','iconText','floor','FUNC','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','itemRect','thin','RoLyf','STR','itemHeight','onPersonalOk','createPlaytimeWindow','windowPadding','statusWindowRectBottomStyle','PersonalHandlerJS','iconWidth','auto','drawSvActor','numVisibleRows','constructor','Step1','drawItemStatus','oEwkV','_scene','Scene_Menu_commandWindowRect','ofFSC','drawItemStatusVerticalStyle','adjustCommandHeightByPlaytime','updatePosition','battlerName','commandLoad','drawItemStyleIconText','ARRAYFUNC','showOnlyBattleMembers','addWindow','isCommandEnabled','mainCommandWidth','_playtimeText','Window_MenuCommand_initialize','setActor','toUpperCase','currentSymbol','resetFontSettings','isDisplayActorMenuBackgroundImage','isSoloQuickMode','_dummyWindow','_bitmapReady','drawText','JSON','variableWindowRectBottomStyle','_targetY','ActorBgMenuJS','ThinStyle','drawItemStatusThinStyle','Scene_Menu_goldWindowRect','rrYRd','Style','createCommandWindow','FontSize','bitmap','vTpgf','icon','Window_MenuStatus_drawItemImage','status','innerHeight','cnzYD','commandWindowRectBottomStyle','FOCIh','item','ARRAYNUM','EVAL','faceHeight','width','top','left','393516OMbxkH','shift','filter','PqqGw','clear','BgType','Window_MenuStatus_selectLast','update','characterName','JFWct','isArray','ShowJS','drawItemStatusPortraitStyleOnLoad','7JTxWIh','commandStyleCheck','members','parameters','popScene','CallHandlerJS','commandName','ChangeActorMenuImageJS','mobile','gSfEh','STRUCT','Scene_MenuBase_updateActor','index','1015475zwDmNw','_commandList','TBtBn','onPersonalCancel','HideMainMenuOnly','Enable','loadFaceImages','addMainCommands','initMenuImage','IAPQV','setBackgroundType','drawItemStatusSoloStyleOnLoad','TRWBi','jZqhZ','UmJXX','drawItemStyleIcon','YVEJq','isBattleMember','contents','AutoGoldY','_timer','fill','FwAyl','changeTextColor','_playtimeWindow','ConvertParams','maxCols','commandStyle','min','StatusListStyle','1EHfPzF','drawIcon','adjustDefaultCommandWindowRect','canCreateVariableWindow','playtimeWindowRectBottomStyle','parse','isBigCharacter','55eyHOQD','Icon','KtIas','commandWindowRectMobileStyle','drawItemActorSvBattler','TextJS','variables','Scene_Menu_create','canCreatePlaytimeWindow','InnerMenuListStyle','drawActorFace','Window_MenuStatus_maxItems','917655UPdltG','_commandWindow','name','createVariableWindow'];const _0x2fb800=_0xb2b4;(function(_0x38dcfa,_0x1e818b){const _0x37212e=_0xb2b4;while(!![]){try{const _0xaf532d=-parseInt(_0x37212e(0x1b5))*parseInt(_0x37212e(0x111))+-parseInt(_0x37212e(0x10a))*-parseInt(_0x37212e(0x11d))+-parseInt(_0x37212e(0x1ad))*-parseInt(_0x37212e(0xec))+parseInt(_0x37212e(0x19c))*parseInt(_0x37212e(0x1cb))+parseInt(_0x37212e(0xd2))+-parseInt(_0x37212e(0x1c9))+-parseInt(_0x37212e(0x174))*parseInt(_0x37212e(0xdf));if(_0xaf532d===_0x1e818b)break;else _0x38dcfa['push'](_0x38dcfa['shift']());}catch(_0x43aba1){_0x38dcfa['push'](_0x38dcfa['shift']());}}}(_0xc683,0xbc143));var label='MainMenuCore',tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x2fb800(0xd4)](function(_0xed1a9){const _0x7708a4=_0x2fb800;return _0xed1a9[_0x7708a4(0xc6)]&&_0xed1a9['description'][_0x7708a4(0x157)]('['+label+']');})[0x0];VisuMZ[label][_0x2fb800(0x14b)]=VisuMZ[label][_0x2fb800(0x14b)]||{},VisuMZ[_0x2fb800(0x105)]=function(_0x51c948,_0x536795){const _0x818709=_0x2fb800;for(const _0xf4fd40 in _0x536795){if(_0xf4fd40[_0x818709(0x1c3)](/(.*):(.*)/i)){const _0x23285b=String(RegExp['$1']),_0x16ba55=String(RegExp['$2'])[_0x818709(0xaf)]()[_0x818709(0x1d1)]();let _0x3fa826,_0x2bc145,_0x10b752;switch(_0x16ba55){case _0x818709(0x1b2):_0x3fa826=_0x536795[_0xf4fd40]!==''?Number(_0x536795[_0xf4fd40]):0x0;break;case _0x818709(0xcc):_0x2bc145=_0x536795[_0xf4fd40]!==''?JSON['parse'](_0x536795[_0xf4fd40]):[],_0x3fa826=_0x2bc145['map'](_0x3e832f=>Number(_0x3e832f));break;case _0x818709(0xcd):_0x3fa826=_0x536795[_0xf4fd40]!==''?eval(_0x536795[_0xf4fd40]):null;break;case _0x818709(0x1fe):_0x2bc145=_0x536795[_0xf4fd40]!==''?JSON[_0x818709(0x10f)](_0x536795[_0xf4fd40]):[],_0x3fa826=_0x2bc145[_0x818709(0x151)](_0x267766=>eval(_0x267766));break;case _0x818709(0xb7):_0x3fa826=_0x536795[_0xf4fd40]!==''?JSON['parse'](_0x536795[_0xf4fd40]):'';break;case'ARRAYJSON':_0x2bc145=_0x536795[_0xf4fd40]!==''?JSON[_0x818709(0x10f)](_0x536795[_0xf4fd40]):[],_0x3fa826=_0x2bc145[_0x818709(0x151)](_0x2ed82b=>JSON['parse'](_0x2ed82b));break;case _0x818709(0x20f):_0x3fa826=_0x536795[_0xf4fd40]!==''?new Function(JSON['parse'](_0x536795[_0xf4fd40])):new Function(_0x818709(0x156));break;case _0x818709(0xa7):_0x2bc145=_0x536795[_0xf4fd40]!==''?JSON['parse'](_0x536795[_0xf4fd40]):[],_0x3fa826=_0x2bc145[_0x818709(0x151)](_0x2dd3b9=>new Function(JSON[_0x818709(0x10f)](_0x2dd3b9)));break;case _0x818709(0x214):_0x3fa826=_0x536795[_0xf4fd40]!==''?String(_0x536795[_0xf4fd40]):'';break;case _0x818709(0x188):_0x2bc145=_0x536795[_0xf4fd40]!==''?JSON[_0x818709(0x10f)](_0x536795[_0xf4fd40]):[],_0x3fa826=_0x2bc145[_0x818709(0x151)](_0x269798=>String(_0x269798));break;case _0x818709(0xe9):_0x10b752=_0x536795[_0xf4fd40]!==''?JSON[_0x818709(0x10f)](_0x536795[_0xf4fd40]):{},_0x51c948[_0x23285b]={},VisuMZ[_0x818709(0x105)](_0x51c948[_0x23285b],_0x10b752);continue;case _0x818709(0x1da):_0x2bc145=_0x536795[_0xf4fd40]!==''?JSON[_0x818709(0x10f)](_0x536795[_0xf4fd40]):[],_0x3fa826=_0x2bc145[_0x818709(0x151)](_0x47793c=>VisuMZ['ConvertParams']({},JSON['parse'](_0x47793c)));break;default:continue;}_0x51c948[_0x23285b]=_0x3fa826;}}return _0x51c948;},(_0x3b5c0c=>{const _0x747eef=_0x2fb800,_0x242722=_0x3b5c0c[_0x747eef(0x11f)];for(const _0x233c87 of dependencies){if(!Imported[_0x233c87]){if(_0x747eef(0x165)===_0x747eef(0x19d)){const _0x53e88b=_0x50e3ba(_0x2fdc4f['$1']);_0x53e88b<_0x3d93ea?(_0x2f7e10(_0x747eef(0x179)['format'](_0x50581a,_0x53e88b,_0x418d76)),_0x553baf[_0x747eef(0x1b8)]()):_0x3605a2=_0x14a592[_0x747eef(0x19e)](_0x53e88b,_0x311c5e);}else{alert(_0x747eef(0x210)[_0x747eef(0x158)](_0x242722,_0x233c87)),SceneManager['exit']();break;}}}const _0x1bd445=_0x3b5c0c['description'];if(_0x1bd445[_0x747eef(0x1c3)](/\[Version[ ](.*?)\]/i)){const _0x342d41=Number(RegExp['$1']);_0x342d41!==VisuMZ[label][_0x747eef(0x134)]&&(alert('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'[_0x747eef(0x158)](_0x242722,_0x342d41)),SceneManager[_0x747eef(0x1b8)]());}if(_0x1bd445[_0x747eef(0x1c3)](/\[Tier[ ](\d+)\]/i)){if('nxoLn'!==_0x747eef(0x141))_0x5b9679[_0x747eef(0x1cf)][_0x747eef(0x121)][_0x747eef(0x1e1)](this,_0x3f3a61);else{const _0x5ad578=Number(RegExp['$1']);_0x5ad578<tier?(alert(_0x747eef(0x179)[_0x747eef(0x158)](_0x242722,_0x5ad578,tier)),SceneManager[_0x747eef(0x1b8)]()):tier=Math['max'](_0x5ad578,tier);}}VisuMZ[_0x747eef(0x105)](VisuMZ[label][_0x747eef(0x14b)],_0x3b5c0c[_0x747eef(0xe2)]);})(pluginData),PluginManager[_0x2fb800(0x1ae)](pluginData[_0x2fb800(0x11f)],'ChangeActorMenuImageGroup',_0x2e8300=>{const _0xb83971=_0x2fb800;VisuMZ['ConvertParams'](_0x2e8300,_0x2e8300);const _0x16b9a0=_0x2e8300[_0xb83971(0x220)],_0xa3a26a=_0x2e8300[_0xb83971(0x207)];for(let _0x4c7def of _0x16b9a0){if('IAPQV'!==_0xb83971(0xf5)){const _0x353a76=this['_duration'];this['x']=(this['x']*(_0x353a76-0x1)+this[_0xb83971(0x1e0)])/_0x353a76,this['y']=(this['y']*(_0x353a76-0x1)+this[_0xb83971(0xb9)])/_0x353a76;}else{_0x4c7def=parseInt(_0x4c7def)||0x0;if(_0x4c7def<=0x0)continue;const _0x25b941=$gameActors['actor'](_0x4c7def);if(!_0x25b941)continue;_0x25b941[_0xb83971(0x20c)](_0xa3a26a);}}}),PluginManager[_0x2fb800(0x1ae)](pluginData[_0x2fb800(0x11f)],'ChangeActorMenuImageRange',_0x497ec1=>{const _0x479a4b=_0x2fb800;VisuMZ[_0x479a4b(0x105)](_0x497ec1,_0x497ec1);const _0x18904e=_0x497ec1['Step1End']>=_0x497ec1[_0x479a4b(0x140)]?_0x497ec1[_0x479a4b(0x140)]:_0x497ec1[_0x479a4b(0x1b6)],_0x4a3173=_0x497ec1['Step1End']>=_0x497ec1[_0x479a4b(0x140)]?_0x497ec1[_0x479a4b(0x1b6)]:_0x497ec1['Step1Start'],_0x324a89=Array(_0x4a3173-_0x18904e+0x1)[_0x479a4b(0x101)]()[_0x479a4b(0x151)]((_0x5634b9,_0x1ef9c1)=>_0x18904e+_0x1ef9c1),_0x382d0a=_0x497ec1[_0x479a4b(0x207)];for(let _0x180d3d of _0x324a89){_0x180d3d=parseInt(_0x180d3d)||0x0;if(_0x180d3d<=0x0)continue;const _0x4fc83a=$gameActors[_0x479a4b(0x1db)](_0x180d3d);if(!_0x4fc83a)continue;_0x4fc83a[_0x479a4b(0x20c)](_0x382d0a);}}),PluginManager['registerCommand'](pluginData[_0x2fb800(0x11f)],_0x2fb800(0xe6),_0x5782ec=>{const _0x8b934f=_0x2fb800;VisuMZ['ConvertParams'](_0x5782ec,_0x5782ec);const _0x1c508a=_0x5782ec['Step1'];let _0x3b776b=[];while(_0x1c508a[_0x8b934f(0x17e)]>0x0){if(_0x8b934f(0xc8)!==_0x8b934f(0xc8)){const _0x43b143=_0x985fba[_0x8b934f(0x1c7)](_0x48e9ed['getMenuImage']());_0x43b143[_0x8b934f(0x1a4)](this[_0x8b934f(0xf7)][_0x8b934f(0x15c)](this,_0x1f9534,_0x5ee5f6));}else{const _0x1d70d3=_0x1c508a[_0x8b934f(0xd3)]();if(Array[_0x8b934f(0xdc)](_0x1d70d3)){if(_0x8b934f(0x222)===_0x8b934f(0x222))_0x3b776b=_0x3b776b[_0x8b934f(0x1ac)](_0x1d70d3);else{const _0x2f0578=this['mainCommandWidth'](),_0x542d7e=this['calcWindowHeight'](0x1,![]),_0x5c9293=_0x25ed40[_0x8b934f(0x1e2)]-_0x2f0578,_0x432639=this[_0x8b934f(0x163)]();return new _0x3f34ac(_0x5c9293,_0x432639,_0x2f0578,_0x542d7e);}}else _0x3b776b['push'](_0x1d70d3);}}const _0x29a3a7=_0x5782ec['Step2'];for(let _0x5d448e of _0x3b776b){_0x5d448e=parseInt(_0x5d448e)||0x0;if(_0x5d448e<=0x0)continue;const _0x505271=$gameActors[_0x8b934f(0x1db)](_0x5d448e);if(!_0x505271)continue;_0x505271[_0x8b934f(0x20c)](_0x29a3a7);}}),VisuMZ['MainMenuCore'][_0x2fb800(0x185)]=Game_Actor[_0x2fb800(0x1cf)][_0x2fb800(0x1e9)],Game_Actor[_0x2fb800(0x1cf)][_0x2fb800(0x1e9)]=function(_0x1d3d82){const _0xd5fff=_0x2fb800;VisuMZ['MainMenuCore']['Game_Actor_setup'][_0xd5fff(0x1e1)](this,_0x1d3d82),this[_0xd5fff(0xf4)]();},Game_Actor[_0x2fb800(0x1cf)][_0x2fb800(0xf4)]=function(){const _0x237f1b=_0x2fb800;this[_0x237f1b(0x192)]='';if(this['actor']()&&this[_0x237f1b(0x1db)]()[_0x237f1b(0x1df)][_0x237f1b(0x1c3)](/<MENU (?:IMAGE|PORTRAIT):[ ](.*)>/i)){if(_0x237f1b(0xf9)===_0x237f1b(0x149)){const _0x276191=new _0x7b89b1(0x0,0x0,_0x18df79[_0x237f1b(0xcf)],_0x24fa7c['height']);this[_0x237f1b(0x1c4)]=new _0x5e2fd8(_0x276191),this[_0x237f1b(0x1c4)][_0x237f1b(0x170)]=0x0,this[_0x237f1b(0x204)](this[_0x237f1b(0x1c4)]),this[_0x237f1b(0x1dd)]();}else this[_0x237f1b(0x192)]=String(RegExp['$1']);}},Game_Actor[_0x2fb800(0x1cf)]['getMenuImage']=function(){const _0x1d6804=_0x2fb800;if(this[_0x1d6804(0x192)]===undefined)this[_0x1d6804(0xf4)]();return this[_0x1d6804(0x192)];},Game_Actor['prototype'][_0x2fb800(0x20c)]=function(_0x335573){const _0x10aad1=_0x2fb800;if(this[_0x10aad1(0x192)]===undefined)this[_0x10aad1(0xf4)]();this[_0x10aad1(0x192)]=_0x335573;},Game_Actor['prototype']['getMenuImageOffsetX']=function(){const _0x5a3409=_0x2fb800;if(this[_0x5a3409(0x1db)]()[_0x5a3409(0x1df)][_0x5a3409(0x1c3)](/<MENU (?:IMAGE|PORTRAIT) OFFSET X:[ ]([\+\-]\d+)>/i))return Number(RegExp['$1']);else{if(this[_0x5a3409(0x1db)]()[_0x5a3409(0x1df)][_0x5a3409(0x1c3)](/<MENU (?:IMAGE|PORTRAIT) OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i))return Number(RegExp['$1']);}return 0x0;},Game_Actor['prototype'][_0x2fb800(0x15e)]=function(){const _0x211096=_0x2fb800;if(this[_0x211096(0x1db)]()[_0x211096(0x1df)][_0x211096(0x1c3)](/<MENU (?:IMAGE|PORTRAIT) OFFSET Y:[ ]([\+\-]\d+)>/i))return Number(RegExp['$1']);else{if(this[_0x211096(0x1db)]()[_0x211096(0x1df)][_0x211096(0x1c3)](/<MENU (?:IMAGE|PORTRAIT) OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)){if(_0x211096(0x14e)!==_0x211096(0x196))return Number(RegExp['$2']);else this[_0x211096(0xb5)]=![],this[_0x211096(0x162)]?(this['bitmap']=_0x536313[_0x211096(0x1c7)](this[_0x211096(0x162)][_0x211096(0x18a)]()),this[_0x211096(0xc2)][_0x211096(0x1a4)](this['onBitmapLoad']['bind'](this))):this[_0x211096(0xc2)]=new _0x1d9455(0x1,0x1);}}return 0x0;},Scene_MenuBase[_0x2fb800(0x1cf)]['isDisplayActorMenuBackgroundImage']=function(){const _0x597a04=_0x2fb800;return VisuMZ[_0x597a04(0x169)]['Settings'][_0x597a04(0x1e6)]['ActorBgMenus']['includes'](this[_0x597a04(0x21f)][_0x597a04(0x11f)]);},VisuMZ['MainMenuCore']['Scene_MenuBase_createBackground']=Scene_MenuBase[_0x2fb800(0x1cf)][_0x2fb800(0x126)],Scene_MenuBase['prototype'][_0x2fb800(0x126)]=function(){const _0x4d12f2=_0x2fb800;VisuMZ[_0x4d12f2(0x169)]['Scene_MenuBase_createBackground']['call'](this),this[_0x4d12f2(0x16b)]();},Scene_MenuBase[_0x2fb800(0x1cf)][_0x2fb800(0x16b)]=function(){const _0x1c918f=_0x2fb800;this[_0x1c918f(0x1ab)]=new Sprite_MenuBackgroundActor(),this[_0x1c918f(0x204)](this[_0x1c918f(0x1ab)]);},VisuMZ[_0x2fb800(0x169)]['Scene_MenuBase_updateActor']=Scene_MenuBase[_0x2fb800(0x1cf)][_0x2fb800(0x19a)],Scene_MenuBase[_0x2fb800(0x1cf)][_0x2fb800(0x19a)]=function(){const _0x23b0ef=_0x2fb800;VisuMZ[_0x23b0ef(0x169)][_0x23b0ef(0xea)][_0x23b0ef(0x1e1)](this),this[_0x23b0ef(0xb2)]()&&this['_actorMenuBgSprite']&&this[_0x23b0ef(0x1ab)][_0x23b0ef(0xae)](this[_0x23b0ef(0x162)]);},VisuMZ['MainMenuCore'][_0x2fb800(0x118)]=Scene_Menu[_0x2fb800(0x1cf)][_0x2fb800(0x138)],Scene_Menu[_0x2fb800(0x1cf)][_0x2fb800(0x138)]=function(){const _0x140775=_0x2fb800;VisuMZ[_0x140775(0x169)]['Scene_Menu_create'][_0x140775(0x1e1)](this),this[_0x140775(0x217)](),this['createVariableWindow'](),this['createDummyWindow']();},Scene_Menu[_0x2fb800(0x1cf)][_0x2fb800(0xc0)]=function(){const _0x39a87a=_0x2fb800,_0x57515f=this[_0x39a87a(0x1ca)](),_0x21b08c=new Window_MenuCommand(_0x57515f);_0x21b08c[_0x39a87a(0x1c1)]('cancel',this[_0x39a87a(0xe3)]['bind'](this)),this['addWindow'](_0x21b08c),this['_commandWindow']=_0x21b08c;},VisuMZ[_0x2fb800(0x169)][_0x2fb800(0x9f)]=Scene_Menu[_0x2fb800(0x1cf)][_0x2fb800(0x1ca)],Scene_Menu['prototype'][_0x2fb800(0x1ca)]=function(){const _0x44a4dd=_0x2fb800,_0x30296b=this[_0x44a4dd(0x1ed)]();if(_0x30296b===_0x44a4dd(0xd0)){if(_0x44a4dd(0xfa)!==_0x44a4dd(0xe8))return this[_0x44a4dd(0x176)]();else{const _0x1bb41f=this[_0x44a4dd(0x205)]();this[_0x44a4dd(0x1a7)]=this[_0x44a4dd(0x1d3)]()?new _0x5ab921(_0x1bb41f):new _0x294966(_0x1bb41f),this['addWindow'](this['_goldWindow']);}}else{if(_0x30296b===_0x44a4dd(0x161)){if('cjinU'===_0x44a4dd(0x16a)){const _0xbe57e6=_0x4b60b0[_0x44a4dd(0x169)][_0x44a4dd(0x14b)][_0x44a4dd(0x1ce)][_0x44a4dd(0x112)],_0x52d7ba=_0x30f82d['y']+(this[_0x44a4dd(0x150)]()-_0x3113ba[_0x44a4dd(0x1cd)])/0x2;this['drawIcon'](_0xbe57e6,_0x2ab673['x'],_0x52d7ba);const _0x11e045=_0x36720b['iconWidth']+0x4;_0x2b1dcd['x']+=_0x11e045,_0xa43b20[_0x44a4dd(0xcf)]-=_0x11e045;}else return this[_0x44a4dd(0x142)]();}else{if(_0x30296b===_0x44a4dd(0x1f5))return this['commandWindowRectBottomStyle']();else{if(_0x30296b===_0x44a4dd(0x19b)){if('tNzlM'!==_0x44a4dd(0x189))return this[_0x44a4dd(0x14c)]();else{const _0x3d8f3a=this[_0x44a4dd(0x1ed)]();if([_0x44a4dd(0xd0),_0x44a4dd(0x161),_0x44a4dd(0xe7)][_0x44a4dd(0x157)](_0x3d8f3a))return this[_0x44a4dd(0x1c8)]();else return['bottom',_0x44a4dd(0x19b)][_0x44a4dd(0x157)](_0x3d8f3a)?this[_0x44a4dd(0x10e)]():_0x438b3f[_0x44a4dd(0x169)]['Settings']['Playtime'][_0x44a4dd(0x1ff)][_0x44a4dd(0x1e1)](this);}}else{if(_0x30296b===_0x44a4dd(0xe7))return this[_0x44a4dd(0x114)]();else{const _0x19053d=VisuMZ[_0x44a4dd(0x169)][_0x44a4dd(0x9f)][_0x44a4dd(0x1e1)](this);return this[_0x44a4dd(0x10c)](_0x19053d),_0x19053d;}}}}}},Scene_Menu[_0x2fb800(0x1cf)][_0x2fb800(0x10c)]=function(_0x4e22bc){const _0x18b374=_0x2fb800;if(this[_0x18b374(0xa2)]()){if(_0x18b374(0x14a)==='aQuGI')return _0x57d669['MainMenuCore'][_0x18b374(0x14b)]['StatusListStyle'];else _0x4e22bc[_0x18b374(0x13e)]-=this[_0x18b374(0x143)]()[_0x18b374(0x13e)];}this['adjustCommandHeightByVariable']()&&(_0x4e22bc['height']-=this[_0x18b374(0x19f)]()[_0x18b374(0x13e)]);},Scene_Menu['prototype'][_0x2fb800(0x176)]=function(){const _0x5f1ad3=_0x2fb800,_0x438914=VisuMZ[_0x5f1ad3(0x169)]['Settings']['CustomCmdWin'][_0x5f1ad3(0x1f8)],_0x30a485=Graphics['boxWidth'],_0x3a79bf=this['calcWindowHeight'](_0x438914,!![]),_0x4d0a88=0x0,_0x1d46a7=this[_0x5f1ad3(0x163)]();return new Rectangle(_0x4d0a88,_0x1d46a7,_0x30a485,_0x3a79bf);},Scene_Menu[_0x2fb800(0x1cf)][_0x2fb800(0x142)]=function(){const _0x5863fd=_0x2fb800,_0x399165=VisuMZ[_0x5863fd(0x169)][_0x5863fd(0x14b)][_0x5863fd(0x20b)][_0x5863fd(0x1f8)],_0xc92ef8=Graphics[_0x5863fd(0x1e2)],_0x10a435=this[_0x5863fd(0x206)](0x1,!![]),_0x167c34=0x0,_0x883db6=this[_0x5863fd(0x163)]();return new Rectangle(_0x167c34,_0x883db6,_0xc92ef8,_0x10a435);},Scene_Menu[_0x2fb800(0x1cf)][_0x2fb800(0xc9)]=function(){const _0xb47cb7=_0x2fb800,_0x24ca6a=VisuMZ[_0xb47cb7(0x169)]['Settings'][_0xb47cb7(0x20b)][_0xb47cb7(0x1f8)],_0x1e16d8=Graphics[_0xb47cb7(0x1e2)],_0x223a89=this[_0xb47cb7(0x206)](_0x24ca6a,!![]),_0xca64b=0x0,_0x3d0d29=this['mainAreaBottom']()-_0x223a89;return new Rectangle(_0xca64b,_0x3d0d29,_0x1e16d8,_0x223a89);},Scene_Menu['prototype'][_0x2fb800(0x14c)]=function(){const _0x466624=_0x2fb800,_0x4cd2d5=VisuMZ[_0x466624(0x169)]['Settings']['CustomCmdWin']['Rows'],_0x15f70c=Graphics[_0x466624(0x1e2)],_0x4ca3ec=this[_0x466624(0x206)](0x1,!![]),_0x3b1b72=0x0,_0x363d69=this['mainAreaBottom']()-_0x4ca3ec;return new Rectangle(_0x3b1b72,_0x363d69,_0x15f70c,_0x4ca3ec);},Scene_Menu[_0x2fb800(0x1cf)][_0x2fb800(0x114)]=function(){const _0x28e2b3=_0x2fb800,_0x4e0859=VisuMZ[_0x28e2b3(0x169)][_0x28e2b3(0x14b)][_0x28e2b3(0x20b)][_0x28e2b3(0x1f8)],_0x27b176=Graphics['boxWidth'],_0x380f34=Window_MenuCommand[_0x28e2b3(0x1cf)]['fittingHeight'](_0x4e0859),_0x27a8ac=0x0,_0x1398eb=Math[_0x28e2b3(0x1aa)]((Graphics['boxHeight']-_0x380f34)/0x2);return new Rectangle(_0x27a8ac,_0x1398eb,_0x27b176,_0x380f34);},Scene_Menu[_0x2fb800(0x1cf)]['commandWindowStyle']=function(){const _0x256e7b=_0x2fb800;return VisuMZ[_0x256e7b(0x169)][_0x256e7b(0x14b)]['CommandWindowStyle'];},Scene_Menu['prototype'][_0x2fb800(0x1d3)]=function(){const _0x340e6c=_0x2fb800;if(this[_0x340e6c(0x1ed)]()!=='default')return!![];return VisuMZ['MainMenuCore'][_0x340e6c(0x14b)][_0x340e6c(0x1e6)][_0x340e6c(0x180)];},Scene_Menu[_0x2fb800(0x1cf)]['createGoldWindow']=function(){const _0x404c9b=_0x2fb800,_0x3ea5ea=this['goldWindowRect']();this[_0x404c9b(0x1a7)]=this['thinGoldWindow']()?new Window_ThinGold(_0x3ea5ea):new Window_Gold(_0x3ea5ea),this[_0x404c9b(0xa9)](this['_goldWindow']);},VisuMZ['MainMenuCore']['Scene_Menu_goldWindowRect']=Scene_Menu[_0x2fb800(0x1cf)][_0x2fb800(0x205)],Scene_Menu[_0x2fb800(0x1cf)][_0x2fb800(0x205)]=function(){const _0x19e9a2=_0x2fb800,_0x45812b=this[_0x19e9a2(0x1ed)]();if([_0x19e9a2(0xd0),'thinTop','mobile'][_0x19e9a2(0x157)](_0x45812b))return this[_0x19e9a2(0x18f)]();else{if([_0x19e9a2(0x1f5),_0x19e9a2(0x19b)][_0x19e9a2(0x157)](_0x45812b))return this[_0x19e9a2(0x18b)]();else{const _0xa0432=VisuMZ['MainMenuCore'][_0x19e9a2(0xbd)]['call'](this);return this['applyThinnerGoldWindowRect'](_0xa0432),_0xa0432;}}},Scene_Menu['prototype'][_0x2fb800(0x1fb)]=function(_0x2a5e25){const _0x11431a=_0x2fb800;if(this[_0x11431a(0x1d3)]()){if(_0x11431a(0x1d5)!==_0x11431a(0x1d5))this['drawTextEx'](_0x4755e9,_0x244077['x']+_0x231b5c['width']-_0x18498a,_0x56eb81['y'],_0x4748c4);else{if(VisuMZ[_0x11431a(0x169)][_0x11431a(0x14b)][_0x11431a(0x1e6)][_0x11431a(0xff)]){if(_0x11431a(0xc3)!=='qwBOX'){const _0x360b25=_0x2a5e25[_0x11431a(0x13e)]-this[_0x11431a(0x206)](0x1,![]);_0x2a5e25['y']+=_0x360b25;}else _0x35dafc['height']-=this[_0x11431a(0x19f)]()[_0x11431a(0x13e)];}VisuMZ[_0x11431a(0x169)][_0x11431a(0x14b)][_0x11431a(0x1e6)][_0x11431a(0x1ba)]&&(_0x2a5e25[_0x11431a(0x13e)]=this['calcWindowHeight'](0x1,![]));}}},Scene_Menu[_0x2fb800(0x1cf)][_0x2fb800(0x18f)]=function(){const _0x22fd24=_0x2fb800,_0xf1b8b1=this[_0x22fd24(0xab)](),_0x542afd=this[_0x22fd24(0x206)](0x1,![]),_0x3ed6d7=Graphics['boxWidth']-_0xf1b8b1,_0x274e69=this[_0x22fd24(0x190)]()-_0x542afd;return new Rectangle(_0x3ed6d7,_0x274e69,_0xf1b8b1,_0x542afd);},Scene_Menu[_0x2fb800(0x1cf)]['goldWindowRectBottomStyle']=function(){const _0x541f7a=_0x2fb800,_0x3f7e72=this[_0x541f7a(0xab)](),_0x364d78=this[_0x541f7a(0x206)](0x1,![]),_0x30ecbc=Graphics[_0x541f7a(0x1e2)]-_0x3f7e72,_0xfb6b7b=this[_0x541f7a(0x163)]();return new Rectangle(_0x30ecbc,_0xfb6b7b,_0x3f7e72,_0x364d78);},VisuMZ[_0x2fb800(0x169)]['Scene_Menu_createStatusWindow']=Scene_Menu[_0x2fb800(0x1cf)]['createStatusWindow'],Scene_Menu['prototype'][_0x2fb800(0x16e)]=function(){const _0x3e20c7=_0x2fb800;VisuMZ[_0x3e20c7(0x169)][_0x3e20c7(0x1be)][_0x3e20c7(0x1e1)](this),this[_0x3e20c7(0x17c)]();},Scene_Menu[_0x2fb800(0x1cf)][_0x2fb800(0x17c)]=function(){const _0x448e68=_0x2fb800;if(this[_0x448e68(0x1ed)]()===_0x448e68(0xe7)){if(_0x448e68(0x1bf)!==_0x448e68(0x1bf))return _0x448e68(0xc4);else this[_0x448e68(0x194)][_0x448e68(0x1a5)]=0x0;}},VisuMZ['MainMenuCore'][_0x2fb800(0x167)]=Scene_Menu[_0x2fb800(0x1cf)]['statusWindowRect'],Scene_Menu[_0x2fb800(0x1cf)][_0x2fb800(0x1e3)]=function(){const _0x402e21=_0x2fb800,_0x166251=this[_0x402e21(0x1ed)]();if(['top',_0x402e21(0x161)][_0x402e21(0x157)](_0x166251))return this['statusWindowRectTopStyle']();else{if([_0x402e21(0x1f5),_0x402e21(0x19b)][_0x402e21(0x157)](_0x166251)){if(_0x402e21(0x102)==='FwAyl')return this['statusWindowRectBottomStyle']();else{const _0x4cfb3b=this[_0x402e21(0xab)](),_0x5a116d=this[_0x402e21(0x206)](0x1,![]),_0x245c02=_0x2f124c[_0x402e21(0x1e2)]-_0x4cfb3b,_0xc2a8a3=this[_0x402e21(0x190)]()-_0x5a116d;return new _0x136456(_0x245c02,_0xc2a8a3,_0x4cfb3b,_0x5a116d);}}else return _0x166251===_0x402e21(0xe7)?this['statusWindowRectMobileStyle']():_0x402e21(0x1cc)!==_0x402e21(0x1a1)?VisuMZ[_0x402e21(0x169)][_0x402e21(0x167)][_0x402e21(0x1e1)](this):this[_0x402e21(0x10e)]();}},Scene_Menu[_0x2fb800(0x1cf)][_0x2fb800(0x1e8)]=function(){const _0x53802d=_0x2fb800,_0x4e45fb=Graphics[_0x53802d(0x1e2)],_0x23c38f=this[_0x53802d(0x133)]()-this['_commandWindow'][_0x53802d(0x13e)]-this[_0x53802d(0x1a7)][_0x53802d(0x13e)],_0x596e6b=0x0,_0x444310=this[_0x53802d(0x11e)]['y']+this[_0x53802d(0x11e)]['height'];return new Rectangle(_0x596e6b,_0x444310,_0x4e45fb,_0x23c38f);},Scene_Menu['prototype'][_0x2fb800(0x219)]=function(){const _0x128ff3=_0x2fb800,_0x27ec91=Graphics[_0x128ff3(0x1e2)],_0x508535=this['mainAreaHeight']()-this[_0x128ff3(0x11e)][_0x128ff3(0x13e)]-this[_0x128ff3(0x1a7)][_0x128ff3(0x13e)],_0x44a48f=0x0,_0x462741=this[_0x128ff3(0x1a7)]['y']+this[_0x128ff3(0x1a7)]['height'];return new Rectangle(_0x44a48f,_0x462741,_0x27ec91,_0x508535);},Scene_Menu[_0x2fb800(0x1cf)]['statusWindowRectMobileStyle']=function(){const _0x5db515=_0x2fb800,_0x286ca6=Graphics['boxWidth'],_0x57c3bf=this[_0x5db515(0x133)]()-this['_goldWindow'][_0x5db515(0x13e)],_0x184b18=0x0,_0x1ccf8d=this[_0x5db515(0x190)]()-this[_0x5db515(0x1a7)][_0x5db515(0x13e)]-_0x57c3bf;return new Rectangle(_0x184b18,_0x1ccf8d,_0x286ca6,_0x57c3bf);},Scene_Menu[_0x2fb800(0x1cf)][_0x2fb800(0x217)]=function(){const _0x3d3bd2=_0x2fb800;if(!this[_0x3d3bd2(0x119)]())return new Rectangle(0x0,0x0,0x0,0x0);const _0x53879e=this[_0x3d3bd2(0x143)]();this['_playtimeWindow']=new Window_Playtime(_0x53879e),this[_0x3d3bd2(0x104)][_0x3d3bd2(0xf6)](VisuMZ[_0x3d3bd2(0x169)]['Settings'][_0x3d3bd2(0x1ce)]['BgType']),this[_0x3d3bd2(0xa9)](this[_0x3d3bd2(0x104)]);},Scene_Menu[_0x2fb800(0x1cf)][_0x2fb800(0x119)]=function(){const _0x1e9fae=_0x2fb800;return VisuMZ[_0x1e9fae(0x169)][_0x1e9fae(0x14b)][_0x1e9fae(0x1ce)][_0x1e9fae(0xf1)];},Scene_Menu[_0x2fb800(0x1cf)][_0x2fb800(0xa2)]=function(){const _0x53e09a=_0x2fb800;return this['canCreatePlaytimeWindow']()&&VisuMZ[_0x53e09a(0x169)][_0x53e09a(0x14b)][_0x53e09a(0x1ce)]['AdjustCommandHeight'];},Scene_Menu[_0x2fb800(0x1cf)][_0x2fb800(0x143)]=function(){const _0x5ef896=_0x2fb800,_0x51cc70=this[_0x5ef896(0x1ed)]();if([_0x5ef896(0xd0),_0x5ef896(0x161),_0x5ef896(0xe7)][_0x5ef896(0x157)](_0x51cc70))return this[_0x5ef896(0x1c8)]();else return[_0x5ef896(0x1f5),_0x5ef896(0x19b)][_0x5ef896(0x157)](_0x51cc70)?this[_0x5ef896(0x10e)]():VisuMZ['MainMenuCore'][_0x5ef896(0x14b)]['Playtime'][_0x5ef896(0x1ff)][_0x5ef896(0x1e1)](this);},Scene_Menu['prototype'][_0x2fb800(0x1c8)]=function(){const _0x396048=_0x2fb800,_0x31bced=this[_0x396048(0xab)](),_0x20d6c1=this[_0x396048(0x206)](0x1,![]),_0x3ecffd=0x0,_0x36735a=this[_0x396048(0x190)]()-_0x20d6c1;return new Rectangle(_0x3ecffd,_0x36735a,_0x31bced,_0x20d6c1);},Scene_Menu['prototype'][_0x2fb800(0x10e)]=function(){const _0x3dc17f=_0x2fb800,_0x3e3516=this[_0x3dc17f(0xab)](),_0x1ff254=this['calcWindowHeight'](0x1,![]),_0x2a7db3=0x0,_0x21f51d=this[_0x3dc17f(0x163)]();return new Rectangle(_0x2a7db3,_0x21f51d,_0x3e3516,_0x1ff254);},Scene_Menu[_0x2fb800(0x1cf)][_0x2fb800(0x120)]=function(){const _0x1727ea=_0x2fb800;if(!this[_0x1727ea(0x10d)]())return new Rectangle(0x0,0x0,0x0,0x0);const _0x45ff21=this[_0x1727ea(0x19f)]();this[_0x1727ea(0x146)]=new Window_MenuVariables(_0x45ff21),this['_variableWindow']['setBackgroundType'](VisuMZ[_0x1727ea(0x169)][_0x1727ea(0x14b)][_0x1727ea(0x1eb)][_0x1727ea(0xd7)]),this[_0x1727ea(0xa9)](this['_variableWindow']);},Scene_Menu[_0x2fb800(0x1cf)]['canCreateVariableWindow']=function(){const _0x1cc4bc=_0x2fb800;return VisuMZ[_0x1cc4bc(0x169)][_0x1cc4bc(0x14b)]['Variable'][_0x1cc4bc(0xf1)];},Scene_Menu['prototype'][_0x2fb800(0x132)]=function(){const _0x102898=_0x2fb800;return this[_0x102898(0x10d)]()&&VisuMZ[_0x102898(0x169)][_0x102898(0x14b)][_0x102898(0x1eb)][_0x102898(0x1a8)];},Scene_Menu[_0x2fb800(0x1cf)][_0x2fb800(0x19f)]=function(){const _0xf958a4=_0x2fb800,_0x3e24c4=this[_0xf958a4(0x1ed)]();if([_0xf958a4(0xd0),_0xf958a4(0x161),_0xf958a4(0xe7)][_0xf958a4(0x157)](_0x3e24c4)){if(_0xf958a4(0xf8)===_0xf958a4(0xfc))this[_0xf958a4(0x192)]=_0x4891d3(_0x554b20['$1']);else return this[_0xf958a4(0x18c)]();}else{if(['bottom','thinBottom']['includes'](_0x3e24c4)){if(_0xf958a4(0x139)!=='YcbZQ'){this[_0xf958a4(0xb1)](),this['changeTextColor'](_0x1433da[_0xf958a4(0x124)]());const _0x54cd21=_0x38646d[_0xf958a4(0x169)][_0xf958a4(0x14b)][_0xf958a4(0x1ce)]['Time'];this['drawText'](_0x54cd21,_0x22a4ba['x'],_0x4be114['y'],_0x559ca3[_0xf958a4(0xcf)],'left'),this[_0xf958a4(0x16f)]();}else return this['variableWindowRectBottomStyle']();}else return VisuMZ[_0xf958a4(0x169)][_0xf958a4(0x14b)][_0xf958a4(0x1eb)]['WindowRect'][_0xf958a4(0x1e1)](this);}},Scene_Menu[_0x2fb800(0x1cf)][_0x2fb800(0x18c)]=function(){const _0x5e658a=_0x2fb800,_0x44618a=Graphics[_0x5e658a(0x1e2)]-this[_0x5e658a(0x1a7)][_0x5e658a(0xcf)]-(this[_0x5e658a(0x104)]?this['_playtimeWindow'][_0x5e658a(0xcf)]:0x0),_0x25b02b=this[_0x5e658a(0x206)](0x1,![]),_0x195e19=this[_0x5e658a(0x1a7)]['x']-_0x44618a,_0x32dc41=this[_0x5e658a(0x190)]()-_0x25b02b;return new Rectangle(_0x195e19,_0x32dc41,_0x44618a,_0x25b02b);},Scene_Menu[_0x2fb800(0x1cf)][_0x2fb800(0xb8)]=function(){const _0x6a5afa=_0x2fb800,_0x56583c=Graphics['boxWidth']-this[_0x6a5afa(0x1a7)][_0x6a5afa(0xcf)]-(this['_playtimeWindow']?this[_0x6a5afa(0x104)][_0x6a5afa(0xcf)]:0x0),_0x31ae15=this['calcWindowHeight'](0x1,![]),_0x3dbc70=this[_0x6a5afa(0x1a7)]['x']-_0x56583c,_0x34e119=this[_0x6a5afa(0x163)]();return new Rectangle(_0x3dbc70,_0x34e119,_0x56583c,_0x31ae15);},Scene_Menu['prototype']['createDummyWindow']=function(){const _0x5e7f1e=_0x2fb800;if(!this['needsDummyWindow']())return;const _0x191447=this[_0x5e7f1e(0x19f)]();this[_0x5e7f1e(0xb4)]=new Window_Base(_0x191447),this[_0x5e7f1e(0xb4)][_0x5e7f1e(0xf6)](VisuMZ[_0x5e7f1e(0x169)][_0x5e7f1e(0x14b)]['Variable']['BgType']),this[_0x5e7f1e(0xa9)](this[_0x5e7f1e(0xb4)]);},Scene_Menu['prototype'][_0x2fb800(0x17f)]=function(){const _0x39aa11=_0x2fb800;if([_0x39aa11(0x12a),_0x39aa11(0xe7)]['includes'](this[_0x39aa11(0x1ed)]()))return![];if(this['_variableWindow'])return![];return!![];},VisuMZ[_0x2fb800(0x169)][_0x2fb800(0x128)]=Scene_Menu[_0x2fb800(0x1cf)]['commandPersonal'],Scene_Menu[_0x2fb800(0x1cf)][_0x2fb800(0x187)]=function(){const _0x27b31d=_0x2fb800;if(this[_0x27b31d(0xb3)]()&&this[_0x27b31d(0x194)])$gameParty[_0x27b31d(0x195)]($gameParty[_0x27b31d(0xe1)]()[0x0]),this[_0x27b31d(0x216)]();else{if(this['commandWindowStyle']()===_0x27b31d(0xe7))this[_0x27b31d(0x194)][_0x27b31d(0x18d)]();VisuMZ[_0x27b31d(0x169)]['Scene_Menu_commandPersonal'][_0x27b31d(0x1e1)](this);}},Scene_Menu[_0x2fb800(0x1cf)][_0x2fb800(0xb3)]=function(){const _0x14ab53=_0x2fb800;return VisuMZ[_0x14ab53(0x169)][_0x14ab53(0x14b)]['General'][_0x14ab53(0x136)]&&$gameParty[_0x14ab53(0xe1)]()['length']<=0x1;},Scene_Menu[_0x2fb800(0x1cf)][_0x2fb800(0x216)]=function(){const _0x3dae5d=_0x2fb800,_0x356c94=this[_0x3dae5d(0x11e)][_0x3dae5d(0xb0)](),_0x26112b=this['_commandWindow']['currentExt']();for(const _0x1a9815 of Window_MenuCommand[_0x3dae5d(0xed)]){if(_0x1a9815[_0x3dae5d(0x1e7)]===_0x356c94){_0x1a9815[_0x3dae5d(0x21a)][_0x3dae5d(0x1e1)](this,_0x26112b);return;}}},VisuMZ['MainMenuCore']['Scene_Menu_onPersonalCancel']=Scene_Menu[_0x2fb800(0x1cf)][_0x2fb800(0xef)],Scene_Menu[_0x2fb800(0x1cf)][_0x2fb800(0xef)]=function(){const _0x5b0b98=_0x2fb800;VisuMZ[_0x5b0b98(0x169)][_0x5b0b98(0x181)][_0x5b0b98(0x1e1)](this);if(this['commandWindowStyle']()===_0x5b0b98(0xe7))this[_0x5b0b98(0x194)][_0x5b0b98(0x129)]();},Scene_Menu[_0x2fb800(0x1cf)][_0x2fb800(0x1a2)]=function(){const _0x2247fa=_0x2fb800,_0x15f68d=parseInt(this[_0x2247fa(0x11e)][_0x2247fa(0x155)]());_0x15f68d?($gameTemp['reserveCommonEvent'](_0x15f68d),this[_0x2247fa(0xe3)]()):this[_0x2247fa(0x11e)][_0x2247fa(0x1f1)]();},VisuMZ[_0x2fb800(0x169)][_0x2fb800(0x1c2)]=Scene_Menu['prototype']['commandFormation'],Scene_Menu[_0x2fb800(0x1cf)][_0x2fb800(0x198)]=function(){const _0x22a498=_0x2fb800;VisuMZ[_0x22a498(0x169)][_0x22a498(0x1c2)][_0x22a498(0x1e1)](this);if(this[_0x22a498(0x1ed)]()==='mobile')this[_0x22a498(0x194)]['open']();},VisuMZ['MainMenuCore'][_0x2fb800(0x1dc)]=Scene_Menu[_0x2fb800(0x1cf)][_0x2fb800(0x1b9)],Scene_Menu[_0x2fb800(0x1cf)][_0x2fb800(0x1b9)]=function(){const _0x313ef3=_0x2fb800;VisuMZ[_0x313ef3(0x169)][_0x313ef3(0x1dc)][_0x313ef3(0x1e1)](this);if(this[_0x313ef3(0x1ed)]()===_0x313ef3(0xe7))this['_statusWindow'][_0x313ef3(0x129)]();},Scene_Menu['prototype'][_0x2fb800(0xa5)]=function(){SceneManager['push'](Scene_Load);};function Sprite_MenuBackgroundActor(){const _0x1cd539=_0x2fb800;this[_0x1cd539(0x14f)](...arguments);}Sprite_MenuBackgroundActor['prototype']=Object['create'](Sprite[_0x2fb800(0x1cf)]),Sprite_MenuBackgroundActor['prototype'][_0x2fb800(0x21f)]=Sprite_MenuBackgroundActor,Sprite_MenuBackgroundActor[_0x2fb800(0x1cf)][_0x2fb800(0x14f)]=function(){const _0x33988e=_0x2fb800;this[_0x33988e(0x162)]=null,this[_0x33988e(0xb5)]=![],Sprite[_0x33988e(0x1cf)][_0x33988e(0x14f)][_0x33988e(0x1e1)](this),this['x']=Graphics[_0x33988e(0xcf)];},Sprite_MenuBackgroundActor[_0x2fb800(0x1cf)]['setActor']=function(_0xd51b73){const _0x5adac1=_0x2fb800;if(this[_0x5adac1(0x162)]!==_0xd51b73){if(_0x5adac1(0xdb)!==_0x5adac1(0xdb)){const _0x358a6f=_0x3e9274[_0x5adac1(0x1e7)];if(_0x2100d7[_0x5adac1(0xdd)][_0x5adac1(0x1e1)](this)){let _0x5aaf73=_0x131a17[_0x5adac1(0x1fc)];if(['','Untitled']['includes'](_0x5aaf73))_0x5aaf73=_0x56f1a9['TextJS'][_0x5adac1(0x1e1)](this);const _0x55385d=_0x371524['Icon'];_0x55385d>0x0&&this['commandStyle']()!==_0x5adac1(0x200)&&(_0x5aaf73='\x5cI[%1]%2'[_0x5adac1(0x158)](_0x55385d,_0x5aaf73));const _0x1e8e94=_0x29e18a['EnableJS'][_0x5adac1(0x1e1)](this),_0x5ae61e=_0x4301ff[_0x5adac1(0x135)]['call'](this);this[_0x5adac1(0x12e)](_0x5aaf73,_0x358a6f,_0x1e8e94,_0x5ae61e),this[_0x5adac1(0x1c1)](_0x358a6f,_0x1a467d[_0x5adac1(0xe4)]['bind'](this,_0x5ae61e));}this[_0x5adac1(0x1f6)](_0x358a6f);}else this[_0x5adac1(0x162)]=_0xd51b73,this[_0x5adac1(0x148)]();}},Sprite_MenuBackgroundActor[_0x2fb800(0x1cf)][_0x2fb800(0x148)]=function(){const _0x2ea539=_0x2fb800;this[_0x2ea539(0xb5)]=![];if(this[_0x2ea539(0x162)])this[_0x2ea539(0xc2)]=ImageManager['loadPicture'](this[_0x2ea539(0x162)][_0x2ea539(0x18a)]()),this['bitmap'][_0x2ea539(0x1a4)](this['onBitmapLoad'][_0x2ea539(0x15c)](this));else{if(_0x2ea539(0x208)!==_0x2ea539(0x208))return _0x4f7692(_0xe77365['$1']);else this[_0x2ea539(0xc2)]=new Bitmap(0x1,0x1);}},Sprite_MenuBackgroundActor[_0x2fb800(0x1cf)]['onBitmapLoad']=function(){const _0x6c7cc8=_0x2fb800;this[_0x6c7cc8(0xb5)]=!![],VisuMZ[_0x6c7cc8(0x169)][_0x6c7cc8(0x14b)][_0x6c7cc8(0x1e6)][_0x6c7cc8(0xba)][_0x6c7cc8(0x1e1)](this);},Sprite_MenuBackgroundActor[_0x2fb800(0x1cf)]['update']=function(){const _0x2a5da3=_0x2fb800;Sprite['prototype'][_0x2a5da3(0xd9)][_0x2a5da3(0x1e1)](this),this[_0x2a5da3(0xb5)]&&(this['updateOpacity'](),this[_0x2a5da3(0xa3)](),this[_0x2a5da3(0x13a)]());},Sprite_MenuBackgroundActor['prototype']['updateOpacity']=function(){const _0x1d68dd=_0x2fb800;if(this['_duration']>0x0){const _0x3182d6=this['_duration'];this[_0x1d68dd(0x170)]=(this[_0x1d68dd(0x170)]*(_0x3182d6-0x1)+0xff)/_0x3182d6;}},Sprite_MenuBackgroundActor['prototype'][_0x2fb800(0xa3)]=function(){const _0x30ca08=_0x2fb800;if(this[_0x30ca08(0x1a9)]>0x0){if(_0x30ca08(0xca)!==_0x30ca08(0xca)){const _0x20c30a=_0x52ef91[_0x30ca08(0x1c7)](_0x4f73bf[_0x30ca08(0x18a)]());_0x20c30a[_0x30ca08(0x1a4)](this[_0x30ca08(0xde)][_0x30ca08(0x15c)](this,_0x3aa966,_0x414289));}else{const _0x5c3f9e=this['_duration'];this['x']=(this['x']*(_0x5c3f9e-0x1)+this[_0x30ca08(0x1e0)])/_0x5c3f9e,this['y']=(this['y']*(_0x5c3f9e-0x1)+this[_0x30ca08(0xb9)])/_0x5c3f9e;}}},Sprite_MenuBackgroundActor['prototype'][_0x2fb800(0x13a)]=function(){const _0xddd61e=_0x2fb800;if(this[_0xddd61e(0x1a9)]>0x0)this[_0xddd61e(0x1a9)]--;},ImageManager[_0x2fb800(0x1de)]=ImageManager[_0x2fb800(0x1de)]||0x9,ImageManager[_0x2fb800(0x160)]=ImageManager[_0x2fb800(0x160)]||0x6,Window_Base[_0x2fb800(0x1cf)][_0x2fb800(0x21d)]=function(_0x3e5e03,_0xbc4dab,_0x1c3e16){const _0x3efb2f=_0x2fb800,_0x1118e6=ImageManager[_0x3efb2f(0x172)](_0x3e5e03),_0x8fceed=_0x1118e6[_0x3efb2f(0xcf)]/ImageManager[_0x3efb2f(0x1de)],_0x300aa5=_0x1118e6[_0x3efb2f(0x13e)]/ImageManager[_0x3efb2f(0x160)],_0x21738e=0x0,_0x5248df=0x0;this['contents'][_0x3efb2f(0x1b4)](_0x1118e6,_0x21738e,_0x5248df,_0x8fceed,_0x300aa5,_0xbc4dab-_0x8fceed/0x2,_0x1c3e16-_0x300aa5);},Window_MenuCommand[_0x2fb800(0xed)]=VisuMZ['MainMenuCore'][_0x2fb800(0x14b)][_0x2fb800(0x14d)],VisuMZ[_0x2fb800(0x169)]['Window_MenuCommand_initialize']=Window_MenuCommand['prototype'][_0x2fb800(0x14f)],Window_MenuCommand['prototype'][_0x2fb800(0x14f)]=function(_0x142ecd){const _0xed17a6=_0x2fb800;VisuMZ['MainMenuCore'][_0xed17a6(0xad)]['call'](this,_0x142ecd),this[_0xed17a6(0x123)](_0x142ecd);},Window_MenuCommand[_0x2fb800(0x1cf)][_0x2fb800(0x123)]=function(_0x1925df){const _0x3d876f=_0x2fb800,_0x1a14ca=new Rectangle(0x0,0x0,_0x1925df[_0x3d876f(0xcf)],_0x1925df[_0x3d876f(0x13e)]);this[_0x3d876f(0x1c4)]=new Window_Base(_0x1a14ca),this['_commandNameWindow'][_0x3d876f(0x170)]=0x0,this[_0x3d876f(0x204)](this[_0x3d876f(0x1c4)]),this['updateCommandNameWindow']();},Window_MenuCommand[_0x2fb800(0x1cf)][_0x2fb800(0x15d)]=function(){const _0x55310c=_0x2fb800;Window_HorzCommand[_0x55310c(0x1cf)][_0x55310c(0x15d)][_0x55310c(0x1e1)](this);if(this[_0x55310c(0x1c4)])this[_0x55310c(0x1dd)]();},Window_MenuCommand[_0x2fb800(0x1cf)][_0x2fb800(0x1dd)]=function(){const _0x28e97f=_0x2fb800,_0x4fcfee=this[_0x28e97f(0x1c4)];_0x4fcfee['contents'][_0x28e97f(0xd6)]();const _0x465c2d=this['commandStyleCheck'](this[_0x28e97f(0xeb)]());if(_0x465c2d===_0x28e97f(0xc4)){const _0x512529=this[_0x28e97f(0x1f2)](this[_0x28e97f(0xeb)]());let _0x5ec848=this[_0x28e97f(0xe5)](this[_0x28e97f(0xeb)]());_0x5ec848=_0x5ec848[_0x28e97f(0x1a0)](/\\I\[(\d+)\]/gi,''),_0x4fcfee[_0x28e97f(0xb1)](),this['commandNameWindowDrawBackground'](_0x5ec848,_0x512529),this[_0x28e97f(0x202)](_0x5ec848,_0x512529),this[_0x28e97f(0x1c0)](_0x5ec848,_0x512529);}},Window_MenuCommand[_0x2fb800(0x1cf)][_0x2fb800(0x12b)]=function(_0x218d08,_0x184371){},Window_MenuCommand[_0x2fb800(0x1cf)][_0x2fb800(0x202)]=function(_0x2ac920,_0xe53bca){const _0x4c2815=_0x2fb800,_0x275edb=this[_0x4c2815(0x1c4)];_0x275edb[_0x4c2815(0xb6)](_0x2ac920,0x0,_0xe53bca['y'],_0x275edb[_0x4c2815(0x164)],_0x4c2815(0x1d2));},Window_MenuCommand['prototype'][_0x2fb800(0x1c0)]=function(_0x2a93ad,_0x336a5c){const _0x1358b0=_0x2fb800,_0x4734e9=this[_0x1358b0(0x1c4)],_0x4d2a25=$gameSystem[_0x1358b0(0x218)](),_0x48b03e=_0x336a5c['x']+Math[_0x1358b0(0x20e)](_0x336a5c['width']/0x2)+_0x4d2a25;_0x4734e9['x']=_0x4734e9[_0x1358b0(0xcf)]/-0x2+_0x48b03e,_0x4734e9['y']=Math['floor'](_0x336a5c[_0x1358b0(0x13e)]/0x4);},Window_MenuCommand['prototype']['itemHeight']=function(){const _0x360ac2=_0x2fb800,_0x24c758=SceneManager['_scene']['commandWindowStyle']();if(_0x24c758===_0x360ac2(0xe7)){if(_0x360ac2(0xd5)!==_0x360ac2(0x1fd)){const _0x5416ad=VisuMZ[_0x360ac2(0x169)][_0x360ac2(0x14b)][_0x360ac2(0x20b)]['MobileThickness'];return this[_0x360ac2(0x150)]()*_0x5416ad+0x8;}else this[_0x360ac2(0x1bb)](_0x48be87,_0x3310d8['x'],_0x25060e['y'],_0x30cc3e);}else return Window_Command[_0x360ac2(0x1cf)][_0x360ac2(0x215)]['call'](this);},Window_MenuCommand['prototype'][_0x2fb800(0x147)]=function(){this['makeMainMenuCoreCommandList']();},Window_MenuCommand[_0x2fb800(0x1cf)]['makeMainMenuCoreCommandList']=function(){const _0x30f15c=_0x2fb800;for(const _0x40c88a of Window_MenuCommand[_0x30f15c(0xed)]){const _0x22453c=_0x40c88a[_0x30f15c(0x1e7)];if(_0x40c88a[_0x30f15c(0xdd)][_0x30f15c(0x1e1)](this)){let _0x570099=_0x40c88a['TextStr'];if(['',_0x30f15c(0x199)][_0x30f15c(0x157)](_0x570099))_0x570099=_0x40c88a[_0x30f15c(0x116)][_0x30f15c(0x1e1)](this);const _0x51ead9=_0x40c88a[_0x30f15c(0x112)];if(_0x51ead9>0x0&&this[_0x30f15c(0x107)]()!==_0x30f15c(0x200)){if(_0x30f15c(0xa0)!==_0x30f15c(0xa0)){const _0x5bc72d=this[_0x30f15c(0xab)](),_0x2d6446=this['calcWindowHeight'](0x1,![]),_0x439e14=0x0,_0x3ce9d6=this[_0x30f15c(0x163)]();return new _0x24d4b0(_0x439e14,_0x3ce9d6,_0x5bc72d,_0x2d6446);}else _0x570099='\x5cI[%1]%2'[_0x30f15c(0x158)](_0x51ead9,_0x570099);}const _0x49ccd8=_0x40c88a[_0x30f15c(0x1ea)][_0x30f15c(0x1e1)](this),_0x12bc99=_0x40c88a[_0x30f15c(0x135)]['call'](this);this[_0x30f15c(0x12e)](_0x570099,_0x22453c,_0x49ccd8,_0x12bc99),this[_0x30f15c(0x1c1)](_0x22453c,_0x40c88a[_0x30f15c(0xe4)][_0x30f15c(0x15c)](this,_0x12bc99));}this[_0x30f15c(0x1f6)](_0x22453c);}},Window_MenuCommand[_0x2fb800(0x1cf)]['addSymbolBridge']=function(_0x5375a2){const _0x3bb6c7=_0x2fb800;switch(_0x5375a2){case _0x3bb6c7(0xcb):this[_0x3bb6c7(0xf3)]();break;case _0x3bb6c7(0x1f3):this[_0x3bb6c7(0x168)](),this[_0x3bb6c7(0x1d8)]();break;case _0x3bb6c7(0x1fa):this['addOptionsCommand']();break;case'save':this[_0x3bb6c7(0x137)]();break;case _0x3bb6c7(0x20a):this[_0x3bb6c7(0x153)]();break;}},Window_MenuCommand[_0x2fb800(0x1cf)][_0x2fb800(0xf3)]=function(){},Window_MenuCommand[_0x2fb800(0x1cf)][_0x2fb800(0x168)]=function(){},Window_MenuCommand['prototype'][_0x2fb800(0x1d8)]=function(){},Window_MenuCommand['prototype'][_0x2fb800(0x13c)]=function(){},Window_MenuCommand[_0x2fb800(0x1cf)][_0x2fb800(0x137)]=function(){},Window_MenuCommand['prototype'][_0x2fb800(0x153)]=function(){},Window_MenuCommand[_0x2fb800(0x1cf)][_0x2fb800(0x106)]=function(){const _0x848d2b=_0x2fb800,_0x429553=SceneManager[_0x848d2b(0x223)][_0x848d2b(0x1ed)]();if(['thinTop',_0x848d2b(0x19b)][_0x848d2b(0x157)](_0x429553)){if('NJjYa'!==_0x848d2b(0x177))this[_0x848d2b(0x14f)](...arguments);else return this[_0x848d2b(0x1c6)]?this[_0x848d2b(0x191)]():0x4;}else return _0x429553!==_0x848d2b(0x12a)?_0x848d2b(0x122)==='RzqAs'?_0x2b3885[_0x848d2b(0x169)]['Settings'][_0x848d2b(0x1eb)][_0x848d2b(0xf1)]:VisuMZ['MainMenuCore'][_0x848d2b(0x14b)][_0x848d2b(0x20b)]['Cols']:Window_Command[_0x848d2b(0x1cf)]['maxCols'][_0x848d2b(0x1e1)](this);},Window_MenuCommand[_0x2fb800(0x1cf)][_0x2fb800(0x1b1)]=function(){const _0x5d9158=_0x2fb800;return VisuMZ[_0x5d9158(0x169)][_0x5d9158(0x14b)]['CustomCmdWin'][_0x5d9158(0x1a6)];},Window_MenuCommand['prototype'][_0x2fb800(0x121)]=function(_0x4d178b){const _0x16f53e=_0x2fb800,_0x53a359=this['commandStyleCheck'](_0x4d178b);if(_0x53a359===_0x16f53e(0x20d))this[_0x16f53e(0xa6)](_0x4d178b);else{if(_0x53a359===_0x16f53e(0xc4))this[_0x16f53e(0xfb)](_0x4d178b);else{if('JOaZi'!==_0x16f53e(0xbe))Window_Command[_0x16f53e(0x1cf)][_0x16f53e(0x121)][_0x16f53e(0x1e1)](this,_0x4d178b);else{const _0x493eb9=this[_0x16f53e(0x1f2)](this[_0x16f53e(0xeb)]());let _0x2d57aa=this[_0x16f53e(0xe5)](this[_0x16f53e(0xeb)]());_0x2d57aa=_0x2d57aa[_0x16f53e(0x1a0)](/\\I\[(\d+)\]/gi,''),_0x52f06a[_0x16f53e(0xb1)](),this['commandNameWindowDrawBackground'](_0x2d57aa,_0x493eb9),this[_0x16f53e(0x202)](_0x2d57aa,_0x493eb9),this[_0x16f53e(0x1c0)](_0x2d57aa,_0x493eb9);}}}},Window_MenuCommand[_0x2fb800(0x1cf)][_0x2fb800(0x107)]=function(){const _0xa3f6f4=_0x2fb800;return VisuMZ[_0xa3f6f4(0x169)][_0xa3f6f4(0x14b)]['CustomCmdWin'][_0xa3f6f4(0xbf)];},Window_MenuCommand[_0x2fb800(0x1cf)][_0x2fb800(0xe0)]=function(_0x43bec3){const _0x9d936b=_0x2fb800,_0x17c9bc=this['commandStyle']();if(_0x17c9bc!==_0x9d936b(0x21c))return _0x17c9bc;else{const _0x3bcb41=this[_0x9d936b(0xe5)](_0x43bec3);if(_0x3bcb41[_0x9d936b(0x1c3)](/\\I\[(\d+)\]/i)){const _0xe9ec32=this[_0x9d936b(0x1f2)](_0x43bec3),_0x1ae6dc=this[_0x9d936b(0x1d6)](_0x3bcb41)[_0x9d936b(0xcf)];return _0x1ae6dc<=_0xe9ec32['width']?_0x9d936b(0x20d):'icon';}else return _0x9d936b(0x200);}},Window_MenuCommand[_0x2fb800(0x1cf)]['drawItemStyleIconText']=function(_0xeaa505){const _0x8d4e88=_0x2fb800,_0x2f4c31=this['itemLineRect'](_0xeaa505),_0x13d5ba=this[_0x8d4e88(0xe5)](_0xeaa505),_0x48ae5d=this[_0x8d4e88(0x1d6)](_0x13d5ba)[_0x8d4e88(0xcf)];this[_0x8d4e88(0x1b0)](this[_0x8d4e88(0xaa)](_0xeaa505));let _0x2bcc22=this[_0x8d4e88(0x1b1)]();if(_0x2bcc22===_0x8d4e88(0x12d))this[_0x8d4e88(0x1bb)](_0x13d5ba,_0x2f4c31['x']+_0x2f4c31['width']-_0x48ae5d,_0x2f4c31['y'],_0x48ae5d);else{if(_0x2bcc22===_0x8d4e88(0x1d2)){const _0x12f92d=_0x2f4c31['x']+Math[_0x8d4e88(0x20e)]((_0x2f4c31[_0x8d4e88(0xcf)]-_0x48ae5d)/0x2);this[_0x8d4e88(0x1bb)](_0x13d5ba,_0x12f92d,_0x2f4c31['y'],_0x48ae5d);}else this['drawTextEx'](_0x13d5ba,_0x2f4c31['x'],_0x2f4c31['y'],_0x48ae5d);}},Window_MenuCommand[_0x2fb800(0x1cf)][_0x2fb800(0xfb)]=function(_0x25bad0){const _0x5d24da=_0x2fb800;this[_0x5d24da(0xe5)](_0x25bad0)['match'](/\\I\[(\d+)\]/i);const _0x12791c=Number(RegExp['$1']),_0x2fdab7=this['itemLineRect'](_0x25bad0),_0x373d41=_0x2fdab7['x']+Math[_0x5d24da(0x20e)]((_0x2fdab7[_0x5d24da(0xcf)]-ImageManager['iconWidth'])/0x2),_0x14ddac=_0x2fdab7['y']+(_0x2fdab7[_0x5d24da(0x13e)]-ImageManager['iconHeight'])/0x2;this['drawIcon'](_0x12791c,_0x373d41,_0x14ddac);},VisuMZ[_0x2fb800(0x169)][_0x2fb800(0x166)]=Window_StatusBase[_0x2fb800(0x1cf)]['loadFaceImages'],Window_StatusBase[_0x2fb800(0x1cf)][_0x2fb800(0xf2)]=function(){const _0x4b60ef=_0x2fb800;VisuMZ[_0x4b60ef(0x169)]['Window_StatusBase_loadFaceImages'][_0x4b60ef(0x1e1)](this),this[_0x4b60ef(0x1ee)]();},Window_StatusBase[_0x2fb800(0x1cf)][_0x2fb800(0x1ee)]=function(){const _0x4305bb=_0x2fb800;for(const _0x2f0c1c of $gameParty['members']()){if(_0x4305bb(0x1f4)===_0x4305bb(0x1f4)){if(!_0x2f0c1c)continue;if(_0x2f0c1c[_0x4305bb(0xda)]()){if('IieHm'==='PNPKq'){const _0x582477=_0x39d26c['x']+_0x16ad8a[_0x4305bb(0x20e)]((_0x48ab20[_0x4305bb(0xcf)]-_0x409d6b)/0x2);this[_0x4305bb(0x1bb)](_0x326648,_0x582477,_0x3551db['y'],_0x5cec09);}else ImageManager[_0x4305bb(0x171)](_0x2f0c1c['characterName']());}_0x2f0c1c[_0x4305bb(0xa4)]()&&ImageManager[_0x4305bb(0x172)](_0x2f0c1c[_0x4305bb(0xa4)]());if(_0x2f0c1c[_0x4305bb(0x18a)]()){if(_0x4305bb(0xee)!=='yFwdk')ImageManager[_0x4305bb(0x1c7)](_0x2f0c1c[_0x4305bb(0x18a)]());else return this['canCreateVariableWindow']()&&_0x4ffece['MainMenuCore'][_0x4305bb(0x14b)]['Variable'][_0x4305bb(0x1a8)];}}else{if(this[_0x4305bb(0x1a9)]>0x0){const _0x5b3958=this['_duration'];this[_0x4305bb(0x170)]=(this['opacity']*(_0x5b3958-0x1)+0xff)/_0x5b3958;}}}},Window_StatusBase[_0x2fb800(0x1cf)][_0x2fb800(0x186)]=function(){const _0x2aed36=_0x2fb800;return VisuMZ[_0x2aed36(0x169)]['Settings']['StatusGraphic'];},Window_StatusBase[_0x2fb800(0x1cf)][_0x2fb800(0x17d)]=function(_0x379db5,_0x5402a1,_0x49a6d4,_0x25646e,_0x150080){const _0x5ce51d=_0x2fb800;_0x25646e=_0x25646e||ImageManager['faceWidth'],_0x150080=_0x150080||ImageManager[_0x5ce51d(0xce)];const _0x4a8daf=ImageManager[_0x5ce51d(0x175)],_0x1c9567=_0x150080-0x2,_0x1db7ba=_0x5402a1+Math['floor']((_0x25646e-_0x4a8daf)/0x2);this[_0x5ce51d(0x21f)]===Window_MenuStatus&&this[_0x5ce51d(0x1b0)](_0x379db5[_0x5ce51d(0xfd)]()),this[_0x5ce51d(0x11b)](_0x379db5,_0x1db7ba,_0x49a6d4,_0x4a8daf,_0x1c9567),this['changePaintOpacity'](!![]);},Window_StatusBase[_0x2fb800(0x1cf)][_0x2fb800(0x197)]=function(_0x3f4ab5,_0x11eac,_0x55bc28,_0x4f5fae,_0x4adbe3){const _0x60ea86=_0x2fb800;_0x4f5fae=_0x4f5fae||ImageManager[_0x60ea86(0x175)],_0x4adbe3=_0x4adbe3||ImageManager[_0x60ea86(0xce)];const _0x4baa5f=_0x3f4ab5[_0x60ea86(0xda)](),_0x168db3=_0x3f4ab5[_0x60ea86(0x183)](),_0x3bb236=ImageManager['loadCharacter'](_0x4baa5f),_0x5b2b3c=ImageManager[_0x60ea86(0x110)](_0x4baa5f),_0x4526cd=_0x3bb236[_0x60ea86(0xcf)]/(_0x5b2b3c?0x3:0xc),_0x190fcf=_0x3bb236['height']/(_0x5b2b3c?0x4:0x8),_0x1dcb98=_0x4f5fae,_0x289daa=_0x4adbe3-0x2,_0xcf8038=_0x11eac+Math['floor'](_0x1dcb98/0x2),_0x28276c=_0x55bc28+Math['ceil']((_0x4adbe3+_0x190fcf)/0x2);this[_0x60ea86(0x21f)]===Window_MenuStatus&&(_0x60ea86(0x144)!==_0x60ea86(0x213)?this['changePaintOpacity'](_0x3f4ab5[_0x60ea86(0xfd)]()):(_0x3393f7[_0x60ea86(0x195)](_0x4437f[_0x60ea86(0xe1)]()[0x0]),this[_0x60ea86(0x216)]()));const _0x76c0fa=Math[_0x60ea86(0x108)](_0x4f5fae,_0x4526cd),_0x2c83a1=Math['min'](_0x4adbe3,_0x190fcf),_0x268b31=Math[_0x60ea86(0x20e)](_0x11eac+Math[_0x60ea86(0x19e)](_0x4f5fae-_0x4526cd,0x0)/0x2),_0x65dd45=Math['floor'](_0x55bc28+Math[_0x60ea86(0x19e)](_0x4adbe3-_0x190fcf,0x0)/0x2),_0x229687=_0x5b2b3c?0x0:_0x168db3,_0x9f6e04=(_0x229687%0x4*0x3+0x1)*_0x4526cd,_0x3e1043=Math['floor'](_0x229687/0x4)*0x4*_0x190fcf;this[_0x60ea86(0xfe)]['blt'](_0x3bb236,_0x9f6e04,_0x3e1043,_0x76c0fa,_0x2c83a1,_0x268b31,_0x65dd45),this[_0x60ea86(0x1b0)](!![]);},Window_StatusBase['prototype'][_0x2fb800(0x115)]=function(_0x37a5ad,_0x464927,_0x2f850d,_0x42137d,_0x3615f5){const _0x4e56ca=_0x2fb800;_0x42137d=_0x42137d||ImageManager[_0x4e56ca(0x175)],_0x3615f5=_0x3615f5||ImageManager[_0x4e56ca(0xce)];const _0x1fc407=ImageManager[_0x4e56ca(0x172)](_0x37a5ad[_0x4e56ca(0xa4)]()),_0x3ea8f2=_0x1fc407['width']/ImageManager['svActorHorzCells'],_0x469843=_0x1fc407[_0x4e56ca(0x13e)]/ImageManager[_0x4e56ca(0x160)],_0x389a5b=_0x42137d,_0xace7fd=_0x3615f5-0x2,_0x3be707=_0x464927+Math[_0x4e56ca(0x20e)](_0x389a5b/0x2),_0xeeb390=_0x2f850d+Math['ceil']((_0x3615f5+_0x469843)/0x2);this[_0x4e56ca(0x21f)]===Window_MenuStatus&&this[_0x4e56ca(0x1b0)](_0x37a5ad[_0x4e56ca(0xfd)]());const _0x3b9145=Math['min'](_0x42137d,_0x3ea8f2),_0xd280a=Math[_0x4e56ca(0x108)](_0x3615f5,_0x469843),_0x8f1cb6=Math['floor'](_0x464927+Math[_0x4e56ca(0x19e)](_0x42137d-_0x3ea8f2,0x0)/0x2),_0x4b678b=Math[_0x4e56ca(0x20e)](_0x2f850d+Math[_0x4e56ca(0x19e)](_0x3615f5-_0x469843,0x0)/0x2),_0x197b47=0x0,_0x4e7229=0x0;this[_0x4e56ca(0xfe)][_0x4e56ca(0x1b4)](_0x1fc407,_0x197b47,_0x4e7229,_0x3b9145,_0xd280a,_0x8f1cb6,_0x4b678b),this['changePaintOpacity'](!![]);},Window_StatusBase['prototype'][_0x2fb800(0x1f9)]=function(_0x56b5df,_0x42d4f1,_0x207909,_0x28efa1,_0x34c52e){const _0xb27d1b=_0x2fb800,_0x9d899f=ImageManager[_0xb27d1b(0x1c7)](_0x56b5df['getMenuImage']());_0x28efa1=(_0x28efa1||ImageManager[_0xb27d1b(0x175)])-0x2,_0x34c52e=(_0x34c52e||ImageManager[_0xb27d1b(0xce)])-0x2;const _0x38c807=_0x9d899f[_0xb27d1b(0xcf)],_0x472ed7=_0x9d899f[_0xb27d1b(0x13e)],_0x1a22aa=_0x28efa1,_0x36e11e=_0x34c52e-0x2,_0x40476f=_0x42d4f1+Math['floor'](_0x1a22aa/0x2),_0x87e03b=_0x207909+Math['ceil']((_0x34c52e+_0x472ed7)/0x2);this[_0xb27d1b(0x21f)]===Window_MenuStatus&&this[_0xb27d1b(0x1b0)](_0x56b5df['isBattleMember']());const _0x5677ed=Math[_0xb27d1b(0x108)](_0x28efa1,_0x38c807),_0x2dec2a=Math['min'](_0x34c52e,_0x472ed7),_0x23cf46=_0x42d4f1+0x1,_0x2013f6=Math[_0xb27d1b(0x19e)](_0x207909+0x1,_0x207909+_0x36e11e-_0x472ed7+0x3);let _0x2fe182=(_0x38c807-_0x5677ed)/0x2,_0x8b28db=(_0x472ed7-_0x2dec2a)/0x2;_0x2fe182-=_0x56b5df['getMenuImageOffsetX'](),_0x8b28db-=_0x56b5df[_0xb27d1b(0x15e)](),this[_0xb27d1b(0xfe)]['blt'](_0x9d899f,_0x2fe182,_0x8b28db,_0x5677ed,_0x2dec2a,_0x23cf46,_0x2013f6),this[_0xb27d1b(0x1b0)](!![]);},VisuMZ[_0x2fb800(0x169)][_0x2fb800(0xd8)]=Window_MenuStatus[_0x2fb800(0x1cf)]['selectLast'],Window_MenuStatus[_0x2fb800(0x1cf)]['selectLast']=function(){const _0x5d5d3f=_0x2fb800;if(VisuMZ[_0x5d5d3f(0x169)]['Settings'][_0x5d5d3f(0x1e6)][_0x5d5d3f(0x12c)])_0x5d5d3f(0x173)==='eKDKo'?VisuMZ[_0x5d5d3f(0x169)][_0x5d5d3f(0xd8)][_0x5d5d3f(0x1e1)](this):(_0xc2b749[_0x5d5d3f(0x169)]['Scene_MenuBase_updateActor']['call'](this),this['isDisplayActorMenuBackgroundImage']()&&this[_0x5d5d3f(0x1ab)]&&this['_actorMenuBgSprite'][_0x5d5d3f(0xae)](this[_0x5d5d3f(0x162)]));else{if(_0x5d5d3f(0x15f)!=='USxyf'){if(this[_0x5d5d3f(0x1d3)]()){if(_0x1b56c6[_0x5d5d3f(0x169)]['Settings'][_0x5d5d3f(0x1e6)][_0x5d5d3f(0xff)]){const _0x1c6c54=_0x42bf09[_0x5d5d3f(0x13e)]-this[_0x5d5d3f(0x206)](0x1,![]);_0x27864a['y']+=_0x1c6c54;}_0x545c83[_0x5d5d3f(0x169)][_0x5d5d3f(0x14b)][_0x5d5d3f(0x1e6)][_0x5d5d3f(0x1ba)]&&(_0x56f331[_0x5d5d3f(0x13e)]=this[_0x5d5d3f(0x206)](0x1,![]));}}else this[_0x5d5d3f(0x1bc)](0x0);}},VisuMZ['MainMenuCore'][_0x2fb800(0x11c)]=Window_MenuStatus[_0x2fb800(0x1cf)][_0x2fb800(0x191)],Window_MenuStatus[_0x2fb800(0x1cf)][_0x2fb800(0x191)]=function(){const _0x161b68=_0x2fb800;return this[_0x161b68(0xa8)]()?$gameParty[_0x161b68(0x1af)]()[_0x161b68(0x17e)]:'kmspS'===_0x161b68(0x15a)?VisuMZ[_0x161b68(0x169)][_0x161b68(0x11c)][_0x161b68(0x1e1)](this):this[_0x161b68(0x176)]();},Window_MenuStatus[_0x2fb800(0x1cf)][_0x2fb800(0xa8)]=function(){const _0x2ed216=_0x2fb800,_0x220708=VisuMZ[_0x2ed216(0x169)][_0x2ed216(0x14b)][_0x2ed216(0x1e6)];if(_0x220708[_0x2ed216(0x18e)]===undefined)_0x220708['ShowReserve']=!![];const _0x2ef114=SceneManager[_0x2ed216(0x223)];if(!_0x220708[_0x2ed216(0x18e)]){if(_0x2ed216(0x113)!==_0x2ed216(0x113)){if(this[_0x2ed216(0x100)]<=0x0)this['refresh']();}else{if(_0x220708[_0x2ed216(0xf0)])return _0x2ef114[_0x2ed216(0x21f)]===Scene_Menu;return!![];}}return![];},Window_MenuStatus[_0x2fb800(0x1cf)]['listStyle']=function(){const _0x25d80e=_0x2fb800,_0x4cf475=SceneManager[_0x25d80e(0x223)][_0x25d80e(0x21f)];if(_0x4cf475===Scene_Menu)return VisuMZ[_0x25d80e(0x169)][_0x25d80e(0x14b)][_0x25d80e(0x109)];else{if(_0x25d80e(0x1e4)===_0x25d80e(0x1e4))return VisuMZ['MainMenuCore'][_0x25d80e(0x14b)][_0x25d80e(0x11a)];else{const _0x51d96a=_0x4f0d60[_0x25d80e(0x169)]['Scene_Menu_commandWindowRect']['call'](this);return this[_0x25d80e(0x10c)](_0x51d96a),_0x51d96a;}}},Window_MenuStatus[_0x2fb800(0x1cf)][_0x2fb800(0x21e)]=function(){const _0x3f1056=_0x2fb800,_0x111552=this['listStyle']();switch(_0x111552){case _0x3f1056(0x193):case _0x3f1056(0x1f7):return 0x1;case _0x3f1056(0x12f):return 0x1;default:return $gameParty['maxBattleMembers']();}},Window_MenuStatus['prototype'][_0x2fb800(0x106)]=function(){const _0x4eaf65=_0x2fb800,_0x1935b3=this['listStyle']();switch(_0x1935b3){case _0x4eaf65(0x193):case _0x4eaf65(0x1f7):return $gameParty[_0x4eaf65(0x1a3)]();default:return 0x1;}},VisuMZ[_0x2fb800(0x169)]['Window_MenuStatus_itemHeight']=Window_MenuStatus[_0x2fb800(0x1cf)][_0x2fb800(0x215)],Window_MenuStatus[_0x2fb800(0x1cf)][_0x2fb800(0x215)]=function(){const _0x1fa13b=_0x2fb800,_0xbb1de0=this['listStyle']();switch(_0xbb1de0){case _0x1fa13b(0x193):case _0x1fa13b(0x1f7):case _0x1fa13b(0x12f):return this[_0x1fa13b(0xc7)];case'thin':return Window_Selectable['prototype'][_0x1fa13b(0x215)][_0x1fa13b(0x1e1)](this);case'thicker':return this['lineHeight']()*0x2+0x8;default:return VisuMZ[_0x1fa13b(0x169)]['Window_MenuStatus_itemHeight']['call'](this);}},Window_MenuStatus['prototype']['drawItem']=function(_0x32d59e){const _0xfe0937=_0x2fb800;this[_0xfe0937(0x201)](_0x32d59e),this[_0xfe0937(0x221)](_0x32d59e);},VisuMZ[_0x2fb800(0x169)][_0x2fb800(0xc5)]=Window_MenuStatus[_0x2fb800(0x1cf)][_0x2fb800(0x1d9)],Window_MenuStatus[_0x2fb800(0x1cf)]['drawActorGraphic']=function(_0xe0931b,_0x45fa8a,_0x441218,_0x15b869,_0xe62e0f){const _0x50fa32=_0x2fb800;switch(this['graphicType']()){case _0x50fa32(0x1c5):break;case _0x50fa32(0x1b3):this['drawItemActorSprite'](_0xe0931b,_0x45fa8a,_0x441218+0x1,_0x15b869,_0xe62e0f-0x2);break;case'svbattler':this[_0x50fa32(0x115)](_0xe0931b,_0x45fa8a,_0x441218+0x1,_0x15b869,_0xe62e0f-0x2);break;default:this[_0x50fa32(0x17d)](_0xe0931b,_0x45fa8a,_0x441218,_0x15b869,_0xe62e0f);break;}},Window_MenuStatus[_0x2fb800(0x1cf)][_0x2fb800(0x221)]=function(_0x5631d){const _0x55339c=_0x2fb800;this[_0x55339c(0xb1)]();const _0x5cacde=this['actor'](_0x5631d),_0x363cd3=this[_0x55339c(0x211)](_0x5631d),_0x53b697=this['listStyle']();switch(_0x53b697){case'vertical':this[_0x55339c(0xa1)](_0x5cacde,_0x363cd3);break;case _0x55339c(0x1f7):this[_0x55339c(0x1e5)](_0x5cacde,_0x363cd3);break;case _0x55339c(0x12f):this['drawItemStatusSoloStyle'](_0x5cacde,_0x363cd3);break;case _0x55339c(0x212):this[_0x55339c(0xbc)](_0x5cacde,_0x363cd3);break;case'thicker':this[_0x55339c(0x182)](_0x5cacde,_0x363cd3);break;default:this[_0x55339c(0x17b)](_0x5cacde,_0x363cd3);break;}},Window_MenuStatus['prototype']['drawItemStatusVerticalStyle']=function(_0x380be5,_0x560f27){const _0x40a558=_0x2fb800;VisuMZ[_0x40a558(0x169)]['Settings'][_0x40a558(0x203)]['VerticalStyle'][_0x40a558(0x1e1)](this,_0x380be5,_0x560f27);},Window_MenuStatus[_0x2fb800(0x1cf)][_0x2fb800(0x1e5)]=function(_0x293f74,_0x561788){const _0x31c283=_0x2fb800;if(_0x293f74[_0x31c283(0x18a)]()!==''){const _0x24588f=ImageManager[_0x31c283(0x1c7)](_0x293f74[_0x31c283(0x18a)]());_0x24588f[_0x31c283(0x1a4)](this['drawItemStatusPortraitStyleOnLoad'][_0x31c283(0x15c)](this,_0x293f74,_0x561788));}else this[_0x31c283(0xa1)](_0x293f74,_0x561788);},Window_MenuStatus[_0x2fb800(0x1cf)][_0x2fb800(0xde)]=function(_0x185d67,_0x37974f){const _0x1a0a73=_0x2fb800;VisuMZ['MainMenuCore'][_0x1a0a73(0x14b)][_0x1a0a73(0x203)][_0x1a0a73(0x1f0)]['call'](this,_0x185d67,_0x37974f);},Window_MenuStatus[_0x2fb800(0x1cf)]['drawItemStatusSoloStyle']=function(_0x4a27d8,_0xd0e1a4){const _0xe4db49=_0x2fb800,_0x52e2e3=ImageManager[_0xe4db49(0x1c7)](_0x4a27d8[_0xe4db49(0x18a)]());_0x52e2e3[_0xe4db49(0x1a4)](this[_0xe4db49(0xf7)]['bind'](this,_0x4a27d8,_0xd0e1a4));},Window_MenuStatus[_0x2fb800(0x1cf)]['drawItemStatusSoloStyleOnLoad']=function(_0x4406e2,_0x56545c){const _0x3c26d2=_0x2fb800;VisuMZ[_0x3c26d2(0x169)]['Settings'][_0x3c26d2(0x203)][_0x3c26d2(0x131)][_0x3c26d2(0x1e1)](this,_0x4406e2,_0x56545c);},Window_MenuStatus['prototype'][_0x2fb800(0xbc)]=function(_0x27c292,_0x27660a){const _0x4189df=_0x2fb800;VisuMZ['MainMenuCore'][_0x4189df(0x14b)][_0x4189df(0x203)][_0x4189df(0xbb)][_0x4189df(0x1e1)](this,_0x27c292,_0x27660a);},Window_MenuStatus[_0x2fb800(0x1cf)]['drawItemStatusThickerStyle']=function(_0x1601d3,_0x15fc16){const _0x3d1cc8=_0x2fb800;VisuMZ['MainMenuCore'][_0x3d1cc8(0x14b)]['ListStyles'][_0x3d1cc8(0x125)][_0x3d1cc8(0x1e1)](this,_0x1601d3,_0x15fc16);},Window_MenuStatus[_0x2fb800(0x1cf)]['isExpGaugeDrawn']=function(){const _0x19de3d=_0x2fb800,_0x1682f5=this[_0x19de3d(0x1ec)]();if([_0x19de3d(0x212),_0x19de3d(0x1bd)][_0x19de3d(0x157)](_0x1682f5))return![];return Window_StatusBase[_0x19de3d(0x1cf)][_0x19de3d(0x178)]['call'](this);},Window_MenuStatus['prototype'][_0x2fb800(0x17b)]=function(_0x32aad3,_0x23062e){const _0x5d01ba=_0x2fb800;VisuMZ['MainMenuCore']['Settings'][_0x5d01ba(0x203)][_0x5d01ba(0x17a)][_0x5d01ba(0x1e1)](this,_0x32aad3,_0x23062e);},Window_SkillStatus[_0x2fb800(0x1cf)]['drawActorFace']=function(_0x11810e,_0xdf0a43,_0x48a78e,_0x1f016f,_0x2edddb){const _0x46c0a7=_0x2fb800;switch(this['graphicType']()){case _0x46c0a7(0x1c5):break;case _0x46c0a7(0x1b3):this[_0x46c0a7(0x197)](_0x11810e,_0xdf0a43,_0x48a78e,_0x1f016f,_0x2edddb);break;case'svbattler':this['drawItemActorSvBattler'](_0x11810e,_0xdf0a43,_0x48a78e,_0x1f016f,_0x2edddb);break;default:Window_StatusBase[_0x46c0a7(0x1cf)][_0x46c0a7(0x11b)][_0x46c0a7(0x1e1)](this,_0x11810e,_0xdf0a43,_0x48a78e,_0x1f016f,_0x2edddb);break;}},Window_EquipStatus[_0x2fb800(0x1cf)][_0x2fb800(0x11b)]=function(_0x146c34,_0x225129,_0x8cd87c,_0x1c24ef,_0x146447){const _0x12b167=_0x2fb800;switch(this[_0x12b167(0x186)]()){case'none':break;case _0x12b167(0x1b3):this[_0x12b167(0x197)](_0x146c34,_0x225129,_0x8cd87c,_0x1c24ef,_0x146447);break;case _0x12b167(0x145):this[_0x12b167(0x115)](_0x146c34,_0x225129,_0x8cd87c,_0x1c24ef,_0x146447);break;default:Window_StatusBase[_0x12b167(0x1cf)][_0x12b167(0x11b)][_0x12b167(0x1e1)](this,_0x146c34,_0x225129,_0x8cd87c,_0x1c24ef,_0x146447);break;}};function Window_ThinGold(){const _0x1f17ce=_0x2fb800;this[_0x1f17ce(0x14f)](...arguments);}function _0xb2b4(_0x1fc4d0,_0x1732b5){return _0xb2b4=function(_0xc683ab,_0xb2b49e){_0xc683ab=_0xc683ab-0x9f;let _0x45c22b=_0xc683[_0xc683ab];return _0x45c22b;},_0xb2b4(_0x1fc4d0,_0x1732b5);}Window_ThinGold[_0x2fb800(0x1cf)]=Object[_0x2fb800(0x138)](Window_Gold[_0x2fb800(0x1cf)]),Window_ThinGold['prototype'][_0x2fb800(0x21f)]=Window_ThinGold,Window_ThinGold[_0x2fb800(0x1cf)]['itemHeight']=function(){const _0x5c5a62=_0x2fb800;return this[_0x5c5a62(0x150)]();},Window_ThinGold[_0x2fb800(0x1cf)][_0x2fb800(0x209)]=function(){const _0x479708=_0x2fb800;return Window_Selectable[_0x479708(0x1cf)][_0x479708(0x209)]['call'](this);};function Window_Playtime(){this['initialize'](...arguments);}Window_Playtime[_0x2fb800(0x1cf)]=Object[_0x2fb800(0x138)](Window_Selectable[_0x2fb800(0x1cf)]),Window_Playtime['prototype']['constructor']=Window_Playtime,Window_Playtime[_0x2fb800(0x1cf)][_0x2fb800(0x14f)]=function(_0x2b5f23){const _0x3d6ed4=_0x2fb800;this[_0x3d6ed4(0xac)]=$gameSystem[_0x3d6ed4(0x15b)](),this[_0x3d6ed4(0x100)]=0x3c,Window_Selectable[_0x3d6ed4(0x1cf)]['initialize'][_0x3d6ed4(0x1e1)](this,_0x2b5f23),this[_0x3d6ed4(0x154)]();},Window_Playtime[_0x2fb800(0x1cf)]['itemHeight']=function(){const _0x593d18=_0x2fb800;return this[_0x593d18(0x150)]();},Window_Playtime[_0x2fb800(0x1cf)][_0x2fb800(0xd9)]=function(){const _0x3d6b05=_0x2fb800;Window_Selectable[_0x3d6b05(0x1cf)][_0x3d6b05(0xd9)][_0x3d6b05(0x1e1)](this),this['updateTimer']();},Window_Playtime['prototype']['updateTimer']=function(){const _0x58d23b=_0x2fb800;if(this[_0x58d23b(0x100)]-->0x0){if(this[_0x58d23b(0x100)]<=0x0)this[_0x58d23b(0x154)]();}},Window_Playtime[_0x2fb800(0x1cf)][_0x2fb800(0x154)]=function(){const _0x54f1de=_0x2fb800;this['_timer']=0x3c;const _0x8197e5=this['itemLineRect'](0x0),_0x539e8d=_0x8197e5['x'],_0x295eb4=_0x8197e5['y'],_0x314ef8=_0x8197e5['width'];this['contents'][_0x54f1de(0xd6)](),this[_0x54f1de(0x13d)](_0x8197e5),this['drawTimeLabel'](_0x8197e5),this['drawPlaytime'](_0x8197e5);},Window_Playtime['prototype'][_0x2fb800(0xb1)]=function(){const _0xe9a275=_0x2fb800;Window_Selectable[_0xe9a275(0x1cf)][_0xe9a275(0xb1)]['call'](this),this[_0xe9a275(0xfe)]['fontSize']=VisuMZ[_0xe9a275(0x169)]['Settings']['Playtime'][_0xe9a275(0xc1)];},Window_Playtime[_0x2fb800(0x1cf)][_0x2fb800(0x13d)]=function(_0x1299d5){const _0x377f7e=_0x2fb800;if(VisuMZ[_0x377f7e(0x169)][_0x377f7e(0x14b)][_0x377f7e(0x1ce)][_0x377f7e(0x112)]>0x0){const _0x5db1c9=VisuMZ[_0x377f7e(0x169)]['Settings']['Playtime'][_0x377f7e(0x112)],_0x296532=_0x1299d5['y']+(this[_0x377f7e(0x150)]()-ImageManager['iconHeight'])/0x2;this[_0x377f7e(0x10b)](_0x5db1c9,_0x1299d5['x'],_0x296532);const _0x5510f1=ImageManager['iconWidth']+0x4;_0x1299d5['x']+=_0x5510f1,_0x1299d5[_0x377f7e(0xcf)]-=_0x5510f1;}},Window_Playtime[_0x2fb800(0x1cf)][_0x2fb800(0x16d)]=function(_0x4f45c7){const _0x3b5946=_0x2fb800;this[_0x3b5946(0xb1)](),this['changeTextColor'](ColorManager[_0x3b5946(0x124)]());const _0x7aedf2=VisuMZ['MainMenuCore']['Settings']['Playtime'][_0x3b5946(0x184)];this['drawText'](_0x7aedf2,_0x4f45c7['x'],_0x4f45c7['y'],_0x4f45c7['width'],'left'),this['resetTextColor']();},Window_Playtime['prototype']['drawPlaytime']=function(_0x4b88c6){const _0x5f6154=_0x2fb800,_0x5106c0=$gameSystem[_0x5f6154(0x15b)]();this[_0x5f6154(0xb6)](_0x5106c0,_0x4b88c6['x'],_0x4b88c6['y'],_0x4b88c6[_0x5f6154(0xcf)],'right');};function Window_MenuVariables(){this['initialize'](...arguments);}Window_MenuVariables[_0x2fb800(0x1cf)]=Object['create'](Window_Selectable[_0x2fb800(0x1cf)]),Window_MenuVariables[_0x2fb800(0x1cf)][_0x2fb800(0x21f)]=Window_MenuVariables,Window_MenuVariables[_0x2fb800(0x1cf)]['initialize']=function(_0x52080d){const _0x3837c8=_0x2fb800;Window_Selectable[_0x3837c8(0x1cf)][_0x3837c8(0x14f)][_0x3837c8(0x1e1)](this,_0x52080d),this[_0x3837c8(0x1d0)]=VisuMZ[_0x3837c8(0x169)][_0x3837c8(0x14b)]['Variable'][_0x3837c8(0x1b7)],this[_0x3837c8(0x154)]();},Window_MenuVariables[_0x2fb800(0x1cf)][_0x2fb800(0x215)]=function(){const _0xef325e=_0x2fb800;return this[_0xef325e(0x150)]();},Window_MenuVariables[_0x2fb800(0x1cf)]['maxCols']=function(){const _0x547aac=_0x2fb800,_0x6c4595=SceneManager[_0x547aac(0x223)]['commandWindowStyle']();return _0x6c4595===_0x547aac(0x12a)?0x1:VisuMZ['MainMenuCore']['Settings']['Variable']['VarList'][_0x547aac(0x17e)];},Window_MenuVariables['prototype'][_0x2fb800(0xb1)]=function(){const _0x3195d2=_0x2fb800;Window_Selectable[_0x3195d2(0x1cf)][_0x3195d2(0xb1)][_0x3195d2(0x1e1)](this),this['contents'][_0x3195d2(0x1d7)]=VisuMZ[_0x3195d2(0x169)][_0x3195d2(0x14b)][_0x3195d2(0x1eb)]['FontSize'],this[_0x3195d2(0x103)](ColorManager[_0x3195d2(0x124)]());},Window_MenuVariables[_0x2fb800(0x1cf)]['maxItems']=function(){const _0x45dfba=_0x2fb800;return this['_data'][_0x45dfba(0x17e)];},Window_MenuVariables[_0x2fb800(0x1cf)]['drawAllItems']=function(){const _0x52a052=_0x2fb800,_0x423e45=this[_0x52a052(0x152)]();for(let _0xbf2cd7=0x0;_0xbf2cd7<this[_0x52a052(0x127)]();_0xbf2cd7++){if(_0x52a052(0x159)!==_0x52a052(0x13b)){const _0x48ab45=_0x423e45+_0xbf2cd7;_0x48ab45<this[_0x52a052(0x191)]()&&(this[_0x52a052(0x1ef)](_0x48ab45),this['drawItem'](_0x48ab45));}else _0x564844(_0x52a052(0x1d4)[_0x52a052(0x158)](_0x2e503d,_0x2b57bf)),_0x437e8d[_0x52a052(0x1b8)]();}},Window_MenuVariables[_0x2fb800(0x1cf)][_0x2fb800(0x1ef)]=function(_0x196034){},Window_MenuVariables[_0x2fb800(0x1cf)]['drawItem']=function(_0x56e2ce){const _0x1365a9=_0x2fb800,_0x62a8cc=this[_0x1365a9(0x1d0)][_0x56e2ce];if(_0x62a8cc<=0x0)return;if(!$dataSystem[_0x1365a9(0x117)][_0x62a8cc])return;const _0x4780e7=this['itemLineRect'](_0x56e2ce);this[_0x1365a9(0xb1)]();let _0x56146b=0x0,_0x3ac28c=$dataSystem[_0x1365a9(0x117)][_0x62a8cc]['trim']();if(_0x3ac28c[_0x1365a9(0x1c3)](/\\I\[(\d+)\]/i)){if(_0x1365a9(0x16c)!==_0x1365a9(0x16c)){const _0x1c6b8f=_0x1d7fe7['MainMenuCore'][_0x1365a9(0x14b)][_0x1365a9(0x1e6)];if(_0x1c6b8f[_0x1365a9(0x18e)]===_0x5a9b96)_0x1c6b8f[_0x1365a9(0x18e)]=!![];const _0x5d3782=_0xd8b018[_0x1365a9(0x223)];if(!_0x1c6b8f[_0x1365a9(0x18e)]){if(_0x1c6b8f[_0x1365a9(0xf0)])return _0x5d3782['constructor']===_0x384563;return!![];}return![];}else _0x56146b=Number(RegExp['$1']),_0x3ac28c=_0x3ac28c['replace'](/\\I\[(\d+)\]/i,'')['trim']();}if(_0x56146b>0x0){const _0x328780=_0x4780e7['y']+(this[_0x1365a9(0x150)]()-ImageManager['iconHeight'])/0x2;this[_0x1365a9(0x10b)](_0x56146b,_0x4780e7['x'],_0x328780);const _0x15a1ee=ImageManager[_0x1365a9(0x21b)]+0x4;_0x4780e7['x']+=_0x15a1ee,_0x4780e7[_0x1365a9(0xcf)]-=_0x15a1ee;}this['drawText'](_0x3ac28c,_0x4780e7['x'],_0x4780e7['y'],_0x4780e7[_0x1365a9(0xcf)],_0x1365a9(0xd1)),this[_0x1365a9(0x103)](ColorManager[_0x1365a9(0x130)]()),this['drawText']($gameVariables[_0x1365a9(0x13f)](_0x62a8cc),_0x4780e7['x'],_0x4780e7['y'],_0x4780e7[_0x1365a9(0xcf)],_0x1365a9(0x12d));};