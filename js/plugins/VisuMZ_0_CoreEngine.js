//=============================================================================
// VisuStella MZ - Core Engine
// VisuMZ_0_CoreEngine.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_0_CoreEngine = true;

var VisuMZ = VisuMZ || {};
VisuMZ.CoreEngine = VisuMZ.CoreEngine || {};
VisuMZ.CoreEngine.version = 1.46;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 0] [Version 1.46] [CoreEngine]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Core_Engine_VisuStella_MZ
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Core Engine plugin is designed to fix any bugs that may have slipped
 * past RPG Maker MZ's source code and to give game devs more control over
 * RPG Maker MZ's various features, ranging from mechanics to aesthetics to
 * quality of life improvements.
 *
 * Features include all (but not limited to) the following:
 *
 * * Bug fixes for the problems existing in the RPG Maker MZ base code.
 * * Failsafes added for Script Call related event commands.
 * * Lots of Quality of Life Settings that can be activated through the
 *   Plugin Parameters.
 * * Control over the various Text Colors used throughout the game.
 * * Change up the maximum amount of gold carried, give it an icon attached to
 *   the label, and include text for overlap specifics.
 * * Preload images as the game boots up.
 * * Add specific background images for menus found throughout the game.
 * * A button assist window will appear at the top or bottom of the screen,
 *   detailing which buttons do what when inside a menu. This feature can be
 *   turned off.
 * * Choose which in-game battler parameters to display inside menus (ie ATK,
 *   DEF, AGI, etc.) and determine their maximum values, along with plenty of
 *   notetags to give more control over parameter, x-parameter, s-parameter
 *   bonuses through equipment, states, and other trait objects.
 * * Control over how the UI objects appear (such as the menu button, cancel
 *   button, left/right actor switch buttons).
 * * Reposition actors and enemies if the battle resolution is larger.
 * * Allow class names and nicknames to support text codes when displayed.
 * * Determine how windows behave in the game, if they will mask other windows,
 *   their line height properties, and more.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 0 ------
 *
 * This plugin is a Tier 0 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ Plugin library.
 *
 * ============================================================================
 * Important Changes: Bug Fixes
 * ============================================================================
 *
 * This plugin also serves to fix various bugs found in RPG Maker MZ that have
 * been unaddressed or not yet taken care of. The following is a list of bugs
 * that have been fixed by this plugin:
 *
 * ---
 *
 * Attack Skill Trait
 *
 * Enemies are unaffected by the Attack Skill Trait. This means if they have
 * an Attack action, they will always use Attack over and over even if their
 * Attack Skill Trait has been changed. This plugin will change it up so that
 * the Attack skill will comply with whatever their Attack Skill Trait's skill
 * is set to.
 *
 * ---
 *
 * Auto Battle Actor Skill Usage
 *
 * If an actor with Auto Battle has access to a skill but not have any access
 * to that skill's type, that actor will still be able to use the skill during
 * Auto Battle despite the fact that the actor cannot use that skill during
 * manual input.
 *
 * ---
 * 
 * Auto Battle Lock Up
 * 
 * If an auto battle Actor fights against an enemy whose DEF/MDF is too high,
 * they will not use any actions at all. This can cause potential game freezing
 * and softlocks. This plugin will change that and have them default to a
 * regular Attack.
 * 
 * ---
 * 
 * Gamepad Repeat Input
 * 
 * Cleared inputs on gamepads do not have a downtime and will trigger the
 * following input frame. The causes problems with certain RPG Maker MZ menus
 * where the inputs have to be cleared as the next immediate frame will have
 * them inputted again. This plugin changes it so that whenever inputs are
 * cleared, there is a downtime equal to the keyboard clear frames before the
 * gamepad input is registered once more.
 * 
 * ---
 * 
 * Invisible Battle Sprites
 * 
 * If you removed a party member during battle and added that exact party
 * member back into the same slot, their sprite would appear invisible. The
 * VisuStella Core Engine will fix this problem and prevent it from happening.
 * 
 * ---
 * 
 * Instant Text Discrepancy for Window_Message
 * 
 * Window_Message displays text differently when it draws letters one by one
 * versus when the text is displayed instantly. This isn't noticeable with the
 * default font, but it's very visible when using something like Arial. The
 * error is due to Bitmap.measureTextWidth yielding a rounded value per letter
 * versus per word. The Core Engine will provide a bug fix that will single out
 * the cause and make it so that only Window_Message will not utilize any round
 * number values when determining the width of each letter, whether or not it
 * is shown instantly. This change will only affect Window_Message and not any
 * other window in order to prevent unintended side effects.
 * 
 * ---
 *
 * Move Picture, Origin Differences
 *
 * If a Show Picture event command is made with an Origin setting of
 * "Upper Left" and a Move Picture event command is made afterwards with an
 * Origin setting of "Center", RPG Maker MZ would originally have it instantly
 * jump into the new origin setting without making a clean transition between
 * them. This plugin will create that clean transition between origins.
 *
 * ---
 * 
 * Termination Clear Effects
 * 
 * In RPG Maker MZ, requesting an animation while transitioning between
 * scenes, such as going from the map scene to the battle scene, can cause
 * crashes. This is because the animation queue does not take off immediately
 * and will likely register incorrect targets for the scene. This plugin will
 * forcefully clear any registered animations and balloon effects when
 * terminating a scene in order to prevent crashes.
 * 
 * ---
 * 
 * Timer Sprite
 * 
 * By default, RPG Maker MZ adds Sprite_Timer into its spriteset, either for
 * maps or for battles. There is one major problem with this: when spritesets
 * are affected by filters, zooms, and/or blurs, this hinders how readable the
 * timer sprite is, making the information perceived by the player to be much
 * harder than it needs to be. The Core Engine adds the sprite to the parent
 * scene instead of the spriteset to ensure it's unobscured by anything else.
 * 
 * ---
 * 
 * Unusable Battle Items
 * 
 * If any party member is able to use an item in battle, then all party members
 * are able to use said item, even if that party member is supposed to be
 * unable to use that item. This is now changed so that battle items are
 * checked on an individual basis and not on a party-wide basis.
 * 
 * ---
 * 
 * Window Arrows Sprite Tearing
 * 
 * If a window object in RPG Maker MZ were to have an odd number for width size
 * then the arrow elements found for the window would be positioned on a half
 * pixel, giving it a blurry look and also have sprite tearing issues. This is
 * now fixed by rounding the number to the nearest whole number.
 * 
 * ---
 * 
 * Window Client Area Scaling Bug
 * 
 * If the window has a scale value different from 1.0, the client area (the
 * interactable parts) will not scale properly and appear clipped out. This
 * is now fixed by adjusting the client area to the window's scale values and
 * rounding upward to the nearest whole number.
 * 
 * ---
 * 
 * Window Skin Bleeding
 * 
 * This bug is fixed in the core scripts for RPG Maker MZ v1.3.0+.
 * 
 * Since the v1.2.0 update, Window.prototype._refreshBack's frame value has
 * been set from 96 to 95. This results in the window skin bleeding past the
 * window's intended borders. The Core Engine now reverts this change to
 * prevent the bleeding effect from happening.
 * 
 * ---
 *
 * ============================================================================
 * Major Changes: New Hard-Coded Features
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 *
 * Scroll-Linked Pictures
 *
 * - If a Parallax has a ! at the start of its filename, it is bound to the map
 * scrolling. The same thing now happens with pictures. If a Picture has a ! at
 * the start of its filename, it is bound to the map's scrolling as well.
 *
 * ---
 *
 * Movement Route Scripts
 *
 * - If code in a Movement Route Script command fails, instead of crashing the
 * game, it will now act as if nothing happened except to display the cause of
 * the error inside the console.
 *
 * ---
 * 
 * Script Call Failsafes
 * 
 * - If code found in Conditional Branches, Control Variables, and/or Script
 * Calls fail to activate, instead of crashing the game, it will now act as if
 * nothing happened except to display the cause of the error inside the
 * console.
 * 
 * ---
 * 
 * Digit Grouping
 * 
 * - There exists an option to change how numbers are displayed and converted
 * in your game. This option can be enabled or disabled by going into the
 * Plugin Manager > VisuMZ_0_OptionsCore > Quality of Life Settings >
 * Digit Grouping and toggling on/off whichever ones you want.
 * 
 * - Digit Grouping will follow the rules of whatever country/locale the Plugin
 * Parameters are set to. If it's to default 'en-US', then 1234567.123456 will
 * become 1,234,567.123456. Set it to 'es-ES' and it becomes 1.234.567,123456
 * instead.
 * 
 * - This uses JavaScript's Number.toLocaleString() function and will therefore
 * follow whatever rules it has. This means if there are trailing zeroes at the
 * end of a decimal, it will cut them off. Numbers like 123.45000 will become
 * 123.45 instead. Excess numbers past 6 decimal places will be rounded. A
 * number like 0.123456789 will become 0.123457 instead.
 * 
 * - Numbers in between [ and ], < and > will be excluded from digit grouping
 * in order for text codes to be preserved accurately. \I[1234] will remain as
 * \I[1234].
 * 
 * - If you would like to enter in a number without digit grouping, surround it
 * with {{ and }}. Typing in {{1234567890}} will yield 1234567890.
 * 
 * ---
 * 
 * Show Scrolling Text, additional functionality
 * 
 * The event command "Show Scrolling Text" now has additional functionality as
 * long as the VisuStella MZ Core Engine is installed. If the game dev inserts
 * "// Script Call" (without the quotes) inside the scrolling text, then the
 * entirity of the Show Scrolling Text event command will be ran as a giant
 * script call event command.
 * 
 * The reason why this functionality is added is because the "Script..." event
 * command contains only 12 lines maximum. This means for any script call
 * larger than 12 lines of code cannot be done by normal means as each script
 * call is ran as a separate instance.
 * 
 * By repurposing the "Show Scrolling Text" event command to be able to
 * function as an extended "Script..." event command, such a thing is now
 * possible with less hassle and more lines to code with.
 * 
 * This effect does not occur if the Show Scrolling Text event command does not
 * have "// Script Call" in its contents.
 * 
 * ---
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * The following are notetags that have been added through this plugin. These
 * notetags will not work with your game if this plugin is OFF or not present.
 *
 * === Actors ===
 *
 * Parameter limits can be adjusted in the Plugin Parameters, but this won't
 * lift the ability to change the values of an actor's initial or max level
 * past the editor's limits. Instead, this must be done through the usage of
 * notetags to accomplish the feat.
 *
 * ---
 *
 * <Max Level: x>
 *
 * - Used for: Actor Notetags
 * - Replace 'x' with an integer to determine the actor's max level.
 * - This allows you to go over the database limit of 99.
 * - If this notetag isn't used, default to the actor's database value.
 *
 * ---
 *
 * <Initial Level: x>
 *
 * - Used for: Actor Notetags
 * - Replace 'x' with an integer to determine the actor's initial level.
 * - This allows you to go over the database limit of 99.
 * - If this notetag isn't used, default to the actor's database value.
 *
 * ---
 *
 * === Classes ===
 *
 * As actor levels can now surpass 99 due to the notetag system, there may be
 * some skills you wish certain classes can learn upon reaching higher levels
 * past 99, too.
 *
 * ---
 * 
 * <Learn At Level: x>
 *
 * - Used for: Class Skill Learn Notetags
 * - Replace 'x' with an integer to determine the level this class will learn
 *   the associated skill at.
 * - This allows you to go over the database limit of 99.
 * - If this notetag isn't used, default to the class's database value.
 *
 * ---
 *
 * === Enemies ===
 *
 * Enemies are now given levels. The levels don't do anything except to serve
 * as a container for a number value. This way, levels can be used in damage
 * formulas (ie. a.atk - b.level) without causing any errors. To give enemies
 * levels, use the notetags below. These notetags also allow you to adjust the
 * base parameters, EXP, and Gold past the database limitations.
 *
 * ---
 *
 * <Level: x>
 *
 * - Used for: Enemy Notetags
 * - Replace 'x' with an integer to determine the enemy's level.
 * - If no level is declared, the level will default to 1.
 *
 * ---
 *
 * <param: x>
 *
 * - Used for: Enemy Notetags
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to alter.
 *   - This notetag does NOT work with X Parameters, S Parameters, or any
 *     custom parameters. This notetag ONLY works with the base parameters.
 * - Replace 'x' with an integer to set an enemy's 'param' base value.
 * - This will overwrite the enemy's database value and can exceed the original
 *   value limitation in the database.
 * - If these notetags aren't used, default to the enemy's database value.
 *
 * ---
 *
 * <EXP: x>
 * <Gold: x>
 *
 * - Used for: Enemy Notetags
 * - Replace 'x' with an integer to determine the enemy's EXP or Gold values.
 * - This will overwrite the enemy's database value and can exceed the original
 *   value limitation in the database.
 * - If these notetags aren't used, default to the enemy's database value.
 *
 * ---
 * 
 * === Animations ===
 * 
 * Animations in RPG Maker MZ are done by Effekseer and the animation system
 * has been revamped. However, the animations are only centered on the targets
 * now, and cannot be attached to the head or foot. Insert these tags into
 * the names of the animations in the database to adjust their positions.
 * 
 * ---
 * 
 * <Head>
 * <Foot>
 * 
 * - Used for: Animation Name Tags
 * - Will set the animation to anchor on top of the sprite (if <Head> is used)
 *   or at the bottom of the sprite (if <Foot> is used).
 * 
 * ---
 * 
 * <Anchor X: x>
 * <Anchor Y: y>
 * 
 * <Anchor: x, y>
 * 
 * - Used for: Animation Name Tags
 * - Will anchor the animation at a specific point within the sprite based on
 *   the 'x' and 'y' values.
 * - Replace 'x' and 'y' with numeric values representing their positions based
 *   on a rate where 0.0 is the furthest left/up (x, y respectively) to 1.0 for
 *   the furthest right/down (x, y respectively).
 * 
 * Examples:
 * 
 * <Anchor X: 0.4>
 * <Anchor Y: 0.8>
 * 
 * <Anchor: 0.2, 0.9>
 * 
 * ---
 * 
 * <Offset X: +x>
 * <Offset X: -x>
 * <Offset Y: +y>
 * <Offset Y: -y>
 * 
 * <Offset: +x, +y>
 * <Offset: -x, -y>
 * 
 * - Used for: Animation Name Tags
 * - Will anchor the animation to be offset by an exact number of pixels.
 * - This does the same the editor does, except it lets you input values
 *   greater than 999 and lower than -999.
 * - Replace 'x' and 'y' with numeric values the exact number of pixels to
 *   offset the animation's x and y coordinates by.
 * 
 * Examples:
 * 
 * <Offset X: +20>
 * <Offset Y: -50>
 * 
 * <Offset: +10, -30>
 * 
 * ---
 * 
 * <Mirror Offset X>
 * <No Mirror Offset X>
 * 
 * - Used for: Animation Name Tags
 * - If an animation is mirrored, you can choose to have the animation's Offset
 *   X value be mirrored, too (or not at all).
 * - If no name tag is discovered, this will use the setting found in the
 *   Plugin Parameters > QoL Settings > Misc > Ani: Mirror Offset X setting.
 * 
 * ---
 *
 * === Quality of Life ===
 *
 * By default, RPG Maker MZ does not offer an encounter step minimum after a
 * random encounter has finished. This means that one step immediately after
 * finishing a battle, the player can immediately enter another battle. The
 * Quality of Life improvement: Minimum Encounter Steps allows you to set a
 * buffer range between battles for the player to have some breathing room.
 *
 * ---
 *
 * <Minimum Encounter Steps: x>
 *
 * - Used for: Map Notetags
 * - Replace 'x' with the minimum number of steps before the player enters a
 *   random encounter on that map.
 * - If this notetag is not used, then the minimum encounter steps for the map
 *   will default to Quality of Life Settings => Encounter Rate Min.
 *
 * ---
 *
 * Tile shadows are automatically added to certain tiles in the map editor.
 * These tile shadows may or may not fit some types of maps. You can turn them
 * on/off with the Quality of Life Plugin Parameters or you can override the
 * settings with the following notetags:
 *
 * ---
 *
 * <Show Tile Shadows>
 * <Hide Tile Shadows>
 *
 * - Used for: Map Notetags
 * - Use the respective notetag for the function you wish to achieve.
 * - If this notetag is not used, then the minimum encounter steps for the map
 *   will default to Quality of Life Settings => No Tile Shadows.
 *
 * ---
 *
 * === Basic, X, and S Parameters ===
 *
 * A battler's parameters, or stats as some devs know them as, are the values
 * that determine how a battler performs. These settings allow you to alter
 * behaviors and give boosts to trait objects in a more controlled manner.
 *
 * ---
 *
 * <param Plus: +x>
 * <param Plus: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'param' plus value when calculating totals.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with an integer on how much to adjust the parameter by.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <param Rate: x%>
 * <param Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes 'param' rate to 'x' to alter the total 'param' value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <param Flat: +x>
 * <param Flat: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'param' plus value when calculating totals.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with an integer on how much to adjust the parameter by.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <param Max: x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Sets max caps for the 'param' to be 'x'. If there are multiple max caps
 *   available to the unit, then the highest will be selected.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with an integer to determine what the max cap should be.
 *
 * ---
 *
 * <xparam Plus: +x%>
 * <xparam Plus: -x%>
 *
 * <xparam Plus: +x.x>
 * <xparam Plus: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'xparam' plus value when calculating totals.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <xparam Rate: x%>
 * <xparam Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes 'param' rate to 'x' to alter the total 'xparam' value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <xparam Flat: +x%>
 * <xparam Flat: -x%>
 *
 * <xparam Flat: +x.x>
 * <xparam Flat: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'xparam' plus value when calculating totals.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <sparam Plus: +x%>
 * <sparam Plus: -x%>
 *
 * <sparam Plus: +x.x>
 * <sparam Plus: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'sparam' plus value when calculating totals.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <sparam Rate: x%>
 * <sparam Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes 'param' rate to 'x' to alter the total 'sparam' value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <sparam Flat: +x%>
 * <sparam Flat: -x%>
 *
 * <sparam Flat: +x.x>
 * <sparam Flat: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'sparam' plus value when calculating totals.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * === JavaScript Notetags: Basic, X, and S Parameters ===
 *
 * The following are notetags made for users with JavaScript knowledge. These
 * notetags are primarily aimed at Basic, X, and S Parameters.
 *
 * ---
 *
 * <JS param Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'param' plus value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   plus amount for the parameter's total calculation.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <JS param Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'param' rate value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   param rate amount for the parameter's total calculation.
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <JS param Flat: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'param' flat value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   flat bonus amount for the parameter's total calculation.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <JS param Max: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to determine what the max cap for 'param' should be. If there
 *   are multiple max caps available to the unit, then the highest is selected.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine the max cap for the
 *   desired parameter.
 *
 * ---
 *
 * <JS xparam Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'xparam' plus value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   plus amount for the X parameter's total calculation.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <JS xparam Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'xparam' rate value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   param rate amount for the X parameter's total calculation.
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <JS xparam Flat: code>
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'xparam' flat value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   flat bonus amount for the X parameter's total calculation.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <JS sparam Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'sparam' plus value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   plus amount for the S parameter's total calculation.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <JS sparam Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'sparam' rate value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   param rate amount for the S parameter's total calculation.
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <JS sparam Flat: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'sparam' flat value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   flat bonus amount for the S parameter's total calculation.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 * 
 * === Battle Setting-Related Notetags ===
 * 
 * These tags will change the settings for battle regardless of how the battle
 * system is set up normally. Insert these tags in either the noteboxes of maps
 * or the names of troops for them to take effect. If both are present for a
 * specific battle, then priority goes to the setting found in the troop name.
 * 
 * ---
 * 
 * <FV>
 * <Front View>
 * <Battle View: FV>
 * <Battle View: Front View>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the perspective of battle to front view for this specific map or
 *   battle.
 * - Make sure you have the enemy image files available in the img/enemies/
 *   folder as they will used instead of the "sv_enemies" graphics.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <SV>
 * <Side View>
 * <Battle View: SV>
 * <Battle View: Side View>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the perspective of battle to side view for this specific map or
 *   battle.
 * - Make sure you have the enemy image files available in the img/sv_enemies/
 *   folder as they will used instead of the "enemies" graphics.
 * - Make sure your actors have "sv_actor" graphics attached to them.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <DTB>
 * <Battle System: DTB>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the battle system to the default battle system (DTB).
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <TPB Active>
 * <ATB Active>
 * <Battle System: TPB Active>
 * <Battle System: ATB Active>
 * 
 * <TPB Wait>
 * <ATB Wait>
 * <Battle System: TPB Wait>
 * <Battle System: ATB Wait>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the battle system to the time progress battle system (TPB) or
 *   active turn battle system (ATB) if you have VisuMZ_2_BattleSystemATB
 *   installed for the game project.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <BTB>
 * <Battle System: BTB>
 * 
 * <CTB>
 * <Battle System: CTB>
 * 
 * <ETB>
 * <Battle System: ETB>
 * 
 * <FTB>
 * <Battle System: FTB>
 * 
 * <OTB>
 * <Battle System: OTB>
 * 
 * <PTB>
 * <Battle System: PTB>
 * 
 * <STB>
 * <Battle System: STB>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the battle system to the respective battle system as long as you
 *   have those plugins installed in the current project.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
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
 * === Animation Commands ===
 * 
 * ---
 * 
 * Animation: Play at Coordinate
 * - Plays an animation on the screen at a specific x, y coordinate even if
 *   there is no sprite attached.
 * 
 *   Animation ID:
 *   - Plays this animation.
 * 
 *   Coordinates:
 * 
 *     X:
 *     Y:
 *     - X/Y coordinate used for the animation.
 *       You may use JavaScript code.
 * 
 *   Mirror Animation?:
 *   - Mirror the animation?
 * 
 *   Mute Animation?:
 *   - Mute the animation?
 * 
 * ---
 * 
 * === Export Plugin Commands ===
 * 
 * ---
 * 
 * Export: All Maps Text
 * - PLAY TEST ONLY. Exports all of the text from all maps,
 *   their events, event pages, and any associated Common Events.
 * 
 *   - Exports 'Show Text' event commands.
 *   - Exports 'Show Choices' event commands.
 *   - Exports 'Show Scrolling Text' event commands.
 *   - Exports 'Comments' event commands.
 *   - Only the raw text will be exported.
 *   - Only usable during Play Test.
 * 
 * ---
 * 
 * Export: All Troops Text
 * - PLAY TEST ONLY. Exports all of the text from all troops,
 *   their event pages, and any associated Common Events.
 * 
 *   - Exports 'Show Text' event commands.
 *   - Exports 'Show Choices' event commands.
 *   - Exports 'Show Scrolling Text' event commands.
 *   - Exports 'Comments' event commands.
 *   - Only the raw text will be exported.
 *   - Only usable during Play Test.
 * 
 * ---
 * 
 * Export: Current Map Text
 * - PLAY TEST ONLY. Exports all of the text on the current map,
 *   its events, the event pages, and any associated Common Events.
 * 
 *   - Exports 'Show Text' event commands.
 *   - Exports 'Show Choices' event commands.
 *   - Exports 'Show Scrolling Text' event commands.
 *   - Exports 'Comments' event commands.
 *   - Only the raw text will be exported.
 *   - Only usable during Play Test.
 *   - If not in battle, this Plugin Command will not work.
 * 
 * ---
 * 
 * Export: Current Troop Text
 * - PLAY TEST ONLY. Exports all of the text on the current troop,
 *   the troop's event pages, and any associated Common Events.
 * 
 *   - Exports 'Show Text' event commands.
 *   - Exports 'Show Choices' event commands.
 *   - Exports 'Show Scrolling Text' event commands.
 *   - Exports 'Comments' event commands.
 *   - Only the raw text will be exported.
 *   - Only usable during Play Test.
 *   - If not in battle, this Plugin Command will not work.
 * 
 * ---
 * 
 * === Game Plugin Commands ===
 * 
 * ---
 *
 * Game: Open URL
 * - Opens a website URL from the game.
 *
 *   URL:
 *   - Where do you want to take the player?
 *
 * ---
 * 
 * === Gold Plugin Commands ===
 * 
 * ---
 *
 * Gold: Gain/Lose
 * - Allows you to give/take more gold than the event editor limit.
 *
 *   Value:
 *   - How much gold should the player gain/lose?
 *   - Use negative values to remove gold.
 *
 * ---
 * 
 * === Picture Plugin Commands ===
 * 
 * ---
 * 
 * Picture: Coordinates Mode
 * - Play Test Mode only! Gets the coordinates of a specific picture as you
 *   move it across the screen.
 * 
 *   Picture ID: 
 *   - The ID of the pictures to track the coordinates of.
 * 
 * ---
 *
 * Picture: Easing Type
 * - Changes the easing type to a number of options.
 *
 *   Picture ID:
 *   - Which picture do you wish to apply this easing to?
 *
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 *
 *   Instructions:
 *   - Insert this Plugin Command after a "Move Picture" event command.
 *   - Turn off "Wait for Completion" in the "Move Picture" event.
 *   - You may have to add in your own "Wait" event command after.
 *
 * ---
 * 
 * Picture: Erase All
 * - Erases all pictures on the screen because it's extremely tedious to do it
 *   one by one.
 * 
 * ---
 * 
 * Picture: Erase Range
 * - Erases all pictures within a range of numbers because it's extremely
 *   tedious to do it one by one.
 * 
 *   Starting ID:
 *   - The starting ID of the pictures to erase.
 * 
 *   Ending ID:
 *   - The ending ID of the pictures to erase.
 * 
 * ---
 * 
 * Picture: Show Icon
 * - Shows an icon instead of a picture image.
 * - The picture icon can be controlled like any other picture.
 * 
 *   General:
 *
 *     Picture ID Number:
 *     - What is the ID of the picture you wish to show at?
 *     - Use a number between 1 and 100.
 *     - You may use JavaScript code.
 *
 *     Icon Index:
 *     - Select the icon index to use for this picture.
 *     - You may use JavaScript code.
 *
 *     Smooth Icon?:
 *     - This will make the icon smoothed out or pixelated.
 * 
 *   Picture Settings:
 * 
 *     Position:
 *
 *       Origin:
 *       - What is the origin of this picture icon?
 *         - Upper Left
 *         - Center
 *
 *       Position X:
 *       - X coordinate of the picture.
 *       - You may use JavaScript code.
 *
 *       Position Y:
 *       - Y coordinate of the picture.
 *       - You may use JavaScript code.
 * 
 *     Scale:
 *
 *       Width %:
 *       - Horizontal scale of the picture.
 *       - You may use JavaScript code.
 *       - 100 is 100%
 *
 *       Height %:
 *       - Vertical scale of the picture.
 *       - You may use JavaScript code.
 *       - 100 is 100%
 * 
 *     Blend:
 *
 *       Opacity:
 *       - Insert a number to determine opacity level.
 *       - Use a number between 0 and 255.
 *       - You may use JavaScript code.
 *
 *       Blend Mode:
 *       - What kind of blend mode do you wish to apply to the picture?
 * 
 * ---
 * 
 * === Screen Shake Plugin Commands ===
 * 
 * ---
 * 
 * Screen Shake: Custom:
 * - Creates a custom screen shake effect and also sets the following uses of
 *   screen shake to this style.
 * 
 *   Shake Style:
 *   - Select shake style type.
 *   - Original
 *   - Random
 *   - Horizontal
 *   - Vertical
 * 
 *   Power:
 *   - Power level for screen shake.
 * 
 *   Speed:
 *   - Speed level for screen shake.
 * 
 *   Duration:
 *   - Duration of screenshake.
 *   - You can use code as well.
 * 
 *   Wait for Completion:
 *   - Wait until completion before moving onto the next event?
 * 
 * ---
 * 
 * === Switch Plugin Commands ===
 * 
 * ---
 * 
 * Switches: Randomize ID(s)
 * - Select specific Switch ID's to randomize ON/OFF.
 * 
 *   Switch ID(s):
 *   - Select which Switch ID(s) to toggle.
 * 
 *   Chance for ON:
 *   - Chance out of 100 that determines the switches to be ON.
 * 
 * ---
 *
 * Switches: Randomize Range
 * - Select specific Switch ID Range to randomize ON/OFF.
 * - The ratio determines the ON/OFF distribution.
 *
 *   Starting ID:
 *   - The starting ID of the Switch to toggle.
 *
 *   Ending ID:
 *   - The ending ID of the Switch to toggle.
 *
 *   Chance for ON:
 *   - Chance out of 100 that determines the switches to be ON.
 *
 * ---
 *
 * Switches: Toggle ID(s)
 * - Select specific Switch ID's to toggle ON/OFF.
 * - ON becomes OFF. OFF becomes ON.
 *
 *   Switch ID(s):
 *   - Select which Switch ID(s) to toggle.
 *
 * ---
 *
 * Switches: Toggle Range
 * - Select specific Switch ID Range to toggle ON/OFF.
 * - ON becomes OFF. OFF becomes ON.
 *
 *   Starting ID:
 *   - The starting ID of the Switch to toggle.
 *
 *   Ending ID:
 *   - The ending ID of the Switch to toggle.
 *
 * ---
 * 
 * === System Plugin Commands ===
 * 
 * ---
 *
 * System: Battle System Change
 * - Switch to a different battle system in-game.
 * - Some battle systems REQUIRE their specific plugins!
 *
 *   Change To:
 *   - Choose which battle system to switch to.
 *     - Database Default (Use game database setting)
 *     - -
 *     - DTB: Default Turn Battle
 *     - TPB Active: Time Progress Battle (Active)
 *     - TPB Wait: Time Progress Battle (Wait)
 *     - -
 *     - BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 *     - CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 *     - OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 *     - STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 *
 * ---
 * 
 * System: Load Images
 * - Allows you to (pre) load up images ahead of time.
 *
 *   img/animations/:
 *   img/battlebacks1/:
 *   img/battlebacks2/:
 *   img/enemies/:
 *   img/faces/:
 *   img/parallaxes/:
 *   img/pictures/:
 *   img/sv_actors/:
 *   img/sv_enemies/:
 *   img/system/:
 *   img/tilesets/:
 *   img/titles1/:
 *   img/titles2/:
 *   - Which files do you wish to load from this directory?
 * 
 * ---
 *
 * System: Main Font Size
 * - Set the game's main font size.
 *
 *   Change To:
 *   - Change the font size to this number.
 *
 * ---
 *
 * System: Side View Battle
 * - Switch between Front View or Side View for battle.
 *
 *   Change To:
 *   - Choose which view type to switch to.
 *
 * ---
 *
 * System: Window Padding
 * - Change the game's window padding amount.
 *
 *   Change To:
 *   - Change the game's standard window padding to this value.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Quality of Life Settings
 * ============================================================================
 *
 * A variety of (optional) settings and changes are added with the Core Engine
 * to improve the quality of life for both the game devs and players alike.
 *
 * ---
 *
 * Play Test
 * 
 *   New Game on Boot:
 *   - Automatically start a new game on Play Test?
 *   - Only enabled during Play Test.
 *
 *   No Play Test Mode:
 *   - Force the game to be out of Play Test mode when play testing.
 * 
 *   Open Console on Boot:
 *   - Open the Debug Console upon booting up your game?
 *   - Only enabled during Play Test.
 *
 *   F6: Toggle Sound:
 *   - F6 Key Function: Turn on all sound to 100% or to 0%, toggling between
 *     the two.
 *   - Only enabled during Play Test.
 *
 *   F7: Toggle Fast Mode:
 *   - F7 Key Function: Toggle fast mode.
 *   - Only enabled during Play Test.
 *
 *   New Game > Common Event:
 *   - Runs a common event each time a new game is started.
 *   - Only enabled during Play Test.
 *
 * ---
 * 
 * Battle Test
 * 
 *   Add Item Type:
 *   Add Weapon Type:
 *   Add Armor Type:
 *   - Add copies of each database item, weapon, and/or armor?
 *   - Effective only during battle test.
 * 
 *   Added Quantity:
 *   - Determines how many items are added during a battle test instead of
 *     the maximum amount.
 * 
 * ---
 *
 * Digit Grouping
 *
 *   Standard Text:
 *   - Make numbers like 1234567 appear like 1,234,567 for standard text
 *     inside windows?
 *
 *   Ex Text:
 *   - Make numbers like 1234567 appear like 1,234,567 for ex text,
 *     written through drawTextEx (like messages)?
 *
 *   Damage Sprites:
 *   - Make numbers like 1234567 appear like 1,234,567 for in-battle
 *     damage sprites?
 *
 *   Gauge Sprites:
 *   - Make numbers like 1234567 appear like 1,234,567 for visible gauge
 *     sprites such as HP, MP, and TP gauges?
 * 
 *   Country/Locale
 *   - Base the digit grouping on which country/locale?
 *   - This will follow all of the digit grouping rules found here:
 *     https://www.w3schools.com/JSREF/jsref_tolocalestring_number.asp
 *
 * ---
 *
 * Player Benefit
 *
 *   Encounter Rate Min:
 *   - Minimum number of steps the player can take without any
 *     random encounters.
 *
 *   Escape Always:
 *   - If the player wants to escape a battle, let them escape the battle
 *     with 100% chance.
 *
 *   Accuracy Formula:
 *   - Accuracy formula calculation change to
 *     Skill Hit% * (User HIT - Target EVA) for better results.
 *
 *   Accuracy Boost:
 *   - Boost HIT and EVA rates in favor of the player.
 *
 *   Level Up -> Full HP:
 *   Level Up -> Full MP:
 *   - Recovers full HP or MP when an actor levels up.
 *
 * ---
 *
 * Misc
 * 
 *   Animation: Mirror Offset X:
 *   - When animations are mirrored, mirror their Offset X values, too.
 *   - The animation name tags <Mirror Offset X> and <No Mirror Offset X> will
 *     override this effect for that specific animation.
 * 
 *   Anti-Zoom Pictures:
 *   - If on, prevents pictures from being affected by zoom.
 *
 *   Font Shadows:
 *   - If on, text uses shadows instead of outlines.
 *
 *   Font Smoothing:
 *   - If on, smoothes fonts shown in-game.
 *
 *   Key Item Protection:
 *   - If on, prevents Key Items from being able to be sold and from being
 *     able to be consumed.
 *
 *   Modern Controls:
 *   - If on, allows usage of the Home/End buttons.
 *   - Home would scroll to the first item on a list.
 *   - End would scroll to the last item on a list.
 *   - Shift + Up would page up.
 *   - Shift + Down would page down.
 * 
 *   NewGame > CommonEvent:
 *   - Runs a common event each time a new game during any session is started.
 *   - Applies to all types of sessions, play test or not.
 *
 *   No Tile Shadows:
 *   - Removes tile shadows from being displayed in-game.
 *
 *   Pixel Image Rendering:
 *   - If on, pixelates the image rendering (for pixel games).
 *
 *   Require Focus?
 *   - Requires the game to be focused? If the game isn't focused, it will
 *     pause if it's not the active window.
 *
 *   Smart Event Collision:
 *   - Makes events only able to collide with one another if they're
 *    'Same as characters' priority.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Battle System
 * ============================================================================
 * 
 * Choose which battle system to use for your game.
 * 
 * Some battle systems REQUIRE their specific plugins! This means if you do not
 * have the required battle system plugin installed, it will not change over.
 * The Core Engine plugin does not contain data for all of the battle systems
 * inside its code.
 * 
 * ---
 * 
 *   Database Default (Use game database setting)
 * 
 *   -
 * 
 *   DTB: Default Turn Battle
 *   TPB Active: Time Progress Battle (Active)
 *   TPB Wait: Time Progress Battle (Wait)
 * 
 *   -
 * 
 *   BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 *   CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 *   ETB: Energy Turn Battle (Req VisuMZ_2_BattleSystemETB)
 *   FTB: Free Turn Battle (Req VisuMZ_2_BattleSystemFTB)
 *   OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 *   PTB: Press Turn Battle (Req VisuMZ_2_BattleSystemPTB)
 *   STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 * 
 *   -
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Color Settings
 * ============================================================================
 *
 * These settings allow you, the game dev, to have more control over which
 * colors appear for what conditions found in the game. You can use regular
 * numbers to use the colors predetermined by the game's Window Skin or you
 * can use the #rrggbb format for a hex color code.
 * 
 * If the game's Window Skin is changed mid-game, the colors used will still be
 * based off the default Window Skin's colors. This is due to storing them in a
 * cache and preventing extra processing and reduces lag.
 *
 * You can find out what hex codes belong to which color from this website:
 * https://htmlcolorcodes.com/
 *
 * ---
 *
 * Basic Colors
 * - These are colors that almost never change and are used globally throughout
 *   the in-game engine.
 *
 *   Normal:
 *   System:
 *   Crisis:
 *   Death:
 *   Gauge Back:
 *   HP Gauge:
 *   MP Gauge:
 *   MP Cost:
 *   Power Up:
 *   Power Down:
 *   CT Gauge:
 *   TP Gauge:
 *   Pending Color:
 *   EXP Gauge:
 *   MaxLv Gauge:
 *   - Use #rrggbb for custom colors or regular numbers
 *   for text colors from the Window Skin.
 *
 * ---
 *
 * Alpha Colors:
 * - These are colors that have a bit of transparency to them and are specified
 *   by the 'rgba(red, green, blue, alpha)' format.
 * - Replace 'red' with a number between 0-255 (integer).
 * - Replace 'green' with a number between 0-255 (integer).
 * - Replace 'blue' with a number between 0-255 (integer).
 * - Replace 'alpha' with a number between 0 and 1 (decimal).
 * 
 *   Window Font Outline:
 *   Gauge Number Outline:
 *   Dim Color:
 *   Item Back Color:
 *   - Colors with a bit of alpha settings.
 *   - Format rgba(0-255, 0-255, 0-255, 0-1)
 *
 * ---
 *
 * Conditional Colors:
 * - These require a bit of JavaScript knowledge. These determine what colors
 *   to use under which situations and uses such as different values of HP, MP,
 *   TP, for comparing equipment, and determine damage popup colors.
 * 
 *   JS: Actor HP Color:
 *   JS: Actor MP Color:
 *   JS: Actor TP Color:
 *   - Code used for determining what HP, MP, or TP color to use for actors.
 *
 *   JS: Parameter Change:
 *   - Code used for determining whatcolor to use for parameter changes.
 *
 *   JS: Damage Colors:
 *   - Code used for determining what color to use for damage types.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Gold Settings
 * ============================================================================
 *
 * Gold is the main currency in RPG Maker MZ. The settings provided here will
 * determine how Gold appears in the game and certain behaviors Gold has.
 *
 * ---
 *
 * Gold Settings
 *
 *   Gold Max:
 *   - Maximum amount of Gold the party can hold.
 *   - Default 99999999
 *
 *   Gold Font Size:
 *   - Font size used for displaying Gold inside Gold Windows.
 *   - Default: 26
 *
 *   Gold Icon:
 *   - Icon used to represent Gold.
 *   - Use 0 for no icon.
 *
 *   Gold Overlap:
 *   - Text used too much Gold to fit in the window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Image Loading
 * ============================================================================
 *
 * Not all images are loaded at once in-game. RPG Maker MZ uses asynchronous
 * loading which means images are loaded when needed. This may cause delays in
 * when you want certain images to appear. However, if an image is loaded
 * beforehand, they can be used immediately provided they aren't removed from
 * the image cache.
 *
 * ---
 *
 * Image Loading
 *
 *   img/animations/:
 *   img/battlebacks1/:
 *   img/battlebacks2/:
 *   img/enemies/:
 *   img/faces/:
 *   img/parallaxes/:
 *   img/pictures/:
 *   img/sv_actors/:
 *   img/sv_enemies/:
 *   img/system/:
 *   img/tilesets/:
 *   img/titles1/:
 *   img/titles2/:
 *   - Which files do you wish to load from this directory upon starting
 *     up the game?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Keyboard Input Settings
 * ============================================================================
 *
 * Settings for the game that utilize keyboard input. These are primarily for
 * the name input scene (Scene_Name) and the number input event command. These
 * settings have only been tested on English keyboards and may or may not be
 * compatible with other languages, so please disable these features if they do
 * not fit in with your game.
 * 
 * If a controller is connected upon entering the name change scene, it will
 * use the default manual-entry mode instead of the keyboard-entry mode. If a
 * controller button is pressed during the keyboard-entry mode, it will
 * automatically switch to the manual-entry mode.
 * 
 * This plugin does not provide support for controllers that are undetected by
 * RPG Maker MZ's default controller support.
 *
 * ---
 * 
 * Controls
 * 
 *   WASD Movement:
 *   - Enables or disables WASD movement for your game project.
 *   - Moves the W page down button to E.
 * 
 *   R Button: Dash Toggle:
 *   - Enables or disables R button as an Always Dash option toggle.
 * 
 * ---
 *
 * Name Input
 * 
 *   Enable?:
 *   - Enables keyboard input for name entry.
 *   - Only tested with English keyboards.
 * 
 *   Default Mode:
 *   - Select default mode when entering the scene.
 *     - Default - Uses Arrow Keys to select letters.
 *     - Keyboard - Uses Keyboard to type in letters.
 * 
 *   QWERTY Layout:
 *   - Uses the QWERTY layout for manual entry.
 * 
 *   Keyboard Message:
 *   - The message displayed when allowing keyboard entry.
 *   - You may use text codes here.
 * 
 *   Banned Words:
 *   - Players cannot use these words for names.
 *   - These include words inside the names.
 *   - If a banned word is used, a buzzer sound will play.
 *
 * ---
 *
 * Number Input
 * 
 *   Enable?:
 *   - Enables keyboard input for number entry.
 *   - Only tested with English keyboards.
 *
 * ---
 * 
 * Button Assist
 * 
 *   Switch to Keyboard:
 *   - Text used to describe the keyboard switch.
 * 
 *   Switch To Manual:
 *   - Text used to describe the manual entry switch.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Menu Background Settings
 * ============================================================================
 *
 * These settings in the Plugin Parameters allow you to adjust the background
 * images used for each of the scenes. The images will be taken from the game
 * project folders img/titles1/ and img/titles2/ to load into the game.
 *
 * These settings are only available to scenes found within the Main Menu, the
 * Shop scene, and the Actor Naming scene.
 *
 * ---
 *
 * Menu Background Settings:
 *
 *   Scene_Menu:
 *   Scene_Item:
 *   Scene_Skill:
 *   Scene_Equip:
 *   Scene_Status:
 *   Scene_Options:
 *   Scene_Save:
 *   Scene_Load:
 *   Scene_GameEnd:
 *   Scene_Shop:
 *   Scene_Name:
 *   - Individual background settings for the scene.
 *
 *   Scene_Unlisted
 *   - Individual background settings for any scenes that aren't listed above.
 *
 * ---
 *
 * Background Settings
 *
 *   Snapshop Opacity:
 *   - Snapshot opacity for the scene.
 *
 *   Background 1:
 *   - Filename used for the bottom background image.
 *   - Leave empty if you don't wish to use one.
 *
 *   Background 2:
 *   - Filename used for the upper background image.
 *   - Leave empty if you don't wish to use one.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Menu Button Assist Window
 * ============================================================================
 *
 * In most modern RPG's, there exist small windows on the screen which tell the
 * player what the control schemes are for that scene. This plugin gives you
 * the option to add that window to the menu scenes in the form of a Button
 * Assist Window.
 *
 * ---
 *
 * General
 * 
 *   Enable:
 *   - Enable the Menu Button Assist Window.
 * 
 *   Location:
 *   - Determine the location of the Button Assist Window.
 *   - Requires Plugin Parameters => UI => Side Buttons ON.
 *
 *   Background Type:
 *   - Select background type for this window.
 *
 * ---
 *
 * Text
 * 
 *   Text Format:
 *   - Format on how the buttons are displayed.
 *   - Text codes allowed. %1 - Key, %2 - Text
 * 
 *   Multi-Key Format:
 *   - Format for actions with multiple keys.
 *   - Text codes allowed. %1 - Key 1, %2 - Key 2
 * 
 *   OK Text:
 *   Cancel Text:
 *   Switch Actor Text:
 *   - Default text used to display these various actions.
 *
 * ---
 *
 * Keys
 * 
 *   Key: Unlisted Format:
 *   - If a key is not listed below, use this format.
 *   - Text codes allowed. %1 - Key
 * 
 *   Key: Up:
 *   Key: Down:
 *   Key: Left:
 *   Key: Right:
 *   Key: Shift:
 *   Key: Tab:
 *   Key: A through Z:
 *   - How this key is shown in-game.
 *   - Text codes allowed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Menu Layout Settings
 * ============================================================================
 *
 * These settings allow you to rearrange the positions of the scenes accessible
 * from the Main Menu, the Shop scene, and the Actor Naming scene. This will
 * require you to have some JavaScript knowledge to make the windows work the
 * way you would like.
 *
 * ---
 *
 * Menu Layout Settings
 *
 *   Scene_Title:
 *   Scene_Menu:
 *   Scene_Item:
 *   Scene_Skill:
 *   Scene_Equip:
 *   Scene_Status:
 *   Scene_Options:
 *   Scene_Save:
 *   Scene_Load:
 *   Scene_GameEnd:
 *   Scene_Shop:
 *   Scene_Name:
 *   - Various options on adjusting the selected scene.
 *
 * ---
 *
 * Scene Window Settings
 *
 *   Background Type:
 *   - Selects the background type for the selected window.
 *   - Window
 *   - Dim
 *   - Transparent
 *
 *   JS: X, Y, W, H
 *   - Code used to determine the dimensions for the selected window.
 *
 * ---
 *
 * Scene_Title Settings
 * - The following are settings unique to Scene_Title.
 *
 * Title Screen
 *
 *   Document Title Format:
 *   - Format to display text in document title.
 *   - %1 - Main Title, %2 - Subtitle, %3 - Version
 *
 *   Subtitle:
 *   - Subtitle to be displayed under the title name.
 *   
 *   Version:
 *   - Version to be display in the title screen corner.
 *   
 *   JS: Draw Title:
 *   - Code used to draw the game title.
 *   
 *   JS: Draw Subtitle:
 *   - Code used to draw the game subtitle.
 *   
 *   JS: Draw Version:
 *   - Code used to draw the game version.
 *   
 *   Button Fade Speed:
 *   - Speed at which the buttons fade in at (1-255).
 *
 * ---
 *
 * Scene_GameEnd Settings
 * - The following are settings unique to Scene_GameEnd.
 *   
 *   Command Window List:
 *   - Window commands used by the title screen.
 *   - Add new commands here.
 *
 * ---
 *
 * Command Window List
 * - This is found under Scene_Title and Scene_GameEnd settings.
 *
 *   Symbol:
 *   - The symbol used for this command.
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
 * ---
 *
 * Title Picture Buttons:
 * - This is found under Scene_Title settings.
 * 
 *   Picture's Filename:
 *   - Filename used for the picture.
 *
 *   Button URL:
 *   - URL for the button to go to upon being clicked.
 *
 *   JS: Position:
 *   - JavaScript code that helps determine the button's Position.
 *
 *   JS: On Load:
 *   - JavaScript code that runs once this button bitmap is loaded.
 *
 *   JS: Run Code:
 *   - JavaScript code that runs once this button is pressed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Parameter Settings
 * ============================================================================
 *
 * A battler's parameters, or stats as some devs know them as, are the values
 * that determine how a battler performs. These settings allow you to alter
 * their behaviors and give boosts to trait objects in a controlled manner.
 *
 * ---
 *
 * Parameter Settings
 *
 *   Displayed Parameters
 *   - A list of the parameters that will be displayed in-game.
 *   - Shown in the Equip Menu.
 *   - Shown in the Status Menu.
 *
 *   Extended Parameters
 *   - The list shown in extended scenes (for other VisuStella plugins).
 *
 * ---
 *
 * === Basic Parameters ===
 *
 * MHP - MaxHP
 * - This is the maximum health points value. The amount of health points (HP)
 * a battler has determines whether or not the battler is in a living state or
 * a dead state. If the HP value is above 0, then the battler is living. If it
 * is 0 or below, the battler is in a dead state unless the battler has a way
 * to counteract death (usually through immortality). When the battler takes
 * damage, it is usually dealt to the HP value and reduces it. If the battler
 * is healed, then the HP value is increased. The MaxHP value determines what's
 * the maximum amount the HP value can be held at, meaning the battler cannot
 * be healed past that point.
 *
 * MMP - MaxMP
 * - This is the maximum magic points value. Magic points (MP) are typically
 * used for the cost of skills and spells in battle. If the battler has enough
 * MP to fit the cost of the said skill, the battler is able to use the said
 * skill provided that all of the skill's other conditions are met. If not, the
 * battler is then unable to use the skill. Upon using a skill that costs MP,
 * the battler's MP is reduced. However, the battler's MP can be recovered and
 * results in a gain of MP. The MaxMP value determines what is the maximum
 * amount the MP value can be held at, meaning the battler cannot recover MP
 * past the MaxMP value.
 *
 * ATK - Attack
 * - This is the attack value of the battler. By default, this stat is used for
 * the purpose of damage calculations only, and is typically used to represent
 * the battler's physical attack power. Given normal damage formulas, higher
 * values mean higher damage output for physical attacks.
 *
 * DEF - Defense
 * - This is the defense value of the battler. By default, this stat is used
 * for the purpose of damage calculations only, and is typically used to
 * represent the battler's physical defense. Given normal damage formulas,
 * higher values mean less damage received from physical attacks.
 *
 * MAT - Magic Attack
 * - This is the magic attack value of the battler. By default, this stat is
 * used for the purpose of damage calculations only, and is typically used to
 * represent the battler's magical attack power. Given normal damage formulas,
 * higher values mean higher damage output for magical attacks.
 *
 * MDF - Magic Defense
 * - This is the magic defense value of the battler. By default, this stat is
 * used for the purpose of damage calculations only, and is typically used to
 * represent the battler's magical defense. Given normal damage formulas,
 * higher values mean less damage received from magical attacks.
 *
 * AGI - Agility
 * - This is the agility value of the battler. By default, this stat is used to
 * determine battler's position in the battle turn's order. Given a normal turn
 * calculation formula, the higher the value, the faster the battler is, and
 * the more likely the battler will have its turn earlier in a turn.
 *
 * LUK - Luck
 * - This is the luck value of the battler. By default, this stat is used to
 * affect the success rate of states, buffs, and debuffs applied by the battler
 * and received by the battler. If the user has a higher LUK value, the state,
 * buff, or debuff is more likely to succeed. If the target has a higher LUK
 * value, then the state, buff, or debuff is less likely to succeed.
 *
 * ---
 *
 * Basic Parameters
 *
 *   HP Crisis Rate:
 *   - HP Ratio at which a battler can be considered in crisis mode.
 *
 *   JS: Formula:
 *   - Formula used to determine the total value all 8 basic parameters:
 *   - MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK.
 *
 * Parameter Caps:
 *
 *   MaxHP Cap:
 *   MaxMP Cap:
 *   ATK Cap:
 *   DEF Cap:
 *   MAT Cap:
 *   MDF Cap:
 *   AGI Cap:
 *   LUK Cap:
 *   - Formula used to determine the selected parameter's cap.
 *   - These settings DO NOT raise the editor's maximum values. If you want to
 *     raise an enemy's maximum parameter value past their default cap, use the
 *     associated notetag for them instead.
 *
 * ---
 *
 * === X Parameters ===
 *
 * HIT - Hit Rate%
 * - This determines the physical hit success rate of the any physical action.
 * All physical attacks make a check through the HIT rate to see if the attack
 * will connect. If the HIT value passes the randomizer check, the attack will
 * connect. If the HIT value fails to pass the randomizer check, the attack
 * will be considered a MISS.
 *
 * EVA - Evasion Rate%
 * - This determines the physical evasion rate against any incoming physical
 * actions. If the HIT value passes, the action is then passed to the EVA check
 * through a randomizer check. If the randomizer check passes, the physical
 * attack is evaded and will fail to connect. If the randomizer check passes,
 * the attempt to evade the action will fail and the action connects.
 *
 * CRI - Critical Hit Rate%
 * - Any actions that enable Critical Hits will make a randomizer check with
 * this number. If the randomizer check passes, extra damage will be carried
 * out by the initiated action. If the randomizer check fails, no extra damage
 * will be added upon the action.
 *
 * CEV - Critical Evasion Rate%
 * - This value is put against the Critical Hit Rate% in a multiplicative rate.
 * If the Critical Hit Rate is 90% and the Critical Evasion Rate is
 * 20%, then the randomizer check will make a check against 72% as the values
 * are calculated by the source code as CRI * (1 - CEV), therefore, with values
 * as 0.90 * (1 - 0.20) === 0.72.
 *
 * MEV - Magic Evasion Rate%
 * - Where EVA is the evasion rate against physical actions, MEV is the evasion
 * rate against magical actions. As there is not magical version of HIT, the
 * MEV value will always be bit against when a magical action is initiated. If
 * the randomizer check passes for MEV, the magical action will not connect. If
 * the randomizer check fails for MEV, the magical action will connect.
 *
 * MRF - Magic Reflect Rate%
 * - If a magical action connects and passes, there is a chance the magical
 * action can be bounced back to the caster. That chance is the Magic Reflect
 * Rate. If the randomizer check for the Magic Reflect Rate passes, then the
 * magical action is bounced back to the caster, ignoring the caster's Magic
 * Evasion Rate. If the randomizer check for the Magic Reflect Rate fails, then
 * the magical action will connect with its target.
 *
 * CNT - Counter Attack Rate%
 * - If a physical action connects and passes, there is a chance the physical
 * action can be avoided and a counter attack made by the user will land on the
 * attacking unit. This is the Counter Attack Rate. If the randomizer check for
 * the Counter Attack Rate passes, the physical action is evaded and the target
 * will counter attack the user. If the randomizer check fails, the physical
 * action will connect to the target.
 *
 * HRG - HP% Regeneration
 * - During a battler's regeneration phase, the battler will regenerate this
 * percentage of its MaxHP as gained HP with a 100% success rate.
 *
 * MRG - MP% Regeneration
 * - During a battler's regeneration phase, the battler will regenerate this
 * percentage of its MaxMP as gained MP with a 100% success rate.
 *
 * TRG - TP% Regeneration
 * - During a battler's regeneration phase, the battler will regenerate this
 * percentage of its MaxTP as gained TP with a 100% success rate.
 *
 * ---
 *
 * X Parameters
 *
 *   JS: Formula:
 *   - Formula used to determine the total value all 10 X parameters:
 *   - HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG.
 *
 * Vocabulary
 *
 *   HIT:
 *   EVA:
 *   CRI:
 *   CEV:
 *   MEV:
 *   MRF:
 *   CNT:
 *   HRG:
 *   MRG:
 *   TRG:
 *   - In-game vocabulary used for the selected X Parameter.
 *
 * ---
 *
 * === S Parameters ===
 *
 * TGR - Target Rate
 * - Against the standard enemy, the Target Rate value determines the odds of
 * an enemy specifically targeting the user for a single target attack. At 0%,
 * the enemy will almost never target the user. At 100%, it will have normal
 * targeting opportunity. At 100%+, the user will have an increased chance of
 * being targeted.
 * *NOTE: For those using the Battle A.I. Core, any actions that have specific
 * target conditions will bypass the TGR rate.
 *
 * GRD - Guard Effect
 * - This is the effectiveness of guarding. This affects the guard divisor
 * value of 2. At 100% GRD, damage will become 'damage / (2 * 1.00)'. At 50%
 * GRD, damage will become 'damage / (2 * 0.50)'. At 200% GRD, damage will
 * become 'damage / (2 * 2.00)' and so forth.
 *
 * REC - Recovery Effect
 * - This is how effective heals are towards the user. The higher the REC rate,
 * the more the user is healed. If a spell were to heal for 100 and the user
 * has 300% REC, then the user is healed for 300 instead.
 *
 * PHA - Pharmacology
 * - This is how effective items are when used by the user. The higher the PHA
 * rate, the more effective the item effect. If the user is using a Potion that
 * recovers 100% on a target ally and the user has 300% PHA, then the target
 * ally will receive healing for 300 instead.
 *
 * MCR - MP Cost Rate
 * - This rate affects how much MP skills with an MP Cost will require to use.
 * If the user has 100% MCR, then the MP Cost will be standard. If the user has
 * 50% MCR, then all skills that cost MP will cost only half the required MP.
 * If the user has 200% MCR, then all skills will cost 200% their MP cost.
 *
 * TCR - TP Charge Rate
 * - This rate affects how much TP skills with an TP will charge when gaining
 * TP through various actions. At 100%, TP will charge normally. At 50%, TP
 * will charge at half speed. At 200%, TP will charge twice as fast.
 *
 * PDR - Physical Damage Rate
 * - This rate affects how much damage the user will take from physical damage.
 * If the user has 100% PDR, then the user takes the normal amount. If the user
 * has 50% PDR, then all physical damage dealt to the user is halved. If the
 * user has 200% PDR, then all physical damage dealt to the user is doubled.
 *
 * MDR - Magical Damage Rate
 * - This rate affects how much damage the user will take from magical damage.
 * If the user has 100% MDR, then the user takes the normal amount. If the user
 * has 50% MDR, then all magical damage dealt to the user is halved. If the
 * user has 200% MDR, then all magical damage dealt to the user is doubled.
 *
 * FDR - Floor Damage Rate
 * - On the field map, this alters how much damage the user will take when the
 * player walks over a tile that damages the party. The FDR value only affects
 * the damage dealt to the particular actor and not the whole party. If FDR is
 * at 100%, then the user takes the full damage. If FDR is at 50%, then only
 * half of the damage goes through. If FDR is at 200%, then floor damage is
 * doubled for that actor.
 *
 * EXR - Experience Rate
 * - This determines the amount of experience gain the user whenever the user
 * gains any kind of EXP. At 100% EXR, the rate of experience gain is normal.
 * At 50%, the experience gain is halved. At 200%, the experience gain for the
 * user is doubled.
 *
 * ---
 *
 * S Parameters
 *
 *   JS: Formula
 *   - Formula used to determine the total value all 10 S parameters:
 *   - TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR.
 *
 * Vocabulary
 *
 *   TGR:
 *   GRD:
 *   REC:
 *   PHA:
 *   MCR:
 *   TCR:
 *   PDR:
 *   MDR:
 *   FDR:
 *   EXR:
 *   - In-game vocabulary used for the selected S Parameter.
 *
 * ---
 *
 * Icons
 * 
 *   Draw Icons?
 *   - Draw icons next to parameter names?
 *
 *   MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK:
 *   HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG:
 *   TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR:
 *   - Icon used for the selected parameter.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Custom Parameters Settings
 * ============================================================================
 *
 * As of version 1.07, you can add Custom Parameters to your game if RPG Maker
 * MZ's default set of parameters isn't enough for you. These parameters can
 * have variable functionality depending on how you code it. More importantly,
 * these are compatible with the VisuStella MZ menus and the VisuStella Core
 * Engine's Parameters settings.
 * 
 * For clarification, these settings do NOT create brand-new parameters for you
 * to use and add to your game nor are the bonuses supported by other plugins
 * in the VisuStella MZ library. These settings exist to function as a bridge
 * for non-VisuStella MZ plugins that have created their own parameter values
 * and to show them inside VisuStella menus.
 *
 * ---
 *
 * Custom Parameter
 * 
 *   Parameter Name:
 *   - What's the parameter's name?
 *   - Used for VisuStella MZ menus.
 * 
 *   Abbreviation:
 *   - What abbreviation do you want to use for the parameter?
 *   - Do not use special characters. Avoid numbers if possible.
 * 
 *   Icon:
 *   - What icon do you want to use to represent this parameter?
 *   - Used for VisuStella MZ menus.
 * 
 *   Type:
 *   - What kind of number value will be returned with this parameter?
 *     - Integer (Whole Numbers Only)
 *     - Float (Decimals are Allowed)
 * 
 *   JS: Value:
 *   - Run this code when this parameter is to be returned.
 *
 * ---
 * 
 * Instructions on Adding Custom Parameters to VisuStella Menus
 * 
 * In the Core Engine and Elements and Status Menu Core plugins, there are
 * plugin parameter fields for you to insert the parameters you want displayed
 * and visible to the player.
 * 
 * Insert in those the abbreviation of the custom parameter. For example, if
 * you want to add the "Strength" custom parameter and the abbreviation is
 * "str", then add "str" to the Core Engine/Elements and Status Menu Core's
 * plugin parameter field for "Strength" to appear in-game. Case does not
 * matter here so you can insert "str" or "STR" and it will register all the
 * same to make them appear in-game.
 * 
 * ---
 * 
 * Instructions on Using Custom Parameters as Mechanics
 * 
 * If you want to use a custom parameter in, say, a damage formula, refer to
 * the abbreviation you have set for the custom parameter. For example, if you
 * want to call upon the "Strength" custom parameter's value and its set
 * abbreviation is "str", then refer to it as such. This is case sensitive.
 * 
 * An example damage formula would be something like the following if using
 * "str" for "Strength" and "con" for "Constitution":
 * 
 *   a.str - b.con
 * 
 * These values are attached to the Game_Battlerbase prototype class.
 * 
 * ---
 * 
 * Instructions on Setting Custom Parameter Values
 * 
 * This requires JavaScript knowledge. There is no way around it. Whatever code
 * you insert into the "JS: Value" field will return the value desired. The
 * 'user' variable will refer to the Game_Battlerbase prototype object in which
 * the information is to be drawn from.
 * 
 * Depending on the "type" you've set for the Custom Parameter, the returned
 * value will be rounded using Math.round for integers and left alone if set as
 * a float number.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Screen Resolution Settings
 * ============================================================================
 *
 * Alter various properties to make the game look better for varying screen
 * resolutions. This is mostly for RPG Maker MZ version 1.3.0 and up where the
 * Troops tab has been updated to match the screen resolution settings found in
 * the System 2 Database tab.
 *
 * ---
 *
 * Troops
 * 
 *   Reposition Actors:
 *   - Update the position of actors in battle if the screen resolution
 *     has changed to become larger than 816x624.
 *   - Ignore if using the VisuStella MZ Battle Core.
 *   - When using the VisuStella MZ Battle Core, adjust the position through
 *     Battle Core > Parameters > Actor Battler Settings > JS: Home Position
 *
 *   Reposition Enemies:
 *   - Update the position of enemies in battle if the screen resolution
 *     has changed to become larger than 816x624.
 * 
 *     For MZ 1.3.0+?:
 *     - Both this parameter and its parent parameter need to be on when using
 *       RPG Maker MZ 1.3.0+.
 *     - If the Core Script is below 1.3.0, this setting is ignored. This does
 *       not take into account what version the editor is on. Pay attention to
 *       that as the plugin will not auto adjust for it.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Screen Shake Settings
 * ============================================================================
 *
 * Get more screen shake effects into your game!
 * 
 * These effects have been added by Aries of Sheratan!
 *
 * ---
 *
 * Settings
 * 
 *   Default Style:
 *   - The default style used for screen shakes.
 *   - Original
 *   - Random
 *   - Horizontal
 *   - Vertical
 * 
 *   JS: Original Style:
 *   JS: Random Style
 *   JS: Horizontal Style
 *   JS: Vertical Style
 *   - This code gives you control over screen shake for this screen
 *     shake style.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Title Command List Settings
 * ============================================================================
 *
 * This plugin parameter allows you to adjust the commands that appear on the
 * title screen. Some JavaScript knowledge is needed.
 *
 * ---
 *
 * Title Command
 * 
 *   Symbol:
 *   - The symbol used for this command.
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
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Title Picture Buttons Settings
 * ============================================================================
 *
 * These allow you to insert picture buttons on your title screen that can
 * send users to various links on the internet when clicked.
 *
 * ---
 *
 * Settings
 * 
 *   Picture's Filename:
 *   - Filename used for the picture.
 * 
 *   Button URL:
 *   - URL for the button to go to upon being clicked.
 * 
 *   JS: Position:
 *   - JavaScript code that helps determine the button's Position.
 * 
 *   JS: On Load:
 *   - JavaScript code that runs once this button bitmap is loaded.
 * 
 *   JS: Run Code:
 *   - JavaScript code that runs once this button is pressed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: UI Settings
 * ============================================================================
 *
 * In previous iterations of RPG Maker, the Core Engine would allow you to
 * change the screen resolution. In MZ, that functionality is provided by
 * default but a number of UI settings still remain. These settings allow you
 * adjust how certain in-game objects and menus are displayed.
 *
 * ---
 *
 * UI Area
 *
 *   Fade Speed:
 *   - Default fade speed for transitions.
 *
 *   Box Margin:
 *   - Set the margin in pixels for the screen borders.
 *
 *   Command Window Width:
 *   - Sets the width for standard Command Windows.
 *
 *   Bottom Help Window:
 *   - Put the Help Window at the bottom of the screen?
 *
 *   Right Aligned Menus:
 *   - Put most command windows to the right side of the screen.
 *
 *   Show Buttons:
 *   - Show clickable buttons in your game?
 * 
 *     Show Cancel Button:
 *     Show Menu Button:
 *     Show Page Up/Down:
 *     Show Number Buttons:
 *     - Show/hide these respective buttons if the above is enabled.
 *     - If 'Show Buttons' is false, these will be hidden no matter what.
 *
 *   Button Area Height:
 *   - Sets the height for the button area.
 *
 *   Bottom Buttons:
 *   - Put the buttons at the bottom of the screen?
 *
 *   Side Buttons:
 *   - Push buttons to the side of the UI if there is room.
 *
 * ---
 *
 * Larger Resolutions
 *
 * ---
 *
 * Menu Objects
 *
 *   Level -> EXP Gauge:
 *   - Draw an EXP Gauge under the drawn level.
 *
 *   Parameter Arrow:
 *   - The arrow used to show changes in the parameter values.
 *
 * ---
 *
 * Text Code Support
 *
 *   Class Names:
 *   - Make class names support text codes?
 *
 *   Nicknames:
 *   - Make nicknames support text codes?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Window Settings
 * ============================================================================
 *
 * Adjust the default settings of the windows in-game. This ranges from things
 * such as the line height (to better fit your font size) to the opacity level
 * (to fit your window skins).
 *
 * ---
 *
 * Window Defaults
 * 
 *   Line Height:
 *   - Default line height used for standard windows.
 * 
 *   Item Height Padding:
 *   - Default padding for selectable items.
 * 
 *   Item Padding:
 *   - Default line padding used for standard windows.
 * 
 *   Back Opacity:
 *   - Default back opacity used for standard windows.
 *   - As of version 1.3.0, this is no longer needed.
 *   - This will still work for lower versions.
 * 
 *   Translucent Opacity:
 *   - Default translucent opacity used for standard windows.
 * 
 *   Window Opening Speed:
 *   - Default open speed used for standard windows.
 *   - Default: 32 (Use a number between 0-255)
 * 
 *   Column Spacing:
 *   - Default column spacing for selectable windows.
 *   - Default: 8
 * 
 *   Row Spacing:
 *   - Default row spacing for selectable windows.
 *   - Default: 4
 *
 * ---
 * 
 * Selectable Items:
 * 
 *   Show Background?:
 *   - Selectable menu items have dark boxes behind them. Show them?
 * 
 *   Item Height Padding:
 *   - Default padding for selectable items.
 * 
 *   JS: Draw Background:
 *   - Code used to draw the background rectangle behind clickable menu objects
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: JS: Quick Functions
 * ============================================================================
 * 
 * WARNING: This feature is highly experimental! Use it at your own risk!
 * 
 * JavaScript Quick Functions allow you to quickly declare functions in the
 * global namespace for ease of access. It's so that these functions can be
 * used in Script Calls, Control Variable Script Inputs, Conditional Branch
 * Script Inputs, Damage Formulas, and more.
 * 
 * ---
 * 
 * JS: Quick Function
 * 
 *   Function Name:
 *   - The function's name in the global namespace.
 *   - Will not overwrite functions/variables of the same name.
 * 
 *   JS: Code:
 *   - Run this code when using the function.
 * 
 * ---
 * 
 * If you have a Function Name of "Example", then typing "Example()" in a
 * Script Call, Conditional Branch Script Input, or similar field will yield
 * whatever the code is instructed to return.
 * 
 * If a function or variable of a similar name already exists in the global
 * namespace, then the quick function will be ignored and not created.
 * 
 * If a quick function contains bad code that would otherwise crash the game,
 * a fail safe has been implemented to prevent it from doing so, display an
 * error log, and then return a 0 value.
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
 * Version 1.46: September 23, 2021
 * * Documentation Update!
 * ** Added line to Plugin Command: "System: Battle System Change":
 * *** Some battle systems REQUIRE their specific plugins!
 * ** Added lines to "Plugin Parameters: Battle System":
 * *** Some battle systems REQUIRE their specific plugins! This means if you do
 *     not have the required battle system plugin installed, it will not change
 *     over. The Core Engine plugin does not contain data for all of the battle
 *     systems inside its code.
 * 
 * Version 1.45: September 17, 2021
 * * Bug Fixes!
 * ** Fixed a problem with "Picture: Coordinates Mode" to properly utilize the
 *    correct picture ID. Fix made by Arisu.
 * ** RPG Maker MZ Bug Fix:
 * *** Instant Text Discrepancy for Window_Message
 * **** Window_Message displays text differently when it draws letters one by
 *      one versus when the text is displayed instantly. This isn't noticeable
 *      with the default font, but it's very visible when using something like
 *      Arial. The error is due to Bitmap.measureTextWidth yielding a rounded
 *      value per letter versus per word. The Core Engine will provide a bug
 *      fix that will single out the cause and make it so that only
 *      Window_Message will not utilize any round number values when
 *      determining the width of each letter, whether or not it is shown
 *      instantly. This change will only affect Window_Message and not any
 *      other window in order to prevent unintended side effects.
 * **** Fix made by Yanfly.
 * * Compatibility Update!
 * ** RPG Maker MZ 1.3.3 compatibility.
 * *** Updated how gauges are drawn.
 * * Documentation Update!
 * ** Help file updated for new RPG Maker MZ bug fix.
 * 
 * Version 1.44: August 20, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Command added by Irina and sponsored by Anon.
 * *** "Animation: Play at Coordinate"
 * **** Plays an animation on the screen at a specific x, y coordinate even if
 *      there is no sprite attached.
 * 
 * Version 1.43: July 23, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Command added by Irina and sponsored by Archeia!
 * *** "Picture: Coordinates Mode"
 * **** Play Test Mode only!
 * **** Gets the coordinates of a specific picture as you move it across the
 *      screen.
 * **** Helpful for those who don't want to do guess work on the screen
 *      coordinates when it comes to placing down pictures.
 * 
 * Version 1.42: July 16, 2021
 * * Documentation Update
 * ** Added text to "Plugin Parameters: Color Settings" for clarification:
 * *** If the game's Window Skin is changed mid-game, the colors used will
 *     still be based off the default Window Skin's colors. This is due to
 *     storing them in a cache and preventing extra processing and reduces lag.
 * 
 * Version 1.41: July 2, 2021
 * * Compatibility Update
 * ** Further compatibility update with RPG Maker MZ 1.3.0+.
 * * Documentation Update
 * ** Added extra notes to "Important Changes: Bug Fixes" section for the
 *    "Window Skin Bleeding" bug:
 * *** This bug is fixed in the core scripts for RPG Maker MZ v1.3.0+.
 * 
 * Version 1.40: June 25, 2021
 * * Compatibility Update
 * ** Compatibility update with RPG Maker MZ 1.3.0+.
 * * Documentation Update:
 * ** Plugin Parameters > Window Settings > Back Opacity
 * *** As of version 1.3.0, this is no longer needed.
 * *** This will still work for lower versions.
 * ** Help file updated for new features.
 * * Feature Updates!
 * ** Window Skin Bleeding fix updated to newest version.
 * * New Plugin Parameters added:
 * ** Plugin Parmaeters > Screen Resolution Settings
 * *** These settings have been moved from the UI settings to be its own thing.
 * **** This is mostly for RPG Maker MZ version 1.3.0 and up where the Troops
 *      tab has been updated to match the screen resolution settings found in
 *      the System 2 Database tab.
 * *** Reposition Enemies > For MZ 1.3.0+?
 * **** Both of these plugin parameters need to be set to true in order for the
 *      repositioning to work for MZ v1.3.0.
 * **** If the Core Script is below 1.3.0, this setting is ignored. This does
 *      not take into account what version the editor is on. Pay attention to
 *      that as the plugin will not auto adjust for it.
 * 
 * Version 1.39: June 18, 2021
 * * Bug Fixes!
 * ** Number Inputs should now work with the controller if keyboard Number
 *    Input is enabled. Fix made by Olivia.
 * ** RPG Maker Bug: Termination Clear Effects
 * *** In RPG Maker MZ, requesting an animation while transitioning between
 *     scenes, such as going from the map scene to the battle scene, can cause
 *     crashes. This is because the animation queue does not take off
 *     immediately and will likely register incorrect targets for the scene.
 *     This plugin will forcefully clear any registered animations and balloon
 *     effects when terminating a scene in order to prevent crashes.
 * * Documentation Update!
 * ** Help file updated for updated features.
 * * Feature Update!
 * ** <Battle View: x> Troop Name tags can now work with comment tags.
 * ** <Battle System: x> Troop Name tags can now work with comment tags.
 * *** Updates made by Irina.
 * 
 * Version 1.38: June 11, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Command added by Irina and sponsored by Caz!
 * *** Picture: Show Icon
 * **** Shows an icon instead of a picture image.
 * **** The picture icon can be controlled like any other picture.
 * 
 * Version 1.37: May 21, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Arisu:
 * *** Switches: Randomize ID(s)
 * *** Switches: Randomize Range
 * *** Switches: Toggle ID(s)
 * *** Switches: Toggle Range
 * **** These Plugin Commands allow you to randomize the ON/OFF positions of
 *      switches or toggle them so that they flip their ON/OFF status.
 * 
 * Version 1.36: May 14, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Irina:
 * *** Export: All Maps Text
 * *** Export: All Troops Text
 * *** Export: Current Map Text
 * *** Export: Current Troop Text
 * **** Play Test Only Plugin Commands. These Plugin Commands are used for
 *      extracting all messages, show choices, comments, and scrolling text to
 *      parse and export them as a TXT file. Useful for getting a game's script
 *      to a voice actor or voice actress.
 * 
 * Version 1.35: May 7, 2021
 * * Documentation Update!
 * ** Added the following text to "Parameter Settings" Plugin Parameters for
 *    extra clarity regarding Parameter Caps:
 * *** These settings DO NOT raise the editor's maximum values. If you want to
 *     raise an enemy's maximum parameter value past their default cap, use the
 *     associated notetag for them instead.
 * 
 * Version 1.34: April 23, 2021
 * * Bug Fixes!
 * ** For the vanilla Equip Status window, custom parameters with integer
 *    values will now show up as integers and not percentiles. Fix by Olivia.
 * * Documentation Update!
 * ** Added clarity to the <param: x> notetag for enemies.
 * *** This notetag does NOT work with X Parameters, S Parameters, or any
 *     custom parameters. This notetag ONLY works with the base parameters.
 * 
 * Version 1.33: April 9, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Window Skin Bleeding
 * *** Since the v1.2.0 update, Window.prototype._refreshBack's frame value has
 *     been set from 96 to 95. This results in the window skin bleeding past
 *     the window's intended borders. The Core Engine now reverts this change
 *     to prevent the bleeding effect from happening.
 * * Feature Update!
 * ** "Encounter Rate Minimum" now has a valid minimum value of 1. Update made
 *    by Olivia.
 * 
 * Version 1.32: April 2, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Yanfly:
 * *** Plugin Parameters > QoL Settings > Battle Test > Add Item Type
 * *** Plugin Parameters > QoL Settings > Battle Test > Add Weapon Type
 * *** Plugin Parameters > QoL Settings > Battle Test > Add Armor Type
 * *** Plugin Parameters > QoL Settings > Battle Test > Added Quantity
 * **** By default, RPG Maker MZ only adds 99 of items and not weapons or armor
 *      making it awkward for testing specific battle mechanics. These settings
 *      allow you to add in custom amounts of items, weapons, and/or armors if
 *      you so wish.
 * 
 * Version 1.31: March 26, 2021
 * * Feature Update!
 * ** Title screen buttons will now become fully opaque when hovered over them
 *    instead of only when pressed. Update made by Yanfly.
 * 
 * Version 1.30: March 19, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Invisible Battle Sprites
 * *** If you removed a party member during battle and added that exact party
 *     member back into the same slot, their sprite would appear invisible. The
 *     VisuStella Core Engine will fix this problem and prevent it from
 *     happening. Fix made by Olivia.
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Arisu:
 * *** Plugin Parameters > QoL Settings > Misc > Ani: Mirror Offset
 * **** When animations are mirrored, mirror their Offset X values, too.
 * ** New animation name tags added by Arisu:
 * *** <Mirror Offset X> and <No Mirror Offset X>
 * **** If these text tags are placed in an animation's name, it will cause the
 *      offset X value to be mirrored when the animation is mirrored or have it
 *      ignored despite being mirrored.
 * 
 * Version 1.29: March 12, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Interactable window client area does not conform to the
 *    window's declared scale when the scale is anything but 1.0. This will now
 *    be fixed through this plugin. Fix made by Olivia.
 * * Documentation Update!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * ** Help file updated for updated features.
 * * Feature Update!
 * ** Name Input should be more controller-friendly. If a controller is
 *    connected upon entering the name change scene, it will use the default
 *    manual-entry mode instead of the keyboard-entry mode. If a controller
 *    button is pressed during the keyboard-entry mode, it will automatically
 *    switch to the manual-entry mode.
 * ** This plugin does not provide support for controllers that are undetected
 *    by RPG Maker MZ's default controller support.
 * ** This feature was already implemented since version 1.27 but wasn't
 *    documented so here we are. Update made by Irina.
 * 
 * Version 1.28: March 5, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: The arrows drawn by a window skin will no longer by
 *    placed on a half pixel when a window's size is an odd number. This would
 *    cause sprite tearing problems and look awful. Fix made by Irina.
 * * Documentation Update!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * 
 * Version 1.27: February 26, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Moved "Show Scrolling Text, additional functionality" section from Bug
 *    Fixes to Major Changes as it was placed in the wrong section.
 * * New Features!
 * ** New Plugin Parameter added by Yanfly.
 * *** Plugin Parameters > Keyboard Input > Name Input > Banned Words
 * **** Insert words you don't want your players to use for character names.
 * 
 * Version 1.26: February 19, 2021
 * * Bug Fixes!
 * ** Certain Plugin Parameters no longer have settings that restrict them to
 *    a maximum of 1. Fix made by Arisu.
 * * Feature Update!
 * ** Changed the default value for a New Game > Common Event upon Play Testing
 *    to 0 to prevent confusion. Update made by Arisu.
 * 
 * Version 1.25: February 5, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** Show Scrolling Text, additional functionality added by Arisu
 * *** The event command "Show Scrolling Text" now has additional functionality
 *     as long as the VisuStella MZ Core Engine is installed. If the game dev
 *     inserts "// Script Call" (without the quotes) inside the scrolling text,
 *     then the entirity of the Show Scrolling Text event command will be ran
 *     as a giant script call event command.
 * *** The reason why this functionality is added is because the "Script..."
 *     event command contains only 12 lines maximum. This means for any script
 *     call larger than 12 lines of code cannot be done by normal means as each
 *     script call is ran as a separate instance.
 * *** By repurposing the "Show Scrolling Text" event command to be able to
 *     function as an extended "Script..." event command, such a thing is now
 *     possible with less hassle and more lines to code with.
 * *** This effect does not occur if the Show Scrolling Text event command does
 *     not have "// Script Call" in its contents.
 * 
 * Version 1.24: January 29, 2021
 * * Documentation Update!
 * ** Plugin Parameters: Custom Parameters Settings added the following note:
 * *** For clarification, these settings do NOT create brand-new parameters for
 *     you to use and add to your game nor are the bonuses supported by other
 *     plugins in the VisuStella MZ library. These settings exist to function
 *     as a bridge for non-VisuStella MZ plugins that have created their own
 *     parameter values and to show them inside VisuStella menus.
 * * Feature Update!
 * ** Default JS Plugin Parameter for the Title Command: "Shutdown" now has a
 *    note in it that reads: "Do NOT use this command with mobile devices or
 *    browser games. All it does is cause the game to display a blank, black
 *    canvas which the player is unable to do anything with. It does NOT force
 *    close the browser tab nor the app."
 * *** This is also why this command is disabled by default for any non-NodeJS
 *     client deployed game versions.
 * ** Disabled some bug fixes made by the Core Engine for the default RMMZ code
 *    base since the 1.1.1 version now contains those very same fixes.
 * 
 * Version 1.23: January 22, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.22: January 15, 2021
 * * Documentation Update!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Sprite_Timer is added to the spriteset for the parent
 *    scene, making it affected by any filers, zooms, and/or blurs, hindering
 *    its readability.
 * 
 * Version 1.21: January 8, 2021
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New Plugin Parameters added by Arisu:
 * *** Plugin Parameters > Keyboard Input > Controls > WASD Movement
 * *** Plugin Parameters > Keyboard Input > Controls > R Button: Dash Toggle
 * 
 * Version 1.20: January 1, 2021
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.19: December 25, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s) and feature updates!
 * * Bug Fixes!
 * ** Fixed typo inside of the comments inside the JS: Quick Functions.
 * * Feature Update!
 * ** Plugin Parameters > Color Settings > Outline Color is now renamed to
 *    Font Outline.
 * * New Features!
 * ** New Plugin Parameters added by Shaz!
 * *** Plugin Parameters > Color Settings > Gauge Number Outline
 * 
 * Version 1.18: December 18, 2020
 * * Bug Fixes!
 * ** Compatible string text from the Items and Equips Core will no longer
 *    register MaxHP and MaxMP as percentile values for the info window.
 * ** RPG Maker MZ Bug: Gamepads no longer go rapidfire after a cleared input.
 *    There is now a period of delay for gamepads after an input clear.
 * ** RPG Maker MZ Bug: Unusable items on an individual-actor basis will no
 *    longer be overwritten by party-based usability for battle. Fix by Yanfly.
 * ** RPG Maker MV animations will no longer crash for unplayable sound
 *    effects. Fix made by Yanfly.
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * * New Features!
 * ** New Plugin Parameters added by Yanfly!
 * *** Plugin Parameters > Button Assist > Key: Shift
 * *** Plugin Parameters > Button Assist > Key: Tab
 * **** These let you assign text codes to the Shift and Tab buttons for the
 *      Button Assist windows.
 * *** Plugin Parameters > QoL Settings > Misc > NewGame > CommonEvent
 * **** For an all version (including non-play test) common event to start new
 *      games with.
 * 
 * Version 1.17: December 11, 2020
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.16: December 4, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * Feature Update!
 * ** Button Assist Window for the change name scene will now default to "Tab"
 *    for switching between both modes. Update made by Yanfly.
 * * New Features!
 * ** New Plugin Parameter added by Yanfly:
 * *** Plugin Parameters > Keyboard Input > Default Mode
 * **** Select default mode when entering the scene.
 * 
 * Version 1.15: November 29, 2020
 * * Bug Fixes!
 * ** Pressing "Enter" in the change name scene while the actor's name is
 *    completely empty will no longer result in endless buzzer sounds. Fix made
 *    by Arisu.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * Feature Update!
 * ** For the name change scene, the "Tab" key now also lets the user switch
 *    between the two modes. Update made by Yanfly.
 * * New Features!
 * ** Two new plugin parameters added to Keyboard Input:
 * *** "Switch To Keyboard" and "Switch To Manual"
 * **** These determine the text used for the button assist window when
 *      switching between the two modes. Update made by Yanfly.
 * **** Button Assist window now takes into consideration for these texts.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.14: November 22, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New Plugin Command added by Yanfly!
 * *** System: Load Images
 * **** Allows you to (pre) load up images ahead of time.
 * 
 * Version 1.13: November 15, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.12: November 8, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * Feature Update!
 * ** Screen Shake Plugin Parameters and JS: Quick Function Plugin Parameters
 *    have been taken off experimental status.
 * * New Features!
 * ** New plugin parameters added by Arisu.
 * *** Plugin Parameters > Keyboard Input
 * **** Settings for the game that utilize keyboard input. These are primarily
 *      for the name input scene (Scene_Name) and the number input event
 *      command. These settings have only been tested on English keyboards and
 *      may or may not be compatible with other languages, so please disable
 *      these features if they do not fit in with your game.
 * 
 * Version 1.11: November 1, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Feature Update!
 * ** Bitmap smoothing now takes into consideration for rounding coordinates.
 *    Update made by Irina.
 * 
 * Version 1.10: October 25, 2020
 * * Feature Update!
 * ** Sprite animation location now adjusts position relative to the sprite's
 *    scale, too. Update made by Arisu.
 *
 * Version 1.09: October 18, 2020
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Auto Battle Lock Up. Fixed by Yanfly.
 * *** If an auto battle Actor fights against an enemy whose DEF/MDF is too
 *     high, they will not use any actions at all. This can cause potential
 *     game freezing and softlocks. This plugin will change that and have them
 *     default to a regular Attack.
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.08: October 11, 2020
 * * Feature Update!
 * ** Altered sprite bitmaps via the various draw functions will now be marked
 *    as modified and will automatically purge themselves from graphical memory
 *    upon a sprite's removal to free up more resources. Change made by Yanfly.
 * ** Picture Sprite Origin anchors are now tied to the Game_Picture show and
 *    move commands instead of the Game_Interpretter commands. Change by Arisu.
 * 
 * Version 1.07: October 4, 2020
 * * Documentation Update!
 * ** New documentation added for the new Plugin Parameter category:
 *    "Custom Parameters".
 * * New Features!
 * ** New Plugin Parameter "Custom Parameters" added by Yanfly.
 * *** Create custom parameters for your game! These will appear in
 *     VisuStella MZ menus.
 * 
 * Version 1.06: September 27, 2020
 * * Bug Fixes!
 * ** Battler evasion pose can now occur if there is a miss. These were made
 *    separate in RPG Maker MZ and misses didn't enable the evasion pose. Fix
 *    made by Olivia.
 * * New Features!
 * ** New notetags for Maps and name tags for Troops added by Yanfly!
 * *** <Frontview>, <Sideview> to change the battle view for that specific map,
 *     or troop regardless of what other settings are.
 * *** <DTB>, <TPB Active>, <TPB Wait> to change the battle system for that
 *     specific map or troop regardless of what other settings are.
 * 
 * Version 1.05: September 20, 2020
 * * Bug Fixes!
 * ** <Level: x> notetag for enemies is now fixed! Fix made by Arisu.
 * * Documentation Update!
 * ** Documentation added for the new "System: Battle System Change" Plugin
 *    Command and removed the old "System: Set Time Progress Battle".
 * * Feature Update!
 * ** The Plugin Command "System: Set Time Progress Battle" has been replaced
 *    with "System: Battle System Change" instead. This is to accommodate
 *    future plugins that allow for different battle systems. Added by Yanfly.
 * *** If you have previously used "System: Set Time Progress Battle", please
 *     replace them. We apologize for the inconvenience.
 * * New Features!
 * ** In the Core Engine's plugin parameters, you can now set the Battle System
 *    used. This will default to whatever is the game database's setting. This
 *    feature is used for the future when new battle systems are made. Feature
 *    added by Yanfly.
 * 
 * Version 1.04: September 13, 2020
 * * Documentation Update!
 * ** Added new documentation for the "Title Command List" and Title Picture
 *    Buttons" plugin parameters. They now have a dedicated section each.
 * * Feature Updates!
 * ** Moved the "Title Command List" and "Title Picture Buttons" parameters
 *    from the Menu Layout > Title settings. They were far too hidden away and
 *    users had a hard time finding them. Update made by Yanfly.
 * *** Users who have customized these settings before will need to readjust
 *     them again. We apologize for the inconvenience.
 * 
 * Version 1.03: September 6, 2020
 * * Bug Fixes!
 * ** Having QoL > Modern Controls disabled (why would you) used to prevent the
 *    down button from working. It works again. Fix made by Yanfly.
 * * New Feature!
 * ** Plugin default settings now come with a "Game End" option on the title
 *    screen. For those updating from version 1.02 or order, you can add this
 *    in by opening the Core Engine > Plugin Parameters > Menu Layout Settings
 *    > press "delete" on Scene_Title > open it up, then the new settings will
 *    fill in automatically.
 * * New Experimental Feature Added:
 * ** Screen Shake Settings added to the Plugin Parameters.
 * *** Screen Shake: Custom Plugin Command added!
 * *** Credit to Aries of Sheratan, who gave us permission to use her formula.
 * *** We'll be expanding on more screen shaking options in the future.
 * * Optimization Update
 * ** Digit Grouping now works more efficiently.
 * 
 * Version 1.02: August 30, 2020
 * * New Feature!
 * ** New Plugin Command: "Picture: Erase All". Added by Olivia.
 * *** Erases all pictures on the screen because it's extremely tedious to do
 *     it one by one.
 * ** New Plugin Command: "Picture: Erase Range"
 * *** Erases all pictures within a range of numbers because it's extremely
 *     tedious to do it one by one.
 * * Optimization Update
 * ** Added a more accurate means of parsing numbers for Digit Grouping.
 * ** Window_Base.prototype.textSizeEx now stores data to a cache.
 * * Documentation Update
 * ** Added a section to Major Changes: New Hard-Coded Features on
 *    Digit Grouping and explaining its intricacies.
 * ** Added a note to Plugin Parameters > UI > Reposition Actors to ignore the
 *    setting if using the Battle Core.
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** Digit grouping fixed to allow text codes to detect values larger than
 *    1000. Fix made by Olivia and Yanfly.
 * ** Param Plus, Rate, Flat notetags fixed. Fix made by Yanfly.
 * * New Experimental Feature Added:
 * ** JS: Quick Functions found in the Plugin Parameters
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
 * @command AnimationPoint
 * @text Animation: Play at Coordinate
 * @desc Plays an animation on the screen at a specific x, y
 * coordinate even if there is no sprite attached.
 *
 * @arg AnimationID:num
 * @text Animation ID
 * @parent Animation
 * @type animation
 * @desc Plays this animation.
 * @default 1
 * 
 * @arg Coordinates
 *
 * @arg pointX:eval
 * @text X
 * @parent Coordinates
 * @desc X coordinate used for the animation.
 * You may use JavaScript code.
 * @default Graphics.width / 2
 *
 * @arg pointY:eval
 * @text Y
 * @parent Coordinates
 * @desc Y coordinate used for the animation.
 * You may use JavaScript code.
 * @default Graphics.height / 2
 *
 * @arg Mirror:eval
 * @text Mirror Animation?
 * @parent Animation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the animation?
 * @default false
 *
 * @arg Mute:eval
 * @text Mute Animation?
 * @parent Animation
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the animation?
 * @default false
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command ExportAllMapText
 * @text Export: All Maps Text
 * @desc PLAY TEST ONLY. Exports all of the text from all maps,
 * their events, event pages, and any associated Common Events.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command ExportAllTroopText
 * @text Export: All Troops Text
 * @desc PLAY TEST ONLY. Exports all of the text from all troops,
 * their event pages, and any associated Common Events.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command ExportCurMapText
 * @text Export: Current Map Text
 * @desc PLAY TEST ONLY. Exports all of the text on the current map,
 * its events, the event pages, and any associated Common Events.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command ExportCurTroopText
 * @text Export: Current Troop Text
 * @desc PLAY TEST ONLY. Exports all of the text on the current troop,
 * the troop's event pages, and any associated Common Events.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command OpenURL
 * @text Game: Open URL
 * @desc Opens a website URL from the game.
 *
 * @arg URL:str
 * @text URL
 * @desc Where do you want to take the player?
 * @default https://www.google.com/
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command GoldChange
 * @text Gold: Gain/Lose
 * @desc Allows you to give/take more gold than the event editor limit.
 *
 * @arg value:eval
 * @text Value
 * @desc How much gold should the player gain/lose?
 * Use negative values to remove gold.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureCoordinatesMode
 * @text Picture: Coordinates Mode
 * @desc Play Test Mode only! Gets the coordinates of a specific
 * picture as you move it across the screen.
 *
 * @arg PictureID:num
 * @text Picture ID
 * @type number
 * @min 1
 * @max 100
 * @desc The ID of the pictures to track the coordinates of.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureEasingType
 * @text Picture: Easing Type
 * @desc Changes the easing type to a number of options.
 *
 * @arg pictureId:num
 * @text Picture ID
 * @type number
 * @min 1
 * @max 100
 * @desc Which picture do you wish to apply this easing to?
 * @default 1
 *
 * @arg easingType:str
 * @text Easing Type
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * @default Linear
 *
 * @arg LineBreak
 * @text ------------------------
 * @default --------------------------------
 *
 * @arg Instructions1
 * @text Instructions
 * @default Insert this Plugin Command after
 *
 * @arg Instructions2
 * @text -
 * @default a "Move Picture" event command.
 * 
 * @arg Instructions3
 * @text -
 * @default Turn off "Wait for Completion"
 *
 * @arg Instructions4
 * @text -
 * @default in the "Move Picture" event.
 *
 * @arg Instructions5
 * @text -
 * @default You may have to add in your own
 *
 * @arg Instructions6
 * @text -
 * @default "Wait" event command after.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureEraseAll
 * @text Picture: Erase All
 * @desc Erases all pictures on the screen because it's extremely
 * tedious to do it one by one.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureEraseRange
 * @text Picture: Erase Range
 * @desc Erases all pictures within a range of numbers because it's
 * extremely tedious to do it one by one.
 *
 * @arg StartID:num
 * @text Starting ID
 * @type number
 * @min 1
 * @max 100
 * @desc The starting ID of the pictures to erase.
 * @default 1
 *
 * @arg EndingID:num
 * @text Ending ID
 * @type number
 * @min 1
 * @max 100
 * @desc The ending ID of the pictures to erase.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 * 
 * @command PictureShowIcon
 * @text Picture: Show Icon
 * @desc Shows an icon instead of a picture image.
 * The picture icon can be controlled like any other picture.
 * 
 * @arg General
 * 
 * @arg PictureID:eval
 * @text Picture ID Number
 * @parent General
 * @desc What is the ID of the picture you wish to show at? Use a
 * number between 1 and 100. You may use JavaScript code.
 * @default 1
 * 
 * @arg IconIndex:eval
 * @text Icon Index
 * @parent General
 * @desc Select the icon index to use for this picture.
 * You may use JavaScript code.
 * @default 23
 *
 * @arg Smooth:eval
 * @text Smooth Icon?
 * @parent General
 * @type boolean
 * @on Smooth
 * @off Pixelate
 * @desc This will make the icon smoothed out or pixelated.
 * @default false
 * 
 * @arg PictureSettings
 * @text Picture Settings
 *
 * @arg Settings:struct
 * @text Settings
 * @parent PictureSettings
 * @type struct<ShowPicture>
 * @desc Alter the settings for how the picture will be shown.
 * @default {"Position":"","Origin:num":"0","PositionX:eval":"0","PositionY:eval":"0","Scale":"","ScaleX:eval":"100","ScaleY:eval":"100","Blend":"","Opacity:eval":"255","BlendMode:num":"0"}
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command ScreenShake
 * @text Screen Shake: Custom
 * @desc Creates a custom screen shake effect and also sets
 * the following uses of screen shake to this style.
 *
 * @arg Type:str
 * @text Shake Style
 * @type select
 * @option Original
 * @value original
 * @option Random
 * @value random
 * @option Horizontal
 * @value horizontal
 * @option Vertical
 * @value vertical
 * @desc Select shake style type.
 * @default random
 *
 * @arg Power:num
 * @text Power
 * @type number
 * @min 1
 * @max 9
 * @desc Power level for screen shake.
 * @default 5
 *
 * @arg Speed:num
 * @text Speed
 * @type number
 * @min 1
 * @max 9
 * @desc Speed level for screen shake.
 * @default 5
 *
 * @arg Duration:eval
 * @text Duration
 * @desc Duration of screenshake.
 * You can use code as well.
 * @default 60
 *
 * @arg Wait:eval
 * @text Wait for Completion
 * @parent Duration:eval
 * @type boolean
 * @on Wait
 * @off Don't Wait
 * @desc Wait until completion before moving onto the next event?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchRandomizeOne
 * @text Switches: Randomize ID(s)
 * @desc Select specific Switch ID's to randomize ON/OFF.
 *
 * @arg IDs:arraynum
 * @text Switch ID(s)
 * @type switch[]
 * @desc Select which Switch ID(s) to toggle.
 * @default ["1"]
 *
 * @arg Chance:num
 * @text Chance for ON
 * @type number
 * @min 1
 * @max 100
 * @desc Chance out of 100 that determines the switches to be ON.
 * @default 50
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchRandomizeRange
 * @text Switches: Randomize Range
 * @desc Select specific Switch ID Range to randomize ON/OFF.
 * The ratio determines the ON/OFF distribution.
 *
 * @arg StartID:num
 * @text Starting ID
 * @type switch
 * @desc The starting ID of the Switch to toggle.
 * @default 1
 *
 * @arg EndingID:num
 * @text Ending ID
 * @type switch
 * @desc The ending ID of the Switch to toggle.
 * @default 20
 *
 * @arg Chance:num
 * @text Chance for ON
 * @type number
 * @min 1
 * @max 100
 * @desc Chance out of 100 that determines the switches to be ON.
 * @default 50
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchToggleOne
 * @text Switches: Toggle ID(s)
 * @desc Select specific Switch ID's to toggle ON/OFF.
 * ON becomes OFF. OFF becomes ON.
 *
 * @arg IDs:arraynum
 * @text Switch ID(s)
 * @type switch[]
 * @desc Select which Switch ID(s) to toggle.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchToggleRange
 * @text Switches: Toggle Range
 * @desc Select specific Switch ID Range to toggle ON/OFF.
 * ON becomes OFF. OFF becomes ON.
 *
 * @arg StartID:num
 * @text Starting ID
 * @type switch
 * @desc The starting ID of the Switch to toggle.
 * @default 1
 *
 * @arg EndingID:num
 * @text Ending ID
 * @type switch
 * @desc The ending ID of the Switch to toggle.
 * @default 20
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetBattleSystem
 * @text System: Battle System Change
 * @desc Switch to a different battle system in-game.
 * Some battle systems REQUIRE their specific plugins!
 *
 * @arg option:str
 * @text Change To
 * @type select
 * @option Database Default (Use game database setting)
 * @value database
 * @option -
 * @value database
 * @option DTB: Default Turn Battle
 * @value dtb
 * @option TPB Active: Time Progress Battle (Active)
 * @value tpb active
 * @option TPB Wait: Time Progress Battle (Wait)
 * @value tpb wait
 * @option -
 * @value database
 * @option BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 * @value btb
 * @option CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 * @value ctb
 * @option ETB: Energy Turn Battle (Req VisuMZ_2_BattleSystemETB)
 * @value etb
 * @option FTB: Free Turn Battle (Req VisuMZ_2_BattleSystemFTB)
 * @value ftb
 * @option OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 * @value otb
 * @option PTB: Press Turn Battle (Req VisuMZ_2_BattleSystemPTB)
 * @value ptb
 * @option STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 * @value stb
 * @desc Choose which battle system to switch to.
 * @default database
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemLoadImages
 * @text System: Load Images
 * @desc Allows you to (pre) load up images ahead of time.
 *
 * @arg animations:arraystr
 * @text img/animations/
 * @type file[]
 * @dir img/animations/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg battlebacks1:arraystr
 * @text img/battlebacks1/
 * @type file[]
 * @dir img/battlebacks1/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg battlebacks2:arraystr
 * @text img/battlebacks2/
 * @type file[]
 * @dir img/battlebacks2/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg characters:arraystr
 * @text img/characters/
 * @type file[]
 * @dir img/characters/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg enemies:arraystr
 * @text img/enemies/
 * @type file[]
 * @dir img/enemies/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg faces:arraystr
 * @text img/faces/
 * @type file[]
 * @dir img/faces/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg parallaxes:arraystr
 * @text img/parallaxes/
 * @type file[]
 * @dir img/parallaxes/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg pictures:arraystr
 * @text img/pictures/
 * @type file[]
 * @dir img/pictures/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg sv_actors:arraystr
 * @text img/sv_actors/
 * @type file[]
 * @dir img/sv_actors/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg sv_enemies:arraystr
 * @text img/sv_enemies/
 * @type file[]
 * @dir img/sv_enemies/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg system:arraystr
 * @text img/system/
 * @type file[]
 * @dir img/system/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg tilesets:arraystr
 * @text img/tilesets/
 * @type file[]
 * @dir img/tilesets/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg titles1:arraystr
 * @text img/titles1/
 * @type file[]
 * @dir img/titles1/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg titles2:arraystr
 * @text img/titles2/
 * @type file[]
 * @dir img/titles2/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetFontSize
 * @text System: Main Font Size
 * @desc Set the game's main font size.
 *
 * @arg option:num
 * @text Change To
 * @type number
 * @min 1
 * @desc Change the font size to this number.
 * @default 26
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetSideView
 * @text System: Side View Battle
 * @desc Switch between Front View or Side View for battle.
 *
 * @arg option:str
 * @text Change To
 * @type select
 * @option Front View
 * @value Front View
 * @option Side View
 * @value Side View
 * @option Toggle
 * @value Toggle
 * @desc Choose which view type to switch to.
 * @default Toggle
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetWindowPadding
 * @text System: Window Padding
 * @desc Change the game's window padding amount.
 *
 * @arg option:num
 * @text Change To
 * @type number
 * @min 1
 * @desc Change the game's standard window padding to this value.
 * Default: 12
 * @default 12
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param CoreEngine
 * @default Plugin Parameters
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param QoL:struct
 * @text Quality of Life Settings
 * @type struct<QoLSettings>
 * @desc Quality of Life settings for both developers and players.
 * @default {"PlayTest":"","NewGameBoot:eval":"false","ForceNoPlayTest:eval":"false","OpenConsole:eval":"true","F6key:eval":"true","F7key:eval":"true","NewGameCommonEvent:num":"0","DigitGrouping":"","DigitGroupingStandardText:eval":"true","DigitGroupingExText:eval":"true","DigitGroupingDamageSprites:eval":"true","DigitGroupingGaugeSprites:eval":"true","DigitGroupingLocale:str":"en-US","PlayerBenefit":"","EncounterRateMinimum:num":"10","EscapeAlways:eval":"true","ImprovedAccuracySystem:eval":"true","AccuracyBoost:eval":"true","LevelUpFullHp:eval":"true","LevelUpFullMp:eval":"true","Misc":"","AntiZoomPictures:eval":"true","AutoStretch:str":"stretch","FontShadows:eval":"false","FontSmoothing:eval":"true","KeyItemProtect:eval":"true","ModernControls:eval":"true","NoTileShadows:eval":"true","PixelateImageRendering:eval":"false","RequireFocus:eval":"true","SmartEventCollisionPriority:eval":"true"}
 * 
 * @param BattleSystem:str
 * @text Battle System
 * @type select
 * @option Database Default (Use game database setting)
 * @value database
 * @option -
 * @value database
 * @option DTB: Default Turn Battle
 * @value dtb
 * @option TPB Active: Time Progress Battle (Active)
 * @value tpb active
 * @option TPB wait: Time Progress Battle (Wait)
 * @value tpb wait
 * @option -
 * @value database
 * @option BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 * @value btb
 * @option CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 * @value ctb
 * @option ETB: Energy Turn Battle (Req VisuMZ_2_BattleSystemETB)
 * @value etb
 * @option FTB: Free Turn Battle (Req VisuMZ_2_BattleSystemFTB)
 * @value ftb
 * @option OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 * @value otb
 * @option PTB: Press Turn Battle (Req VisuMZ_2_BattleSystemPTB)
 * @value ptb
 * @option STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 * @value stb
 * @desc Choose which battle system to use for your game.
 * Some battle systems REQUIRE their specific plugins!
 * @default database
 *
 * @param Color:struct
 * @text Color Settings
 * @type struct<Color>
 * @desc Change the colors used for in-game text.
 * @default {"BasicColors":"","ColorNormal:str":"0","ColorSystem:str":"16","ColorCrisis:str":"17","ColorDeath:str":"18","ColorGaugeBack:str":"19","ColorHPGauge1:str":"20","ColorHPGauge2:str":"21","ColorMPGauge1:str":"22","ColorMPGauge2:str":"23","ColorMPCost:str":"23","ColorPowerUp:str":"24","ColorPowerDown:str":"25","ColorCTGauge1:str":"26","ColorCTGauge2:str":"27","ColorTPGauge1:str":"28","ColorTPGauge2:str":"29","ColorTPCost:str":"29","ColorPending:str":"#2a847d","ColorExpGauge1:str":"30","ColorExpGauge2:str":"31","ColorMaxLvGauge1:str":"14","ColorMaxLvGauge2:str":"6","AlphaColors":"","OutlineColor:str":"rgba(0, 0, 0, 0.6)","DimColor1:str":"rgba(0, 0, 0, 0.6)","DimColor2:str":"rgba(0, 0, 0, 0)","ItemBackColor1:str":"rgba(32, 32, 32, 0.5)","ItemBackColor2:str":"rgba(0, 0, 0, 0.5)","ConditionalColors":"","ActorHPColor:func":"\"// Set the variables used in this function.\\nlet actor = arguments[0];\\n\\n// Check if the actor exists. If not, return normal.\\nif (!actor) {\\n    return this.normalColor();\\n\\n// If the actor is dead, return death color.\\n} else if (actor.isDead()) {\\n    return this.deathColor();\\n\\n// If the actor is dying, return crisis color.\\n} else if (actor.isDying()) {\\n    return this.crisisColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","ActorMPColor:func":"\"// Set the variables used in this function.\\nlet actor = arguments[0];\\n\\n// Check if the actor exists. If not, return normal.\\nif (!actor) {\\n    return this.normalColor();\\n\\n// If MP rate is below 25%, return crisis color.\\n} else if (actor.mpRate() < 0.25) {\\n    return this.crisisColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","ActorTPColor:func":"\"// Set the variables used in this function.\\nlet actor = arguments[0];\\n\\n// Check if the actor exists. If not, return normal.\\nif (!actor) {\\n    return this.normalColor();\\n\\n// If TP rate is below 25%, return crisis color.\\n} else if (actor.tpRate() < 0.25) {\\n    return this.crisisColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","ParamChange:func":"\"// Set the variables used in this function.\\nlet change = arguments[0];\\n\\n// If a positive change, use power up color.\\nif (change > 0) {\\n    return this.powerUpColor();\\n\\n// If a negative change, use power down color.\\n} else if (change < 0) {\\n    return this.powerDownColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","DamageColor:func":"\"// Set the variables used in this function.\\nlet colorType = arguments[0];\\n\\n// Check the value of the color type\\n// and return an appropriate color.\\nswitch (colorType) {\\n\\n    case 0: // HP damage\\n        return \\\"#ffffff\\\";\\n\\n    case 1: // HP recover\\n        return \\\"#b9ffb5\\\";\\n\\n    case 2: // MP damage\\n        return \\\"#bb88bb\\\";\\n\\n    case 3: // MP recover\\n        return \\\"#80b0ff\\\";\\n\\n    default:\\n        return \\\"#808080\\\";\\n}\""}
 *
 * @param Gold:struct
 * @text Gold Settings
 * @type struct<Gold>
 * @desc Change up how gold operates and is displayed in-game.
 * @default {"GoldMax:num":"999999999","GoldFontSize:num":"24","GoldIcon:num":"314","GoldOverlap:str":"A Lot","ItemStyle:eval":"true"}
 *
 * @param ImgLoad:struct
 * @text Image Loading
 * @type struct<ImgLoad>
 * @desc Game images that will be loaded upon booting up the game.
 * Use this responsibly!!!
 * @default {"animations:arraystr":"[]","battlebacks1:arraystr":"[]","battlebacks2:arraystr":"[]","characters:arraystr":"[]","enemies:arraystr":"[]","faces:arraystr":"[]","parallaxes:arraystr":"[]","pictures:arraystr":"[]","sv_actors:arraystr":"[]","sv_enemies:arraystr":"[]","system:arraystr":"[\"Balloon\",\"IconSet\"]","tilesets:arraystr":"[]","titles1:arraystr":"[]","titles2:arraystr":"[]"}
 *
 * @param KeyboardInput:struct
 * @text Keyboard Input
 * @type struct<KeyboardInput>
 * @desc Settings for the game that utilize keyboard input.
 * @default {"Controls":"","WASD:eval":"false","DashToggleR:eval":"false","NameInput":"","EnableNameInput:eval":"true","DefaultMode:str":"keyboard","QwertyLayout:eval":"true","NameInputMessage:eval":"\"Type in this character's name.\\nPress \\\\c[5]ENTER\\\\c[0] when you're done.\\n\\n-or-\\n\\nPress \\\\c[5]arrow keys\\\\c[0]/\\\\c[5]TAB\\\\c[0] to switch\\nto manual character entry.\\n\\nPress \\\\c[5]ESC\\\\c[0]/\\\\c[5]TAB\\\\c[0] to use to keyboard.\"","NumberInput":"","EnableNumberInput:eval":"true","ButtonAssist":"","Keyboard:str":"Keyboard","Manual:str":"Manual"}
 *
 * @param MenuBg:struct
 * @text Menu Background Settings
 * @type struct<MenuBg>
 * @desc Change how menu backgrounds look for each scene.
 * @default {"Scene_Menu:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Item:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Skill:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Equip:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Status:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Options:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Save:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Load:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_GameEnd:struct":"{\"SnapshotOpacity:num\":\"128\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Shop:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Name:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Unlisted:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}"}
 *
 * @param ButtonAssist:struct
 * @text Menu Button Assist Window
 * @type struct<ButtonAssist>
 * @desc Settings pertaining to the Button Assist window found in in-game menus.
 * @default {"General":"","Enable:eval":"true","Location:str":"bottom","BgType:num":"0","Text":"","TextFmt:str":"%1:%2","MultiKeyFmt:str":"%1/%2","OkText:str":"Select","CancelText:str":"Back","SwitchActorText:str":"Switch Ally","Keys":"","KeyUnlisted:str":"\\}❪%1❫\\{","KeyUP:str":"^","KeyDOWN:str":"v","KeyLEFT:str":"<<","KeyRIGHT:str":">>","KeySHIFT:str":"\\}❪SHIFT❫\\{","KeyTAB:str":"\\}❪TAB❫\\{","KeyA:str":"A","KeyB:str":"B","KeyC:str":"C","KeyD:str":"D","KeyE:str":"E","KeyF:str":"F","KeyG:str":"G","KeyH:str":"H","KeyI:str":"I","KeyJ:str":"J","KeyK:str":"K","KeyL:str":"L","KeyM:str":"M","KeyN:str":"N","KeyO:str":"O","KeyP:str":"P","KeyQ:str":"Q","KeyR:str":"R","KeyS:str":"S","KeyT:str":"T","KeyU:str":"U","KeyV:str":"V","KeyW:str":"W","KeyX:str":"X","KeyY:str":"Y","KeyZ:str":"Z"}
 *
 * @param MenuLayout:struct
 * @text Menu Layout Settings
 * @type struct<MenuLayout>
 * @desc Change how menu layouts look for each scene.
 * @default {"Title:struct":"{\"TitleScreen\":\"\",\"DocumentTitleFmt:str\":\"%1: %2 - Version %3\",\"Subtitle:str\":\"Subtitle\",\"Version:str\":\"0.00\",\"drawGameTitle:func\":\"\\\"const x = 20;\\\\nconst y = Graphics.height / 4;\\\\nconst maxWidth = Graphics.width - x * 2;\\\\nconst text = $dataSystem.gameTitle;\\\\nconst bitmap = this._gameTitleSprite.bitmap;\\\\nbitmap.fontFace = $gameSystem.mainFontFace();\\\\nbitmap.outlineColor = \\\\\\\"black\\\\\\\";\\\\nbitmap.outlineWidth = 8;\\\\nbitmap.fontSize = 72;\\\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\\\\\"center\\\\\\\");\\\"\",\"drawGameSubtitle:func\":\"\\\"const x = 20;\\\\nconst y = Graphics.height / 4 + 72;\\\\nconst maxWidth = Graphics.width - x * 2;\\\\nconst text = Scene_Title.subtitle;\\\\nconst bitmap = this._gameTitleSprite.bitmap;\\\\nbitmap.fontFace = $gameSystem.mainFontFace();\\\\nbitmap.outlineColor = \\\\\\\"black\\\\\\\";\\\\nbitmap.outlineWidth = 6;\\\\nbitmap.fontSize = 48;\\\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\\\\\"center\\\\\\\");\\\"\",\"drawGameVersion:func\":\"\\\"const bitmap = this._gameTitleSprite.bitmap;\\\\nconst x = 0;\\\\nconst y = Graphics.height - 20;\\\\nconst width = Math.round(Graphics.width / 4);\\\\nconst height = 20;\\\\nconst c1 = ColorManager.dimColor1();\\\\nconst c2 = ColorManager.dimColor2();\\\\nconst text = 'Version ' + Scene_Title.version;\\\\nbitmap.gradientFillRect(x, y, width, height, c1, c2);\\\\nbitmap.fontFace = $gameSystem.mainFontFace();\\\\nbitmap.outlineColor = \\\\\\\"black\\\\\\\";\\\\nbitmap.outlineWidth = 3;\\\\nbitmap.fontSize = 16;\\\\nbitmap.drawText(text, x + 4, y, Graphics.width, height, \\\\\\\"left\\\\\\\");\\\"\",\"CommandRect:func\":\"\\\"const offsetX = $dataSystem.titleCommandWindow.offsetX;\\\\nconst offsetY = $dataSystem.titleCommandWindow.offsetY;\\\\nconst rows = this.commandWindowRows();\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = (Graphics.boxWidth - width) / 2 + offsetX;\\\\nconst y = Graphics.boxHeight - height - 96 + offsetY;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ButtonFadeSpeed:num\":\"4\"}","MainMenu:struct":"{\"CommandWindow\":\"\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const width = this.mainCommandWidth();\\\\nconst height = this.mainAreaHeight() - this.goldWindowRect().height;\\\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"GoldWindow\":\"\",\"GoldBgType:num\":\"0\",\"GoldRect:func\":\"\\\"const rows = 1;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\\\nconst y = this.mainAreaBottom() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const width = Graphics.boxWidth - this.mainCommandWidth();\\\\nconst height = this.mainAreaHeight();\\\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","ItemMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.helpAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.helpAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CategoryWindow\":\"\",\"CategoryBgType:num\":\"0\",\"CategoryRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ItemWindow\":\"\",\"ItemBgType:num\":\"0\",\"ItemRect:func\":\"\\\"const x = 0;\\\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaBottom() - y;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ActorWindow\":\"\",\"ActorBgType:num\":\"0\",\"ActorRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","SkillMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.helpAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.helpAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"SkillTypeWindow\":\"\",\"SkillTypeBgType:num\":\"0\",\"SkillTypeRect:func\":\"\\\"const rows = 3;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const width = Graphics.boxWidth - this.mainCommandWidth();\\\\nconst height = this._skillTypeWindow.height;\\\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ItemWindow\":\"\",\"ItemBgType:num\":\"0\",\"ItemRect:func\":\"\\\"const x = 0;\\\\nconst y = this._statusWindow.y + this._statusWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._statusWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ActorWindow\":\"\",\"ActorBgType:num\":\"0\",\"ActorRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","EquipMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.helpAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.helpAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = this.statusWidth();\\\\nconst height = this.mainAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CommandWindow\":\"\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const x = this.statusWidth();\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"SlotWindow\":\"\",\"SlotBgType:num\":\"0\",\"SlotRect:func\":\"\\\"const commandWindowRect = this.commandWindowRect();\\\\nconst x = this.statusWidth();\\\\nconst y = commandWindowRect.y + commandWindowRect.height;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this.mainAreaHeight() - commandWindowRect.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ItemWindow\":\"\",\"ItemBgType:num\":\"0\",\"ItemRect:func\":\"\\\"return this.slotWindowRect();\\\"\"}","StatusMenu:struct":"{\"ProfileWindow\":\"\",\"ProfileBgType:num\":\"0\",\"ProfileRect:func\":\"\\\"const width = Graphics.boxWidth;\\\\nconst height = this.profileHeight();\\\\nconst x = 0;\\\\nconst y = this.mainAreaBottom() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.statusParamsWindowRect().y - y;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusParamsWindow\":\"\",\"StatusParamsBgType:num\":\"0\",\"StatusParamsRect:func\":\"\\\"const width = this.statusParamsWidth();\\\\nconst height = this.statusParamsHeight();\\\\nconst x = 0;\\\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusEquipWindow\":\"\",\"StatusEquipBgType:num\":\"0\",\"StatusEquipRect:func\":\"\\\"const width = Graphics.boxWidth - this.statusParamsWidth();\\\\nconst height = this.statusParamsHeight();\\\\nconst x = this.statusParamsWidth();\\\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","OptionsMenu:struct":"{\"OptionsWindow\":\"\",\"OptionsBgType:num\":\"0\",\"OptionsRect:func\":\"\\\"const n = Math.min(this.maxCommands(), this.maxVisibleCommands());\\\\nconst width = 400;\\\\nconst height = this.calcWindowHeight(n, true);\\\\nconst x = (Graphics.boxWidth - width) / 2;\\\\nconst y = (Graphics.boxHeight - height) / 2;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","SaveMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, false);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ListWindow\":\"\",\"ListBgType:num\":\"0\",\"ListRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","LoadMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, false);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ListWindow\":\"\",\"ListBgType:num\":\"0\",\"ListRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","GameEnd:struct":"{\"CommandList:arraystruct\":\"[\\\"{\\\\\\\"Symbol:str\\\\\\\":\\\\\\\"toTitle\\\\\\\",\\\\\\\"TextStr:str\\\\\\\":\\\\\\\"Untitled\\\\\\\",\\\\\\\"TextJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return TextManager.toTitle;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ShowJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"EnableJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ExtJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return null;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CallHandlerJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"SceneManager._scene.commandToTitle();\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Symbol:str\\\\\\\":\\\\\\\"cancel\\\\\\\",\\\\\\\"TextStr:str\\\\\\\":\\\\\\\"Untitled\\\\\\\",\\\\\\\"TextJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return TextManager.cancel;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ShowJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"EnableJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ExtJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return null;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CallHandlerJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"SceneManager._scene.popScene();\\\\\\\\\\\\\\\"\\\\\\\"}\\\"]\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const rows = 2;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = (Graphics.boxWidth - width) / 2;\\\\nconst y = (Graphics.boxHeight - height) / 2;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","ShopMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const wx = 0;\\\\nconst wy = this.helpAreaTop();\\\\nconst ww = Graphics.boxWidth;\\\\nconst wh = this.helpAreaHeight();\\\\nreturn new Rectangle(wx, wy, ww, wh);\\\"\",\"GoldWindow\":\"\",\"GoldBgType:num\":\"0\",\"GoldRect:func\":\"\\\"const rows = 1;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = Graphics.boxWidth - width;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CommandWindow\":\"\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = this._goldWindow.x;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"DummyWindow\":\"\",\"DummyBgType:num\":\"0\",\"DummyRect:func\":\"\\\"const x = 0;\\\\nconst y = this._commandWindow.y + this._commandWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._commandWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"NumberWindow\":\"\",\"NumberBgType:num\":\"0\",\"NumberRect:func\":\"\\\"const x = 0;\\\\nconst y = this._dummyWindow.y;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this._dummyWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const width = this.statusWidth();\\\\nconst height = this._dummyWindow.height;\\\\nconst x = Graphics.boxWidth - width;\\\\nconst y = this._dummyWindow.y;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"BuyWindow\":\"\",\"BuyBgType:num\":\"0\",\"BuyRect:func\":\"\\\"const x = 0;\\\\nconst y = this._dummyWindow.y;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this._dummyWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CategoryWindow\":\"\",\"CategoryBgType:num\":\"0\",\"CategoryRect:func\":\"\\\"const x = 0;\\\\nconst y = this._dummyWindow.y;\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"SellWindow\":\"\",\"SellBgType:num\":\"0\",\"SellRect:func\":\"\\\"const x = 0;\\\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height =\\\\n    this.mainAreaHeight() -\\\\n    this._commandWindow.height -\\\\n    this._categoryWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","NameMenu:struct":"{\"EditWindow\":\"\",\"EditBgType:num\":\"0\",\"EditRect:func\":\"\\\"const rows = 9;\\\\nconst inputWindowHeight = this.calcWindowHeight(rows, true);\\\\nconst padding = $gameSystem.windowPadding();\\\\nconst width = 600;\\\\nconst height = Math.min(ImageManager.faceHeight + padding * 2, this.mainAreaHeight() - inputWindowHeight);\\\\nconst x = (Graphics.boxWidth - width) / 2;\\\\nconst y = (this.mainAreaHeight() - (height + inputWindowHeight)) / 2 + this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"InputWindow\":\"\",\"InputBgType:num\":\"0\",\"InputRect:func\":\"\\\"const x = this._editWindow.x;\\\\nconst y = this._editWindow.y + this._editWindow.height;\\\\nconst rows = 9;\\\\nconst width = this._editWindow.width;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}"}
 *
 * @param Param:struct
 * @text Parameter Settings
 * @type struct<Param>
 * @desc Change up the limits of parameters and how they're calculated.
 * @default {"DisplayedParams:arraystr":"[\"ATK\",\"DEF\",\"MAT\",\"MDF\",\"AGI\",\"LUK\"]","ExtDisplayedParams:arraystr":"[\"MaxHP\",\"MaxMP\",\"ATK\",\"DEF\",\"MAT\",\"MDF\",\"AGI\",\"LUK\"]","BasicParameters":"","CrisisRate:num":"0.25","BasicParameterFormula:func":"\"// Determine the variables used in this calculation.\\nlet paramId = arguments[0];\\nlet base = this.paramBase(paramId);\\nlet plus = this.paramPlus(paramId);\\nlet paramRate = this.paramRate(paramId);\\nlet buffRate = this.paramBuffRate(paramId);\\nlet flatBonus = this.paramFlatBonus(paramId);\\n\\n// Formula to determine total parameter value.\\nlet value = (base + plus) * paramRate * buffRate + flatBonus;\\n\\n// Determine the limits\\nconst maxValue = this.paramMax(paramId);\\nconst minValue = this.paramMin(paramId);\\n\\n// Final value\\nreturn Math.round(value.clamp(minValue, maxValue));\"","BasicParamCaps":"","BasicActorParamCaps":"","BasicActorParamMax0:str":"9999","BasicActorParamMax1:str":"9999","BasicActorParamMax2:str":"999","BasicActorParamMax3:str":"999","BasicActorParamMax4:str":"999","BasicActorParamMax5:str":"999","BasicActorParamMax6:str":"999","BasicActorParamMax7:str":"999","BasicEnemyParamCaps":"","BasicEnemyParamMax0:str":"999999","BasicEnemyParamMax1:str":"9999","BasicEnemyParamMax2:str":"999","BasicEnemyParamMax3:str":"999","BasicEnemyParamMax4:str":"999","BasicEnemyParamMax5:str":"999","BasicEnemyParamMax6:str":"999","BasicEnemyParamMax7:str":"999","XParameters":"","XParameterFormula:func":"\"// Determine the variables used in this calculation.\\nlet xparamId = arguments[0];\\nlet base = this.traitsSum(Game_BattlerBase.TRAIT_XPARAM, xparamId);\\nlet plus = this.xparamPlus(xparamId);\\nlet paramRate = this.xparamRate(xparamId);\\nlet flatBonus = this.xparamFlatBonus(xparamId);\\n\\n// Formula to determine total parameter value.\\nlet value = (base + plus) * paramRate + flatBonus;\\n\\n// Final value\\nreturn value;\"","XParamVocab":"","XParamVocab0:str":"Hit","XParamVocab1:str":"Evasion","XParamVocab2:str":"Critical Rate","XParamVocab3:str":"Critical Evade","XParamVocab4:str":"Magic Evade","XParamVocab5:str":"Magic Reflect","XParamVocab6:str":"Counter","XParamVocab7:str":"HP Regen","XParamVocab8:str":"MP Regen","XParamVocab9:str":"TP Regen","SParameters":"","SParameterFormula:func":"\"// Determine the variables used in this calculation.\\nlet sparamId = arguments[0];\\nlet base = this.traitsPi(Game_BattlerBase.TRAIT_SPARAM, sparamId);\\nlet plus = this.sparamPlus(sparamId);\\nlet paramRate = this.sparamRate(sparamId);\\nlet flatBonus = this.sparamFlatBonus(sparamId);\\n\\n// Formula to determine total parameter value.\\nlet value = (base + plus) * paramRate + flatBonus;\\n\\n// Final value\\nreturn value;\"","SParamVocab":"","SParamVocab0:str":"Aggro","SParamVocab1:str":"Guard","SParamVocab2:str":"Recovery","SParamVocab3:str":"Item Effect","SParamVocab4:str":"MP Cost","SParamVocab5:str":"TP Charge","SParamVocab6:str":"Physical DMG","SParamVocab7:str":"Magical DMG","SParamVocab8:str":"Floor DMG","SParamVocab9:str":"EXP Gain","Icons":"","DrawIcons:eval":"true","IconParam0:str":"84","IconParam1:str":"165","IconParam2:str":"76","IconParam3:str":"81","IconParam4:str":"101","IconParam5:str":"133","IconParam6:str":"140","IconParam7:str":"87","IconXParam0:str":"102","IconXParam1:str":"82","IconXParam2:str":"78","IconXParam3:str":"82","IconXParam4:str":"171","IconXParam5:str":"222","IconXParam6:str":"77","IconXParam7:str":"72","IconXParam8:str":"72","IconXParam9:str":"72","IconSParam0:str":"5","IconSParam1:str":"128","IconSParam2:str":"72","IconSParam3:str":"176","IconSParam4:str":"165","IconSParam5:str":"164","IconSParam6:str":"76","IconSParam7:str":"79","IconSParam8:str":"141","IconSParam9:str":"73"}
 *
 * @param CustomParam:arraystruct
 * @text Custom Parameters
 * @parent Param:struct
 * @type struct<CustomParam>[]
 * @desc Create custom parameters for your game!
 * These will appear in VisuStella MZ menus.
 * @default ["{\"ParamName:str\":\"Strength\",\"Abbreviation:str\":\"str\",\"Icon:num\":\"77\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.atk * 0.75) + (user.def * 0.25);\\\"\"}","{\"ParamName:str\":\"Dexterity\",\"Abbreviation:str\":\"dex\",\"Icon:num\":\"82\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.agi * 0.75) + (user.atk * 0.25);\\\"\"}","{\"ParamName:str\":\"Constitution\",\"Abbreviation:str\":\"con\",\"Icon:num\":\"81\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.def * 0.75) + (user.mdf * 0.25);\\\"\"}","{\"ParamName:str\":\"Intelligence\",\"Abbreviation:str\":\"int\",\"Icon:num\":\"79\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.mat * 0.75) + (user.mdf * 0.25);\\\"\"}","{\"ParamName:str\":\"Wisdom\",\"Abbreviation:str\":\"wis\",\"Icon:num\":\"72\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.mdf * 0.75) + (user.luk * 0.25);\\\"\"}","{\"ParamName:str\":\"Charisma\",\"Abbreviation:str\":\"cha\",\"Icon:num\":\"84\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.luk * 0.75) + (user.agi * 0.25);\\\"\"}"]
 *
 * @param ScreenResolution:struct
 * @text Screen Resolution Settings
 * @type struct<ScreenResolution>
 * @desc Alter various properties to make the game look better for varying screen resolutions.
 * @default {"Troops":"","RepositionActors:eval":"true","RepositionEnemies:eval":"true","RepositionEnemies130:eval":"false"}
 *
 * @param ScreenShake:struct
 * @text Screen Shake Settings
 * @type struct<ScreenShake>
 * @desc Get more screen shake effects into your game!
 * @default {"DefaultStyle:str":"random","originalJS:func":"\"// Calculation\\nthis.x += Math.round($gameScreen.shake());\"","randomJS:func":"\"// Calculation\\n// Original Formula by Aries of Sheratan\\nconst power = $gameScreen._shakePower * 0.75;\\nconst speed = $gameScreen._shakeSpeed * 0.60;\\nconst duration = $gameScreen._shakeDuration;\\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\"","horzJS:func":"\"// Calculation\\n// Original Formula by Aries of Sheratan\\nconst power = $gameScreen._shakePower * 0.75;\\nconst speed = $gameScreen._shakeSpeed * 0.60;\\nconst duration = $gameScreen._shakeDuration;\\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\"","vertJS:func":"\"// Calculation\\n// Original Formula by Aries of Sheratan\\nconst power = $gameScreen._shakePower * 0.75;\\nconst speed = $gameScreen._shakeSpeed * 0.60;\\nconst duration = $gameScreen._shakeDuration;\\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\""}
 *
 * @param TitleCommandList:arraystruct
 * @text Title Command List
 * @type struct<Command>[]
 * @desc Window commands used by the title screen.
 * Add new commands here.
 * @default ["{\"Symbol:str\":\"newGame\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.newGame;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandNewGame();\\\"\"}","{\"Symbol:str\":\"continue\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.continue_;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return DataManager.isAnySavefileExists();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandContinue();\\\"\"}","{\"Symbol:str\":\"options\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.options;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandOptions();\\\"\"}","{\"Symbol:str\":\"shutdown\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.gameEnd;\\\"\",\"ShowJS:func\":\"\\\"return Utils.isNwjs();\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager.exit();\\\\n\\\\n// Note!\\\\n// Do NOT use this command with mobile devices or\\\\n// browser games. All it does is cause the game to\\\\n// display a blank, black canvas which the player\\\\n// is unable to do anything with. It does NOT force\\\\n// close the browser tab nor the app.\\\"\"}"]
 *
 * @param TitlePicButtons:arraystruct
 * @text Title Picture Buttons
 * @type struct<TitlePictureButton>[]
 * @desc Buttons that can be inserted into the title screen.
 * Add new title buttons here.
 * @default []
 *
 * @param UI:struct
 * @text UI Settings
 * @type struct<UI>
 * @desc Change up various in-game UI aspects.
 * @default {"UIArea":"","FadeSpeed:num":"24","BoxMargin:num":"4","CommandWidth:num":"240","BottomHelp:eval":"false","RightMenus:eval":"true","ShowButtons:eval":"true","cancelShowButton:eval":"true","menuShowButton:eval":"true","pagedownShowButton:eval":"true","numberShowButton:eval":"true","ButtonHeight:num":"52","BottomButtons:eval":"false","SideButtons:eval":"true","MenuObjects":"","LvExpGauge:eval":"true","ParamArrow:str":"→","TextCodeSupport":"","TextCodeClassNames:eval":"true","TextCodeNicknames:eval":"true"}
 *
 * @param Window:struct
 * @text Window Settings
 * @type struct<Window>
 * @desc Adjust various in-game window settings.
 * @default {"WindowDefaults":"","EnableMasking:eval":"false","LineHeight:num":"36","SelectableItems":"","ShowItemBackground:eval":"true","ItemHeight:num":"8","DrawItemBackgroundJS:func":"\"const rect = arguments[0];\\nconst c1 = ColorManager.itemBackColor1();\\nconst c2 = ColorManager.itemBackColor2();\\nconst x = rect.x;\\nconst y = rect.y;\\nconst w = rect.width;\\nconst h = rect.height;\\nthis.contentsBack.gradientFillRect(x, y, w, h, c1, c2, true);\\nthis.contentsBack.strokeRect(x, y, w, h, c1);\"","ItemPadding:num":"8","BackOpacity:num":"192","TranslucentOpacity:num":"160","OpenSpeed:num":"32","ColSpacing:num":"8","RowSpacing:num":"4"}
 *
 * @param jsQuickFunc:arraystruct
 * @text JS: Quick Functions
 * @type struct<jsQuickFunc>[]
 * @desc Create quick JavaScript functions available from the
 * global namespace. Use with caution and moderation!!!
 * @default ["{\"FunctionName:str\":\"Example\",\"CodeJS:json\":\"\\\"// Insert this as a function anywhere you can input code\\\\n// such as Script Calls or Conditional Branch Scripts.\\\\n\\\\n// Process Code\\\\nreturn 'Example';\\\"\"}","{\"FunctionName:str\":\"Bad  Code  Name\",\"CodeJS:json\":\"\\\"// If a function name has spaces in them, the spaces will\\\\n// be removed. \\\\\\\"Bad  Code  Name\\\\\\\" becomes \\\\\\\"BadeCodeName\\\\\\\".\\\\n\\\\n// Process Code\\\\nOhNoItsBadCode()\\\\n\\\\n// If a function has bad code, a fail safe will catch the\\\\n// error and display it in the console.\\\"\"}","{\"FunctionName:str\":\"RandomNumber\",\"CodeJS:json\":\"\\\"// This generates a random number from 0 to itself.\\\\n// Example: RandomNumber(10)\\\\n\\\\n// Process Code\\\\nconst number = (arguments[0] || 0) + 1;\\\\nreturn Math.floor(number * Math.random());\\\"\"}","{\"FunctionName:str\":\"RandomBetween\",\"CodeJS:json\":\"\\\"// This generates a random number between two arguments.\\\\n// Example: RandomNumber(5, 10)\\\\n\\\\n// Process Code\\\\nlet min = Math.min(arguments[0] || 0, arguments[1] || 0);\\\\nlet max = Math.max(arguments[0] || 0, arguments[1] || 0);\\\\nreturn Math.floor(Math.random() * (max - min + 1) + min);\\\"\"}","{\"FunctionName:str\":\"RandomFrom\",\"CodeJS:json\":\"\\\"// Selects a number from the list of inserted numbers.\\\\n// Example: RandomFrom(5, 10, 15, 20)\\\\n\\\\n// Process Code\\\\nreturn arguments[Math.randomInt(arguments.length)];\\\"\"}"]
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
 * Quality of Life Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~QoLSettings:
 *
 * @param PlayTest
 * @text Play Test
 *
 * @param NewGameBoot:eval
 * @text New Game on Boot
 * @parent PlayTest
 * @type boolean
 * @on Start New Game
 * @off Keep Title Screen
 * @desc Automatically start a new game on Play Test?
 * Only enabled during Play Test.
 * @default false
 *
 * @param ForceNoPlayTest:eval
 * @text No Play Test Mode
 * @parent PlayTest
 * @type boolean
 * @on Cancel Play Test
 * @off Keep Play Test
 * @desc Force the game to be out of Play Test mode when play testing.
 * @default false
 *
 * @param OpenConsole:eval
 * @text Open Console on Boot
 * @parent PlayTest
 * @type boolean
 * @on Open
 * @off Don't Open
 * @desc Open the Debug Console upon booting up your game?
 * Only enabled during Play Test.
 * @default true
 *
 * @param F6key:eval
 * @text F6: Toggle Sound
 * @parent PlayTest
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc F6 Key Function: Turn on all sound to 100% or to 0%,
 * toggling between the two.
 * @default true
 *
 * @param F7key:eval
 * @text F7: Toggle Fast Mode
 * @parent PlayTest
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc F7 Key Function: Toggle fast mode.
 * @default true
 *
 * @param NewGameCommonEvent:num
 * @text NewGame > CommonEvent
 * @parent PlayTest
 * @type common_event
 * @desc Runs a common event each time a new game during play test
 * session is started.
 * @default 0
 *
 * @param BattleTest
 * @text Battle Test
 *
 * @param BTestItems:eval
 * @text Add Item Type
 * @parent BattleTest
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add copies of each database item?
 * Effective only during battle test.
 * @default true
 *
 * @param BTestWeapons:eval
 * @text Add Weapon Type
 * @parent BattleTest
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add copies of each database weapon?
 * Effective only during battle test.
 * @default true
 *
 * @param BTestArmors:eval
 * @text Add Armor Type
 * @parent BattleTest
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add copies of each database armor?
 * Effective only during battle test.
 * @default true
 *
 * @param BTestAddedQuantity:num
 * @text Added Quantity
 * @parent BattleTest
 * @type number
 * @min 1
 * @desc Determines how many items are added during a battle test instead of the maximum amount.
 * @default 90
 *
 * @param DigitGrouping
 * @text Digit Grouping
 *
 * @param DigitGroupingStandardText:eval
 * @text Standard Text
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * standard text inside windows?
 * @default true
 *
 * @param DigitGroupingExText:eval
 * @text Ex Text
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * ex text, written through drawTextEx (like messages)?
 * @default true
 *
 * @param DigitGroupingDamageSprites:eval
 * @text Damage Sprites
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * in-battle damage sprites?
 * @default true
 *
 * @param DigitGroupingGaugeSprites:eval
 * @text Gauge Sprites
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * visible gauge sprites such as HP, MP, and TP gauges?
 * @default true
 *
 * @param DigitGroupingLocale:str
 * @text Country/Locale
 * @parent DigitGrouping
 * @type combo
 * @option ar-SA
 * @option bn-BD
 * @option bn-IN
 * @option cs-CZ
 * @option da-DK
 * @option de-AT
 * @option de-CH
 * @option de-DE
 * @option el-GR
 * @option en-AU
 * @option en-CA
 * @option en-GB
 * @option en-IE
 * @option en-IN
 * @option en-NZ
 * @option en-US
 * @option en-ZA
 * @option es-AR
 * @option es-CL
 * @option es-CO
 * @option es-ES
 * @option es-MX
 * @option es-US
 * @option fi-FI
 * @option fr-BE
 * @option fr-CA
 * @option fr-CH
 * @option fr-FR
 * @option he-IL
 * @option hi-IN
 * @option hu-HU
 * @option id-ID
 * @option it-CH
 * @option it-IT
 * @option jp-JP
 * @option ko-KR
 * @option nl-BE
 * @option nl-NL
 * @option no-NO
 * @option pl-PL
 * @option pt-BR
 * @option pt-PT
 * @option ro-RO
 * @option ru-RU
 * @option sk-SK
 * @option sv-SE
 * @option ta-IN
 * @option ta-LK
 * @option th-TH
 * @option tr-TR
 * @option zh-CN
 * @option zh-HK
 * @option zh-TW
 * @desc Base the digit grouping on which country/locale?
 * @default en-US
 *
 * @param PlayerBenefit
 * @text Player Benefit
 *
 * @param EncounterRateMinimum:num
 * @text Encounter Rate Min
 * @parent PlayerBenefit
 * @min 1
 * @desc Minimum number of steps the player can take without any random encounters.
 * @default 10
 *
 * @param EscapeAlways:eval
 * @text Escape Always
 * @parent PlayerBenefit
 * @type boolean
 * @on Always
 * @off Default
 * @desc If the player wants to escape a battle, let them escape the battle with 100% chance.
 * @default true
 *
 * @param ImprovedAccuracySystem:eval
 * @text Accuracy Formula
 * @parent PlayerBenefit
 * @type boolean
 * @on Improve
 * @off Default
 * @desc Accuracy formula calculation change to
 * Skill Hit% * (User HIT - Target EVA) for better results.
 * @default true
 *
 * @param AccuracyBoost:eval
 * @text Accuracy Boost
 * @parent PlayerBenefit
 * @type boolean
 * @on Boost
 * @off Default
 * @desc Boost HIT and EVA rates in favor of the player.
 * @default true
 *
 * @param LevelUpFullHp:eval
 * @text Level Up -> Full HP
 * @parent PlayerBenefit
 * @type boolean
 * @on Heal
 * @off Default
 * @desc Recovers full HP when an actor levels up.
 * @default true
 *
 * @param LevelUpFullMp:eval
 * @text Level Up -> Full MP
 * @parent PlayerBenefit
 * @type boolean
 * @on Heal
 * @off Default
 * @desc Recovers full MP when an actor levels up.
 * @default true
 *
 * @param Misc
 * @text Misc
 *
 * @param AnimationMirrorOffset:eval
 * @text Ani: Mirror Offset
 * @parent Misc
 * @type boolean
 * @on Mirror
 * @off Don't Mirror
 * @desc When animations are mirrored,
 * mirror their Offset X values, too.
 * @default false
 *
 * @param AntiZoomPictures:eval
 * @text Anti-Zoom Pictures
 * @parent Misc
 * @type boolean
 * @on Anti-Zoom
 * @off Normal
 * @desc If on, prevents pictures from being affected by zoom.
 * @default true
 *
 * @param AutoStretch:str
 * @text Auto-Stretch
 * @parent Misc
 * @type select
 * @option Default
 * @value default
 * @option Stretch
 * @value stretch
 * @option Normal
 * @value normal
 * @desc Automatically stretch the game to fit the size of the client?
 * @default default
 *
 * @param FontShadows:eval
 * @text Font Shadows
 * @parent Misc
 * @type boolean
 * @on Shadows
 * @off Outlines
 * @desc If on, text uses shadows instead of outlines.
 * @default false
 *
 * @param FontSmoothing:eval
 * @text Font Smoothing
 * @parent Misc
 * @type boolean
 * @on Smooth
 * @off None
 * @desc If on, smoothes fonts shown in-game.
 * @default true
 *
 * @param KeyItemProtect:eval
 * @text Key Item Protection
 * @parent Misc
 * @type boolean
 * @on Unsellable
 * @off Sellable
 * @desc If on, prevents Key Items from being able to be sold and from being able to be consumed.
 * @default true
 *
 * @param ModernControls:eval
 * @text Modern Controls
 * @parent Misc
 * @type boolean
 * @on Enable
 * @off Default
 * @desc If on, allows usage of the Home/End buttons as well as other modern configs. Affects other VisuStella plugins.
 * @default true
 *
 * @param NewGameCommonEventAll:num
 * @text NewGame > CommonEvent
 * @parent Misc
 * @type common_event
 * @desc Runs a common event each time a new game during any session is started.
 * @default 0
 *
 * @param NoTileShadows:eval
 * @text No Tile Shadows
 * @parent Misc
 * @type boolean
 * @on Disable Tile Shadows
 * @off Default
 * @desc Removes tile shadows from being displayed in-game.
 * @default false
 *
 * @param PixelateImageRendering:eval
 * @text Pixel Image Rendering
 * @parent Misc
 * @type boolean
 * @on Pixelate
 * @off Smooth
 * @desc If on, pixelates the image rendering (for pixel games).
 * @default false
 *
 * @param RequireFocus:eval
 * @text Require Focus?
 * @parent Misc
 * @type boolean
 * @on Require
 * @off No Requirement
 * @desc Requires the game to be focused? If the game isn't
 * focused, it will pause if it's not the active window.
 * @default true
 *
 * @param SmartEventCollisionPriority:eval
 * @text Smart Event Collision
 * @parent Misc
 * @type boolean
 * @on Only Same Level
 * @off Default
 * @desc Makes events only able to collide with one another if they're 'Same as characters' priority.
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Color Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Color:
 *
 * @param BasicColors
 * @text Basic Colors
 *
 * @param ColorNormal:str
 * @text Normal
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param ColorSystem:str
 * @text System
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 16
 *
 * @param ColorCrisis:str
 * @text Crisis
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 17
 *
 * @param ColorDeath:str
 * @text Death
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 18
 *
 * @param ColorGaugeBack:str
 * @text Gauge Back
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param ColorHPGauge1:str
 * @text HP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 20
 *
 * @param ColorHPGauge2:str
 * @text HP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 21
 *
 * @param ColorMPGauge1:str
 * @text MP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 22
 *
 * @param ColorMPGauge2:str
 * @text MP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 23
 *
 * @param ColorMPCost:str
 * @text MP Cost
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 23
 *
 * @param ColorPowerUp:str
 * @text Power Up
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 24
 *
 * @param ColorPowerDown:str
 * @text Power Down
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 25
 *
 * @param ColorCTGauge1:str
 * @text CT Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 26
 *
 * @param ColorCTGauge2:str
 * @text CT Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 27
 *
 * @param ColorTPGauge1:str
 * @text TP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 28
 *
 * @param ColorTPGauge2:str
 * @text TP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 29
 *
 * @param ColorTPCost:str
 * @text TP Cost
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 29
 *
 * @param ColorPending:str
 * @text Pending Color
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #2a847d
 *
 * @param ColorExpGauge1:str
 * @text EXP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 30
 *
 * @param ColorExpGauge2:str
 * @text EXP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 31
 *
 * @param ColorMaxLvGauge1:str
 * @text MaxLv Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 14
 *
 * @param ColorMaxLvGauge2:str
 * @text MaxLv Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 6
 *
 * @param AlphaColors
 * @text Alpha Colors
 *
 * @param OutlineColor:str
 * @text Window Font Outline
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.6)
 *
 * @param OutlineColorGauge:str
 * @text Gauge Number Outline
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 1.0)
 *
 * @param DimColor1:str
 * @text Dim Color 1
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.6)
 *
 * @param DimColor2:str
 * @text Dim Color 2
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0)
 *
 * @param ItemBackColor1:str
 * @text Item Back Color 1
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(32, 32, 32, 0.5)
 *
 * @param ItemBackColor2:str
 * @text Item Back Color 2
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.5)
 *
 * @param ConditionalColors
 * @text Conditional Colors
 *
 * @param ActorHPColor:func
 * @text JS: Actor HP Color
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what HP color to use for actors.
 * @default "// Set the variables used in this function.\nlet actor = arguments[0];\n\n// Check if the actor exists. If not, return normal.\nif (!actor) {\n    return this.normalColor();\n\n// If the actor is dead, return death color.\n} else if (actor.isDead()) {\n    return this.deathColor();\n\n// If the actor is dying, return crisis color.\n} else if (actor.isDying()) {\n    return this.crisisColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param ActorMPColor:func
 * @text JS: Actor MP Color
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what MP color to use for actors.
 * @default "// Set the variables used in this function.\nlet actor = arguments[0];\n\n// Check if the actor exists. If not, return normal.\nif (!actor) {\n    return this.normalColor();\n\n// If MP rate is below 25%, return crisis color.\n} else if (actor.mpRate() < 0.25) {\n    return this.crisisColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param ActorTPColor:func
 * @text JS: Actor TP Color
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what TP color to use for actors.
 * @default "// Set the variables used in this function.\nlet actor = arguments[0];\n\n// Check if the actor exists. If not, return normal.\nif (!actor) {\n    return this.normalColor();\n\n// If TP rate is below 25%, return crisis color.\n} else if (actor.tpRate() < 0.25) {\n    return this.crisisColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param ParamChange:func
 * @text JS: Parameter Change
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining whatcolor to use for parameter changes.
 * @default "// Set the variables used in this function.\nlet change = arguments[0];\n\n// If a positive change, use power up color.\nif (change > 0) {\n    return this.powerUpColor();\n\n// If a negative change, use power down color.\n} else if (change < 0) {\n    return this.powerDownColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param DamageColor:func
 * @text JS: Damage Colors
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what color to use for damage types.
 * @default "// Set the variables used in this function.\nlet colorType = arguments[0];\n\n// Check the value of the color type\n// and return an appropriate color.\nswitch (colorType) {\n\n    case 0: // HP damage\n        return \"#ffffff\";\n\n    case 1: // HP recover\n        return \"#b9ffb5\";\n\n    case 2: // MP damage\n        return \"#bb88bb\";\n\n    case 3: // MP recover\n        return \"#80b0ff\";\n\n    default:\n        return \"#808080\";\n}"
 */
/* ----------------------------------------------------------------------------
 * Gold Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Gold:
 *
 * @param GoldMax:num
 * @text Gold Max
 * @type num
 * @min 1
 * @desc Maximum amount of Gold the party can hold.
 * Default 99999999
 * @default 99999999
 *
 * @param GoldFontSize:num
 * @text Gold Font Size
 * @type number
 * @min 1
 * @desc Font size used for displaying Gold inside Gold Windows.
 * Default: 26
 * @default 24
 *
 * @param GoldIcon:num
 * @text Gold Icon
 * @desc Icon used to represent Gold.
 * Use 0 for no icon.
 * @default 314
 *
 * @param GoldOverlap:str
 * @text Gold Overlap
 * @desc Text used too much Gold to fit in the window.
 * @default A Lot
 *
 * @param ItemStyle:eval
 * @text Item Style
 * @type boolean
 * @on Enable
 * @off Normal
 * @desc Draw gold in the item style?
 * ie: Icon, Label, Value
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Image Loading Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ImgLoad:
 *
 * @param animations:arraystr
 * @text img/animations/
 * @type file[]
 * @dir img/animations/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param battlebacks1:arraystr
 * @text img/battlebacks1/
 * @type file[]
 * @dir img/battlebacks1/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param battlebacks2:arraystr
 * @text img/battlebacks2/
 * @type file[]
 * @dir img/battlebacks2/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param characters:arraystr
 * @text img/characters/
 * @type file[]
 * @dir img/characters/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param enemies:arraystr
 * @text img/enemies/
 * @type file[]
 * @dir img/enemies/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param faces:arraystr
 * @text img/faces/
 * @type file[]
 * @dir img/faces/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param parallaxes:arraystr
 * @text img/parallaxes/
 * @type file[]
 * @dir img/parallaxes/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param pictures:arraystr
 * @text img/pictures/
 * @type file[]
 * @dir img/pictures/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param sv_actors:arraystr
 * @text img/sv_actors/
 * @type file[]
 * @dir img/sv_actors/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param sv_enemies:arraystr
 * @text img/sv_enemies/
 * @type file[]
 * @dir img/sv_enemies/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param system:arraystr
 * @text img/system/
 * @type file[]
 * @dir img/system/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default ["Balloon","IconSet"]
 *
 * @param tilesets:arraystr
 * @text img/tilesets/
 * @type file[]
 * @dir img/tilesets/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param titles1:arraystr
 * @text img/titles1/
 * @type file[]
 * @dir img/titles1/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param titles2:arraystr
 * @text img/titles2/
 * @type file[]
 * @dir img/titles2/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 */
/* ----------------------------------------------------------------------------
 * Keyboard Input Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~KeyboardInput:
 *
 * @param Controls
 *
 * @param WASD:eval
 * @text WASD Movement
 * @parent Controls
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables or disables WASD movement for your game project.
 * Moves the W page down button to E.
 * @default false
 *
 * @param DashToggleR:eval
 * @text R Button: Dash Toggle
 * @parent Controls
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables or disables R button as an Always Dash option toggle.
 * @default false
 *
 * @param NameInput
 * @text Name Input
 *
 * @param EnableNameInput:eval
 * @text Enable?
 * @parent NameInput
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables keyboard input for name entry.
 * Only tested with English keyboards.
 * @default true
 * 
 * @param DefaultMode:str
 * @text Default Mode
 * @parent NameInput
 * @type select
 * @option Default - Uses Arrow Keys to select letters.
 * @value default
 * @option Keyboard - Uses Keyboard to type in letters.
 * @value keyboard
 * @desc Select default mode when entering the scene.
 * @default keyboard
 *
 * @param QwertyLayout:eval
 * @text QWERTY Layout
 * @parent NameInput
 * @type boolean
 * @on QWERTY Layout
 * @off ABCDEF Layout
 * @desc Uses the QWERTY layout for manual entry.
 * @default true
 *
 * @param NameInputMessage:eval
 * @text Keyboard Message
 * @parent NameInput
 * @type note
 * @desc The message displayed when allowing keyboard entry.
 * You may use text codes here.
 * @default "Type in this character's name.\nPress \\c[5]ENTER\\c[0] when you're done.\n\n-or-\n\nPress \\c[5]arrow keys\\c[0]/\\c[5]TAB\\c[0] to switch\nto manual character entry.\n\nPress \\c[5]ESC\\c[0]/\\c[5]TAB\\c[0] to use to keyboard."
 * 
 * @param BannedWords:arraystr
 * @text Banned Words
 * @parent NameInput
 * @type string[]
 * @desc Players cannot use these words for names.
 * These include words inside the names.
 * @default []
 *
 * @param NumberInput
 * @text Number Input
 *
 * @param EnableNumberInput:eval
 * @text Enable?
 * @parent NumberInput
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables keyboard input for number entry.
 * Only tested with English keyboards.
 * @default true
 *
 * @param ButtonAssist
 * @text Button Assist
 * 
 * @param Keyboard:str
 * @text Switch To Keyboard
 * @parent ButtonAssist
 * @desc Text used to describe the keyboard switch.
 * @default Keyboard
 * 
 * @param Manual:str
 * @text Switch To Manual
 * @parent ButtonAssist
 * @desc Text used to describe the manual entry switch.
 * @default Manual
 *
 */
/* ----------------------------------------------------------------------------
 * Menu Background Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MenuBg:
 *
 * @param Scene_Menu:struct
 * @text Scene_Menu
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Item:struct
 * @text Scene_Item
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Skill:struct
 * @text Scene_Skill
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Equip:struct
 * @text Scene_Equip
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Status:struct
 * @text Scene_Status
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Options:struct
 * @text Scene_Options
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Save:struct
 * @text Scene_Save
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Load:struct
 * @text Scene_Load
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_GameEnd:struct
 * @text Scene_GameEnd
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"128","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Shop:struct
 * @text Scene_Shop
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Name:struct
 * @text Scene_Name
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Unlisted:struct
 * @text Scene_Unlisted
 * @type struct<BgSettings>
 * @desc The individual background settings for any scenes that aren't listed here.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 */
/* ----------------------------------------------------------------------------
 * Background Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~BgSettings:
 *
 * @param SnapshotOpacity:num
 * @text Snapshop Opacity
 * @type number
 * @min 0
 * @max 255
 * @desc Snapshot opacity for the scene.
 * @default 192
 *
 * @param BgFilename1:str
 * @text Background 1
 * @type file
 * @dir img/titles1/
 * @desc Filename used for the bottom background image.
 * Leave empty if you don't wish to use one.
 * @default 
 *
 * @param BgFilename2:str
 * @text Background 2
 * @type file
 * @dir img/titles2/
 * @desc Filename used for the upper background image.
 * Leave empty if you don't wish to use one.
 * @default 
 *
 */
/* ----------------------------------------------------------------------------
 * Menu Button Assist Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ButtonAssist:
 *
 * @param General
 *
 * @param Enable:eval
 * @text Enable
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Enable the Menu Button Assist Window.
 * @default true
 *
 * @param Location:str
 * @text Location
 * @parent General
 * @type select
 * @option Top of Screen
 * @value top
 * @option Bottom of Screen
 * @value bottom
 * @desc Determine the location of the Button Assist Window.
 * Requires Plugin Parameters => UI => Side Buttons ON.
 * @default bottom
 *
 * @param BgType:num
 * @text Background Type
 * @parent General
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param Text
 *
 * @param TextFmt:str
 * @text Text Format
 * @parent Text
 * @desc Format on how the buttons are displayed.
 * Text codes allowed. %1 - Key, %2 - Text
 * @default %1:%2
 *
 * @param MultiKeyFmt:str
 * @text Multi-Key Format
 * @parent Text
 * @desc Format for actions with multiple keys.
 * Text codes allowed. %1 - Key 1, %2 - Key 2
 * @default %1/%2
 *
 * @param OkText:str
 * @text OK Text
 * @parent Text
 * @desc Default text used to display OK Key Action.
 * Text codes allowed.
 * @default Select
 *
 * @param CancelText:str
 * @text Cancel Text
 * @parent Text
 * @desc Default text used to display Cancel Key Action.
 * Text codes allowed.
 * @default Back
 *
 * @param SwitchActorText:str
 * @text Switch Actor Text
 * @parent Text
 * @desc Default text used to display Switch Actor Action.
 * Text codes allowed.
 * @default Switch Ally
 *
 * @param Keys
 *
 * @param KeyUnlisted:str
 * @text Key: Unlisted Format
 * @parent Keys
 * @desc If a key is not listed below, use this format.
 * Text codes allowed. %1 - Key
 * @default \}❪%1❫\{
 *
 * @param KeyUP:str
 * @text Key: Up
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default ^
 *
 * @param KeyDOWN:str
 * @text Key: Down
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default v
 *
 * @param KeyLEFT:str
 * @text Key: Left
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default <<
 *
 * @param KeyRIGHT:str
 * @text Key: Right
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default >>
 *
 * @param KeySHIFT:str
 * @text Key: Shift
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default \}❪SHIFT❫\{
 *
 * @param KeyTAB:str
 * @text Key: Tab
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default \}❪TAB❫\{
 *
 * @param KeyA:str
 * @text Key: A
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default A
 *
 * @param KeyB:str
 * @text Key: B
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default B
 *
 * @param KeyC:str
 * @text Key: C
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default C
 *
 * @param KeyD:str
 * @text Key: D
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default D
 *
 * @param KeyE:str
 * @text Key: E
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default E
 *
 * @param KeyF:str
 * @text Key: F
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default F
 *
 * @param KeyG:str
 * @text Key: G
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default G
 *
 * @param KeyH:str
 * @text Key: H
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default H
 *
 * @param KeyI:str
 * @text Key: I
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default I
 *
 * @param KeyJ:str
 * @text Key: J
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default J
 *
 * @param KeyK:str
 * @text Key: K
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default K
 *
 * @param KeyL:str
 * @text Key: L
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default L
 *
 * @param KeyM:str
 * @text Key: M
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default M
 *
 * @param KeyN:str
 * @text Key: N
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default N
 *
 * @param KeyO:str
 * @text Key: O
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default O
 *
 * @param KeyP:str
 * @text Key: P
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default P
 *
 * @param KeyQ:str
 * @text Key: Q
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default Q
 *
 * @param KeyR:str
 * @text Key: R
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default R
 *
 * @param KeyS:str
 * @text Key: S
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default S
 *
 * @param KeyT:str
 * @text Key: T
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default T
 *
 * @param KeyU:str
 * @text Key: U
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default U
 *
 * @param KeyV:str
 * @text Key: V
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default V
 *
 * @param KeyW:str
 * @text Key: W
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default W
 *
 * @param KeyX:str
 * @text Key: X
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default X
 *
 * @param KeyY:str
 * @text Key: Y
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default Y
 *
 * @param KeyZ:str
 * @text Key: Z
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default Z
 *
 */
/* ----------------------------------------------------------------------------
 * Menu Layout Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MenuLayout:
 *
 * @param Title:struct
 * @text Scene_Title
 * @parent SceneSettings
 * @type struct<Title>
 * @desc Various options on adjusting the Title Scene.
 * @default {"TitleScreen":"","DocumentTitleFmt:str":"%1: %2 - Version %3","Subtitle:str":"Subtitle","Version:str":"0.00","drawGameTitle:func":"\"const x = 20;\\nconst y = Graphics.height / 4;\\nconst maxWidth = Graphics.width - x * 2;\\nconst text = $dataSystem.gameTitle;\\nconst bitmap = this._gameTitleSprite.bitmap;\\nbitmap.fontFace = $gameSystem.mainFontFace();\\nbitmap.outlineColor = \\\"black\\\";\\nbitmap.outlineWidth = 8;\\nbitmap.fontSize = 72;\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\"center\\\");\"","drawGameSubtitle:func":"\"const x = 20;\\nconst y = Graphics.height / 4 + 72;\\nconst maxWidth = Graphics.width - x * 2;\\nconst text = Scene_Title.subtitle;\\nconst bitmap = this._gameTitleSprite.bitmap;\\nbitmap.fontFace = $gameSystem.mainFontFace();\\nbitmap.outlineColor = \\\"black\\\";\\nbitmap.outlineWidth = 6;\\nbitmap.fontSize = 48;\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\"center\\\");\"","drawGameVersion:func":"\"const bitmap = this._gameTitleSprite.bitmap;\\nconst x = 0;\\nconst y = Graphics.height - 20;\\nconst width = Math.round(Graphics.width / 4);\\nconst height = 20;\\nconst c1 = ColorManager.dimColor1();\\nconst c2 = ColorManager.dimColor2();\\nconst text = 'Version ' + Scene_Title.version;\\nbitmap.gradientFillRect(x, y, width, height, c1, c2);\\nbitmap.fontFace = $gameSystem.mainFontFace();\\nbitmap.outlineColor = \\\"black\\\";\\nbitmap.outlineWidth = 3;\\nbitmap.fontSize = 16;\\nbitmap.drawText(text, x + 4, y, Graphics.width, height, \\\"left\\\");\"","CommandRect:func":"\"const offsetX = $dataSystem.titleCommandWindow.offsetX;\\nconst offsetY = $dataSystem.titleCommandWindow.offsetY;\\nconst rows = this.commandWindowRows();\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = (Graphics.boxWidth - width) / 2 + offsetX;\\nconst y = Graphics.boxHeight - height - 96 + offsetY;\\nreturn new Rectangle(x, y, width, height);\"","ButtonFadeSpeed:num":"4"}
 *
 * @param MainMenu:struct
 * @text Scene_Menu
 * @parent SceneSettings
 * @type struct<MainMenu>
 * @desc Various options on adjusting the Main Menu Scene.
 * @default {"CommandWindow":"","CommandBgType:num":"0","CommandRect:func":"\"const width = this.mainCommandWidth();\\nconst height = this.mainAreaHeight() - this.goldWindowRect().height;\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","GoldWindow":"","GoldBgType:num":"0","GoldRect:func":"\"const rows = 1;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\nconst y = this.mainAreaBottom() - height;\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const width = Graphics.boxWidth - this.mainCommandWidth();\\nconst height = this.mainAreaHeight();\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param ItemMenu:struct
 * @text Scene_Item
 * @parent SceneSettings
 * @type struct<ItemMenu>
 * @desc Various options on adjusting the Item Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.helpAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.helpAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","CategoryWindow":"","CategoryBgType:num":"0","CategoryRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","ItemWindow":"","ItemBgType:num":"0","ItemRect:func":"\"const x = 0;\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaBottom() - y;\\nreturn new Rectangle(x, y, width, height);\"","ActorWindow":"","ActorBgType:num":"0","ActorRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight();\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param SkillMenu:struct
 * @text Scene_Skill
 * @parent SceneSettings
 * @type struct<SkillMenu>
 * @desc Various options on adjusting the Skill Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.helpAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.helpAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","SkillTypeWindow":"","SkillTypeBgType:num":"0","SkillTypeRect:func":"\"const rows = 3;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const width = Graphics.boxWidth - this.mainCommandWidth();\\nconst height = this._skillTypeWindow.height;\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","ItemWindow":"","ItemBgType:num":"0","ItemRect:func":"\"const x = 0;\\nconst y = this._statusWindow.y + this._statusWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._statusWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","ActorWindow":"","ActorBgType:num":"0","ActorRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight();\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param EquipMenu:struct
 * @text Scene_Equip
 * @parent SceneSettings
 * @type struct<EquipMenu>
 * @desc Various options on adjusting the Equip Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.helpAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.helpAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = this.statusWidth();\\nconst height = this.mainAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","CommandWindow":"","CommandBgType:num":"0","CommandRect:func":"\"const x = this.statusWidth();\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","SlotWindow":"","SlotBgType:num":"0","SlotRect:func":"\"const commandWindowRect = this.commandWindowRect();\\nconst x = this.statusWidth();\\nconst y = commandWindowRect.y + commandWindowRect.height;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this.mainAreaHeight() - commandWindowRect.height;\\nreturn new Rectangle(x, y, width, height);\"","ItemWindow":"","ItemBgType:num":"0","ItemRect:func":"\"return this.slotWindowRect();\""}
 *
 * @param StatusMenu:struct
 * @text Scene_Status
 * @parent SceneSettings
 * @type struct<StatusMenu>
 * @desc Various options on adjusting the Status Menu Scene.
 * @default {"ProfileWindow":"","ProfileBgType:num":"0","ProfileRect:func":"\"const width = Graphics.boxWidth;\\nconst height = this.profileHeight();\\nconst x = 0;\\nconst y = this.mainAreaBottom() - height;\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.statusParamsWindowRect().y - y;\\nreturn new Rectangle(x, y, width, height);\"","StatusParamsWindow":"","StatusParamsBgType:num":"0","StatusParamsRect:func":"\"const width = this.statusParamsWidth();\\nconst height = this.statusParamsHeight();\\nconst x = 0;\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\nreturn new Rectangle(x, y, width, height);\"","StatusEquipWindow":"","StatusEquipBgType:num":"0","StatusEquipRect:func":"\"const width = Graphics.boxWidth - this.statusParamsWidth();\\nconst height = this.statusParamsHeight();\\nconst x = this.statusParamsWidth();\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param OptionsMenu:struct
 * @text Scene_Options
 * @parent SceneSettings
 * @type struct<OptionsMenu>
 * @desc Various options on adjusting the Options Menu Scene.
 * @default {"OptionsWindow":"","OptionsBgType:num":"0","OptionsRect:func":"\"const n = Math.min(this.maxCommands(), this.maxVisibleCommands());\\nconst width = 400;\\nconst height = this.calcWindowHeight(n, true);\\nconst x = (Graphics.boxWidth - width) / 2;\\nconst y = (Graphics.boxHeight - height) / 2;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param SaveMenu:struct
 * @text Scene_Save
 * @parent SceneSettings
 * @type struct<SaveMenu>
 * @desc Various options on adjusting the Save Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, false);\\nreturn new Rectangle(x, y, width, height);\"","ListWindow":"","ListBgType:num":"0","ListRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param LoadMenu:struct
 * @text Scene_Load
 * @parent SceneSettings
 * @type struct<LoadMenu>
 * @desc Various options on adjusting the Load Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, false);\\nreturn new Rectangle(x, y, width, height);\"","ListWindow":"","ListBgType:num":"0","ListRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param GameEnd:struct
 * @text Scene_GameEnd
 * @parent SceneSettings
 * @type struct<GameEnd>
 * @desc Various options on adjusting the Game End Scene.
 * @default {"CommandList:arraystruct":"[\"{\\\"Symbol:str\\\":\\\"toTitle\\\",\\\"TextStr:str\\\":\\\"Untitled\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"return TextManager.toTitle;\\\\\\\"\\\",\\\"ShowJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"EnableJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"ExtJS:func\\\":\\\"\\\\\\\"return null;\\\\\\\"\\\",\\\"CallHandlerJS:func\\\":\\\"\\\\\\\"SceneManager._scene.commandToTitle();\\\\\\\"\\\"}\",\"{\\\"Symbol:str\\\":\\\"cancel\\\",\\\"TextStr:str\\\":\\\"Untitled\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"return TextManager.cancel;\\\\\\\"\\\",\\\"ShowJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"EnableJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"ExtJS:func\\\":\\\"\\\\\\\"return null;\\\\\\\"\\\",\\\"CallHandlerJS:func\\\":\\\"\\\\\\\"SceneManager._scene.popScene();\\\\\\\"\\\"}\"]","CommandBgType:num":"0","CommandRect:func":"\"const rows = 2;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = (Graphics.boxWidth - width) / 2;\\nconst y = (Graphics.boxHeight - height) / 2;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param ShopMenu:struct
 * @text Scene_Shop
 * @parent SceneSettings
 * @type struct<ShopMenu>
 * @desc Various options on adjusting the Shop Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const wx = 0;\\nconst wy = this.helpAreaTop();\\nconst ww = Graphics.boxWidth;\\nconst wh = this.helpAreaHeight();\\nreturn new Rectangle(wx, wy, ww, wh);\"","GoldWindow":"","GoldBgType:num":"0","GoldRect:func":"\"const rows = 1;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = Graphics.boxWidth - width;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","CommandWindow":"","CommandBgType:num":"0","CommandRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = this._goldWindow.x;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","DummyWindow":"","DummyBgType:num":"0","DummyRect:func":"\"const x = 0;\\nconst y = this._commandWindow.y + this._commandWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._commandWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","NumberWindow":"","NumberBgType:num":"0","NumberRect:func":"\"const x = 0;\\nconst y = this._dummyWindow.y;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this._dummyWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const width = this.statusWidth();\\nconst height = this._dummyWindow.height;\\nconst x = Graphics.boxWidth - width;\\nconst y = this._dummyWindow.y;\\nreturn new Rectangle(x, y, width, height);\"","BuyWindow":"","BuyBgType:num":"0","BuyRect:func":"\"const x = 0;\\nconst y = this._dummyWindow.y;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this._dummyWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","CategoryWindow":"","CategoryBgType:num":"0","CategoryRect:func":"\"const x = 0;\\nconst y = this._dummyWindow.y;\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","SellWindow":"","SellBgType:num":"0","SellRect:func":"\"const x = 0;\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height =\\n    this.mainAreaHeight() -\\n    this._commandWindow.height -\\n    this._categoryWindow.height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param NameMenu:struct
 * @text Scene_Name
 * @parent SceneSettings
 * @type struct<NameMenu>
 * @desc Various options on adjusting the Actor Rename Scene.
 * @default {"EditWindow":"","EditBgType:num":"0","EditRect:func":"\"const rows = 9;\\nconst inputWindowHeight = this.calcWindowHeight(rows, true);\\nconst padding = $gameSystem.windowPadding();\\nconst width = 600;\\nconst height = Math.min(ImageManager.faceHeight + padding * 2, this.mainAreaHeight() - inputWindowHeight);\\nconst x = (Graphics.boxWidth - width) / 2;\\nconst y = (this.mainAreaHeight() - (height + inputWindowHeight)) / 2 + this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","InputWindow":"","InputBgType:num":"0","InputRect:func":"\"const x = this._editWindow.x;\\nconst y = this._editWindow.y + this._editWindow.height;\\nconst rows = 9;\\nconst width = this._editWindow.width;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\""}
 *
 */
/* ----------------------------------------------------------------------------
 * Main Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MainMenu:
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = this.mainCommandWidth();\nconst height = this.mainAreaHeight() - this.goldWindowRect().height;\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param GoldWindow
 * @text Gold Window
 *
 * @param GoldBgType:num
 * @text Background Type
 * @parent GoldWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param GoldRect:func
 * @text JS: X, Y, W, H
 * @parent GoldWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 1;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\nconst y = this.mainAreaBottom() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth - this.mainCommandWidth();\nconst height = this.mainAreaHeight();\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Item Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ItemMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.helpAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.helpAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CategoryWindow
 * @text Category Window
 *
 * @param CategoryBgType:num
 * @text Background Type
 * @parent CategoryWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CategoryRect:func
 * @text JS: X, Y, W, H
 * @parent CategoryWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ItemWindow
 * @text Item Window
 *
 * @param ItemBgType:num
 * @text Background Type
 * @parent ItemWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ItemRect:func
 * @text JS: X, Y, W, H
 * @parent ItemWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._categoryWindow.y + this._categoryWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaBottom() - y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ActorWindow
 * @text Actor Window
 *
 * @param ActorBgType:num
 * @text Background Type
 * @parent ActorWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ActorRect:func
 * @text JS: X, Y, W, H
 * @parent ActorWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Skill Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~SkillMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.helpAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.helpAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param SkillTypeWindow
 * @text Skill Type Window
 *
 * @param SkillTypeBgType:num
 * @text Background Type
 * @parent SkillTypeWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param SkillTypeRect:func
 * @text JS: X, Y, W, H
 * @parent SkillTypeWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 3;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth - this.mainCommandWidth();\nconst height = this._skillTypeWindow.height;\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ItemWindow
 * @text Item Window
 *
 * @param ItemBgType:num
 * @text Background Type
 * @parent ItemWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ItemRect:func
 * @text JS: X, Y, W, H
 * @parent ItemWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._statusWindow.y + this._statusWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._statusWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ActorWindow
 * @text Actor Window
 *
 * @param ActorBgType:num
 * @text Background Type
 * @parent ActorWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ActorRect:func
 * @text JS: X, Y, W, H
 * @parent ActorWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Equip Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~EquipMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.helpAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.helpAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = this.statusWidth();\nconst height = this.mainAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = this.statusWidth();\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param SlotWindow
 * @text Slot Window
 *
 * @param SlotBgType:num
 * @text Background Type
 * @parent SlotWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param SlotRect:func
 * @text JS: X, Y, W, H
 * @parent SlotWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const commandWindowRect = this.commandWindowRect();\nconst x = this.statusWidth();\nconst y = commandWindowRect.y + commandWindowRect.height;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this.mainAreaHeight() - commandWindowRect.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ItemWindow
 * @text Item Window
 *
 * @param ItemBgType:num
 * @text Background Type
 * @parent ItemWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ItemRect:func
 * @text JS: X, Y, W, H
 * @parent ItemWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "return this.slotWindowRect();"
 *
 */
/* ----------------------------------------------------------------------------
 * Status Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~StatusMenu:
 *
 * @param ProfileWindow
 * @text Profile Window
 *
 * @param ProfileBgType:num
 * @text Background Type
 * @parent ProfileWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ProfileRect:func
 * @text JS: X, Y, W, H
 * @parent ProfileWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth;\nconst height = this.profileHeight();\nconst x = 0;\nconst y = this.mainAreaBottom() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.statusParamsWindowRect().y - y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusParamsWindow
 * @text Parameters Window
 *
 * @param StatusParamsBgType:num
 * @text Background Type
 * @parent StatusParamsWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusParamsRect:func
 * @text JS: X, Y, W, H
 * @parent StatusParamsWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = this.statusParamsWidth();\nconst height = this.statusParamsHeight();\nconst x = 0;\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusEquipWindow
 * @text Equipment Window
 *
 * @param StatusEquipBgType:num
 * @text Background Type
 * @parent StatusEquipWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusEquipRect:func
 * @text JS: X, Y, W, H
 * @parent StatusEquipWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth - this.statusParamsWidth();\nconst height = this.statusParamsHeight();\nconst x = this.statusParamsWidth();\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Options Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~OptionsMenu:
 *
 * @param OptionsWindow
 * @text Options Window
 *
 * @param OptionsBgType:num
 * @text Background Type
 * @parent OptionsWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param OptionsRect:func
 * @text JS: X, Y, W, H
 * @parent OptionsWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const n = Math.min(this.maxCommands(), this.maxVisibleCommands());\nconst width = 400;\nconst height = this.calcWindowHeight(n, true);\nconst x = (Graphics.boxWidth - width) / 2;\nconst y = (Graphics.boxHeight - height) / 2;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Save Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~SaveMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, false);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ListWindow
 * @text List Window
 *
 * @param ListBgType:num
 * @text Background Type
 * @parent ListWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ListRect:func
 * @text JS: X, Y, W, H
 * @parent ListWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop() + this._helpWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._helpWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Load Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~LoadMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, false);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ListWindow
 * @text List Window
 *
 * @param ListBgType:num
 * @text Background Type
 * @parent ListWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ListRect:func
 * @text JS: X, Y, W, H
 * @parent ListWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop() + this._helpWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._helpWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Game End Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~GameEnd:
 *
 * @param CommandList:arraystruct
 * @text Command Window List
 * @type struct<Command>[]
 * @desc Window commands used by the Game End screen.
 * Add new commands here.
 * @default ["{\"Symbol:str\":\"toTitle\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.toTitle;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandToTitle();\\\"\"}","{\"Symbol:str\":\"cancel\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.cancel;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.popScene();\\\"\"}"]
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandList:arraystruct
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandList:arraystruct
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 2;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = (Graphics.boxWidth - width) / 2;\nconst y = (Graphics.boxHeight - height) / 2;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Shop Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ShopMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const wx = 0;\nconst wy = this.helpAreaTop();\nconst ww = Graphics.boxWidth;\nconst wh = this.helpAreaHeight();\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param GoldWindow
 * @text Gold Window
 *
 * @param GoldBgType:num
 * @text Background Type
 * @parent GoldWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param GoldRect:func
 * @text JS: X, Y, W, H
 * @parent GoldWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 1;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = Graphics.boxWidth - width;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = this._goldWindow.x;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param DummyWindow
 * @text Dummy Window
 *
 * @param DummyBgType:num
 * @text Background Type
 * @parent DummyWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param DummyRect:func
 * @text JS: X, Y, W, H
 * @parent DummyWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._commandWindow.y + this._commandWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._commandWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param NumberWindow
 * @text Number Window
 *
 * @param NumberBgType:num
 * @text Background Type
 * @parent NumberWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param NumberRect:func
 * @text JS: X, Y, W, H
 * @parent NumberWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._dummyWindow.y;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this._dummyWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = this.statusWidth();\nconst height = this._dummyWindow.height;\nconst x = Graphics.boxWidth - width;\nconst y = this._dummyWindow.y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param BuyWindow
 * @text Buy Window
 *
 * @param BuyBgType:num
 * @text Background Type
 * @parent BuyWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param BuyRect:func
 * @text JS: X, Y, W, H
 * @parent BuyWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._dummyWindow.y;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this._dummyWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CategoryWindow
 * @text Category Window
 *
 * @param CategoryBgType:num
 * @text Background Type
 * @parent CategoryWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CategoryRect:func
 * @text JS: X, Y, W, H
 * @parent CategoryWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._dummyWindow.y;\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param SellWindow
 * @text Sell Window
 *
 * @param SellBgType:num
 * @text Background Type
 * @parent SellWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param SellRect:func
 * @text JS: X, Y, W, H
 * @parent SellWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._categoryWindow.y + this._categoryWindow.height;\nconst width = Graphics.boxWidth;\nconst height =\n    this.mainAreaHeight() -\n    this._commandWindow.height -\n    this._categoryWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Name Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~NameMenu:
 *
 * @param EditWindow
 * @text Edit Window
 *
 * @param EditBgType:num
 * @text Background Type
 * @parent EditWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param EditRect:func
 * @text JS: X, Y, W, H
 * @parent EditWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 9;\nconst inputWindowHeight = this.calcWindowHeight(rows, true);\nconst padding = $gameSystem.windowPadding();\nconst width = 600;\nconst height = Math.min(ImageManager.faceHeight + padding * 2, this.mainAreaHeight() - inputWindowHeight);\nconst x = (Graphics.boxWidth - width) / 2;\nconst y = (this.mainAreaHeight() - (height + inputWindowHeight)) / 2 + this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param InputWindow
 * @text Input Window
 *
 * @param InputBgType:num
 * @text Background Type
 * @parent InputWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param InputRect:func
 * @text JS: X, Y, W, H
 * @parent InputWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = this._editWindow.x;\nconst y = this._editWindow.y + this._editWindow.height;\nconst rows = 9;\nconst width = this._editWindow.width;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Title Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Title:
 *
 * @param TitleScreen
 * @text Title Screen
 *
 * @param DocumentTitleFmt:str
 * @text Document Title Format
 * @parent TitleScreen
 * @desc Format to display text in document title.
 * %1 - Main Title, %2 - Subtitle, %3 - Version
 * @default %1: %2 - Version %3
 *
 * @param Subtitle:str
 * @text Subtitle
 * @parent TitleScreen
 * @desc Subtitle to be displayed under the title name.
 * @default Subtitle
 *
 * @param Version:str
 * @text Version
 * @parent TitleScreen
 * @desc Version to be display in the title screen corner.
 * @default 0.00
 *
 * @param drawGameTitle:func
 * @text JS: Draw Title
 * @type note
 * @parent TitleScreen
 * @desc Code used to draw the game title.
 * @default "const x = 20;\nconst y = Graphics.height / 4;\nconst maxWidth = Graphics.width - x * 2;\nconst text = $dataSystem.gameTitle;\nconst bitmap = this._gameTitleSprite.bitmap;\nbitmap.fontFace = $gameSystem.mainFontFace();\nbitmap.outlineColor = \"black\";\nbitmap.outlineWidth = 8;\nbitmap.fontSize = 72;\nbitmap.drawText(text, x, y, maxWidth, 48, \"center\");"
 *
 * @param drawGameSubtitle:func
 * @text JS: Draw Subtitle
 * @type note
 * @parent TitleScreen
 * @desc Code used to draw the game subtitle.
 * @default "const x = 20;\nconst y = Graphics.height / 4 + 72;\nconst maxWidth = Graphics.width - x * 2;\nconst text = Scene_Title.subtitle;\nconst bitmap = this._gameTitleSprite.bitmap;\nbitmap.fontFace = $gameSystem.mainFontFace();\nbitmap.outlineColor = \"black\";\nbitmap.outlineWidth = 6;\nbitmap.fontSize = 48;\nbitmap.drawText(text, x, y, maxWidth, 48, \"center\");"
 *
 * @param drawGameVersion:func
 * @text JS: Draw Version
 * @type note
 * @parent TitleScreen
 * @desc Code used to draw the game version.
 * @default "const bitmap = this._gameTitleSprite.bitmap;\nconst x = 0;\nconst y = Graphics.height - 20;\nconst width = Math.round(Graphics.width / 4);\nconst height = 20;\nconst c1 = ColorManager.dimColor1();\nconst c2 = ColorManager.dimColor2();\nconst text = 'Version ' + Scene_Title.version;\nbitmap.gradientFillRect(x, y, width, height, c1, c2);\nbitmap.fontFace = $gameSystem.mainFontFace();\nbitmap.outlineColor = \"black\";\nbitmap.outlineWidth = 3;\nbitmap.fontSize = 16;\nbitmap.drawText(text, x + 4, y, Graphics.width, height, \"left\");"
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent TitleScreen
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const offsetX = $dataSystem.titleCommandWindow.offsetX;\nconst offsetY = $dataSystem.titleCommandWindow.offsetY;\nconst rows = this.commandWindowRows();\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = (Graphics.boxWidth - width) / 2 + offsetX;\nconst y = Graphics.boxHeight - height - 96 + offsetY;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ButtonFadeSpeed:num
 * @text Button Fade Speed
 * @parent TitleScreen
 * @type number
 * @min 1
 * @max 255
 * @desc Speed at which the buttons fade in at (1-255).
 * @default 4
 *
 */
/* ----------------------------------------------------------------------------
 * Parameter Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Param:
 *
 * @param DisplayedParams:arraystr
 * @text Displayed Parameters
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @option HIT
 * @option EVA
 * @option CRI
 * @option CEV
 * @option MEV
 * @option MRF
 * @option CNT
 * @option HRG
 * @option MRG
 * @option TRG
 * @option TGR
 * @option GRD
 * @option REC
 * @option PHA
 * @option MCR
 * @option TCR
 * @option PDR
 * @option MDR
 * @option FDR
 * @option EXR
 * @desc A list of the parameters that will be displayed in-game.
 * @default ["ATK","DEF","MAT","MDF","AGI","LUK"]
 *
 * @param ExtDisplayedParams:arraystr
 * @text Extended Parameters
 * @parent DisplayedParams:arraystr
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @option HIT
 * @option EVA
 * @option CRI
 * @option CEV
 * @option MEV
 * @option MRF
 * @option CNT
 * @option HRG
 * @option MRG
 * @option TRG
 * @option TGR
 * @option GRD
 * @option REC
 * @option PHA
 * @option MCR
 * @option TCR
 * @option PDR
 * @option MDR
 * @option FDR
 * @option EXR
 * @desc The list shown in extended scenes (for other VisuStella plugins).
 * @default ["MaxHP","MaxMP","ATK","DEF","MAT","MDF","AGI","LUK"]
 *
 * @param BasicParameters
 * @text Basic Parameters
 *
 * @param CrisisRate:num
 * @text HP Crisis Rate
 * @parent BasicParameters
 * @desc HP Ratio at which a battler can be considered in crisis mode.
 * @default 0.25
 *
 * @param BasicParameterFormula:func
 * @text JS: Formula
 * @parent BasicParameters
 * @type note
 * @desc Formula used to determine the total value all 8 basic parameters: MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK.
 * @default "// Determine the variables used in this calculation.\nlet paramId = arguments[0];\nlet base = this.paramBase(paramId);\nlet plus = this.paramPlus(paramId);\nlet paramRate = this.paramRate(paramId);\nlet buffRate = this.paramBuffRate(paramId);\nlet flatBonus = this.paramFlatBonus(paramId);\n\n// Formula to determine total parameter value.\nlet value = (base + plus) * paramRate * buffRate + flatBonus;\n\n// Determine the limits\nconst maxValue = this.paramMax(paramId);\nconst minValue = this.paramMin(paramId);\n\n// Final value\nreturn Math.round(value.clamp(minValue, maxValue));"
 *
 * @param BasicParamCaps
 * @text Parameter Caps
 * @parent BasicParameters
 *
 * @param BasicActorParamCaps
 * @text Actors
 * @parent BasicParamCaps
 *
 * @param BasicActorParamMax0:str
 * @text MaxHP Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MaxHP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 9999
 *
 * @param BasicActorParamMax1:str
 * @text MaxMP Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MaxMP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 9999
 *
 * @param BasicActorParamMax2:str
 * @text ATK Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine ATK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax3:str
 * @text DEF Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine DEF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax4:str
 * @text MAT Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MAT cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax5:str
 * @text MDF Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MDF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax6:str
 * @text AGI Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine AGI cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax7:str
 * @text LUK Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine LUK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamCaps
 * @text Enemies
 * @parent BasicParamCaps
 *
 * @param BasicEnemyParamMax0:str
 * @text MaxHP Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MaxHP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999999
 *
 * @param BasicEnemyParamMax1:str
 * @text MaxMP Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MaxMP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 9999
 *
 * @param BasicEnemyParamMax2:str
 * @text ATK Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine ATK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax3:str
 * @text DEF Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine DEF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax4:str
 * @text MAT Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MAT cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax5:str
 * @text MDF Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MDF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax6:str
 * @text AGI Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine AGI cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax7:str
 * @text LUK Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine LUK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param XParameters
 * @text X Parameters
 *
 * @param XParameterFormula:func
 * @text JS: Formula
 * @parent XParameters
 * @type note
 * @desc Formula used to determine the total value all 10 X parameters: HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG.
 * @default "// Determine the variables used in this calculation.\nlet xparamId = arguments[0];\nlet base = this.traitsSum(Game_BattlerBase.TRAIT_XPARAM, xparamId);\nlet plus = this.xparamPlus(xparamId);\nlet paramRate = this.xparamRate(xparamId);\nlet flatBonus = this.xparamFlatBonus(xparamId);\n\n// Formula to determine total parameter value.\nlet value = (base + plus) * paramRate + flatBonus;\n\n// Final value\nreturn value;"
 *
 * @param XParamVocab
 * @text Vocabulary
 * @parent XParameters
 *
 * @param XParamVocab0:str
 * @text HIT
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Hit
 *
 * @param XParamVocab1:str
 * @text EVA
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Evasion
 *
 * @param XParamVocab2:str
 * @text CRI
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Crit.Rate
 *
 * @param XParamVocab3:str
 * @text CEV
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Crit.Evade
 *
 * @param XParamVocab4:str
 * @text MEV
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Magic Evade
 *
 * @param XParamVocab5:str
 * @text MRF
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Magic Reflect
 *
 * @param XParamVocab6:str
 * @text CNT
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Counter
 *
 * @param XParamVocab7:str
 * @text HRG
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default HP Regen
 *
 * @param XParamVocab8:str
 * @text MRG
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default MP Regen
 *
 * @param XParamVocab9:str
 * @text TRG
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default TP Regen
 *
 * @param SParameters
 * @text S Parameters
 *
 * @param SParameterFormula:func
 * @text JS: Formula
 * @parent SParameters
 * @type note
 * @desc Formula used to determine the total value all 10 S parameters: TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR.
 * @default "// Determine the variables used in this calculation.\nlet sparamId = arguments[0];\nlet base = this.traitsPi(Game_BattlerBase.TRAIT_SPARAM, sparamId);\nlet plus = this.sparamPlus(sparamId);\nlet paramRate = this.sparamRate(sparamId);\nlet flatBonus = this.sparamFlatBonus(sparamId);\n\n// Formula to determine total parameter value.\nlet value = (base + plus) * paramRate + flatBonus;\n\n// Final value\nreturn value;"
 *
 * @param SParamVocab
 * @text Vocabulary
 * @parent SParameters
 *
 * @param SParamVocab0:str
 * @text TGR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Aggro
 *
 * @param SParamVocab1:str
 * @text GRD
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Guard
 *
 * @param SParamVocab2:str
 * @text REC
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Recovery
 *
 * @param SParamVocab3:str
 * @text PHA
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Item Effect
 *
 * @param SParamVocab4:str
 * @text MCR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default MP Cost
 *
 * @param SParamVocab5:str
 * @text TCR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default TP Charge
 *
 * @param SParamVocab6:str
 * @text PDR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Physical DMG
 *
 * @param SParamVocab7:str
 * @text MDR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Magical DMG
 *
 * @param SParamVocab8:str
 * @text FDR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Floor DMG
 *
 * @param SParamVocab9:str
 * @text EXR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default EXP Gain
 *
 * @param Icons
 * @text Icons
 *
 * @param DrawIcons:eval
 * @text Draw Icons?
 * @parent Icons
 * @type boolean
 * @on Draw
 * @off Don't Draw
 * @desc Draw icons next to parameter names?
 * @default true
 *
 * @param IconParam0:str
 * @text MaxHP
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 84
 *
 * @param IconParam1:str
 * @text MaxMP
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 165
 *
 * @param IconParam2:str
 * @text ATK
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 76
 *
 * @param IconParam3:str
 * @text DEF
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 81
 *
 * @param IconParam4:str
 * @text MAT
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 101
 *
 * @param IconParam5:str
 * @text MDF
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 133
 *
 * @param IconParam6:str
 * @text AGI
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 140
 *
 * @param IconParam7:str
 * @text LUK
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 87
 *
 * @param IconXParam0:str
 * @text HIT
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 102
 *
 * @param IconXParam1:str
 * @text EVA
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 82
 *
 * @param IconXParam2:str
 * @text CRI
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 78
 *
 * @param IconXParam3:str
 * @text CEV
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 82
 *
 * @param IconXParam4:str
 * @text MEV
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 171
 *
 * @param IconXParam5:str
 * @text MRF
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 222
 *
 * @param IconXParam6:str
 * @text CNT
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 77
 *
 * @param IconXParam7:str
 * @text HRG
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconXParam8:str
 * @text MRG
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconXParam9:str
 * @text TRG
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconSParam0:str
 * @text TGR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 5
 *
 * @param IconSParam1:str
 * @text GRD
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 128
 *
 * @param IconSParam2:str
 * @text REC
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconSParam3:str
 * @text PHA
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 176
 *
 * @param IconSParam4:str
 * @text MCR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 165
 *
 * @param IconSParam5:str
 * @text TCR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 164
 *
 * @param IconSParam6:str
 * @text PDR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 76
 *
 * @param IconSParam7:str
 * @text MDR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 79
 *
 * @param IconSParam8:str
 * @text FDR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 141
 *
 * @param IconSParam9:str
 * @text EXR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 73
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
 * @param TextStr:str
 * @text STR: Text
 * @desc Displayed text used for this title command.
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
 * @default ""
 *
 */
/* ----------------------------------------------------------------------------
 * Title Picture Buttons
 * ----------------------------------------------------------------------------
 */
/*~struct~TitlePictureButton:
 *
 * @param PictureFilename:str
 * @text Picture's Filename
 * @type file
 * @dir img/pictures/
 * @desc Filename used for the picture.
 * @default 
 *
 * @param ButtonURL:str
 * @text Button URL
 * @desc URL for the button to go to upon being clicked.
 * @default https://www.google.com/
 *
 * @param PositionJS:func
 * @text JS: Position
 * @type note
 * @desc JavaScript code that helps determine the button's Position.
 * @default "this.x = Graphics.width - this.bitmap.width - 20;\nthis.y = Graphics.height - this.bitmap.height - 20;"
 *
 * @param OnLoadJS:func
 * @text JS: On Load
 * @type note
 * @desc JavaScript code that runs once this button bitmap is loaded.
 * @default "this.opacity = 0;\nthis.visible = true;"
 *
 * @param CallHandlerJS:func
 * @text JS: Run Code
 * @type note
 * @desc JavaScript code that runs once this button is pressed.
 * @default "const url = this._data.ButtonURL;\nVisuMZ.openURL(url);"
 *
 */
/* ----------------------------------------------------------------------------
 * UI Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~UI:
 *
 * @param UIArea
 * @text UI Area
 *
 * @param FadeSpeed:num
 * @text Fade Speed
 * @parent UIArea
 * @desc Default fade speed for transitions.
 * @default 24
 *
 * @param BoxMargin:num
 * @text Box Margin
 * @parent UIArea
 * @type number
 * @min 0
 * @desc Set the margin in pixels for the screen borders.
 * Default: 4
 * @default 4
 *
 * @param CommandWidth:num
 * @text Command Window Width
 * @parent UIArea
 * @type number
 * @min 1
 * @desc Sets the width for standard Command Windows.
 * Default: 240
 * @default 240
 *
 * @param BottomHelp:eval
 * @text Bottom Help Window
 * @parent UIArea
 * @type boolean
 * @on Bottom
 * @off Top
 * @desc Put the Help Window at the bottom of the screen?
 * @default false
 *
 * @param RightMenus:eval
 * @text Right Aligned Menus
 * @parent UIArea
 * @type boolean
 * @on Right
 * @off Left
 * @desc Put most command windows to the right side of the screen.
 * @default true
 *
 * @param ShowButtons:eval
 * @text Show Buttons
 * @parent UIArea
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show clickable buttons in your game?
 * This will affect all buttons.
 * @default true
 *
 * @param cancelShowButton:eval
 * @text Show Cancel Button
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show cancel button?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param menuShowButton:eval
 * @text Show Menu Button
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show main menu button from the map scene?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param pagedownShowButton:eval
 * @text Show Page Up/Down
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show page up/down buttons?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param numberShowButton:eval
 * @text Show Number Buttons
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show number adjustment buttons?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param ButtonHeight:num
 * @text Button Area Height
 * @parent UIArea
 * @type number
 * @min 1
 * @desc Sets the height for the button area.
 * Default: 52
 * @default 52
 *
 * @param BottomButtons:eval
 * @text Bottom Buttons
 * @parent UIArea
 * @type boolean
 * @on Bottom
 * @off Top
 * @desc Put the buttons at the bottom of the screen?
 * @default false
 *
 * @param SideButtons:eval
 * @text Side Buttons
 * @parent UIArea
 * @type boolean
 * @on Side
 * @off Normal
 * @desc Push buttons to the side of the UI if there is room.
 * @default true
 *
 * @param MenuObjects
 * @text Menu Objects
 *
 * @param LvExpGauge:eval
 * @text Level -> EXP Gauge
 * @parent MenuObjects
 * @type boolean
 * @on Draw Gauge
 * @off Keep As Is
 * @desc Draw an EXP Gauge under the drawn level.
 * @default true
 *
 * @param ParamArrow:str
 * @text Parameter Arrow
 * @parent MenuObjects
 * @desc The arrow used to show changes in the parameter values.
 * @default →
 *
 * @param TextCodeSupport
 * @text Text Code Support
 *
 * @param TextCodeClassNames:eval
 * @text Class Names
 * @parent TextCodeSupport
 * @type boolean
 * @on Suport Text Codes
 * @off Normal Text
 * @desc Make class names support text codes?
 * @default true
 *
 * @param TextCodeNicknames:eval
 * @text Nicknames
 * @parent TextCodeSupport
 * @type boolean
 * @on Suport Text Codes
 * @off Normal Text
 * @desc Make nicknames support text codes?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Window:
 *
 * @param WindowDefaults
 * @text Defaults
 *
 * @param EnableMasking:eval
 * @text Enable Masking
 * @parent WindowDefaults
 * @type boolean
 * @on Masking On
 * @off Masking Off
 * @desc Enable window masking (windows hide other windows behind 
 * them)? WARNING: Turning it on can obscure data.
 * @default false
 *
 * @param LineHeight:num
 * @text Line Height
 * @parent WindowDefaults
 * @desc Default line height used for standard windows.
 * Default: 36
 * @default 36
 *
 * @param ItemPadding:num
 * @text Item Padding
 * @parent WindowDefaults
 * @desc Default line padding used for standard windows.
 * Default: 8
 * @default 8
 *
 * @param BackOpacity:num
 * @text Back Opacity
 * @parent WindowDefaults
 * @desc Default back opacity used for standard windows.
 * Default: 192
 * @default 192
 *
 * @param TranslucentOpacity:num
 * @text Translucent Opacity
 * @parent WindowDefaults
 * @desc Default translucent opacity used for standard windows.
 * Default: 160
 * @default 160
 *
 * @param OpenSpeed:num
 * @text Window Opening Speed
 * @parent WindowDefaults
 * @desc Default open speed used for standard windows.
 * Default: 32 (Use a number between 0-255)
 * @default 32
 * @default 24
 *
 * @param ColSpacing:num
 * @text Column Spacing
 * @parent WindowDefaults
 * @desc Default column spacing for selectable windows.
 * Default: 8
 * @default 8
 *
 * @param RowSpacing:num
 * @text Row Spacing
 * @parent WindowDefaults
 * @desc Default row spacing for selectable windows.
 * Default: 4
 * @default 4
 * 
 * @param SelectableItems
 * @text Selectable Items
 *
 * @param ShowItemBackground:eval
 * @text Show Background?
 * @parent SelectableItems
 * @type boolean
 * @on Show Backgrounds
 * @off No backgrounds.
 * @desc Selectable menu items have dark boxes behind them. Show them?
 * @default true
 *
 * @param ItemHeight:num
 * @text Item Height Padding
 * @parent SelectableItems
 * @desc Default padding for selectable items.
 * Default: 8
 * @default 8
 *
 * @param DrawItemBackgroundJS:func
 * @text JS: Draw Background
 * @parent SelectableItems
 * @type note
 * @desc Code used to draw the background rectangle behind clickable menu objects
 * @default "const rect = arguments[0];\nconst c1 = ColorManager.itemBackColor1();\nconst c2 = ColorManager.itemBackColor2();\nconst x = rect.x;\nconst y = rect.y;\nconst w = rect.width;\nconst h = rect.height;\nthis.contentsBack.gradientFillRect(x, y, w, h, c1, c2, true);\nthis.contentsBack.strokeRect(x, y, w, h, c1);"
 */
/* ----------------------------------------------------------------------------
 * Screen Resolution Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ScreenResolution:
 *
 * @param Troops
 *
 * @param RepositionActors:eval
 * @text Reposition Actors
 * @parent Troops
 * @type boolean
 * @on Reposition
 * @off Keep As Is
 * @desc Update the position of actors in battle if the screen resolution has changed. Ignore if using Battle Core.
 * @default true
 *
 * @param RepositionEnemies:eval
 * @text Reposition Enemies
 * @parent Troops
 * @type boolean
 * @on Reposition
 * @off Keep As Is
 * @desc Update the position of enemies in battle if the screen resolution has changed.
 * @default true
 *
 * @param RepositionEnemies130:eval
 * @text For MZ 1.3.0+?
 * @parent RepositionEnemies:eval
 * @type boolean
 * @on Reposition
 * @off Keep As Is
 * @desc Both this parameter and its parent parameter need to be on when using RPG Maker MZ 1.3.0+.
 * @default false
 *
 */
/* ----------------------------------------------------------------------------
 * Screen Shake Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ScreenShake:
 *
 * @param DefaultStyle:str
 * @text Default Style
 * @type select
 * @option Original
 * @value original
 * @option Random
 * @value random
 * @option Horizontal
 * @value horizontal
 * @option Vertical
 * @value vertical
 * @desc The default style used for screen shakes.
 * @default random
 *
 * @param originalJS:func
 * @text JS: Original Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\nthis.x += Math.round($gameScreen.shake());"
 *
 * @param randomJS:func
 * @text JS: Random Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\n// Original Formula by Aries of Sheratan\nconst power = $gameScreen._shakePower * 0.75;\nconst speed = $gameScreen._shakeSpeed * 0.60;\nconst duration = $gameScreen._shakeDuration;\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);"
 *
 * @param horzJS:func
 * @text JS: Horizontal Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\n// Original Formula by Aries of Sheratan\nconst power = $gameScreen._shakePower * 0.75;\nconst speed = $gameScreen._shakeSpeed * 0.60;\nconst duration = $gameScreen._shakeDuration;\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);"
 *
 * @param vertJS:func
 * @text JS: Vertical Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\n// Original Formula by Aries of Sheratan\nconst power = $gameScreen._shakePower * 0.75;\nconst speed = $gameScreen._shakeSpeed * 0.60;\nconst duration = $gameScreen._shakeDuration;\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);"
 *
 */
/* ----------------------------------------------------------------------------
 * Custom Parameter Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~CustomParam:
 *
 * @param ParamName:str
 * @text Parameter Name
 * @desc What's the parameter's name?
 * Used for VisuStella MZ menus.
 * @default Untitled
 *
 * @param Abbreviation:str
 * @text Abbreviation
 * @parent ParamName:str
 * @desc What abbreviation do you want to use for the parameter?
 * Do not use special characters. Avoid numbers if possible.
 * @default unt
 *
 * @param Icon:num
 * @text Icon
 * @parent ParamName:str
 * @desc What icon do you want to use to represent this parameter?
 * Used for VisuStella MZ menus.
 * @default 160
 *
 * @param Type:str
 * @text Type
 * @parent ParamName:str
 * @type select
 * @option Integer (Whole Numbers Only)
 * @value integer
 * @option Float (Decimals are Allowed)
 * @value float
 * @desc What kind of number value will be returned with this parameter?
 * @default integer
 *
 * @param ValueJS:json
 * @text JS: Value
 * @type note
 * @desc Run this code when this parameter is to be returned.
 * @default "// Declare Constants\nconst user = this;\n\n// Calculations\nreturn 1;"
 *
 */
/* ----------------------------------------------------------------------------
 * Show Picture Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ShowPicture:
 * 
 * @param Position
 *
 * @param Origin:num
 * @text Origin
 * @parent Position
 * @type select
 * @option 0 - Upper Left
 * @value 0
 * @option 1 - Center
 * @value 1
 * @desc What is the origin of this picture icon?
 * @default 0
 *
 * @param PositionX:eval
 * @text Position X
 * @parent Position
 * @desc X coordinate of the picture.
 * You may use JavaScript code.
 * @default 0
 *
 * @param PositionY:eval
 * @text Position Y
 * @parent Position
 * @desc Y coordinate of the picture.
 * You may use JavaScript code.
 * @default 0
 * 
 * @param Scale
 *
 * @param ScaleX:eval
 * @text Width %
 * @parent Scale
 * @desc Horizontal scale of the picture.
 * You may use JavaScript code.
 * @default 100
 *
 * @param ScaleY:eval
 * @text Height %
 * @parent Scale
 * @desc Vertical scale of the picture.
 * You may use JavaScript code.
 * @default 100
 * 
 * @param Blend
 *
 * @param Opacity:eval
 * @text Opacity
 * @parent Blend
 * @desc Insert a number to determine opacity level. Use a
 * number between 0 and 255. You may use JavaScript code.
 * @default 255
 *
 * @param BlendMode:num
 * @text Blend Mode
 * @parent Blend
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc What kind of blend mode do you wish to apply to the picture?
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * JS Quick Function Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~jsQuickFunc:
 *
 * @param FunctionName:str
 * @text Function Name
 * @desc The function's name in the global namespace.
 * Will not overwrite functions/variables of the same name.
 * @default Untitled
 *
 * @param CodeJS:json
 * @text JS: Code
 * @type note
 * @desc Run this code when using the function.
 * @default "// Insert this as a function anywhere you can input code\n// such as Script Calls or Conditional Branch Scripts.\n\n// Process Code\n"
 *
 */
//=============================================================================

const _0x39290f=_0xcc41;(function(_0x41dd2f,_0x136fe1){const _0x36a249=_0xcc41,_0x1974fb=_0x41dd2f();while(!![]){try{const _0x4cb9b5=parseInt(_0x36a249(0x497))/0x1*(parseInt(_0x36a249(0x129))/0x2)+-parseInt(_0x36a249(0x2d0))/0x3+parseInt(_0x36a249(0x8b4))/0x4*(-parseInt(_0x36a249(0x2d4))/0x5)+-parseInt(_0x36a249(0x8a4))/0x6+parseInt(_0x36a249(0x4b8))/0x7+parseInt(_0x36a249(0x858))/0x8+parseInt(_0x36a249(0x200))/0x9*(parseInt(_0x36a249(0x305))/0xa);if(_0x4cb9b5===_0x136fe1)break;else _0x1974fb['push'](_0x1974fb['shift']());}catch(_0x5ab32c){_0x1974fb['push'](_0x1974fb['shift']());}}}(_0x207a,0x4e14e));function _0x207a(){const _0x29f3e4=['HANJA','setupBattleTestItems','fillRect','TXQzy','XytyE','hide','CategoryRect','helpAreaHeight','Pxojp','Bitmap_measureTextWidth','REC','drawNewParam','_createInternalTextures','CoreEngine','onNameOk','INSERT','WASD','Center','EquipMenu','sUhUf','hpGaugeColor2','addEventListener','cancelShowButton','sNfoH','setTargetAnchor','HMiQC','PreserveNumbers','ExtractStrFromMap','MDF','wholeDuration','IconXParam3','_statusEquipWindow','PTB','ARRAYSTRUCT','_pointAnimationSprites','alpha','ExportStrFromAllMaps','processPointAnimationRequests','CRSEL','connected','traitsPi','showPicture','ColorManager_loadWindowskin','WIN_OEM_CUSEL','sin','forceStencil','blockWidth','playMiss','MEV','PLAY','createTitleButtons','left','mpGaugeColor1','sparamRate2','Sprite_Animation_processSoundTimings','sparamPlus','toFixed','Window_Base_createTextState','updatePositionCoreEngineShakeHorz','Window_NumberInput_start','boxHeight','ParseTilesetNotetags','TitleCommandList','scaleMode','yAjIC','expRate','hpColor','JUNJA','gQMXI','Xrugw','KgQro','menu','rdDXJ','tpGaugeColor1','ONE_MINUS_SRC_ALPHA','isAnimationOffsetXMirrored','usableSkills','option','Renderer','_stored_tpGaugeColor1','CommandWidth','processKeyboardDelete','DigitGroupingLocale','Spriteset_Battle_createEnemies','Scene_MenuBase_createCancelButton','DoEsM','tQvsJ','》Comment《\x0a%1\x0a','OutlineColorGauge','font-smooth','Plus1','CreateBattleSystemID','_blank','fbUOy','Kmkys','windowPadding','buttonAssistWindowRect','bTjvj','PDR','EXR','buttonAreaHeight','isBottomButtonMode','toString','ColorHPGauge1','mainAreaBottom','text%1','clearRect','mpGaugeColor2','hideButtonFromView','mainAreaTopSideButtonLayout','isUseModernControls','aLesB','paramRate2','isBusy','SParamVocab8','itypeId','viewport','writeFile','profileWindowRect','move','RevertPreserveNumbers','encounterStep','Spriteset_Base_updatePosition','aRRcj','tlTPo','end','mainFontSize','_fauxAnimationSprites','playCursor','INOUTBACK','setMainFontSize','IconSParam4','mainAreaTop','ktHkJ','paramPlus','paramBase','_cacheScaleX','Version','WIN_OEM_COPY','pop','Scene_Options_create','randomJS','volume','updateOrigin','_offsetY','_slotWindow','〖〖〖\x20Map\x20%1:\x20%2\x20Script\x20〗〗〗\x0a\x0a','keyMapper','onKeyDown','_defaultStretchMode','IconXParam8','COLON','mirror','none','Sprite_Button_updateOpacity','GYFQo','KANA','setFrame','tpCostColor','aABft','addLoadListener','SHIFT','checkCacheKey','stretch','createEnemies','GoldFontSize','cursorPageup','MEijb','FMpLr','HelpBgType','setClickHandler','_baseSprite','processHandling','RrWIx','paramY','expGaugeColor1','PictureID','processEscape','966832tgvhXJ','gaugeRate','SLASH','fEmsj','SwitchToggleOne','isSceneBattle','setupNewGame','initCoreEasing','_stored_mpGaugeColor2','button','_inputString','VisuMZ_2_BattleSystemOTB','updateOpen','get','Scene_MenuBase_mainAreaHeight','getCustomBackgroundSettings','KeyTAB','IconXParam0','windowRect','xparamRate2','nw.gui','NKAro','drawFace','setActorHomeRepositioned','MqIok','OS_KEY','GZSmm','LOBfi','ecdCV','removeAllFauxAnimations','isSideView','onKeyDownKeysF6F7','F22','parallaxes','targetScaleX','wait','innerHeight','QUESTION_MARK','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','CLOSE_BRACKET','_clickHandler','updateTransform','remove','snDNx','TCR','canEquip','max','isItem','PictureShowIcon','NUM','_currentMap','isFauxAnimationPlaying','_categoryWindow','_animation','_repositioned','yPsZM','X:\x20%1','DEF','sellWindowRect','CustomParamNames','waiting','lJclU','xeebl','Scene_Base_terminateAnimationClearBugFix','SyUdT','Game_Picture_y','biGXJ','TojOk','_bitmap','currentClass','UpdatePictureCoordinates','initMembersCoreEngine','endAnimation','cdUGu','dWwYj','PLNmK','2635998bqODyF','STENCIL_TEST','canUse','Window_Base_drawFace','maxCols','NewGameBoot','Flat2','eFsPN','slice','buttonAssistText%1','RequireFocus','pgRya','SParamVocab1','dCfpU','Power','measureText','4utJIkJ','NUMPAD1','backOpacity','fontSize','LoadError','addChildToBack','_internalTextures','maxLvGaugeColor1','isMaskingEnabled','〘Common\x20Event\x20%1:\x20%2〙\x20End','rXtxU','ButtonAssist','loadMapData','SParamVocab6','buttonY','createCustomParameter','QdNVV','ColorMPCost','CIRCUMFLEX','apply','sparam','INQUINT','format','enableDigitGrouping','Chance','removeChild','buttonAssistOffset1','restore','pKOmY','zaOoM','missed','buttonAssistOffset%1','Plus','ARRAYFUNC','<%1\x20%2:[\x20]','Spriteset_Base_destroy','CategoryBgType','maxLevel','pow','_helpWindow','nEwwy','PictureEasingType','GroupDigits','GfqxS','name','reserveNewGameCommonEvent','kCRON','_moveEasingType','DJQRm','ALTGR','ParamChange','ParseAllNotetags','BasicParameterFormula','kVxHt','isAnimationPlaying','WIN_OEM_CLEAR','_pictureCoordinatesMode','ColorTPGauge2','Scene_Battle_createSpriteset','isRightInputMode','HelpRect','getBackgroundOpacity','INOUTBOUNCE','PictureFilename','Subtitle','Window_NameInput_cursorDown','F13','sqrt','getLevel','_inputWindow','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','gEGRV','getCombinedScrollingText','clearStencil','Bitmap_resize','KeyItemProtect','down','Input_setupEventHandlers','QVZAQ','command111','exec','ShowButtons','_lastX','dashToggle','SParamVocab4','isInputting','buttonAssistOffset5','icyyi','clearZoom','DWmlu','Game_Picture_x','EditBgType','movePageButtonSideButtonLayout','bSyQW','ProfileBgType','isActiveTpb','CEV','85996FdYlVl','touchUI','animationNextDelay','bgs','atbActive','zhbqu','tQfQT','exportAllTroopStrings','_battlerName','setCoreEngineUpdateWindowBg','Basic','OUTELASTIC','textHeight','mKkHG','scale','DigitGroupingExText','Game_Picture_calcEasing','SwitchRandomizeRange','DlhNS','guardSkillId','sv_actors','return\x200','OpenSpeed','setSideButtonLayout','fnIwE','DocumentTitleFmt','F15','Graphics','SPACE','ParseSkillNotetags','animations','Scene_Menu_create','OUTBACK','JSON','updateOpacity','LhNfO','removeFauxAnimation','enemy','imageSmoothingEnabled','BuyBgType','EVswr','adjustPictureAntiZoom','Game_Action_itemHit','EVAL','_stored_hpGaugeColor1','Window_NumberInput_processDigitChange','Window_EquipItem_isEnabled','titles2','MCR','《《《\x20Page\x20%1\x20》》》\x0a%2\x0a','RepositionEnemies','paramFlatJS','tileHeight','_windowskin','IrXxO','VOLUME_DOWN','indexOf','uWruQ','LineHeight','_makeFontNameText','Window_StatusBase_drawActorLevel','command105','eva','buttonAssistWindowButtonRect','helpAreaTopSideButtonLayout','_dimmerSprite','ExportStrFromAllTroops','ShowDevTools','_pressed','cancel','damageColor','WGNzl','skillId','requestPointAnimation','registerCommand','NUMPAD0','measureTextWidth','DyYBs','ctGaugeColor2','menuShowButton','ugxDL','resize','zYGNY','DashToggleR','setEasingType','xPZoh','font','ZnBPp','Script\x20Call\x20Error','ItemPadding','right','F11','updateMove','moveMenuButtonSideButtonLayout','RnePZ','lLdGS','Scene_MenuBase_mainAreaTop','Scene_MenuBase_createPageButtons','NewGameCommonEventAll','Icon','aKjHb','subjectHitRate','rSJky','KeyboardInput','Keyboard','outlineColorGauge','isMVAnimation','setEnemyAction','retrievePointAnimation','CancelText','_hideTileShadows','updatePositionCoreEngineShakeRand','xparam','_cacheScaleY','processTouch','open','updateKeyText','reservePlayTestNewGameCommonEvent','pLjqk','qbIZJ','anchor','_coreEasingType','original','MINUS','Export\x20Map\x20Text\x20operation\x20will\x20finish\x20in\x20%1\x20ms(s)','CONTEXT_MENU','DEUYb','Sprite_Battler_startMove','_list','LvExpGauge','_forcedBattleSys','Settings','CustomParamAbb','CZpPt','HELP','MAXMP','helpWindowRect','Symbol','Input_update','ActorBgType','_stored_tpGaugeColor2','defaultInputMode','gradientFillRect','getGamepads','sparamRate1','transform','isWindowMaskingEnabled','sIkcS','OyPrE','currentValue','bitmapHeight','qZFKu','isNwjs','cursorPagedown','exportAllMapStrings','updateScene','mCaSl','EnableNumberInput','isOptionValid','gXFXd','drawGameVersion','isGamepadTriggered','gENat','Key%1','Game_Party_consumeItem','repeat','hit','KeyUnlisted','IconSParam6','ePNRh','HIT','isExpGaugeDrawn','XParamVocab1','Scene_Boot_updateDocumentTitle','CNT','repositionCancelButtonSideButtonLayout','initCoreEngineScreenShake','Window_Selectable_cursorDown','_stored_powerDownColor','Bitmap_clearRect','lQjqZ','paramPlusJS','bind','drawCharacter','targetBackOpacity','BackOpacity','drawCurrentParam','parameters','EREOF','buttonAssistText2','Window_StatusBase_drawActorSimpleStatus','Scene_Base_createWindowLayer','targetOpacity','_offsetX','status','ozRmC','HIBsD','setMoveEasingType','ParseEnemyNotetags','BACK_QUOTE','eUqmL','OUTEXPO','_stored_powerUpColor','IconXParam6','rightArrowWidth','uKhGV','NUMPAD8','ActorTPColor','updateWaitMode','backgroundBitmap','CodeJS','playBuzzer','displayY','ButtonFadeSpeed','_backgroundFilter','342pOPNZN','min','itemLineRect','checkSmartEventCollision','ESDsO','_backgroundSprite','CAPSLOCK','createTextState','EFhbW','Window_NameInput_cursorUp','textColor','vqVtK','_timerSprite','FontShadows','bgmVolume','TAB','trDZY','BTestAddedQuantity','VhWIX','offsetX','SystemLoadImages','YgDqn','GoldIcon','pagedownShowButton','drawText','Scene_Boot_startNormalGame','BgFilename2','addCommand','Window_NameInput_processHandling','ShopMenu','IACvw','REPLACE','setWindowPadding','kDFyc','_storedMapText','reduce','targetScaleY','tiiuM','isAlive','VisuMZ_2_BattleSystemPTB','RegExp','buttonAssistKey3','deathColor','Location','Game_Map_setup','setHome','TRG','\x20Origin:\x20%1','reserveCommonEvent','ZxVzx','oRSVs','itemHit','getInputMultiButtonStrings','Game_Interpreter_command122','ArQgK','VisuMZ_2_BattleSystemETB','ActorRect','NUMPAD9','destroyCoreEngineMarkedBitmaps','SkillTypeRect','_buttonAssistWindow','DamageColor','_lastPluginCommandInterpreter','SCROLL_LOCK','buttonAssistOffset2','Max','save','isEnabled','areButtonsHidden','VisuMZ_2_BattleSystemSTB','tileWidth','WIN_OEM_BACKTAB','OUTQUINT','isFullDocumentTitle','buttonAssistKey5','log','result','prototype','ythRp','_context','eGgov','system','TxXjI','itemBackColor2','EXECUTE','([\x5c+\x5c-]\x5cd+)([%％])>','targetX','IconSParam1','TextStr','learnings','FxoEJ','key%1','Troop%1','drawCircle','_CoreEngineSettings','Window_NameInput_cursorPageup','buttonAssistKey%1','NqZNX','TxSAH','Show\x20Scrolling\x20Text\x20Script\x20Error','filter','Game_Picture_updateMove','_origin','DefaultMode','ESC','ZvPRs','commandWindowRect','ExportAllTroopText','ATTN','onXhrError','SkillTypeBgType','NameInputMessage','down2','calcEasing','showFauxAnimations','requestMotion','valueOutlineColor','show','altKey','TextJS','makeCommandList','LESS_THAN','commandWindowRows','drawItem','floor','mBXyN','runCombinedScrollingTextAsCode','getBattleSystem','Sprite_Gauge_currentValue','Sprite_destroy','subtitle','PictureEraseAll','RowSpacing','sparamPlus2','useDigitGroupingEx','home','gCJCN','Sprite_Button_initialize','xCQwg','ParseItemNotetags','MAT','bitmap','etKeG','printError','getPointAnimationLayer','pageup','VOLUME_UP','Export\x20Troop\x20Text\x20operation\x20will\x20finish\x20in\x20%1\x20ms(s)','ParseWeaponNotetags','resetFontSettings','command122','_numberWindow','paramMax','StatusEquipRect','Window_Selectable_cursorUp','isTpb','isActor','ukBJL','SystemSetWindowPadding','ScaleX','STB','MIN_SAFE_INTEGER','KFynd','pointY','padding','substring','clamp','moveRelativeToResolutionChange','statusWindowRect','QHrQs','index','xparamPlus2','_stored_hpGaugeColor2','DOLLAR','SceneManager_initialize','easingType','_isPlaytest','command355','GSqRI','([\x5c+\x5c-]\x5cd+\x5c.?\x5cd+)>','_battleField','drawActorLevel','_targetOffsetX','sparamFlatJS','Linear','enableDigitGroupingEx','Game_Interpreter_command355','WIN_OEM_FJ_ROYA','_statusParamsWindow','createPointAnimationTargets','_digitGroupingEx','horizontal','origin','applyCoreEasing','processKeyboardEnd','BattleSystem','_commandWindow','setAnchor','UMkit','EscapeAlways','Plwyj','KeEJS','Type','isHandled','DimColor1','child_process','BgFilename1','paramFlatBonus','1905861iWFkBv','CrisisRate','buttonAssistText1','integer','1567095KCRZPe','iITwk','createPointAnimationSprite','Window_Selectable_drawBackgroundRect','picture','Scene_Name_onInputOk','numActions','kpdDF','setMute','updateAnchor','toQZO','Game_Temp_initialize','setViewport','processKeyboardHandling','TimeProgress','split','IconXParam4','inputWindowRect','keyCode','Game_System_initialize','destroy','F18','createFauxAnimationSprite','expGaugeColor2','_stored_mpCostColor','ELrjU','kngVK','initCoreEngine','_skillTypeWindow','WIN_OEM_ATTN','updatePositionCoreEngineShakeOriginal','oLOsc','BemFG','fbzAA','clone','_shakeDuration','_pictureCoordinatesWindow','horzJS','VisuMZ\x20CoreEngine\x20PictureIcon\x20%1\x20%2','AccuracyBoost','MVivs','setHandler','titleCommandWindow','gaugeBackColor','Padding','_muteSound','layoutSettings','ghkHR','hpGaugeColor1','292960YmJQBA','iHpyN','_movementDuration','_commandList','VisuMZ_2_BattleSystemFTB','OpaoA','PositionX','Title','\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%2\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27JS\x20Quick\x20Function\x20\x22%1\x22\x20Error!\x27);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20','ETB','catchLoadError','_onKeyPress','_screenX','processKeyboardDigitChange','RsLmM','processSoundTimings','INSINE','editWindowRect','skillTypes','coreEngineRepositionEnemies','isMapScrollLinked','_storedStack','GameEnd','OkText','ceil','iDtFx','AJkKf','Gold','ESFuW','Bitmap_strokeRect','code','process_VisuMZ_CoreEngine_jsQuickFunctions','targetY','processFauxAnimationRequests','value','contents','OutlineColor','buttonAssistSwitch','Window_Gold_refresh','EytJS','drawActorExpGauge','YfgZF','updateDashToggle','Scene_Map_createSpriteset','XParamVocab6','ColorTPCost','asin','paramName','iXgPo','isClosed','ColorExpGauge2','loadIconBitmap','encounterStepsMinimum','Bitmap_fillRect','GcldD','_customModified','setBattleSystem','playLoad','ARRAYJSON','itemPadding','Window_ShopSell_isEnabled','Scene_Shop_create','_sideButtonLayout','DataManager_setupNewGame','EncounterRateMinimum','_stored_maxLvGaugeColor1','SceneManager_isGameActive','LxMdg','\x5c}❪SHIFT❫\x5c{','normalColor','iconHeight','TitlePicButtons','sceneTerminationClearEffects','BgType','yScrollLinkedOffset','_gamepadWait','_backSprite1','F19','_tilemap','escape','performEscape','displayX','add','Manual','addChild','NUMPAD7','slotWindowRect','lKxoY','KJAqI','openingSpeed','ListBgType','maxTp','tab','Conditional\x20Branch\x20Script\x20Error','_pauseSignSprite','_number','drawGauge','setGuard','PHA','ColorTPGauge1','EISU','setSize','Graphics_defaultStretchMode','INQUAD','HKfqf','drawRightArrow','nah','setViewportCoreEngineFix','_fauxAnimationQueue','showPointAnimations','gaugeLineHeight','ForceNoPlayTest','setupButtonImage','_width','Scene_Battle_update','Pixelated','PGUP','MVuaN','nnAqV','sparamRateJS','(\x5cd+)>','CRI','Actor','_addShadow','_itemWindow','INOUTSINE','_colorCache','battleSystem','drawIcon','GoldChange','OpenURL','sparamPlusJS','loadWindowskin','createFauxAnimationQueue','HASH','paramValueByName','ParamArrow','playTestF7','_mirror','Param','%1\x0a','destroyed','F17','platform','_dummyWindow','_lastY','INOUTQUINT','Scene_Map_updateScene','SParameterFormula','meVolume','_pictureContainer','OUTQUAD','_screenY','showDevTools','Lybnn','createPointAnimationQueue','drawBackgroundRect','ProfileRect','StatusParamsBgType','sparamFlat1','ButtonHeight','ZVfAb','ujehO','startMove','SLlTt','attackSkillId','GoldOverlap','pHvVt','SaveMenu','deselect','drawTextEx','MTIrm','AnimationMirrorOffset','processCursorMove','WIN_OEM_PA1','number','defineProperty','isTriggered','ParseClassNotetags','createChildSprite','ParseStateNotetags','OGSPt','glOHE','YbKRa','innerWidth','DjQZp','MenuBg','SParamVocab5','ActorHPColor','ColSpacing','updateMain','responseText','LUK','translucentOpacity','PRESERVCONVERSION(%1)','playTestF6','BlurFilter','catchUnknownError','faceWidth','context','INOUTEXPO','concat','MultiKeyFmt','mev','RdBpX','Opacity','CbGqN','currentLevelExp','BannedWords','tDcQQ','vmfTN','INEXPO','_maxDigits','jsQuickFunc','SELECT','_menuButton','_statusWindow','faceHeight','startAutoNewGame','batch','_effectsContainer','keyboard','ZQhcT','NUMPAD4','SmartEventCollisionPriority','BaseTexture','IconSParam0','MRF','_drawTextShadow','HOTfm','yZdCA','NjLZA','ConvertNumberToString','maxGold','PAUSE','onButtonImageLoad','storeMapData','_hovered','WIN_ICO_00','enter','battlebacks2','_digitGrouping','image-rendering','xAYqA','IGWdB','_pointAnimationQueue','_centerElementCoreEngine','outbounce','boxWidth','_upArrowSprite','QUOTE','nTzBi','round','Game_Action_itemEva','AntiZoomPictures','pictureButtons','playEscape','MhVns','PSYrG','ParamName','blt','switchModes','jQGBO','rowSpacing','IconParam6','nXbEI','KPEFF','%1:\x20Exit\x20','SellRect','IBccN','gameTitle','EditRect','MainMenu','inbounce','SXuMC','ASTERISK','IHdWv','_coreEngineShakeStyle','_anchor','_playtestF7Looping','replace','xparamFlatBonus','mhp','irNyb','IGMSP','%1%2','Game_Picture_show','Game_Character_processMoveCommand','DummyRect','ApplyEasing','updateLastTarget','PictureCoordinatesMode','BTB','width','%1/','DisplayedParams','exit','BTestWeapons','ColorNormal','isSmartEventCollisionOn','height','jSGWX','drawParamText','SlotBgType','goldWindowRect','valueOutlineWidth','isNormalPriority','win32','itpOr','systemColor','Rate1','BattleManager_processEscape','XParameterFormula','ItemBgType','Sprite_Picture_loadBitmap','OptionsRect','iconWidth','STRUCT','playOk','IconSParam8','isSpecialCode','BuyRect','ConvertParams','mpCostColor','GTyqs','EVA','initDigitGrouping','OqdjX','sHOWB','ExportString','createSpriteset','BoxMargin','test','currencyUnit','ExtractStrFromTroop','applyForcedGameTroopSettingsCoreEngine','PA1','Window_NameInput_initialize','Unnamed','Duration','text','Scene_Boot_loadSystemImages','loadPicture','1.3.0','targetEvaRate','eBSeB','CTRL','setupCoreEngine','buttonAssistText3','process_VisuMZ_CoreEngine_Settings','PixelateImageRendering','KeySHIFT','Page','maxItems','onInputOk','Game_BattlerBase_initMembers','cFFfL','_pollGamepads','Window_NameInput_refresh','ALT','ponRC','Window_Selectable_processTouch','CTLjg','seVolume','_commonEventLayers','loadTitle2','EXCLAMATION','RepositionActors','setAction','start','_refreshBack','\x0a\x0a\x0a\x0a\x0a','F14','uiAreaWidth','SnapshotOpacity','_isWindow','updatePointAnimations','style','AYpwL','INCIRC','_registerKeyInput','ColorExpGauge1','getInputButtonString','PSZAp','Game_Actor_levelUp','slAIh','markCoreEngineModified','alwaysDash','makeFontSmaller','RicIk','yHwib','MAXHP','INOUTQUAD','isGamepadButtonPressed','opacity','WIN_OEM_FJ_TOUROKU','TextFmt','paramX','drawIconBySize','paramWidth','updatePadding','xdg-open','4lkjnlr','〘Common\x20Event\x20%1:\x20%2〙\x20Start','isPlaytest','members','onClick','_centerElement','CommandRect','drawGoldItemStyle','rSHXN','buttonAssistText5','_closing','zmFDc','stringKeyMap','bFLIz','cursorRight','Exported_Script_%1.txt','Input_pollGamepads','AnimationID','ScreenResolution','_stored_expGaugeColor1','_pageupButton','isArrowPressed','fillStyle','Jbuln','gainSilentTp','MxsHu','FadeSpeed','tilesets','oLXCe','blendFunc','retreat','Tilemap_addShadow','FINAL','2112369vsyEVD','ImprovedAccuracySystem','ExtJS','_spriteset','onLoad','makeInputButtonString','F23','Saved\x20file\x20as\x20%1\x20in\x20project\x20folder.','maxLvGaugeColor2','sv_enemies','lMhKQ','cursorDown','isNumpadPressed','Game_BattlerBase_refresh','getCoreEngineScreenShakeStyle','IconParam2','getColorDataFromPluginParameters','initBasic','GetParamIcon','updateEffekseer','META','actorWindowRect','WVoyU','uiAreaHeight','ONE','CallHandlerJS','ColorCTGauge2','Sprite_Animation_setViewport','buttonAssistOffset3','rrDBE','Window_Base_drawCharacter','RQatF','vZhio','TGR','IconParam0','Upper\x20Left','_setupEventHandlers','pagedown','AMPERSAND','StatusBgType','isKeyItem','Frpbu','_encounterCount','Spriteset_Base_update','IconXParam1','dtGgJ','fZuMC','rcMFN','ColorCrisis','Bitmap_drawTextOutline','filters','_scene','wgrhQ','DELETE','_index','smoothSelect','updatePlayTestF7','updateFauxAnimations','ItemMenu','_forcedTroopView','ZiFJS','WIN_OEM_JUMP','VisuMZ_1_OptionsCore','fRQjM','list','VDjKg','BottomHelp','trim','ctGaugeColor1','terminate','WIN_OEM_RESET','parse','contentsOpacity','SlotRect','difnL','SwitchActorText','Game_Picture_initBasic','isSideButtonLayout','dDeFO','createButtonAssistWindow','NumberRect','dimColor2','F21','padZero','DrawIcons','Spriteset_Base_initialize','oCLrK','KEEP','toLowerCase','optionsWindowRect','pendingColor','SParamVocab2','makeAutoBattleActions','measureTextWidthNoRounding','WIN_OEM_FJ_MASSHOU','changeClass','ZBDpN','ColorMaxLvGauge2','isRepeated','DpCwp','Hfrip','OTB','ZITqJ','animationBaseDelay','tpGaugeColor2','duration','mainAreaHeight','version','《《《\x20Event\x20%1:\x20%2,\x20Page\x20%3\x20》》》\x0a%4\x0a','_movementWholeDuration','ZHZNA','NameMenu','EfSkb','traitObjects','hGpWQ','bfnXo','resetBattleSystem','Scene_Status_create','Map%1','XParamVocab3','loadSystem','itemSuccessRate','KGvHj','wYyEC','$dataMap','ATK','playCancel','setBackgroundType','initMembers','DOWN','pressed','ADYRQ','AllMaps','GqYpt','HOME','originalJS','ARRAYEVAL','CnLCP','_editWindow','worldTransform','DefaultStyle','TranslucentOpacity','Game_Screen_initialize','center','randomInt','COMMA','bgsVolume','Untitled','EndingID','updatePosition','END','Sprite_AnimationMV_processTimingData','_tempActor','tbDsc','NumberBgType','isGameActive','Scene_Map_createMenuButton','onload','background','visible','SideButtons','isCancelled','Enemy','targets','Speed','CustomParamIcons','_height','buttonAssistCancel','goto','calcCoreEasing','WARNING:\x20%1\x20has\x20already\x20been\x20declared\x0aand\x20cannot\x20be\x20used\x20as\x20a\x20Quick\x20JS\x20Function','popScene','ExportAllMapText','inBattle','loadSystemImages','_shakePower','PositionY','createMenuButton','createCommandWindow','up2','onMoveEnd','_optionsWindow','performMiss','NONCONVERT','EQUALS','currentExp','paramchangeTextColor','WIN_OEM_AUTO','isBottomHelpMode','clear','levelUp','makeEncounterCount','flush','WIN_OEM_ENLW','smallParamFontSize','cAbAm','IconIndex','diNQN','advanced','_mapNameWindow','charAt','_updateFilterArea','UKOrm','Layer','isOpen','_stored_normalColor','DgqZj','createCustomBackgroundImages','cursorUp','clearCachedKeys','Scene_Battle_createCancelButton','CommandBgType','IconSParam3','startAnimation','level','MAX_SAFE_INTEGER','<JS\x20%1\x20%2:[\x20](.*)>','contains','call','map','xparamPlus','repositionEnemiesByResolution','shift','EQUAL','MAX_GL_TEXTURES','en-US','#%1','targetObjects','length','Enable','AtoGl','render','Scene_Map_updateMainMultiply','UNpIC','XParamVocab0','processBack','actor','process_VisuMZ_CoreEngine_Notetags','_stored_crisisColor','SParamVocab0','allowShiftScrolling','_stored_systemColor','Game_Interpreter_command105','_backSprite2','gold','_downArrowSprite','data/','BlendMode','Window_Selectable_processCursorMove','battlebacks1','TPB\x20ACTIVE','Window_NameInput_processTouch','powerDownColor','URL','ColorMPGauge1','process_VisuMZ_CoreEngine_CustomParameters','changeTextColor','initialBattleSystem','optSideView','ColorPowerUp','ExtractStrFromList','renderNoMask','_opening','PRINT','qGUXN','AllTroops','initialLevel','makeCoreEngineCommandList','VisuMZ_2_BattleSystemCTB','targetContentsOpacity','setBackgroundOpacity','_stored_ctGaugeColor2','_shakeSpeed','params','loadBitmap','match','_goldWindow','XParamVocab4','anchorCoreEasing','drawActorClass','Color','param','Window_Base_initialize','retrieveFauxAnimation','xparamFlat2','createPageButtons','ToQdZ','KHNJp','_cancelButton','_isButtonHidden','Flat1','BACK_SLASH','jNjhh','Window','DigitGroupingStandardText','xparamFlat1','mGSLp','MDR','vertical','InputBgType','consumeItem','AnimationPoint','_stored_expGaugeColor2','_data','IconParam5','eRfUi','isCursorMovable','Scene_MenuBase_helpAreaTop','ItemRect','Scene_Boot_onDatabaseLoaded','JkAJP','process_VisuMZ_CoreEngine_Functions','INQUART','_paramPlus','vEbrX','isMagical','paramBaseAboveLevel99','_profileWindow','mZPON','PGDN','openness','iaZGJ','drawGameTitle','isMenuButtonAssistEnabled','InputRect','addWindow','evaded','isOpenAndActive','setCoreEngineScreenShakeStyle','StatusParamsRect','refreshDimmerBitmap','_margin','_hideButtons','textWidth','Total','FunctionName','isGamepadConnected','setupValueFont','createTroopNote','OuIxg','WIN_ICO_CLEAR','Scene_Skill_create','erasePicture','Input_onKeyDown','_coreEasing','_inputSpecialKeyCode','Mirror','buttonAssistKey1','_listWindow','contentsBack','QWtih','buttons','createBuffer','PRINTSCREEN','Input_shouldPreventDefault','onDatabaseLoaded','_clientArea','BACKSPACE','adjustSprite','StartID','itemRect','scaleSprite','izFHw','Sprite_Gauge_gaugeRate','rgba(0,\x200,\x200,\x200.7)','initButtonHidden','Scene_MenuBase_createBackground','KdBno','rgchM','_pictureName','SceneManager_onKeyDown','note','SideView','_sellWindow','Graphics_printError','backspace','isTouchedInsideFrame','listWindowRect','INCUBIC','DATABASE','OUTCUBIC','GoldBgType','helpAreaBottom','BottomButtons','stencilOp','GRD','paramFlat','_stored_deathColor','HRG','makeTargetSprites','(\x5cd+)([%％])>','ParseActorNotetags','itemHitImprovedAccuracy','updateMainMultiply','ShowJS','dGWTV','pixelated','createCancelButton','QoL','updatePictureAntiZoom','VisuMZ_2_BattleSystemBTB','XParamVocab2','xScrollLinkedOffset','updateShadow','eventsXyNt','command357','processMoveCommand','subject','Game_Action_updateLastTarget','McvId','Bitmap_blt','_changingClass','drawSegment','eZIap','ASifI','_actor','IHuZM','Plus2','yfbys','buttonAssistText4','_pagedownButton','mapId','moveCancelButtonSideButtonLayout','SParamVocab3','IconSParam5','TUjUJ','statusParamsWindowRect','stencilFunc','_playTestFastMode','clearForcedGameTroopSettingsCoreEngine','createWindowLayer','OPEN_CURLY_BRACKET','_troopId','updateClose','ExportCurTroopText','Y:\x20%1','SHcbq','ParseArmorNotetags','fillText','ShowItemBackground','Scene_Item_create','_actorWindow','EXSEL','isPhysical','getButtonAssistLocation','LINEAR','pyywG','uFLDC','createDigits','requestFauxAnimation','Flat','Scene_Map_initialize','titles1','useDigitGrouping','sparamRate','FDR','areButtonsOutsideMainUI','helpAreaTop','paramRate1','HfRth','stypeId','textSizeEx','setupCoreEasing','random','resetTextColor','SParamVocab9','cfvbM','CLeLZ','KOqTO','isInstanceOfSceneMap','INOUTCIRC','SBvFj','EnableJS','ScreenShake','cos','process_VisuMZ_CoreEngine_RegExp','send','AGI','smooth','INBACK','outlineColorDmg','PositionJS','parseForcedGameTroopSettingsCoreEngine','oifFb','mdorr','_lastOrigin','ItemHeight','_shouldPreventDefault','Origin','drawCurrencyValue','push','xRwZS','ExportCurMapText','Smooth','([\x5c+\x5c-]\x5cd+)>','GGXsS','itemHeight','drawValue','tpColor','SystemSetBattleSystem','stop','sparamFlat2','default','playCursorSound','createPointAnimation','prPoZ','_targetOffsetY','NewGameCommonEvent','ParamMax','itemWindowRect','GQDun','openURL','BTestArmors','keyRepeatWait','createJsQuickFunction','update','ENTER','_targetAnchor','onInputBannedWords','Game_Actor_paramBase','Abbreviation','EnableMasking','RzaFI','isAnimationForEach','EnableNameInput','cursorLeft','OPEN_BRACKET','paramRateJS','DummyBgType','HYPHEN_MINUS','gainItem','StatusEquipBgType','WindowLayer_render','isPointAnimationPlaying','toUpperCase','Game_Actor_changeClass','shake','GoldMax','Window_NameInput_cursorLeft','includes','vYXlD','Window_NameInput_cursorPagedown','faces','xparamFlatJS','children','MxKcL','GkROL','processAlwaysEscape','itemEva','CTB','_active','buttonAssistWindowSideRect','xparamPlus1','Rate2','Input_clear','sEikg','_stored_ctGaugeColor1','type','cjxOu','isCollidedWithEvents','outlineColor','HqMbB','vertJS','animationId','lNkcO','aNRUQ','KDsuC','focus','_mainSprite','kVgxD','Game_Troop_setup','levelUpRecovery','_mode','Mute','ColorHPGauge2','_buyWindow','(\x5cd+\x5c.?\x5cd+)>','createBackground','ARRAYSTR','makeDocumentTitle','removeAllPointAnimations','Bitmap_gradientFillRect','refresh','removePointAnimation','DECIMAL','zCvxc','buttonAssistOk','RPGMAKER_VERSION','zKVva','_windowLayer','FontSize','ValueJS','catchException','rgba(0,\x200,\x200,\x201.0)','IDs','_viewportSize','_realScale','LATIN1','itemBackColor1','SystemSetSideView','_hp','_balloonQueue','RightMenus','processCursorHomeEndTrigger','ACCEPT','charCode','forceOutOfPlaytest','Scene_Name_create','F12','setColorTone','SCALE_MODES','StatusRect','F16','Game_Interpreter_updateWaitMode','processTimingData','isPressed','Sprite_Picture_updateOrigin','Spriteset_Base_isAnimationPlaying','updatePositionCoreEngineShakeVert','qMixu','gainGold','loadTitle1','processDigitChange','Htqcu','WIN_OEM_PA2','IconParam3','updateDocumentTitle','TEcwz','applyEasing','SystemSetFontSize','STENCIL_BUFFER_BIT','ListRect','JnOrq','CustomParamType','lineHeight','VqosG','〘Show\x20Text〙\x0a','updatePositionCoreEngine','statusEquipWindowRect','〖〖〖\x20Troop\x20%1:\x20%2\x20Script\x20〗〗〗\x0a\x0a','mute','isItemStyle','processKeyboardHome','F6key','Window_NameInput_cursorRight','SEMICOLON','cCaUK','MRG','LXHnW','FTB','snapForBackground','XParamVocab7','_stored_maxLvGaugeColor2','Map%1.json','initVisuMZCoreEngine','WIN_OEM_WSCTRL','DrawItemBackgroundJS','create','makeDeepCopy','pages','buttonAssistKey4','Game_Event_isCollidedWithEvents','sparamFlatBonus','sSBEz','createDimmerSprite','mainAreaHeightSideButtonLayout','framebuffer','%1〘Choice\x20%2〙\x20%3%1','WIN_OEM_FJ_LOYA','startNormalGame','IconSParam9','setAttack','CgiMO','_buttonType','catchNormalError','Window_Base_drawText','%2%1%3','powerUpColor','buttonAssistKey2','areTileShadowsHidden','gaugeHeight','mkNeb','categoryWindowRect','processKeyboardBackspace','equips','isPlaying','img/%1/','RIGHT','fadeSpeed','getColor','BTestItems','constructor','drawGameSubtitle','_cache','normal','Rate','Game_Picture_move','PVasC','setup','onerror','nfhyn','loadGameImagesCoreEngine','characters','terms','setActorHome','NUMPAD5','HIuLM','Sprite_Actor_setActorHome','QYMTf','select','drawActorSimpleStatus','setValue','eIyXX','Window_Base_drawIcon','ColorMPGauge2','toLocaleString','GoldRect','OPEN_PAREN','cyUqT','kliaV','SwitchRandomizeOne','bitmapWidth','utiPu','Game_Interpreter_command111','Window_Selectable_itemRect','uOFIU','pictures','pointX','description','AfFpd','dxSYa','SEPARATOR','ModernControls','dimColor1','initialize','windowOpacity','TPB\x20WAIT','Control\x20Variables\x20Script\x20Error','setSideView','processCursorMoveModernControls','MenuLayout','CLOSE_CURLY_BRACKET','IconSet','getLastPluginCommandInterpreter','zeFPl','updateData','join','_onKeyDown','Wait','createFauxAnimation'];_0x207a=function(){return _0x29f3e4;};return _0x207a();}var label='CoreEngine',tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x39290f(0x264)](function(_0x31cf48){const _0x26d211=_0x39290f;return _0x31cf48[_0x26d211(0x1eb)]&&_0x31cf48[_0x26d211(0x790)]['includes']('['+label+']');})[0x0];VisuMZ[label][_0x39290f(0x1ac)]=VisuMZ[label][_0x39290f(0x1ac)]||{},VisuMZ[_0x39290f(0x447)]=function(_0x34d77b,_0x3d69cb){const _0xe6cbfd=_0x39290f;for(const _0x5c2094 in _0x3d69cb){if(_0x5c2094[_0xe6cbfd(0x5cb)](/(.*):(.*)/i)){const _0x579a5f=String(RegExp['$1']),_0x4503e5=String(RegExp['$2'])[_0xe6cbfd(0x6ce)]()[_0xe6cbfd(0x4fb)]();let _0x273fc3,_0x33967,_0x5d5eda;switch(_0x4503e5){case _0xe6cbfd(0x889):_0x273fc3=_0x3d69cb[_0x5c2094]!==''?Number(_0x3d69cb[_0x5c2094]):0x0;break;case'ARRAYNUM':_0x33967=_0x3d69cb[_0x5c2094]!==''?JSON[_0xe6cbfd(0x4ff)](_0x3d69cb[_0x5c2094]):[],_0x273fc3=_0x33967['map'](_0x241f49=>Number(_0x241f49));break;case _0xe6cbfd(0x154):_0x273fc3=_0x3d69cb[_0x5c2094]!==''?eval(_0x3d69cb[_0x5c2094]):null;break;case _0xe6cbfd(0x540):_0x33967=_0x3d69cb[_0x5c2094]!==''?JSON[_0xe6cbfd(0x4ff)](_0x3d69cb[_0x5c2094]):[],_0x273fc3=_0x33967[_0xe6cbfd(0x593)](_0x426eb4=>eval(_0x426eb4));break;case _0xe6cbfd(0x14a):_0x273fc3=_0x3d69cb[_0x5c2094]!==''?JSON['parse'](_0x3d69cb[_0x5c2094]):'';break;case _0xe6cbfd(0x33f):_0x33967=_0x3d69cb[_0x5c2094]!==''?JSON['parse'](_0x3d69cb[_0x5c2094]):[],_0x273fc3=_0x33967[_0xe6cbfd(0x593)](_0x3af63d=>JSON[_0xe6cbfd(0x4ff)](_0x3af63d));break;case'FUNC':_0x273fc3=_0x3d69cb[_0x5c2094]!==''?new Function(JSON[_0xe6cbfd(0x4ff)](_0x3d69cb[_0x5c2094])):new Function(_0xe6cbfd(0x13e));break;case _0xe6cbfd(0x8d5):_0x33967=_0x3d69cb[_0x5c2094]!==''?JSON[_0xe6cbfd(0x4ff)](_0x3d69cb[_0x5c2094]):[],_0x273fc3=_0x33967[_0xe6cbfd(0x593)](_0x4e6a59=>new Function(JSON[_0xe6cbfd(0x4ff)](_0x4e6a59)));break;case'STR':_0x273fc3=_0x3d69cb[_0x5c2094]!==''?String(_0x3d69cb[_0x5c2094]):'';break;case _0xe6cbfd(0x6fa):_0x33967=_0x3d69cb[_0x5c2094]!==''?JSON[_0xe6cbfd(0x4ff)](_0x3d69cb[_0x5c2094]):[],_0x273fc3=_0x33967[_0xe6cbfd(0x593)](_0x475c25=>String(_0x475c25));break;case _0xe6cbfd(0x442):_0x5d5eda=_0x3d69cb[_0x5c2094]!==''?JSON[_0xe6cbfd(0x4ff)](_0x3d69cb[_0x5c2094]):{},_0x34d77b[_0x579a5f]={},VisuMZ[_0xe6cbfd(0x447)](_0x34d77b[_0x579a5f],_0x5d5eda);continue;case _0xe6cbfd(0x7c7):_0x33967=_0x3d69cb[_0x5c2094]!==''?JSON[_0xe6cbfd(0x4ff)](_0x3d69cb[_0x5c2094]):[],_0x273fc3=_0x33967[_0xe6cbfd(0x593)](_0x3706b2=>VisuMZ[_0xe6cbfd(0x447)]({},JSON[_0xe6cbfd(0x4ff)](_0x3706b2)));break;default:continue;}_0x34d77b[_0x579a5f]=_0x273fc3;}}return _0x34d77b;},(_0x51db0c=>{const _0xdf9a4f=_0x39290f,_0x46201d=_0x51db0c[_0xdf9a4f(0x8e0)];for(const _0x359299 of dependencies){if(!Imported[_0x359299]){alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'[_0xdf9a4f(0x8ca)](_0x46201d,_0x359299)),SceneManager[_0xdf9a4f(0x42d)]();break;}}const _0xbebdca=_0x51db0c[_0xdf9a4f(0x790)];if(_0xbebdca[_0xdf9a4f(0x5cb)](/\[Version[ ](.*?)\]/i)){const _0x37d84d=Number(RegExp['$1']);_0x37d84d!==VisuMZ[label][_0xdf9a4f(0x523)]&&(alert(_0xdf9a4f(0x10e)[_0xdf9a4f(0x8ca)](_0x46201d,_0x37d84d)),SceneManager[_0xdf9a4f(0x42d)]());}if(_0xbebdca[_0xdf9a4f(0x5cb)](/\[Tier[ ](\d+)\]/i)){if(_0xdf9a4f(0x50e)!==_0xdf9a4f(0x50e))return _0x340948[_0xdf9a4f(0x7b3)][_0xdf9a4f(0x1ac)][_0xdf9a4f(0x320)][_0xdf9a4f(0x6d1)];else{const _0x2d7aa2=Number(RegExp['$1']);_0x2d7aa2<tier?(alert(_0xdf9a4f(0x87e)[_0xdf9a4f(0x8ca)](_0x46201d,_0x2d7aa2,tier)),SceneManager[_0xdf9a4f(0x42d)]()):tier=Math[_0xdf9a4f(0x886)](_0x2d7aa2,tier);}}VisuMZ[_0xdf9a4f(0x447)](VisuMZ[label][_0xdf9a4f(0x1ac)],_0x51db0c[_0xdf9a4f(0x1e4)]);})(pluginData),PluginManager[_0x39290f(0x173)](pluginData[_0x39290f(0x8e0)],_0x39290f(0x5e5),_0xb6bf93=>{const _0x10900a=_0x39290f;if(!SceneManager['_scene'])return;if(!SceneManager[_0x10900a(0x4eb)][_0x10900a(0x4bb)])return;VisuMZ[_0x10900a(0x447)](_0xb6bf93,_0xb6bf93);const _0x5658dd=Math[_0x10900a(0x401)](_0xb6bf93[_0x10900a(0x78f)]),_0x5ae3ae=Math['round'](_0xb6bf93[_0x10900a(0x2a3)]);$gameTemp[_0x10900a(0x172)](_0x5658dd,_0x5ae3ae,_0xb6bf93[_0x10900a(0x4a8)],_0xb6bf93[_0x10900a(0x612)],_0xb6bf93[_0x10900a(0x6f5)]);}),PluginManager['registerCommand'](pluginData['name'],_0x39290f(0x564),_0x4b8a09=>{const _0x438ca4=_0x39290f;if(!$gameTemp['isPlaytest']())return;if(!Utils[_0x438ca4(0x1c1)]())return;SceneManager[_0x438ca4(0x4eb)]['_active']=![],VisuMZ[_0x438ca4(0x7b3)]['ExportStrFromAllMaps']();}),PluginManager[_0x39290f(0x173)](pluginData[_0x39290f(0x8e0)],_0x39290f(0x26b),_0x16be65=>{const _0x49afb5=_0x39290f;if(!$gameTemp[_0x49afb5(0x499)]())return;if(!Utils['isNwjs']())return;SceneManager['_scene'][_0x49afb5(0x6de)]=![],VisuMZ['CoreEngine'][_0x49afb5(0x16b)]();}),PluginManager[_0x39290f(0x173)](pluginData[_0x39290f(0x8e0)],_0x39290f(0x6a4),_0x51aa34=>{const _0x189b9d=_0x39290f;if(!$gameTemp[_0x189b9d(0x499)]())return;if(!Utils[_0x189b9d(0x1c1)]())return;if(!$gameMap)return;if($gameMap[_0x189b9d(0x65d)]()<=0x0)return;VisuMZ[_0x189b9d(0x447)](_0x51aa34,_0x51aa34);const _0x27515b=_0x189b9d(0x52e)['format']($gameMap['mapId']()[_0x189b9d(0x50b)](0x3)),_0xab23a8=VisuMZ[_0x189b9d(0x7b3)][_0x189b9d(0x7c1)]($gameMap['mapId']());VisuMZ[_0x189b9d(0x7b3)]['ExportString'](_0xab23a8,_0x27515b,!![]);}),PluginManager[_0x39290f(0x173)](pluginData[_0x39290f(0x8e0)],_0x39290f(0x66a),_0x136438=>{const _0xb3eb7a=_0x39290f;if(!$gameTemp[_0xb3eb7a(0x499)]())return;if(!Utils[_0xb3eb7a(0x1c1)]())return;if(!$gameParty[_0xb3eb7a(0x565)]())return;VisuMZ['ConvertParams'](_0x136438,_0x136438);const _0x5af400=_0xb3eb7a(0x25c)['format']($gameTroop[_0xb3eb7a(0x668)][_0xb3eb7a(0x50b)](0x4)),_0x4e2ac2=VisuMZ[_0xb3eb7a(0x7b3)][_0xb3eb7a(0x453)]($gameTroop[_0xb3eb7a(0x668)]);VisuMZ['CoreEngine']['ExportString'](_0x4e2ac2,_0x5af400,!![]);}),VisuMZ[_0x39290f(0x7b3)][_0x39290f(0x44e)]=function(_0x57cde7,_0x494d66,_0x4874fc){const _0x5a59cf=_0x39290f,_0x1e07ba=require('fs');let _0x40bc1c=_0x5a59cf(0x4a6)['format'](_0x494d66||'0');_0x1e07ba['writeFile'](_0x40bc1c,_0x57cde7,_0x491475=>{const _0x5a2869=_0x5a59cf;if(_0x5a2869(0x804)===_0x5a2869(0x502)){var _0x357b29=_0x24651f(_0x250d02['$1']);try{_0x596425+=_0x5a5894(_0x357b29);}catch(_0x3c39b1){if(_0x384888[_0x5a2869(0x499)]())_0x4eafa8[_0x5a2869(0x24b)](_0x3c39b1);}}else{if(_0x491475){if(_0x5a2869(0x33b)===_0x5a2869(0x873))_0x8ab7d2[_0x5a2869(0x7b3)][_0x5a2869(0x554)][_0x5a2869(0x592)](this),_0x3b5baf['isSideButtonLayout']()&&this[_0x5a2869(0x186)]();else throw err;}else _0x4874fc&&alert(_0x5a2869(0x4bf)[_0x5a2869(0x8ca)](_0x40bc1c));}});},VisuMZ['CoreEngine'][_0x39290f(0x7ca)]=function(){const _0x162897=_0x39290f,_0x172099=[];for(const _0x5d38ab of $dataMapInfos){if(_0x162897(0x44d)!==_0x162897(0x3d6)){if(!_0x5d38ab)continue;_0x172099[_0x162897(0x6a2)](_0x5d38ab['id']);}else{const _0x5b8494=_0x29e6a0(_0x5a0dc3['$1']);if(_0x5b8494[_0x162897(0x5cb)](/(?:FRONTVIEW|FRONT VIEW|FV)/i))this[_0x162897(0x4f3)]='FV';else _0x5b8494['match'](/(?:SIDEVIEW|SIDE VIEW|SV)/i)&&(this['_forcedTroopView']='SV');}}const _0x1f999b=_0x172099[_0x162897(0x59c)]*0x64+Math[_0x162897(0x548)](0x64);alert(_0x162897(0x1a5)[_0x162897(0x8ca)](_0x1f999b)),this[_0x162897(0x222)]=[],this[_0x162897(0x88a)]=$dataMap;for(const _0x22a3fe of _0x172099){VisuMZ[_0x162897(0x7b3)][_0x162897(0x8c0)](_0x22a3fe);}setTimeout(VisuMZ[_0x162897(0x7b3)][_0x162897(0x1c3)]['bind'](this),_0x1f999b);},VisuMZ[_0x39290f(0x7b3)][_0x39290f(0x8c0)]=function(_0x164c49){const _0x35979c=_0x39290f,_0x4db48f=_0x35979c(0x745)[_0x35979c(0x8ca)](_0x164c49[_0x35979c(0x50b)](0x3)),_0x1671a4=new XMLHttpRequest(),_0xeb5248=_0x35979c(0x5ae)+_0x4db48f;_0x1671a4[_0x35979c(0x19c)]('GET',_0xeb5248),_0x1671a4['overrideMimeType']('application/json'),_0x1671a4[_0x35979c(0x555)]=()=>this[_0x35979c(0x3f1)](_0x1671a4,_0x164c49,_0x4db48f,_0xeb5248),_0x1671a4[_0x35979c(0x773)]=()=>DataManager[_0x35979c(0x26d)](_0x35979c(0x534),_0x4db48f,_0xeb5248),_0x1671a4[_0x35979c(0x694)]();},VisuMZ['CoreEngine'][_0x39290f(0x3f1)]=function(_0x191b5a,_0x19155f,_0x3130d9,_0x3ffa30){const _0x242787=_0x39290f;$dataMap=JSON['parse'](_0x191b5a[_0x242787(0x3c4)]),DataManager[_0x242787(0x4bc)]($dataMap),this[_0x242787(0x222)][_0x19155f]=VisuMZ[_0x242787(0x7b3)][_0x242787(0x7c1)](_0x19155f),$dataMap=this[_0x242787(0x88a)];},VisuMZ[_0x39290f(0x7b3)]['exportAllMapStrings']=function(){const _0x233eab=_0x39290f,_0x3970b0='AllMaps';this[_0x233eab(0x222)]['remove'](undefined)[_0x233eab(0x882)]('')[_0x233eab(0x882)](null);const _0x415e98=this[_0x233eab(0x222)][_0x233eab(0x7a2)](_0x233eab(0x478))[_0x233eab(0x4fb)]();VisuMZ[_0x233eab(0x7b3)][_0x233eab(0x44e)](_0x415e98,_0x3970b0,!![]),SceneManager[_0x233eab(0x4eb)][_0x233eab(0x6de)]=!![];},VisuMZ[_0x39290f(0x7b3)][_0x39290f(0x7c1)]=function(_0x8e86c0){const _0x5bc2d8=_0x39290f;if(!$dataMap)return'';let _0x212f7b='█'['repeat'](0x46)+'\x0a\x0a',_0x13d35f='═'[_0x5bc2d8(0x1ce)](0x46)+'\x0a\x0a',_0x3e8737='';this['_commonEventLayers']=0x0;for(const _0x4ee7da of $dataMap['events']){if(_0x5bc2d8(0x528)===_0x5bc2d8(0x528)){if(!_0x4ee7da)continue;let _0x29c63d=_0x4ee7da['id'],_0x42a578=_0x4ee7da['name'],_0x2302ba=_0x4ee7da[_0x5bc2d8(0x74b)];for(const _0x1770ac of _0x2302ba){const _0x5cbe5d=_0x2302ba['indexOf'](_0x1770ac)+0x1;let _0x5a8646=_0x13d35f+_0x5bc2d8(0x524),_0x1bd126=VisuMZ['CoreEngine'][_0x5bc2d8(0x5bc)](_0x1770ac[_0x5bc2d8(0x4f8)]);if(_0x1bd126[_0x5bc2d8(0x59c)]>0x0){if(_0x3e8737[_0x5bc2d8(0x59c)]>0x0)_0x3e8737+=_0x13d35f+_0x5bc2d8(0x478);else{const _0x251a2a=$dataMapInfos[_0x8e86c0][_0x5bc2d8(0x8e0)];_0x3e8737+=_0x212f7b+_0x5bc2d8(0x838)['format'](_0x8e86c0,_0x251a2a||_0x5bc2d8(0x457))+_0x212f7b;}_0x3e8737+=_0x5a8646[_0x5bc2d8(0x8ca)](_0x29c63d,_0x42a578,_0x5cbe5d,_0x1bd126);}}}else this[_0x5bc2d8(0x1a1)]['x']=_0x24c3cc['anchor']()['x'],this[_0x5bc2d8(0x1a1)]['y']=_0x5c479a[_0x5bc2d8(0x1a1)]()['y'];}return _0x3e8737[_0x5bc2d8(0x59c)]>0x0&&(_0x3e8737+=_0x13d35f),_0x3e8737;},VisuMZ['CoreEngine'][_0x39290f(0x16b)]=function(){const _0x1230d8=_0x39290f,_0x201c4e=$dataTroops[_0x1230d8(0x59c)]*0xa+Math[_0x1230d8(0x548)](0xa);alert(_0x1230d8(0x293)[_0x1230d8(0x8ca)](_0x201c4e));const _0x13f906=[];for(const _0xc91d3c of $dataTroops){if(_0x1230d8(0x2f3)===_0x1230d8(0x2f3)){if(!_0xc91d3c)continue;const _0x5e04ce=_0xc91d3c['id'];_0x13f906[_0x5e04ce]=VisuMZ[_0x1230d8(0x7b3)][_0x1230d8(0x453)](_0x5e04ce);}else this[_0x1230d8(0x6bd)]=_0x43a2a6;}setTimeout(VisuMZ[_0x1230d8(0x7b3)][_0x1230d8(0x130)]['bind'](this,_0x13f906),_0x201c4e);},VisuMZ[_0x39290f(0x7b3)]['ExtractStrFromTroop']=function(_0x2686b6){const _0x333ee4=_0x39290f;if(!$dataTroops[_0x2686b6])return'';let _0x2d1c46='█'[_0x333ee4(0x1ce)](0x46)+'\x0a\x0a',_0x632ab7='═'[_0x333ee4(0x1ce)](0x46)+'\x0a\x0a',_0x5227f1='';this[_0x333ee4(0x471)]=0x0;const _0x170082=$dataTroops[_0x2686b6];let _0x5c2540=_0x170082[_0x333ee4(0x74b)];for(const _0x5e1ac6 of _0x5c2540){if(_0x333ee4(0x5f6)===_0x333ee4(0x261))return!![];else{const _0x9eda97=_0x5c2540[_0x333ee4(0x161)](_0x5e1ac6)+0x1;let _0x51a06b=_0x632ab7+_0x333ee4(0x15a),_0x1d47c8=VisuMZ['CoreEngine']['ExtractStrFromList'](_0x5e1ac6[_0x333ee4(0x4f8)]);if(_0x1d47c8[_0x333ee4(0x59c)]>0x0){if(_0x333ee4(0x2ed)===_0x333ee4(0x77c))this[_0x333ee4(0x6ff)](_0x46972b);else{if(_0x5227f1[_0x333ee4(0x59c)]>0x0){if('fvblw'!==_0x333ee4(0x6ee))_0x5227f1+=_0x632ab7+_0x333ee4(0x478);else return _0x161f23[_0x333ee4(0x302)][_0x333ee4(0x104)]['call'](this);}else _0x5227f1+=_0x2d1c46+_0x333ee4(0x737)[_0x333ee4(0x8ca)](_0x2686b6,_0x170082[_0x333ee4(0x8e0)]||_0x333ee4(0x457))+_0x2d1c46;_0x5227f1+=_0x51a06b[_0x333ee4(0x8ca)](_0x9eda97,_0x1d47c8);}}}}return _0x5227f1[_0x333ee4(0x59c)]>0x0&&(_0x5227f1+=_0x632ab7),_0x5227f1;},VisuMZ[_0x39290f(0x7b3)][_0x39290f(0x130)]=function(_0x26a60c){const _0x4f111b=_0x39290f,_0x2a1abd=_0x4f111b(0x5c1);_0x26a60c[_0x4f111b(0x882)](undefined)[_0x4f111b(0x882)]('')[_0x4f111b(0x882)](null);const _0x4d703b=_0x26a60c[_0x4f111b(0x7a2)](_0x4f111b(0x478))[_0x4f111b(0x4fb)]();VisuMZ[_0x4f111b(0x7b3)][_0x4f111b(0x44e)](_0x4d703b,_0x2a1abd,!![]),SceneManager[_0x4f111b(0x4eb)][_0x4f111b(0x6de)]=!![];},VisuMZ[_0x39290f(0x7b3)][_0x39290f(0x5bc)]=function(_0x3be484){const _0x198f66=_0x39290f;let _0x50de3b='\x0a'+'─'['repeat'](0x46)+'\x0a',_0x59e72b='\x0a'+'┄'[_0x198f66(0x1ce)](0x46)+'\x0a',_0xc1f410='';for(const _0x2ba207 of _0x3be484){if(!_0x2ba207)continue;if(_0x2ba207[_0x198f66(0x323)]===0x65){if(_0x198f66(0x89b)!=='tMdeb')_0xc1f410+=_0x50de3b+'\x0a',_0xc1f410+=_0x198f66(0x734),_0x2ba207['parameters'][0x4]!==''&&_0x2ba207[_0x198f66(0x1e4)][0x4]!==undefined&&(_0xc1f410+='【%1】\x0a'[_0x198f66(0x8ca)](_0x2ba207[_0x198f66(0x1e4)][0x4]));else{_0x2189ee-=_0x570e68;if(_0x56aa01<=0x0)_0x4e0ea6=0x0;this[_0x198f66(0x4ef)](_0x9e0284);}}else{if(_0x2ba207[_0x198f66(0x323)]===0x191)_0x198f66(0x5f9)===_0x198f66(0x5f9)?_0xc1f410+=_0x198f66(0x391)[_0x198f66(0x8ca)](_0x2ba207[_0x198f66(0x1e4)][0x0]):(this['scale']['x']!==0x0&&(this[_0x198f66(0x39b)][_0x198f66(0x137)]['x']=0x1/this[_0x198f66(0x137)]['x'],this[_0x198f66(0x39b)]['x']=-(this['x']/this['scale']['x'])),this[_0x198f66(0x137)]['y']!==0x0&&(this[_0x198f66(0x39b)]['scale']['y']=0x1/this[_0x198f66(0x137)]['y'],this['_pictureContainer']['y']=-(this['y']/this[_0x198f66(0x137)]['y'])));else{if(_0x2ba207[_0x198f66(0x323)]===0x192)'nXbEI'!==_0x198f66(0x40e)?this[_0x198f66(0x73a)]():(_0xc1f410+=_0x50de3b,_0xc1f410+=_0x198f66(0x753)[_0x198f66(0x8ca)](_0x59e72b,_0x2ba207[_0x198f66(0x1e4)][0x0]+0x1,_0x2ba207[_0x198f66(0x1e4)][0x1]));else{if(_0x2ba207['code']===0x193){if(_0x198f66(0x1ae)!=='rozZZ')_0xc1f410+=_0x50de3b,_0xc1f410+='%1〘Choice\x20Cancel〙%1'[_0x198f66(0x8ca)](_0x59e72b);else return this[_0x198f66(0x371)]['shift']();}else{if(_0x2ba207[_0x198f66(0x323)]===0x194)_0xc1f410+=_0x50de3b,_0xc1f410+='%1〘End\x20Choice\x20Selection〙%1'[_0x198f66(0x8ca)](_0x59e72b);else{if(_0x2ba207[_0x198f66(0x323)]===0x69)_0xc1f410+=_0x50de3b+'\x0a',_0xc1f410+='〘Scrolling\x20Text〙\x0a';else{if(_0x2ba207[_0x198f66(0x323)]===0x6c)_0xc1f410+=_0x50de3b+'\x0a',_0xc1f410+=_0x198f66(0x7fd)[_0x198f66(0x8ca)](_0x2ba207[_0x198f66(0x1e4)][0x0]);else{if(_0x2ba207['code']===0x198)_0xc1f410+='%1\x0a'[_0x198f66(0x8ca)](_0x2ba207[_0x198f66(0x1e4)][0x0]);else{if(_0x2ba207['code']===0x75){if(_0x198f66(0x136)==='mKkHG'){const _0x465cae=$dataCommonEvents[_0x2ba207[_0x198f66(0x1e4)][0x0]];if(_0x465cae&&this[_0x198f66(0x471)]<=0xa){this[_0x198f66(0x471)]++;let _0x2f6952=VisuMZ[_0x198f66(0x7b3)][_0x198f66(0x5bc)](_0x465cae['list']);_0x2f6952[_0x198f66(0x59c)]>0x0&&(_0x198f66(0x2c9)===_0x198f66(0x2c9)?(_0xc1f410+=_0x50de3b,_0xc1f410+=_0x59e72b,_0xc1f410+=_0x198f66(0x498)['format'](_0x465cae['id'],_0x465cae[_0x198f66(0x8e0)]),_0xc1f410+=_0x59e72b,_0xc1f410+=_0x2f6952,_0xc1f410+=_0x59e72b,_0xc1f410+=_0x198f66(0x8bd)[_0x198f66(0x8ca)](_0x465cae['id'],_0x465cae[_0x198f66(0x8e0)]),_0xc1f410+=_0x59e72b):this['_helpWindow'][_0x198f66(0x537)](_0xcec721[_0x198f66(0x302)][_0x198f66(0x84f)])),this['_commonEventLayers']--;}}else this[_0x198f66(0x343)]=_0x37f4c0;}}}}}}}}}}return _0xc1f410[_0x198f66(0x59c)]>0x0&&(_0xc1f410+=_0x50de3b),_0xc1f410;},PluginManager[_0x39290f(0x173)](pluginData['name'],_0x39290f(0x387),_0xe6a13b=>{const _0x3a4cbe=_0x39290f;VisuMZ['ConvertParams'](_0xe6a13b,_0xe6a13b);const _0x3f29cf=_0xe6a13b[_0x3a4cbe(0x5b5)];VisuMZ[_0x3a4cbe(0x6b7)](_0x3f29cf);}),PluginManager[_0x39290f(0x173)](pluginData['name'],_0x39290f(0x386),_0x3fba9e=>{const _0x46c54e=_0x39290f;VisuMZ[_0x46c54e(0x447)](_0x3fba9e,_0x3fba9e);const _0x2b1f7a=_0x3fba9e[_0x46c54e(0x327)]||0x0;$gameParty[_0x46c54e(0x724)](_0x2b1f7a);}),PluginManager[_0x39290f(0x173)](pluginData[_0x39290f(0x8e0)],_0x39290f(0x428),_0x3e853e=>{const _0x112f20=_0x39290f;if(!$gameTemp[_0x112f20(0x499)]())return;if(!Utils['isNwjs']())return;VisuMZ[_0x112f20(0x447)](_0x3e853e,_0x3e853e);const _0x8d02dd=_0x3e853e[_0x112f20(0x856)]||0x1;$gameTemp[_0x112f20(0x8ec)]=_0x8d02dd;}),PluginManager[_0x39290f(0x173)](pluginData[_0x39290f(0x8e0)],_0x39290f(0x8dd),_0x39a6f3=>{const _0x418cc0=_0x39290f;VisuMZ['ConvertParams'](_0x39a6f3,_0x39a6f3);const _0x4f1efc=_0x39a6f3['pictureId']||0x1,_0x3b2b6a=_0x39a6f3[_0x418cc0(0x2af)]||_0x418cc0(0x2b8),_0x2b4157=$gameScreen['picture'](_0x4f1efc);_0x2b4157&&_0x2b4157[_0x418cc0(0x17d)](_0x3b2b6a);}),PluginManager[_0x39290f(0x173)](pluginData[_0x39290f(0x8e0)],_0x39290f(0x283),_0x590e82=>{for(let _0x2fff2f=0x1;_0x2fff2f<=0x64;_0x2fff2f++){$gameScreen['erasePicture'](_0x2fff2f);}}),PluginManager[_0x39290f(0x173)](pluginData[_0x39290f(0x8e0)],'PictureEraseRange',_0x3cadf5=>{const _0x538441=_0x39290f;VisuMZ['ConvertParams'](_0x3cadf5,_0x3cadf5);const _0x4319d6=Math[_0x538441(0x201)](_0x3cadf5[_0x538441(0x61f)],_0x3cadf5[_0x538441(0x54c)]),_0x42ac1f=Math[_0x538441(0x886)](_0x3cadf5[_0x538441(0x61f)],_0x3cadf5[_0x538441(0x54c)]);for(let _0x2d70ad=_0x4319d6;_0x2d70ad<=_0x42ac1f;_0x2d70ad++){$gameScreen[_0x538441(0x60e)](_0x2d70ad);}}),PluginManager['registerCommand'](pluginData[_0x39290f(0x8e0)],_0x39290f(0x888),_0x170216=>{const _0x5b2611=_0x39290f;VisuMZ[_0x5b2611(0x447)](_0x170216,_0x170216);const _0x4563a2=Math[_0x5b2611(0x401)](_0x170216[_0x5b2611(0x856)])[_0x5b2611(0x2a6)](0x1,0x64),_0x325271=_0x170216[_0x5b2611(0x1ac)],_0x2efc2b=_0x325271[_0x5b2611(0x6a0)][_0x5b2611(0x2a6)](0x0,0x1),_0x3eb83b=Math[_0x5b2611(0x401)](_0x325271[_0x5b2611(0x30b)]||0x0),_0x496bce=Math[_0x5b2611(0x401)](_0x325271[_0x5b2611(0x568)]||0x0),_0x10f91a=Math[_0x5b2611(0x401)](_0x325271[_0x5b2611(0x29f)]||0x0),_0x167a35=Math[_0x5b2611(0x401)](_0x325271['ScaleY']||0x0),_0x38356d=Math['round'](_0x325271[_0x5b2611(0x3d2)])[_0x5b2611(0x2a6)](0x0,0xff),_0x443381=_0x325271[_0x5b2611(0x5af)],_0x58eddf=_0x5b2611(0x2fa),_0xbdf859=_0x170216[_0x5b2611(0x6a5)]?_0x5b2611(0x6a5):_0x5b2611(0x378),_0x406afa=_0x58eddf['format'](_0x170216[_0x5b2611(0x57c)],_0xbdf859);$gameScreen[_0x5b2611(0x7cf)](_0x4563a2,_0x406afa,_0x2efc2b,_0x3eb83b,_0x496bce,_0x10f91a,_0x167a35,_0x38356d,_0x443381);}),PluginManager[_0x39290f(0x173)](pluginData[_0x39290f(0x8e0)],'ScreenShake',_0x50ed31=>{const _0x442bee=_0x39290f;VisuMZ[_0x442bee(0x447)](_0x50ed31,_0x50ed31);const _0x1cdd28=_0x50ed31[_0x442bee(0x2ca)]||_0x442bee(0x687),_0x39979d=_0x50ed31[_0x442bee(0x8b2)][_0x442bee(0x2a6)](0x1,0x9),_0x239f34=_0x50ed31[_0x442bee(0x55c)]['clamp'](0x1,0x9),_0x3023e2=_0x50ed31[_0x442bee(0x458)]||0x1,_0x530c11=_0x50ed31[_0x442bee(0x7a4)];$gameScreen[_0x442bee(0x600)](_0x1cdd28),$gameScreen['startShake'](_0x39979d,_0x239f34,_0x3023e2);if(_0x530c11){if(_0x442bee(0x348)===_0x442bee(0x348)){const _0x353cba=$gameTemp[_0x442bee(0x79f)]();if(_0x353cba)_0x353cba[_0x442bee(0x87b)](_0x3023e2);}else _0x4d94ab[_0x442bee(0x7b3)][_0x442bee(0x5a0)][_0x442bee(0x592)](this),_0x465bf3[_0x442bee(0x664)]&&!_0x398038[_0x442bee(0x817)]()&&(this[_0x442bee(0x3c3)](),_0x52919e[_0x442bee(0x4cb)]());}}),PluginManager[_0x39290f(0x173)](pluginData[_0x39290f(0x8e0)],_0x39290f(0x72d),_0x16f137=>{const _0x38391f=_0x39290f;VisuMZ[_0x38391f(0x447)](_0x16f137,_0x16f137);const _0xb283d0=_0x16f137[_0x38391f(0x7f3)]||0x1;$gameSystem[_0x38391f(0x828)](_0xb283d0);}),PluginManager[_0x39290f(0x173)](pluginData[_0x39290f(0x8e0)],_0x39290f(0x70f),_0x19e445=>{const _0x699133=_0x39290f;if($gameParty[_0x699133(0x565)]())return;VisuMZ[_0x699133(0x447)](_0x19e445,_0x19e445);const _0xc1af5d=_0x19e445[_0x699133(0x7f3)];if(_0xc1af5d[_0x699133(0x5cb)](/Front/i))_0x699133(0x288)!==_0x699133(0x4e7)?$gameSystem[_0x699133(0x79a)](![]):this[_0x699133(0x88c)][_0x699133(0x537)](_0x478f05[_0x699133(0x302)][_0x699133(0x8d8)]);else{if(_0xc1af5d[_0x699133(0x5cb)](/Side/i))$gameSystem[_0x699133(0x79a)](!![]);else{if(_0x699133(0x73e)===_0x699133(0x44c)){if(this[_0x699133(0x25e)]===_0x289087)this['initCoreEngine']();if(this[_0x699133(0x25e)][_0x699133(0x706)]===_0x485b60)this[_0x699133(0x2ef)]();return this[_0x699133(0x25e)][_0x699133(0x706)];}else $gameSystem[_0x699133(0x79a)](!$gameSystem[_0x699133(0x876)]());}}}),PluginManager[_0x39290f(0x173)](pluginData[_0x39290f(0x8e0)],'SystemLoadAudio',_0x456e9a=>{const _0x15b753=_0x39290f;if($gameParty[_0x15b753(0x565)]())return;VisuMZ[_0x15b753(0x447)](_0x456e9a,_0x456e9a);const _0x2da9f2=['bgm',_0x15b753(0x12c),'me','se'];for(const _0x3cd0ec of _0x2da9f2){const _0x2441b4=_0x456e9a[_0x3cd0ec],_0x55393f=_0x15b753(0x42b)[_0x15b753(0x8ca)](_0x3cd0ec);for(const _0x4a6adf of _0x2441b4){AudioManager[_0x15b753(0x618)](_0x55393f,_0x4a6adf);}}}),PluginManager[_0x39290f(0x173)](pluginData[_0x39290f(0x8e0)],_0x39290f(0x214),_0x18a9a8=>{const _0x44b573=_0x39290f;if($gameParty[_0x44b573(0x565)]())return;VisuMZ[_0x44b573(0x447)](_0x18a9a8,_0x18a9a8);const _0x1ce9a7=[_0x44b573(0x147),'battlebacks1',_0x44b573(0x3f5),'characters','enemies',_0x44b573(0x6d6),_0x44b573(0x879),'pictures',_0x44b573(0x13d),_0x44b573(0x4c1),_0x44b573(0x251),_0x44b573(0x4b2),_0x44b573(0x67c),_0x44b573(0x158)];for(const _0x3cd7a2 of _0x1ce9a7){if('SBvFj'!==_0x44b573(0x68f))_0x277b2a[_0x44b573(0x499)]()&&(_0x57dd5f[_0x44b573(0x24b)]('Show\x20Scrolling\x20Text\x20Script\x20Error'),_0x3c6f09[_0x44b573(0x24b)](_0x161f9c));else{const _0x44e101=_0x18a9a8[_0x3cd7a2],_0x35e023=_0x44b573(0x766)[_0x44b573(0x8ca)](_0x3cd7a2);for(const _0x17918a of _0x44e101){_0x44b573(0x60b)===_0x44b573(0x68b)?_0x10db09+=_0x44b573(0x6f8):ImageManager[_0x44b573(0x5ca)](_0x35e023,_0x17918a);}}}}),PluginManager[_0x39290f(0x173)](pluginData[_0x39290f(0x8e0)],_0x39290f(0x788),_0x1e5a45=>{const _0x28fea3=_0x39290f;if($gameParty[_0x28fea3(0x565)]())return;VisuMZ['ConvertParams'](_0x1e5a45,_0x1e5a45);const _0x3ff245=_0x1e5a45[_0x28fea3(0x70a)],_0xe257de=(_0x1e5a45['Chance']||0x0)/0x64;for(const _0x559544 of _0x3ff245){if(_0x28fea3(0x1ed)===_0x28fea3(0x25a))(_0x5f5a63<_0x18d6e6-_0x7f498d||_0x250d07&&_0x23ece9===0x1)&&this[_0x28fea3(0x4ef)]((_0x28ec10+_0x3ddf9d)%_0x98e52c);else{const _0xa0c116=Math[_0x28fea3(0x687)]()<=_0xe257de;$gameSwitches[_0x28fea3(0x77f)](_0x559544,_0xa0c116);}}}),PluginManager[_0x39290f(0x173)](pluginData[_0x39290f(0x8e0)],_0x39290f(0x13a),_0x287ccd=>{const _0xe1586b=_0x39290f;if($gameParty['inBattle']())return;VisuMZ[_0xe1586b(0x447)](_0x287ccd,_0x287ccd);const _0x36d0e4=Math[_0xe1586b(0x201)](_0x287ccd[_0xe1586b(0x61f)],_0x287ccd[_0xe1586b(0x54c)]),_0x3a4b0c=Math[_0xe1586b(0x886)](_0x287ccd['StartID'],_0x287ccd[_0xe1586b(0x54c)]),_0x978b8b=(_0x287ccd[_0xe1586b(0x8cc)]||0x0)/0x64;for(let _0x50b8b0=_0x36d0e4;_0x50b8b0<=_0x3a4b0c;_0x50b8b0++){const _0xb93d60=Math['random']()<=_0x978b8b;$gameSwitches[_0xe1586b(0x77f)](_0x50b8b0,_0xb93d60);}}),PluginManager[_0x39290f(0x173)](pluginData[_0x39290f(0x8e0)],_0x39290f(0x85c),_0x26b27d=>{const _0x5ba097=_0x39290f;if($gameParty['inBattle']())return;VisuMZ[_0x5ba097(0x447)](_0x26b27d,_0x26b27d);const _0x863e4a=_0x26b27d[_0x5ba097(0x70a)];for(const _0x258080 of _0x863e4a){const _0x1b85d3=$gameSwitches[_0x5ba097(0x327)](_0x258080);$gameSwitches[_0x5ba097(0x77f)](_0x258080,!_0x1b85d3);}}),PluginManager[_0x39290f(0x173)](pluginData['name'],'SwitchToggleRange',_0x8363ba=>{const _0x1debe9=_0x39290f;if($gameParty['inBattle']())return;VisuMZ[_0x1debe9(0x447)](_0x8363ba,_0x8363ba);const _0x48ccce=Math[_0x1debe9(0x201)](_0x8363ba[_0x1debe9(0x61f)],_0x8363ba[_0x1debe9(0x54c)]),_0x329f3a=Math[_0x1debe9(0x886)](_0x8363ba[_0x1debe9(0x61f)],_0x8363ba[_0x1debe9(0x54c)]);for(let _0x3c854b=_0x48ccce;_0x3c854b<=_0x329f3a;_0x3c854b++){const _0x2c1065=$gameSwitches[_0x1debe9(0x327)](_0x3c854b);$gameSwitches[_0x1debe9(0x77f)](_0x3c854b,!_0x2c1065);}}),PluginManager[_0x39290f(0x173)](pluginData[_0x39290f(0x8e0)],_0x39290f(0x6ab),_0x4aa01c=>{const _0xd0cf13=_0x39290f;if($gameParty[_0xd0cf13(0x565)]())return;VisuMZ[_0xd0cf13(0x447)](_0x4aa01c,_0x4aa01c);const _0x8106f9=_0x4aa01c[_0xd0cf13(0x7f3)][_0xd0cf13(0x6ce)]()[_0xd0cf13(0x4fb)](),_0x284cdb=VisuMZ[_0xd0cf13(0x7b3)][_0xd0cf13(0x801)](_0x8106f9);$gameSystem[_0xd0cf13(0x33d)](_0x284cdb);}),VisuMZ[_0x39290f(0x7b3)][_0x39290f(0x801)]=function(_0x58d568){const _0x49ea51=_0x39290f;_0x58d568=_0x58d568||_0x49ea51(0x633),_0x58d568=String(_0x58d568)[_0x49ea51(0x6ce)]()[_0x49ea51(0x4fb)]();switch(_0x58d568){case'DTB':return 0x0;case _0x49ea51(0x5b2):Imported[_0x49ea51(0x4f6)]&&(ConfigManager[_0x49ea51(0x12d)]=!![]);return 0x1;case _0x49ea51(0x798):Imported['VisuMZ_1_OptionsCore']&&(ConfigManager[_0x49ea51(0x12d)]=![]);return 0x2;case _0x49ea51(0x6dd):if(Imported[_0x49ea51(0x5c4)]){if(_0x49ea51(0x6e3)===_0x49ea51(0x6e3))return'CTB';else for(const _0x510460 of _0x13d5b3['_commandList']){if(_0x510460[_0x49ea51(0x642)][_0x49ea51(0x592)](this)){const _0x133bdf=_0x510460[_0x49ea51(0x1b2)];let _0x371962=_0x510460[_0x49ea51(0x258)];if(['',_0x49ea51(0x54b)][_0x49ea51(0x6d3)](_0x371962))_0x371962=_0x510460[_0x49ea51(0x277)][_0x49ea51(0x592)](this);const _0x336c2e=_0x510460[_0x49ea51(0x690)][_0x49ea51(0x592)](this),_0x246250=_0x510460[_0x49ea51(0x4ba)]['call'](this);this[_0x49ea51(0x21b)](_0x371962,_0x133bdf,_0x336c2e,_0x246250),this[_0x49ea51(0x2fd)](_0x133bdf,_0x510460[_0x49ea51(0x4d1)]['bind'](this,_0x246250));}}}break;case'STB':if(Imported[_0x49ea51(0x245)]){if('radOs'!==_0x49ea51(0x787))return _0x49ea51(0x2a0);else{if(!this[_0x49ea51(0x610)])return _0x1819ca;return _0x4ecaf0[_0x49ea51(0x426)](_0xc771f8,this[_0x49ea51(0x610)][_0x49ea51(0x6e5)]||'LINEAR');}}break;case _0x49ea51(0x429):if(Imported['VisuMZ_2_BattleSystemBTB'])return'BTB';break;case _0x49ea51(0x741):if(Imported['VisuMZ_2_BattleSystemFTB']){if(_0x49ea51(0x2a9)==='rixws')_0x3d2e79['ShowDevTools'](!![]);else return _0x49ea51(0x741);}break;case _0x49ea51(0x51d):if(Imported[_0x49ea51(0x863)]){if(_0x49ea51(0x176)==='DyYBs')return'OTB';else{const _0x3cb45c=_0x11ef38[_0x49ea51(0x413)],_0x3fb7e5=_0x345178[_0x49ea51(0x282)]||'',_0x169044=_0x28bf42['version']||'',_0x1d36e7=_0x419dc6[_0x49ea51(0x7b3)][_0x49ea51(0x1ac)][_0x49ea51(0x79c)][_0x49ea51(0x30c)][_0x49ea51(0x142)],_0x264b59=_0x1d36e7[_0x49ea51(0x8ca)](_0x3cb45c,_0x3fb7e5,_0x169044);_0x50b567['title']=_0x264b59;}}break;case'ETB':if(Imported[_0x49ea51(0x237)])return _0x49ea51(0x30e);break;case _0x49ea51(0x7c6):if(Imported[_0x49ea51(0x227)])return _0x49ea51(0x7c6);break;}return $dataSystem[_0x49ea51(0x384)];},PluginManager['registerCommand'](pluginData['name'],_0x39290f(0x29e),_0x15c6f3=>{const _0x4054fe=_0x39290f;VisuMZ[_0x4054fe(0x447)](_0x15c6f3,_0x15c6f3);const _0x185fa8=_0x15c6f3[_0x4054fe(0x7f3)]||0x1;$gameSystem['setWindowPadding'](_0x185fa8);}),VisuMZ[_0x39290f(0x7b3)]['Scene_Boot_onDatabaseLoaded']=Scene_Boot[_0x39290f(0x24d)][_0x39290f(0x61b)],Scene_Boot[_0x39290f(0x24d)][_0x39290f(0x61b)]=function(){const _0xd49666=_0x39290f;VisuMZ[_0xd49666(0x7b3)][_0xd49666(0x5ed)][_0xd49666(0x592)](this),this[_0xd49666(0x693)](),this[_0xd49666(0x5a5)](),this[_0xd49666(0x462)](),this[_0xd49666(0x5ef)](),this['process_VisuMZ_CoreEngine_CustomParameters'](),VisuMZ[_0xd49666(0x8e7)]();},VisuMZ[_0x39290f(0x7b3)]['RegExp']={},Scene_Boot['prototype'][_0x39290f(0x693)]=function(){const _0xd55a15=_0x39290f,_0x405050=['MAXHP',_0xd55a15(0x1b0),_0xd55a15(0x535),_0xd55a15(0x891),_0xd55a15(0x28c),'MDF',_0xd55a15(0x695),'LUK'],_0x1d394f=[_0xd55a15(0x1d3),_0xd55a15(0x44a),_0xd55a15(0x37e),_0xd55a15(0x128),_0xd55a15(0x7d6),_0xd55a15(0x3e8),'CNT',_0xd55a15(0x63c),'MRG',_0xd55a15(0x22e)],_0x342ec5=[_0xd55a15(0x4d9),_0xd55a15(0x639),'REC','PHA',_0xd55a15(0x159),_0xd55a15(0x884),_0xd55a15(0x808),_0xd55a15(0x5e1),'FDR',_0xd55a15(0x809)],_0x295634=[_0x405050,_0x1d394f,_0x342ec5],_0x2a7043=[_0xd55a15(0x8d4),_0xd55a15(0x800),_0xd55a15(0x659),_0xd55a15(0x241),_0xd55a15(0x76f),_0xd55a15(0x43b),_0xd55a15(0x6e1),_0xd55a15(0x67a),_0xd55a15(0x5da),'Flat2'];for(const _0x44a055 of _0x295634){let _0x2b565e='';if(_0x44a055===_0x405050)_0x2b565e=_0xd55a15(0x5d1);if(_0x44a055===_0x1d394f)_0x2b565e=_0xd55a15(0x199);if(_0x44a055===_0x342ec5)_0x2b565e=_0xd55a15(0x8c8);for(const _0x2f67c1 of _0x2a7043){let _0x542cd8=_0xd55a15(0x422)['format'](_0x2b565e,_0x2f67c1);VisuMZ[_0xd55a15(0x7b3)][_0xd55a15(0x228)][_0x542cd8]=[],VisuMZ[_0xd55a15(0x7b3)][_0xd55a15(0x228)][_0x542cd8+'JS']=[];let _0x18ef8d=_0xd55a15(0x8d6);if([_0xd55a15(0x8d4),_0xd55a15(0x67a)][_0xd55a15(0x6d3)](_0x2f67c1))_0x18ef8d+=_0xd55a15(0x6a6);else{if([_0xd55a15(0x800),_0xd55a15(0x5da)]['includes'](_0x2f67c1))_0x18ef8d+=_0xd55a15(0x255);else{if([_0xd55a15(0x659),_0xd55a15(0x8aa)]['includes'](_0x2f67c1))_0x18ef8d+=_0xd55a15(0x2b3);else{if(_0x2f67c1===_0xd55a15(0x241))_0x18ef8d+=_0xd55a15(0x37d);else{if(_0x2f67c1==='Rate1'){if(_0xd55a15(0x4ec)===_0xd55a15(0x116)){_0x2de758[_0xd55a15(0x7b3)][_0xd55a15(0x1b3)][_0xd55a15(0x592)](this);if(this['_gamepadWait'])this[_0xd55a15(0x350)]--;}else _0x18ef8d+=_0xd55a15(0x63e);}else _0x2f67c1===_0xd55a15(0x6e1)&&(_0x18ef8d+=_0xd55a15(0x6f8));}}}}for(const _0x4b54a7 of _0x44a055){if(_0xd55a15(0x412)===_0xd55a15(0x3a6))return _0x3e562d[_0xd55a15(0x7b3)][_0xd55a15(0x341)][_0xd55a15(0x592)](this,_0x4821ab);else{let _0x5e11f3=_0x2f67c1['replace'](/[\d+]/g,'')[_0xd55a15(0x6ce)]();const _0x45d3ae=_0x18ef8d[_0xd55a15(0x8ca)](_0x4b54a7,_0x5e11f3);VisuMZ[_0xd55a15(0x7b3)][_0xd55a15(0x228)][_0x542cd8][_0xd55a15(0x6a2)](new RegExp(_0x45d3ae,'i'));const _0x5b40ac=_0xd55a15(0x590)[_0xd55a15(0x8ca)](_0x4b54a7,_0x5e11f3);VisuMZ[_0xd55a15(0x7b3)]['RegExp'][_0x542cd8+'JS'][_0xd55a15(0x6a2)](new RegExp(_0x5b40ac,'i'));}}}}},Scene_Boot[_0x39290f(0x24d)][_0x39290f(0x5a5)]=function(){const _0x1a5e7c=_0x39290f;if(VisuMZ[_0x1a5e7c(0x8e7)])return;},Scene_Boot[_0x39290f(0x24d)][_0x39290f(0x462)]=function(){const _0x3a6890=_0x39290f;VisuMZ[_0x3a6890(0x7b3)][_0x3a6890(0x1ac)][_0x3a6890(0x646)]['OpenConsole']&&VisuMZ[_0x3a6890(0x16c)](!![]);VisuMZ[_0x3a6890(0x7b3)][_0x3a6890(0x1ac)][_0x3a6890(0x646)][_0x3a6890(0x794)]&&(Input[_0x3a6890(0x839)][0x23]=_0x3a6890(0x823),Input[_0x3a6890(0x839)][0x24]=_0x3a6890(0x287));if(VisuMZ['CoreEngine'][_0x3a6890(0x1ac)][_0x3a6890(0x8bf)]){const _0x34b79c=VisuMZ['CoreEngine']['Settings'][_0x3a6890(0x8bf)];_0x34b79c[_0x3a6890(0x464)]=_0x34b79c['KeySHIFT']||_0x3a6890(0x349),_0x34b79c['KeyTAB']=_0x34b79c[_0x3a6890(0x868)]||'\x5c}❪TAB❫\x5c{';}VisuMZ[_0x3a6890(0x7b3)][_0x3a6890(0x1ac)][_0x3a6890(0x190)][_0x3a6890(0x7b6)]&&(Input[_0x3a6890(0x839)][0x57]='up',Input[_0x3a6890(0x839)][0x41]=_0x3a6890(0x7d9),Input[_0x3a6890(0x839)][0x53]='down',Input['keyMapper'][0x44]=_0x3a6890(0x183),Input['keyMapper'][0x45]=_0x3a6890(0x4dd)),VisuMZ[_0x3a6890(0x7b3)][_0x3a6890(0x1ac)][_0x3a6890(0x190)][_0x3a6890(0x17c)]&&(Input['keyMapper'][0x52]=_0x3a6890(0x11b));},Scene_Boot[_0x39290f(0x24d)][_0x39290f(0x5ef)]=function(){const _0x43b0a5=_0x39290f;this[_0x43b0a5(0x324)]();},Scene_Boot[_0x39290f(0x24d)][_0x39290f(0x324)]=function(){const _0x2265c2=_0x39290f,_0x3988d4=VisuMZ[_0x2265c2(0x7b3)][_0x2265c2(0x1ac)]['jsQuickFunc'];for(const _0x24141c of _0x3988d4){const _0x1ad311=_0x24141c[_0x2265c2(0x607)][_0x2265c2(0x41d)](/[ ]/g,''),_0x34ff16=_0x24141c[_0x2265c2(0x1fb)];VisuMZ['CoreEngine'][_0x2265c2(0x6ba)](_0x1ad311,_0x34ff16);}},VisuMZ['CoreEngine']['createJsQuickFunction']=function(_0x5181b8,_0xef78e8){const _0x3bce8d=_0x39290f;if(!!window[_0x5181b8]){if($gameTemp['isPlaytest']())console['log'](_0x3bce8d(0x562)[_0x3bce8d(0x8ca)](_0x5181b8));}const _0x4a0a17=_0x3bce8d(0x30d)[_0x3bce8d(0x8ca)](_0x5181b8,_0xef78e8);window[_0x5181b8]=new Function(_0x4a0a17);},Scene_Boot[_0x39290f(0x24d)][_0x39290f(0x5b7)]=function(){const _0x35b8f7=_0x39290f,_0x56491f=VisuMZ[_0x35b8f7(0x7b3)]['Settings']['CustomParam'];if(!_0x56491f)return;for(const _0x45fa45 of _0x56491f){if(!_0x45fa45)continue;VisuMZ['CoreEngine']['createCustomParameter'](_0x45fa45);}},VisuMZ['CoreEngine'][_0x39290f(0x893)]={},VisuMZ[_0x39290f(0x7b3)][_0x39290f(0x55d)]={},VisuMZ[_0x39290f(0x7b3)][_0x39290f(0x731)]={},VisuMZ[_0x39290f(0x7b3)]['CustomParamAbb']={},VisuMZ['CoreEngine'][_0x39290f(0x8c3)]=function(_0x1dea8f){const _0x52f1e6=_0x39290f,_0x3eae4b=_0x1dea8f[_0x52f1e6(0x6c0)],_0xdbefb0=_0x1dea8f[_0x52f1e6(0x408)],_0x573d39=_0x1dea8f['Icon'],_0x1d4332=_0x1dea8f['Type'],_0x2fbd14=new Function(_0x1dea8f[_0x52f1e6(0x707)]);VisuMZ[_0x52f1e6(0x7b3)]['CustomParamNames'][_0x3eae4b[_0x52f1e6(0x6ce)]()[_0x52f1e6(0x4fb)]()]=_0xdbefb0,VisuMZ[_0x52f1e6(0x7b3)][_0x52f1e6(0x55d)][_0x3eae4b[_0x52f1e6(0x6ce)]()[_0x52f1e6(0x4fb)]()]=_0x573d39,VisuMZ[_0x52f1e6(0x7b3)][_0x52f1e6(0x731)][_0x3eae4b[_0x52f1e6(0x6ce)]()[_0x52f1e6(0x4fb)]()]=_0x1d4332,VisuMZ[_0x52f1e6(0x7b3)][_0x52f1e6(0x1ad)][_0x3eae4b['toUpperCase']()[_0x52f1e6(0x4fb)]()]=_0x3eae4b,Object[_0x52f1e6(0x3b5)](Game_BattlerBase[_0x52f1e6(0x24d)],_0x3eae4b,{'get'(){const _0x2b9399=_0x52f1e6,_0xf865e9=_0x2fbd14[_0x2b9399(0x592)](this);return _0x1d4332===_0x2b9399(0x2d3)?Math[_0x2b9399(0x401)](_0xf865e9):_0xf865e9;}});},VisuMZ[_0x39290f(0x8e7)]=function(){const _0x463a50=_0x39290f;for(const _0x4764a9 of $dataActors){if(_0x4764a9)VisuMZ[_0x463a50(0x63f)](_0x4764a9);}for(const _0x4de6a0 of $dataClasses){if(_0x463a50(0x4f7)===_0x463a50(0x4f7)){if(_0x4de6a0)VisuMZ['ParseClassNotetags'](_0x4de6a0);}else return _0x3fdd59;}for(const _0x49639c of $dataSkills){if('kpdDF'!==_0x463a50(0x2db))return this[_0x463a50(0x825)][_0x463a50(0x59c)]>0x0;else{if(_0x49639c)VisuMZ[_0x463a50(0x146)](_0x49639c);}}for(const _0x2cb7fc of $dataItems){if(_0x2cb7fc)VisuMZ[_0x463a50(0x28b)](_0x2cb7fc);}for(const _0x23ef7c of $dataWeapons){if(_0x23ef7c)VisuMZ[_0x463a50(0x294)](_0x23ef7c);}for(const _0x22b2e4 of $dataArmors){if(_0x463a50(0x5d6)===_0x463a50(0x677))this[_0x463a50(0x875)](),this[_0x463a50(0x6fc)](),_0x672fe7[_0x463a50(0x7b3)][_0x463a50(0x8d7)][_0x463a50(0x592)](this,_0x3fece8);else{if(_0x22b2e4)VisuMZ[_0x463a50(0x66d)](_0x22b2e4);}}for(const _0x5e4cb3 of $dataEnemies){if(_0x5e4cb3)VisuMZ[_0x463a50(0x1ef)](_0x5e4cb3);}for(const _0x26bfbf of $dataStates){if(_0x26bfbf)VisuMZ['ParseStateNotetags'](_0x26bfbf);}for(const _0x35ca2d of $dataTilesets){if(_0x35ca2d)VisuMZ[_0x463a50(0x7e3)](_0x35ca2d);}},VisuMZ[_0x39290f(0x63f)]=function(_0x98578f){},VisuMZ[_0x39290f(0x3b7)]=function(_0x1e04b3){},VisuMZ[_0x39290f(0x146)]=function(_0x4e82b0){},VisuMZ[_0x39290f(0x28b)]=function(_0x1d964c){},VisuMZ[_0x39290f(0x294)]=function(_0x1cd8b5){},VisuMZ['ParseArmorNotetags']=function(_0x343d91){},VisuMZ[_0x39290f(0x1ef)]=function(_0xc36939){},VisuMZ[_0x39290f(0x3b9)]=function(_0x52b565){},VisuMZ[_0x39290f(0x7e3)]=function(_0x597e67){},VisuMZ[_0x39290f(0x7b3)][_0x39290f(0x63f)]=VisuMZ[_0x39290f(0x63f)],VisuMZ[_0x39290f(0x63f)]=function(_0x1b23ad){const _0x1cdce2=_0x39290f;VisuMZ['CoreEngine'][_0x1cdce2(0x63f)][_0x1cdce2(0x592)](this,_0x1b23ad);const _0x4bcb5a=_0x1b23ad[_0x1cdce2(0x62b)];if(_0x4bcb5a[_0x1cdce2(0x5cb)](/<MAX LEVEL:[ ](\d+)>/i)){if(_0x1cdce2(0x853)!==_0x1cdce2(0x853)){if(!_0x34c2c9)return;if(!_0x339e17[_0x1cdce2(0x29c)]())return;const _0x29055f=0x80,_0x56c85e=_0x9d6044[_0x1cdce2(0x7e7)]();let _0x5cffeb=_0x331569[_0x1cdce2(0x855)](),_0x2f0e8d=_0x169d7b[_0x1cdce2(0x2eb)]();_0x56c85e>=0x1&&(_0x5cffeb=_0x49bd54['maxLvGaugeColor1'](),_0x2f0e8d=_0x275a78['maxLvGaugeColor2']()),this[_0x1cdce2(0x365)](_0xa1155,_0x5ca13b,_0x29055f,_0x56c85e,_0x5cffeb,_0x2f0e8d);}else{_0x1b23ad[_0x1cdce2(0x8d9)]=Number(RegExp['$1']);if(_0x1b23ad[_0x1cdce2(0x8d9)]===0x0)_0x1b23ad[_0x1cdce2(0x8d9)]=Number['MAX_SAFE_INTEGER'];}}_0x4bcb5a[_0x1cdce2(0x5cb)](/<INITIAL LEVEL:[ ](\d+)>/i)&&(_0x1b23ad[_0x1cdce2(0x5c2)]=Math['min'](Number(RegExp['$1']),_0x1b23ad['maxLevel']));},VisuMZ[_0x39290f(0x7b3)][_0x39290f(0x3b7)]=VisuMZ[_0x39290f(0x3b7)],VisuMZ[_0x39290f(0x3b7)]=function(_0x4e8080){const _0x388f96=_0x39290f;VisuMZ[_0x388f96(0x7b3)][_0x388f96(0x3b7)][_0x388f96(0x592)](this,_0x4e8080);if(_0x4e8080[_0x388f96(0x259)])for(const _0x105548 of _0x4e8080[_0x388f96(0x259)]){if('LPjyV'===_0x388f96(0x2a2)){if(this[_0x388f96(0x67d)]())_0x72ce6a=_0x7b2da9[_0x388f96(0x8de)](_0x3f7280);_0xe52bdb[_0x388f96(0x7b3)]['Window_Base_drawText']['call'](this,_0x4528e0,_0x4560a5,_0x2578a4,_0x28ae3b,_0x31fd56);}else _0x105548['note']['match'](/<LEARN AT LEVEL:[ ](\d+)>/i)&&(_0x105548[_0x388f96(0x58e)]=Math['max'](Number(RegExp['$1']),0x1));}},VisuMZ[_0x39290f(0x7b3)][_0x39290f(0x1ef)]=VisuMZ['ParseEnemyNotetags'],VisuMZ[_0x39290f(0x1ef)]=function(_0x3521f5){const _0xf36e8f=_0x39290f;VisuMZ[_0xf36e8f(0x7b3)][_0xf36e8f(0x1ef)]['call'](this,_0x3521f5),_0x3521f5[_0xf36e8f(0x58e)]=0x1;const _0x2e3ff2=_0x3521f5['note'];if(_0x2e3ff2[_0xf36e8f(0x5cb)](/<LEVEL:[ ](\d+)>/i))_0x3521f5[_0xf36e8f(0x58e)]=Number(RegExp['$1']);if(_0x2e3ff2['match'](/<MAXHP:[ ](\d+)>/i))_0x3521f5[_0xf36e8f(0x5c9)][0x0]=Number(RegExp['$1']);if(_0x2e3ff2['match'](/<MAXMP:[ ](\d+)>/i))_0x3521f5[_0xf36e8f(0x5c9)][0x1]=Number(RegExp['$1']);if(_0x2e3ff2['match'](/<ATK:[ ](\d+)>/i))_0x3521f5[_0xf36e8f(0x5c9)][0x2]=Number(RegExp['$1']);if(_0x2e3ff2[_0xf36e8f(0x5cb)](/<DEF:[ ](\d+)>/i))_0x3521f5['params'][0x3]=Number(RegExp['$1']);if(_0x2e3ff2[_0xf36e8f(0x5cb)](/<MAT:[ ](\d+)>/i))_0x3521f5[_0xf36e8f(0x5c9)][0x4]=Number(RegExp['$1']);if(_0x2e3ff2['match'](/<MDF:[ ](\d+)>/i))_0x3521f5['params'][0x5]=Number(RegExp['$1']);if(_0x2e3ff2['match'](/<AGI:[ ](\d+)>/i))_0x3521f5[_0xf36e8f(0x5c9)][0x6]=Number(RegExp['$1']);if(_0x2e3ff2[_0xf36e8f(0x5cb)](/<LUK:[ ](\d+)>/i))_0x3521f5['params'][0x7]=Number(RegExp['$1']);if(_0x2e3ff2[_0xf36e8f(0x5cb)](/<EXP:[ ](\d+)>/i))_0x3521f5['exp']=Number(RegExp['$1']);if(_0x2e3ff2[_0xf36e8f(0x5cb)](/<GOLD:[ ](\d+)>/i))_0x3521f5[_0xf36e8f(0x5ac)]=Number(RegExp['$1']);},VisuMZ['CoreEngine'][_0x39290f(0x36b)]=Graphics[_0x39290f(0x83b)],Graphics[_0x39290f(0x83b)]=function(){const _0xb2e6d5=_0x39290f;switch(VisuMZ[_0xb2e6d5(0x7b3)]['Settings'][_0xb2e6d5(0x646)]['AutoStretch']){case _0xb2e6d5(0x849):return!![];case _0xb2e6d5(0x76e):return![];default:return VisuMZ['CoreEngine'][_0xb2e6d5(0x36b)][_0xb2e6d5(0x592)](this);}},VisuMZ[_0x39290f(0x7b3)][_0x39290f(0x62e)]=Graphics[_0x39290f(0x28f)],Graphics[_0x39290f(0x28f)]=function(_0x1a1daa,_0x3d2b2b,_0x2d638b=null){const _0x1680f7=_0x39290f;VisuMZ['CoreEngine'][_0x1680f7(0x62e)][_0x1680f7(0x592)](this,_0x1a1daa,_0x3d2b2b,_0x2d638b),VisuMZ[_0x1680f7(0x16c)](![]);},VisuMZ[_0x39290f(0x7b3)]['Graphics_centerElement']=Graphics[_0x39290f(0x49c)],Graphics[_0x39290f(0x49c)]=function(_0x458564){const _0x33b383=_0x39290f;VisuMZ[_0x33b383(0x7b3)]['Graphics_centerElement'][_0x33b383(0x592)](this,_0x458564),this[_0x33b383(0x3fb)](_0x458564);},Graphics[_0x39290f(0x3fb)]=function(_0xc31fdb){const _0x4b6eb0=_0x39290f;VisuMZ[_0x4b6eb0(0x7b3)]['Settings']['QoL']['FontSmoothing']&&(_0xc31fdb['style'][_0x4b6eb0(0x7ff)]=_0x4b6eb0(0x83f));VisuMZ[_0x4b6eb0(0x7b3)][_0x4b6eb0(0x1ac)][_0x4b6eb0(0x646)][_0x4b6eb0(0x463)]&&(_0xc31fdb['style'][_0x4b6eb0(0x3f7)]=_0x4b6eb0(0x644));const _0x5d06f7=Math[_0x4b6eb0(0x886)](0x0,Math[_0x4b6eb0(0x27c)](_0xc31fdb[_0x4b6eb0(0x42a)]*this[_0x4b6eb0(0x70c)])),_0x1f2e39=Math['max'](0x0,Math[_0x4b6eb0(0x27c)](_0xc31fdb[_0x4b6eb0(0x431)]*this[_0x4b6eb0(0x70c)]));_0xc31fdb[_0x4b6eb0(0x47e)][_0x4b6eb0(0x42a)]=_0x5d06f7+'px',_0xc31fdb[_0x4b6eb0(0x47e)]['height']=_0x1f2e39+'px';},Bitmap[_0x39290f(0x24d)]['markCoreEngineModified']=function(){const _0x2c072e=_0x39290f;this[_0x2c072e(0x33c)]=!![];},VisuMZ['CoreEngine'][_0x39290f(0x281)]=Sprite['prototype'][_0x39290f(0x2e8)],Sprite[_0x39290f(0x24d)][_0x39290f(0x2e8)]=function(){const _0x3ccfbf=_0x39290f;VisuMZ['CoreEngine'][_0x3ccfbf(0x281)][_0x3ccfbf(0x592)](this),this['destroyCoreEngineMarkedBitmaps']();},Sprite[_0x39290f(0x24d)][_0x39290f(0x23a)]=function(){const _0x2984a6=_0x39290f;if(!this[_0x2984a6(0x28d)])return;if(!this['bitmap'][_0x2984a6(0x33c)])return;if(this[_0x2984a6(0x28d)]['_baseTexture']&&!this[_0x2984a6(0x89c)]['_baseTexture'][_0x2984a6(0x392)]){if(_0x2984a6(0x4f4)!==_0x2984a6(0x761))this['bitmap']['destroy']();else for(const _0x15243a of _0x256a67){if(_0x15243a&&_0x15243a[_0x2984a6(0x7cd)])return!![];}}},VisuMZ[_0x39290f(0x7b3)][_0x39290f(0x112)]=Bitmap[_0x39290f(0x24d)][_0x39290f(0x17a)],Bitmap[_0x39290f(0x24d)][_0x39290f(0x17a)]=function(_0x232035,_0x45647f){const _0x2dbce6=_0x39290f;VisuMZ['CoreEngine'][_0x2dbce6(0x112)][_0x2dbce6(0x592)](this,_0x232035,_0x45647f),this[_0x2dbce6(0x487)]();},VisuMZ[_0x39290f(0x7b3)]['Bitmap_blt']=Bitmap['prototype'][_0x39290f(0x409)],Bitmap[_0x39290f(0x24d)][_0x39290f(0x409)]=function(_0xc8d6af,_0x51f7f8,_0x1d3cfc,_0xb097c9,_0x2eea9e,_0x2de90c,_0xb6b44f,_0x46b8d5,_0x5861b3){const _0x37236d=_0x39290f;VisuMZ['CoreEngine'][_0x37236d(0x652)]['call'](this,_0xc8d6af,_0x51f7f8,_0x1d3cfc,_0xb097c9,_0x2eea9e,_0x2de90c,_0xb6b44f,_0x46b8d5,_0x5861b3),this[_0x37236d(0x487)]();},VisuMZ[_0x39290f(0x7b3)][_0x39290f(0x1dc)]=Bitmap['prototype']['clearRect'],Bitmap[_0x39290f(0x24d)][_0x39290f(0x810)]=function(_0xb41caf,_0x1f8800,_0x5eba4b,_0x119f65){const _0x120b94=_0x39290f;VisuMZ[_0x120b94(0x7b3)][_0x120b94(0x1dc)]['call'](this,_0xb41caf,_0x1f8800,_0x5eba4b,_0x119f65),this[_0x120b94(0x487)]();},VisuMZ[_0x39290f(0x7b3)][_0x39290f(0x33a)]=Bitmap[_0x39290f(0x24d)]['fillRect'],Bitmap['prototype']['fillRect']=function(_0xf4f037,_0x45d374,_0x51ea1f,_0xa14046,_0x19ab61){const _0x1e9665=_0x39290f;VisuMZ['CoreEngine'][_0x1e9665(0x33a)]['call'](this,_0xf4f037,_0x45d374,_0x51ea1f,_0xa14046,_0x19ab61),this[_0x1e9665(0x487)]();},VisuMZ[_0x39290f(0x7b3)]['Bitmap_strokeRect']=Bitmap[_0x39290f(0x24d)]['strokeRect'],Bitmap[_0x39290f(0x24d)]['strokeRect']=function(_0x2f4be2,_0xeda1a9,_0x277070,_0x5aebe8,_0x3cb4c0){const _0x5c6ad6=_0x39290f;VisuMZ[_0x5c6ad6(0x7b3)][_0x5c6ad6(0x322)][_0x5c6ad6(0x592)](this,_0x2f4be2,_0xeda1a9,_0x277070,_0x5aebe8,_0x3cb4c0),this['markCoreEngineModified']();},VisuMZ[_0x39290f(0x7b3)][_0x39290f(0x6fd)]=Bitmap[_0x39290f(0x24d)]['gradientFillRect'],Bitmap['prototype']['gradientFillRect']=function(_0x22c809,_0x2bc201,_0x201451,_0x5438b8,_0x1fad2d,_0xc20e32,_0x2061df){const _0x285718=_0x39290f;VisuMZ[_0x285718(0x7b3)]['Bitmap_gradientFillRect'][_0x285718(0x592)](this,_0x22c809,_0x2bc201,_0x201451,_0x5438b8,_0x1fad2d,_0xc20e32,_0x2061df),this[_0x285718(0x487)]();},VisuMZ[_0x39290f(0x7b3)]['Bitmap_drawCircle']=Bitmap['prototype'][_0x39290f(0x25d)],Bitmap[_0x39290f(0x24d)][_0x39290f(0x25d)]=function(_0x56bc8c,_0x4bfacc,_0x358eb2,_0x2edb48){const _0x20ca61=_0x39290f;_0x56bc8c=Math[_0x20ca61(0x401)](_0x56bc8c),_0x4bfacc=Math['round'](_0x4bfacc),_0x358eb2=Math['round'](_0x358eb2),VisuMZ[_0x20ca61(0x7b3)]['Bitmap_drawCircle'][_0x20ca61(0x592)](this,_0x56bc8c,_0x4bfacc,_0x358eb2,_0x2edb48),this[_0x20ca61(0x487)]();},VisuMZ[_0x39290f(0x7b3)][_0x39290f(0x7af)]=Bitmap[_0x39290f(0x24d)][_0x39290f(0x175)],Bitmap['prototype']['measureTextWidth']=function(_0x424c85){const _0x4efe81=_0x39290f;return Math['round'](VisuMZ[_0x4efe81(0x7b3)][_0x4efe81(0x7af)]['call'](this,_0x424c85));},VisuMZ[_0x39290f(0x7b3)]['Bitmap_drawText']=Bitmap[_0x39290f(0x24d)][_0x39290f(0x218)],Bitmap[_0x39290f(0x24d)]['drawText']=function(_0x44c01d,_0x432bd1,_0x32554c,_0x415e34,_0x5cc17e,_0x450a81){const _0x34bb69=_0x39290f;_0x432bd1=Math['round'](_0x432bd1),_0x32554c=Math[_0x34bb69(0x401)](_0x32554c),_0x415e34=Math[_0x34bb69(0x401)](_0x415e34),_0x5cc17e=Math['round'](_0x5cc17e),VisuMZ['CoreEngine']['Bitmap_drawText'][_0x34bb69(0x592)](this,_0x44c01d,_0x432bd1,_0x32554c,_0x415e34,_0x5cc17e,_0x450a81),this[_0x34bb69(0x487)]();},VisuMZ[_0x39290f(0x7b3)]['Bitmap_drawTextOutline']=Bitmap[_0x39290f(0x24d)]['_drawTextOutline'],Bitmap['prototype']['_drawTextOutline']=function(_0x36cd46,_0x39062d,_0x3f03ad,_0x5c2cb0){const _0x53996f=_0x39290f;VisuMZ[_0x53996f(0x7b3)]['Settings'][_0x53996f(0x646)][_0x53996f(0x20d)]?this['_drawTextShadow'](_0x36cd46,_0x39062d,_0x3f03ad,_0x5c2cb0):VisuMZ[_0x53996f(0x7b3)][_0x53996f(0x4e9)][_0x53996f(0x592)](this,_0x36cd46,_0x39062d,_0x3f03ad,_0x5c2cb0);},Bitmap[_0x39290f(0x24d)][_0x39290f(0x3e9)]=function(_0x5745d2,_0x44dea6,_0x583791,_0x5ad742){const _0x2cfe90=_0x39290f,_0x5dab20=this[_0x2cfe90(0x3cc)];_0x5dab20[_0x2cfe90(0x4ad)]=this[_0x2cfe90(0x6e8)],_0x5dab20[_0x2cfe90(0x66e)](_0x5745d2,_0x44dea6+0x2,_0x583791+0x2,_0x5ad742);},VisuMZ['CoreEngine'][_0x39290f(0x6e2)]=Input[_0x39290f(0x575)],Input[_0x39290f(0x575)]=function(){const _0x56717c=_0x39290f;VisuMZ[_0x56717c(0x7b3)][_0x56717c(0x6e2)][_0x56717c(0x592)](this),this[_0x56717c(0x862)]=undefined,this['_inputSpecialKeyCode']=undefined,this[_0x56717c(0x350)]=Input[_0x56717c(0x6b9)];},VisuMZ[_0x39290f(0x7b3)][_0x39290f(0x1b3)]=Input[_0x39290f(0x6bb)],Input[_0x39290f(0x6bb)]=function(){const _0x4cfd10=_0x39290f;VisuMZ[_0x4cfd10(0x7b3)][_0x4cfd10(0x1b3)][_0x4cfd10(0x592)](this);if(this[_0x4cfd10(0x350)])this['_gamepadWait']--;},VisuMZ[_0x39290f(0x7b3)]['Input_pollGamepads']=Input[_0x39290f(0x46a)],Input[_0x39290f(0x46a)]=function(){const _0x9f29f2=_0x39290f;if(this['_gamepadWait'])return;VisuMZ[_0x9f29f2(0x7b3)][_0x9f29f2(0x4a7)][_0x9f29f2(0x592)](this);},VisuMZ['CoreEngine'][_0x39290f(0x115)]=Input['_setupEventHandlers'],Input[_0x39290f(0x4dc)]=function(){const _0x5e0b63=_0x39290f;VisuMZ[_0x5e0b63(0x7b3)][_0x5e0b63(0x115)][_0x5e0b63(0x592)](this),document[_0x5e0b63(0x7bb)]('keypress',this[_0x5e0b63(0x310)][_0x5e0b63(0x1df)](this));},VisuMZ[_0x39290f(0x7b3)][_0x39290f(0x60f)]=Input['_onKeyDown'],Input[_0x39290f(0x7a3)]=function(_0x237b08){const _0x46dc27=_0x39290f;this[_0x46dc27(0x611)]=_0x237b08[_0x46dc27(0x2e6)],VisuMZ[_0x46dc27(0x7b3)][_0x46dc27(0x60f)][_0x46dc27(0x592)](this,_0x237b08);},Input['_onKeyPress']=function(_0x1ade83){const _0x40cb3c=_0x39290f;this[_0x40cb3c(0x481)](_0x1ade83);},Input[_0x39290f(0x481)]=function(_0x3588f3){const _0x3b3b58=_0x39290f;this[_0x3b3b58(0x611)]=_0x3588f3[_0x3b3b58(0x2e6)];let _0x214bad=String['fromCharCode'](_0x3588f3[_0x3b3b58(0x715)]);this['_inputString']===undefined?this['_inputString']=_0x214bad:this[_0x3b3b58(0x862)]+=_0x214bad;},VisuMZ[_0x39290f(0x7b3)][_0x39290f(0x61a)]=Input['_shouldPreventDefault'],Input[_0x39290f(0x69f)]=function(_0x3b3c5d){const _0x36aa55=_0x39290f;if(_0x3b3c5d===0x8)return![];return VisuMZ[_0x36aa55(0x7b3)][_0x36aa55(0x61a)][_0x36aa55(0x592)](this,_0x3b3c5d);},Input[_0x39290f(0x445)]=function(_0x3e94a8){const _0x351810=_0x39290f;if(_0x3e94a8['match'](/backspace/i))return this[_0x351810(0x611)]===0x8;if(_0x3e94a8[_0x351810(0x5cb)](/enter/i))return this[_0x351810(0x611)]===0xd;if(_0x3e94a8[_0x351810(0x5cb)](/escape/i))return this[_0x351810(0x611)]===0x1b;},Input[_0x39290f(0x4c4)]=function(){const _0x574152=_0x39290f;return[0x30,0x31,0x32,0x33,0x34,0x35,0x36,0x37,0x38,0x39][_0x574152(0x591)](this[_0x574152(0x611)]);},Input[_0x39290f(0x4ac)]=function(){const _0x37f796=_0x39290f;return[0x25,0x26,0x27,0x28][_0x37f796(0x591)](this[_0x37f796(0x611)]);},Input[_0x39290f(0x608)]=function(){const _0x30ff8f=_0x39290f;if(navigator[_0x30ff8f(0x1b8)]){if(_0x30ff8f(0x48a)===_0x30ff8f(0x8e2)){if(this[_0x30ff8f(0x25e)]===_0x4ff0f4)this[_0x30ff8f(0x2ef)]();if(this[_0x30ff8f(0x25e)][_0x30ff8f(0x2c3)]===_0x46e71b)this[_0x30ff8f(0x52c)]();this[_0x30ff8f(0x25e)]['BattleSystem']=_0x3e7d0c;}else{const _0x3622b5=navigator[_0x30ff8f(0x1b8)]();if(_0x3622b5)for(const _0x378167 of _0x3622b5){if(_0x378167&&_0x378167[_0x30ff8f(0x7cd)]){if('AsRiT'==='AsRiT')return!![];else _0x2b940d[_0x30ff8f(0x7b3)][_0x30ff8f(0x717)][_0x30ff8f(0x592)](this),this['setCoreEngineUpdateWindowBg']();}}}}return![];},Input['isGamepadTriggered']=function(){const _0x2eb226=_0x39290f;if(navigator[_0x2eb226(0x1b8)]){if(_0x2eb226(0x19f)===_0x2eb226(0x19f)){const _0x1dde7b=navigator[_0x2eb226(0x1b8)]();if(_0x1dde7b)for(const _0x42a3b2 of _0x1dde7b){if(_0x42a3b2&&_0x42a3b2[_0x2eb226(0x7cd)]){if(this[_0x2eb226(0x48e)](_0x42a3b2))return!![];}}}else{if(!this[_0x2eb226(0x437)]())return![];else{const _0x59cd6e=_0xfb1799[_0x2eb226(0x64c)](_0x2e9e22,_0x49c176)['filter'](_0x1eb1f4=>_0x1eb1f4[_0x2eb226(0x437)]());return _0x59cd6e[_0x2eb226(0x59c)]>0x0;}}}return![];},Input[_0x39290f(0x48e)]=function(_0x3a84a7){const _0x418123=_0x39290f,_0x54b9bd=_0x3a84a7[_0x418123(0x617)];for(let _0xa836e=0x0;_0xa836e<_0x54b9bd['length'];_0xa836e++){if(_0x54b9bd[_0xa836e][_0x418123(0x53a)])return!![];}return![];},VisuMZ[_0x39290f(0x7b3)][_0x39290f(0x4b6)]=Tilemap[_0x39290f(0x24d)][_0x39290f(0x380)],Tilemap[_0x39290f(0x24d)][_0x39290f(0x380)]=function(_0x4ad79b,_0x2a5fa1,_0x4f3754,_0x38bba2){const _0x24780f=_0x39290f;if($gameMap&&$gameMap[_0x24780f(0x75f)]())return;VisuMZ[_0x24780f(0x7b3)][_0x24780f(0x4b6)]['call'](this,_0x4ad79b,_0x2a5fa1,_0x4f3754,_0x38bba2);},Tilemap[_0x39290f(0x7f4)][_0x39290f(0x24d)][_0x39290f(0x7b2)]=function(){const _0x3793f9=_0x39290f;this['_destroyInternalTextures']();for(let _0x44d887=0x0;_0x44d887<Tilemap[_0x3793f9(0x583)][_0x3793f9(0x598)];_0x44d887++){const _0x395178=new PIXI[(_0x3793f9(0x3e6))]();_0x395178[_0x3793f9(0x36a)](0x800,0x800);if(VisuMZ[_0x3793f9(0x7b3)][_0x3793f9(0x1ac)]['QoL']['PixelateImageRendering']){if(_0x3793f9(0x469)===_0x3793f9(0x469))_0x395178[_0x3793f9(0x7e5)]=PIXI[_0x3793f9(0x71a)]['NEAREST'];else return _0x1a0958[_0x3793f9(0x302)]['ItemRect'][_0x3793f9(0x592)](this);}this[_0x3793f9(0x8ba)]['push'](_0x395178);}},WindowLayer[_0x39290f(0x24d)][_0x39290f(0x8bc)]=function(){const _0x5e8632=_0x39290f;return SceneManager&&SceneManager[_0x5e8632(0x4eb)]?SceneManager[_0x5e8632(0x4eb)]['isWindowMaskingEnabled']():_0x5e8632(0x170)!==_0x5e8632(0x701)?!![]:_0x1a250c[_0x5e8632(0x302)]['CommandRect']['call'](this);},VisuMZ['CoreEngine']['WindowLayer_render']=WindowLayer[_0x39290f(0x24d)][_0x39290f(0x59f)],WindowLayer[_0x39290f(0x24d)]['render']=function render(_0x54744d){const _0x451358=_0x39290f;this[_0x451358(0x8bc)]()?VisuMZ[_0x451358(0x7b3)][_0x451358(0x6cc)][_0x451358(0x592)](this,_0x54744d):this[_0x451358(0x5bd)](_0x54744d);},WindowLayer['prototype'][_0x39290f(0x5bd)]=function render(_0x1dead0){const _0x1a3ae3=_0x39290f;if(!this[_0x1a3ae3(0x557)])return;const _0x528454=new PIXI[(_0x1a3ae3(0x144))](),_0x485311=_0x1dead0['gl'],_0x304d6f=this['children'][_0x1a3ae3(0x2f6)]();_0x1dead0[_0x1a3ae3(0x752)][_0x1a3ae3(0x7d3)](),_0x528454[_0x1a3ae3(0x1ba)]=this[_0x1a3ae3(0x1ba)],_0x1dead0['batch'][_0x1a3ae3(0x578)](),_0x485311['enable'](_0x485311[_0x1a3ae3(0x8a5)]);while(_0x304d6f['length']>0x0){const _0x434090=_0x304d6f[_0x1a3ae3(0x596)]();_0x434090[_0x1a3ae3(0x47c)]&&_0x434090[_0x1a3ae3(0x557)]&&_0x434090[_0x1a3ae3(0x5f8)]>0x0&&(_0x485311[_0x1a3ae3(0x663)](_0x485311[_0x1a3ae3(0x597)],0x0,~0x0),_0x485311[_0x1a3ae3(0x638)](_0x485311['KEEP'],_0x485311[_0x1a3ae3(0x50f)],_0x485311['KEEP']),_0x434090[_0x1a3ae3(0x59f)](_0x1dead0),_0x1dead0[_0x1a3ae3(0x3e0)][_0x1a3ae3(0x578)](),_0x528454['clear'](),_0x485311['stencilFunc'](_0x485311['ALWAYS'],0x1,~0x0),_0x485311[_0x1a3ae3(0x638)](_0x485311[_0x1a3ae3(0x21f)],_0x485311[_0x1a3ae3(0x21f)],_0x485311['REPLACE']),_0x485311[_0x1a3ae3(0x4b4)](_0x485311['ZERO'],_0x485311[_0x1a3ae3(0x4d0)]),_0x528454[_0x1a3ae3(0x59f)](_0x1dead0),_0x1dead0[_0x1a3ae3(0x3e0)][_0x1a3ae3(0x578)](),_0x485311[_0x1a3ae3(0x4b4)](_0x485311[_0x1a3ae3(0x4d0)],_0x485311[_0x1a3ae3(0x7f0)]));}_0x485311['disable'](_0x485311['STENCIL_TEST']),_0x485311[_0x1a3ae3(0x575)](_0x485311[_0x1a3ae3(0x72e)]),_0x485311[_0x1a3ae3(0x111)](0x0),_0x1dead0[_0x1a3ae3(0x3e0)][_0x1a3ae3(0x578)]();for(const _0x16a34a of this[_0x1a3ae3(0x6d8)]){_0x1a3ae3(0x231)==='xTksG'?this['isMaskingEnabled']()?_0x4dfdaa[_0x1a3ae3(0x7b3)][_0x1a3ae3(0x6cc)][_0x1a3ae3(0x592)](this,_0x46a84c):this[_0x1a3ae3(0x5bd)](_0x32845a):!_0x16a34a[_0x1a3ae3(0x47c)]&&_0x16a34a[_0x1a3ae3(0x557)]&&_0x16a34a['render'](_0x1dead0);}_0x1dead0[_0x1a3ae3(0x3e0)][_0x1a3ae3(0x578)]();},DataManager[_0x39290f(0x4e0)]=function(_0x3aa61c){const _0x89a2a7=_0x39290f;return this[_0x89a2a7(0x887)](_0x3aa61c)&&_0x3aa61c[_0x89a2a7(0x819)]===0x2;},VisuMZ['CoreEngine'][_0x39290f(0x344)]=DataManager['setupNewGame'],DataManager[_0x39290f(0x85e)]=function(){const _0x476c12=_0x39290f;VisuMZ[_0x476c12(0x7b3)]['DataManager_setupNewGame'][_0x476c12(0x592)](this),this['reservePlayTestNewGameCommonEvent'](),this['reserveNewGameCommonEvent']();},DataManager[_0x39290f(0x19e)]=function(){const _0xdddceb=_0x39290f;if($gameTemp[_0xdddceb(0x499)]()){const _0x5bd86c=VisuMZ[_0xdddceb(0x7b3)][_0xdddceb(0x1ac)]['QoL'][_0xdddceb(0x6b3)];if(_0x5bd86c>0x0)$gameTemp['reserveCommonEvent'](_0x5bd86c);}},DataManager[_0x39290f(0x8e1)]=function(){const _0x3f1329=_0x39290f,_0x3b7fc6=VisuMZ[_0x3f1329(0x7b3)]['Settings']['QoL'][_0x3f1329(0x18b)]||0x0;if(_0x3b7fc6>0x0)$gameTemp['reserveCommonEvent'](_0x3b7fc6);},DataManager[_0x39290f(0x60a)]=function(_0x10d2df){const _0x3f89f5=_0x39290f,_0x4bc301=$dataTroops[_0x10d2df];if(!_0x4bc301)return'';let _0x190ad7='';_0x190ad7+=_0x4bc301[_0x3f89f5(0x8e0)];for(const _0x459b39 of _0x4bc301[_0x3f89f5(0x74b)]){for(const _0x426424 of _0x459b39[_0x3f89f5(0x4f8)]){[0x6c,0x198][_0x3f89f5(0x6d3)](_0x426424['code'])&&(_0x190ad7+='\x0a',_0x190ad7+=_0x426424[_0x3f89f5(0x1e4)][0x0]);}}return _0x190ad7;},TextManager[_0x39290f(0x4a3)]=['','','','CANCEL','','',_0x39290f(0x1af),'',_0x39290f(0x61d),_0x39290f(0x20f),'','','CLEAR',_0x39290f(0x6bc),'ENTER_SPECIAL','',_0x39290f(0x847),_0x39290f(0x45f),_0x39290f(0x46c),_0x39290f(0x3ef),_0x39290f(0x206),_0x39290f(0x842),_0x39290f(0x369),_0x39290f(0x7e9),_0x39290f(0x4b7),_0x39290f(0x7a6),'',_0x39290f(0x268),'CONVERT',_0x39290f(0x56f),_0x39290f(0x714),'MODECHANGE',_0x39290f(0x145),_0x39290f(0x379),_0x39290f(0x5f7),_0x39290f(0x54e),_0x39290f(0x53e),'LEFT','UP',_0x39290f(0x767),_0x39290f(0x539),_0x39290f(0x3db),_0x39290f(0x5bf),_0x39290f(0x254),_0x39290f(0x619),_0x39290f(0x7b5),_0x39290f(0x4ed),'','0','1','2','3','4','5','6','7','8','9',_0x39290f(0x83d),'SEMICOLON',_0x39290f(0x279),_0x39290f(0x570),'GREATER_THAN',_0x39290f(0x87d),'AT','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',_0x39290f(0x871),'',_0x39290f(0x1a6),'','SLEEP',_0x39290f(0x174),_0x39290f(0x8b5),'NUMPAD2','NUMPAD3',_0x39290f(0x3e4),_0x39290f(0x779),'NUMPAD6',_0x39290f(0x35a),_0x39290f(0x1f7),_0x39290f(0x239),'MULTIPLY','ADD',_0x39290f(0x793),'SUBTRACT',_0x39290f(0x700),'DIVIDE','F1','F2','F3','F4','F5','F6','F7','F8','F9','F10',_0x39290f(0x184),_0x39290f(0x718),_0x39290f(0x10a),_0x39290f(0x479),_0x39290f(0x143),_0x39290f(0x71c),_0x39290f(0x393),_0x39290f(0x2e9),_0x39290f(0x352),'F20',_0x39290f(0x50a),_0x39290f(0x878),_0x39290f(0x4be),'F24','','','','','','','','','NUM_LOCK',_0x39290f(0x23f),'WIN_OEM_FJ_JISHO',_0x39290f(0x516),_0x39290f(0x490),_0x39290f(0x754),_0x39290f(0x2bb),'','','','','','','','','',_0x39290f(0x8c6),_0x39290f(0x473),'DOUBLE_QUOTE',_0x39290f(0x38b),_0x39290f(0x2ad),'PERCENT',_0x39290f(0x4de),'UNDERSCORE',_0x39290f(0x785),'CLOSE_PAREN',_0x39290f(0x418),'PLUS','PIPE',_0x39290f(0x6c9),_0x39290f(0x667),_0x39290f(0x79d),'TILDE','','','','','VOLUME_MUTE',_0x39290f(0x160),_0x39290f(0x292),'','',_0x39290f(0x73d),_0x39290f(0x570),_0x39290f(0x549),_0x39290f(0x1a4),'PERIOD',_0x39290f(0x85a),_0x39290f(0x1f0),'','','','','','','','','','','','','','','','','','','','','','','','','','',_0x39290f(0x6c6),_0x39290f(0x5db),_0x39290f(0x87f),_0x39290f(0x3ff),'',_0x39290f(0x4cc),_0x39290f(0x8e5),'','WIN_ICO_HELP',_0x39290f(0x3f3),'',_0x39290f(0x60c),'','',_0x39290f(0x4fe),_0x39290f(0x4f5),_0x39290f(0x3b3),_0x39290f(0x728),'WIN_OEM_PA3',_0x39290f(0x747),_0x39290f(0x7d1),_0x39290f(0x2f1),'WIN_OEM_FINISH',_0x39290f(0x830),_0x39290f(0x573),_0x39290f(0x579),_0x39290f(0x247),_0x39290f(0x26c),_0x39290f(0x7cc),_0x39290f(0x672),_0x39290f(0x1e5),_0x39290f(0x7d7),'ZOOM','',_0x39290f(0x455),_0x39290f(0x8eb),''],TextManager[_0x39290f(0x702)]=VisuMZ[_0x39290f(0x7b3)][_0x39290f(0x1ac)]['ButtonAssist'][_0x39290f(0x31c)],TextManager[_0x39290f(0x55f)]=VisuMZ['CoreEngine'][_0x39290f(0x1ac)][_0x39290f(0x8bf)][_0x39290f(0x196)],TextManager['buttonAssistSwitch']=VisuMZ['CoreEngine'][_0x39290f(0x1ac)][_0x39290f(0x8bf)][_0x39290f(0x503)],VisuMZ[_0x39290f(0x7b3)]['TextManager_param']=TextManager[_0x39290f(0x5d1)],TextManager['param']=function(_0x1378b4){const _0x1654d3=_0x39290f;if(typeof _0x1378b4===_0x1654d3(0x3b4)){if(_0x1654d3(0x8a2)===_0x1654d3(0x8a2))return VisuMZ['CoreEngine']['TextManager_param'][_0x1654d3(0x592)](this,_0x1378b4);else _0x2322f2[_0x1654d3(0x7b3)][_0x1654d3(0x546)]['call'](this),this[_0x1654d3(0x1d9)]();}else return this['paramName'](_0x1378b4);},TextManager[_0x39290f(0x334)]=function(_0x1b94f8){const _0x4b2b2c=_0x39290f;_0x1b94f8=String(_0x1b94f8||'')['toUpperCase']();const _0x32d8fc=VisuMZ['CoreEngine'][_0x4b2b2c(0x1ac)][_0x4b2b2c(0x390)];if(_0x1b94f8===_0x4b2b2c(0x48c))return $dataSystem[_0x4b2b2c(0x777)][_0x4b2b2c(0x5c9)][0x0];if(_0x1b94f8===_0x4b2b2c(0x1b0))return $dataSystem[_0x4b2b2c(0x777)][_0x4b2b2c(0x5c9)][0x1];if(_0x1b94f8===_0x4b2b2c(0x535))return $dataSystem[_0x4b2b2c(0x777)]['params'][0x2];if(_0x1b94f8===_0x4b2b2c(0x891))return $dataSystem['terms'][_0x4b2b2c(0x5c9)][0x3];if(_0x1b94f8==='MAT')return $dataSystem[_0x4b2b2c(0x777)]['params'][0x4];if(_0x1b94f8===_0x4b2b2c(0x7c2))return $dataSystem['terms'][_0x4b2b2c(0x5c9)][0x5];if(_0x1b94f8===_0x4b2b2c(0x695))return $dataSystem['terms'][_0x4b2b2c(0x5c9)][0x6];if(_0x1b94f8==='LUK')return $dataSystem[_0x4b2b2c(0x777)][_0x4b2b2c(0x5c9)][0x7];if(_0x1b94f8===_0x4b2b2c(0x1d3))return _0x32d8fc[_0x4b2b2c(0x5a2)];if(_0x1b94f8===_0x4b2b2c(0x44a))return _0x32d8fc[_0x4b2b2c(0x1d5)];if(_0x1b94f8===_0x4b2b2c(0x37e))return _0x32d8fc[_0x4b2b2c(0x649)];if(_0x1b94f8===_0x4b2b2c(0x128))return _0x32d8fc[_0x4b2b2c(0x52f)];if(_0x1b94f8===_0x4b2b2c(0x7d6))return _0x32d8fc[_0x4b2b2c(0x5cd)];if(_0x1b94f8==='MRF')return _0x32d8fc['XParamVocab5'];if(_0x1b94f8==='CNT')return _0x32d8fc[_0x4b2b2c(0x331)];if(_0x1b94f8===_0x4b2b2c(0x63c))return _0x32d8fc[_0x4b2b2c(0x743)];if(_0x1b94f8==='MRG')return _0x32d8fc['XParamVocab8'];if(_0x1b94f8===_0x4b2b2c(0x22e))return _0x32d8fc['XParamVocab9'];if(_0x1b94f8===_0x4b2b2c(0x4d9))return _0x32d8fc[_0x4b2b2c(0x5a7)];if(_0x1b94f8==='GRD')return _0x32d8fc[_0x4b2b2c(0x8b0)];if(_0x1b94f8===_0x4b2b2c(0x7b0))return _0x32d8fc[_0x4b2b2c(0x513)];if(_0x1b94f8===_0x4b2b2c(0x367))return _0x32d8fc[_0x4b2b2c(0x65f)];if(_0x1b94f8===_0x4b2b2c(0x159))return _0x32d8fc[_0x4b2b2c(0x11c)];if(_0x1b94f8===_0x4b2b2c(0x884))return _0x32d8fc[_0x4b2b2c(0x3c0)];if(_0x1b94f8==='PDR')return _0x32d8fc[_0x4b2b2c(0x8c1)];if(_0x1b94f8===_0x4b2b2c(0x5e1))return _0x32d8fc['SParamVocab7'];if(_0x1b94f8===_0x4b2b2c(0x67f))return _0x32d8fc[_0x4b2b2c(0x818)];if(_0x1b94f8===_0x4b2b2c(0x809))return _0x32d8fc[_0x4b2b2c(0x689)];if(VisuMZ[_0x4b2b2c(0x7b3)][_0x4b2b2c(0x893)][_0x1b94f8])return VisuMZ[_0x4b2b2c(0x7b3)]['CustomParamNames'][_0x1b94f8];return'';},TextManager['getInputButtonString']=function(_0x43d072){const _0x1bac96=_0x39290f;if(_0x43d072===_0x1bac96(0x16e))_0x43d072=_0x1bac96(0x354);let _0x5a07f5=[];for(let _0x1d6343 in Input['keyMapper']){_0x1d6343=Number(_0x1d6343);if(_0x1d6343>=0x60&&_0x1d6343<=0x69)continue;if([0x12,0x20][_0x1bac96(0x6d3)](_0x1d6343))continue;_0x43d072===Input['keyMapper'][_0x1d6343]&&_0x5a07f5[_0x1bac96(0x6a2)](_0x1d6343);}for(let _0x3a3138=0x0;_0x3a3138<_0x5a07f5['length'];_0x3a3138++){_0x5a07f5[_0x3a3138]=TextManager[_0x1bac96(0x4a3)][_0x5a07f5[_0x3a3138]];}return this[_0x1bac96(0x4bd)](_0x5a07f5);},TextManager[_0x39290f(0x4bd)]=function(_0x3e41bc){const _0x26bf54=_0x39290f,_0x4f04da=VisuMZ[_0x26bf54(0x7b3)][_0x26bf54(0x1ac)][_0x26bf54(0x8bf)],_0x6a660a=_0x4f04da[_0x26bf54(0x1d0)],_0x350c35=_0x3e41bc[_0x26bf54(0x831)](),_0x139f19=_0x26bf54(0x1cc)[_0x26bf54(0x8ca)](_0x350c35);return _0x4f04da[_0x139f19]?_0x4f04da[_0x139f19]:_0x6a660a[_0x26bf54(0x8ca)](_0x350c35);},TextManager[_0x39290f(0x234)]=function(_0x2c59b9,_0x85b910){const _0x5a70c0=_0x39290f,_0x5cda19=VisuMZ[_0x5a70c0(0x7b3)][_0x5a70c0(0x1ac)][_0x5a70c0(0x8bf)],_0x64393c=_0x5cda19['MultiKeyFmt'],_0xc13d46=this[_0x5a70c0(0x483)](_0x2c59b9),_0x107ab4=this[_0x5a70c0(0x483)](_0x85b910);return _0x64393c[_0x5a70c0(0x8ca)](_0xc13d46,_0x107ab4);},VisuMZ[_0x39290f(0x7b3)][_0x39290f(0x7d0)]=ColorManager[_0x39290f(0x389)],ColorManager[_0x39290f(0x389)]=function(){const _0xde8c23=_0x39290f;VisuMZ[_0xde8c23(0x7b3)]['ColorManager_loadWindowskin'][_0xde8c23(0x592)](this),this[_0xde8c23(0x383)]=this['_colorCache']||{};},ColorManager[_0x39290f(0x4c8)]=function(_0x24c49b,_0x4ba6ee){const _0x1fd35a=_0x39290f;_0x4ba6ee=String(_0x4ba6ee),this[_0x1fd35a(0x383)]=this[_0x1fd35a(0x383)]||{};if(_0x4ba6ee['match'](/#(.*)/i))this[_0x1fd35a(0x383)][_0x24c49b]=_0x1fd35a(0x59a)['format'](String(RegExp['$1']));else{if(_0x1fd35a(0x8c4)===_0x1fd35a(0x8c4))this[_0x1fd35a(0x383)][_0x24c49b]=this[_0x1fd35a(0x20a)](Number(_0x4ba6ee));else{const _0x2f01d1=this['getCombinedScrollingText']();return _0x2f01d1[_0x1fd35a(0x5cb)](/\/\/[ ]SCRIPT[ ]CALL/i)?this[_0x1fd35a(0x27e)](_0x2f01d1):_0x243dff[_0x1fd35a(0x7b3)]['Game_Interpreter_command105']['call'](this,_0x27ac98);}}return this['_colorCache'][_0x24c49b];},ColorManager[_0x39290f(0x769)]=function(_0x1a8a80){const _0x55205f=_0x39290f;_0x1a8a80=String(_0x1a8a80);if(_0x1a8a80[_0x55205f(0x5cb)](/#(.*)/i))return _0x55205f(0x59a)[_0x55205f(0x8ca)](String(RegExp['$1']));else{if(_0x55205f(0x12f)!==_0x55205f(0x7a9))return this['textColor'](Number(_0x1a8a80));else this['repositionCancelButtonSideButtonLayout']();}},ColorManager[_0x39290f(0x589)]=function(){this['_colorCache']={};},ColorManager[_0x39290f(0x34a)]=function(){const _0x4383b2=_0x39290f,_0x1fd670=_0x4383b2(0x585);this[_0x4383b2(0x383)]=this[_0x4383b2(0x383)]||{};if(this[_0x4383b2(0x383)][_0x1fd670])return this[_0x4383b2(0x383)][_0x1fd670];const _0x30a5bd=VisuMZ[_0x4383b2(0x7b3)][_0x4383b2(0x1ac)][_0x4383b2(0x5d0)][_0x4383b2(0x42f)];return this[_0x4383b2(0x4c8)](_0x1fd670,_0x30a5bd);},ColorManager[_0x39290f(0x43a)]=function(){const _0x34e43a=_0x39290f,_0x3fbb62=_0x34e43a(0x5a9);this[_0x34e43a(0x383)]=this[_0x34e43a(0x383)]||{};if(this[_0x34e43a(0x383)][_0x3fbb62])return this[_0x34e43a(0x383)][_0x3fbb62];const _0x2e7bb1=VisuMZ[_0x34e43a(0x7b3)][_0x34e43a(0x1ac)][_0x34e43a(0x5d0)]['ColorSystem'];return this[_0x34e43a(0x4c8)](_0x3fbb62,_0x2e7bb1);},ColorManager['crisisColor']=function(){const _0x40a95f=_0x39290f,_0x406024=_0x40a95f(0x5a6);this[_0x40a95f(0x383)]=this[_0x40a95f(0x383)]||{};if(this[_0x40a95f(0x383)][_0x406024])return this[_0x40a95f(0x383)][_0x406024];const _0x87883d=VisuMZ[_0x40a95f(0x7b3)][_0x40a95f(0x1ac)][_0x40a95f(0x5d0)][_0x40a95f(0x4e8)];return this[_0x40a95f(0x4c8)](_0x406024,_0x87883d);},ColorManager[_0x39290f(0x22a)]=function(){const _0x5b6ce8=_0x39290f,_0x4a9f74=_0x5b6ce8(0x63b);this['_colorCache']=this[_0x5b6ce8(0x383)]||{};if(this[_0x5b6ce8(0x383)][_0x4a9f74])return this[_0x5b6ce8(0x383)][_0x4a9f74];const _0xf117c6=VisuMZ[_0x5b6ce8(0x7b3)][_0x5b6ce8(0x1ac)][_0x5b6ce8(0x5d0)]['ColorDeath'];return this[_0x5b6ce8(0x4c8)](_0x4a9f74,_0xf117c6);},ColorManager[_0x39290f(0x2ff)]=function(){const _0x1f18fc=_0x39290f,_0x5900b1='_stored_gaugeBackColor';this[_0x1f18fc(0x383)]=this[_0x1f18fc(0x383)]||{};if(this[_0x1f18fc(0x383)][_0x5900b1])return this[_0x1f18fc(0x383)][_0x5900b1];const _0x4e69ff=VisuMZ['CoreEngine'][_0x1f18fc(0x1ac)][_0x1f18fc(0x5d0)]['ColorGaugeBack'];return this[_0x1f18fc(0x4c8)](_0x5900b1,_0x4e69ff);},ColorManager[_0x39290f(0x304)]=function(){const _0x1e276a=_0x39290f,_0x3ac44d=_0x1e276a(0x155);this[_0x1e276a(0x383)]=this[_0x1e276a(0x383)]||{};if(this['_colorCache'][_0x3ac44d])return this[_0x1e276a(0x383)][_0x3ac44d];const _0x107cbd=VisuMZ[_0x1e276a(0x7b3)][_0x1e276a(0x1ac)][_0x1e276a(0x5d0)][_0x1e276a(0x80d)];return this['getColorDataFromPluginParameters'](_0x3ac44d,_0x107cbd);},ColorManager[_0x39290f(0x7ba)]=function(){const _0x49cdb7=_0x39290f,_0x350a89=_0x49cdb7(0x2ac);this['_colorCache']=this[_0x49cdb7(0x383)]||{};if(this[_0x49cdb7(0x383)][_0x350a89])return this[_0x49cdb7(0x383)][_0x350a89];const _0x1fcc0a=VisuMZ['CoreEngine']['Settings'][_0x49cdb7(0x5d0)][_0x49cdb7(0x6f6)];return this[_0x49cdb7(0x4c8)](_0x350a89,_0x1fcc0a);},ColorManager[_0x39290f(0x7da)]=function(){const _0x503e69=_0x39290f,_0x2dde16='_stored_mpGaugeColor1';this[_0x503e69(0x383)]=this['_colorCache']||{};if(this[_0x503e69(0x383)][_0x2dde16])return this[_0x503e69(0x383)][_0x2dde16];const _0x3f001e=VisuMZ[_0x503e69(0x7b3)]['Settings'][_0x503e69(0x5d0)][_0x503e69(0x5b6)];return this[_0x503e69(0x4c8)](_0x2dde16,_0x3f001e);},ColorManager[_0x39290f(0x811)]=function(){const _0x1561fd=_0x39290f,_0x5a8dc9=_0x1561fd(0x860);this['_colorCache']=this[_0x1561fd(0x383)]||{};if(this[_0x1561fd(0x383)][_0x5a8dc9])return this[_0x1561fd(0x383)][_0x5a8dc9];const _0x9e3c4d=VisuMZ[_0x1561fd(0x7b3)][_0x1561fd(0x1ac)]['Color'][_0x1561fd(0x782)];return this[_0x1561fd(0x4c8)](_0x5a8dc9,_0x9e3c4d);},ColorManager[_0x39290f(0x448)]=function(){const _0xf56b13=_0x39290f,_0x33bfb3=_0xf56b13(0x2ec);this[_0xf56b13(0x383)]=this['_colorCache']||{};if(this[_0xf56b13(0x383)][_0x33bfb3])return this['_colorCache'][_0x33bfb3];const _0x4906a7=VisuMZ['CoreEngine'][_0xf56b13(0x1ac)][_0xf56b13(0x5d0)][_0xf56b13(0x8c5)];return this[_0xf56b13(0x4c8)](_0x33bfb3,_0x4906a7);},ColorManager[_0x39290f(0x75d)]=function(){const _0x5ceb51=_0x39290f,_0x3ec567=_0x5ceb51(0x1f3);this[_0x5ceb51(0x383)]=this[_0x5ceb51(0x383)]||{};if(this[_0x5ceb51(0x383)][_0x3ec567])return this[_0x5ceb51(0x383)][_0x3ec567];const _0x44fa88=VisuMZ[_0x5ceb51(0x7b3)][_0x5ceb51(0x1ac)][_0x5ceb51(0x5d0)][_0x5ceb51(0x5bb)];return this[_0x5ceb51(0x4c8)](_0x3ec567,_0x44fa88);},ColorManager[_0x39290f(0x5b4)]=function(){const _0x3cd932=_0x39290f,_0xcc6f31=_0x3cd932(0x1db);this['_colorCache']=this[_0x3cd932(0x383)]||{};if(this[_0x3cd932(0x383)][_0xcc6f31])return this['_colorCache'][_0xcc6f31];const _0xbabceb=VisuMZ[_0x3cd932(0x7b3)][_0x3cd932(0x1ac)]['Color']['ColorPowerDown'];return this[_0x3cd932(0x4c8)](_0xcc6f31,_0xbabceb);},ColorManager[_0x39290f(0x4fc)]=function(){const _0x1acd5a=_0x39290f,_0x4e30ad=_0x1acd5a(0x6e4);this['_colorCache']=this[_0x1acd5a(0x383)]||{};if(this['_colorCache'][_0x4e30ad])return this[_0x1acd5a(0x383)][_0x4e30ad];const _0x193abf=VisuMZ[_0x1acd5a(0x7b3)][_0x1acd5a(0x1ac)][_0x1acd5a(0x5d0)]['ColorCTGauge1'];return this[_0x1acd5a(0x4c8)](_0x4e30ad,_0x193abf);},ColorManager[_0x39290f(0x177)]=function(){const _0x3f3eec=_0x39290f,_0x38565d=_0x3f3eec(0x5c7);this[_0x3f3eec(0x383)]=this[_0x3f3eec(0x383)]||{};if(this['_colorCache'][_0x38565d])return this[_0x3f3eec(0x383)][_0x38565d];const _0x426bab=VisuMZ['CoreEngine'][_0x3f3eec(0x1ac)][_0x3f3eec(0x5d0)][_0x3f3eec(0x4d2)];return this['getColorDataFromPluginParameters'](_0x38565d,_0x426bab);},ColorManager[_0x39290f(0x7ef)]=function(){const _0x36c218=_0x39290f,_0x24cf56=_0x36c218(0x7f5);this[_0x36c218(0x383)]=this[_0x36c218(0x383)]||{};if(this['_colorCache'][_0x24cf56])return this[_0x36c218(0x383)][_0x24cf56];const _0x2076e1=VisuMZ[_0x36c218(0x7b3)][_0x36c218(0x1ac)][_0x36c218(0x5d0)][_0x36c218(0x368)];return this[_0x36c218(0x4c8)](_0x24cf56,_0x2076e1);},ColorManager[_0x39290f(0x520)]=function(){const _0x5eef04=_0x39290f,_0x2ef008=_0x5eef04(0x1b5);this['_colorCache']=this['_colorCache']||{};if(this[_0x5eef04(0x383)][_0x2ef008])return this[_0x5eef04(0x383)][_0x2ef008];const _0x560762=VisuMZ['CoreEngine'][_0x5eef04(0x1ac)][_0x5eef04(0x5d0)][_0x5eef04(0x8ed)];return this['getColorDataFromPluginParameters'](_0x2ef008,_0x560762);},ColorManager[_0x39290f(0x844)]=function(){const _0x4996dd=_0x39290f,_0x47220d='_stored_tpCostColor';this[_0x4996dd(0x383)]=this[_0x4996dd(0x383)]||{};if(this['_colorCache'][_0x47220d])return this[_0x4996dd(0x383)][_0x47220d];const _0x10fa0b=VisuMZ[_0x4996dd(0x7b3)]['Settings'][_0x4996dd(0x5d0)]['ColorTPCost'];return this[_0x4996dd(0x4c8)](_0x47220d,_0x10fa0b);},ColorManager[_0x39290f(0x512)]=function(){const _0x46dbb7=_0x39290f,_0x4636c3='_stored_pendingColor';this[_0x46dbb7(0x383)]=this['_colorCache']||{};if(this[_0x46dbb7(0x383)][_0x4636c3])return this[_0x46dbb7(0x383)][_0x4636c3];const _0x1e28f7=VisuMZ['CoreEngine'][_0x46dbb7(0x1ac)][_0x46dbb7(0x5d0)][_0x46dbb7(0x332)];return this[_0x46dbb7(0x4c8)](_0x4636c3,_0x1e28f7);},ColorManager['expGaugeColor1']=function(){const _0x551e08=_0x39290f,_0x5568b4=_0x551e08(0x4aa);this[_0x551e08(0x383)]=this[_0x551e08(0x383)]||{};if(this[_0x551e08(0x383)][_0x5568b4])return this[_0x551e08(0x383)][_0x5568b4];const _0x328a3b=VisuMZ[_0x551e08(0x7b3)][_0x551e08(0x1ac)][_0x551e08(0x5d0)][_0x551e08(0x482)];return this[_0x551e08(0x4c8)](_0x5568b4,_0x328a3b);},ColorManager[_0x39290f(0x2eb)]=function(){const _0x15c847=_0x39290f,_0x48fd5d=_0x15c847(0x5e6);this[_0x15c847(0x383)]=this[_0x15c847(0x383)]||{};if(this[_0x15c847(0x383)][_0x48fd5d])return this[_0x15c847(0x383)][_0x48fd5d];const _0x456389=VisuMZ[_0x15c847(0x7b3)][_0x15c847(0x1ac)]['Color'][_0x15c847(0x337)];return this[_0x15c847(0x4c8)](_0x48fd5d,_0x456389);},ColorManager[_0x39290f(0x8bb)]=function(){const _0x58ae7=_0x39290f,_0x2ac075=_0x58ae7(0x346);this[_0x58ae7(0x383)]=this[_0x58ae7(0x383)]||{};if(this[_0x58ae7(0x383)][_0x2ac075])return this['_colorCache'][_0x2ac075];const _0x984cfe=VisuMZ['CoreEngine'][_0x58ae7(0x1ac)][_0x58ae7(0x5d0)]['ColorMaxLvGauge1'];return this[_0x58ae7(0x4c8)](_0x2ac075,_0x984cfe);},ColorManager[_0x39290f(0x4c0)]=function(){const _0x8202ae=_0x39290f,_0x4cffcc=_0x8202ae(0x744);this[_0x8202ae(0x383)]=this[_0x8202ae(0x383)]||{};if(this[_0x8202ae(0x383)][_0x4cffcc])return this[_0x8202ae(0x383)][_0x4cffcc];const _0x15bccc=VisuMZ[_0x8202ae(0x7b3)]['Settings'][_0x8202ae(0x5d0)][_0x8202ae(0x519)];return this[_0x8202ae(0x4c8)](_0x4cffcc,_0x15bccc);},ColorManager[_0x39290f(0x7e8)]=function(_0x54c2e0){const _0x2bdb78=_0x39290f;return VisuMZ['CoreEngine'][_0x2bdb78(0x1ac)]['Color'][_0x2bdb78(0x3c1)][_0x2bdb78(0x592)](this,_0x54c2e0);},ColorManager['mpColor']=function(_0x19d524){const _0x4fe275=_0x39290f;return VisuMZ['CoreEngine'][_0x4fe275(0x1ac)]['Color']['ActorMPColor']['call'](this,_0x19d524);},ColorManager[_0x39290f(0x6aa)]=function(_0x31ea49){const _0x210e08=_0x39290f;return VisuMZ[_0x210e08(0x7b3)][_0x210e08(0x1ac)][_0x210e08(0x5d0)][_0x210e08(0x1f8)][_0x210e08(0x592)](this,_0x31ea49);},ColorManager['paramchangeTextColor']=function(_0x39eeaa){const _0x1b5268=_0x39290f;return VisuMZ['CoreEngine'][_0x1b5268(0x1ac)][_0x1b5268(0x5d0)][_0x1b5268(0x8e6)][_0x1b5268(0x592)](this,_0x39eeaa);},ColorManager[_0x39290f(0x16f)]=function(_0x5f3998){const _0x145a1f=_0x39290f;return VisuMZ[_0x145a1f(0x7b3)][_0x145a1f(0x1ac)][_0x145a1f(0x5d0)][_0x145a1f(0x23d)][_0x145a1f(0x592)](this,_0x5f3998);},ColorManager['outlineColor']=function(){const _0x36a961=_0x39290f;return VisuMZ[_0x36a961(0x7b3)][_0x36a961(0x1ac)][_0x36a961(0x5d0)][_0x36a961(0x329)];},ColorManager[_0x39290f(0x698)]=function(){const _0x18cff9=_0x39290f;return VisuMZ[_0x18cff9(0x7b3)]['Settings'][_0x18cff9(0x5d0)]['OutlineColorDmg']||_0x18cff9(0x624);},ColorManager[_0x39290f(0x192)]=function(){const _0x8c3e5d=_0x39290f;return VisuMZ[_0x8c3e5d(0x7b3)]['Settings'][_0x8c3e5d(0x5d0)][_0x8c3e5d(0x7fe)]||'rgba(0,\x200,\x200,\x201.0)';},ColorManager[_0x39290f(0x795)]=function(){const _0x3d950b=_0x39290f;return VisuMZ[_0x3d950b(0x7b3)][_0x3d950b(0x1ac)]['Color'][_0x3d950b(0x2cc)];},ColorManager[_0x39290f(0x509)]=function(){const _0x10ebd0=_0x39290f;return VisuMZ['CoreEngine'][_0x10ebd0(0x1ac)][_0x10ebd0(0x5d0)]['DimColor2'];},ColorManager[_0x39290f(0x70e)]=function(){const _0x20168b=_0x39290f;return VisuMZ[_0x20168b(0x7b3)][_0x20168b(0x1ac)][_0x20168b(0x5d0)]['ItemBackColor1'];},ColorManager[_0x39290f(0x253)]=function(){const _0x5059a6=_0x39290f;return VisuMZ[_0x5059a6(0x7b3)][_0x5059a6(0x1ac)][_0x5059a6(0x5d0)]['ItemBackColor2'];},SceneManager[_0x39290f(0x31a)]=[],SceneManager[_0x39290f(0x85d)]=function(){const _0x57749b=_0x39290f;return this['_scene']&&this['_scene'][_0x57749b(0x76b)]===Scene_Battle;},SceneManager['isSceneMap']=function(){const _0x455e11=_0x39290f;return this[_0x455e11(0x4eb)]&&this[_0x455e11(0x4eb)][_0x455e11(0x76b)]===Scene_Map;},SceneManager[_0x39290f(0x68d)]=function(){return this['_scene']&&this['_scene']instanceof Scene_Map;},VisuMZ[_0x39290f(0x7b3)][_0x39290f(0x2ae)]=SceneManager[_0x39290f(0x796)],SceneManager['initialize']=function(){const _0x4c0c0f=_0x39290f;VisuMZ[_0x4c0c0f(0x7b3)][_0x4c0c0f(0x2ae)][_0x4c0c0f(0x592)](this),this['initVisuMZCoreEngine']();},VisuMZ[_0x39290f(0x7b3)][_0x39290f(0x62a)]=SceneManager[_0x39290f(0x83a)],SceneManager[_0x39290f(0x83a)]=function(_0x51d695){const _0x4f0942=_0x39290f;if($gameTemp)this[_0x4f0942(0x877)](_0x51d695);VisuMZ[_0x4f0942(0x7b3)][_0x4f0942(0x62a)][_0x4f0942(0x592)](this,_0x51d695);},SceneManager['onKeyDownKeysF6F7']=function(_0xfa3285){const _0x354d98=_0x39290f;if(!_0xfa3285['ctrlKey']&&!_0xfa3285[_0x354d98(0x276)])switch(_0xfa3285['keyCode']){case 0x54:this['playTestCtrlT']();break;case 0x75:this[_0x354d98(0x3c8)]();break;case 0x76:if(Input[_0x354d98(0x71f)](_0x354d98(0x596))||Input[_0x354d98(0x71f)]('ctrl'))return;this[_0x354d98(0x38e)]();break;}},SceneManager[_0x39290f(0x3c8)]=function(){const _0x27688c=_0x39290f;if($gameTemp[_0x27688c(0x499)]()&&VisuMZ[_0x27688c(0x7b3)][_0x27688c(0x1ac)]['QoL'][_0x27688c(0x73b)]){if(_0x27688c(0x895)==='lJclU'){ConfigManager[_0x27688c(0x470)]!==0x0?(ConfigManager[_0x27688c(0x20e)]=0x0,ConfigManager[_0x27688c(0x54a)]=0x0,ConfigManager[_0x27688c(0x39a)]=0x0,ConfigManager[_0x27688c(0x470)]=0x0):(ConfigManager[_0x27688c(0x20e)]=0x64,ConfigManager[_0x27688c(0x54a)]=0x64,ConfigManager['meVolume']=0x64,ConfigManager['seVolume']=0x64);ConfigManager[_0x27688c(0x242)]();if(this[_0x27688c(0x4eb)]['constructor']===Scene_Options){if(this[_0x27688c(0x4eb)][_0x27688c(0x56d)])this[_0x27688c(0x4eb)][_0x27688c(0x56d)]['refresh']();if(this['_scene'][_0x27688c(0x614)])this['_scene'][_0x27688c(0x614)][_0x27688c(0x6fe)]();}}else return this['contents'][_0x27688c(0x515)](_0x43bb06);}},SceneManager[_0x39290f(0x38e)]=function(){const _0x5222ab=_0x39290f;if($gameTemp['isPlaytest']()&&VisuMZ[_0x5222ab(0x7b3)][_0x5222ab(0x1ac)][_0x5222ab(0x646)]['F7key']){if('FdWLS'!=='FdWLS'){const _0x56e2bd=this[_0x5222ab(0x1f5)]();this[_0x5222ab(0x5b8)](_0x38095d[_0x5222ab(0x43a)]());const _0x4f452e=_0x5ab36e[_0x5222ab(0x7b3)][_0x5222ab(0x1ac)]['UI']['ParamArrow'];this[_0x5222ab(0x218)](_0x4f452e,_0x4e9f5d,_0x76edc0,_0x56e2bd,'center');}else $gameTemp[_0x5222ab(0x664)]=!$gameTemp[_0x5222ab(0x664)];}},SceneManager['playTestCtrlT']=function(){const _0x101a5b=_0x39290f;if(!$gameTemp[_0x101a5b(0x499)]())return;if(!SceneManager[_0x101a5b(0x85d)]())return;for(const _0x57cf65 of $gameParty[_0x101a5b(0x49a)]()){if(_0x101a5b(0x4d5)===_0x101a5b(0x4a4)){_0x4a2184[_0x101a5b(0x7b3)][_0x101a5b(0x63f)]['call'](this,_0x2e51eb);const _0x58cd7f=_0x458831[_0x101a5b(0x62b)];if(_0x58cd7f[_0x101a5b(0x5cb)](/<MAX LEVEL:[ ](\d+)>/i)){_0x95112f[_0x101a5b(0x8d9)]=_0x356f99(_0x3c0063['$1']);if(_0x2fba4d['maxLevel']===0x0)_0x234eca[_0x101a5b(0x8d9)]=_0x2d0d03[_0x101a5b(0x58f)];}_0x58cd7f[_0x101a5b(0x5cb)](/<INITIAL LEVEL:[ ](\d+)>/i)&&(_0x254852[_0x101a5b(0x5c2)]=_0x6270e9[_0x101a5b(0x201)](_0x39228b(_0x5f238f['$1']),_0xe5a07c[_0x101a5b(0x8d9)]));}else{if(!_0x57cf65)continue;_0x57cf65[_0x101a5b(0x4af)](_0x57cf65[_0x101a5b(0x360)]());}}},SceneManager[_0x39290f(0x746)]=function(){const _0x285066=_0x39290f;this[_0x285066(0x343)]=![],this[_0x285066(0x604)]=!VisuMZ['CoreEngine'][_0x285066(0x1ac)]['UI'][_0x285066(0x119)];},SceneManager[_0x39290f(0x140)]=function(_0x498321){const _0x4fc638=_0x39290f;if(VisuMZ['CoreEngine'][_0x4fc638(0x1ac)]['UI'][_0x4fc638(0x558)]){if(_0x4fc638(0x1d2)===_0x4fc638(0x1d2))this[_0x4fc638(0x343)]=_0x498321;else return 0x0;}},SceneManager[_0x39290f(0x505)]=function(){return this['_sideButtonLayout'];},SceneManager[_0x39290f(0x244)]=function(){const _0x6e1952=_0x39290f;return this[_0x6e1952(0x604)];},SceneManager[_0x39290f(0x680)]=function(){const _0x196c81=_0x39290f;return this[_0x196c81(0x244)]()||this[_0x196c81(0x505)]();},VisuMZ[_0x39290f(0x7b3)][_0x39290f(0x347)]=SceneManager['isGameActive'],SceneManager[_0x39290f(0x553)]=function(){const _0xd56d5b=_0x39290f;if(VisuMZ[_0xd56d5b(0x7b3)]['Settings'][_0xd56d5b(0x646)][_0xd56d5b(0x8ae)]){if(_0xd56d5b(0x1dd)!=='jZKIU')return VisuMZ['CoreEngine'][_0xd56d5b(0x347)]['call'](this);else _0x180621[_0xd56d5b(0x58e)]=_0x33d154[_0xd56d5b(0x886)](_0x1fbe73(_0x580e8['$1']),0x1);}else return!![];},SceneManager[_0x39290f(0x708)]=function(_0xefd4f9){const _0x2a4b16=_0x39290f;if(_0xefd4f9 instanceof Error)this[_0x2a4b16(0x75a)](_0xefd4f9);else _0xefd4f9 instanceof Array&&_0xefd4f9[0x0]===_0x2a4b16(0x8b8)?this[_0x2a4b16(0x30f)](_0xefd4f9):'IixLj'!=='vfzYb'?this[_0x2a4b16(0x3ca)](_0xefd4f9):(_0x1536f9[_0x2a4b16(0x24b)](_0x2a4b16(0x181)),_0x335f59[_0x2a4b16(0x24b)](_0x2b0015));this[_0x2a4b16(0x6ac)]();},VisuMZ[_0x39290f(0x7b3)][_0x39290f(0x43c)]=BattleManager['processEscape'],BattleManager[_0x39290f(0x857)]=function(){const _0x6fe21b=_0x39290f;if(VisuMZ[_0x6fe21b(0x7b3)][_0x6fe21b(0x1ac)][_0x6fe21b(0x646)][_0x6fe21b(0x2c7)])this[_0x6fe21b(0x6db)]();else return VisuMZ[_0x6fe21b(0x7b3)][_0x6fe21b(0x43c)][_0x6fe21b(0x592)](this);},BattleManager[_0x39290f(0x6db)]=function(){const _0x14b5d2=_0x39290f;return $gameParty[_0x14b5d2(0x355)](),SoundManager[_0x14b5d2(0x405)](),this['onEscapeSuccess'](),!![];},BattleManager[_0x39290f(0x29b)]=function(){const _0x1d0054=_0x39290f;return $gameSystem[_0x1d0054(0x27f)]()>=0x1;},BattleManager[_0x39290f(0x127)]=function(){const _0x8b7f2d=_0x39290f;return $gameSystem[_0x8b7f2d(0x27f)]()===0x1;},VisuMZ[_0x39290f(0x7b3)]['Game_Temp_initialize']=Game_Temp[_0x39290f(0x24d)][_0x39290f(0x796)],Game_Temp[_0x39290f(0x24d)][_0x39290f(0x796)]=function(){const _0x5ad49a=_0x39290f;VisuMZ[_0x5ad49a(0x7b3)][_0x5ad49a(0x2df)]['call'](this),this[_0x5ad49a(0x716)](),this[_0x5ad49a(0x38a)](),this[_0x5ad49a(0x3a0)]();},Game_Temp[_0x39290f(0x24d)]['forceOutOfPlaytest']=function(){const _0x4b4e30=_0x39290f;VisuMZ['CoreEngine']['Settings'][_0x4b4e30(0x646)][_0x4b4e30(0x374)]&&('qqZIH'===_0x4b4e30(0x8dc)?this[_0x4b4e30(0x312)]():this[_0x4b4e30(0x2b0)]=![]);},Game_Temp[_0x39290f(0x24d)]['setLastPluginCommandInterpreter']=function(_0x25ab11){const _0x5dc6c4=_0x39290f;this[_0x5dc6c4(0x23e)]=_0x25ab11;},Game_Temp[_0x39290f(0x24d)]['getLastPluginCommandInterpreter']=function(){const _0x3acc1f=_0x39290f;return this[_0x3acc1f(0x23e)];},Game_Temp[_0x39290f(0x24d)][_0x39290f(0x665)]=function(){const _0xda761f=_0x39290f;this[_0xda761f(0x4f3)]=undefined,this['_forcedBattleSys']=undefined;},Game_Temp['prototype']['applyForcedGameTroopSettingsCoreEngine']=function(_0x59d2ed){const _0x45326a=_0x39290f;$gameMap&&$dataMap&&$dataMap[_0x45326a(0x62b)]&&this[_0x45326a(0x69a)]($dataMap[_0x45326a(0x62b)]);const _0x5b0764=$dataTroops[_0x59d2ed];if(_0x5b0764){let _0x12327a=DataManager[_0x45326a(0x60a)](_0x5b0764['id']);this[_0x45326a(0x69a)](_0x12327a);}},Game_Temp[_0x39290f(0x24d)][_0x39290f(0x69a)]=function(_0x53a81a){const _0x44072c=_0x39290f;if(!_0x53a81a)return;if(_0x53a81a['match'](/<(?:FRONTVIEW|FRONT VIEW|FV)>/i))this['_forcedTroopView']='FV';else{if(_0x53a81a[_0x44072c(0x5cb)](/<(?:SIDEVIEW|SIDE VIEW|SV)>/i)){if(_0x44072c(0x792)!=='dxSYa'){if(_0xddf362)_0x15f653['ParseEnemyNotetags'](_0x425ddd);}else this['_forcedTroopView']='SV';}else{if(_0x53a81a[_0x44072c(0x5cb)](/<(?:BATTLEVIEW|BATTLE VIEW):[ ](.*)>/i)){if(_0x44072c(0x8a1)==='cdUGu'){const _0x556860=String(RegExp['$1']);if(_0x556860[_0x44072c(0x5cb)](/(?:FRONTVIEW|FRONT VIEW|FV)/i))this['_forcedTroopView']='FV';else{if(_0x556860['match'](/(?:SIDEVIEW|SIDE VIEW|SV)/i)){if(_0x44072c(0x7fb)==='DoEsM')this['_forcedTroopView']='SV';else return this['_tilemap']||this;}}}else return this['refresh']();}}}if(_0x53a81a[_0x44072c(0x5cb)](/<(?:DTB)>/i))this['_forcedBattleSys']=0x0;else{if(_0x53a81a[_0x44072c(0x5cb)](/<(?:TPB|ATB)[ ]ACTIVE>/i))this[_0x44072c(0x1ab)]=0x1;else{if(_0x53a81a['match'](/<(?:TPB|ATB)[ ]WAIT>/i)){if(_0x44072c(0x4f9)===_0x44072c(0x872))return 0x0;else this[_0x44072c(0x1ab)]=0x2;}else{if(_0x53a81a[_0x44072c(0x5cb)](/<(?:CTB)>/i))_0x44072c(0x6b6)!==_0x44072c(0x6a3)?Imported[_0x44072c(0x5c4)]&&(_0x44072c(0x4b3)===_0x44072c(0x883)?_0x51dce8=_0x2f219f[_0x44072c(0x7b3)][_0x44072c(0x866)]['call'](this):this[_0x44072c(0x1ab)]='CTB'):_0x349944[_0x44072c(0x7b3)][_0x44072c(0x156)][_0x44072c(0x592)](this);else{if(_0x53a81a['match'](/<(?:STB)>/i))Imported['VisuMZ_2_BattleSystemSTB']&&(this[_0x44072c(0x1ab)]=_0x44072c(0x2a0));else{if(_0x53a81a[_0x44072c(0x5cb)](/<(?:BTB)>/i))Imported[_0x44072c(0x648)]&&(this[_0x44072c(0x1ab)]=_0x44072c(0x429));else{if(_0x53a81a[_0x44072c(0x5cb)](/<(?:FTB)>/i))Imported[_0x44072c(0x309)]&&(_0x44072c(0x7bd)===_0x44072c(0x7bd)?this['_forcedBattleSys']=_0x44072c(0x741):(_0x3015a4[_0x44072c(0x7b3)]['Scene_Menu_create'][_0x44072c(0x592)](this),this[_0x44072c(0x132)]()));else{if(_0x53a81a[_0x44072c(0x5cb)](/<(?:OTB)>/i)){if(Imported[_0x44072c(0x863)]){if('RhZtb'!==_0x44072c(0x68a))this['_forcedBattleSys']=_0x44072c(0x51d);else{if(this['_mode']==='keyboard'&&!_0x2bb800['isArrowPressed']())return;if(_0x240b6e[_0x44072c(0x4c4)]())return;_0x50c587['CoreEngine']['Window_NameInput_cursorLeft'][_0x44072c(0x592)](this,_0x68376c),this[_0x44072c(0x40a)]('default');}}}else{if(_0x53a81a[_0x44072c(0x5cb)](/<(?:ETB)>/i))Imported['VisuMZ_2_BattleSystemETB']&&('Pxojp'!==_0x44072c(0x7ae)?this[_0x44072c(0x1ab)]=0x0:this[_0x44072c(0x1ab)]=_0x44072c(0x30e));else{if(_0x53a81a['match'](/<(?:PTB)>/i)){if('yGrse'!=='WeCYA'){if(Imported['VisuMZ_2_BattleSystemPTB']){if(_0x44072c(0x616)!==_0x44072c(0x6f1))this[_0x44072c(0x1ab)]=_0x44072c(0x7c6);else{var _0x296664=_0x1a8b50(_0x533c5c['$1']);_0x1fa98c*=_0x296664;}}}else _0xceffc8+=_0x49017e,_0x2becf3+=_0x236985,_0x137dc4+=_0x44072c(0x498)[_0x44072c(0x8ca)](_0x5c6189['id'],_0x476647[_0x44072c(0x8e0)]),_0x148a77+=_0x636fa1,_0x5872b5+=_0x1cd825,_0x46ccc2+=_0x2912e5,_0x3a519f+='〘Common\x20Event\x20%1:\x20%2〙\x20End'['format'](_0x512987['id'],_0x10cc4f[_0x44072c(0x8e0)]),_0x526324+=_0x4b5cf2;}else{if(_0x53a81a['match'](/<(?:BATTLEVIEW|BATTLE VIEW):[ ](.*)>/i)){if(_0x44072c(0x417)!=='SXuMC')return _0x55ba36=_0x43e563(_0x2134bf),this[_0x44072c(0x383)]=this[_0x44072c(0x383)]||{},_0x1823ca[_0x44072c(0x5cb)](/#(.*)/i)?this[_0x44072c(0x383)][_0x5e25e6]=_0x44072c(0x59a)[_0x44072c(0x8ca)](_0x45baf0(_0x3aa1ae['$1'])):this[_0x44072c(0x383)][_0x4e13f4]=this[_0x44072c(0x20a)](_0x2ddca2(_0x427b2f)),this[_0x44072c(0x383)][_0x1de38c];else{const _0x102fc6=String(RegExp['$1']);if(_0x102fc6[_0x44072c(0x5cb)](/DTB/i)){if(_0x44072c(0x449)!==_0x44072c(0x36d))this['_forcedBattleSys']=0x0;else{let _0x236952=this['_mode'];this[_0x44072c(0x6f4)]=_0x53f110,_0x236952!==this[_0x44072c(0x6f4)]&&(this[_0x44072c(0x6fe)](),_0xae15da[_0x44072c(0x443)](),this['_mode']===_0x44072c(0x6ae)?this[_0x44072c(0x77d)](0x0):this['select'](-0x1));}}else{if(_0x102fc6[_0x44072c(0x5cb)](/(?:TPB|ATB)[ ]ACTIVE/i)){if(_0x44072c(0x532)==='KGvHj')this[_0x44072c(0x1ab)]=0x1;else return 0x1;}else{if(_0x102fc6['match'](/(?:TPB|ATB)[ ]WAIT/i))this[_0x44072c(0x1ab)]=0x2;else{if(_0x102fc6[_0x44072c(0x5cb)](/CTB/i))Imported['VisuMZ_2_BattleSystemCTB']&&(this[_0x44072c(0x1ab)]=_0x44072c(0x6dd));else{if(_0x102fc6[_0x44072c(0x5cb)](/STB/i))Imported['VisuMZ_2_BattleSystemSTB']&&(this[_0x44072c(0x1ab)]='STB');else{if(_0x102fc6['match'](/BTB/i)){if(_0x44072c(0x84e)===_0x44072c(0x3d7))this[_0x44072c(0x301)]&&(_0xb9d8ac=_0x37f1ae[_0x44072c(0x74a)](_0x4395a7),_0x440e93['se']&&(_0x2bf0fc['se']['volume']=0x0)),_0x3f6d33[_0x44072c(0x7b3)]['Sprite_AnimationMV_processTimingData'][_0x44072c(0x592)](this,_0x3ca08d);else{if(Imported[_0x44072c(0x648)]){if(_0x44072c(0x432)==='wvdRS')return![];else this[_0x44072c(0x1ab)]=_0x44072c(0x429);}}}else{if(_0x102fc6[_0x44072c(0x5cb)](/FTB/i)){if(Imported[_0x44072c(0x309)]){if('pdLXR'===_0x44072c(0x21e)){if(_0x19ce03[_0x44072c(0x608)]())return _0x44072c(0x6ae);return _0x2a31d1['CoreEngine']['Settings'][_0x44072c(0x190)][_0x44072c(0x267)]||_0x44072c(0x3e2);}else this[_0x44072c(0x1ab)]=_0x44072c(0x741);}}else{if(_0x102fc6['match'](/OTB/i))Imported[_0x44072c(0x863)]&&(this['_forcedBattleSys']=_0x44072c(0x51d));else{if(_0x102fc6[_0x44072c(0x5cb)](/ETB/i)){if(Imported[_0x44072c(0x237)]){if(_0x44072c(0x2ee)!==_0x44072c(0x2ee))var _0x56decc=_0x55879a[_0x44072c(0x426)](_0x318c47*0x2,_0x44072c(0x416))*0.5;else this[_0x44072c(0x1ab)]=_0x44072c(0x30e);}}else{if(_0x102fc6['match'](/PTB/i)){if(_0x44072c(0x704)===_0x44072c(0x5f2)){var _0x34490a=_0x369e60('nw.gui')[_0x44072c(0x5dd)][_0x44072c(0x865)]();_0x4baad5[_0x44072c(0x39e)]();if(_0x2b1eb4)_0x2509ed(_0x34490a[_0x44072c(0x6ef)][_0x44072c(0x1df)](_0x34490a),0x190);}else Imported['VisuMZ_2_BattleSystemPTB']&&('MPTPG'===_0x44072c(0x3eb)?_0x1f0578[_0x44072c(0x1fc)]():this[_0x44072c(0x1ab)]=_0x44072c(0x7c6));}}}}}}}}}}}}}}}}}}}}}}},Game_Temp[_0x39290f(0x24d)][_0x39290f(0x38a)]=function(){const _0x52e742=_0x39290f;this[_0x52e742(0x371)]=[];},Game_Temp['prototype'][_0x39290f(0x679)]=function(_0x517b94,_0x2f3cb3,_0x46387e,_0x31f84a){const _0x3e28e8=_0x39290f;if(!this[_0x3e28e8(0x272)]())return;_0x46387e=_0x46387e||![],_0x31f84a=_0x31f84a||![];if($dataAnimations[_0x2f3cb3]){const _0x4132ea={'targets':_0x517b94,'animationId':_0x2f3cb3,'mirror':_0x46387e,'mute':_0x31f84a};this[_0x3e28e8(0x371)][_0x3e28e8(0x6a2)](_0x4132ea);for(const _0x19b870 of _0x517b94){if('aRRcj'!==_0x3e28e8(0x821))this['_buyWindow'][_0x3e28e8(0x537)](_0x4a1472['layoutSettings']['BuyBgType']);else{if(_0x19b870[_0x3e28e8(0x58d)]){if('BrlwO'==='RJjOZ'){if(_0x289b19[_0x3e28e8(0x8e7)])return;}else _0x19b870[_0x3e28e8(0x58d)]();}}}}},Game_Temp['prototype'][_0x39290f(0x272)]=function(){return!![];},Game_Temp[_0x39290f(0x24d)][_0x39290f(0x5d3)]=function(){const _0x1bf6ee=_0x39290f;return this[_0x1bf6ee(0x371)][_0x1bf6ee(0x596)]();},Game_Temp[_0x39290f(0x24d)][_0x39290f(0x3a0)]=function(){const _0x57f720=_0x39290f;this[_0x57f720(0x3fa)]=[];},Game_Temp[_0x39290f(0x24d)]['requestPointAnimation']=function(_0x442c8a,_0x3639e6,_0xba9d63,_0x1e2128,_0xd30d7e){const _0x4207b7=_0x39290f;if(!this[_0x4207b7(0x372)]())return;_0x1e2128=_0x1e2128||![],_0xd30d7e=_0xd30d7e||![];if($dataAnimations[_0xba9d63]){const _0x5abeb2={'x':_0x442c8a,'y':_0x3639e6,'animationId':_0xba9d63,'mirror':_0x1e2128,'mute':_0xd30d7e};this[_0x4207b7(0x3fa)][_0x4207b7(0x6a2)](_0x5abeb2);}},Game_Temp[_0x39290f(0x24d)][_0x39290f(0x372)]=function(){return!![];},Game_Temp[_0x39290f(0x24d)]['retrievePointAnimation']=function(){const _0x32e506=_0x39290f;return this['_pointAnimationQueue'][_0x32e506(0x596)]();},VisuMZ[_0x39290f(0x7b3)]['Game_System_initialize']=Game_System[_0x39290f(0x24d)]['initialize'],Game_System[_0x39290f(0x24d)][_0x39290f(0x796)]=function(){const _0xbd6d25=_0x39290f;VisuMZ[_0xbd6d25(0x7b3)][_0xbd6d25(0x2e7)][_0xbd6d25(0x592)](this),this[_0xbd6d25(0x2ef)]();},Game_System[_0x39290f(0x24d)][_0x39290f(0x2ef)]=function(){const _0x324649=_0x39290f;this['_CoreEngineSettings']={'SideView':$dataSystem[_0x324649(0x5ba)],'BattleSystem':this[_0x324649(0x5b9)](),'FontSize':$dataSystem[_0x324649(0x57e)][_0x324649(0x8b7)],'Padding':0xc};},Game_System[_0x39290f(0x24d)][_0x39290f(0x876)]=function(){const _0x4faa07=_0x39290f;if($gameTemp[_0x4faa07(0x4f3)]==='SV')return!![];else{if($gameTemp['_forcedTroopView']==='FV')return _0x4faa07(0x252)!=='TxXjI'?0x0:![];}if(this[_0x4faa07(0x25e)]===undefined)this[_0x4faa07(0x2ef)]();if(this[_0x4faa07(0x25e)][_0x4faa07(0x62c)]===undefined)this[_0x4faa07(0x2ef)]();return this[_0x4faa07(0x25e)]['SideView'];},Game_System['prototype'][_0x39290f(0x79a)]=function(_0x1a2481){const _0x8b3db4=_0x39290f;if(this[_0x8b3db4(0x25e)]===undefined)this[_0x8b3db4(0x2ef)]();if(this[_0x8b3db4(0x25e)][_0x8b3db4(0x62c)]===undefined)this[_0x8b3db4(0x2ef)]();this['_CoreEngineSettings'][_0x8b3db4(0x62c)]=_0x1a2481;},Game_System[_0x39290f(0x24d)][_0x39290f(0x52c)]=function(){const _0x2a60b1=_0x39290f;if(this[_0x2a60b1(0x25e)]===undefined)this[_0x2a60b1(0x2ef)]();this['_CoreEngineSettings']['BattleSystem']=this[_0x2a60b1(0x5b9)]();},Game_System['prototype'][_0x39290f(0x5b9)]=function(){const _0x540ec1=_0x39290f,_0x854204=(VisuMZ[_0x540ec1(0x7b3)][_0x540ec1(0x1ac)][_0x540ec1(0x2c3)]||_0x540ec1(0x633))[_0x540ec1(0x6ce)]()[_0x540ec1(0x4fb)]();return VisuMZ['CoreEngine']['CreateBattleSystemID'](_0x854204);},Game_System[_0x39290f(0x24d)][_0x39290f(0x27f)]=function(){const _0xf1f5f9=_0x39290f;if($gameTemp[_0xf1f5f9(0x1ab)]!==undefined){if(_0xf1f5f9(0x628)!==_0xf1f5f9(0x628))this['_spriteset'][_0xf1f5f9(0x6bb)](),this['_mapNameWindow'][_0xf1f5f9(0x7ab)](),this['_windowLayer'][_0xf1f5f9(0x557)]=![],_0x493047[_0xf1f5f9(0x742)]();else return $gameTemp[_0xf1f5f9(0x1ab)];}if(this[_0xf1f5f9(0x25e)]===undefined)this[_0xf1f5f9(0x2ef)]();if(this[_0xf1f5f9(0x25e)][_0xf1f5f9(0x2c3)]===undefined)this['resetBattleSystem']();return this[_0xf1f5f9(0x25e)][_0xf1f5f9(0x2c3)];},Game_System[_0x39290f(0x24d)][_0x39290f(0x33d)]=function(_0x108e08){const _0x50166f=_0x39290f;if(this[_0x50166f(0x25e)]===undefined)this[_0x50166f(0x2ef)]();if(this[_0x50166f(0x25e)][_0x50166f(0x2c3)]===undefined)this[_0x50166f(0x52c)]();this[_0x50166f(0x25e)][_0x50166f(0x2c3)]=_0x108e08;},Game_System[_0x39290f(0x24d)][_0x39290f(0x824)]=function(){const _0x3b8c5a=_0x39290f;if(this['_CoreEngineSettings']===undefined)this[_0x3b8c5a(0x2ef)]();if(this[_0x3b8c5a(0x25e)][_0x3b8c5a(0x706)]===undefined)this[_0x3b8c5a(0x2ef)]();return this[_0x3b8c5a(0x25e)]['FontSize'];},Game_System[_0x39290f(0x24d)][_0x39290f(0x828)]=function(_0x59d5a6){const _0x72d521=_0x39290f;if(this[_0x72d521(0x25e)]===undefined)this[_0x72d521(0x2ef)]();if(this[_0x72d521(0x25e)][_0x72d521(0x2e2)]===undefined)this[_0x72d521(0x2ef)]();this[_0x72d521(0x25e)]['FontSize']=_0x59d5a6;},Game_System[_0x39290f(0x24d)][_0x39290f(0x805)]=function(){const _0x53fa1b=_0x39290f;if(this[_0x53fa1b(0x25e)]===undefined)this[_0x53fa1b(0x2ef)]();if(this['_CoreEngineSettings'][_0x53fa1b(0x300)]===undefined)this[_0x53fa1b(0x2ef)]();return this[_0x53fa1b(0x25e)][_0x53fa1b(0x300)];},Game_System['prototype'][_0x39290f(0x220)]=function(_0x443cbf){const _0x22c727=_0x39290f;if(this['_CoreEngineSettings']===undefined)this[_0x22c727(0x2ef)]();if(this['_CoreEngineSettings'][_0x22c727(0x2e2)]===undefined)this[_0x22c727(0x2ef)]();this[_0x22c727(0x25e)][_0x22c727(0x300)]=_0x443cbf;},VisuMZ[_0x39290f(0x7b3)][_0x39290f(0x546)]=Game_Screen[_0x39290f(0x24d)][_0x39290f(0x796)],Game_Screen[_0x39290f(0x24d)][_0x39290f(0x796)]=function(){const _0x2c511a=_0x39290f;VisuMZ[_0x2c511a(0x7b3)][_0x2c511a(0x546)]['call'](this),this[_0x2c511a(0x1d9)]();},Game_Screen[_0x39290f(0x24d)][_0x39290f(0x1d9)]=function(){const _0x4b8298=_0x39290f,_0x1c0e1f=VisuMZ[_0x4b8298(0x7b3)][_0x4b8298(0x1ac)][_0x4b8298(0x691)];this[_0x4b8298(0x41a)]=_0x1c0e1f?.[_0x4b8298(0x544)]||'random';},Game_Screen[_0x39290f(0x24d)][_0x39290f(0x4c6)]=function(){const _0x19d62a=_0x39290f;if(this[_0x19d62a(0x41a)]===undefined)this[_0x19d62a(0x1d9)]();return this[_0x19d62a(0x41a)];},Game_Screen['prototype'][_0x39290f(0x600)]=function(_0xc97f75){const _0x5ca6ba=_0x39290f;if(this[_0x5ca6ba(0x41a)]===undefined)this['initCoreEngineScreenShake']();this['_coreEngineShakeStyle']=_0xc97f75[_0x5ca6ba(0x510)]()[_0x5ca6ba(0x4fb)]();},Game_Picture[_0x39290f(0x24d)][_0x39290f(0x319)]=function(){const _0x33480c=_0x39290f;if($gameParty[_0x33480c(0x565)]())return![];return this[_0x33480c(0x8e0)]()&&this[_0x33480c(0x8e0)]()[_0x33480c(0x580)](0x0)==='!';},VisuMZ[_0x39290f(0x7b3)][_0x39290f(0x122)]=Game_Picture[_0x39290f(0x24d)]['x'],Game_Picture[_0x39290f(0x24d)]['x']=function(){const _0x95e708=_0x39290f;if(this[_0x95e708(0x319)]()){if('VQocc'===_0x95e708(0x586))(this[_0x95e708(0x2b6)]!==_0x44338b||this[_0x95e708(0x6b2)]!==_0x254218)&&(this[_0x95e708(0x1ee)](_0x95e708(0x2b8)),this['_movementWholeDuration']=_0xef76d4),_0x3abfce[_0x95e708(0x7b3)][_0x95e708(0x1a8)]['call'](this,_0x5b3cca,_0x17b499,_0x14b7d0);else return this[_0x95e708(0x64a)]();}else return VisuMZ[_0x95e708(0x7b3)]['Game_Picture_x'][_0x95e708(0x592)](this);},Game_Picture['prototype'][_0x39290f(0x64a)]=function(){const _0x22dd95=_0x39290f,_0x44a9f5=$gameMap[_0x22dd95(0x356)]()*$gameMap[_0x22dd95(0x246)]();return this['_x']-_0x44a9f5;},VisuMZ[_0x39290f(0x7b3)]['Game_Picture_y']=Game_Picture[_0x39290f(0x24d)]['y'],Game_Picture[_0x39290f(0x24d)]['y']=function(){const _0x197cd2=_0x39290f;if(this[_0x197cd2(0x319)]()){if(_0x197cd2(0x85b)===_0x197cd2(0x85b))return this[_0x197cd2(0x34f)]();else this[_0x197cd2(0x40a)]('keyboard');}else{if('LMPST'!=='GwgYd')return VisuMZ[_0x197cd2(0x7b3)][_0x197cd2(0x899)][_0x197cd2(0x592)](this);else{if(this[_0x197cd2(0x197)]===_0x4eb977)this[_0x197cd2(0x460)]();return this['_hideTileShadows'];}}},Game_Picture[_0x39290f(0x24d)][_0x39290f(0x34f)]=function(){const _0x216225=_0x39290f,_0x17e4cf=$gameMap[_0x216225(0x1fd)]()*$gameMap[_0x216225(0x15d)]();return this['_y']-_0x17e4cf;},Game_Picture['prototype'][_0x39290f(0x17d)]=function(_0x182fdf){const _0x3c8127=_0x39290f;this[_0x3c8127(0x1a2)]=_0x182fdf;},VisuMZ[_0x39290f(0x7b3)][_0x39290f(0x139)]=Game_Picture['prototype'][_0x39290f(0x271)],Game_Picture[_0x39290f(0x24d)][_0x39290f(0x271)]=function(_0x29b4d7){const _0x4c3db4=_0x39290f;this[_0x4c3db4(0x1a2)]=this[_0x4c3db4(0x1a2)]||0x0;if([0x0,0x1,0x2,0x3][_0x4c3db4(0x6d3)](this['_coreEasingType'])){if(_0x4c3db4(0x733)!=='WApAp')return VisuMZ[_0x4c3db4(0x7b3)][_0x4c3db4(0x139)][_0x4c3db4(0x592)](this,_0x29b4d7);else _0x59e42f[_0x4c3db4(0x24b)]('Control\x20Variables\x20Script\x20Error'),_0x31f273[_0x4c3db4(0x24b)](_0x3b2bbd);}else{if(_0x4c3db4(0x683)!==_0x4c3db4(0x5e0))return VisuMZ['ApplyEasing'](_0x29b4d7,this[_0x4c3db4(0x1a2)]);else _0x5023ec[_0x4c3db4(0x7b3)]['Bitmap_resize'][_0x4c3db4(0x592)](this,_0x39155b,_0x1749dc),this['markCoreEngineModified']();}},VisuMZ['CoreEngine']['Game_Action_itemHit']=Game_Action['prototype']['itemHit'],Game_Action[_0x39290f(0x24d)][_0x39290f(0x233)]=function(_0x55e609){const _0x543bf9=_0x39290f;return VisuMZ['CoreEngine'][_0x543bf9(0x1ac)][_0x543bf9(0x646)][_0x543bf9(0x4b9)]?this[_0x543bf9(0x640)](_0x55e609):VisuMZ[_0x543bf9(0x7b3)]['Game_Action_itemHit']['call'](this,_0x55e609);},Game_Action[_0x39290f(0x24d)]['itemHitImprovedAccuracy']=function(_0x195dae){const _0x430e5f=_0x39290f,_0x2fc8c1=this['itemSuccessRate'](_0x195dae),_0x4b259d=this[_0x430e5f(0x18e)](_0x195dae),_0x1d98ba=this[_0x430e5f(0x45d)](_0x195dae);return _0x2fc8c1*(_0x4b259d-_0x1d98ba);},VisuMZ[_0x39290f(0x7b3)][_0x39290f(0x402)]=Game_Action[_0x39290f(0x24d)][_0x39290f(0x6dc)],Game_Action[_0x39290f(0x24d)][_0x39290f(0x6dc)]=function(_0x569b6b){const _0xeebc89=_0x39290f;return VisuMZ[_0xeebc89(0x7b3)][_0xeebc89(0x1ac)][_0xeebc89(0x646)][_0xeebc89(0x4b9)]?0x0:VisuMZ[_0xeebc89(0x7b3)][_0xeebc89(0x402)][_0xeebc89(0x592)](this,_0x569b6b);},Game_Action['prototype'][_0x39290f(0x531)]=function(_0x503562){return this['item']()['successRate']*0.01;},Game_Action[_0x39290f(0x24d)][_0x39290f(0x18e)]=function(_0x3b78c5){const _0x53bf25=_0x39290f;if(VisuMZ['CoreEngine'][_0x53bf25(0x1ac)][_0x53bf25(0x646)]['AccuracyBoost']&&this[_0x53bf25(0x887)]())return 0x1;if(this['isPhysical']()){if(_0x53bf25(0x88f)!==_0x53bf25(0x88f))this[_0x53bf25(0x56d)]&&this[_0x53bf25(0x56d)][_0x53bf25(0x537)](_0x10b969['layoutSettings']['OptionsBgType']);else return VisuMZ[_0x53bf25(0x7b3)][_0x53bf25(0x1ac)][_0x53bf25(0x646)]['AccuracyBoost']&&this['subject']()[_0x53bf25(0x29c)]()?this[_0x53bf25(0x64f)]()['hit']+0.05:this[_0x53bf25(0x64f)]()[_0x53bf25(0x1cf)];}else{if(_0x53bf25(0x4d7)===_0x53bf25(0x3d1)){if(_0x3484e7['isPlaytest']())_0x50f4d3[_0x53bf25(0x24b)](_0x58425d);}else return 0x1;}},Game_Action[_0x39290f(0x24d)][_0x39290f(0x45d)]=function(_0x242552){const _0x538844=_0x39290f;if(this['subject']()['isActor']()===_0x242552[_0x538844(0x29c)]())return 0x0;if(this[_0x538844(0x673)]())return VisuMZ[_0x538844(0x7b3)][_0x538844(0x1ac)][_0x538844(0x646)][_0x538844(0x2fb)]&&_0x242552['isEnemy']()?_0x242552[_0x538844(0x167)]-0.05:_0x242552[_0x538844(0x167)];else return this[_0x538844(0x5f3)]()?_0x242552[_0x538844(0x3d0)]:_0x538844(0x121)===_0x538844(0x121)?0x0:_0xc7091[_0x538844(0x7b3)][_0x538844(0x1ac)][_0x538844(0x79c)][_0x538844(0x30c)]['CommandRect'][_0x538844(0x592)](this);},VisuMZ[_0x39290f(0x7b3)]['Game_Action_updateLastTarget']=Game_Action[_0x39290f(0x24d)][_0x39290f(0x427)],Game_Action['prototype'][_0x39290f(0x427)]=function(_0x3e4db2){const _0x4f6e41=_0x39290f;VisuMZ[_0x4f6e41(0x7b3)]['Game_Action_updateLastTarget'][_0x4f6e41(0x592)](this,_0x3e4db2);if(VisuMZ[_0x4f6e41(0x7b3)][_0x4f6e41(0x1ac)][_0x4f6e41(0x646)][_0x4f6e41(0x4b9)])return;const _0x51642a=_0x3e4db2[_0x4f6e41(0x24c)]();if(_0x51642a[_0x4f6e41(0x8d2)]){if(_0x4f6e41(0x1a0)===_0x4f6e41(0x3ac)){const _0xb44188=_0x2f0aec['iconWidth'],_0x424cf2=_0x81b5ec[_0x4f6e41(0x34b)],_0x50e810=this[_0x4f6e41(0x629)][_0x4f6e41(0x5cb)](/SMOOTH/i);this[_0x4f6e41(0x28d)]=new _0x5e253f(_0xb44188,_0x424cf2);const _0x1f137c=_0x44365e[_0x4f6e41(0x530)](_0x4f6e41(0x79e)),_0x2ea13e=_0x244a66%0x10*_0xb44188,_0x281a21=_0x2b4c27[_0x4f6e41(0x27c)](_0x459840/0x10)*_0x424cf2;this[_0x4f6e41(0x28d)]['smooth']=_0x50e810,this[_0x4f6e41(0x28d)]['blt'](_0x1f137c,_0x2ea13e,_0x281a21,_0xb44188,_0x424cf2,0x0,0x0,_0xb44188,_0x424cf2);}else 0x1-this[_0x4f6e41(0x6dc)](_0x3e4db2)>this[_0x4f6e41(0x233)](_0x3e4db2)&&(_0x51642a[_0x4f6e41(0x8d2)]=![],_0x51642a['evaded']=!![]);}},VisuMZ[_0x39290f(0x7b3)]['Game_BattlerBase_initMembers']=Game_BattlerBase['prototype'][_0x39290f(0x538)],Game_BattlerBase[_0x39290f(0x24d)][_0x39290f(0x538)]=function(){const _0xa00ca5=_0x39290f;this['_cache']={},VisuMZ['CoreEngine'][_0xa00ca5(0x468)][_0xa00ca5(0x592)](this);},VisuMZ[_0x39290f(0x7b3)]['Game_BattlerBase_refresh']=Game_BattlerBase[_0x39290f(0x24d)][_0x39290f(0x6fe)],Game_BattlerBase[_0x39290f(0x24d)][_0x39290f(0x6fe)]=function(){const _0x364539=_0x39290f;this[_0x364539(0x76d)]={},VisuMZ[_0x364539(0x7b3)][_0x364539(0x4c5)]['call'](this);},Game_BattlerBase['prototype'][_0x39290f(0x848)]=function(_0x2a9d7f){const _0x33b547=_0x39290f;return this[_0x33b547(0x76d)]=this[_0x33b547(0x76d)]||{},this[_0x33b547(0x76d)][_0x2a9d7f]!==undefined;},Game_BattlerBase[_0x39290f(0x24d)][_0x39290f(0x82c)]=function(_0x2b9028){const _0x2abcd5=_0x39290f,_0xa4167=(_0x65971,_0x46074c)=>{const _0x49ece9=_0xcc41;if(!_0x46074c)return _0x65971;if(_0x46074c['note'][_0x49ece9(0x5cb)](VisuMZ['CoreEngine']['RegExp']['paramPlus'][_0x2b9028])){var _0x1e79b0=Number(RegExp['$1']);_0x65971+=_0x1e79b0;}if(_0x46074c['note']['match'](VisuMZ[_0x49ece9(0x7b3)][_0x49ece9(0x228)][_0x49ece9(0x1de)][_0x2b9028])){if('YUvai'!==_0x49ece9(0x321)){var _0x16121a=String(RegExp['$1']);try{_0x65971+=eval(_0x16121a);}catch(_0x30b6e0){if(_0x49ece9(0x656)!=='SBPOB'){if($gameTemp[_0x49ece9(0x499)]())console['log'](_0x30b6e0);}else return _0x376bc1['round'](_0x42a7dd[_0x49ece9(0x7b3)][_0x49ece9(0x7af)][_0x49ece9(0x592)](this,_0x410dc1));}}else _0x31cf43+=_0x5d1dd3;}return _0x65971;};return this[_0x2abcd5(0x529)]()[_0x2abcd5(0x223)](_0xa4167,this[_0x2abcd5(0x5f1)][_0x2b9028]);},Game_BattlerBase['prototype'][_0x39290f(0x298)]=function(_0xafb60b){const _0x179dda=_0x39290f;var _0x59f543=_0x179dda(0x133)+(this[_0x179dda(0x29c)]()?_0x179dda(0x37f):_0x179dda(0x55a))+_0x179dda(0x6b4)+_0xafb60b;if(this[_0x179dda(0x848)](_0x59f543))return this[_0x179dda(0x76d)][_0x59f543];this[_0x179dda(0x76d)][_0x59f543]=eval(VisuMZ[_0x179dda(0x7b3)][_0x179dda(0x1ac)][_0x179dda(0x390)][_0x59f543]);const _0x5f622=(_0x2b1864,_0x58197d)=>{const _0x3528af=_0x179dda;if(!_0x58197d)return _0x2b1864;if(_0x58197d[_0x3528af(0x62b)][_0x3528af(0x5cb)](VisuMZ[_0x3528af(0x7b3)][_0x3528af(0x228)]['paramMax'][_0xafb60b])){if('ZCSpI'==='uIrnu')return _0x4d462a[_0x3528af(0x7b3)][_0x3528af(0x1ac)]['Color'][_0x3528af(0x8e6)][_0x3528af(0x592)](this,_0x5bc0dd);else{var _0x308880=Number(RegExp['$1']);if(_0x308880===0x0)_0x308880=Number['MAX_SAFE_INTEGER'];_0x2b1864=Math['max'](_0x2b1864,_0x308880);}}if(_0x58197d['note']['match'](VisuMZ['CoreEngine']['RegExp']['paramMaxJS'][_0xafb60b])){if(_0x3528af(0x2fc)===_0x3528af(0x2fc)){var _0x46da00=String(RegExp['$1']);try{_0x2b1864=Math[_0x3528af(0x886)](_0x2b1864,Number(eval(_0x46da00)));}catch(_0x1f2320){if($gameTemp[_0x3528af(0x499)]())console[_0x3528af(0x24b)](_0x1f2320);}}else{try{_0x425396(_0x5345c8);}catch(_0x32f5ed){_0x24c684['isPlaytest']()&&(_0x8322a5['log'](_0x3528af(0x263)),_0x1ab71f[_0x3528af(0x24b)](_0x32f5ed));}return!![];}}return _0x2b1864;};if(this['_cache'][_0x59f543]===0x0)this[_0x179dda(0x76d)][_0x59f543]=Number['MAX_SAFE_INTEGER'];return this[_0x179dda(0x76d)][_0x59f543]=this['traitObjects']()['reduce'](_0x5f622,this['_cache'][_0x59f543]),this[_0x179dda(0x76d)][_0x59f543];},Game_BattlerBase[_0x39290f(0x24d)]['paramRate']=function(_0x2e44b9){const _0x111111=_0x39290f,_0x4dac2e=this[_0x111111(0x7ce)](Game_BattlerBase['TRAIT_PARAM'],_0x2e44b9),_0x2626d4=(_0x2d8769,_0x3259ae)=>{const _0x56d098=_0x111111;if(!_0x3259ae)return _0x2d8769;if(_0x3259ae['note']['match'](VisuMZ[_0x56d098(0x7b3)][_0x56d098(0x228)][_0x56d098(0x682)][_0x2e44b9])){if(_0x56d098(0x8ab)===_0x56d098(0x39f))_0x15fd88['startAnimation']&&_0x380e84[_0x56d098(0x58d)]();else{var _0xab3272=Number(RegExp['$1'])/0x64;_0x2d8769*=_0xab3272;}}if(_0x3259ae[_0x56d098(0x62b)][_0x56d098(0x5cb)](VisuMZ[_0x56d098(0x7b3)]['RegExp'][_0x56d098(0x816)][_0x2e44b9])){var _0xab3272=Number(RegExp['$1']);_0x2d8769*=_0xab3272;}if(_0x3259ae[_0x56d098(0x62b)]['match'](VisuMZ[_0x56d098(0x7b3)][_0x56d098(0x228)][_0x56d098(0x6c7)][_0x2e44b9])){var _0x15831b=String(RegExp['$1']);try{if(_0x56d098(0x306)==='kcrwd'){const _0x625b8d=_0x12c69f['value'](_0x2f00b4);_0x1f644f[_0x56d098(0x77f)](_0x268c6b,!_0x625b8d);}else _0x2d8769*=eval(_0x15831b);}catch(_0x11b50d){if(_0x56d098(0x40f)===_0x56d098(0x815))_0x20eca5[_0x56d098(0x7b3)][_0x56d098(0x18a)]['call'](this),_0x47cfc5['isSideButtonLayout']()&&this['movePageButtonSideButtonLayout']();else{if($gameTemp[_0x56d098(0x499)]())console[_0x56d098(0x24b)](_0x11b50d);}}}return _0x2d8769;};return this[_0x111111(0x529)]()[_0x111111(0x223)](_0x2626d4,_0x4dac2e);},Game_BattlerBase[_0x39290f(0x24d)][_0x39290f(0x2cf)]=function(_0x12cbd8){const _0x229b7f=(_0x200cf0,_0xe5875)=>{const _0x4a5da2=_0xcc41;if(!_0xe5875)return _0x200cf0;if(_0xe5875['note'][_0x4a5da2(0x5cb)](VisuMZ[_0x4a5da2(0x7b3)][_0x4a5da2(0x228)][_0x4a5da2(0x63a)][_0x12cbd8])){var _0xdb776e=Number(RegExp['$1']);_0x200cf0+=_0xdb776e;}if(_0xe5875[_0x4a5da2(0x62b)][_0x4a5da2(0x5cb)](VisuMZ[_0x4a5da2(0x7b3)][_0x4a5da2(0x228)][_0x4a5da2(0x15c)][_0x12cbd8])){var _0x418b91=String(RegExp['$1']);try{_0x200cf0+=eval(_0x418b91);}catch(_0x3ade9e){if(_0x4a5da2(0x151)==='EVswr'){if($gameTemp[_0x4a5da2(0x499)]())console[_0x4a5da2(0x24b)](_0x3ade9e);}else return _0x41b7c7[_0x4a5da2(0x7b3)][_0x4a5da2(0x1ac)]['UI'][_0x4a5da2(0x712)];}}return _0x200cf0;};return this['traitObjects']()['reduce'](_0x229b7f,0x0);},Game_BattlerBase['prototype'][_0x39290f(0x5d1)]=function(_0x5de384){const _0xea32bb=_0x39290f;let _0x4d117d=_0xea32bb(0x5d1)+_0x5de384+_0xea32bb(0x606);if(this[_0xea32bb(0x848)](_0x4d117d))return this[_0xea32bb(0x76d)][_0x4d117d];return this[_0xea32bb(0x76d)][_0x4d117d]=Math[_0xea32bb(0x401)](VisuMZ['CoreEngine'][_0xea32bb(0x1ac)][_0xea32bb(0x390)][_0xea32bb(0x8e8)][_0xea32bb(0x592)](this,_0x5de384)),this['_cache'][_0x4d117d];},Game_BattlerBase[_0x39290f(0x24d)][_0x39290f(0x594)]=function(_0x1136f4){const _0x5033a5=_0x39290f,_0x26a2a1=(_0xeb3ec8,_0x3af278)=>{const _0x37ae5a=_0xcc41;if(!_0x3af278)return _0xeb3ec8;if(_0x3af278['note']['match'](VisuMZ[_0x37ae5a(0x7b3)][_0x37ae5a(0x228)][_0x37ae5a(0x6e0)][_0x1136f4])){if(_0x37ae5a(0x29d)!==_0x37ae5a(0x4e1)){var _0x290dee=Number(RegExp['$1'])/0x64;_0xeb3ec8+=_0x290dee;}else{const _0x3348f8=_0x37ae5a(0x53c);this[_0x37ae5a(0x222)]['remove'](_0x18c410)[_0x37ae5a(0x882)]('')[_0x37ae5a(0x882)](null);const _0x477f43=this['_storedMapText'][_0x37ae5a(0x7a2)]('\x0a\x0a\x0a\x0a\x0a')['trim']();_0x5e186f[_0x37ae5a(0x7b3)]['ExportString'](_0x477f43,_0x3348f8,!![]),_0x43d9eb[_0x37ae5a(0x4eb)][_0x37ae5a(0x6de)]=!![];}}if(_0x3af278['note'][_0x37ae5a(0x5cb)](VisuMZ[_0x37ae5a(0x7b3)][_0x37ae5a(0x228)][_0x37ae5a(0x2ab)][_0x1136f4])){if(_0x37ae5a(0x526)===_0x37ae5a(0x5d7))this[_0x37ae5a(0x4a1)]&&(this[_0x37ae5a(0x5f8)]-=this[_0x37ae5a(0x35e)](),this[_0x37ae5a(0x336)]()&&(this[_0x37ae5a(0x4a1)]=![]));else{var _0x290dee=Number(RegExp['$1']);_0xeb3ec8+=_0x290dee;}}if(_0x3af278[_0x37ae5a(0x62b)]['match'](VisuMZ[_0x37ae5a(0x7b3)][_0x37ae5a(0x228)]['xparamPlusJS'][_0x1136f4])){var _0x393d18=String(RegExp['$1']);try{if('gOuvs'!==_0x37ae5a(0x420))_0xeb3ec8+=eval(_0x393d18);else return 0x0;}catch(_0x4a491e){if(_0x37ae5a(0x47f)!==_0x37ae5a(0x47f))this[_0x37ae5a(0x75a)](_0x4a402b);else{if($gameTemp[_0x37ae5a(0x499)]())console['log'](_0x4a491e);}}}return _0xeb3ec8;};return this[_0x5033a5(0x529)]()['reduce'](_0x26a2a1,0x0);},Game_BattlerBase[_0x39290f(0x24d)]['xparamRate']=function(_0x3301c3){const _0x29280a=_0x39290f,_0x2d8916=(_0x3bda85,_0x171e91)=>{const _0x2f8d77=_0xcc41;if(!_0x171e91)return _0x3bda85;if(_0x171e91[_0x2f8d77(0x62b)][_0x2f8d77(0x5cb)](VisuMZ[_0x2f8d77(0x7b3)][_0x2f8d77(0x228)]['xparamRate1'][_0x3301c3])){if('xilNR'==='TlLTc')return _0x2f19f6['CoreEngine'][_0x2f8d77(0x43c)][_0x2f8d77(0x592)](this);else{var _0x5a798e=Number(RegExp['$1'])/0x64;_0x3bda85*=_0x5a798e;}}if(_0x171e91['note']['match'](VisuMZ[_0x2f8d77(0x7b3)][_0x2f8d77(0x228)][_0x2f8d77(0x86b)][_0x3301c3])){var _0x5a798e=Number(RegExp['$1']);_0x3bda85*=_0x5a798e;}if(_0x171e91[_0x2f8d77(0x62b)][_0x2f8d77(0x5cb)](VisuMZ['CoreEngine'][_0x2f8d77(0x228)]['xparamRateJS'][_0x3301c3])){var _0x20d5d1=String(RegExp['$1']);try{_0x3bda85*=eval(_0x20d5d1);}catch(_0x4e7c9d){if(_0x2f8d77(0x12e)!==_0x2f8d77(0x533)){if($gameTemp['isPlaytest']())console['log'](_0x4e7c9d);}else _0x4f3a4a['CoreEngine'][_0x2f8d77(0x43f)][_0x2f8d77(0x592)](this);}}return _0x3bda85;};return this[_0x29280a(0x529)]()[_0x29280a(0x223)](_0x2d8916,0x1);},Game_BattlerBase[_0x39290f(0x24d)][_0x39290f(0x41e)]=function(_0x261b2e){const _0x110a3b=_0x39290f,_0x3d3ab8=(_0x200c61,_0xe05589)=>{const _0x8ca79b=_0xcc41;if(!_0xe05589)return _0x200c61;if(_0xe05589[_0x8ca79b(0x62b)][_0x8ca79b(0x5cb)](VisuMZ[_0x8ca79b(0x7b3)][_0x8ca79b(0x228)][_0x8ca79b(0x5df)][_0x261b2e])){var _0x489397=Number(RegExp['$1'])/0x64;_0x200c61+=_0x489397;}if(_0xe05589['note'][_0x8ca79b(0x5cb)](VisuMZ[_0x8ca79b(0x7b3)][_0x8ca79b(0x228)][_0x8ca79b(0x5d4)][_0x261b2e])){var _0x489397=Number(RegExp['$1']);_0x200c61+=_0x489397;}if(_0xe05589['note'][_0x8ca79b(0x5cb)](VisuMZ[_0x8ca79b(0x7b3)]['RegExp'][_0x8ca79b(0x6d7)][_0x261b2e])){var _0x571f81=String(RegExp['$1']);try{_0x8ca79b(0x1a7)!==_0x8ca79b(0x2b2)?_0x200c61+=eval(_0x571f81):this[_0x8ca79b(0x1ab)]=0x2;}catch(_0x37c795){if($gameTemp['isPlaytest']())console[_0x8ca79b(0x24b)](_0x37c795);}}return _0x200c61;};return this['traitObjects']()[_0x110a3b(0x223)](_0x3d3ab8,0x0);},Game_BattlerBase[_0x39290f(0x24d)][_0x39290f(0x199)]=function(_0x3286f5){const _0x1bc174=_0x39290f;let _0x578389=_0x1bc174(0x199)+_0x3286f5+'Total';if(this[_0x1bc174(0x848)](_0x578389))return this['_cache'][_0x578389];return this[_0x1bc174(0x76d)][_0x578389]=VisuMZ[_0x1bc174(0x7b3)]['Settings'][_0x1bc174(0x390)][_0x1bc174(0x43d)][_0x1bc174(0x592)](this,_0x3286f5),this['_cache'][_0x578389];},Game_BattlerBase[_0x39290f(0x24d)][_0x39290f(0x7dd)]=function(_0x3eeff4){const _0x138926=_0x39290f,_0x48ede9=(_0x48a78a,_0xa73c32)=>{const _0x5c902f=_0xcc41;if(!_0xa73c32)return _0x48a78a;if(_0xa73c32[_0x5c902f(0x62b)][_0x5c902f(0x5cb)](VisuMZ['CoreEngine'][_0x5c902f(0x228)]['sparamPlus1'][_0x3eeff4])){var _0x425ed5=Number(RegExp['$1'])/0x64;_0x48a78a+=_0x425ed5;}if(_0xa73c32[_0x5c902f(0x62b)][_0x5c902f(0x5cb)](VisuMZ[_0x5c902f(0x7b3)][_0x5c902f(0x228)][_0x5c902f(0x285)][_0x3eeff4])){if(_0x5c902f(0x723)!==_0x5c902f(0x723))_0x1d0364[_0x5c902f(0x7b3)][_0x5c902f(0x652)][_0x5c902f(0x592)](this,_0x74e183,_0x99931f,_0x5da8cc,_0x3494d1,_0x30876f,_0x164952,_0x1a9f87,_0x178640,_0x56b2d7),this[_0x5c902f(0x487)]();else{var _0x425ed5=Number(RegExp['$1']);_0x48a78a+=_0x425ed5;}}if(_0xa73c32[_0x5c902f(0x62b)][_0x5c902f(0x5cb)](VisuMZ['CoreEngine'][_0x5c902f(0x228)][_0x5c902f(0x388)][_0x3eeff4])){var _0x1fc30c=String(RegExp['$1']);try{_0x48a78a+=eval(_0x1fc30c);}catch(_0x4b8cd5){if(_0x5c902f(0x3d3)!=='CbGqN')return _0x184c74[_0x5c902f(0x302)]['SlotRect']['call'](this);else{if($gameTemp[_0x5c902f(0x499)]())console[_0x5c902f(0x24b)](_0x4b8cd5);}}}return _0x48a78a;};return this['traitObjects']()[_0x138926(0x223)](_0x48ede9,0x0);},Game_BattlerBase['prototype'][_0x39290f(0x67e)]=function(_0xd29af8){const _0x327ec5=_0x39290f,_0x1d16e0=(_0x24faa4,_0xa32b99)=>{const _0x177ee2=_0xcc41;if(!_0xa32b99)return _0x24faa4;if(_0xa32b99[_0x177ee2(0x62b)][_0x177ee2(0x5cb)](VisuMZ[_0x177ee2(0x7b3)][_0x177ee2(0x228)][_0x177ee2(0x1b9)][_0xd29af8])){if('fIOOF'==='fIOOF'){var _0x16fd8b=Number(RegExp['$1'])/0x64;_0x24faa4*=_0x16fd8b;}else this[_0x177ee2(0x2be)]=_0x5dec14;}if(_0xa32b99[_0x177ee2(0x62b)]['match'](VisuMZ[_0x177ee2(0x7b3)]['RegExp'][_0x177ee2(0x7db)][_0xd29af8])){var _0x16fd8b=Number(RegExp['$1']);_0x24faa4*=_0x16fd8b;}if(_0xa32b99['note']['match'](VisuMZ[_0x177ee2(0x7b3)][_0x177ee2(0x228)][_0x177ee2(0x37c)][_0xd29af8])){var _0x420888=String(RegExp['$1']);try{if(_0x177ee2(0x898)!=='wbngn')_0x24faa4*=eval(_0x420888);else{if(_0x782920[_0x177ee2(0x5cb)](/backspace/i))return this[_0x177ee2(0x611)]===0x8;if(_0x41d751[_0x177ee2(0x5cb)](/enter/i))return this[_0x177ee2(0x611)]===0xd;if(_0x51b8f1[_0x177ee2(0x5cb)](/escape/i))return this[_0x177ee2(0x611)]===0x1b;}}catch(_0xbb1e2){if($gameTemp[_0x177ee2(0x499)]())console[_0x177ee2(0x24b)](_0xbb1e2);}}return _0x24faa4;};return this[_0x327ec5(0x529)]()[_0x327ec5(0x223)](_0x1d16e0,0x1);},Game_BattlerBase['prototype'][_0x39290f(0x74e)]=function(_0x4d72d9){const _0x270423=_0x39290f,_0x437d5b=(_0x1b0ece,_0xf1f3e5)=>{const _0x124a76=_0xcc41;if(!_0xf1f3e5)return _0x1b0ece;if(_0xf1f3e5[_0x124a76(0x62b)][_0x124a76(0x5cb)](VisuMZ[_0x124a76(0x7b3)][_0x124a76(0x228)][_0x124a76(0x3a4)][_0x4d72d9])){var _0x5d3125=Number(RegExp['$1'])/0x64;_0x1b0ece+=_0x5d3125;}if(_0xf1f3e5[_0x124a76(0x62b)][_0x124a76(0x5cb)](VisuMZ['CoreEngine'][_0x124a76(0x228)][_0x124a76(0x6ad)][_0x4d72d9])){if('GJCBS'===_0x124a76(0x53b)){_0x363012&&_0x506ffa&&_0x398b88[_0x124a76(0x62b)]&&this[_0x124a76(0x69a)](_0x2b8eda[_0x124a76(0x62b)]);const _0x2279c9=_0x82d7c8[_0x5edd66];if(_0x2279c9){let _0x3ab191=_0x55cbc2[_0x124a76(0x60a)](_0x2279c9['id']);this[_0x124a76(0x69a)](_0x3ab191);}}else{var _0x5d3125=Number(RegExp['$1']);_0x1b0ece+=_0x5d3125;}}if(_0xf1f3e5[_0x124a76(0x62b)][_0x124a76(0x5cb)](VisuMZ['CoreEngine']['RegExp'][_0x124a76(0x2b7)][_0x4d72d9])){if(_0x124a76(0x1cb)!=='PnvUs'){var _0x1f26f9=String(RegExp['$1']);try{_0x124a76(0x57d)==='CNuFX'?_0x50aa77[_0x124a76(0x244)]()||this[_0x124a76(0x5d9)]?this[_0x124a76(0x812)]():_0xe3adc8[_0x124a76(0x7b3)][_0x124a76(0x840)]['call'](this):_0x1b0ece+=eval(_0x1f26f9);}catch(_0x629361){if($gameTemp[_0x124a76(0x499)]())console[_0x124a76(0x24b)](_0x629361);}}else{let _0x1fa69e=_0x5c705a[_0x4bfafb],_0x5c4575=this[_0x124a76(0x685)](_0x1fa69e)[_0x124a76(0x42a)],_0x294848=_0x27b1b2['floor']((this[_0x124a76(0x328)][_0x124a76(0x42a)]-_0x5c4575)/0x2);this['drawTextEx'](_0x1fa69e,_0x294848,_0x15d59b),_0x27e1bb+=this[_0x124a76(0x732)]();}}return _0x1b0ece;};return this[_0x270423(0x529)]()[_0x270423(0x223)](_0x437d5b,0x0);},Game_BattlerBase[_0x39290f(0x24d)][_0x39290f(0x8c8)]=function(_0x3b095c){const _0x51ad63=_0x39290f;let _0x11805a=_0x51ad63(0x8c8)+_0x3b095c+_0x51ad63(0x606);if(this[_0x51ad63(0x848)](_0x11805a))return this[_0x51ad63(0x76d)][_0x11805a];return this[_0x51ad63(0x76d)][_0x11805a]=VisuMZ[_0x51ad63(0x7b3)][_0x51ad63(0x1ac)][_0x51ad63(0x390)][_0x51ad63(0x399)][_0x51ad63(0x592)](this,_0x3b095c),this['_cache'][_0x11805a];},Game_BattlerBase[_0x39290f(0x24d)][_0x39290f(0x38c)]=function(_0x4a2b57,_0x302399){const _0x318c7f=_0x39290f;if(typeof paramId===_0x318c7f(0x3b4))return this['param'](_0x4a2b57);_0x4a2b57=String(_0x4a2b57||'')[_0x318c7f(0x6ce)]();if(_0x4a2b57==='MAXHP')return this[_0x318c7f(0x5d1)](0x0);if(_0x4a2b57===_0x318c7f(0x1b0))return this[_0x318c7f(0x5d1)](0x1);if(_0x4a2b57===_0x318c7f(0x535))return this['param'](0x2);if(_0x4a2b57===_0x318c7f(0x891))return this[_0x318c7f(0x5d1)](0x3);if(_0x4a2b57===_0x318c7f(0x28c))return this[_0x318c7f(0x5d1)](0x4);if(_0x4a2b57===_0x318c7f(0x7c2))return this[_0x318c7f(0x5d1)](0x5);if(_0x4a2b57===_0x318c7f(0x695))return this['param'](0x6);if(_0x4a2b57===_0x318c7f(0x3c5))return this[_0x318c7f(0x5d1)](0x7);if(_0x4a2b57===_0x318c7f(0x1d3))return _0x302399?String(Math[_0x318c7f(0x401)](this[_0x318c7f(0x199)](0x0)*0x64))+'%':this[_0x318c7f(0x199)](0x0);if(_0x4a2b57===_0x318c7f(0x44a))return _0x302399?String(Math[_0x318c7f(0x401)](this['xparam'](0x1)*0x64))+'%':this[_0x318c7f(0x199)](0x1);if(_0x4a2b57===_0x318c7f(0x37e))return _0x302399?String(Math['round'](this['xparam'](0x2)*0x64))+'%':this[_0x318c7f(0x199)](0x2);if(_0x4a2b57===_0x318c7f(0x128))return _0x302399?String(Math[_0x318c7f(0x401)](this[_0x318c7f(0x199)](0x3)*0x64))+'%':this[_0x318c7f(0x199)](0x3);if(_0x4a2b57===_0x318c7f(0x7d6))return _0x302399?String(Math[_0x318c7f(0x401)](this['xparam'](0x4)*0x64))+'%':this[_0x318c7f(0x199)](0x4);if(_0x4a2b57===_0x318c7f(0x3e8))return _0x302399?String(Math[_0x318c7f(0x401)](this[_0x318c7f(0x199)](0x5)*0x64))+'%':this['xparam'](0x5);if(_0x4a2b57===_0x318c7f(0x1d7))return _0x302399?String(Math[_0x318c7f(0x401)](this[_0x318c7f(0x199)](0x6)*0x64))+'%':this['xparam'](0x6);if(_0x4a2b57===_0x318c7f(0x63c))return _0x302399?String(Math[_0x318c7f(0x401)](this[_0x318c7f(0x199)](0x7)*0x64))+'%':this[_0x318c7f(0x199)](0x7);if(_0x4a2b57===_0x318c7f(0x73f))return _0x302399?String(Math[_0x318c7f(0x401)](this[_0x318c7f(0x199)](0x8)*0x64))+'%':this[_0x318c7f(0x199)](0x8);if(_0x4a2b57===_0x318c7f(0x22e))return _0x302399?String(Math[_0x318c7f(0x401)](this[_0x318c7f(0x199)](0x9)*0x64))+'%':this[_0x318c7f(0x199)](0x9);if(_0x4a2b57===_0x318c7f(0x4d9))return _0x302399?String(Math[_0x318c7f(0x401)](this[_0x318c7f(0x8c8)](0x0)*0x64))+'%':this['sparam'](0x0);if(_0x4a2b57===_0x318c7f(0x639))return _0x302399?String(Math[_0x318c7f(0x401)](this['sparam'](0x1)*0x64))+'%':this[_0x318c7f(0x8c8)](0x1);if(_0x4a2b57==='REC')return _0x302399?String(Math['round'](this['sparam'](0x2)*0x64))+'%':this[_0x318c7f(0x8c8)](0x2);if(_0x4a2b57===_0x318c7f(0x367))return _0x302399?String(Math[_0x318c7f(0x401)](this[_0x318c7f(0x8c8)](0x3)*0x64))+'%':this[_0x318c7f(0x8c8)](0x3);if(_0x4a2b57===_0x318c7f(0x159))return _0x302399?String(Math[_0x318c7f(0x401)](this[_0x318c7f(0x8c8)](0x4)*0x64))+'%':this['sparam'](0x4);if(_0x4a2b57===_0x318c7f(0x884))return _0x302399?String(Math[_0x318c7f(0x401)](this['sparam'](0x5)*0x64))+'%':this[_0x318c7f(0x8c8)](0x5);if(_0x4a2b57==='PDR')return _0x302399?String(Math[_0x318c7f(0x401)](this[_0x318c7f(0x8c8)](0x6)*0x64))+'%':this[_0x318c7f(0x8c8)](0x6);if(_0x4a2b57==='MDR')return _0x302399?String(Math['round'](this[_0x318c7f(0x8c8)](0x7)*0x64))+'%':this[_0x318c7f(0x8c8)](0x7);if(_0x4a2b57===_0x318c7f(0x67f))return _0x302399?String(Math[_0x318c7f(0x401)](this[_0x318c7f(0x8c8)](0x8)*0x64))+'%':this[_0x318c7f(0x8c8)](0x8);if(_0x4a2b57===_0x318c7f(0x809))return _0x302399?String(Math[_0x318c7f(0x401)](this[_0x318c7f(0x8c8)](0x9)*0x64))+'%':this[_0x318c7f(0x8c8)](0x9);if(VisuMZ[_0x318c7f(0x7b3)][_0x318c7f(0x1ad)][_0x4a2b57]){if(_0x318c7f(0x187)===_0x318c7f(0x187)){const _0x3f22a6=VisuMZ['CoreEngine'][_0x318c7f(0x1ad)][_0x4a2b57],_0x3d0d94=this[_0x3f22a6];return VisuMZ[_0x318c7f(0x7b3)]['CustomParamType'][_0x4a2b57]===_0x318c7f(0x2d3)?_0x3d0d94:_0x302399?String(Math['round'](_0x3d0d94*0x64))+'%':_0x3d0d94;}else return _0x9a56ed[_0x318c7f(0x7c0)](_0x532050,'<','>');}return'';},Game_BattlerBase['prototype']['isDying']=function(){const _0x4609fb=_0x39290f;return this[_0x4609fb(0x226)]()&&this[_0x4609fb(0x710)]<this['mhp']*VisuMZ['CoreEngine'][_0x4609fb(0x1ac)][_0x4609fb(0x390)][_0x4609fb(0x2d1)];},Game_Battler[_0x39290f(0x24d)][_0x39290f(0x56e)]=function(){const _0x5c1beb=_0x39290f;SoundManager[_0x5c1beb(0x7d5)](),this[_0x5c1beb(0x273)]('evade');},VisuMZ[_0x39290f(0x7b3)][_0x39290f(0x6bf)]=Game_Actor['prototype'][_0x39290f(0x82d)],Game_Actor[_0x39290f(0x24d)]['paramBase']=function(_0x413bde){const _0x317849=_0x39290f;if(this[_0x317849(0x58e)]>0x63)return this[_0x317849(0x5f4)](_0x413bde);return VisuMZ['CoreEngine'][_0x317849(0x6bf)][_0x317849(0x592)](this,_0x413bde);},Game_Actor[_0x39290f(0x24d)][_0x39290f(0x5f4)]=function(_0xe62f96){const _0x13ca05=_0x39290f,_0x2f16fd=this['currentClass']()[_0x13ca05(0x5c9)][_0xe62f96][0x63],_0x2f6b87=this[_0x13ca05(0x89d)]()[_0x13ca05(0x5c9)][_0xe62f96][0x62];return _0x2f16fd+(_0x2f16fd-_0x2f6b87)*(this[_0x13ca05(0x58e)]-0x63);},VisuMZ['CoreEngine'][_0x39290f(0x6cf)]=Game_Actor[_0x39290f(0x24d)][_0x39290f(0x517)],Game_Actor['prototype'][_0x39290f(0x517)]=function(_0x5df25a,_0x577b6b){const _0x244de8=_0x39290f;$gameTemp[_0x244de8(0x653)]=!![],VisuMZ[_0x244de8(0x7b3)][_0x244de8(0x6cf)][_0x244de8(0x592)](this,_0x5df25a,_0x577b6b),$gameTemp[_0x244de8(0x653)]=undefined;},VisuMZ[_0x39290f(0x7b3)][_0x39290f(0x485)]=Game_Actor[_0x39290f(0x24d)][_0x39290f(0x576)],Game_Actor[_0x39290f(0x24d)]['levelUp']=function(){const _0x233dbb=_0x39290f;VisuMZ[_0x233dbb(0x7b3)][_0x233dbb(0x485)][_0x233dbb(0x592)](this);if(!$gameTemp[_0x233dbb(0x653)])this[_0x233dbb(0x6f3)]();},Game_Actor[_0x39290f(0x24d)][_0x39290f(0x6f3)]=function(){const _0x42d90a=_0x39290f;this[_0x42d90a(0x76d)]={};if(VisuMZ[_0x42d90a(0x7b3)]['Settings'][_0x42d90a(0x646)]['LevelUpFullHp'])this[_0x42d90a(0x710)]=this[_0x42d90a(0x41f)];if(VisuMZ[_0x42d90a(0x7b3)]['Settings'][_0x42d90a(0x646)]['LevelUpFullMp'])this['_mp']=this['mmp'];},Game_Actor['prototype']['expRate']=function(){const _0x36d631=_0x39290f;if(this['isMaxLevel']())return 0x1;const _0x303f11=this['nextLevelExp']()-this[_0x36d631(0x3d4)](),_0x132a28=this[_0x36d631(0x571)]()-this[_0x36d631(0x3d4)]();return(_0x132a28/_0x303f11)[_0x36d631(0x2a6)](0x0,0x1);},Game_Actor[_0x39290f(0x24d)][_0x39290f(0x529)]=function(){const _0x5132d4=_0x39290f,_0x434edc=Game_Battler['prototype'][_0x5132d4(0x529)][_0x5132d4(0x592)](this);for(const _0x108b94 of this[_0x5132d4(0x764)]()){_0x108b94&&_0x434edc[_0x5132d4(0x6a2)](_0x108b94);}return _0x434edc['push'](this[_0x5132d4(0x89d)](),this[_0x5132d4(0x5a4)]()),_0x434edc;},Object[_0x39290f(0x3b5)](Game_Enemy[_0x39290f(0x24d)],_0x39290f(0x58e),{'get':function(){const _0x523939=_0x39290f;return this[_0x523939(0x10c)]();},'configurable':!![]}),Game_Enemy[_0x39290f(0x24d)][_0x39290f(0x10c)]=function(){const _0x60b9be=_0x39290f;return this[_0x60b9be(0x14e)]()[_0x60b9be(0x58e)];},Game_Enemy['prototype'][_0x39290f(0x2a7)]=function(){const _0x23df5a=_0x39290f;if(!this[_0x23df5a(0x88e)]){if(_0x23df5a(0x758)!==_0x23df5a(0x758)){if(_0xe7a60b===_0x318b05&&_0x4437d3%0x1===0x0)return _0x10969e;if(_0x19df17!==_0x40a33a&&[_0x23df5a(0x48c),_0x23df5a(0x1b0),_0x23df5a(0x535),'DEF',_0x23df5a(0x28c),_0x23df5a(0x7c2),_0x23df5a(0x695),_0x23df5a(0x3c5)][_0x23df5a(0x6d3)](_0x539383(_0x294055)[_0x23df5a(0x6ce)]()['trim']()))return _0x29ce7b;_0x3dbc49=_0x55d65b||0x0;if(_0xa2fc6a[_0x23df5a(0x7b3)][_0x23df5a(0x1ad)][_0x506064])return _0x5d6da2[_0x23df5a(0x7b3)]['CustomParamType'][_0x2c6d0f]===_0x23df5a(0x2d3)?_0xeb1329:_0x2e3515((_0x45b2d8*0x64)['toFixed'](_0x109dda))+'%';return _0x244586((_0xd814bc*0x64)['toFixed'](_0x2234db))+'%';}else this[_0x23df5a(0x39d)]+=Math['round']((Graphics[_0x23df5a(0x431)]-0x270)/0x2),this[_0x23df5a(0x39d)]-=Math[_0x23df5a(0x27c)]((Graphics['height']-Graphics['boxHeight'])/0x2),$gameSystem['isSideView']()?this[_0x23df5a(0x311)]-=Math[_0x23df5a(0x27c)]((Graphics[_0x23df5a(0x42a)]-Graphics[_0x23df5a(0x3fd)])/0x2):this[_0x23df5a(0x311)]+=Math['round']((Graphics[_0x23df5a(0x3fd)]-0x330)/0x2);}this[_0x23df5a(0x88e)]=!![];},Game_Party['prototype'][_0x39290f(0x3ee)]=function(){const _0x11489a=_0x39290f;return VisuMZ[_0x11489a(0x7b3)]['Settings']['Gold'][_0x11489a(0x6d1)];},VisuMZ['CoreEngine']['Game_Party_consumeItem']=Game_Party[_0x39290f(0x24d)][_0x39290f(0x5e4)],Game_Party['prototype']['consumeItem']=function(_0xdef428){const _0x4133be=_0x39290f;if(VisuMZ[_0x4133be(0x7b3)]['Settings'][_0x4133be(0x646)][_0x4133be(0x113)]&&DataManager[_0x4133be(0x4e0)](_0xdef428))return;VisuMZ[_0x4133be(0x7b3)][_0x4133be(0x1cd)][_0x4133be(0x592)](this,_0xdef428);},Game_Party['prototype'][_0x39290f(0x7a7)]=function(){const _0xeab94f=_0x39290f,_0x1d5ac8=VisuMZ[_0xeab94f(0x7b3)]['Settings'][_0xeab94f(0x646)],_0x2153ec=_0x1d5ac8[_0xeab94f(0x211)]??0x63;let _0x578578=[];(_0x1d5ac8[_0xeab94f(0x76a)]??!![])&&(_0x578578=_0x578578[_0xeab94f(0x3ce)]($dataItems));if(_0x1d5ac8[_0xeab94f(0x42e)]??!![]){if(_0xeab94f(0x4e5)===_0xeab94f(0x4e5))_0x578578=_0x578578[_0xeab94f(0x3ce)]($dataWeapons);else for(const _0x58f813 of _0x2f0384[_0xeab94f(0x404)]){const _0x5ee4ac=new _0x21ab3c(_0x58f813);this['addChild'](_0x5ee4ac);}}(_0x1d5ac8[_0xeab94f(0x6b8)]??!![])&&(_0xeab94f(0x1bc)==='sIkcS'?_0x578578=_0x578578[_0xeab94f(0x3ce)]($dataArmors):_0x3e9739[_0xeab94f(0x245)]&&(this[_0xeab94f(0x1ab)]=_0xeab94f(0x2a0)));for(const _0x4cfac4 of _0x578578){if(!_0x4cfac4)continue;if(_0x4cfac4[_0xeab94f(0x8e0)][_0xeab94f(0x4fb)]()<=0x0)continue;if(_0x4cfac4[_0xeab94f(0x8e0)][_0xeab94f(0x5cb)](/-----/i))continue;this[_0xeab94f(0x6ca)](_0x4cfac4,_0x2153ec);}},VisuMZ[_0x39290f(0x7b3)][_0x39290f(0x6f2)]=Game_Troop['prototype'][_0x39290f(0x772)],Game_Troop[_0x39290f(0x24d)][_0x39290f(0x772)]=function(_0x396337){const _0x1c7ccb=_0x39290f;$gameTemp['clearForcedGameTroopSettingsCoreEngine'](),$gameTemp[_0x1c7ccb(0x454)](_0x396337),VisuMZ[_0x1c7ccb(0x7b3)][_0x1c7ccb(0x6f2)][_0x1c7ccb(0x592)](this,_0x396337);},VisuMZ[_0x39290f(0x7b3)][_0x39290f(0x22c)]=Game_Map[_0x39290f(0x24d)][_0x39290f(0x772)],Game_Map[_0x39290f(0x24d)]['setup']=function(_0xfbe8fc){const _0x3b4519=_0x39290f;VisuMZ[_0x3b4519(0x7b3)][_0x3b4519(0x22c)][_0x3b4519(0x592)](this,_0xfbe8fc),this[_0x3b4519(0x460)](_0xfbe8fc);},Game_Map[_0x39290f(0x24d)][_0x39290f(0x460)]=function(){const _0x401b7e=_0x39290f;this[_0x401b7e(0x197)]=VisuMZ[_0x401b7e(0x7b3)][_0x401b7e(0x1ac)][_0x401b7e(0x646)]['NoTileShadows']||![];if($dataMap&&$dataMap[_0x401b7e(0x62b)]){if(_0x401b7e(0x896)!==_0x401b7e(0x896))return this[_0x401b7e(0x80e)]();else{if($dataMap['note']['match'](/<SHOW TILE SHADOWS>/i))this[_0x401b7e(0x197)]=![];if($dataMap[_0x401b7e(0x62b)][_0x401b7e(0x5cb)](/<HIDE TILE SHADOWS>/i))this[_0x401b7e(0x197)]=!![];}}},Game_Map['prototype'][_0x39290f(0x75f)]=function(){const _0x254403=_0x39290f;if(this[_0x254403(0x197)]===undefined)this['setupCoreEngine']();return this[_0x254403(0x197)];},VisuMZ[_0x39290f(0x7b3)][_0x39290f(0x424)]=Game_Character[_0x39290f(0x24d)][_0x39290f(0x64e)],Game_Character[_0x39290f(0x24d)]['processMoveCommand']=function(_0x4b9e7a){const _0x401519=_0x39290f;try{_0x401519(0x72b)!==_0x401519(0x72b)?this['backOpacity']=_0x3c85e7['windowOpacity']():VisuMZ[_0x401519(0x7b3)][_0x401519(0x424)][_0x401519(0x592)](this,_0x4b9e7a);}catch(_0x869c){if($gameTemp['isPlaytest']())console[_0x401519(0x24b)](_0x869c);}},Game_Player[_0x39290f(0x24d)][_0x39290f(0x577)]=function(){const _0x1f2672=_0x39290f,_0x40c3f3=$gameMap[_0x1f2672(0x81f)]();this[_0x1f2672(0x4e2)]=Math[_0x1f2672(0x548)](_0x40c3f3)+Math[_0x1f2672(0x548)](_0x40c3f3)+this[_0x1f2672(0x339)]();},Game_Player[_0x39290f(0x24d)][_0x39290f(0x339)]=function(){const _0x2e7f2a=_0x39290f;return $dataMap&&$dataMap['note']&&$dataMap[_0x2e7f2a(0x62b)][_0x2e7f2a(0x5cb)](/<MINIMUM ENCOUNTER STEPS:[ ](\d+)>/i)?Number(RegExp['$1']):VisuMZ[_0x2e7f2a(0x7b3)][_0x2e7f2a(0x1ac)]['QoL'][_0x2e7f2a(0x345)];},VisuMZ['CoreEngine']['Game_Event_isCollidedWithEvents']=Game_Event[_0x39290f(0x24d)][_0x39290f(0x6e7)],Game_Event['prototype']['isCollidedWithEvents']=function(_0xbf7334,_0xf88fab){const _0x2c089=_0x39290f;if(this[_0x2c089(0x430)]()){if('qZFKu'!==_0x2c089(0x1c0)){const _0x4f1e2a=_0xc59c1b(this[_0x2c089(0x76b)][_0x2c089(0x8e0)]),_0x563d31=this[_0x2c089(0x867)](_0x4f1e2a);return _0x563d31?_0x563d31['SnapshotOpacity']:0xc0;}else return this[_0x2c089(0x203)](_0xbf7334,_0xf88fab);}else{if(_0x2c089(0x7e6)===_0x2c089(0x7e6))return VisuMZ['CoreEngine'][_0x2c089(0x74d)][_0x2c089(0x592)](this,_0xbf7334,_0xf88fab);else _0x715f4[_0x2c089(0x7b3)][_0x2c089(0x1ac)]['UI'][_0x2c089(0x558)]&&(this['_sideButtonLayout']=_0x2b6690);}},Game_Event[_0x39290f(0x24d)][_0x39290f(0x430)]=function(){const _0x4afe7b=_0x39290f;return VisuMZ[_0x4afe7b(0x7b3)][_0x4afe7b(0x1ac)][_0x4afe7b(0x646)][_0x4afe7b(0x3e5)];},Game_Event['prototype'][_0x39290f(0x203)]=function(_0x4429a5,_0x352bf8){const _0x3ad7d6=_0x39290f;if(!this[_0x3ad7d6(0x437)]()){if('DJQRm'===_0x3ad7d6(0x8e4))return![];else{if(_0x12bc6b[_0x3ad7d6(0x1ab)]!==_0x30d376)return _0x22bfa7[_0x3ad7d6(0x1ab)];if(this[_0x3ad7d6(0x25e)]===_0x441ea8)this[_0x3ad7d6(0x2ef)]();if(this[_0x3ad7d6(0x25e)]['BattleSystem']===_0x5cf3aa)this[_0x3ad7d6(0x52c)]();return this['_CoreEngineSettings'][_0x3ad7d6(0x2c3)];}}else{if(_0x3ad7d6(0x8df)===_0x3ad7d6(0x4ce))return _0x3e9930[_0x3ad7d6(0x7b3)]['Settings'][_0x3ad7d6(0x390)][_0x3ad7d6(0x42c)][_0x3ad7d6(0x59c)];else{const _0x291435=$gameMap['eventsXyNt'](_0x4429a5,_0x352bf8)[_0x3ad7d6(0x264)](_0x244121=>_0x244121[_0x3ad7d6(0x437)]());return _0x291435[_0x3ad7d6(0x59c)]>0x0;}}},VisuMZ['CoreEngine'][_0x39290f(0x5aa)]=Game_Interpreter[_0x39290f(0x24d)][_0x39290f(0x166)],Game_Interpreter[_0x39290f(0x24d)]['command105']=function(_0x2bc581){const _0xe432dc=_0x39290f,_0x4331a0=this[_0xe432dc(0x110)]();return _0x4331a0[_0xe432dc(0x5cb)](/\/\/[ ]SCRIPT[ ]CALL/i)?this[_0xe432dc(0x27e)](_0x4331a0):VisuMZ[_0xe432dc(0x7b3)][_0xe432dc(0x5aa)][_0xe432dc(0x592)](this,_0x2bc581);},Game_Interpreter[_0x39290f(0x24d)]['getCombinedScrollingText']=function(){const _0x4e8b8b=_0x39290f;let _0x1fdd65='',_0xab96aa=this[_0x4e8b8b(0x4ee)]+0x1;while(this[_0x4e8b8b(0x1a9)][_0xab96aa]&&this['_list'][_0xab96aa]['code']===0x195){_0x1fdd65+=this[_0x4e8b8b(0x1a9)][_0xab96aa][_0x4e8b8b(0x1e4)][0x0]+'\x0a',_0xab96aa++;}return _0x1fdd65;},Game_Interpreter[_0x39290f(0x24d)][_0x39290f(0x27e)]=function(_0x56f06d){const _0x32ddaa=_0x39290f;try{_0x32ddaa(0x2c8)===_0x32ddaa(0x208)?(this[_0x32ddaa(0x3f6)]=_0x27523b[_0x32ddaa(0x7b3)][_0x32ddaa(0x1ac)]['QoL'][_0x32ddaa(0x5de)],this['_digitGroupingEx']=_0x34a579['CoreEngine'][_0x32ddaa(0x1ac)][_0x32ddaa(0x646)][_0x32ddaa(0x138)]):eval(_0x56f06d);}catch(_0x2938fe){$gameTemp[_0x32ddaa(0x499)]()&&(console[_0x32ddaa(0x24b)](_0x32ddaa(0x263)),console[_0x32ddaa(0x24b)](_0x2938fe));}return!![];},VisuMZ['CoreEngine'][_0x39290f(0x78b)]=Game_Interpreter[_0x39290f(0x24d)][_0x39290f(0x117)],Game_Interpreter[_0x39290f(0x24d)]['command111']=function(_0x481ec3){const _0x30c0aa=_0x39290f;try{VisuMZ[_0x30c0aa(0x7b3)][_0x30c0aa(0x78b)]['call'](this,_0x481ec3);}catch(_0x40c3e8){if($gameTemp['isPlaytest']()){if('ponRC'!==_0x30c0aa(0x46d)){const _0x3a3bd1=_0x4d67ba('fs');let _0x5e4ca8=_0x30c0aa(0x4a6)[_0x30c0aa(0x8ca)](_0x474516||'0');_0x3a3bd1[_0x30c0aa(0x81b)](_0x5e4ca8,_0x26a94b,_0x4df055=>{const _0x42bd6d=_0x30c0aa;if(_0x4df055)throw _0x545390;else _0x4ebc96&&_0x4087c8(_0x42bd6d(0x4bf)[_0x42bd6d(0x8ca)](_0x5e4ca8));});}else console[_0x30c0aa(0x24b)](_0x30c0aa(0x362)),console[_0x30c0aa(0x24b)](_0x40c3e8);}this['skipBranch']();}return!![];},VisuMZ['CoreEngine'][_0x39290f(0x235)]=Game_Interpreter[_0x39290f(0x24d)][_0x39290f(0x296)],Game_Interpreter['prototype']['command122']=function(_0x5ed8fc){const _0x5a2bc3=_0x39290f;try{_0x5a2bc3(0x15f)!=='IrXxO'?this['processKeyboardHandling']():VisuMZ[_0x5a2bc3(0x7b3)][_0x5a2bc3(0x235)][_0x5a2bc3(0x592)](this,_0x5ed8fc);}catch(_0x2a0da5){if($gameTemp['isPlaytest']()){if(_0x5a2bc3(0x676)!=='uPixN')console['log'](_0x5a2bc3(0x799)),console[_0x5a2bc3(0x24b)](_0x2a0da5);else return!this[_0x5a2bc3(0x574)]()?this[_0x5a2bc3(0x636)]():0x0;}}return!![];},VisuMZ['CoreEngine'][_0x39290f(0x2ba)]=Game_Interpreter[_0x39290f(0x24d)]['command355'],Game_Interpreter[_0x39290f(0x24d)][_0x39290f(0x2b1)]=function(){const _0x4fe4a8=_0x39290f;try{VisuMZ[_0x4fe4a8(0x7b3)]['Game_Interpreter_command355']['call'](this);}catch(_0x5d4cd2){$gameTemp[_0x4fe4a8(0x499)]()&&(_0x4fe4a8(0x3a7)!==_0x4fe4a8(0x484)?(console[_0x4fe4a8(0x24b)]('Script\x20Call\x20Error'),console[_0x4fe4a8(0x24b)](_0x5d4cd2)):(this[_0x4fe4a8(0x318)]()&&this[_0x4fe4a8(0x595)](),_0x2dc086[_0x4fe4a8(0x7b3)]['Spriteset_Battle_createEnemies'][_0x4fe4a8(0x592)](this)));}return!![];},VisuMZ[_0x39290f(0x7b3)]['Game_Interpreter_PluginCommand']=Game_Interpreter['prototype'][_0x39290f(0x64d)],Game_Interpreter['prototype'][_0x39290f(0x64d)]=function(_0x3f3d98){const _0x27938f=_0x39290f;return $gameTemp['setLastPluginCommandInterpreter'](this),VisuMZ[_0x27938f(0x7b3)]['Game_Interpreter_PluginCommand'][_0x27938f(0x592)](this,_0x3f3d98);},Scene_Base[_0x39290f(0x24d)][_0x39290f(0x768)]=function(){const _0x70326d=_0x39290f;return VisuMZ['CoreEngine']['Settings']['UI'][_0x70326d(0x4b1)];},Scene_Base[_0x39290f(0x24d)][_0x39290f(0x574)]=function(){const _0x4fa42d=_0x39290f;return VisuMZ[_0x4fa42d(0x7b3)][_0x4fa42d(0x1ac)]['UI'][_0x4fa42d(0x4fa)];},Scene_Base[_0x39290f(0x24d)][_0x39290f(0x80b)]=function(){const _0x55c795=_0x39290f;return VisuMZ['CoreEngine'][_0x55c795(0x1ac)]['UI'][_0x55c795(0x637)];},Scene_Base[_0x39290f(0x24d)][_0x39290f(0x103)]=function(){const _0x12a9be=_0x39290f;return VisuMZ[_0x12a9be(0x7b3)][_0x12a9be(0x1ac)]['UI']['RightMenus'];},Scene_Base[_0x39290f(0x24d)]['mainCommandWidth']=function(){const _0x21b4e4=_0x39290f;return VisuMZ['CoreEngine'][_0x21b4e4(0x1ac)]['UI'][_0x21b4e4(0x7f6)];},Scene_Base[_0x39290f(0x24d)][_0x39290f(0x80a)]=function(){const _0x52c747=_0x39290f;return VisuMZ[_0x52c747(0x7b3)]['Settings']['UI'][_0x52c747(0x3a5)];},Scene_Base[_0x39290f(0x24d)][_0x39290f(0x1bb)]=function(){const _0x4aabff=_0x39290f;return VisuMZ[_0x4aabff(0x7b3)]['Settings'][_0x4aabff(0x5dd)][_0x4aabff(0x6c1)];},VisuMZ[_0x39290f(0x7b3)][_0x39290f(0x1e8)]=Scene_Base[_0x39290f(0x24d)]['createWindowLayer'],Scene_Base['prototype'][_0x39290f(0x666)]=function(){const _0x5c6da4=_0x39290f;VisuMZ[_0x5c6da4(0x7b3)][_0x5c6da4(0x1e8)][_0x5c6da4(0x592)](this),this['createButtonAssistWindow'](),this['_windowLayer']['x']=Math[_0x5c6da4(0x401)](this['_windowLayer']['x']),this[_0x5c6da4(0x705)]['y']=Math[_0x5c6da4(0x401)](this[_0x5c6da4(0x705)]['y']);},Scene_Base['prototype'][_0x39290f(0x507)]=function(){},Scene_Base[_0x39290f(0x24d)]['buttonAssistKey1']=function(){const _0xdff3f7=_0x39290f;return TextManager['getInputMultiButtonStrings'](_0xdff3f7(0x291),_0xdff3f7(0x4dd));},Scene_Base[_0x39290f(0x24d)][_0x39290f(0x75e)]=function(){const _0x18ec4c=_0x39290f;return TextManager[_0x18ec4c(0x483)](_0x18ec4c(0x361));},Scene_Base[_0x39290f(0x24d)][_0x39290f(0x229)]=function(){const _0x53b34a=_0x39290f;return TextManager[_0x53b34a(0x483)](_0x53b34a(0x596));},Scene_Base['prototype'][_0x39290f(0x74c)]=function(){const _0x5e6852=_0x39290f;return TextManager[_0x5e6852(0x483)]('ok');},Scene_Base['prototype'][_0x39290f(0x24a)]=function(){const _0x1bbeb0=_0x39290f;return TextManager[_0x1bbeb0(0x483)](_0x1bbeb0(0x16e));},Scene_Base[_0x39290f(0x24d)]['buttonAssistText1']=function(){const _0x59936c=_0x39290f;return this[_0x59936c(0x4ab)]&&this[_0x59936c(0x4ab)][_0x59936c(0x557)]?TextManager[_0x59936c(0x32a)]:'';},Scene_Base['prototype'][_0x39290f(0x1e6)]=function(){return'';},Scene_Base[_0x39290f(0x24d)][_0x39290f(0x461)]=function(){return'';},Scene_Base['prototype'][_0x39290f(0x65b)]=function(){return TextManager['buttonAssistOk'];},Scene_Base[_0x39290f(0x24d)][_0x39290f(0x4a0)]=function(){const _0x2baa15=_0x39290f;return TextManager[_0x2baa15(0x55f)];},Scene_Base[_0x39290f(0x24d)][_0x39290f(0x8ce)]=function(){return 0x0;},Scene_Base['prototype'][_0x39290f(0x240)]=function(){return 0x0;},Scene_Base[_0x39290f(0x24d)][_0x39290f(0x4d4)]=function(){return 0x0;},Scene_Base[_0x39290f(0x24d)]['buttonAssistOffset4']=function(){return 0x0;},Scene_Base[_0x39290f(0x24d)][_0x39290f(0x11e)]=function(){return 0x0;},VisuMZ['CoreEngine'][_0x39290f(0x45a)]=Scene_Boot[_0x39290f(0x24d)][_0x39290f(0x566)],Scene_Boot['prototype'][_0x39290f(0x566)]=function(){const _0x581442=_0x39290f;VisuMZ['CoreEngine'][_0x581442(0x45a)][_0x581442(0x592)](this),this['loadGameImagesCoreEngine']();},Scene_Boot[_0x39290f(0x24d)][_0x39290f(0x775)]=function(){const _0xee4f46=_0x39290f,_0x455144=['animations',_0xee4f46(0x5b1),_0xee4f46(0x3f5),'characters','enemies',_0xee4f46(0x6d6),'parallaxes',_0xee4f46(0x78e),_0xee4f46(0x13d),'sv_enemies',_0xee4f46(0x251),_0xee4f46(0x4b2),_0xee4f46(0x67c),'titles2'];for(const _0x12da0e of _0x455144){if('qEXmE'===_0xee4f46(0x3f9))return'';else{const _0x473402=VisuMZ[_0xee4f46(0x7b3)]['Settings']['ImgLoad'][_0x12da0e],_0x123745='img/%1/'[_0xee4f46(0x8ca)](_0x12da0e);for(const _0x5a0471 of _0x473402){_0xee4f46(0x303)!==_0xee4f46(0x48b)?ImageManager[_0xee4f46(0x5ca)](_0x123745,_0x5a0471):(_0x3e91d9[_0xee4f46(0x59c)]>0x0?_0x27e8da+=_0x26022b+'\x0a\x0a\x0a\x0a\x0a':_0x29d616+=_0x1bbf99+_0xee4f46(0x737)[_0xee4f46(0x8ca)](_0x1a3d90,_0x1b882e[_0xee4f46(0x8e0)]||_0xee4f46(0x457))+_0x2ed1e8,_0x4220c7+=_0x7536f7['format'](_0x3e3de6,_0x5f03bf));}}}},VisuMZ[_0x39290f(0x7b3)]['Scene_Boot_startNormalGame']=Scene_Boot[_0x39290f(0x24d)][_0x39290f(0x755)],Scene_Boot[_0x39290f(0x24d)]['startNormalGame']=function(){const _0x536fb6=_0x39290f;if(Utils[_0x536fb6(0x1c7)](_0x536fb6(0x451))&&VisuMZ[_0x536fb6(0x7b3)][_0x536fb6(0x1ac)]['QoL'][_0x536fb6(0x8a9)])this['startAutoNewGame']();else{if(_0x536fb6(0x180)!==_0x536fb6(0x6b1))VisuMZ[_0x536fb6(0x7b3)][_0x536fb6(0x219)][_0x536fb6(0x592)](this);else return _0x1b6896[_0x536fb6(0x7b3)][_0x536fb6(0x1ac)][_0x536fb6(0x5dd)][_0x536fb6(0x545)];}},Scene_Boot[_0x39290f(0x24d)][_0x39290f(0x3df)]=function(){const _0x4d4b6f=_0x39290f;DataManager['setupNewGame'](),SceneManager[_0x4d4b6f(0x560)](Scene_Map);},Scene_Boot[_0x39290f(0x24d)]['adjustBoxSize']=function(){const _0x2cc534=_0x39290f,_0x5b3136=$dataSystem[_0x2cc534(0x57e)][_0x2cc534(0x47a)],_0x319063=$dataSystem['advanced'][_0x2cc534(0x4cf)],_0x2f12f4=VisuMZ['CoreEngine'][_0x2cc534(0x1ac)]['UI']['BoxMargin'];Graphics['boxWidth']=_0x5b3136-_0x2f12f4*0x2,Graphics[_0x2cc534(0x7e2)]=_0x319063-_0x2f12f4*0x2,this['determineSideButtonLayoutValid']();},VisuMZ[_0x39290f(0x7b3)][_0x39290f(0x1d6)]=Scene_Boot['prototype'][_0x39290f(0x72a)],Scene_Boot[_0x39290f(0x24d)][_0x39290f(0x72a)]=function(){const _0x2dd05d=_0x39290f;if(this[_0x2dd05d(0x249)]()){if('ZCgdj'!==_0x2dd05d(0x407))this['makeDocumentTitle']();else{const _0x1f918c=_0x4459ce['width']-_0x4c5ea2[_0x2dd05d(0x3fd)]-_0xff78f8[_0x2dd05d(0x7b3)][_0x2dd05d(0x1ac)]['UI'][_0x2dd05d(0x450)]*0x2,_0xebf56=_0x7862af['prototype'][_0x2dd05d(0x7d4)][_0x2dd05d(0x592)](this)*0x4;if(_0x1f918c>=_0xebf56)_0x236f85['setSideButtonLayout'](!![]);}}else VisuMZ['CoreEngine'][_0x2dd05d(0x1d6)]['call'](this);},Scene_Boot[_0x39290f(0x24d)][_0x39290f(0x249)]=function(){const _0xa27996=_0x39290f;if(Scene_Title[_0xa27996(0x282)]==='')return![];if(Scene_Title[_0xa27996(0x282)]===_0xa27996(0x108))return![];if(Scene_Title['version']==='')return![];if(Scene_Title[_0xa27996(0x523)]==='0.00')return![];return!![];},Scene_Boot['prototype'][_0x39290f(0x6fb)]=function(){const _0x25ba52=_0x39290f,_0x595319=$dataSystem[_0x25ba52(0x413)],_0x226fde=Scene_Title['subtitle']||'',_0x3be3b8=Scene_Title[_0x25ba52(0x523)]||'',_0x7e1aa5=VisuMZ[_0x25ba52(0x7b3)]['Settings'][_0x25ba52(0x79c)][_0x25ba52(0x30c)][_0x25ba52(0x142)],_0x11df06=_0x7e1aa5[_0x25ba52(0x8ca)](_0x595319,_0x226fde,_0x3be3b8);document['title']=_0x11df06;},Scene_Boot[_0x39290f(0x24d)]['determineSideButtonLayoutValid']=function(){const _0x2718d9=_0x39290f;if(VisuMZ[_0x2718d9(0x7b3)][_0x2718d9(0x1ac)]['UI'][_0x2718d9(0x558)]){const _0x49b1b2=Graphics[_0x2718d9(0x42a)]-Graphics['boxWidth']-VisuMZ[_0x2718d9(0x7b3)][_0x2718d9(0x1ac)]['UI'][_0x2718d9(0x450)]*0x2,_0x1f3266=Sprite_Button[_0x2718d9(0x24d)][_0x2718d9(0x7d4)][_0x2718d9(0x592)](this)*0x4;if(_0x49b1b2>=_0x1f3266)SceneManager[_0x2718d9(0x140)](!![]);}},Scene_Title[_0x39290f(0x282)]=VisuMZ['CoreEngine']['Settings'][_0x39290f(0x79c)]['Title'][_0x39290f(0x108)],Scene_Title[_0x39290f(0x523)]=VisuMZ['CoreEngine'][_0x39290f(0x1ac)][_0x39290f(0x79c)][_0x39290f(0x30c)][_0x39290f(0x82f)],Scene_Title['pictureButtons']=VisuMZ[_0x39290f(0x7b3)]['Settings'][_0x39290f(0x34c)],VisuMZ[_0x39290f(0x7b3)]['Scene_Title_drawGameTitle']=Scene_Title[_0x39290f(0x24d)]['drawGameTitle'],Scene_Title[_0x39290f(0x24d)][_0x39290f(0x5fa)]=function(){const _0x4b4c00=_0x39290f;VisuMZ[_0x4b4c00(0x7b3)][_0x4b4c00(0x1ac)]['MenuLayout'][_0x4b4c00(0x30c)]['drawGameTitle'][_0x4b4c00(0x592)](this);if(Scene_Title[_0x4b4c00(0x282)]!==''&&Scene_Title['subtitle']!==_0x4b4c00(0x108))this[_0x4b4c00(0x76c)]();if(Scene_Title['version']!==''&&Scene_Title[_0x4b4c00(0x523)]!=='0.00')this[_0x4b4c00(0x1c9)]();},Scene_Title['prototype'][_0x39290f(0x76c)]=function(){const _0x3d1fab=_0x39290f;VisuMZ[_0x3d1fab(0x7b3)][_0x3d1fab(0x1ac)][_0x3d1fab(0x79c)]['Title'][_0x3d1fab(0x76c)][_0x3d1fab(0x592)](this);},Scene_Title[_0x39290f(0x24d)]['drawGameVersion']=function(){const _0x50a892=_0x39290f;VisuMZ[_0x50a892(0x7b3)][_0x50a892(0x1ac)][_0x50a892(0x79c)][_0x50a892(0x30c)][_0x50a892(0x1c9)][_0x50a892(0x592)](this);},Scene_Title[_0x39290f(0x24d)][_0x39290f(0x56a)]=function(){const _0x8c0a01=_0x39290f;this[_0x8c0a01(0x7d8)]();const _0x29eb1c=$dataSystem[_0x8c0a01(0x2fe)][_0x8c0a01(0x556)],_0x236981=this[_0x8c0a01(0x26a)]();this[_0x8c0a01(0x2c4)]=new Window_TitleCommand(_0x236981),this[_0x8c0a01(0x2c4)][_0x8c0a01(0x537)](_0x29eb1c);const _0x5e735b=this[_0x8c0a01(0x26a)]();this[_0x8c0a01(0x2c4)]['move'](_0x5e735b['x'],_0x5e735b['y'],_0x5e735b[_0x8c0a01(0x42a)],_0x5e735b['height']),this[_0x8c0a01(0x5fd)](this['_commandWindow']);},Scene_Title[_0x39290f(0x24d)][_0x39290f(0x27a)]=function(){const _0x43164c=_0x39290f;if(this['_commandWindow']){if(_0x43164c(0x506)!=='dDeFO')_0xf4bca6[_0x43164c(0x839)][0x23]=_0x43164c(0x823),_0x417e67['keyMapper'][0x24]=_0x43164c(0x287);else return this[_0x43164c(0x2c4)][_0x43164c(0x466)]();}else{if(_0x43164c(0x65a)===_0x43164c(0x65a))return VisuMZ[_0x43164c(0x7b3)]['Settings'][_0x43164c(0x7e4)][_0x43164c(0x59c)];else{const _0x7bb741=0x90,_0x5641fd=0x60,_0x4b38b0=0x18;this['_pauseSignSprite']['bitmap']=this[_0x43164c(0x15e)],this[_0x43164c(0x363)][_0x43164c(0x1a1)]['x']=0.5,this[_0x43164c(0x363)][_0x43164c(0x1a1)]['y']=0x1,this[_0x43164c(0x363)][_0x43164c(0x81d)](_0x3aeffc['round'](this[_0x43164c(0x376)]/0x2),this[_0x43164c(0x55e)]),this[_0x43164c(0x363)][_0x43164c(0x843)](_0x7bb741,_0x5641fd,_0x4b38b0,_0x4b38b0),this[_0x43164c(0x363)][_0x43164c(0x7c9)]=0xff;}}},Scene_Title[_0x39290f(0x24d)][_0x39290f(0x26a)]=function(){const _0x266ab3=_0x39290f;return VisuMZ[_0x266ab3(0x7b3)]['Settings'][_0x266ab3(0x79c)][_0x266ab3(0x30c)]['CommandRect'][_0x266ab3(0x592)](this);},Scene_Title[_0x39290f(0x24d)][_0x39290f(0x7d8)]=function(){const _0x420b54=_0x39290f;for(const _0x15569d of Scene_Title[_0x420b54(0x404)]){if(_0x420b54(0x69c)==='mdorr'){const _0x5c17e1=new Sprite_TitlePictureButton(_0x15569d);this[_0x420b54(0x359)](_0x5c17e1);}else{const _0x1860f8=_0x1b3112[_0x420b54(0x12a)]?(_0x4c0094[_0x420b54(0x24d)][_0x420b54(0x7d4)]()+0x6)*0x2:0x0,_0x4a2421=this[_0x420b54(0x8c2)](),_0x1584b6=_0x2cb9b8[_0x420b54(0x3fd)]-_0x1860f8*0x2,_0x45f302=this[_0x420b54(0x80a)]();return new _0x56f15c(_0x1860f8,_0x4a2421,_0x1584b6,_0x45f302);}}},VisuMZ[_0x39290f(0x7b3)][_0x39290f(0x67b)]=Scene_Map['prototype'][_0x39290f(0x796)],Scene_Map[_0x39290f(0x24d)][_0x39290f(0x796)]=function(){const _0x5dcc1d=_0x39290f;VisuMZ[_0x5dcc1d(0x7b3)][_0x5dcc1d(0x67b)]['call'](this),$gameTemp[_0x5dcc1d(0x665)]();},VisuMZ['CoreEngine'][_0x39290f(0x5a0)]=Scene_Map[_0x39290f(0x24d)]['updateMainMultiply'],Scene_Map[_0x39290f(0x24d)][_0x39290f(0x641)]=function(){const _0x61f2c5=_0x39290f;VisuMZ[_0x61f2c5(0x7b3)][_0x61f2c5(0x5a0)][_0x61f2c5(0x592)](this),$gameTemp[_0x61f2c5(0x664)]&&!$gameMessage[_0x61f2c5(0x817)]()&&(this[_0x61f2c5(0x3c3)](),SceneManager[_0x61f2c5(0x4cb)]());},Scene_Map[_0x39290f(0x24d)][_0x39290f(0x4fd)]=function(){const _0xc813e=_0x39290f;Scene_Message['prototype'][_0xc813e(0x4fd)][_0xc813e(0x592)](this),!SceneManager['isNextScene'](Scene_Battle)&&(this[_0xc813e(0x4bb)]['update'](),this[_0xc813e(0x57f)][_0xc813e(0x7ab)](),this[_0xc813e(0x705)][_0xc813e(0x557)]=![],SceneManager[_0xc813e(0x742)]()),$gameScreen[_0xc813e(0x120)]();},VisuMZ[_0x39290f(0x7b3)][_0x39290f(0x554)]=Scene_Map[_0x39290f(0x24d)][_0x39290f(0x569)],Scene_Map['prototype'][_0x39290f(0x569)]=function(){const _0x124ff1=_0x39290f;VisuMZ[_0x124ff1(0x7b3)]['Scene_Map_createMenuButton'][_0x124ff1(0x592)](this),SceneManager[_0x124ff1(0x505)]()&&this[_0x124ff1(0x186)]();},Scene_Map[_0x39290f(0x24d)][_0x39290f(0x186)]=function(){const _0x288763=_0x39290f;this[_0x288763(0x3dc)]['x']=Graphics['boxWidth']+0x4;},VisuMZ['CoreEngine'][_0x39290f(0x398)]=Scene_Map['prototype'][_0x39290f(0x1c4)],Scene_Map[_0x39290f(0x24d)]['updateScene']=function(){const _0xafdfe3=_0x39290f;VisuMZ[_0xafdfe3(0x7b3)][_0xafdfe3(0x398)][_0xafdfe3(0x592)](this),this['updateDashToggle']();},Scene_Map[_0x39290f(0x24d)][_0x39290f(0x32f)]=function(){const _0xfee9cc=_0x39290f;if(Input[_0xfee9cc(0x3b6)](_0xfee9cc(0x11b))){if(_0xfee9cc(0x400)!==_0xfee9cc(0x400)){const _0x592d55=_0x33fe60[_0xfee9cc(0x57e)][_0xfee9cc(0x47a)],_0x300d44=_0x346339[_0xfee9cc(0x57e)][_0xfee9cc(0x4cf)],_0x354e48=_0x417d69[_0xfee9cc(0x7b3)][_0xfee9cc(0x1ac)]['UI'][_0xfee9cc(0x450)];_0x3f5ea9[_0xfee9cc(0x3fd)]=_0x592d55-_0x354e48*0x2,_0x266d79[_0xfee9cc(0x7e2)]=_0x300d44-_0x354e48*0x2,this['determineSideButtonLayoutValid']();}else ConfigManager[_0xfee9cc(0x488)]=!ConfigManager[_0xfee9cc(0x488)],ConfigManager[_0xfee9cc(0x242)]();}},VisuMZ[_0x39290f(0x7b3)][_0x39290f(0x5eb)]=Scene_MenuBase['prototype'][_0x39290f(0x681)],Scene_MenuBase['prototype']['helpAreaTop']=function(){const _0x22e68b=_0x39290f;let _0x34a3d6=0x0;SceneManager[_0x22e68b(0x680)]()?_0x22e68b(0x250)==='eGgov'?_0x34a3d6=this[_0x22e68b(0x169)]():(_0x108a7b[_0x22e68b(0x24d)][_0x22e68b(0x6bb)][_0x22e68b(0x592)](this),this[_0x22e68b(0x19d)]()):_0x34a3d6=VisuMZ['CoreEngine'][_0x22e68b(0x5eb)][_0x22e68b(0x592)](this);if(this['isMenuButtonAssistEnabled']()&&this['getButtonAssistLocation']()==='top'){if('IYsza'!=='IYsza'){if(!this[_0x22e68b(0x610)])return;if(this[_0x22e68b(0x610)]['duration']<=0x0)return;this['x']=this[_0x22e68b(0x2c1)](this['x'],this[_0x22e68b(0x610)][_0x22e68b(0x256)]),this['y']=this[_0x22e68b(0x2c1)](this['y'],this[_0x22e68b(0x610)][_0x22e68b(0x325)]),this['scale']['x']=this[_0x22e68b(0x2c1)](this[_0x22e68b(0x137)]['x'],this['_coreEasing'][_0x22e68b(0x87a)]),this[_0x22e68b(0x137)]['y']=this['applyCoreEasing'](this['scale']['y'],this[_0x22e68b(0x610)][_0x22e68b(0x224)]),this['opacity']=this[_0x22e68b(0x2c1)](this[_0x22e68b(0x48f)],this[_0x22e68b(0x610)][_0x22e68b(0x1e9)]),this[_0x22e68b(0x8b6)]=this['applyCoreEasing'](this['backOpacity'],this[_0x22e68b(0x610)][_0x22e68b(0x1e1)]),this[_0x22e68b(0x500)]=this[_0x22e68b(0x2c1)](this[_0x22e68b(0x500)],this[_0x22e68b(0x610)]['targetContentsOpacity']),this[_0x22e68b(0x610)][_0x22e68b(0x521)]--;}else _0x34a3d6+=Window_ButtonAssist[_0x22e68b(0x24d)]['lineHeight']();}return _0x34a3d6;},Scene_MenuBase[_0x39290f(0x24d)][_0x39290f(0x169)]=function(){return this['isBottomHelpMode']()?this['mainAreaBottom']():0x0;},VisuMZ['CoreEngine'][_0x39290f(0x189)]=Scene_MenuBase['prototype'][_0x39290f(0x82a)],Scene_MenuBase['prototype'][_0x39290f(0x82a)]=function(){const _0x2462eb=_0x39290f;if(SceneManager[_0x2462eb(0x680)]())return this[_0x2462eb(0x813)]();else{if(_0x2462eb(0x212)!==_0x2462eb(0x212)){var _0x34660f=_0x5423c4(_0x4842e5['$1']);try{_0x367f34+=_0x2b9442(_0x34660f);}catch(_0x39e6ac){if(_0x370fe3['isPlaytest']())_0xa3658[_0x2462eb(0x24b)](_0x39e6ac);}}else return VisuMZ['CoreEngine'][_0x2462eb(0x189)][_0x2462eb(0x592)](this);}},Scene_MenuBase['prototype'][_0x39290f(0x813)]=function(){const _0x9c8e25=_0x39290f;if(!this[_0x9c8e25(0x574)]()){if('hMBZO'!=='GnqRM')return this[_0x9c8e25(0x636)]();else{const _0x1d1a1b=this[_0x9c8e25(0x3bd)]/0x5,_0x2bcd43=_0x4fa8df[_0x9c8e25(0x4eb)],_0x5a6aef=_0x2bcd43[_0x9c8e25(0x260)['format'](_0x3a793c)](),_0x505ded=_0x2bcd43[_0x9c8e25(0x8ad)[_0x9c8e25(0x8ca)](_0x4da217)]();this['_data'][_0x9c8e25(0x25b)[_0x9c8e25(0x8ca)](_0x5180b4)]=_0x5a6aef,this['_data'][_0x9c8e25(0x80f)[_0x9c8e25(0x8ca)](_0xe9748b)]=_0x505ded;if(_0x5a6aef==='')return;if(_0x505ded==='')return;const _0x5d6463=_0x2bcd43[_0x9c8e25(0x8d3)[_0x9c8e25(0x8ca)](_0x2bb2d9)](),_0x6fe1a2=this['itemPadding'](),_0x17c474=_0x1d1a1b*(_0x5c66a4-0x1)+_0x6fe1a2+_0x5d6463,_0x54ade2=_0x35e4c4[_0x9c8e25(0x7b3)][_0x9c8e25(0x1ac)]['ButtonAssist'][_0x9c8e25(0x491)];this['drawTextEx'](_0x54ade2[_0x9c8e25(0x8ca)](_0x5a6aef,_0x505ded),_0x17c474,0x0,_0x1d1a1b-_0x6fe1a2*0x2);}}else{if('rjpMR'!==_0x9c8e25(0x8e9))return 0x0;else{if(!this['isMenuButtonAssistEnabled']())return;const _0x5a1995=this[_0x9c8e25(0x806)]();this['_buttonAssistWindow']=new _0x318b7d(_0x5a1995),this[_0x9c8e25(0x5fd)](this[_0x9c8e25(0x23c)]);}}},VisuMZ[_0x39290f(0x7b3)][_0x39290f(0x866)]=Scene_MenuBase[_0x39290f(0x24d)]['mainAreaHeight'],Scene_MenuBase[_0x39290f(0x24d)][_0x39290f(0x522)]=function(){const _0x498cd8=_0x39290f;let _0x5229c2=0x0;if(SceneManager[_0x498cd8(0x680)]()){if(_0x498cd8(0x77a)!=='MXQmR')_0x5229c2=this['mainAreaHeightSideButtonLayout']();else{var _0x2b532e=_0x58c361(_0x57a680['$1']);_0x365c9d+=_0x2b532e;}}else _0x498cd8(0x5ee)===_0x498cd8(0x20b)?_0x18358a[_0x498cd8(0x664)]=!_0x244d82[_0x498cd8(0x664)]:_0x5229c2=VisuMZ[_0x498cd8(0x7b3)]['Scene_MenuBase_mainAreaHeight'][_0x498cd8(0x592)](this);return this[_0x498cd8(0x5fb)]()&&this['getButtonAssistLocation']()!==_0x498cd8(0x861)&&(_0x5229c2-=Window_ButtonAssist['prototype'][_0x498cd8(0x732)]()),_0x5229c2;},Scene_MenuBase['prototype'][_0x39290f(0x751)]=function(){const _0x950276=_0x39290f;return Graphics[_0x950276(0x7e2)]-this[_0x950276(0x7ad)]();},VisuMZ['CoreEngine'][_0x39290f(0x626)]=Scene_MenuBase[_0x39290f(0x24d)]['createBackground'],Scene_MenuBase[_0x39290f(0x24d)][_0x39290f(0x6f9)]=function(){const _0x23234b=_0x39290f;this[_0x23234b(0x1ff)]=new PIXI[(_0x23234b(0x4ea))][(_0x23234b(0x3c9))](clamp=!![]),this['_backgroundSprite']=new Sprite(),this[_0x23234b(0x205)]['bitmap']=SceneManager['backgroundBitmap'](),this[_0x23234b(0x205)][_0x23234b(0x4ea)]=[this[_0x23234b(0x1ff)]],this[_0x23234b(0x359)](this[_0x23234b(0x205)]),this['setBackgroundOpacity'](0xc0),this[_0x23234b(0x5c6)](this[_0x23234b(0x105)]()),this[_0x23234b(0x587)]();},Scene_MenuBase[_0x39290f(0x24d)]['getBackgroundOpacity']=function(){const _0x50e414=_0x39290f,_0x3c3d58=String(this[_0x50e414(0x76b)][_0x50e414(0x8e0)]),_0x56e3ff=this[_0x50e414(0x867)](_0x3c3d58);if(_0x56e3ff){if('fxpFa'===_0x50e414(0x32e)){const _0x17d025=_0x4b0977[_0x50e414(0x6c0)],_0x3beb68=_0x4865d1['ParamName'],_0xf11579=_0xc08cd7[_0x50e414(0x18c)],_0x382cf2=_0x1fa744[_0x50e414(0x2ca)],_0x3c9109=new _0x34b509(_0x118043[_0x50e414(0x707)]);_0x329483[_0x50e414(0x7b3)][_0x50e414(0x893)][_0x17d025[_0x50e414(0x6ce)]()[_0x50e414(0x4fb)]()]=_0x3beb68,_0x4f0a0b[_0x50e414(0x7b3)][_0x50e414(0x55d)][_0x17d025[_0x50e414(0x6ce)]()['trim']()]=_0xf11579,_0x104f52['CoreEngine'][_0x50e414(0x731)][_0x17d025['toUpperCase']()[_0x50e414(0x4fb)]()]=_0x382cf2,_0x7930ba[_0x50e414(0x7b3)][_0x50e414(0x1ad)][_0x17d025[_0x50e414(0x6ce)]()[_0x50e414(0x4fb)]()]=_0x17d025,_0x92d6e0['defineProperty'](_0x199f4e[_0x50e414(0x24d)],_0x17d025,{'get'(){const _0x1a0f76=_0x50e414,_0xd95df=_0x3c9109[_0x1a0f76(0x592)](this);return _0x382cf2===_0x1a0f76(0x2d3)?_0x113d49['round'](_0xd95df):_0xd95df;}});}else return _0x56e3ff[_0x50e414(0x47b)];}else{if(_0x50e414(0x3be)===_0x50e414(0x3be))return 0xc0;else _0x51669d[_0x50e414(0x79a)](!_0x1c6c5f['isSideView']());}},Scene_MenuBase[_0x39290f(0x24d)][_0x39290f(0x587)]=function(){const _0x164084=_0x39290f,_0x2b0fd0=String(this[_0x164084(0x76b)][_0x164084(0x8e0)]),_0x281ef6=this[_0x164084(0x867)](_0x2b0fd0);if(_0x281ef6&&(_0x281ef6[_0x164084(0x2ce)]!==''||_0x281ef6[_0x164084(0x21a)]!=='')){if(_0x164084(0x14c)===_0x164084(0x14c))this[_0x164084(0x351)]=new Sprite(ImageManager[_0x164084(0x725)](_0x281ef6[_0x164084(0x2ce)])),this[_0x164084(0x5ab)]=new Sprite(ImageManager[_0x164084(0x472)](_0x281ef6[_0x164084(0x21a)])),this[_0x164084(0x359)](this[_0x164084(0x351)]),this['addChild'](this[_0x164084(0x5ab)]),this[_0x164084(0x351)]['bitmap']['addLoadListener'](this[_0x164084(0x61e)][_0x164084(0x1df)](this,this['_backSprite1'])),this['_backSprite2'][_0x164084(0x28d)]['addLoadListener'](this[_0x164084(0x61e)][_0x164084(0x1df)](this,this[_0x164084(0x5ab)]));else{for(const _0xbc53d9 of this[_0x164084(0x7c8)]){!_0xbc53d9[_0x164084(0x765)]()&&this['removePointAnimation'](_0xbc53d9);}this[_0x164084(0x7cb)]();}}},Scene_MenuBase[_0x39290f(0x24d)][_0x39290f(0x867)]=function(_0x2be4e6){const _0x2bc10e=_0x39290f;return VisuMZ[_0x2bc10e(0x7b3)][_0x2bc10e(0x1ac)][_0x2bc10e(0x3bf)][_0x2be4e6]||VisuMZ[_0x2bc10e(0x7b3)]['Settings'][_0x2bc10e(0x3bf)]['Scene_Unlisted'];},Scene_MenuBase[_0x39290f(0x24d)][_0x39290f(0x61e)]=function(_0x58bccd){const _0x1966fd=_0x39290f;this[_0x1966fd(0x621)](_0x58bccd),this['centerSprite'](_0x58bccd);},VisuMZ[_0x39290f(0x7b3)][_0x39290f(0x7fa)]=Scene_MenuBase['prototype'][_0x39290f(0x645)],Scene_MenuBase[_0x39290f(0x24d)][_0x39290f(0x645)]=function(){const _0x1f2f8a=_0x39290f;VisuMZ[_0x1f2f8a(0x7b3)][_0x1f2f8a(0x7fa)][_0x1f2f8a(0x592)](this);if(SceneManager[_0x1f2f8a(0x505)]()){if(_0x1f2f8a(0x51c)===_0x1f2f8a(0x51c))this['moveCancelButtonSideButtonLayout']();else{if(this[_0x1f2f8a(0x25e)]===_0x25a3f2)this[_0x1f2f8a(0x2ef)]();this['_CoreEngineSettings'][_0x1f2f8a(0x2c3)]=this['initialBattleSystem']();}}},Scene_MenuBase[_0x39290f(0x24d)][_0x39290f(0x65e)]=function(){const _0xf385e7=_0x39290f;this[_0xf385e7(0x5d8)]['x']=Graphics['boxWidth']+0x4;},VisuMZ[_0x39290f(0x7b3)]['Scene_MenuBase_createPageButtons']=Scene_MenuBase[_0x39290f(0x24d)][_0x39290f(0x5d5)],Scene_MenuBase[_0x39290f(0x24d)][_0x39290f(0x5d5)]=function(){const _0x330516=_0x39290f;VisuMZ['CoreEngine'][_0x330516(0x18a)][_0x330516(0x592)](this),SceneManager[_0x330516(0x505)]()&&this[_0x330516(0x124)]();},Scene_MenuBase[_0x39290f(0x24d)][_0x39290f(0x124)]=function(){const _0x5b2aac=_0x39290f;this[_0x5b2aac(0x4ab)]['x']=-0x1*(this[_0x5b2aac(0x4ab)][_0x5b2aac(0x42a)]+this[_0x5b2aac(0x65c)][_0x5b2aac(0x42a)]+0x8),this[_0x5b2aac(0x65c)]['x']=-0x1*(this[_0x5b2aac(0x65c)][_0x5b2aac(0x42a)]+0x4);},Scene_MenuBase[_0x39290f(0x24d)][_0x39290f(0x5fb)]=function(){const _0x565daf=_0x39290f;return VisuMZ[_0x565daf(0x7b3)][_0x565daf(0x1ac)][_0x565daf(0x8bf)][_0x565daf(0x59d)];},Scene_MenuBase['prototype'][_0x39290f(0x674)]=function(){const _0x5727f6=_0x39290f;if(SceneManager['isSideButtonLayout']()||SceneManager[_0x5727f6(0x244)]())return _0x5727f6(0x7fc)!==_0x5727f6(0x7fc)?_0x5727f6(0x741):VisuMZ[_0x5727f6(0x7b3)]['Settings'][_0x5727f6(0x8bf)][_0x5727f6(0x22b)];else{if(_0x5727f6(0x4b0)===_0x5727f6(0x4b0))return _0x5727f6(0x861);else _0x5de5a7[_0x5727f6(0x488)]=!_0x2a8c6f[_0x5727f6(0x488)],_0x1baffc[_0x5727f6(0x242)]();}},Scene_MenuBase[_0x39290f(0x24d)][_0x39290f(0x507)]=function(){const _0x21bf2c=_0x39290f;if(!this[_0x21bf2c(0x5fb)]())return;const _0x17b8c9=this['buttonAssistWindowRect']();this[_0x21bf2c(0x23c)]=new Window_ButtonAssist(_0x17b8c9),this[_0x21bf2c(0x5fd)](this[_0x21bf2c(0x23c)]);},Scene_MenuBase[_0x39290f(0x24d)][_0x39290f(0x806)]=function(){const _0x51171f=_0x39290f;return this['getButtonAssistLocation']()===_0x51171f(0x861)?this[_0x51171f(0x168)]():this['buttonAssistWindowSideRect']();},Scene_MenuBase['prototype']['buttonAssistWindowButtonRect']=function(){const _0x5ca6e8=_0x39290f,_0x17fb2b=ConfigManager[_0x5ca6e8(0x12a)]?(Sprite_Button[_0x5ca6e8(0x24d)][_0x5ca6e8(0x7d4)]()+0x6)*0x2:0x0,_0x368464=this['buttonY'](),_0x2116e9=Graphics[_0x5ca6e8(0x3fd)]-_0x17fb2b*0x2,_0x2717b6=this['buttonAreaHeight']();return new Rectangle(_0x17fb2b,_0x368464,_0x2116e9,_0x2717b6);},Scene_MenuBase[_0x39290f(0x24d)][_0x39290f(0x6df)]=function(){const _0x296b6e=_0x39290f,_0x14396b=Graphics['boxWidth'],_0x5c6cc4=Window_ButtonAssist[_0x296b6e(0x24d)][_0x296b6e(0x732)](),_0x16dc6f=0x0;let _0x1d1af4=0x0;return this[_0x296b6e(0x674)]()==='top'?_0x296b6e(0x1ec)!==_0x296b6e(0x791)?_0x1d1af4=0x0:_0x5ef3d0['VisuMZ_2_BattleSystemSTB']&&(this[_0x296b6e(0x1ab)]=_0x296b6e(0x2a0)):_0x1d1af4=Graphics[_0x296b6e(0x7e2)]-_0x5c6cc4,new Rectangle(_0x16dc6f,_0x1d1af4,_0x14396b,_0x5c6cc4);},Scene_Menu[_0x39290f(0x302)]=VisuMZ['CoreEngine']['Settings'][_0x39290f(0x79c)][_0x39290f(0x415)],VisuMZ['CoreEngine'][_0x39290f(0x148)]=Scene_Menu['prototype'][_0x39290f(0x749)],Scene_Menu[_0x39290f(0x24d)]['create']=function(){const _0x28b6ea=_0x39290f;VisuMZ[_0x28b6ea(0x7b3)]['Scene_Menu_create'][_0x28b6ea(0x592)](this),this[_0x28b6ea(0x132)]();},Scene_Menu[_0x39290f(0x24d)]['setCoreEngineUpdateWindowBg']=function(){const _0x5bff5a=_0x39290f;this['_commandWindow']&&this['_commandWindow'][_0x5bff5a(0x537)](Scene_Menu[_0x5bff5a(0x302)][_0x5bff5a(0x58b)]),this[_0x5bff5a(0x5cc)]&&this[_0x5bff5a(0x5cc)]['setBackgroundType'](Scene_Menu[_0x5bff5a(0x302)][_0x5bff5a(0x635)]),this[_0x5bff5a(0x3dd)]&&this[_0x5bff5a(0x3dd)][_0x5bff5a(0x537)](Scene_Menu['layoutSettings'][_0x5bff5a(0x4df)]);},Scene_Menu['prototype'][_0x39290f(0x26a)]=function(){const _0x9fd7ee=_0x39290f;return Scene_Menu['layoutSettings']['CommandRect'][_0x9fd7ee(0x592)](this);},Scene_Menu[_0x39290f(0x24d)][_0x39290f(0x435)]=function(){const _0x115204=_0x39290f;return Scene_Menu[_0x115204(0x302)][_0x115204(0x784)][_0x115204(0x592)](this);},Scene_Menu[_0x39290f(0x24d)][_0x39290f(0x2a8)]=function(){const _0x103c41=_0x39290f;return Scene_Menu[_0x103c41(0x302)]['StatusRect']['call'](this);},Scene_Item[_0x39290f(0x302)]=VisuMZ['CoreEngine'][_0x39290f(0x1ac)][_0x39290f(0x79c)][_0x39290f(0x4f2)],VisuMZ['CoreEngine'][_0x39290f(0x670)]=Scene_Item['prototype']['create'],Scene_Item[_0x39290f(0x24d)][_0x39290f(0x749)]=function(){const _0xc79d29=_0x39290f;VisuMZ[_0xc79d29(0x7b3)]['Scene_Item_create'][_0xc79d29(0x592)](this),this[_0xc79d29(0x132)]();},Scene_Item['prototype'][_0x39290f(0x132)]=function(){const _0x5a6c99=_0x39290f;this[_0x5a6c99(0x8db)]&&this['_helpWindow'][_0x5a6c99(0x537)](Scene_Item[_0x5a6c99(0x302)]['HelpBgType']),this[_0x5a6c99(0x88c)]&&this['_categoryWindow'][_0x5a6c99(0x537)](Scene_Item[_0x5a6c99(0x302)][_0x5a6c99(0x8d8)]),this[_0x5a6c99(0x381)]&&this['_itemWindow']['setBackgroundType'](Scene_Item[_0x5a6c99(0x302)]['ItemBgType']),this[_0x5a6c99(0x671)]&&this[_0x5a6c99(0x671)]['setBackgroundType'](Scene_Item['layoutSettings'][_0x5a6c99(0x1b4)]);},Scene_Item['prototype'][_0x39290f(0x1b1)]=function(){const _0x1d1fe0=_0x39290f;return Scene_Item[_0x1d1fe0(0x302)][_0x1d1fe0(0x104)]['call'](this);},Scene_Item[_0x39290f(0x24d)][_0x39290f(0x762)]=function(){const _0x1273b9=_0x39290f;return Scene_Item[_0x1273b9(0x302)][_0x1273b9(0x7ac)]['call'](this);},Scene_Item[_0x39290f(0x24d)][_0x39290f(0x6b5)]=function(){const _0x50f9c6=_0x39290f;return Scene_Item[_0x50f9c6(0x302)]['ItemRect'][_0x50f9c6(0x592)](this);},Scene_Item['prototype']['actorWindowRect']=function(){const _0x373f26=_0x39290f;return Scene_Item[_0x373f26(0x302)][_0x373f26(0x238)][_0x373f26(0x592)](this);},Scene_Skill[_0x39290f(0x302)]=VisuMZ[_0x39290f(0x7b3)]['Settings'][_0x39290f(0x79c)]['SkillMenu'],VisuMZ[_0x39290f(0x7b3)][_0x39290f(0x60d)]=Scene_Skill[_0x39290f(0x24d)][_0x39290f(0x749)],Scene_Skill['prototype'][_0x39290f(0x749)]=function(){const _0x33b277=_0x39290f;VisuMZ['CoreEngine'][_0x33b277(0x60d)]['call'](this),this[_0x33b277(0x132)]();},Scene_Skill['prototype'][_0x39290f(0x132)]=function(){const _0xd7ca0c=_0x39290f;this[_0xd7ca0c(0x8db)]&&this['_helpWindow']['setBackgroundType'](Scene_Skill[_0xd7ca0c(0x302)]['HelpBgType']);if(this[_0xd7ca0c(0x2f0)]){if(_0xd7ca0c(0x486)!=='slAIh'){if(this['_CoreEngineSettings']===_0x5404ef)this[_0xd7ca0c(0x2ef)]();if(this['_CoreEngineSettings'][_0xd7ca0c(0x2e2)]===_0x51ab93)this[_0xd7ca0c(0x2ef)]();this[_0xd7ca0c(0x25e)][_0xd7ca0c(0x706)]=_0x448c75;}else this['_skillTypeWindow']['setBackgroundType'](Scene_Skill['layoutSettings'][_0xd7ca0c(0x26e)]);}this[_0xd7ca0c(0x3dd)]&&this[_0xd7ca0c(0x3dd)][_0xd7ca0c(0x537)](Scene_Skill['layoutSettings'][_0xd7ca0c(0x4df)]),this[_0xd7ca0c(0x381)]&&this[_0xd7ca0c(0x381)][_0xd7ca0c(0x537)](Scene_Skill[_0xd7ca0c(0x302)][_0xd7ca0c(0x43e)]),this[_0xd7ca0c(0x671)]&&this[_0xd7ca0c(0x671)][_0xd7ca0c(0x537)](Scene_Skill[_0xd7ca0c(0x302)][_0xd7ca0c(0x1b4)]);},Scene_Skill[_0x39290f(0x24d)][_0x39290f(0x1b1)]=function(){const _0x1070d2=_0x39290f;return Scene_Skill['layoutSettings']['HelpRect'][_0x1070d2(0x592)](this);},Scene_Skill[_0x39290f(0x24d)]['skillTypeWindowRect']=function(){const _0x4b7293=_0x39290f;return Scene_Skill[_0x4b7293(0x302)][_0x4b7293(0x23b)][_0x4b7293(0x592)](this);},Scene_Skill[_0x39290f(0x24d)][_0x39290f(0x2a8)]=function(){const _0xabbbfb=_0x39290f;return Scene_Skill[_0xabbbfb(0x302)][_0xabbbfb(0x71b)][_0xabbbfb(0x592)](this);},Scene_Skill['prototype'][_0x39290f(0x6b5)]=function(){const _0x17497d=_0x39290f;return Scene_Skill[_0x17497d(0x302)][_0x17497d(0x5ec)][_0x17497d(0x592)](this);},Scene_Skill['prototype'][_0x39290f(0x4cd)]=function(){const _0xa13744=_0x39290f;return Scene_Skill[_0xa13744(0x302)][_0xa13744(0x238)][_0xa13744(0x592)](this);},Scene_Equip[_0x39290f(0x302)]=VisuMZ['CoreEngine'][_0x39290f(0x1ac)][_0x39290f(0x79c)][_0x39290f(0x7b8)],VisuMZ[_0x39290f(0x7b3)]['Scene_Equip_create']=Scene_Equip['prototype'][_0x39290f(0x749)],Scene_Equip[_0x39290f(0x24d)][_0x39290f(0x749)]=function(){const _0x25b79c=_0x39290f;VisuMZ[_0x25b79c(0x7b3)]['Scene_Equip_create'][_0x25b79c(0x592)](this),this['setCoreEngineUpdateWindowBg']();},Scene_Equip['prototype'][_0x39290f(0x132)]=function(){const _0xee97a7=_0x39290f;this[_0xee97a7(0x8db)]&&this[_0xee97a7(0x8db)][_0xee97a7(0x537)](Scene_Equip[_0xee97a7(0x302)][_0xee97a7(0x84f)]),this['_statusWindow']&&this[_0xee97a7(0x3dd)][_0xee97a7(0x537)](Scene_Equip[_0xee97a7(0x302)][_0xee97a7(0x4df)]),this[_0xee97a7(0x2c4)]&&this[_0xee97a7(0x2c4)][_0xee97a7(0x537)](Scene_Equip[_0xee97a7(0x302)]['CommandBgType']),this[_0xee97a7(0x837)]&&this[_0xee97a7(0x837)]['setBackgroundType'](Scene_Equip[_0xee97a7(0x302)][_0xee97a7(0x434)]),this[_0xee97a7(0x381)]&&(_0xee97a7(0x262)!==_0xee97a7(0x204)?this[_0xee97a7(0x381)][_0xee97a7(0x537)](Scene_Equip[_0xee97a7(0x302)][_0xee97a7(0x43e)]):_0x125f41[_0xee97a7(0x17d)](_0x379098));},Scene_Equip[_0x39290f(0x24d)]['helpWindowRect']=function(){const _0xa291e9=_0x39290f;return Scene_Equip[_0xa291e9(0x302)]['HelpRect']['call'](this);},Scene_Equip[_0x39290f(0x24d)][_0x39290f(0x2a8)]=function(){const _0x2fff1f=_0x39290f;return Scene_Equip['layoutSettings']['StatusRect'][_0x2fff1f(0x592)](this);},Scene_Equip[_0x39290f(0x24d)][_0x39290f(0x26a)]=function(){const _0x26603a=_0x39290f;return Scene_Equip['layoutSettings'][_0x26603a(0x49d)][_0x26603a(0x592)](this);},Scene_Equip[_0x39290f(0x24d)][_0x39290f(0x35b)]=function(){const _0x45b1df=_0x39290f;return Scene_Equip[_0x45b1df(0x302)][_0x45b1df(0x501)][_0x45b1df(0x592)](this);},Scene_Equip[_0x39290f(0x24d)]['itemWindowRect']=function(){const _0x5be4dd=_0x39290f;return Scene_Equip['layoutSettings'][_0x5be4dd(0x5ec)][_0x5be4dd(0x592)](this);},Scene_Status[_0x39290f(0x302)]=VisuMZ['CoreEngine'][_0x39290f(0x1ac)][_0x39290f(0x79c)]['StatusMenu'],VisuMZ[_0x39290f(0x7b3)][_0x39290f(0x52d)]=Scene_Status[_0x39290f(0x24d)][_0x39290f(0x749)],Scene_Status[_0x39290f(0x24d)][_0x39290f(0x749)]=function(){const _0x15e1d8=_0x39290f;VisuMZ[_0x15e1d8(0x7b3)][_0x15e1d8(0x52d)]['call'](this),this[_0x15e1d8(0x132)]();},Scene_Status[_0x39290f(0x24d)]['setCoreEngineUpdateWindowBg']=function(){const _0x3cfe36=_0x39290f;this[_0x3cfe36(0x5f5)]&&(_0x3cfe36(0x3ba)!==_0x3cfe36(0x2d5)?this[_0x3cfe36(0x5f5)][_0x3cfe36(0x537)](Scene_Status[_0x3cfe36(0x302)][_0x3cfe36(0x126)]):this[_0x3cfe36(0x814)]()&&_0x3eca8c&&this['maxCols']()===0x1&&this[_0x3cfe36(0x2aa)]()===0x0?this[_0x3cfe36(0x4ef)](this[_0x3cfe36(0x466)]()-0x1):_0x3141c1[_0x3cfe36(0x7b3)]['Window_Selectable_cursorUp'][_0x3cfe36(0x592)](this,_0x2a57ee));this['_statusWindow']&&(_0x3cfe36(0x125)!==_0x3cfe36(0x52a)?this['_statusWindow']['setBackgroundType'](Scene_Status[_0x3cfe36(0x302)][_0x3cfe36(0x4df)]):_0x248f00=_0x48895a[_0x3cfe36(0x886)](_0x4d635e,_0x15cd00(_0x189249(_0x49c223))));if(this['_statusParamsWindow']){if(_0x3cfe36(0x774)!==_0x3cfe36(0x774)){if(_0x11bdd5[_0x3cfe36(0x499)]()){const _0x31dae9=_0x2b2d40['CoreEngine'][_0x3cfe36(0x1ac)]['QoL'][_0x3cfe36(0x6b3)];if(_0x31dae9>0x0)_0x1ff64f[_0x3cfe36(0x230)](_0x31dae9);}}else this[_0x3cfe36(0x2bc)]['setBackgroundType'](Scene_Status[_0x3cfe36(0x302)][_0x3cfe36(0x3a3)]);}this[_0x3cfe36(0x7c5)]&&this[_0x3cfe36(0x7c5)]['setBackgroundType'](Scene_Status[_0x3cfe36(0x302)][_0x3cfe36(0x6cb)]);},Scene_Status[_0x39290f(0x24d)][_0x39290f(0x81c)]=function(){const _0x1fb8cd=_0x39290f;return Scene_Status[_0x1fb8cd(0x302)][_0x1fb8cd(0x3a2)][_0x1fb8cd(0x592)](this);},Scene_Status[_0x39290f(0x24d)]['statusWindowRect']=function(){const _0x7f3d1e=_0x39290f;return Scene_Status['layoutSettings'][_0x7f3d1e(0x71b)][_0x7f3d1e(0x592)](this);},Scene_Status['prototype'][_0x39290f(0x662)]=function(){const _0x42dd48=_0x39290f;return Scene_Status[_0x42dd48(0x302)][_0x42dd48(0x601)]['call'](this);},Scene_Status['prototype'][_0x39290f(0x736)]=function(){const _0x29a368=_0x39290f;return Scene_Status[_0x29a368(0x302)][_0x29a368(0x299)][_0x29a368(0x592)](this);},Scene_Options[_0x39290f(0x302)]=VisuMZ[_0x39290f(0x7b3)][_0x39290f(0x1ac)][_0x39290f(0x79c)]['OptionsMenu'],VisuMZ[_0x39290f(0x7b3)][_0x39290f(0x832)]=Scene_Options['prototype'][_0x39290f(0x749)],Scene_Options[_0x39290f(0x24d)][_0x39290f(0x749)]=function(){const _0x1915a6=_0x39290f;VisuMZ[_0x1915a6(0x7b3)][_0x1915a6(0x832)][_0x1915a6(0x592)](this),this[_0x1915a6(0x132)]();},Scene_Options[_0x39290f(0x24d)][_0x39290f(0x132)]=function(){const _0x31c4a6=_0x39290f;if(this[_0x31c4a6(0x56d)]){if(_0x31c4a6(0x313)!=='LAzfJ')this[_0x31c4a6(0x56d)][_0x31c4a6(0x537)](Scene_Options[_0x31c4a6(0x302)]['OptionsBgType']);else{this[_0x31c4a6(0x328)][_0x31c4a6(0x575)](),this['contentsBack']['clear'](),this['resetTextColor']();let _0x376ac5=_0x43d17d[_0x31c4a6(0x7b3)]['Settings'][_0x31c4a6(0x190)][_0x31c4a6(0x26f)][_0x31c4a6(0x2e3)]('\x0a'),_0x46000b=_0x376ac5['length'],_0x4deeea=(this[_0x31c4a6(0x87c)]-_0x46000b*this[_0x31c4a6(0x732)]())/0x2;for(let _0x275162=0x0;_0x275162<_0x46000b;++_0x275162){let _0x2d83db=_0x376ac5[_0x275162],_0x5e5ce2=this[_0x31c4a6(0x685)](_0x2d83db)[_0x31c4a6(0x42a)],_0xb40542=_0x205f0c['floor']((this[_0x31c4a6(0x328)][_0x31c4a6(0x42a)]-_0x5e5ce2)/0x2);this['drawTextEx'](_0x2d83db,_0xb40542,_0x4deeea),_0x4deeea+=this[_0x31c4a6(0x732)]();}}}},Scene_Options[_0x39290f(0x24d)][_0x39290f(0x511)]=function(){const _0x29dab3=_0x39290f;return Scene_Options[_0x29dab3(0x302)][_0x29dab3(0x440)]['call'](this);},Scene_Save[_0x39290f(0x302)]=VisuMZ['CoreEngine'][_0x39290f(0x1ac)][_0x39290f(0x79c)][_0x39290f(0x3ad)],Scene_Save[_0x39290f(0x24d)][_0x39290f(0x749)]=function(){const _0x8f359b=_0x39290f;Scene_File[_0x8f359b(0x24d)][_0x8f359b(0x749)][_0x8f359b(0x592)](this),this[_0x8f359b(0x132)]();},Scene_Save[_0x39290f(0x24d)][_0x39290f(0x132)]=function(){const _0x1226ec=_0x39290f;this[_0x1226ec(0x8db)]&&this[_0x1226ec(0x8db)][_0x1226ec(0x537)](Scene_Save[_0x1226ec(0x302)][_0x1226ec(0x84f)]),this[_0x1226ec(0x614)]&&this[_0x1226ec(0x614)][_0x1226ec(0x537)](Scene_Save[_0x1226ec(0x302)][_0x1226ec(0x35f)]);},Scene_Save[_0x39290f(0x24d)][_0x39290f(0x1b1)]=function(){const _0x2f1378=_0x39290f;return Scene_Save['layoutSettings'][_0x2f1378(0x104)][_0x2f1378(0x592)](this);},Scene_Save[_0x39290f(0x24d)][_0x39290f(0x631)]=function(){const _0x1cfa5d=_0x39290f;return Scene_Save[_0x1cfa5d(0x302)][_0x1cfa5d(0x72f)][_0x1cfa5d(0x592)](this);},Scene_Load[_0x39290f(0x302)]=VisuMZ['CoreEngine'][_0x39290f(0x1ac)]['MenuLayout']['LoadMenu'],Scene_Load[_0x39290f(0x24d)]['create']=function(){const _0xbd0bf=_0x39290f;Scene_File[_0xbd0bf(0x24d)][_0xbd0bf(0x749)]['call'](this),this['setCoreEngineUpdateWindowBg']();},Scene_Load[_0x39290f(0x24d)][_0x39290f(0x132)]=function(){const _0x54e05e=_0x39290f;this['_helpWindow']&&(_0x54e05e(0x518)===_0x54e05e(0x45e)?this['_forcedTroopView']='FV':this[_0x54e05e(0x8db)][_0x54e05e(0x537)](Scene_Load[_0x54e05e(0x302)][_0x54e05e(0x84f)])),this['_listWindow']&&(_0x54e05e(0x69b)===_0x54e05e(0x69b)?this[_0x54e05e(0x614)][_0x54e05e(0x537)](Scene_Load[_0x54e05e(0x302)][_0x54e05e(0x35f)]):this[_0x54e05e(0x1ab)]=_0x54e05e(0x30e));},Scene_Load[_0x39290f(0x24d)][_0x39290f(0x1b1)]=function(){const _0x491dc3=_0x39290f;return Scene_Load[_0x491dc3(0x302)][_0x491dc3(0x104)]['call'](this);},Scene_Load[_0x39290f(0x24d)]['listWindowRect']=function(){const _0x23f683=_0x39290f;return Scene_Load[_0x23f683(0x302)][_0x23f683(0x72f)][_0x23f683(0x592)](this);},Scene_GameEnd[_0x39290f(0x302)]=VisuMZ[_0x39290f(0x7b3)]['Settings'][_0x39290f(0x79c)][_0x39290f(0x31b)],VisuMZ[_0x39290f(0x7b3)]['Scene_GameEnd_createBackground']=Scene_GameEnd[_0x39290f(0x24d)]['createBackground'],Scene_GameEnd['prototype'][_0x39290f(0x6f9)]=function(){const _0x3fa484=_0x39290f;Scene_MenuBase[_0x3fa484(0x24d)][_0x3fa484(0x6f9)][_0x3fa484(0x592)](this);},Scene_GameEnd[_0x39290f(0x24d)][_0x39290f(0x56a)]=function(){const _0xaf3ced=_0x39290f,_0x17e6df=this[_0xaf3ced(0x26a)]();this[_0xaf3ced(0x2c4)]=new Window_GameEnd(_0x17e6df),this[_0xaf3ced(0x2c4)][_0xaf3ced(0x2fd)](_0xaf3ced(0x16e),this[_0xaf3ced(0x563)][_0xaf3ced(0x1df)](this)),this[_0xaf3ced(0x5fd)](this['_commandWindow']),this[_0xaf3ced(0x2c4)][_0xaf3ced(0x537)](Scene_GameEnd[_0xaf3ced(0x302)][_0xaf3ced(0x58b)]);},Scene_GameEnd[_0x39290f(0x24d)][_0x39290f(0x26a)]=function(){const _0x5a9aba=_0x39290f;return Scene_GameEnd[_0x5a9aba(0x302)][_0x5a9aba(0x49d)]['call'](this);},Scene_Shop['layoutSettings']=VisuMZ[_0x39290f(0x7b3)][_0x39290f(0x1ac)]['MenuLayout'][_0x39290f(0x21d)],VisuMZ[_0x39290f(0x7b3)][_0x39290f(0x342)]=Scene_Shop[_0x39290f(0x24d)]['create'],Scene_Shop[_0x39290f(0x24d)]['create']=function(){const _0xb45f42=_0x39290f;VisuMZ[_0xb45f42(0x7b3)][_0xb45f42(0x342)]['call'](this),this['setCoreEngineUpdateWindowBg']();},Scene_Shop[_0x39290f(0x24d)]['setCoreEngineUpdateWindowBg']=function(){const _0x4bc2cf=_0x39290f;this[_0x4bc2cf(0x8db)]&&this[_0x4bc2cf(0x8db)][_0x4bc2cf(0x537)](Scene_Shop['layoutSettings'][_0x4bc2cf(0x84f)]);this[_0x4bc2cf(0x5cc)]&&this[_0x4bc2cf(0x5cc)]['setBackgroundType'](Scene_Shop[_0x4bc2cf(0x302)][_0x4bc2cf(0x635)]);if(this[_0x4bc2cf(0x2c4)]){if(_0x4bc2cf(0x8a3)!==_0x4bc2cf(0x661))this[_0x4bc2cf(0x2c4)][_0x4bc2cf(0x537)](Scene_Shop[_0x4bc2cf(0x302)][_0x4bc2cf(0x58b)]);else return _0x55529b[_0x4bc2cf(0x7b3)][_0x4bc2cf(0x893)][_0x144dbc];}this['_dummyWindow']&&this[_0x4bc2cf(0x395)][_0x4bc2cf(0x537)](Scene_Shop[_0x4bc2cf(0x302)][_0x4bc2cf(0x6c8)]),this[_0x4bc2cf(0x297)]&&this['_numberWindow']['setBackgroundType'](Scene_Shop[_0x4bc2cf(0x302)][_0x4bc2cf(0x552)]),this[_0x4bc2cf(0x3dd)]&&this['_statusWindow'][_0x4bc2cf(0x537)](Scene_Shop['layoutSettings'][_0x4bc2cf(0x4df)]),this[_0x4bc2cf(0x6f7)]&&('GXnAt'===_0x4bc2cf(0x141)?(this[_0x4bc2cf(0x5b8)](_0x280e55[_0x4bc2cf(0x43a)]()),this[_0x4bc2cf(0x218)](_0x1dcbe6,_0x54c642,_0xdadcd4,_0x2dda30,_0x4bc2cf(0x183)),_0x5edd6b-=this['textWidth'](_0x3dbf9d)+0x6):this[_0x4bc2cf(0x6f7)][_0x4bc2cf(0x537)](Scene_Shop[_0x4bc2cf(0x302)][_0x4bc2cf(0x150)])),this['_categoryWindow']&&this['_categoryWindow'][_0x4bc2cf(0x537)](Scene_Shop[_0x4bc2cf(0x302)][_0x4bc2cf(0x8d8)]),this['_sellWindow']&&this[_0x4bc2cf(0x62d)]['setBackgroundType'](Scene_Shop['layoutSettings']['SellBgType']);},Scene_Shop[_0x39290f(0x24d)][_0x39290f(0x1b1)]=function(){const _0x33f67d=_0x39290f;return Scene_Shop[_0x33f67d(0x302)][_0x33f67d(0x104)][_0x33f67d(0x592)](this);},Scene_Shop['prototype'][_0x39290f(0x435)]=function(){const _0x5ec946=_0x39290f;return Scene_Shop[_0x5ec946(0x302)]['GoldRect'][_0x5ec946(0x592)](this);},Scene_Shop[_0x39290f(0x24d)][_0x39290f(0x26a)]=function(){const _0x5120e3=_0x39290f;return Scene_Shop[_0x5120e3(0x302)][_0x5120e3(0x49d)][_0x5120e3(0x592)](this);},Scene_Shop[_0x39290f(0x24d)]['dummyWindowRect']=function(){const _0x5eb5b4=_0x39290f;return Scene_Shop[_0x5eb5b4(0x302)][_0x5eb5b4(0x425)][_0x5eb5b4(0x592)](this);},Scene_Shop[_0x39290f(0x24d)]['numberWindowRect']=function(){const _0x2dbf3b=_0x39290f;return Scene_Shop[_0x2dbf3b(0x302)][_0x2dbf3b(0x508)]['call'](this);},Scene_Shop[_0x39290f(0x24d)]['statusWindowRect']=function(){const _0x376b6b=_0x39290f;return Scene_Shop['layoutSettings']['StatusRect'][_0x376b6b(0x592)](this);},Scene_Shop[_0x39290f(0x24d)]['buyWindowRect']=function(){const _0x30b26a=_0x39290f;return Scene_Shop[_0x30b26a(0x302)][_0x30b26a(0x446)]['call'](this);},Scene_Shop['prototype'][_0x39290f(0x762)]=function(){const _0x4016d2=_0x39290f;return Scene_Shop[_0x4016d2(0x302)][_0x4016d2(0x7ac)][_0x4016d2(0x592)](this);},Scene_Shop[_0x39290f(0x24d)][_0x39290f(0x892)]=function(){const _0x5590de=_0x39290f;return Scene_Shop['layoutSettings'][_0x5590de(0x411)][_0x5590de(0x592)](this);},Scene_Name[_0x39290f(0x302)]=VisuMZ['CoreEngine'][_0x39290f(0x1ac)][_0x39290f(0x79c)][_0x39290f(0x527)],VisuMZ[_0x39290f(0x7b3)]['Scene_Name_create']=Scene_Name[_0x39290f(0x24d)][_0x39290f(0x749)],Scene_Name['prototype'][_0x39290f(0x749)]=function(){const _0x3964f3=_0x39290f;VisuMZ['CoreEngine'][_0x3964f3(0x717)]['call'](this),this[_0x3964f3(0x132)]();},Scene_Name[_0x39290f(0x24d)][_0x39290f(0x132)]=function(){const _0x3ad1dc=_0x39290f;this[_0x3ad1dc(0x542)]&&this[_0x3ad1dc(0x542)][_0x3ad1dc(0x537)](Scene_Name[_0x3ad1dc(0x302)][_0x3ad1dc(0x123)]),this[_0x3ad1dc(0x10d)]&&this[_0x3ad1dc(0x10d)][_0x3ad1dc(0x537)](Scene_Name[_0x3ad1dc(0x302)][_0x3ad1dc(0x5e3)]);},Scene_Name[_0x39290f(0x24d)][_0x39290f(0x7ad)]=function(){return 0x0;},Scene_Name['prototype'][_0x39290f(0x316)]=function(){const _0x2d9edc=_0x39290f;return Scene_Name[_0x2d9edc(0x302)][_0x2d9edc(0x414)][_0x2d9edc(0x592)](this);},Scene_Name['prototype'][_0x39290f(0x2e5)]=function(){const _0x57cad2=_0x39290f;return Scene_Name['layoutSettings'][_0x57cad2(0x5fc)][_0x57cad2(0x592)](this);},Scene_Name[_0x39290f(0x24d)][_0x39290f(0x6c4)]=function(){const _0x3f8f40=_0x39290f;if(!this[_0x3f8f40(0x10d)])return![];return VisuMZ[_0x3f8f40(0x7b3)]['Settings'][_0x3f8f40(0x190)]['EnableNameInput'];},Scene_Name[_0x39290f(0x24d)][_0x39290f(0x613)]=function(){const _0x185eaf=_0x39290f;return this['EnableNameInput']()?TextManager[_0x185eaf(0x483)](_0x185eaf(0x361)):Scene_MenuBase[_0x185eaf(0x24d)][_0x185eaf(0x613)][_0x185eaf(0x592)](this);},Scene_Name[_0x39290f(0x24d)][_0x39290f(0x2d2)]=function(){const _0x5f0658=_0x39290f;if(this[_0x5f0658(0x6c4)]()){if('mCaSl'===_0x5f0658(0x1c5)){const _0x151d54=VisuMZ[_0x5f0658(0x7b3)][_0x5f0658(0x1ac)][_0x5f0658(0x190)];return this['_inputWindow'][_0x5f0658(0x6f4)]===_0x5f0658(0x3e2)?_0x151d54[_0x5f0658(0x191)]||_0x5f0658(0x191):_0x151d54['Manual']||_0x5f0658(0x358);}else{const _0x22ab23=_0x1ac8e2[_0x5f0658(0x530)]('IconSet'),_0x14b2d5=_0x37922c[_0x5f0658(0x441)],_0x1a9730=_0x34f177[_0x5f0658(0x34b)],_0x36b176=_0x231580%0x10*_0x14b2d5,_0x433f01=_0x1b16b0[_0x5f0658(0x27c)](_0x53a5e7/0x10)*_0x1a9730,_0xe7ec59=_0x44e69f,_0x4f3ad7=_0x4006cf;this[_0x5f0658(0x328)][_0x5f0658(0x24f)]['imageSmoothingEnabled']=_0x41d0b4,this[_0x5f0658(0x328)][_0x5f0658(0x409)](_0x22ab23,_0x36b176,_0x433f01,_0x14b2d5,_0x1a9730,_0xff1538,_0x37f499,_0xe7ec59,_0x4f3ad7),this[_0x5f0658(0x328)][_0x5f0658(0x24f)][_0x5f0658(0x14f)]=!![];}}else return _0x5f0658(0x236)!==_0x5f0658(0x221)?Scene_MenuBase[_0x5f0658(0x24d)][_0x5f0658(0x2d2)]['call'](this):this[_0x5f0658(0x2b4)]||this;},VisuMZ['CoreEngine'][_0x39290f(0x2d9)]=Scene_Name[_0x39290f(0x24d)][_0x39290f(0x467)],Scene_Name[_0x39290f(0x24d)][_0x39290f(0x467)]=function(){const _0x1cf753=_0x39290f;if(this['doesNameContainBannedWords']()){if(_0x1cf753(0x551)===_0x1cf753(0x551))this[_0x1cf753(0x6be)]();else{const _0xd78650=this[_0x1cf753(0x3cc)];_0xd78650[_0x1cf753(0x242)](),_0xd78650['font']=this[_0x1cf753(0x164)]();const _0x26fc6e=_0xd78650[_0x1cf753(0x8b3)](_0x553cc3)[_0x1cf753(0x42a)];return _0xd78650[_0x1cf753(0x8cf)](),_0x26fc6e;}}else VisuMZ[_0x1cf753(0x7b3)]['Scene_Name_onInputOk'][_0x1cf753(0x592)](this);},Scene_Name[_0x39290f(0x24d)]['doesNameContainBannedWords']=function(){const _0x52b7b9=_0x39290f,_0x48a4ca=VisuMZ[_0x52b7b9(0x7b3)]['Settings'][_0x52b7b9(0x190)];if(!_0x48a4ca)return![];const _0x303d7b=_0x48a4ca[_0x52b7b9(0x3d5)];if(!_0x303d7b)return![];const _0x510e03=this['_editWindow'][_0x52b7b9(0x8e0)]()[_0x52b7b9(0x510)]();for(const _0xe63415 of _0x303d7b){if(_0x510e03[_0x52b7b9(0x6d3)](_0xe63415[_0x52b7b9(0x510)]()))return!![];}return![];},Scene_Name[_0x39290f(0x24d)][_0x39290f(0x6be)]=function(){const _0x223a29=_0x39290f;SoundManager[_0x223a29(0x1fc)]();},VisuMZ[_0x39290f(0x7b3)]['Scene_Battle_update']=Scene_Battle[_0x39290f(0x24d)][_0x39290f(0x6bb)],Scene_Battle[_0x39290f(0x24d)]['update']=function(){const _0x232bf3=_0x39290f;VisuMZ[_0x232bf3(0x7b3)][_0x232bf3(0x377)][_0x232bf3(0x592)](this);if($gameTemp[_0x232bf3(0x664)])this[_0x232bf3(0x4f0)]();},Scene_Battle['prototype'][_0x39290f(0x4f0)]=function(){const _0x1f7400=_0x39290f;if(!BattleManager['isInputting']()&&!this[_0x1f7400(0x41c)]&&!$gameMessage['isBusy']()){if(_0x1f7400(0x2f5)!==_0x1f7400(0x2f5)){const _0x1e22cb=_0x5a2eea['displayX']()*_0x4f32b5[_0x1f7400(0x246)]();return this['_x']-_0x1e22cb;}else this[_0x1f7400(0x41c)]=!![],this[_0x1f7400(0x6bb)](),SceneManager[_0x1f7400(0x4cb)](),this[_0x1f7400(0x41c)]=![];}},VisuMZ[_0x39290f(0x7b3)][_0x39290f(0x58a)]=Scene_Battle[_0x39290f(0x24d)][_0x39290f(0x645)],Scene_Battle[_0x39290f(0x24d)][_0x39290f(0x645)]=function(){const _0x30f634=_0x39290f;VisuMZ[_0x30f634(0x7b3)][_0x30f634(0x58a)]['call'](this),SceneManager[_0x30f634(0x505)]()&&this[_0x30f634(0x1d8)]();},Scene_Battle[_0x39290f(0x24d)]['repositionCancelButtonSideButtonLayout']=function(){const _0x12e586=_0x39290f;this[_0x12e586(0x5d8)]['x']=Graphics['boxWidth']+0x4,this['isBottomButtonMode']()?this[_0x12e586(0x5d8)]['y']=Graphics[_0x12e586(0x7e2)]-this[_0x12e586(0x80a)]():this['_cancelButton']['y']=0x0;},VisuMZ[_0x39290f(0x7b3)][_0x39290f(0x289)]=Sprite_Button['prototype'][_0x39290f(0x796)],Sprite_Button[_0x39290f(0x24d)]['initialize']=function(_0x4fbb3d){const _0x1500dd=_0x39290f;VisuMZ[_0x1500dd(0x7b3)][_0x1500dd(0x289)][_0x1500dd(0x592)](this,_0x4fbb3d),this['initButtonHidden']();},Sprite_Button[_0x39290f(0x24d)][_0x39290f(0x625)]=function(){const _0x1d943c=_0x39290f,_0x35a2bd=VisuMZ[_0x1d943c(0x7b3)]['Settings']['UI'];this[_0x1d943c(0x5d9)]=![];switch(this[_0x1d943c(0x759)]){case _0x1d943c(0x16e):this['_isButtonHidden']=!_0x35a2bd[_0x1d943c(0x7bc)];break;case'pageup':case _0x1d943c(0x4dd):this[_0x1d943c(0x5d9)]=!_0x35a2bd[_0x1d943c(0x217)];break;case'down':case'up':case _0x1d943c(0x270):case _0x1d943c(0x56b):case'ok':this['_isButtonHidden']=!_0x35a2bd['numberShowButton'];break;case _0x1d943c(0x7ed):this['_isButtonHidden']=!_0x35a2bd[_0x1d943c(0x178)];break;}},VisuMZ['CoreEngine'][_0x39290f(0x840)]=Sprite_Button[_0x39290f(0x24d)][_0x39290f(0x14b)],Sprite_Button[_0x39290f(0x24d)][_0x39290f(0x14b)]=function(){const _0x423f8f=_0x39290f;if(SceneManager[_0x423f8f(0x244)]()||this[_0x423f8f(0x5d9)]){if('Gyqtm'!==_0x423f8f(0x841))this['hideButtonFromView']();else return _0x58b382[_0x423f8f(0x7b3)]['Settings'][_0x423f8f(0x646)]['DigitGroupingGaugeSprites'];}else{if('hacKe'==='MRoyS')return![];else VisuMZ[_0x423f8f(0x7b3)][_0x423f8f(0x840)][_0x423f8f(0x592)](this);}},Sprite_Button[_0x39290f(0x24d)][_0x39290f(0x812)]=function(){const _0x4df2e0=_0x39290f;this[_0x4df2e0(0x557)]=![],this[_0x4df2e0(0x48f)]=0x0,this['x']=Graphics[_0x4df2e0(0x42a)]*0xa,this['y']=Graphics['height']*0xa;},VisuMZ[_0x39290f(0x7b3)][_0x39290f(0x1a8)]=Sprite_Battler[_0x39290f(0x24d)][_0x39290f(0x3a8)],Sprite_Battler[_0x39290f(0x24d)][_0x39290f(0x3a8)]=function(_0x1853a0,_0x1a1612,_0x214a1b){const _0x35a864=_0x39290f;(this[_0x35a864(0x2b6)]!==_0x1853a0||this[_0x35a864(0x6b2)]!==_0x1a1612)&&(this['setMoveEasingType']('Linear'),this['_movementWholeDuration']=_0x214a1b),VisuMZ[_0x35a864(0x7b3)][_0x35a864(0x1a8)][_0x35a864(0x592)](this,_0x1853a0,_0x1a1612,_0x214a1b);},Sprite_Battler[_0x39290f(0x24d)]['setMoveEasingType']=function(_0x5b4d4d){const _0x335d88=_0x39290f;this[_0x335d88(0x8e3)]=_0x5b4d4d;},Sprite_Battler[_0x39290f(0x24d)][_0x39290f(0x185)]=function(){const _0x41680d=_0x39290f;if(this[_0x41680d(0x307)]<=0x0)return;const _0x672f5=this[_0x41680d(0x307)],_0x27097a=this[_0x41680d(0x525)],_0x48e3b5=this[_0x41680d(0x8e3)];this[_0x41680d(0x1ea)]=this[_0x41680d(0x72c)](this['_offsetX'],this['_targetOffsetX'],_0x672f5,_0x27097a,_0x48e3b5),this[_0x41680d(0x836)]=this['applyEasing'](this['_offsetY'],this[_0x41680d(0x6b2)],_0x672f5,_0x27097a,_0x48e3b5),this[_0x41680d(0x307)]--;if(this[_0x41680d(0x307)]<=0x0)this[_0x41680d(0x56c)]();},Sprite_Battler['prototype'][_0x39290f(0x72c)]=function(_0x594f5e,_0x3666e2,_0x28d0b4,_0x3baa37,_0x13d404){const _0x34072e=_0x39290f,_0x206209=VisuMZ['ApplyEasing']((_0x3baa37-_0x28d0b4)/_0x3baa37,_0x13d404||_0x34072e(0x2b8)),_0x562c7b=VisuMZ['ApplyEasing']((_0x3baa37-_0x28d0b4+0x1)/_0x3baa37,_0x13d404||'Linear'),_0x20aa26=(_0x594f5e-_0x3666e2*_0x206209)/(0x1-_0x206209);return _0x20aa26+(_0x3666e2-_0x20aa26)*_0x562c7b;},VisuMZ['CoreEngine']['Sprite_Actor_setActorHome']=Sprite_Actor[_0x39290f(0x24d)][_0x39290f(0x778)],Sprite_Actor[_0x39290f(0x24d)][_0x39290f(0x778)]=function(_0x50a8da){const _0x321dd1=_0x39290f;VisuMZ[_0x321dd1(0x7b3)][_0x321dd1(0x1ac)]['UI'][_0x321dd1(0x474)]?_0x321dd1(0x3a9)!==_0x321dd1(0x86d)?this[_0x321dd1(0x86f)](_0x50a8da):this[_0x321dd1(0x328)][_0x321dd1(0x8b7)]<=0x60&&(this[_0x321dd1(0x328)][_0x321dd1(0x8b7)]+=0x6):_0x321dd1(0x232)!=='oRSVs'?this['select'](-0x1):VisuMZ['CoreEngine'][_0x321dd1(0x77b)][_0x321dd1(0x592)](this,_0x50a8da);},Sprite_Actor[_0x39290f(0x24d)][_0x39290f(0x86f)]=function(_0x2062f0){const _0x43fe32=_0x39290f;let _0x35504a=Math[_0x43fe32(0x401)](Graphics[_0x43fe32(0x42a)]/0x2+0xc0);_0x35504a-=Math[_0x43fe32(0x27c)]((Graphics[_0x43fe32(0x42a)]-Graphics['boxWidth'])/0x2),_0x35504a+=_0x2062f0*0x20;let _0x5c59c2=Graphics[_0x43fe32(0x431)]-0xc8-$gameParty['maxBattleMembers']()*0x30;_0x5c59c2-=Math[_0x43fe32(0x27c)]((Graphics[_0x43fe32(0x431)]-Graphics[_0x43fe32(0x7e2)])/0x2),_0x5c59c2+=_0x2062f0*0x30,this[_0x43fe32(0x22d)](_0x35504a,_0x5c59c2);},Sprite_Actor['prototype'][_0x39290f(0x4b5)]=function(){const _0x5300da=_0x39290f;this[_0x5300da(0x3a8)](0x4b0,0x0,0x78);},Sprite_Animation[_0x39290f(0x24d)][_0x39290f(0x2dc)]=function(_0x53fa18){const _0x2b70ed=_0x39290f;this[_0x2b70ed(0x301)]=_0x53fa18;},VisuMZ[_0x39290f(0x7b3)][_0x39290f(0x7dc)]=Sprite_Animation[_0x39290f(0x24d)]['processSoundTimings'],Sprite_Animation[_0x39290f(0x24d)][_0x39290f(0x314)]=function(){const _0x5cfd31=_0x39290f;if(this[_0x5cfd31(0x301)])return;VisuMZ['CoreEngine'][_0x5cfd31(0x7dc)][_0x5cfd31(0x592)](this);},VisuMZ['CoreEngine'][_0x39290f(0x4d3)]=Sprite_Animation[_0x39290f(0x24d)]['setViewport'],Sprite_Animation[_0x39290f(0x24d)][_0x39290f(0x2e0)]=function(_0x5c274d){const _0x1393e4=_0x39290f;if(this[_0x1393e4(0x7f1)]()){if(_0x1393e4(0x7a0)===_0x1393e4(0x7a0))this[_0x1393e4(0x370)](_0x5c274d);else{const _0x1dbd72='_stored_expGaugeColor1';this['_colorCache']=this['_colorCache']||{};if(this['_colorCache'][_0x1dbd72])return this[_0x1393e4(0x383)][_0x1dbd72];const _0x3ea01b=_0x45b1ca[_0x1393e4(0x7b3)][_0x1393e4(0x1ac)]['Color']['ColorExpGauge1'];return this[_0x1393e4(0x4c8)](_0x1dbd72,_0x3ea01b);}}else'JScmx'===_0x1393e4(0x6ed)?(this[_0x1393e4(0x825)]=[],this['_pointAnimationSprites']=[],this[_0x1393e4(0x82e)]=this['scale']['x'],this[_0x1393e4(0x19a)]=this[_0x1393e4(0x137)]['y']):VisuMZ['CoreEngine'][_0x1393e4(0x4d3)][_0x1393e4(0x592)](this,_0x5c274d);},Sprite_Animation['prototype'][_0x39290f(0x7f1)]=function(){const _0x508e7a=_0x39290f;if(!this[_0x508e7a(0x88d)])return![];const _0x4b7a8a=this['_animation']['name']||'';if(_0x4b7a8a['match'](/<MIRROR OFFSET X>/i))return!![];if(_0x4b7a8a[_0x508e7a(0x5cb)](/<NO MIRROR OFFSET X>/i))return![];return VisuMZ[_0x508e7a(0x7b3)][_0x508e7a(0x1ac)][_0x508e7a(0x646)][_0x508e7a(0x3b1)];},Sprite_Animation[_0x39290f(0x24d)][_0x39290f(0x370)]=function(_0x3decfa){const _0x150963=_0x39290f,_0x432763=this[_0x150963(0x70b)],_0x5b4dfe=this[_0x150963(0x70b)],_0x494d56=this[_0x150963(0x88d)][_0x150963(0x213)]*(this[_0x150963(0x38f)]?-0x1:0x1)-_0x432763/0x2,_0x5b4cc0=this['_animation']['offsetY']-_0x5b4dfe/0x2,_0xfc3f2c=this['targetPosition'](_0x3decfa);_0x3decfa['gl'][_0x150963(0x81a)](_0x494d56+_0xfc3f2c['x'],_0x5b4cc0+_0xfc3f2c['y'],_0x432763,_0x5b4dfe);},Sprite_Animation['prototype']['targetSpritePosition']=function(_0x5236c1){const _0x1c953f=_0x39290f;if(_0x5236c1[_0x1c953f(0x6f0)]){}const _0x437d01=this[_0x1c953f(0x88d)][_0x1c953f(0x8e0)];let _0x4c3c0d=_0x5236c1[_0x1c953f(0x431)]*_0x5236c1['scale']['y'],_0x54f2ca=0x0,_0x2990fe=-_0x4c3c0d/0x2;if(_0x437d01['match'](/<(?:HEAD|HEADER|TOP)>/i))_0x2990fe=-_0x4c3c0d;if(_0x437d01[_0x1c953f(0x5cb)](/<(?:FOOT|FOOTER|BOTTOM)>/i))_0x2990fe=0x0;if(_0x437d01['match'](/<(?:LEFT)>/i))_0x54f2ca=-_0x5236c1['width']/0x2;if(_0x437d01[_0x1c953f(0x5cb)](/<(?:RIGHT)>/i))_0x2990fe=_0x5236c1['width']/0x2;if(_0x437d01[_0x1c953f(0x5cb)](/<ANCHOR X:[ ](\d+\.?\d*)>/i))_0x54f2ca=Number(RegExp['$1'])*_0x5236c1[_0x1c953f(0x42a)];_0x437d01['match'](/<ANCHOR Y:[ ](\d+\.?\d*)>/i)&&(_0x2990fe=(0x1-Number(RegExp['$1']))*-_0x4c3c0d);_0x437d01[_0x1c953f(0x5cb)](/<ANCHOR:[ ](\d+\.?\d*),[ ](\d+\.?\d*)>/i)&&(_0x54f2ca=Number(RegExp['$1'])*_0x5236c1['width'],_0x2990fe=(0x1-Number(RegExp['$2']))*-_0x4c3c0d);if(_0x437d01[_0x1c953f(0x5cb)](/<OFFSET X:[ ]([\+\-]\d+)>/i))_0x54f2ca+=Number(RegExp['$1']);if(_0x437d01['match'](/<OFFSET Y:[ ]([\+\-]\d+)>/i))_0x2990fe+=Number(RegExp['$1']);_0x437d01[_0x1c953f(0x5cb)](/<OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(_0x54f2ca+=Number(RegExp['$1']),_0x2990fe+=Number(RegExp['$2']));const _0x388bcd=new Point(_0x54f2ca,_0x2990fe);return _0x5236c1[_0x1c953f(0x881)](),_0x5236c1[_0x1c953f(0x543)][_0x1c953f(0x8c7)](_0x388bcd);},Sprite_AnimationMV[_0x39290f(0x24d)][_0x39290f(0x2dc)]=function(_0x2e6ada){const _0x19d76e=_0x39290f;this[_0x19d76e(0x301)]=_0x2e6ada;},VisuMZ[_0x39290f(0x7b3)][_0x39290f(0x54f)]=Sprite_AnimationMV[_0x39290f(0x24d)][_0x39290f(0x71e)],Sprite_AnimationMV[_0x39290f(0x24d)][_0x39290f(0x71e)]=function(_0x49b128){const _0x3966c6=_0x39290f;if(this[_0x3966c6(0x301)]){if('qJncy'!=='qJncy'){if(_0x5194b7[_0x3966c6(0x565)]())return;_0x10b7ae['ConvertParams'](_0x558407,_0x2efc8e);const _0xc0c179=[_0x3966c6(0x147),'battlebacks1',_0x3966c6(0x3f5),_0x3966c6(0x776),'enemies','faces','parallaxes','pictures',_0x3966c6(0x13d),'sv_enemies',_0x3966c6(0x251),_0x3966c6(0x4b2),_0x3966c6(0x67c),_0x3966c6(0x158)];for(const _0x7784d6 of _0xc0c179){const _0x302477=_0x44be46[_0x7784d6],_0xdf66f7='img/%1/'[_0x3966c6(0x8ca)](_0x7784d6);for(const _0x5ad4e6 of _0x302477){_0x1f31f8[_0x3966c6(0x5ca)](_0xdf66f7,_0x5ad4e6);}}}else _0x49b128=JsonEx[_0x3966c6(0x74a)](_0x49b128),_0x49b128['se']&&(_0x49b128['se'][_0x3966c6(0x834)]=0x0);}VisuMZ[_0x3966c6(0x7b3)][_0x3966c6(0x54f)][_0x3966c6(0x592)](this,_0x49b128);},Sprite_Damage[_0x39290f(0x24d)][_0x39290f(0x678)]=function(_0xe057dc){const _0x5efc8a=_0x39290f;let _0x3b128e=Math['abs'](_0xe057dc)[_0x5efc8a(0x80c)]();this[_0x5efc8a(0x67d)]()&&(_0x3b128e=VisuMZ[_0x5efc8a(0x8de)](_0x3b128e));const _0x5420be=this[_0x5efc8a(0x8b7)](),_0x414310=Math['floor'](_0x5420be*0.75);for(let _0x30c70d=0x0;_0x30c70d<_0x3b128e[_0x5efc8a(0x59c)];_0x30c70d++){if(_0x5efc8a(0x5dc)===_0x5efc8a(0x7ee))_0x1b4054[_0x5efc8a(0x7b3)]['SceneManager_initialize']['call'](this),this[_0x5efc8a(0x746)]();else{const _0x273494=this[_0x5efc8a(0x3b8)](_0x414310,_0x5420be);_0x273494['bitmap'][_0x5efc8a(0x218)](_0x3b128e[_0x30c70d],0x0,0x0,_0x414310,_0x5420be,'center'),_0x273494['x']=(_0x30c70d-(_0x3b128e[_0x5efc8a(0x59c)]-0x1)/0x2)*_0x414310,_0x273494['dy']=-_0x30c70d;}}},Sprite_Damage[_0x39290f(0x24d)][_0x39290f(0x67d)]=function(){const _0x3de1de=_0x39290f;return VisuMZ[_0x3de1de(0x7b3)]['Settings']['QoL']['DigitGroupingDamageSprites'];},Sprite_Damage[_0x39290f(0x24d)][_0x39290f(0x274)]=function(){const _0x22153f=_0x39290f;return ColorManager[_0x22153f(0x698)]();},VisuMZ['CoreEngine']['Sprite_Gauge_gaugeRate']=Sprite_Gauge[_0x39290f(0x24d)]['gaugeRate'],Sprite_Gauge[_0x39290f(0x24d)][_0x39290f(0x859)]=function(){const _0x3bd8f7=_0x39290f;return VisuMZ['CoreEngine'][_0x3bd8f7(0x623)][_0x3bd8f7(0x592)](this)[_0x3bd8f7(0x2a6)](0x0,0x1);},VisuMZ[_0x39290f(0x7b3)][_0x39290f(0x280)]=Sprite_Gauge[_0x39290f(0x24d)][_0x39290f(0x1be)],Sprite_Gauge[_0x39290f(0x24d)][_0x39290f(0x1be)]=function(){const _0x4e92cd=_0x39290f;let _0x5d47f1=VisuMZ['CoreEngine']['Sprite_Gauge_currentValue'][_0x4e92cd(0x592)](this);return _0x5d47f1;},Sprite_Gauge[_0x39290f(0x24d)][_0x39290f(0x6a9)]=function(){const _0x5c8bf3=_0x39290f;let _0x39d5df=this['currentValue']();this[_0x5c8bf3(0x67d)]()&&(_0x39d5df=VisuMZ['GroupDigits'](_0x39d5df));const _0x2cb7ec=this[_0x5c8bf3(0x789)]()-0x1,_0x3fb1e1=this[_0x5c8bf3(0x135)]?this[_0x5c8bf3(0x135)]():this[_0x5c8bf3(0x1bf)]();this[_0x5c8bf3(0x609)](),this[_0x5c8bf3(0x28d)][_0x5c8bf3(0x218)](_0x39d5df,0x0,0x0,_0x2cb7ec,_0x3fb1e1,_0x5c8bf3(0x183));},Sprite_Gauge[_0x39290f(0x24d)][_0x39290f(0x436)]=function(){return 0x3;},Sprite_Gauge[_0x39290f(0x24d)][_0x39290f(0x67d)]=function(){const _0x56f821=_0x39290f;return VisuMZ[_0x56f821(0x7b3)][_0x56f821(0x1ac)]['QoL']['DigitGroupingGaugeSprites'];},Sprite_Gauge[_0x39290f(0x24d)][_0x39290f(0x274)]=function(){return ColorManager['outlineColorGauge']();},VisuMZ[_0x39290f(0x7b3)]['Sprite_Picture_loadBitmap']=Sprite_Picture[_0x39290f(0x24d)][_0x39290f(0x5ca)],Sprite_Picture['prototype'][_0x39290f(0x5ca)]=function(){const _0x2e4ffa=_0x39290f;this['_pictureName'][_0x2e4ffa(0x5cb)](/VisuMZ CoreEngine PictureIcon (\d+)/i)?_0x2e4ffa(0x210)===_0x2e4ffa(0x643)?this[_0x2e4ffa(0x2ea)](_0x2fdae5,_0x5904c7,_0x3327e9,_0x107566,_0xd4da07):this['loadIconBitmap'](Number(RegExp['$1'])):VisuMZ[_0x2e4ffa(0x7b3)][_0x2e4ffa(0x43f)][_0x2e4ffa(0x592)](this);},Sprite_Picture[_0x39290f(0x24d)][_0x39290f(0x338)]=function(_0x2c7a0a){const _0xa19df8=_0x39290f,_0x2b9d59=ImageManager[_0xa19df8(0x441)],_0x22beca=ImageManager[_0xa19df8(0x34b)],_0x1b3970=this[_0xa19df8(0x629)][_0xa19df8(0x5cb)](/SMOOTH/i);this[_0xa19df8(0x28d)]=new Bitmap(_0x2b9d59,_0x22beca);const _0x2e06d1=ImageManager[_0xa19df8(0x530)](_0xa19df8(0x79e)),_0x4914b2=_0x2c7a0a%0x10*_0x2b9d59,_0x29cba7=Math[_0xa19df8(0x27c)](_0x2c7a0a/0x10)*_0x22beca;this[_0xa19df8(0x28d)][_0xa19df8(0x696)]=_0x1b3970,this[_0xa19df8(0x28d)][_0xa19df8(0x409)](_0x2e06d1,_0x4914b2,_0x29cba7,_0x2b9d59,_0x22beca,0x0,0x0,_0x2b9d59,_0x22beca);};function Sprite_TitlePictureButton(){const _0x3cc66c=_0x39290f;this[_0x3cc66c(0x796)](...arguments);}Sprite_TitlePictureButton[_0x39290f(0x24d)]=Object[_0x39290f(0x749)](Sprite_Clickable[_0x39290f(0x24d)]),Sprite_TitlePictureButton[_0x39290f(0x24d)]['constructor']=Sprite_TitlePictureButton,Sprite_TitlePictureButton[_0x39290f(0x24d)][_0x39290f(0x796)]=function(_0x35ef45){const _0x388b4a=_0x39290f;Sprite_Clickable[_0x388b4a(0x24d)][_0x388b4a(0x796)][_0x388b4a(0x592)](this),this[_0x388b4a(0x5e7)]=_0x35ef45,this[_0x388b4a(0x880)]=null,this[_0x388b4a(0x772)]();},Sprite_TitlePictureButton[_0x39290f(0x24d)][_0x39290f(0x772)]=function(){const _0x4ab7f8=_0x39290f;this['x']=Graphics[_0x4ab7f8(0x42a)],this['y']=Graphics['height'],this[_0x4ab7f8(0x557)]=![],this[_0x4ab7f8(0x375)]();},Sprite_TitlePictureButton[_0x39290f(0x24d)][_0x39290f(0x375)]=function(){const _0x682e1b=_0x39290f;this['bitmap']=ImageManager[_0x682e1b(0x45b)](this[_0x682e1b(0x5e7)][_0x682e1b(0x107)]),this[_0x682e1b(0x28d)][_0x682e1b(0x846)](this[_0x682e1b(0x3f0)][_0x682e1b(0x1df)](this));},Sprite_TitlePictureButton[_0x39290f(0x24d)][_0x39290f(0x3f0)]=function(){const _0x4c62f2=_0x39290f;this[_0x4c62f2(0x5e7)]['OnLoadJS'][_0x4c62f2(0x592)](this),this['_data'][_0x4c62f2(0x699)][_0x4c62f2(0x592)](this),this[_0x4c62f2(0x850)](this[_0x4c62f2(0x5e7)]['CallHandlerJS'][_0x4c62f2(0x1df)](this));},Sprite_TitlePictureButton[_0x39290f(0x24d)][_0x39290f(0x6bb)]=function(){const _0x3583bb=_0x39290f;Sprite_Clickable[_0x3583bb(0x24d)][_0x3583bb(0x6bb)]['call'](this),this[_0x3583bb(0x14b)](),this['processTouch']();},Sprite_TitlePictureButton[_0x39290f(0x24d)][_0x39290f(0x768)]=function(){const _0x26bcc5=_0x39290f;return VisuMZ[_0x26bcc5(0x7b3)]['Settings']['MenuLayout']['Title'][_0x26bcc5(0x1fe)];},Sprite_TitlePictureButton[_0x39290f(0x24d)][_0x39290f(0x14b)]=function(){const _0x437c0a=_0x39290f;if(this[_0x437c0a(0x16d)]||this[_0x437c0a(0x3f2)]){if(_0x437c0a(0x8af)===_0x437c0a(0x179)){if(this[_0x437c0a(0x5e7)][_0x437c0a(0x25b)['format'](_0x4af7bb)]!==_0x1790c9[_0x437c0a(0x260)[_0x437c0a(0x8ca)](_0x2c8bcf)]())return this[_0x437c0a(0x6fe)]();if(this[_0x437c0a(0x5e7)]['text%1'[_0x437c0a(0x8ca)](_0xc59d8c)]!==_0x11086f[_0x437c0a(0x8ad)[_0x437c0a(0x8ca)](_0x52c944)]())return this['refresh']();}else this[_0x437c0a(0x48f)]=0xff;}else this[_0x437c0a(0x48f)]+=this[_0x437c0a(0x557)]?this[_0x437c0a(0x768)]():-0x1*this[_0x437c0a(0x768)](),this[_0x437c0a(0x48f)]=Math['min'](0xc0,this[_0x437c0a(0x48f)]);},Sprite_TitlePictureButton[_0x39290f(0x24d)][_0x39290f(0x850)]=function(_0x2da1e4){const _0x48a61f=_0x39290f;this[_0x48a61f(0x880)]=_0x2da1e4;},Sprite_TitlePictureButton[_0x39290f(0x24d)][_0x39290f(0x49b)]=function(){const _0x441e11=_0x39290f;this[_0x441e11(0x880)]&&this[_0x441e11(0x880)]();},VisuMZ[_0x39290f(0x7b3)][_0x39290f(0x50d)]=Spriteset_Base[_0x39290f(0x24d)][_0x39290f(0x796)],Spriteset_Base[_0x39290f(0x24d)]['initialize']=function(){const _0x1c3d11=_0x39290f;VisuMZ[_0x1c3d11(0x7b3)][_0x1c3d11(0x50d)]['call'](this),this[_0x1c3d11(0x89f)]();},Spriteset_Base[_0x39290f(0x24d)][_0x39290f(0x89f)]=function(){const _0xa721aa=_0x39290f;this[_0xa721aa(0x825)]=[],this[_0xa721aa(0x7c8)]=[],this['_cacheScaleX']=this[_0xa721aa(0x137)]['x'],this[_0xa721aa(0x19a)]=this['scale']['y'];},VisuMZ[_0x39290f(0x7b3)]['Spriteset_Base_destroy']=Spriteset_Base[_0x39290f(0x24d)][_0x39290f(0x2e8)],Spriteset_Base[_0x39290f(0x24d)][_0x39290f(0x2e8)]=function(_0x3d8aca){const _0x383764=_0x39290f;this[_0x383764(0x875)](),this[_0x383764(0x6fc)](),VisuMZ[_0x383764(0x7b3)][_0x383764(0x8d7)][_0x383764(0x592)](this,_0x3d8aca);},VisuMZ['CoreEngine'][_0x39290f(0x4e3)]=Spriteset_Base[_0x39290f(0x24d)][_0x39290f(0x6bb)],Spriteset_Base['prototype'][_0x39290f(0x6bb)]=function(){const _0x4a37e7=_0x39290f;VisuMZ[_0x4a37e7(0x7b3)][_0x4a37e7(0x4e3)][_0x4a37e7(0x592)](this),this[_0x4a37e7(0x647)](),this[_0x4a37e7(0x4f1)](),this[_0x4a37e7(0x47d)]();},Spriteset_Base[_0x39290f(0x24d)][_0x39290f(0x647)]=function(){const _0x1c384c=_0x39290f;if(!VisuMZ[_0x1c384c(0x7b3)][_0x1c384c(0x1ac)][_0x1c384c(0x646)][_0x1c384c(0x403)])return;if(this[_0x1c384c(0x82e)]===this[_0x1c384c(0x137)]['x']&&this['_cacheScaleY']===this[_0x1c384c(0x137)]['y'])return;this[_0x1c384c(0x152)](),this['_cacheScaleX']=this['scale']['x'],this[_0x1c384c(0x19a)]=this['scale']['y'];},Spriteset_Base[_0x39290f(0x24d)][_0x39290f(0x152)]=function(){const _0x4d1be5=_0x39290f;this[_0x4d1be5(0x137)]['x']!==0x0&&(this[_0x4d1be5(0x39b)][_0x4d1be5(0x137)]['x']=0x1/this[_0x4d1be5(0x137)]['x'],this[_0x4d1be5(0x39b)]['x']=-(this['x']/this[_0x4d1be5(0x137)]['x'])),this['scale']['y']!==0x0&&(_0x4d1be5(0x1bd)!==_0x4d1be5(0x1bd)?_0x515bd1[_0x4d1be5(0x8a0)]&&_0x522b29[_0x4d1be5(0x8a0)]():(this[_0x4d1be5(0x39b)]['scale']['y']=0x1/this[_0x4d1be5(0x137)]['y'],this['_pictureContainer']['y']=-(this['y']/this[_0x4d1be5(0x137)]['y'])));},VisuMZ[_0x39290f(0x7b3)][_0x39290f(0x820)]=Spriteset_Base[_0x39290f(0x24d)]['updatePosition'],Spriteset_Base['prototype'][_0x39290f(0x54d)]=function(){const _0x5ea9e7=_0x39290f;VisuMZ['CoreEngine'][_0x5ea9e7(0x820)][_0x5ea9e7(0x592)](this),this[_0x5ea9e7(0x735)]();},Spriteset_Base[_0x39290f(0x24d)][_0x39290f(0x735)]=function(){const _0x52d7b8=_0x39290f;if(!$gameScreen)return;if($gameScreen[_0x52d7b8(0x2f7)]<=0x0)return;this['x']-=Math['round']($gameScreen[_0x52d7b8(0x6d0)]());const _0x6abfa3=$gameScreen['getCoreEngineScreenShakeStyle']();switch($gameScreen[_0x52d7b8(0x4c6)]()){case _0x52d7b8(0x1a3):this[_0x52d7b8(0x2f2)]();break;case _0x52d7b8(0x2bf):this[_0x52d7b8(0x7e0)]();break;case _0x52d7b8(0x5e2):this[_0x52d7b8(0x722)]();break;default:this[_0x52d7b8(0x198)]();break;}},Spriteset_Base[_0x39290f(0x24d)][_0x39290f(0x2f2)]=function(){const _0x2f88d5=_0x39290f,_0x4f3538=VisuMZ[_0x2f88d5(0x7b3)][_0x2f88d5(0x1ac)][_0x2f88d5(0x691)];if(_0x4f3538&&_0x4f3538['originalJS'])return _0x2f88d5(0x162)==='flbsZ'?this[_0x2f88d5(0x6fe)]():_0x4f3538[_0x2f88d5(0x53f)][_0x2f88d5(0x592)](this);this['x']+=Math['round']($gameScreen[_0x2f88d5(0x6d0)]());},Spriteset_Base[_0x39290f(0x24d)][_0x39290f(0x198)]=function(){const _0x38f71d=_0x39290f,_0xca1c2e=VisuMZ[_0x38f71d(0x7b3)][_0x38f71d(0x1ac)][_0x38f71d(0x691)];if(_0xca1c2e&&_0xca1c2e[_0x38f71d(0x833)])return _0xca1c2e['randomJS'][_0x38f71d(0x592)](this);const _0x4f778f=$gameScreen[_0x38f71d(0x567)]*0.75,_0x4709e8=$gameScreen[_0x38f71d(0x5c8)]*0.6,_0x11dde4=$gameScreen[_0x38f71d(0x2f7)];this['x']+=Math[_0x38f71d(0x401)](Math[_0x38f71d(0x548)](_0x4f778f)-Math[_0x38f71d(0x548)](_0x4709e8))*(Math[_0x38f71d(0x201)](_0x11dde4,0x1e)*0.5),this['y']+=Math['round'](Math[_0x38f71d(0x548)](_0x4f778f)-Math[_0x38f71d(0x548)](_0x4709e8))*(Math[_0x38f71d(0x201)](_0x11dde4,0x1e)*0.5);},Spriteset_Base['prototype'][_0x39290f(0x7e0)]=function(){const _0x5889ba=_0x39290f,_0x1a64c7=VisuMZ['CoreEngine'][_0x5889ba(0x1ac)][_0x5889ba(0x691)];if(_0x1a64c7&&_0x1a64c7['horzJS'])return _0x1a64c7['horzJS'][_0x5889ba(0x592)](this);const _0x1b39ee=$gameScreen['_shakePower']*0.75,_0x343a4e=$gameScreen['_shakeSpeed']*0.6,_0x57045f=$gameScreen[_0x5889ba(0x2f7)];this['x']+=Math[_0x5889ba(0x401)](Math[_0x5889ba(0x548)](_0x1b39ee)-Math[_0x5889ba(0x548)](_0x343a4e))*(Math[_0x5889ba(0x201)](_0x57045f,0x1e)*0.5);},Spriteset_Base[_0x39290f(0x24d)][_0x39290f(0x722)]=function(){const _0x2064dc=_0x39290f,_0x374e63=VisuMZ[_0x2064dc(0x7b3)][_0x2064dc(0x1ac)][_0x2064dc(0x691)];if(_0x374e63&&_0x374e63[_0x2064dc(0x6ea)])return _0x374e63[_0x2064dc(0x6ea)][_0x2064dc(0x592)](this);const _0x41ecd1=$gameScreen[_0x2064dc(0x567)]*0.75,_0x66b8aa=$gameScreen[_0x2064dc(0x5c8)]*0.6,_0x2862c9=$gameScreen[_0x2064dc(0x2f7)];this['y']+=Math['round'](Math['randomInt'](_0x41ecd1)-Math[_0x2064dc(0x548)](_0x66b8aa))*(Math[_0x2064dc(0x201)](_0x2862c9,0x1e)*0.5);},Spriteset_Base['prototype'][_0x39290f(0x4f1)]=function(){const _0x445048=_0x39290f;for(const _0x2a675c of this['_fauxAnimationSprites']){if(_0x445048(0x807)===_0x445048(0x807))!_0x2a675c['isPlaying']()&&(_0x445048(0x82b)===_0x445048(0x18f)?this[_0x445048(0x1ab)]='FTB':this[_0x445048(0x14d)](_0x2a675c));else return this[_0x445048(0x319)]()?this[_0x445048(0x64a)]():_0x32cf23[_0x445048(0x7b3)][_0x445048(0x122)]['call'](this);}this[_0x445048(0x326)]();},Spriteset_Base[_0x39290f(0x24d)][_0x39290f(0x326)]=function(){const _0x160479=_0x39290f;for(;;){const _0x6e83c3=$gameTemp['retrieveFauxAnimation']();if(_0x6e83c3)this[_0x160479(0x7a5)](_0x6e83c3);else{if(_0x160479(0x730)===_0x160479(0x730))break;else{_0x275db3[_0x160479(0x447)](_0x23847a,_0x1b57e7);const _0x1cfaf5=_0x34a397[_0x160479(0x327)]||0x0;_0x58b08d[_0x160479(0x724)](_0x1cfaf5);}}}},Spriteset_Base[_0x39290f(0x24d)][_0x39290f(0x7a5)]=function(_0x24c135){const _0x34825d=_0x39290f,_0x12778c=$dataAnimations[_0x24c135[_0x34825d(0x6eb)]],_0x5447af=_0x24c135[_0x34825d(0x55b)],_0x1fa695=_0x24c135[_0x34825d(0x83e)],_0x544560=_0x24c135[_0x34825d(0x738)];let _0x2b1a19=this[_0x34825d(0x51f)]();const _0x3ef79c=this[_0x34825d(0x12b)]();if(this['isAnimationForEach'](_0x12778c)){if(_0x34825d(0x406)===_0x34825d(0x7ea))this[_0x34825d(0x2d6)]([_0x143ede],_0x5c7c9a,_0x5b3250,_0x14f730,_0x11ca85),_0x125d3f+=_0x19d82c;else for(const _0x4ad9bf of _0x5447af){if('IHuZM'===_0x34825d(0x658))this[_0x34825d(0x2ea)]([_0x4ad9bf],_0x12778c,_0x1fa695,_0x2b1a19,_0x544560),_0x2b1a19+=_0x3ef79c;else{var _0x5a3a7d=_0x49bbe9-1.5/2.75;return 7.5625*_0x5a3a7d*_0x5a3a7d+0.75;}}}else this[_0x34825d(0x2ea)](_0x5447af,_0x12778c,_0x1fa695,_0x2b1a19,_0x544560);},Spriteset_Base[_0x39290f(0x24d)][_0x39290f(0x2ea)]=function(_0x2fd048,_0x3f3dce,_0x180ec3,_0x2ae5fd,_0x2f166c){const _0x1e31ef=_0x39290f,_0x24b77b=this['isMVAnimation'](_0x3f3dce),_0x79c0b5=new(_0x24b77b?Sprite_AnimationMV:Sprite_Animation)(),_0x349fa3=this[_0x1e31ef(0x63d)](_0x2fd048);this['animationShouldMirror'](_0x2fd048[0x0])&&(_0x180ec3=!_0x180ec3),_0x79c0b5['targetObjects']=_0x2fd048,_0x79c0b5[_0x1e31ef(0x772)](_0x349fa3,_0x3f3dce,_0x180ec3,_0x2ae5fd),_0x79c0b5['setMute'](_0x2f166c),this[_0x1e31ef(0x3e1)][_0x1e31ef(0x359)](_0x79c0b5),this[_0x1e31ef(0x825)][_0x1e31ef(0x6a2)](_0x79c0b5);},Spriteset_Base[_0x39290f(0x24d)][_0x39290f(0x14d)]=function(_0x238506){const _0x269824=_0x39290f;this[_0x269824(0x825)][_0x269824(0x882)](_0x238506),this['_effectsContainer'][_0x269824(0x8cd)](_0x238506);for(const _0x369568 of _0x238506[_0x269824(0x59b)]){if(_0x269824(0x771)==='PVasC')_0x369568[_0x269824(0x8a0)]&&('aznuP'!==_0x269824(0x2f4)?_0x369568[_0x269824(0x8a0)]():this[_0x269824(0x48f)]=0xff);else return this['_pageupButton']&&this[_0x269824(0x4ab)][_0x269824(0x557)]?_0xb96d65[_0x269824(0x32a)]:'';}_0x238506[_0x269824(0x2e8)]();},Spriteset_Base[_0x39290f(0x24d)][_0x39290f(0x875)]=function(){const _0x569a6a=_0x39290f;for(const _0x691fba of this[_0x569a6a(0x825)]){this[_0x569a6a(0x14d)](_0x691fba);}},Spriteset_Base[_0x39290f(0x24d)][_0x39290f(0x88b)]=function(){const _0x3242bc=_0x39290f;return this['_fauxAnimationSprites'][_0x3242bc(0x59c)]>0x0;},Spriteset_Base[_0x39290f(0x24d)][_0x39290f(0x47d)]=function(){const _0x26f1a7=_0x39290f;for(const _0x361d68 of this[_0x26f1a7(0x7c8)]){if(_0x26f1a7(0x421)===_0x26f1a7(0x1c8))_0x588bb0+=_0x49e93d(_0x2efc4f);else{if(!_0x361d68['isPlaying']()){if(_0x26f1a7(0x2c6)!==_0x26f1a7(0x2c6))return _0x26f1a7(0x2a0);else this[_0x26f1a7(0x6ff)](_0x361d68);}}}this['processPointAnimationRequests']();},Spriteset_Base[_0x39290f(0x24d)][_0x39290f(0x7cb)]=function(){const _0x1ca144=_0x39290f;for(;;){const _0x235bae=$gameTemp[_0x1ca144(0x195)]();if(_0x235bae)this[_0x1ca144(0x6b0)](_0x235bae);else break;}},Spriteset_Base[_0x39290f(0x24d)][_0x39290f(0x6b0)]=function(_0x4a25ec){const _0x5b4a20=_0x39290f,_0x393a04=$dataAnimations[_0x4a25ec['animationId']],_0x1dbf16=this[_0x5b4a20(0x2bd)](_0x4a25ec),_0x122adf=_0x4a25ec['mirror'],_0x20376f=_0x4a25ec[_0x5b4a20(0x738)];let _0x301623=this[_0x5b4a20(0x51f)]();const _0x2e3ed4=this[_0x5b4a20(0x12b)]();if(this[_0x5b4a20(0x6c3)](_0x393a04)){if(_0x5b4a20(0x7eb)==='Xrugw')for(const _0x5b0ba9 of _0x1dbf16){this['createPointAnimationSprite']([_0x5b0ba9],_0x393a04,_0x122adf,_0x301623,_0x20376f),_0x301623+=_0x2e3ed4;}else return _0x501f49;}else this[_0x5b4a20(0x2d6)](_0x1dbf16,_0x393a04,_0x122adf,_0x301623,_0x20376f);},Spriteset_Base[_0x39290f(0x24d)][_0x39290f(0x2bd)]=function(_0x1f10fb){const _0x3be4cd=_0x39290f,_0x753fcc=new Sprite_Clickable();_0x753fcc['x']=_0x1f10fb['x'],_0x753fcc['y']=_0x1f10fb['y'],_0x753fcc['z']=0x64;const _0x8e434c=this[_0x3be4cd(0x290)]();return _0x8e434c[_0x3be4cd(0x359)](_0x753fcc),[_0x753fcc];},Spriteset_Base[_0x39290f(0x24d)][_0x39290f(0x290)]=function(){return this;},Spriteset_Map[_0x39290f(0x24d)]['getPointAnimationLayer']=function(){const _0x5935fc=_0x39290f;return this[_0x5935fc(0x353)]||this;},Spriteset_Battle[_0x39290f(0x24d)][_0x39290f(0x290)]=function(){const _0x3435d7=_0x39290f;return this[_0x3435d7(0x2b4)]||this;},Spriteset_Base['prototype'][_0x39290f(0x2d6)]=function(_0x4ba25e,_0x346208,_0x260c82,_0xde166e,_0x209698){const _0x3728fe=_0x39290f,_0x4a10cc=this[_0x3728fe(0x193)](_0x346208),_0x2db880=new(_0x4a10cc?Sprite_AnimationMV:Sprite_Animation)();_0x2db880[_0x3728fe(0x59b)]=_0x4ba25e,_0x2db880['setup'](_0x4ba25e,_0x346208,_0x260c82,_0xde166e),_0x2db880[_0x3728fe(0x2dc)](_0x209698),this[_0x3728fe(0x3e1)]['addChild'](_0x2db880),this['_pointAnimationSprites'][_0x3728fe(0x6a2)](_0x2db880);},Spriteset_Base[_0x39290f(0x24d)][_0x39290f(0x6ff)]=function(_0x28dbe1){const _0x563690=_0x39290f;this[_0x563690(0x7c8)][_0x563690(0x882)](_0x28dbe1),this[_0x563690(0x3e1)]['removeChild'](_0x28dbe1);for(const _0x1ce437 of _0x28dbe1[_0x563690(0x59b)]){_0x1ce437[_0x563690(0x8a0)]&&_0x1ce437[_0x563690(0x8a0)]();const _0x3c7090=this[_0x563690(0x290)]();if(_0x3c7090)_0x3c7090[_0x563690(0x8cd)](_0x1ce437);}_0x28dbe1[_0x563690(0x2e8)]();},Spriteset_Base['prototype'][_0x39290f(0x6fc)]=function(){const _0x5a2e5a=_0x39290f;for(const _0x1a56df of this[_0x5a2e5a(0x7c8)]){_0x5a2e5a(0x4ae)!=='Jbuln'?!_0x49306e[_0x5a2e5a(0x11d)]()&&!this[_0x5a2e5a(0x41c)]&&!_0x541498[_0x5a2e5a(0x817)]()&&(this[_0x5a2e5a(0x41c)]=!![],this[_0x5a2e5a(0x6bb)](),_0x29e112[_0x5a2e5a(0x4cb)](),this[_0x5a2e5a(0x41c)]=![]):this[_0x5a2e5a(0x6ff)](_0x1a56df);}},Spriteset_Base[_0x39290f(0x24d)]['isPointAnimationPlaying']=function(){const _0x3e253d=_0x39290f;return this[_0x3e253d(0x7c8)][_0x3e253d(0x59c)]>0x0;},VisuMZ[_0x39290f(0x7b3)]['Spriteset_Base_isAnimationPlaying']=Spriteset_Base[_0x39290f(0x24d)][_0x39290f(0x8ea)],Spriteset_Base[_0x39290f(0x24d)][_0x39290f(0x8ea)]=function(){const _0xf03b31=_0x39290f;return VisuMZ[_0xf03b31(0x7b3)][_0xf03b31(0x721)][_0xf03b31(0x592)](this)||this[_0xf03b31(0x6cd)]();},Spriteset_Battle[_0x39290f(0x24d)][_0x39290f(0x6f9)]=function(){const _0x2e3a60=_0x39290f;this['_backgroundFilter']=new PIXI[(_0x2e3a60(0x4ea))][(_0x2e3a60(0x3c9))](clamp=!![]),this[_0x2e3a60(0x205)]=new Sprite(),this[_0x2e3a60(0x205)]['bitmap']=SceneManager[_0x2e3a60(0x1fa)](),this[_0x2e3a60(0x205)][_0x2e3a60(0x4ea)]=[this['_backgroundFilter']],this[_0x2e3a60(0x851)][_0x2e3a60(0x359)](this['_backgroundSprite']);},VisuMZ[_0x39290f(0x7b3)][_0x39290f(0x7f9)]=Spriteset_Battle[_0x39290f(0x24d)][_0x39290f(0x84a)],Spriteset_Battle['prototype'][_0x39290f(0x84a)]=function(){const _0x6e2639=_0x39290f;this['coreEngineRepositionEnemies']()&&this[_0x6e2639(0x595)](),VisuMZ[_0x6e2639(0x7b3)][_0x6e2639(0x7f9)]['call'](this);},Spriteset_Battle['prototype']['coreEngineRepositionEnemies']=function(){const _0x4affd0=_0x39290f,_0x1a7aee=VisuMZ[_0x4affd0(0x7b3)][_0x4affd0(0x1ac)][_0x4affd0(0x4a9)];if(!_0x1a7aee)return![];if(Utils[_0x4affd0(0x703)]>=_0x4affd0(0x45c)&&!_0x1a7aee['RepositionEnemies130'])return _0x4affd0(0x27d)!=='MAOeO'?![]:this[_0x4affd0(0x69d)]!==_0x3b529b[_0x4affd0(0x266)]||this[_0x4affd0(0x11a)]!==_0xfe182c['_x']||this['_lastY']!==_0x1aaee7['_y'];return _0x1a7aee[_0x4affd0(0x15b)];},Spriteset_Battle[_0x39290f(0x24d)]['repositionEnemiesByResolution']=function(){for(member of $gameTroop['members']()){member['moveRelativeToResolutionChange']();}},VisuMZ['CoreEngine'][_0x39290f(0x5d2)]=Window_Base[_0x39290f(0x24d)]['initialize'],Window_Base[_0x39290f(0x24d)]['initialize']=function(_0x35babd){const _0x4caeaf=_0x39290f;_0x35babd['x']=Math['round'](_0x35babd['x']),_0x35babd['y']=Math[_0x4caeaf(0x401)](_0x35babd['y']),_0x35babd[_0x4caeaf(0x42a)]=Math[_0x4caeaf(0x401)](_0x35babd[_0x4caeaf(0x42a)]),_0x35babd[_0x4caeaf(0x431)]=Math['round'](_0x35babd[_0x4caeaf(0x431)]),this['initDigitGrouping'](),VisuMZ[_0x4caeaf(0x7b3)][_0x4caeaf(0x5d2)]['call'](this,_0x35babd),this[_0x4caeaf(0x85f)]();},Window_Base['prototype'][_0x39290f(0x44b)]=function(){const _0x43334b=_0x39290f;this[_0x43334b(0x3f6)]=VisuMZ[_0x43334b(0x7b3)][_0x43334b(0x1ac)][_0x43334b(0x646)][_0x43334b(0x5de)],this[_0x43334b(0x2be)]=VisuMZ['CoreEngine'][_0x43334b(0x1ac)][_0x43334b(0x646)][_0x43334b(0x138)];},Window_Base[_0x39290f(0x24d)]['lineHeight']=function(){const _0x4512e3=_0x39290f;return VisuMZ[_0x4512e3(0x7b3)][_0x4512e3(0x1ac)][_0x4512e3(0x5dd)][_0x4512e3(0x163)];},Window_Base[_0x39290f(0x24d)][_0x39290f(0x340)]=function(){const _0x282e86=_0x39290f;return VisuMZ[_0x282e86(0x7b3)][_0x282e86(0x1ac)][_0x282e86(0x5dd)][_0x282e86(0x182)];},Window_Base[_0x39290f(0x24d)]['updateBackOpacity']=function(){const _0x4ca80a=_0x39290f;if($gameSystem[_0x4ca80a(0x797)])this[_0x4ca80a(0x8b6)]=$gameSystem[_0x4ca80a(0x797)]();else{if(_0x4ca80a(0x3bb)===_0x4ca80a(0x78a)){var _0x1bdb9c=_0x463064(_0x49c169['$1'])/0x64;_0x29f4a2*=_0x1bdb9c;}else this[_0x4ca80a(0x8b6)]=VisuMZ['CoreEngine']['Settings'][_0x4ca80a(0x5dd)][_0x4ca80a(0x1e2)];}},Window_Base['prototype'][_0x39290f(0x3c6)]=function(){const _0x556dea=_0x39290f;return VisuMZ['CoreEngine']['Settings'][_0x556dea(0x5dd)][_0x556dea(0x545)];},Window_Base[_0x39290f(0x24d)][_0x39290f(0x35e)]=function(){const _0x12520c=_0x39290f;return VisuMZ[_0x12520c(0x7b3)][_0x12520c(0x1ac)][_0x12520c(0x5dd)][_0x12520c(0x13f)];},VisuMZ[_0x39290f(0x7b3)]['Window_Base_update']=Window_Base[_0x39290f(0x24d)]['update'],Window_Base[_0x39290f(0x24d)][_0x39290f(0x6bb)]=function(){const _0x5c9b5d=_0x39290f;VisuMZ[_0x5c9b5d(0x7b3)]['Window_Base_update'][_0x5c9b5d(0x592)](this),this['updateCoreEasing']();},Window_Base[_0x39290f(0x24d)][_0x39290f(0x864)]=function(){const _0x2cab6c=_0x39290f;this[_0x2cab6c(0x5be)]&&(this['openness']+=this[_0x2cab6c(0x35e)](),this[_0x2cab6c(0x584)]()&&(this[_0x2cab6c(0x5be)]=![]));},Window_Base[_0x39290f(0x24d)][_0x39290f(0x669)]=function(){const _0x5bbcac=_0x39290f;this[_0x5bbcac(0x4a1)]&&(this['openness']-=this[_0x5bbcac(0x35e)](),this['isClosed']()&&(this[_0x5bbcac(0x4a1)]=![]));},VisuMZ[_0x39290f(0x7b3)][_0x39290f(0x75b)]=Window_Base[_0x39290f(0x24d)]['drawText'],Window_Base[_0x39290f(0x24d)][_0x39290f(0x218)]=function(_0x110a5e,_0x82946d,_0xa7fca,_0x630b47,_0x3f7836){const _0x56f1db=_0x39290f;if(this[_0x56f1db(0x67d)]())_0x110a5e=VisuMZ[_0x56f1db(0x8de)](_0x110a5e);VisuMZ[_0x56f1db(0x7b3)][_0x56f1db(0x75b)][_0x56f1db(0x592)](this,_0x110a5e,_0x82946d,_0xa7fca,_0x630b47,_0x3f7836);},Window_Base[_0x39290f(0x24d)][_0x39290f(0x67d)]=function(){const _0x3f767c=_0x39290f;return this[_0x3f767c(0x3f6)];},VisuMZ[_0x39290f(0x7b3)][_0x39290f(0x7df)]=Window_Base[_0x39290f(0x24d)][_0x39290f(0x207)],Window_Base[_0x39290f(0x24d)]['createTextState']=function(_0xab655a,_0x571e19,_0x33f017,_0x518d9a){const _0x1d8fed=_0x39290f;var _0x1a31ec=VisuMZ[_0x1d8fed(0x7b3)][_0x1d8fed(0x7df)][_0x1d8fed(0x592)](this,_0xab655a,_0x571e19,_0x33f017,_0x518d9a);if(this[_0x1d8fed(0x286)]())_0x1a31ec[_0x1d8fed(0x459)]=VisuMZ[_0x1d8fed(0x8de)](_0x1a31ec['text']);return _0x1a31ec;},Window_Base[_0x39290f(0x24d)]['useDigitGroupingEx']=function(){const _0x1af06e=_0x39290f;return this[_0x1af06e(0x2be)];},Window_Base[_0x39290f(0x24d)][_0x39290f(0x8cb)]=function(_0x56f862){const _0x3bc98e=_0x39290f;this[_0x3bc98e(0x3f6)]=_0x56f862;},Window_Base[_0x39290f(0x24d)][_0x39290f(0x2b9)]=function(_0x47a225){const _0x270df0=_0x39290f;this[_0x270df0(0x2be)]=_0x47a225;},VisuMZ[_0x39290f(0x7b3)][_0x39290f(0x781)]=Window_Base[_0x39290f(0x24d)][_0x39290f(0x385)],Window_Base[_0x39290f(0x24d)]['drawIcon']=function(_0x586707,_0x2203df,_0x5115c2){const _0x360f6e=_0x39290f;_0x2203df=Math['round'](_0x2203df),_0x5115c2=Math[_0x360f6e(0x401)](_0x5115c2),VisuMZ[_0x360f6e(0x7b3)]['Window_Base_drawIcon']['call'](this,_0x586707,_0x2203df,_0x5115c2);},VisuMZ[_0x39290f(0x7b3)]['Window_Base_drawFace']=Window_Base['prototype'][_0x39290f(0x86e)],Window_Base[_0x39290f(0x24d)][_0x39290f(0x86e)]=function(_0xf94ec2,_0x40432f,_0x1c4aa8,_0x314d44,_0x409fd6,_0x3d2af3){const _0x2cd299=_0x39290f;_0x409fd6=_0x409fd6||ImageManager[_0x2cd299(0x3cb)],_0x3d2af3=_0x3d2af3||ImageManager[_0x2cd299(0x3de)],_0x1c4aa8=Math[_0x2cd299(0x401)](_0x1c4aa8),_0x314d44=Math['round'](_0x314d44),_0x409fd6=Math['round'](_0x409fd6),_0x3d2af3=Math['round'](_0x3d2af3),VisuMZ[_0x2cd299(0x7b3)][_0x2cd299(0x8a7)][_0x2cd299(0x592)](this,_0xf94ec2,_0x40432f,_0x1c4aa8,_0x314d44,_0x409fd6,_0x3d2af3);},VisuMZ['CoreEngine'][_0x39290f(0x4d6)]=Window_Base[_0x39290f(0x24d)][_0x39290f(0x1e0)],Window_Base[_0x39290f(0x24d)][_0x39290f(0x1e0)]=function(_0x12b870,_0x3f278f,_0x237fef,_0x127939){const _0x538f7f=_0x39290f;_0x237fef=Math[_0x538f7f(0x401)](_0x237fef),_0x127939=Math['round'](_0x127939),VisuMZ[_0x538f7f(0x7b3)][_0x538f7f(0x4d6)][_0x538f7f(0x592)](this,_0x12b870,_0x3f278f,_0x237fef,_0x127939);},VisuMZ[_0x39290f(0x7b3)][_0x39290f(0x78c)]=Window_Selectable[_0x39290f(0x24d)]['itemRect'],Window_Selectable[_0x39290f(0x24d)][_0x39290f(0x620)]=function(_0x5f2dc0){const _0x3e960c=_0x39290f;let _0x2ea53f=VisuMZ[_0x3e960c(0x7b3)][_0x3e960c(0x78c)][_0x3e960c(0x592)](this,_0x5f2dc0);return _0x2ea53f['x']=Math[_0x3e960c(0x401)](_0x2ea53f['x']),_0x2ea53f['y']=Math[_0x3e960c(0x401)](_0x2ea53f['y']),_0x2ea53f['width']=Math['round'](_0x2ea53f[_0x3e960c(0x42a)]),_0x2ea53f[_0x3e960c(0x431)]=Math[_0x3e960c(0x401)](_0x2ea53f[_0x3e960c(0x431)]),_0x2ea53f;},VisuMZ[_0x39290f(0x7b3)][_0x39290f(0x1e7)]=Window_StatusBase[_0x39290f(0x24d)]['drawActorSimpleStatus'],Window_StatusBase['prototype'][_0x39290f(0x77e)]=function(_0x543b57,_0xeb10fe,_0x35b6ba){const _0x14ff0c=_0x39290f;_0xeb10fe=Math[_0x14ff0c(0x401)](_0xeb10fe),_0x35b6ba=Math[_0x14ff0c(0x401)](_0x35b6ba),VisuMZ[_0x14ff0c(0x7b3)][_0x14ff0c(0x1e7)][_0x14ff0c(0x592)](this,_0x543b57,_0xeb10fe,_0x35b6ba);},Window_Base[_0x39290f(0x24d)][_0x39290f(0x85f)]=function(){const _0x37b395=_0x39290f;this[_0x37b395(0x610)]={'duration':0x0,'wholeDuration':0x0,'type':_0x37b395(0x675),'targetX':this['x'],'targetY':this['y'],'targetScaleX':this[_0x37b395(0x137)]['x'],'targetScaleY':this[_0x37b395(0x137)]['y'],'targetOpacity':this[_0x37b395(0x48f)],'targetBackOpacity':this[_0x37b395(0x8b6)],'targetContentsOpacity':this[_0x37b395(0x500)]};},Window_Base['prototype']['updateCoreEasing']=function(){const _0xc658d9=_0x39290f;if(!this[_0xc658d9(0x610)])return;if(this[_0xc658d9(0x610)][_0xc658d9(0x521)]<=0x0)return;this['x']=this['applyCoreEasing'](this['x'],this[_0xc658d9(0x610)][_0xc658d9(0x256)]),this['y']=this['applyCoreEasing'](this['y'],this['_coreEasing'][_0xc658d9(0x325)]),this[_0xc658d9(0x137)]['x']=this['applyCoreEasing'](this['scale']['x'],this[_0xc658d9(0x610)]['targetScaleX']),this[_0xc658d9(0x137)]['y']=this[_0xc658d9(0x2c1)](this[_0xc658d9(0x137)]['y'],this['_coreEasing']['targetScaleY']),this[_0xc658d9(0x48f)]=this[_0xc658d9(0x2c1)](this['opacity'],this[_0xc658d9(0x610)][_0xc658d9(0x1e9)]),this[_0xc658d9(0x8b6)]=this[_0xc658d9(0x2c1)](this['backOpacity'],this['_coreEasing'][_0xc658d9(0x1e1)]),this['contentsOpacity']=this[_0xc658d9(0x2c1)](this[_0xc658d9(0x500)],this[_0xc658d9(0x610)][_0xc658d9(0x5c5)]),this[_0xc658d9(0x610)][_0xc658d9(0x521)]--;},Window_Base[_0x39290f(0x24d)][_0x39290f(0x2c1)]=function(_0x201236,_0x2ad29b){const _0x10faca=_0x39290f;if(!this['_coreEasing'])return _0x2ad29b;const _0x4406dc=this[_0x10faca(0x610)][_0x10faca(0x521)],_0x5c211f=this[_0x10faca(0x610)][_0x10faca(0x7c3)],_0x30729d=this[_0x10faca(0x561)]((_0x5c211f-_0x4406dc)/_0x5c211f),_0x54ef65=this[_0x10faca(0x561)]((_0x5c211f-_0x4406dc+0x1)/_0x5c211f),_0x552791=(_0x201236-_0x2ad29b*_0x30729d)/(0x1-_0x30729d);return _0x552791+(_0x2ad29b-_0x552791)*_0x54ef65;},Window_Base[_0x39290f(0x24d)][_0x39290f(0x561)]=function(_0x4747cb){const _0x3e803b=_0x39290f;if(!this['_coreEasing'])return _0x4747cb;return VisuMZ[_0x3e803b(0x426)](_0x4747cb,this[_0x3e803b(0x610)][_0x3e803b(0x6e5)]||_0x3e803b(0x675));},Window_Base[_0x39290f(0x24d)][_0x39290f(0x5ce)]=function(_0x174d90,_0x350416){const _0x1fb561=_0x39290f;if(!this['_coreEasing'])return;this['x']=this['_coreEasing'][_0x1fb561(0x256)],this['y']=this[_0x1fb561(0x610)][_0x1fb561(0x325)],this['scale']['x']=this[_0x1fb561(0x610)]['targetScaleX'],this[_0x1fb561(0x137)]['y']=this[_0x1fb561(0x610)][_0x1fb561(0x224)],this[_0x1fb561(0x48f)]=this[_0x1fb561(0x610)]['targetOpacity'],this[_0x1fb561(0x8b6)]=this[_0x1fb561(0x610)][_0x1fb561(0x1e1)],this[_0x1fb561(0x500)]=this[_0x1fb561(0x610)][_0x1fb561(0x5c5)],this[_0x1fb561(0x686)](_0x174d90,_0x350416,this['x'],this['y'],this[_0x1fb561(0x137)]['x'],this[_0x1fb561(0x137)]['y'],this[_0x1fb561(0x48f)],this[_0x1fb561(0x8b6)],this[_0x1fb561(0x500)]);},Window_Base[_0x39290f(0x24d)][_0x39290f(0x686)]=function(_0x641e5f,_0x5ace8e,_0x5807f8,_0x580b30,_0xef0dea,_0x3ba4ad,_0x190c9d,_0x1f3db6,_0x1eb098){const _0x3e8f20=_0x39290f;this[_0x3e8f20(0x610)]={'duration':_0x641e5f,'wholeDuration':_0x641e5f,'type':_0x5ace8e,'targetX':_0x5807f8,'targetY':_0x580b30,'targetScaleX':_0xef0dea,'targetScaleY':_0x3ba4ad,'targetOpacity':_0x190c9d,'targetBackOpacity':_0x1f3db6,'targetContentsOpacity':_0x1eb098};},Window_Base[_0x39290f(0x24d)][_0x39290f(0x6a1)]=function(_0x3f2233,_0x245a5c,_0x15184,_0x5bd090,_0xfb6f3e){const _0x49977f=_0x39290f;this['resetFontSettings'](),this[_0x49977f(0x328)][_0x49977f(0x8b7)]=VisuMZ[_0x49977f(0x7b3)][_0x49977f(0x1ac)][_0x49977f(0x320)][_0x49977f(0x84b)];const _0x3cfed0=VisuMZ[_0x49977f(0x7b3)][_0x49977f(0x1ac)]['Gold']['GoldIcon'];if(_0x3cfed0>0x0&&_0x245a5c===TextManager[_0x49977f(0x452)]){const _0x140cb4=_0x5bd090+(this['lineHeight']()-ImageManager['iconHeight'])/0x2;this[_0x49977f(0x385)](_0x3cfed0,_0x15184+(_0xfb6f3e-ImageManager[_0x49977f(0x441)]),_0x140cb4),_0xfb6f3e-=ImageManager[_0x49977f(0x441)]+0x4;}else{if('itpOr'===_0x49977f(0x439))this[_0x49977f(0x5b8)](ColorManager[_0x49977f(0x43a)]()),this[_0x49977f(0x218)](_0x245a5c,_0x15184,_0x5bd090,_0xfb6f3e,_0x49977f(0x183)),_0xfb6f3e-=this[_0x49977f(0x605)](_0x245a5c)+0x6;else{if(_0x4d9065)_0x2b079d[_0x49977f(0x146)](_0x5438b3);}}this[_0x49977f(0x688)]();const _0x9cffc9=this[_0x49977f(0x605)](this['_digitGrouping']?VisuMZ[_0x49977f(0x8de)](_0x3f2233):_0x3f2233);_0x9cffc9>_0xfb6f3e?this[_0x49977f(0x218)](VisuMZ[_0x49977f(0x7b3)]['Settings']['Gold'][_0x49977f(0x3ab)],_0x15184,_0x5bd090,_0xfb6f3e,'right'):this[_0x49977f(0x218)](_0x3f2233,_0x15184,_0x5bd090,_0xfb6f3e,_0x49977f(0x183)),this['resetFontSettings']();},Window_Base[_0x39290f(0x24d)]['drawIconBySize']=function(_0x520043,_0x24e434,_0xcdc7b4,_0x14f092,_0x5b416e){const _0x49a279=_0x39290f,_0x3a045a=ImageManager[_0x49a279(0x530)]('IconSet'),_0x45b917=ImageManager[_0x49a279(0x441)],_0x126faa=ImageManager['iconHeight'],_0xbe4231=_0x520043%0x10*_0x45b917,_0x3f6b0a=Math[_0x49a279(0x27c)](_0x520043/0x10)*_0x126faa,_0x5adbe2=_0x14f092,_0x2b2e89=_0x14f092;this[_0x49a279(0x328)][_0x49a279(0x24f)]['imageSmoothingEnabled']=_0x5b416e,this[_0x49a279(0x328)]['blt'](_0x3a045a,_0xbe4231,_0x3f6b0a,_0x45b917,_0x126faa,_0x24e434,_0xcdc7b4,_0x5adbe2,_0x2b2e89),this[_0x49a279(0x328)][_0x49a279(0x24f)][_0x49a279(0x14f)]=!![];},Window_Base[_0x39290f(0x24d)][_0x39290f(0x365)]=function(_0x11c2e8,_0x26709c,_0x51622b,_0x205c89,_0x3debe6,_0x3cabdd){const _0x706b90=_0x39290f,_0x176000=Math['floor']((_0x51622b-0x2)*_0x205c89),_0x566202=Sprite_Gauge[_0x706b90(0x24d)][_0x706b90(0x760)][_0x706b90(0x592)](this),_0xebc455=_0x26709c+this[_0x706b90(0x732)]()-_0x566202-0x2;this[_0x706b90(0x328)][_0x706b90(0x7a8)](_0x11c2e8,_0xebc455,_0x51622b,_0x566202,ColorManager['gaugeBackColor']()),this[_0x706b90(0x328)][_0x706b90(0x1b7)](_0x11c2e8+0x1,_0xebc455+0x1,_0x176000,_0x566202-0x2,_0x3debe6,_0x3cabdd);},Window_Selectable[_0x39290f(0x24d)][_0x39290f(0x4c3)]=function(_0x23a019){const _0x53d506=_0x39290f;let _0x3704e9=this[_0x53d506(0x2aa)]();const _0x42399d=this[_0x53d506(0x466)](),_0x181341=this['maxCols']();if(this[_0x53d506(0x814)]()&&(_0x3704e9<_0x42399d||_0x23a019&&_0x181341===0x1)){_0x3704e9+=_0x181341;if(_0x3704e9>=_0x42399d)_0x3704e9=_0x42399d-0x1;this['smoothSelect'](_0x3704e9);}else!this[_0x53d506(0x814)]()&&((_0x3704e9<_0x42399d-_0x181341||_0x23a019&&_0x181341===0x1)&&this['smoothSelect']((_0x3704e9+_0x181341)%_0x42399d));},VisuMZ[_0x39290f(0x7b3)]['Window_Selectable_cursorDown']=Window_Selectable['prototype'][_0x39290f(0x4c3)],Window_Selectable[_0x39290f(0x24d)][_0x39290f(0x4c3)]=function(_0x5cff1a){const _0x4349ad=_0x39290f;this['isUseModernControls']()&&_0x5cff1a&&this['maxCols']()===0x1&&this[_0x4349ad(0x2aa)]()===this['maxItems']()-0x1?this[_0x4349ad(0x4ef)](0x0):VisuMZ[_0x4349ad(0x7b3)][_0x4349ad(0x1da)][_0x4349ad(0x592)](this,_0x5cff1a);},Window_Selectable[_0x39290f(0x24d)][_0x39290f(0x588)]=function(_0x5a84cf){const _0x28a33b=_0x39290f;let _0x216467=Math['max'](0x0,this[_0x28a33b(0x2aa)]());const _0x62daa=this['maxItems'](),_0x1f9e6c=this[_0x28a33b(0x8a8)]();if(this[_0x28a33b(0x814)]()&&_0x216467>0x0||_0x5a84cf&&_0x1f9e6c===0x1){_0x216467-=_0x1f9e6c;if(_0x216467<=0x0)_0x216467=0x0;this[_0x28a33b(0x4ef)](_0x216467);}else!this[_0x28a33b(0x814)]()&&((_0x216467>=_0x1f9e6c||_0x5a84cf&&_0x1f9e6c===0x1)&&this['smoothSelect']((_0x216467-_0x1f9e6c+_0x62daa)%_0x62daa));},VisuMZ[_0x39290f(0x7b3)][_0x39290f(0x29a)]=Window_Selectable[_0x39290f(0x24d)]['cursorUp'],Window_Selectable[_0x39290f(0x24d)]['cursorUp']=function(_0x5157ff){const _0x22091a=_0x39290f;if(this[_0x22091a(0x814)]()&&_0x5157ff&&this['maxCols']()===0x1&&this['index']()===0x0){if(_0x22091a(0x28e)!=='SZOAg')this['smoothSelect'](this['maxItems']()-0x1);else{if(this[_0x22091a(0x6f4)]===_0x22091a(0x3e2))return;if(_0x5241ee[_0x22091a(0x4c4)]())return;_0x339427[_0x22091a(0x7b3)]['Window_NameInput_cursorPagedown'][_0x22091a(0x592)](this),this['switchModes'](_0x22091a(0x6ae));}}else VisuMZ['CoreEngine'][_0x22091a(0x29a)][_0x22091a(0x592)](this,_0x5157ff);},Window_Selectable[_0x39290f(0x24d)][_0x39290f(0x814)]=function(){const _0x1d8bd9=_0x39290f;return VisuMZ['CoreEngine'][_0x1d8bd9(0x1ac)][_0x1d8bd9(0x646)][_0x1d8bd9(0x794)];},VisuMZ[_0x39290f(0x7b3)][_0x39290f(0x5b0)]=Window_Selectable[_0x39290f(0x24d)][_0x39290f(0x3b2)],Window_Selectable['prototype'][_0x39290f(0x3b2)]=function(){const _0x560cbc=_0x39290f;this[_0x560cbc(0x814)]()?_0x560cbc(0x6ec)!==_0x560cbc(0x6ec)?(_0x565145[_0x560cbc(0x8ec)]=_0x390871,_0x4bc9bf[_0x560cbc(0x575)](),_0x2f0f7a[_0x560cbc(0x575)]()):(this[_0x560cbc(0x79b)](),this[_0x560cbc(0x713)]()):VisuMZ[_0x560cbc(0x7b3)][_0x560cbc(0x5b0)][_0x560cbc(0x592)](this);},Window_Selectable[_0x39290f(0x24d)][_0x39290f(0x5a8)]=function(){return!![];},Window_Selectable['prototype'][_0x39290f(0x79b)]=function(){const _0x42864a=_0x39290f;if(this[_0x42864a(0x5ea)]()){const _0x353944=this['index']();Input['isRepeated'](_0x42864a(0x114))&&(_0x42864a(0x5a1)===_0x42864a(0x5a1)?Input[_0x42864a(0x71f)](_0x42864a(0x596))&&this[_0x42864a(0x5a8)]()?this['cursorPagedown']():this['cursorDown'](Input[_0x42864a(0x3b6)](_0x42864a(0x114))):(this[_0x42864a(0x385)](_0x41751f,_0x1462a0+0x2,_0x4b1d45+0x2),_0x153761-=_0x1e256e[_0x42864a(0x441)]+0x4,_0x204c58+=_0x5ae340[_0x42864a(0x441)]+0x4));Input[_0x42864a(0x51a)]('up')&&(Input['isPressed']('shift')&&this[_0x42864a(0x5a8)]()?this[_0x42864a(0x84c)]():this[_0x42864a(0x588)](Input['isTriggered']('up')));if(Input[_0x42864a(0x51a)](_0x42864a(0x183))){if(_0x42864a(0x6e6)!==_0x42864a(0x6d4))this[_0x42864a(0x4a5)](Input['isTriggered'](_0x42864a(0x183)));else{const _0x1a945f=_0x187ef2+(this['lineHeight']()-_0x4c66d8[_0x42864a(0x34b)])/0x2;this[_0x42864a(0x385)](_0x49df61,_0x21027f+(_0x4ca175-_0x23fc67[_0x42864a(0x441)]),_0x1a945f),_0x4ae9df-=_0x298b10[_0x42864a(0x441)]+0x4;}}Input['isRepeated'](_0x42864a(0x7d9))&&this['cursorLeft'](Input[_0x42864a(0x3b6)](_0x42864a(0x7d9)));if(!this['isHandled']('pagedown')&&Input[_0x42864a(0x51a)]('pagedown')){if('UKOrm'===_0x42864a(0x582))this[_0x42864a(0x1c2)]();else return-0.5*(_0x3fda66[_0x42864a(0x8da)](0x2,0xa*_0x1eed96)*_0x35b745[_0x42864a(0x7d2)]((_0x46543a-_0x3d7301)*(0x2*_0x3a4be6['PI'])/_0x43b630));}if(!this[_0x42864a(0x2cb)](_0x42864a(0x291))&&Input[_0x42864a(0x51a)]('pageup')){if(_0x42864a(0x8be)!==_0x42864a(0x24e))this[_0x42864a(0x84c)]();else{for(const _0x23ec6e of this[_0x42864a(0x825)]){!_0x23ec6e[_0x42864a(0x765)]()&&this[_0x42864a(0x14d)](_0x23ec6e);}this[_0x42864a(0x326)]();}}if(this[_0x42864a(0x2aa)]()!==_0x353944){if('ERryD'!==_0x42864a(0x35c))this[_0x42864a(0x6af)]();else{const _0x291669=_0x2e43d3[_0x42864a(0x7b3)][_0x42864a(0x1ac)][_0x42864a(0x8bf)],_0x11f9b5=_0x291669[_0x42864a(0x3cf)],_0x54559d=this[_0x42864a(0x483)](_0x55a481),_0x2254fa=this[_0x42864a(0x483)](_0x549991);return _0x11f9b5['format'](_0x54559d,_0x2254fa);}}}},Window_Selectable[_0x39290f(0x24d)][_0x39290f(0x713)]=function(){const _0x1ce36a=_0x39290f;if(this['isCursorMovable']()){const _0x427190=this[_0x1ce36a(0x2aa)]();Input[_0x1ce36a(0x3b6)](_0x1ce36a(0x287))&&(_0x1ce36a(0x30a)!==_0x1ce36a(0x30a)?(_0x169447[_0x1ce36a(0x665)](),_0x64998c[_0x1ce36a(0x454)](_0x40c984),_0x46dd49['CoreEngine'][_0x1ce36a(0x6f2)][_0x1ce36a(0x592)](this,_0x3edbd4)):this['smoothSelect'](Math[_0x1ce36a(0x201)](this['index'](),0x0)));Input['isTriggered'](_0x1ce36a(0x823))&&this[_0x1ce36a(0x4ef)](Math[_0x1ce36a(0x886)](this['index'](),this[_0x1ce36a(0x466)]()-0x1));if(this['index']()!==_0x427190){if(_0x1ce36a(0x37b)!==_0x1ce36a(0x37b))return _0x56d2aa[_0x1ce36a(0x7b3)]['Settings']['Color'][_0x1ce36a(0x7fe)]||_0x1ce36a(0x709);else this['playCursorSound']();}}},VisuMZ[_0x39290f(0x7b3)]['Window_Selectable_processTouch']=Window_Selectable['prototype']['processTouch'],Window_Selectable[_0x39290f(0x24d)]['processTouch']=function(){const _0x518b5e=_0x39290f;this[_0x518b5e(0x814)]()?this['processTouchModernControls']():VisuMZ[_0x518b5e(0x7b3)][_0x518b5e(0x46e)][_0x518b5e(0x592)](this);},Window_Selectable[_0x39290f(0x24d)]['processTouchModernControls']=function(){const _0x12e01d=_0x39290f;VisuMZ[_0x12e01d(0x7b3)][_0x12e01d(0x46e)]['call'](this);},Window_Selectable[_0x39290f(0x24d)]['colSpacing']=function(){const _0x154dcf=_0x39290f;return VisuMZ['CoreEngine']['Settings'][_0x154dcf(0x5dd)][_0x154dcf(0x3c2)];},Window_Selectable['prototype'][_0x39290f(0x40c)]=function(){const _0x2ab64f=_0x39290f;return VisuMZ[_0x2ab64f(0x7b3)][_0x2ab64f(0x1ac)][_0x2ab64f(0x5dd)][_0x2ab64f(0x284)];},Window_Selectable[_0x39290f(0x24d)][_0x39290f(0x6a8)]=function(){const _0xc9768a=_0x39290f;return Window_Scrollable[_0xc9768a(0x24d)][_0xc9768a(0x6a8)]['call'](this)+VisuMZ['CoreEngine'][_0xc9768a(0x1ac)][_0xc9768a(0x5dd)][_0xc9768a(0x69e)];;},VisuMZ[_0x39290f(0x7b3)][_0x39290f(0x2d7)]=Window_Selectable[_0x39290f(0x24d)][_0x39290f(0x3a1)],Window_Selectable[_0x39290f(0x24d)][_0x39290f(0x3a1)]=function(_0x531653){const _0x1287ac=_0x39290f,_0x292e8a=VisuMZ['CoreEngine'][_0x1287ac(0x1ac)][_0x1287ac(0x5dd)];if(_0x292e8a[_0x1287ac(0x66f)]===![])return;_0x292e8a[_0x1287ac(0x748)]?_0x1287ac(0x3ea)==='JbTln'?(_0x187b90[_0x1287ac(0x7d5)](),this['requestMotion']('evade')):_0x292e8a['DrawItemBackgroundJS']['call'](this,_0x531653):VisuMZ[_0x1287ac(0x7b3)][_0x1287ac(0x2d7)]['call'](this,_0x531653);},VisuMZ[_0x39290f(0x7b3)]['Window_Gold_refresh']=Window_Gold[_0x39290f(0x24d)][_0x39290f(0x6fe)],Window_Gold[_0x39290f(0x24d)][_0x39290f(0x6fe)]=function(){const _0x4c2474=_0x39290f;this['isItemStyle']()?this[_0x4c2474(0x49e)]():_0x4c2474(0x269)!==_0x4c2474(0x4a2)?VisuMZ[_0x4c2474(0x7b3)][_0x4c2474(0x32b)]['call'](this):(this[_0x4c2474(0x6f4)]=this[_0x4c2474(0x1b6)](),_0x538c73[_0x4c2474(0x7b3)][_0x4c2474(0x456)][_0x4c2474(0x592)](this,_0x226bfc),this[_0x4c2474(0x6f4)]===_0x4c2474(0x6ae)?this[_0x4c2474(0x77d)](0x0):(_0x49b40f[_0x4c2474(0x575)](),this['deselect']()));},Window_Gold[_0x39290f(0x24d)][_0x39290f(0x739)]=function(){const _0x16f123=_0x39290f;if(TextManager['currencyUnit']!==this[_0x16f123(0x452)]())return![];return VisuMZ[_0x16f123(0x7b3)][_0x16f123(0x1ac)][_0x16f123(0x320)]['ItemStyle'];},Window_Gold[_0x39290f(0x24d)][_0x39290f(0x49e)]=function(){const _0x1e2e48=_0x39290f;this[_0x1e2e48(0x295)](),this['contents']['clear'](),this[_0x1e2e48(0x328)]['fontSize']=VisuMZ[_0x1e2e48(0x7b3)][_0x1e2e48(0x1ac)][_0x1e2e48(0x320)]['GoldFontSize'];const _0x473f28=VisuMZ['CoreEngine'][_0x1e2e48(0x1ac)]['Gold'][_0x1e2e48(0x216)],_0x1481bb=this[_0x1e2e48(0x202)](0x0);if(_0x473f28>0x0){const _0x261f6e=_0x1481bb['y']+(this['lineHeight']()-ImageManager[_0x1e2e48(0x34b)])/0x2;this[_0x1e2e48(0x385)](_0x473f28,_0x1481bb['x'],_0x261f6e);const _0x182e60=ImageManager['iconWidth']+0x4;_0x1481bb['x']+=_0x182e60,_0x1481bb[_0x1e2e48(0x42a)]-=_0x182e60;}this[_0x1e2e48(0x5b8)](ColorManager[_0x1e2e48(0x43a)]()),this[_0x1e2e48(0x218)](this[_0x1e2e48(0x452)](),_0x1481bb['x'],_0x1481bb['y'],_0x1481bb[_0x1e2e48(0x42a)],_0x1e2e48(0x7d9));const _0x1f650f=this[_0x1e2e48(0x605)](this['currencyUnit']())+0x6;;_0x1481bb['x']+=_0x1f650f,_0x1481bb[_0x1e2e48(0x42a)]-=_0x1f650f,this[_0x1e2e48(0x688)]();const _0x35d017=this[_0x1e2e48(0x327)](),_0x4c8442=this[_0x1e2e48(0x605)](this[_0x1e2e48(0x3f6)]?VisuMZ[_0x1e2e48(0x8de)](this['value']()):this[_0x1e2e48(0x327)]());if(_0x4c8442>_0x1481bb[_0x1e2e48(0x42a)])_0x1e2e48(0x40b)===_0x1e2e48(0x6e9)?this[_0x1e2e48(0x4ef)](this[_0x1e2e48(0x466)]()-0x1):this[_0x1e2e48(0x218)](VisuMZ['CoreEngine'][_0x1e2e48(0x1ac)][_0x1e2e48(0x320)][_0x1e2e48(0x3ab)],_0x1481bb['x'],_0x1481bb['y'],_0x1481bb[_0x1e2e48(0x42a)],'right');else{if(_0x1e2e48(0x10f)===_0x1e2e48(0x2de)){if(_0xc660f9[_0x1e2e48(0x4f3)]==='SV')return!![];else{if(_0x1b4cd2[_0x1e2e48(0x4f3)]==='FV')return![];}if(this[_0x1e2e48(0x25e)]===_0x1e3b07)this['initCoreEngine']();if(this[_0x1e2e48(0x25e)][_0x1e2e48(0x62c)]===_0x15b879)this[_0x1e2e48(0x2ef)]();return this[_0x1e2e48(0x25e)][_0x1e2e48(0x62c)];}else this['drawText'](this[_0x1e2e48(0x327)](),_0x1481bb['x'],_0x1481bb['y'],_0x1481bb[_0x1e2e48(0x42a)],'right');}this[_0x1e2e48(0x295)]();},Window_StatusBase[_0x39290f(0x24d)][_0x39290f(0x433)]=function(_0xb92a95,_0x105841,_0x2e9ba9,_0x4bda05,_0x1df702){const _0x56323b=_0x39290f;_0x4bda05=String(_0x4bda05||'')['toUpperCase']();if(VisuMZ[_0x56323b(0x7b3)][_0x56323b(0x1ac)]['Param'][_0x56323b(0x50c)]){if('gzfOQ'==='gzfOQ'){const _0x5e716c=VisuMZ[_0x56323b(0x4ca)](_0x4bda05);_0x1df702?(this[_0x56323b(0x493)](_0x5e716c,_0xb92a95,_0x105841,this[_0x56323b(0x373)]()),_0x2e9ba9-=this['gaugeLineHeight']()+0x2,_0xb92a95+=this[_0x56323b(0x373)]()+0x2):(this['drawIcon'](_0x5e716c,_0xb92a95+0x2,_0x105841+0x2),_0x2e9ba9-=ImageManager[_0x56323b(0x441)]+0x4,_0xb92a95+=ImageManager['iconWidth']+0x4);}else{const _0x38cce9=_0x29228d[_0xfefff1],_0x53bbf7=_0x56323b(0x766)[_0x56323b(0x8ca)](_0x225da7);for(const _0x52d1ea of _0x38cce9){_0x32c8cb[_0x56323b(0x5ca)](_0x53bbf7,_0x52d1ea);}}}const _0x40c943=TextManager[_0x56323b(0x5d1)](_0x4bda05);this[_0x56323b(0x295)](),this[_0x56323b(0x5b8)](ColorManager[_0x56323b(0x43a)]());if(_0x1df702)'pqGKw'==='GmdRr'?_0x1fc72d['erasePicture'](_0x1e5f7b):(this['contents'][_0x56323b(0x8b7)]=this[_0x56323b(0x57a)](),this[_0x56323b(0x328)][_0x56323b(0x218)](_0x40c943,_0xb92a95,_0x105841,_0x2e9ba9,this[_0x56323b(0x373)](),_0x56323b(0x7d9)));else{if(_0x56323b(0x6d9)==='MxKcL')this[_0x56323b(0x218)](_0x40c943,_0xb92a95,_0x105841,_0x2e9ba9);else return _0xc8bbb[_0x56323b(0x302)][_0x56323b(0x49d)][_0x56323b(0x592)](this);}this[_0x56323b(0x295)]();},Window_StatusBase[_0x39290f(0x24d)]['smallParamFontSize']=function(){return $gameSystem['mainFontSize']()-0x8;},Window_StatusBase[_0x39290f(0x24d)][_0x39290f(0x5cf)]=function(_0x387c5c,_0x2c6edf,_0x5ccc3b,_0x425627){const _0x309c4c=_0x39290f;_0x425627=_0x425627||0xa8,this[_0x309c4c(0x688)]();if(VisuMZ[_0x309c4c(0x7b3)][_0x309c4c(0x1ac)]['UI']['TextCodeClassNames']){if(_0x309c4c(0x4e6)==='emkRQ'){_0x456bed[_0x309c4c(0x7b3)][_0x309c4c(0x3b7)][_0x309c4c(0x592)](this,_0x3cb898);if(_0xfaf62a[_0x309c4c(0x259)])for(const _0x4fa626 of _0x28bf55['learnings']){_0x4fa626[_0x309c4c(0x62b)][_0x309c4c(0x5cb)](/<LEARN AT LEVEL:[ ](\d+)>/i)&&(_0x4fa626[_0x309c4c(0x58e)]=_0x110f6b[_0x309c4c(0x886)](_0x91be57(_0x476aaa['$1']),0x1));}}else this[_0x309c4c(0x3af)](_0x387c5c['currentClass']()[_0x309c4c(0x8e0)],_0x2c6edf,_0x5ccc3b,_0x425627);}else{const _0x482ab3=_0x387c5c['currentClass']()[_0x309c4c(0x8e0)][_0x309c4c(0x41d)](/\\I\[(\d+)\]/gi,'');this[_0x309c4c(0x218)](_0x482ab3,_0x2c6edf,_0x5ccc3b,_0x425627);}},Window_StatusBase['prototype']['drawActorNickname']=function(_0x1c2359,_0x385f05,_0x3a1d38,_0x3f5a26){const _0x1e8943=_0x39290f;_0x3f5a26=_0x3f5a26||0x10e,this['resetTextColor']();if(VisuMZ[_0x1e8943(0x7b3)][_0x1e8943(0x1ac)]['UI']['TextCodeNicknames'])this['drawTextEx'](_0x1c2359['nickname'](),_0x385f05,_0x3a1d38,_0x3f5a26);else{if(_0x1e8943(0x622)!==_0x1e8943(0x8d1)){const _0x22ae68=_0x1c2359['nickname']()[_0x1e8943(0x41d)](/\\I\[(\d+)\]/gi,'');this[_0x1e8943(0x218)](_0x1c2359['nickname'](),_0x385f05,_0x3a1d38,_0x3f5a26);}else _0xddc6f5+=_0x1e8943(0x391)[_0x1e8943(0x8ca)](_0x4664dd['parameters'][0x0]);}},VisuMZ[_0x39290f(0x7b3)][_0x39290f(0x165)]=Window_StatusBase[_0x39290f(0x24d)][_0x39290f(0x2b5)],Window_StatusBase[_0x39290f(0x24d)][_0x39290f(0x2b5)]=function(_0x46923d,_0x1a1127,_0x4ede1e){const _0x2054c2=_0x39290f;if(this[_0x2054c2(0x1d4)]())this[_0x2054c2(0x32d)](_0x46923d,_0x1a1127,_0x4ede1e);VisuMZ[_0x2054c2(0x7b3)][_0x2054c2(0x165)][_0x2054c2(0x592)](this,_0x46923d,_0x1a1127,_0x4ede1e);},Window_StatusBase['prototype'][_0x39290f(0x1d4)]=function(){const _0x4d6120=_0x39290f;return VisuMZ[_0x4d6120(0x7b3)][_0x4d6120(0x1ac)]['UI']['LvExpGauge'];},Window_StatusBase[_0x39290f(0x24d)]['drawActorExpGauge']=function(_0x43dc2c,_0x29c465,_0xd64aa8){const _0x285f01=_0x39290f;if(!_0x43dc2c)return;if(!_0x43dc2c[_0x285f01(0x29c)]())return;const _0x3dda9f=0x80,_0x53be32=_0x43dc2c['expRate']();let _0x1b65c2=ColorManager[_0x285f01(0x855)](),_0x49c1c9=ColorManager[_0x285f01(0x2eb)]();_0x53be32>=0x1&&(_0x1b65c2=ColorManager['maxLvGaugeColor1'](),_0x49c1c9=ColorManager[_0x285f01(0x4c0)]()),this[_0x285f01(0x365)](_0x29c465,_0xd64aa8,_0x3dda9f,_0x53be32,_0x1b65c2,_0x49c1c9);},Window_EquipStatus[_0x39290f(0x24d)]['drawAllParams']=function(){const _0x5ee239=_0x39290f;let _0x3f37d6=0x0;for(const _0x42dd3d of VisuMZ[_0x5ee239(0x7b3)]['Settings'][_0x5ee239(0x390)][_0x5ee239(0x42c)]){if(_0x5ee239(0x49f)==='QEWNx'){const _0xa801eb='_stored_tpGaugeColor1';this[_0x5ee239(0x383)]=this['_colorCache']||{};if(this[_0x5ee239(0x383)][_0xa801eb])return this['_colorCache'][_0xa801eb];const _0x2417c5=_0x328a97['CoreEngine'][_0x5ee239(0x1ac)]['Color'][_0x5ee239(0x368)];return this['getColorDataFromPluginParameters'](_0xa801eb,_0x2417c5);}else{const _0x3b26a8=this['itemPadding'](),_0x186245=this[_0x5ee239(0x854)](_0x3f37d6);this[_0x5ee239(0x27b)](_0x3b26a8,_0x186245,_0x42dd3d),_0x3f37d6++;}}},Window_EquipStatus[_0x39290f(0x24d)]['drawParamName']=function(_0x13f1b2,_0x59697e,_0x38ee75){const _0x2af79b=_0x39290f,_0x253502=this[_0x2af79b(0x492)]()-this[_0x2af79b(0x340)]()*0x2;this[_0x2af79b(0x433)](_0x13f1b2,_0x59697e,_0x253502,_0x38ee75,![]);},Window_EquipStatus[_0x39290f(0x24d)][_0x39290f(0x1e3)]=function(_0x51dc65,_0x558f12,_0x68c570){const _0x1ba9c7=_0x39290f,_0x4d79d2=this[_0x1ba9c7(0x494)]();this[_0x1ba9c7(0x688)](),this[_0x1ba9c7(0x218)](this[_0x1ba9c7(0x657)][_0x1ba9c7(0x38c)](_0x68c570,!![]),_0x51dc65,_0x558f12,_0x4d79d2,_0x1ba9c7(0x183));},Window_EquipStatus[_0x39290f(0x24d)][_0x39290f(0x36e)]=function(_0x5a0a0e,_0xd7633b){const _0x3fd8b4=_0x39290f,_0x6f2c22=this[_0x3fd8b4(0x1f5)]();this[_0x3fd8b4(0x5b8)](ColorManager[_0x3fd8b4(0x43a)]());const _0x245ef6=VisuMZ[_0x3fd8b4(0x7b3)][_0x3fd8b4(0x1ac)]['UI'][_0x3fd8b4(0x38d)];this[_0x3fd8b4(0x218)](_0x245ef6,_0x5a0a0e,_0xd7633b,_0x6f2c22,_0x3fd8b4(0x547));},Window_EquipStatus[_0x39290f(0x24d)][_0x39290f(0x7b1)]=function(_0x7daa0a,_0x5e9635,_0x33ea25){const _0x14ea29=_0x39290f,_0x504a42=this[_0x14ea29(0x494)](),_0x4f1df=this[_0x14ea29(0x550)][_0x14ea29(0x38c)](_0x33ea25),_0x4714f0=_0x4f1df-this['_actor'][_0x14ea29(0x38c)](_0x33ea25);this[_0x14ea29(0x5b8)](ColorManager[_0x14ea29(0x572)](_0x4714f0)),this[_0x14ea29(0x218)](this['_tempActor'][_0x14ea29(0x38c)](_0x33ea25,!![]),_0x7daa0a,_0x5e9635,_0x504a42,_0x14ea29(0x183));},VisuMZ[_0x39290f(0x7b3)][_0x39290f(0x157)]=Window_EquipItem[_0x39290f(0x24d)][_0x39290f(0x243)],Window_EquipItem[_0x39290f(0x24d)]['isEnabled']=function(_0x1f4c87){const _0x120577=_0x39290f;if(_0x1f4c87&&this[_0x120577(0x657)]){if(_0x120577(0x3bc)===_0x120577(0x727)){const _0x298c66=_0x120577(0x744);this[_0x120577(0x383)]=this['_colorCache']||{};if(this['_colorCache'][_0x298c66])return this[_0x120577(0x383)][_0x298c66];const _0x4d6f36=_0x49b9a5['CoreEngine'][_0x120577(0x1ac)][_0x120577(0x5d0)][_0x120577(0x519)];return this['getColorDataFromPluginParameters'](_0x298c66,_0x4d6f36);}else return this[_0x120577(0x657)][_0x120577(0x885)](_0x1f4c87);}else return VisuMZ['CoreEngine'][_0x120577(0x157)][_0x120577(0x592)](this,_0x1f4c87);},Window_StatusParams[_0x39290f(0x24d)][_0x39290f(0x466)]=function(){const _0x46da05=_0x39290f;return VisuMZ[_0x46da05(0x7b3)][_0x46da05(0x1ac)][_0x46da05(0x390)][_0x46da05(0x42c)][_0x46da05(0x59c)];},Window_StatusParams[_0x39290f(0x24d)]['drawItem']=function(_0xe12992){const _0x4a7b8e=_0x39290f,_0x594981=this[_0x4a7b8e(0x202)](_0xe12992),_0x4f4588=VisuMZ[_0x4a7b8e(0x7b3)]['Settings'][_0x4a7b8e(0x390)][_0x4a7b8e(0x42c)][_0xe12992],_0x3e9cbb=TextManager['param'](_0x4f4588),_0x3d9b99=this[_0x4a7b8e(0x657)][_0x4a7b8e(0x38c)](_0x4f4588,!![]);this[_0x4a7b8e(0x433)](_0x594981['x'],_0x594981['y'],0xa0,_0x4f4588,![]),this[_0x4a7b8e(0x688)](),this['drawText'](_0x3d9b99,_0x594981['x']+0xa0,_0x594981['y'],0x3c,_0x4a7b8e(0x183));};function _0xcc41(_0x471690,_0x11872c){const _0x207a7a=_0x207a();return _0xcc41=function(_0xcc411e,_0x529db3){_0xcc411e=_0xcc411e-0x103;let _0x26efc4=_0x207a7a[_0xcc411e];return _0x26efc4;},_0xcc41(_0x471690,_0x11872c);}if(VisuMZ[_0x39290f(0x7b3)][_0x39290f(0x1ac)][_0x39290f(0x190)][_0x39290f(0x6c4)]){VisuMZ[_0x39290f(0x7b3)][_0x39290f(0x1ac)][_0x39290f(0x190)]['QwertyLayout']&&(Window_NameInput[_0x39290f(0x70d)]=['Q','W','E','R','T','Y','U','I','O','P','A','S','D','F','G','H','J','K','L','\x27','`','Z','X','C','V','B','N','M',',','.','q','w','e','r','t','y','u','i','o','p','a','s','d','f','g','h','j','k','l',':','~','z','x','c','v','b','n','m','\x22',';','1','2','3','4','5','6','7','8','9','0','!','@','#','$','%','^','&','*','(',')','<','>','[',']','-','_','/','\x20',_0x39290f(0x465),'OK']);;VisuMZ['CoreEngine'][_0x39290f(0x456)]=Window_NameInput[_0x39290f(0x24d)][_0x39290f(0x796)],Window_NameInput['prototype'][_0x39290f(0x796)]=function(_0x96492b){const _0x57c46a=_0x39290f;this[_0x57c46a(0x6f4)]=this[_0x57c46a(0x1b6)](),VisuMZ[_0x57c46a(0x7b3)][_0x57c46a(0x456)][_0x57c46a(0x592)](this,_0x96492b);if(this[_0x57c46a(0x6f4)]==='default'){if('lLdGS'===_0x57c46a(0x188))this[_0x57c46a(0x77d)](0x0);else return _0x5d360c[_0x57c46a(0x2f9)][_0x57c46a(0x592)](this);}else Input[_0x57c46a(0x575)](),this[_0x57c46a(0x3ae)]();},Window_NameInput[_0x39290f(0x24d)]['defaultInputMode']=function(){const _0x2fad9b=_0x39290f;if(Input['isGamepadConnected']())return _0x2fad9b(0x6ae);return VisuMZ['CoreEngine']['Settings']['KeyboardInput'][_0x2fad9b(0x267)]||_0x2fad9b(0x3e2);},VisuMZ['CoreEngine'][_0x39290f(0x21c)]=Window_NameInput[_0x39290f(0x24d)][_0x39290f(0x852)],Window_NameInput[_0x39290f(0x24d)][_0x39290f(0x852)]=function(){const _0x481b34=_0x39290f;if(!this[_0x481b34(0x584)]())return;if(!this['active'])return;if(this['_mode']===_0x481b34(0x3e2)&&Input[_0x481b34(0x1ca)]()){if('ecdCV'!==_0x481b34(0x874))return[0x25,0x26,0x27,0x28][_0x481b34(0x591)](this[_0x481b34(0x611)]);else this[_0x481b34(0x40a)](_0x481b34(0x6ae));}else{if(Input['isSpecialCode'](_0x481b34(0x62f)))Input['clear'](),this[_0x481b34(0x5a3)]();else{if(Input['isTriggered'](_0x481b34(0x361))){Input['clear']();if(this['_mode']===_0x481b34(0x3e2))this[_0x481b34(0x40a)](_0x481b34(0x6ae));else{if(_0x481b34(0x870)!=='MqIok')return _0x420c47[_0x481b34(0x7b3)][_0x481b34(0x1ac)]['QoL']['RequireFocus']?_0x13f9f6[_0x481b34(0x7b3)][_0x481b34(0x347)]['call'](this):!![];else this[_0x481b34(0x40a)](_0x481b34(0x3e2));}}else{if(this[_0x481b34(0x6f4)]===_0x481b34(0x3e2)){if(_0x481b34(0x335)==='iXgPo')this[_0x481b34(0x2e1)]();else return _0x5bfc80[_0x481b34(0x47b)];}else{if(Input[_0x481b34(0x445)](_0x481b34(0x354)))_0x481b34(0x52b)===_0x481b34(0x52b)?(Input[_0x481b34(0x575)](),this[_0x481b34(0x40a)](_0x481b34(0x3e2))):this[_0x481b34(0x4ef)]((_0x4b5049-_0x2074ef+_0x481d54)%_0x3380de);else{if(_0x481b34(0x655)!==_0x481b34(0x3ec))VisuMZ[_0x481b34(0x7b3)]['Window_NameInput_processHandling'][_0x481b34(0x592)](this);else{if(_0x2eb571[_0x481b34(0x565)]())return;_0xd93f60[_0x481b34(0x447)](_0x170b2b,_0x4d51d5);const _0x371c83=_0x4ce583[_0x481b34(0x201)](_0x5d0c1c[_0x481b34(0x61f)],_0x52bb7c[_0x481b34(0x54c)]),_0x5a2d58=_0x5c480f['max'](_0x33f302[_0x481b34(0x61f)],_0x1c9244[_0x481b34(0x54c)]),_0x65f12b=(_0x34d87a['Chance']||0x0)/0x64;for(let _0x1bb86e=_0x371c83;_0x1bb86e<=_0x5a2d58;_0x1bb86e++){const _0x338158=_0xa52c9d['random']()<=_0x65f12b;_0x198b73[_0x481b34(0x77f)](_0x1bb86e,_0x338158);}}}}}}}},VisuMZ[_0x39290f(0x7b3)][_0x39290f(0x5b3)]=Window_NameInput['prototype'][_0x39290f(0x19b)],Window_NameInput[_0x39290f(0x24d)][_0x39290f(0x19b)]=function(){const _0x593c14=_0x39290f;if(!this['isOpenAndActive']())return;if(this[_0x593c14(0x6f4)]===_0x593c14(0x3e2)){if(_0x593c14(0x68c)!==_0x593c14(0x68c)){if(_0x46819f)_0x3a6dc6[_0x593c14(0x3b7)](_0x1f2a2f);}else{if(TouchInput[_0x593c14(0x3b6)]()&&this[_0x593c14(0x630)]())'uKhGV'===_0x593c14(0x1f6)?this[_0x593c14(0x40a)](_0x593c14(0x6ae)):this[_0x593c14(0x3fa)]=[];else{if(TouchInput[_0x593c14(0x559)]()){if(_0x593c14(0x7aa)!==_0x593c14(0x7aa)){_0x34cac6[_0x593c14(0x7b3)][_0x593c14(0x8ee)]['call'](this);const _0x21a56e=this[_0x593c14(0x4bb)][_0x593c14(0x20c)];if(_0x21a56e)this[_0x593c14(0x359)](_0x21a56e);}else this[_0x593c14(0x40a)](_0x593c14(0x6ae));}}}}else VisuMZ['CoreEngine'][_0x593c14(0x5b3)]['call'](this);},Window_NameInput[_0x39290f(0x24d)][_0x39290f(0x2e1)]=function(){const _0x3ce7c5=_0x39290f;if(Input[_0x3ce7c5(0x445)](_0x3ce7c5(0x3f4)))Input['clear'](),this[_0x3ce7c5(0x7b4)]();else{if(Input[_0x3ce7c5(0x862)]!==undefined){if(_0x3ce7c5(0x51b)===_0x3ce7c5(0x845)){if(_0x15bd52[_0x3ce7c5(0x565)]())return;_0x5f2250[_0x3ce7c5(0x447)](_0xe844cf,_0xcf220f);const _0x57c105=_0x3c7bf9[_0x3ce7c5(0x201)](_0x1bb7fe[_0x3ce7c5(0x61f)],_0x5267d7[_0x3ce7c5(0x54c)]),_0x24b8a4=_0x1505a8[_0x3ce7c5(0x886)](_0x549fe2[_0x3ce7c5(0x61f)],_0x1c52f9[_0x3ce7c5(0x54c)]);for(let _0x162b18=_0x57c105;_0x162b18<=_0x24b8a4;_0x162b18++){const _0x469f3b=_0x54926e[_0x3ce7c5(0x327)](_0x162b18);_0xe28812[_0x3ce7c5(0x77f)](_0x162b18,!_0x469f3b);}}else{let _0x25379c=Input[_0x3ce7c5(0x862)],_0x3c1112=_0x25379c[_0x3ce7c5(0x59c)];for(let _0x299ed8=0x0;_0x299ed8<_0x3c1112;++_0x299ed8){this[_0x3ce7c5(0x542)][_0x3ce7c5(0x357)](_0x25379c[_0x299ed8])?_0x3ce7c5(0x419)==='xEbRd'?_0x4f39e5[_0x3ce7c5(0x5c4)]&&(this[_0x3ce7c5(0x1ab)]=_0x3ce7c5(0x6dd)):SoundManager[_0x3ce7c5(0x443)]():SoundManager[_0x3ce7c5(0x1fc)]();}Input[_0x3ce7c5(0x575)]();}}}},Window_NameInput['prototype'][_0x39290f(0x40a)]=function(_0x29ebaf){const _0x55cd96=_0x39290f;let _0x1f4f99=this[_0x55cd96(0x6f4)];this[_0x55cd96(0x6f4)]=_0x29ebaf;if(_0x1f4f99!==this[_0x55cd96(0x6f4)]){if(_0x55cd96(0x59e)!=='AtoGl')return _0x378c96[_0x55cd96(0x192)]();else this[_0x55cd96(0x6fe)](),SoundManager[_0x55cd96(0x443)](),this['_mode']===_0x55cd96(0x6ae)?this['select'](0x0):_0x55cd96(0x13b)!=='DlhNS'?(this[_0x55cd96(0x41c)]=!![],this[_0x55cd96(0x6bb)](),_0x31428c['updateEffekseer'](),this[_0x55cd96(0x41c)]=![]):this['select'](-0x1);}},VisuMZ[_0x39290f(0x7b3)][_0x39290f(0x109)]=Window_NameInput[_0x39290f(0x24d)]['cursorDown'],Window_NameInput[_0x39290f(0x24d)][_0x39290f(0x4c3)]=function(_0x3dcfc3){const _0x391398=_0x39290f;if(this[_0x391398(0x6f4)]===_0x391398(0x3e2)&&!Input[_0x391398(0x4ac)]())return;if(Input['isNumpadPressed']())return;VisuMZ[_0x391398(0x7b3)][_0x391398(0x109)][_0x391398(0x592)](this,_0x3dcfc3),this[_0x391398(0x40a)]('default');},VisuMZ[_0x39290f(0x7b3)]['Window_NameInput_cursorUp']=Window_NameInput[_0x39290f(0x24d)][_0x39290f(0x588)],Window_NameInput[_0x39290f(0x24d)][_0x39290f(0x588)]=function(_0x391d10){const _0x146538=_0x39290f;if(this['_mode']==='keyboard'&&!Input[_0x146538(0x4ac)]())return;if(Input[_0x146538(0x4c4)]())return;VisuMZ[_0x146538(0x7b3)][_0x146538(0x209)]['call'](this,_0x391d10),this['switchModes']('default');},VisuMZ[_0x39290f(0x7b3)][_0x39290f(0x73c)]=Window_NameInput[_0x39290f(0x24d)][_0x39290f(0x4a5)],Window_NameInput[_0x39290f(0x24d)][_0x39290f(0x4a5)]=function(_0x314b3f){const _0x3eca08=_0x39290f;if(this[_0x3eca08(0x6f4)]==='keyboard'&&!Input[_0x3eca08(0x4ac)]())return;if(Input['isNumpadPressed']())return;VisuMZ[_0x3eca08(0x7b3)][_0x3eca08(0x73c)][_0x3eca08(0x592)](this,_0x314b3f),this[_0x3eca08(0x40a)](_0x3eca08(0x6ae));},VisuMZ[_0x39290f(0x7b3)]['Window_NameInput_cursorLeft']=Window_NameInput[_0x39290f(0x24d)]['cursorLeft'],Window_NameInput[_0x39290f(0x24d)][_0x39290f(0x6c5)]=function(_0x128e1c){const _0x44fc48=_0x39290f;if(this[_0x44fc48(0x6f4)]==='keyboard'&&!Input[_0x44fc48(0x4ac)]())return;if(Input[_0x44fc48(0x4c4)]())return;VisuMZ[_0x44fc48(0x7b3)][_0x44fc48(0x6d2)][_0x44fc48(0x592)](this,_0x128e1c),this[_0x44fc48(0x40a)](_0x44fc48(0x6ae));},VisuMZ[_0x39290f(0x7b3)][_0x39290f(0x6d5)]=Window_NameInput['prototype'][_0x39290f(0x1c2)],Window_NameInput[_0x39290f(0x24d)][_0x39290f(0x1c2)]=function(){const _0x56e8d8=_0x39290f;if(this['_mode']===_0x56e8d8(0x3e2))return;if(Input[_0x56e8d8(0x4c4)]())return;VisuMZ[_0x56e8d8(0x7b3)][_0x56e8d8(0x6d5)][_0x56e8d8(0x592)](this),this['switchModes'](_0x56e8d8(0x6ae));},VisuMZ[_0x39290f(0x7b3)][_0x39290f(0x25f)]=Window_NameInput['prototype']['cursorPageup'],Window_NameInput[_0x39290f(0x24d)]['cursorPageup']=function(){const _0x164e8a=_0x39290f;if(this['_mode']===_0x164e8a(0x3e2))return;if(Input[_0x164e8a(0x4c4)]())return;VisuMZ[_0x164e8a(0x7b3)]['Window_NameInput_cursorPageup']['call'](this),this['switchModes']('default');},VisuMZ['CoreEngine'][_0x39290f(0x46b)]=Window_NameInput[_0x39290f(0x24d)]['refresh'],Window_NameInput['prototype'][_0x39290f(0x6fe)]=function(){const _0x4929e3=_0x39290f;if(this[_0x4929e3(0x6f4)]===_0x4929e3(0x3e2)){if('civAW'!==_0x4929e3(0x18d)){this[_0x4929e3(0x328)][_0x4929e3(0x575)](),this[_0x4929e3(0x615)][_0x4929e3(0x575)](),this[_0x4929e3(0x688)]();let _0x1039c6=VisuMZ[_0x4929e3(0x7b3)][_0x4929e3(0x1ac)][_0x4929e3(0x190)]['NameInputMessage'][_0x4929e3(0x2e3)]('\x0a'),_0x374c5c=_0x1039c6[_0x4929e3(0x59c)],_0xaee13c=(this['innerHeight']-_0x374c5c*this['lineHeight']())/0x2;for(let _0x494baa=0x0;_0x494baa<_0x374c5c;++_0x494baa){if(_0x4929e3(0x35d)!==_0x4929e3(0x215)){let _0x549002=_0x1039c6[_0x494baa],_0x5dd16a=this[_0x4929e3(0x685)](_0x549002)[_0x4929e3(0x42a)],_0x4fa33c=Math[_0x4929e3(0x27c)]((this[_0x4929e3(0x328)][_0x4929e3(0x42a)]-_0x5dd16a)/0x2);this[_0x4929e3(0x3af)](_0x549002,_0x4fa33c,_0xaee13c),_0xaee13c+=this[_0x4929e3(0x732)]();}else this[_0x4929e3(0x2a4)]=0x0;}}else{if(_0x474817[_0x34ded8][_0x4929e3(0x53a)])return!![];}}else VisuMZ[_0x4929e3(0x7b3)]['Window_NameInput_refresh'][_0x4929e3(0x592)](this);};};VisuMZ['CoreEngine'][_0x39290f(0x341)]=Window_ShopSell[_0x39290f(0x24d)]['isEnabled'],Window_ShopSell['prototype'][_0x39290f(0x243)]=function(_0x49e46f){const _0x464178=_0x39290f;return VisuMZ[_0x464178(0x7b3)][_0x464178(0x1ac)][_0x464178(0x646)][_0x464178(0x113)]&&DataManager[_0x464178(0x4e0)](_0x49e46f)?![]:VisuMZ[_0x464178(0x7b3)][_0x464178(0x341)][_0x464178(0x592)](this,_0x49e46f);},Window_NumberInput[_0x39290f(0x24d)]['isUseModernControls']=function(){return![];};VisuMZ['CoreEngine']['Settings'][_0x39290f(0x190)][_0x39290f(0x1c6)]&&(VisuMZ[_0x39290f(0x7b3)]['Window_NumberInput_start']=Window_NumberInput[_0x39290f(0x24d)][_0x39290f(0x476)],Window_NumberInput[_0x39290f(0x24d)][_0x39290f(0x476)]=function(){const _0x4b3a4c=_0x39290f;VisuMZ[_0x4b3a4c(0x7b3)][_0x4b3a4c(0x7e1)][_0x4b3a4c(0x592)](this),this[_0x4b3a4c(0x77d)](this[_0x4b3a4c(0x3d9)]-0x1),Input[_0x4b3a4c(0x575)]();},VisuMZ[_0x39290f(0x7b3)][_0x39290f(0x156)]=Window_NumberInput[_0x39290f(0x24d)][_0x39290f(0x726)],Window_NumberInput[_0x39290f(0x24d)][_0x39290f(0x726)]=function(){const _0x377ac1=_0x39290f;if(!this[_0x377ac1(0x5ff)]())return;if(Input[_0x377ac1(0x4c4)]()){if('fQGyc'!==_0x377ac1(0x3b0))this['processKeyboardDigitChange']();else return _0x466161['CoreEngine']['Settings']['UI'][_0x377ac1(0x1aa)];}else{if(Input[_0x377ac1(0x445)](_0x377ac1(0x62f))){if(_0x377ac1(0x31e)!==_0x377ac1(0x46f))this[_0x377ac1(0x763)]();else for(const _0x375968 of _0x148168[_0x377ac1(0x4f8)]){[0x6c,0x198][_0x377ac1(0x6d3)](_0x375968[_0x377ac1(0x323)])&&(_0x14b427+='\x0a',_0x3bb98e+=_0x375968['parameters'][0x0]);}}else{if(Input['_inputSpecialKeyCode']===0x2e)this['processKeyboardDelete']();else{if(Input[_0x377ac1(0x611)]===0x24){if(_0x377ac1(0x8b1)!==_0x377ac1(0x8b1)){_0x30987a['CoreEngine'][_0x377ac1(0x650)][_0x377ac1(0x592)](this,_0x2df28b);if(_0x1acf85[_0x377ac1(0x7b3)][_0x377ac1(0x1ac)][_0x377ac1(0x646)]['ImprovedAccuracySystem'])return;const _0x1618d0=_0x490721['result']();_0x1618d0[_0x377ac1(0x8d2)]&&(0x1-this[_0x377ac1(0x6dc)](_0x10f667)>this[_0x377ac1(0x233)](_0x5d09c2)&&(_0x1618d0[_0x377ac1(0x8d2)]=![],_0x1618d0[_0x377ac1(0x5fe)]=!![]));}else this[_0x377ac1(0x73a)]();}else Input[_0x377ac1(0x611)]===0x23?_0x377ac1(0x28a)===_0x377ac1(0x8d0)?0x1-this[_0x377ac1(0x6dc)](_0x565451)>this[_0x377ac1(0x233)](_0x47aefb)&&(_0x3a133c[_0x377ac1(0x8d2)]=![],_0x6e3c71['evaded']=!![]):this[_0x377ac1(0x2c2)]():VisuMZ[_0x377ac1(0x7b3)][_0x377ac1(0x156)]['call'](this);}}}},Window_NumberInput[_0x39290f(0x24d)][_0x39290f(0x3b2)]=function(){const _0x5b8316=_0x39290f;if(!this[_0x5b8316(0x5ea)]())return;Input[_0x5b8316(0x4c4)]()?_0x5b8316(0x651)===_0x5b8316(0x651)?this[_0x5b8316(0x312)]():this[_0x5b8316(0x739)]()?this[_0x5b8316(0x49e)]():_0x1a3c41['CoreEngine'][_0x5b8316(0x32b)][_0x5b8316(0x592)](this):Window_Selectable[_0x5b8316(0x24d)][_0x5b8316(0x3b2)][_0x5b8316(0x592)](this);},Window_NumberInput[_0x39290f(0x24d)][_0x39290f(0x713)]=function(){},Window_NumberInput[_0x39290f(0x24d)][_0x39290f(0x312)]=function(){const _0x4cd754=_0x39290f;if(String(this[_0x4cd754(0x364)])[_0x4cd754(0x59c)]>=this[_0x4cd754(0x3d9)])return;this[_0x4cd754(0x364)]=Number(String(this[_0x4cd754(0x364)])+Input[_0x4cd754(0x862)]);const _0x55f843='9'[_0x4cd754(0x1ce)](this[_0x4cd754(0x3d9)]);this[_0x4cd754(0x364)]=this['_number'][_0x4cd754(0x2a6)](0x0,_0x55f843),Input[_0x4cd754(0x575)](),this['refresh'](),SoundManager[_0x4cd754(0x826)](),this['select'](this[_0x4cd754(0x3d9)]-0x1);},Window_NumberInput['prototype'][_0x39290f(0x763)]=function(){const _0x32c66c=_0x39290f;this[_0x32c66c(0x364)]=Number(String(this['_number'])[_0x32c66c(0x8ac)](0x0,-0x1)),this[_0x32c66c(0x364)]=Math[_0x32c66c(0x886)](0x0,this['_number']),Input['clear'](),this[_0x32c66c(0x6fe)](),SoundManager[_0x32c66c(0x826)](),this[_0x32c66c(0x77d)](this[_0x32c66c(0x3d9)]-0x1);},Window_NumberInput[_0x39290f(0x24d)][_0x39290f(0x7f7)]=function(){const _0xd2bfc8=_0x39290f;this['_number']=Number(String(this['_number'])[_0xd2bfc8(0x2a5)](0x1)),this['_number']=Math[_0xd2bfc8(0x886)](0x0,this['_number']),Input[_0xd2bfc8(0x575)](),this[_0xd2bfc8(0x6fe)](),SoundManager['playCursor'](),this[_0xd2bfc8(0x77d)](this['_maxDigits']-0x1);});;Window_TitleCommand[_0x39290f(0x308)]=VisuMZ['CoreEngine'][_0x39290f(0x1ac)][_0x39290f(0x7e4)],Window_TitleCommand['prototype']['makeCommandList']=function(){const _0x17407a=_0x39290f;this[_0x17407a(0x5c3)]();},Window_TitleCommand['prototype']['makeCoreEngineCommandList']=function(){const _0x5577a3=_0x39290f;for(const _0x1adfbc of Window_TitleCommand[_0x5577a3(0x308)]){if(_0x5577a3(0x5e9)===_0x5577a3(0x5e9)){if(_0x1adfbc[_0x5577a3(0x642)][_0x5577a3(0x592)](this)){if(_0x5577a3(0x4c2)!==_0x5577a3(0x1f1)){const _0x974edf=_0x1adfbc[_0x5577a3(0x1b2)];let _0x2f46c4=_0x1adfbc[_0x5577a3(0x258)];if(['',_0x5577a3(0x54b)][_0x5577a3(0x6d3)](_0x2f46c4))_0x2f46c4=_0x1adfbc[_0x5577a3(0x277)]['call'](this);const _0x38b1ef=_0x1adfbc['EnableJS'][_0x5577a3(0x592)](this),_0x3019e6=_0x1adfbc[_0x5577a3(0x4ba)][_0x5577a3(0x592)](this);this[_0x5577a3(0x21b)](_0x2f46c4,_0x974edf,_0x38b1ef,_0x3019e6),this[_0x5577a3(0x2fd)](_0x974edf,_0x1adfbc[_0x5577a3(0x4d1)]['bind'](this,_0x3019e6));}else this[_0x5577a3(0x1ab)]='ETB';}}else{const _0x5cc5ca=_0xd2a96a[_0x100cf2[_0x5577a3(0x1e4)][0x0]];if(_0x5cc5ca&&this[_0x5577a3(0x471)]<=0xa){this['_commonEventLayers']++;let _0x35d3bb=_0x4bfe43[_0x5577a3(0x7b3)][_0x5577a3(0x5bc)](_0x5cc5ca[_0x5577a3(0x4f8)]);_0x35d3bb[_0x5577a3(0x59c)]>0x0&&(_0x12dc05+=_0x4b5131,_0x56f0d7+=_0x661f4f,_0x3bf504+=_0x5577a3(0x498)[_0x5577a3(0x8ca)](_0x5cc5ca['id'],_0x5cc5ca[_0x5577a3(0x8e0)]),_0x40e71a+=_0x402d43,_0x2ae0fa+=_0x35d3bb,_0x8891bf+=_0x201c21,_0x727620+=_0x5577a3(0x8bd)['format'](_0x5cc5ca['id'],_0x5cc5ca[_0x5577a3(0x8e0)]),_0x533b2b+=_0x14631d),this[_0x5577a3(0x471)]--;}}}},Window_GameEnd[_0x39290f(0x308)]=VisuMZ['CoreEngine'][_0x39290f(0x1ac)][_0x39290f(0x79c)][_0x39290f(0x31b)]['CommandList'],Window_GameEnd[_0x39290f(0x24d)][_0x39290f(0x278)]=function(){const _0x3cb268=_0x39290f;this[_0x3cb268(0x5c3)]();},Window_GameEnd[_0x39290f(0x24d)][_0x39290f(0x5c3)]=function(){const _0x594e3a=_0x39290f;for(const _0x365d87 of Window_GameEnd[_0x594e3a(0x308)]){if(_0x594e3a(0x78d)===_0x594e3a(0x78d)){if(_0x365d87[_0x594e3a(0x642)][_0x594e3a(0x592)](this)){if(_0x594e3a(0x541)!==_0x594e3a(0x541))this[_0x594e3a(0x218)](_0x53adad[_0x594e3a(0x7b3)][_0x594e3a(0x1ac)][_0x594e3a(0x320)][_0x594e3a(0x3ab)],_0x320c31,_0x5d0c61,_0x4a664c,_0x594e3a(0x183));else{const _0x3ea9e0=_0x365d87['Symbol'];let _0xb4f22b=_0x365d87[_0x594e3a(0x258)];if(['','Untitled']['includes'](_0xb4f22b))_0xb4f22b=_0x365d87[_0x594e3a(0x277)][_0x594e3a(0x592)](this);const _0x13cac2=_0x365d87[_0x594e3a(0x690)][_0x594e3a(0x592)](this),_0x5e1d3a=_0x365d87[_0x594e3a(0x4ba)][_0x594e3a(0x592)](this);this[_0x594e3a(0x21b)](_0xb4f22b,_0x3ea9e0,_0x13cac2,_0x5e1d3a),this[_0x594e3a(0x2fd)](_0x3ea9e0,_0x365d87[_0x594e3a(0x4d1)][_0x594e3a(0x1df)](this,_0x5e1d3a));}}}else this[_0x594e3a(0x4a1)]=![];}};function Window_ButtonAssist(){const _0x403a8b=_0x39290f;this[_0x403a8b(0x796)](...arguments);}Window_ButtonAssist[_0x39290f(0x24d)]=Object[_0x39290f(0x749)](Window_Base['prototype']),Window_ButtonAssist[_0x39290f(0x24d)][_0x39290f(0x76b)]=Window_ButtonAssist,Window_ButtonAssist['prototype'][_0x39290f(0x796)]=function(_0x3b3b85){const _0x365272=_0x39290f;this['_data']={},Window_Base['prototype'][_0x365272(0x796)][_0x365272(0x592)](this,_0x3b3b85),this[_0x365272(0x537)](VisuMZ[_0x365272(0x7b3)]['Settings'][_0x365272(0x8bf)][_0x365272(0x34e)]||0x0),this[_0x365272(0x6fe)]();},Window_ButtonAssist[_0x39290f(0x24d)]['makeFontBigger']=function(){const _0x28f60e=_0x39290f;this[_0x28f60e(0x328)][_0x28f60e(0x8b7)]<=0x60&&(this[_0x28f60e(0x328)][_0x28f60e(0x8b7)]+=0x6);},Window_ButtonAssist[_0x39290f(0x24d)][_0x39290f(0x489)]=function(){const _0x507def=_0x39290f;if(this[_0x507def(0x328)][_0x507def(0x8b7)]>=0x18){if(_0x507def(0x17e)===_0x507def(0x17e))this[_0x507def(0x328)][_0x507def(0x8b7)]-=0x6;else return _0x129ac2[_0x507def(0x7b3)][_0x507def(0x623)][_0x507def(0x592)](this)[_0x507def(0x2a6)](0x0,0x1);}},Window_ButtonAssist['prototype'][_0x39290f(0x6bb)]=function(){const _0x2f1737=_0x39290f;Window_Base[_0x2f1737(0x24d)][_0x2f1737(0x6bb)][_0x2f1737(0x592)](this),this['updateKeyText']();},Window_ButtonAssist[_0x39290f(0x24d)][_0x39290f(0x495)]=function(){const _0x55b764=_0x39290f;this[_0x55b764(0x2a4)]=SceneManager[_0x55b764(0x4eb)]['getButtonAssistLocation']()!==_0x55b764(0x861)?0x0:0x8;},Window_ButtonAssist[_0x39290f(0x24d)][_0x39290f(0x19d)]=function(){const _0x954fea=_0x39290f,_0x36fa39=SceneManager['_scene'];for(let _0x41c49a=0x1;_0x41c49a<=0x5;_0x41c49a++){if(this[_0x954fea(0x5e7)]['key%1'['format'](_0x41c49a)]!==_0x36fa39[_0x954fea(0x260)[_0x954fea(0x8ca)](_0x41c49a)]())return this[_0x954fea(0x6fe)]();if(this[_0x954fea(0x5e7)][_0x954fea(0x80f)[_0x954fea(0x8ca)](_0x41c49a)]!==_0x36fa39['buttonAssistText%1'[_0x954fea(0x8ca)](_0x41c49a)]())return this[_0x954fea(0x6fe)]();}},Window_ButtonAssist[_0x39290f(0x24d)]['refresh']=function(){const _0x84fd37=_0x39290f;this[_0x84fd37(0x328)][_0x84fd37(0x575)]();for(let _0x107422=0x1;_0x107422<=0x5;_0x107422++){this['drawSegment'](_0x107422);}},Window_ButtonAssist[_0x39290f(0x24d)][_0x39290f(0x654)]=function(_0x186404){const _0x2d1ba7=_0x39290f,_0x27ffae=this[_0x2d1ba7(0x3bd)]/0x5,_0x362d11=SceneManager[_0x2d1ba7(0x4eb)],_0x409285=_0x362d11[_0x2d1ba7(0x260)[_0x2d1ba7(0x8ca)](_0x186404)](),_0x16260e=_0x362d11[_0x2d1ba7(0x8ad)[_0x2d1ba7(0x8ca)](_0x186404)]();this['_data'][_0x2d1ba7(0x25b)[_0x2d1ba7(0x8ca)](_0x186404)]=_0x409285,this[_0x2d1ba7(0x5e7)][_0x2d1ba7(0x80f)[_0x2d1ba7(0x8ca)](_0x186404)]=_0x16260e;if(_0x409285==='')return;if(_0x16260e==='')return;const _0x2018b5=_0x362d11['buttonAssistOffset%1'['format'](_0x186404)](),_0x348543=this['itemPadding'](),_0x1a5ad4=_0x27ffae*(_0x186404-0x1)+_0x348543+_0x2018b5,_0x297888=VisuMZ[_0x2d1ba7(0x7b3)][_0x2d1ba7(0x1ac)][_0x2d1ba7(0x8bf)][_0x2d1ba7(0x491)];this[_0x2d1ba7(0x3af)](_0x297888[_0x2d1ba7(0x8ca)](_0x409285,_0x16260e),_0x1a5ad4,0x0,_0x27ffae-_0x348543*0x2);},VisuMZ['CoreEngine']['Game_Interpreter_updateWaitMode']=Game_Interpreter[_0x39290f(0x24d)][_0x39290f(0x1f9)],Game_Interpreter[_0x39290f(0x24d)][_0x39290f(0x1f9)]=function(){const _0x4d7d69=_0x39290f;if($gameTemp['_pictureCoordinatesMode']!==undefined){if(_0x4d7d69(0x53d)===_0x4d7d69(0x53d))return VisuMZ[_0x4d7d69(0x7b3)][_0x4d7d69(0x89e)]();else this[_0x4d7d69(0x186)]();}return VisuMZ[_0x4d7d69(0x7b3)][_0x4d7d69(0x71d)][_0x4d7d69(0x592)](this);},VisuMZ[_0x39290f(0x7b3)][_0x39290f(0x89e)]=function(){const _0x5ea7e7=_0x39290f,_0x3dd542=$gameTemp[_0x5ea7e7(0x8ec)]||0x0;(_0x3dd542<0x0||_0x3dd542>0x64||TouchInput['isCancelled']()||Input[_0x5ea7e7(0x3b6)](_0x5ea7e7(0x16e)))&&($gameTemp[_0x5ea7e7(0x8ec)]=undefined,Input[_0x5ea7e7(0x575)](),TouchInput[_0x5ea7e7(0x575)]());const _0x1ee17e=$gameScreen['picture'](_0x3dd542);if(_0x1ee17e){if(_0x5ea7e7(0x84d)==='ASbBp')return 0x0;else _0x1ee17e['_x']=TouchInput['_x'],_0x1ee17e['_y']=TouchInput['_y'];}return VisuMZ['CoreEngine']['updatePictureCoordinates'](),$gameTemp[_0x5ea7e7(0x8ec)]!==undefined;},VisuMZ['CoreEngine']['updatePictureCoordinates']=function(){const _0x13e293=_0x39290f,_0x5ec952=SceneManager[_0x13e293(0x4eb)];if(!_0x5ec952)return;!_0x5ec952[_0x13e293(0x2f8)]&&(SoundManager[_0x13e293(0x33e)](),_0x5ec952[_0x13e293(0x2f8)]=new Window_PictureCoordinates(),_0x5ec952[_0x13e293(0x359)](_0x5ec952[_0x13e293(0x2f8)])),$gameTemp[_0x13e293(0x8ec)]===undefined&&(SoundManager[_0x13e293(0x536)](),_0x5ec952[_0x13e293(0x8cd)](_0x5ec952[_0x13e293(0x2f8)]),_0x5ec952[_0x13e293(0x2f8)]=undefined);};function Window_PictureCoordinates(){const _0x8041aa=_0x39290f;this[_0x8041aa(0x796)](...arguments);}Window_PictureCoordinates[_0x39290f(0x24d)]=Object[_0x39290f(0x749)](Window_Base[_0x39290f(0x24d)]),Window_PictureCoordinates['prototype'][_0x39290f(0x76b)]=Window_PictureCoordinates,Window_PictureCoordinates['prototype'][_0x39290f(0x796)]=function(){const _0x11211e=_0x39290f;this['_lastOrigin']='nah',this[_0x11211e(0x11a)]=_0x11211e(0x36f),this[_0x11211e(0x396)]='nah';const _0x8ac6a0=this[_0x11211e(0x86a)]();Window_Base[_0x11211e(0x24d)][_0x11211e(0x796)][_0x11211e(0x592)](this,_0x8ac6a0),this[_0x11211e(0x537)](0x2);},Window_PictureCoordinates['prototype'][_0x39290f(0x86a)]=function(){const _0x24bdb6=_0x39290f;let _0x53f428=0x0,_0x4c2cb1=Graphics[_0x24bdb6(0x431)]-this[_0x24bdb6(0x732)](),_0x2b5ea6=Graphics['width'],_0x25d783=this[_0x24bdb6(0x732)]();return new Rectangle(_0x53f428,_0x4c2cb1,_0x2b5ea6,_0x25d783);},Window_PictureCoordinates['prototype'][_0x39290f(0x495)]=function(){const _0x5ec6ff=_0x39290f;this[_0x5ec6ff(0x2a4)]=0x0;},Window_PictureCoordinates['prototype'][_0x39290f(0x6bb)]=function(){const _0x4f06ab=_0x39290f;Window_Base[_0x4f06ab(0x24d)]['update'][_0x4f06ab(0x592)](this),this[_0x4f06ab(0x7a1)]();},Window_PictureCoordinates[_0x39290f(0x24d)]['updateData']=function(){if(!this['needsUpdate']())return;this['refresh']();},Window_PictureCoordinates[_0x39290f(0x24d)]['needsUpdate']=function(){const _0x5f211a=_0x39290f,_0xfa1294=$gameTemp[_0x5f211a(0x8ec)],_0x1b415f=$gameScreen[_0x5f211a(0x2d8)](_0xfa1294);return _0x1b415f?_0x5f211a(0x3e3)!==_0x5f211a(0x66c)?this[_0x5f211a(0x69d)]!==_0x1b415f[_0x5f211a(0x266)]||this[_0x5f211a(0x11a)]!==_0x1b415f['_x']||this[_0x5f211a(0x396)]!==_0x1b415f['_y']:this:_0x5f211a(0x6c2)!=='baqgD'?![]:_0x7a5b18[_0x5f211a(0x483)](_0x5f211a(0x596));},Window_PictureCoordinates['prototype']['refresh']=function(){const _0x43ecb7=_0x39290f;this['contents']['clear']();const _0x5a69f7=$gameTemp[_0x43ecb7(0x8ec)],_0x57d554=$gameScreen[_0x43ecb7(0x2d8)](_0x5a69f7);if(!_0x57d554)return;this[_0x43ecb7(0x69d)]=_0x57d554[_0x43ecb7(0x266)],this['_lastX']=_0x57d554['_x'],this[_0x43ecb7(0x396)]=_0x57d554['_y'];const _0x49ec67=ColorManager[_0x43ecb7(0x70e)]();this[_0x43ecb7(0x328)]['fillRect'](0x0,0x0,this['innerWidth'],this[_0x43ecb7(0x87c)],_0x49ec67);const _0x45884e='\x20Origin:\x20%1'[_0x43ecb7(0x8ca)](_0x57d554['_origin']===0x0?_0x43ecb7(0x4db):_0x43ecb7(0x7b7)),_0x48fa65=_0x43ecb7(0x890)[_0x43ecb7(0x8ca)](_0x57d554['_x']),_0x5aeafb=_0x43ecb7(0x66b)[_0x43ecb7(0x8ca)](_0x57d554['_y']),_0x39ce4a='%1:\x20Exit\x20'[_0x43ecb7(0x8ca)](TextManager['getInputButtonString'](_0x43ecb7(0x16e)));let _0x50b45a=Math[_0x43ecb7(0x27c)](this[_0x43ecb7(0x3bd)]/0x4);this[_0x43ecb7(0x218)](_0x45884e,_0x50b45a*0x0,0x0,_0x50b45a),this[_0x43ecb7(0x218)](_0x48fa65,_0x50b45a*0x1,0x0,_0x50b45a,_0x43ecb7(0x547)),this[_0x43ecb7(0x218)](_0x5aeafb,_0x50b45a*0x2,0x0,_0x50b45a,_0x43ecb7(0x547));const _0x426688=this[_0x43ecb7(0x685)](_0x39ce4a)[_0x43ecb7(0x42a)],_0x7ab244=this['innerWidth']-_0x426688;this[_0x43ecb7(0x3af)](_0x39ce4a,_0x7ab244,0x0,_0x426688);},VisuMZ[_0x39290f(0x16c)]=function(_0x30b0b2){const _0x257f59=_0x39290f;if(Utils[_0x257f59(0x1c7)](_0x257f59(0x451))){if('tiiuM'===_0x257f59(0x225)){var _0x40b828=require(_0x257f59(0x86c))[_0x257f59(0x5dd)][_0x257f59(0x865)]();SceneManager[_0x257f59(0x39e)]();if(_0x30b0b2)setTimeout(_0x40b828[_0x257f59(0x6ef)]['bind'](_0x40b828),0x190);}else this[_0x257f59(0x8db)][_0x257f59(0x537)](_0x5e5c2c[_0x257f59(0x302)]['HelpBgType']);}},VisuMZ['ApplyEasing']=function(_0x59a1fa,_0x5db289){const _0x5261f4=_0x39290f;_0x5db289=_0x5db289[_0x5261f4(0x6ce)]();var _0x4f5074=1.70158,_0x69a0bc=0.7;switch(_0x5db289){case _0x5261f4(0x675):return _0x59a1fa;case _0x5261f4(0x315):return-0x1*Math[_0x5261f4(0x692)](_0x59a1fa*(Math['PI']/0x2))+0x1;case'OUTSINE':return Math['sin'](_0x59a1fa*(Math['PI']/0x2));case _0x5261f4(0x382):return-0.5*(Math[_0x5261f4(0x692)](Math['PI']*_0x59a1fa)-0x1);case _0x5261f4(0x36c):return _0x59a1fa*_0x59a1fa;case _0x5261f4(0x39c):return _0x59a1fa*(0x2-_0x59a1fa);case _0x5261f4(0x48d):return _0x59a1fa<0.5?0x2*_0x59a1fa*_0x59a1fa:-0x1+(0x4-0x2*_0x59a1fa)*_0x59a1fa;case _0x5261f4(0x632):return _0x59a1fa*_0x59a1fa*_0x59a1fa;case _0x5261f4(0x634):var _0x54c134=_0x59a1fa-0x1;return _0x54c134*_0x54c134*_0x54c134+0x1;case'INOUTCUBIC':return _0x59a1fa<0.5?0x4*_0x59a1fa*_0x59a1fa*_0x59a1fa:(_0x59a1fa-0x1)*(0x2*_0x59a1fa-0x2)*(0x2*_0x59a1fa-0x2)+0x1;case _0x5261f4(0x5f0):return _0x59a1fa*_0x59a1fa*_0x59a1fa*_0x59a1fa;case'OUTQUART':var _0x54c134=_0x59a1fa-0x1;return 0x1-_0x54c134*_0x54c134*_0x54c134*_0x54c134;case'INOUTQUART':var _0x54c134=_0x59a1fa-0x1;return _0x59a1fa<0.5?0x8*_0x59a1fa*_0x59a1fa*_0x59a1fa*_0x59a1fa:0x1-0x8*_0x54c134*_0x54c134*_0x54c134*_0x54c134;case _0x5261f4(0x8c9):return _0x59a1fa*_0x59a1fa*_0x59a1fa*_0x59a1fa*_0x59a1fa;case _0x5261f4(0x248):var _0x54c134=_0x59a1fa-0x1;return 0x1+_0x54c134*_0x54c134*_0x54c134*_0x54c134*_0x54c134;case _0x5261f4(0x397):var _0x54c134=_0x59a1fa-0x1;return _0x59a1fa<0.5?0x10*_0x59a1fa*_0x59a1fa*_0x59a1fa*_0x59a1fa*_0x59a1fa:0x1+0x10*_0x54c134*_0x54c134*_0x54c134*_0x54c134*_0x54c134;case _0x5261f4(0x3d8):if(_0x59a1fa===0x0)return 0x0;return Math[_0x5261f4(0x8da)](0x2,0xa*(_0x59a1fa-0x1));case _0x5261f4(0x1f2):if(_0x59a1fa===0x1)return 0x1;return-Math[_0x5261f4(0x8da)](0x2,-0xa*_0x59a1fa)+0x1;case _0x5261f4(0x3cd):if(_0x59a1fa===0x0||_0x59a1fa===0x1)return'icyyi'===_0x5261f4(0x11f)?_0x59a1fa:(_0x39b7b7[_0x5261f4(0x355)](),_0x4e77a0[_0x5261f4(0x405)](),this['onEscapeSuccess'](),!![]);var _0x3bbed4=_0x59a1fa*0x2,_0x227cd1=_0x3bbed4-0x1;if(_0x3bbed4<0x1)return 0.5*Math[_0x5261f4(0x8da)](0x2,0xa*_0x227cd1);return 0.5*(-Math['pow'](0x2,-0xa*_0x227cd1)+0x2);case _0x5261f4(0x480):var _0x3bbed4=_0x59a1fa/0x1;return-0x1*(Math[_0x5261f4(0x10b)](0x1-_0x3bbed4*_0x59a1fa)-0x1);case'OUTCIRC':var _0x54c134=_0x59a1fa-0x1;return Math[_0x5261f4(0x10b)](0x1-_0x54c134*_0x54c134);case _0x5261f4(0x68e):var _0x3bbed4=_0x59a1fa*0x2,_0x227cd1=_0x3bbed4-0x2;if(_0x3bbed4<0x1)return-0.5*(Math[_0x5261f4(0x10b)](0x1-_0x3bbed4*_0x3bbed4)-0x1);return 0.5*(Math[_0x5261f4(0x10b)](0x1-_0x227cd1*_0x227cd1)+0x1);case _0x5261f4(0x697):return _0x59a1fa*_0x59a1fa*((_0x4f5074+0x1)*_0x59a1fa-_0x4f5074);case _0x5261f4(0x149):var _0x3bbed4=_0x59a1fa/0x1-0x1;return _0x3bbed4*_0x3bbed4*((_0x4f5074+0x1)*_0x3bbed4+_0x4f5074)+0x1;break;case _0x5261f4(0x827):var _0x3bbed4=_0x59a1fa*0x2,_0x436cf2=_0x3bbed4-0x2,_0x1852b3=_0x4f5074*1.525;if(_0x3bbed4<0x1)return 0.5*_0x3bbed4*_0x3bbed4*((_0x1852b3+0x1)*_0x3bbed4-_0x1852b3);return 0.5*(_0x436cf2*_0x436cf2*((_0x1852b3+0x1)*_0x436cf2+_0x1852b3)+0x2);case'INELASTIC':if(_0x59a1fa===0x0||_0x59a1fa===0x1)return _0x59a1fa;var _0x3bbed4=_0x59a1fa/0x1,_0x227cd1=_0x3bbed4-0x1,_0x274ba1=0x1-_0x69a0bc,_0x1852b3=_0x274ba1/(0x2*Math['PI'])*Math[_0x5261f4(0x333)](0x1);return-(Math['pow'](0x2,0xa*_0x227cd1)*Math['sin']((_0x227cd1-_0x1852b3)*(0x2*Math['PI'])/_0x274ba1));case _0x5261f4(0x134):var _0x274ba1=0x1-_0x69a0bc,_0x3bbed4=_0x59a1fa*0x2;if(_0x59a1fa===0x0||_0x59a1fa===0x1)return _0x59a1fa;var _0x1852b3=_0x274ba1/(0x2*Math['PI'])*Math[_0x5261f4(0x333)](0x1);return Math[_0x5261f4(0x8da)](0x2,-0xa*_0x3bbed4)*Math[_0x5261f4(0x7d2)]((_0x3bbed4-_0x1852b3)*(0x2*Math['PI'])/_0x274ba1)+0x1;case'INOUTELASTIC':var _0x274ba1=0x1-_0x69a0bc;if(_0x59a1fa===0x0||_0x59a1fa===0x1){if(_0x5261f4(0x89a)!==_0x5261f4(0x89a))_0x4e906e[_0x5261f4(0x7b3)][_0x5261f4(0x1ac)][_0x5261f4(0x646)][_0x5261f4(0x20d)]?this[_0x5261f4(0x3e9)](_0x5128b9,_0x2e519c,_0xadb62e,_0x2a3eb):_0x10cacf[_0x5261f4(0x7b3)][_0x5261f4(0x4e9)]['call'](this,_0x1ff9d4,_0x1cf51a,_0x4cce19,_0x178eb0);else return _0x59a1fa;}var _0x3bbed4=_0x59a1fa*0x2,_0x227cd1=_0x3bbed4-0x1,_0x1852b3=_0x274ba1/(0x2*Math['PI'])*Math[_0x5261f4(0x333)](0x1);if(_0x3bbed4<0x1){if(_0x5261f4(0x786)!==_0x5261f4(0x740))return-0.5*(Math[_0x5261f4(0x8da)](0x2,0xa*_0x227cd1)*Math[_0x5261f4(0x7d2)]((_0x227cd1-_0x1852b3)*(0x2*Math['PI'])/_0x274ba1));else _0x4e6df7=_0x3545c6[_0x5261f4(0x74a)](_0x233fc5),_0x391076['se']&&(_0x1c5fdc['se']['volume']=0x0);}return Math[_0x5261f4(0x8da)](0x2,-0xa*_0x227cd1)*Math[_0x5261f4(0x7d2)]((_0x227cd1-_0x1852b3)*(0x2*Math['PI'])/_0x274ba1)*0.5+0x1;case'OUTBOUNCE':var _0x3bbed4=_0x59a1fa/0x1;if(_0x3bbed4<0x1/2.75)return 7.5625*_0x3bbed4*_0x3bbed4;else{if(_0x3bbed4<0x2/2.75){var _0x436cf2=_0x3bbed4-1.5/2.75;return 7.5625*_0x436cf2*_0x436cf2+0.75;}else{if(_0x3bbed4<2.5/2.75){if(_0x5261f4(0x74f)==='JXWge')return![];else{var _0x436cf2=_0x3bbed4-2.25/2.75;return 7.5625*_0x436cf2*_0x436cf2+0.9375;}}else{if(_0x5261f4(0x803)!==_0x5261f4(0x37a)){var _0x436cf2=_0x3bbed4-2.625/2.75;return 7.5625*_0x436cf2*_0x436cf2+0.984375;}else return _0x5421d0[_0x5261f4(0x7b3)][_0x5261f4(0x153)][_0x5261f4(0x592)](this,_0x19a233);}}}case'INBOUNCE':var _0xfb941b=0x1-VisuMZ[_0x5261f4(0x426)](0x1-_0x59a1fa,_0x5261f4(0x3fc));return _0xfb941b;case _0x5261f4(0x106):if(_0x59a1fa<0.5)var _0xfb941b=VisuMZ['ApplyEasing'](_0x59a1fa*0x2,_0x5261f4(0x416))*0.5;else var _0xfb941b=VisuMZ[_0x5261f4(0x426)](_0x59a1fa*0x2-0x1,_0x5261f4(0x3fc))*0.5+0.5;return _0xfb941b;default:return _0x59a1fa;}},VisuMZ[_0x39290f(0x4ca)]=function(_0x151a47){const _0x5a18f3=_0x39290f;_0x151a47=String(_0x151a47)[_0x5a18f3(0x6ce)]();const _0xa3012c=VisuMZ[_0x5a18f3(0x7b3)]['Settings']['Param'];if(_0x151a47===_0x5a18f3(0x48c))return _0xa3012c[_0x5a18f3(0x4da)];if(_0x151a47===_0x5a18f3(0x1b0))return _0xa3012c['IconParam1'];if(_0x151a47===_0x5a18f3(0x535))return _0xa3012c[_0x5a18f3(0x4c7)];if(_0x151a47===_0x5a18f3(0x891))return _0xa3012c[_0x5a18f3(0x729)];if(_0x151a47===_0x5a18f3(0x28c))return _0xa3012c['IconParam4'];if(_0x151a47===_0x5a18f3(0x7c2))return _0xa3012c[_0x5a18f3(0x5e8)];if(_0x151a47===_0x5a18f3(0x695))return _0xa3012c[_0x5a18f3(0x40d)];if(_0x151a47===_0x5a18f3(0x3c5))return _0xa3012c['IconParam7'];if(_0x151a47===_0x5a18f3(0x1d3))return _0xa3012c[_0x5a18f3(0x869)];if(_0x151a47===_0x5a18f3(0x44a))return _0xa3012c[_0x5a18f3(0x4e4)];if(_0x151a47===_0x5a18f3(0x37e))return _0xa3012c['IconXParam2'];if(_0x151a47===_0x5a18f3(0x128))return _0xa3012c[_0x5a18f3(0x7c4)];if(_0x151a47===_0x5a18f3(0x7d6))return _0xa3012c[_0x5a18f3(0x2e4)];if(_0x151a47===_0x5a18f3(0x3e8))return _0xa3012c['IconXParam5'];if(_0x151a47==='CNT')return _0xa3012c[_0x5a18f3(0x1f4)];if(_0x151a47==='HRG')return _0xa3012c['IconXParam7'];if(_0x151a47===_0x5a18f3(0x73f))return _0xa3012c[_0x5a18f3(0x83c)];if(_0x151a47===_0x5a18f3(0x22e))return _0xa3012c['IconXParam9'];if(_0x151a47===_0x5a18f3(0x4d9))return _0xa3012c[_0x5a18f3(0x3e7)];if(_0x151a47==='GRD')return _0xa3012c[_0x5a18f3(0x257)];if(_0x151a47===_0x5a18f3(0x7b0))return _0xa3012c['IconSParam2'];if(_0x151a47===_0x5a18f3(0x367))return _0xa3012c[_0x5a18f3(0x58c)];if(_0x151a47===_0x5a18f3(0x159))return _0xa3012c[_0x5a18f3(0x829)];if(_0x151a47===_0x5a18f3(0x884))return _0xa3012c[_0x5a18f3(0x660)];if(_0x151a47===_0x5a18f3(0x808))return _0xa3012c[_0x5a18f3(0x1d1)];if(_0x151a47===_0x5a18f3(0x5e1))return _0xa3012c['IconSParam7'];if(_0x151a47===_0x5a18f3(0x67f))return _0xa3012c[_0x5a18f3(0x444)];if(_0x151a47===_0x5a18f3(0x809))return _0xa3012c[_0x5a18f3(0x756)];if(VisuMZ[_0x5a18f3(0x7b3)][_0x5a18f3(0x55d)][_0x151a47])return VisuMZ[_0x5a18f3(0x7b3)][_0x5a18f3(0x55d)][_0x151a47]||0x0;return 0x0;},VisuMZ[_0x39290f(0x3ed)]=function(_0x51fc5f,_0x11e2bc,_0x3ca7f0){const _0x2905c3=_0x39290f;if(_0x3ca7f0===undefined&&_0x51fc5f%0x1===0x0)return _0x51fc5f;if(_0x3ca7f0!==undefined&&['MAXHP',_0x2905c3(0x1b0),'ATK',_0x2905c3(0x891),_0x2905c3(0x28c),_0x2905c3(0x7c2),_0x2905c3(0x695),_0x2905c3(0x3c5)][_0x2905c3(0x6d3)](String(_0x3ca7f0)[_0x2905c3(0x6ce)]()[_0x2905c3(0x4fb)]()))return _0x51fc5f;_0x11e2bc=_0x11e2bc||0x0;if(VisuMZ['CoreEngine'][_0x2905c3(0x1ad)][_0x3ca7f0]){if(_0x2905c3(0x6da)===_0x2905c3(0x3f8)){if(_0x34bc50['inBattle']())return;_0x72ce6c[_0x2905c3(0x447)](_0x2d21f8,_0x21d136);const _0x20a58a=['bgm',_0x2905c3(0x12c),'me','se'];for(const _0x4e0c40 of _0x20a58a){const _0x29e760=_0xb09682[_0x4e0c40],_0x2605d3=_0x2905c3(0x42b)[_0x2905c3(0x8ca)](_0x4e0c40);for(const _0x21d846 of _0x29e760){_0x263e64['createBuffer'](_0x2605d3,_0x21d846);}}}else{if(VisuMZ['CoreEngine'][_0x2905c3(0x731)][_0x3ca7f0]===_0x2905c3(0x2d3)){if(_0x2905c3(0x32c)!=='EytJS'){const _0x2be0aa=_0x12e702[_0x2905c3(0x7b3)][_0x2905c3(0x1ac)][_0x2905c3(0x3da)];for(const _0x7855b9 of _0x2be0aa){const _0x51728e=_0x7855b9['FunctionName'][_0x2905c3(0x41d)](/[ ]/g,''),_0x162bfd=_0x7855b9['CodeJS'];_0x2b88e3[_0x2905c3(0x7b3)][_0x2905c3(0x6ba)](_0x51728e,_0x162bfd);}}else return _0x51fc5f;}else{if(_0x2905c3(0x7b9)==='YGtih')_0x511779[_0x2905c3(0x7e5)]=_0x233153['SCALE_MODES']['NEAREST'];else return String((_0x51fc5f*0x64)[_0x2905c3(0x7de)](_0x11e2bc))+'%';}}}return String((_0x51fc5f*0x64)['toFixed'](_0x11e2bc))+'%';},VisuMZ[_0x39290f(0x8de)]=function(_0x38eff1){const _0x7e8a3b=_0x39290f;_0x38eff1=String(_0x38eff1);if(!_0x38eff1)return _0x38eff1;if(typeof _0x38eff1!=='string')return _0x38eff1;const _0x12179c=VisuMZ[_0x7e8a3b(0x7b3)][_0x7e8a3b(0x1ac)]['QoL'][_0x7e8a3b(0x7f8)]||_0x7e8a3b(0x599),_0x14a5f3={'maximumFractionDigits':0x6};_0x38eff1=_0x38eff1[_0x7e8a3b(0x41d)](/\[(.*?)\]/g,(_0x159429,_0x308462)=>{const _0x512046=_0x7e8a3b;return VisuMZ[_0x512046(0x7c0)](_0x308462,'[',']');}),_0x38eff1=_0x38eff1[_0x7e8a3b(0x41d)](/<(.*?)>/g,(_0x341c48,_0x111793)=>{const _0x19e382=_0x7e8a3b;return VisuMZ[_0x19e382(0x7c0)](_0x111793,'<','>');}),_0x38eff1=_0x38eff1[_0x7e8a3b(0x41d)](/\{\{(.*?)\}\}/g,(_0x26076e,_0x376c83)=>{const _0x1c0b19=_0x7e8a3b;return VisuMZ[_0x1c0b19(0x7c0)](_0x376c83,'','');}),_0x38eff1=_0x38eff1[_0x7e8a3b(0x41d)](/(\d+\.?\d*)/g,(_0x121e8c,_0x1c32fa)=>{const _0x2e3d10=_0x7e8a3b;if(_0x2e3d10(0x31f)!==_0x2e3d10(0x6a7)){let _0xeb8a46=_0x1c32fa;if(_0xeb8a46[0x0]==='0')return _0xeb8a46;if(_0xeb8a46[_0xeb8a46[_0x2e3d10(0x59c)]-0x1]==='.'){if(_0x2e3d10(0x780)===_0x2e3d10(0x5c0))this['makeCoreEngineCommandList']();else return Number(_0xeb8a46)[_0x2e3d10(0x783)](_0x12179c,_0x14a5f3)+'.';}else return _0xeb8a46[_0xeb8a46[_0x2e3d10(0x59c)]-0x1]===','?Number(_0xeb8a46)[_0x2e3d10(0x783)](_0x12179c,_0x14a5f3)+',':Number(_0xeb8a46)[_0x2e3d10(0x783)](_0x12179c,_0x14a5f3);}else this[_0x2e3d10(0x8db)][_0x2e3d10(0x537)](_0x1e77d9['layoutSettings'][_0x2e3d10(0x84f)]);});let _0x598c1f=0x3;while(_0x598c1f--){_0x7e8a3b(0x17b)===_0x7e8a3b(0x7bf)?(this[_0x7e8a3b(0x542)]&&this[_0x7e8a3b(0x542)]['setBackgroundType'](_0x25e159[_0x7e8a3b(0x302)][_0x7e8a3b(0x123)]),this['_inputWindow']&&this[_0x7e8a3b(0x10d)]['setBackgroundType'](_0x22fa41['layoutSettings']['InputBgType'])):_0x38eff1=VisuMZ[_0x7e8a3b(0x81e)](_0x38eff1);}return _0x38eff1;},VisuMZ['PreserveNumbers']=function(_0x1b76dc,_0x39414c,_0x2d8172){const _0x38bf42=_0x39290f;return _0x1b76dc=_0x1b76dc[_0x38bf42(0x41d)](/(\d)/gi,(_0x3d278a,_0xfe5ad)=>_0x38bf42(0x3c7)['format'](Number(_0xfe5ad))),_0x38bf42(0x75c)[_0x38bf42(0x8ca)](_0x1b76dc,_0x39414c,_0x2d8172);},VisuMZ[_0x39290f(0x81e)]=function(_0x32b7c0){const _0x587552=_0x39290f;return _0x32b7c0=_0x32b7c0[_0x587552(0x41d)](/PRESERVCONVERSION\((\d+)\)/gi,(_0x31cbc0,_0x1a9da5)=>Number(parseInt(_0x1a9da5))),_0x32b7c0;},VisuMZ['openURL']=function(_0x2371c7){const _0x343895=_0x39290f;SoundManager['playOk']();if(!Utils['isNwjs']()){const _0x19208c=window['open'](_0x2371c7,_0x343895(0x802));}else{const _0x544d3b=process[_0x343895(0x394)]=='darwin'?_0x343895(0x19c):process[_0x343895(0x394)]==_0x343895(0x438)?_0x343895(0x476):_0x343895(0x496);require(_0x343895(0x2cd))[_0x343895(0x118)](_0x544d3b+'\x20'+_0x2371c7);}},Game_Picture[_0x39290f(0x24d)][_0x39290f(0x1a1)]=function(){const _0x5130da=_0x39290f;return this[_0x5130da(0x41b)];},VisuMZ[_0x39290f(0x7b3)][_0x39290f(0x504)]=Game_Picture[_0x39290f(0x24d)][_0x39290f(0x4c9)],Game_Picture['prototype'][_0x39290f(0x4c9)]=function(){const _0x27641c=_0x39290f;VisuMZ[_0x27641c(0x7b3)][_0x27641c(0x504)]['call'](this),this[_0x27641c(0x41b)]={'x':0x0,'y':0x0},this[_0x27641c(0x6bd)]={'x':0x0,'y':0x0};},VisuMZ[_0x39290f(0x7b3)][_0x39290f(0x265)]=Game_Picture[_0x39290f(0x24d)][_0x39290f(0x185)],Game_Picture['prototype'][_0x39290f(0x185)]=function(){const _0xd359f1=_0x39290f;this['updateAnchor'](),VisuMZ[_0xd359f1(0x7b3)][_0xd359f1(0x265)][_0xd359f1(0x592)](this);},VisuMZ[_0x39290f(0x7b3)][_0x39290f(0x423)]=Game_Picture[_0x39290f(0x24d)][_0x39290f(0x275)],Game_Picture['prototype'][_0x39290f(0x275)]=function(_0x26facf,_0x5eb31d,_0x2f2d63,_0x1505f5,_0x56c285,_0x2c7e87,_0x314d56,_0x445076){const _0x1d78b0=_0x39290f;VisuMZ[_0x1d78b0(0x7b3)][_0x1d78b0(0x423)][_0x1d78b0(0x592)](this,_0x26facf,_0x5eb31d,_0x2f2d63,_0x1505f5,_0x56c285,_0x2c7e87,_0x314d56,_0x445076),this[_0x1d78b0(0x2c5)]([{'x':0x0,'y':0x0},{'x':0.5,'y':0.5}][_0x5eb31d]||{'x':0x0,'y':0x0});},VisuMZ['CoreEngine'][_0x39290f(0x770)]=Game_Picture[_0x39290f(0x24d)]['move'],Game_Picture['prototype']['move']=function(_0x1bd484,_0x12971b,_0x1fb256,_0x29c402,_0x2187b0,_0x2c9fdd,_0x1d3a4d,_0x2fa863,_0xbe53ff){const _0x354bf3=_0x39290f;VisuMZ[_0x354bf3(0x7b3)][_0x354bf3(0x770)]['call'](this,_0x1bd484,_0x12971b,_0x1fb256,_0x29c402,_0x2187b0,_0x2c9fdd,_0x1d3a4d,_0x2fa863,_0xbe53ff),this[_0x354bf3(0x7be)]([{'x':0x0,'y':0x0},{'x':0.5,'y':0.5}][_0x1bd484]||{'x':0x0,'y':0x0});},Game_Picture[_0x39290f(0x24d)][_0x39290f(0x2dd)]=function(){const _0x40887d=_0x39290f;this['_duration']>0x0&&(this[_0x40887d(0x41b)]['x']=this[_0x40887d(0x72c)](this[_0x40887d(0x41b)]['x'],this[_0x40887d(0x6bd)]['x']),this[_0x40887d(0x41b)]['y']=this['applyEasing'](this[_0x40887d(0x41b)]['y'],this[_0x40887d(0x6bd)]['y']));},Game_Picture[_0x39290f(0x24d)]['setAnchor']=function(_0x32aa4d){const _0xbdb4d9=_0x39290f;this[_0xbdb4d9(0x41b)]=_0x32aa4d,this[_0xbdb4d9(0x6bd)]=JsonEx[_0xbdb4d9(0x74a)](this[_0xbdb4d9(0x41b)]);},Game_Picture[_0x39290f(0x24d)][_0x39290f(0x7be)]=function(_0xcac1ec){const _0x4c5c90=_0x39290f;this[_0x4c5c90(0x6bd)]=_0xcac1ec;},VisuMZ['CoreEngine'][_0x39290f(0x720)]=Sprite_Picture['prototype']['updateOrigin'],Sprite_Picture[_0x39290f(0x24d)][_0x39290f(0x835)]=function(){const _0x2673ed=_0x39290f,_0x20d7f0=this['picture']();if(!_0x20d7f0[_0x2673ed(0x1a1)]())VisuMZ[_0x2673ed(0x7b3)][_0x2673ed(0x720)]['call'](this);else{if('vStYt'!=='vStYt'){const _0x564dd0=_0xaa472a[_0x2673ed(0x617)];for(let _0x4d29c0=0x0;_0x4d29c0<_0x564dd0[_0x2673ed(0x59c)];_0x4d29c0++){if(_0x564dd0[_0x4d29c0][_0x2673ed(0x53a)])return!![];}return![];}else this['anchor']['x']=_0x20d7f0['anchor']()['x'],this[_0x2673ed(0x1a1)]['y']=_0x20d7f0[_0x2673ed(0x1a1)]()['y'];}},Game_Action['prototype'][_0x39290f(0x194)]=function(_0x594662){const _0xad40ae=_0x39290f;if(_0x594662){const _0x58f105=_0x594662[_0xad40ae(0x171)];if(_0x58f105===0x1&&this[_0xad40ae(0x64f)]()[_0xad40ae(0x3aa)]()!==0x1)this[_0xad40ae(0x757)]();else _0x58f105===0x2&&this[_0xad40ae(0x64f)]()[_0xad40ae(0x13c)]()!==0x2?this[_0xad40ae(0x366)]():this['setSkill'](_0x58f105);}else{if(_0xad40ae(0x822)===_0xad40ae(0x822))this[_0xad40ae(0x575)]();else{this['contents'][_0xad40ae(0x575)]();const _0x337c38=_0xbd4ad2[_0xad40ae(0x8ec)],_0x25c309=_0x353514[_0xad40ae(0x2d8)](_0x337c38);if(!_0x25c309)return;this[_0xad40ae(0x69d)]=_0x25c309['_origin'],this[_0xad40ae(0x11a)]=_0x25c309['_x'],this['_lastY']=_0x25c309['_y'];const _0x3b0487=_0xc81c26[_0xad40ae(0x70e)]();this[_0xad40ae(0x328)][_0xad40ae(0x7a8)](0x0,0x0,this[_0xad40ae(0x3bd)],this[_0xad40ae(0x87c)],_0x3b0487);const _0x220a56=_0xad40ae(0x22f)[_0xad40ae(0x8ca)](_0x25c309[_0xad40ae(0x266)]===0x0?_0xad40ae(0x4db):_0xad40ae(0x7b7)),_0x3d5b44=_0xad40ae(0x890)[_0xad40ae(0x8ca)](_0x25c309['_x']),_0x59d9ce=_0xad40ae(0x66b)[_0xad40ae(0x8ca)](_0x25c309['_y']),_0xa1b5c8=_0xad40ae(0x410)[_0xad40ae(0x8ca)](_0x441c0a[_0xad40ae(0x483)](_0xad40ae(0x16e)));let _0x38cdc1=_0x5e4bcc[_0xad40ae(0x27c)](this[_0xad40ae(0x3bd)]/0x4);this['drawText'](_0x220a56,_0x38cdc1*0x0,0x0,_0x38cdc1),this[_0xad40ae(0x218)](_0x3d5b44,_0x38cdc1*0x1,0x0,_0x38cdc1,_0xad40ae(0x547)),this[_0xad40ae(0x218)](_0x59d9ce,_0x38cdc1*0x2,0x0,_0x38cdc1,_0xad40ae(0x547));const _0x120a47=this[_0xad40ae(0x685)](_0xa1b5c8)[_0xad40ae(0x42a)],_0x4284ac=this[_0xad40ae(0x3bd)]-_0x120a47;this[_0xad40ae(0x3af)](_0xa1b5c8,_0x4284ac,0x0,_0x120a47);}}},Game_Actor[_0x39290f(0x24d)][_0x39290f(0x7f2)]=function(){const _0x3d871d=_0x39290f;return this['skills']()[_0x3d871d(0x264)](_0x28124c=>this[_0x3d871d(0x8a6)](_0x28124c)&&this[_0x3d871d(0x317)]()['includes'](_0x28124c[_0x3d871d(0x684)]));},Window_Base[_0x39290f(0x24d)][_0x39290f(0x750)]=function(){const _0x291661=_0x39290f;this[_0x291661(0x16a)]=new Sprite(),this['_dimmerSprite'][_0x291661(0x28d)]=new Bitmap(0x0,0x0),this['_dimmerSprite']['x']=0x0,this[_0x291661(0x8b9)](this[_0x291661(0x16a)]);},Window_Base['prototype'][_0x39290f(0x602)]=function(){const _0xbb6451=_0x39290f;if(this['_dimmerSprite']){const _0x3147be=this['_dimmerSprite'][_0xbb6451(0x28d)],_0x2f8a5c=this['width'],_0x3e86f6=this[_0xbb6451(0x431)],_0x1e464f=this['padding'],_0x21d4f8=ColorManager['dimColor1'](),_0x5201d1=ColorManager['dimColor2']();_0x3147be[_0xbb6451(0x17a)](_0x2f8a5c,_0x3e86f6),_0x3147be[_0xbb6451(0x1b7)](0x0,0x0,_0x2f8a5c,_0x1e464f,_0x5201d1,_0x21d4f8,!![]),_0x3147be['fillRect'](0x0,_0x1e464f,_0x2f8a5c,_0x3e86f6-_0x1e464f*0x2,_0x21d4f8),_0x3147be['gradientFillRect'](0x0,_0x3e86f6-_0x1e464f,_0x2f8a5c,_0x1e464f,_0x21d4f8,_0x5201d1,!![]),this[_0xbb6451(0x16a)]['setFrame'](0x0,0x0,_0x2f8a5c,_0x3e86f6);}},Game_Actor[_0x39290f(0x24d)][_0x39290f(0x514)]=function(){const _0x26670c=_0x39290f;for(let _0x21e52f=0x0;_0x21e52f<this[_0x26670c(0x2da)]();_0x21e52f++){if(_0x26670c(0x51e)===_0x26670c(0x7ec)){var _0x50659a=_0x209e9f(_0x39fce9['$1']);_0x15ebdc+=_0x50659a;}else{const _0x190e6c=this['makeActionList']();let _0x4d3b9c=Number[_0x26670c(0x2a1)];this['setAction'](_0x21e52f,_0x190e6c[0x0]);for(const _0x443aaa of _0x190e6c){const _0x1cbfde=_0x443aaa['evaluate']();_0x1cbfde>_0x4d3b9c&&(_0x4d3b9c=_0x1cbfde,this[_0x26670c(0x475)](_0x21e52f,_0x443aaa));}}}this['setActionState'](_0x26670c(0x894));},Window_BattleItem[_0x39290f(0x24d)][_0x39290f(0x243)]=function(_0x1719b9){const _0x1a94a1=_0x39290f;if(BattleManager[_0x1a94a1(0x5a4)]())return BattleManager['actor']()[_0x1a94a1(0x8a6)](_0x1719b9);else{if(_0x1a94a1(0x57b)!==_0x1a94a1(0x627))return Window_ItemList[_0x1a94a1(0x24d)][_0x1a94a1(0x243)][_0x1a94a1(0x592)](this,_0x1719b9);else var _0xe05a1e=_0x5568cf[_0x1a94a1(0x426)](_0x272cc9*0x2-0x1,'outbounce')*0.5+0.5;}},VisuMZ[_0x39290f(0x7b3)][_0x39290f(0x330)]=Scene_Map[_0x39290f(0x24d)]['createSpriteset'],Scene_Map['prototype']['createSpriteset']=function(){const _0x53e2a3=_0x39290f;VisuMZ['CoreEngine']['Scene_Map_createSpriteset'][_0x53e2a3(0x592)](this);const _0x4e1c96=this['_spriteset'][_0x53e2a3(0x20c)];if(_0x4e1c96)this['addChild'](_0x4e1c96);},VisuMZ[_0x39290f(0x7b3)][_0x39290f(0x8ee)]=Scene_Battle['prototype'][_0x39290f(0x44f)],Scene_Battle[_0x39290f(0x24d)][_0x39290f(0x44f)]=function(){const _0x4dab15=_0x39290f;VisuMZ[_0x4dab15(0x7b3)][_0x4dab15(0x8ee)]['call'](this);const _0x1d9792=this[_0x4dab15(0x4bb)][_0x4dab15(0x20c)];if(_0x1d9792)this[_0x4dab15(0x359)](_0x1d9792);},Sprite_Actor['prototype'][_0x39290f(0x6bb)]=function(){const _0x5619d7=_0x39290f;Sprite_Battler[_0x5619d7(0x24d)]['update'][_0x5619d7(0x592)](this),this[_0x5619d7(0x64b)]();if(this[_0x5619d7(0x657)]){if(_0x5619d7(0x4d8)==='vZhio')this['updateMotion']();else{if(_0x5db2ec[_0x5619d7(0x7b3)][_0x5619d7(0x1ac)]['QoL'][_0x5619d7(0x2c7)])this[_0x5619d7(0x6db)]();else return _0x3d7c1f[_0x5619d7(0x7b3)]['BattleManager_processEscape']['call'](this);}}else this[_0x5619d7(0x131)]!==''&&(this[_0x5619d7(0x131)]='');},Window[_0x39290f(0x24d)]['_refreshArrows']=function(){const _0x42fe54=_0x39290f,_0x14763e=this[_0x42fe54(0x376)],_0x1636c8=this[_0x42fe54(0x55e)],_0x310f3e=0x18,_0x3f1bce=_0x310f3e/0x2,_0x348257=0x60+_0x310f3e,_0x37a733=0x0+_0x310f3e;this[_0x42fe54(0x5ad)][_0x42fe54(0x28d)]=this[_0x42fe54(0x15e)],this['_downArrowSprite']['anchor']['x']=0.5,this[_0x42fe54(0x5ad)][_0x42fe54(0x1a1)]['y']=0.5,this[_0x42fe54(0x5ad)]['setFrame'](_0x348257+_0x3f1bce,_0x37a733+_0x3f1bce+_0x310f3e,_0x310f3e,_0x3f1bce),this[_0x42fe54(0x5ad)][_0x42fe54(0x81d)](Math[_0x42fe54(0x401)](_0x14763e/0x2),Math['round'](_0x1636c8-_0x3f1bce)),this['_upArrowSprite'][_0x42fe54(0x28d)]=this[_0x42fe54(0x15e)],this[_0x42fe54(0x3fe)][_0x42fe54(0x1a1)]['x']=0.5,this[_0x42fe54(0x3fe)][_0x42fe54(0x1a1)]['y']=0.5,this['_upArrowSprite'][_0x42fe54(0x843)](_0x348257+_0x3f1bce,_0x37a733,_0x310f3e,_0x3f1bce),this[_0x42fe54(0x3fe)]['move'](Math[_0x42fe54(0x401)](_0x14763e/0x2),Math[_0x42fe54(0x401)](_0x3f1bce));},Window[_0x39290f(0x24d)]['_refreshPauseSign']=function(){const _0x266fb4=_0x39290f,_0x5da514=0x90,_0x264394=0x60,_0x12c2b9=0x18;this[_0x266fb4(0x363)]['bitmap']=this['_windowskin'],this[_0x266fb4(0x363)][_0x266fb4(0x1a1)]['x']=0.5,this[_0x266fb4(0x363)][_0x266fb4(0x1a1)]['y']=0x1,this[_0x266fb4(0x363)]['move'](Math[_0x266fb4(0x401)](this[_0x266fb4(0x376)]/0x2),this[_0x266fb4(0x55e)]),this[_0x266fb4(0x363)][_0x266fb4(0x843)](_0x5da514,_0x264394,_0x12c2b9,_0x12c2b9),this[_0x266fb4(0x363)][_0x266fb4(0x7c9)]=0xff;},Window['prototype'][_0x39290f(0x581)]=function(){const _0xfb45ae=_0x39290f,_0x35b59b=this[_0xfb45ae(0x61c)][_0xfb45ae(0x543)][_0xfb45ae(0x8c7)](new Point(0x0,0x0)),_0x3c90ad=this[_0xfb45ae(0x61c)]['filterArea'];_0x3c90ad['x']=_0x35b59b['x']+this[_0xfb45ae(0x2c0)]['x'],_0x3c90ad['y']=_0x35b59b['y']+this[_0xfb45ae(0x2c0)]['y'],_0x3c90ad[_0xfb45ae(0x42a)]=Math[_0xfb45ae(0x31d)](this['innerWidth']*this['scale']['x']),_0x3c90ad[_0xfb45ae(0x431)]=Math['ceil'](this[_0xfb45ae(0x87c)]*this[_0xfb45ae(0x137)]['y']);},Window[_0x39290f(0x24d)][_0x39290f(0x477)]=function(){const _0x243af3=_0x39290f,_0x5c7b40=this[_0x243af3(0x603)],_0x25c513=Math[_0x243af3(0x886)](0x0,this['_width']-_0x5c7b40*0x2),_0x2a6bc0=Math[_0x243af3(0x886)](0x0,this['_height']-_0x5c7b40*0x2),_0x3d30b6=this['_backSprite'],_0x4a091d=_0x3d30b6[_0x243af3(0x6d8)][0x0];_0x3d30b6[_0x243af3(0x28d)]=this[_0x243af3(0x15e)],_0x3d30b6[_0x243af3(0x843)](0x0,0x0,0x60,0x60),_0x3d30b6[_0x243af3(0x81d)](_0x5c7b40,_0x5c7b40),_0x3d30b6[_0x243af3(0x137)]['x']=_0x25c513/0x60,_0x3d30b6[_0x243af3(0x137)]['y']=_0x2a6bc0/0x60,_0x4a091d[_0x243af3(0x28d)]=this[_0x243af3(0x15e)],_0x4a091d[_0x243af3(0x843)](0x0,0x60,0x60,0x60),_0x4a091d[_0x243af3(0x81d)](0x0,0x0,_0x25c513,_0x2a6bc0),_0x4a091d[_0x243af3(0x137)]['x']=0x1/_0x3d30b6['scale']['x'],_0x4a091d['scale']['y']=0x1/_0x3d30b6['scale']['y'],_0x3d30b6[_0x243af3(0x719)](this['_colorTone']);},Game_Temp[_0x39290f(0x24d)][_0x39290f(0x34d)]=function(){const _0x65941c=_0x39290f;this['_animationQueue']=[],this[_0x65941c(0x371)]=[],this[_0x65941c(0x3fa)]=[],this[_0x65941c(0x711)]=[];},VisuMZ[_0x39290f(0x7b3)][_0x39290f(0x897)]=Scene_Base[_0x39290f(0x24d)][_0x39290f(0x4fd)],Scene_Base[_0x39290f(0x24d)][_0x39290f(0x4fd)]=function(){const _0x4f3f79=_0x39290f;if($gameTemp)$gameTemp[_0x4f3f79(0x34d)]();VisuMZ[_0x4f3f79(0x7b3)][_0x4f3f79(0x897)][_0x4f3f79(0x592)](this);},Bitmap[_0x39290f(0x24d)][_0x39290f(0x515)]=function(_0x2bcb3d){const _0x55165b=_0x39290f,_0xd3153b=this[_0x55165b(0x3cc)];_0xd3153b[_0x55165b(0x242)](),_0xd3153b[_0x55165b(0x17f)]=this[_0x55165b(0x164)]();const _0x1755d7=_0xd3153b[_0x55165b(0x8b3)](_0x2bcb3d)[_0x55165b(0x42a)];return _0xd3153b[_0x55165b(0x8cf)](),_0x1755d7;},Window_Message[_0x39290f(0x24d)][_0x39290f(0x605)]=function(_0x1bb6fe){const _0x1af9a3=_0x39290f;return this[_0x1af9a3(0x328)][_0x1af9a3(0x515)](_0x1bb6fe);};