//=============================================================================
// VisuStella MZ - Save Core
// VisuMZ_1_SaveCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_SaveCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.SaveCore = VisuMZ.SaveCore || {};
VisuMZ.SaveCore.version = 1.06;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.06] [SaveCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Save_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Save Core plugin adds upon the existing functionality of how saves
 * operate in RPG Maker MZ and how the Save Menu appears in-game. Control over
 * autosaves is also provided by this plugin as well as the ability to make
 * Global Switches and Variables accessible across all game saves (including
 * new games).
 *
 * Features include all (but not limited to) the following:
 * 
 * * Save file technicalities including how filenames are made and or how
 *   forage keys are labeled to distinguish games from one another.
 * * Save types (standard, slot-locked, or single) to change saving to be
 *   suited for each game type.
 * * Save confirmation window added to relay information to player on whether
 *   or not a save has been made successfully.
 * * Global Switches and Variables that span across all saves and new games.
 * * Control over how autosaves handle (their own file, save over existing
 *   files, and/or both).
 * * Plugin Commands that enable/disable autosaves and forcefully activate them
 *   or request them.
 * * Change up how the Save Menu appears with various save styles.
 * * Add descriptions and pictures to the save files.
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
 * Global Switches and Global Variables
 * ============================================================================
 *
 * Global Switches and Global Variables are now added into the game engine via
 * this plugin. Global Switches and Global Variables exist in the same state
 * across all save files. This means if Switch 40 is declared to be a Global
 * Switch and is turned ON, then whether you start up a new game or open a
 * different save file, Switch 40 will be in the ON state. Similar will occur
 * with Global Variables.
 *
 * ---
 *
 * <Global> Switch/Variable Name
 *
 * To declare Global Switches and/or Global Variables, insert <Global> into
 * the Switch/Variable's name. That's all there is to it. Whatever value you
 * change the Global Switch/Variable to after declaring it will be changed
 * across all saves.
 *
 * ---
 *
 * NOTE: Tagged Switches/Variables are mutually exclusive from one another.
 * You cannot tag them with <Global>, <JS>, or <Self> simultaneously.
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
 * === Autosave Plugin Commands ===
 * 
 * ---
 *
 * Autosave: Enable/Disable
 * - Enable or Disable Autosave
 * - Requires Database => System 1 => [x] Enable Autosave
 *
 *   Enable or Disable?:
 *   - Enable or disable autosave?
 *
 * ---
 *
 * Autosave: (Stage 1) Request
 * - Autosaves the game at current point if enabled.
 * - Requires Database => System 1 => [x] Enable Autosave
 * - Autosave does not go through if it is neither enabled in the database or
 *   in-game through the "Autosave: Enable/Disable" plugin command.
 * - This Plugin Command will not autosave if the player turned off "Autosave"
 *   in the Options Menu.
 *
 * ---
 *
 * Autosave: (Stage 2) Execute
 * - Executes autosaves the game at the current point.
 * - Requires Database => System 1 => [x] Enable Autosave
 * - This will require autosave to be enabled through the database, but it will
 *   ignore the "Autosave: Enable/Disable" plugin command state.
 * - This Plugin Command will not autosave if the player turned off "Autosave"
 *   in the Options Menu.
 *
 * ---
 *
 * Autosave: (Stage 3) Force
 * - Forces autosaves the game at the current point.
 * - Requires Database => System 1 => [x] Enable Autosave
 * - This will require autosave to be enabled through the database, but it will
 *   ignore the "Autosave: Enable/Disable" plugin command state.
 *
 * ---
 *
 * Save: Current Slot
 * - Process the game's current save at the current point.
 * - Must be outside of battle and on the map.
 *
 * ---
 * 
 * === Save Plugin Commands ===
 * 
 * ---
 *
 * Save: Set Description
 * - Set the description text that will appear in the save files.
 *
 *   Text:
 *   - Insert desired save description text here.
 *   - Text codes supported.
 *   - \V[x], \N[x], \P[x] are save local.
 *   - Other text codes will draw data from the currently active game.
 *
 * ---
 *
 * Save: Set Picture
 * - Set the picture that would appear in the save file.
 *
 *   Filename:
 *   - Input the filename here of the desired picture.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Save Settings
 * ============================================================================
 *
 * These are general settings pertaining to saves and the technicalities behind
 * how saves work in your game.
 *
 * ---
 *
 * General
 * 
 *   Save Style:
 *   - Select a save style for the game. Some of these options may alter other
 *     Plugin Parameter settings.
 *   - Standard: Save freely in any slot.
 *   - Slot-Locked: Select one dedicated slot at New Game.
 *   - Single: Only one slot is available for the game.
 * 
 *   Max Save Files:
 *   - Maximum number of save files for the game.
 * 
 *   Autosave Counts?:
 *   - Count the autosave file towards the max count?
 *
 * ---
 *
 * Local Mode
 * 
 *   Local Mode?:
 *   - When running the game on client, use the Local Mode of saving via files
 *     or store saves to forage keys?
 * 
 *   Filename Format:
 *   - Filename format for save files.
 *   - %1 - Save File ID
 * 
 *   Extension Format:
 *   - Filename extension format for save files.
 *   - %1 - Save Name
 *
 * ---
 *
 * Forage Key
 * 
 *   Forage Key Format:
 *   - Forage Key format when saving to memory.
 *   - %1 - Game ID, %2 - Save Name
 * 
 *   Forage Key Test:
 *   - Key used to test if saving a forage key is possible.
 *
 * ---
 *
 * Vocabulary
 * 
 *   Help: Slot-Locked:
 *   - Help description used for initial slot-locked selection.
 *
 * ---
 *
 * JavaScript
 * 
 *   JS: On Save Success:
 *   - Code to perform when a save is successful.
 * 
 *   JS: On Save Failure:
 *   - Code to perform when a save has failed.
 * 
 *   JS: On Load Success:
 *   - Code to perform when a load is successful.
 * 
 *   JS: On Load Failure:
 *   - Code to perform when a load has failed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Save Confirm Window Settings
 * ============================================================================
 *
 * The Save Confirmation Window is a new feature added through this plugin.
 * It gives the player visual feedback letting the player know that a save is
 * successful or not.
 *
 * ---
 *
 * General
 * 
 *   Enable Window?:
 *   - Enable the Save Confirmation Window?
 * 
 *   Pop Up Duration:
 *   - How long should the window be open for before closing?
 *   - Insert the time in milliseconds.
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions of the Save Confirmation Window.
 *
 * ---
 *
 * Vocabulary
 * 
 *   Pop Up: Save Success:
 *   - Text used for a "Save Success" message popup.
 *   - Text codes are allowed.
 * 
 *   Pop Up: Save Failure:
 *   - Text used for a "Save Failure" message popup.
 *   - Text codes are allowed.
 * 
 *   Pop Up: Load Failure:
 *   - Text used for a "Load Failure" message popup.
 *   - Text codes are allowed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Autosave Settings
 * ============================================================================
 *
 * These settings adjust how autosaves work in your game project. The settings
 * will encompass the original autosave settings made by RPG Maker MZ as well
 * as new settings added through this plugin.
 *
 * ---
 *
 * General
 * 
 *   Autosave Type:
 *   - Select autosave type.
 *   - Requires Database => System 1 => [x] Enable Autosave
 *   - Autosave File: Dedicated save file for autosaves.
 *   - Current File: Overwrites the current save file.
 *   - Autosave File + Current File: Both of the above.
 * 
 *   Start Enabled?:
 *   - Start with autosave enabled?
 *   - Requires Database => System 1 => [x] Enable Autosave
 *
 * ---
 *
 * Requests
 * 
 *   Requires Save Enable?:
 *   - Autosave requests require Saving to be enabled?
 * 
 *   Request after Battle?:
 *   - Requests an autosave after battle?
 * 
 *   Request on Transfer?:
 *   - Requests an autosave after a map transfer?
 * 
 *   Request on Menu Open?:
 *   - Requests an autosave after opening the main menu?
 * 
 *   Request on Menu Exit?:
 *   - Requests an autosave after exiting the main menu?
 *
 * ---
 *
 * JavaScript
 * 
 *   JS: On Success:
 *   - Code to perform when an autosave is successful.
 * 
 *   JS: On Failure:
 *   - Code to perform when an autosave has failed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Autosave Confirm Window Settings
 * ============================================================================
 *
 * The Autosave Confirmation Window is a new feature added by this plugin to
 * notify the player whenever autosaving occurs.
 *
 * ---
 *
 * General
 * 
 *   Enable Window?:
 *   - Enable the Autoave Confirmation Window?
 * 
 *   Pop Up Duration:
 *   - How long should the window be open for before closing?
 *   - Insert the time in milliseconds.
 * 
 *   Screen Position:
 *   - Where does this window appear on the screen?
 *   - Lower Left
 *   - Lower Center
 *   - Lower Right
 *   - Middle Left
 *   - Middle Center
 *   - Middle Right
 *   - Upper Left
 *   - Upper Center
 *   - Upper Right
 *
 * ---
 *
 * Vocabulary
 * 
 *   Pop Up: Save Success:
 *   - Text used for an "Autosave Success" message popup.
 *   - Text codes are allowed
 * 
 *   Pop Up: Save Failure:
 *   - Text used for an "Autosave Failure" message popup.
 *   - Text codes are allowed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Autosave Options Settings
 * ============================================================================
 *
 * This plugin adds the "Autosave" option to the Options menu, allowing players
 * to decide if they want autosave enabled or not. This feature can be disabled
 * as well, to better suit games. If the "Autosave" option is turned off by the
 * player, then any Autosave requests and executions.
 *
 * ---
 *
 * Autosave Options
 * 
 *   Add Option?:
 *   - Add the 'Autosave' option to the Options menu?
 * 
 *   Adjust Window Height:
 *   - Automatically adjust the options window height?
 * 
 *   Option Name:
 *   - Command name of the option.
 *
 *   Default Value:
 *   - Determine the default value of this option.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Actor Graphic Settings
 * ============================================================================
 *
 * This Plugin Parameter lets you select which graphic to use for displaying
 * the actor party found inside the save menu.
 *
 * ---
 *
 * Actor Graphic
 * 
 *   None:
 *   - Don't display any actors.
 * 
 *   Face:
 *   - Display the face graphics for the actors.
 * 
 *   Map Sprite:
 *   - Display the sprite graphics for the actors.
 * 
 *   Sideview Battler:
 *   - Display the SV Battler graphics for the actors.
 *   - Note: If you have an existing save made before this plugin was
 *     installed, you may need to save over the existing ones to see the
 *     Sideview Battler graphics.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Save Menu Styles
 * ============================================================================
 *
 * Save Menu Styles affect how the save files themselves appear to the player,
 * as long horizontal lists, vertical columns, small boxes, or a large file.
 *
 * ---
 *
 * Save Menu Styles
 * 
 *   List:
 *   - Save files stretch horizontally across the screen.
 *   - Save files are listed as rows.
 * 
 *   Vertical:
 *   - Save files are stretched vertically across the screen.
 *   - Save files are depicted as columns.
 * 
 *   Box:
 *   - Save files are small boxes shown on the screen.
 *   - Save files are sign in both rows and columns.
 * 
 *   Large:
 *   - Save files take up the whole screen.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Style Settings
 * ============================================================================
 *
 * These settings allow you, the game dev, to manipulate how the save styles
 * appear in-game if they're not to your liking. JavaScript familiarity is a
 * must to adjust them.
 *
 * ---
 *
 * General
 * 
 *   Latest Text:
 *   - Text used to depict latest save file.
 * 
 *   Latest Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Sprite Width:
 *   - Pixel width of map sprites when drawn in the Save Menu.
 * 
 *   SV Battler Width:
 *   - Pixel width of sv battlers when drawn in the Save Menu.
 *
 *   JS: Save Display Info:
 *   - Code that, upon saving, determines which info is quickly stored
 *     for displaying.
 *
 * ---
 *
 * List Style
 * Vertical Style
 * Box Style
 * Large Style
 * 
 *   Rows:
 *   - Number of rows for this style.
 * 
 *   Columns:
 *   - Number of column for this style.
 * 
 *   JS: Draw Contents:
 *   - Code on how to draw the contents for this style.
 * 
 *   JS: Draw File Data:
 *   - Code on how to draw the file data for this style.
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
 * Version 1.06: July 16, 2021
 * * Compatibility Update!
 * ** Compatibility update with Party System's max member change to fit a non-
 *    default amount of party members inside of the window. Update by Irina.
 * 
 * Version 1.05: May 14, 2021
 * * Feature Update!
 * ** Confirmation windows now have rounded coordinates to prevent distortions.
 *    Update made by Arisu.
 * 
 * Version 1.04: March 12, 2021
 * * Bug Fixes!
 * ** Fixed a bug where using the Plugin Command to save the current slot would
 *    not reload properly if the audio file BGM was not synched. Fix made by
 *    Arisu.
 * 
 * Version 1.03: November 29, 2020
 * * Bug Fixes!
 * ** Displayed month should now show the correct numeric value.
 *    Fix made by Arisu.
 * 
 * Version 1.02: September 13, 2020
 * * Compatibility Update!
 * ** Better compatibility for SV Actor graphics.
 * * Documentation Update!
 * ** The Plugin Command 'Save: Set Description' now has updated documentation
 *    for the text codes that are parsed on the local level.
 * * Feature Update!
 * ** The Plugin Command 'Save: Set Description' will now parse text code
 *    data for \V[x], \N[x], \P[x] on a local save file level. Feature updated
 *    by Yanfly.
 * 
 * Version 1.01: September 6, 2020
 * * Bug Fixes!
 * ** Disabling confirmation windows no longer cause crashes.
 *    Fix made by Yanfly.
 * ** Plugin Commands for for setting descriptions and save images work despite
 *    save settings found in the database. Fix made by Yanfly.
 * ** Save Core no longer crashes when going to the Save/Load scenes without
 *    the Core Engine enabled.
 * ** Single and Locked save styles no longer crash the game when loading.
 *    Fix made by Olivia.
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
 * @command AutosaveEnable
 * @text Autosave: Enable/Disable
 * @desc Enable or Disable Autosave
 * Requires Database => System 1 => [x] Enable Autosave
 *
 * @arg Enable:eval
 * @text Enable or Disable?
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enable or disable autosave?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command AutosaveRequest
 * @text Autosave: (Stage 1) Request
 * @desc Autosaves the game at current point if enabled.
 * Requires Database => System 1 => [x] Enable Autosave
 *
 * @ --------------------------------------------------------------------------
 *
 * @command AutosaveExecute
 * @text Autosave: (Stage 2) Execute
 * @desc Executes autosaves the game at the current point.
 * Requires Database => System 1 => [x] Enable Autosave
 *
 * @ --------------------------------------------------------------------------
 *
 * @command AutosaveForce
 * @text Autosave: (Stage 3) Force
 * @desc Force autosaves the game at the current point.
 * Requires Database => System 1 => [x] Enable Autosave
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SaveCurrentSlot
 * @text Save: Current Slot
 * @desc Process the game's current save at the current point.
 * Must be outside of battle and on the map.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SaveDescription
 * @text Save: Set Description
 * @desc Set the description text that will appear in the save files.
 *
 * @arg Text:str
 * @text Text
 * @desc Insert desired save description text here. 
 * Text codes supported. \V[x], \N[x], \P[x] are save local.
 * @default Text
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SavePicture
 * @text Save: Set Picture
 * @desc Set the picture that would appear in the save file.
 *
 * @arg Filename:str
 * @text Filename
 * @type file
 * @dir img/pictures/
 * @desc Input the filename here of the desired picture.
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
 * @param SaveCore
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Save:struct
 * @text Save Settings
 * @type struct<Save>
 * @desc General save settings pertaining to the game.
 * @default {"General":"","SaveStyle:str":"standard","MaxSaveFiles:num":"20","AutosaveMaxCount:eval":"false","LocalMode":"","LocalMode:eval":"true","FilenameFmt:str":"file%1","ExtensionFmt:str":"%1.rmmzsave","ForageKey":"","KeyFmt:str":"rmmzsave.%1.%2","TestKey:str":"rmmzsave.test","Vocabulary":"","VocabLockedSaveSlot:str":"Pick a file to start a new game.","JavaScript":"","OnSaveSuccessJS:func":"\"// Declare Constants\\nconst scene = this;\\n\\n// Actions\\n\"","OnSaveFailureJS:func":"\"// Declare Constants\\nconst scene = this;\\n\\n// Actions\\n\"","OnLoadSuccessJS:func":"\"// Declare Constants\\nconst scene = this;\\n\\n// Actions\\n\"","OnLoadFailureJS:func":"\"// Declare Constants\\nconst scene = this;\\n\\n// Actions\\n\""}
 *
 * @param SaveConfirm:struct
 * @text Confirm Window
 * @parent Save:struct
 * @type struct<SaveConfirm>
 * @desc Settings regarding the Save Confirmation Window.
 * @default {"General":"","Enable:eval":"true","Duration:num":"1000","ConfirmRect:func":"\"const width = Graphics.boxWidth / 2;\\nconst height = this.calcWindowHeight(1, false);\\nconst x = (Graphics.width - width) / 2;\\nconst y = (Graphics.height - height) / 2;\\nreturn new Rectangle(x, y, width, height);\"","Vocabulary":"","VocabSaveSuccess:str":"Save Successful!","VocabSaveFailure:str":"Could not save!","VocabLoadFailure:str":"Could not load save file!"}
 *
 * @param Autosave:struct
 * @text Autoave Settings
 * @type struct<Autosave>
 * @desc Game settings related to autosave.
 * @default {"General":"","AutosaveType:str":"file0","StartEnabled:eval":"true","Requests":"","RequestsRequireSaveEnable:eval":"true","AfterBattle:eval":"true","AfterTransfer:eval":"true","AfterMenuCall:eval":"true","AfterExitMenu:eval":"true","JavaScript":"","OnAutosaveSuccessJS:func":"\"// Declare Constants\\nconst scene = this;\\n\\n// Actions\\n\"","OnAutosaveFailureJS:func":"\"// Declare Constants\\nconst scene = this;\\n\\n// Actions\\n\""}
 *
 * @param AutosaveConfirm:struct
 * @text Confirm Window
 * @parent Autosave:struct
 * @type struct<AutosaveConfirm>
 * @desc Settings regarding the Autosave Confirmation Window.
 * @default {"General":"","Enable:eval":"true","Duration:num":"1000","ScreenPosition:str":"lower right","Vocabulary":"","VocabAutosaveSuccess:str":"\\I[193]Autosaved!","VocabAutosaveFailure:str":"\\I[194]Autosave failed!"}
 *
 * @param AutosaveOption:struct
 * @text Options Settings
 * @parent Autosave:struct
 * @type struct<AutosaveOption>
 * @desc Options Menu settings regarding Autosave.
 * @default {"AddOption:eval":"true","AdjustRect:eval":"true","Name:str":"Autosave","Default:num":"true"}
 *
 * @param StyleBreak
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param ActorGraphic:str
 * @text Actor Graphic
 * @type select
 * @option None
 * @value none
 * @option Face
 * @value face
 * @option Map Sprite
 * @value sprite
 * @option Sideview Battler
 * @value svbattler
 * @desc Choose how the actor graphics appear in save menus.
 * @default face
 *
 * @param SaveMenuStyle:str
 * @text Save Menu Style
 * @type select
 * @option List
 * @value list
 * @option Vertical
 * @value vertical
 * @option Box
 * @value box
 * @option Large
 * @value large
 * @desc Choose what kind of style to use for the Save Menu.
 * @default box
 *
 * @param SaveMenu:struct
 * @text Style Settings
 * @parent SaveMenuStyle:str
 * @type struct<SaveMenu>
 * @desc Settings regarding the individual Save Menu styles.
 * @default {"General":"","LatestText:str":"NEW!","LatestColor:str":"#f49ac1","SpriteWidth:num":"48","SvBattlerWidth:num":"64","MakeSavefileInfoJS:func":"\"// Declare Constants\\nconst info = arguments[0];\\n\\n// Store Displayed Save Data\\ninfo.gold = $gameParty.gold();\\ninfo.svbattlers = $gameParty.svbattlersForSaveFile();\\ninfo.description = $gameSystem.getSaveDescription() || '';\\ninfo.picture = $gameSystem.getSavePicture() || '';\\n\\n// Return Save Info\\nreturn info;\"","List":"","ListRows:num":"4","ListCols:num":"1","ListContentsJS:func":"\"// Declare Variables\\nconst info = arguments[0];\\nconst rect = arguments[1];\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\nconst c1 = ColorManager.dimColor1();\\nconst c2 = ColorManager.dimColor2();\\n\\n// Draw Actors\\nconst minimumScale = true;\\nthis.drawCenteredPicture(info.picture, rect.x, rect.y, rect.width, rect.height, minimumScale);\\nlet ch = rect.height;\\nif (this.actorStyle() === 'sprite') {\\n    ch -= lineHeight - 8;\\n} else if (this.actorStyle() === 'svbattler') {\\n    ch -= lineHeight - 12;\\n}\\nthis.drawActors(info, rect.x + padding, rect.y, rect.width - padding * 2, ch);\\n\\n// Draw Gradients\\nthis.contents.gradientFillRect(rect.x, rect.y, rect.width, lineHeight, c2, c1, true);\\nif (info.gold || info.description) {\\n    const gy = rect.y + rect.height - lineHeight;\\n    this.contents.gradientFillRect(rect.x, gy, rect.width, lineHeight, c1, c2, true);\\n}\\n\\n// Draw Data\\nthis.contents.fontSize = 18;\\ny = rect.y;\\nthis.drawPlaytime(info, rect.x + padding, y, rect.width - padding * 2, 'right');\\nthis.drawTimestamp(info, rect.x + padding, y, rect.width - padding * 2, 'center');\\ny = rect.y + rect.height - lineHeight;\\nif (info.gold) {\\n    this.drawCurrency(info, rect.x + padding, y, rect.width - padding * 2);\\n}\\n\\n// Draw Description\\ny = rect.y + rect.height - lineHeight;\\nthis.drawDescription(info, rect.x + padding, y, rect.width - padding * 2, 'left');\"","ListFileDataJS:func":"\"// Declare Constants\\nconst savefileId = arguments[0];\\nconst rect = arguments[1];\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\nconst y2 = rect.y + ((rect.height - lineHeight) / 2);\\n\\n// Draw File Data\\nthis.drawTitle(savefileId, rect.x + padding, rect.y);\\nthis.drawLatestMarker(savefileId, rect.x + padding, y2);\"","Vertical":"","VertRows:num":"1","VertCols:num":"3","VertContentsJS:func":"\"// Declare Variables\\nconst info = arguments[0];\\nconst rect = arguments[1];\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\nconst c1 = ColorManager.dimColor1();\\nconst c2 = ColorManager.dimColor2();\\n\\n// Draw Actors\\nconst minimumScale = true;\\nthis.drawCenteredPicture(info.picture, rect.x, rect.y, rect.width, rect.height, minimumScale);\\nconst ch = this.actorStyle() === 'face' ? ImageManager.faceHeight : ImageManager.saveMenuSvBattlerWidth;\\nconst cy = rect.y + ((rect.height - ch) / 2);\\nthis.drawActors(info, rect.x + padding, cy, rect.width - padding * 2, ch);\\n\\n// Draw Gradients\\nthis.contents.gradientFillRect(rect.x, rect.y, rect.width, lineHeight, c2, c1, true);\\nconst gy = rect.y + rect.height - lineHeight * 2;\\nthis.contents.gradientFillRect(rect.x, gy, rect.width, lineHeight * 2, c1, c2, true);\\n\\n// Draw Description\\ny = rect.y + lineHeight * 2;\\nthis.setWordWrap(true);\\nthis.drawDescription(info, rect.x + padding, y, rect.width - padding * 2, 'left');\\nthis.resetWordWrap(false);\\n\\n// Draw Data\\nthis.contents.fontSize = 18;\\ny = rect.y + rect.height - lineHeight;\\nthis.drawTimestamp(info, rect.x + padding, y, rect.width - padding * 2, 'center');\\ny -= lineHeight;\\nthis.drawPlaytime(info, rect.x + padding, y, rect.width - padding * 2, 'center');\\nif (info.gold) {\\n    y -= lineHeight;\\n    this.drawCurrency(info, rect.x + padding, y, rect.width - padding * 2);\\n}\"","VertFileDataJS:func":"\"// Declare Constants\\nconst savefileId = arguments[0];\\nconst rect = arguments[1];\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\n\\n// Draw File Data\\nthis.drawTitle(savefileId, rect.x + padding, rect.y);\\nconst x2 = rect.x + rect.width - padding - this.textWidth(TextManager.latestSave);\\nthis.drawLatestMarker(savefileId, x2, rect.y);\"","Box":"","BoxRows:num":"2","BoxCols:num":"3","BoxContentsJS:func":"\"// Declare Variables\\nconst info = arguments[0];\\nconst rect = arguments[1];\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\nconst c1 = ColorManager.dimColor1();\\nconst c2 = ColorManager.dimColor2();\\n\\n// Draw Actors\\nconst minimumScale = false;\\nthis.drawCenteredPicture(info.picture, rect.x, rect.y, rect.width, rect.height, minimumScale);\\nconst rh = rect.height - lineHeight * 3;\\nconst ch = ImageManager.faceHeight;\\nconst cy = rect.y + ((rh - ch) / 2) + lineHeight;\\nthis.drawActors(info, rect.x + 1, cy, rect.width - 2, ch);\\n\\n// Draw Gradients\\nthis.contents.gradientFillRect(rect.x, rect.y, rect.width, lineHeight, c2, c1, true);\\nconst gy = rect.y + rect.height - lineHeight * 2;\\nthis.contents.gradientFillRect(rect.x, gy, rect.width, lineHeight * 2, c1, c2, true);\\n\\n// Draw Data\\nthis.contents.fontSize = 18;\\ny = rect.y + lineHeight;\\nthis.contents.gradientFillRect(rect.x, y, rect.width, lineHeight, c2, c1, false);\\nthis.drawTimestamp(info, rect.x + padding, y, rect.width - padding * 2, 'right');\\ny += lineHeight;\\nconst hw = rect.width / 2;\\nthis.contents.gradientFillRect(rect.x + hw, y, hw, lineHeight, c2, c1, false);\\nthis.drawPlaytime(info, rect.x + padding, y, rect.width - padding * 2, 'right');\\nif (info.gold) {\\n    // Ignore drawing gold in this style\\n    // y = rect.y + rect.height - lineHeight * 3;\\n    // this.drawCurrency(info, rect.x + padding, y, rect.width - padding * 2);\\n}\\n\\n// Draw Description\\ny = rect.y + rect.height - lineHeight * 2;\\nthis.setWordWrap(true);\\nthis.drawDescription(info, rect.x + padding, y, rect.width - padding * 2, 'left');\\nthis.resetWordWrap(false);\"","BoxFileDataJS:func":"\"// Declare Constants\\nconst savefileId = arguments[0];\\nconst rect = arguments[1];\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\n\\n// Draw File Data\\nthis.drawTitle(savefileId, rect.x + padding, rect.y);\\nconst x2 = rect.x + rect.width - padding - this.textWidth(TextManager.latestSave);\\nthis.drawLatestMarker(savefileId, x2, rect.y);\"","Large":"","LargeRows:num":"1","LargeCols:num":"1","LargeContentsJS:func":"\"// Declare Variables\\nconst info = arguments[0];\\nconst rect = arguments[1];\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\nconst c1 = ColorManager.dimColor1();\\nconst c2 = ColorManager.dimColor2();\\n\\n// Draw Actors\\nconst minimumScale = false;\\nthis.drawCenteredPicture(info.picture, rect.x, rect.y, rect.width, rect.height, minimumScale);\\nconst ch = this.actorStyle() === 'face' ? ImageManager.faceHeight : ImageManager.saveMenuSvBattlerWidth;\\nconst cy = rect.y + ((rect.height - ch) / 2);\\nthis.drawActors(info, rect.x + padding, cy, rect.width - padding * 2, ch);\\n\\n// Draw Gradients\\nthis.contents.gradientFillRect(rect.x, rect.y, rect.width, lineHeight, c2, c1, true);\\nconst gy = rect.y + rect.height - lineHeight;\\nthis.contents.gradientFillRect(rect.x, gy, rect.width, lineHeight, c1, c2, true);\\n\\n// Draw Description\\ny = rect.y + lineHeight * 1.5;\\nthis.setWordWrap(true);\\nthis.drawDescription(info, rect.x + padding * 4, y, rect.width - padding * 8, 'left');\\nthis.resetWordWrap(false);\\n\\n// Draw Data\\nthis.contents.fontSize = 18;\\nthis.drawTimestamp(info, rect.x + padding, rect.y, rect.width - padding * 2, 'center');\\ny = rect.y + rect.height - lineHeight;\\nthis.drawPlaytime(info, rect.x + padding, y, rect.width - padding * 2, 'center');\\nif (info.gold) {\\n    this.drawCurrency(info, rect.x + padding, y, rect.width - padding * 2);\\n}\"","LargeFileDataJS:func":"\"// Declare Constants\\nconst savefileId = arguments[0];\\nconst rect = arguments[1];\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\n\\n// Draw File Data\\nthis.drawTitle(savefileId, rect.x + padding, rect.y);\\nconst x2 = rect.x + rect.width - padding - this.textWidth(TextManager.latestSave);\\nthis.drawLatestMarker(savefileId, x2, rect.y);\""}
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
 * General Save Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Save:
 *
 * @param General
 *
 * @param SaveStyle:str
 * @text Save Style
 * @parent General
 * @type select
 * @option Standard: Save freely in any slot.
 * @value standard
 * @option Slot-Locked: Select one dedicated slot at New Game.
 * @value locked
 * @option Single: Only one slot is available for the game.
 * @value single
 * @desc Select a save style for the game. Some of these options
 * may alter other Plugin Parameter settings.
 * @default standard
 *
 * @param MaxSaveFiles:num
 * @text Max Save Files
 * @parent General
 * @desc Maximum number of save files for the game.
 * @default 20
 *
 * @param AutosaveMaxCount:eval
 * @text Autosave Counts?
 * @parent General
 * @type boolean
 * @on Counts Towards Max
 * @off Doesn't Count
 * @desc Count the autosave file towards the max count?
 * @default false
 *
 * @param LocalMode
 * @text Local Mode
 *
 * @param LocalMode:eval
 * @text Local Mode?
 * @parent LocalMode
 * @type boolean
 * @on Local File
 * @off Forage Key
 * @desc When running the game on client, use the Local Mode of
 * saving via files or store saves to forage keys?
 * @default true
 *
 * @param FilenameFmt:str
 * @text Filename Format
 * @parent LocalMode
 * @desc Filename format for save files.
 * %1 - Save File ID
 * @default file%1
 *
 * @param ExtensionFmt:str
 * @text Extension Format
 * @parent LocalMode
 * @desc Filename extension format for save files.
 * %1 - Save Name
 * @default %1.rmmzsave
 *
 * @param ForageKey
 * @text Forage Key
 *
 * @param KeyFmt:str
 * @text Forage Key Format
 * @parent ForageKey
 * @desc Forage Key format when saving to memory.
 * %1 - Game ID, %2 - Save Name
 * @default rmmzsave.%1.%2
 *
 * @param TestKey:str
 * @text Forage Key Test
 * @parent ForageKey
 * @desc Key used to test if saving a forage key is possible.
 * @default rmmzsave.test
 *
 * @param Vocabulary
 *
 * @param VocabLockedSaveSlot:str
 * @text Help: Slot-Locked
 * @parent Vocabulary
 * @desc Help description used for initial slot-locked selection.
 * @default Pick a file to start a new game.
 *
 * @param JavaScript
 *
 * @param OnSaveSuccessJS:func
 * @text JS: On Save Success
 * @parent JavaScript
 * @type note
 * @desc Code to perform when a save is successful.
 * @default "// Declare Constants\nconst scene = this;\n\n// Actions\n"
 *
 * @param OnSaveFailureJS:func
 * @text JS: On Save Failure
 * @parent JavaScript
 * @type note
 * @desc Code to perform when a save has failed.
 * @default "// Declare Constants\nconst scene = this;\n\n// Actions\n"
 *
 * @param OnLoadSuccessJS:func
 * @text JS: On Load Success
 * @parent JavaScript
 * @type note
 * @desc Code to perform when a load is successful.
 * @default "// Declare Constants\nconst scene = this;\n\n// Actions\n"
 *
 * @param OnLoadFailureJS:func
 * @text JS: On Load Failure
 * @parent JavaScript
 * @type note
 * @desc Code to perform when a load has failed.
 * @default "// Declare Constants\nconst scene = this;\n\n// Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * Save Confirm Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~SaveConfirm:
 *
 * @param General
 *
 * @param Enable:eval
 * @text Enable Window?
 * @parent General
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc Enable the Save Confirmation Window?
 * @default true
 *
 * @param Duration:num
 * @text Pop Up Duration
 * @parent General
 * @type number
 * @min 1
 * @desc How long should the window be open for before closing?
 * Insert the time in milliseconds.
 * @default 1000
 *
 * @param ConfirmRect:func
 * @text JS: X, Y, W, H
 * @parent General
 * @type note
 * @desc Code used to determine the dimensions of the 
 * Save Confirmation Window.
 * @default "const width = Graphics.boxWidth / 2;\nconst height = this.calcWindowHeight(1, false);\nconst x = (Graphics.width - width) / 2;\nconst y = (Graphics.height - height) / 2;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param Vocabulary
 *
 * @param VocabSaveSuccess:str
 * @text Pop Up: Save Success
 * @parent Vocabulary
 * @desc Text used for a "Save Success" message popup.
 * Text codes are allowed.
 * @default Save Successful!
 *
 * @param VocabSaveFailure:str
 * @text Pop Up: Save Failure
 * @parent Vocabulary
 * @desc Text used for a "Save Failure" message popup.
 * Text codes are allowed.
 * @default Could not save!
 *
 * @param VocabLoadFailure:str
 * @text Pop Up: Load Failure
 * @parent Vocabulary
 * @desc Text used for a "Load Failure" message popup.
 * Text codes are allowed.
 * @default Could not load save file!
 *
 */
/* ----------------------------------------------------------------------------
 * Autosave Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Autosave:
 *
 * @param General
 *
 * @param AutosaveType:str
 * @text Autosave Type
 * @parent General
 * @type select
 * @option Autosave File: Dedicated file for autosaves.
 * @value file0
 * @option Current File: Overwrites the current save file.
 * @value current
 * @option Autosave File + Current File: Both of the above.
 * @value both
 * @desc Select autosave type.
 * Requires Database => System 1 => [x] Enable Autosave
 * @default file0
 *
 * @param StartEnabled:eval
 * @text Start Enabled?
 * @parent General
 * @type boolean
 * @on Start Enabled
 * @off Start Disabled
 * @desc Start with autosave enabled?
 * Requires Database => System 1 => [x] Enable Autosave
 * @default true
 *
 * @param Requests
 *
 * @param RequestsRequireSaveEnable:eval
 * @text Requires Save Enable?
 * @parent Requests
 * @type boolean
 * @on Requires Save Enable
 * @off Doesn't Require
 * @desc Autosave requests require Saving to be enabled?
 * @default true
 *
 * @param AfterBattle:eval
 * @text Request after Battle?
 * @parent Requests
 * @type boolean
 * @on Autosave
 * @off Don't
 * @desc Requests an autosave after battle?
 * @default true
 *
 * @param AfterTransfer:eval
 * @text Request on Transfer?
 * @parent Requests
 * @type boolean
 * @on Autosave
 * @off Don't
 * @desc Requests an autosave after a map transfer?
 * @default true
 *
 * @param AfterMenuCall:eval
 * @text Request on Menu Open?
 * @parent Requests
 * @type boolean
 * @on Autosave
 * @off Don't
 * @desc Requests an autosave after opening the main menu?
 * @default true
 *
 * @param AfterExitMenu:eval
 * @text Request on Menu Exit?
 * @parent Requests
 * @type boolean
 * @on Autosave
 * @off Don't
 * @desc Requests an autosave after exiting the main menu?
 * @default true
 *
 * @param JavaScript
 *
 * @param OnAutosaveSuccessJS:func
 * @text JS: On Success
 * @parent JavaScript
 * @type note
 * @desc Code to perform when an autosave is successful.
 * @default "// Declare Constants\nconst scene = this;\n\n// Actions\n"
 *
 * @param OnAutosaveFailureJS:func
 * @text JS: On Failure
 * @parent JavaScript
 * @type note
 * @desc Code to perform when an autosave has failed.
 * @default "// Declare Constants\nconst scene = this;\n\n// Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * Autosave Confirm Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~AutosaveConfirm:
 *
 * @param General
 *
 * @param Enable:eval
 * @text Enable Window?
 * @parent General
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc Enable the Autoave Confirmation Window?
 * @default true
 *
 * @param Duration:num
 * @text Pop Up Duration
 * @parent General
 * @type number
 * @min 1
 * @desc How long should the window be open for before closing?
 * Insert the time in milliseconds.
 * @default 1000
 *
 * @param ScreenPosition:str
 * @text Screen Position
 * @parent General
 * @type select
 * @option Lower Left
 * @value lower left
 * @option Lower Center
 * @value lower center
 * @option Lower Right
 * @value lower right
 * @option Middle Left
 * @value middle left
 * @option Middle Center
 * @value middle center
 * @option Middle Right
 * @value middle right
 * @option Upper Left
 * @value upper left
 * @option Upper Center
 * @value upper center
 * @option Upper Right
 * @value upper right
 * @desc Where does this window appear on the screen?
 * @default lower right
 *
 * @param Vocabulary
 *
 * @param VocabAutosaveSuccess:str
 * @text Pop Up: Save Success
 * @parent Vocabulary
 * @desc Text used for an "Autosave Success" message popup.
 * Text codes are allowed.
 * @default \I[193]Autosaved!
 *
 * @param VocabAutosaveFailure:str
 * @text Pop Up: Save Failure
 * @parent Vocabulary
 * @desc Text used for an "Autosave Failure" message popup.
 * Text codes are allowed.
 * @default \I[194]Autosave failed!
 *
 */
/* ----------------------------------------------------------------------------
 * Autosave Options Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~AutosaveOption:
 *
 * @param AddOption:eval
 * @text Add Option?
 * @type boolean
 * @on Add
 * @off Don't Add
 * @desc Add the 'Autosave' option to the Options menu?
 * @default true
 *
 * @param AdjustRect:eval
 * @text Adjust Window Height
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the options window height?
 * @default true
 *
 * @param Name:str
 * @text Option Name
 * @desc Command name of the option.
 * @default Autosave
 *
 * @param Default:eval
 * @text Default Value
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Determine the default value of this option.
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Save Menu Style Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~SaveMenu:
 *
 * @param General
 *
 * @param LatestText:str
 * @text Latest Text
 * @parent General
 * @desc Text used to depict latest save file.
 * @default NEW!
 *
 * @param LatestColor:str
 * @text Latest Color
 * @parent General
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #f49ac1
 *
 * @param SpriteWidth:num
 * @text Sprite Width
 * @parent General
 * @type number
 * @desc Pixel width of map sprites when drawn in the Save Menu.
 * @default 48
 *
 * @param SvBattlerWidth:num
 * @text SV Battler Width
 * @parent General
 * @type number
 * @desc Pixel width of sv battlers when drawn in the Save Menu.
 * @default 64
 *
 * @param MakeSavefileInfoJS:func
 * @text JS: Save Display Info
 * @parent General
 * @type note
 * @desc Code that, upon saving, determines which info is quickly stored for displaying.
 * @default "// Declare Constants\nconst info = arguments[0];\n\n// Store Displayed Save Data\ninfo.gold = $gameParty.gold();\ninfo.svbattlers = $gameParty.svbattlersForSaveFile();\ninfo.description = $gameSystem.getSaveDescription() || '';\ninfo.picture = $gameSystem.getSavePicture() || '';\n\n// Return Save Info\nreturn info;"
 *
 * @param List
 * @text List Style
 *
 * @param ListRows:num
 * @text Rows
 * @parent List
 * @type number
 * @min 1
 * @desc Number of rows for this style.
 * @default 4
 *
 * @param ListCols:num
 * @text Columns
 * @parent List
 * @type number
 * @min 1
 * @desc Number of column for this style.
 * @default 1
 *
 * @param ListContentsJS:func
 * @text JS: Draw Contents
 * @parent List
 * @type note
 * @desc Code on how to draw the contents for this style.
 * @default "// Declare Variables\nconst info = arguments[0];\nconst rect = arguments[1];\nconst lineHeight = this.lineHeight();\nconst padding = this.itemPadding();\nconst c1 = ColorManager.dimColor1();\nconst c2 = ColorManager.dimColor2();\n\n// Draw Actors\nconst minimumScale = true;\nthis.drawCenteredPicture(info.picture, rect.x, rect.y, rect.width, rect.height, minimumScale);\nlet ch = rect.height;\nif (this.actorStyle() === 'sprite') {\n    ch -= lineHeight - 8;\n} else if (this.actorStyle() === 'svbattler') {\n    ch -= lineHeight - 12;\n}\nthis.drawActors(info, rect.x + padding, rect.y, rect.width - padding * 2, ch);\n\n// Draw Gradients\nthis.contents.gradientFillRect(rect.x, rect.y, rect.width, lineHeight, c2, c1, true);\nif (info.gold || info.description) {\n    const gy = rect.y + rect.height - lineHeight;\n    this.contents.gradientFillRect(rect.x, gy, rect.width, lineHeight, c1, c2, true);\n}\n\n// Draw Data\nthis.contents.fontSize = 18;\ny = rect.y;\nthis.drawPlaytime(info, rect.x + padding, y, rect.width - padding * 2, 'right');\nthis.drawTimestamp(info, rect.x + padding, y, rect.width - padding * 2, 'center');\ny = rect.y + rect.height - lineHeight;\nif (info.gold) {\n    this.drawCurrency(info, rect.x + padding, y, rect.width - padding * 2);\n}\n\n// Draw Description\ny = rect.y + rect.height - lineHeight;\nthis.drawDescription(info, rect.x + padding, y, rect.width - padding * 2, 'left');"
 *
 * @param ListFileDataJS:func
 * @text JS: Draw File Data
 * @parent List
 * @type note
 * @desc Code on how to draw the file data for this style.
 * @default "// Declare Constants\nconst savefileId = arguments[0];\nconst rect = arguments[1];\nconst lineHeight = this.lineHeight();\nconst padding = this.itemPadding();\nconst y2 = rect.y + ((rect.height - lineHeight) / 2);\n\n// Draw File Data\nthis.drawTitle(savefileId, rect.x + padding, rect.y);\nthis.drawLatestMarker(savefileId, rect.x + padding, y2);"
 *
 * @param Vertical
 * @text Vertical Style
 *
 * @param VertRows:num
 * @text Rows
 * @parent Vertical
 * @type number
 * @min 1
 * @desc Number of rows for this style.
 * @default 1
 *
 * @param VertCols:num
 * @text Columns
 * @parent Vertical
 * @type number
 * @min 1
 * @desc Number of column for this style.
 * @default 3
 *
 * @param VertContentsJS:func
 * @text JS: Draw Contents
 * @parent Vertical
 * @type note
 * @desc Code on how to draw the contents for this style.
 * @default "// Declare Variables\nconst info = arguments[0];\nconst rect = arguments[1];\nconst lineHeight = this.lineHeight();\nconst padding = this.itemPadding();\nconst c1 = ColorManager.dimColor1();\nconst c2 = ColorManager.dimColor2();\n\n// Draw Actors\nconst minimumScale = true;\nthis.drawCenteredPicture(info.picture, rect.x, rect.y, rect.width, rect.height, minimumScale);\nconst ch = this.actorStyle() === 'face' ? ImageManager.faceHeight : ImageManager.saveMenuSvBattlerWidth;\nconst cy = rect.y + ((rect.height - ch) / 2);\nthis.drawActors(info, rect.x + padding, cy, rect.width - padding * 2, ch);\n\n// Draw Gradients\nthis.contents.gradientFillRect(rect.x, rect.y, rect.width, lineHeight, c2, c1, true);\nconst gy = rect.y + rect.height - lineHeight * 2;\nthis.contents.gradientFillRect(rect.x, gy, rect.width, lineHeight * 2, c1, c2, true);\n\n// Draw Description\ny = rect.y + lineHeight * 2;\nthis.setWordWrap(true);\nthis.drawDescription(info, rect.x + padding, y, rect.width - padding * 2, 'left');\nthis.resetWordWrap(false);\n\n// Draw Data\nthis.contents.fontSize = 18;\ny = rect.y + rect.height - lineHeight;\nthis.drawTimestamp(info, rect.x + padding, y, rect.width - padding * 2, 'center');\ny -= lineHeight;\nthis.drawPlaytime(info, rect.x + padding, y, rect.width - padding * 2, 'center');\nif (info.gold) {\n    y -= lineHeight;\n    this.drawCurrency(info, rect.x + padding, y, rect.width - padding * 2);\n}"
 *
 * @param VertFileDataJS:func
 * @text JS: Draw File Data
 * @parent Vertical
 * @type note
 * @desc Code on how to draw the file data for this style.
 * @default "// Declare Constants\nconst savefileId = arguments[0];\nconst rect = arguments[1];\nconst lineHeight = this.lineHeight();\nconst padding = this.itemPadding();\n\n// Draw File Data\nthis.drawTitle(savefileId, rect.x + padding, rect.y);\nconst x2 = rect.x + rect.width - padding - this.textWidth(TextManager.latestSave);\nthis.drawLatestMarker(savefileId, x2, rect.y);"
 *
 * @param Box
 * @text Box Style
 *
 * @param BoxRows:num
 * @text Rows
 * @parent Box
 * @type number
 * @min 1
 * @desc Number of rows for this style.
 * @default 2
 *
 * @param BoxCols:num
 * @text Columns
 * @parent Box
 * @type number
 * @min 1
 * @desc Number of column for this style.
 * @default 3
 *
 * @param BoxContentsJS:func
 * @text JS: Draw Contents
 * @parent Box
 * @type note
 * @desc Code on how to draw the contents for this style.
 * @default "// Declare Variables\nconst info = arguments[0];\nconst rect = arguments[1];\nconst lineHeight = this.lineHeight();\nconst padding = this.itemPadding();\nconst c1 = ColorManager.dimColor1();\nconst c2 = ColorManager.dimColor2();\n\n// Draw Actors\nconst minimumScale = false;\nthis.drawCenteredPicture(info.picture, rect.x, rect.y, rect.width, rect.height, minimumScale);\nconst rh = rect.height - lineHeight * 3;\nconst ch = ImageManager.faceHeight;\nconst cy = rect.y + ((rh - ch) / 2) + lineHeight;\nthis.drawActors(info, rect.x + 1, cy, rect.width - 2, ch);\n\n// Draw Gradients\nthis.contents.gradientFillRect(rect.x, rect.y, rect.width, lineHeight, c2, c1, true);\nconst gy = rect.y + rect.height - lineHeight * 2;\nthis.contents.gradientFillRect(rect.x, gy, rect.width, lineHeight * 2, c1, c2, true);\n\n// Draw Data\nthis.contents.fontSize = 18;\ny = rect.y + lineHeight;\nthis.contents.gradientFillRect(rect.x, y, rect.width, lineHeight, c2, c1, false);\nthis.drawTimestamp(info, rect.x + padding, y, rect.width - padding * 2, 'right');\ny += lineHeight;\nconst hw = rect.width / 2;\nthis.contents.gradientFillRect(rect.x + hw, y, hw, lineHeight, c2, c1, false);\nthis.drawPlaytime(info, rect.x + padding, y, rect.width - padding * 2, 'right');\nif (info.gold) {\n    // Ignore drawing gold in this style\n    // y = rect.y + rect.height - lineHeight * 3;\n    // this.drawCurrency(info, rect.x + padding, y, rect.width - padding * 2);\n}\n\n// Draw Description\ny = rect.y + rect.height - lineHeight * 2;\nthis.setWordWrap(true);\nthis.drawDescription(info, rect.x + padding, y, rect.width - padding * 2, 'left');\nthis.resetWordWrap(false);"
 *
 * @param BoxFileDataJS:func
 * @text JS: Draw File Data
 * @parent Box
 * @type note
 * @desc Code on how to draw the file data for this style.
 * @default "// Declare Constants\nconst savefileId = arguments[0];\nconst rect = arguments[1];\nconst lineHeight = this.lineHeight();\nconst padding = this.itemPadding();\n\n// Draw File Data\nthis.drawTitle(savefileId, rect.x + padding, rect.y);\nconst x2 = rect.x + rect.width - padding - this.textWidth(TextManager.latestSave);\nthis.drawLatestMarker(savefileId, x2, rect.y);"
 *
 * @param Large
 * @text Large Style
 *
 * @param LargeRows:num
 * @text Rows
 * @parent Large
 * @type number
 * @min 1
 * @desc Number of rows for this style.
 * @default 1
 *
 * @param LargeCols:num
 * @text Columns
 * @parent Large
 * @type number
 * @min 1
 * @desc Number of column for this style.
 * @default 1
 *
 * @param LargeContentsJS:func
 * @text JS: Draw Contents
 * @parent Large
 * @type note
 * @desc Code on how to draw the contents for this style.
 * @default "// Declare Variables\nconst info = arguments[0];\nconst rect = arguments[1];\nconst lineHeight = this.lineHeight();\nconst padding = this.itemPadding();\nconst c1 = ColorManager.dimColor1();\nconst c2 = ColorManager.dimColor2();\n\n// Draw Actors\nconst minimumScale = false;\nthis.drawCenteredPicture(info.picture, rect.x, rect.y, rect.width, rect.height, minimumScale);\nconst ch = this.actorStyle() === 'face' ? ImageManager.faceHeight : ImageManager.saveMenuSvBattlerWidth;\nconst cy = rect.y + ((rect.height - ch) / 2);\nthis.drawActors(info, rect.x + padding, cy, rect.width - padding * 2, ch);\n\n// Draw Gradients\nthis.contents.gradientFillRect(rect.x, rect.y, rect.width, lineHeight, c2, c1, true);\nconst gy = rect.y + rect.height - lineHeight;\nthis.contents.gradientFillRect(rect.x, gy, rect.width, lineHeight, c1, c2, true);\n\n// Draw Description\ny = rect.y + lineHeight * 1.5;\nthis.setWordWrap(true);\nthis.drawDescription(info, rect.x + padding * 4, y, rect.width - padding * 8, 'left');\nthis.resetWordWrap(false);\n\n// Draw Data\nthis.contents.fontSize = 18;\nthis.drawTimestamp(info, rect.x + padding, rect.y, rect.width - padding * 2, 'center');\ny = rect.y + rect.height - lineHeight;\nthis.drawPlaytime(info, rect.x + padding, y, rect.width - padding * 2, 'center');\nif (info.gold) {\n    this.drawCurrency(info, rect.x + padding, y, rect.width - padding * 2);\n}"
 *
 * @param LargeFileDataJS:func
 * @text JS: Draw File Data
 * @parent Large
 * @type note
 * @desc Code on how to draw the file data for this style.
 * @default "// Declare Constants\nconst savefileId = arguments[0];\nconst rect = arguments[1];\nconst lineHeight = this.lineHeight();\nconst padding = this.itemPadding();\n\n// Draw File Data\nthis.drawTitle(savefileId, rect.x + padding, rect.y);\nconst x2 = rect.x + rect.width - padding - this.textWidth(TextManager.latestSave);\nthis.drawLatestMarker(savefileId, x2, rect.y);"
 *
 */
//=============================================================================

const _0x2baa=['isEventTest','Enable','onBeforeSave','updatePosition','3914fJIVAb','setFadeSpeed','209SOXrdw','saveMenuSvBattlerWidth','VertContentsJS','getColorDataFromPluginParameters','ceil','isAutosaveCompatible','_saveConfirmWindow','loadSvActor','battle','current','initialize','1014923ufrrQJ','createGameObjects','EjPsd','update','Ziipl','both','VertCols','dimColor1','autosaveType','maxCols','large','_success','length','drawVerticalStyleContents','goto','openness','commandContinue','gameId','partyMemberName','dimColor2','makeData','Scene_Save_onSaveFailure','drawSvBattlerSprites','autosaveEnabled','trim','AutosaveForce','indexToSavefileId','drawLargeStyleFileData','MakeSavefileInfoJS','FUNC','AfterMenuCall','drawActorFaces','terminate','1579ysvHNa','Settings','RgwYr','VZnlU','globalVariables','#%1','createSaveConfirmationWindow','actorStyle','saveDescription','callMenu','1407245elMtwT','loadFailureConfirmationWindow','BoxContentsJS','inBattle','contentsBack','isBattleTest','onSaveCoreSaveFailure','rTLBU','process_VisuMZ_SaveCore_Switches_Variables','OnAutosaveFailureJS','odcZJ','onDatabaseLoaded','821928DcwUZV','close','DataManager_createGameObjects','uwAqG','drawListStyleFileData','drawContentsLoaded','onLoadSuccess','FRwMV','create','contents','AutosaveExecute','VocabLockedSaveSlot','sprite','width','transfer','RemoveSaveCoreCache','Game_System_initialize','fHhpI','savefileIdToIndex','Scene_Title_terminate','timestamp','fadeOut','Game_Variables_setValue','DataManager_makeSavefileInfo','isEnabled','playBuzzer','iLovG','Autosave','setMode','opacity','_saveCorePluginCommandSave','drawFace','Game_Switches_value','_SaveCoreSettings','getFullYear','AddOption','HrKSs','height','LargeCols','autosave','_savefileId','_autosaveConfirmWindow','commandNewGameSaveCoreLocked','AutosaveMaxCount','Ftosf','loadPicture','FilenameFmt','oHujc','getMinutes','SaveStyle','ARRAYFUNC','file0','clear','_stored_latestSavefile','addGeneralOptions','Game_Variables_value','autosaveOption','name','saveFailure','push','reloadMapIfUpdated','autosaveFailure','Scene_Title_initialize','VocabSaveSuccess','Scene_Menu_create','makeSavename','601854ePRSSR','svbattler','then','Scene_Options_maxCommands','Game_Switches_setValue','forageTestKey','locked','return\x200','OnLoadFailureJS','SXjRj','ZsqzH','catch','setSavePicture','_processingAutosave','Default','Scene_Boot_onDatabaseLoaded','_bypassAutosave','tsiPK','max','fileDirectoryPath','isPreviousScene','OnLoadSuccessJS','save','filter','loadGame','drawBoxStyleContents','setWordWrap','popScene','contentsOpacity','autosaveConfirmationWindowRect','Window_SavefileList_setMode','closeSaveConfirmationWindow','BoxRows','LocalMode','shouldAutosave','face','Window_Options_addGeneralOptions','SaveMenu','AutosaveOption','STRUCT','currencyUnit','fadeOutAll','drawLargeStyleContents','status','GlobalSwitches','min','LargeFileDataJS','AfterTransfer','latestSave','onAfterLoad','drawListStyleContents','VrraE','SPNet','includes','drawVerticalStyleFileData','resetFontSettings','open','faces','199XgQTYV','svbattlersForSaveFile','drawDescription','createContents','Scene_Load_onLoadSuccess','GlobalVariables','map','isSaveEnabled','HdxGx','QaZDq','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','openSaveConfirmationWindow','Scene_Save_helpWindowText','maxBattleMembers','getTimestamp','drawCharacter','saveConfirmationWindowRect','closeAutosaveConfirmationWindow','_scene','Scene_Base_requestAutosave','filePath','maxCommands','helpWindowText','OnSaveFailureJS','CcAQU','PlTRY','onLoadFailure','ParseTextCodes','commandSaveLocked','latestSavefileId','LatestColor','changeTextColor','textColor','mainCommandWidth','windowPadding','1174808vHUBLn','STR','applyData','drawPlaytime','onSaveCoreLoadSuccess','selectSavefile','menuStyle','globalValue','VocabAutosaveSuccess','onMapLoaded','_listWindow','AutosaveType','setValue','drawTextEx','blt','SaveCurrentSlot','setGlobalValue','ARRAYJSON','actorName','ListFileDataJS','ARRAYEVAL','KeyFmt','right','Scene_Title_commandContinue','gradientFillRect','textSizeEx','drawBackground','SaveCore','ConfigManager_makeData','switches','Scene_Save_executeSave','Game_System_savefileId','padStart','BoxCols','round','Scene_Map_onTransferEnd','version','ZjTFh','savefileId','forageKey','hGBtc','initSaveCore','_active','commandContinueSaveCoreSingle','prototype','left','addChild','drawBoxStyleFileData','OnSaveSuccessJS','iblNs','lFmEc','process_VisuMZ_SaveCore_Settings','onSaveCoreLoadFailure','drawText','exitMenu','createAutosaveConfirmationWindow','drawSvActor','bnTKl','ehANo','call','Scene_Menu_commandSave','Duration','onSaveSuccess','variables','_colorCache','enableAutosave','saveSuccess','addSaveCoreAutosaveCommand','VertRows','onAutosaveFailure','ListRows','playLoad','drawCurrencyValue','removeChild','VocabSaveFailure','executeSave','parse','makeSavefileInfo','JSON','toUpperCase','characters','_commandWindow','_loadSuccess','replace','constructor','isGlobal','calcWindowHeight','resetWordWrap','ARRAYSTR','Scene_Base_onAutosaveSuccess','savefileInfo','pickLockedSaveSlot','ARRAYSTRUCT','MaxSaveFiles','Save','ListCols','AdjustRect','SaveConfirm','forceAutosave','ConfigManager_applyData','onSaveCoreSaveSuccess','latestSavefile','VisuMZ_1_MessageCore','SvBattlerWidth','exit','playSave','onTransferEnd','loadFailure','advanced','refresh','isSaveConfirmWindowEnabled','activate','gold','ScreenPosition','openAutosaveConfirmationWindow','registerCommand','Scene_Base_onAutosaveFailure','globalSwitches','svActorVertCells','Name','addLoadListener','value','determineAutosaveBypass','saveGame','innerWidth','getSaveDescription','description','requestAutosave','setSavefileId','onAutosaveSuccess','commandNewGame','BoxFileDataJS','format','innerHeight','activateListWindow','Scene_Map_onMapLoaded','SaveDescription','onSaveFailure','commandSave','optAutosave','drawContents','MmTyt','isAutosaveEnabled','qpnFE','AutosaveRequest','drawFileData','drawCenteredPicture','setSaveDescription','number','maxSavefiles','saveStyle','drawActorSprites','ConvertParams','svbattlers','HhzUm','getScreenPosition','drawActors','match','center','dHcyC','single','_fadeSpeed','MAX_BATTLE_MEMBERS','executeAutosave','_pickLockedSaveSlot','box','savePicture','NUM','addSaveCoreCommands','drawTitle','AutosaveConfirm','vertical','saveCurrentSlot','battleMembers','FvGbT','bind','floor','updateFade','svActorHorzCells','KcDTL','SavePicture'];const _0x5dbc13=_0x47db;(function(_0xed703d,_0x9ad3b1){const _0x128f24=_0x47db;while(!![]){try{const _0x52e885=parseInt(_0x128f24(0x1bc))+parseInt(_0x128f24(0xd9))*parseInt(_0x128f24(0x199))+-parseInt(_0x128f24(0xdb))*parseInt(_0x128f24(0x107))+-parseInt(_0x128f24(0x15f))+-parseInt(_0x128f24(0x11d))+-parseInt(_0x128f24(0xe6))+parseInt(_0x128f24(0x111));if(_0x52e885===_0x9ad3b1)break;else _0xed703d['push'](_0xed703d['shift']());}catch(_0x5e2cde){_0xed703d['push'](_0xed703d['shift']());}}}(_0x2baa,0x9095f));var label=_0x5dbc13(0x1d7),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x5dbc13(0x176)](function(_0xbe3a20){const _0x45ef4b=_0x5dbc13;return _0xbe3a20[_0x45ef4b(0x18a)]&&_0xbe3a20['description'][_0x45ef4b(0x194)]('['+label+']');})[0x0];VisuMZ[label][_0x5dbc13(0x108)]=VisuMZ[label]['Settings']||{},VisuMZ[_0x5dbc13(0xb8)]=function(_0x404dfd,_0xc317d5){const _0x1154c4=_0x5dbc13;for(const _0x327973 in _0xc317d5){if(_0x1154c4(0x109)===_0x1154c4(0x109)){if(_0x327973[_0x1154c4(0xbd)](/(.*):(.*)/i)){if('ZjTFh'===_0x1154c4(0x1e1)){const _0x3bea34=String(RegExp['$1']),_0x50f30a=String(RegExp['$2'])[_0x1154c4(0x20b)]()[_0x1154c4(0xfe)]();let _0x570123,_0x331c74,_0x12068e;switch(_0x50f30a){case _0x1154c4(0xc7):_0x570123=_0xc317d5[_0x327973]!==''?Number(_0xc317d5[_0x327973]):0x0;break;case'ARRAYNUM':_0x331c74=_0xc317d5[_0x327973]!==''?JSON[_0x1154c4(0x208)](_0xc317d5[_0x327973]):[],_0x570123=_0x331c74['map'](_0x16f258=>Number(_0x16f258));break;case'EVAL':_0x570123=_0xc317d5[_0x327973]!==''?eval(_0xc317d5[_0x327973]):null;break;case _0x1154c4(0x1d0):_0x331c74=_0xc317d5[_0x327973]!==''?JSON[_0x1154c4(0x208)](_0xc317d5[_0x327973]):[],_0x570123=_0x331c74[_0x1154c4(0x19f)](_0x47b922=>eval(_0x47b922));break;case _0x1154c4(0x20a):_0x570123=_0xc317d5[_0x327973]!==''?JSON[_0x1154c4(0x208)](_0xc317d5[_0x327973]):'';break;case _0x1154c4(0x1cd):_0x331c74=_0xc317d5[_0x327973]!==''?JSON[_0x1154c4(0x208)](_0xc317d5[_0x327973]):[],_0x570123=_0x331c74[_0x1154c4(0x19f)](_0x2b7b69=>JSON['parse'](_0x2b7b69));break;case _0x1154c4(0x103):_0x570123=_0xc317d5[_0x327973]!==''?new Function(JSON[_0x1154c4(0x208)](_0xc317d5[_0x327973])):new Function(_0x1154c4(0x166));break;case _0x1154c4(0x14f):_0x331c74=_0xc317d5[_0x327973]!==''?JSON[_0x1154c4(0x208)](_0xc317d5[_0x327973]):[],_0x570123=_0x331c74[_0x1154c4(0x19f)](_0x4f1aa0=>new Function(JSON[_0x1154c4(0x208)](_0x4f1aa0)));break;case _0x1154c4(0x1bd):_0x570123=_0xc317d5[_0x327973]!==''?String(_0xc317d5[_0x327973]):'';break;case _0x1154c4(0x214):_0x331c74=_0xc317d5[_0x327973]!==''?JSON[_0x1154c4(0x208)](_0xc317d5[_0x327973]):[],_0x570123=_0x331c74[_0x1154c4(0x19f)](_0x301020=>String(_0x301020));break;case _0x1154c4(0x186):_0x12068e=_0xc317d5[_0x327973]!==''?JSON[_0x1154c4(0x208)](_0xc317d5[_0x327973]):{},_0x404dfd[_0x3bea34]={},VisuMZ[_0x1154c4(0xb8)](_0x404dfd[_0x3bea34],_0x12068e);continue;case _0x1154c4(0x218):_0x331c74=_0xc317d5[_0x327973]!==''?JSON[_0x1154c4(0x208)](_0xc317d5[_0x327973]):[],_0x570123=_0x331c74['map'](_0x575da4=>VisuMZ['ConvertParams']({},JSON['parse'](_0x575da4)));break;default:continue;}_0x404dfd[_0x3bea34]=_0x570123;}else _0x391b17[_0x1154c4(0x222)]&&_0x22d9b7[_0x1154c4(0x1e8)]['resetWordWrap'][_0x1154c4(0x1f7)](this);}}else this[_0x1154c4(0x1a8)](_0x40a253[0x0],_0x315867[0x1],_0x4cc876,_0x2b5aac),_0x51af4c+=_0x38e05d;}return _0x404dfd;},(_0x683e8e=>{const _0x4310ea=_0x5dbc13,_0x48eee4=_0x683e8e[_0x4310ea(0x156)];for(const _0x507282 of dependencies){if(!Imported[_0x507282]){alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'[_0x4310ea(0x240)](_0x48eee4,_0x507282)),SceneManager[_0x4310ea(0x224)]();break;}}const _0x8d40d0=_0x683e8e['description'];if(_0x8d40d0['match'](/\[Version[ ](.*?)\]/i)){if(_0x4310ea(0x1b2)!==_0x4310ea(0x1b1)){const _0x25afb8=Number(RegExp['$1']);_0x25afb8!==VisuMZ[label][_0x4310ea(0x1e0)]&&(alert(_0x4310ea(0x1a3)['format'](_0x48eee4,_0x25afb8)),SceneManager[_0x4310ea(0x224)]());}else return _0x259782[_0x4310ea(0x1d9)][_0x5572d4]&&_0x2c0c9a['GlobalSwitches'][_0x4310ea(0x194)](_0x2c6167);}if(_0x8d40d0['match'](/\[Tier[ ](\d+)\]/i)){const _0x5afd81=Number(RegExp['$1']);if(_0x5afd81<tier){if(_0x4310ea(0x168)===_0x4310ea(0x168))alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[_0x4310ea(0x240)](_0x48eee4,_0x5afd81,tier)),SceneManager[_0x4310ea(0x224)]();else return'';}else{if(_0x4310ea(0x137)===_0x4310ea(0x137))tier=Math[_0x4310ea(0x171)](_0x5afd81,tier);else return _0x50e151=_0x288b68(_0x1718bf),this['_colorCache']=this[_0x4310ea(0x1fc)]||{},_0x5d1171['match'](/#(.*)/i)?this[_0x4310ea(0x1fc)][_0x527bbe]=_0x4310ea(0x10c)[_0x4310ea(0x240)](_0x5a48c4(_0x405685['$1'])):this[_0x4310ea(0x1fc)][_0x4f469f]=this['textColor'](_0xcdc135(_0x19b717)),this['_colorCache'][_0x26b08c];}}VisuMZ['ConvertParams'](VisuMZ[label][_0x4310ea(0x108)],_0x683e8e['parameters']);})(pluginData),PluginManager[_0x5dbc13(0x22f)](pluginData[_0x5dbc13(0x156)],'AutosaveEnable',_0xccaf9=>{const _0x10f54c=_0x5dbc13;if(!DataManager[_0x10f54c(0xe0)]())return;VisuMZ['ConvertParams'](_0xccaf9,_0xccaf9);if($gameSystem)$gameSystem['enableAutosave'](_0xccaf9[_0x10f54c(0xd6)]);}),PluginManager[_0x5dbc13(0x22f)](pluginData[_0x5dbc13(0x156)],_0x5dbc13(0x24c),_0x134df2=>{const _0x1ddc60=_0x5dbc13;if(!DataManager[_0x1ddc60(0xe0)]()||$gameParty[_0x1ddc60(0x114)]())return;SceneManager[_0x1ddc60(0x1ab)][_0x1ddc60(0x23b)]();}),PluginManager[_0x5dbc13(0x22f)](pluginData[_0x5dbc13(0x156)],_0x5dbc13(0x127),_0x42f806=>{const _0x347516=_0x5dbc13;if(!DataManager[_0x347516(0xe0)]()||$gameParty[_0x347516(0x114)]())return;SceneManager['_scene'][_0x347516(0xc3)]();}),PluginManager[_0x5dbc13(0x22f)](pluginData[_0x5dbc13(0x156)],_0x5dbc13(0xff),_0x3620f9=>{const _0x4097a4=_0x5dbc13;if(!DataManager[_0x4097a4(0xe0)]()||$gameParty[_0x4097a4(0x114)]())return;SceneManager[_0x4097a4(0x1ab)]['forceAutosave']();}),PluginManager[_0x5dbc13(0x22f)](pluginData[_0x5dbc13(0x156)],_0x5dbc13(0x1cb),_0x576a13=>{const _0x5c1eaf=_0x5dbc13;SceneManager[_0x5c1eaf(0x1ab)][_0x5c1eaf(0xcc)]();}),PluginManager[_0x5dbc13(0x22f)](pluginData['name'],_0x5dbc13(0x244),_0x382e0d=>{const _0x48d874=_0x5dbc13;VisuMZ[_0x48d874(0xb8)](_0x382e0d,_0x382e0d);if($gameSystem)$gameSystem[_0x48d874(0x24f)](_0x382e0d['Text']);}),PluginManager[_0x5dbc13(0x22f)](pluginData[_0x5dbc13(0x156)],_0x5dbc13(0xd4),_0x4683a0=>{const _0xe56dc0=_0x5dbc13;VisuMZ[_0xe56dc0(0xb8)](_0x4683a0,_0x4683a0);if($gameSystem)$gameSystem[_0xe56dc0(0x16b)](_0x4683a0['Filename']);}),VisuMZ[_0x5dbc13(0x1d7)][_0x5dbc13(0x16e)]=Scene_Boot[_0x5dbc13(0x1e8)][_0x5dbc13(0x11c)],Scene_Boot[_0x5dbc13(0x1e8)][_0x5dbc13(0x11c)]=function(){const _0x279e06=_0x5dbc13;VisuMZ[_0x279e06(0x1d7)]['Scene_Boot_onDatabaseLoaded']['call'](this),this[_0x279e06(0x1ef)](),this[_0x279e06(0x119)]();},Scene_Boot[_0x5dbc13(0x1e8)][_0x5dbc13(0x1ef)]=function(){const _0x58cdfe=_0x5dbc13;StorageManager[_0x58cdfe(0xb6)]()===_0x58cdfe(0xc0)&&('VrraE'===_0x58cdfe(0x192)?$dataSystem[_0x58cdfe(0x247)]=!![]:_0x48e47d>0x0&&_0x1a43b6<_0x253d1f[_0x58cdfe(0x1d9)][_0x58cdfe(0xf2)]&&(_0x234bc5[_0x58cdfe(0x231)]=_0x1cca4a[_0x58cdfe(0x231)]||[],_0x771e46[_0x58cdfe(0x231)][_0x1148cd]=_0x4447f8,_0x56975b[_0x58cdfe(0x175)]()));},VisuMZ[_0x5dbc13(0x18b)]=[],VisuMZ[_0x5dbc13(0x19e)]=[],Scene_Boot['prototype'][_0x5dbc13(0x119)]=function(){const _0x29cad7=_0x5dbc13;for(let _0xac834d=0x1;_0xac834d<$dataSystem[_0x29cad7(0x1d9)]['length'];_0xac834d++){if($dataSystem[_0x29cad7(0x1d9)][_0xac834d][_0x29cad7(0xbd)](/<GLOBAL>/i))VisuMZ[_0x29cad7(0x18b)][_0x29cad7(0x158)](_0xac834d);}for(let _0x507359=0x1;_0x507359<$dataSystem[_0x29cad7(0x1fb)][_0x29cad7(0xf2)];_0x507359++){if($dataSystem[_0x29cad7(0x1fb)][_0x507359]['match'](/<GLOBAL>/i))VisuMZ[_0x29cad7(0x19e)][_0x29cad7(0x158)](_0x507359);}},VisuMZ['SaveCore'][_0x5dbc13(0x11f)]=DataManager[_0x5dbc13(0xe7)],DataManager[_0x5dbc13(0xe7)]=function(){const _0x3a5f5c=_0x5dbc13;VisuMZ[_0x3a5f5c(0x1d7)][_0x3a5f5c(0x11f)][_0x3a5f5c(0x1f7)](this),Scene_File[_0x3a5f5c(0xc2)]=$gameParty[_0x3a5f5c(0x1a6)]();},DataManager[_0x5dbc13(0xe0)]=function(){const _0xc8840b=_0x5dbc13;return!DataManager[_0xc8840b(0x116)]()&&!DataManager['isEventTest']()&&$dataSystem['optAutosave'];},DataManager[_0x5dbc13(0x251)]=function(){const _0xbb3ed6=_0x5dbc13;if(StorageManager[_0xbb3ed6(0xb6)]()===_0xbb3ed6(0xc0))return 0x1;let _0x37a1de=VisuMZ['SaveCore'][_0xbb3ed6(0x108)][_0xbb3ed6(0x21a)][_0xbb3ed6(0x148)]?0x0:0x1;return VisuMZ['SaveCore'][_0xbb3ed6(0x108)]['Save'][_0xbb3ed6(0x219)]+_0x37a1de;},DataManager[_0x5dbc13(0x15e)]=function(_0x48209f){const _0x595ced=_0x5dbc13,_0x1aee9f=VisuMZ[_0x595ced(0x1d7)][_0x595ced(0x108)][_0x595ced(0x21a)][_0x595ced(0x14b)];return _0x1aee9f[_0x595ced(0x240)](_0x48209f);},VisuMZ['SaveCore'][_0x5dbc13(0x134)]=DataManager[_0x5dbc13(0x209)],DataManager[_0x5dbc13(0x209)]=function(){const _0x21eaaa=_0x5dbc13,_0x169ceb=VisuMZ[_0x21eaaa(0x1d7)]['DataManager_makeSavefileInfo'][_0x21eaaa(0x1f7)](this);return VisuMZ[_0x21eaaa(0x1d7)][_0x21eaaa(0x108)][_0x21eaaa(0x184)][_0x21eaaa(0x102)][_0x21eaaa(0x1f7)](this,_0x169ceb);},ConfigManager[_0x5dbc13(0x144)]=VisuMZ[_0x5dbc13(0x1d7)][_0x5dbc13(0x108)][_0x5dbc13(0x185)][_0x5dbc13(0x16d)],ConfigManager[_0x5dbc13(0x231)]=[],ConfigManager[_0x5dbc13(0x10b)]=[],VisuMZ[_0x5dbc13(0x1d7)][_0x5dbc13(0x1d8)]=ConfigManager['makeData'],ConfigManager[_0x5dbc13(0xfa)]=function(){const _0x3bd7e2=_0x5dbc13,_0x19a718=VisuMZ['SaveCore'][_0x3bd7e2(0x1d8)][_0x3bd7e2(0x1f7)](this);return _0x19a718[_0x3bd7e2(0x144)]=this[_0x3bd7e2(0x144)]||VisuMZ[_0x3bd7e2(0x1d7)]['Settings']['AutosaveOption'][_0x3bd7e2(0x16d)],_0x19a718['globalSwitches']=this['globalSwitches']||[],_0x19a718['globalVariables']=this[_0x3bd7e2(0x10b)]||[],_0x19a718;},VisuMZ[_0x5dbc13(0x1d7)]['ConfigManager_applyData']=ConfigManager[_0x5dbc13(0x1be)],ConfigManager['applyData']=function(_0x252bce){const _0x2f55e2=_0x5dbc13;VisuMZ[_0x2f55e2(0x1d7)][_0x2f55e2(0x21f)][_0x2f55e2(0x1f7)](this,_0x252bce),this[_0x2f55e2(0x144)]=_0x252bce['autosave']!==undefined?_0x252bce[_0x2f55e2(0x144)]:VisuMZ[_0x2f55e2(0x1d7)][_0x2f55e2(0x108)][_0x2f55e2(0x185)][_0x2f55e2(0x16d)],this[_0x2f55e2(0x231)]=_0x252bce[_0x2f55e2(0x231)]||[],this['globalVariables']=_0x252bce[_0x2f55e2(0x10b)]||[];},StorageManager['isLocalMode']=function(){const _0x585e07=_0x5dbc13;return Utils['isNwjs']()?VisuMZ[_0x585e07(0x1d7)]['Settings'][_0x585e07(0x21a)][_0x585e07(0x180)]:![];},StorageManager[_0x5dbc13(0x1ad)]=function(_0x17dc55){const _0x407b69=_0x5dbc13,_0x42908f=this[_0x407b69(0x172)](),_0x37f822=VisuMZ[_0x407b69(0x1d7)][_0x407b69(0x108)][_0x407b69(0x21a)]['ExtensionFmt'];return _0x42908f+_0x37f822[_0x407b69(0x240)](_0x17dc55);},StorageManager[_0x5dbc13(0x1e3)]=function(_0x2757c1){const _0x1fee3d=_0x5dbc13,_0x3190eb=$dataSystem[_0x1fee3d(0x228)][_0x1fee3d(0xf7)],_0x468406=VisuMZ['SaveCore'][_0x1fee3d(0x108)][_0x1fee3d(0x21a)][_0x1fee3d(0x1d1)];return _0x468406[_0x1fee3d(0x240)](_0x3190eb,_0x2757c1);},StorageManager[_0x5dbc13(0x164)]=function(){const _0x29a28c=_0x5dbc13;return VisuMZ[_0x29a28c(0x1d7)][_0x29a28c(0x108)][_0x29a28c(0x21a)]['TestKey'];},StorageManager[_0x5dbc13(0xb6)]=function(){const _0x4d9a8b=_0x5dbc13;return VisuMZ[_0x4d9a8b(0x1d7)]['Settings'][_0x4d9a8b(0x21a)][_0x4d9a8b(0x14e)];},StorageManager[_0x5dbc13(0xee)]=function(){const _0x1e9ce9=_0x5dbc13;return this['saveStyle']()===_0x1e9ce9(0xc0)?_0x1e9ce9(0x150):VisuMZ[_0x1e9ce9(0x1d7)][_0x1e9ce9(0x108)][_0x1e9ce9(0x138)][_0x1e9ce9(0x1c7)];},TextManager['pickLockedSaveSlot']=VisuMZ[_0x5dbc13(0x1d7)][_0x5dbc13(0x108)][_0x5dbc13(0x21a)][_0x5dbc13(0x128)],TextManager[_0x5dbc13(0x1fe)]=VisuMZ[_0x5dbc13(0x1d7)][_0x5dbc13(0x108)][_0x5dbc13(0x21d)][_0x5dbc13(0x15c)],TextManager[_0x5dbc13(0x157)]=VisuMZ[_0x5dbc13(0x1d7)]['Settings'][_0x5dbc13(0x21d)][_0x5dbc13(0x206)],TextManager[_0x5dbc13(0x227)]=VisuMZ[_0x5dbc13(0x1d7)][_0x5dbc13(0x108)]['SaveConfirm']['VocabLoadFailure'],TextManager[_0x5dbc13(0x155)]=VisuMZ['SaveCore'][_0x5dbc13(0x108)]['AutosaveOption'][_0x5dbc13(0x233)],TextManager['autosaveSuccess']=VisuMZ[_0x5dbc13(0x1d7)][_0x5dbc13(0x108)]['AutosaveConfirm'][_0x5dbc13(0x1c4)],TextManager[_0x5dbc13(0x15a)]=VisuMZ[_0x5dbc13(0x1d7)][_0x5dbc13(0x108)][_0x5dbc13(0xca)]['VocabAutosaveFailure'],TextManager[_0x5dbc13(0x18f)]=VisuMZ[_0x5dbc13(0x1d7)][_0x5dbc13(0x108)][_0x5dbc13(0x184)]['LatestText'],ColorManager[_0x5dbc13(0x221)]=function(){const _0x49518e=_0x5dbc13,_0x5e1be6=_0x49518e(0x152);this[_0x49518e(0x1fc)]=this[_0x49518e(0x1fc)]||{};if(this[_0x49518e(0x1fc)][_0x5e1be6])return this[_0x49518e(0x1fc)][_0x5e1be6];const _0x25b246=VisuMZ[_0x49518e(0x1d7)][_0x49518e(0x108)]['SaveMenu'][_0x49518e(0x1b7)];return this[_0x49518e(0xde)](_0x5e1be6,_0x25b246);},ColorManager['getColorDataFromPluginParameters']=function(_0x19e228,_0x368673){const _0x10882e=_0x5dbc13;_0x368673=String(_0x368673),this[_0x10882e(0x1fc)]=this[_0x10882e(0x1fc)]||{};if(_0x368673['match'](/#(.*)/i)){if(_0x10882e(0xbf)===_0x10882e(0xbf))this[_0x10882e(0x1fc)][_0x19e228]=_0x10882e(0x10c)[_0x10882e(0x240)](String(RegExp['$1']));else{if(_0x48f473[_0x10882e(0x23a)]){const _0x338565=this['textSizeEx'](_0x4d9b6f[_0x10882e(0x23a)])[_0x10882e(0x12a)];_0x5ecef1=_0x3739ea||_0x10882e(0x1e9);if(_0x3654ee===_0x10882e(0x1d2))_0x5e6701=_0x2090a6+_0x193fd6-_0x338565;else _0x3280b9===_0x10882e(0xbe)&&(_0x25f98b=_0x5db5d5+(_0x591be8-_0x338565)/0x2);this['drawTextEx'](_0x26b96d['description'],_0x1dd212,_0x5793fc,_0x3485b1);}}}else _0x10882e(0x1ed)===_0x10882e(0x1ed)?this[_0x10882e(0x1fc)][_0x19e228]=this[_0x10882e(0x1b9)](Number(_0x368673)):this[_0x10882e(0xda)](-0x10);return this[_0x10882e(0x1fc)][_0x19e228];},VisuMZ[_0x5dbc13(0x1d7)][_0x5dbc13(0x12d)]=Game_System[_0x5dbc13(0x1e8)][_0x5dbc13(0xe5)],Game_System[_0x5dbc13(0x1e8)][_0x5dbc13(0xe5)]=function(){const _0x1d5fca=_0x5dbc13;VisuMZ[_0x1d5fca(0x1d7)]['Game_System_initialize'][_0x1d5fca(0x1f7)](this),this[_0x1d5fca(0x1e5)]();},Game_System[_0x5dbc13(0x1e8)][_0x5dbc13(0x1e5)]=function(){const _0x1be094=_0x5dbc13;this['_SaveCoreSettings']={'autosaveEnabled':VisuMZ[_0x1be094(0x1d7)][_0x1be094(0x108)][_0x1be094(0x138)]['StartEnabled'],'saveDescription':'','savePicture':''};},Game_System[_0x5dbc13(0x1e8)][_0x5dbc13(0x24a)]=function(){const _0xe9aa5e=_0x5dbc13;if(!$dataSystem[_0xe9aa5e(0x247)])return![];if(this[_0xe9aa5e(0x13e)]===undefined)this[_0xe9aa5e(0x1e5)]();if(this[_0xe9aa5e(0x13e)][_0xe9aa5e(0xfd)]===undefined)this[_0xe9aa5e(0x1e5)]();return this[_0xe9aa5e(0x13e)][_0xe9aa5e(0xfd)];},Game_System[_0x5dbc13(0x1e8)][_0x5dbc13(0x1fd)]=function(_0x5ea164){const _0x46be6a=_0x5dbc13;if(!$dataSystem['optAutosave'])return;if(this[_0x46be6a(0x13e)]===undefined)this[_0x46be6a(0x1e5)]();if(this[_0x46be6a(0x13e)][_0x46be6a(0xfd)]===undefined)this[_0x46be6a(0x1e5)]();this[_0x46be6a(0x13e)][_0x46be6a(0xfd)]=_0x5ea164;},Game_System['prototype'][_0x5dbc13(0x239)]=function(){const _0x28b10a=_0x5dbc13;if(this[_0x28b10a(0x13e)]===undefined)this['initSaveCore']();if(this[_0x28b10a(0x13e)][_0x28b10a(0x10f)]===undefined)this[_0x28b10a(0x1e5)]();return this['_SaveCoreSettings'][_0x28b10a(0x10f)];},Game_System[_0x5dbc13(0x1e8)][_0x5dbc13(0x24f)]=function(_0x47ff42){const _0x772998=_0x5dbc13;if(this['_SaveCoreSettings']===undefined)this[_0x772998(0x1e5)]();if(this[_0x772998(0x13e)]['saveDescription']===undefined)this[_0x772998(0x1e5)]();this[_0x772998(0x13e)][_0x772998(0x10f)]=VisuMZ[_0x772998(0x1d7)][_0x772998(0x1b4)](_0x47ff42);},VisuMZ[_0x5dbc13(0x1d7)][_0x5dbc13(0x1b4)]=function(_0x37556b){const _0x11a8d6=_0x5dbc13;while(_0x37556b[_0x11a8d6(0xbd)](/\\V\[(\d+)\]/gi)){if('WzVFW'==='WzVFW')_0x37556b=_0x37556b['replace'](/\\V\[(\d+)\]/gi,(_0x5a19b0,_0x17c49b)=>$gameVariables['value'](parseInt(_0x17c49b)));else{if(_0x330504[_0x11a8d6(0x1d9)][_0x1857f7][_0x11a8d6(0xbd)](/<GLOBAL>/i))_0x509e7d[_0x11a8d6(0x18b)][_0x11a8d6(0x158)](_0x4e084b);}}while(_0x37556b[_0x11a8d6(0xbd)](/\\N\[(\d+)\]/gi)){_0x37556b=_0x37556b[_0x11a8d6(0x20f)](/\\N\[(\d+)\]/gi,(_0xb9a6c4,_0x313b33)=>Window_Base[_0x11a8d6(0x1e8)][_0x11a8d6(0x1ce)](parseInt(_0x313b33)));}while(_0x37556b['match'](/\\P\[(\d+)\]/gi)){if(_0x11a8d6(0x124)!=='FRwMV'){if(this[_0x11a8d6(0xe1)])this[_0x11a8d6(0xe1)]['close']();}else _0x37556b=_0x37556b['replace'](/\\P\[(\d+)\]/gi,(_0x1196ba,_0x33bcbb)=>Window_Base[_0x11a8d6(0x1e8)][_0x11a8d6(0xf8)](parseInt(_0x33bcbb)));}return _0x37556b;},Game_System[_0x5dbc13(0x1e8)]['getSavePicture']=function(){const _0x4f6572=_0x5dbc13;if(this['_SaveCoreSettings']===undefined)this['initSaveCore']();if(this['_SaveCoreSettings'][_0x4f6572(0xc6)]===undefined)this['initSaveCore']();return this[_0x4f6572(0x13e)][_0x4f6572(0xc6)];},Game_System[_0x5dbc13(0x1e8)][_0x5dbc13(0x16b)]=function(_0x4a71ff){const _0x180d42=_0x5dbc13;if(this['_SaveCoreSettings']===undefined)this[_0x180d42(0x1e5)]();if(this[_0x180d42(0x13e)][_0x180d42(0xc6)]===undefined)this[_0x180d42(0x1e5)]();this[_0x180d42(0x13e)]['savePicture']=_0x4a71ff;},VisuMZ[_0x5dbc13(0x1d7)][_0x5dbc13(0x1db)]=Game_System[_0x5dbc13(0x1e8)][_0x5dbc13(0x1e2)],Game_System[_0x5dbc13(0x1e8)]['savefileId']=function(){const _0x551b5a=_0x5dbc13,_0x131854=StorageManager[_0x551b5a(0xb6)]();switch(_0x131854){case _0x551b5a(0x165):return VisuMZ[_0x551b5a(0x1d7)][_0x551b5a(0x1db)]['call'](this)||0x1;break;case _0x551b5a(0xc0):return 0x0;break;default:return VisuMZ[_0x551b5a(0x1d7)][_0x551b5a(0x1db)]['call'](this);break;}},Game_Switches[_0x5dbc13(0x1e8)][_0x5dbc13(0x211)]=function(_0xe8a8e9){const _0x59571a=_0x5dbc13;return $dataSystem[_0x59571a(0x1d9)][_0xe8a8e9]&&VisuMZ['GlobalSwitches'][_0x59571a(0x194)](_0xe8a8e9);},VisuMZ[_0x5dbc13(0x1d7)][_0x5dbc13(0x13d)]=Game_Switches['prototype'][_0x5dbc13(0x235)],Game_Switches['prototype']['value']=function(_0x58be9b){const _0x3075b8=_0x5dbc13;if(this['isGlobal'](_0x58be9b))return this[_0x3075b8(0x1c3)](_0x58be9b);else{if(_0x3075b8(0xba)!=='oZxPo')return VisuMZ[_0x3075b8(0x1d7)][_0x3075b8(0x13d)][_0x3075b8(0x1f7)](this,_0x58be9b);else _0x9fadc7[_0x3075b8(0x1d7)][_0x3075b8(0x12d)]['call'](this),this[_0x3075b8(0x1e5)]();}},Game_Switches[_0x5dbc13(0x1e8)][_0x5dbc13(0x1c3)]=function(_0x186921){const _0x22e85d=_0x5dbc13;return ConfigManager[_0x22e85d(0x231)]=ConfigManager[_0x22e85d(0x231)]||[],!!ConfigManager['globalSwitches'][_0x186921];},VisuMZ[_0x5dbc13(0x1d7)][_0x5dbc13(0x163)]=Game_Switches[_0x5dbc13(0x1e8)][_0x5dbc13(0x1c8)],Game_Switches[_0x5dbc13(0x1e8)][_0x5dbc13(0x1c8)]=function(_0x42b83a,_0x1e8d75){const _0x25cf02=_0x5dbc13;if(this['isGlobal'](_0x42b83a))this[_0x25cf02(0x1cc)](_0x42b83a,_0x1e8d75);VisuMZ[_0x25cf02(0x1d7)][_0x25cf02(0x163)][_0x25cf02(0x1f7)](this,_0x42b83a,_0x1e8d75);},Game_Switches['prototype'][_0x5dbc13(0x1cc)]=function(_0x55b634,_0x3cdfba){const _0x24dd7b=_0x5dbc13;_0x55b634>0x0&&_0x55b634<$dataSystem['switches']['length']&&(ConfigManager[_0x24dd7b(0x231)]=ConfigManager[_0x24dd7b(0x231)]||[],ConfigManager[_0x24dd7b(0x231)][_0x55b634]=_0x3cdfba,ConfigManager['save']());},Game_Variables[_0x5dbc13(0x1e8)][_0x5dbc13(0x211)]=function(_0xc1f66e){const _0x376554=_0x5dbc13;return $dataSystem[_0x376554(0x1fb)][_0xc1f66e]&&VisuMZ['GlobalVariables'][_0x376554(0x194)](_0xc1f66e);},VisuMZ[_0x5dbc13(0x1d7)]['Game_Variables_value']=Game_Variables[_0x5dbc13(0x1e8)][_0x5dbc13(0x235)],Game_Variables['prototype'][_0x5dbc13(0x235)]=function(_0x65fe37){const _0x224617=_0x5dbc13;return this[_0x224617(0x211)](_0x65fe37)?this[_0x224617(0x1c3)](_0x65fe37):VisuMZ['SaveCore'][_0x224617(0x154)][_0x224617(0x1f7)](this,_0x65fe37);},Game_Variables[_0x5dbc13(0x1e8)][_0x5dbc13(0x1c3)]=function(_0x1614ca){const _0x519eb9=_0x5dbc13;return ConfigManager[_0x519eb9(0x10b)]=ConfigManager[_0x519eb9(0x10b)]||[],ConfigManager['globalVariables'][_0x1614ca]===undefined&&(ConfigManager[_0x519eb9(0x10b)][_0x1614ca]=0x0),ConfigManager['globalVariables'][_0x1614ca];},VisuMZ[_0x5dbc13(0x1d7)]['Game_Variables_setValue']=Game_Variables[_0x5dbc13(0x1e8)]['setValue'],Game_Variables[_0x5dbc13(0x1e8)]['setValue']=function(_0xc93b34,_0x5be255){const _0x2e9369=_0x5dbc13;if(this[_0x2e9369(0x211)](_0xc93b34))this[_0x2e9369(0x1cc)](_0xc93b34,_0x5be255);VisuMZ[_0x2e9369(0x1d7)][_0x2e9369(0x133)]['call'](this,_0xc93b34,_0x5be255);},Game_Variables[_0x5dbc13(0x1e8)][_0x5dbc13(0x1cc)]=function(_0x27cd9c,_0x3c698b){const _0x30543d=_0x5dbc13;if(_0x27cd9c>0x0&&_0x27cd9c<$dataSystem[_0x30543d(0x1fb)]['length']){if(_0x30543d(0x249)!==_0x30543d(0x249))_0x8147a0[_0x30543d(0x1d7)]['Scene_Menu_create'][_0x30543d(0x1f7)](this),_0x4a3b09[_0x30543d(0x173)](_0x4a8a26)&&(this['determineAutosaveBypass']('callMenu'),this[_0x30543d(0x23b)]());else{ConfigManager[_0x30543d(0x10b)]=ConfigManager[_0x30543d(0x10b)]||[];if(typeof _0x3c698b===_0x30543d(0x250))_0x3c698b=Math[_0x30543d(0xd0)](_0x3c698b);ConfigManager[_0x30543d(0x10b)][_0x27cd9c]=_0x3c698b,ConfigManager['save']();}}},Game_Party[_0x5dbc13(0x1e8)][_0x5dbc13(0x19a)]=function(){const _0x56e248=_0x5dbc13;return this[_0x56e248(0xcd)]()['map'](_0x2c5e3c=>_0x2c5e3c['battlerName']());},Scene_Base[_0x5dbc13(0x1e8)][_0x5dbc13(0x236)]=function(_0x4b6f3f){const _0x4ba04f=_0x5dbc13,_0x44cb51=VisuMZ[_0x4ba04f(0x1d7)]['Settings']['Autosave'];switch(_0x4b6f3f){case'battle':this['_bypassAutosave']=!_0x44cb51['AfterBattle'];break;case _0x4ba04f(0x12b):if(!this['shouldAutosave']())return;this[_0x4ba04f(0x16f)]=!_0x44cb51[_0x4ba04f(0x18e)];break;case'callMenu':this[_0x4ba04f(0x16f)]=!_0x44cb51[_0x4ba04f(0x104)];break;case _0x4ba04f(0x1f2):this[_0x4ba04f(0x16f)]=!_0x44cb51['AfterExitMenu'];break;}},VisuMZ[_0x5dbc13(0x1d7)][_0x5dbc13(0x1ac)]=Scene_Base[_0x5dbc13(0x1e8)][_0x5dbc13(0x23b)],Scene_Base['prototype'][_0x5dbc13(0x23b)]=function(){const _0x426177=_0x5dbc13;!this[_0x426177(0x16f)]&&(_0x426177(0xea)===_0x426177(0x14c)?(_0xf3d766[_0x426177(0x1d7)][_0x426177(0x11f)][_0x426177(0x1f7)](this),_0x5bdf47[_0x426177(0xc2)]=_0x1cee5c[_0x426177(0x1a6)]()):VisuMZ[_0x426177(0x1d7)][_0x426177(0x1ac)]['call'](this)),this['_bypassAutosave']=![];},Scene_Base[_0x5dbc13(0x1e8)][_0x5dbc13(0x24a)]=function(){const _0x426e8f=_0x5dbc13;return!DataManager[_0x426e8f(0x116)]()&&!DataManager[_0x426e8f(0xd5)]()&&$gameSystem[_0x426e8f(0x24a)]()&&(VisuMZ[_0x426e8f(0x1d7)][_0x426e8f(0x108)][_0x426e8f(0x138)]['RequestsRequireSaveEnable']?$gameSystem[_0x426e8f(0x1a0)]():!![]);},Scene_Base[_0x5dbc13(0x1e8)][_0x5dbc13(0xc3)]=function(){const _0x3fee49=_0x5dbc13;if(!ConfigManager[_0x3fee49(0x144)])return;this[_0x3fee49(0x21e)]();},Scene_Base[_0x5dbc13(0x1e8)][_0x5dbc13(0x21e)]=function(){const _0xc285f5=_0x5dbc13;$gameSystem[_0xc285f5(0xd7)](),this[_0xc285f5(0x16c)]=![];const _0x452817=StorageManager[_0xc285f5(0xee)]();if([_0xc285f5(0x150),'both'][_0xc285f5(0x194)](_0x452817)){if(_0xc285f5(0x170)!=='tsiPK'){const _0x47e15a=_0x3a7806[_0xc285f5(0x1e2)]();_0x47e15a>0x0&&_0x500618['saveGame'](_0x47e15a)['then'](()=>this[_0xc285f5(0x23d)]())[_0xc285f5(0x16a)](()=>this[_0xc285f5(0x201)]());}else DataManager[_0xc285f5(0x237)](0x0)[_0xc285f5(0x161)](()=>this['onAutosaveSuccess']())[_0xc285f5(0x16a)](()=>this[_0xc285f5(0x201)]());}if([_0xc285f5(0xe4),_0xc285f5(0xeb)]['includes'](_0x452817)){if(_0xc285f5(0xe8)===_0xc285f5(0xe8)){const _0x2549b5=$gameSystem[_0xc285f5(0x1e2)]();_0x2549b5>0x0&&DataManager['saveGame'](_0x2549b5)[_0xc285f5(0x161)](()=>this[_0xc285f5(0x23d)]())[_0xc285f5(0x16a)](()=>this[_0xc285f5(0x201)]());}else return _0x225544[_0xc285f5(0x222)]?_0x3674c3[_0xc285f5(0x1e8)]['setWordWrap'][_0xc285f5(0x1f7)](this,_0x334c11):'';}this['_processingAutosave']=![];},VisuMZ['SaveCore'][_0x5dbc13(0x215)]=Scene_Base[_0x5dbc13(0x1e8)][_0x5dbc13(0x23d)],Scene_Base[_0x5dbc13(0x1e8)][_0x5dbc13(0x23d)]=function(){const _0x52af69=_0x5dbc13;if(this[_0x52af69(0x16c)])return;VisuMZ['SaveCore'][_0x52af69(0x215)][_0x52af69(0x1f7)](this),VisuMZ[_0x52af69(0x1d7)][_0x52af69(0x108)][_0x52af69(0x138)]['OnAutosaveSuccessJS'][_0x52af69(0x1f7)](this),this['openAutosaveConfirmationWindow'](!![]),this[_0x52af69(0x16c)]=!![];},VisuMZ[_0x5dbc13(0x1d7)][_0x5dbc13(0x230)]=Scene_Base['prototype'][_0x5dbc13(0x201)],Scene_Base[_0x5dbc13(0x1e8)][_0x5dbc13(0x201)]=function(){const _0x742691=_0x5dbc13;if(this['_processingAutosave'])return;VisuMZ['SaveCore'][_0x742691(0x230)][_0x742691(0x1f7)](this),VisuMZ[_0x742691(0x1d7)][_0x742691(0x108)]['Autosave'][_0x742691(0x11a)][_0x742691(0x1f7)](this),this[_0x742691(0x22e)](![]);},Scene_Base['prototype'][_0x5dbc13(0x10d)]=function(){const _0x5c2c05=_0x5dbc13;if(this[_0x5c2c05(0xe1)])return;const _0x45d5ee=this[_0x5c2c05(0x1a9)]();this[_0x5c2c05(0xe1)]=new Window_Base(_0x45d5ee),this[_0x5c2c05(0xe1)][_0x5c2c05(0xf5)]=0x0;},Scene_Base['prototype']['saveConfirmationWindowRect']=function(){const _0x27fc5b=_0x5dbc13;return VisuMZ['SaveCore'][_0x27fc5b(0x108)]['SaveConfirm']['ConfirmRect']['call'](this);},Scene_Base['prototype'][_0x5dbc13(0x22a)]=function(){const _0x330f6f=_0x5dbc13;return VisuMZ[_0x330f6f(0x1d7)]['Settings']['SaveConfirm']['Enable'];},Scene_Base['prototype'][_0x5dbc13(0x1a4)]=function(_0x274147,_0x29d3e2){const _0x218e37=_0x5dbc13;if(!this[_0x218e37(0x22a)]())return this[_0x218e37(0x17e)](_0x274147);if(!this[_0x218e37(0xe1)])this[_0x218e37(0x10d)]();const _0x360a09=this[_0x218e37(0xe1)];this[_0x218e37(0x205)](_0x360a09),this['addChild'](_0x360a09),_0x360a09[_0x218e37(0x197)](),_0x360a09['resetFontSettings'](),_0x360a09[_0x218e37(0x126)][_0x218e37(0x151)]();let _0x1e9ea0='';_0x29d3e2?_0x1e9ea0=TextManager['loadFailure']:'UzKKk'==='UzKKk'?_0x1e9ea0=_0x274147?TextManager[_0x218e37(0x1fe)]:TextManager[_0x218e37(0x157)]:_0x4f901f['SaveCore'][_0x218e37(0x108)][_0x218e37(0x185)][_0x218e37(0x140)]&&this['addSaveCoreAutosaveCommand']();const _0x5d4e1c=_0x360a09[_0x218e37(0x1d5)](_0x1e9ea0)[_0x218e37(0x12a)],_0x1f18d0=(_0x360a09['innerWidth']-_0x5d4e1c)/0x2;_0x360a09[_0x218e37(0x1c9)](_0x1e9ea0,_0x1f18d0,0x0,_0x5d4e1c);const _0x438b24=VisuMZ[_0x218e37(0x1d7)][_0x218e37(0x108)][_0x218e37(0x21d)][_0x218e37(0x1f9)];setTimeout(this[_0x218e37(0x17e)]['bind'](this,_0x274147),_0x438b24);},Scene_Base['prototype'][_0x5dbc13(0x112)]=function(){const _0x526423=_0x5dbc13;this[_0x526423(0x1a4)](![],!![]);},Scene_Base['prototype'][_0x5dbc13(0x17e)]=function(_0x23c9ba){const _0x39699e=_0x5dbc13;if(this[_0x39699e(0xe1)])this[_0x39699e(0xe1)][_0x39699e(0x11e)]();},Scene_Base[_0x5dbc13(0x1e8)][_0x5dbc13(0x1f3)]=function(){const _0x16456f=_0x5dbc13;if(this[_0x16456f(0x146)])return;const _0x2d4d5f=this[_0x16456f(0x17c)]();this[_0x16456f(0x146)]=new Window_AutosaveConfirm(_0x2d4d5f);},Scene_Base[_0x5dbc13(0x1e8)]['autosaveConfirmationWindowRect']=function(){const _0x3d7389=_0x5dbc13,_0x426af1=this['mainCommandWidth'](),_0x402c40=this[_0x3d7389(0x212)](0x1,![]),_0x254582=Graphics[_0x3d7389(0x12a)]-_0x426af1,_0x4f794e=Graphics[_0x3d7389(0x142)]-_0x402c40;return new Rectangle(_0x254582,_0x4f794e,_0x426af1,_0x402c40);},Scene_Base[_0x5dbc13(0x1e8)]['isAutosaveConfirmWindowEnabled']=function(){const _0x1a416d=_0x5dbc13;return VisuMZ[_0x1a416d(0x1d7)][_0x1a416d(0x108)][_0x1a416d(0xca)][_0x1a416d(0xd6)];},Scene_Base[_0x5dbc13(0x1e8)][_0x5dbc13(0x22e)]=function(_0x529817){const _0x562372=_0x5dbc13;if(!this['isAutosaveConfirmWindowEnabled']())return this[_0x562372(0x1aa)](_0x529817);if(!this[_0x562372(0x146)])this['createAutosaveConfirmationWindow']();const _0x24dba4=this[_0x562372(0x146)];this[_0x562372(0x205)](_0x24dba4),this[_0x562372(0x1ea)](_0x24dba4),_0x24dba4['setSetSuccess'](_0x529817),_0x24dba4['fadeIn']();const _0x193a23=VisuMZ[_0x562372(0x1d7)]['Settings']['SaveConfirm'][_0x562372(0x1f9)];setTimeout(this[_0x562372(0x1aa)][_0x562372(0xcf)](this,_0x529817),_0x193a23);},Scene_Base[_0x5dbc13(0x1e8)][_0x5dbc13(0x1aa)]=function(_0x3efeb5){const _0x12e80b=_0x5dbc13;if(this[_0x12e80b(0x146)])this[_0x12e80b(0x146)]['fadeOut']();},Scene_Base[_0x5dbc13(0x1e8)][_0x5dbc13(0xcc)]=function(){},VisuMZ[_0x5dbc13(0x1d7)][_0x5dbc13(0x15b)]=Scene_Title[_0x5dbc13(0x1e8)]['initialize'],Scene_Title[_0x5dbc13(0x1e8)][_0x5dbc13(0xe5)]=function(){const _0x24690a=_0x5dbc13;VisuMZ[_0x24690a(0x1d7)][_0x24690a(0x15b)][_0x24690a(0x1f7)](this),this[_0x24690a(0x20e)]=![];},VisuMZ[_0x5dbc13(0x1d7)][_0x5dbc13(0x130)]=Scene_Title[_0x5dbc13(0x1e8)][_0x5dbc13(0x106)],Scene_Title['prototype']['terminate']=function(){const _0x26719d=_0x5dbc13;VisuMZ[_0x26719d(0x1d7)][_0x26719d(0x130)][_0x26719d(0x1f7)](this);if(this['_loadSuccess'])$gameSystem[_0x26719d(0x190)]();},VisuMZ[_0x5dbc13(0x1d7)]['Scene_Title_commandNewGame']=Scene_Title[_0x5dbc13(0x1e8)][_0x5dbc13(0x23e)],Scene_Title[_0x5dbc13(0x1e8)][_0x5dbc13(0x23e)]=function(){const _0xd78ff9=_0x5dbc13;StorageManager[_0xd78ff9(0xb6)]()===_0xd78ff9(0x165)?_0xd78ff9(0x12e)!=='LYxCK'?this[_0xd78ff9(0x147)]():this[_0xd78ff9(0x1f1)](_0xc7130f['autosave'],_0x335d63,_0x5ab273,0xb4):VisuMZ[_0xd78ff9(0x1d7)]['Scene_Title_commandNewGame'][_0xd78ff9(0x1f7)](this);},Scene_Title[_0x5dbc13(0x1e8)][_0x5dbc13(0x147)]=function(){const _0x129e62=_0x5dbc13;DataManager['setupNewGame'](),$gameTemp[_0x129e62(0xc4)]=!![],this[_0x129e62(0x20d)]['close'](),SceneManager['push'](Scene_Save);},VisuMZ['SaveCore']['Scene_Title_commandContinue']=Scene_Title['prototype'][_0x5dbc13(0xf6)],Scene_Title[_0x5dbc13(0x1e8)][_0x5dbc13(0xf6)]=function(){const _0x1d53ea=_0x5dbc13;if(StorageManager[_0x1d53ea(0xb6)]()===_0x1d53ea(0xc0))this['commandContinueSaveCoreSingle']();else{if(_0x1d53ea(0x120)!==_0x1d53ea(0x120)){_0x2a9813[_0x1d53ea(0x1e8)][_0x1d53ea(0xe9)][_0x1d53ea(0x1f7)](this);if(this['_fadeSpeed']!==0x0)this[_0x1d53ea(0xd1)]();}else VisuMZ[_0x1d53ea(0x1d7)][_0x1d53ea(0x1d3)][_0x1d53ea(0x1f7)](this);}},Scene_Title[_0x5dbc13(0x1e8)][_0x5dbc13(0x1e7)]=function(){const _0x1b1e5c=_0x5dbc13;DataManager[_0x1b1e5c(0x177)](0x0)[_0x1b1e5c(0x161)](()=>this[_0x1b1e5c(0x1c0)]())[_0x1b1e5c(0x16a)](()=>this[_0x1b1e5c(0x1f0)]());},Scene_Title[_0x5dbc13(0x1e8)][_0x5dbc13(0x1c0)]=function(){const _0x8ec725=_0x5dbc13;this[_0x8ec725(0x20d)][_0x8ec725(0x11e)](),SoundManager[_0x8ec725(0x203)](),this[_0x8ec725(0x188)](),Scene_Load['prototype'][_0x8ec725(0x159)](),SceneManager[_0x8ec725(0xf4)](Scene_Map),this[_0x8ec725(0x20e)]=!![],VisuMZ['SaveCore'][_0x8ec725(0x108)][_0x8ec725(0x21a)][_0x8ec725(0x174)][_0x8ec725(0x1f7)](this);},Scene_Title['prototype'][_0x5dbc13(0x1f0)]=function(){const _0x16df87=_0x5dbc13;SoundManager[_0x16df87(0x136)](),VisuMZ['SaveCore'][_0x16df87(0x108)][_0x16df87(0x21a)]['OnLoadFailureJS']['call'](this),this[_0x16df87(0x112)]();},Scene_Title[_0x5dbc13(0x1e8)][_0x5dbc13(0x17e)]=function(_0x3e38dc){const _0x4df134=_0x5dbc13;Scene_Base['prototype']['closeSaveConfirmationWindow']['call'](this,_0x3e38dc),this['_commandWindow']['open'](),this[_0x4df134(0x20d)]['activate']();},VisuMZ[_0x5dbc13(0x1d7)][_0x5dbc13(0x243)]=Scene_Map['prototype'][_0x5dbc13(0x1c5)],Scene_Map[_0x5dbc13(0x1e8)][_0x5dbc13(0x1c5)]=function(){const _0x35347c=_0x5dbc13;VisuMZ[_0x35347c(0x1d7)][_0x35347c(0x243)][_0x35347c(0x1f7)](this);if(SceneManager[_0x35347c(0x173)](Scene_Menu))'ztcTT'===_0x35347c(0x1e4)?(_0x18cefa['SaveCore'][_0x35347c(0x21f)][_0x35347c(0x1f7)](this,_0x50ecb2),this[_0x35347c(0x144)]=_0x524d0c['autosave']!==_0x17affd?_0x1a42d8[_0x35347c(0x144)]:_0xb084d2[_0x35347c(0x1d7)][_0x35347c(0x108)][_0x35347c(0x185)]['Default'],this[_0x35347c(0x231)]=_0x3e5b49[_0x35347c(0x231)]||[],this['globalVariables']=_0x167ce4[_0x35347c(0x10b)]||[]):(this['determineAutosaveBypass'](_0x35347c(0x1f2)),this[_0x35347c(0x23b)]());else{if(SceneManager[_0x35347c(0x173)](Scene_Battle)){if(_0x35347c(0x10a)!==_0x35347c(0x149))this[_0x35347c(0x236)](_0x35347c(0xe3)),this[_0x35347c(0x23b)]();else{_0x2e7c75[_0x35347c(0x10b)]=_0xc6a71f[_0x35347c(0x10b)]||[];if(typeof _0x18129c==='number')_0x509e13=_0x2b9740[_0x35347c(0xd0)](_0x11be40);_0x276a99[_0x35347c(0x10b)][_0x59e4b8]=_0x2b8b6d,_0x56aabc['save']();}}}},VisuMZ['SaveCore'][_0x5dbc13(0x1df)]=Scene_Map['prototype']['onTransferEnd'],Scene_Map[_0x5dbc13(0x1e8)][_0x5dbc13(0x226)]=function(){const _0x102811=_0x5dbc13;this[_0x102811(0x181)]()&&this[_0x102811(0x236)](_0x102811(0x12b)),VisuMZ[_0x102811(0x1d7)][_0x102811(0x1df)][_0x102811(0x1f7)](this);},Scene_Map['prototype'][_0x5dbc13(0xcc)]=function(){const _0xa3c1c0=_0x5dbc13;if($gameSystem[_0xa3c1c0(0x13b)])return;const _0x194312=$gameSystem['savefileId']();if(StorageManager[_0xa3c1c0(0xb6)]()!==_0xa3c1c0(0xc0)&&_0x194312<=0x0)return;this[_0xa3c1c0(0x1e6)]=![],$gameSystem[_0xa3c1c0(0x23c)](_0x194312),$gameSystem[_0xa3c1c0(0xd7)](),$gameSystem[_0xa3c1c0(0x13b)]=!![],DataManager[_0xa3c1c0(0x237)](_0x194312)[_0xa3c1c0(0x161)](()=>this[_0xa3c1c0(0x1fa)]())[_0xa3c1c0(0x16a)](()=>this['onSaveFailure']()),$gameSystem[_0xa3c1c0(0x13b)]=undefined;},Scene_Map[_0x5dbc13(0x1e8)][_0x5dbc13(0x1fa)]=function(){const _0x280fe2=_0x5dbc13;SoundManager[_0x280fe2(0x225)](),VisuMZ[_0x280fe2(0x1d7)]['Settings'][_0x280fe2(0x21a)]['OnSaveSuccessJS'][_0x280fe2(0x1f7)](this),this['openSaveConfirmationWindow'](!![]);},Scene_Map['prototype'][_0x5dbc13(0x245)]=function(){const _0x2499cf=_0x5dbc13;SoundManager['playBuzzer'](),VisuMZ[_0x2499cf(0x1d7)]['Settings'][_0x2499cf(0x21a)]['OnSaveFailureJS']['call'](this),this[_0x2499cf(0x1a4)](![]);},Scene_Map[_0x5dbc13(0x1e8)][_0x5dbc13(0x17e)]=function(_0x4a2609){const _0x4d5005=_0x5dbc13;Scene_Message[_0x4d5005(0x1e8)]['closeSaveConfirmationWindow'][_0x4d5005(0x1f7)](this,_0x4a2609),this[_0x4d5005(0x1e6)]=!![];},VisuMZ[_0x5dbc13(0x1d7)]['Scene_Menu_create']=Scene_Menu[_0x5dbc13(0x1e8)][_0x5dbc13(0x125)],Scene_Menu[_0x5dbc13(0x1e8)][_0x5dbc13(0x125)]=function(){const _0x497903=_0x5dbc13;VisuMZ[_0x497903(0x1d7)][_0x497903(0x15d)][_0x497903(0x1f7)](this),SceneManager['isPreviousScene'](Scene_Map)&&(this['determineAutosaveBypass'](_0x497903(0x110)),this[_0x497903(0x23b)]());},VisuMZ[_0x5dbc13(0x1d7)]['Scene_Menu_commandSave']=Scene_Menu['prototype'][_0x5dbc13(0x246)],Scene_Menu[_0x5dbc13(0x1e8)][_0x5dbc13(0x246)]=function(){const _0x88ea98=_0x5dbc13,_0x2c6556=StorageManager[_0x88ea98(0xb6)]();switch(_0x2c6556){case _0x88ea98(0x165):case _0x88ea98(0xc0):this[_0x88ea98(0x1b5)]();break;default:VisuMZ[_0x88ea98(0x1d7)][_0x88ea98(0x1f8)][_0x88ea98(0x1f7)](this);break;}},Scene_Menu[_0x5dbc13(0x1e8)][_0x5dbc13(0x1b5)]=function(){const _0x343ca9=_0x5dbc13,_0x9ba1f1=$gameSystem['savefileId']();$gameSystem[_0x343ca9(0x23c)](_0x9ba1f1),$gameSystem['onBeforeSave'](),DataManager[_0x343ca9(0x237)](_0x9ba1f1)[_0x343ca9(0x161)](()=>this[_0x343ca9(0x220)]())['catch'](()=>this[_0x343ca9(0x117)]());},Scene_Menu[_0x5dbc13(0x1e8)][_0x5dbc13(0x220)]=function(){const _0x4ed215=_0x5dbc13;SoundManager[_0x4ed215(0x225)](),VisuMZ[_0x4ed215(0x1d7)]['Settings'][_0x4ed215(0x21a)][_0x4ed215(0x1ec)]['call'](this),this['openSaveConfirmationWindow'](!![]);},Scene_Menu['prototype'][_0x5dbc13(0x117)]=function(){const _0x51c8f1=_0x5dbc13;SoundManager[_0x51c8f1(0x136)](),VisuMZ[_0x51c8f1(0x1d7)][_0x51c8f1(0x108)]['Save'][_0x51c8f1(0x1b0)]['call'](this),this[_0x51c8f1(0x1a4)](![]);},Scene_Menu[_0x5dbc13(0x1e8)][_0x5dbc13(0x17e)]=function(_0x1184f5){const _0x2714c8=_0x5dbc13;Scene_MenuBase[_0x2714c8(0x1e8)]['closeSaveConfirmationWindow'][_0x2714c8(0x1f7)](this,_0x1184f5),this[_0x2714c8(0x20d)][_0x2714c8(0x22b)]();},Scene_Battle[_0x5dbc13(0x1e8)][_0x5dbc13(0x23b)]=function(){},VisuMZ[_0x5dbc13(0x1d7)]['Scene_Options_maxCommands']=Scene_Options[_0x5dbc13(0x1e8)][_0x5dbc13(0x1ae)],Scene_Options['prototype'][_0x5dbc13(0x1ae)]=function(){const _0x142953=_0x5dbc13;let _0x49d26d=VisuMZ[_0x142953(0x1d7)][_0x142953(0x162)][_0x142953(0x1f7)](this);const _0x21feb1=VisuMZ[_0x142953(0x1d7)][_0x142953(0x108)];if(_0x21feb1[_0x142953(0x185)]['AddOption']&&_0x21feb1[_0x142953(0x185)][_0x142953(0x21c)])_0x49d26d++;return _0x49d26d;},Scene_Save['prototype'][_0x5dbc13(0x1fa)]=function(){const _0x3b0af7=_0x5dbc13;SoundManager[_0x3b0af7(0x225)](),VisuMZ[_0x3b0af7(0x1d7)][_0x3b0af7(0x108)]['Save'][_0x3b0af7(0x1ec)][_0x3b0af7(0x1f7)](this),this[_0x3b0af7(0x1c6)][_0x3b0af7(0x229)](),this['openSaveConfirmationWindow'](!![]);},VisuMZ[_0x5dbc13(0x1d7)][_0x5dbc13(0xfb)]=Scene_Save['prototype']['onSaveFailure'],Scene_Save[_0x5dbc13(0x1e8)][_0x5dbc13(0x245)]=function(){const _0x1ad694=_0x5dbc13;SoundManager['playBuzzer'](),VisuMZ[_0x1ad694(0x1d7)][_0x1ad694(0x108)][_0x1ad694(0x21a)]['OnSaveFailureJS'][_0x1ad694(0x1f7)](this),this[_0x1ad694(0x1a4)](![]);},Scene_Save[_0x5dbc13(0x1e8)][_0x5dbc13(0x17e)]=function(_0xf9e371){const _0xdd249=_0x5dbc13;Scene_File['prototype'][_0xdd249(0x17e)][_0xdd249(0x1f7)](this,_0xf9e371),_0xf9e371?this[_0xdd249(0x242)]():this['activateListWindow']();},Scene_Save[_0x5dbc13(0x1e8)]['popScene']=function(){const _0x583192=_0x5dbc13;$gameTemp[_0x583192(0xc4)]=![],Scene_File[_0x583192(0x1e8)][_0x583192(0x17a)][_0x583192(0x1f7)](this);},VisuMZ[_0x5dbc13(0x1d7)][_0x5dbc13(0x1a5)]=Scene_Save[_0x5dbc13(0x1e8)][_0x5dbc13(0x1af)],Scene_Save[_0x5dbc13(0x1e8)]['helpWindowText']=function(){const _0xe434ae=_0x5dbc13;if($gameTemp[_0xe434ae(0xc4)]){if(_0xe434ae(0x193)!==_0xe434ae(0x193))_0x356704['playBuzzer'](),_0x881580[_0xe434ae(0x1d7)][_0xe434ae(0x108)][_0xe434ae(0x21a)]['OnLoadFailureJS'][_0xe434ae(0x1f7)](this),this[_0xe434ae(0x112)]();else return TextManager[_0xe434ae(0x217)];}else{if('ydczq'!==_0xe434ae(0xce))return VisuMZ[_0xe434ae(0x1d7)][_0xe434ae(0x1a5)][_0xe434ae(0x1f7)](this);else this[_0xe434ae(0x1a4)](![],!![]);}},VisuMZ[_0x5dbc13(0x1d7)][_0x5dbc13(0x1da)]=Scene_Save['prototype']['executeSave'],Scene_Save['prototype'][_0x5dbc13(0x207)]=function(_0x36bd57){const _0x39e67e=_0x5dbc13;$gameTemp['_pickLockedSaveSlot']?this['startNewGameLockedSave'](_0x36bd57):VisuMZ[_0x39e67e(0x1d7)][_0x39e67e(0x1da)]['call'](this,_0x36bd57);},Scene_Save[_0x5dbc13(0x1e8)]['startNewGameLockedSave']=function(_0xe7c656){const _0xdf986d=_0x5dbc13;$gameTemp['_pickLockedSaveSlot']=![],SoundManager[_0xdf986d(0x203)](),$gameSystem[_0xdf986d(0x23c)](_0xe7c656),this[_0xdf986d(0x188)](),SceneManager[_0xdf986d(0xf4)](Scene_Map);},VisuMZ['SaveCore'][_0x5dbc13(0x19d)]=Scene_Load[_0x5dbc13(0x1e8)][_0x5dbc13(0x123)],Scene_Load[_0x5dbc13(0x1e8)][_0x5dbc13(0x123)]=function(){const _0x32eafc=_0x5dbc13;VisuMZ[_0x32eafc(0x1d7)][_0x32eafc(0x19d)]['call'](this),VisuMZ[_0x32eafc(0x1d7)][_0x32eafc(0x108)]['Save'][_0x32eafc(0x174)][_0x32eafc(0x1f7)](this),setTimeout(VisuMZ[_0x32eafc(0x1d7)][_0x32eafc(0x12c)][_0x32eafc(0xcf)](this),0x3e8);},Scene_Load[_0x5dbc13(0x1e8)][_0x5dbc13(0x1b3)]=function(){const _0x5d44ed=_0x5dbc13;SoundManager[_0x5d44ed(0x136)](),VisuMZ['SaveCore']['Settings'][_0x5d44ed(0x21a)][_0x5d44ed(0x167)][_0x5d44ed(0x1f7)](this),this['loadFailureConfirmationWindow']();},Scene_Load[_0x5dbc13(0x1e8)]['closeSaveConfirmationWindow']=function(_0x24b127){const _0x4c6b4c=_0x5dbc13;Scene_File['prototype'][_0x4c6b4c(0x17e)]['call'](this,_0x24b127),this[_0x4c6b4c(0x242)]();},VisuMZ['SaveCore'][_0x5dbc13(0x12c)]=function(){const _0x12f63c=_0x5dbc13;$gameSystem[_0x12f63c(0x13b)]=undefined;},ImageManager[_0x5dbc13(0xd2)]=ImageManager[_0x5dbc13(0xd2)]||0x9,ImageManager[_0x5dbc13(0x232)]=ImageManager[_0x5dbc13(0x232)]||0x6,Window_Base[_0x5dbc13(0x1e8)][_0x5dbc13(0x1f4)]=function(_0x4f3fe9,_0x229e3d,_0xe7b714){const _0x21e20d=_0x5dbc13,_0x5b4c2f=ImageManager[_0x21e20d(0xe2)](_0x4f3fe9),_0x5129c4=_0x5b4c2f[_0x21e20d(0x12a)]/ImageManager[_0x21e20d(0xd2)],_0x4674cb=_0x5b4c2f[_0x21e20d(0x142)]/ImageManager['svActorVertCells'],_0x264396=0x0,_0x38eef6=0x0;this[_0x21e20d(0x126)][_0x21e20d(0x1ca)](_0x5b4c2f,_0x264396,_0x38eef6,_0x5129c4,_0x4674cb,_0x229e3d-_0x5129c4/0x2,_0xe7b714-_0x4674cb);},VisuMZ[_0x5dbc13(0x1d7)]['Window_Options_addGeneralOptions']=Window_Options[_0x5dbc13(0x1e8)][_0x5dbc13(0x153)],Window_Options[_0x5dbc13(0x1e8)]['addGeneralOptions']=function(){const _0x5090e4=_0x5dbc13;VisuMZ['SaveCore'][_0x5090e4(0x183)]['call'](this),this[_0x5090e4(0xc8)]();},Window_Options[_0x5dbc13(0x1e8)][_0x5dbc13(0xc8)]=function(){const _0x2de00a=_0x5dbc13;if(VisuMZ[_0x2de00a(0x1d7)][_0x2de00a(0x108)][_0x2de00a(0x185)][_0x2de00a(0x140)]){if(_0x2de00a(0x1ee)===_0x2de00a(0x1a1)){if(!_0x25691e[_0x2de00a(0x144)])return;this[_0x2de00a(0x21e)]();}else this['addSaveCoreAutosaveCommand']();}},Window_Options[_0x5dbc13(0x1e8)][_0x5dbc13(0x1ff)]=function(){const _0x162eed=_0x5dbc13,_0x2470f4=TextManager[_0x162eed(0x155)],_0x2aed58='autosave';this['addCommand'](_0x2470f4,_0x2aed58);};function _0x47db(_0x36d3e0,_0x25e885){return _0x47db=function(_0x2baabd,_0x47db96){_0x2baabd=_0x2baabd-0xb6;let _0x14bd68=_0x2baa[_0x2baabd];return _0x14bd68;},_0x47db(_0x36d3e0,_0x25e885);}function Window_AutosaveConfirm(){const _0x2f1074=_0x5dbc13;this[_0x2f1074(0xe5)](...arguments);}Window_AutosaveConfirm['prototype']=Object[_0x5dbc13(0x125)](Window_Base[_0x5dbc13(0x1e8)]),Window_AutosaveConfirm['prototype'][_0x5dbc13(0x210)]=Window_AutosaveConfirm,Window_AutosaveConfirm[_0x5dbc13(0x1e8)]['initialize']=function(_0x319fcf){const _0x15464a=_0x5dbc13;this['_fadeSpeed']=0x0,Window_Base[_0x15464a(0x1e8)]['initialize']['call'](this,_0x319fcf),this[_0x15464a(0x13a)]=0x0,this[_0x15464a(0x17b)]=0x0;},Window_AutosaveConfirm[_0x5dbc13(0x1e8)]['drawBackground']=function(){const _0x5b93ba=_0x5dbc13,_0x3095c6=0x0,_0x37773f=0x0,_0x1870fe=this[_0x5b93ba(0x238)],_0x1ef8a7=this[_0x5b93ba(0x241)],_0x3ed77c=ColorManager[_0x5b93ba(0xed)](),_0x5e55ad=ColorManager[_0x5b93ba(0xf9)](),_0x33b0d6=_0x1870fe/0x2;this[_0x5b93ba(0x126)][_0x5b93ba(0x1d4)](_0x3095c6,_0x37773f,_0x33b0d6,_0x1ef8a7,_0x5e55ad,_0x3ed77c),this['contents'][_0x5b93ba(0x1d4)](_0x3095c6+_0x33b0d6,_0x37773f,_0x33b0d6,_0x1ef8a7,_0x3ed77c,_0x5e55ad);},Window_AutosaveConfirm[_0x5dbc13(0x1e8)]['setSetSuccess']=function(_0x47e01d){const _0x1fa505=_0x5dbc13;this[_0x1fa505(0xf1)]=_0x47e01d,this['refresh']();},Window_AutosaveConfirm[_0x5dbc13(0x1e8)][_0x5dbc13(0x229)]=function(){const _0x194a93=_0x5dbc13;this[_0x194a93(0x126)][_0x194a93(0x151)]();const _0x5db14e=this[_0x194a93(0xf1)]?TextManager['autosaveSuccess']:TextManager[_0x194a93(0x15a)],_0x50d4cc=Math[_0x194a93(0xdf)](this[_0x194a93(0x1d5)](_0x5db14e)['width']);this[_0x194a93(0x12a)]=_0x50d4cc+($gameSystem['windowPadding']()+this['itemPadding']())*0x2,this[_0x194a93(0xd8)](),this[_0x194a93(0x19c)]();const _0x44c01c=Math[_0x194a93(0xd0)]((this[_0x194a93(0x238)]-_0x50d4cc)/0x2);this[_0x194a93(0x1d6)](),this[_0x194a93(0x1c9)](_0x5db14e,_0x44c01c,0x0,_0x50d4cc);},Window_AutosaveConfirm['prototype'][_0x5dbc13(0xbb)]=function(){const _0x2edd65=_0x5dbc13;return VisuMZ[_0x2edd65(0x1d7)]['Settings'][_0x2edd65(0xca)][_0x2edd65(0x22d)];},Window_AutosaveConfirm[_0x5dbc13(0x1e8)][_0x5dbc13(0xd8)]=function(){const _0x5ee451=_0x5dbc13,_0x399e67=this['getScreenPosition']();if(_0x399e67[_0x5ee451(0xbd)](/upper/i))this['y']=-0x1*$gameSystem[_0x5ee451(0x1bb)]();else _0x399e67[_0x5ee451(0xbd)](/lower/i)?this['y']=Graphics['height']-this['height']+$gameSystem['windowPadding']():this['y']=(Graphics['height']-this[_0x5ee451(0x142)])/0x2;if(_0x399e67[_0x5ee451(0xbd)](/left/i)){if(_0x5ee451(0x169)===_0x5ee451(0x169))this['x']=-0x1*$gameSystem[_0x5ee451(0x1bb)]();else{if(_0x43e211==='')return;_0x6cea+=0x2,_0x28ea2a+=0x2,_0xa5bfae-=0x4,_0x4dd700-=0x4;const _0x5ba215=_0x3ff2ea['loadPicture'](_0x5bf3a6),_0x3fc683=_0x5ba215[_0x5ee451(0x12a)],_0x4ca51d=_0x5ba215[_0x5ee451(0x142)],_0x5d078c=_0x431b8c[_0x5ee451(0x18c)](_0x36b0fc/_0x3fc683,_0x3d89b6/_0x4ca51d,_0x122490?0x1:0x3e8),_0x8f793c=_0x12d849[_0x5ee451(0xdf)](_0x5ba215[_0x5ee451(0x12a)]*_0x5d078c),_0x22411f=_0x89afab[_0x5ee451(0xdf)](_0x5ba215[_0x5ee451(0x142)]*_0x5d078c);this['contentsBack'][_0x5ee451(0x1ca)](_0x5ba215,0x0,0x0,_0x3fc683,_0x4ca51d,_0x4e6ebe,_0x1b1f3b,_0x8f793c,_0x22411f);}}else _0x399e67[_0x5ee451(0xbd)](/right/i)?'eXQUx'===_0x5ee451(0x1f6)?_0x5daef8[_0x5ee451(0x1d7)]['Settings'][_0x5ee451(0x184)]['ListFileDataJS'][_0x5ee451(0x1f7)](this,_0x58361d,_0x112f8f):this['x']=Graphics['width']-this[_0x5ee451(0x12a)]+$gameSystem[_0x5ee451(0x1bb)]():this['x']=(Graphics[_0x5ee451(0x12a)]-this['width'])/0x2;this['x']=Math[_0x5ee451(0x1de)](this['x']),this['y']=Math[_0x5ee451(0x1de)](this['y']);},Window_AutosaveConfirm['prototype'][_0x5dbc13(0xe9)]=function(){const _0x5f475c=_0x5dbc13;Window_Base[_0x5f475c(0x1e8)][_0x5f475c(0xe9)]['call'](this);if(this[_0x5f475c(0xc1)]!==0x0)this[_0x5f475c(0xd1)]();},Window_AutosaveConfirm[_0x5dbc13(0x1e8)]['updateFade']=function(){const _0x464c0a=_0x5dbc13;this['contentsOpacity']+=this['_fadeSpeed'];if(this['contentsOpacity']>=0xff||this[_0x464c0a(0x17b)]<=0x0)this[_0x464c0a(0xda)](0x0);},Window_AutosaveConfirm[_0x5dbc13(0x1e8)][_0x5dbc13(0xda)]=function(_0x369bf0){const _0x5aab81=_0x5dbc13;this[_0x5aab81(0xc1)]=_0x369bf0;},Window_AutosaveConfirm[_0x5dbc13(0x1e8)]['fadeIn']=function(){const _0x132e34=_0x5dbc13;this[_0x132e34(0xda)](0x10);},Window_AutosaveConfirm[_0x5dbc13(0x1e8)][_0x5dbc13(0x132)]=function(){const _0x1ae63b=_0x5dbc13;this[_0x1ae63b(0xda)](-0x10);},VisuMZ[_0x5dbc13(0x1d7)][_0x5dbc13(0x17d)]=Window_SavefileList[_0x5dbc13(0x1e8)][_0x5dbc13(0x139)],Window_SavefileList[_0x5dbc13(0x1e8)][_0x5dbc13(0x139)]=function(_0x96846e,_0x56811b){const _0x3ac4ec=_0x5dbc13;if(StorageManager['autosaveType']()==='current')_0x56811b=![];if($gameTemp[_0x3ac4ec(0xc4)])_0x56811b=![];VisuMZ[_0x3ac4ec(0x1d7)][_0x3ac4ec(0x17d)][_0x3ac4ec(0x1f7)](this,_0x96846e,_0x56811b);},Window_SavefileList[_0x5dbc13(0x1e8)]['numVisibleRows']=function(){const _0x3c0c38=_0x5dbc13,_0x1fbe6f=VisuMZ[_0x3c0c38(0x1d7)][_0x3c0c38(0x108)]['SaveMenu'],_0x7b2e11=this[_0x3c0c38(0x1c2)]();switch(_0x7b2e11){case _0x3c0c38(0xcb):return _0x1fbe6f[_0x3c0c38(0x200)];break;case'box':return _0x1fbe6f[_0x3c0c38(0x17f)];break;case'large':return _0x1fbe6f['LargeRows'];break;default:return _0x1fbe6f[_0x3c0c38(0x202)];break;}},Window_SavefileList['prototype'][_0x5dbc13(0xef)]=function(){const _0x570541=_0x5dbc13,_0x1c41cf=VisuMZ['SaveCore'][_0x570541(0x108)][_0x570541(0x184)],_0x4ac98d=this['menuStyle']();switch(_0x4ac98d){case _0x570541(0xcb):return _0x1c41cf[_0x570541(0xec)];break;case _0x570541(0xc5):return _0x1c41cf[_0x570541(0x1dd)];break;case'large':return _0x1c41cf[_0x570541(0x143)];break;default:return _0x1c41cf[_0x570541(0x21b)];break;}},Window_SavefileList[_0x5dbc13(0x1e8)][_0x5dbc13(0x213)]=function(){const _0x381800=_0x5dbc13;Imported['VisuMZ_1_MessageCore']&&Window_Selectable[_0x381800(0x1e8)]['resetWordWrap'][_0x381800(0x1f7)](this);},Window_SavefileList[_0x5dbc13(0x1e8)][_0x5dbc13(0x179)]=function(_0x13cdde){const _0x2bd354=_0x5dbc13;if(Imported[_0x2bd354(0x222)]){if(_0x2bd354(0x24b)!==_0x2bd354(0x11b))return Window_Selectable[_0x2bd354(0x1e8)][_0x2bd354(0x179)][_0x2bd354(0x1f7)](this,_0x13cdde);else{if(!this[_0x2bd354(0x22a)]())return this['closeSaveConfirmationWindow'](_0x2b1ae6);if(!this[_0x2bd354(0xe1)])this[_0x2bd354(0x10d)]();const _0x46c746=this[_0x2bd354(0xe1)];this[_0x2bd354(0x205)](_0x46c746),this[_0x2bd354(0x1ea)](_0x46c746),_0x46c746['open'](),_0x46c746[_0x2bd354(0x196)](),_0x46c746['contents'][_0x2bd354(0x151)]();let _0x253a7e='';_0x531f27?_0x253a7e=_0xeed68d[_0x2bd354(0x227)]:_0x253a7e=_0x2e7e27?_0x3c3b62[_0x2bd354(0x1fe)]:_0x1e66c9[_0x2bd354(0x157)];const _0x9f94b4=_0x46c746[_0x2bd354(0x1d5)](_0x253a7e)[_0x2bd354(0x12a)],_0x3397d4=(_0x46c746[_0x2bd354(0x238)]-_0x9f94b4)/0x2;_0x46c746['drawTextEx'](_0x253a7e,_0x3397d4,0x0,_0x9f94b4);const _0x139b4f=_0x4ba238[_0x2bd354(0x1d7)]['Settings'][_0x2bd354(0x21d)][_0x2bd354(0x1f9)];_0x4e2f3b(this[_0x2bd354(0x17e)]['bind'](this,_0x35a1d5),_0x139b4f);}}else return'';},Window_SavefileList[_0x5dbc13(0x1e8)][_0x5dbc13(0x10e)]=function(){const _0x46e851=_0x5dbc13;return VisuMZ[_0x46e851(0x1d7)][_0x46e851(0x108)]['ActorGraphic'];},Window_SavefileList[_0x5dbc13(0x1e8)][_0x5dbc13(0x1c2)]=function(){const _0x26fcb1=_0x5dbc13;return VisuMZ[_0x26fcb1(0x1d7)][_0x26fcb1(0x108)]['SaveMenuStyle'];},Window_SavefileList[_0x5dbc13(0x1e8)][_0x5dbc13(0x1c1)]=function(_0x14d2fb){const _0x26b8c5=_0x5dbc13,_0x24c449=Math[_0x26b8c5(0x171)](0x0,this[_0x26b8c5(0x12f)](_0x14d2fb));this['smoothSelect'](_0x24c449);},Window_SavefileList[_0x5dbc13(0x1e8)]['drawItem']=function(_0x224fea){const _0x34591e=_0x5dbc13,_0x5b8bc6=this[_0x34591e(0x100)](_0x224fea),_0x282341=DataManager[_0x34591e(0x216)](_0x5b8bc6);if(_0x282341)_0x282341[_0x34591e(0x1e2)]=_0x5b8bc6;this[_0x34591e(0x145)]=_0x5b8bc6;const _0x2f48b0=this['itemRect'](_0x224fea);this[_0x34591e(0x196)](),this['changePaintOpacity'](this[_0x34591e(0x135)](_0x5b8bc6)),this[_0x34591e(0x248)](_0x282341,_0x2f48b0);},Window_SavefileList['prototype'][_0x5dbc13(0xc9)]=function(_0x110e40,_0x3c8e62,_0xc9c81){const _0x3221cb=_0x5dbc13;_0x110e40===0x0?this['drawText'](TextManager[_0x3221cb(0x144)],_0x3c8e62,_0xc9c81,0xb4):this[_0x3221cb(0x1f1)](TextManager['file']+'\x20'+_0x110e40,_0x3c8e62,_0xc9c81,0xb4);},Window_SavefileList[_0x5dbc13(0x1e8)]['drawLatestMarker']=function(_0x21b770,_0x4958c3,_0x3d3df5){const _0x292cf4=_0x5dbc13;if(_0x21b770===0x0||DataManager[_0x292cf4(0x1b6)]()!==_0x21b770)return;const _0x25866e=TextManager[_0x292cf4(0x18f)];this[_0x292cf4(0x1b8)](ColorManager['latestSavefile']()),this['drawText'](_0x25866e,_0x4958c3,_0x3d3df5,0xb4);},Window_SavefileList['prototype'][_0x5dbc13(0xbc)]=function(_0x4223ba,_0x3bcffc,_0x28a6b7,_0xac133e,_0x2a055b){const _0x342e4a=_0x5dbc13;if(!_0x4223ba[_0x342e4a(0x20c)])return;const _0x36f9ad=this[_0x342e4a(0x10e)]();switch(_0x36f9ad){case _0x342e4a(0x182):this[_0x342e4a(0x105)](_0x4223ba,_0x3bcffc,_0x28a6b7,_0xac133e,_0x2a055b);break;case _0x342e4a(0x129):this['drawActorSprites'](_0x4223ba,_0x3bcffc,_0x28a6b7,_0xac133e,_0x2a055b);break;case _0x342e4a(0x160):this['drawSvBattlerSprites'](_0x4223ba,_0x3bcffc,_0x28a6b7,_0xac133e,_0x2a055b);break;default:break;}},Window_SavefileList['prototype'][_0x5dbc13(0x105)]=function(_0x8e7860,_0x2038c8,_0x3320c8,_0x13e791,_0x411c37){const _0xc70ce6=_0x5dbc13;let _0x2be059=Math[_0xc70ce6(0x171)](_0x8e7860[_0xc70ce6(0x198)][_0xc70ce6(0xf2)],Scene_File[_0xc70ce6(0xc2)]);const _0x346b03=Math[_0xc70ce6(0x18c)](ImageManager['faceWidth'],Math[_0xc70ce6(0xd0)](_0x13e791/_0x2be059));_0x2038c8=_0x2038c8+Math['round']((_0x13e791-_0x2be059*_0x346b03)/0x2);for(const _0x199a32 of _0x8e7860[_0xc70ce6(0x198)]){if('BrEZa'!=='ZLmJQ')this[_0xc70ce6(0x13c)](_0x199a32[0x0],_0x199a32[0x1],_0x2038c8,_0x3320c8+0x1,_0x346b03,_0x411c37-0x2),_0x2038c8+=_0x346b03;else return this[_0xc70ce6(0x1c3)](_0x75b5cb);}},ImageManager['saveMenuSpriteWidth']=VisuMZ[_0x5dbc13(0x1d7)][_0x5dbc13(0x108)][_0x5dbc13(0x184)]['SpriteWidth'],ImageManager[_0x5dbc13(0xdc)]=VisuMZ[_0x5dbc13(0x1d7)]['Settings'][_0x5dbc13(0x184)][_0x5dbc13(0x223)],Window_SavefileList[_0x5dbc13(0x1e8)][_0x5dbc13(0xb7)]=function(_0x25fe2b,_0x1e4909,_0x5860c0,_0x53f6b0,_0x4971aa){const _0x36254b=_0x5dbc13;let _0x3cbb19=Math[_0x36254b(0x171)](_0x25fe2b[_0x36254b(0x20c)]['length'],Scene_File['MAX_BATTLE_MEMBERS']);const _0x274343=ImageManager['saveMenuSpriteWidth'];_0x1e4909=_0x1e4909+Math['round']((_0x53f6b0-_0x3cbb19*_0x274343)/0x2)+_0x274343/0x2,_0x5860c0=_0x5860c0+_0x4971aa-0x8;for(const _0x510b01 of _0x25fe2b[_0x36254b(0x20c)]){this[_0x36254b(0x1a8)](_0x510b01[0x0],_0x510b01[0x1],_0x1e4909,_0x5860c0),_0x1e4909+=_0x274343;}},Window_SavefileList['prototype'][_0x5dbc13(0xfc)]=function(_0x3230b8,_0x269a92,_0x43c325,_0x24c605,_0x327218){const _0x20357d=_0x5dbc13;if(!_0x3230b8[_0x20357d(0xb9)])return this[_0x20357d(0xb7)](_0x3230b8,_0x269a92,_0x43c325,_0x24c605,_0x327218);let _0x20705a=Math[_0x20357d(0x171)](_0x3230b8[_0x20357d(0xb9)][_0x20357d(0xf2)],Scene_File[_0x20357d(0xc2)]);const _0x9c1395=ImageManager[_0x20357d(0xdc)];_0x269a92=_0x269a92+Math[_0x20357d(0x1de)]((_0x24c605-_0x20705a*_0x9c1395)/0x2)+_0x9c1395/0x2,_0x43c325=_0x43c325+_0x327218-0x8;for(const _0x6947d1 of _0x3230b8[_0x20357d(0xb9)]){this[_0x20357d(0x1f4)](_0x6947d1,_0x269a92,_0x43c325),_0x269a92+=_0x9c1395;}},Window_SavefileList[_0x5dbc13(0x1e8)]['drawPicture']=function(_0x17caa1,_0x588dd1,_0x1e546,_0x5e0358,_0x210b34,_0x4acae0){const _0x322ec6=_0x5dbc13;if(_0x17caa1==='')return;_0x588dd1+=0x2,_0x1e546+=0x2,_0x5e0358-=0x4,_0x210b34-=0x4;const _0x3329e4=ImageManager[_0x322ec6(0x14a)](_0x17caa1),_0x662b64=_0x3329e4[_0x322ec6(0x12a)],_0x207630=_0x3329e4[_0x322ec6(0x142)],_0xced16d=Math[_0x322ec6(0x18c)](_0x5e0358/_0x662b64,_0x210b34/_0x207630,_0x4acae0?0x1:0x3e8),_0x261eca=Math['ceil'](_0x3329e4[_0x322ec6(0x12a)]*_0xced16d),_0x141396=Math[_0x322ec6(0xdf)](_0x3329e4[_0x322ec6(0x142)]*_0xced16d);this[_0x322ec6(0x115)]['blt'](_0x3329e4,0x0,0x0,_0x662b64,_0x207630,_0x588dd1,_0x1e546,_0x261eca,_0x141396);},Window_SavefileList[_0x5dbc13(0x1e8)][_0x5dbc13(0x24e)]=function(_0x519ec4,_0xa36867,_0x3381e6,_0x3d8ba4,_0x1ca6b7,_0x119cbd){const _0x3a8417=_0x5dbc13;if(_0x519ec4==='')return;_0xa36867+=0x2,_0x3381e6+=0x2,_0x3d8ba4-=0x4,_0x1ca6b7-=0x4;const _0x1195dc=ImageManager['loadPicture'](_0x519ec4),_0x1ddebc=_0x1195dc[_0x3a8417(0x12a)],_0x897b35=_0x1195dc[_0x3a8417(0x142)],_0x39e54b=Math['min'](_0x3d8ba4/_0x1ddebc,_0x1ca6b7/_0x897b35,_0x119cbd?0x1:0x3e8),_0x79d877=Math['ceil'](_0x1195dc[_0x3a8417(0x12a)]*_0x39e54b),_0x2f02f4=Math[_0x3a8417(0xdf)](_0x1195dc[_0x3a8417(0x142)]*_0x39e54b);_0xa36867+=(_0x3d8ba4-_0x79d877)/0x2,_0x3381e6+=(_0x1ca6b7-_0x2f02f4)/0x2,this[_0x3a8417(0x115)][_0x3a8417(0x1ca)](_0x1195dc,0x0,0x0,_0x1ddebc,_0x897b35,_0xa36867,_0x3381e6,_0x79d877,_0x2f02f4);},Window_SavefileList[_0x5dbc13(0x1e8)][_0x5dbc13(0x1bf)]=function(_0x1f8817,_0x4f9e1a,_0x3c06dd,_0x442f32,_0x5a1ec8){const _0x54157b=_0x5dbc13;if(_0x1f8817['playtime']){if(_0x54157b(0x118)!=='hVUsm')_0x5a1ec8=_0x5a1ec8||'left',this['drawText'](_0x1f8817['playtime'],_0x4f9e1a,_0x3c06dd,_0x442f32,_0x5a1ec8);else return _0x4e90e9[_0x54157b(0x1d7)][_0x54157b(0x108)][_0x54157b(0x21a)][_0x54157b(0x180)];}},Window_SavefileList[_0x5dbc13(0x1e8)]['drawTimestamp']=function(_0x49d17c,_0x3e0e44,_0x55ff1d,_0x1bdbb0,_0x560a22){const _0x15cf06=_0x5dbc13;if(_0x49d17c[_0x15cf06(0x131)]){if(_0x15cf06(0x1f5)===_0x15cf06(0x1f5)){_0x560a22=_0x560a22||'left';const _0x22f091=this[_0x15cf06(0x1a7)](_0x49d17c);this[_0x15cf06(0x1f1)](_0x22f091,_0x3e0e44,_0x55ff1d,_0x1bdbb0,_0x560a22);}else _0x331e9c['SaveCore'][_0x15cf06(0x15b)][_0x15cf06(0x1f7)](this),this[_0x15cf06(0x20e)]=![];}},Window_SavefileList['prototype'][_0x5dbc13(0x1a7)]=function(_0x36cec1){const _0x3464d6=_0x5dbc13,_0x4a6151=_0x36cec1[_0x3464d6(0x131)],_0x5f347c=new Date(_0x4a6151);let _0x38985c='[Year].[Month].[Date]\x20[Hour]:[Minute]:[Second]';_0x38985c=_0x38985c[_0x3464d6(0x20f)](/\[YEAR\]/gi,'%1'),_0x38985c=_0x38985c[_0x3464d6(0x20f)](/\[MONTH\]/gi,'%2'),_0x38985c=_0x38985c[_0x3464d6(0x20f)](/\[DATE\]/gi,'%3'),_0x38985c=_0x38985c[_0x3464d6(0x20f)](/\[HOUR\]/gi,'%4'),_0x38985c=_0x38985c[_0x3464d6(0x20f)](/\[MINUTE\]/gi,'%5'),_0x38985c=_0x38985c[_0x3464d6(0x20f)](/\[SECOND\]/gi,'%6');let _0xc584b3=String(_0x5f347c[_0x3464d6(0x13f)]())['split']('')['join']('​');return _0x38985c[_0x3464d6(0x240)](_0xc584b3['padStart'](0x4,'0'),String(_0x5f347c['getMonth']()+0x1)[_0x3464d6(0x1dc)](0x2,'0'),String(_0x5f347c['getDate']())[_0x3464d6(0x1dc)](0x2,'0'),String(_0x5f347c['getHours']())[_0x3464d6(0x1dc)](0x2,'0'),String(_0x5f347c[_0x3464d6(0x14d)]())[_0x3464d6(0x1dc)](0x2,'0'),String(_0x5f347c['getSeconds']())[_0x3464d6(0x1dc)](0x2,'0'));},Window_SavefileList[_0x5dbc13(0x1e8)]['drawCurrency']=function(_0x39a1dd,_0x11cc39,_0x60a5d0,_0xa85315){const _0x56514b=_0x5dbc13;if(_0x39a1dd[_0x56514b(0x22c)]===undefined)return;const _0x533b8e=_0x39a1dd[_0x56514b(0x22c)],_0x46142d=TextManager[_0x56514b(0x187)];Window_SavefileList[_0x56514b(0x1e8)][_0x56514b(0x204)]['call'](this,_0x533b8e,_0x46142d,_0x11cc39,_0x60a5d0,_0xa85315);},Window_SavefileList[_0x5dbc13(0x1e8)][_0x5dbc13(0x19b)]=function(_0x32f622,_0x244029,_0x1973c0,_0x148191,_0x2206ed){const _0x37812d=_0x5dbc13;if(_0x32f622['description']){const _0x19e493=this[_0x37812d(0x1d5)](_0x32f622[_0x37812d(0x23a)])[_0x37812d(0x12a)];_0x2206ed=_0x2206ed||'left';if(_0x2206ed===_0x37812d(0x1d2))_0x244029=_0x244029+_0x148191-_0x19e493;else{if(_0x2206ed==='center'){if(_0x37812d(0xd3)===_0x37812d(0xd3))_0x244029=_0x244029+(_0x148191-_0x19e493)/0x2;else{const _0x42c898=this[_0x37812d(0x1ba)](),_0x4aeebb=this['calcWindowHeight'](0x1,![]),_0x26c767=_0x1095cd[_0x37812d(0x12a)]-_0x42c898,_0x1a9d81=_0x4458ac[_0x37812d(0x142)]-_0x4aeebb;return new _0x5ca8ea(_0x26c767,_0x1a9d81,_0x42c898,_0x4aeebb);}}}this[_0x37812d(0x1c9)](_0x32f622[_0x37812d(0x23a)],_0x244029,_0x1973c0,_0x148191);}},Window_SavefileList['prototype'][_0x5dbc13(0x248)]=function(_0x38c45c,_0xd6682e){const _0x5ad468=_0x5dbc13;if(_0x38c45c){if(_0x5ad468(0x141)!=='HrKSs')return this[_0x5ad468(0x211)](_0xb1b8f1)?this[_0x5ad468(0x1c3)](_0x21a7d4):_0x1e01f9[_0x5ad468(0x1d7)]['Game_Switches_value'][_0x5ad468(0x1f7)](this,_0x53788e);else{const _0x4c7b26=ImageManager[_0x5ad468(0x14a)](_0x38c45c['picture']||'');_0x4c7b26[_0x5ad468(0x234)](this[_0x5ad468(0x122)]['bind'](this,_0x38c45c,_0xd6682e));}}else{if(_0x5ad468(0x1a2)!=='QaZDq'){const _0x5b2c44=_0x72d084['autosaveOption'],_0x3738ae=_0x5ad468(0x144);this['addCommand'](_0x5b2c44,_0x3738ae);}else this[_0x5ad468(0x24d)](this['_savefileId'],_0xd6682e);}},Window_SavefileList['prototype'][_0x5dbc13(0x122)]=function(_0x5e308a,_0x2c5e26){const _0x226d53=_0x5dbc13,_0x1b0589=this['menuStyle']();switch(_0x1b0589){case'vertical':this['drawVerticalStyleContents'](_0x5e308a,_0x2c5e26);break;case _0x226d53(0xc5):this[_0x226d53(0x178)](_0x5e308a,_0x2c5e26);break;case _0x226d53(0xf0):this[_0x226d53(0x189)](_0x5e308a,_0x2c5e26);break;default:this[_0x226d53(0x191)](_0x5e308a,_0x2c5e26);break;}this[_0x226d53(0x196)]();const _0x262d77=_0x5e308a[_0x226d53(0x1e2)];this[_0x226d53(0x24d)](_0x262d77,_0x2c5e26);},Window_SavefileList[_0x5dbc13(0x1e8)][_0x5dbc13(0x24d)]=function(_0x5c2b57,_0x42cbd7){const _0x39a6d8=_0x5dbc13,_0x5814a7=this[_0x39a6d8(0x1c2)]();switch(_0x5814a7){case _0x39a6d8(0xcb):this[_0x39a6d8(0x195)](_0x5c2b57,_0x42cbd7);break;case'box':this[_0x39a6d8(0x1eb)](_0x5c2b57,_0x42cbd7);break;case _0x39a6d8(0xf0):this['drawLargeStyleFileData'](_0x5c2b57,_0x42cbd7);break;default:this[_0x39a6d8(0x121)](_0x5c2b57,_0x42cbd7);break;}},Window_SavefileList[_0x5dbc13(0x1e8)]['drawListStyleContents']=function(_0x5654ea,_0x3536c3){const _0x1ea425=_0x5dbc13;VisuMZ['SaveCore'][_0x1ea425(0x108)][_0x1ea425(0x184)]['ListContentsJS'][_0x1ea425(0x1f7)](this,_0x5654ea,_0x3536c3);},Window_SavefileList[_0x5dbc13(0x1e8)][_0x5dbc13(0xf3)]=function(_0xc11cb2,_0x413b62){const _0x2b2d49=_0x5dbc13;VisuMZ[_0x2b2d49(0x1d7)][_0x2b2d49(0x108)]['SaveMenu'][_0x2b2d49(0xdd)][_0x2b2d49(0x1f7)](this,_0xc11cb2,_0x413b62);},Window_SavefileList[_0x5dbc13(0x1e8)][_0x5dbc13(0x178)]=function(_0x1499c6,_0x31277a){const _0x20b86c=_0x5dbc13;VisuMZ[_0x20b86c(0x1d7)][_0x20b86c(0x108)]['SaveMenu'][_0x20b86c(0x113)]['call'](this,_0x1499c6,_0x31277a);},Window_SavefileList[_0x5dbc13(0x1e8)][_0x5dbc13(0x189)]=function(_0x32d798,_0x3a4794){const _0xc588ab=_0x5dbc13;VisuMZ[_0xc588ab(0x1d7)][_0xc588ab(0x108)]['SaveMenu']['LargeContentsJS'][_0xc588ab(0x1f7)](this,_0x32d798,_0x3a4794);},Window_SavefileList[_0x5dbc13(0x1e8)][_0x5dbc13(0x121)]=function(_0x2f75ea,_0x42be5e){const _0x4f24e1=_0x5dbc13;VisuMZ[_0x4f24e1(0x1d7)]['Settings'][_0x4f24e1(0x184)][_0x4f24e1(0x1cf)][_0x4f24e1(0x1f7)](this,_0x2f75ea,_0x42be5e);},Window_SavefileList[_0x5dbc13(0x1e8)][_0x5dbc13(0x195)]=function(_0x4baee3,_0x307f45){const _0x4d3fad=_0x5dbc13;VisuMZ['SaveCore']['Settings'][_0x4d3fad(0x184)]['VertFileDataJS'][_0x4d3fad(0x1f7)](this,_0x4baee3,_0x307f45);},Window_SavefileList[_0x5dbc13(0x1e8)][_0x5dbc13(0x1eb)]=function(_0x113c5e,_0x1fa371){const _0x181ff3=_0x5dbc13;VisuMZ[_0x181ff3(0x1d7)][_0x181ff3(0x108)]['SaveMenu'][_0x181ff3(0x23f)]['call'](this,_0x113c5e,_0x1fa371);},Window_SavefileList[_0x5dbc13(0x1e8)][_0x5dbc13(0x101)]=function(_0x16d9d5,_0x30703b){const _0x57c956=_0x5dbc13;VisuMZ['SaveCore'][_0x57c956(0x108)]['SaveMenu'][_0x57c956(0x18d)][_0x57c956(0x1f7)](this,_0x16d9d5,_0x30703b);};