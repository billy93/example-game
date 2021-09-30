//=============================================================================
// VisuStella MZ - Skills & States Core
// VisuMZ_1_SkillsStatesCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_SkillsStatesCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.SkillsStatesCore = VisuMZ.SkillsStatesCore || {};
VisuMZ.SkillsStatesCore.version = 1.23;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.23] [SkillsStatesCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Skills_and_States_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Skills & States Core plugin extends and builds upon the functionality of
 * RPG Maker MZ's inherent skill, state, and buff functionalities and allows
 * game devs to customize its various aspects.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Assigning multiple Skill Types to Skills.
 * * Making custom Skill Cost Types (such as HP, Gold, and Items).
 * * Allowing Skill Costs to become percentile-based or dynamic either directly
 *   through the Skills themselves or through trait-like notetags.
 * * Replacing gauges for different classes to display different types of
 *   Skill Cost Type resources.
 * * Hiding/Showing and enabling/disabling skills based on switches, learned
 *   skills, and code.
 * * Setting rulings for states, including if they're cleared upon death, how
 *   reapplying the state affects their turn count, and more.
 * * Allowing states to be categorized and affected by categories, too.
 * * Displaying turn counts on states drawn in the window or on sprites.
 * * Manipulation of state, buff, and debuff turns through skill and item
 *   effect notetags.
 * * Create custom damage over time state calculations through notetags.
 * * Allow database objects to apply passive states to its user.
 * * Passive states can have conditions before they become active as well.
 * * Updated Skill Menu Scene layout to fit more modern appearances.
 * * Added bonus if Items & Equips Core is installed to utilize the Shop Status
 *   Window to display skill data inside the Skill Menu.
 * * Control over various aspects of the Skill Menu Scene.
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
 * Major Changes
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 * 
 * Action End Removal for States
 * 
 * - If your Plugin Parameter settings for "Action End Update" are enabled,
 * then "Action End" has been updated so that it actually applies per action
 * used instead of just being at the start of a battler's action set.
 * 
 * - However, there are side effects to this: if a state has the "Cannot Move"
 * restriction along with the "Action End" removal timing, then unsurprisingly,
 * the state will never wear off because it's now based on actual actions
 * ending. To offset this and remove confusion, "Action End" auto-removal
 * timings for states with "Cannot Move" restrictions will be turned into
 * "Turn End" auto-removal timings while the "Action End Update" is enabled.
 * 
 * - This automatic change won't make it behave like an "Action End" removal
 * timing would, but it's better than completely softlocking a battler.
 * 
 * ---
 *
 * Buff & Debuff Level Management
 *
 * - In RPG Maker MZ, buffs and debuffs when applied to one another will shift
 * the buff modifier level up or down. This plugin will add an extra change to
 * the mechanic by making it so that once the buff modifier level reaches a
 * neutral point, the buff or debuff is removed altogether and resets the buff
 * and debuff turn counter for better accuracy.
 *
 * ---
 *
 * Skill Costs
 *
 * - In RPG Maker MZ, skill costs used to be hard-coded. Now, all Skill Cost
 * Types are now moved to the Plugin Parameters, including MP and TP. This
 * means that from payment to checking for them, it's all done through the
 * options available.
 *
 * - By default in RPG Maker MZ, displayed skill costs would only display only
 * one type: TP if available, then MP. If a skill costs both TP and MP, then
 * only TP was displayed. This plugin changes that aspect by displaying all the
 * cost types available in order of the Plugin Parameter Skill Cost Types.
 *
 * - By default in RPG Maker MZ, displayed skill costs were only color-coded.
 * This plugin changes that aspect by displaying the Skill Cost Type's name
 * alongside the cost. This is to help color-blind players distinguish what
 * costs a skill has.
 *
 * ---
 *
 * Sprite Gauges
 *
 * - Sprite Gauges in RPG Maker MZ by default are hard-coded and only work for
 * HP, MP, TP, and Time (used for ATB). This plugin makes it possible for them
 * to be customized through the use of Plugin Parameters under the Skill Cost
 * Types and their related-JavaScript entries.
 *
 * ---
 * 
 * State Displays
 * 
 * - To put values onto states and display them separately from the state turns
 * you can use the following script calls.
 * 
 *   battler.getStateDisplay(stateId)
 *   - This returns whatever value is stored for the specified battler under
 *     that specific state value.
 *   - If there is no value to be returned it will return an empty string.
 * 
 *   battler.setStateDisplay(stateId, value)
 *   - This sets the display for the battler's specific state to whatever you
 *     declared as the value.
 *   - The value is best used as a number or a string.
 * 
 *   battler.clearStateDisplay(stateId)
 *   - This clears the display for the battler's specific state.
 *   - In short, this sets the stored display value to an empty string.
 * 
 * ---
 *
 * Window Functions Moved
 *
 * - Some functions found in RPG Maker MZ's default code for Window_StatusBase
 * and Window_SkillList are now moved to Window_Base to make the functions
 * available throughout all windows for usage.
 *
 * ---
 *
 * ============================================================================
 * Passive State Clarification
 * ============================================================================
 * 
 * This section will explain various misconceptions regarding passive states.
 * No, passive states do not work the same way as states code-wise. Yes, they
 * use the same effects as states mechanically, but there are differences.
 * 
 * ---
 * 
 * For those using the code "a.isStateAffected(10)" to check if a target is
 * affected by a state or not, this does NOT check passive states. This only
 * checks for states that were directly applied to the target.
 * 
 * This is NOT a bug.
 * 
 * Instead, use "a.states().includes($dataStates[10])" to check for them. This
 * code will search for both directly applied states and passive states alike.
 *
 * ---
 * 
 * As passive states are NOT considered directly applied to, they do NOT match
 * a Conditional Branch's state check as well. The Conditional Branch effect
 * checks for an affected state.
 * 
 * ---
 * 
 * Because passive states are NOT directly applied to a battler, the functions
 * of "addNewState", "addState", "eraseState", "removeState" do NOT apply to
 * passive states either. This means that any of the related JS notetags tied
 * to those functions will not occur either.
 * 
 * ---
 * 
 * Why are passive states not considered affected by? Let's look at it
 * differently. There are two ways to grant skills to actors. They can acquire
 * skills by levels/items/events or they can equip gear that temporarily grants
 * the skill in question.
 * 
 * Learning the skill is direct. Temporarily granting the skill is indirect.
 * These two factors have mechanical importance and require differentiation.
 * 
 * Regular states and passive states are the same way. Regular states are
 * directly applied, therefore, need to be distinguished in order for things
 * like state turns and steps, removal conditionals, and similar to matter at
 * all. Passive states are indirect and are therefore, unaffected by state
 * turns, steps, and removal conditions. These mechanical differences are
 * important for how RPG Maker works.
 * 
 * ---
 * 
 * Once again, it is NOT a bug that when using "a.isStateAffected(10)" to
 * check if a target has a passive state will return false.
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
 * === General Skill Notetags ===
 *
 * The following are general notetags that are skill-related.
 *
 * ---
 *
 * <Skill Type: x>
 * <Skill Types: x,x,x>
 *
 * <Skill Type: name>
 * <Skill Types: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Marks the skill to have multiple Skill Types, meaning they would appear
 *   under different skill types without needing to create duplicate skills.
 * - Replace 'x' with a number value representing the Skill Type's ID.
 * - If using 'name' notetag variant, replace 'name' with the Skill Type(s)
 *   name desired to be added.
 *
 * ---
 * 
 * <List Name: name>
 * 
 * - Used for: Skill Notetags
 * - Makes the name of the skill appear different when show in the skill list.
 * - Using \V[x] as a part of the name will display that variable.
 * 
 * ---
 *
 * === Skill Cost Notetags ===
 *
 * The following are notetags that can be used to adjust skill costs. Some of
 * these notetags are added through the Plugin Parameter: Skill Cost Types and
 * can be altered there. This also means that some of these notetags can have
 * their functionality altered and/or removed.
 *
 * ---
 *
 * <type Cost: x>
 * <type Cost: x%>
 *
 * - Used for: Skill Notetags
 * - These notetags are used to designate costs of custom or already existing
 *   types that cannot be made by the Database Editor.
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - Replace 'x' with a number value to determine the exact type cost value.
 *   This lets you bypass the Database Editor's limit of 9,999 MP and 100 TP.
 * - The 'x%' version is replaced with a percentile value to determine a cost
 *   equal to a % of the type's maximum quantity limit.
 * - Functionality for these notetags can be altered in the Plugin Parameters.
 *
 * Examples:
 *   <HP Cost: 500>
 *   <MP Cost: 25%>
 *   <Gold Cost: 3000>
 *   <Potion Cost: 5>
 *
 * ---
 *
 * <type Cost Max: x>
 * <type Cost Min: x>
 *
 * - Used for: Skill Notetags
 * - These notetags are used to ensure conditional and % costs don't become too
 *   large or too small.
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - Replace 'x' with a number value to determine the maximum or minimum values
 *   that the cost can be.
 * - Functionality for these notetags can be altered in the Plugin Parameters.
 *
 * Examples:
 *   <HP Cost Max: 1500>
 *   <MP Cost Min: 5>
 *   <Gold Cost Max: 10000>
 *   <Potion Cost Min: 3>
 *
 * ---
 *
 * <type Cost: +x>
 * <type Cost: -x>
 *
 * <type Cost: x%>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - For % notetag variant: Replace 'x' with a number value to determine the
 *   rate to adjust the Skill Cost Type by as a flat value. This is applied
 *   before <type Cost: +x> and <type Cost: -x> notetags.
 * - For + and - notetag variants: Replace 'x' with a number value to determine
 *   how much to adjust the Skill Cost Type by as a flat value. This is applied
 *   after <type Cost: x%> notetags.
 * - Functionality for these notetags can be altered in the Plugin Parameters.
 *
 * Examples:
 *   <HP Cost: +20>
 *   <MP Cost: -10>
 *   <Gold Cost: 50%>
 *   <Potion Cost: 200%>
 *
 * ---
 *
 * <Custom Cost Text>
 *  text
 * </Custom Cost Text>
 *
 * - Used for: Skill Notetags
 * - Allows you to insert custom text into the skill's cost area towards the
 *   end of the costs.
 * - Replace 'text' with the text you wish to display.
 * - Text codes may be used.
 *
 * ---
 *
 * === JavaScript Notetags: Skill Costs ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * determine any dynamic Skill Cost Types used for particular skills.
 *
 * ---
 *
 * <JS type Cost>
 *  code
 *  code
 *  cost = code;
 * </JS type Cost>
 *
 * - Used for: Skill Notetags
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - Replace 'code' to determine the type 'cost' of the skill.
 * - Insert the final type cost into the 'cost' variable.
 * - The 'user' variable refers to the user about to perform the skill.
 * - The 'skill' variable refers to the skill being used.
 * - Functionality for the notetag can be altered in the Plugin Parameters.
 *
 * ---
 *
 * === Gauge Replacement Notetags ===
 *
 * Certain classes can have their gauges swapped out for other Skill Cost
 * Types. This is especially helpful for the classes that don't utilize those
 * Skill Cost Types. You can mix and match them however you want.
 *
 * ---
 *
 * <Replace HP Gauge: type>
 * <Replace MP Gauge: type>
 * <Replace TP Gauge: type>
 *
 * - Used for: Class Notetags
 * - Replaces the HP (1st), MP (2nd), or TP (3rd) gauge with a different Skill
 *   Cost Type.
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - Replace 'type' with 'none' to not display any gauges there.
 * - The <Replace TP Gauge: type> will require 'Display TP in Window' setting
 *   to be on in the Database > System 1 tab.
 * - Functionality for the notetags can be altered by changes made to the
 *   Skill & States Core Plugin Parameters.
 *
 * ---
 *
 * === Skill Accessibility Notetags ===
 *
 * Sometimes, you don't want all skills to be visible whether it be to hide
 * menu-only skills during battle, until certain switches are turned ON/OFF, or
 * until certain skills have been learned.
 *
 * ---
 *
 * <Hide in Battle>
 * <Hide outside Battle>
 *
 * - Used for: Skill Notetags
 * - Makes the specific skill visible or hidden depending on whether or not the
 *   player is currently in battle.
 *
 * ---
 *
 * <Show Switch: x>
 *
 * <Show All Switches: x,x,x>
 * <Show Any Switches: x,x,x>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on switches.
 * - Replace 'x' with the switch ID to determine the skill's visibility.
 * - If 'All' notetag variant is used, skill will be hidden until all switches
 *   are ON. Then, it would be shown.
 * - If 'Any' notetag variant is used, skill will be shown if any of the
 *   switches are ON. Otherwise, it would be hidden.
 *
 * ---
 *
 * <Hide Switch: x>
 *
 * <Hide All Switches: x,x,x>
 * <Hide Any Switches: x,x,x>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on switches.
 * - Replace 'x' with the switch ID to determine the skill's visibility.
 * - If 'All' notetag variant is used, skill will be shown until all switches
 *   are ON. Then, it would be hidden.
 * - If 'Any' notetag variant is used, skill will be hidden if any of the
 *   switches are ON. Otherwise, it would be shown.
 *
 * ---
 *
 * <Show if learned Skill: x>
 *
 * <Show if learned All Skills: x,x,x>
 * <Show if learned Any Skills: x,x,x>
 *
 * <Show if learned Skill: name>
 *
 * <Show if learned All Skills: name, name, name>
 * <Show if learned Any Skills: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on skills learned.
 * - This does not apply to skills added by traits on actors, classes, any
 *   equipment, or states. These are not considered learned skills. They are
 *   considered temporary skills.
 * - Replace 'x' with the skill ID to determine the skill's visibility.
 * - If 'name' notetag viarant is used, replace 'name' with the skill's name to
 *   be checked for the notetag.
 * - If 'All' notetag variant is used, skill will be hidden until all skills
 *   are learned. Then, it would be shown.
 * - If 'Any' notetag variant is used, skill will be shown if any of the skills
 *   are learned. Otherwise, it would be hidden.
 *
 * ---
 *
 * <Hide if learned Skill: x>
 *
 * <Hide if learned All Skills: x,x,x>
 * <Hide if learned Any Skills: x,x,x>
 *
 * <Hide if learned Skill: name>
 *
 * <Hide if learned All Skills: name, name, name>
 * <Hide if learned Any Skills: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on skills learned.
 * - This does not apply to skills added by traits on actors, classes, any
 *   equipment, or states. These are not considered learned skills. They are
 *   considered temporary skills.
 * - Replace 'x' with the skill ID to determine the skill's visibility.
 * - If 'name' notetag viarant is used, replace 'name' with the skill's name to
 *   be checked for the notetag.
 * - If 'All' notetag variant is used, skill will be shown until all skills
 *   are learned. Then, it would be hidden.
 * - If 'Any' notetag variant is used, skill will be hidden if any of the
 *   skills are learned. Otherwise, it would be shown.
 *
 * ---
 *
 * <Show if has Skill: x>
 *
 * <Show if have All Skills: x,x,x>
 * <Show if have Any Skills: x,x,x>
 *
 * <Show if has Skill: name>
 *
 * <Show if have All Skills: name, name, name>
 * <Show if have Any Skills: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on skills available.
 * - This applies to both skills that have been learned and/or temporarily
 *   added through traits on actors, classes, equipment, or states.
 * - Replace 'x' with the skill ID to determine the skill's visibility.
 * - If 'name' notetag viarant is used, replace 'name' with the skill's name to
 *   be checked for the notetag.
 * - If 'All' notetag variant is used, skill will be hidden until all skills
 *   are learned. Then, it would be shown.
 * - If 'Any' notetag variant is used, skill will be shown if any of the skills
 *   are learned. Otherwise, it would be hidden.
 *
 * ---
 *
 * <Hide if has Skill: x>
 *
 * <Hide if have All Skills: x,x,x>
 * <Hide if have Any Skills: x,x,x>
 *
 * <Hide if has Skill: name>
 *
 * <Hide if have All Skills: name, name, name>
 * <Hide if have Any Skills: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on skills available.
 * - This applies to both skills that have been learned and/or temporarily
 *   added through traits on actors, classes, equipment, or states.
 * - Replace 'x' with the skill ID to determine the skill's visibility.
 * - If 'name' notetag viarant is used, replace 'name' with the skill's name to
 *   be checked for the notetag.
 * - If 'All' notetag variant is used, skill will be shown until all skills
 *   are learned. Then, it would be hidden.
 * - If 'Any' notetag variant is used, skill will be hidden if any of the
 *   skills are learned. Otherwise, it would be shown.
 *
 * ---
 *
 * <Enable Switch: x>
 *
 * <Enable All Switches: x,x,x>
 * <Enable Any Switches: x,x,x>
 *
 * - Used for: Skill Notetags
 * - Determines the enabled status of the skill based on switches.
 * - Replace 'x' with the switch ID to determine the skill's enabled status.
 * - If 'All' notetag variant is used, skill will be disabled until all
 *   switches are ON. Then, it would be enabled.
 * - If 'Any' notetag variant is used, skill will be enabled if any of the
 *   switches are ON. Otherwise, it would be disabled.
 *
 * ---
 *
 * <Disable Switch: x>
 *
 * <Disable All Switches: x,x,x>
 * <Disable Any Switches: x,x,x>
 *
 * - Used for: Skill Notetags
 * - Determines the enabled status of the skill based on switches.
 * - Replace 'x' with the switch ID to determine the skill's enabled status.
 * - If 'All' notetag variant is used, skill will be enabled until all switches
 *   are ON. Then, it would be disabled.
 * - If 'Any' notetag variant is used, skill will be disabled if any of the
 *   switches are ON. Otherwise, it would be enabled.
 *
 * ---
 *
 * === JavaScript Notetags: Skill Accessibility ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * determine if a skill can be accessible visibly or through usage.
 *
 * ---
 *
 * <JS Skill Visible>
 *  code
 *  code
 *  visible = code;
 * </JS Skill Visible>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on JavaScript code.
 * - Replace 'code' to determine the type visibility of the skill.
 * - The 'visible' variable returns a boolean (true/false) to determine if the
 *   skill will be visible or not.
 * - The 'user' variable refers to the user with the skill.
 * - The 'skill' variable refers to the skill being checked.
 * - All other visibility conditions must be met for this code to count.
 *
 * ---
 *
 * <JS Skill Enable>
 *  code
 *  code
 *  enabled = code;
 * </JS Skill Enable>
 *
 * - Used for: Skill Notetags
 * - Determines the enabled status of the skill based on JavaScript code.
 * - Replace 'code' to determine the type enabled status of the skill.
 * - The 'enabled' variable returns a boolean (true/false) to determine if the
 *   skill will be enabled or not.
 * - The 'user' variable refers to the user with the skill.
 * - The 'skill' variable refers to the skill being checked.
 * - All other skill conditions must be met in order for this to code to count.
 *
 * ---
 *
 * === General State-Related Notetags ===
 *
 * The following notetags are centered around states, such as how their turn
 * counts are displayed, items and skills that affect state turns, if the state
 * can avoid removal by death state, etc.
 *
 * ---
 *
 * <No Death Clear>
 *
 * - Used for: State Notetags
 * - Prevents this state from being cleared upon death.
 * - This allows this state to be added to an already dead battler, too.
 *
 * ---
 *
 * <No Recover All Clear>
 *
 * - Used for: State Notetags
 * - Prevents this state from being cleared upon using the Recover All command.
 *
 * ---
 *
 * <Group Defeat>
 *
 * - Used for: State Notetags
 * - If an entire party is affected by states with the <Group Defeat> notetag,
 *   they are considered defeated.
 * - Usage for this includes party-wide petrification, frozen, etc.
 *
 * ---
 *
 * <Reapply Rules: Ignore>
 * <Reapply Rules: Reset>
 * <Reapply Rules: Greater>
 * <Reapply Rules: Add>
 *
 * - Used for: State Notetags
 * - Choose what kind of rules this state follows if the state is being applied
 *   to a target that already has the state. This affects turns specifically.
 * - 'Ignore' will bypass any turn changes.
 * - 'Reset' will recalculate the state's turns.
 * - 'Greater' will choose to either keep the current turn count if it's higher
 *   than the reset amount or reset it if the current turn count is lower.
 * - 'Add' will add the state's turn count to the applied amount.
 * - If this notetag isn't used, it will use the rules set in the States >
 *   Plugin Parameters.
 *
 * ---
 *
 * <Positive State>
 * <Negative State>
 *
 * - Used for: State Notetags
 * - Marks the state as a positive state or negative state, also altering the
 *   state's turn count color to match the Plugin Parameter settings.
 * - This also puts the state into either the 'Positive' category or
 *   'Negative' category.
 *
 * ---
 *
 * <Category: name>
 * <Category: name, name, name>
 *
 * - Used for: State Notetags
 * - Arranges states into certain/multiple categories.
 * - Replace 'name' with a category name to mark this state as.
 * - Insert multiples of this to mark the state with  multiple categories.
 *
 * ---
 *
 * <Categories>
 *  name
 *  name
 * </Categories>
 *
 * - Used for: State Notetags
 * - Arranges states into certain/multiple categories.
 * - Replace each 'name' with a category name to mark this state as.
 *
 * ---
 * 
 * <Resist State Category: name>
 * <Resist State Categories: name, name, name>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Causes the affected battler resist the listed categories.
 * - Replace each 'name' with a category name to resist.
 *   - Insert multiple 'name' entries to add more categories.
 * - This works exactly like how state resistances work in-game. If a battler
 *   who was originally NOT resistant to "Poison" before gaining a
 *   poison-resistant trait, the "Poison" state will remain because it was
 *   applied before poison-resistance as enabled.
 * 
 * ---
 * 
 * <Resist State Categories>
 *  name
 *  name
 *  name
 * </Resist State Categories>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Causes the affected battler resist the listed categories.
 * - Replace each 'name' with a category name to resist.
 *   - Insert multiple 'name' entries to add more categories.
 * - This works exactly like how state resistances work in-game. If a battler
 *   who was originally NOT resistant to "Poison" before gaining a
 *   poison-resistant trait, the "Poison" state will remain because it was
 *   applied before poison-resistance as enabled.
 * 
 * ---
 *
 * <State x Category Remove: y>
 * 
 * <State x Category Remove: All>
 *
 * - Used for: Skill, Item Notetags
 * - Allows the skill/item to remove 'y' states from specific category 'x'.
 * - Replace 'x' with a category name to remove from.
 * - Replace 'y' with the number of times to remove from that category.
 * - Use the 'All' variant to remove all of the states of that category.
 * - Insert multiples of this to remove different types of categories.
 *
 * ---
 *
 * <Hide State Turns>
 *
 * - Used for: State Notetags
 * - Hides the state turns from being shown at all.
 * - This will by pass any Plugin Parameter settings.
 *
 * ---
 *
 * <Turn Color: x>
 * <Turn Color: #rrggbb>
 *
 * - Used for: State Notetags
 * - Hides the state turns from being shown at all.
 * - Determines the color of the state's turn count.
 * - Replace 'x' with a number value depicting a window text color.
 * - Replace 'rrggbb' with a hex color code for a more custom color.
 *
 * ---
 *
 * <State id Turns: +x>
 * <State id Turns: -x>
 *
 * <Set State id Turns: x>
 *
 * <State name Turns: +x>
 * <State name Turns: -x>
 *
 * <Set State name Turns: x>
 *
 * - Used for: Skill, Item Notetags
 * - If the target is affected by state 'id' or state 'name', change the state
 *   turn duration for target.
 * - For 'id' variant, replace 'id' with the ID of the state to modify.
 * - For 'name' variant, replace 'name' with the name of the state to modify.
 * - Replace 'x' with the value you wish to increase, decrease, or set to.
 * - Insert multiples of this notetag to affect multiple states at once.
 *
 * ---
 *
 * <param Buff Turns: +x>
 * <param Buff Turns: -x>
 *
 * <Set param Buff Turns: x>
 *
 * - Used for: Skill, Item Notetags
 * - If the target is affected by a 'param' buff, change that buff's turn
 *   duration for target.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter buff to modify.
 * - Replace 'x' with the value you wish to increase, decrease, or set to.
 * - Insert multiples of this notetag to affect multiple parameters at once.
 *
 * ---
 *
 * <param Debuff Turns: +x>
 * <param Debuff Turns: -x>
 *
 * <Set param Debuff Turns: x>
 *
 * - Used for: Skill, Item Notetags
 * - If the target is affected by a 'param' debuff, change that debuff's turn
 *   duration for target.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter debuff to modify.
 * - Replace 'x' with the value you wish to increase, decrease, or set to.
 * - Insert multiples of this notetag to affect multiple parameters at once.
 *
 * ---
 *
 * === JavaScript Notetags: On Add/Erase/Expire ===
 *
 * Using JavaScript code, you can use create custom effects that occur when a
 * state has bee added, erased, or expired.
 * 
 * ---
 *
 * <JS On Add State>
 *  code
 *  code
 * </JS On Add State>
 *
 * - Used for: State Notetags
 * - When a state is added, run the code added by this notetag.
 * - The 'user' variable refers to the current active battler.
 * - The 'target' variable refers to the battler affected by this state.
 * - The 'origin' variable refers to the one who applied this state.
 * - The 'state' variable refers to the current state being affected.
 *
 * ---
 *
 * <JS On Erase State>
 *  code
 *  code
 * </JS On Erase State>
 *
 * - Used for: State Notetags
 * - When a state is erased, run the code added by this notetag.
 * - The 'user' variable refers to the current active battler.
 * - The 'target' variable refers to the battler affected by this state.
 * - The 'origin' variable refers to the one who applied this state.
 * - The 'state' variable refers to the current state being affected.
 *
 * ---
 *
 * <JS On Expire State>
 *  code
 *  code
 * </JS On Expire State>
 *
 * - Used for: State Notetags
 * - When a state has expired, run the code added by this notetag.
 * - The 'user' variable refers to the current active battler.
 * - The 'target' variable refers to the battler affected by this state.
 * - The 'origin' variable refers to the one who applied this state.
 * - The 'state' variable refers to the current state being affected.
 *
 * ---
 *
 * === JavaScript Notetags: Slip Damage/Healing ===
 *
 * Slip Damage, in RPG Maker vocabulary, refers to damage over time. The
 * following notetags allow you to perform custom slip damage/healing.
 *
 * ---
 *
 * <JS type Slip Damage>
 *  code
 *  code
 *  damage = code;
 * </JS type Slip Damage>
 *
 * - Used for: State Notetags
 * - Code used to determine how much slip damage is dealt to the affected unit
 *   during each regeneration phase.
 * - Replace 'type' with 'HP', 'MP', or 'TP'.
 * - Replace 'code' with the calculations on what to determine slip damage.
 * - The 'user' variable refers to the origin of the state.
 * - The 'target' variable refers to the affected unit receiving the damage.
 * - The 'state' variable refers to the current state being affected.
 * - The 'damage' variable is the finalized slip damage to be dealt.
 * - When these states are applied via action effects, the slip calculations
 *   are one time calculations made upon applying and the damage is cached to
 *   be used for future on regeneration calculations.
 * - For that reason, do not include game mechanics here such as adding states,
 *   buffs, debuffs, etc. as this notetag is meant for calculations only. Use
 *   the VisuStella Battle Core's <JS Pre-Regenerate> and <JS Post-Regenerate>
 *   notetags for game mechanics instead.
 * - Passive states and states with the <JS Slip Refresh> notetag are exempt
 *   from the one time calculation and recalculated each regeneration phase.
 *
 * ---
 *
 * <JS type Slip Heal>
 *  code
 *  code
 *  heal = code;
 * </JS type Slip Heal>
 *
 * - Used for: State Notetags
 * - Code used to determine how much slip healing is dealt to the affected unit
 *   during each regeneration phase.
 * - Replace 'type' with 'HP', 'MP', or 'TP'.
 * - Replace 'code' with the calculations on what to determine slip healing.
 * - The 'user' variable refers to the origin of the state.
 * - The 'target' variable refers to the affected unit receiving the healing.
 * - The 'state' variable refers to the current state being affected.
 * - The 'heal' variable is the finalized slip healing to be recovered.
 * - When these states are applied via action effects, the slip calculations
 *   are one time calculations made upon applying and the damage is cached to
 *   be used for future on regeneration calculations.
 * - For that reason, do not include game mechanics here such as adding states,
 *   buffs, debuffs, etc. as this notetag is meant for calculations only. Use
 *   the VisuStella Battle Core's <JS Pre-Regenerate> and <JS Post-Regenerate>
 *   notetags for game mechanics instead.
 * - Passive states and states with the <JS Slip Refresh> notetag are exempt
 *   from the one time calculation and recalculated each regeneration phase.
 *
 * ---
 * 
 * <JS Slip Refresh>
 * 
 * - Used for: State Notetags
 * - Refreshes the calculations made for the JS Slip Damage/Heal amounts at the
 *   start of each regeneration phase to allow for dynamic damage ranges.
 * 
 * ---
 *
 * === Passive State Notetags ===
 *
 * Passive States are states that are always applied to actors and enemies
 * provided that their conditions have been met. These can be granted through
 * database objects or through the Passive States Plugin Parameters.
 * 
 * ---
 * 
 * For those using the code "a.isStateAffected(10)" to check if a target is
 * affected by a state or not, this does NOT check passive states. This only
 * checks for states that were directly applied to the target.
 * 
 * This is NOT a bug.
 * 
 * Instead, use "a.states().includes($dataStates[10])" to check for them. This
 * code will search for both directly applied states and passive states alike.
 *
 * ---
 * 
 * As passive states are NOT considered directly applied to, they do NOT match
 * a Conditional Branch's state check as well. The Conditional Branch effect
 * checks for an affected state.
 * 
 * ---
 * 
 * Because passive states are NOT directly applied to a battler, the functions
 * of "addNewState", "addState", "eraseState", "removeState" do NOT apply to
 * passive states either. This means that any of the related JS notetags tied
 * to those functions will not occur either.
 * 
 * ---
 * 
 * Why are passive states not considered affected by? Let's look at it
 * differently. There are two ways to grant skills to actors. They can acquire
 * skills by levels/items/events or they can equip gear that temporarily grants
 * the skill in question.
 * 
 * Learning the skill is direct. Temporarily granting the skill is indirect.
 * These two factors have mechanical importance and require differentiation.
 * 
 * Regular states and passive states are the same way. Regular states are
 * directly applied, therefore, need to be distinguished in order for things
 * like state turns and steps, removal conditionals, and similar to matter at
 * all. Passive states are indirect and are therefore, unaffected by state
 * turns, steps, and removal conditions. These mechanical differences are
 * important for how RPG Maker works.
 * 
 * ---
 * 
 * Once again, it is NOT a bug that when using "a.isStateAffected(10)" to
 * check if a target has a passive state will return false.
 * 
 * ---
 *
 * <Passive State: x>
 * <Passive States: x,x,x>
 *
 * <Passive State: name>
 * <Passive States: name, name, name>
 *
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy Notetags
 * - Adds passive state(s) x to trait object, applying it to related actor or
 *   enemy unit(s).
 * - Replace 'x' with a number to determine which state to add as a passive.
 * - If using 'name' notetag variant, replace 'name' with the name of the
 *   state(s) to add as a passive.
 * - Note: If you plan on applying a passive state through a skill, it must be
 *   through a skill that has been learned by the target and not a skill that
 *   is given through a trait.
 *
 * ---
 *
 * <Passive Stackable>
 *
 * - Used for: State Notetags
 * - Makes it possible for this passive state to be added multiple times.
 * - Otherwise, only one instance of the passive state can be available.
 *
 * ---
 *
 * <Passive Condition Class: id>
 * <Passive Condition Classes: id, id, id>
 *
 * <Passive Condition Class: name>
 * <Passive Condition Classes: name, name, name>
 *
 * - Used for: State Notetags
 * - Determines the passive condition of the passive state based on the actor's
 *   current class. As long as the actor's current class matches one of the
 *   data entries, the passive condition is considered passed.
 * - For 'id' variant, replace 'id' with a number representing class's ID.
 * - For 'name' variant, replace 'name' with the class's name.
 *
 * ---
 *
 * <Passive Condition Multiclass: id>
 * <Passive Condition Multiclass: id, id, id>
 *
 * <Passive Condition Multiclass: name>
 * <Passive Condition Multiclass: name, name, name>
 *
 * - Used for: State Notetags
 * - Requires VisuMZ_2_ClassChangeSystem!
 * - Determines the passive condition of the passive state based on the actor's
 *   multiclasses. As long as the actor has any of the matching classes
 *   assigned as a multiclass, the passive condition is considered passed.
 * - For 'id' variant, replace 'id' with a number representing class's ID.
 * - For 'name' variant, replace 'name' with the class's name.
 *
 * ---
 *
 * <Passive Condition Switch ON: x>
 *
 * <Passive Condition All Switches ON: x,x,x>
 * <Passive Condition Any Switch ON: x,x,x>
 *
 * - Used for: State Notetags
 * - Determines the passive condition of the passive state based on switches.
 * - Replace 'x' with the switch ID to determine the state's passive condition.
 * - If 'All' notetag variant is used, conditions will not be met until all
 *   switches are ON. Then, it would be met.
 * - If 'Any' notetag variant is used, conditions will be met if any of the
 *   switches are ON. Otherwise, it would not be met.
 *
 * ---
 *
 * <Passive Condition Switch OFF: x>
 *
 * <Passive Condition All Switches OFF: x,x,x>
 * <Passive Condition Any Switch OFF: x,x,x>
 *
 * - Used for: State Notetags
 * - Determines the passive condition of the passive state based on switches.
 * - Replace 'x' with the switch ID to determine the state's passive condition.
 * - If 'All' notetag variant is used, conditions will not be met until all
 *   switches are OFF. Then, it would be met.
 * - If 'Any' notetag variant is used, conditions will be met if any of the
 *   switches are OFF. Otherwise, it would not be met.
 *
 * ---
 *
 * === JavaScript Notetags: Passive State ===
 *
 * The following is a notetag made for users with JavaScript knowledge to
 * determine if a passive state's condition can be met.
 *
 * ---
 *
 * <JS Passive Condition>
 *  code
 *  code
 *  condition = code;
 * </JS Passive Condition>
 *
 * - Used for: State Notetags
 * - Determines the passive condition of the state based on JavaScript code.
 * - Replace 'code' to determine if a passive state's condition has been met.
 * - The 'condition' variable returns a boolean (true/false) to determine if
 *   the passive state's condition is met or not.
 * - The 'user' variable refers to the user affected by the passive state.
 * - The 'state' variable refers to the passive state being checked.
 * - All other passive conditions must be met for this code to count.
 * 
 * **NOTE** Not everything can be used as a custom JS Passive Condition due to
 * limitations of the code. There are failsafe checks to prevent infinite loops
 * and some passive conditions will not register for this reason and the
 * conditional checks will behave as if the passive states have NOT been
 * applied for this reason. Such examples include the following:
 * 
 * - A passive state that requires another passive state
 * - A passive state that requires a trait effect from another state
 * - A passive state that requires a parameter value altered by another state
 * - A passive state that requires equipment to be worn but its equipment type
 *   access is provided by another state.
 * - Anything else that is similar in style.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Skill Settings
 * ============================================================================
 *
 * These Plugin Parameters adjust various aspects of the game regarding skills
 * from the custom Skill Menu Layout to global custom effects made in code.
 *
 * ---
 *
 * General
 * 
 *   Use Updated Layout:
 *   - Use the Updated Skill Menu Layout provided by this plugin?
 *   - This will automatically enable the Status Window.
 *   - This will override the Core Engine windows settings.
 *
 *   Layout Style:
 *   - If using an updated layout, how do you want to style the menu scene?
 *     - Upper Help, Left Input
 *     - Upper Help, Right Input
 *     - Lower Help, Left Input
 *     - Lower Help, Right Input
 *
 * ---
 *
 * Skill Type Window
 * 
 *   Style:
 *   - How do you wish to draw commands in the Skill Type Window?
 *   - Text Only: Display only the text.
 *   - Icon Only: Display only the icon.
 *   - Icon + Text: Display the icon first, then the text.
 *   - Auto: Determine which is better to use based on the size of the cell.
 * 
 *   Text Align:
 *   - Text alignment for the Skill Type Window.
 *
 * ---
 *
 * List Window
 * 
 *   Columns:
 *   - Number of maximum columns.
 *
 * ---
 *
 * Shop Status Window
 * 
 *   Show in Skill Menu?:
 *   - Show the Shop Status Window in the Skill Menu?
 *   - This is enabled if the Updated Layout is on.
 * 
 *   Adjust List Window?:
 *   - Automatically adjust the Skill List Window in the Skill Menu if using
 *     the Shop Status Window?
 * 
 *   Background Type:
 *   - Select background type for this window.
 *     - 0 - Window
 *     - 1 - Dim
 *     - 2 - Transparent
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this Shop Status Window in the
 *     Skill Menu.
 *
 * ---
 *
 * Skill Types
 * 
 *   Hidden Skill Types:
 *   - Insert the ID's of the Skill Types you want hidden from view ingame.
 * 
 *   Hidden During Battle:
 *   - Insert the ID's of the Skill Types you want hidden during battle only.
 * 
 *   Icon: Normal Type:
 *   - Icon used for normal skill types that aren't assigned any icons.
 *   - To assign icons to skill types, simply insert \I[x] into the
 *     skill type's name in the Database > Types tab.
 * 
 *   Icon: Magic Type:
 *   - Icon used for magic skill types that aren't assigned any icons.
 *   - To assign icons to skill types, simply insert \I[x] into the
 *     skill type's name in the Database > Types tab.
 *
 * ---
 *
 * Global JS Effects
 * 
 *   JS: Skill Conditions:
 *   - JavaScript code for a global-wide skill condition check.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Skill Cost Types
 * ============================================================================
 *
 * Skill Cost Types are the resources that are used for your skills. These can
 * range from the default MP and TP resources to the newly added HP, Gold, and
 * Potion resources.
 *
 * ---
 *
 * Settings
 * 
 *   Name:
 *   - A name for this Skill Cost Type.
 * 
 *   Icon:
 *   - Icon used for this Skill Cost Type.
 *   - Use 0 for no icon.
 * 
 *   Font Color:
 *   - Text Color used to display this cost.
 *   - For a hex color, use #rrggbb with VisuMZ_1_MessageCore
 * 
 *   Font Size:
 *   - Font size used to display this cost.
 *
 * ---
 *
 * Cost Processing
 * 
 *   JS: Cost Calculation:
 *   - Code on how to calculate this resource cost for the skill.
 * 
 *   JS: Can Pay Cost?:
 *   - Code on calculating whether or not the user is able to pay the cost.
 * 
 *   JS: Paying Cost:
 *   - Code for if met, this is the actual process of paying of the cost.
 *
 * ---
 *
 * Window Display
 * 
 *   JS: Show Cost?:
 *   - Code for determining if the cost is shown or not.
 * 
 *   JS: Cost Text:
 *   - Code to determine the text (with Text Code support) used for the
 *     displayed cost.
 *
 * ---
 *
 * Gauge Display
 * 
 *   JS: Maximum Value:
 *   - Code to determine the maximum value used for this Skill Cost resource
 *     for gauges.
 * 
 *   JS: Current Value:
 *   - Code to determine the current value used for this Skill Cost resource
 *     for gauges.
 * 
 *   JS: Draw Gauge:
 *   - Code to determine how to draw the Skill Cost resource for this 
 *     gauge type.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General State Settings
 * ============================================================================
 *
 * These are general settings regarding RPG Maker MZ's state-related aspects
 * from how turns are reapplied to custom code that's ran whenever states are
 * added, erased, or expired.
 *
 * ---
 *
 * General
 * 
 *   Reapply Rules:
 *   - These are the rules when reapplying states.
 *   - Ignore: State doesn't get added.
 *   - Reset: Turns get reset.
 *   - Greater: Turns take greater value (current vs reset).
 *   - Add: Turns add upon existing turns.
 * 
 *   Maximum Turns:
 *   - Maximum number of turns to let states go up to.
 *   - This can be changed with the <Max Turns: x> notetag.
 *
 * ---
 *
 * Turn Display
 * 
 *   Show Turns?:
 *   - Display state turns on top of window icons and sprites?
 * 
 *   Turn Font Size:
 *   - Font size used for displaying turns.
 * 
 *   Offset X:
 *   - Offset the X position of the turn display.
 * 
 *   Offset Y:
 *   - Offset the Y position of the turn display.
 * 
 *   Turn Font Size:
 *   - Font size used for displaying turns.
 * 
 *   Turn Color: Neutral:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Turn Color: Positive:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Turn Color: Negative:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 *
 * ---
 *
 * Data Display
 * 
 *   Show Data?:
 *   - Display state data on top of window icons and sprites?
 * 
 *   Data Font Size:
 *   - Font size used for displaying state data.
 * 
 *   Offset X:
 *   - Offset the X position of the state data display.
 * 
 *   Offset Y:
 *   - Offset the Y position of the state data display.
 *
 * ---
 *
 * Global JS Effects
 * 
 *   JS: On Add State:
 *   - JavaScript code for a global-wide custom effect whenever a state
 *     is added.
 * 
 *   JS: On Erase State:
 *   - JavaScript code for a global-wide custom effect whenever a state
 *     is erased.
 * 
 *   JS: On Expire State:
 *   - JavaScript code for a global-wide custom effect whenever a state
 *     has expired.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Buff/Debuff Settings
 * ============================================================================
 *
 * Buffs and debuffs don't count as states by RPG Maker MZ's mechanics, but
 * they do function close enough for them to be added to this plugin for
 * adjusting. Change these settings to make buffs and debuffs work to your
 * game's needs.
 *
 * ---
 *
 * General
 * 
 *   Reapply Rules:
 *   - These are the rules when reapplying buffs/debuffs.
 *   - Ignore: Buff/Debuff doesn't get added.
 *   - Reset: Turns get reset.
 *   - Greater: Turns take greater value (current vs reset).
 *   - Add: Turns add upon existing turns.
 * 
 *   Maximum Turns:
 *   - Maximum number of turns to let buffs and debuffs go up to.
 *
 * ---
 *
 * Stacking
 * 
 *   Max Stacks: Buff:
 *   - Maximum number of stacks for buffs.
 * 
 *   Max Stacks: Debuff:
 *   - Maximum number of stacks for debuffs.
 * 
 *   JS: Buff/Debuff Rate:
 *   - Code to determine how much buffs and debuffs affect parameters.
 *
 * ---
 *
 * Turn Display
 * 
 *   Show Turns?:
 *   - Display buff and debuff turns on top of window icons and sprites?
 * 
 *   Turn Font Size:
 *   - Font size used for displaying turns.
 * 
 *   Offset X:
 *   - Offset the X position of the turn display.
 * 
 *   Offset Y:
 *   - Offset the Y position of the turn display.
 * 
 *   Turn Color: Buffs:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Turn Color: Debuffs:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 *
 * ---
 *
 * Rate Display
 * 
 *   Show Rate?:
 *   - Display buff and debuff rate on top of window icons and sprites?
 * 
 *   Rate Font Size:
 *   - Font size used for displaying rate.
 * 
 *   Offset X:
 *   - Offset the X position of the rate display.
 * 
 *   Offset Y:
 *   - Offset the Y position of the rate display.
 *
 * ---
 *
 * Global JS Effects
 * 
 *   JS: On Add Buff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     buff is added.
 * 
 *   JS: On Add Debuff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     debuff is added.
 * 
 *   JS: On Erase Buff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     buff is added.
 * 
 *   JS: On Erase Debuff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     debuff is added.
 * 
 *   JS: On Expire Buff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     buff is added.
 * 
 *   JS: On Expire Debuff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     debuff is added.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Passive State Settings
 * ============================================================================
 *
 * These Plugin Parameters adjust passive states that can affect all actors and
 * enemies as well as have global conditions.
 * 
 * ---
 * 
 * For those using the code "a.isStateAffected(10)" to check if a target is
 * affected by a state or not, this does NOT check passive states. This only
 * checks for states that were directly applied to the target.
 * 
 * This is NOT a bug.
 * 
 * Instead, use "a.states().includes($dataStates[10])" to check for them. This
 * code will search for both directly applied states and passive states alike.
 *
 * ---
 * 
 * As passive states are NOT considered directly applied to, they do NOT match
 * a Conditional Branch's state check as well. The Conditional Branch effect
 * checks for an affected state.
 * 
 * ---
 * 
 * Because passive states are NOT directly applied to a battler, the functions
 * of "addNewState", "addState", "eraseState", "removeState" do NOT apply to
 * passive states either. This means that any of the related JS notetags tied
 * to those functions will not occur either.
 * 
 * ---
 * 
 * Why are passive states not considered affected by? Let's look at it
 * differently. There are two ways to grant skills to actors. They can acquire
 * skills by levels/items/events or they can equip gear that temporarily grants
 * the skill in question.
 * 
 * Learning the skill is direct. Temporarily granting the skill is indirect.
 * These two factors have mechanical importance and require differentiation.
 * 
 * Regular states and passive states are the same way. Regular states are
 * directly applied, therefore, need to be distinguished in order for things
 * like state turns and steps, removal conditionals, and similar to matter at
 * all. Passive states are indirect and are therefore, unaffected by state
 * turns, steps, and removal conditions. These mechanical differences are
 * important for how RPG Maker works.
 * 
 * ---
 * 
 * Once again, it is NOT a bug that when using "a.isStateAffected(10)" to
 * check if a target has a passive state will return false.
 * 
 * ---
 *
 * List
 * 
 *   Global Passives:
 *   - A list of passive states to affect actors and enemies.
 * 
 *   Actor-Only Passives:
 *   - A list of passive states to affect actors only.
 * 
 *   Enemy Passives:
 *   - A list of passive states to affect enemies only.
 *
 * ---
 *
 * Global JS Effects
 * 
 *   JS: Condition Check:
 *   - JavaScript code for a global-wide passive condition check.
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
 * - Yanfly
 * - Arisu
 * - Olivia
 * - Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.23: September 17, 2021
 * * Compatibility Update!
 * ** RPG Maker MZ 1.3.3 compatibility.
 * *** Updated how gauges are drawn.
 * *** Skill Cost Types Plugin Parameters need to be updated for those who want
 *     the updated gauges. This can be done easily with the following steps:
 * **** Step 1: Create a new project.
 * **** Step 2: Install Skills and States Core version 1.23 into it.
 * **** Step 3: Copy the Plugin Parameter Settings for "Skill Cost Types".
 * **** Step 4: Return back to your original project.
 * **** Step 5: Paste Plugin Parameter Settings on top of "Skill Cost Types".
 * 
 * Version 1.22: August 6, 2021
 * * Documentation Update!
 * ** "Action End Removal for States" under Major Updates is changed to:
 * *** If your Plugin Parameter settings for "Action End Update" are enabled,
 *     then "Action End" has been updated so that it actually applies per
 *     action used instead of just being at the start of a battler's action
 *     set.
 * *** However, there are side effects to this: if a state has the "Cannot
 *     Move" restriction along with the "Action End" removal timing, then
 *     unsurprisingly, the state will never wear off because it's now based on
 *     actual actions ending. To offset this and remove confusion, "Action End"
 *     auto-removal timings for states with "Cannot Move" restrictions will be
 *     turned into "Turn End" auto-removal timings while the "Action End
 *     Update" is enabled.
 * *** This automatic change won't make it behave like an "Action End" removal
 *     timing would, but it's better than completely softlocking a battler.
 * * Feature Update!
 * ** Those using "Cannot Move" states with "Action End" auto-removal will now
 *    have be automatically converted into "Turn End" auto-removal if the
 *    plugin parameter "Action End Update" is set to true. Update by Irina.
 * 
 * Version 1.21: July 30, 2021
 * * Documentation Update!
 * ** Expanded "Action End Removal for States" section in Major Changes.
 * *** These changes have been in effect since Version 1.07 but have not been
 *     explained in excess detail in the documentation since.
 * **** Action End has been updated so that it actually applies per action used
 *      instead of just being at the start of a battler's action set. However,
 *      there are side effects to this: if a state has the "Cannot Move"
 *      restriction along with the "Action End" removal timing, then
 *      unsurprisingly, the state will never wear off because it's now based on
 *      actual actions ending. There are two solutions to this:
 * **** Don't make "Cannot Move" restriction states with "Action End". This is
 *      not a workaround. This is how the state removal is intended to work
 *      under the new change.
 * **** Go to the Skills & States Core Plugin Parameters, go to State
 *      Setttings, look for "Action End Update", and set it to false. You now
 *      reverted the removal timing system back to how it originally was in RPG
 *      Maker MZ's default battle system where it only updates based on an
 *      action set rather than per actual action ending.
 * 
 * Version 1.20: June 18, 2021
 * * Feature Update!
 * ** Updated automatic caching for conditional passive states to update more
 *    efficiently. Update made by Arisu.
 * 
 * Version 1.19: June 4, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.18: May 21, 2021
 * * Documentation Update
 * ** Added "Passive State Clarification" section.
 * *** As there is a lot of confusion regarding how passive states work and how
 *     people still miss the explanations found in the "Passive State Notetags"
 *     section AND the "Plugin Parameters: Passive State Settings", we are
 *     adding a third section to explain how they work.
 * *** All three sections will contain the full detailed explanation of how
 *     passive states work to clear common misconceptions about them.
 * 
 * Version 1.17: May 7, 2021
 * * Bug Fixes
 * ** State category removal is now usable outside of battle. Fix by Irina.
 * 
 * Version 1.16: April 30, 2021
 * * Bug Fixes!
 * ** When states with step removal have the <No Recover All Clear> or
 *    <No Death Clear> notetags, their step counter is no longer reset either.
 *    Fix made by Irina.
 * * New Features!
 * ** New notetag added by Arisu!
 * *** <List Name: name>
 * **** Makes the name of the skill appear different when show in the skill
 *      list. Using \V[x] as a part of the name will display that variable.
 * 
 * Version 1.15: March 19, 2021
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.14: March 12, 2021
 * * Bug Fixes!
 * ** Max HP Buff/Debuff should now display its turn counter. Fix by Yanfly.
 * * Documentation Update!
 * ** For the <JS Passive Condition>, we've added documentation on the
 *    limitations of passive conditions since they have been reported as bug
 *    reports, when in reality, they are failsafes to prevent infinite loops.
 *    Such limitations include the following:
 * *** A passive state that requires another passive state
 * *** A passive state that requires a trait effect from another state
 * *** A passive state that requires a parameter value altered by another state
 * *** A passive state that requires equipment to be worn but its equipment
 *     type access is provided by another state.
 * *** Anything else that is similar in style.
 * 
 * Version 1.13: February 26, 2021
 * * Documentation Update!
 * ** For <JS type Slip Damage> and <JS type Slip Heal> notetags, added the
 *    following notes:
 * *** When these states are applied via action effects, the slip calculations
 *     are one time calculations made upon applying and the damage is cached to
 *     be used for future on regeneration calculations.
 * *** For that reason, do not include game mechanics here such as adding
 *     states, buffs, debuffs, etc. as this notetag is meant for calculations
 *     only. Use the VisuStella Battle Core's <JS Pre-Regenerate> and
 *     <JS Post-Regenerate> notetags for game mechanics instead.
 * *** Passive states and states with the <JS Slip Refresh> notetag are exempt
 *     from the one time calculation and recalculated each regeneration phase.
 * * Feature Update!
 * ** Changed slip refresh requirements to entail <JS Slip Refresh> notetag for
 *    extra clarity. Update made by Olivia.
 * 
 * Version 1.12: February 19, 2021
 * * Feature Update
 * ** Changed the way passive state infinite stacking as a blanket coverage.
 *    Update made by Olivia.
 * 
 * Version 1.11: February 12, 2021
 * * Bug Fixes!
 * ** Added a check to prevent passive states from infinitely stacking. Fix
 *    made by Olivia.
 * 
 * Version 1.10: January 15, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Parameters added
 * *** Plugin Parameters > Skill Settings > Background Type
 * 
 * Version 1.09: January 1, 2021
 * * Bug Fixes!
 * ** Custom JS TP slip damage and healing should now work properly.
 *    Fix made by Yanfly.
 * 
 * Version 1.08: December 25, 2020
 * * Bug Fixes!
 * ** <JS On Add State> should no longer trigger multiple times for the death
 *    state. Fix made by Yanfly.
 * * Documentation Update!
 * ** Added documentation for updated feature(s)!
 * * Feature Update!
 * ** <No Death Clear> can now allow the affected state to be added to an
 *    already dead battler. Update made by Yanfly.
 * 
 * Version 1.07: December 18, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New notetags added by Yanfly:
 * *** <Passive Condition Multiclass: id>
 * *** <Passive Condition Multiclass: id, id, id>
 * *** <Passive Condition Multiclass: name>
 * *** <Passive Condition Multiclass: name, name, name>
 * ** New Plugin Parameter added by Yanfly.
 * *** Plugin Parameters > States > General > Action End Update
 * **** States with "Action End" auto-removal will also update turns at the end
 *      of each action instead of all actions.
 * ***** Turn this off if you wish for state turn updates to function like they
 *       do by default for "Action End".
 * 
 * Version 1.06: December 4, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.05: November 15, 2020
 * * Bug Fixes!
 * ** The alignment of the Skill Type Window is now fixed and will reflect upon
 *    the default settings. Fix made by Yanfly.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** <State x Category Remove: All> notetag added by Yanfly.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.04: September 27, 2020
 * * Documentation Update
 * ** "Use Updated Layout" plugin parameters now have the added clause:
 *    "This will override the Core Engine windows settings." to reduce
 *    confusion. Added by Irina.
 * 
 * Version 1.03: September 13, 2020
 * * Bug Fixes!
 * ** <JS type Slip Damage> custom notetags now work for passive states. Fix
 *    made by Olivia.
 * ** Setting the Command Window style to "Text Only" will no longer add in
 *    the icon text codes. Bug fixed by Yanfly.
 * 
 * Version 1.02: August 30, 2020
 * * Bug Fixes!
 * ** The JS Notetags for Add, Erase, and Expire states are now fixed. Fix made
 *    by Yanfly.
 * * Documentation Update!
 * ** <Show if learned Skill: x> and <Hide if learned Skill: x> notetags have
 *    the following added to their descriptions:
 * *** This does not apply to skills added by traits on actors, classes, any
 *     equipment, or states. These are not considered learned skills. They are
 *     considered temporary skills.
 * * New Features!
 * ** Notetags added by Yanfly:
 * *** <Show if has Skill: x>
 * *** <Show if have All Skills: x,x,x>
 * *** <Show if have Any Skills: x,x,x>
 * *** <Show if has Skill: name>
 * *** <Show if have All Skills: name, name, name>
 * *** <Show if have Any Skills: name, name, name>
 * *** <Hide if has Skill: x>
 * *** <Hide if have All Skills: x,x,x>
 * *** <Hide if have Any Skills: x,x,x>
 * *** <Hide if has Skill: name>
 * *** <Hide if have All Skills: name, name, name>
 * *** <Hide if have Any Skills: name, name, name>
 * *** These have been added to remove the confusion regarding learned skills
 *     as skills added through trait effects are not considered learned skills
 *     by RPG Maker MZ.
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** Passive states from Elements & Status Menu Core are now functional.
 *    Fix made by Olivia.
 * * Compatibility Update
 * ** Extended functions to allow for better compatibility.
 * * Updated documentation
 * ** Explains that passive states are not directly applied and are therefore
 *    not affected by code such as "a.isStateAffected(10)".
 * ** Instead, use "a.states().includes($dataStates[10])"
 * ** "Use #rrggbb for a hex color." lines now replaced with
 *    "For a hex color, use #rrggbb with VisuMZ_1_MessageCore"
 *
 * Version 1.00: August 20, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param SkillsStatesCore
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Skills:struct
 * @text Skill Settings
 * @type struct<Skills>
 * @desc Adjust general skill settings here.
 * @default {"General":"","EnableLayout:eval":"true","LayoutStyle:str":"upper/left","SkillTypeWindow":"","CmdStyle:str":"auto","CmdTextAlign:str":"left","ListWindow":"","ListWindowCols:num":"1","ShopStatusWindow":"","ShowShopStatus:eval":"true","SkillSceneAdjustSkillList:eval":"true","SkillMenuStatusRect:func":"\"const ww = this.shopStatusWidth();\\nconst wh = this._itemWindow.height;\\nconst wx = Graphics.boxWidth - this.shopStatusWidth();\\nconst wy = this._itemWindow.y;\\nreturn new Rectangle(wx, wy, ww, wh);\"","SkillTypes":"","HiddenSkillTypes:arraynum":"[]","BattleHiddenSkillTypes:arraynum":"[]","IconStypeNorm:num":"78","IconStypeMagic:num":"79","CustomJS":"","SkillConditionJS:func":"\"// Declare Variables\\nconst skill = arguments[0];\\nconst user = this;\\nconst target = this;\\nconst a = this;\\nconst b = this;\\nlet enabled = true;\\n\\n// Perform Checks\\n\\n\\n// Return boolean\\nreturn enabled;\""}
 *
 * @param Costs:arraystruct
 * @text Skill Cost Types
 * @parent Skills:struct
 * @type struct<Cost>[]
 * @desc A list of all the skill cost types added by this plugin
 * and the code that controls them in-game.
 * @default ["{\"Name:str\":\"HP\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"20\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\nif (note.match(/<HP COST:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost += Number(RegExp.$1);\\\\n}\\\\nif (note.match(/<HP COST:[ ](\\\\\\\\d+)([%％])>/i)) {\\\\n    cost += Math.ceil(Number(RegExp.$1) * user.mhp / 100);\\\\n}\\\\nif (note.match(/<JS HP COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS HP COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<HP COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<HP COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<HP COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<HP COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nif (cost <= 0) {\\\\n    return true;\\\\n} else {\\\\n    return user._hp > cost;\\\\n}\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\nuser._hp -= cost;\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = TextManager.hp;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '%1 %2'.format(cost, name);\\\\n\\\\n// Text: Add Icon\\\\nif (icon  > 0) {\\\\n    text += '\\\\\\\\\\\\\\\\I[%1]'.format(icon);\\\\n}\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.mhp;\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.hp;\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Settings\\\\nconst color1 = ColorManager.hpGaugeColor1();\\\\nconst color2 = ColorManager.hpGaugeColor2();\\\\nconst label = TextManager.hpA;\\\\n\\\\n// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\nconst bitmapWidth = sprite.bitmapWidth();\\\\nconst bitmapHeight = sprite.textHeight ? sprite.textHeight() : sprite.bitmapHeight();\\\\nconst gaugeHeight = sprite.gaugeHeight();\\\\n\\\\n// Draw Gauge\\\\nconst gx = 0;\\\\nconst gy = bitmapHeight - gaugeHeight;\\\\nconst gw = bitmapWidth - gx;\\\\nconst gh = gaugeHeight;\\\\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\\\\n\\\\n// Draw Label\\\\nconst lx = 4;\\\\nconst ly = 0;\\\\nconst lw = bitmapWidth;\\\\nconst lh = bitmapHeight;\\\\nsprite.setupLabelFont();\\\\nbitmap.paintOpacity = 255;\\\\nbitmap.drawText(label, lx, ly, lw, lh, \\\\\\\"left\\\\\\\");\\\\n\\\\n// Draw Value\\\\nconst vw = bitmapWidth - 2;\\\\nconst vh = bitmapHeight;\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.hpColor(user);\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"MP\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"23\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\ncost = Math.floor(skill.mpCost * user.mcr);\\\\nif (note.match(/<MP COST:[ ](\\\\\\\\d+)([%％])>/i)) {\\\\n    cost += Math.ceil(Number(RegExp.$1) * user.mmp / 100);\\\\n}\\\\nif (note.match(/<JS MP COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS MP COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<MP COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<MP COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<MP COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<MP COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn user._mp >= cost;\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\nuser._mp -= cost;\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = TextManager.mp;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '%1 %2'.format(cost, name);\\\\n\\\\n// Text: Add Icon\\\\nif (icon  > 0) {\\\\n    text += '\\\\\\\\\\\\\\\\I[%1]'.format(icon);\\\\n}\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.mmp;\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.mp;\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Settings\\\\nconst color1 = ColorManager.mpGaugeColor1();\\\\nconst color2 = ColorManager.mpGaugeColor2();\\\\nconst label = TextManager.mpA;\\\\n\\\\n// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\nconst bitmapWidth = sprite.bitmapWidth();\\\\nconst bitmapHeight = sprite.textHeight ? sprite.textHeight() : sprite.bitmapHeight();\\\\nconst gaugeHeight = sprite.gaugeHeight();\\\\n\\\\n// Draw Gauge\\\\nconst gx = 0;\\\\nconst gy = bitmapHeight - gaugeHeight;\\\\nconst gw = bitmapWidth - gx;\\\\nconst gh = gaugeHeight;\\\\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\\\\n\\\\n// Draw Label\\\\nconst lx = 4;\\\\nconst ly = 0;\\\\nconst lw = bitmapWidth;\\\\nconst lh = bitmapHeight;\\\\nsprite.setupLabelFont();\\\\nbitmap.paintOpacity = 255;\\\\nbitmap.drawText(label, lx, ly, lw, lh, \\\\\\\"left\\\\\\\");\\\\n\\\\n// Draw Value\\\\nconst vw = bitmapWidth - 2;\\\\nconst vh = bitmapHeight;\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.mpColor(user);\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"TP\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"29\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\ncost = skill.tpCost;\\\\nif (note.match(/<TP COST:[ ](\\\\\\\\d+)([%％])>/i)) {\\\\n    cost += Math.ceil(Number(RegExp.$1) * user.maxTp() / 100);\\\\n}\\\\nif (note.match(/<JS TP COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS TP COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<TP COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<TP COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<TP COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<TP COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn user._tp >= cost;\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\nuser._tp -= cost;\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = TextManager.tp;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '%1 %2'.format(cost, name);\\\\n\\\\n// Text: Add Icon\\\\nif (icon  > 0) {\\\\n    text += '\\\\\\\\\\\\\\\\I[%1]'.format(icon);\\\\n}\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.maxTp();\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.tp;\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Settings\\\\nconst color1 = ColorManager.tpGaugeColor1();\\\\nconst color2 = ColorManager.tpGaugeColor2();\\\\nconst label = TextManager.tpA;\\\\n\\\\n// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\nconst bitmapWidth = sprite.bitmapWidth();\\\\nconst bitmapHeight = sprite.textHeight ? sprite.textHeight() : sprite.bitmapHeight();\\\\nconst gaugeHeight = sprite.gaugeHeight();\\\\n\\\\n// Draw Gauge\\\\nconst gx = 0;\\\\nconst gy = bitmapHeight - gaugeHeight;\\\\nconst gw = bitmapWidth - gx;\\\\nconst gh = gaugeHeight;\\\\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\\\\n\\\\n// Draw Label\\\\nconst lx = 4;\\\\nconst ly = 0;\\\\nconst lw = bitmapWidth;\\\\nconst lh = bitmapHeight;\\\\nsprite.setupLabelFont();\\\\nbitmap.paintOpacity = 255;\\\\nbitmap.drawText(label, lx, ly, lw, lh, \\\\\\\"left\\\\\\\");\\\\n\\\\n// Draw Value\\\\nconst vw = bitmapWidth - 2;\\\\nconst vh = bitmapHeight;\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.tpColor(user);\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"Gold\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"17\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\nif (note.match(/<GOLD COST:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost += Number(RegExp.$1);\\\\n}\\\\nif (note.match(/<GOLD COST:[ ](\\\\\\\\d+)([%％])>/i)) {\\\\n    cost += Math.ceil(Number(RegExp.$1) * $gameParty.gold() / 100);\\\\n}\\\\nif (note.match(/<JS GOLD COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS GOLD COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<GOLD COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<GOLD COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<GOLD COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<GOLD COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn $gameParty.gold() >= cost;\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\n$gameParty.loseGold(cost);\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = TextManager.currencyUnit;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '%1 %2'.format(cost, name);\\\\n\\\\n// Text: Add Icon\\\\nif (icon  > 0) {\\\\n    text += '\\\\\\\\\\\\\\\\I[%1]'.format(icon);\\\\n}\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn $gameParty.maxGold();\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn $gameParty.gold();\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\n\\\\n// Draw Label\\\\nconst label = TextManager.currencyUnit;\\\\nconst lx = 4;\\\\nconst ly = 0;\\\\nconst lw = sprite.bitmapWidth();\\\\nconst lh = sprite.bitmapHeight();\\\\nsprite.setupLabelFont();\\\\nbitmap.paintOpacity = 255;\\\\nbitmap.drawText(label, lx, ly, lw, lh, \\\\\\\"left\\\\\\\");\\\\n\\\\n// Draw Value\\\\nconst vw = sprite.bitmapWidth() - 2;\\\\nconst vh = sprite.bitmapHeight();\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.normalColor();\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"Potion\",\"Settings\":\"\",\"Icon:num\":\"176\",\"FontColor:str\":\"0\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\nif (note.match(/<POTION COST:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost += Number(RegExp.$1);\\\\n}\\\\nif (note.match(/<JS POTION COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS POTION COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<POTION COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<POTION COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<POTION COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<POTION COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst item = $dataItems[7];\\\\n\\\\n// Return Boolean\\\\nif (user.isActor() && cost > 0) {\\\\n    return $gameParty.numItems(item) >= cost;\\\\n} else {\\\\n    return true;\\\\n}\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst item = $dataItems[7];\\\\n\\\\n// Process Payment\\\\nif (user.isActor()) {\\\\n    $gameParty.loseItem(item, cost);\\\\n}\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst item = $dataItems[7];\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = settings.Name;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '×%1'.format(cost);\\\\n\\\\n// Text: Add Icon\\\\ntext += '\\\\\\\\\\\\\\\\I[%1]'.format(item.iconIndex);\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst item = $dataItems[7];\\\\n\\\\n// Return value\\\\nreturn $gameParty.maxItems(item);\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst item = $dataItems[7];\\\\n\\\\n// Return value\\\\nreturn $gameParty.numItems(item);\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Settings\\\\nconst color1 = ColorManager.textColor(30);\\\\nconst color2 = ColorManager.textColor(31);\\\\n\\\\n// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst item = $dataItems[7];\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\nconst bitmapWidth = sprite.bitmapWidth();\\\\nconst bitmapHeight = sprite.textHeight ? sprite.textHeight() : sprite.bitmapHeight();\\\\nconst gaugeHeight = sprite.gaugeHeight();\\\\n\\\\n// Draw Gauge\\\\nconst gx = 0;\\\\nconst gy = bitmapHeight - gaugeHeight;\\\\nconst gw = bitmapWidth - gx;\\\\nconst gh = gaugeHeight;\\\\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\\\\n\\\\n// Draw Icon\\\\nconst iconIndex = item.iconIndex;\\\\nconst iconBitmap = ImageManager.loadSystem(\\\\\\\"IconSet\\\\\\\");\\\\nconst pw = ImageManager.iconWidth;\\\\nconst ph = ImageManager.iconHeight;\\\\nconst sx = (iconIndex % 16) * pw;\\\\nconst sy = Math.floor(iconIndex / 16) * ph;\\\\nbitmap.blt(iconBitmap, sx, sy, pw, ph, 0, 0, 24, 24);\\\\n\\\\n// Draw Value\\\\nconst vw = bitmapWidth - 2;\\\\nconst vh = bitmapHeight;\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.normalColor();\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}"]
 *
 * @param BreakSkills
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param States:struct
 * @text State Settings
 * @type struct<States>
 * @desc Adjust general state settings here.
 * @default {"General":"","ReapplyRules:str":"greater","MaxTurns:num":"99","ActionEndUpdate:eval":"true","Turns":"","ShowTurns:eval":"true","TurnFontSize:num":"16","TurnOffsetX:num":"-4","TurnOffsetY:num":"-6","ColorNeutral:str":"0","ColorPositive:str":"24","ColorNegative:str":"27","Data":"","ShowData:eval":"true","DataFontSize:num":"12","DataOffsetX:num":"0","DataOffsetY:num":"8","CustomJS":"","onAddStateJS:func":"\"// Declare Variables\\nconst stateId = arguments[0];\\nconst origin = this.getStateOrigin(stateId);\\nconst state = $dataStates[stateId];\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\"","onEraseStateJS:func":"\"// Declare Variables\\nconst stateId = arguments[0];\\nconst origin = this.getStateOrigin(stateId);\\nconst state = $dataStates[stateId];\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onExpireStateJS:func":"\"// Declare Variables\\nconst stateId = arguments[0];\\nconst origin = this.getStateOrigin(stateId);\\nconst state = $dataStates[stateId];\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\""}
 *
 * @param Buffs:struct
 * @text Buff/Debuff Settings
 * @parent States:struct
 * @type struct<Buffs>
 * @desc Adjust general buff/debuff settings here.
 * @default {"General":"","ReapplyRules:str":"greater","MaxTurns:num":"99","Stacking":"","StackBuffMax:num":"2","StackDebuffMax:num":"2","MultiplierJS:func":"\"// Declare Variables\\nconst user = this;\\nconst paramId = arguments[0];\\nconst buffLevel = arguments[1];\\nlet rate = 1;\\n\\n// Perform Calculations\\nrate += buffLevel * 0.25;\\n\\n// Return Rate\\nreturn Math.max(0, rate);\"","Turns":"","ShowTurns:eval":"true","TurnFontSize:num":"16","TurnOffsetX:num":"-4","TurnOffsetY:num":"-6","ColorBuff:str":"24","ColorDebuff:str":"27","Data":"","ShowData:eval":"false","DataFontSize:num":"12","DataOffsetX:num":"0","DataOffsetY:num":"8","CustomJS":"","onAddBuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onAddDebuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onEraseBuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onEraseDebuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onExpireBuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onExpireDebuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\""}
 *
 * @param PassiveStates:struct
 * @text Passive States
 * @parent States:struct
 * @type struct<PassiveStates>
 * @desc Adjust passive state settings here.
 * @default {"List":"","Global:arraynum":"[]","Actor:arraynum":"[]","Enemy:arraynum":"[]","CustomJS":"","PassiveConditionJS:func":"\"// Declare Variables\\nconst state = arguments[0];\\nconst stateId = state.id;\\nconst user = this;\\nconst target = this;\\nconst a = this;\\nconst b = this;\\nlet condition = true;\\n\\n// Perform Checks\\n\\n\\n// Return boolean\\nreturn condition;\""}
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
 * General Skill Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Skills:
 *
 * @param General
 *
 * @param EnableLayout:eval
 * @text Use Updated Layout
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use the Updated Skill Menu Layout provided by this plugin?
 * This will override the Core Engine windows settings.
 * @default true
 *
 * @param LayoutStyle:str
 * @text Layout Style
 * @parent General
 * @type select
 * @option Upper Help, Left Input
 * @value upper/left
 * @option Upper Help, Right Input
 * @value upper/right
 * @option Lower Help, Left Input
 * @value lower/left
 * @option Lower Help, Right Input
 * @value lower/right
 * @desc If using an updated layout, how do you want to style
 * the menu scene layout?
 * @default upper/left
 *
 * @param SkillTypeWindow
 * @text Skill Type Window
 *
 * @param CmdStyle:str
 * @text Style
 * @parent SkillTypeWindow
 * @type select
 * @option Text Only
 * @value text
 * @option Icon Only
 * @value icon
 * @option Icon + Text
 * @value iconText
 * @option Automatic
 * @value auto
 * @desc How do you wish to draw commands in the Skill Type Window?
 * @default auto
 *
 * @param CmdTextAlign:str
 * @text Text Align
 * @parent SkillTypeWindow
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Text alignment for the Skill Type Window.
 * @default left
 *
 * @param ListWindow
 * @text List Window
 *
 * @param ListWindowCols:num
 * @text Columns
 * @parent ListWindow
 * @type number
 * @min 1
 * @desc Number of maximum columns.
 * @default 1
 *
 * @param ShopStatusWindow
 * @text Shop Status Window
 *
 * @param ShowShopStatus:eval
 * @text Show in Skill Menu?
 * @parent ShopStatusWindow
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show the Shop Status Window in the Skill Menu?
 * This is enabled if the Updated Layout is on.
 * @default true
 *
 * @param SkillSceneAdjustSkillList:eval
 * @text Adjust List Window?
 * @parent ShopStatusWindow
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the Skill List Window in the Skill Menu if using the Shop Status Window?
 * @default true
 *
 * @param SkillSceneStatusBgType:num
 * @text Background Type
 * @parent ShopStatusWindow
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
 * @param SkillMenuStatusRect:func
 * @text JS: X, Y, W, H
 * @parent ShopStatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this Shop Status Window in the Skill Menu.
 * @default "const ww = this.shopStatusWidth();\nconst wh = this._itemWindow.height;\nconst wx = Graphics.boxWidth - this.shopStatusWidth();\nconst wy = this._itemWindow.y;\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param SkillTypes
 * @text Skill Types
 *
 * @param HiddenSkillTypes:arraynum
 * @text Hidden Skill Types
 * @parent SkillTypes
 * @type number[]
 * @min 1
 * @max 99
 * @desc Insert the ID's of the Skill Types you want hidden from view ingame.
 * @default []
 *
 * @param BattleHiddenSkillTypes:arraynum
 * @text Hidden During Battle
 * @parent SkillTypes
 * @type number[]
 * @min 1
 * @max 99
 * @desc Insert the ID's of the Skill Types you want hidden during battle only.
 * @default []
 *
 * @param IconStypeNorm:num
 * @text Icon: Normal Type
 * @parent SkillTypes
 * @desc Icon used for normal skill types that aren't assigned any icons.
 * @default 78
 *
 * @param IconStypeMagic:num
 * @text Icon: Magic Type
 * @parent SkillTypes
 * @desc Icon used for magic skill types that aren't assigned any icons.
 * @default 79
 *
 * @param CustomJS
 * @text Global JS Effects
 *
 * @param SkillConditionJS:func
 * @text JS: Skill Conditions
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide skill condition check.
 * @default "// Declare Variables\nconst skill = arguments[0];\nconst user = this;\nconst target = this;\nconst a = this;\nconst b = this;\nlet enabled = true;\n\n// Perform Checks\n\n\n// Return boolean\nreturn enabled;"
 *
 */
/* ----------------------------------------------------------------------------
 * Skill Cost Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Cost:
 *
 * @param Name:str
 * @text Name
 * @desc A name for this Skill Cost Type.
 * @default Untitled
 *
 * @param Settings
 *
 * @param Icon:num
 * @text Icon
 * @parent Settings
 * @desc Icon used for this Skill Cost Type.
 * Use 0 for no icon.
 * @default 0
 *
 * @param FontColor:str
 * @text Font Color
 * @parent Settings
 * @desc Text Color used to display this cost.
 * For a hex color, use #rrggbb with VisuMZ_1_MessageCore
 * @default 0
 *
 * @param FontSize:num
 * @text Font Size
 * @parent Settings
 * @type number
 * @min 1
 * @desc Font size used to display this cost.
 * @default 22
 *
 * @param Cost
 * @text Cost Processing
 *
 * @param CalcJS:func
 * @text JS: Cost Calculation
 * @parent Cost
 * @type note
 * @desc Code on how to calculate this resource cost for the skill.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nlet cost = 0;\n\n// Return cost value\nreturn Math.round(Math.max(0, cost));"
 *
 * @param CanPayJS:func
 * @text JS: Can Pay Cost?
 * @parent Cost
 * @type note
 * @desc Code on calculating whether or not the user is able to pay the cost.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nconst cost = arguments[1];\n\n// Return Boolean\nreturn true;"
 *
 * @param PayJS:func
 * @text JS: Paying Cost
 * @parent Cost
 * @type note
 * @desc Code for if met, this is the actual process of paying of the cost.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nconst cost = arguments[1];\n\n// Process Payment\n"
 *
 * @param Windows
 * @text Window Display
 *
 * @param ShowJS:func
 * @text JS: Show Cost?
 * @parent  Windows
 * @type note
 * @desc Code for determining if the cost is shown or not.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nconst cost = arguments[1];\n\n// Return Boolean\nreturn cost > 0;"
 *
 * @param TextJS:func
 * @text JS: Cost Text
 * @parent  Windows
 * @type note
 * @desc Code to determine the text (with Text Code support) used for the displayed cost.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nconst cost = arguments[1];\nconst settings = arguments[2];\nconst fontSize = settings.FontSize;\nconst color = settings.FontColor;\nconst name = settings.Name;\nconst icon = settings.Icon;\nlet text = '';\n\n// Text: Change Font Size\ntext += '\\\\FS[%1]'.format(fontSize);\n\n// Text: Add Color\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\n    text += '\\\\HexColor<#%1>'.format(String(RegExp.$1));\n} else {\n    text += '\\\\C[%1]'.format(color);\n}\n\n// Text: Add Cost\ntext += '%1 %2'.format(cost, name);\n\n// Text: Add Icon\nif (icon  > 0) {\n    text += '\\\\I[%1]'.format(icon);\n}\n\n// Return text\nreturn text;"
 *
 * @param Gauges
 * @text Gauge Display
 *
 * @param GaugeMaxJS:func
 * @text JS: Maximum Value
 * @parent  Gauges
 * @type note
 * @desc Code to determine the maximum value used for this Skill Cost resource for gauges.
 * @default "// Declare Variables\nconst user = this;\n\n// Return value\nreturn 0;"
 *
 * @param GaugeCurrentJS:func
 * @text JS: Current Value
 * @parent  Gauges
 * @type note
 * @desc Code to determine the current value used for this Skill Cost resource for gauges.
 * @default "// Declare Variables\nconst user = this;\n\n// Return value\nreturn 0;"
 *
 * @param GaugeDrawJS:func
 * @text JS: Draw Gauge
 * @parent  Gauges
 * @type note
 * @desc Code to determine how to draw the Skill Cost resource for this gauge type.
 * @default "// Declare Variables\nconst sprite = this;\nconst settings = sprite._costSettings;\nconst bitmap = sprite.bitmap;\nconst user = sprite._battler;\nconst currentValue = sprite.currentDisplayedValue();\n\n// Draw Gauge\nconst color1 = ColorManager.textColor(30);\nconst color2 = ColorManager.textColor(31);\nconst gx = 0;\nconst gy = sprite.bitmapHeight() - sprite.gaugeHeight();\nconst gw = sprite.bitmapWidth() - gx;\nconst gh = sprite.gaugeHeight();\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\n\n// Draw Label\nconst label = settings.Name;\nconst lx = 4;\nconst ly = 0;\nconst lw = sprite.bitmapWidth();\nconst lh = sprite.bitmapHeight();\nsprite.setupLabelFont();\nbitmap.paintOpacity = 255;\nbitmap.drawText(label, lx, ly, lw, lh, \"left\");\n\n// Draw Value\nconst vw = sprite.bitmapWidth() - 2;\nconst vh = sprite.bitmapHeight();\nsprite.setupValueFont();\nbitmap.textColor = ColorManager.normalColor();\nbitmap.drawText(currentValue, 0, 0, vw, vh, \"right\");"
 *
 */
/* ----------------------------------------------------------------------------
 * General State Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~States:
 *
 * @param General
 *
 * @param ReapplyRules:str
 * @text Reapply Rules
 * @parent General
 * @type select
 * @option Ignore: State doesn't get added.
 * @value ignore
 * @option Reset: Turns get reset.
 * @value reset
 * @option Greater: Turns take greater value (current vs reset).
 * @value greater
 * @option Add: Turns add upon existing turns.
 * @value add
 * @desc These are the rules when reapplying states.
 * @default greater
 *
 * @param MaxTurns:num
 * @text Maximum Turns
 * @parent General
 * @type number
 * @min 1
 * @desc Maximum number of turns to let states go up to.
 * This can be changed with the <Max Turns: x> notetag.
 * @default 9999
 *
 * @param ActionEndUpdate:eval
 * @text Action End Update
 * @parent General
 * @type boolean
 * @on Update Each Action
 * @off Don't Change
 * @desc States with "Action End" auto-removal will also update
 * turns at the end of each action instead of all actions.
 * @default true
 *
 * @param Turns
 * @text Turn Display
 *
 * @param ShowTurns:eval
 * @text Show Turns?
 * @parent Turns
 * @type boolean
 * @on Display
 * @off Hide
 * @desc Display state turns on top of window icons and sprites?
 * @default true
 *
 * @param TurnFontSize:num
 * @text Turn Font Size
 * @parent Turns
 * @type number
 * @min 1
 * @desc Font size used for displaying turns.
 * @default 16
 *
 * @param TurnOffsetX:num
 * @text Offset X
 * @parent Turns
 * @desc Offset the X position of the turn display.
 * @default -4
 *
 * @param TurnOffsetY:num
 * @text Offset Y
 * @parent Turns
 * @desc Offset the Y position of the turn display.
 * @default -6
 *
 * @param TurnFontSize:num
 * @text Turn Font Size
 * @parent Turns
 * @desc Font size used for displaying turns.
 * @default 16
 *
 * @param ColorNeutral:str
 * @text Turn Color: Neutral
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param ColorPositive:str
 * @text Turn Color: Positive
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 24
 *
 * @param ColorNegative:str
 * @text Turn Color: Negative
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 27
 *
 * @param Data
 * @text Data Display
 *
 * @param ShowData:eval
 * @text Show Data?
 * @parent Data
 * @type boolean
 * @on Display
 * @off Hide
 * @desc Display state data on top of window icons and sprites?
 * @default true
 *
 * @param DataFontSize:num
 * @text Data Font Size
 * @parent Data
 * @type number
 * @min 1
 * @desc Font size used for displaying state data.
 * @default 12
 *
 * @param DataOffsetX:num
 * @text Offset X
 * @parent Data
 * @desc Offset the X position of the state data display.
 * @default 0
 *
 * @param DataOffsetY:num
 * @text Offset Y
 * @parent Data
 * @desc Offset the Y position of the state data display.
 * @default 8
 *
 * @param CustomJS
 * @text Global JS Effects
 *
 * @param onAddStateJS:func
 * @text JS: On Add State
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * state is added.
 * @default "// Declare Variables\nconst stateId = arguments[0];\nconst origin = this.getStateOrigin(stateId);\nconst state = $dataStates[stateId];\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onEraseStateJS:func
 * @text JS: On Erase State
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * state is erased.
 * @default "// Declare Variables\nconst stateId = arguments[0];\nconst origin = this.getStateOrigin(stateId);\nconst state = $dataStates[stateId];\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onExpireStateJS:func
 * @text JS: On Expire State
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * state has expired.
 * @default "// Declare Variables\nconst stateId = arguments[0];\nconst origin = this.getStateOrigin(stateId);\nconst state = $dataStates[stateId];\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * General Buff/Debuff Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Buffs:
 *
 * @param General
 *
 * @param ReapplyRules:str
 * @text Reapply Rules
 * @parent General
 * @type select
 * @option Ignore: Buff/Debuff doesn't get added.
 * @value ignore
 * @option Reset: Turns get reset.
 * @value reset
 * @option Greater: Turns take greater value (current vs reset).
 * @value greater
 * @option Add: Turns add upon existing turns.
 * @value add
 * @desc These are the rules when reapplying buffs/debuffs.
 * @default greater
 *
 * @param MaxTurns:num
 * @text Maximum Turns
 * @parent General
 * @type number
 * @min 1
 * @desc Maximum number of turns to let buffs and debuffs go up to.
 * @default 9999
 *
 * @param Stacking
 *
 * @param StackBuffMax:num
 * @text Max Stacks: Buff
 * @parent Stacking
 * @type number
 * @min 1
 * @desc Maximum number of stacks for buffs.
 * @default 2
 *
 * @param StackDebuffMax:num
 * @text Max Stacks: Debuff
 * @parent Stacking
 * @type number
 * @min 1
 * @desc Maximum number of stacks for debuffs.
 * @default 2
 *
 * @param MultiplierJS:func
 * @text JS: Buff/Debuff Rate
 * @parent Stacking
 * @type note
 * @desc Code to determine how much buffs and debuffs affect parameters.
 * @default "// Declare Variables\nconst user = this;\nconst paramId = arguments[0];\nconst buffLevel = arguments[1];\nlet rate = 1;\n\n// Perform Calculations\nrate += buffLevel * 0.25;\n\n// Return Rate\nreturn Math.max(0, rate);"
 *
 * @param Turns
 * @text Turns Display
 *
 * @param ShowTurns:eval
 * @text Show Turns?
 * @parent Turns
 * @type boolean
 * @on Display
 * @off Hide
 * @desc Display buff and debuff turns on top of window icons and sprites?
 * @default true
 *
 * @param TurnFontSize:num
 * @text Turn Font Size
 * @parent Turns
 * @type number
 * @min 1
 * @desc Font size used for displaying turns.
 * @default 16
 *
 * @param TurnOffsetX:num
 * @text Offset X
 * @parent Turns
 * @desc Offset the X position of the turn display.
 * @default -4
 *
 * @param TurnOffsetY:num
 * @text Offset Y
 * @parent Turns
 * @desc Offset the Y position of the turn display.
 * @default -6
 *
 * @param ColorBuff:str
 * @text Turn Color: Buffs
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 24
 *
 * @param ColorDebuff:str
 * @text Turn Color: Debuffs
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 27
 *
 * @param Data
 * @text Rate Display
 *
 * @param ShowData:eval
 * @text Show Rate?
 * @parent Data
 * @type boolean
 * @on Display
 * @off Hide
 * @desc Display buff and debuff rate on top of window icons and sprites?
 * @default false
 *
 * @param DataFontSize:num
 * @text Rate Font Size
 * @parent Data
 * @type number
 * @min 1
 * @desc Font size used for displaying rate.
 * @default 12
 *
 * @param DataOffsetX:num
 * @text Offset X
 * @parent Data
 * @desc Offset the X position of the rate display.
 * @default 0
 *
 * @param DataOffsetY:num
 * @text Offset Y
 * @parent Data
 * @desc Offset the Y position of the rate display.
 * @default 8
 *
 * @param CustomJS
 * @text Global JS Effects
 *
 * @param onAddBuffJS:func
 * @text JS: On Add Buff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * buff is added.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onAddDebuffJS:func
 * @text JS: On Add Debuff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * debuff is added.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onEraseBuffJS:func
 * @text JS: On Erase Buff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * buff is erased.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onEraseDebuffJS:func
 * @text JS: On Erase Debuff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * debuff is erased.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onExpireBuffJS:func
 * @text JS: On Expire Buff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * buff has expired.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onExpireDebuffJS:func
 * @text JS: On Expire Debuff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * debuff has expired.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * Passive State Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~PassiveStates:
 *
 * @param List
 *
 * @param Global:arraynum
 * @text Global Passives
 * @parent List
 * @type state[]
 * @desc A list of passive states to affect actors and enemies.
 * @default []
 *
 * @param Actor:arraynum
 * @text Actor-Only Passives
 * @parent List
 * @type state[]
 * @desc A list of passive states to affect actors only.
 * @default []
 *
 * @param Enemy:arraynum
 * @text Enemy Passives
 * @parent List
 * @type state[]
 * @desc A list of passive states to affect enemies only.
 * @default []
 *
 * @param CustomJS
 * @text Global JS Effects
 *
 * @param PassiveConditionJS:func
 * @text JS: Condition Check
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide passive condition check.
 * @default "// Declare Variables\nconst state = arguments[0];\nconst stateId = state.id;\nconst user = this;\nconst target = this;\nconst a = this;\nconst b = this;\nlet condition = true;\n\n// Perform Checks\n\n\n// Return boolean\nreturn condition;"
 *
 */
//=============================================================================

const _0x3f4870=_0x5aca;function _0x5aca(_0x1e0e1d,_0x482d15){const _0x317454=_0x3174();return _0x5aca=function(_0x5aca20,_0x5a6e3e){_0x5aca20=_0x5aca20-0xe1;let _0x494007=_0x317454[_0x5aca20];return _0x494007;},_0x5aca(_0x1e0e1d,_0x482d15);}function _0x3174(){const _0x2bdfaa=['setStateData','itemAt','eraseBuff','addState','BjHcp','_checkingTraitsSetSkillsStatesCore','Game_BattlerBase_recoverAll','max','RHePl','traitsSet','getCurrentStateActiveUser','hgEWm','gainHp','add','clear','_colorCache','_categoryWindow','JehoX','onAddDebuffGlobalJS','Scene_Skill_skillTypeWindowRect','Parse_Notetags_Skill_Cost','return\x200','isPassiveStateStackable','Window_SkillList_setActor','LfbmG','increaseBuff','_actor','currentDisplayedValue','isDebuffAffected','removeBuff','multiclasses','Game_BattlerBase_decreaseBuff','isPlaytest','eNIRT','onEraseStateJS','Game_BattlerBase_resetStateCounts','actorId','process_VisuMZ_SkillsStatesCore_State_Notetags','updateCommandNameWindow','rESnn','shift','setBackgroundType','jXuOf','ARRAYFUNC','IconStypeNorm','slipHp','createPassiveStatesCache','meetsSkillConditions','gainMp','YjSJo','hHJdl','allowCreateShopStatusWindow','onExpireBuff','drawActorBuffRates','nupGR','Game_BattlerBase_die','Window_SkillList_includes','QVZiQ','knjyc','WGqMF','Scene_Skill_statusWindowRect','_tempActor','onDatabaseLoaded','redraw','CmdTextAlign','VXlwz','_buffTurns','onEraseBuff','call','mainAreaTop','hKXlf','Game_BattlerBase_eraseBuff','isPartyAllAffectedByGroupDefeatStates','States','drawSkillCost','AGI','floor','ylYbb','ISXdu','setStypeId','auto','state','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','removeStatesAuto','colSpacing','isStateCategoryResisted','initialize','drawExtendedSkillsStatesCoreStatus','onEraseStateCustomJS','addPassiveStatesByPluginParameters','fontFace','setActor','onExpireStateCustomJS','concat','4319062iawRPW','pNmbX','refresh','POSITIVE','push','Xhppp','applyStateTurnManipulationEffects','232750IkbNPL','innerWidth','drawItemStyleIcon','MDF','Skills','cXkce','_stypeIDs','addDebuffTurns','toLowerCase','pGREY','_hidden','shopStatusWindowRect','trim','isUseModernControls','_checkingPassiveStates','indexOf','format','cnZMF','gMvsV','value','convertGaugeTypeSkillsStatesCore','innerHeight','Game_Action_applyItemUserEffect','checkShowHideNotetags','Glqmx','removeState','bitmap','onExpireBuffGlobalJS','kaOna','Game_Troop_setup','makeAdditionalSkillCostText','_checkingVisuMzPassiveStateObjects','initMembers','stateMaximumTurns','_currentActor','UbhJa','ColorNegative','makeResistedStateCategories','DisplayedParams','skillCostSeparator','skillTpCost','iKtLl','addChild','ZBqoN','Window_SkillList_drawItem','slice','eraseState','clearStateRetainType','setPassiveStateSlipDamageJS','MBuRE','ARRAYSTR','TurnOffsetX','drawParamText','statusWidth','helpAreaHeight','meetsPassiveStateConditionJS','EnableLayout','Game_BattlerBase_buffIconIndex','NEGATIVE','isGroupDefeatStateAffected','_scene','Global','includesSkillsStatesCore','paramBuffRate','bxjiu','%1\x20%2\x20%3','outlineColor','onExpireDebuff','drawItemStyleIconText','dsUyl','active','_stateData','PuZmY','forgetSkill','vllBL','tWsWp','IZzML','paramValueByName','updateStateTurns','tSkfO','_stateTurns','checkShowHideSkillNotetags','statusWindowRectSkillsStatesCore','_stateOrigin','statePassiveConditionJS','skillEnableJS','addPassiveStatesTraitSets','commandNameWindowCenter','TurnFontSize','decreaseBuff','2418zAkAvd','changeOutlineColor','ShowData','SkillConditionJS','CFgPJ','yCDaY','_lastStatesActionEndFrameCount','fillRect','CalcJS','ZXhTd','lineHeight','EVAL','Scene_Skill_itemWindowRect','CheckIncompatibleStates','meetsPassiveStateConditionSwitches','currentValueSkillsStatesCore','LAhvM','isAllDead','dcqYk','sort','IpaCC','XElvV','saKxw','prototype','exQGt','Game_BattlerBase_states','stateEraseJS','setStateTurns','clearStateDisplay','STRUCT','placeGauge','vODJw','_skillIDs','RMWbP','_itemWindow','note','getStypeIdWithName','_buffs','Sprite_Gauge_currentValue','Window_StatusBase_placeGauge','Window_SkillList_updateHelp','Game_Battler_addState','pMqef','QzvQc','constructor','hasSkill','UAECH','188960kKeSDd','recoverAll','CanPayJS','_stateMaxTurns','MAXMP','center','ConvertParams','Scene_Boot_onDatabaseLoaded','ParseStateNotetags','_stateSteps','uiHelpPosition','statesByCategory','jpuyt','HXFUq','OrROA','aTfWn','FWAeB','QWfOe','PJICW','heal','oUopv','autoRemovalTiming','riFvV','#%1','PEVcb','keys','abmZc','uHzWo','27ovXHST','\x5cI[%1]%2','jxFzN','isBuffPrevented','ColorBuff','currentMaxValue','gaugeRate','3sTInCx','onExpireState','LUK','createItemWindow','map','setItem','TurnOffsetY','isStateAddable','Sprite_Gauge_currentMaxValue','xptoi','kUYdW','textSizeEx','Game_BattlerBase_increaseBuff','drawTextEx','tmTEK','meetsSkillConditionsGlobalJS','onAddStateCustomJS','buffColor','onExpireBuffJS','hasStateCategory','isCommandEnabled','IiJIb','commandStyle','1190UmXQkY','onEraseStateGlobalJS','learnSkill','QaMWn','ShowJS','width','convertTargetToStateOriginKey','Parse_Notetags_State_ApplyRemoveLeaveJS','lYIKX','_skills','veCCF','name','xCuNv','ATK','hasState','stateId','ActionEndUpdate','Costs','<actor-%1>','hide','addPassiveStatesByNotetag','dmMQB','Name','applySkillsStatesCoreEffects','updateFrame','success','stateTpSlipHealJS','passiveStates','actions','skillVisibleJS','getStateOrigin','FsPvH','fKaUh','makeSuccess','onExpireStateJS','kisSc','updatedLayoutStyle','MhZKB','TmUsu','lsmYo','Sprite_Gauge_setup','iconWidth','cZzAQ','status','kkMWM','replace','getStateOriginByKey','WVDAd','onExpireDebuffGlobalJS','Parse_Notetags_State_Category','untitled','Game_BattlerBase_overwriteBuffTurns','isStateAffected','meetsPassiveStateConditions','states','Window_SkillStatus_refresh','clearStatesWithStateRetain','VisuMZ_2_ClassChangeSystem','cOWky','onEraseBuffJS','VzeGo','TzHTW','applyBuffTurnManipulationEffects','PNNyL','VisuMZ_1_MainMenuCore','recover\x20all','Game_BattlerBase_skillMpCost','isStateCategoryAffected','oyfVZ','UHdZO','checkSkillTypeMatch','BattleHiddenSkillTypes','getCurrentTroopUniqueID','StackBuffMax','vohxD','right','_currentTroopUniqueID','recalculateSlipDamageJS','isStateResist','tcFCa','iconIndex','Buffs','ParseClassIDs','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20visible\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20visible;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','resetTextColor','isLearnedSkill','stateHpSlipDamageJS','meetsPassiveStateGlobalConditionJS','PayJS','VisuMZ_1_ItemsEquipsCore','onEraseDebuffGlobalJS','addBuff','JcRCH','makeCommandName','VisuMZ_1_ElementStatusCore','buttonAssistSwitch','_classIDs','gaugeLineHeight','mfWGs','Game_BattlerBase_meetsSkillConditions','ahrWy','sYegs','itemTextAlign','rACnb','isStateRestrict','placeExactGauge','helpWindowRectSkillsStatesCore','onAddState','QoYRC','isRightInputMode','windowPadding','height','fThPE','stateTurns','clearStateData','GaugeCurrentJS','ShowShopStatus','RQZdG','NUM','currentValue','stateData','53264oSzEXJ','BnMSF','anchor','onExpireDebuffJS','commandStyleCheck','exit','noINg','kVOWK','textColor','<enemy-%1>','_stored_buffColor','ReapplyRules','removeStatesByCategory','log','_skillTypeWindow','dKRPj','drawIcon','_commandNameWindow','meetsSkillConditionsEnableJS','setStateOrigin','itemWindowRect','regenerateAll','1019175Kwmici','actor','hEhdD','Qfmhs','getCurrentStateOriginKey','onEraseDebuffJS','Game_Battler_addBuff','HEIHv','Settings','description','death','_tempBattler','OCkht','priority','setStatusWindow','testSkillStatesCoreNotetags','changeTextColor','checkCacheKey','GeXHk','skillMpCost','DataFontSize','ceil','_stateDisplay','tugIP','skillTypeWindowRect','getColor','stateMpSlipDamageJS','drawActorIconsAllTurnCounters','makeCurrentTroopUniqueID','redrawSkillsStatesCore','addPassiveStatesFromOtherPlugins','uiMenuStyle','setDebuffTurns','QEBWK','drawActorStateTurns','ColorDebuff','addStateTurns','setupSkillsStatesCore','currentClass','checkSkillConditionsSwitchNotetags','hzDtM','IICst','_stateIDs','iconHeight','createAllSkillCostText','canPaySkillCost','bfykp','fYBay','match','buff','pbSCK','_passiveStateResults','BvkKa','isBottomHelpMode','MnWkt','Game_Action_testApply','DEF','_cache','clamp','iJyve','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','resetStateCounts','jiDXS','drawActorBuffTurns','_stateRetainType','GroupDigits','%1%','ShowTurns','ouDEZ','initMembersSkillsStatesCore','SkillsStatesCore','convertPassiveStates','iconText','test','Actor','MAT','totalStateCategoryAffected','Window_SkillType_initialize','ExjjV','maxItems','skills','applyStateCategoryRemovalEffects','onAddDebuffJS','Game_Actor_forgetSkill','_shopStatusWindow','hcJof','testApply','getColorDataFromPluginParameters','loadBitmap','meetsPassiveStateConditionClasses','PoMOE','contents','damage','TAase','VisuMZ_0_CoreEngine','slipTp','helpAreaTop','421hTeNol','helpWindowRect','buffTurns','vQNzK','Parse_Notetags_Skill_JS','svwbv','SXBgU','GaugeDrawJS','mainFontFace','drawActorIcons','QDnuM','toUpperCase','die','statusWindowRect','FUNC','nsPqB','menuActor','skillTypes','applyDebuffTurnManipulationEffects','checkShowHideSwitchNotetags','wEFwn','canUse','groupDefeat','removeStatesByCategoryAll','parse','_turnDisplaySprite','bRsLC','drawActorStateData','drawExtendedParameter','addCommand','clearStateOrigin','ShnuJ','isSkillUsableForAutoBattle','getStateRetainType','ParseSkillNotetags','drawFullGauge','buffLength','reset','_costSettings','parameters','98DKPVfc','otdQh','UfPrV','PassiveStates','normalColor','itemWindowRectSkillsStatesCore','applyItemUserEffect','meetsStateCondition','drawText','createSkillCostText','addWindow','shopStatusWidth','createCommandNameWindow','process_VisuMZ_SkillsStatesCore_Skill_Notetags','frameCount','adjustItemWidthByShopStatus','\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20origin\x20=\x20this.getStateOrigin(stateId);\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20state\x20=\x20$dataStates[stateId];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this.getCurrentStateActiveUser();\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20origin;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20','members','Parse_Notetags_State_SlipEffectJS','createTurnDisplaySprite','paySkillCost','QpjVB','makeCommandList','stateTpSlipDamageJS','categories','shopStatusWindowRectSkillsStatesCore','skillId','Scene_Skill_helpWindowRect','_statusWindow','updateStatesActionEnd','fDojr','WUYLz','getStateDisplay','addPassiveStates','TextJS','Game_BattlerBase_refresh','gainSilentTp','Game_Battler_isStateAddable','ARRAYEVAL','vVVTd','skill','round','nziUF','YgSMG','isActor','XvfqS','callUpdateHelp','getStateData','_phase','retrieveStateColor','inBattle','LcVRu','QIKeg','ColorNeutral','yIDHo','ListWindowCols','maumw','WJVRn','addDebuff','getSkillIdWithName','Game_BattlerBase_traitsSet','user','debuffColor','boxWidth','length','isStateRemoved','Window_SkillList_maxCols','updateTurnDisplaySprite','OXaPA','scrollTo','onAddBuff','ARRAYNUM','stypeId','Scene_Skill_createItemWindow','updateHelp','number','greater','itemLineRect','text','onEraseDebuff','iibTA','jtTcj','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20enabled\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20enabled;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','mainAreaHeight','tpCost','Sprite_Gauge_initMembers','MultiplierJS','DataOffsetX','isStateExpired','Game_BattlerBase_isStateResist','CoreEngine','stateMpSlipHealJS','canClearState','opQmJ','isAlive','stateAddJS','HWlqM','BattleManager_endAction','Game_BattlerBase_initMembers','split','Game_Actor_learnSkill','overwriteBuffTurns','endAction','_states','buffIconIndex','isSkillCostShown','Window_StatusBase_drawActorIcons','LRhdi','createShopStatusWindow','CIHNS','mISwy','changePaintOpacity','uiInputPosition','vrYIu','onAddStateJS','onAddDebuff','item','getSkillTypes','HiddenSkillTypes','Game_Actor_skillTypes','getClassIdWithName','slipMp','Enemy','alterSkillName','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','stateCategoriesResisted','includes','DataOffsetY','RtkYK','GaugeMaxJS','oskVh','MAXHP','onEraseBuffGlobalJS','maxSlipDamage','rFQkn','daQkG','onRegenerateCustomStateDamageOverTime','totalStateCategory','onAddBuffJS','fontBold','filter','_stypeId','drawItem','PassiveConditionJS','isUseSkillsStatesCoreUpdatedLayout','isMaxBuffAffected','emIuu','stateExpireJS','<troop-%1>','onRemoveState','checkSkillConditionsNotetags','mainCommandWidth','uNIYn','skillTypeWindowRectSkillsStatesCore','getStateIdWithName','ACRCI','currentMaxValueSkillsStatesCore','IconStypeMagic','SkillSceneAdjustSkillList','Game_BattlerBase_clearStates','MaxTurns','ejNEI','Game_BattlerBase_skillTpCost','resetFontSettings','STR','_stored_state-%1-color','commandNameWindowDrawBackground','maxCols','Sprite_StateIcon_loadBitmap','rgba(0,\x200,\x200,\x201)','useDigitGrouping','stateColor','Game_Battler_regenerateAll','Param','Game_Battler_addDebuff','RzFht','_subject','equips','PWNTm','onAddStateMakeCustomSlipValues','Parse_Notetags_State_PassiveJS','_battler','setup','hVexg','EUIqM','onAddStateGlobalJS','commandName','removeBuffsAuto','enemy','icon','getStateReapplyRulings','index','checkShowHideJS','fontSize','updateVisibility','clearStates','commandNameWindowDrawText','addBuffTurns','version','gradientFillRect','mainFontSize','stateHpSlipHealJS','Sprite_Gauge_gaugeRate','onExpireStateGlobalJS','passiveStateObjects','setBuffTurns','_result','wJIza','buttonAssistText1','McLdr','aliveMembers'];_0x3174=function(){return _0x2bdfaa;};return _0x3174();}(function(_0x1b45c8,_0x24b653){const _0x24c49d=_0x5aca,_0x1b977c=_0x1b45c8();while(!![]){try{const _0xe3b7d6=parseInt(_0x24c49d(0x175))/0x1*(parseInt(_0x24c49d(0x19d))/0x2)+parseInt(_0x24c49d(0x381))/0x3*(parseInt(_0x24c49d(0x35e))/0x4)+-parseInt(_0x24c49d(0x114))/0x5+-parseInt(_0x24c49d(0x32f))/0x6*(parseInt(_0x24c49d(0x398))/0x7)+parseInt(_0x24c49d(0xfe))/0x8+-parseInt(_0x24c49d(0x37a))/0x9*(parseInt(_0x24c49d(0x2d5))/0xa)+parseInt(_0x24c49d(0x2ce))/0xb;if(_0xe3b7d6===_0x24b653)break;else _0x1b977c['push'](_0x1b977c['shift']());}catch(_0xdae2c7){_0x1b977c['push'](_0x1b977c['shift']());}}}(_0x3174,0x1e847));var label=_0x3f4870(0x15a),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x3f4870(0x229)](function(_0x4f6a0b){const _0x38df29=_0x3f4870;return _0x4f6a0b[_0x38df29(0x3c3)]&&_0x4f6a0b[_0x38df29(0x11d)][_0x38df29(0x21b)]('['+label+']');})[0x0];VisuMZ[label][_0x3f4870(0x11c)]=VisuMZ[label][_0x3f4870(0x11c)]||{},VisuMZ[_0x3f4870(0x364)]=function(_0x3958ba,_0x490d8c){const _0x5aedd7=_0x3f4870;for(const _0x3ea909 in _0x490d8c){if(_0x3ea909[_0x5aedd7(0x144)](/(.*):(.*)/i)){const _0x156fe9=String(RegExp['$1']),_0x274a2f=String(RegExp['$2'])[_0x5aedd7(0x180)]()[_0x5aedd7(0x2e1)]();let _0x3e443e,_0x359194,_0x3e5e7e;switch(_0x274a2f){case _0x5aedd7(0xfb):_0x3e443e=_0x490d8c[_0x3ea909]!==''?Number(_0x490d8c[_0x3ea909]):0x0;break;case _0x5aedd7(0x1e4):_0x359194=_0x490d8c[_0x3ea909]!==''?JSON['parse'](_0x490d8c[_0x3ea909]):[],_0x3e443e=_0x359194['map'](_0x45e154=>Number(_0x45e154));break;case _0x5aedd7(0x33a):_0x3e443e=_0x490d8c[_0x3ea909]!==''?eval(_0x490d8c[_0x3ea909]):null;break;case _0x5aedd7(0x1c3):_0x359194=_0x490d8c[_0x3ea909]!==''?JSON[_0x5aedd7(0x18d)](_0x490d8c[_0x3ea909]):[],_0x3e443e=_0x359194[_0x5aedd7(0x385)](_0x46c450=>eval(_0x46c450));break;case'JSON':_0x3e443e=_0x490d8c[_0x3ea909]!==''?JSON[_0x5aedd7(0x18d)](_0x490d8c[_0x3ea909]):'';break;case'ARRAYJSON':_0x359194=_0x490d8c[_0x3ea909]!==''?JSON[_0x5aedd7(0x18d)](_0x490d8c[_0x3ea909]):[],_0x3e443e=_0x359194[_0x5aedd7(0x385)](_0x18d0e5=>JSON['parse'](_0x18d0e5));break;case _0x5aedd7(0x183):_0x3e443e=_0x490d8c[_0x3ea909]!==''?new Function(JSON[_0x5aedd7(0x18d)](_0x490d8c[_0x3ea909])):new Function(_0x5aedd7(0x285));break;case _0x5aedd7(0x29b):_0x359194=_0x490d8c[_0x3ea909]!==''?JSON[_0x5aedd7(0x18d)](_0x490d8c[_0x3ea909]):[],_0x3e443e=_0x359194[_0x5aedd7(0x385)](_0x1b81db=>new Function(JSON[_0x5aedd7(0x18d)](_0x1b81db)));break;case _0x5aedd7(0x241):_0x3e443e=_0x490d8c[_0x3ea909]!==''?String(_0x490d8c[_0x3ea909]):'';break;case _0x5aedd7(0x307):_0x359194=_0x490d8c[_0x3ea909]!==''?JSON[_0x5aedd7(0x18d)](_0x490d8c[_0x3ea909]):[],_0x3e443e=_0x359194['map'](_0x25d0d0=>String(_0x25d0d0));break;case _0x5aedd7(0x34c):_0x3e5e7e=_0x490d8c[_0x3ea909]!==''?JSON[_0x5aedd7(0x18d)](_0x490d8c[_0x3ea909]):{},_0x3958ba[_0x156fe9]={},VisuMZ['ConvertParams'](_0x3958ba[_0x156fe9],_0x3e5e7e);continue;case'ARRAYSTRUCT':_0x359194=_0x490d8c[_0x3ea909]!==''?JSON['parse'](_0x490d8c[_0x3ea909]):[],_0x3e443e=_0x359194['map'](_0x2b0e5c=>VisuMZ[_0x5aedd7(0x364)]({},JSON[_0x5aedd7(0x18d)](_0x2b0e5c)));break;default:continue;}_0x3958ba[_0x156fe9]=_0x3e443e;}}return _0x3958ba;},(_0x3b91c8=>{const _0x6e33ba=_0x3f4870,_0x487575=_0x3b91c8[_0x6e33ba(0x3a3)];for(const _0xd7a285 of dependencies){if('xDvcm'!==_0x6e33ba(0x189)){if(!Imported[_0xd7a285]){alert(_0x6e33ba(0x219)[_0x6e33ba(0x2e5)](_0x487575,_0xd7a285)),SceneManager['exit']();break;}}else return!![];}const _0x280a5c=_0x3b91c8[_0x6e33ba(0x11d)];if(_0x280a5c[_0x6e33ba(0x144)](/\[Version[ ](.*?)\]/i)){if('zToIA'==='AcRsv'){const _0xd85b54=_0xfacd29['parse']('['+_0x59e834['$1'][_0x6e33ba(0x144)](/\d+/g)+']');for(const _0x5615d0 of _0xd85b54){if(_0x6eea58['value'](_0x5615d0))return!![];}return![];}else{const _0x302e7c=Number(RegExp['$1']);_0x302e7c!==VisuMZ[label][_0x6e33ba(0x263)]&&(alert('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'[_0x6e33ba(0x2e5)](_0x487575,_0x302e7c)),SceneManager['exit']());}}if(_0x280a5c[_0x6e33ba(0x144)](/\[Tier[ ](\d+)\]/i)){const _0xa2bfe5=Number(RegExp['$1']);if(_0xa2bfe5<tier)'Nzedf'!=='Nzedf'?(_0x19f877[_0x6e33ba(0x15a)][_0x6e33ba(0x2eb)]['call'](this,_0x17acdc),this[_0x6e33ba(0x3af)](_0x5d51de)):(alert(_0x6e33ba(0x150)[_0x6e33ba(0x2e5)](_0x487575,_0xa2bfe5,tier)),SceneManager[_0x6e33ba(0x103)]());else{if(_0x6e33ba(0x1d6)==='bamex'){const _0x41324a=this[_0x6e33ba(0x26f)]();for(const _0xeffa4a of _0x41324a){if(!_0xeffa4a['isGroupDefeatStateAffected']())return![];}return!![];}else tier=Math[_0x6e33ba(0x277)](_0xa2bfe5,tier);}}VisuMZ[_0x6e33ba(0x364)](VisuMZ[label][_0x6e33ba(0x11c)],_0x3b91c8[_0x6e33ba(0x19c)]);})(pluginData),VisuMZ[_0x3f4870(0x15a)][_0x3f4870(0x365)]=Scene_Boot[_0x3f4870(0x346)][_0x3f4870(0x2ae)],Scene_Boot[_0x3f4870(0x346)][_0x3f4870(0x2ae)]=function(){const _0x3cddbb=_0x3f4870;VisuMZ[_0x3cddbb(0x15a)][_0x3cddbb(0x365)][_0x3cddbb(0x2b4)](this),this['process_VisuMZ_SkillsStatesCore_Notetags'](),VisuMZ[_0x3cddbb(0x15a)]['CheckIncompatibleStates']();},Scene_Boot['prototype']['process_VisuMZ_SkillsStatesCore_Notetags']=function(){const _0x4760a2=_0x3f4870;if(VisuMZ['ParseAllNotetags'])return;this[_0x4760a2(0x1aa)](),this[_0x4760a2(0x295)]();},Scene_Boot['prototype']['process_VisuMZ_SkillsStatesCore_Skill_Notetags']=function(){const _0x5d5824=_0x3f4870;for(const _0x591978 of $dataSkills){if(!_0x591978)continue;VisuMZ['SkillsStatesCore']['Parse_Notetags_Skill_Cost'](_0x591978),VisuMZ[_0x5d5824(0x15a)]['Parse_Notetags_Skill_JS'](_0x591978);}},Scene_Boot[_0x3f4870(0x346)]['process_VisuMZ_SkillsStatesCore_State_Notetags']=function(){const _0x12741c=_0x3f4870;for(const _0x486be7 of $dataStates){if(_0x12741c(0x120)!==_0x12741c(0x120)){const _0x4c6502=_0x54bf6e[_0x12741c(0x18d)]('['+_0x24d24c['$1'][_0x12741c(0x144)](/\d+/g)+']');for(const _0x5cd563 of _0x4c6502){if(!_0x31f2f0[_0x12741c(0x2e8)](_0x5cd563))return![];}return!![];}else{if(!_0x486be7)continue;VisuMZ[_0x12741c(0x15a)][_0x12741c(0x3c9)](_0x486be7),VisuMZ[_0x12741c(0x15a)]['Parse_Notetags_State_PassiveJS'](_0x486be7),VisuMZ[_0x12741c(0x15a)]['Parse_Notetags_State_SlipEffectJS'](_0x486be7),VisuMZ[_0x12741c(0x15a)][_0x12741c(0x39f)](_0x486be7);}}},VisuMZ[_0x3f4870(0x15a)][_0x3f4870(0x197)]=VisuMZ[_0x3f4870(0x197)],VisuMZ[_0x3f4870(0x197)]=function(_0x58775e){const _0x2dc892=_0x3f4870;VisuMZ['SkillsStatesCore'][_0x2dc892(0x197)][_0x2dc892(0x2b4)](this,_0x58775e),VisuMZ[_0x2dc892(0x15a)][_0x2dc892(0x284)](_0x58775e),VisuMZ[_0x2dc892(0x15a)][_0x2dc892(0x179)](_0x58775e);},VisuMZ['SkillsStatesCore']['ParseStateNotetags']=VisuMZ['ParseStateNotetags'],VisuMZ[_0x3f4870(0x366)]=function(_0x2afc66){const _0x271ed8=_0x3f4870;VisuMZ['SkillsStatesCore']['ParseStateNotetags'][_0x271ed8(0x2b4)](this,_0x2afc66),VisuMZ[_0x271ed8(0x15a)]['Parse_Notetags_State_Category'](_0x2afc66),VisuMZ[_0x271ed8(0x15a)][_0x271ed8(0x251)](_0x2afc66),VisuMZ[_0x271ed8(0x15a)][_0x271ed8(0x1af)](_0x2afc66),VisuMZ['SkillsStatesCore'][_0x271ed8(0x39f)](_0x2afc66);},VisuMZ['SkillsStatesCore'][_0x3f4870(0x284)]=function(_0x5e1533){const _0x2b606b=_0x3f4870,_0x478263=_0x5e1533[_0x2b606b(0x352)];_0x478263[_0x2b606b(0x144)](/<MP COST:[ ](\d+)>/i)&&(_0x5e1533['mpCost']=Number(RegExp['$1'])),_0x478263[_0x2b606b(0x144)](/<TP COST:[ ](\d+)>/i)&&(_0x5e1533[_0x2b606b(0x1f1)]=Number(RegExp['$1']));},VisuMZ[_0x3f4870(0x15a)][_0x3f4870(0x32a)]={},VisuMZ['SkillsStatesCore']['skillVisibleJS']={},VisuMZ['SkillsStatesCore'][_0x3f4870(0x179)]=function(_0x151aa7){const _0x2b497a=_0x3f4870,_0x19c6a2=_0x151aa7['note'];if(_0x19c6a2[_0x2b497a(0x144)](/<JS SKILL ENABLE>\s*([\s\S]*)\s*<\/JS SKILL ENABLE>/i)){const _0x3a39f4=String(RegExp['$1']),_0x4d510e='\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20enabled\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20enabled;\x0a\x20\x20\x20\x20\x20\x20\x20\x20'['format'](_0x3a39f4);VisuMZ[_0x2b497a(0x15a)][_0x2b497a(0x32a)][_0x151aa7['id']]=new Function(_0x2b497a(0x1c5),_0x4d510e);}if(_0x19c6a2[_0x2b497a(0x144)](/<JS SKILL VISIBLE>\s*([\s\S]*)\s*<\/JS SKILL VISIBLE>/i)){const _0x1810d0=String(RegExp['$1']),_0x988176=_0x2b497a(0x3eb)[_0x2b497a(0x2e5)](_0x1810d0);VisuMZ['SkillsStatesCore'][_0x2b497a(0x3b5)][_0x151aa7['id']]=new Function(_0x2b497a(0x1c5),_0x988176);}},VisuMZ[_0x3f4870(0x15a)][_0x3f4870(0x3c9)]=function(_0x2927a7){const _0x1a6f89=_0x3f4870;_0x2927a7[_0x1a6f89(0x1b5)]=['ALL','ANY'];const _0x4b8f53=_0x2927a7['note'],_0x4d3615=_0x4b8f53[_0x1a6f89(0x144)](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);if(_0x4d3615){if(_0x1a6f89(0x1fa)===_0x1a6f89(0x1fa))for(const _0x373340 of _0x4d3615){_0x373340['match'](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);const _0x3fbef9=String(RegExp['$1'])[_0x1a6f89(0x180)]()[_0x1a6f89(0x2e1)]()['split'](',');for(const _0x4146fe of _0x3fbef9){_0x1a6f89(0x223)==='ZbZuE'?(_0x3e36ac=_0x407182,_0x1383b6+=_0x5cc4ca):_0x2927a7[_0x1a6f89(0x1b5)][_0x1a6f89(0x2d2)](_0x4146fe[_0x1a6f89(0x2e1)]());}}else{const _0x1d56a0=this[_0x1a6f89(0x354)][_0x3a1801];return _0x3149e4[_0x1a6f89(0x15a)][_0x1a6f89(0x11c)][_0x1a6f89(0x3e9)][_0x1a6f89(0x1f3)][_0x1a6f89(0x2b4)](this,_0x48a5b6,_0x1d56a0);}}if(_0x4b8f53['match'](/<(?:CATEGORY|CATEGORIES)>\s*([\s\S]*)\s*<\/(?:CATEGORY|CATEGORIES)>/i)){if('HWlqM'!==_0x1a6f89(0x1fd))_0x2fef64['SkillsStatesCore']['Settings'][_0x1a6f89(0x3e9)][_0x1a6f89(0x227)][_0x1a6f89(0x2b4)](this,_0x332e4d,_0x2d388f);else{const _0x59c90c=RegExp['$1'][_0x1a6f89(0x200)](/[\r\n]+/);for(const _0x1a30ca of _0x59c90c){if(_0x1a6f89(0x238)!==_0x1a6f89(0x238))return _0x5ee30a(_0x12ce71['$1']);else _0x2927a7[_0x1a6f89(0x1b5)][_0x1a6f89(0x2d2)](_0x1a30ca[_0x1a6f89(0x180)]()['trim']());}}}if(_0x4b8f53[_0x1a6f89(0x144)](/<POSITIVE STATE>/i)){if(_0x1a6f89(0x2f8)!==_0x1a6f89(0x36d))_0x2927a7[_0x1a6f89(0x1b5)]['push']('POSITIVE');else return _0x5eb8fe(_0x2341eb['$1']);}_0x4b8f53[_0x1a6f89(0x144)](/<NEGATIVE STATE>/i)&&_0x2927a7[_0x1a6f89(0x1b5)][_0x1a6f89(0x2d2)](_0x1a6f89(0x30f));},VisuMZ[_0x3f4870(0x15a)][_0x3f4870(0x329)]={},VisuMZ[_0x3f4870(0x15a)][_0x3f4870(0x251)]=function(_0x5ca34b){const _0x245868=_0x3f4870,_0xe025b=_0x5ca34b[_0x245868(0x352)];if(_0xe025b[_0x245868(0x144)](/<JS PASSIVE CONDITION>\s*([\s\S]*)\s*<\/JS PASSIVE CONDITION>/i)){const _0xcb5ba=String(RegExp['$1']),_0x426109='\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20condition\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20condition;\x0a\x20\x20\x20\x20\x20\x20\x20\x20'['format'](_0xcb5ba);VisuMZ[_0x245868(0x15a)][_0x245868(0x329)][_0x5ca34b['id']]=new Function(_0x245868(0x2c1),_0x426109);}},VisuMZ[_0x3f4870(0x15a)][_0x3f4870(0x3ee)]={},VisuMZ[_0x3f4870(0x15a)][_0x3f4870(0x266)]={},VisuMZ[_0x3f4870(0x15a)]['stateMpSlipDamageJS']={},VisuMZ['SkillsStatesCore']['stateMpSlipHealJS']={},VisuMZ[_0x3f4870(0x15a)]['stateTpSlipDamageJS']={},VisuMZ[_0x3f4870(0x15a)][_0x3f4870(0x3b2)]={},VisuMZ[_0x3f4870(0x15a)][_0x3f4870(0x1af)]=function(_0x3d45dd){const _0x4a03ba=_0x3f4870,_0x462b14=_0x3d45dd[_0x4a03ba(0x352)],_0x373120='\x0a\x20\x20\x20\x20\x20\x20\x20\x20let\x20%2\x20=\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20origin\x20=\x20this.getStateOrigin(stateId);\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20state\x20=\x20$dataStates[stateId];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20origin;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20origin;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20%2\x20=\x20Math.round(Math.max(0,\x20%2)\x20*\x20%3);\x0a\x20\x20\x20\x20\x20\x20\x20\x20this.setStateData(stateId,\x20\x27%4\x27,\x20%2);\x0a\x20\x20\x20\x20';if(_0x462b14[_0x4a03ba(0x144)](/<JS HP SLIP DAMAGE>\s*([\s\S]*)\s*<\/JS HP SLIP DAMAGE>/i)){const _0x371f4f=String(RegExp['$1']),_0xe753b9=_0x373120[_0x4a03ba(0x2e5)](_0x371f4f,_0x4a03ba(0x170),-0x1,_0x4a03ba(0x29d));VisuMZ['SkillsStatesCore'][_0x4a03ba(0x3ee)][_0x3d45dd['id']]=new Function(_0x4a03ba(0x3a7),_0xe753b9);}else{if(_0x462b14[_0x4a03ba(0x144)](/<JS HP SLIP HEAL>\s*([\s\S]*)\s*<\/JS HP SLIP HEAL>/i)){if('BjHcp'!==_0x4a03ba(0x274)){let _0x59ff91=[this['actor'](),this[_0x4a03ba(0x13a)]()];_0x59ff91=_0x59ff91[_0x4a03ba(0x2cd)](this[_0x4a03ba(0x24e)]()[_0x4a03ba(0x229)](_0x2b9e99=>_0x2b9e99));for(const _0x53db78 of this[_0x4a03ba(0x3a1)]){const _0x5d57ed=_0x2d3dba[_0x53db78];if(_0x5d57ed)_0x59ff91[_0x4a03ba(0x2d2)](_0x5d57ed);}return _0x59ff91;}else{const _0x593ce4=String(RegExp['$1']),_0x398031=_0x373120[_0x4a03ba(0x2e5)](_0x593ce4,_0x4a03ba(0x371),0x1,'slipHp');VisuMZ[_0x4a03ba(0x15a)][_0x4a03ba(0x266)][_0x3d45dd['id']]=new Function(_0x4a03ba(0x3a7),_0x398031);}}}if(_0x462b14['match'](/<JS MP SLIP DAMAGE>\s*([\s\S]*)\s*<\/JS MP SLIP DAMAGE>/i)){if(_0x4a03ba(0x3c2)!==_0x4a03ba(0x208)){const _0x5717e6=String(RegExp['$1']),_0xbe84fb=_0x373120[_0x4a03ba(0x2e5)](_0x5717e6,_0x4a03ba(0x170),-0x1,_0x4a03ba(0x216));VisuMZ[_0x4a03ba(0x15a)][_0x4a03ba(0x12e)][_0x3d45dd['id']]=new Function(_0x4a03ba(0x3a7),_0xbe84fb);}else{_0x236d2d[_0x4a03ba(0x144)](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ](\d+)>/i);const _0x324169=_0x3c5517(_0x52ac1b['$1']),_0x46f71a=_0x232a65(_0x23e05b['$2']);_0x35bbae['removeStatesByCategory'](_0x324169,_0x46f71a);}}else{if(_0x462b14[_0x4a03ba(0x144)](/<JS MP SLIP HEAL>\s*([\s\S]*)\s*<\/JS MP SLIP HEAL>/i)){if(_0x4a03ba(0x37c)==='jxFzN'){const _0x1f5038=String(RegExp['$1']),_0x2bc803=_0x373120[_0x4a03ba(0x2e5)](_0x1f5038,_0x4a03ba(0x371),0x1,_0x4a03ba(0x216));VisuMZ[_0x4a03ba(0x15a)][_0x4a03ba(0x1f8)][_0x3d45dd['id']]=new Function(_0x4a03ba(0x3a7),_0x2bc803);}else return _0x14aea7[_0x4a03ba(0xe4)];}}if(_0x462b14[_0x4a03ba(0x144)](/<JS TP SLIP DAMAGE>\s*([\s\S]*)\s*<\/JS TP SLIP DAMAGE>/i)){if(_0x4a03ba(0x3c4)===_0x4a03ba(0x18f))return _0x18d26e[_0x4a03ba(0x15a)][_0x4a03ba(0x2ac)][_0x4a03ba(0x2b4)](this);else{const _0x1f44b4=String(RegExp['$1']),_0x581153=_0x373120[_0x4a03ba(0x2e5)](_0x1f44b4,'damage',-0x1,_0x4a03ba(0x173));VisuMZ[_0x4a03ba(0x15a)][_0x4a03ba(0x1b4)][_0x3d45dd['id']]=new Function('stateId',_0x581153);}}else{if(_0x462b14[_0x4a03ba(0x144)](/<JS TP SLIP HEAL>\s*([\s\S]*)\s*<\/JS TP SLIP HEAL>/i)){const _0x22db01=String(RegExp['$1']),_0x17df64=_0x373120[_0x4a03ba(0x2e5)](_0x22db01,'heal',0x1,_0x4a03ba(0x173));VisuMZ[_0x4a03ba(0x15a)]['stateTpSlipHealJS'][_0x3d45dd['id']]=new Function(_0x4a03ba(0x3a7),_0x17df64);}}},VisuMZ[_0x3f4870(0x15a)][_0x3f4870(0x1fc)]={},VisuMZ[_0x3f4870(0x15a)][_0x3f4870(0x349)]={},VisuMZ[_0x3f4870(0x15a)][_0x3f4870(0x230)]={},VisuMZ[_0x3f4870(0x15a)][_0x3f4870(0x39f)]=function(_0x239990){const _0x5b0003=_0x3f4870,_0x2e4f9e=_0x239990['note'],_0x535888=_0x5b0003(0x1ad);if(_0x2e4f9e[_0x5b0003(0x144)](/<JS ON ADD STATE>\s*([\s\S]*)\s*<\/JS ON ADD STATE>/i)){if('dmMQB'===_0x5b0003(0x3ad)){const _0x27c47d=String(RegExp['$1']),_0x283819=_0x535888[_0x5b0003(0x2e5)](_0x27c47d);VisuMZ[_0x5b0003(0x15a)][_0x5b0003(0x1fc)][_0x239990['id']]=new Function(_0x5b0003(0x3a7),_0x283819);}else this['_statusWindow'][_0x5b0003(0x386)](this[_0x5b0003(0x271)](0x0));}if(_0x2e4f9e[_0x5b0003(0x144)](/<JS ON ERASE STATE>\s*([\s\S]*)\s*<\/JS ON ERASE STATE>/i)){if(_0x5b0003(0x3b8)===_0x5b0003(0x34e)){const _0x1609cc=this[_0x5b0003(0x10f)];_0x1609cc[_0x5b0003(0x16f)][_0x5b0003(0x27e)]();const _0x5dfbf6=this['commandStyleCheck'](this['index']());if(_0x5dfbf6===_0x5b0003(0x25a)&&this[_0x5b0003(0x163)]()>0x0){const _0x48fadc=this[_0x5b0003(0x1ea)](this[_0x5b0003(0x25c)]());let _0x330324=this[_0x5b0003(0x257)](this[_0x5b0003(0x25c)]());_0x330324=_0x330324[_0x5b0003(0x3c5)](/\\I\[(\d+)\]/gi,''),_0x1609cc['resetFontSettings'](),this[_0x5b0003(0x243)](_0x330324,_0x48fadc),this[_0x5b0003(0x261)](_0x330324,_0x48fadc),this[_0x5b0003(0x32c)](_0x330324,_0x48fadc);}}else{const _0x3b167f=String(RegExp['$1']),_0x11572e=_0x535888[_0x5b0003(0x2e5)](_0x3b167f);VisuMZ[_0x5b0003(0x15a)][_0x5b0003(0x349)][_0x239990['id']]=new Function(_0x5b0003(0x3a7),_0x11572e);}}if(_0x2e4f9e[_0x5b0003(0x144)](/<JS ON EXPIRE STATE>\s*([\s\S]*)\s*<\/JS ON EXPIRE STATE>/i)){const _0x11ad0e=String(RegExp['$1']),_0x30b6bd=_0x535888[_0x5b0003(0x2e5)](_0x11ad0e);VisuMZ['SkillsStatesCore'][_0x5b0003(0x230)][_0x239990['id']]=new Function(_0x5b0003(0x3a7),_0x30b6bd);}},VisuMZ[_0x3f4870(0x15a)][_0x3f4870(0x33c)]=function(){const _0xe6d28f=_0x3f4870;if(!VisuMZ[_0xe6d28f(0x15a)][_0xe6d28f(0x11c)][_0xe6d28f(0x2b9)]['ActionEndUpdate'])return;for(const _0x1942a1 of $dataStates){if(!_0x1942a1)continue;_0x1942a1['restriction']===0x4&&_0x1942a1[_0xe6d28f(0x373)]===0x1&&(_0x1942a1[_0xe6d28f(0x373)]=0x2);}},DataManager[_0x3f4870(0x215)]=function(_0x525e89){const _0x10fa97=_0x3f4870;_0x525e89=_0x525e89[_0x10fa97(0x180)]()[_0x10fa97(0x2e1)](),this[_0x10fa97(0xe5)]=this[_0x10fa97(0xe5)]||{};if(this[_0x10fa97(0xe5)][_0x525e89])return this[_0x10fa97(0xe5)][_0x525e89];for(const _0x29df76 of $dataClasses){if(!_0x29df76)continue;let _0x11813c=_0x29df76[_0x10fa97(0x3a3)];_0x11813c=_0x11813c[_0x10fa97(0x3c5)](/\x1I\[(\d+)\]/gi,''),_0x11813c=_0x11813c[_0x10fa97(0x3c5)](/\\I\[(\d+)\]/gi,''),this[_0x10fa97(0xe5)][_0x11813c[_0x10fa97(0x180)]()['trim']()]=_0x29df76['id'];}return this[_0x10fa97(0xe5)][_0x525e89]||0x0;},DataManager['getSkillTypes']=function(_0x43ecf2){const _0x3c1f27=_0x3f4870;this[_0x3c1f27(0x2db)]=this['_stypeIDs']||{};if(this['_stypeIDs'][_0x43ecf2['id']])return this[_0x3c1f27(0x2db)][_0x43ecf2['id']];this[_0x3c1f27(0x2db)][_0x43ecf2['id']]=[_0x43ecf2[_0x3c1f27(0x1e5)]];if(_0x43ecf2[_0x3c1f27(0x352)][_0x3c1f27(0x144)](/<SKILL[ ](?:TYPE|TYPES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0xd7ee09=JSON['parse']('['+RegExp['$1'][_0x3c1f27(0x144)](/\d+/g)+']');this[_0x3c1f27(0x2db)][_0x43ecf2['id']]=this[_0x3c1f27(0x2db)][_0x43ecf2['id']][_0x3c1f27(0x2cd)](_0xd7ee09);}else{if(_0x43ecf2[_0x3c1f27(0x352)][_0x3c1f27(0x144)](/<SKILL[ ](?:TYPE|TYPES):[ ](.*)>/i)){if(_0x3c1f27(0x39b)===_0x3c1f27(0x39b)){const _0x5b1b9b=RegExp['$1'][_0x3c1f27(0x200)](',');for(const _0x50fc69 of _0x5b1b9b){const _0x1a41e8=DataManager[_0x3c1f27(0x353)](_0x50fc69);if(_0x1a41e8)this['_stypeIDs'][_0x43ecf2['id']][_0x3c1f27(0x2d2)](_0x1a41e8);}}else this['drawExtendedParameter'](_0x423d6e,_0x904ccd,_0x434be3,_0x2c03cf),_0x509659++,_0x4d85c2%0x2===0x0?(_0x10dcc8=_0x229f14,_0x46ac08+=_0x249611):_0x442ce8+=_0x46cec2+0x18;}}return this['_stypeIDs'][_0x43ecf2['id']];},DataManager[_0x3f4870(0x353)]=function(_0x307f41){const _0xaf45ea=_0x3f4870;_0x307f41=_0x307f41[_0xaf45ea(0x180)]()['trim'](),this[_0xaf45ea(0x2db)]=this['_stypeIDs']||{};if(this[_0xaf45ea(0x2db)][_0x307f41])return this[_0xaf45ea(0x2db)][_0x307f41];for(let _0x8b279d=0x1;_0x8b279d<0x64;_0x8b279d++){if(_0xaf45ea(0x26e)===_0xaf45ea(0x26e)){if(!$dataSystem[_0xaf45ea(0x186)][_0x8b279d])continue;let _0x48c1d7=$dataSystem[_0xaf45ea(0x186)][_0x8b279d][_0xaf45ea(0x180)]()[_0xaf45ea(0x2e1)]();_0x48c1d7=_0x48c1d7[_0xaf45ea(0x3c5)](/\x1I\[(\d+)\]/gi,''),_0x48c1d7=_0x48c1d7[_0xaf45ea(0x3c5)](/\\I\[(\d+)\]/gi,''),this[_0xaf45ea(0x2db)][_0x48c1d7]=_0x8b279d;}else{if(typeof _0x385d4d==='number')_0x1e08ea=_0x1e1ccb[_0x5d233f];return this[_0xaf45ea(0x3ce)]()[_0xaf45ea(0x21b)](_0x483504);}}return this[_0xaf45ea(0x2db)][_0x307f41]||0x0;},DataManager[_0x3f4870(0x1d8)]=function(_0x1888c6){const _0x215eb1=_0x3f4870;_0x1888c6=_0x1888c6[_0x215eb1(0x180)]()['trim'](),this[_0x215eb1(0x34f)]=this[_0x215eb1(0x34f)]||{};if(this[_0x215eb1(0x34f)][_0x1888c6])return this['_skillIDs'][_0x1888c6];for(const _0x322e06 of $dataSkills){if(_0x215eb1(0x374)!==_0x215eb1(0x374))_0x12f7e8[_0x215eb1(0x15a)][_0x215eb1(0x197)][_0x215eb1(0x2b4)](this,_0x249920),_0x19aefb[_0x215eb1(0x15a)][_0x215eb1(0x284)](_0x130c05),_0x45c013[_0x215eb1(0x15a)]['Parse_Notetags_Skill_JS'](_0xf5b2c8);else{if(!_0x322e06)continue;this[_0x215eb1(0x34f)][_0x322e06[_0x215eb1(0x3a3)]['toUpperCase']()[_0x215eb1(0x2e1)]()]=_0x322e06['id'];}}return this['_skillIDs'][_0x1888c6]||0x0;},DataManager[_0x3f4870(0x237)]=function(_0x3d37fb){const _0x41c6d9=_0x3f4870;_0x3d37fb=_0x3d37fb['toUpperCase']()[_0x41c6d9(0x2e1)](),this[_0x41c6d9(0x13e)]=this[_0x41c6d9(0x13e)]||{};if(this[_0x41c6d9(0x13e)][_0x3d37fb])return this[_0x41c6d9(0x13e)][_0x3d37fb];for(const _0x15086d of $dataStates){if(!_0x15086d)continue;this['_stateIDs'][_0x15086d[_0x41c6d9(0x3a3)][_0x41c6d9(0x180)]()[_0x41c6d9(0x2e1)]()]=_0x15086d['id'];}return this['_stateIDs'][_0x3d37fb]||0x0;},DataManager['stateMaximumTurns']=function(_0x5f3d8e){const _0x1be9a8=_0x3f4870;this['_stateMaxTurns']=this[_0x1be9a8(0x361)]||{};if(this['_stateMaxTurns'][_0x5f3d8e])return this[_0x1be9a8(0x361)][_0x5f3d8e];return $dataStates[_0x5f3d8e][_0x1be9a8(0x352)][_0x1be9a8(0x144)](/<MAX TURNS:[ ](\d+)>/i)?this['_stateMaxTurns'][_0x5f3d8e]=Number(RegExp['$1']):this[_0x1be9a8(0x361)][_0x5f3d8e]=VisuMZ['SkillsStatesCore'][_0x1be9a8(0x11c)][_0x1be9a8(0x2b9)]['MaxTurns'],this[_0x1be9a8(0x361)][_0x5f3d8e];},ColorManager['getColorDataFromPluginParameters']=function(_0xc5a194,_0x2df57a){const _0x48b67d=_0x3f4870;return _0x2df57a=String(_0x2df57a),this['_colorCache']=this[_0x48b67d(0x27f)]||{},_0x2df57a[_0x48b67d(0x144)](/#(.*)/i)?this[_0x48b67d(0x27f)][_0xc5a194]=_0x48b67d(0x375)[_0x48b67d(0x2e5)](String(RegExp['$1'])):this[_0x48b67d(0x27f)][_0xc5a194]=this[_0x48b67d(0x106)](Number(_0x2df57a)),this[_0x48b67d(0x27f)][_0xc5a194];},ColorManager[_0x3f4870(0x12d)]=function(_0x2349aa){const _0x546a89=_0x3f4870;_0x2349aa=String(_0x2349aa);if(_0x2349aa[_0x546a89(0x144)](/#(.*)/i))return'#%1'['format'](String(RegExp['$1']));else{if(_0x546a89(0x3d5)!=='TzHTW'){if(typeof _0x57ae99==='number')_0x41152d=_0x32d7f9[_0x526a08];const _0x2d833e=_0x546a89(0x242)['format'](_0x3a04f9['id']);this[_0x546a89(0x27f)]=this[_0x546a89(0x27f)]||{};if(this[_0x546a89(0x27f)][_0x2d833e])return this['_colorCache'][_0x2d833e];const _0x343e54=this['retrieveStateColor'](_0x2e1b1c);return this[_0x546a89(0x16b)](_0x2d833e,_0x343e54);}else return this[_0x546a89(0x106)](Number(_0x2349aa));}},ColorManager[_0x3f4870(0x248)]=function(_0x7c3fe7){const _0x331164=_0x3f4870;if(typeof _0x7c3fe7===_0x331164(0x1e8))_0x7c3fe7=$dataStates[_0x7c3fe7];const _0x5c2b69=_0x331164(0x242)[_0x331164(0x2e5)](_0x7c3fe7['id']);this[_0x331164(0x27f)]=this[_0x331164(0x27f)]||{};if(this[_0x331164(0x27f)][_0x5c2b69])return this['_colorCache'][_0x5c2b69];const _0xb75268=this['retrieveStateColor'](_0x7c3fe7);return this[_0x331164(0x16b)](_0x5c2b69,_0xb75268);},ColorManager[_0x3f4870(0x1ce)]=function(_0x2a28ba){const _0x3dfb04=_0x3f4870,_0x31be25=_0x2a28ba['note'];if(_0x31be25[_0x3dfb04(0x144)](/<TURN COLOR:[ ](.*)>/i))return String(RegExp['$1']);else{if(_0x31be25['match'](/<POSITIVE STATE>/i)){if('RZHle'!==_0x3dfb04(0x2b6))return VisuMZ[_0x3dfb04(0x15a)][_0x3dfb04(0x11c)][_0x3dfb04(0x2b9)]['ColorPositive'];else{if(!_0x4da895[_0x3dfb04(0x2e8)](_0x560eca))return!![];}}else{if(_0x31be25[_0x3dfb04(0x144)](/<NEGATIVE STATE>/i))return VisuMZ[_0x3dfb04(0x15a)][_0x3dfb04(0x11c)]['States'][_0x3dfb04(0x2f9)];else{if(_0x3dfb04(0x14a)!=='MnWkt'){if(this['isUseSkillsStatesCoreUpdatedLayout']())return this[_0x3dfb04(0x1a2)]();else{const _0x15bc65=_0x531834[_0x3dfb04(0x15a)][_0x3dfb04(0x33b)][_0x3dfb04(0x2b4)](this);return this[_0x3dfb04(0x2a3)]()&&this['adjustItemWidthByShopStatus']()&&(_0x15bc65[_0x3dfb04(0x39d)]-=this[_0x3dfb04(0x1a8)]()),_0x15bc65;}}else return VisuMZ[_0x3dfb04(0x15a)]['Settings'][_0x3dfb04(0x2b9)][_0x3dfb04(0x1d2)];}}}},ColorManager[_0x3f4870(0x392)]=function(){const _0x4c4e33=_0x3f4870,_0x1e04b1=_0x4c4e33(0x108);this[_0x4c4e33(0x27f)]=this[_0x4c4e33(0x27f)]||{};if(this[_0x4c4e33(0x27f)][_0x1e04b1])return this[_0x4c4e33(0x27f)][_0x1e04b1];const _0x271902=VisuMZ['SkillsStatesCore'][_0x4c4e33(0x11c)][_0x4c4e33(0x3e9)][_0x4c4e33(0x37e)];return this[_0x4c4e33(0x16b)](_0x1e04b1,_0x271902);},ColorManager['debuffColor']=function(){const _0x2c92ce=_0x3f4870,_0x1a9d43='_stored_debuffColor';this[_0x2c92ce(0x27f)]=this[_0x2c92ce(0x27f)]||{};if(this[_0x2c92ce(0x27f)][_0x1a9d43])return this[_0x2c92ce(0x27f)][_0x1a9d43];const _0x269755=VisuMZ[_0x2c92ce(0x15a)][_0x2c92ce(0x11c)][_0x2c92ce(0x3e9)][_0x2c92ce(0x137)];return this['getColorDataFromPluginParameters'](_0x1a9d43,_0x269755);},VisuMZ['SkillsStatesCore'][_0x3f4870(0x1fe)]=BattleManager[_0x3f4870(0x203)],BattleManager[_0x3f4870(0x203)]=function(){const _0x3a7a1a=_0x3f4870;this['updateStatesActionEnd'](),VisuMZ[_0x3a7a1a(0x15a)]['BattleManager_endAction'][_0x3a7a1a(0x2b4)](this);},BattleManager[_0x3f4870(0x1ba)]=function(){const _0x42dd63=_0x3f4870,_0x2912a2=VisuMZ[_0x42dd63(0x15a)][_0x42dd63(0x11c)][_0x42dd63(0x2b9)];if(!_0x2912a2)return;if(_0x2912a2[_0x42dd63(0x3a8)]===![])return;if(!this[_0x42dd63(0x24d)])return;this[_0x42dd63(0x24d)][_0x42dd63(0x1ba)]();},Game_Battler[_0x3f4870(0x346)][_0x3f4870(0x1ba)]=function(){const _0x53e954=_0x3f4870;if(BattleManager[_0x53e954(0x1cd)]!=='action')return;if(this[_0x53e954(0x335)]===Graphics[_0x53e954(0x1ab)])return;this[_0x53e954(0x335)]=Graphics['frameCount'];for(const _0x2163a7 of this[_0x53e954(0x204)]){if('CrsYm'!=='hYsft'){const _0xf3d24c=$dataStates[_0x2163a7];if(!_0xf3d24c)continue;if(_0xf3d24c[_0x53e954(0x373)]!==0x1)continue;this[_0x53e954(0x325)][_0x2163a7]>0x0&&this['_stateTurns'][_0x2163a7]--;}else{const _0x3717ec=_0x538f2d[_0x53e954(0x18d)]('['+_0x1f1536['$1'][_0x53e954(0x144)](/\d+/g)+']');this[_0x53e954(0x2db)][_0x5ad663['id']]=this[_0x53e954(0x2db)][_0xb84c4['id']][_0x53e954(0x2cd)](_0x3717ec);}}this[_0x53e954(0x2c3)](0x1);},Game_BattlerBase['prototype'][_0x3f4870(0x323)]=function(){const _0x27292c=_0x3f4870,_0x1f155f=VisuMZ[_0x27292c(0x15a)]['Settings'][_0x27292c(0x2b9)];for(const _0x13e530 of this[_0x27292c(0x204)]){const _0x4fef27=$dataStates[_0x13e530];if(_0x1f155f&&_0x1f155f['ActionEndUpdate']!==![]){if(_0x4fef27&&_0x4fef27['autoRemovalTiming']===0x1)continue;}this[_0x27292c(0x325)][_0x13e530]>0x0&&(_0x27292c(0x1d3)!==_0x27292c(0x1d3)?_0x94a8c4[_0x27292c(0x2d2)](_0x47f0b3[_0x27292c(0x215)](_0x12edcb)):this[_0x27292c(0x325)][_0x13e530]--);}},VisuMZ[_0x3f4870(0x15a)][_0x3f4870(0x2eb)]=Game_Action['prototype'][_0x3f4870(0x1a3)],Game_Action['prototype'][_0x3f4870(0x1a3)]=function(_0x19ea05){const _0xb2f6f2=_0x3f4870;VisuMZ[_0xb2f6f2(0x15a)][_0xb2f6f2(0x2eb)][_0xb2f6f2(0x2b4)](this,_0x19ea05),this[_0xb2f6f2(0x3af)](_0x19ea05);},Game_Action[_0x3f4870(0x346)][_0x3f4870(0x3af)]=function(_0x33a035){const _0x29092c=_0x3f4870;this[_0x29092c(0x165)](_0x33a035),this[_0x29092c(0x2d4)](_0x33a035),this[_0x29092c(0x3d6)](_0x33a035),this[_0x29092c(0x187)](_0x33a035);},VisuMZ[_0x3f4870(0x15a)][_0x3f4870(0x14b)]=Game_Action[_0x3f4870(0x346)][_0x3f4870(0x16a)],Game_Action[_0x3f4870(0x346)][_0x3f4870(0x16a)]=function(_0x487d72){const _0x1b1139=_0x3f4870;if(this['testSkillStatesCoreNotetags'](_0x487d72))return!![];return VisuMZ[_0x1b1139(0x15a)][_0x1b1139(0x14b)]['call'](this,_0x487d72);},Game_Action[_0x3f4870(0x346)][_0x3f4870(0x123)]=function(_0x4e4a6b){const _0x553bf3=_0x3f4870,_0x2ab7c9=this['item']()[_0x553bf3(0x352)];if(_0x2ab7c9[_0x553bf3(0x144)](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ](.*)>/i)){if(_0x553bf3(0x31a)!==_0x553bf3(0x31a)){if(_0x18c3e6[_0x553bf3(0x2e8)](_0x3dc82d))return![];}else{const _0x22a5b4=String(RegExp['$1']);if(_0x4e4a6b['isStateCategoryAffected'](_0x22a5b4))return!![];}}if(_0x2ab7c9[_0x553bf3(0x144)](/<SET STATE[ ](\d+)[ ]TURNS:[ ](.*)>/i)){if(_0x553bf3(0x3c7)===_0x553bf3(0x2ed))_0x135430+=this[_0x553bf3(0x177)](_0x1c8d5a),this['setStateTurns'](_0x1dd535,_0x5e81bd);else{const _0x3f28ba=Number(RegExp['$1']);if(_0x4e4a6b[_0x553bf3(0x3cc)](_0x3f28ba))return!![];}}else{if(_0x2ab7c9[_0x553bf3(0x144)](/<SET STATE[ ](.*)[ ]TURNS:[ ](.*)>/i)){if(_0x553bf3(0x13c)!=='GtIHO'){const _0x459b43=DataManager[_0x553bf3(0x237)](RegExp['$1']);if(_0x4e4a6b[_0x553bf3(0x3cc)](_0x459b43))return!![];}else{_0x47e7a2[_0x553bf3(0x144)](/<PASSIVE (?:STATE|STATES):[ ](.*)>/i);const _0x34d6b1=_0x15290a['$1'];if(_0x34d6b1['match'](/(\d+(?:\s*,\s*\d+)*)/i)){const _0x1bb355=_0x51255b[_0x553bf3(0x18d)]('['+_0x118e1e['$1']['match'](/\d+/g)+']');this[_0x553bf3(0x14d)][_0x553bf3(0x3b3)]=this[_0x553bf3(0x14d)][_0x553bf3(0x3b3)][_0x553bf3(0x2cd)](_0x1bb355);}else{const _0x204964=_0x34d6b1[_0x553bf3(0x200)](',');for(const _0x496cfe of _0x204964){const _0x1313c4=_0x3009a2[_0x553bf3(0x237)](_0x496cfe);if(_0x1313c4)this[_0x553bf3(0x14d)][_0x553bf3(0x3b3)][_0x553bf3(0x2d2)](_0x1313c4);}}}}}return![];},Game_Action[_0x3f4870(0x346)][_0x3f4870(0x165)]=function(_0x56b43c){const _0x2ee291=_0x3f4870;if(_0x56b43c['states']()[_0x2ee291(0x1dd)]<=0x0)return;const _0x882f39=this[_0x2ee291(0x211)]()[_0x2ee291(0x352)];if(_0x882f39[_0x2ee291(0x144)](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ]ALL>/i)){if(_0x2ee291(0x378)==='abmZc'){const _0x11f5ff=String(RegExp['$1']);_0x56b43c[_0x2ee291(0x18c)](_0x11f5ff);}else{const _0x2446d2=_0xf65787(_0x565763['$1']);_0x407de0['removeStatesByCategoryAll'](_0x2446d2);}}const _0x3bb0b6=_0x882f39['match'](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ](\d+)>/gi);if(_0x3bb0b6){if(_0x2ee291(0x3d2)!==_0x2ee291(0x3d2))return _0x5d947c(_0x3fc2c6['$1']);else for(const _0x37d4a4 of _0x3bb0b6){_0x37d4a4[_0x2ee291(0x144)](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ](\d+)>/i);const _0x35cb50=String(RegExp['$1']),_0x357fd4=Number(RegExp['$2']);_0x56b43c[_0x2ee291(0x10a)](_0x35cb50,_0x357fd4);}}},Game_Action['prototype'][_0x3f4870(0x2d4)]=function(_0x43da21){const _0x4e460d=_0x3f4870,_0x5a37d2=this['item']()[_0x4e460d(0x352)],_0xc2590b=_0x5a37d2[_0x4e460d(0x144)](/<SET STATE[ ](.*)[ ]TURNS:[ ](\d+)>/gi);if(_0xc2590b)for(const _0x9c1591 of _0xc2590b){let _0x2a0a28=0x0,_0x422514=0x0;if(_0x9c1591[_0x4e460d(0x144)](/<SET STATE[ ](\d+)[ ]TURNS:[ ](\d+)>/i)){if(_0x4e460d(0x35d)==='zqovk'){if(_0x28155f[_0x4e460d(0x144)](/<member-(\d+)>/i))return _0x5b88e5[_0x4e460d(0x1ae)]()[_0x260414(_0x1345ff['$1'])];}else _0x2a0a28=Number(RegExp['$1']),_0x422514=Number(RegExp['$2']);}else _0x9c1591[_0x4e460d(0x144)](/<SET STATE[ ](.*)[ ]TURNS:[ ](\d+)>/i)&&(_0x2a0a28=DataManager['getStateIdWithName'](RegExp['$1']),_0x422514=Number(RegExp['$2']));_0x43da21[_0x4e460d(0x34a)](_0x2a0a28,_0x422514),this[_0x4e460d(0x3b9)](_0x43da21);}const _0x199fb3=_0x5a37d2['match'](/<STATE[ ](.*)[ ]TURNS:[ ]([\+\-]\d+)>/gi);if(_0x199fb3){if(_0x4e460d(0x1bb)===_0x4e460d(0x1bb))for(const _0x2b722e of _0x199fb3){let _0x21afbd=0x0,_0x47d81c=0x0;if(_0x2b722e['match'](/<STATE[ ](\d+)[ ]TURNS:[ ]([\+\-]\d+)>/i)){if(_0x4e460d(0x194)!==_0x4e460d(0x194)){const _0x49853d=this[_0x4e460d(0x27a)]();return this[_0x4e460d(0x39e)](_0x49853d);}else _0x21afbd=Number(RegExp['$1']),_0x47d81c=Number(RegExp['$2']);}else _0x2b722e['match'](/<STATE[ ](.*)[ ]TURNS:[ ]([\+\-]\d+)>/i)&&(_0x21afbd=DataManager['getStateIdWithName'](RegExp['$1']),_0x47d81c=Number(RegExp['$2']));_0x43da21['addStateTurns'](_0x21afbd,_0x47d81c),this[_0x4e460d(0x3b9)](_0x43da21);}else _0x5c024e[_0x4e460d(0x346)][_0x4e460d(0xf2)]['call'](this);}},Game_Action[_0x3f4870(0x346)]['applyBuffTurnManipulationEffects']=function(_0x2a2ad1){const _0x5bd931=_0x3f4870,_0x3296b1=[_0x5bd931(0x220),_0x5bd931(0x362),_0x5bd931(0x3a5),_0x5bd931(0x14c),_0x5bd931(0x15f),_0x5bd931(0x2d8),_0x5bd931(0x2bb),'LUK'],_0x375ff4=this[_0x5bd931(0x211)]()[_0x5bd931(0x352)],_0x3a317a=_0x375ff4[_0x5bd931(0x144)](/<SET[ ](.*)[ ]BUFF TURNS:[ ](\d+)>/gi);if(_0x3a317a){if(_0x5bd931(0x29a)!=='jXuOf'){const _0x587d28='_stored_debuffColor';this[_0x5bd931(0x27f)]=this[_0x5bd931(0x27f)]||{};if(this[_0x5bd931(0x27f)][_0x587d28])return this[_0x5bd931(0x27f)][_0x587d28];const _0xcaae1e=_0x5d5340['SkillsStatesCore'][_0x5bd931(0x11c)][_0x5bd931(0x3e9)][_0x5bd931(0x137)];return this[_0x5bd931(0x16b)](_0x587d28,_0xcaae1e);}else for(const _0x1d7338 of _0x3a317a){_0x1d7338['match'](/<SET[ ](.*)[ ]BUFF TURNS:[ ](\d+)>/i);const _0x11cf58=_0x3296b1[_0x5bd931(0x2e4)](String(RegExp['$1'])[_0x5bd931(0x180)]()),_0x236f2f=Number(RegExp['$2']);_0x11cf58>=0x0&&(_0x2a2ad1[_0x5bd931(0x26a)](_0x11cf58,_0x236f2f),this[_0x5bd931(0x3b9)](_0x2a2ad1));}}const _0x3ff16a=_0x375ff4[_0x5bd931(0x144)](/<(.*)[ ]BUFF TURNS:[ ]([\+\-]\d+)>/gi);if(_0x3ff16a){if(_0x5bd931(0x343)===_0x5bd931(0x343))for(const _0x321299 of _0x3a317a){if(_0x5bd931(0x2ab)!==_0x5bd931(0x26c)){_0x321299[_0x5bd931(0x144)](/<(.*)[ ]BUFF TURNS:[ ]([\+\-]\d+)>/i);const _0x234e01=_0x3296b1[_0x5bd931(0x2e4)](String(RegExp['$1'])['toUpperCase']()),_0x2b43bc=Number(RegExp['$2']);_0x234e01>=0x0&&(_0x2a2ad1[_0x5bd931(0x262)](_0x234e01,_0x2b43bc),this[_0x5bd931(0x3b9)](_0x2a2ad1));}else{if(!this[_0x5bd931(0x18a)](_0x211f4d))return![];const _0x594576=this[_0x5bd931(0x186)](),_0x2dcc3b=_0x239fb2[_0x5bd931(0x212)](_0x5365c2),_0x4507d5=_0x594576[_0x5bd931(0x229)](_0x355f67=>_0x2dcc3b[_0x5bd931(0x21b)](_0x355f67));return _0x4507d5['length']>0x0;}}else return this[_0x5bd931(0x236)]();}},Game_Action[_0x3f4870(0x346)][_0x3f4870(0x187)]=function(_0x54ac11){const _0x21413e=_0x3f4870,_0x290786=[_0x21413e(0x220),'MAXMP',_0x21413e(0x3a5),_0x21413e(0x14c),_0x21413e(0x15f),_0x21413e(0x2d8),_0x21413e(0x2bb),_0x21413e(0x383)],_0x7b3370=this[_0x21413e(0x211)]()[_0x21413e(0x352)],_0x26cf6a=_0x7b3370[_0x21413e(0x144)](/<SET[ ](.*)[ ]DEBUFF TURNS:[ ](\d+)>/gi);if(_0x26cf6a){if(_0x21413e(0x24c)===_0x21413e(0x24c))for(const _0x26e5a2 of _0x26cf6a){_0x26e5a2[_0x21413e(0x144)](/<SET[ ](.*)[ ]DEBUFF TURNS:[ ](\d+)>/i);const _0x3fc0f6=_0x290786[_0x21413e(0x2e4)](String(RegExp['$1'])[_0x21413e(0x180)]()),_0x49d400=Number(RegExp['$2']);_0x3fc0f6>=0x0&&(_0x54ac11[_0x21413e(0x134)](_0x3fc0f6,_0x49d400),this[_0x21413e(0x3b9)](_0x54ac11));}else{const _0x548b65=this[_0x21413e(0x388)](_0xe87e6a);_0x39bec0[_0x21413e(0x15a)][_0x21413e(0x358)]['call'](this,_0xc4de11);if(_0x548b65&&this[_0x21413e(0x3a6)](_0x52fe3d[_0x3e338d])){this[_0x21413e(0xf0)](_0x5aab8b);;}}}const _0x44e535=_0x7b3370[_0x21413e(0x144)](/<(.*)[ ]DEBUFF TURNS:[ ]([\+\-]\d+)>/gi);if(_0x44e535){if('gmxIH'==='vkOrc')_0x2662b9[_0x21413e(0x15a)][_0x21413e(0x167)][_0x21413e(0x2b4)](this,_0x2c4322),this[_0x21413e(0x14d)]={};else for(const _0x1ca216 of _0x26cf6a){if('WSHsv'!=='WSHsv'){if(!_0x2da19b[_0x21413e(0x2e8)](_0x139cbd))return![];}else{_0x1ca216[_0x21413e(0x144)](/<(.*)[ ]DEBUFF TURNS:[ ]([\+\-]\d+)>/i);const _0x5ac75b=_0x290786[_0x21413e(0x2e4)](String(RegExp['$1'])[_0x21413e(0x180)]()),_0x482bdd=Number(RegExp['$2']);_0x5ac75b>=0x0&&(_0x54ac11[_0x21413e(0x2dc)](_0x5ac75b,_0x482bdd),this[_0x21413e(0x3b9)](_0x54ac11));}}}},VisuMZ[_0x3f4870(0x15a)][_0x3f4870(0x1ff)]=Game_BattlerBase[_0x3f4870(0x346)][_0x3f4870(0x2f5)],Game_BattlerBase[_0x3f4870(0x346)][_0x3f4870(0x2f5)]=function(){const _0x788a3c=_0x3f4870;this[_0x788a3c(0x14d)]={},this[_0x788a3c(0x159)](),VisuMZ['SkillsStatesCore']['Game_BattlerBase_initMembers'][_0x788a3c(0x2b4)](this);},Game_BattlerBase[_0x3f4870(0x346)][_0x3f4870(0x159)]=function(){const _0x305d5d=_0x3f4870;this[_0x305d5d(0x154)]='',this[_0x305d5d(0x31c)]={},this[_0x305d5d(0x12a)]={},this[_0x305d5d(0x328)]={};},Game_BattlerBase[_0x3f4870(0x346)][_0x3f4870(0x125)]=function(_0x2a1ed6){const _0x2a14c7=_0x3f4870;return this[_0x2a14c7(0x14d)]=this['_cache']||{},this[_0x2a14c7(0x14d)][_0x2a1ed6]!==undefined;},VisuMZ[_0x3f4870(0x15a)]['Game_BattlerBase_refresh']=Game_BattlerBase[_0x3f4870(0x346)]['refresh'],Game_BattlerBase[_0x3f4870(0x346)][_0x3f4870(0x2d0)]=function(){const _0x56dfa9=_0x3f4870;this[_0x56dfa9(0x14d)]={},VisuMZ[_0x56dfa9(0x15a)][_0x56dfa9(0x1c0)][_0x56dfa9(0x2b4)](this);},VisuMZ['SkillsStatesCore']['Game_BattlerBase_eraseState']=Game_BattlerBase[_0x3f4870(0x346)][_0x3f4870(0x303)],Game_BattlerBase[_0x3f4870(0x346)][_0x3f4870(0x303)]=function(_0x585c15){const _0x416f6e=_0x3f4870;let _0x11bdb8=this['isStateAffected'](_0x585c15);VisuMZ['SkillsStatesCore']['Game_BattlerBase_eraseState'][_0x416f6e(0x2b4)](this,_0x585c15);if(_0x11bdb8&&!this[_0x416f6e(0x3cc)](_0x585c15))this[_0x416f6e(0x232)](_0x585c15);},Game_BattlerBase[_0x3f4870(0x346)][_0x3f4870(0x232)]=function(_0x25cb56){const _0x3d2e91=_0x3f4870;this['clearStateData'](_0x25cb56),this[_0x3d2e91(0x34b)](_0x25cb56),this[_0x3d2e91(0x193)](_0x25cb56);},VisuMZ[_0x3f4870(0x15a)][_0x3f4870(0x293)]=Game_BattlerBase['prototype'][_0x3f4870(0x151)],Game_BattlerBase[_0x3f4870(0x346)][_0x3f4870(0x151)]=function(_0x167fd2){const _0x270866=_0x3f4870,_0x3152bd=$dataStates[_0x167fd2],_0x39f28d=this[_0x270866(0xf6)](_0x167fd2),_0x2a34ea=this['getStateReapplyRulings'](_0x3152bd)[_0x270866(0x2dd)]()[_0x270866(0x2e1)]();switch(_0x2a34ea){case'ignore':if(_0x39f28d<=0x0)VisuMZ[_0x270866(0x15a)][_0x270866(0x293)]['call'](this,_0x167fd2);break;case _0x270866(0x19a):VisuMZ[_0x270866(0x15a)][_0x270866(0x293)]['call'](this,_0x167fd2);break;case'greater':VisuMZ[_0x270866(0x15a)][_0x270866(0x293)][_0x270866(0x2b4)](this,_0x167fd2),this[_0x270866(0x325)][_0x167fd2]=Math[_0x270866(0x277)](this[_0x270866(0x325)][_0x167fd2],_0x39f28d);break;case _0x270866(0x27d):VisuMZ[_0x270866(0x15a)][_0x270866(0x293)][_0x270866(0x2b4)](this,_0x167fd2),this['_stateTurns'][_0x167fd2]+=_0x39f28d;break;default:VisuMZ[_0x270866(0x15a)][_0x270866(0x293)][_0x270866(0x2b4)](this,_0x167fd2);break;}},Game_BattlerBase[_0x3f4870(0x346)][_0x3f4870(0x25b)]=function(_0x368612){const _0x47e325=_0x3f4870,_0x44a81f=_0x368612[_0x47e325(0x352)];return _0x44a81f['match'](/<REAPPLY RULES:[ ](.*)>/i)?String(RegExp['$1']):VisuMZ[_0x47e325(0x15a)][_0x47e325(0x11c)][_0x47e325(0x2b9)]['ReapplyRules'];},VisuMZ[_0x3f4870(0x15a)]['Game_BattlerBase_overwriteBuffTurns']=Game_BattlerBase['prototype'][_0x3f4870(0x202)],Game_BattlerBase[_0x3f4870(0x346)][_0x3f4870(0x202)]=function(_0x28c9c7,_0x3fae27){const _0x1adffe=_0x3f4870,_0x54234c=VisuMZ[_0x1adffe(0x15a)][_0x1adffe(0x11c)][_0x1adffe(0x3e9)][_0x1adffe(0x109)],_0x4e0018=this['buffTurns'](_0x28c9c7);switch(_0x54234c){case'ignore':if(_0x4e0018<=0x0)this[_0x1adffe(0x2b2)][_0x28c9c7]=_0x3fae27;break;case'reset':this[_0x1adffe(0x2b2)][_0x28c9c7]=_0x3fae27;break;case _0x1adffe(0x1e9):this[_0x1adffe(0x2b2)][_0x28c9c7]=Math['max'](_0x4e0018,_0x3fae27);break;case _0x1adffe(0x27d):this[_0x1adffe(0x2b2)][_0x28c9c7]+=_0x3fae27;break;default:VisuMZ[_0x1adffe(0x15a)][_0x1adffe(0x3cb)][_0x1adffe(0x2b4)](this,_0x28c9c7,_0x3fae27);break;}const _0x15df1b=VisuMZ[_0x1adffe(0x15a)][_0x1adffe(0x11c)][_0x1adffe(0x3e9)][_0x1adffe(0x23d)];this[_0x1adffe(0x2b2)][_0x28c9c7]=this[_0x1adffe(0x2b2)][_0x28c9c7][_0x1adffe(0x14e)](0x0,_0x15df1b);},Game_BattlerBase['prototype']['isGroupDefeatStateAffected']=function(){const _0xf4810c=_0x3f4870;if(this[_0xf4810c(0x14d)][_0xf4810c(0x18b)]!==undefined)return this[_0xf4810c(0x14d)][_0xf4810c(0x18b)];this[_0xf4810c(0x14d)]['groupDefeat']=![];const _0x4e99ba=this[_0xf4810c(0x3ce)]();for(const _0x7b13cd of _0x4e99ba){if(_0xf4810c(0x1c8)===_0xf4810c(0x1c8)){if(!_0x7b13cd)continue;if(_0x7b13cd[_0xf4810c(0x352)][_0xf4810c(0x144)](/<GROUP DEFEAT>/i)){this[_0xf4810c(0x14d)][_0xf4810c(0x18b)]=!![];break;}}else{const _0x3c7828=_0x1fe6db(_0x4dde3a['$1']);_0x3c7828!==_0x2765be[_0x3e1aa9][_0xf4810c(0x263)]&&(_0x4f1e8e(_0xf4810c(0x2c2)[_0xf4810c(0x2e5)](_0x2bcfc8,_0x3c7828)),_0x266bb6['exit']());}}return this[_0xf4810c(0x14d)][_0xf4810c(0x18b)];},VisuMZ[_0x3f4870(0x15a)]['Game_BattlerBase_clearStates']=Game_BattlerBase[_0x3f4870(0x346)][_0x3f4870(0x260)],Game_BattlerBase[_0x3f4870(0x346)]['clearStates']=function(){const _0x275c96=_0x3f4870;if(this[_0x275c96(0x196)]()!==''){if(_0x275c96(0x2da)===_0x275c96(0x338)){if(!_0x5bcab9[_0x275c96(0x2e8)](_0x590481))return![];}else this[_0x275c96(0x3d0)]();}else VisuMZ['SkillsStatesCore'][_0x275c96(0x23c)]['call'](this),this[_0x275c96(0x159)]();},Game_Actor[_0x3f4870(0x346)][_0x3f4870(0x260)]=function(){const _0x5d1db4=_0x3f4870;this[_0x5d1db4(0x367)]=this[_0x5d1db4(0x367)]||{},Game_Battler[_0x5d1db4(0x346)][_0x5d1db4(0x260)][_0x5d1db4(0x2b4)](this);},Game_BattlerBase[_0x3f4870(0x346)]['clearStatesWithStateRetain']=function(){const _0x57f163=_0x3f4870,_0x249028=this['states']();for(const _0xa7080d of _0x249028){if('OrROA'===_0x57f163(0x36c)){if(_0xa7080d&&this[_0x57f163(0x1f9)](_0xa7080d))this[_0x57f163(0x303)](_0xa7080d['id']);}else{if(_0x425a62[_0x57f163(0x290)]())_0x33e2b6[_0x57f163(0x10b)](_0x47ce86);}}this[_0x57f163(0x14d)]={};},Game_BattlerBase[_0x3f4870(0x346)]['canClearState']=function(_0x47921f){const _0x2fd9f2=_0x3f4870,_0x382150=this[_0x2fd9f2(0x196)]();if(_0x382150!==''){if('YjSJo'===_0x2fd9f2(0x2a1)){const _0x3ba86c=_0x47921f['note'];if(_0x382150==='death'&&_0x3ba86c['match'](/<NO DEATH CLEAR>/i))return![];if(_0x382150===_0x2fd9f2(0x3d9)&&_0x3ba86c[_0x2fd9f2(0x144)](/<NO RECOVER ALL CLEAR>/i))return![];}else _0x1eecf6[_0x2fd9f2(0x346)][_0x2fd9f2(0x136)][_0x2fd9f2(0x2b4)](this,_0x50b2df,_0x5bf4df,0x0,0x0),_0x2bf62a[_0x2fd9f2(0x346)][_0x2fd9f2(0x190)][_0x2fd9f2(0x2b4)](this,_0x28aed6,_0xbff6fc,0x0,0x0);}return this[_0x2fd9f2(0x3cc)](_0x47921f['id']);},Game_BattlerBase[_0x3f4870(0x346)]['getStateRetainType']=function(){return this['_stateRetainType'];},Game_BattlerBase[_0x3f4870(0x346)]['setStateRetainType']=function(_0x5ee7a2){const _0x41ed75=_0x3f4870;this[_0x41ed75(0x154)]=_0x5ee7a2;},Game_BattlerBase['prototype'][_0x3f4870(0x304)]=function(){this['_stateRetainType']='';},VisuMZ[_0x3f4870(0x15a)]['Game_BattlerBase_die']=Game_BattlerBase[_0x3f4870(0x346)][_0x3f4870(0x181)],Game_BattlerBase['prototype'][_0x3f4870(0x181)]=function(){const _0x3e1e84=_0x3f4870;this['setStateRetainType'](_0x3e1e84(0x11e)),VisuMZ['SkillsStatesCore'][_0x3e1e84(0x2a7)][_0x3e1e84(0x2b4)](this),this[_0x3e1e84(0x304)]();},VisuMZ['SkillsStatesCore'][_0x3f4870(0x276)]=Game_BattlerBase[_0x3f4870(0x346)]['recoverAll'],Game_BattlerBase[_0x3f4870(0x346)][_0x3f4870(0x35f)]=function(){const _0x2fa489=_0x3f4870;this['setStateRetainType'](_0x2fa489(0x3d9)),VisuMZ[_0x2fa489(0x15a)][_0x2fa489(0x276)][_0x2fa489(0x2b4)](this),this[_0x2fa489(0x304)]();},Game_BattlerBase[_0x3f4870(0x346)][_0x3f4870(0x141)]=function(_0x2b019a){const _0x4a0b22=_0x3f4870;for(settings of VisuMZ[_0x4a0b22(0x15a)][_0x4a0b22(0x11c)][_0x4a0b22(0x3a9)]){if(_0x4a0b22(0x33f)===_0x4a0b22(0x33f)){const _0x4d93e7=settings[_0x4a0b22(0x337)][_0x4a0b22(0x2b4)](this,_0x2b019a);if(!settings[_0x4a0b22(0x360)]['call'](this,_0x2b019a,_0x4d93e7))return![];}else return!![];}return!![];},Game_BattlerBase['prototype'][_0x3f4870(0x1b1)]=function(_0x2a0058){const _0x9d91a=_0x3f4870;for(settings of VisuMZ[_0x9d91a(0x15a)][_0x9d91a(0x11c)]['Costs']){if(_0x9d91a(0x3d4)!=='AuPbw'){const _0x2f0a13=settings[_0x9d91a(0x337)][_0x9d91a(0x2b4)](this,_0x2a0058);settings[_0x9d91a(0x3f0)][_0x9d91a(0x2b4)](this,_0x2a0058,_0x2f0a13);}else return _0x2612ac[_0x9d91a(0x15a)]['Settings'][_0x9d91a(0x1a0)][_0x9d91a(0x22c)][_0x9d91a(0x2b4)](this,_0x40294d);}},VisuMZ[_0x3f4870(0x15a)][_0x3f4870(0xe8)]=Game_BattlerBase[_0x3f4870(0x346)][_0x3f4870(0x29f)],Game_BattlerBase[_0x3f4870(0x346)][_0x3f4870(0x29f)]=function(_0x393009){const _0x3a5616=_0x3f4870;if(!_0x393009)return![];if(!VisuMZ[_0x3a5616(0x15a)]['Game_BattlerBase_meetsSkillConditions'][_0x3a5616(0x2b4)](this,_0x393009))return![];if(!this['checkSkillConditionsNotetags'](_0x393009))return![];if(!this['meetsSkillConditionsEnableJS'](_0x393009))return![];if(!this[_0x3a5616(0x390)](_0x393009))return![];return!![];},Game_BattlerBase[_0x3f4870(0x346)][_0x3f4870(0x233)]=function(_0x1bb887){const _0x5c7fc7=_0x3f4870;if(!this[_0x5c7fc7(0x13b)](_0x1bb887))return![];return!![];},Game_BattlerBase[_0x3f4870(0x346)]['checkSkillConditionsSwitchNotetags']=function(_0x2012df){const _0x1909da=_0x3f4870,_0x441696=_0x2012df[_0x1909da(0x352)];if(_0x441696['match'](/<ENABLE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x41350c=JSON[_0x1909da(0x18d)]('['+RegExp['$1'][_0x1909da(0x144)](/\d+/g)+']');for(const _0x32aaef of _0x41350c){if('gvgVT'!==_0x1909da(0xec)){if(!$gameSwitches[_0x1909da(0x2e8)](_0x32aaef))return![];}else this[_0x1909da(0x2ef)][_0x1909da(0x27e)](),this[_0x1909da(0x131)]();}return!![];}if(_0x441696[_0x1909da(0x144)](/<ENABLE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x1909da(0x2d3)!==_0x1909da(0x2d3))return this[_0x1909da(0x3e4)]=this[_0x1909da(0x3e4)]||_0xcaa988[_0x1909da(0x1ab)],this[_0x1909da(0x3e4)];else{const _0x33214d=JSON[_0x1909da(0x18d)]('['+RegExp['$1'][_0x1909da(0x144)](/\d+/g)+']');for(const _0x2e4975 of _0x33214d){if(!$gameSwitches[_0x1909da(0x2e8)](_0x2e4975))return![];}return!![];}}if(_0x441696['match'](/<ENABLE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0xfd26e1=JSON['parse']('['+RegExp['$1'][_0x1909da(0x144)](/\d+/g)+']');for(const _0x4c23d3 of _0xfd26e1){if(_0x1909da(0x255)!=='EUIqM'){const _0x3172a1=_0x55ab98['$1']['split'](',');for(const _0x11cbaa of _0x3172a1){const _0x461588=_0x257cda[_0x1909da(0x353)](_0x11cbaa);if(_0x461588)this['_stypeIDs'][_0x2dd0e4['id']][_0x1909da(0x2d2)](_0x461588);}}else{if($gameSwitches[_0x1909da(0x2e8)](_0x4c23d3))return!![];}}return![];}if(_0x441696[_0x1909da(0x144)](/<DISABLE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x198280=JSON['parse']('['+RegExp['$1'][_0x1909da(0x144)](/\d+/g)+']');for(const _0x5ca5d4 of _0x198280){if(_0x1909da(0x334)!==_0x1909da(0x334))return new _0x5b8b0d(_0xa03431(_0x3a4413['$1']),-0x1f4,-0x1f4);else{if(!$gameSwitches[_0x1909da(0x2e8)](_0x5ca5d4))return!![];}}return![];}if(_0x441696[_0x1909da(0x144)](/<DISABLE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x1909da(0x1ed)!==_0x1909da(0x315)){const _0x4dc825=JSON[_0x1909da(0x18d)]('['+RegExp['$1'][_0x1909da(0x144)](/\d+/g)+']');for(const _0x59018c of _0x4dc825){if(_0x1909da(0x396)===_0x1909da(0x396)){if(!$gameSwitches[_0x1909da(0x2e8)](_0x59018c))return!![];}else return'\x20';}return![];}else return _0x1cfd8c[_0x1909da(0x1ae)]()[_0x20c956(_0x4a9e1c['$1'])];}if(_0x441696[_0x1909da(0x144)](/<DISABLE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x1909da(0x23e)!==_0x1909da(0x23e))this[_0x1909da(0x111)](_0x2eb2ef),this['onAddStateMakeCustomSlipValues'](_0x42b1d6),this[_0x1909da(0x391)](_0x17f634),this['onAddStateGlobalJS'](_0x2731a7);else{const _0x36a900=JSON[_0x1909da(0x18d)]('['+RegExp['$1'][_0x1909da(0x144)](/\d+/g)+']');for(const _0x3a9c49 of _0x36a900){if(_0x1909da(0xea)!==_0x1909da(0xea))_0x44ee+=_0x19e1de+0x18;else{if($gameSwitches[_0x1909da(0x2e8)](_0x3a9c49))return![];}}return!![];}}return!![];},Game_BattlerBase[_0x3f4870(0x346)][_0x3f4870(0x110)]=function(_0x39bc82){const _0x179af3=_0x3f4870,_0x5d2ab9=_0x39bc82['note'],_0x473ff8=VisuMZ['SkillsStatesCore'][_0x179af3(0x32a)];if(_0x473ff8[_0x39bc82['id']])return _0x179af3(0x142)===_0x179af3(0x142)?_0x473ff8[_0x39bc82['id']]['call'](this,_0x39bc82):_0x14112b['note'][_0x179af3(0x144)](/<PASSIVE STACKABLE>/i);else{if('bsOzv'!==_0x179af3(0x158))return!![];else for(const _0x5c683d of _0x2e7338){let _0x1e84aa=0x0,_0x1f28bf=0x0;if(_0x5c683d[_0x179af3(0x144)](/<STATE[ ](\d+)[ ]TURNS:[ ]([\+\-]\d+)>/i))_0x1e84aa=_0x2675c9(_0x7e54fa['$1']),_0x1f28bf=_0x4fb485(_0x577171['$2']);else _0x5c683d[_0x179af3(0x144)](/<STATE[ ](.*)[ ]TURNS:[ ]([\+\-]\d+)>/i)&&(_0x1e84aa=_0x2f978c['getStateIdWithName'](_0x367cb1['$1']),_0x1f28bf=_0x16b9d6(_0x1373d3['$2']));_0x1f5ebc[_0x179af3(0x138)](_0x1e84aa,_0x1f28bf),this[_0x179af3(0x3b9)](_0x2148fd);}}},Game_BattlerBase['prototype'][_0x3f4870(0x390)]=function(_0x41d123){const _0x4e537d=_0x3f4870;return VisuMZ[_0x4e537d(0x15a)][_0x4e537d(0x11c)]['Skills'][_0x4e537d(0x332)][_0x4e537d(0x2b4)](this,_0x41d123);},VisuMZ[_0x3f4870(0x15a)][_0x3f4870(0x3da)]=Game_BattlerBase[_0x3f4870(0x346)][_0x3f4870(0x127)],Game_BattlerBase[_0x3f4870(0x346)][_0x3f4870(0x127)]=function(_0x2eb017){const _0x174641=_0x3f4870;for(settings of VisuMZ[_0x174641(0x15a)]['Settings'][_0x174641(0x3a9)]){if(_0x174641(0x135)===_0x174641(0x1d5)){const _0x55472a=_0x551d9c[_0x174641(0x18d)]('['+_0x2e866c['$1'][_0x174641(0x144)](/\d+/g)+']');for(const _0x5d099c of _0x55472a){if(!_0x31d7d9[_0x174641(0x2e8)](_0x5d099c))return!![];}return![];}else{if(settings['Name']['toUpperCase']()==='MP')return settings[_0x174641(0x337)][_0x174641(0x2b4)](this,_0x2eb017);}}return VisuMZ[_0x174641(0x15a)][_0x174641(0x3da)]['call'](this,_0x2eb017);},VisuMZ[_0x3f4870(0x15a)]['Game_BattlerBase_skillTpCost']=Game_BattlerBase[_0x3f4870(0x346)][_0x3f4870(0x2fd)],Game_BattlerBase[_0x3f4870(0x346)][_0x3f4870(0x2fd)]=function(_0x1cbb3f){const _0x194260=_0x3f4870;for(settings of VisuMZ[_0x194260(0x15a)][_0x194260(0x11c)]['Costs']){if(_0x194260(0x117)===_0x194260(0x117)){if(settings[_0x194260(0x3ae)][_0x194260(0x180)]()==='TP')return settings[_0x194260(0x337)][_0x194260(0x2b4)](this,_0x1cbb3f);}else this[_0x194260(0x325)][_0x394556]--;}return VisuMZ[_0x194260(0x15a)][_0x194260(0x23f)][_0x194260(0x2b4)](this,_0x1cbb3f);},Game_BattlerBase[_0x3f4870(0x346)][_0x3f4870(0x3a6)]=function(_0x5c6e82){const _0x197db7=_0x3f4870;if(typeof _0x5c6e82===_0x197db7(0x1e8))_0x5c6e82=$dataStates[_0x5c6e82];return this[_0x197db7(0x3ce)]()[_0x197db7(0x21b)](_0x5c6e82);},VisuMZ[_0x3f4870(0x15a)][_0x3f4870(0x348)]=Game_BattlerBase[_0x3f4870(0x346)][_0x3f4870(0x3ce)],Game_BattlerBase[_0x3f4870(0x346)][_0x3f4870(0x3ce)]=function(){const _0xe73bfc=_0x3f4870;let _0x16d632=VisuMZ[_0xe73bfc(0x15a)][_0xe73bfc(0x348)][_0xe73bfc(0x2b4)](this);if(this[_0xe73bfc(0x2e3)])return _0x16d632;return this['_checkingPassiveStates']=!![],this[_0xe73bfc(0x1be)](_0x16d632),this['_checkingPassiveStates']=undefined,_0x16d632;},Game_BattlerBase['prototype']['addPassiveStates']=function(_0x1a18fd){const _0x286fa2=_0x3f4870,_0x14b314=this[_0x286fa2(0x3b3)]();for(state of _0x14b314){if(!state)continue;if(!this['isPassiveStateStackable'](state)&&_0x1a18fd[_0x286fa2(0x21b)](state))continue;_0x1a18fd[_0x286fa2(0x2d2)](state);}_0x14b314[_0x286fa2(0x1dd)]>0x0&&_0x1a18fd[_0x286fa2(0x342)]((_0x5db23b,_0x2fb164)=>{const _0x55155f=_0x286fa2,_0x444e9a=_0x5db23b[_0x55155f(0x121)],_0xa1270b=_0x2fb164[_0x55155f(0x121)];if(_0x444e9a!==_0xa1270b)return _0xa1270b-_0x444e9a;return _0x5db23b-_0x2fb164;});},Game_BattlerBase['prototype'][_0x3f4870(0x286)]=function(_0x11c762){const _0x6f6556=_0x3f4870;return _0x11c762[_0x6f6556(0x352)]['match'](/<PASSIVE STACKABLE>/i);},VisuMZ[_0x3f4870(0x15a)][_0x3f4870(0x1d9)]=Game_BattlerBase[_0x3f4870(0x346)][_0x3f4870(0x279)],Game_BattlerBase[_0x3f4870(0x346)]['traitsSet']=function(_0x5ec0b7){const _0x508930=_0x3f4870;this[_0x508930(0x275)]=!![];let _0x2405e7=VisuMZ[_0x508930(0x15a)]['Game_BattlerBase_traitsSet'][_0x508930(0x2b4)](this,_0x5ec0b7);return this['_checkingTraitsSetSkillsStatesCore']=undefined,_0x2405e7;},Game_BattlerBase['prototype'][_0x3f4870(0x15b)]=function(){const _0x4a768f=_0x3f4870;let _0x581788=[];this[_0x4a768f(0x147)]=this[_0x4a768f(0x147)]||{};for(;;){if(_0x4a768f(0x3a0)===_0x4a768f(0x3a0)){_0x581788=[];let _0x36d863=!![];for(const _0x1d7e81 of this[_0x4a768f(0x14d)][_0x4a768f(0x3b3)]){const _0x47ba5e=$dataStates[_0x1d7e81];if(!_0x47ba5e)continue;let _0x2ea85b=this['meetsPassiveStateConditions'](_0x47ba5e);if(this['_passiveStateResults'][_0x1d7e81]!==_0x2ea85b){if(_0x4a768f(0x281)!==_0x4a768f(0x2f1))_0x36d863=![],this['_passiveStateResults'][_0x1d7e81]=_0x2ea85b;else{if(_0x2d8a81[_0x4a768f(0x24d)])return _0x37df89[_0x4a768f(0x24d)];else{if(_0x8c041a[_0x4a768f(0x2f7)])return _0x213554[_0x4a768f(0x2f7)];}}}if(!_0x2ea85b)continue;_0x581788[_0x4a768f(0x2d2)](_0x47ba5e);}if(_0x36d863)break;else{if(!this[_0x4a768f(0x275)])this[_0x4a768f(0x2d0)]();this[_0x4a768f(0x29e)]();}}else return _0x517e49[_0x4a768f(0x15a)]['Settings'][_0x4a768f(0x2d9)][_0x4a768f(0x332)][_0x4a768f(0x2b4)](this,_0x4a135e);}return _0x581788;},Game_BattlerBase[_0x3f4870(0x346)][_0x3f4870(0x3cd)]=function(_0x38990c){const _0xa9414f=_0x3f4870;if(!this[_0xa9414f(0x16d)](_0x38990c))return![];if(!this[_0xa9414f(0x33d)](_0x38990c))return![];if(!this[_0xa9414f(0x30c)](_0x38990c))return![];if(!this[_0xa9414f(0x3ef)](_0x38990c))return![];return!![];},Game_BattlerBase[_0x3f4870(0x346)]['meetsPassiveStateConditionClasses']=function(_0x2b22dd){return!![];},Game_Actor[_0x3f4870(0x346)][_0x3f4870(0x16d)]=function(_0x41f67a){const _0x37d085=_0x3f4870,_0x4920e1=_0x41f67a[_0x37d085(0x352)];if(_0x4920e1[_0x37d085(0x144)](/<PASSIVE CONDITION[ ](?:CLASS|CLASSES):[ ](.*)>/i)){if(_0x37d085(0x300)===_0x37d085(0x300)){const _0x3ede1d=String(RegExp['$1'])[_0x37d085(0x200)](',')['map'](_0x5c39be=>_0x5c39be['trim']()),_0x5f0517=VisuMZ['SkillsStatesCore'][_0x37d085(0x3ea)](_0x3ede1d);return _0x5f0517[_0x37d085(0x21b)](this[_0x37d085(0x13a)]());}else _0xb499b7[_0x37d085(0x26a)](_0x1bf25d,_0x1212da),this[_0x37d085(0x3b9)](_0xaa6553);}if(_0x4920e1[_0x37d085(0x144)](/<PASSIVE CONDITION[ ](?:MULTICLASS|MULTICLASSES):[ ](.*)>/i)){const _0x81ae35=String(RegExp['$1'])[_0x37d085(0x200)](',')['map'](_0x1f3b4c=>_0x1f3b4c[_0x37d085(0x2e1)]()),_0x361213=VisuMZ[_0x37d085(0x15a)][_0x37d085(0x3ea)](_0x81ae35);let _0x52c098=[this[_0x37d085(0x13a)]()];return Imported[_0x37d085(0x3d1)]&&this[_0x37d085(0x28e)]&&(_0x52c098=this['multiclasses']()),_0x361213[_0x37d085(0x229)](_0x5f26a2=>_0x52c098[_0x37d085(0x21b)](_0x5f26a2))[_0x37d085(0x1dd)]>0x0;}return Game_BattlerBase['prototype']['meetsPassiveStateConditionClasses'][_0x37d085(0x2b4)](this,_0x41f67a);},VisuMZ[_0x3f4870(0x15a)][_0x3f4870(0x3ea)]=function(_0x4ea4fc){const _0xde804e=_0x3f4870,_0xd033b4=[];for(let _0x5b6918 of _0x4ea4fc){if(_0xde804e(0x116)===_0xde804e(0x116)){_0x5b6918=(String(_0x5b6918)||'')[_0xde804e(0x2e1)]();const _0x101c18=/^\d+$/[_0xde804e(0x15d)](_0x5b6918);if(_0x101c18)_0xd033b4[_0xde804e(0x2d2)](Number(_0x5b6918));else{if('GeXHk'===_0xde804e(0x126))_0xd033b4[_0xde804e(0x2d2)](DataManager[_0xde804e(0x215)](_0x5b6918));else return this[_0xde804e(0x1a2)]();}}else _0x5102dc['categories'][_0xde804e(0x2d2)](_0x59e6ed['toUpperCase']()[_0xde804e(0x2e1)]());}return _0xd033b4['map'](_0x43ef98=>$dataClasses[Number(_0x43ef98)])['remove'](null);},Game_BattlerBase[_0x3f4870(0x346)][_0x3f4870(0x33d)]=function(_0x4a205b){const _0x16c0d8=_0x3f4870,_0x2f0a60=_0x4a205b['note'];if(_0x2f0a60['match'](/<PASSIVE CONDITION[ ](?:SWITCH|SWITCHES)[ ]ON:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x16c0d8(0x345)===_0x16c0d8(0x1c4))this[_0x16c0d8(0x1e3)](_0x964f35,_0x484e3f);else{const _0x4289c6=JSON['parse']('['+RegExp['$1'][_0x16c0d8(0x144)](/\d+/g)+']');for(const _0x20e1b7 of _0x4289c6){if(_0x16c0d8(0x347)!==_0x16c0d8(0x347)){const _0x102c46=_0x93f877[_0x3e4fa4-_0x581891[_0x16c0d8(0x1dd)]];this['drawActorBuffTurns'](_0x475cbe,_0x102c46,_0xd9a70e,_0x471aab),this['drawActorBuffRates'](_0x34a29f,_0x102c46,_0x10f900,_0x16752d);}else{if(!$gameSwitches['value'](_0x20e1b7))return![];}}return!![];}}if(_0x2f0a60['match'](/<PASSIVE CONDITION ALL[ ](?:SWITCH|SWITCHES)[ ]ON:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x504d2=JSON['parse']('['+RegExp['$1'][_0x16c0d8(0x144)](/\d+/g)+']');for(const _0x3553f6 of _0x504d2){if(!$gameSwitches[_0x16c0d8(0x2e8)](_0x3553f6))return![];}return!![];}if(_0x2f0a60['match'](/<PASSIVE CONDITION ANY[ ](?:SWITCH|SWITCHES)[ ]ON:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0xae4389=JSON[_0x16c0d8(0x18d)]('['+RegExp['$1'][_0x16c0d8(0x144)](/\d+/g)+']');for(const _0x7245ba of _0xae4389){if($gameSwitches[_0x16c0d8(0x2e8)](_0x7245ba))return!![];}return![];}if(_0x2f0a60[_0x16c0d8(0x144)](/<PASSIVE CONDITION[ ](?:SWITCH|SWITCHES)[ ]OFF:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x16c0d8(0x146)===_0x16c0d8(0x146)){const _0x173962=JSON[_0x16c0d8(0x18d)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x4ee563 of _0x173962){if(!$gameSwitches[_0x16c0d8(0x2e8)](_0x4ee563))return!![];}return![];}else for(const _0x4dc601 of _0xb931ed){_0x4dc601['match'](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ](\d+)>/i);const _0x267665=_0x375781(_0x335106['$1']),_0x50d174=_0x51bda1(_0x50e537['$2']);_0x207b32[_0x16c0d8(0x10a)](_0x267665,_0x50d174);}}if(_0x2f0a60['match'](/<PASSIVE CONDITION ALL[ ](?:SWITCH|SWITCHES)[ ]OFF:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x530d70=JSON[_0x16c0d8(0x18d)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x5e56a2 of _0x530d70){if(_0x16c0d8(0x184)!==_0x16c0d8(0x10d)){if(!$gameSwitches[_0x16c0d8(0x2e8)](_0x5e56a2))return!![];}else{const _0x5db8c=_0x1ffbff(_0x505015['$1'])[_0x16c0d8(0x200)](',')[_0x16c0d8(0x385)](_0x152ca8=>_0x152ca8[_0x16c0d8(0x2e1)]()),_0x5a4daf=_0x5ca9d6[_0x16c0d8(0x15a)][_0x16c0d8(0x3ea)](_0x5db8c);let _0x422809=[this['currentClass']()];return _0x4bc057[_0x16c0d8(0x3d1)]&&this[_0x16c0d8(0x28e)]&&(_0x422809=this[_0x16c0d8(0x28e)]()),_0x5a4daf[_0x16c0d8(0x229)](_0x17f4ce=>_0x422809[_0x16c0d8(0x21b)](_0x17f4ce))[_0x16c0d8(0x1dd)]>0x0;}}return![];}if(_0x2f0a60[_0x16c0d8(0x144)](/<PASSIVE CONDITION ANY[ ](?:SWITCH|SWITCHES)[ ]OFF:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x16c0d8(0x2e6)!=='cnZMF'){const _0xff058=_0x3302c3[_0x16c0d8(0x2f6)](_0x1acf52);this[_0x16c0d8(0x325)][_0x29b64a]=_0x3ad72c[_0x16c0d8(0x14e)](0x0,_0xff058);if(this[_0x16c0d8(0x325)][_0x47b0c5]<=0x0)this['removeState'](_0x36cbf2);}else{const _0x264584=JSON[_0x16c0d8(0x18d)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x5a9952 of _0x264584){if('YLKyf'!=='yaTDL'){if($gameSwitches['value'](_0x5a9952))return![];}else{_0x18618a['SkillsStatesCore'][_0x16c0d8(0x3cf)][_0x16c0d8(0x2b4)](this);if(this[_0x16c0d8(0x28a)])this[_0x16c0d8(0x2c7)]();}}return!![];}}return!![];},Game_BattlerBase[_0x3f4870(0x346)][_0x3f4870(0x30c)]=function(_0x851c39){const _0x13a4de=_0x3f4870,_0x3b0522=VisuMZ[_0x13a4de(0x15a)][_0x13a4de(0x329)];if(_0x3b0522[_0x851c39['id']]&&!_0x3b0522[_0x851c39['id']][_0x13a4de(0x2b4)](this,_0x851c39))return![];return!![];},Game_BattlerBase[_0x3f4870(0x346)][_0x3f4870(0x3ef)]=function(_0x2786fd){const _0x43dd86=_0x3f4870;return VisuMZ[_0x43dd86(0x15a)][_0x43dd86(0x11c)]['PassiveStates'][_0x43dd86(0x22c)][_0x43dd86(0x2b4)](this,_0x2786fd);},Game_BattlerBase['prototype'][_0x3f4870(0x3b3)]=function(){const _0x18d172=_0x3f4870;if(this[_0x18d172(0x125)](_0x18d172(0x3b3)))return this[_0x18d172(0x15b)]();if(this['_checkingVisuMzPassiveStateObjects'])return[];return this[_0x18d172(0x2f4)]=!![],this[_0x18d172(0x29e)](),this[_0x18d172(0x2f4)]=undefined,this[_0x18d172(0x15b)]();},Game_BattlerBase['prototype'][_0x3f4870(0x29e)]=function(){const _0x3281de=_0x3f4870;this[_0x3281de(0x2f4)]=!![],this[_0x3281de(0x14d)]['passiveStates']=[],this[_0x3281de(0x132)](),this[_0x3281de(0x3ac)](),this[_0x3281de(0x2c9)](),this[_0x3281de(0x2f4)]=undefined;},Game_BattlerBase[_0x3f4870(0x346)][_0x3f4870(0x132)]=function(){const _0x3458ce=_0x3f4870;if(Imported[_0x3458ce(0xe3)])this['addPassiveStatesTraitSets']();},Game_BattlerBase[_0x3f4870(0x346)][_0x3f4870(0x269)]=function(){return[];},Game_BattlerBase['prototype']['addPassiveStatesByNotetag']=function(){const _0x3ba14c=_0x3f4870,_0x9fd0bc=this[_0x3ba14c(0x269)]();for(const _0x17aac1 of _0x9fd0bc){if(!_0x17aac1)continue;const _0x2ba590=_0x17aac1[_0x3ba14c(0x352)][_0x3ba14c(0x144)](/<PASSIVE (?:STATE|STATES):[ ](.*)>/gi);if(_0x2ba590)for(const _0x2e4b15 of _0x2ba590){_0x2e4b15[_0x3ba14c(0x144)](/<PASSIVE (?:STATE|STATES):[ ](.*)>/i);const _0x4aae1e=RegExp['$1'];if(_0x4aae1e['match'](/(\d+(?:\s*,\s*\d+)*)/i)){if(_0x3ba14c(0x2e7)==='gMvsV'){const _0x56af70=JSON[_0x3ba14c(0x18d)]('['+RegExp['$1'][_0x3ba14c(0x144)](/\d+/g)+']');this['_cache'][_0x3ba14c(0x3b3)]=this[_0x3ba14c(0x14d)][_0x3ba14c(0x3b3)][_0x3ba14c(0x2cd)](_0x56af70);}else{const _0x1cbeca=_0x3f5f7c(_0x35ef66['$1'])[_0x3ba14c(0x200)](/[\r\n]+/)['map'](_0x5d5687=>_0x47571d(_0x5d5687)[_0x3ba14c(0x180)]()[_0x3ba14c(0x2e1)]());_0x2de521=_0x4fedad[_0x3ba14c(0x2cd)](_0x1cbeca);}}else{const _0x5616b0=_0x4aae1e['split'](',');for(const _0x3a725d of _0x5616b0){const _0x191dc1=DataManager[_0x3ba14c(0x237)](_0x3a725d);if(_0x191dc1)this[_0x3ba14c(0x14d)]['passiveStates'][_0x3ba14c(0x2d2)](_0x191dc1);}}}}},Game_BattlerBase['prototype'][_0x3f4870(0x2c9)]=function(){const _0x4e1145=_0x3f4870,_0x4b29c7=VisuMZ[_0x4e1145(0x15a)][_0x4e1145(0x11c)][_0x4e1145(0x1a0)][_0x4e1145(0x312)];this[_0x4e1145(0x14d)][_0x4e1145(0x3b3)]=this[_0x4e1145(0x14d)]['passiveStates'][_0x4e1145(0x2cd)](_0x4b29c7);},Game_BattlerBase[_0x3f4870(0x346)][_0x3f4870(0xf6)]=function(_0x4ab7be){const _0xb9c26=_0x3f4870;if(typeof _0x4ab7be!==_0xb9c26(0x1e8))_0x4ab7be=_0x4ab7be['id'];return this[_0xb9c26(0x325)][_0x4ab7be]||0x0;},Game_BattlerBase['prototype'][_0x3f4870(0x34a)]=function(_0x345942,_0x22279e){const _0x5d0d9c=_0x3f4870;if(typeof _0x345942!==_0x5d0d9c(0x1e8))_0x345942=_0x345942['id'];if(this[_0x5d0d9c(0x3cc)](_0x345942)){if(_0x5d0d9c(0x1d0)==='LcVRu'){const _0x1032c9=DataManager[_0x5d0d9c(0x2f6)](_0x345942);this[_0x5d0d9c(0x325)][_0x345942]=_0x22279e[_0x5d0d9c(0x14e)](0x0,_0x1032c9);if(this[_0x5d0d9c(0x325)][_0x345942]<=0x0)this[_0x5d0d9c(0x2ee)](_0x345942);}else{if(_0x26878b[_0x5d0d9c(0x2e8)](_0x6bde45))return![];}}},Game_BattlerBase[_0x3f4870(0x346)][_0x3f4870(0x138)]=function(_0x17ee7c,_0x3b8e9f){const _0x263bec=_0x3f4870;if(typeof _0x17ee7c!==_0x263bec(0x1e8))_0x17ee7c=_0x17ee7c['id'];this[_0x263bec(0x3cc)](_0x17ee7c)&&(_0x3b8e9f+=this[_0x263bec(0xf6)](_0x17ee7c),this['setStateTurns'](_0x17ee7c,_0x3b8e9f));},VisuMZ[_0x3f4870(0x15a)][_0x3f4870(0x2b7)]=Game_BattlerBase['prototype']['eraseBuff'],Game_BattlerBase[_0x3f4870(0x346)][_0x3f4870(0x272)]=function(_0x3d92fc){const _0x4d846b=_0x3f4870,_0xaf220=this[_0x4d846b(0x354)][_0x3d92fc];VisuMZ[_0x4d846b(0x15a)][_0x4d846b(0x2b7)][_0x4d846b(0x2b4)](this,_0x3d92fc);if(_0xaf220>0x0)this[_0x4d846b(0x2b3)](_0x3d92fc);if(_0xaf220<0x0)this[_0x4d846b(0x1ec)](_0x3d92fc);},VisuMZ[_0x3f4870(0x15a)]['Game_BattlerBase_increaseBuff']=Game_BattlerBase[_0x3f4870(0x346)][_0x3f4870(0x289)],Game_BattlerBase['prototype'][_0x3f4870(0x289)]=function(_0x2fcead){const _0x47dbf0=_0x3f4870;VisuMZ[_0x47dbf0(0x15a)][_0x47dbf0(0x38d)][_0x47dbf0(0x2b4)](this,_0x2fcead);if(!this['isBuffOrDebuffAffected'](_0x2fcead))this[_0x47dbf0(0x272)](_0x2fcead);},VisuMZ['SkillsStatesCore'][_0x3f4870(0x28f)]=Game_BattlerBase['prototype']['decreaseBuff'],Game_BattlerBase[_0x3f4870(0x346)][_0x3f4870(0x32e)]=function(_0x264652){const _0x4a868a=_0x3f4870;VisuMZ['SkillsStatesCore'][_0x4a868a(0x28f)]['call'](this,_0x264652);if(!this['isBuffOrDebuffAffected'](_0x264652))this[_0x4a868a(0x272)](_0x264652);},Game_BattlerBase[_0x3f4870(0x346)][_0x3f4870(0x2b3)]=function(_0x4d8d7d){},Game_BattlerBase[_0x3f4870(0x346)][_0x3f4870(0x1ec)]=function(_0x28b32d){},Game_BattlerBase[_0x3f4870(0x346)][_0x3f4870(0x22e)]=function(_0x245bd6){const _0x549b05=_0x3f4870;return this[_0x549b05(0x354)][_0x245bd6]===VisuMZ[_0x549b05(0x15a)][_0x549b05(0x11c)]['Buffs'][_0x549b05(0x3e1)];},Game_BattlerBase[_0x3f4870(0x346)]['isMaxDebuffAffected']=function(_0x3287c4){const _0x40199d=_0x3f4870;return this[_0x40199d(0x354)][_0x3287c4]===-VisuMZ['SkillsStatesCore'][_0x40199d(0x11c)]['Buffs']['StackDebuffMax'];},VisuMZ[_0x3f4870(0x15a)][_0x3f4870(0x30e)]=Game_BattlerBase['prototype'][_0x3f4870(0x205)],Game_BattlerBase[_0x3f4870(0x346)][_0x3f4870(0x205)]=function(_0x2373b5,_0x1c706c){const _0x3e67ce=_0x3f4870;return _0x2373b5=_0x2373b5['clamp'](-0x2,0x2),VisuMZ[_0x3e67ce(0x15a)]['Game_BattlerBase_buffIconIndex']['call'](this,_0x2373b5,_0x1c706c);},Game_BattlerBase[_0x3f4870(0x346)]['paramBuffRate']=function(_0x350fb6){const _0x3f9382=_0x3f4870,_0x703598=this[_0x3f9382(0x354)][_0x350fb6];return VisuMZ[_0x3f9382(0x15a)][_0x3f9382(0x11c)][_0x3f9382(0x3e9)]['MultiplierJS'][_0x3f9382(0x2b4)](this,_0x350fb6,_0x703598);},Game_BattlerBase[_0x3f4870(0x346)][_0x3f4870(0x177)]=function(_0x5d24f1){const _0x195710=_0x3f4870;return this[_0x195710(0x2b2)][_0x5d24f1]||0x0;},Game_BattlerBase['prototype']['debuffTurns']=function(_0xf5e312){const _0x4430a9=_0x3f4870;return this[_0x4430a9(0x177)](_0xf5e312);},Game_BattlerBase[_0x3f4870(0x346)]['setBuffTurns']=function(_0x390992,_0x17551e){const _0x50ef59=_0x3f4870;if(this['isBuffAffected'](_0x390992)){const _0x73c4cd=VisuMZ[_0x50ef59(0x15a)][_0x50ef59(0x11c)][_0x50ef59(0x3e9)][_0x50ef59(0x23d)];this[_0x50ef59(0x2b2)][_0x390992]=_0x17551e[_0x50ef59(0x14e)](0x0,_0x73c4cd);}},Game_BattlerBase['prototype'][_0x3f4870(0x262)]=function(_0x3ea9d7,_0x3b6960){const _0x1b9f37=_0x3f4870;this['isBuffAffected'](_0x3ea9d7)&&(_0x3b6960+=this[_0x1b9f37(0x177)](stateId),this[_0x1b9f37(0x34a)](_0x3ea9d7,_0x3b6960));},Game_BattlerBase[_0x3f4870(0x346)][_0x3f4870(0x134)]=function(_0x67e584,_0x4c9a5c){const _0x47394c=_0x3f4870;if(this[_0x47394c(0x28c)](_0x67e584)){const _0x226a7e=VisuMZ[_0x47394c(0x15a)][_0x47394c(0x11c)][_0x47394c(0x3e9)]['MaxTurns'];this['_buffTurns'][_0x67e584]=_0x4c9a5c['clamp'](0x0,_0x226a7e);}},Game_BattlerBase[_0x3f4870(0x346)][_0x3f4870(0x2dc)]=function(_0x122991,_0x1cedc9){const _0x5a5017=_0x3f4870;this[_0x5a5017(0x28c)](_0x122991)&&(_0x1cedc9+=this[_0x5a5017(0x177)](stateId),this['setStateTurns'](_0x122991,_0x1cedc9));},Game_BattlerBase[_0x3f4870(0x346)][_0x3f4870(0xfd)]=function(_0x404602){const _0x145165=_0x3f4870;if(typeof _0x404602!==_0x145165(0x1e8))_0x404602=_0x404602['id'];return this[_0x145165(0x31c)]=this['_stateData']||{},this['_stateData'][_0x404602]=this['_stateData'][_0x404602]||{},this[_0x145165(0x31c)][_0x404602];},Game_BattlerBase['prototype'][_0x3f4870(0x1cc)]=function(_0x3c0ab7,_0x3bbec3){const _0x5ef10d=_0x3f4870;if(typeof _0x3c0ab7!==_0x5ef10d(0x1e8))_0x3c0ab7=_0x3c0ab7['id'];const _0xad5158=this[_0x5ef10d(0xfd)](_0x3c0ab7);return _0xad5158[_0x3bbec3];},Game_BattlerBase[_0x3f4870(0x346)][_0x3f4870(0x270)]=function(_0x5b6e9c,_0x297524,_0x3ee4aa){const _0x3926a6=_0x3f4870;if(typeof _0x5b6e9c!==_0x3926a6(0x1e8))_0x5b6e9c=_0x5b6e9c['id'];const _0x19a32d=this[_0x3926a6(0xfd)](_0x5b6e9c);_0x19a32d[_0x297524]=_0x3ee4aa;},Game_BattlerBase[_0x3f4870(0x346)]['clearStateData']=function(_0x471798){const _0x54d2b3=_0x3f4870;if(typeof _0x471798!==_0x54d2b3(0x1e8))_0x471798=_0x471798['id'];this[_0x54d2b3(0x31c)]=this['_stateData']||{},this[_0x54d2b3(0x31c)][_0x471798]={};},Game_BattlerBase[_0x3f4870(0x346)][_0x3f4870(0x1bd)]=function(_0x2b1cb9){const _0x3d8e8=_0x3f4870;if(typeof _0x2b1cb9!==_0x3d8e8(0x1e8))_0x2b1cb9=_0x2b1cb9['id'];return this[_0x3d8e8(0x12a)]=this[_0x3d8e8(0x12a)]||{},this[_0x3d8e8(0x12a)][_0x2b1cb9]===undefined&&(this[_0x3d8e8(0x12a)][_0x2b1cb9]=''),this[_0x3d8e8(0x12a)][_0x2b1cb9];},Game_BattlerBase[_0x3f4870(0x346)]['setStateDisplay']=function(_0x121929,_0x4c0e1e){const _0x5ddb1f=_0x3f4870;if(typeof _0x121929!==_0x5ddb1f(0x1e8))_0x121929=_0x121929['id'];this[_0x5ddb1f(0x12a)]=this[_0x5ddb1f(0x12a)]||{},this[_0x5ddb1f(0x12a)][_0x121929]=_0x4c0e1e;},Game_BattlerBase[_0x3f4870(0x346)][_0x3f4870(0x34b)]=function(_0x5eea4f){const _0x4cf9b2=_0x3f4870;if(typeof _0x5eea4f!==_0x4cf9b2(0x1e8))_0x5eea4f=_0x5eea4f['id'];this[_0x4cf9b2(0x12a)]=this[_0x4cf9b2(0x12a)]||{},this['_stateDisplay'][_0x5eea4f]='';},Game_BattlerBase[_0x3f4870(0x346)][_0x3f4870(0x3b6)]=function(_0x34c516){const _0x4c10bf=_0x3f4870;if(typeof _0x34c516!=='number')_0x34c516=_0x34c516['id'];this[_0x4c10bf(0x328)]=this[_0x4c10bf(0x328)]||{},this[_0x4c10bf(0x328)][_0x34c516]=this[_0x4c10bf(0x328)][_0x34c516]||_0x4c10bf(0x1da);const _0x30a5a4=this[_0x4c10bf(0x328)][_0x34c516];return this[_0x4c10bf(0x3c6)](_0x30a5a4);},Game_BattlerBase[_0x3f4870(0x346)]['setStateOrigin']=function(_0x22e306,_0x26759f){const _0x54b1be=_0x3f4870;this[_0x54b1be(0x328)]=this[_0x54b1be(0x328)]||{};const _0x2b1257=_0x26759f?this[_0x54b1be(0x39e)](_0x26759f):this[_0x54b1be(0x118)]();this[_0x54b1be(0x328)][_0x22e306]=_0x2b1257;},Game_BattlerBase['prototype'][_0x3f4870(0x193)]=function(_0x4c2d2d){const _0x7200e9=_0x3f4870;this[_0x7200e9(0x328)]=this['_stateOrigin']||{},delete this[_0x7200e9(0x328)][_0x4c2d2d];},Game_BattlerBase['prototype'][_0x3f4870(0x118)]=function(){const _0x40e5ed=_0x3f4870,_0x3fc6e3=this[_0x40e5ed(0x27a)]();return this['convertTargetToStateOriginKey'](_0x3fc6e3);},Game_BattlerBase[_0x3f4870(0x346)][_0x3f4870(0x27a)]=function(){const _0x177af2=_0x3f4870;if($gameParty[_0x177af2(0x1cf)]()){if(BattleManager['_subject'])return BattleManager[_0x177af2(0x24d)];else{if(BattleManager[_0x177af2(0x2f7)])return BattleManager[_0x177af2(0x2f7)];}}else{if('QpjVB'===_0x177af2(0x1b2)){const _0x585271=SceneManager[_0x177af2(0x311)];if(![Scene_Map,Scene_Item][_0x177af2(0x21b)](_0x585271[_0x177af2(0x35b)]))return $gameParty[_0x177af2(0x185)]();}else return this;}return this;},Game_BattlerBase['prototype'][_0x3f4870(0x39e)]=function(_0x21c2af){const _0x533da6=_0x3f4870;if(!_0x21c2af)return _0x533da6(0x1da);if(_0x21c2af['isActor']())return _0x533da6(0x3aa)[_0x533da6(0x2e5)](_0x21c2af[_0x533da6(0x294)]());else{const _0x3ee967=_0x533da6(0x107)['format'](_0x21c2af['enemyId']()),_0x205e40='<member-%1>'[_0x533da6(0x2e5)](_0x21c2af[_0x533da6(0x25c)]()),_0x1d7a91=_0x533da6(0x231)[_0x533da6(0x2e5)]($gameTroop[_0x533da6(0x3e0)]());return _0x533da6(0x316)[_0x533da6(0x2e5)](_0x3ee967,_0x205e40,_0x1d7a91);}return _0x533da6(0x1da);},Game_BattlerBase['prototype'][_0x3f4870(0x3c6)]=function(_0x535ade){const _0x1d2069=_0x3f4870;if(_0x535ade==='user')return _0x1d2069(0x14f)!==_0x1d2069(0x17b)?this:_0x650172[_0x1d2069(0x24d)];else{if(_0x535ade[_0x1d2069(0x144)](/<actor-(\d+)>/i))return $gameActors[_0x1d2069(0x115)](Number(RegExp['$1']));else{if($gameParty[_0x1d2069(0x1cf)]()&&_0x535ade[_0x1d2069(0x144)](/<troop-(\d+)>/i)){const _0x3516b9=Number(RegExp['$1']);if(_0x3516b9===$gameTroop[_0x1d2069(0x3e0)]()){if(_0x535ade[_0x1d2069(0x144)](/<member-(\d+)>/i))return $gameTroop[_0x1d2069(0x1ae)]()[Number(RegExp['$1'])];}}if(_0x535ade[_0x1d2069(0x144)](/<enemy-(\d+)>/i))return new Game_Enemy(Number(RegExp['$1']),-0x1f4,-0x1f4);}}return this;},VisuMZ['SkillsStatesCore'][_0x3f4870(0x358)]=Game_Battler['prototype'][_0x3f4870(0x273)],Game_Battler['prototype'][_0x3f4870(0x273)]=function(_0x4ea428){const _0x47ea86=_0x3f4870,_0x1e2c9d=this[_0x47ea86(0x388)](_0x4ea428);VisuMZ[_0x47ea86(0x15a)][_0x47ea86(0x358)][_0x47ea86(0x2b4)](this,_0x4ea428);if(_0x1e2c9d&&this[_0x47ea86(0x3a6)]($dataStates[_0x4ea428])){if(_0x47ea86(0x38a)!==_0x47ea86(0x11b)){this[_0x47ea86(0xf0)](_0x4ea428);;}else{const _0x1dde3a=_0x1de861[_0x47ea86(0x15a)],_0x35e0a6=[_0x47ea86(0x3ee),'stateHpSlipHealJS',_0x47ea86(0x12e),_0x47ea86(0x1f8),_0x47ea86(0x1b4),_0x47ea86(0x3b2)];for(const _0x311f15 of _0x35e0a6){_0x1dde3a[_0x311f15][_0x6a7870]&&_0x1dde3a[_0x311f15][_0x26c93f]['call'](this,_0x542a3b);}}}},VisuMZ['SkillsStatesCore']['Game_Battler_isStateAddable']=Game_Battler['prototype'][_0x3f4870(0x388)],Game_Battler['prototype'][_0x3f4870(0x388)]=function(_0x22d502){const _0x2bf0c6=_0x3f4870,_0x5b676d=$dataStates[_0x22d502];if(_0x5b676d&&_0x5b676d[_0x2bf0c6(0x352)][_0x2bf0c6(0x144)](/<NO DEATH CLEAR>/i)){if(_0x2bf0c6(0x2cf)!==_0x2bf0c6(0x2cf)){const _0x840ac0=_0x1a2cca[_0x2bf0c6(0x15a)]['Settings'][_0x2bf0c6(0x3e9)][_0x2bf0c6(0x23d)];this[_0x2bf0c6(0x2b2)][_0x3e78ae]=_0x14687f['clamp'](0x0,_0x840ac0);}else return!this[_0x2bf0c6(0x3e6)](_0x22d502)&&!this[_0x2bf0c6(0xed)](_0x22d502)&&!this[_0x2bf0c6(0x26b)][_0x2bf0c6(0x1de)](_0x22d502);}return VisuMZ[_0x2bf0c6(0x15a)][_0x2bf0c6(0x1c2)][_0x2bf0c6(0x2b4)](this,_0x22d502);},Game_Battler[_0x3f4870(0x346)][_0x3f4870(0xf0)]=function(_0xc5db12){const _0x3902ed=_0x3f4870;this[_0x3902ed(0x111)](_0xc5db12),this[_0x3902ed(0x250)](_0xc5db12),this[_0x3902ed(0x391)](_0xc5db12),this[_0x3902ed(0x256)](_0xc5db12);},Game_Battler[_0x3f4870(0x346)][_0x3f4870(0x232)]=function(_0x5232bd){const _0x2c16af=_0x3f4870;Game_BattlerBase['prototype']['onRemoveState'][_0x2c16af(0x2b4)](this,_0x5232bd),this['onEraseStateCustomJS'](_0x5232bd),this[_0x2c16af(0x399)](_0x5232bd);},Game_Battler[_0x3f4870(0x346)][_0x3f4870(0x2c3)]=function(_0x1cf5f1){const _0x1edc9f=_0x3f4870;for(const _0x3da03b of this[_0x1edc9f(0x3ce)]()){if(this['isStateExpired'](_0x3da03b['id'])&&_0x3da03b['autoRemovalTiming']===_0x1cf5f1){if(_0x1edc9f(0x36a)!==_0x1edc9f(0x341))this[_0x1edc9f(0x2ee)](_0x3da03b['id']),this[_0x1edc9f(0x382)](_0x3da03b['id']),this[_0x1edc9f(0x268)](_0x3da03b['id']);else{const _0x4c1257=this['shopStatusWidth'](),_0x59d664=this['_itemWindow'][_0x1edc9f(0xf4)],_0x536b4e=this[_0x1edc9f(0xf2)]()?0x0:_0x3a8a02[_0x1edc9f(0x1dc)]-this[_0x1edc9f(0x1a8)](),_0x3e7fc6=this[_0x1edc9f(0x351)]['y'];return new _0x18c749(_0x536b4e,_0x3e7fc6,_0x4c1257,_0x59d664);}}}},Game_Battler[_0x3f4870(0x346)][_0x3f4870(0x382)]=function(_0x1adc34){this['onExpireStateCustomJS'](_0x1adc34);},Game_Battler['prototype']['onAddStateCustomJS']=function(_0x12c481){const _0x21f307=_0x3f4870;if(this[_0x21f307(0x2ad)]||this[_0x21f307(0x11f)])return;const _0x2d61d3=VisuMZ[_0x21f307(0x15a)][_0x21f307(0x1fc)];if(_0x2d61d3[_0x12c481])_0x2d61d3[_0x12c481][_0x21f307(0x2b4)](this,_0x12c481);},Game_Battler[_0x3f4870(0x346)][_0x3f4870(0x2c8)]=function(_0x271d52){const _0x30bfb6=_0x3f4870;if(this['_tempActor']||this[_0x30bfb6(0x11f)])return;const _0x26b2d1=VisuMZ[_0x30bfb6(0x15a)]['stateEraseJS'];if(_0x26b2d1[_0x271d52])_0x26b2d1[_0x271d52][_0x30bfb6(0x2b4)](this,_0x271d52);},Game_Battler['prototype'][_0x3f4870(0x2cc)]=function(_0x120ded){const _0x31ca74=_0x3f4870;if(this['_tempActor']||this[_0x31ca74(0x11f)])return;const _0x2a4d46=VisuMZ[_0x31ca74(0x15a)]['stateExpireJS'];if(_0x2a4d46[_0x120ded])_0x2a4d46[_0x120ded][_0x31ca74(0x2b4)](this,_0x120ded);},Game_Battler[_0x3f4870(0x346)][_0x3f4870(0x256)]=function(_0x38e872){const _0x1c6951=_0x3f4870;if(this[_0x1c6951(0x2ad)]||this[_0x1c6951(0x11f)])return;try{VisuMZ[_0x1c6951(0x15a)][_0x1c6951(0x11c)][_0x1c6951(0x2b9)][_0x1c6951(0x20f)][_0x1c6951(0x2b4)](this,_0x38e872);}catch(_0x42c453){if(_0x1c6951(0x1d1)!=='QIKeg')return!![];else{if($gameTemp[_0x1c6951(0x290)]())console[_0x1c6951(0x10b)](_0x42c453);}}},Game_Battler[_0x3f4870(0x346)][_0x3f4870(0x399)]=function(_0x20a5b5){const _0x4d031a=_0x3f4870;if(this[_0x4d031a(0x2ad)]||this[_0x4d031a(0x11f)])return;try{_0x4d031a(0x17f)==='GRBjK'?(_0x3db0de[_0x4d031a(0x15a)][_0x4d031a(0x357)][_0x4d031a(0x2b4)](this),this['_statusWindow']&&this[_0x4d031a(0x1b9)][_0x4d031a(0x35b)]===_0xd034e2&&this['_statusWindow'][_0x4d031a(0x386)](this[_0x4d031a(0x211)]())):VisuMZ[_0x4d031a(0x15a)][_0x4d031a(0x11c)][_0x4d031a(0x2b9)][_0x4d031a(0x292)]['call'](this,_0x20a5b5);}catch(_0x276a47){if($gameTemp['isPlaytest']())console[_0x4d031a(0x10b)](_0x276a47);}},Game_Battler[_0x3f4870(0x346)]['onExpireStateGlobalJS']=function(_0x346a09){const _0x576f1e=_0x3f4870;if(this['_tempActor']||this['_tempBattler'])return;try{VisuMZ['SkillsStatesCore'][_0x576f1e(0x11c)][_0x576f1e(0x2b9)][_0x576f1e(0x3ba)]['call'](this,_0x346a09);}catch(_0x2b4319){if($gameTemp[_0x576f1e(0x290)]())console[_0x576f1e(0x10b)](_0x2b4319);}},Game_Battler['prototype']['statesByCategory']=function(_0x12f3b1){const _0xa93467=_0x3f4870;return _0x12f3b1=_0x12f3b1[_0xa93467(0x180)]()[_0xa93467(0x2e1)](),this[_0xa93467(0x3ce)]()[_0xa93467(0x229)](_0x595f11=>_0x595f11[_0xa93467(0x1b5)][_0xa93467(0x21b)](_0x12f3b1));},Game_Battler[_0x3f4870(0x346)][_0x3f4870(0x10a)]=function(_0x20f00f,_0x411f63){const _0x1a8b86=_0x3f4870;_0x20f00f=_0x20f00f['toUpperCase']()[_0x1a8b86(0x2e1)](),_0x411f63=_0x411f63||0x0;const _0x560fa4=this[_0x1a8b86(0x369)](_0x20f00f),_0x1a14f8=[];for(const _0x27d60a of _0x560fa4){if(_0x1a8b86(0x321)===_0x1a8b86(0xf1))_0x3d44cb+=this[_0x1a8b86(0xf6)](_0x1000fb),this['setStateTurns'](_0x3e1ead,_0x3a209a);else{if(!_0x27d60a)continue;if(_0x411f63<=0x0)return;_0x1a14f8['push'](_0x27d60a['id']),this[_0x1a8b86(0x26b)]['success']=!![],_0x411f63--;}}while(_0x1a14f8[_0x1a8b86(0x1dd)]>0x0){this[_0x1a8b86(0x2ee)](_0x1a14f8[_0x1a8b86(0x298)]());}},Game_Battler[_0x3f4870(0x346)][_0x3f4870(0x18c)]=function(_0x4233d1){const _0x4fa86b=_0x3f4870;_0x4233d1=_0x4233d1[_0x4fa86b(0x180)]()['trim']();const _0x928ef2=this['statesByCategory'](_0x4233d1),_0xc76daa=[];for(const _0x238e86 of _0x928ef2){if(!_0x238e86)continue;_0xc76daa[_0x4fa86b(0x2d2)](_0x238e86['id']),this[_0x4fa86b(0x26b)][_0x4fa86b(0x3b1)]=!![];}while(_0xc76daa[_0x4fa86b(0x1dd)]>0x0){_0x4fa86b(0x22f)!==_0x4fa86b(0x36e)?this[_0x4fa86b(0x2ee)](_0xc76daa[_0x4fa86b(0x298)]()):(this[_0x4fa86b(0xf7)](_0x373a5e),this[_0x4fa86b(0x34b)](_0x4a939a),this['clearStateOrigin'](_0x1bc5e8));}},Game_Battler[_0x3f4870(0x346)][_0x3f4870(0x3db)]=function(_0x257e51){const _0x928191=_0x3f4870;return this[_0x928191(0x160)](_0x257e51)>0x0;},Game_Battler['prototype'][_0x3f4870(0x394)]=function(_0x49057f){const _0x45075d=_0x3f4870;return this[_0x45075d(0x226)](_0x49057f)>0x0;},Game_Battler[_0x3f4870(0x346)][_0x3f4870(0x160)]=function(_0x2f473e){const _0x43ddd8=_0x3f4870,_0x5e9b1c=this[_0x43ddd8(0x369)](_0x2f473e)[_0x43ddd8(0x229)](_0x6f92fc=>this[_0x43ddd8(0x3cc)](_0x6f92fc['id']));return _0x5e9b1c[_0x43ddd8(0x1dd)];},Game_Battler[_0x3f4870(0x346)][_0x3f4870(0x226)]=function(_0x1230ef){const _0x2382cf=_0x3f4870,_0x1cdba2=this[_0x2382cf(0x369)](_0x1230ef);return _0x1cdba2[_0x2382cf(0x1dd)];},VisuMZ['SkillsStatesCore'][_0x3f4870(0x1f6)]=Game_BattlerBase[_0x3f4870(0x346)]['isStateResist'],Game_BattlerBase[_0x3f4870(0x346)][_0x3f4870(0x3e6)]=function(_0x3dc48b){const _0x5626ba=_0x3f4870,_0x398171=$dataStates[_0x3dc48b];if(_0x398171&&_0x398171[_0x5626ba(0x1b5)][_0x5626ba(0x1dd)]>0x0)for(const _0x1157f8 of _0x398171['categories']){if(this['isStateCategoryResisted'](_0x1157f8))return!![];}return VisuMZ['SkillsStatesCore'][_0x5626ba(0x1f6)][_0x5626ba(0x2b4)](this,_0x3dc48b);},Game_BattlerBase[_0x3f4870(0x346)][_0x3f4870(0x2c5)]=function(_0x5ea638){const _0x4d46c2=_0x3f4870;let _0x2b59bc=_0x4d46c2(0x21a);if(this['checkCacheKey'](_0x2b59bc))return this[_0x4d46c2(0x14d)][_0x2b59bc][_0x4d46c2(0x21b)](_0x5ea638);return this[_0x4d46c2(0x14d)][_0x2b59bc]=this[_0x4d46c2(0x2fa)](),this['_cache'][_0x2b59bc]['includes'](_0x5ea638);},Game_BattlerBase[_0x3f4870(0x346)][_0x3f4870(0x2fa)]=function(){const _0x363d05=_0x3f4870,_0x44b501=/<RESIST STATE (?:CATEGORY|CATEGORIES):[ ](.*)>/gi,_0x1ae053=/<RESIST STATE (?:CATEGORY|CATEGORIES)>\s*([\s\S]*)\s*<\/RESIST STATE (?:CATEGORY|CATEGORIES)>/i;let _0x357d4e=[];for(const _0x278cf0 of this['traitObjects']()){if(!_0x278cf0)continue;const _0x2bea94=_0x278cf0[_0x363d05(0x352)],_0x4ea42a=_0x2bea94[_0x363d05(0x144)](_0x44b501);if(_0x4ea42a)for(const _0x245fb5 of _0x4ea42a){if(_0x363d05(0xff)===_0x363d05(0xff)){_0x245fb5[_0x363d05(0x144)](_0x44b501);const _0x340a62=String(RegExp['$1'])[_0x363d05(0x200)](',')['map'](_0x13a545=>String(_0x13a545)[_0x363d05(0x180)]()['trim']());_0x357d4e=_0x357d4e[_0x363d05(0x2cd)](_0x340a62);}else{const _0x190e35=_0x39c606(_0x450451['$1']),_0x49043a=_0x363d05(0x3eb)['format'](_0x190e35);_0x443cbd['SkillsStatesCore']['skillVisibleJS'][_0x4d2782['id']]=new _0x507094(_0x363d05(0x1c5),_0x49043a);}}if(_0x2bea94[_0x363d05(0x144)](_0x1ae053)){const _0x146c7d=String(RegExp['$1'])['split'](/[\r\n]+/)['map'](_0x1fe10b=>String(_0x1fe10b)['toUpperCase']()[_0x363d05(0x2e1)]());_0x357d4e=_0x357d4e['concat'](_0x146c7d);}}return _0x357d4e;},VisuMZ['SkillsStatesCore'][_0x3f4870(0x11a)]=Game_Battler[_0x3f4870(0x346)][_0x3f4870(0x3f3)],Game_Battler['prototype'][_0x3f4870(0x3f3)]=function(_0x6cb0f6,_0x4c91a8){const _0x4f9ad2=_0x3f4870;VisuMZ[_0x4f9ad2(0x15a)][_0x4f9ad2(0x11a)][_0x4f9ad2(0x2b4)](this,_0x6cb0f6,_0x4c91a8),this['isBuffAffected'](_0x6cb0f6)&&this['onAddBuff'](_0x6cb0f6,_0x4c91a8);},Game_Battler['prototype'][_0x3f4870(0x37d)]=function(_0x4fb8cc){},VisuMZ[_0x3f4870(0x15a)][_0x3f4870(0x24b)]=Game_Battler[_0x3f4870(0x346)][_0x3f4870(0x1d7)],Game_Battler[_0x3f4870(0x346)]['addDebuff']=function(_0xccc701,_0x3fd4e7){const _0x28f17b=_0x3f4870;VisuMZ[_0x28f17b(0x15a)][_0x28f17b(0x24b)][_0x28f17b(0x2b4)](this,_0xccc701,_0x3fd4e7),this['isDebuffAffected'](_0xccc701)&&this[_0x28f17b(0x210)](_0xccc701,_0x3fd4e7);},Game_Battler[_0x3f4870(0x346)][_0x3f4870(0x258)]=function(){const _0x23f5a6=_0x3f4870;for(let _0x312cf9=0x0;_0x312cf9<this[_0x23f5a6(0x199)]();_0x312cf9++){if(_0x23f5a6(0x17a)===_0x23f5a6(0xe9))return this[_0x23f5a6(0x1b6)]();else{if(this['isBuffExpired'](_0x312cf9)){const _0x685f48=this[_0x23f5a6(0x354)][_0x312cf9];this[_0x23f5a6(0x28d)](_0x312cf9);if(_0x685f48>0x0)this[_0x23f5a6(0x2a4)](_0x312cf9);if(_0x685f48<0x0)this[_0x23f5a6(0x318)](_0x312cf9);}}}},Game_Battler[_0x3f4870(0x346)][_0x3f4870(0x1e3)]=function(_0x23f9af,_0x179aa3){this['onAddBuffGlobalJS'](_0x23f9af,_0x179aa3);},Game_Battler[_0x3f4870(0x346)][_0x3f4870(0x210)]=function(_0x2e70ee,_0x374ffc){this['onAddDebuffGlobalJS'](_0x2e70ee,_0x374ffc);},Game_Battler['prototype'][_0x3f4870(0x2b3)]=function(_0x21753d){const _0x51dbf7=_0x3f4870;Game_BattlerBase[_0x51dbf7(0x346)]['onEraseBuff'][_0x51dbf7(0x2b4)](this,_0x21753d),this[_0x51dbf7(0x221)](_0x21753d);},Game_Battler['prototype'][_0x3f4870(0x1ec)]=function(_0x2b6581){const _0x2785f4=_0x3f4870;Game_BattlerBase['prototype'][_0x2785f4(0x1ec)][_0x2785f4(0x2b4)](this,_0x2b6581),this['onEraseDebuffGlobalJS'](_0x2b6581);},Game_Battler[_0x3f4870(0x346)][_0x3f4870(0x2a4)]=function(_0x5871d0){const _0x56ef8b=_0x3f4870;this[_0x56ef8b(0x2f0)](_0x5871d0);},Game_Battler[_0x3f4870(0x346)][_0x3f4870(0x318)]=function(_0x130de1){const _0x1d499a=_0x3f4870;this[_0x1d499a(0x3c8)](_0x130de1);},Game_Battler['prototype']['onAddBuffGlobalJS']=function(_0x227cee,_0x348fcf){const _0x23cd6b=_0x3f4870;VisuMZ['SkillsStatesCore'][_0x23cd6b(0x11c)][_0x23cd6b(0x3e9)][_0x23cd6b(0x227)][_0x23cd6b(0x2b4)](this,_0x227cee,_0x348fcf);},Game_Battler[_0x3f4870(0x346)][_0x3f4870(0x282)]=function(_0x539bcb,_0xb207e3){const _0x322930=_0x3f4870;VisuMZ['SkillsStatesCore']['Settings'][_0x322930(0x3e9)][_0x322930(0x166)]['call'](this,_0x539bcb,_0xb207e3);},Game_BattlerBase[_0x3f4870(0x346)][_0x3f4870(0x221)]=function(_0xa8b16a){const _0x36b391=_0x3f4870;VisuMZ['SkillsStatesCore']['Settings']['Buffs'][_0x36b391(0x3d3)][_0x36b391(0x2b4)](this,_0xa8b16a);},Game_BattlerBase[_0x3f4870(0x346)][_0x3f4870(0x3f2)]=function(_0x420173){const _0x1a67e9=_0x3f4870;VisuMZ[_0x1a67e9(0x15a)]['Settings'][_0x1a67e9(0x3e9)][_0x1a67e9(0x119)][_0x1a67e9(0x2b4)](this,_0x420173);},Game_Battler[_0x3f4870(0x346)][_0x3f4870(0x2f0)]=function(_0x5f13f8){const _0xa3a06b=_0x3f4870;VisuMZ['SkillsStatesCore'][_0xa3a06b(0x11c)][_0xa3a06b(0x3e9)][_0xa3a06b(0x393)]['call'](this,_0x5f13f8);},Game_Battler[_0x3f4870(0x346)][_0x3f4870(0x3c8)]=function(_0x299b10){const _0x4bbbb9=_0x3f4870;VisuMZ['SkillsStatesCore'][_0x4bbbb9(0x11c)][_0x4bbbb9(0x3e9)][_0x4bbbb9(0x101)][_0x4bbbb9(0x2b4)](this,_0x299b10);},Game_Battler[_0x3f4870(0x346)][_0x3f4870(0x250)]=function(_0x35077d){const _0x50a30b=_0x3f4870,_0x19484b=VisuMZ[_0x50a30b(0x15a)],_0x4aeded=[_0x50a30b(0x3ee),_0x50a30b(0x266),_0x50a30b(0x12e),_0x50a30b(0x1f8),_0x50a30b(0x1b4),_0x50a30b(0x3b2)];for(const _0x156a09 of _0x4aeded){if('LhjhQ'!==_0x50a30b(0x291))_0x19484b[_0x156a09][_0x35077d]&&(_0x50a30b(0x254)!==_0x50a30b(0x3e7)?_0x19484b[_0x156a09][_0x35077d][_0x50a30b(0x2b4)](this,_0x35077d):_0x5a040a[_0x50a30b(0x342)]((_0x25d4dd,_0x25e4da)=>{const _0x50268a=_0x50a30b,_0x254776=_0x25d4dd[_0x50268a(0x121)],_0x2c034c=_0x25e4da[_0x50268a(0x121)];if(_0x254776!==_0x2c034c)return _0x2c034c-_0x254776;return _0x25d4dd-_0x25e4da;}));else{const _0x57d925=_0x522af6[_0x50a30b(0x15a)][_0x50a30b(0x214)][_0x50a30b(0x2b4)](this),_0x3e18e7=_0x588121['SkillsStatesCore'][_0x50a30b(0x11c)][_0x50a30b(0x2d9)];let _0xeee1c5=_0x3e18e7[_0x50a30b(0x213)];return _0x2ee792[_0x50a30b(0x1cf)]()&&(_0xeee1c5=_0xeee1c5[_0x50a30b(0x2cd)](_0x3e18e7[_0x50a30b(0x3df)])),_0x57d925['filter'](_0xe16b89=>!_0xeee1c5[_0x50a30b(0x21b)](_0xe16b89));}}},VisuMZ['SkillsStatesCore'][_0x3f4870(0x249)]=Game_Battler[_0x3f4870(0x346)][_0x3f4870(0x113)],Game_Battler[_0x3f4870(0x346)][_0x3f4870(0x113)]=function(){const _0x217287=_0x3f4870;this[_0x217287(0x3e5)](),VisuMZ['SkillsStatesCore'][_0x217287(0x249)][_0x217287(0x2b4)](this),this[_0x217287(0x305)](),this['regenerateAllSkillsStatesCore']();},Game_Battler[_0x3f4870(0x346)][_0x3f4870(0x305)]=function(){const _0x1e63ef=_0x3f4870;for(const _0x428bfe of this[_0x1e63ef(0x3b3)]()){if(_0x1e63ef(0xe1)===_0x1e63ef(0xe1)){if(!_0x428bfe)continue;this[_0x1e63ef(0x250)](_0x428bfe['id']);}else{if(this['checkCacheKey'](_0x1e63ef(0x3b3)))return this[_0x1e63ef(0x15b)]();if(this[_0x1e63ef(0x2f4)])return[];return this['_checkingVisuMzPassiveStateObjects']=!![],this['createPassiveStatesCache'](),this[_0x1e63ef(0x2f4)]=_0x2b715b,this[_0x1e63ef(0x15b)]();}}},Game_Battler[_0x3f4870(0x346)][_0x3f4870(0x3e5)]=function(){const _0x5d35a1=_0x3f4870;for(const _0x234d73 of this[_0x5d35a1(0x3ce)]()){if(!_0x234d73)continue;_0x234d73[_0x5d35a1(0x352)][_0x5d35a1(0x144)](/<JS SLIP REFRESH>/i)&&this[_0x5d35a1(0x250)](_0x234d73['id']);}},Game_Battler[_0x3f4870(0x346)]['regenerateAllSkillsStatesCore']=function(){const _0x5c60bb=_0x3f4870;if(!this[_0x5c60bb(0x1fb)]())return;const _0x5cec08=this[_0x5c60bb(0x3ce)]();for(const _0x42e94b of _0x5cec08){if(!_0x42e94b)continue;this[_0x5c60bb(0x225)](_0x42e94b);}},Game_Battler['prototype'][_0x3f4870(0x225)]=function(_0x668fd7){const _0x5ddcd7=_0x3f4870,_0x57eac1=this['getStateData'](_0x668fd7['id'],_0x5ddcd7(0x29d))||0x0,_0x2f0c47=-this[_0x5ddcd7(0x222)](),_0x3374fd=Math[_0x5ddcd7(0x277)](_0x57eac1,_0x2f0c47);if(_0x3374fd!==0x0)this[_0x5ddcd7(0x27c)](_0x3374fd);const _0x57efa6=this[_0x5ddcd7(0x1cc)](_0x668fd7['id'],'slipMp')||0x0;if(_0x57efa6!==0x0)this[_0x5ddcd7(0x2a0)](_0x57efa6);const _0x5eecda=this['getStateData'](_0x668fd7['id'],'slipTp')||0x0;if(_0x5eecda!==0x0)this[_0x5ddcd7(0x1c1)](_0x5eecda);},VisuMZ[_0x3f4870(0x15a)][_0x3f4870(0x214)]=Game_Actor[_0x3f4870(0x346)][_0x3f4870(0x186)],Game_Actor[_0x3f4870(0x346)][_0x3f4870(0x186)]=function(){const _0x219abc=_0x3f4870,_0xcddef4=VisuMZ[_0x219abc(0x15a)][_0x219abc(0x214)][_0x219abc(0x2b4)](this),_0x3fb215=VisuMZ['SkillsStatesCore'][_0x219abc(0x11c)]['Skills'];let _0x5982b0=_0x3fb215[_0x219abc(0x213)];return $gameParty[_0x219abc(0x1cf)]()&&(_0x5982b0=_0x5982b0[_0x219abc(0x2cd)](_0x3fb215['BattleHiddenSkillTypes'])),_0xcddef4[_0x219abc(0x229)](_0x2fbd62=>!_0x5982b0[_0x219abc(0x21b)](_0x2fbd62));},Game_Actor[_0x3f4870(0x346)]['usableSkills']=function(){const _0x48f1b5=_0x3f4870;return this[_0x48f1b5(0x164)]()[_0x48f1b5(0x229)](_0x4fd5c9=>this['isSkillUsableForAutoBattle'](_0x4fd5c9));},Game_Actor[_0x3f4870(0x346)][_0x3f4870(0x195)]=function(_0x3b98e3){const _0x3d8e2b=_0x3f4870;if(!this[_0x3d8e2b(0x18a)](_0x3b98e3))return![];const _0x25fafa=this[_0x3d8e2b(0x186)](),_0x180ea3=DataManager[_0x3d8e2b(0x212)](_0x3b98e3),_0x3b6110=_0x25fafa[_0x3d8e2b(0x229)](_0x47dd75=>_0x180ea3[_0x3d8e2b(0x21b)](_0x47dd75));return _0x3b6110[_0x3d8e2b(0x1dd)]>0x0;},Game_Actor[_0x3f4870(0x346)][_0x3f4870(0x269)]=function(){const _0x4e243d=_0x3f4870;let _0xd348af=[this[_0x4e243d(0x115)](),this['currentClass']()];_0xd348af=_0xd348af[_0x4e243d(0x2cd)](this['equips']()[_0x4e243d(0x229)](_0x4f001a=>_0x4f001a));for(const _0x374e4e of this['_skills']){const _0x301005=$dataSkills[_0x374e4e];if(_0x301005)_0xd348af['push'](_0x301005);}return _0xd348af;},Game_Actor[_0x3f4870(0x346)][_0x3f4870(0x2c9)]=function(){const _0x1527a2=_0x3f4870;Game_Battler[_0x1527a2(0x346)]['addPassiveStatesByPluginParameters'][_0x1527a2(0x2b4)](this);const _0x383891=VisuMZ[_0x1527a2(0x15a)][_0x1527a2(0x11c)][_0x1527a2(0x1a0)][_0x1527a2(0x15e)];this[_0x1527a2(0x14d)][_0x1527a2(0x3b3)]=this[_0x1527a2(0x14d)][_0x1527a2(0x3b3)][_0x1527a2(0x2cd)](_0x383891);},VisuMZ['SkillsStatesCore'][_0x3f4870(0x201)]=Game_Actor['prototype'][_0x3f4870(0x39a)],Game_Actor[_0x3f4870(0x346)][_0x3f4870(0x39a)]=function(_0x4f75a1){const _0x35c794=_0x3f4870;VisuMZ['SkillsStatesCore'][_0x35c794(0x201)][_0x35c794(0x2b4)](this,_0x4f75a1),this[_0x35c794(0x14d)]={};},VisuMZ[_0x3f4870(0x15a)][_0x3f4870(0x167)]=Game_Actor['prototype']['forgetSkill'],Game_Actor[_0x3f4870(0x346)][_0x3f4870(0x31e)]=function(_0x12c93b){const _0xf3db4b=_0x3f4870;VisuMZ[_0xf3db4b(0x15a)][_0xf3db4b(0x167)][_0xf3db4b(0x2b4)](this,_0x12c93b),this[_0xf3db4b(0x14d)]={};},Game_Enemy['prototype']['passiveStateObjects']=function(){const _0x232538=_0x3f4870;let _0x61f5d4=[this[_0x232538(0x259)]()];return _0x61f5d4['concat'](this[_0x232538(0x164)]());},Game_Enemy['prototype'][_0x3f4870(0x2c9)]=function(){const _0x1fb46b=_0x3f4870;Game_Battler[_0x1fb46b(0x346)][_0x1fb46b(0x2c9)]['call'](this);const _0x5ed43b=VisuMZ[_0x1fb46b(0x15a)]['Settings'][_0x1fb46b(0x1a0)][_0x1fb46b(0x217)];this[_0x1fb46b(0x14d)]['passiveStates']=this[_0x1fb46b(0x14d)][_0x1fb46b(0x3b3)][_0x1fb46b(0x2cd)](_0x5ed43b);},Game_Enemy['prototype'][_0x3f4870(0x164)]=function(){const _0xad3a9=_0x3f4870,_0xbf07dc=[];for(const _0x15c7c5 of this[_0xad3a9(0x259)]()[_0xad3a9(0x3b4)]){if('FzKDC'!=='FzKDC')return![];else{const _0x35e4e0=$dataSkills[_0x15c7c5[_0xad3a9(0x1b7)]];if(_0x35e4e0&&!_0xbf07dc[_0xad3a9(0x21b)](_0x35e4e0))_0xbf07dc[_0xad3a9(0x2d2)](_0x35e4e0);}}return _0xbf07dc;},Game_Enemy[_0x3f4870(0x346)][_0x3f4870(0x1a4)]=function(_0x1c5a51){const _0x57d000=_0x3f4870;return this[_0x57d000(0x3a6)]($dataStates[_0x1c5a51]);},VisuMZ['SkillsStatesCore']['Game_Unit_isAllDead']=Game_Unit[_0x3f4870(0x346)][_0x3f4870(0x340)],Game_Unit['prototype'][_0x3f4870(0x340)]=function(){const _0x411684=_0x3f4870;if(this[_0x411684(0x2b8)]())return!![];return VisuMZ[_0x411684(0x15a)]['Game_Unit_isAllDead'][_0x411684(0x2b4)](this);},Game_Unit['prototype'][_0x3f4870(0x2b8)]=function(){const _0x80125b=_0x3f4870,_0x3b7b64=this[_0x80125b(0x26f)]();for(const _0x1d752d of _0x3b7b64){if('FsPvH'!==_0x80125b(0x3b7)){const _0x25fe5f=_0x43d78a(_0x39fe47['$1']),_0x1abe39=_0xc4df8[_0x80125b(0x2e5)](_0x25fe5f);_0x2e8e92[_0x80125b(0x15a)][_0x80125b(0x349)][_0x4441bb['id']]=new _0xedc257(_0x80125b(0x3a7),_0x1abe39);}else{if(!_0x1d752d[_0x80125b(0x310)]())return![];}}return!![];},VisuMZ[_0x3f4870(0x15a)][_0x3f4870(0x2f2)]=Game_Troop['prototype'][_0x3f4870(0x253)],Game_Troop[_0x3f4870(0x346)]['setup']=function(_0x555f45){const _0x294a30=_0x3f4870;VisuMZ[_0x294a30(0x15a)][_0x294a30(0x2f2)][_0x294a30(0x2b4)](this,_0x555f45),this[_0x294a30(0x130)]();},Game_Troop[_0x3f4870(0x346)][_0x3f4870(0x130)]=function(){const _0x1f9071=_0x3f4870;this['_currentTroopUniqueID']=Graphics[_0x1f9071(0x1ab)];},Game_Troop[_0x3f4870(0x346)]['getCurrentTroopUniqueID']=function(){const _0x4b8d48=_0x3f4870;return this[_0x4b8d48(0x3e4)]=this[_0x4b8d48(0x3e4)]||Graphics[_0x4b8d48(0x1ab)],this['_currentTroopUniqueID'];},Scene_Skill[_0x3f4870(0x346)][_0x3f4870(0x149)]=function(){const _0xeec848=_0x3f4870;if(ConfigManager[_0xeec848(0x133)]&&ConfigManager[_0xeec848(0x368)]!==undefined)return _0xeec848(0x3bf)!==_0xeec848(0x3bf)?this[_0xeec848(0x33e)]():ConfigManager[_0xeec848(0x368)];else{if(this[_0xeec848(0x22d)]())return this[_0xeec848(0x3bc)]()[_0xeec848(0x144)](/LOWER/i);else{if(_0xeec848(0x3e2)!==_0xeec848(0x3e2)){let _0x3f5e0d=this[_0xeec848(0xfc)]();return _0x303a86[_0xeec848(0x172)]&&this[_0xeec848(0x247)]()&&(_0x3f5e0d=_0x30a413['GroupDigits'](_0x3f5e0d)),_0x3f5e0d;}else Scene_ItemBase['prototype'][_0xeec848(0xf2)][_0xeec848(0x2b4)](this);}}},Scene_Skill[_0x3f4870(0x346)]['isRightInputMode']=function(){const _0x3eead3=_0x3f4870;if(ConfigManager[_0x3eead3(0x133)]&&ConfigManager['uiInputPosition']!==undefined)return ConfigManager[_0x3eead3(0x20d)];else return this[_0x3eead3(0x22d)]()?this[_0x3eead3(0x3bc)]()['match'](/RIGHT/i):Scene_ItemBase[_0x3eead3(0x346)]['isRightInputMode'][_0x3eead3(0x2b4)](this);},Scene_Skill[_0x3f4870(0x346)]['updatedLayoutStyle']=function(){const _0x20fa68=_0x3f4870;return VisuMZ['SkillsStatesCore'][_0x20fa68(0x11c)]['Skills']['LayoutStyle'];},Scene_Skill[_0x3f4870(0x346)][_0x3f4870(0x2e2)]=function(){const _0x5ee84a=_0x3f4870;return this[_0x5ee84a(0x280)]&&this[_0x5ee84a(0x280)][_0x5ee84a(0x2e2)]();},Scene_Skill['prototype']['isUseSkillsStatesCoreUpdatedLayout']=function(){const _0x2e9bf9=_0x3f4870;return VisuMZ['SkillsStatesCore'][_0x2e9bf9(0x11c)]['Skills'][_0x2e9bf9(0x30d)];},VisuMZ['SkillsStatesCore'][_0x3f4870(0x1b8)]=Scene_Skill['prototype'][_0x3f4870(0x176)],Scene_Skill[_0x3f4870(0x346)][_0x3f4870(0x176)]=function(){const _0x18d403=_0x3f4870;if(this['isUseSkillsStatesCoreUpdatedLayout']()){if(_0x18d403(0x3d7)!==_0x18d403(0x3d7)){let _0x29c7bd=0x0,_0xb3292e=0x0;if(_0x29d242[_0x18d403(0x144)](/<SET STATE[ ](\d+)[ ]TURNS:[ ](\d+)>/i))_0x29c7bd=_0x300bc1(_0x33a37f['$1']),_0xb3292e=_0x131ce3(_0x44c84c['$2']);else _0x189d7c['match'](/<SET STATE[ ](.*)[ ]TURNS:[ ](\d+)>/i)&&(_0x29c7bd=_0x304e0f[_0x18d403(0x237)](_0x423ace['$1']),_0xb3292e=_0x424e28(_0x4927bf['$2']));_0x5b600f[_0x18d403(0x34a)](_0x29c7bd,_0xb3292e),this[_0x18d403(0x3b9)](_0x40c6e4);}else return this[_0x18d403(0xef)]();}else return VisuMZ['SkillsStatesCore']['Scene_Skill_helpWindowRect'][_0x18d403(0x2b4)](this);},Scene_Skill[_0x3f4870(0x346)][_0x3f4870(0xef)]=function(){const _0x17f76f=_0x3f4870,_0x216473=0x0,_0xef5cc0=this[_0x17f76f(0x174)](),_0x331f40=Graphics['boxWidth'],_0x2a2bd0=this[_0x17f76f(0x30b)]();return new Rectangle(_0x216473,_0xef5cc0,_0x331f40,_0x2a2bd0);},VisuMZ['SkillsStatesCore'][_0x3f4870(0x283)]=Scene_Skill['prototype'][_0x3f4870(0x12c)],Scene_Skill[_0x3f4870(0x346)][_0x3f4870(0x12c)]=function(){const _0xbf172=_0x3f4870;return this[_0xbf172(0x22d)]()?this[_0xbf172(0x236)]():VisuMZ[_0xbf172(0x15a)][_0xbf172(0x283)][_0xbf172(0x2b4)](this);},Scene_Skill[_0x3f4870(0x346)][_0x3f4870(0x236)]=function(){const _0x5a6a55=_0x3f4870,_0x59a04b=this['mainCommandWidth'](),_0x5d24a6=this['calcWindowHeight'](0x3,!![]),_0x585cac=this[_0x5a6a55(0xf2)]()?Graphics[_0x5a6a55(0x1dc)]-_0x59a04b:0x0,_0x542c6f=this[_0x5a6a55(0x2b5)]();return new Rectangle(_0x585cac,_0x542c6f,_0x59a04b,_0x5d24a6);},VisuMZ['SkillsStatesCore']['Scene_Skill_statusWindowRect']=Scene_Skill['prototype'][_0x3f4870(0x182)],Scene_Skill['prototype'][_0x3f4870(0x182)]=function(){const _0x38e2e0=_0x3f4870;if(this[_0x38e2e0(0x22d)]()){if(_0x38e2e0(0x370)!==_0x38e2e0(0xfa))return this[_0x38e2e0(0x327)]();else this['_currentTroopUniqueID']=_0xbba317[_0x38e2e0(0x1ab)];}else{if(_0x38e2e0(0x13d)==='IICst')return VisuMZ[_0x38e2e0(0x15a)][_0x38e2e0(0x2ac)][_0x38e2e0(0x2b4)](this);else this[_0x38e2e0(0x16f)][_0x38e2e0(0x106)]=_0x156c70;}},Scene_Skill['prototype'][_0x3f4870(0x327)]=function(){const _0x36d339=_0x3f4870,_0x1d834f=Graphics[_0x36d339(0x1dc)]-this[_0x36d339(0x234)](),_0x18c481=this['_skillTypeWindow'][_0x36d339(0xf4)],_0x4e8233=this[_0x36d339(0xf2)]()?0x0:Graphics[_0x36d339(0x1dc)]-_0x1d834f,_0x11307d=this[_0x36d339(0x2b5)]();return new Rectangle(_0x4e8233,_0x11307d,_0x1d834f,_0x18c481);},VisuMZ[_0x3f4870(0x15a)]['Scene_Skill_createItemWindow']=Scene_Skill['prototype'][_0x3f4870(0x384)],Scene_Skill[_0x3f4870(0x346)][_0x3f4870(0x384)]=function(){const _0x106d0e=_0x3f4870;VisuMZ[_0x106d0e(0x15a)][_0x106d0e(0x1e6)]['call'](this);if(this[_0x106d0e(0x2a3)]()){if('PEVcb'===_0x106d0e(0x376))this[_0x106d0e(0x209)]();else{_0x23dd91[_0x106d0e(0x144)](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);const _0x24cdf6=_0xacf88c(_0x4c5570['$1'])[_0x106d0e(0x180)]()[_0x106d0e(0x2e1)]()[_0x106d0e(0x200)](',');for(const _0x19610f of _0x24cdf6){_0x3a9d2f[_0x106d0e(0x1b5)][_0x106d0e(0x2d2)](_0x19610f['trim']());}}}},VisuMZ[_0x3f4870(0x15a)][_0x3f4870(0x33b)]=Scene_Skill[_0x3f4870(0x346)][_0x3f4870(0x112)],Scene_Skill['prototype']['itemWindowRect']=function(){const _0x55ab6e=_0x3f4870;if(this[_0x55ab6e(0x22d)]()){if(_0x55ab6e(0x171)===_0x55ab6e(0x344)){if(_0x220ecd['VisuMZ_1_ElementStatusCore'])this[_0x55ab6e(0x32b)]();}else return this[_0x55ab6e(0x1a2)]();}else{const _0x12955b=VisuMZ[_0x55ab6e(0x15a)][_0x55ab6e(0x33b)][_0x55ab6e(0x2b4)](this);return this[_0x55ab6e(0x2a3)]()&&this['adjustItemWidthByShopStatus']()&&(_0x12955b['width']-=this['shopStatusWidth']()),_0x12955b;}},Scene_Skill['prototype'][_0x3f4870(0x1a2)]=function(){const _0x2495c7=_0x3f4870,_0x38dc1a=Graphics['boxWidth']-this[_0x2495c7(0x1a8)](),_0x182016=this[_0x2495c7(0x1f0)]()-this[_0x2495c7(0x1b9)]['height'],_0x45b383=this[_0x2495c7(0xf2)]()?Graphics[_0x2495c7(0x1dc)]-_0x38dc1a:0x0,_0x4cf0a2=this[_0x2495c7(0x1b9)]['y']+this['_statusWindow'][_0x2495c7(0xf4)];return new Rectangle(_0x45b383,_0x4cf0a2,_0x38dc1a,_0x182016);},Scene_Skill[_0x3f4870(0x346)]['allowCreateShopStatusWindow']=function(){const _0x52af57=_0x3f4870;if(!Imported[_0x52af57(0x3f1)])return _0x52af57(0x104)==='noINg'?![]:_0x223256[_0x52af57(0x15a)][_0x52af57(0x11c)][_0x52af57(0x2b9)][_0x52af57(0x109)];else return this[_0x52af57(0x22d)]()?!![]:VisuMZ['SkillsStatesCore'][_0x52af57(0x11c)][_0x52af57(0x2d9)]['ShowShopStatus'];},Scene_Skill[_0x3f4870(0x346)][_0x3f4870(0x1ac)]=function(){const _0x3278dc=_0x3f4870;return VisuMZ[_0x3278dc(0x15a)][_0x3278dc(0x11c)][_0x3278dc(0x2d9)][_0x3278dc(0x23b)];},Scene_Skill['prototype'][_0x3f4870(0x209)]=function(){const _0x5ceebb=_0x3f4870,_0xde17e=this[_0x5ceebb(0x2e0)]();this[_0x5ceebb(0x168)]=new Window_ShopStatus(_0xde17e),this[_0x5ceebb(0x1a7)](this[_0x5ceebb(0x168)]),this[_0x5ceebb(0x351)][_0x5ceebb(0x122)](this['_shopStatusWindow']);const _0x8a14b7=VisuMZ[_0x5ceebb(0x15a)]['Settings'][_0x5ceebb(0x2d9)]['SkillSceneStatusBgType'];this[_0x5ceebb(0x168)][_0x5ceebb(0x299)](_0x8a14b7||0x0);},Scene_Skill[_0x3f4870(0x346)][_0x3f4870(0x2e0)]=function(){const _0xcb8b0a=_0x3f4870;if(this[_0xcb8b0a(0x22d)]())return this[_0xcb8b0a(0x1b6)]();else{if(_0xcb8b0a(0x224)!=='XZdOZ')return VisuMZ[_0xcb8b0a(0x15a)]['Settings']['Skills']['SkillMenuStatusRect']['call'](this);else{if(this[_0xcb8b0a(0x2ad)]||this['_tempBattler'])return;const _0x2e140e=_0x383f23['SkillsStatesCore'][_0xcb8b0a(0x349)];if(_0x2e140e[_0x409cf4])_0x2e140e[_0x411a7d][_0xcb8b0a(0x2b4)](this,_0x235b75);}}},Scene_Skill[_0x3f4870(0x346)][_0x3f4870(0x1b6)]=function(){const _0x4e3443=_0x3f4870,_0x4ff169=this[_0x4e3443(0x1a8)](),_0x2704f2=this[_0x4e3443(0x351)]['height'],_0x5c813c=this[_0x4e3443(0xf2)]()?0x0:Graphics[_0x4e3443(0x1dc)]-this[_0x4e3443(0x1a8)](),_0x32d946=this['_itemWindow']['y'];return new Rectangle(_0x5c813c,_0x32d946,_0x4ff169,_0x2704f2);},Scene_Skill[_0x3f4870(0x346)][_0x3f4870(0x1a8)]=function(){const _0x2c330c=_0x3f4870;if(Imported[_0x2c330c(0x3f1)])return Scene_Shop[_0x2c330c(0x346)][_0x2c330c(0x30a)]();else{if(_0x2c330c(0x21f)==='oskVh')return 0x0;else this[_0x2c330c(0x1b9)][_0x2c330c(0x386)](this[_0x2c330c(0x211)]());}},Scene_Skill[_0x3f4870(0x346)][_0x3f4870(0x26d)]=function(){const _0x3e9f87=_0x3f4870;if(this[_0x3e9f87(0x10c)]&&this[_0x3e9f87(0x10c)][_0x3e9f87(0x31b)]){if('SqHyN'!==_0x3e9f87(0x19f))return TextManager[_0x3e9f87(0xe4)];else this[_0x3e9f87(0x328)]=this[_0x3e9f87(0x328)]||{},delete this[_0x3e9f87(0x328)][_0x256b6b];}else return'';},VisuMZ[_0x3f4870(0x15a)][_0x3f4870(0x1f2)]=Sprite_Gauge[_0x3f4870(0x346)]['initMembers'],Sprite_Gauge[_0x3f4870(0x346)][_0x3f4870(0x2f5)]=function(){const _0x3947b6=_0x3f4870;VisuMZ[_0x3947b6(0x15a)][_0x3947b6(0x1f2)][_0x3947b6(0x2b4)](this),this[_0x3947b6(0x19b)]=null;},VisuMZ[_0x3f4870(0x15a)]['Sprite_Gauge_setup']=Sprite_Gauge[_0x3f4870(0x346)][_0x3f4870(0x253)],Sprite_Gauge[_0x3f4870(0x346)][_0x3f4870(0x253)]=function(_0x43c629,_0x480c20){const _0x51c034=_0x3f4870;this[_0x51c034(0x139)](_0x43c629,_0x480c20),_0x480c20=_0x480c20[_0x51c034(0x2dd)](),VisuMZ['SkillsStatesCore'][_0x51c034(0x3c0)]['call'](this,_0x43c629,_0x480c20);},Sprite_Gauge[_0x3f4870(0x346)][_0x3f4870(0x139)]=function(_0x4896ac,_0x38baae){const _0x1cfcd5=_0x3f4870,_0x174acc=VisuMZ[_0x1cfcd5(0x15a)][_0x1cfcd5(0x11c)][_0x1cfcd5(0x3a9)][_0x1cfcd5(0x229)](_0x34f862=>_0x34f862[_0x1cfcd5(0x3ae)][_0x1cfcd5(0x180)]()===_0x38baae['toUpperCase']());if(_0x174acc[_0x1cfcd5(0x1dd)]>=0x1){if('oyfVZ'!==_0x1cfcd5(0x3dc))for(const _0x34dd1c of this[_0x1cfcd5(0x3ce)]()){this[_0x1cfcd5(0x1f5)](_0x34dd1c['id'])&&_0x34dd1c['autoRemovalTiming']===_0x14fd84&&(this[_0x1cfcd5(0x2ee)](_0x34dd1c['id']),this['onExpireState'](_0x34dd1c['id']),this[_0x1cfcd5(0x268)](_0x34dd1c['id']));}else this['_costSettings']=_0x174acc[0x0];}else this[_0x1cfcd5(0x19b)]=null;},VisuMZ[_0x3f4870(0x15a)]['Sprite_Gauge_currentValue']=Sprite_Gauge[_0x3f4870(0x346)]['currentValue'],Sprite_Gauge[_0x3f4870(0x346)]['currentValue']=function(){const _0x4410d3=_0x3f4870;if(this['_battler']&&this[_0x4410d3(0x19b)])return this['currentValueSkillsStatesCore']();else{if(_0x4410d3(0x1ee)===_0x4410d3(0x38b)){const _0x8c3710=_0x50148f[_0x4410d3(0x18d)]('['+_0x16727e['$1'][_0x4410d3(0x144)](/\d+/g)+']');for(const _0x3ac5cf of _0x8c3710){if(!this[_0x4410d3(0x28a)][_0x4410d3(0x3ed)](_0x3ac5cf))return!![];}return![];}else return VisuMZ[_0x4410d3(0x15a)][_0x4410d3(0x355)]['call'](this);}},Sprite_Gauge['prototype'][_0x3f4870(0x33e)]=function(){const _0x1c76a2=_0x3f4870;return this[_0x1c76a2(0x19b)][_0x1c76a2(0xf8)][_0x1c76a2(0x2b4)](this['_battler']);},VisuMZ[_0x3f4870(0x15a)][_0x3f4870(0x389)]=Sprite_Gauge[_0x3f4870(0x346)][_0x3f4870(0x37f)],Sprite_Gauge[_0x3f4870(0x346)][_0x3f4870(0x37f)]=function(){const _0x4cd460=_0x3f4870;if(this[_0x4cd460(0x252)]&&this['_costSettings'])return this['currentMaxValueSkillsStatesCore']();else{if('VXlwz'===_0x4cd460(0x2b1))return VisuMZ['SkillsStatesCore'][_0x4cd460(0x389)]['call'](this);else this[_0x4cd460(0x282)](_0x2257c2,_0x4ce590);}},Sprite_Gauge['prototype'][_0x3f4870(0x239)]=function(){const _0x21480c=_0x3f4870;return this[_0x21480c(0x19b)][_0x21480c(0x21e)][_0x21480c(0x2b4)](this[_0x21480c(0x252)]);},VisuMZ['SkillsStatesCore'][_0x3f4870(0x267)]=Sprite_Gauge[_0x3f4870(0x346)][_0x3f4870(0x380)],Sprite_Gauge[_0x3f4870(0x346)]['gaugeRate']=function(){const _0x1a9ea1=_0x3f4870,_0x471555=VisuMZ[_0x1a9ea1(0x15a)]['Sprite_Gauge_gaugeRate'][_0x1a9ea1(0x2b4)](this);return _0x471555[_0x1a9ea1(0x14e)](0x0,0x1);},VisuMZ['SkillsStatesCore']['Sprite_Gauge_redraw']=Sprite_Gauge[_0x3f4870(0x346)][_0x3f4870(0x2af)],Sprite_Gauge[_0x3f4870(0x346)]['redraw']=function(){const _0x27d616=_0x3f4870;this['_battler']&&this[_0x27d616(0x19b)]?(this['bitmap'][_0x27d616(0x27e)](),this[_0x27d616(0x131)]()):VisuMZ[_0x27d616(0x15a)]['Sprite_Gauge_redraw'][_0x27d616(0x2b4)](this);},Sprite_Gauge['prototype'][_0x3f4870(0x28b)]=function(){const _0x364c78=_0x3f4870;let _0x23a34a=this['currentValue']();return Imported[_0x364c78(0x172)]&&this[_0x364c78(0x247)]()&&('qBeQw'!==_0x364c78(0x359)?_0x23a34a=VisuMZ[_0x364c78(0x155)](_0x23a34a):_0x3feefa=_0x234df0[_0x364c78(0x277)](_0x290ca4,_0x58d681)),_0x23a34a;},Sprite_Gauge[_0x3f4870(0x346)][_0x3f4870(0x131)]=function(){const _0x5c71c3=_0x3f4870;this['_costSettings'][_0x5c71c3(0x17c)][_0x5c71c3(0x2b4)](this);},Sprite_Gauge[_0x3f4870(0x346)][_0x3f4870(0x198)]=function(_0x575e99,_0x5216ea,_0x5bddf1,_0x3e3fc5,_0x2a422a,_0x5cfe09){const _0x3ffaa1=_0x3f4870,_0x4edea8=this[_0x3ffaa1(0x380)](),_0x28eee9=Math['floor']((_0x2a422a-0x2)*_0x4edea8),_0x1475c5=_0x5cfe09-0x2,_0x388d14=this['gaugeBackColor']();this[_0x3ffaa1(0x2ef)][_0x3ffaa1(0x336)](_0x5bddf1,_0x3e3fc5,_0x2a422a,_0x5cfe09,_0x388d14),this[_0x3ffaa1(0x2ef)][_0x3ffaa1(0x264)](_0x5bddf1+0x1,_0x3e3fc5+0x1,_0x28eee9,_0x1475c5,_0x575e99,_0x5216ea);},VisuMZ[_0x3f4870(0x15a)][_0x3f4870(0x245)]=Sprite_StateIcon['prototype'][_0x3f4870(0x16c)],Sprite_StateIcon[_0x3f4870(0x346)][_0x3f4870(0x16c)]=function(){const _0x31bbe1=_0x3f4870;VisuMZ[_0x31bbe1(0x15a)][_0x31bbe1(0x245)][_0x31bbe1(0x2b4)](this),this[_0x31bbe1(0x1b0)]();},Sprite_StateIcon[_0x3f4870(0x346)][_0x3f4870(0x1b0)]=function(){const _0x4be0d4=_0x3f4870,_0x18a596=Window_Base['prototype'][_0x4be0d4(0x339)]();this[_0x4be0d4(0x18e)]=new Sprite(),this[_0x4be0d4(0x18e)]['bitmap']=new Bitmap(ImageManager['iconWidth'],_0x18a596),this[_0x4be0d4(0x18e)]['anchor']['x']=this[_0x4be0d4(0x100)]['x'],this[_0x4be0d4(0x18e)][_0x4be0d4(0x100)]['y']=this[_0x4be0d4(0x100)]['y'],this[_0x4be0d4(0x2ff)](this[_0x4be0d4(0x18e)]),this[_0x4be0d4(0x16f)]=this[_0x4be0d4(0x18e)][_0x4be0d4(0x2ef)];},VisuMZ['SkillsStatesCore']['Sprite_StateIcon_updateFrame']=Sprite_StateIcon['prototype'][_0x3f4870(0x3b0)],Sprite_StateIcon[_0x3f4870(0x346)][_0x3f4870(0x3b0)]=function(){const _0x3715cd=_0x3f4870;VisuMZ[_0x3715cd(0x15a)]['Sprite_StateIcon_updateFrame'][_0x3715cd(0x2b4)](this),this[_0x3715cd(0x1e0)]();},Sprite_StateIcon['prototype']['drawText']=function(_0x67dafc,_0x38b123,_0x175ab2,_0xebabf9,_0x51eb9a){const _0x3657b5=_0x3f4870;this['contents']['drawText'](_0x67dafc,_0x38b123,_0x175ab2,_0xebabf9,this['contents'][_0x3657b5(0xf4)],_0x51eb9a);},Sprite_StateIcon[_0x3f4870(0x346)][_0x3f4870(0x1e0)]=function(){const _0x107659=_0x3f4870;this[_0x107659(0x240)](),this[_0x107659(0x16f)][_0x107659(0x27e)]();const _0x2891be=this[_0x107659(0x252)];if(!_0x2891be)return;const _0x3c2594=_0x2891be[_0x107659(0x3ce)]()['filter'](_0x13421c=>_0x13421c[_0x107659(0x3e8)]>0x0),_0x536d9f=[...Array(0x8)[_0x107659(0x377)]()]['filter'](_0x12d4f6=>_0x2891be[_0x107659(0x145)](_0x12d4f6)!==0x0),_0x915232=this['_animationIndex'],_0x59aadb=_0x3c2594[_0x915232];if(_0x59aadb)Window_Base['prototype'][_0x107659(0x136)][_0x107659(0x2b4)](this,_0x2891be,_0x59aadb,0x0,0x0),Window_Base['prototype'][_0x107659(0x190)][_0x107659(0x2b4)](this,_0x2891be,_0x59aadb,0x0,0x0);else{if(_0x107659(0x35a)==='rxeCV')for(const _0x18a581 of _0x1f2baf[_0x107659(0x1b5)]){if(this[_0x107659(0x2c5)](_0x18a581))return!![];}else{const _0x3fb898=_0x536d9f[_0x915232-_0x3c2594[_0x107659(0x1dd)]];if(_0x3fb898===undefined)return;Window_Base['prototype'][_0x107659(0x153)][_0x107659(0x2b4)](this,_0x2891be,_0x3fb898,0x0,0x0),Window_Base['prototype'][_0x107659(0x2a5)][_0x107659(0x2b4)](this,_0x2891be,_0x3fb898,0x0,0x0);}}},Sprite_StateIcon[_0x3f4870(0x346)][_0x3f4870(0x240)]=function(){const _0x4a4d96=_0x3f4870;this[_0x4a4d96(0x16f)][_0x4a4d96(0x2ca)]=$gameSystem[_0x4a4d96(0x17d)](),this[_0x4a4d96(0x16f)][_0x4a4d96(0x25e)]=$gameSystem[_0x4a4d96(0x265)](),this[_0x4a4d96(0x3ec)]();},Sprite_StateIcon[_0x3f4870(0x346)]['resetTextColor']=function(){const _0x3671f1=_0x3f4870;this[_0x3671f1(0x124)](ColorManager['normalColor']()),this[_0x3671f1(0x330)](ColorManager[_0x3671f1(0x317)]());},Sprite_StateIcon['prototype'][_0x3f4870(0x124)]=function(_0x2114f0){const _0x9e729d=_0x3f4870;this['contents'][_0x9e729d(0x106)]=_0x2114f0;},Sprite_StateIcon['prototype'][_0x3f4870(0x330)]=function(_0x3ddc4c){const _0x275ff2=_0x3f4870;this[_0x275ff2(0x16f)][_0x275ff2(0x317)]=_0x3ddc4c;},Sprite_StateIcon[_0x3f4870(0x346)][_0x3f4870(0x3ab)]=function(){const _0x51bb98=_0x3f4870;this[_0x51bb98(0x2df)]=!![],this[_0x51bb98(0x25f)]();},Window_Base['prototype'][_0x3f4870(0x2ba)]=function(_0x2616c8,_0x31ecec,_0x369557,_0x2216df,_0x858595){const _0x190208=_0x3f4870,_0x5060dd=this[_0x190208(0x140)](_0x2616c8,_0x31ecec),_0x8aee98=this[_0x190208(0x38c)](_0x5060dd,_0x369557,_0x2216df,_0x858595),_0x57b070=_0x369557+_0x858595-_0x8aee98[_0x190208(0x39d)];this['drawTextEx'](_0x5060dd,_0x57b070,_0x2216df,_0x858595),this[_0x190208(0x240)]();},Window_Base[_0x3f4870(0x346)][_0x3f4870(0x140)]=function(_0x44f792,_0x3a0c41){const _0x1a3eef=_0x3f4870;let _0x31cafe='';for(settings of VisuMZ[_0x1a3eef(0x15a)][_0x1a3eef(0x11c)]['Costs']){if('XYURh'!==_0x1a3eef(0x2a9)){if(!this['isSkillCostShown'](_0x44f792,_0x3a0c41,settings))continue;if(_0x31cafe[_0x1a3eef(0x1dd)]>0x0)_0x31cafe+=this[_0x1a3eef(0x2fc)]();_0x31cafe+=this['createSkillCostText'](_0x44f792,_0x3a0c41,settings);}else{const _0x5ee758=this[_0x1a3eef(0x369)](_0xae93af);return _0x5ee758[_0x1a3eef(0x1dd)];}}_0x31cafe=this[_0x1a3eef(0x2f3)](_0x44f792,_0x3a0c41,_0x31cafe);if(_0x3a0c41[_0x1a3eef(0x352)][_0x1a3eef(0x144)](/<CUSTOM COST TEXT>\s*([\s\S]*)\s*<\/CUSTOM COST TEXT>/i)){if(_0x31cafe[_0x1a3eef(0x1dd)]>0x0)_0x31cafe+=this[_0x1a3eef(0x2fc)]();_0x31cafe+=String(RegExp['$1']);}return _0x31cafe;},Window_Base[_0x3f4870(0x346)][_0x3f4870(0x2f3)]=function(_0x2eda9e,_0xbccce5,_0x497c10){return _0x497c10;},Window_Base[_0x3f4870(0x346)][_0x3f4870(0x206)]=function(_0x516a25,_0x590c5f,_0x5424d7){const _0x38a00c=_0x3f4870,_0x4bb59a=_0x5424d7['CalcJS'][_0x38a00c(0x2b4)](_0x516a25,_0x590c5f);return _0x5424d7[_0x38a00c(0x39c)][_0x38a00c(0x2b4)](_0x516a25,_0x590c5f,_0x4bb59a,_0x5424d7);},Window_Base['prototype'][_0x3f4870(0x1a6)]=function(_0x5ec458,_0x239af1,_0x2090bf){const _0x229a63=_0x3f4870,_0x244915=_0x2090bf['CalcJS']['call'](_0x5ec458,_0x239af1);return _0x2090bf[_0x229a63(0x1bf)]['call'](_0x5ec458,_0x239af1,_0x244915,_0x2090bf);},Window_Base[_0x3f4870(0x346)][_0x3f4870(0x2fc)]=function(){return'\x20';},Window_Base[_0x3f4870(0x346)]['drawActorIcons']=function(_0x1e3f4e,_0x3e8a6d,_0x520a70,_0x1295a0){const _0xf4ab32=_0x3f4870;if(!_0x1e3f4e)return;VisuMZ[_0xf4ab32(0x15a)][_0xf4ab32(0x207)]['call'](this,_0x1e3f4e,_0x3e8a6d,_0x520a70,_0x1295a0),this[_0xf4ab32(0x12f)](_0x1e3f4e,_0x3e8a6d,_0x520a70,_0x1295a0);},Window_Base['prototype'][_0x3f4870(0x12f)]=function(_0x5d1122,_0x439a8c,_0x1fd6bb,_0x55d212){const _0x457c3a=_0x3f4870;_0x55d212=_0x55d212||0x90;const _0xa6c19f=ImageManager[_0x457c3a(0x3c1)],_0x403e01=_0x5d1122['allIcons']()[_0x457c3a(0x302)](0x0,Math['floor'](_0x55d212/_0xa6c19f)),_0x10097d=_0x5d1122[_0x457c3a(0x3ce)]()['filter'](_0x49e397=>_0x49e397[_0x457c3a(0x3e8)]>0x0),_0x7a07e6=[...Array(0x8)['keys']()]['filter'](_0xdd0574=>_0x5d1122[_0x457c3a(0x145)](_0xdd0574)!==0x0),_0x4a920b=[];let _0x748bc=_0x439a8c;for(let _0x2a04df=0x0;_0x2a04df<_0x403e01['length'];_0x2a04df++){this[_0x457c3a(0x240)]();const _0x2981aa=_0x10097d[_0x2a04df];if(_0x2981aa)!_0x4a920b[_0x457c3a(0x21b)](_0x2981aa)&&this['drawActorStateTurns'](_0x5d1122,_0x2981aa,_0x748bc,_0x1fd6bb),this['drawActorStateData'](_0x5d1122,_0x2981aa,_0x748bc,_0x1fd6bb),_0x4a920b[_0x457c3a(0x2d2)](_0x2981aa);else{const _0x5c1dbd=_0x7a07e6[_0x2a04df-_0x10097d[_0x457c3a(0x1dd)]];this[_0x457c3a(0x153)](_0x5d1122,_0x5c1dbd,_0x748bc,_0x1fd6bb),this[_0x457c3a(0x2a5)](_0x5d1122,_0x5c1dbd,_0x748bc,_0x1fd6bb);}_0x748bc+=_0xa6c19f;}},Window_Base[_0x3f4870(0x346)][_0x3f4870(0x136)]=function(_0x333f00,_0x3c0dda,_0x5a513e,_0x50a5da){const _0x355492=_0x3f4870;if(!VisuMZ['SkillsStatesCore'][_0x355492(0x11c)][_0x355492(0x2b9)][_0x355492(0x157)])return;if(!_0x333f00[_0x355492(0x3cc)](_0x3c0dda['id']))return;if(_0x3c0dda['autoRemovalTiming']===0x0)return;if(_0x3c0dda[_0x355492(0x352)]['match'](/<HIDE STATE TURNS>/i))return;const _0x1ead5f=_0x333f00['stateTurns'](_0x3c0dda['id']),_0x18b5ad=ImageManager['iconWidth'],_0x226082=ColorManager[_0x355492(0x248)](_0x3c0dda);this[_0x355492(0x124)](_0x226082),this[_0x355492(0x330)](_0x355492(0x246)),this[_0x355492(0x16f)][_0x355492(0x228)]=!![],this[_0x355492(0x16f)][_0x355492(0x25e)]=VisuMZ['SkillsStatesCore'][_0x355492(0x11c)]['States'][_0x355492(0x32d)],_0x5a513e+=VisuMZ[_0x355492(0x15a)][_0x355492(0x11c)][_0x355492(0x2b9)][_0x355492(0x308)],_0x50a5da+=VisuMZ[_0x355492(0x15a)][_0x355492(0x11c)][_0x355492(0x2b9)][_0x355492(0x387)],this[_0x355492(0x1a5)](_0x1ead5f,_0x5a513e,_0x50a5da,_0x18b5ad,_0x355492(0x3e3)),this[_0x355492(0x16f)]['fontBold']=![],this[_0x355492(0x240)]();},Window_Base['prototype'][_0x3f4870(0x190)]=function(_0x48448a,_0x42d5ad,_0x124824,_0x3b6656){const _0x4b67cc=_0x3f4870;if(!VisuMZ['SkillsStatesCore']['Settings'][_0x4b67cc(0x2b9)]['ShowData'])return;const _0x5d4ebb=ImageManager[_0x4b67cc(0x3c1)],_0x1e1649=ImageManager[_0x4b67cc(0x13f)]/0x2,_0x54df4f=ColorManager[_0x4b67cc(0x1a1)]();this[_0x4b67cc(0x124)](_0x54df4f),this[_0x4b67cc(0x330)](_0x4b67cc(0x246)),this[_0x4b67cc(0x16f)]['fontBold']=!![],this[_0x4b67cc(0x16f)]['fontSize']=VisuMZ['SkillsStatesCore'][_0x4b67cc(0x11c)]['States']['DataFontSize'],_0x124824+=VisuMZ[_0x4b67cc(0x15a)][_0x4b67cc(0x11c)][_0x4b67cc(0x2b9)]['DataOffsetX'],_0x3b6656+=VisuMZ[_0x4b67cc(0x15a)][_0x4b67cc(0x11c)]['States']['DataOffsetY'];const _0x312dcc=String(_0x48448a[_0x4b67cc(0x1bd)](_0x42d5ad['id']));this[_0x4b67cc(0x1a5)](_0x312dcc,_0x124824,_0x3b6656,_0x5d4ebb,'center'),this['contents']['fontBold']=![],this[_0x4b67cc(0x240)]();},Window_Base['prototype'][_0x3f4870(0x153)]=function(_0x3b3b6a,_0x49ea68,_0x14b86b,_0x10363e){const _0x20bdda=_0x3f4870;if(!VisuMZ[_0x20bdda(0x15a)][_0x20bdda(0x11c)][_0x20bdda(0x3e9)][_0x20bdda(0x157)])return;const _0x35d824=_0x3b3b6a[_0x20bdda(0x145)](_0x49ea68);if(_0x35d824===0x0)return;const _0x3858ee=_0x3b3b6a[_0x20bdda(0x177)](_0x49ea68),_0x4e8594=ImageManager[_0x20bdda(0x3c1)],_0x1b1dec=_0x35d824>0x0?ColorManager[_0x20bdda(0x392)]():ColorManager[_0x20bdda(0x1db)]();this[_0x20bdda(0x124)](_0x1b1dec),this[_0x20bdda(0x330)](_0x20bdda(0x246)),this[_0x20bdda(0x16f)]['fontBold']=!![],this['contents'][_0x20bdda(0x25e)]=VisuMZ['SkillsStatesCore']['Settings']['Buffs'][_0x20bdda(0x32d)],_0x14b86b+=VisuMZ[_0x20bdda(0x15a)][_0x20bdda(0x11c)][_0x20bdda(0x3e9)][_0x20bdda(0x308)],_0x10363e+=VisuMZ[_0x20bdda(0x15a)][_0x20bdda(0x11c)][_0x20bdda(0x3e9)]['TurnOffsetY'],this[_0x20bdda(0x1a5)](_0x3858ee,_0x14b86b,_0x10363e,_0x4e8594,_0x20bdda(0x3e3)),this['contents'][_0x20bdda(0x228)]=![],this['resetFontSettings']();},Window_Base[_0x3f4870(0x346)][_0x3f4870(0x2a5)]=function(_0x35c1ed,_0x339049,_0x148259,_0x5bf561){const _0x5943c5=_0x3f4870;if(!VisuMZ['SkillsStatesCore']['Settings'][_0x5943c5(0x3e9)][_0x5943c5(0x331)])return;const _0x253f63=_0x35c1ed[_0x5943c5(0x314)](_0x339049),_0x4aac14=_0x35c1ed[_0x5943c5(0x145)](_0x339049),_0x2c0ae6=ImageManager['iconWidth'],_0x21f654=ImageManager[_0x5943c5(0x13f)]/0x2,_0x32690b=_0x4aac14>0x0?ColorManager['buffColor']():ColorManager[_0x5943c5(0x1db)]();this[_0x5943c5(0x124)](_0x32690b),this['changeOutlineColor'](_0x5943c5(0x246)),this['contents'][_0x5943c5(0x228)]=!![],this[_0x5943c5(0x16f)]['fontSize']=VisuMZ[_0x5943c5(0x15a)][_0x5943c5(0x11c)][_0x5943c5(0x3e9)][_0x5943c5(0x128)],_0x148259+=VisuMZ[_0x5943c5(0x15a)][_0x5943c5(0x11c)][_0x5943c5(0x3e9)][_0x5943c5(0x1f4)],_0x5bf561+=VisuMZ[_0x5943c5(0x15a)][_0x5943c5(0x11c)][_0x5943c5(0x3e9)][_0x5943c5(0x21c)];const _0x41172f=_0x5943c5(0x156)[_0x5943c5(0x2e5)](Math[_0x5943c5(0x1c6)](_0x253f63*0x64));this[_0x5943c5(0x1a5)](_0x41172f,_0x148259,_0x5bf561,_0x2c0ae6,_0x5943c5(0x363)),this[_0x5943c5(0x16f)][_0x5943c5(0x228)]=![],this[_0x5943c5(0x240)]();},VisuMZ[_0x3f4870(0x15a)][_0x3f4870(0x356)]=Window_StatusBase[_0x3f4870(0x346)][_0x3f4870(0x34d)],Window_StatusBase[_0x3f4870(0x346)][_0x3f4870(0x34d)]=function(_0xf40e4d,_0x5e53fb,_0x42d97c,_0x4aa728){const _0x15b664=_0x3f4870;if(_0xf40e4d[_0x15b664(0x1c9)]())_0x5e53fb=this[_0x15b664(0x2e9)](_0xf40e4d,_0x5e53fb);this[_0x15b664(0xee)](_0xf40e4d,_0x5e53fb,_0x42d97c,_0x4aa728);},Window_StatusBase[_0x3f4870(0x346)][_0x3f4870(0xee)]=function(_0x382495,_0x85e247,_0x4b236c,_0x23a62e){const _0x52f5a0=_0x3f4870;if(['none',_0x52f5a0(0x3ca)][_0x52f5a0(0x21b)](_0x85e247[_0x52f5a0(0x2dd)]()))return;VisuMZ[_0x52f5a0(0x15a)][_0x52f5a0(0x356)]['call'](this,_0x382495,_0x85e247,_0x4b236c,_0x23a62e);},Window_StatusBase[_0x3f4870(0x346)][_0x3f4870(0x2e9)]=function(_0x154c45,_0x2cd6d1){const _0x1ebd84=_0x3f4870,_0x45ae40=_0x154c45['currentClass']()[_0x1ebd84(0x352)];if(_0x2cd6d1==='hp'&&_0x45ae40['match'](/<REPLACE HP GAUGE:[ ](.*)>/i)){if('yMUZE'==='PbAlS'){if(this[_0x1ebd84(0x28c)](_0x39e647)){const _0x41f9cd=_0x2ba6d9[_0x1ebd84(0x15a)][_0x1ebd84(0x11c)][_0x1ebd84(0x3e9)][_0x1ebd84(0x23d)];this[_0x1ebd84(0x2b2)][_0x5dc9fe]=_0x35639e[_0x1ebd84(0x14e)](0x0,_0x41f9cd);}}else return String(RegExp['$1']);}else{if(_0x2cd6d1==='mp'&&_0x45ae40[_0x1ebd84(0x144)](/<REPLACE MP GAUGE:[ ](.*)>/i))return String(RegExp['$1']);else{if(_0x2cd6d1==='tp'&&_0x45ae40[_0x1ebd84(0x144)](/<REPLACE TP GAUGE:[ ](.*)>/i)){if(_0x1ebd84(0x3a2)===_0x1ebd84(0x36b)){const _0xefbf33=_0x3ce45f(_0x3d0ada['$1']),_0x426038=_0x1ebd84(0x1ef)[_0x1ebd84(0x2e5)](_0xefbf33);_0x47671d[_0x1ebd84(0x15a)][_0x1ebd84(0x32a)][_0x3de2c0['id']]=new _0x34c4b5(_0x1ebd84(0x1c5),_0x426038);}else return String(RegExp['$1']);}else{if(_0x1ebd84(0x2bd)===_0x1ebd84(0x2bd))return _0x2cd6d1;else this[_0x1ebd84(0x250)](_0x308a29['id']);}}}},VisuMZ['SkillsStatesCore'][_0x3f4870(0x207)]=Window_StatusBase[_0x3f4870(0x346)][_0x3f4870(0x17e)],Window_StatusBase[_0x3f4870(0x346)][_0x3f4870(0x17e)]=function(_0x4c74b5,_0x1de779,_0xa04d78,_0x6fdf57){const _0x2a81eb=_0x3f4870;if(!_0x4c74b5)return;Window_Base[_0x2a81eb(0x346)]['drawActorIcons']['call'](this,_0x4c74b5,_0x1de779,_0xa04d78,_0x6fdf57);},VisuMZ[_0x3f4870(0x15a)][_0x3f4870(0x161)]=Window_SkillType[_0x3f4870(0x346)][_0x3f4870(0x2c6)],Window_SkillType[_0x3f4870(0x346)][_0x3f4870(0x2c6)]=function(_0x494283){const _0x12ddf9=_0x3f4870;VisuMZ['SkillsStatesCore'][_0x12ddf9(0x161)][_0x12ddf9(0x2b4)](this,_0x494283),this[_0x12ddf9(0x1a9)](_0x494283);},Window_SkillType['prototype']['createCommandNameWindow']=function(_0x2458f7){const _0x2634be=_0x3f4870,_0x193899=new Rectangle(0x0,0x0,_0x2458f7[_0x2634be(0x39d)],_0x2458f7['height']);this['_commandNameWindow']=new Window_Base(_0x193899),this['_commandNameWindow']['opacity']=0x0,this['addChild'](this[_0x2634be(0x10f)]),this['updateCommandNameWindow']();},Window_SkillType[_0x3f4870(0x346)][_0x3f4870(0x1cb)]=function(){const _0x1c0466=_0x3f4870;Window_Command['prototype'][_0x1c0466(0x1cb)][_0x1c0466(0x2b4)](this);if(this[_0x1c0466(0x10f)])this[_0x1c0466(0x296)]();},Window_SkillType[_0x3f4870(0x346)]['updateCommandNameWindow']=function(){const _0x5d58dc=_0x3f4870,_0x1456fa=this[_0x5d58dc(0x10f)];_0x1456fa[_0x5d58dc(0x16f)][_0x5d58dc(0x27e)]();const _0x16187e=this[_0x5d58dc(0x102)](this[_0x5d58dc(0x25c)]());if(_0x16187e===_0x5d58dc(0x25a)&&this[_0x5d58dc(0x163)]()>0x0){if(_0x5d58dc(0x2fe)!=='fRKJS'){const _0x11fa8d=this[_0x5d58dc(0x1ea)](this[_0x5d58dc(0x25c)]());let _0x1d2602=this['commandName'](this['index']());_0x1d2602=_0x1d2602[_0x5d58dc(0x3c5)](/\\I\[(\d+)\]/gi,''),_0x1456fa[_0x5d58dc(0x240)](),this['commandNameWindowDrawBackground'](_0x1d2602,_0x11fa8d),this[_0x5d58dc(0x261)](_0x1d2602,_0x11fa8d),this[_0x5d58dc(0x32c)](_0x1d2602,_0x11fa8d);}else{if(!this[_0x5d58dc(0x28a)])return;const _0x340936=this[_0x5d58dc(0x28a)]['skillTypes']();for(const _0x10d46e of _0x340936){const _0x5e7708=this[_0x5d58dc(0xe2)](_0x10d46e);this[_0x5d58dc(0x192)](_0x5e7708,_0x5d58dc(0x1c5),!![],_0x10d46e);}}}},Window_SkillType[_0x3f4870(0x346)][_0x3f4870(0x243)]=function(_0x5d5de0,_0x2b1ea4){},Window_SkillType[_0x3f4870(0x346)][_0x3f4870(0x261)]=function(_0x273976,_0x3e5db9){const _0x14ebb1=_0x3f4870,_0x47621f=this[_0x14ebb1(0x10f)];_0x47621f[_0x14ebb1(0x1a5)](_0x273976,0x0,_0x3e5db9['y'],_0x47621f[_0x14ebb1(0x2d6)],_0x14ebb1(0x363));},Window_SkillType[_0x3f4870(0x346)][_0x3f4870(0x32c)]=function(_0x49ad70,_0x3a82cb){const _0x415131=_0x3f4870,_0x39f122=this[_0x415131(0x10f)],_0x4f801c=$gameSystem[_0x415131(0xf3)](),_0x9b89b8=_0x3a82cb['x']+Math[_0x415131(0x2bc)](_0x3a82cb[_0x415131(0x39d)]/0x2)+_0x4f801c;_0x39f122['x']=_0x39f122[_0x415131(0x39d)]/-0x2+_0x9b89b8,_0x39f122['y']=Math[_0x415131(0x2bc)](_0x3a82cb[_0x415131(0xf4)]/0x2);},Window_SkillType[_0x3f4870(0x346)][_0x3f4870(0x2e2)]=function(){const _0x4b522c=_0x3f4870;return Imported[_0x4b522c(0x172)]&&Window_Command[_0x4b522c(0x346)][_0x4b522c(0x2e2)][_0x4b522c(0x2b4)](this);},Window_SkillType['prototype'][_0x3f4870(0x1b3)]=function(){const _0x1e6310=_0x3f4870;if(!this[_0x1e6310(0x28a)])return;const _0x5dfc92=this['_actor'][_0x1e6310(0x186)]();for(const _0x4ef54e of _0x5dfc92){const _0x5f5653=this['makeCommandName'](_0x4ef54e);this[_0x1e6310(0x192)](_0x5f5653,_0x1e6310(0x1c5),!![],_0x4ef54e);}},Window_SkillType[_0x3f4870(0x346)][_0x3f4870(0xe2)]=function(_0x7ce70a){const _0xadeaef=_0x3f4870;let _0x4edab1=$dataSystem[_0xadeaef(0x186)][_0x7ce70a];if(_0x4edab1['match'](/\\I\[(\d+)\]/i))return _0x4edab1;if(this[_0xadeaef(0x397)]()===_0xadeaef(0x1eb))return _0x4edab1;const _0x125398=VisuMZ['SkillsStatesCore'][_0xadeaef(0x11c)][_0xadeaef(0x2d9)],_0x1f1ee0=$dataSystem['magicSkills'][_0xadeaef(0x21b)](_0x7ce70a),_0x330105=_0x1f1ee0?_0x125398[_0xadeaef(0x23a)]:_0x125398[_0xadeaef(0x29c)];return _0xadeaef(0x37b)[_0xadeaef(0x2e5)](_0x330105,_0x4edab1);},Window_SkillType[_0x3f4870(0x346)][_0x3f4870(0xeb)]=function(){const _0x20f4ae=_0x3f4870;return VisuMZ['SkillsStatesCore'][_0x20f4ae(0x11c)][_0x20f4ae(0x2d9)][_0x20f4ae(0x2b0)];},Window_SkillType[_0x3f4870(0x346)]['drawItem']=function(_0x88dc50){const _0x182787=_0x3f4870,_0x28bd25=this[_0x182787(0x102)](_0x88dc50);if(_0x28bd25===_0x182787(0x15c))this[_0x182787(0x319)](_0x88dc50);else _0x28bd25===_0x182787(0x25a)?_0x182787(0x19e)===_0x182787(0x19e)?this[_0x182787(0x2d7)](_0x88dc50):this['_stateDisplay'][_0x519cf0]='':Window_Command[_0x182787(0x346)][_0x182787(0x22b)]['call'](this,_0x88dc50);},Window_SkillType[_0x3f4870(0x346)][_0x3f4870(0x397)]=function(){const _0x4aeae3=_0x3f4870;return VisuMZ['SkillsStatesCore'][_0x4aeae3(0x11c)][_0x4aeae3(0x2d9)]['CmdStyle'];},Window_SkillType[_0x3f4870(0x346)][_0x3f4870(0x102)]=function(_0x1e53a5){const _0x110749=_0x3f4870;if(_0x1e53a5<0x0)return _0x110749(0x1eb);const _0x51e631=this[_0x110749(0x397)]();if(_0x51e631!==_0x110749(0x2c0)){if(_0x110749(0x162)===_0x110749(0x2a6)){const _0xc06edd=_0x15198e[_0x110749(0x18d)]('['+_0x2387e2['$1'][_0x110749(0x144)](/\d+/g)+']');for(const _0x124c1a of _0xc06edd){if(!_0x384941[_0x110749(0x2e8)](_0x124c1a))return!![];}return![];}else return _0x51e631;}else{if(this[_0x110749(0x163)]()>0x0){const _0x1e154e=this['commandName'](_0x1e53a5);if(_0x1e154e['match'](/\\I\[(\d+)\]/i)){if('tWsWp'!==_0x110749(0x320)){const _0x550568=_0x54f3d6[_0x384620-_0x2dbe1c[_0x110749(0x1dd)]];if(_0x550568===_0x1e052f)return;_0x3651bb[_0x110749(0x346)][_0x110749(0x153)][_0x110749(0x2b4)](this,_0x58d10d,_0x550568,0x0,0x0),_0x5a398f['prototype'][_0x110749(0x2a5)][_0x110749(0x2b4)](this,_0x5edc26,_0x550568,0x0,0x0);}else{const _0x4e98e6=this[_0x110749(0x1ea)](_0x1e53a5),_0x406ff0=this['textSizeEx'](_0x1e154e)[_0x110749(0x39d)];return _0x406ff0<=_0x4e98e6['width']?_0x110749(0x15c):'icon';}}}}return _0x110749(0x1eb);},Window_SkillType[_0x3f4870(0x346)][_0x3f4870(0x319)]=function(_0x53abf8){const _0x12c4e6=_0x3f4870,_0x5a729e=this[_0x12c4e6(0x1ea)](_0x53abf8),_0x13161b=this['commandName'](_0x53abf8),_0x1e61ac=this[_0x12c4e6(0x38c)](_0x13161b)[_0x12c4e6(0x39d)];this[_0x12c4e6(0x20c)](this[_0x12c4e6(0x395)](_0x53abf8));const _0x32000a=this['itemTextAlign']();if(_0x32000a===_0x12c4e6(0x3e3))this[_0x12c4e6(0x38e)](_0x13161b,_0x5a729e['x']+_0x5a729e[_0x12c4e6(0x39d)]-_0x1e61ac,_0x5a729e['y'],_0x1e61ac);else{if(_0x32000a===_0x12c4e6(0x363)){if(_0x12c4e6(0xe7)!==_0x12c4e6(0xe7)){const _0x359a78=_0x582590[_0x2b04fc];if(_0x359a78&&_0x359a78[_0x12c4e6(0x1b5)]['length']>0x0)for(const _0x2d6e32 of _0x359a78[_0x12c4e6(0x1b5)]){if(this[_0x12c4e6(0x2c5)](_0x2d6e32))return!![];}return _0x3ff698[_0x12c4e6(0x15a)][_0x12c4e6(0x1f6)][_0x12c4e6(0x2b4)](this,_0x4b42d4);}else{const _0xca8247=_0x5a729e['x']+Math[_0x12c4e6(0x2bc)]((_0x5a729e[_0x12c4e6(0x39d)]-_0x1e61ac)/0x2);this['drawTextEx'](_0x13161b,_0xca8247,_0x5a729e['y'],_0x1e61ac);}}else{if(_0x12c4e6(0x278)==='JGOAp'){let _0x153a71=[this['enemy']()];return _0x153a71[_0x12c4e6(0x2cd)](this[_0x12c4e6(0x164)]());}else this[_0x12c4e6(0x38e)](_0x13161b,_0x5a729e['x'],_0x5a729e['y'],_0x1e61ac);}}},Window_SkillType[_0x3f4870(0x346)][_0x3f4870(0x2d7)]=function(_0x3874e3){const _0x378a62=_0x3f4870;this[_0x378a62(0x257)](_0x3874e3)[_0x378a62(0x144)](/\\I\[(\d+)\]/i);const _0x34a4a5=Number(RegExp['$1'])||0x0,_0x5a5f0f=this['itemLineRect'](_0x3874e3),_0x448c23=_0x5a5f0f['x']+Math['floor']((_0x5a5f0f[_0x378a62(0x39d)]-ImageManager[_0x378a62(0x3c1)])/0x2),_0x390909=_0x5a5f0f['y']+(_0x5a5f0f['height']-ImageManager[_0x378a62(0x13f)])/0x2;this[_0x378a62(0x10e)](_0x34a4a5,_0x448c23,_0x390909);},VisuMZ[_0x3f4870(0x15a)]['Window_SkillStatus_refresh']=Window_SkillStatus[_0x3f4870(0x346)][_0x3f4870(0x2d0)],Window_SkillStatus['prototype']['refresh']=function(){const _0x1b8d68=_0x3f4870;VisuMZ['SkillsStatesCore'][_0x1b8d68(0x3cf)]['call'](this);if(this['_actor'])this[_0x1b8d68(0x2c7)]();},Window_SkillStatus[_0x3f4870(0x346)][_0x3f4870(0x2c7)]=function(){const _0xec3332=_0x3f4870;if(!Imported['VisuMZ_0_CoreEngine'])return;if(!Imported[_0xec3332(0x3d8)])return;const _0x30ee8e=this[_0xec3332(0xe6)]();let _0x4012ec=this[_0xec3332(0x2c4)]()/0x2+0xb4+0xb4+0xb4,_0x491368=this[_0xec3332(0x2d6)]-_0x4012ec-0x2;if(_0x491368>=0x12c){if(_0xec3332(0x178)===_0xec3332(0x105))this[_0xec3332(0x1b9)]&&this[_0xec3332(0x1b9)][_0xec3332(0x35b)]===_0x1f90c0&&this[_0xec3332(0x1b9)]['setItem'](this[_0xec3332(0x271)](0x0));else{const _0x464eff=VisuMZ[_0xec3332(0x1f7)][_0xec3332(0x11c)][_0xec3332(0x24a)][_0xec3332(0x2fb)],_0x3239f5=Math[_0xec3332(0x2bc)](_0x491368/0x2)-0x18;let _0x7a3375=_0x4012ec,_0x35da86=Math[_0xec3332(0x2bc)]((this[_0xec3332(0x2ea)]-Math[_0xec3332(0x129)](_0x464eff['length']/0x2)*_0x30ee8e)/0x2),_0x3baed7=0x0;for(const _0x3e0be8 of _0x464eff){this[_0xec3332(0x191)](_0x7a3375,_0x35da86,_0x3239f5,_0x3e0be8),_0x3baed7++;if(_0x3baed7%0x2===0x0){if(_0xec3332(0x1ca)===_0xec3332(0x36f)){if(!this[_0xec3332(0x28a)][_0xec3332(0x35c)](_0x2825b3))return![];}else _0x7a3375=_0x4012ec,_0x35da86+=_0x30ee8e;}else _0x7a3375+=_0x3239f5+0x18;}}}this['resetFontSettings']();},Window_SkillStatus[_0x3f4870(0x346)][_0x3f4870(0x191)]=function(_0x330a3d,_0xae559d,_0x14168d,_0x51907c){const _0xf37b1a=_0x3f4870,_0x1e2aa9=this[_0xf37b1a(0xe6)]();this[_0xf37b1a(0x240)](),this[_0xf37b1a(0x309)](_0x330a3d,_0xae559d,_0x14168d,_0x51907c,!![]),this[_0xf37b1a(0x3ec)](),this['contents'][_0xf37b1a(0x25e)]-=0x8;const _0x50d100=this[_0xf37b1a(0x28a)][_0xf37b1a(0x322)](_0x51907c,!![]);this[_0xf37b1a(0x16f)][_0xf37b1a(0x1a5)](_0x50d100,_0x330a3d,_0xae559d,_0x14168d,_0x1e2aa9,_0xf37b1a(0x3e3));},VisuMZ[_0x3f4870(0x15a)]['Window_SkillList_includes']=Window_SkillList['prototype']['includes'],Window_SkillList[_0x3f4870(0x346)][_0x3f4870(0x21b)]=function(_0x3a8395){const _0x1e4224=_0x3f4870;return this[_0x1e4224(0x313)](_0x3a8395);},VisuMZ['SkillsStatesCore'][_0x3f4870(0x1df)]=Window_SkillList['prototype']['maxCols'],Window_SkillList[_0x3f4870(0x346)][_0x3f4870(0x244)]=function(){const _0x5c0cd2=_0x3f4870;return SceneManager[_0x5c0cd2(0x311)][_0x5c0cd2(0x35b)]===Scene_Battle?VisuMZ[_0x5c0cd2(0x15a)][_0x5c0cd2(0x1df)][_0x5c0cd2(0x2b4)](this):VisuMZ[_0x5c0cd2(0x15a)]['Settings'][_0x5c0cd2(0x2d9)][_0x5c0cd2(0x1d4)];},VisuMZ[_0x3f4870(0x15a)]['Window_SkillList_setActor']=Window_SkillList['prototype'][_0x3f4870(0x2cb)],Window_SkillList['prototype']['setActor']=function(_0xa5fcf8){const _0x59f858=_0x3f4870,_0xd91379=this[_0x59f858(0x28a)]!==_0xa5fcf8;VisuMZ[_0x59f858(0x15a)][_0x59f858(0x287)][_0x59f858(0x2b4)](this,_0xa5fcf8);if(_0xd91379){if(this[_0x59f858(0x1b9)]&&this[_0x59f858(0x1b9)][_0x59f858(0x35b)]===Window_ShopStatus){if(_0x59f858(0x3dd)===_0x59f858(0x3dd))this[_0x59f858(0x1b9)][_0x59f858(0x386)](this[_0x59f858(0x271)](0x0));else{const _0x59cb4a=this['states']();for(const _0x508608 of _0x59cb4a){if(_0x508608&&this['canClearState'](_0x508608))this[_0x59f858(0x303)](_0x508608['id']);}this[_0x59f858(0x14d)]={};}}}},Window_SkillList['prototype'][_0x3f4870(0x2bf)]=function(_0x329c53){const _0x36a52e=_0x3f4870;if(this['_stypeId']===_0x329c53)return;this['_stypeId']=_0x329c53,this['refresh'](),this[_0x36a52e(0x1e2)](0x0,0x0),this['_statusWindow']&&this[_0x36a52e(0x1b9)][_0x36a52e(0x35b)]===Window_ShopStatus&&this[_0x36a52e(0x1b9)][_0x36a52e(0x386)](this[_0x36a52e(0x271)](0x0));},Window_SkillList[_0x3f4870(0x346)]['includesSkillsStatesCore']=function(_0x227fe8){const _0x227416=_0x3f4870;if(!_0x227fe8)return VisuMZ[_0x227416(0x15a)]['Window_SkillList_includes'][_0x227416(0x2b4)](this,_0x227fe8);if(!this[_0x227416(0x3de)](_0x227fe8))return![];if(!this[_0x227416(0x2ec)](_0x227fe8))return![];if(!this[_0x227416(0x25d)](_0x227fe8))return![];return!![];},Window_SkillList['prototype'][_0x3f4870(0x3de)]=function(_0x567fae){const _0x56ea94=_0x3f4870;return DataManager[_0x56ea94(0x212)](_0x567fae)[_0x56ea94(0x21b)](this[_0x56ea94(0x22a)]);},Window_SkillList['prototype'][_0x3f4870(0x2ec)]=function(_0x498938){const _0x58a2f2=_0x3f4870;if(!this['checkShowHideBattleNotetags'](_0x498938))return![];if(!this[_0x58a2f2(0x188)](_0x498938))return![];if(!this['checkShowHideSkillNotetags'](_0x498938))return![];return!![];},Window_SkillList[_0x3f4870(0x346)]['checkShowHideBattleNotetags']=function(_0x2da2be){const _0x29f0fe=_0x3f4870,_0x56d735=_0x2da2be[_0x29f0fe(0x352)];if(_0x56d735[_0x29f0fe(0x144)](/<HIDE IN BATTLE>/i)&&$gameParty['inBattle']())return![];else{if(_0x56d735[_0x29f0fe(0x144)](/<HIDE OUTSIDE BATTLE>/i)&&!$gameParty[_0x29f0fe(0x1cf)]())return'uHzWo'!==_0x29f0fe(0x379)?(_0x392d1c=_0x250d6b[_0x29f0fe(0x14e)](-0x2,0x2),_0x53d579[_0x29f0fe(0x15a)]['Game_BattlerBase_buffIconIndex']['call'](this,_0x2bf7d9,_0x3ff834)):![];else{if(_0x29f0fe(0x3bb)===_0x29f0fe(0x3bb))return!![];else this[_0x29f0fe(0x154)]='';}}},Window_SkillList[_0x3f4870(0x346)][_0x3f4870(0x188)]=function(_0x54b784){const _0x17d092=_0x3f4870,_0x28bcce=_0x54b784[_0x17d092(0x352)];if(_0x28bcce[_0x17d092(0x144)](/<SHOW[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x5d8aaf=JSON[_0x17d092(0x18d)]('['+RegExp['$1'][_0x17d092(0x144)](/\d+/g)+']');for(const _0x39baf5 of _0x5d8aaf){if(_0x17d092(0x21d)===_0x17d092(0x350)){if(!_0x1bda09[_0x17d092(0x2e8)](_0xabe405))return!![];}else{if(!$gameSwitches[_0x17d092(0x2e8)](_0x39baf5))return![];}}return!![];}if(_0x28bcce[_0x17d092(0x144)](/<SHOW ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x1c3b64=JSON[_0x17d092(0x18d)]('['+RegExp['$1'][_0x17d092(0x144)](/\d+/g)+']');for(const _0x20aeb0 of _0x1c3b64){if(!$gameSwitches['value'](_0x20aeb0))return![];}return!![];}if(_0x28bcce['match'](/<SHOW ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x140d21=JSON[_0x17d092(0x18d)]('['+RegExp['$1'][_0x17d092(0x144)](/\d+/g)+']');for(const _0x532125 of _0x140d21){if(_0x17d092(0x169)!==_0x17d092(0x169))this[_0x17d092(0x1b9)]=_0x38ed89,this[_0x17d092(0x1cb)]();else{if($gameSwitches[_0x17d092(0x2e8)](_0x532125))return!![];}}return![];}if(_0x28bcce['match'](/<HIDE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x17d092(0x152)===_0x17d092(0x143))_0x5310a3[_0x17d092(0x1b5)][_0x17d092(0x2d2)](_0x17d092(0x2d1));else{const _0x21ab02=JSON[_0x17d092(0x18d)]('['+RegExp['$1'][_0x17d092(0x144)](/\d+/g)+']');for(const _0x1bbdbc of _0x21ab02){if(_0x17d092(0x20a)===_0x17d092(0x3bd)){const _0x784e42=_0x1b8736(_0x217f8b['$1']);if(_0x59b744['isStateCategoryAffected'](_0x784e42))return!![];}else{if(!$gameSwitches[_0x17d092(0x2e8)](_0x1bbdbc))return!![];}}return![];}}if(_0x28bcce[_0x17d092(0x144)](/<HIDE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x17d092(0x372)===_0x17d092(0x3be))for(_0x423015 of _0x2b6b76[_0x17d092(0x15a)][_0x17d092(0x11c)]['Costs']){const _0x4775a2=_0x5be346['CalcJS']['call'](this,_0x1c7df0);_0x29f3d0['PayJS'][_0x17d092(0x2b4)](this,_0x40ecf6,_0x4775a2);}else{const _0x4d3c94=JSON[_0x17d092(0x18d)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x1f41ad of _0x4d3c94){if(_0x17d092(0x148)!==_0x17d092(0x148)){if(!_0x53738f['value'](_0x3763aa))return!![];}else{if(!$gameSwitches[_0x17d092(0x2e8)](_0x1f41ad))return!![];}}return![];}}if(_0x28bcce[_0x17d092(0x144)](/<HIDE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x17d092(0x306)===_0x17d092(0x1e1)){if(_0x3db7e2&&this[_0x17d092(0x1f9)](_0x2e4539))this[_0x17d092(0x303)](_0x21cec7['id']);}else{const _0x162dc5=JSON[_0x17d092(0x18d)]('['+RegExp['$1'][_0x17d092(0x144)](/\d+/g)+']');for(const _0x24895c of _0x162dc5){if($gameSwitches[_0x17d092(0x2e8)](_0x24895c))return![];}return!![];}}return!![];},Window_SkillList[_0x3f4870(0x346)][_0x3f4870(0x326)]=function(_0x44204d){const _0x105a86=_0x3f4870,_0x205e41=_0x44204d[_0x105a86(0x352)];if(_0x205e41[_0x105a86(0x144)](/<SHOW IF LEARNED[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x105a86(0x2de)!=='glPMU'){const _0x59e9ce=JSON['parse']('['+RegExp['$1'][_0x105a86(0x144)](/\d+/g)+']');for(const _0x3b6edc of _0x59e9ce){if('fmelu'===_0x105a86(0x31d)){if(_0x1b7c49['value'](_0x5d3cbc))return![];}else{if(!this[_0x105a86(0x28a)][_0x105a86(0x3ed)](_0x3b6edc))return![];}}return!![];}else return _0x5a34f6[_0x596a53['id']][_0x105a86(0x2b4)](this,_0x4f1414);}else{if(_0x205e41[_0x105a86(0x144)](/<SHOW IF LEARNED[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x119d56=RegExp['$1'][_0x105a86(0x200)](',');for(const _0x19449a of _0x119d56){if(_0x105a86(0x2be)===_0x105a86(0x2be)){const _0x183b40=DataManager[_0x105a86(0x1d8)](_0x19449a);if(!_0x183b40)continue;if(!this[_0x105a86(0x28a)][_0x105a86(0x3ed)](_0x183b40))return![];}else return[];}return!![];}}if(_0x205e41['match'](/<SHOW IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x5251b1=JSON[_0x105a86(0x18d)]('['+RegExp['$1'][_0x105a86(0x144)](/\d+/g)+']');for(const _0x5dcf2c of _0x5251b1){if(!this[_0x105a86(0x28a)][_0x105a86(0x3ed)](_0x5dcf2c))return![];}return!![];}else{if(_0x205e41[_0x105a86(0x144)](/<SHOW IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)){if(_0x105a86(0x2a2)!==_0x105a86(0x2a2))return this[_0x105a86(0x177)](_0x4a64b6);else{const _0x4af268=RegExp['$1'][_0x105a86(0x200)](',');for(const _0x6c16c8 of _0x4af268){const _0x28e20f=DataManager['getSkillIdWithName'](_0x6c16c8);if(!_0x28e20f)continue;if(!this[_0x105a86(0x28a)]['isLearnedSkill'](_0x28e20f))return![];}return!![];}}}if(_0x205e41['match'](/<SHOW IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x20c073=JSON[_0x105a86(0x18d)]('['+RegExp['$1'][_0x105a86(0x144)](/\d+/g)+']');for(const _0x302a50 of _0x20c073){if(this[_0x105a86(0x28a)][_0x105a86(0x3ed)](_0x302a50))return!![];}return![];}else{if(_0x205e41[_0x105a86(0x144)](/<SHOW IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x17aee5=RegExp['$1'][_0x105a86(0x200)](',');for(const _0x2530e9 of _0x17aee5){if(_0x105a86(0x16e)==='xskOh'){_0x3d8899['prototype'][_0x105a86(0x1cb)][_0x105a86(0x2b4)](this);if(this['_commandNameWindow'])this[_0x105a86(0x296)]();}else{const _0x58d040=DataManager[_0x105a86(0x1d8)](_0x2530e9);if(!_0x58d040)continue;if(this[_0x105a86(0x28a)]['isLearnedSkill'](_0x58d040))return!![];}}return![];}}if(_0x205e41[_0x105a86(0x144)](/<HIDE IF LEARNED[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0xca7f63=JSON[_0x105a86(0x18d)]('['+RegExp['$1'][_0x105a86(0x144)](/\d+/g)+']');for(const _0x74acb4 of _0xca7f63){if('uNIYn'!==_0x105a86(0x235)){if(!_0x4b2ca5[_0x105a86(0x3f1)])return![];else return this['isUseSkillsStatesCoreUpdatedLayout']()?!![]:_0x2aaa2f[_0x105a86(0x15a)][_0x105a86(0x11c)][_0x105a86(0x2d9)][_0x105a86(0xf9)];}else{if(!this[_0x105a86(0x28a)][_0x105a86(0x3ed)](_0x74acb4))return!![];}}return![];}else{if(_0x205e41[_0x105a86(0x144)](/<HIDE IF LEARNED[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x107437=RegExp['$1'][_0x105a86(0x200)](',');for(const _0x188068 of _0x107437){const _0x323bd7=DataManager[_0x105a86(0x1d8)](_0x188068);if(!_0x323bd7)continue;if(!this[_0x105a86(0x28a)]['isLearnedSkill'](_0x323bd7))return!![];}return![];}}if(_0x205e41[_0x105a86(0x144)](/<HIDE IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x4e66bf=JSON[_0x105a86(0x18d)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x35716c of _0x4e66bf){if(!this[_0x105a86(0x28a)][_0x105a86(0x3ed)](_0x35716c))return!![];}return![];}else{if(_0x205e41[_0x105a86(0x144)](/<HIDE IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)){if(_0x105a86(0x3a4)!==_0x105a86(0x297)){const _0x462f98=RegExp['$1'][_0x105a86(0x200)](',');for(const _0x57faac of _0x462f98){const _0x13ebe9=DataManager['getSkillIdWithName'](_0x57faac);if(!_0x13ebe9)continue;if(!this[_0x105a86(0x28a)][_0x105a86(0x3ed)](_0x13ebe9))return!![];}return![];}else{const _0x4d2906=_0x3dff89(_0x535bf0['$1']),_0x2bfe79=_0x26e0f3[_0x105a86(0x2e5)](_0x4d2906,_0x105a86(0x170),-0x1,'slipHp');_0x386e05[_0x105a86(0x15a)][_0x105a86(0x3ee)][_0x124c76['id']]=new _0x201f8a('stateId',_0x2bfe79);}}}if(_0x205e41[_0x105a86(0x144)](/<HIDE IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x105a86(0x38f)===_0x105a86(0x38f)){const _0x15eb03=JSON['parse']('['+RegExp['$1'][_0x105a86(0x144)](/\d+/g)+']');for(const _0x2d3a74 of _0x15eb03){if(this[_0x105a86(0x28a)]['isLearnedSkill'](_0x2d3a74))return![];}return!![];}else{if(typeof _0x1944d5!==_0x105a86(0x1e8))_0x2bcf76=_0x153ba5['id'];const _0x150b6f=this['stateData'](_0x2dca38);return _0x150b6f[_0x50d46c];}}else{if(_0x205e41['match'](/<HIDE IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x1e45b4=RegExp['$1'][_0x105a86(0x200)](',');for(const _0x4a1353 of _0x1e45b4){const _0x5e7cd0=DataManager['getSkillIdWithName'](_0x4a1353);if(!_0x5e7cd0)continue;if(this[_0x105a86(0x28a)][_0x105a86(0x3ed)](_0x5e7cd0))return![];}return!![];}}if(_0x205e41[_0x105a86(0x144)](/<SHOW IF (?:HAS|HAVE)[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x5134e5=JSON[_0x105a86(0x18d)]('['+RegExp['$1'][_0x105a86(0x144)](/\d+/g)+']');for(const _0x144af3 of _0x5134e5){if(!this[_0x105a86(0x28a)][_0x105a86(0x35c)](_0x144af3))return![];}return!![];}else{if(_0x205e41[_0x105a86(0x144)](/<SHOW IF (?:HAS|HAVE)[ ](?:SKILL|SKILLS):[ ](.*)>/i)){if(_0x105a86(0x333)===_0x105a86(0x20b)){if(_0x276bf3['Name'][_0x105a86(0x180)]()==='TP')return _0x161514['CalcJS'][_0x105a86(0x2b4)](this,_0x37d86a);}else{const _0x1f5cea=RegExp['$1'][_0x105a86(0x200)](',');for(const _0x43d654 of _0x1f5cea){if('tPksP'!=='UUCDB'){const _0x58f37a=DataManager[_0x105a86(0x1d8)](_0x43d654);if(!_0x58f37a)continue;if(!this['_actor'][_0x105a86(0x35c)](_0x58f37a))return![];}else{if(!_0x242867)return;_0x303b49['prototype'][_0x105a86(0x17e)][_0x105a86(0x2b4)](this,_0x4e71a2,_0x49e438,_0x24d38b,_0xc29bd0);}}return!![];}}}if(_0x205e41[_0x105a86(0x144)](/<SHOW IF (?:HAS|HAVE) ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x4cf304=JSON[_0x105a86(0x18d)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x2ed725 of _0x4cf304){if(_0x105a86(0x1bc)===_0x105a86(0x1bc)){if(!this[_0x105a86(0x28a)]['hasSkill'](_0x2ed725))return![];}else!_0x3096c8[_0x105a86(0x21b)](_0x5074d1)&&this[_0x105a86(0x136)](_0xb17be2,_0x66b262,_0x4a0eb3,_0x500291),this['drawActorStateData'](_0x523bef,_0x5703d7,_0x4c4f39,_0x24e848),_0x12dc18[_0x105a86(0x2d2)](_0x565595);}return!![];}else{if(_0x205e41[_0x105a86(0x144)](/<SHOW IF (?:HAS|HAVE) ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x344ab1=RegExp['$1'][_0x105a86(0x200)](',');for(const _0x5dd90c of _0x344ab1){const _0x3b82dd=DataManager[_0x105a86(0x1d8)](_0x5dd90c);if(!_0x3b82dd)continue;if(!this[_0x105a86(0x28a)][_0x105a86(0x35c)](_0x3b82dd))return![];}return!![];}}if(_0x205e41['match'](/<SHOW IF (?:HAS|HAVE) ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if('xWjDO'==='WyPRZ'){if(!_0x1d7d1c[_0x105a86(0x2e8)](_0x556517))return!![];}else{const _0x45c3b6=JSON[_0x105a86(0x18d)]('['+RegExp['$1'][_0x105a86(0x144)](/\d+/g)+']');for(const _0x44b7fa of _0x45c3b6){if('MzUHT'==='MzUHT'){if(this[_0x105a86(0x28a)][_0x105a86(0x35c)](_0x44b7fa))return!![];}else _0x376954=_0x1a10b2(_0x27d243['$1']),_0x31ef5e=_0x131d41(_0x30300b['$2']);}return![];}}else{if(_0x205e41[_0x105a86(0x144)](/<SHOW IF (?:HAS|HAVE) ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x1d2687=RegExp['$1']['split'](',');for(const _0x160d07 of _0x1d2687){const _0x3d3dc8=DataManager[_0x105a86(0x1d8)](_0x160d07);if(!_0x3d3dc8)continue;if(this['_actor'][_0x105a86(0x35c)](_0x3d3dc8))return!![];}return![];}}if(_0x205e41[_0x105a86(0x144)](/<HIDE IF (?:HAS|HAVE)[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x47da63=JSON[_0x105a86(0x18d)]('['+RegExp['$1'][_0x105a86(0x144)](/\d+/g)+']');for(const _0x371c23 of _0x47da63){if(!this[_0x105a86(0x28a)][_0x105a86(0x35c)](_0x371c23))return!![];}return![];}else{if(_0x205e41['match'](/<HIDE IF (?:HAS|HAVE)[ ](?:SKILL|SKILLS):[ ](.*)>/i)){if(_0x105a86(0x288)!==_0x105a86(0x2aa)){const _0x3874b7=RegExp['$1'][_0x105a86(0x200)](',');for(const _0x30aeaf of _0x3874b7){const _0x125ea9=DataManager[_0x105a86(0x1d8)](_0x30aeaf);if(!_0x125ea9)continue;if(!this[_0x105a86(0x28a)][_0x105a86(0x35c)](_0x125ea9))return!![];}return![];}else _0x3e3b95['SkillsStatesCore'][_0x105a86(0x11c)][_0x105a86(0x2b9)][_0x105a86(0x292)][_0x105a86(0x2b4)](this,_0xed1486);}}if(_0x205e41[_0x105a86(0x144)](/<HIDE IF (?:HAS|HAVE) ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x105a86(0x12b)!==_0x105a86(0x12b))_0x439ba3(_0x105a86(0x2c2)[_0x105a86(0x2e5)](_0x251e7f,_0x52457c)),_0x18bfed['exit']();else{const _0x26d9de=JSON[_0x105a86(0x18d)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x14351e of _0x26d9de){if(!this[_0x105a86(0x28a)][_0x105a86(0x35c)](_0x14351e))return!![];}return![];}}else{if(_0x205e41[_0x105a86(0x144)](/<HIDE IF (?:HAS|HAVE) ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x17bb7c=RegExp['$1'][_0x105a86(0x200)](',');for(const _0x4bb2c0 of _0x17bb7c){if(_0x105a86(0x20e)===_0x105a86(0xf5))this[_0x105a86(0x196)]()!==''?this[_0x105a86(0x3d0)]():(_0x5601ae[_0x105a86(0x15a)][_0x105a86(0x23c)][_0x105a86(0x2b4)](this),this[_0x105a86(0x159)]());else{const _0x3b50b4=DataManager[_0x105a86(0x1d8)](_0x4bb2c0);if(!_0x3b50b4)continue;if(!this[_0x105a86(0x28a)][_0x105a86(0x35c)](_0x3b50b4))return!![];}}return![];}}if(_0x205e41[_0x105a86(0x144)](/<HIDE IF (?:HAS|HAVE) ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if('zYjJq'===_0x105a86(0x324)){if(!_0x376b16)return _0x22e0a2['SkillsStatesCore'][_0x105a86(0x2a8)][_0x105a86(0x2b4)](this,_0x31eba5);if(!this[_0x105a86(0x3de)](_0x324336))return![];if(!this[_0x105a86(0x2ec)](_0x437e0f))return![];if(!this['checkShowHideJS'](_0xf89ea2))return![];return!![];}else{const _0xaf5bdc=JSON[_0x105a86(0x18d)]('['+RegExp['$1'][_0x105a86(0x144)](/\d+/g)+']');for(const _0x3a4b14 of _0xaf5bdc){if(this[_0x105a86(0x28a)][_0x105a86(0x35c)](_0x3a4b14))return![];}return!![];}}else{if(_0x205e41[_0x105a86(0x144)](/<HIDE IF (?:HAS|HAVE) ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)){if(_0x105a86(0x1c7)!==_0x105a86(0x1c7)){_0x187fb8[_0x105a86(0x346)]['addPassiveStatesByPluginParameters'][_0x105a86(0x2b4)](this);const _0x1cf656=_0x15bf6c[_0x105a86(0x15a)][_0x105a86(0x11c)]['PassiveStates']['Enemy'];this[_0x105a86(0x14d)]['passiveStates']=this[_0x105a86(0x14d)]['passiveStates'][_0x105a86(0x2cd)](_0x1cf656);}else{const _0x17e01d=RegExp['$1'][_0x105a86(0x200)](',');for(const _0x5a1270 of _0x17e01d){const _0x29e05d=DataManager['getSkillIdWithName'](_0x5a1270);if(!_0x29e05d)continue;if(this[_0x105a86(0x28a)][_0x105a86(0x35c)](_0x29e05d))return![];}return!![];}}}return!![];},Window_SkillList[_0x3f4870(0x346)]['checkShowHideJS']=function(_0x1d4f1c){const _0x1cf704=_0x3f4870,_0x2e927d=_0x1d4f1c['note'],_0xfc216d=VisuMZ['SkillsStatesCore'][_0x1cf704(0x3b5)];return _0xfc216d[_0x1d4f1c['id']]?_0xfc216d[_0x1d4f1c['id']][_0x1cf704(0x2b4)](this,_0x1d4f1c):!![];},VisuMZ[_0x3f4870(0x15a)][_0x3f4870(0x301)]=Window_SkillList['prototype']['drawItem'],Window_SkillList[_0x3f4870(0x346)][_0x3f4870(0x22b)]=function(_0x2a5727){const _0x333fde=_0x3f4870,_0x3831c0=this[_0x333fde(0x271)](_0x2a5727),_0x16b206=_0x3831c0[_0x333fde(0x3a3)];if(_0x3831c0)this[_0x333fde(0x218)](_0x3831c0);VisuMZ[_0x333fde(0x15a)][_0x333fde(0x301)]['call'](this,_0x2a5727);if(_0x3831c0)_0x3831c0[_0x333fde(0x3a3)]=_0x16b206;},Window_SkillList[_0x3f4870(0x346)][_0x3f4870(0x218)]=function(_0x25b321){const _0x581123=_0x3f4870;if(_0x25b321&&_0x25b321[_0x581123(0x352)]['match'](/<LIST NAME:[ ](.*)>/i)){_0x25b321['name']=String(RegExp['$1'])[_0x581123(0x2e1)]();for(;;){if(_0x25b321[_0x581123(0x3a3)][_0x581123(0x144)](/\\V\[(\d+)\]/gi)){if(_0x581123(0x31f)===_0x581123(0x27b))for(const _0x2951e1 of _0x28858a){_0x2951e1[_0x581123(0x144)](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);const _0x54d2e2=_0x442321(_0x2b5f7a['$1'])[_0x581123(0x180)]()[_0x581123(0x2e1)]()['split'](',');for(const _0x462a8d of _0x54d2e2){_0x16b0de[_0x581123(0x1b5)][_0x581123(0x2d2)](_0x462a8d[_0x581123(0x2e1)]());}}else _0x25b321[_0x581123(0x3a3)]=_0x25b321['name'][_0x581123(0x3c5)](/\\V\[(\d+)\]/gi,(_0x29135b,_0x59e5ac)=>$gameVariables[_0x581123(0x2e8)](parseInt(_0x59e5ac)));}else{if('pgFuf'!=='pgFuf')_0x748f94[_0x581123(0x1f1)]=_0x22c3e3(_0x3d5955['$1']);else break;}}}},Window_SkillList[_0x3f4870(0x346)][_0x3f4870(0x2ba)]=function(_0x7f12a8,_0x3dc5a5,_0x12ff8e,_0x5eb617){const _0x58b42c=_0x3f4870;Window_Base['prototype'][_0x58b42c(0x2ba)][_0x58b42c(0x2b4)](this,this[_0x58b42c(0x28a)],_0x7f12a8,_0x3dc5a5,_0x12ff8e,_0x5eb617);},Window_SkillList[_0x3f4870(0x346)]['setStatusWindow']=function(_0x55c443){const _0x4ec97d=_0x3f4870;this[_0x4ec97d(0x1b9)]=_0x55c443,this[_0x4ec97d(0x1cb)]();},VisuMZ[_0x3f4870(0x15a)][_0x3f4870(0x357)]=Window_SkillList['prototype']['updateHelp'],Window_SkillList[_0x3f4870(0x346)][_0x3f4870(0x1e7)]=function(){const _0x299697=_0x3f4870;VisuMZ[_0x299697(0x15a)]['Window_SkillList_updateHelp'][_0x299697(0x2b4)](this);if(this['_statusWindow']&&this['_statusWindow'][_0x299697(0x35b)]===Window_ShopStatus){if(_0x299697(0x24f)!=='lFbge')this[_0x299697(0x1b9)][_0x299697(0x386)](this[_0x299697(0x211)]());else return this[_0x299697(0xef)]();}};