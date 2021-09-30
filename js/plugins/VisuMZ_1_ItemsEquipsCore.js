//=============================================================================
// VisuStella MZ - Items & Equips Core
// VisuMZ_1_ItemsEquipsCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_ItemsEquipsCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.ItemsEquipsCore = VisuMZ.ItemsEquipsCore || {};
VisuMZ.ItemsEquipsCore.version = 1.33;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.33] [ItemsEquipsCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Items_and_Equips_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Items & Equips Core makes improvements to the RPG Maker MZ item and
 * equipment dedicated scenes (including the shop) and how they're handled.
 * From more item categories, better parameter control, rulings, and more, game
 * devs are able to take control over key aspects of their game's items.
 *
 * Features include all (but not limited to) the following:
 *
 * * Modifying the appearances to the Item Scene, Equip Scene, and Shop Scene.
 * * Categorizing items in unique and multiple categories.
 * * Item Scene and Shop Scene will now display detailed information on items.
 * * NEW! marker can be displayed over recently acquired items in-game.
 * * Equipment notetags to adjust parameters past the editor limitations.
 * * Equipment Rulings to adjust what slot types can and can't be unequipped
 *   and/or optimized.
 * * Equipment Type Handling offers more control over equipment loadouts.
 * * Items sold in shops can be hidden/shown based on Switches.
 * * Items sold in shops can have varying prices adjusted by notetags.
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
 * Major Changes: New Hard-Coded Features
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 *
 * Equipment Type Handling
 *
 * - Characters will no longer have one universal equipment slot setting.
 * Classes can have different equipment type loadouts, made possible through
 * the usage of notetags. Also, equipment types of matching names would be
 * treated as the same type, where previously, they would be different types.
 * This means if you have two "Accessory" slots, be it in the form of notetags
 * or through the Database > Types tab, they can both equip the same type of
 * accessories.
 *
 * - The Change Equip event command is now updated to reflect this new change.
 * When processing an equip change, the slot changed will go to the first
 * empty slot of matching type. If all of the actor's matching slot types are
 * equipped, then the equip will replace the last slot available.
 *
 * ---
 *
 * Shop Status Window
 *
 * - The Status Window found in the Shop Scene was originally barren and did
 * not display much information at all. This is changed through this plugin's
 * new features. While the contents of the Shop Status Window can be customized
 * through the Plugin Parameters, it is a change that cannot be reversed and
 * for the better since it gives players the much needed information revolving
 * around the game's items.
 *
 * ---
 *
 * Core Engine Compatibility: Modern Controls
 *
 * - If the VisuStella Core Engine is added to your game with Modern Controls
 * enabled, then the Item Menu Scene, Equip Menu Scene, and Shop Menu Scene's
 * controls will be changed a bit.
 *
 * - The Item Menu Scene will automatically have the Item List Window active,
 * with using the Left/Right (for single column) or Page Up/Page Down (for
 * multi-columns) to navigate between the Item Categories. Similar will occur
 * when trying to sell items in the Shop Menu Scene.
 *
 * - The Equip Menu Scene will automatically have the Equip Slots Window active
 * and only activate the command window upon moving up to it.
 *
 * ---
 *
 * ============================================================================
 * VisuStella MZ Compatibility
 * ============================================================================
 *
 * While this plugin is compatible with the majority of the VisuStella MZ
 * plugin library, it is not compatible with specific plugins or specific
 * features. This section will highlight the main plugins/features that will
 * not be compatible with this plugin or put focus on how the make certain
 * features compatible.
 * 
 * ---
 * 
 * VisuMZ_1_BattleCore
 * 
 * Changing the "Damage Multiplier" or "Healing Multiplier" vocabulary for the
 * Item and Equip Core's Shop Status Window is not done with the Item and Equip
 * Core's Plugin Parameters if you have the Battle Core installed.
 * 
 * Instead, go to Battle Core's Plugin Parameters, Damage Settings, Damage
 * Styles, and adjust the style's version of the "Damage Multiplier" or
 * "Healing Multiplier" text instead.
 * 
 * Why does this work this way? Because not all damage styles work off
 * "Multipliers" so in order for it to convey the proper message to the player,
 * each damage style has its own vocabulary to be more accurate.
 * 
 * In case you forget about that, when you visit the Item and Equip Core's
 * plugin parameters for these, it should also remind you in the parameter's
 * description on where to change it.
 * 
 * ---
 *
 * VisuMZ_2_WeaponSwapSystem
 *
 * The custom equip slots feature from the VisuStella MZ Items and Equips Core
 * allowed you to add in extra weapon slots. This is now curated up to a max
 * of one weapon slot per character. This needs to be done to make the Weapon
 * Swap System viable.
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
 * === General ===
 * 
 * These notetags affect the Items, Weapons, and Armors on a general scale.
 *
 * ---
 *
 * <Max: x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Determines the maximum quantity that can be held for this item.
 * - Replace 'x' with a number value to determine the maximum amount.
 *
 * ---
 *
 * <Color: x>
 * <Color: #rrggbb>
 *
 * - Used for: Item, Weapon, Armor, Skill Notetags
 * - Determines the color of the object inside the in-game menus.
 * - Replace 'x' with a number value depicting a window text color.
 * - Replace 'rrggbb' with a hex color code for a more custom color.
 *
 * ---
 *
 * <Category: x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Arranges items into certain/multiple categories to work with the Category
 *   Plugin Parameter setting: "Category:x".
 * - Replace 'x' with a category name to mark this item as.
 *
 * ---
 *
 * <Categories>
 *  x
 *  x
 * </Categories>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Arranges items into certain/multiple categories to work with the Category
 *   Plugin Parameter setting: "Category:x".
 * - Replace each 'x' with a category name to mark this item as.
 *
 * ---
 *
 * === Item Accessibility Notetags ===
 *
 * The following notetags allow you to choose when items can/cannot be used
 * based on switches.
 *
 * ---
 *
 * <Enable Switch: x>
 *
 * <Enable All Switches: x,x,x>
 * <Enable Any Switches: x,x,x>
 *
 * - Used for: Item Notetags
 * - Determines the enabled status of the item based on switches.
 * - Replace 'x' with the switch ID to determine the item's enabled status.
 * - If 'All' notetag variant is used, item will be disabled until all
 *   switches are ON. Then, it would be enabled.
 * - If 'Any' notetag variant is used, item will be enabled if any of the
 *   switches are ON. Otherwise, it would be disabled.
 *
 * ---
 *
 * <Disable Switch: x>
 *
 * <Disable All Switches: x,x,x>
 * <Disable Any Switches: x,x,x>
 *
 * - Used for: Item Notetags
 * - Determines the enabled status of the item based on switches.
 * - Replace 'x' with the switch ID to determine the item's enabled status.
 * - If 'All' notetag variant is used, item will be enabled until all switches
 *   are ON. Then, it would be disabled.
 * - If 'Any' notetag variant is used, item will be disabled if any of the
 *   switches are ON. Otherwise, it would be enabled.
 *
 * ---
 *
 * === JavaScript Notetags: Item Accessibility ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * determine if an item can be accessible by code.
 *
 * ---
 *
 * <JS Item Enable>
 *  code
 *  code
 *  enabled = code;
 * </JS Item Enable>
 *
 * - Used for: Item Notetags
 * - Determines the enabled status of the item based on JavaScript code.
 * - If the actor this is disabled for is the only party member, it will not be
 *   visible in the item list unless the VisuStella Battle Core is installed.
 *   - If the VisuStella Battle Core is installed, then all battle scope items
 *     will be visible even if they're disabled.
 * - Replace 'code' to determine the type enabled status of the item.
 * - The 'enabled' variable returns a boolean (true/false) to determine if the
 *   item will be enabled or not.
 * - The 'user' variable refers to the user with the item.
 * - The 'item' variable refers to the item being checked.
 * - All other item conditions must be met in order for this to code to count.
 *
 * ---
 *
 * === Equipment Notetags ===
 *
 * The following notetags provide equipment-related effects from deciding what
 * equip slots can be given to classes to the base parameter changes asigned
 * to weapons and armors.
 *
 * ---
 *
 * <Equip Slots>
 *  slotName
 *  slotName
 *  slotName
 * </Equip Slots>
 *
 * - Used for: Class Notetags
 * - Changes the equipment slot loadout for any actor who is that class.
 * - Replace 'slotName' with an Equipment Type name from Database > Types.
 *   This is case-sensitive.
 * - Insert or remove as many "slotName" equipment types as needed.
 *
 * ---
 *
 * <param: +x>
 * <param: -x>
 *
 * - Used for: Weapon, Armor Notetags
 * - Changes the base parameter value for the equip item.
 * - Replace 'param' with any of the following: 'MaxHP', 'MaxMP', 'ATK', 'DEF',
 *   'MAT', 'MDF', 'AGI', or 'LUK' to change that specific parameter's value.
 *   - These notetags do NOT work with X Parameters, S Parameters, or any
 *     custom parameters. These notetags ONLY work with the base parameters.
 * - Replace 'x' with a number value to set the parameter value to.
 * - This allows you to bypass the Database Editor's number limitations.
 *
 * ---
 * 
 * <Equip Copy Limit: x>
 * 
 * - Used for: Weapon, Armor Notetags
 * - Sets a maximum number of copies that the actor can wear of this equipment.
 * - Replace 'x' with a number value to determine the copy limit.
 * - This can be bypassed using Event Commands and/or Script Calls.
 * - Usage Example: Actors can only equip one copy of the "One-of-a-Kind Ring"
 *   on at any time despite having empty accessory slots because the ring has a
 *   <Equip Copy Limit: 1> notetag.
 * 
 * ---
 * 
 * <Equip Weapon Type Limit: x>
 * 
 * - Used for: Weapon
 * - This weapon cannot be equipped with other weapons of the same type once
 *   the limited amount has been reached.
 * - Replace 'x' with a number value to determine the weapon type limit.
 * - This can be bypassed using Event Commands and/or Script Calls.
 * - Usage Example: A dualwielding warrior who can only equip one sword and a
 *   dagger but never two swords or two daggers because the swords and daggers
 *   all have the <Equip Weapon Type Limit: 1> notetags on them.
 * 
 * ---
 * 
 * <Equip Armor Type Limit: x>
 * 
 * - Used for: Armor
 * - This armor cannot be equipped with other armors of the same type once the
 *   limited amount has been reached.
 * - Replace 'x' with a number value to determine the armor type limit.
 * - This can be bypassed using Event Commands and/or Script Calls.
 * - Usage Example: People cannot equip more than two glove accessories on at a
 *   time because the glove is a "Glove" armor-type and each glove item has the
 *   <Equip Armor Type Limit: 2> notetags on them.
 * 
 * ---
 *
 * === JavaScript Notetags: Equipment ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * adjust the parameter through code.
 *
 * ---
 *
 * <JS Parameters>
 *  MaxHP = code;
 *  MaxMP = code;
 *  ATK = code;
 *  DEF = code;
 *  MAT = code;
 *  MDF = code;
 *  AGI = code;
 *  LUK = code;
 * </JS Parameters>
 *
 * - Used for: Weapon, Armor Notetags
 * - Uses JavaScript to determine the values for the basic parameters based on
 *   the code used to calculate its value.
 * - The variables 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI', and
 *   'LUK' are used to determine the finalized value of the parameter. This
 *   variable is case sensitive.
 * - If a parameter is not present, its value will be treated as +0.
 *
 * ---
 *
 * === Status Window Notetags ===
 *
 * The following notetags will affect the Shop Status Window info. If for any
 * reason the data that is displayed is not to your liking or insufficient,
 * you can change it up using the following notetags.
 *
 * ---
 *
 * <Status Info>
 *  key: data
 *  key: data
 *  key: data
 * </Status Info>
 *
 * - Used for: Skill, Item Notetags
 * - If you do not like the generated data that's displayed, you can change it
 *   using this notetag to display what you want.
 * - Replace 'key' with one of the following:
 *   - Consumable
 *   - Quantity
 *   - Occasion
 *   - Scope
 *   - Speed
 *   - Success Rate
 *   - Repeat
 *   - Hit Type
 *   - Element
 *   - Damage Multiplier
 *   - HP Recovery
 *   - MP Recovery
 *   - TP Recovery
 *   - HP Damage
 *   - MP Damage
 *   - TP Damage
 *   - User TP Gain
 *   - Added Effects
 *   - Removed Effects
 * - Replace 'data' with the text data you want to visually appear. You may use
 *   text codes for this.
 * - This only affects info entries that are already visible and won't make
 *   other categories suddenly appear.
 * - Insert or remove as many "key: data" lines as needed.
 *
 * ---
 *
 * <Custom Status Info>
 *  key: data
 *  key: data
 *  key: data
 * </Custom Status Info>
 *
 * - Used for: Skill, Item
 * - If you want custom categories and data to be displayed for your items that
 *   aren't provided by the Shop Status Window Info to begin with, you can use
 *   this notetag to add in your own entries.
 * - Replace 'key' with text of the exact label you want. You may use text
 *   codes for this.
 * - Replace 'data' with text of the exact text data you want. You may use text
 *   codes for this.
 * - Insert or remove as many "key: data" lines as needed.
 *
 * ---
 * 
 * <Shop Picture Name: filename>
 * 
 * - Used for: Skill, Item, Weapon, Armor Notetags
 * - Enables a shop picture for the status window. This image can be seen in
 *   the item scene, shop scene, and skill scene if enabled.
 * - If this notetag is not used, there will be no image.
 * - Replace 'filename' with the filename of the graphic to use from the game
 *   project's img/pictures/ folder. Filenames are case sensitive. Leave out
 *   the filename extension from the notetag.
 * - Use the supporting notetags to determine where the image appears. If not,
 *   they will default to the background, fit to the window dimensions,
 *   centered at the middle of the window.
 * 
 * ---
 * 
 * <Shop Picture Layer: Background>
 * <Shop Picture Layer: Foreground>
 * 
 * - Used for: Skill, Item, Weapon, Armor Notetags
 * - Determines which layer the graphic will be drawn on.
 * - If the background layer is selected, the picture will appear behind the
 *   data text.
 * - If the foreground layer is selected, the picture will appear in front of
 *   the data text.
 * - If this notetag is not used, it will default to the background layer.
 * 
 * ---
 * 
 * <Shop Picture Max Width: x>
 * <Shop Picture Max Height: y>
 * <Shop Picture Max Dimensions: x, y>
 * 
 * - Used for: Skill, Item, Weapon, Armor Notetags
 * - Determines the maximum width and/or height for the image.
 * - This means the image will be automatically scaled proportionally to that
 *   width or height as long as everything else does not break boundaries.
 * - Replace 'x' and 'y' with number values representing the maximum dimensions
 *   the image can be in pixels.
 * - If these notetags are not used, the image will be automatically scaled to
 *   the dimensions of the shop status window.
 * 
 * ---
 * 
 * <Shop Picture Alignment: Left>
 * <Shop Picture Alignment: Center>
 * <Shop Picture Alignment: Right>
 * 
 * - Used for: Skill, Item, Weapon, Armor Notetags
 * - Adjusts the horizontal alignment for the image.
 * - Left, center, right determines how it's aligned horizontally if the
 *   image does not horizontally fit in the width of the window.
 * - If any of these notetags are not used, the image will default to the
 *   'center' alignment.
 * 
 * ---
 * 
 * <Shop Picture Position: Top>
 * <Shop Picture Position: Middle>
 * <Shop Picture Position: Bottom>
 * 
 * - Used for: Skill, Item, Weapon, Armor Notetags
 * - Adjusts the vertical position for the image.
 * - Top, middle, bottom determines how it's positioned vertically if the
 *   image does not vertically fit in the width of the window.
 * - If any of these notetags are not used, the image will default to the
 *   'middle' position.
 * 
 * ---
 * 
 * <Shop Picture Offset X: +x>
 * <Shop Picture Offset X: -x>
 * 
 * <Shop Picture Offset Y: +y>
 * <Shop Picture Offset Y: -y>
 * 
 * <Shop Picture Offset: +x, +y>
 * <Shop Picture Offset: -y, -y>
 * 
 * - Used for: Skill, Item, Weapon, Armor Notetags
 * - Offsets the X and Y positions of the image in the shop status window.
 * - X offsets adjust the horizontal position by x pixels.
 *   - Positive goes right.
 *   - Negative goes left.
 * - Y offsets adjust the horizontal position by y pixels.
 *   - Positive goes down.
 *   - Negative goes up.
 * - Replace 'x' and 'y' with number values representing the pixels to offset
 *   the image by. The '+' and '-' signs are required.
 * - If none of these notetags are used, there will be no offsets.
 * 
 * ---
 * 
 * <Shop Picture Opacity: x>
 * <Shop Picture Opacity: x%>
 * 
 * - Used for: Skill, Item, Weapon, Armor Notetags
 * - Adjusts the opacity of the image used.
 * - When using 'x' and not 'x%', use a number between 0 and 255.
 *   - The closer to 0, the more transparent the image is.
 *   - The closer to 255, the more opaque the image is.
 * - When using 'x%' and not 'x', use a number between 0% and 100%.
 *   - The closer to 0%, the more transparent the image is.
 *   - The closer to 100%, the more opaque the image is.
 * 
 * ---
 *
 * === Shop Menu Notetags ===
 *
 * These notetags adjust how prices and such are managed inside the Shop Menu
 * as well as whether or not some items are visible depending on switch states.
 *
 * ---
 *
 * <Price: x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Adjusts the buying price for this item.
 * - Replace 'x' with a number depicting the desired value for the buy price.
 * - This allows you to bypass the RPG Maker MZ editor's limitation of 999,999.
 *
 * ---
 *
 * <Can Sell>
 * <Cannot Sell>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Makes the item either always sellable or cannot be sold.
 * - This bypasses the game's internal hard-coding to prevent items with a
 *   price of 0 from being able to be sold.
 * - This bypasses the game's internal hard-coding to always allow items with
 *   a price value of being able to be sold.
 *
 * ---
 *
 * <Sell Price: x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Changes the sell price to be something different than the default amount.
 * - Replace 'x' with a number depicting the desired value for the sell price.
 *
 * ---
 *
 * <Show Shop Switch: x>
 *
 * <Show Shop All Switches: x,x,x>
 * <Show Shop Any Switches: x,x,x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Determines the visibility of the shop item based on switches.
 * - Replace 'x' with the switch ID to determine the shop item's visibility.
 * - If 'All' notetag variant is used, item will be hidden until all switches
 *   are ON. Then, it would be shown.
 * - If 'Any' notetag variant is used, item will be shown if any of the
 *   switches are ON. Otherwise, it would be hidden.
 *
 * ---
 *
 * <Hide Shop Switch: x>
 *
 * <Hide Shop All Switches: x,x,x>
 * <Hide Shop Any Switches: x,x,x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Determines the visibility of the shop item based on switches.
 * - Replace 'x' with the switch ID to determine the shop item's visibility.
 * - If 'All' notetag variant is used, item will be shown until all switches
 *   are ON. Then, it would be hidden.
 * - If 'Any' notetag variant is used, item will be hidden if any of the
 *   switches are ON. Otherwise, it would be shown.
 *
 * ---
 *
 * <Cannot Sell Switch: x>
 *
 * <Cannot Sell All Switches: x,x,x>
 * <Cannot Sell Any Switches: x,x,x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Determines the sellability of the shop item based on switches.
 * - Replace 'x' with the switch ID to determine the shop item's sellability.
 * - If 'All' notetag variant is used, item cannot be sold until all switches
 *   are ON. Otherwise, it can be sold.
 * - If 'Any' notetag variant is used, item cannot be sold if any of the
 *   switches are ON. Otherwise, it can be sold.
 *
 * ---
 *
 * === JavaScript Notetags: Shop Menu ===
 *
 * The following are notetags made for users with JavaScript knowledge. These
 * notetags are primarily aimed at Buy and Sell prices.
 *
 * ---
 *
 * <JS Buy Price>
 *  code
 *  code
 *  price = code;
 * </JS Buy Price>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Replace 'code' to determine the buying 'price' of the item.
 * - Insert the final buy price into the 'price' variable.
 * - The 'item' variable refers to the item being bought.
 *
 * ---
 *
 * <JS Sell Price>
 *  code
 *  code
 *  price = code;
 * </JS Sell Price>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Replace 'code' to determine the selling 'price' of the item.
 * - Insert the final sell price into the 'price' variable.
 * - The 'item' variable refers to the item being sold.
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
 * Actor: Change Equip Slots
 * - Forcefully change the actor(s) equip slots.
 * - These will persist through class changes.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Equip Slots:
 *   - Insert the equip slots you want the actor(s) to have.
 *   - These entries are case-sensitive.
 *
 * ---
 *
 * Actor: Reset Equip Slots
 * - Reset any forced equip slots for the actor(s).
 * - Equip slots will then be based on class.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 * ---
 * 
 * === Shop Plugin Commands ===
 * 
 * ---
 *
 * Shop: Advanced
 * - Make it easier to put together inventories for a shop.
 * - WARNING: Does not allow for event-specific prices.
 *
 *   Step 1: Item ID's
 *   - Select which Item ID ranges to add.
 *
 *   Step 2: Weapon ID's
 *   - Select which Weapon ID ranges to add.
 *
 *   Step 3: Armor ID's
 *   - Select which Armor ID ranges to add.
 *
 *   Step 4: Purchase Only?
 *   - Make the shop purchase-only?
 * 
 *   Optional:
 * 
 *     Blacklist
 *     - A list of categories to blacklist from the shop.
 *     - Not used if empty. Mark categories with <Category: x>
 * 
 *     Whitelist
 *     - A list of categories to whitelist for the shop.
 *     - Not used if empty. Mark categories with <Category: x>
 *
 * This Plugin Command primarily functions as an alternative to the editor's
 * "Shop Processing" event command as that one requires you to add items one at
 * a time, making it extremely tedious to add large amounts of items. This
 * Plugin Command will mitigate that by allowing ID ranges to determine which
 * items to make available.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Item Menu Settings
 * ============================================================================
 *
 * The Item Menu Settings allow you to adjust specifics on how key objects and
 * windows in the Item Menu Scene operate.
 *
 * ---
 *
 * General Window
 *
 *   Use Updated Layout:
 *   - Use the Updated Item Menu Layout provided by this plugin?
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
 * List Window
 * 
 *   Columns:
 *   - Number of maximum columns.
 *   - If you are using the VisuStella MZ Core Engine and the "Modern Controls"
 *     Plugin Parameter, please read through that section in case you have any
 *     questions about how to switch between categories when using multiple
 *     columns of items at a time.
 *
 * ---
 *
 * Item Quantity
 *
 *   Item Max:
 *   Weapon Max:
 *   Armor Max:
 *   - The default maximum quantity for items, weapons, and/or armors.
 * 
 *   Quantity Format:
 *   - How to display an item's quantity.
 *   - %1 - Item Quantity
 *
 *   Font Size:
 *   - Default font size for item quantity.
 *
 * ---
 *
 * Shop Status Window
 * 
 *   Show in Item Menu?:
 *   - Show the Shop Status Window in the Item Menu?
 *   - This is enabled if the Updated Layout is on.
 *
 *   Adjust List Window?:
 *   - Automatically adjust the Item List Window in the Item Menu if using the
 *     Shop Status Window?
 * 
 *   Background Type:
 *   - Select background type for this window.
 *     - 0 - Window
 *     - 1 - Dim
 *     - 2 - Transparent
 *
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this Status Window in the
 *     Item Menu.
 *
 * ---
 *
 * Button Assist Window
 *
 *   Switch Category:
 *   - Button assist text used for switching categories.
 *   - For VisuStella MZ's Core Engine's Button Assist Window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Item Categories
 * ============================================================================
 *
 * Item Categories appear both in the Item Menu Scene and Shop Menu Scene (but
 * only under the Sell command). These Plugin Parameters give you the ability
 * to add in the specific categories you want displayed, remove the ones you
 * don't, and associate them with icons.
 *
 * ---
 *
 * List
 *
 *   Category List
 *   - A list of the item categories displayed in the Item/Shop menus.
 * 
 *     Type:
 *     - A list of the item categories displayed in the Item/Shop menus.
 *     - Replace x with ID numbers or text.
 *     - AllItems, RegularItems, KeyItems
 *     - HiddenItemA, HiddenItemB
 *     - Consumable, Nonconsumable
 *     - AlwaysUsable, BattleUsable, FieldUsable, NeverUsable
 *     - AllWeapons, WType:x
 *     - AllArmors, AType:x, EType:x
 *     - Category:x
 * 
 *     Icon:
 *     - Icon used for this category.
 *     - Use 0 for no icon.
 * 
 *     Visibility Switch:
 *     - This Switch must be turned ON in order for the category to show.
 *     - Use 0 for no Switch requirement.
 *
 *   Style:
 *   - How do you wish to draw categorie entries in the Category Window?
 *   - Text Only: Display only the text.
 *   - Icon Only: Display only the icon.
 *   - Icon + Text: Display the icon first, then the text.
 *   - Auto: Determine which is better to use based on the size of the cell.
 *
 *   Text Alignment
 *   - Decide how you want the text to be aligned.
 *
 * ---
 *
 * Vocabulary
 *
 *   Hidden Item A
 *   Hidden Item B
 *   Consumable
 *   Nonconsumable
 *   Always Usable
 *   Battle Usable
 *   Field Usable
 *   Never Usable
 *   - How these categories are named in the Item Menu.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: NEW! Labels
 * ============================================================================
 *
 * Whenever the player receives a new item(s), a NEW! Label can be placed on
 * top of the item's icon when browsing a menu displaying the item(s). This is
 * a quality of life addition from more modern RPG's to help players figure out
 * what they've recently received. The following are Plugin Parameters made to
 * adjust how the NEW! Labels are handled in-game.
 *
 * ---
 *
 * NEW! Labels
 * 
 *   Use NEW! Labels?:
 *   - Use the NEW! Labels or not?
 * 
 *   Icon:
 *   - The icon index used to represent the NEW! text.
 *   - Use 0 to not draw any icons.
 * 
 *   Text:
 *   - The text written on the NEW! Label.
 * 
 *     Font Color:
 *     - Use #rrggbb for custom colors or regular numbers for text colors from
 *       the Window Skin.
 * 
 *     Font Size:
 *     - The font size used for the NEW! text.
 * 
 *   Fade Limit:
 *   - What's the upper opaque limit before reversing?
 * 
 *   Fade Speed:
 *   - What's the fade speed of the NEW! Label?
 * 
 *   Offset X:
 *   - How much to offset the NEW! Label's X position by.
 * 
 *   Offset Y:
 *   - How much to offset the NEW! Label's Y position by.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Equip Menu Settings
 * ============================================================================
 *
 * These Plugin Parameters adjust the Equipment Menu Scene, ranging from using
 * a more updated and modern layout, changing the styles of other windows, and
 * other key visual aspects of the Equip Menu Scene. Other settings here allow
 * you to adjust how equipment operate under certain rulings, too.
 *
 * ---
 *
 * General
 * 
 *   Use Updated Layout:
 *   - Use the Updated Equip Layout provided by this plugin?
 *   - This will override the Core Engine windows settings.
 * 
 *     Param Font Size:
 *     - The font size used for parameter values.
 * 
 *     Show Menu Portraits?:
 *     - If Main Menu Core is installed, display the Menu Portraits instead of
 *       the actor's face in the status window?
 * 
 *     JS: Portrait Upper:
 *     - If Menu Portraits are available, this is code used to draw the upper
 *       data like this in the Status Window.
 * 
 *     JS: Face Upper:
 *     - If faces used used, this is code used to draw the upper data like this
 *       in the Status Window.
 * 
 *     JS: Parameter Lower:
 *     - Code to determine how parameters are drawn in the Status Window.
 *
 *   Layout Style:
 *   - If using an updated layout, how do you want to style the menu scene?
 *     - Upper Help, Left Input
 *     - Upper Help, Right Input
 *     - Lower Help, Left Input
 *     - Lower Help, Right Input
 * 
 *   Status Window Width:
 *   - The usual width of the status window if using the non-Updated Equip
 *     Menu Layout.
 * 
 *   Show Back Rectangles?:
 *   - Show back rectangles of darker colors to display information better?
 * 
 *     Back Rectangle Color:
 *     - Use #rrggbb for custom colors or regular numbers for text colors
 *       from the Window Skin.
 *
 * ---
 *
 * Command Window
 * 
 *   Style:
 *   - How do you wish to draw commands in the Command Window?
 *   - Text Only: Display only the text.
 *   - Icon Only: Display only the icon.
 *   - Icon + Text: Display the icon first, then the text.
 *   - Auto: Determine which is better to use based on the size of the cell.
 * 
 *   Text Align:
 *   - Text alignment for the Command Window.
 * 
 *   Equip Icon:
 *   - The icon used for the Equip command.
 * 
 *   Add Optimize Command?:
 *   - Add the "Optimize" command to the Command Window?
 * 
 *     Optimize Icon:
 *     - The icon used for the Optimize command.
 * 
 *   Add Clear Command?:
 *   - Add the "Clear" command to the Command Window?
 * 
 *     Clear Icon:
 *     - The icon used for the Clear command.
 *
 * ---
 *
 * Remove Equip
 * 
 *   Icon:
 *   - Icon used for equipment removal.
 * 
 *   Text:
 *   - Text used for equipment removal.
 * 
 *   Use SHIFT Shortcut?:
 *   - Add the "Shift" button as a shortcut key to removing items?
 *
 * ---
 *
 * Rulings
 * 
 *   Equip-Adjust HP/MP:
 *   - Adjust HP/MP differences after changing equips with MaxHP/MaxMP values.
 * 
 *   Non-Removable Types:
 *   - Insert ID's of the Equipment Types that must always have an item
 *     equipped and cannot be empty.
 * 
 *   Non-Optimized Types:
 *   - Insert ID's of the Equipment Types that will be ignored when equipment
 *     is being optimized.
 *
 * ---
 *
 * Button Assist Window
 *
 *   SHIFT: Remove:
 *   - Button assist text used for the SHIFT Remove Shortcut.
 *   - For VisuStella MZ's Core Engine's Button Assist Window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Shop Menu Settings
 * ============================================================================
 *
 * These Plugin Parameters allow you a number of options to adjust the Shop
 * Menu Scene. These options range from enabling an updated and modern layout,
 * adjust how various key visual aspects appear, and determine how prices can
 * be affected when it comes to selling them or buying them (for coders).
 *
 * ---
 *
 * General
 * 
 *   Use Updated Layout:
 *   - Use the Updated Shop Layout provided by this plugin?
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
 * Switches:
 * 
 *   Switch: Buy:
 *   - Buying items in the Shop Scene turns this Switch to ON.
 *   - Switch reverts to OFF whenever the Shop Scene opens.
 * 
 *   Switch: Sell
 *   - Selling items in the Shop Scene turns this Switch to ON.
 *   - Switch reverts to OFF whenever the Shop Scene opens.
 * 
 * ---
 *
 * Command Window
 * 
 *   Hide Unavailable?:
 *   - Hide all unavailable commands like when a shop is set to Purchase Only?
 * 
 *   Style:
 *   - How do you wish to draw commands in the Command Window?
 *   - Text Only: Display only the text.
 *   - Icon Only: Display only the icon.
 *   - Icon + Text: Display the icon first, then the text.
 *   - Auto: Determine which is better to use based on the size of the cell.
 * 
 *   Text Align:
 *   - Text alignment for the Command Window.
 * 
 *   Buy Icon:
 *   - The icon used for the Buy command.
 * 
 *   Sell Icon:
 *   - The icon used for the Sell command.
 * 
 *   Cancel Icon:
 *   - The icon used for the Cancel command.
 * 
 *   Rename "Cancel":
 *   - Rename Cancel to something more logical for the Shop Menu Scene.
 *
 * ---
 *
 * Prices
 * 
 *   Sell Price Rate:
 *   - The default sell price rate.
 * 
 *   JS: Buy Price:
 *   - Modificatons made to the buy price before finalizing it.
 * 
 *   JS: Sell Price:
 *   - Modificatons made to the sell price before finalizing it.
 *
 * ---
 *
 * Button Assist Window
 *
 *   Small Increment:
 *   Large Increment:
 *   - Text used for changing amount bought/sold.
 *   - For VisuStella MZ's Core Engine's Button Assist Window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Shop Status Window
 * ============================================================================
 *
 * These Plugin Parameters focuses on the Shop Status Window and determines how
 * its data is displayed.
 *
 * ---
 *
 * General
 * 
 *   Window Width:
 *   - The usual width of the status window.
 * 
 *   Parameter Font Size:
 *   - Font size used for parameter changes.
 * 
 *   Translucent Opacity:
 *   - Opacity setting used for translucent window objects.
 * 
 *   Show Back Rectangles?:
 *   - Show back rectangles of darker colors to display information better?
 * 
 *     Back Rectangle Color:
 *     - Use #rrggbb for custom colors or regular numbers for text colors
 *       from the Window Skin.
 *
 * ---
 *
 * Equipment Data
 * 
 *   Already Equipped:
 *   - Marker used to show an actor cannot equip an item.
 * 
 *   Can't Equip:
 *   - Marker used to show an actor cannot equip an item.
 * 
 *   No Changes:
 *   - Marker used to show no changes have occurred.
 * 
 *   JS: Draw Equip Data:
 *   - Code used to draw the equipment data for the Shop Status Window.
 *
 * ---
 *
 * Item Data
 * 
 *   Max State/Buff Icons:
 *   - Maximum number of icons that can be displayed for Add/Remove
 *     States/Buffs.
 * 
 *   Multiplier Standard:
 *   - Constant standard to filter out random values when calculating the
 *     damage multiplier.
 * 
 *   JS: Draw Item Data:
 *   - Code used to draw the item data for the Shop Status Window.
 *
 * ---
 *
 * Vocabulary
 * 
 *   Consumable:
 *   Occasions:
 *   Scope:
 *   Speed:
 *   Success Rate:
 *   Repeats:
 *   Hit Type:
 *   Element:
 *   Damage Type:
 *   Effects:
 *   - Vocabulary used for these data entries.
 *   - Some of these have Plugin Parameters have sub-entries.
 * 
 *   NOTE: Regarding Damage Labels
 * 
 *   If Visu_1_BattleCore is installed, priority goes to its Damage Style
 *   settings. The label displayed is based on the damage style settings in
 *   place for that specific skill or item.
 * 
 *   Go to Battle Core > Plugin Parameters > Damage Settings > Style List >
 *   pick the damage style you want to edit > Damage Label and change the
 *   text settings you'd like there.
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
 * Version 1.33: August 6, 2021
 * * Documentation Update!
 * ** Removed "Weapon" and "Armor" from "Used For" for <Status Info>. This was
 *    an unintended piece of documentation.
 * 
 * Version 1.32: July 23, 2021
 * * Bug Fixes!
 * ** Fixed a bug that would cause armor duplication when changing to classes
 *    with unaligned equipment slot types. Fix made by Arisu.
 * 
 * Version 1.31: July 9, 2021
 * * Feature Update!
 * ** Added a failsafe for price manipulation JavaScript to never have prices
 *    drop below 0 if possible. Update made by Arisu.
 * 
 * Version 1.30: July 2, 2021
 * * Documentation Update!
 * ** Added an extra note to the help file for the following:
 *    Plugin Parameters > Item Menu Settings > List Window > Columns
 * *** If you are using the VisuStella MZ Core Engine and the "Modern Controls"
 *     Plugin Parameter, please read through that section in case you have any
 *     questions about how to switch between categories when using multiple
 *     columns of items at a time.
 *    
 * 
 * Version 1.29: June 25, 2021
 * * Compatibility Update
 * ** Compatibility update with RPG Maker MZ 1.3.0+.
 * * Feature Update!
 * ** Phantom data when changing equipment types in the database should no
 *    longer affect actors with cached equip ID's. Update made by Arisu.
 * 
 * Version 1.28: June 4, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.27: May 21, 2021
 * * Bug Fixes!
 * ** Using the mouse right click in the Equip Scene while inside of the item
 *    to slot window will no longer exit the Equip Scene. Fix made by Yanfly.
 * 
 * Version 1.26: April 30, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** "VisuStella MZ Compatibility" added VisuMZ_1_BattleCore section regarding
 *    Damage Multiplier and Healing Multiplier vocabulary settings to reduce
 *    commonly asked questions.
 * * New Features!
 * ** New notetags added by Irina and sponsored by Archeia:
 * *** <Shop Picture Name: filename>
 * *** <Shop Picture Layer: x>
 * *** <Shop Picture Max Width: x>
 * *** <Shop Picture Max Height: y>
 * *** <Shop Picture Max Dimensions: x, y>
 * *** <Shop Picture Alignment: x>
 * *** <Shop Picture Position: y>
 * *** <Shop Picture Offset X: +x>
 * *** <Shop Picture Offset X: -x>
 * *** <Shop Picture Offset Y: +y>
 * *** <Shop Picture Offset Y: -y>
 * *** <Shop Picture Offset: +x, +y>
 * *** <Shop Picture Offset: -x, -y>
 * *** <Shop Picture Opacity: x>
 * *** <Shop Picture Opacity: x%>
 * **** Add images from the game project's img/pictures/ folder to display in
 *      the Shop Status Window.
 * 
 * Version 1.25: April 23, 2021
 * * Documentation Update!
 * ** Added clarity to the <param: +x> and <param: -x> notetags:
 * *** These notetags do NOT work with X Parameters, S Parameters, or any
 *     custom parameters. These notetags ONLY work with the base parameters.
 * 
 * Version 1.24: April 16, 2021
 * * Bug Fixes!
 * ** Changing an actor's equipment slots to past their original amount will no
 *    longer yield errors with duplicate slot types. Fix made by Arisu.
 * ** Completely selling an item should now refresh the help window to the new
 *    selected item's help description. Fix made by Arisu.
 * * Optimization Update!
 * ** Non-removable equipment restrictions for the equipment scene are now
 *    better optimized. Update made by Olivia.
 * 
 * Version 1.23: April 2, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.22: March 26, 2021
 * * Documentation Update!
 * ** Added "VisuStella MZ Compatibility" section for detailed compatibility
 *    explanations with the VisuMZ_4_BreakShields plugin.
 * 
 * Version 1.21: March 5, 2021
 * * Feature Update!
 * ** Custom equipment slots are disabled during Battle Testing for better
 *    accuracy and results.
 * 
 * Version 1.20: February 26, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Irina and sponsored by AndyL:
 * *** Plugin Parameters > Shop Menu Settings > Switches > Switch: Buy
 * *** Plugin Parameters > Shop Menu Settings > Switches > Switch: Sell
 * **** Buying/selling items in the Shop Scene turns this Switch to ON.
 * **** Switch reverts to OFF whenever the Shop Scene opens.
 * **** These switches can be used after a "Shop Processing" event command to
 *      determine if the player has bought an item, bought and sold an item,
 *      sold an item, or neither.
 * 
 * Version 1.19: January 29, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetags added by Irina.
 * *** <Equip Copy Limit: x>
 * **** Sets a maximum number of copies that the actor can wear of this
 *      equipment. Usage Example: Actors can only equip one copy of the
 *      "One-of-a-Kind Ring" on at any time despite having empty accessory
 *      slots because the ring has a <Equip Copy Limit: 1> notetag.
 * *** <Equip Weapon Type Limit: x>
 * **** This weapon cannot be equipped with other weapons of the same type once
 *      the limited amount has been reached. Usage Example: A dualwielding
 *      warrior who can only equip one sword and a dagger but never two swords
 *      or two daggers because the swords and daggers all have the
 *      <Equip Weapon Type Limit: 1> notetags on them.
 * *** <Equip Armor Type Limit: x>
 * **** This armor cannot be equipped with other armors of the same type once
 *      the limited amount has been reached. Usage Example: People cannot equip
 *      more than two glove accessories on at a time because the glove is a
 *      "Glove" armor-type and each glove item has the
 *      <Equip Armor Type Limit: 2> notetags on them.
 * 
 * Version 1.18: January 15, 2021
 * * Bug Fixes!
 * ** Pressing "Shift" to remove equipment will now refresh the status window
 *    unlike before. Fix made by Olivia.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Parameters added
 * *** Plugin Parameters > Item Menu Settings > Background Type
 * 
 * Version 1.17: January 1, 2021
 * * Bug Fixes!
 * ** Equipping should be working properly again. Fix made by Yanfly.
 * 
 * Version 1.16: December 25, 2020
 * * Bug Fixes!
 * ** Equip-Adjust HP/MP should work properly now. Fix made by Yanfly.
 * * Documentation Update!
 * ** Added more clarity for <JS Item Enable> to state that if the VisuStella
 *    Battle Core is installed, then all battle scope items are visible, but
 *    not necessarily enabled if they are disabled otherwise.
 * 
 * Version 1.15: December 18, 2020
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Unusable items on an individual-actor basis will no
 *    longer be overwritten by party-based usability for battle. Fix by Yanfly.
 * * Documentation Update!
 * ** Added more clarity for <JS Item Enable> to state that it removes the
 *    usable item from visibility as well if the actor unable to use it is the
 *    only person in the party.
 * 
 * Version 1.14: December 11, 2020
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.13: December 4, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New Plugin Commands added by Arisu!
 * *** Actor: Change Equip Slots
 * *** Actor: Reset Equip Slots
 * **** These plugin commands allow you to forcefully change the equip slots
 *      available to an actor regardless of the slots provided by its class as
 *      well as reset them.
 * 
 * Version 1.12: November 15, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.11: November 8, 2020
 * * Bug Fix!
 * ** Font size ratio for the shop status window now scales to a hard coded
 *    value to prevent smaller font sizes from expanding icon sizes. Fix made
 *    by Arisu.
 * * Feature Update!
 * ** Currency display in the shop menu is now reflected upon how the plugin
 *    parameters set them to display. Update made by Arisu.
 * 
 * Version 1.10: November 1, 2020
 * * Feature Update!
 * ** Modern Controls compatibility with Core Engine no longer enables the
 *    Item Categories window and child classes to utilize the Home/End keys.
 * 
 * Version 1.09: October 25, 2020
 * * Bug Fixes!
 * ** "All Items" category should now display the "Items" text. Fix by Irina.
 * ** WType, AType, and EType categories now work with text. Fix by Irina.
 *
 * Version 1.08: October 18, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.07: October 11, 2020
 * * Bug Fixes!
 * ** XParams and SParams in the Window_EquipStatus window will no longer show
 *    a non-percentile difference if the original value is not a whole value.
 *    Fix made by Yanfly.
 * 
 * Version 1.06: October 4, 2020
 * * Bug Fixes!
 * ** Select Item event command now displays the default amount of columns
 *    instead of whatever setting is made with the plugin parameters.
 * 
 * Version 1.05: September 27, 2020
 * * Bug Fixes!
 * ** When using the updated shop layout, leaving the sell option will no
 *    longer cause the dummy window to appear.
 * * Documentation Update
 * ** "Use Updated Layout" plugin parameters now have the added clause:
 *    "This will override the Core Engine windows settings." to reduce
 *    confusion. Added by Irina.
 * 
 * Version 1.04: September 13, 2020
 * * Bug Fixes!
 * ** Pressing Shift to quickly remove equipment should no longer crash the
 *    game. This will also clear the help window text. Fix made by Arisu.
 * 
 * Version 1.03: September 6, 2020
 * * Bug Fixes!
 * ** If both Optimize and Clear commands have been removed and using modern
 *    controls, pressing up at the top of the slot window list will not go to
 *    the window. Fix made by Yanfly.
 * ** If both Optimize and Clear commands have been removed, the window will no
 *    longer appear and the slot window will be moved upward to fill any empty
 *    spaces. Fix made by Yanfly.
 * * New Features!
 * ** New Plugin Parameter added in NEW! Label to let you adjust the font face.
 * ** New Plugin Parameters added in Equip Menu Scene Settings for disabling
 *    the back rectangles and/or changing their colors.
 * ** New Plugin Parameters added in Shop Status Window Settings for disabling
 *    the back rectangles and/or changing their colors.
 * 
 * Version 1.02: August 30, 2020
 * * Documentation Fix!
 * ** Added: NOTE: Regarding Damage Labels
 * *** If Visu_1_BattleCore is installed, priority goes to its Damage Style
 *   settings. The label displayed is based on the damage style settings in
 *   place for that specific skill or item.
 * *** Go to Battle Core > Plugin Parameters > Damage Settings > Style List >
 *   pick the damage style you want to edit > Damage Label and change the
 *   text settings you'd like there.
 * *** Documentation update added by Yanfly.
 * 
 * Version 1.01: August 23, 2020
 * * Added failsafe to prevent non-existent equipment (because the database
 *   entries have been deleted) from being equipped as initial equipment.
 *   Fix made by Olivia.
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
 * @command ActorChangeEquipSlots
 * @text Actor: Change Equip Slots
 * @desc Forcefully change the actor(s) equip slots.
 * These will persist through class changes.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 * 
 * @arg Slots:arraystr
 * @text Equip Slots
 * @type string[]
 * @desc Insert the equip slots you want the actor(s) to have.
 * These entries are case-sensitive.
 * @default ["Weapon","Shield","Head","Body","Accessory"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorResetEquipSlots
 * @text Actor: Reset Equip Slots
 * @desc Reset any forced equip slots for the actor(s).
 * Equip slots will then be based on class.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command BatchShop
 * @text Shop: Advanced
 * @desc Make it easier to put together inventories for a shop.
 * WARNING: Does not allow for event-specific prices.
 *
 * @arg Step1
 * @text Step 1: Item ID's
 *
 * @arg Step1Start:num
 * @text Range Start
 * @parent Step1
 * @type item
 * @desc Select which Item ID to start from.
 * @default 1
 *
 * @arg Step1End:num
 * @text Range End
 * @parent Step1
 * @type item
 * @desc Select which Item ID to end at.
 * @default 4
 *
 * @arg Step2
 * @text Step 2: Weapon ID's
 *
 * @arg Step2Start:num
 * @text Range Start
 * @parent Step2
 * @type weapon
 * @desc Select which Weapon ID to start from.
 * @default 1
 *
 * @arg Step2End:num
 * @text Range End
 * @parent Step2
 * @type weapon
 * @desc Select which Weapon ID to end at.
 * @default 4
 *
 * @arg Step3
 * @text Step 3: Armor ID's
 *
 * @arg Step3Start:num
 * @text Range Start
 * @parent Step3
 * @type armor
 * @desc Select which Armor ID to start from.
 * @default 1
 *
 * @arg Step3End:num
 * @text Range End
 * @parent Step3
 * @type armor
 * @desc Select which Armor ID to end at.
 * @default 4
 *
 * @arg PurchaseOnly:eval
 * @text Step 4: Purchase Only?
 * @type boolean
 * @on Purchase-Only
 * @off Sell Accessible
 * @desc Make the shop purchase-only?
 * @default false
 * 
 * @arg Optional
 * 
 * @arg Blacklist:arraystr
 * @text Blacklisted Categories
 * @parent Optional
 * @type string[]
 * @desc A list of categories to blacklist from the shop.
 * Not used if empty. Mark categories with <Category: x>
 * @default []
 * 
 * @arg Whitelist:arraystr
 * @text Whitelisted Categories
 * @parent Optional
 * @type string[]
 * @desc A list of categories to whitelist for the shop.
 * Not used if empty. Mark categories with <Category: x>
 * @default []
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
 * @param ItemsEquipsCore
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param ItemScene:struct
 * @text Item Menu Settings
 * @type struct<ItemScene>
 * @desc Change the Item Menu Scene settings.
 * @default {"General":"","EnableLayout:eval":"true","LayoutStyle:str":"upper/left","ListWindow":"","ListWindowCols:num":"1","ItemQt":"","MaxItems:num":"99","MaxWeapons:num":"99","MaxArmors:num":"99","ItemQuantityFmt:str":"×%1","ItemQuantityFontSize:num":"22","ShopStatusWindow":"","ShowShopStatus:eval":"true","ItemSceneAdjustItemList:eval":"true","ItemMenuStatusRect:func":"\"const width = this.statusWidth();\\nconst height = this._itemWindow.height;\\nconst x = Graphics.boxWidth - width;\\nconst y = this._itemWindow.y;\\nreturn new Rectangle(x, y, width, height);\"","ButtonAssist":"","buttonAssistCategory:str":"Switch Category"}
 *
 * @param Categories:struct
 * @text Item Categories
 * @parent ItemScene:struct
 * @type struct<Categories>
 * @desc Change the categories displayed in the Item/Shop menus.
 * @default {"MainList":"","List:arraystruct":"[\"{\\\"Type:str\\\":\\\"FieldUsable\\\",\\\"Icon:num\\\":\\\"208\\\"}\",\"{\\\"Type:str\\\":\\\"BattleUsable\\\",\\\"Icon:num\\\":\\\"218\\\"}\",\"{\\\"Type:str\\\":\\\"NeverUsable\\\",\\\"Icon:num\\\":\\\"302\\\"}\",\"{\\\"Type:str\\\":\\\"AllWeapons\\\",\\\"Icon:num\\\":\\\"97\\\"}\",\"{\\\"Type:str\\\":\\\"EType:2\\\",\\\"Icon:num\\\":\\\"128\\\"}\",\"{\\\"Type:str\\\":\\\"EType:3\\\",\\\"Icon:num\\\":\\\"131\\\"}\",\"{\\\"Type:str\\\":\\\"EType:4\\\",\\\"Icon:num\\\":\\\"137\\\"}\",\"{\\\"Type:str\\\":\\\"EType:5\\\",\\\"Icon:num\\\":\\\"145\\\"}\",\"{\\\"Type:str\\\":\\\"KeyItems\\\",\\\"Icon:num\\\":\\\"195\\\"}\"]","Style:str":"icon","TextAlign:str":"center","Vocabulary":"","HiddenItemA:str":"Special Items","HiddenItemB:str":"Unique Items","Consumable:str":"Consumable","Nonconsumable:str":"Nonconsumable","AlwaysUsable:str":"Usable","BattleUsable:str":"Battle","FieldUsable:str":"Field","NeverUsable:str":"Materials"}
 *
 * @param New:struct
 * @text NEW! Labels
 * @parent ItemScene:struct
 * @type struct<NewLabel>
 * @desc Change how NEW! Labels apply to your game project.
 * @default {"Enable:eval":"true","Icon:num":"0","Text:str":"NEW!","FontColor:str":"17","FontFace:str":"Verdana","FontSize:str":"16","FadeLimit:num":"360","FadeSpeed:num":"4","OffsetX:num":"0","OffsetY:num":"4"}
 *
 * @param EquipScene:struct
 * @text Equip Menu Settings
 * @type struct<EquipScene>
 * @desc Adjust the settings regarding the Equip Menu Scene.
 * @default {"General":"","EnableLayout:eval":"true","ParamValueFontSize:num":"22","MenuPortraits:eval":"true","DrawPortraitJS:func":"\"// Declare Variables\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\nconst x1 = padding;\\nconst x2 = this.innerWidth - 128 - padding;\\n\\n// Draw Menu Image\\nthis.drawItemActorMenuImage(this._actor, 0, 0, this.innerWidth, this.innerHeight);\\n\\n// Draw Data\\nthis.drawActorName(this._actor, x1, lineHeight * 0);\\nthis.drawActorClass(this._actor, x1, lineHeight * 1);\\nthis.drawActorIcons(this._actor, x1, lineHeight * 2);\\nthis.drawActorLevel(this._actor, x2, lineHeight * 0);\\nthis.placeBasicGauges(this._actor, x2, lineHeight * 1);\"","DrawFaceJS:func":"\"// Declare Variables\\nconst lineHeight = this.lineHeight();\\nconst gaugeLineHeight = this.gaugeLineHeight();\\nconst x = Math.floor(this.innerWidth / 2);\\nconst limitHeight = this.innerHeight - (this.actorParams().length * lineHeight);\\nconst actorX = Math.floor((x - ImageManager.faceWidth) / 2);\\nconst actorY = Math.floor((limitHeight - ImageManager.faceHeight) / 2);\\nlet dataHeight = lineHeight * 3;\\ndataHeight += gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2);\\nconst dataY = Math.floor((limitHeight - dataHeight) / 2);\\n\\n// Draw Data\\nthis.drawActorFace(this._actor, actorX, actorY, ImageManager.faceWidth, ImageManager.faceHeight);\\nthis.drawActorIcons(this._actor, actorX + 16, actorY + ImageManager.faceHeight - lineHeight);\\nthis.drawActorName(this._actor, x, dataY + lineHeight * 0);\\nthis.drawActorLevel(this._actor, x, dataY + lineHeight * 1);\\nthis.drawActorClass(this._actor, x, dataY + lineHeight * 2);\\nthis.placeBasicGauges(this._actor, x, dataY + lineHeight * 3);\"","DrawParamJS:func":"\"// Declare variables\\nconst params = this.actorParams();\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\nconst baseX = 0;\\nconst baseY = this.innerHeight - params.length * lineHeight;\\nconst baseWidth = this.innerWidth;\\nconst valueFontSize = this.paramValueFontSize();\\n\\n// Calculate Widths\\nlet paramNameWidth = Math.max(...params.map(param => this.textWidth(TextManager.param(param))));\\nparamNameWidth += padding * 2;\\nif (this.isUseParamNamesWithIcons()) {\\n    paramNameWidth += ImageManager.iconWidth + 4;\\n}\\nlet arrowWidth = this.rightArrowWidth();\\nconst totalDivides = this.innerWidth >= 500 ? 3 : 2;\\nlet paramValueWidth = Math.floor((baseWidth - paramNameWidth - arrowWidth) / totalDivides);\\nparamNameWidth = baseWidth - (paramValueWidth * totalDivides) - arrowWidth;\\n\\n// Draw Parameters\\nlet x = baseX;\\nlet y = baseY;\\nlet value = 0;\\nlet diffValue = 0;\\nlet alter = 2;\\nfor (const paramId of params) {\\n    // Draw Param Name\\n    this.drawItemDarkRect(x, y, paramNameWidth, lineHeight, alter);\\n    this.drawUpdatedParamName(paramId, x, y, paramNameWidth);\\n    this.resetFontSettings();\\n    x += paramNameWidth;\\n\\n    // Draw Param Before\\n    this.contents.fontSize = valueFontSize;\\n    this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\\n    this.drawUpdatedBeforeParamValue(paramId, x, y, paramValueWidth);\\n    this.resetFontSettings();\\n    x += paramValueWidth;\\n\\n    // Draw Arrow\\n    this.drawItemDarkRect(x, y, arrowWidth, lineHeight, alter);\\n    this.drawRightArrow(x, y);\\n    x += arrowWidth;\\n\\n    // Draw Param After\\n    this.contents.fontSize = valueFontSize;\\n    this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\\n    this.drawUpdatedAfterParamValue(paramId, x, y, paramValueWidth);\\n    x += paramValueWidth;\\n\\n    // Draw Param Change\\n    if (totalDivides > 2) {\\n        this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\\n        this.drawUpdatedParamValueDiff(paramId, x, y, paramValueWidth);\\n    }\\n\\n    // Prepare Next Parameter\\n    x = baseX;\\n    y += lineHeight;\\n    alter = alter === 2 ? 1 : 2;\\n}\"","LayoutStyle:str":"upper/right","StatusWindowWidth:num":"312","DrawBackRect:eval":"true","BackRectColor:str":"19","Command":"","CmdStyle:str":"auto","CmdTextAlign:str":"center","CmdIconEquip:num":"136","CommandAddOptimize:eval":"false","CmdIconOptimize:num":"137","CommandAddClear:eval":"false","CmdIconClear:num":"135","RemoveEquip":"","RemoveEquipIcon:num":"16","RemoveEquipText:str":"Remove","ShiftShortcutKey:eval":"true","Rulings":"","EquipAdjustHpMp:eval":"true","NonRemoveETypes:arraynum":"[]","NonOptimizeETypes:arraynum":"[]","ButtonAssist":"","buttonAssistRemove:str":"Unequip"}
 *
 * @param ShopScene:struct
 * @text Shop Menu Settings
 * @type struct<ShopScene>
 * @desc Change the Shop Menu Scene settings.
 * @default {"General":"","EnableLayout:eval":"true","LayoutStyle:str":"upper/left","Command":"","CmdHideDisabled:eval":"true","CmdStyle:str":"auto","CmdTextAlign:str":"center","CmdIconBuy:num":"208","CmdIconSell:num":"314","CmdIconCancel:num":"82","CmdCancelRename:str":"Exit","Prices":"","SellPriceRate:num":"0.50","BuyPriceJS:func":"\"// Declare variables\\nlet item = arguments[0];\\nlet price = arguments[1];\\n\\n// Return the finalized price\\nreturn price;\"","SellPriceJS:func":"\"// Declare variables\\nlet item = arguments[0];\\nlet price = arguments[1];\\n\\n// Return the finalized price\\nreturn price;\"","ButtonAssist":"","buttonAssistSmallIncrement:str":"-1/+1","buttonAssistLargeIncrement:str":"-10/+10"}
 *
 * @param StatusWindow:struct
 * @text Shop Status Window
 * @parent ShopScene:struct
 * @type struct<StatusWindow>
 * @desc Change the Item Status Window settings.
 * @default {"General":"","Width:num":"352","ParamChangeFontSize:num":"22","Translucent:num":"64","DrawBackRect:eval":"true","BackRectColor:str":"19","EquipData":"","AlreadyEquipMarker:str":"E","CannotEquipMarker:str":"-","NoChangeMarker:str":"-","DrawEquipData:func":"\"// Set Variables\\nconst lineHeight = this.lineHeight();\\nconst paramheight = this.gaugeLineHeight() + 8;\\nlet x = 0;\\nlet y = 0;\\nlet width = this.innerWidth;\\nlet height = this.innerHeight;\\nlet hw = Math.floor(width / 2);\\nlet hx = x + width - hw;\\n\\n// Draw Item Name, Type, and Quantity\\nthis.drawItemName(this._item, x + this.itemPadding(), y, width - this.itemPadding() * 2);\\nthis.drawItemDarkRect(x, y, width);\\ny += lineHeight;\\nif (this.drawItemEquipType(x, y, hw)) y += 0;\\nif (this.drawItemQuantity(hx, y, hw)) y += lineHeight;\\n\\n// Draw Parameter Names\\nconst params = this.actorParams();\\nconst backY = y;\\ny = height - (params.length * paramheight) - 4;\\nlet paramX = x;\\nlet paramWidth = 0;\\nlet tableY = y;\\nfor (const paramId of params) {\\n    paramWidth = Math.max(this.drawParamName(paramId, x + 4, y + 4, width), paramWidth);\\n    y += paramheight;\\n}\\n\\n// Draw Actor Data\\nconst actorMax = $gameParty.maxBattleMembers();\\nconst actorWidth = Math.floor((width - paramWidth) / actorMax);\\nparamWidth = width - (actorWidth * actorMax);\\nfor (const actor of $gameParty.battleMembers()) {\\n    const index = $gameParty.battleMembers().indexOf(actor);\\n    const actorX = paramX + paramWidth + (index * actorWidth);\\n    this.changePaintOpacity(actor.canEquip(this._item));\\n    this.drawActorCharacter(actor, actorX + (actorWidth / 2), tableY);\\n    let actorY = tableY;\\n\\n    // Draw Parameter Changes\\n    for (const paramId of params) {\\n        const diffY = actorY - ((lineHeight - paramheight) / 2);\\n        this.drawActorParamDifference(actor, paramId, actorX, diffY, actorWidth);\\n        actorY += paramheight;\\n    }\\n}\\n\\n// Draw Back Rectangles\\nthis.drawItemDarkRect(paramX, backY, paramWidth, tableY - backY);\\nfor (let i = 0; i < actorMax; i++) {\\n    const actorX = paramX + paramWidth + (i * actorWidth);\\n    this.drawItemDarkRect(actorX, backY, actorWidth, tableY - backY);\\n}\\nfor (const paramId of params) {\\n    this.drawItemDarkRect(paramX, tableY, paramWidth, paramheight);\\n    for (let i = 0; i < actorMax; i++) {\\n        const actorX = paramX + paramWidth + (i * actorWidth);\\n        this.drawItemDarkRect(actorX, tableY, actorWidth, paramheight);\\n    }\\n    tableY += paramheight;\\n}\"","ItemData":"","ItemGeneral":"","MaxIcons:num":"8","MultiplierStandard:num":"1000000","DrawItemData:func":"\"const lineHeight = this.lineHeight();\\nlet x = 0;\\nlet y = 0;\\nlet width = this.innerWidth;\\nlet height = this.innerHeight;\\nlet hw = Math.floor(width / 2);\\nlet hx = x + width - hw;\\n\\n// Draw Item Name and Quantity\\nthis.drawItemName(this._item, x + this.itemPadding(), y, width - this.itemPadding() * 2);\\nthis.drawItemDarkRect(x, y, width);\\ny += lineHeight;\\n\\n// Draw Main Item Properties\\nif (this.drawItemConsumable(x, y, hw)) y += 0;\\nif (this.drawItemQuantity(hx, y, hw)) y += lineHeight;\\nif (this._item.occasion < 3) {\\n    y = this.drawItemDamage(x, y, width);\\n    y = this.drawItemEffects(x, y, width);\\n}\\ny = this.drawItemCustomEntries(x, y, width);\\n\\n// Draw Remaining Item Properties\\nif (this._item.occasion < 3) {\\n    if (this.drawItemOccasion(x, y, hw)) y += 0;\\n    if (this.drawItemScope(hx, y, hw)) y += lineHeight;\\n    if (this.drawItemHitType(x, y, hw)) y += 0;\\n    if (this.drawItemSuccessRate(hx, y, hw)) y += lineHeight;\\n    if (this.drawItemSpeed(x, y, hw)) y += 0;\\n    if (this.drawItemRepeats(hx, y, hw)) y += lineHeight;\\n}\\n\\n// Fill Rest of the Window\\nthis.drawItemDarkRect(x, y, width, height - y);\"","Vocabulary":"","LabelConsume:str":"Consumable","Consumable:str":"✔","NotConsumable:str":"✘","Occasions":"","Occasion0:str":"Anytime Use","Occasion1:str":"Battle-Only","Occasion2:str":"Field-Only","Occasion3:str":"-","Scope":"","Scope0:str":"No Target","Scope1:str":"1 Foe","Scope2:str":"All Foes","Scope3:str":"Random Foe","Scope4:str":"2 Random Foes","Scope5:str":"3 Random Foes","Scope6:str":"4 Random Foes","Scope7:str":"1 Ally","Scope8:str":"Alive Allies","Scope9:str":"Dead Ally","Scope10:str":"Dead Allies","Scope11:str":"User","Scope12:str":"Any Ally","Scope13:str":"All Allies","Scope14:str":"Everybody","BattleCore":"","ScopeRandomAny:str":"%1 Random Units","ScopeRandomEnemies:str":"%1 Random Foes","ScopeRandomAllies:str":"%1 Random Allies","ScopeAlliesButUser:str":"Other Allies","LabelSpeed:str":"Speed","Speed2000:str":"Fastest","Speed1000:str":"Faster","Speed1:str":"Fast","Speed0:str":"Normal","SpeedNeg999:str":"Slow","SpeedNeg1999:str":"Slower","SpeedNeg2000:str":"Slowest","LabelSuccessRate:str":"Accuracy","LabelRepeats:str":"Hits","LabelHitType:str":"Type","HitType0:str":"Neutral","HitType1:str":"Physical","HitType2:str":"Magical","LabelElement:str":"Element","ElementWeapon:str":"\\I[97]Weapon","ElementNone:str":"\\I[160]No Element","DamageType":"","DamageType1:str":"%1 Damage Multiplier","DamageType2:str":"%1 Damage Multiplier","DamageType3:str":"%1 Recovery Multiplier","DamageType4:str":"%1 Recovery Multiplier","DamageType5:str":"%1 Drain Multiplier","DamageType6:str":"%1 Drain Multiplier","Effects":"","LabelRecoverHP:str":"%1 Recovery","LabelRecoverMP:str":"%1 Recovery","LabelRecoverTP:str":"%1 Recovery","LabelSelfGainTP:str":"User %1","LabelDamageHP:str":"%1 Damage","LabelDamageMP:str":"%1 Damage","LabelDamageTP:str":"%1 Damage","LabelApply:str":"Applies","LabelRemove:str":"Removes"}
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
 * Item Menu Scene Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ItemScene:
 *
 * @param General
 *
 * @param EnableLayout:eval
 * @text Use Updated Layout
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use the Updated Item Menu Layout provided by this plugin?
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
 * @param ItemQt
 * @text Item Quantity
 *
 * @param MaxItems:num
 * @text Item Max
 * @parent ItemQt
 * @desc The default maximum quantity for items.
 * @default 99
 *
 * @param MaxWeapons:num
 * @text Weapon Max
 * @parent ItemQt
 * @desc The default maximum quantity for weapons.
 * @default 99
 *
 * @param MaxArmors:num
 * @text Armor Max
 * @parent ItemQt
 * @desc The default maximum quantity for armors.
 * @default 99
 *
 * @param ItemQuantityFmt:str
 * @text Quantity Format
 * @parent ItemQt
 * @desc How to display an item's quantity.
 * %1 - Item Quantity
 * @default ×%1
 *
 * @param ItemQuantityFontSize:num
 * @text Font Size
 * @parent ItemQt
 * @desc Default font size for item quantity.
 * @default 22
 *
 * @param ShopStatusWindow
 * @text Shop Status Window
 *
 * @param ShowShopStatus:eval
 * @text Show in Item Menu?
 * @parent ShopStatusWindow
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show the Shop Status Window in the Item Menu?
 * This is enabled if the Updated Layout is on.
 * @default true
 *
 * @param ItemSceneAdjustItemList:eval
 * @text Adjust List Window?
 * @parent ShopStatusWindow
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the Item List Window in the Item Menu if using the Shop Status Window?
 * @default true
 *
 * @param ItemMenuStatusBgType:num
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
 * @param ItemMenuStatusRect:func
 * @text JS: X, Y, W, H
 * @parent ShopStatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this Status Window in the Item Menu.
 * @default "const width = this.statusWidth();\nconst height = this._itemWindow.height;\nconst x = Graphics.boxWidth - width;\nconst y = this._itemWindow.y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ButtonAssist
 * @text Button Assist Window
 *
 * @param buttonAssistCategory:str
 * @text Switch Category
 * @parent ButtonAssist
 * @desc Button assist text used for switching categories.
 * For VisuStella MZ's Core Engine's Button Assist Window.
 * @default Switch Category
 *
 */
/* ----------------------------------------------------------------------------
 * Item Categories
 * ----------------------------------------------------------------------------
 */
/*~struct~Categories:
 *
 * @param MainList
 * @text List
 * 
 * @param List:arraystruct
 * @text Category List
 * @parent MainList
 * @type struct<Category>[]
 * @desc A list of the item categories displayed in the Item/Shop menus.
 * @default ["{\"Type:str\":\"RegularItems\",\"Icon:num\":\"208\"}","{\"Type:str\":\"AllWeapons\",\"Icon:num\":\"97\"}","{\"Type:str\":\"AllArmors\",\"Icon:num\":\"137\"}","{\"Type:str\":\"KeyItems\",\"Icon:num\":\"195\"}"]
 *
 * @param Style:str
 * @text Category Style
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
 * @desc How do you wish to draw categorie entries in the Category Window?
 * @default icon
 *
 * @param TextAlign:str
 * @text Text Alignment
 * @parent MainList
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Decide how you want the text to be aligned.
 * @default center
 *
 * @param Vocabulary
 *
 * @param HiddenItemA:str
 * @text Hidden Item A
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Special Items
 *
 * @param HiddenItemB:str
 * @text Hidden Item B
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Unique Items
 *
 * @param Consumable:str
 * @text Consumable
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Consumable
 *
 * @param Nonconsumable:str
 * @text Nonconsumable
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Nonconsumable
 *
 * @param AlwaysUsable:str
 * @text Always Usable
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Usable
 *
 * @param BattleUsable:str
 * @text Battle Usable
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Battle
 *
 * @param FieldUsable:str
 * @text Field Usable
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Field
 *
 * @param NeverUsable:str
 * @text Never Usable
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Materials
 *
 */
/* ----------------------------------------------------------------------------
 * Category Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Category:
 *
 * @param Type:str
 * @text Type
 * @type combo
 * @option AllItems
 * @option 
 * @option RegularItems
 * @option KeyItems
 * @option HiddenItemA
 * @option HiddenItemB
 * @option 
 * @option Consumable
 * @option Nonconsumable
 * @option 
 * @option AlwaysUsable
 * @option BattleUsable
 * @option FieldUsable
 * @option NeverUsable
 * @option 
 * @option AllWeapons
 * @option WType:x
 * @option 
 * @option AllArmors
 * @option AType:x
 * @option 
 * @option EType:x
 * @option 
 * @option Category:x
 * @option
 * @desc A list of the item categories displayed in the Item/Shop
 * menus. Replace x with ID numbers or text.
 * @default RegularItems
 *
 * @param Icon:num
 * @text Icon
 * @desc Icon used for this category.
 * Use 0 for no icon.
 * @default 0
 *
 * @param SwitchID:num
 * @text Visibility Switch
 * @type switch
 * @desc This Switch must be turned ON in order for the category to show.
 * Use 0 for no Switch requirement.
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * New Label Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~NewLabel:
 *
 * @param Enable:eval
 * @text Use NEW! Labels?
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use the NEW! Labels or not?
 * @default true
 *
 * @param Icon:num
 * @text Icon
 * @desc The icon index used to represent the NEW! text.
 * Use 0 to not draw any icons.
 * @default 0
 *
 * @param Text:str
 * @text Text
 * @desc The text written on the NEW! Label.
 * @default NEW!
 *
 * @param FontColor:str
 * @text Font Color
 * @parent Text:str
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 17
 *
 * @param FontFace:str
 * @text Font Face
 * @parent Text:str
 * @desc Font face used for the NEW! Label.
 * @default Verdana
 *
 * @param FontSize:str
 * @text Font Size
 * @parent Text:str
 * @desc The font size used for the NEW! text.
 * @default 16
 *
 * @param FadeLimit:num
 * @text Fade Limit
 * @desc What's the upper opaque limit before reversing?
 * @default 360
 *
 * @param FadeSpeed:num
 * @text Fade Speed
 * @desc What's the fade speed of the NEW! Label?
 * @default 4
 *
 * @param OffsetX:num
 * @text Offset X
 * @desc How much to offset the NEW! Label's X position by.
 * @default 0
 *
 * @param OffsetY:num
 * @text Offset Y
 * @desc How much to offset the NEW! Label's Y position by.
 * @default 4
 *
 */
/* ----------------------------------------------------------------------------
 * Equip Menu Scene Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~EquipScene:
 *
 * @param General
 *
 * @param EnableLayout:eval
 * @text Use Updated Layout
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use the Updated Equip Layout provided by this plugin?
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
 * @default upper/right
 *
 * @param ParamValueFontSize:num
 * @text Param Font Size
 * @parent EnableLayout:eval
 * @desc The font size used for parameter values.
 * @default 22
 *
 * @param MenuPortraits:eval
 * @text Show Menu Portraits?
 * @parent EnableLayout:eval
 * @type boolean
 * @on Use Portraits
 * @off Use Faces
 * @desc If Main Menu Core is installed, display the Menu Portraits
 * instead of the actor's face in the status window?
 * @default true
 *
 * @param DrawPortraitJS:func
 * @text JS: Portrait Upper
 * @parent EnableLayout:eval
 * @type note
 * @desc If Menu Portraits are available, this is code used to draw
 * the upper data like this in the Status Window.
 * @default "// Declare Variables\nconst lineHeight = this.lineHeight();\nconst padding = this.itemPadding();\nconst x1 = padding;\nconst x2 = this.innerWidth - 128 - padding;\n\n// Draw Menu Image\nthis.drawItemActorMenuImage(this._actor, 0, 0, this.innerWidth, this.innerHeight);\n\n// Draw Data\nthis.drawActorName(this._actor, x1, lineHeight * 0);\nthis.drawActorClass(this._actor, x1, lineHeight * 1);\nthis.drawActorIcons(this._actor, x1, lineHeight * 2);\nthis.drawActorLevel(this._actor, x2, lineHeight * 0);\nthis.placeBasicGauges(this._actor, x2, lineHeight * 1);"
 *
 * @param DrawFaceJS:func
 * @text JS: Face Upper
 * @parent EnableLayout:eval
 * @type note
 * @desc If faces used used, this is code used to draw the upper
 * data like this in the Status Window.
 * @default "// Declare Variables\nconst lineHeight = this.lineHeight();\nconst gaugeLineHeight = this.gaugeLineHeight();\nconst x = Math.floor(this.innerWidth / 2);\nconst limitHeight = this.innerHeight - (this.actorParams().length * lineHeight);\nconst actorX = Math.floor((x - ImageManager.faceWidth) / 2);\nconst actorY = Math.floor((limitHeight - ImageManager.faceHeight) / 2);\nlet dataHeight = lineHeight * 3;\ndataHeight += gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2);\nconst dataY = Math.floor((limitHeight - dataHeight) / 2);\n\n// Draw Data\nthis.drawActorFace(this._actor, actorX, actorY, ImageManager.faceWidth, ImageManager.faceHeight);\nthis.drawActorIcons(this._actor, actorX + 16, actorY + ImageManager.faceHeight - lineHeight);\nthis.drawActorName(this._actor, x, dataY + lineHeight * 0);\nthis.drawActorLevel(this._actor, x, dataY + lineHeight * 1);\nthis.drawActorClass(this._actor, x, dataY + lineHeight * 2);\nthis.placeBasicGauges(this._actor, x, dataY + lineHeight * 3);"
 *
 * @param DrawParamJS:func
 * @text JS: Parameter Lower
 * @parent EnableLayout:eval
 * @type note
 * @desc Code to determine how parameters are drawn in the
 * Status Window.
 * @default "// Declare variables\nconst params = this.actorParams();\nconst lineHeight = this.lineHeight();\nconst padding = this.itemPadding();\nconst baseX = 0;\nconst baseY = this.innerHeight - params.length * lineHeight;\nconst baseWidth = this.innerWidth;\nconst valueFontSize = this.paramValueFontSize();\n\n// Calculate Widths\nlet paramNameWidth = Math.max(...params.map(param => this.textWidth(TextManager.param(param))));\nparamNameWidth += padding * 2;\nif (this.isUseParamNamesWithIcons()) {\n    paramNameWidth += ImageManager.iconWidth + 4;\n}\nlet arrowWidth = this.rightArrowWidth();\nconst totalDivides = this.innerWidth >= 500 ? 3 : 2;\nlet paramValueWidth = Math.floor((baseWidth - paramNameWidth - arrowWidth) / totalDivides);\nparamNameWidth = baseWidth - (paramValueWidth * totalDivides) - arrowWidth;\n\n// Draw Parameters\nlet x = baseX;\nlet y = baseY;\nlet value = 0;\nlet diffValue = 0;\nlet alter = 2;\nfor (const paramId of params) {\n    // Draw Param Name\n    this.drawItemDarkRect(x, y, paramNameWidth, lineHeight, alter);\n    this.drawUpdatedParamName(paramId, x, y, paramNameWidth);\n    this.resetFontSettings();\n    x += paramNameWidth;\n\n    // Draw Param Before\n    this.contents.fontSize = valueFontSize;\n    this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\n    this.drawUpdatedBeforeParamValue(paramId, x, y, paramValueWidth);\n    this.resetFontSettings();\n    x += paramValueWidth;\n\n    // Draw Arrow\n    this.drawItemDarkRect(x, y, arrowWidth, lineHeight, alter);\n    this.drawRightArrow(x, y);\n    x += arrowWidth;\n\n    // Draw Param After\n    this.contents.fontSize = valueFontSize;\n    this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\n    this.drawUpdatedAfterParamValue(paramId, x, y, paramValueWidth);\n    x += paramValueWidth;\n\n    // Draw Param Change\n    if (totalDivides > 2) {\n        this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\n        this.drawUpdatedParamValueDiff(paramId, x, y, paramValueWidth);\n    }\n\n    // Prepare Next Parameter\n    x = baseX;\n    y += lineHeight;\n    alter = alter === 2 ? 1 : 2;\n}"
 *
 * @param StatusWindowWidth:num
 * @text Status Window Width
 * @parent General
 * @desc The usual width of the status window if using the 
 * non-Updated Equip Menu Layout.
 * @default 312
 *
 * @param DrawBackRect:eval
 * @text Show Back Rectangles?
 * @parent General
 * @type boolean
 * @on Draw
 * @off Don't Draw
 * @desc Show back rectangles of darker colors to display information better?
 * @default true
 *
 * @param BackRectColor:str
 * @text Back Rectangle Color
 * @parent DrawBackRect:eval
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param Command
 * @text Command Window
 *
 * @param CmdStyle:str
 * @text Style
 * @parent Command
 * @type select
 * @option Text Only
 * @value text
 * @option Icon Only
 * @value icon
 * @option Icon + Text
 * @value iconText
 * @option Automatic
 * @value auto
 * @desc How do you wish to draw commands in the Command Window?
 * @default auto
 *
 * @param CmdTextAlign:str
 * @text Text Align
 * @parent Command
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Text alignment for the Command Window.
 * @default center
 *
 * @param CmdIconEquip:num
 * @text Equip Icon
 * @parent Command
 * @desc The icon used for the Equip command.
 * @default 136
 *
 * @param CommandAddOptimize:eval
 * @text Add Optimize Command?
 * @parent Command
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add the "Optimize" command to the Command Window?
 * @default true
 *
 * @param CmdIconOptimize:num
 * @text Optimize Icon
 * @parent CommandAddOptimize:eval
 * @desc The icon used for the Optimize command.
 * @default 137
 *
 * @param CommandAddClear:eval
 * @text Add Clear Command?
 * @parent Command
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add the "Clear" command to the Command Window?
 * @default true
 *
 * @param CmdIconClear:num
 * @text Clear Icon
 * @parent CommandAddClear:eval
 * @desc The icon used for the Clear command.
 * @default 135
 *
 * @param RemoveEquip
 * @text Remove Equip
 *
 * @param RemoveEquipIcon:num
 * @text Icon
 * @parent RemoveEquip
 * @desc Icon used for equipment removal.
 * @default 16
 *
 * @param RemoveEquipText:str
 * @text Text
 * @parent RemoveEquip
 * @desc Text used for equipment removal.
 * @default Remove
 *
 * @param ShiftShortcutKey:eval
 * @text Use SHIFT Shortcut?
 * @parent RemoveEquip
 * @type boolean
 * @on Use
 * @off Don't
 * @desc Add the "Shift" button as a shortcut key to removing items?
 * @default true

 * @param Rulings
 *
 * @param EquipAdjustHpMp:eval
 * @text Equip-Adjust HP/MP
 * @parent Rulings
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Adjust HP/MP differences after changing equips with MaxHP/MaxMP values.
 * @default true
 * 
 * @param NonRemoveETypes:arraynum
 * @text Non-Removable Types
 * @parent Rulings
 * @type number[]
 * @min 1
 * @max 100
 * @desc Insert ID's of the Equipment Types that must always have
 * an item equipped and cannot be empty.
 * @default []
 *
 * @param NonOptimizeETypes:arraynum
 * @text Non-Optimized Types
 * @parent Rulings
 * @type number[]
 * @min 1
 * @max 100
 * @desc Insert ID's of the Equipment Types that will be ignored
 * when equipment is being optimized.
 * @default []
 *
 * @param ButtonAssist
 * @text Button Assist Window
 *
 * @param buttonAssistRemove:str
 * @text SHIFT: Remove
 * @parent ButtonAssist
 * @desc Button assist text used for the SHIFT Remove Shortcut.
 * For VisuStella MZ's Core Engine's Button Assist Window.
 * @default Unequip
 * 
 */
/* ----------------------------------------------------------------------------
 * Shop Menu Scene Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ShopScene:
 *
 * @param General
 *
 * @param EnableLayout:eval
 * @text Use Updated Layout
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use the Updated Shop Layout provided by this plugin?
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
 * @param Switches
 *
 * @param SwitchBuy:num
 * @text Switch: Buy
 * @parent Switches
 * @type switch
 * @desc Buying items in the Shop Scene turns this Switch to ON.
 * Switch reverts to OFF whenever the Shop Scene opens.
 * @default 0
 *
 * @param SwitchSell:num
 * @text Switch: Sell
 * @parent Switches
 * @type switch
 * @desc Selling items in the Shop Scene turns this Switch to ON.
 * Switch reverts to OFF whenever the Shop Scene opens.
 * @default 0
 *
 * @param Command
 * @text Command Window
 *
 * @param CmdHideDisabled:eval
 * @text Hide Unavailable?
 * @parent Command
 * @type boolean
 * @on Hide
 * @off Default
 * @desc Hide all unavailable commands like when a shop is set to Purchase Only?
 * @default true
 *
 * @param CmdStyle:str
 * @text Style
 * @parent Command
 * @type select
 * @option Text Only
 * @value text
 * @option Icon Only
 * @value icon
 * @option Icon + Text
 * @value iconText
 * @option Automatic
 * @value auto
 * @desc How do you wish to draw commands in the Command Window?
 * @default auto
 *
 * @param CmdTextAlign:str
 * @text Text Align
 * @parent Command
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Text alignment for the Command Window.
 * @default center
 *
 * @param CmdIconBuy:num
 * @text Buy Icon
 * @parent Command
 * @desc The icon used for the Buy command.
 * @default 208
 *
 * @param CmdIconSell:num
 * @text Sell Icon
 * @parent Command
 * @desc The icon used for the Sell command.
 * @default 314
 *
 * @param CmdIconCancel:num
 * @text Cancel Icon
 * @parent Command
 * @desc The icon used for the Cancel command.
 * @default 82
 *
 * @param CmdCancelRename:str
 * @text Rename "Cancel"
 * @parent Command
 * @desc Rename Cancel to something more logical for the Shop Menu Scene.
 * @default Exit
 *
 * @param Prices
 *
 * @param SellPriceRate:num
 * @text Sell Price Rate
 * @parent Prices
 * @desc The default sell price rate.
 * @default 0.50
 *
 * @param BuyPriceJS:func
 * @text JS: Buy Price
 * @parent Prices
 * @type note
 * @desc Modificatons made to the buy price before finalizing it.
 * @default "// Declare variables\nlet item = arguments[0];\nlet price = arguments[1];\n\n// Return the finalized price\nreturn price;"
 *
 * @param SellPriceJS:func
 * @text JS: Sell Price
 * @parent Prices
 * @type note
 * @desc Modificatons made to the sell price before finalizing it.
 * @default "// Declare variables\nlet item = arguments[0];\nlet price = arguments[1];\n\n// Return the finalized price\nreturn price;"
 * 
 * @param ButtonAssist
 * @text Button Assist Window
 *
 * @param buttonAssistSmallIncrement:str
 * @text Small Increment
 * @parent ButtonAssist
 * @desc Text used for changing amount bought/sold.
 * For VisuStella MZ's Core Engine's Button Assist Window.
 * @default -1/+1
 *
 * @param buttonAssistLargeIncrement:str
 * @text Large Increment
 * @parent ButtonAssist
 * @desc Text used for changing amount bought/sold.
 * For VisuStella MZ's Core Engine's Button Assist Window.
 * @default -10/+10
 *
 */
/* ----------------------------------------------------------------------------
 * Shop Status Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~StatusWindow:
 *
 * @param General
 *
 * @param Width:num
 * @text Window Width
 * @parent General
 * @desc The usual width of the status window.
 * @default 352
 *
 * @param ParamChangeFontSize:num
 * @text Parameter Font Size
 * @parent General
 * @desc Font size used for parameter changes.
 * @default 22
 *
 * @param Translucent:num
 * @text Translucent Opacity
 * @parent General
 * @desc Opacity setting used for translucent window objects.
 * @default 64
 *
 * @param DrawBackRect:eval
 * @text Show Back Rectangles?
 * @parent General
 * @type boolean
 * @on Draw
 * @off Don't Draw
 * @desc Show back rectangles of darker colors to display information better?
 * @default true
 *
 * @param BackRectColor:str
 * @text Back Rectangle Color
 * @parent DrawBackRect:eval
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param EquipData
 * @text Equipment Data
 *
 * @param AlreadyEquipMarker:str
 * @text Already Equipped
 * @parent EquipData
 * @desc Marker used to show an actor cannot equip an item.
 * @default E
 *
 * @param CannotEquipMarker:str
 * @text Can't Equip
 * @parent EquipData
 * @desc Marker used to show an actor cannot equip an item.
 * @default -
 *
 * @param NoChangeMarker:str
 * @text No Changes
 * @parent EquipData
 * @desc Marker used to show no changes have occurred.
 * @default -
 *
 * @param DrawEquipData:func
 * @text JS: Draw Equip Data
 * @parent EquipData
 * @type note
 * @desc Code used to draw the equipment data for the Shop Status Window.
 * @default "// Set Variables\nconst lineHeight = this.lineHeight();\nconst paramheight = this.gaugeLineHeight() + 8;\nlet x = 0;\nlet y = 0;\nlet width = this.innerWidth;\nlet height = this.innerHeight;\nlet hw = Math.floor(width / 2);\nlet hx = x + width - hw;\n\n// Draw Item Name, Type, and Quantity\nthis.drawItemName(this._item, x + this.itemPadding(), y, width - this.itemPadding() * 2);\nthis.drawItemDarkRect(x, y, width);\ny += lineHeight;\nif (this.drawItemEquipType(x, y, hw)) y += 0;\nif (this.drawItemQuantity(hx, y, hw)) y += lineHeight;\n\n// Draw Parameter Names\nconst params = this.actorParams();\nconst backY = y;\ny = height - (params.length * paramheight) - 4;\nlet paramX = x;\nlet paramWidth = 0;\nlet tableY = y;\nfor (const paramId of params) {\n    paramWidth = Math.max(this.drawParamName(paramId, x + 4, y + 4, width), paramWidth);\n    y += paramheight;\n}\n\n// Draw Actor Data\nconst actorMax = $gameParty.maxBattleMembers();\nconst actorWidth = Math.floor((width - paramWidth) / actorMax);\nparamWidth = width - (actorWidth * actorMax);\nfor (const actor of $gameParty.battleMembers()) {\n    const index = $gameParty.battleMembers().indexOf(actor);\n    const actorX = paramX + paramWidth + (index * actorWidth);\n    this.changePaintOpacity(actor.canEquip(this._item));\n    this.drawActorCharacter(actor, actorX + (actorWidth / 2), tableY);\n    let actorY = tableY;\n\n    // Draw Parameter Changes\n    for (const paramId of params) {\n        const diffY = actorY - ((lineHeight - paramheight) / 2);\n        this.drawActorParamDifference(actor, paramId, actorX, diffY, actorWidth);\n        actorY += paramheight;\n    }\n}\n\n// Draw Back Rectangles\nthis.drawItemDarkRect(paramX, backY, paramWidth, tableY - backY);\nfor (let i = 0; i < actorMax; i++) {\n    const actorX = paramX + paramWidth + (i * actorWidth);\n    this.drawItemDarkRect(actorX, backY, actorWidth, tableY - backY);\n}\nfor (const paramId of params) {\n    this.drawItemDarkRect(paramX, tableY, paramWidth, paramheight);\n    for (let i = 0; i < actorMax; i++) {\n        const actorX = paramX + paramWidth + (i * actorWidth);\n        this.drawItemDarkRect(actorX, tableY, actorWidth, paramheight);\n    }\n    tableY += paramheight;\n}"
 *
 * @param ItemData
 * @text Item Data
 *
 * @param ItemGeneral
 * @parent ItemData
 *
 * @param MaxIcons:num
 * @text Max State/Buff Icons
 * @parent ItemGeneral
 * @desc Maximum number of icons that can be displayed for Add/Remove States/Buffs.
 * @default 8
 *
 * @param MultiplierStandard:num
 * @text Multiplier Standard
 * @parent ItemGeneral
 * @desc Constant standard to filter out random values when calculating the damage multiplier.
 * @default 1000000
 *
 * @param DrawItemData:func
 * @text JS: Draw Item Data
 * @parent ItemGeneral
 * @type note
 * @desc Code used to draw the item data for the Shop Status Window.
 * @default "const lineHeight = this.lineHeight();\nlet x = 0;\nlet y = 0;\nlet width = this.innerWidth;\nlet height = this.innerHeight;\nlet hw = Math.floor(width / 2);\nlet hx = x + width - hw;\n\n// Draw Item Name and Quantity\nthis.drawItemName(this._item, x + this.itemPadding(), y, width - this.itemPadding() * 2);\nthis.drawItemDarkRect(x, y, width);\ny += lineHeight;\n\n// Draw Main Item Properties\nif (this.drawItemConsumable(x, y, hw)) y += 0;\nif (this.drawItemQuantity(hx, y, hw)) y += lineHeight;\nif (this._item.occasion < 3) {\n    y = this.drawItemDamage(x, y, width);\n    y = this.drawItemEffects(x, y, width);\n}\ny = this.drawItemCustomEntries(x, y, width);\n\n// Draw Remaining Item Properties\nif (this._item.occasion < 3) {\n    if (this.drawItemOccasion(x, y, hw)) y += 0;\n    if (this.drawItemScope(hx, y, hw)) y += lineHeight;\n    if (this.drawItemHitType(x, y, hw)) y += 0;\n    if (this.drawItemSuccessRate(hx, y, hw)) y += lineHeight;\n    if (this.drawItemSpeed(x, y, hw)) y += 0;\n    if (this.drawItemRepeats(hx, y, hw)) y += lineHeight;\n}\n\n// Fill Rest of the Window\nthis.drawItemDarkRect(x, y, width, height - y);"
 *
 * @param Vocabulary
 * @parent ItemData
 *
 * @param LabelConsume:str
 * @text Consumable
 * @parent Vocabulary
 * @desc Vocabulary used for this data entry.
 * @default Consumable
 *
 * @param Consumable:str
 * @text Yes
 * @parent LabelConsume:str
 * @desc Vocabulary used for this data entry.
 * @default ✔
 *
 * @param NotConsumable:str
 * @text No
 * @parent LabelConsume:str
 * @desc Vocabulary used for this data entry.
 * @default ✘
 *
 * @param Occasions
 * @parent Vocabulary
 *
 * @param Occasion0:str
 * @text Always
 * @parent Occasions
 * @desc Vocabulary used for this data entry.
 * @default Anytime Use
 *
 * @param Occasion1:str
 * @text Battle Screen
 * @parent Occasions
 * @desc Vocabulary used for this data entry.
 * @default Battle-Only
 *
 * @param Occasion2:str
 * @text Menu Screen
 * @parent Occasions
 * @desc Vocabulary used for this data entry.
 * @default Field-Only
 *
 * @param Occasion3:str
 * @text Never
 * @parent Occasions
 * @desc Vocabulary used for this data entry.
 * @default -
 *
 * @param Scope
 * @parent Vocabulary
 *
 * @param Scope0:str
 * @text None
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default No Target
 *
 * @param Scope1:str
 * @text 1 Enemy
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default 1 Foe
 *
 * @param Scope2:str
 * @text All Enemies
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default All Foes
 *
 * @param Scope3:str
 * @text 1 Random Enemy
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default Random Foe
 *
 * @param Scope4:str
 * @text 2 Random Enemies
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default 2 Random Foes
 *
 * @param Scope5:str
 * @text 3 Random Enemies
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default 3 Random Foes
 *
 * @param Scope6:str
 * @text 4 Random Enemies
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default 4 Random Foes
 *
 * @param Scope7:str
 * @text 1 Ally
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default 1 Ally
 *
 * @param Scope8:str
 * @text All Allies
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default Alive Allies
 *
 * @param Scope9:str
 * @text 1 Ally (Dead)
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default Dead Ally
 *
 * @param Scope10:str
 * @text All Allies (Dead)
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default Dead Allies
 *
 * @param Scope11:str
 * @text The User
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default User
 *
 * @param Scope12:str
 * @text 1 Ally (DoA)
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default Any Ally
 *
 * @param Scope13:str
 * @text All Allies (DoA)
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default All Allies
 *
 * @param Scope14:str
 * @text Enemies & Allies
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default Everybody
 *
 * @param BattleCore
 * @text Battle Core Support
 * @parent Vocabulary
 *
 * @param ScopeRandomAny:str
 * @text x Random Any
 * @parent BattleCore
 * @desc Vocabulary used for <Target: x Random Any> notetag.
 * @default %1 Random Units
 *
 * @param ScopeRandomEnemies:str
 * @text x Random Enemies
 * @parent BattleCore
 * @desc Vocabulary used for <Target: x Random Enemies> notetag.
 * @default %1 Random Foes
 *
 * @param ScopeRandomAllies:str
 * @text x Random Allies
 * @parent BattleCore
 * @desc Vocabulary used for <Target: x Random Allies> notetag.
 * @default %1 Random Allies
 *
 * @param ScopeAlliesButUser:str
 * @text All Allies But User
 * @parent BattleCore
 * @desc Vocabulary used for <Target: All Allies But User> notetag.
 * @default Other Allies
 *
 * @param LabelSpeed:str
 * @text Speed
 * @parent Vocabulary
 * @desc Vocabulary used for this data entry.
 * @default Speed
 *
 * @param Speed2000:str
 * @text >= 2000 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Fastest
 *
 * @param Speed1000:str
 * @text >= 1000 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Faster
 *
 * @param Speed1:str
 * @text >= 1 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Fast
 *
 * @param Speed0:str
 * @text == 0 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Normal
 *
 * @param SpeedNeg999:str
 * @text >= -999 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Slow
 *
 * @param SpeedNeg1999:str
 * @text >= -1999 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Slower
 *
 * @param SpeedNeg2000:str
 * @text <= -2000 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Slowest
 *
 * @param LabelSuccessRate:str
 * @text Success Rate
 * @parent Vocabulary
 * @desc Vocabulary used for this data entry.
 * @default Accuracy
 *
 * @param LabelRepeats:str
 * @text Repeats
 * @parent Vocabulary
 * @desc Vocabulary used for this data entry.
 * @default Hits
 *
 * @param LabelHitType:str
 * @text Hit Type
 * @parent Vocabulary
 * @desc Vocabulary used for this data entry.
 * @default Type
 *
 * @param HitType0:str
 * @text Certain Hit
 * @parent LabelHitType:str
 * @desc Vocabulary used for this data entry.
 * @default Neutral
 *
 * @param HitType1:str
 * @text Physical
 * @parent LabelHitType:str
 * @desc Vocabulary used for this data entry.
 * @default Physical
 *
 * @param HitType2:str
 * @text Magical
 * @parent LabelHitType:str
 * @desc Vocabulary used for this data entry.
 * @default Magical
 *
 * @param LabelElement:str
 * @text Element
 * @parent Vocabulary
 * @desc Vocabulary used for this data entry.
 * @default Element
 *
 * @param ElementWeapon:str
 * @text Weapon-Based
 * @parent LabelElement:str
 * @desc Vocabulary used for this data entry.
 * @default \I[97]Weapon
 *
 * @param ElementNone:str
 * @text Nonelement Element
 * @parent LabelElement:str
 * @desc Vocabulary used for this data entry.
 * @default \I[160]No Element
 *
 * @param DamageType
 * @text Damage Type
 * @parent Vocabulary
 *
 * @param DamageType1:str
 * @text HP Damage
 * @parent DamageType
 * @desc Vocabulary used for this data entry. If Visu_1_BattleCore
 * is installed, priority goes to its Damage Style settings.
 * @default %1 Damage Multiplier
 *
 * @param DamageType2:str
 * @text MP Damage
 * @parent DamageType
 * @desc Vocabulary used for this data entry. If Visu_1_BattleCore
 * is installed, priority goes to its Damage Style settings.
 * @default %1 Damage Multiplier
 *
 * @param DamageType3:str
 * @text HP Recovery
 * @parent DamageType
 * @desc Vocabulary used for this data entry. If Visu_1_BattleCore
 * is installed, priority goes to its Damage Style settings.
 * @default %1 Recovery Multiplier
 *
 * @param DamageType4:str
 * @text MP Recovery
 * @parent DamageType
 * @desc Vocabulary used for this data entry. If Visu_1_BattleCore
 * is installed, priority goes to its Damage Style settings.
 * @default %1 Recovery Multiplier
 *
 * @param DamageType5:str
 * @text HP Drain
 * @parent DamageType
 * @desc Vocabulary used for this data entry. If Visu_1_BattleCore
 * is installed, priority goes to its Damage Style settings.
 * @default %1 Drain Multiplier
 *
 * @param DamageType6:str
 * @text MP Drain
 * @parent DamageType
 * @desc Vocabulary used for this data entry. If Visu_1_BattleCore
 * is installed, priority goes to its Damage Style settings.
 * @default %1 Drain Multiplier
 *
 * @param Effects
 * @parent Vocabulary
 *
 * @param LabelRecoverHP:str
 * @text Recover HP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default %1 Recovery
 *
 * @param LabelRecoverMP:str
 * @text Recover MP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default %1 Recovery
 *
 * @param LabelRecoverTP:str
 * @text Recover TP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default %1 Recovery
 *
 * @param LabelSelfGainTP:str
 * @text Self Gain TP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default User %1
 *
 * @param LabelDamageHP:str
 * @text Damage HP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default %1 Damage
 *
 * @param LabelDamageMP:str
 * @text Damage MP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default %1 Damage
 *
 * @param LabelDamageTP:str
 * @text Damage TP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default %1 Damage
 *
 * @param LabelApply:str
 * @text Add State/Buff
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default Applies
 *
 * @param LabelRemove:str
 * @text Remove State/Buff
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default Removes
 *
 */
//=============================================================================

const _0x18a9=['opacity','setStatusWindow','LUK','buttonAssistText2','_newItemsList','onBuyCancel','Game_Actor_paramPlus','AllWeapons','contentsBack','value1','Slots','addCommand','ParseArmorNotetags','mainAreaHeight','jmWeH','forceResetEquipSlots','gdCiz','goldWindowRectItemsEquipsCore','ROcdi','isHovered','Window_Selectable_setHelpWindowItem','%1%','atypeId','playOkSound','isOptimizeEquipOk','dataId','remove','StatusWindowWidth','Parse_Notetags_Batch','lmUGS','optKeyItemsNumber','categories','A%1','isArmor','drawItemDamageAmount','windowPadding','adjustItemWidthByStatus','CommandAddOptimize','initialize','drawItemActorMenuImage','isKeyItem','tpGain','FMjsu','maxBattleMembers','buffIconIndex','Speed1','DvJNR','drawItemSpeed','OENZE','buttonAssistSmallIncrement','isPressed','cHVeK','battleMembers','itemAt','Jzhbq','_buttonAssistWindow','onSellCancel','isPageChangeRequested','refreshCursor','955tzSLMs','process_VisuMZ_ItemsEquipsCore_EquipSlots','call','FJsWv','drawNewLabelIcon','GMIbp','EszeS','_resetFontColor','repeats','param','NJTLw','DamageType%1','CmdHideDisabled','popScene','DOoqb','drawItemCustomEntryLine','processCursorMove','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20enabled\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20enabled;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','sellWindowRectItemsEquipsCore','BsBYy','paramValueFontSize','categoryStyleCheck','Scene_Boot_onDatabaseLoaded','drawRemoveItem','index','isHandled','reJht','processDrawIcon','getItemEffectsSelfTpGainLabel','postCreateItemWindowModernControls','maxVisibleItems','xPTXn','Step2End','getColor','drawCustomShopGraphic','NUflT','changeEquip','cGxhk','active','STRUCT','getItemSuccessRateText','CsdML','equip2','(+%1)','changeTextColor','ylOMH','buttonAssistKey1','_actor','setCategory','values','equip','hpRate','loadCharacter','getTextColor','DLemO','prCNL','eNVSq','\x5cb%1\x5cb','addWindow','×%1','isShowNew','ePaeT','name','BOMdp','CmdIconSell','CbZfB','SPEED','updateCategoryNameWindow','TVEqg','cDFKS','drawItemConsumable','splice','constructor','getItemHitTypeText','loadPicture','drawUpdatedBeforeParamValue','EFFECT_GAIN_TP','drawItemName','_purchaseOnly','pageup','FieldUsable','RegularItems','flatMP','geUpdatedLayoutStatusWidth','SGvoG','revertGlobalNamespaceVariables','length','BpeUR','makeItemData','Scene_Item_createItemWindow','drawItemQuantity','GStsh','isWeapon','EquipParams','BCknV','New','Scene_Equip_commandWindowRect','isDualWield','checkItemConditionsSwitchNotetags','setHelpWindowItem','isSoleArmorType','Scene_Shop_doBuy','commandBuyItemsEquipsCore','Step1Start','wvoiR','LayoutStyle','getItemEffectsTpRecoveryLabel','NXmST','XdfrH','blt','PurchaseOnly','previousActor','optimize','KeyItems','Scene_Item_createCategoryWindow','SCOPE','Scene_Shop_onCategoryCancel','eXoVl','DrawBackRect','Window_EquipStatus_refresh','zPeFw','changePaintOpacity','drawItemEffectsMpDamage','optimizeEquipments','KqzAS','removeStateBuffChanges','drawParamName','Scene_Shop_categoryWindowRect','Scene_Equip_statusWindowRect','isEquipChangeOk','_itemData','EoCex','QSNFQ','categoryStyle','smoothSelect','drawItemKeyData','successRate','playBuzzerSound','EFFECT_REMOVE_BUFF','NxHNP','cursorLeft','hQzjG','LugYh','createBitmap','getItemColor','ItemsEquipsCore','dRutu','removeBuff','onTouchOk','createSellWindow','ItemMenuStatusRect','onSlotOk','paramJS','_commandWindow','Step3End','Parse_Notetags_ParamValues','clearNewItem','TP\x20RECOVERY','getItemEffectsMpRecoveryText','lEDpk','ZRtHS','gainItem','rveQU','getItemDamageAmountLabelOriginal','equipTypes','smallParamFontSize','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','isPlaytest','wGGDq','weapon','isMainMenuCoreMenuImageOptionAvailable','_statusWindow','drawItemCustomEntries','LabelDamageTP','colSpacing','onCategoryCancelItemsEquipsCore','AJEsZ','process_VisuMZ_ItemsEquipsCore_Notetags','MvxQp','_buyWindowLastIndex','_dummyWindow','_goodsCount','sell','Window_EquipCommand_initialize','GqfWG','isShiftShortcutKeyForRemove','aHBSH','kZjqx','Scene_Shop_onBuyCancel','drawText','min','sUIKA','OzAJv','_equips','createCategoryWindow','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','SluuI','xKtEf','QNnMi','joMmw','currencyUnit','getItemEffectsTpDamageLabel','onTouchSelectModernControls','sJZWX','uiMenuStyle','DRcBO','TetXf','TlqWY','armor','Scene_Shop_commandBuy','releaseUnequippableItems','_tempActorB','params','sLdue','isBattleTest','iconHeight','MaYKA','postCreateSlotWindowItemsEquipsCore','lJpUT','Gynth','isUseModernControls','_shopStatusMenuMode','fontSize','isClicked','FontColor','paramPlusItemsEquipsCoreCustomJS','_buyWindow','Text','onTouchCancel','DAMAGE\x20MULTIPLIER','Scene_Shop_numberWindowRect','List','canEquip','OdADX','pMRWe','iqoin','HP\x20DAMAGE','MKyea','drawItemScope','FxnkM','isTriggered','updateCommandNameWindow','Ozzdj','GgKMe','Mlzhu','buttonAssistLargeIncrement','Window_ItemList_maxCols','NByCR','AUezd','getItemDamageElementLabel','_slotId','iconWidth','getItemRepeatsLabel','Scene_Shop_sellWindowRect','addLoadListener','drawItemData','eiUYJ','equipSlotIndex','ceil','status','smoothScrollTo','flatHP','shouldCommandWindowExist','value','_itemWindow','SwitchBuy','WNgVM','rKPuV','Actors','BuyPriceJS','onCategoryCancel','0000','aCgrp','QoL','innerHeight','isNewItem','MaxIcons','changeEquipById','EnableLayout','boxWidth','GYXqH','updatedLayoutStyle','RSsfC','activate','processShiftRemoveShortcut','JgGcu','VitBO','100%','onBuyCancelItemsEquipsCore','eGfMY','numItems','categoryList','commandStyleCheck','DrawParamJS','91673GodhFm','drawUpdatedAfterParamValue','QUeTZ','prototype','\x5cI[%1]','ParamValueFontSize','floor','Window_ItemList_drawItem','Scene_Item_create','PGpeZ','drawItem','DrawEquipData','vwDGP','drawParamText','ypGXo','isCursorMovable','LHwLH','middle','meetsItemConditions','fVIJn','processCursorMoveModernControls','Window_ShopSell_isEnabled','createNewLabelSprite','getMatchingInitEquip','AlwaysUsable','weapon-%1','speed','Game_Party_gainItem','aRDWs','heioi','_newLabelOpacity','Scene_Equip_createSlotWindow','item','Speed2000','isCancelled','map','getItemEffectsTpDamageText','commandSellItemsEquipsCore','drawItemStyleIconText','addState','OaONo','EqIli','getItemHitTypeLabel','CommandAddClear','addBuyCommand','_item','azrWq','HiddenItemB','Scene_Equip_onActorChange','getItemQuantityText','MaxMP','onTouchSelect','Step1End','refresh','format','Scene_Shop_sellingPrice','srddq','prepareNewEquipSlotsOnLoad','drawItemNumber','SXtvt','bitmap','weaponTypes','createItemWindow','%1-%2','isRightInputMode','Blacklist','getItemOccasionText','updateNewLabelOpacity','fillRect','TJCAv','keVle','getItemEffectsAddedStatesBuffsLabel','doBuy','fGoYe','includes','Window_Selectable_initialize','deactivate','MANUAL','commandNameWindowCenter','setHandler','statusWindowRectItemsEquipsCore','Param','getItemDamageAmountLabel','allowCreateStatusWindow','ARRAYEVAL','Scene_Equip_commandEquip','ZWghJ','drawEquipData','SGuiW','LqwtZ','isRepeated','drawItemEffectsHpRecovery','getItemEffectsMpDamageText','playEquip','qJtRX','KYufa','LZfmA','itemHasEquipLimit','equipAdjustHpMp','GXLNr','_tempActorA','addStateBuffChanges','SOxXq','helpWindowRectItemsEquipsCore','isDrawItemNumber','CONSUMABLE','getItemScopeText','RaEjN','callUpdateHelp','select','numberWindowRectItemsEquipsCore','DBJdC','getItemEffectsSelfTpGainText','mhp','wafZJ','oJtHe','CmdIconCancel','pagedown','EFFECT_REMOVE_STATE','_slotWindow','nObgF','FontFace','goldWindowRect','elfnG','parameters','versionId','members','maxItemAmount','_doubleTouch','deselect','sellWindowRect','gbeRc','addCancelCommand','MaxArmors','icon','defaultItemMax','CannotEquipMarker','itemEnableJS','hitIndex','HiddenItemA','helpAreaHeight','thUnu','ZaWmp','EVAL','categoryWindowRectItemsEquipsCore','yOiGg','Settings','YPoZN','EFFECT_RECOVER_HP','buy','drawItemEquipType','paramValueByName','Parse_Notetags_Category','isHoverEnabled','AllItems','CmdStyle','hPvtE','aYlgz','mNRqt','WRTaK','sRJWU','BLDmT','SwitchID','DDnwl','KnpzQ','commandNameWindowDrawText','Occasion%1','oIexw','push','SpeedNeg2000','_data','lineHeight','addSellCommand','ISmMt','Window_ShopBuy_refresh','ulOoN','baGrh','powerUpColor','filter','allowCommandWindowCursorUp','AdEXE','getItemEffectsMpDamageLabel','VZoFf','etypeId','commandBuy','zGeko','ShiftShortcutKey','meYlE','SwitchSell','gaugeLineHeight','Helca','bind','_numberWindow','slotWindowRect','getItemDamageAmountText','max','indexOf','vQISr','Scope%1','VZoiT','fontFace','XBqNW','prepare','MAT','paintOpacity','RFVbv','normalColor','refreshItemsEquipsCoreNoMenuImage','helpWindowRect','OffsetX','621WMtMEQ','ScopeRandomAllies','drawItemEffectsAddedStatesBuffs','price','EquipAdjustHpMp','#%1','Scene_Shop_prepare','chQIX','LwIdJ','resetShopSwitches','MaxHP','getItemDamageAmountTextOriginal','azmnR','BattleUsable','XaBTa','_customItemInfo','processHandling','akiAo','ParseWeaponNotetags','getItemEffectsRemovedStatesBuffsLabel','dZxBr','Hkxyx','drawCurrencyValue','checkShiftRemoveShortcut','isSceneShop','Window_ItemList_colSpacing','Game_Actor_changeEquip','exit','znjUi','bEkuf','rvqtt','buyWindowRectItemsEquipsCore','commandWindowRect','AMgxR','Categories','categoryNameWindowCenter','postCreateSellWindowItemsEquipsCore','MkRWy','value2','BorderRegExp','ExtDisplayedParams','CoreEngine','removeDebuff','buttonAssistKey2','drawItemDamageElement','onMenuImageLoad','rateMP','log','setShopStatusWindowMode','Scene_Equip_onSlotOk','process_VisuMZ_ItemsEquipsCore_RegExp','Scene_Item_categoryWindowRect','LabelRecoverHP','makeDeepCopy','hitType','ALssq','ojcsC','iFSSG','isEquipItem','SellPriceRate','cursorRight','systemColor','determineBaseSellingPrice','iconText','CmdIconClear','bjeTU','mxulZ','paramPlus','isClearCommandAdded','drawTextEx','modifiedBuyPriceItemsEquipsCore','commandEquip','tmMpQ','getItemSuccessRateLabel','xEnOW','gainTP','addEquipCommand','Consumable','vLxRI','VisuMZ_1_MainMenuCore','Step3Start','_sellWindow','MnUbf','drawCustomShopGraphicLoad','pjzxa','wYgAM','itemDataFontSize','IncludeShopItem','Style','FETFD','Scene_Equip_onSlotCancel','Scene_Shop_createCategoryWindow','HP\x20RECOVERY','gJYGC','mmp','onCategoryOk','cursorDown','commandStyle','isUseItemsEquipsCoreUpdatedLayout','Window_ItemCategory_setItemWindow','replace','DEF','buttonAssistCategory','NKBjY','Enable','Scene_Equip_slotWindowRect','Window_ItemCategory_initialize','Translucent','background','match','tirem','jvRwK','convertInitEquipsToItems','resetTextColor','DrawItemData','Sdbsp','onActorChange','FUNC','Scene_Item_itemWindowRect','buttonAssistText3','getNextAvailableEtypeId','CRzkH','Scene_Shop_doSell','Ezosg','_shopStatusMenuAlly','drawIcon','DrawIcons','OKIcs','lqNBO','Icon','255149iigpRM','fill','type','ItemScene','W%1','Speed0','tKHHs','getItemEffectsHpDamageText','onSellOkItemsEquipsCore','cursorPageup','diAzw','fontSizeRatio','LabelDamageMP','_calculatingJSParameters','selfTP','category','commandWindowRectItemsEquipsCore','rpYMA','Game_Actor_discardEquip','409188kFawQY','armorTypes','ARRAYSTRUCT','OVoUD','drawItemDamage','alDEx','hhrgK','zfBmS','left','nonOptimizeEtypes','ShowShopStatus','reloadMapIfUpdated','<%1:[\x20]([\x5c+\x5c-]\x5cd+)>','Scene_Shop_goldWindowRect','hide','buttonAssistSlotWindowShift','Scene_Shop_onSellOk','WlPGL','_handlers','isUseParamNamesWithIcons','PWfAk','ConvertNumberToString','VisuMZ_1_BattleCore','MgyPz','auto','Scene_Equip_create','setBackgroundType','onSlotCancel','object','allowShiftScrolling','getItemEffectsHpDamageLabel','Scene_Shop_activateSellWindow','drawActorCharacter','UtvCR','prepareItemCustomData','mpRate','MenuPortraits','_newLabelSprites','_categoryNameWindow','prepareRefreshItemsEquipsCoreLayout','hideNewLabelSprites','AllArmors','translucentOpacity','itemWindowRect','znrUx','registerCommand','Nonconsumable','KXdKJ','isShiftRemoveShortcutEnabled','clYsR','currentExt','return\x200','drawItemEffectsTpRecovery','uBfti','drawItemHitType','Window_ItemList_updateHelp','helpAreaTop','stxLh','_bypassReleaseUnequippableItemsItemsEquipsCore','SpeedNeg999','buttonAssistText1','Scene_Shop_buyWindowRect','setItem','?????','getItemEffectsAddedStatesBuffsText','Window_ShopCommand_initialize','egizM','drawItemSuccessRate','postCreateCategoryWindowItemsEquipsCore','DaAzz','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20MaxHP\x20=\x200;\x20let\x20MaxMP\x20=\x200;\x20let\x20ATK\x20=\x200;\x20let\x20DEF\x20=\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20MAT\x20=\x200;\x20let\x20MDF\x20=\x200;\x20let\x20AGI\x20=\x200;\x20let\x20LUK\x20=\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20[MaxHP,\x20MaxMP,\x20ATK,\x20DEF,\x20MAT,\x20MDF,\x20AGI,\x20LUK][paramId];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20','playCursorSound','JSON','mmGuW','createCommandNameWindow','_forcedSlots','WbLbe','code','_bypassNewLabel','pYIdg','damage','tTQJB','doQIl','SellPriceJS','RemoveEquipText','AlOoZ','GnUXV','StatusWindow','sHEEr','44119caDoVw','Scene_Equip_itemWindowRect','303038LbDOsG','GpBcR','getItemRepeatsText','aanGQ','createStatusWindow','drawItemEffectsMpRecovery','isCommandEnabled','MDNkv','setHp','ScopeRandomEnemies','itemPadding','isSoleWeaponType','itemWindowRectItemsEquipsCore','OJQXI','hbrFc','lwKct','_goods','buyWindowRect','afRFJ','Scene_Shop_statusWindowRect','DrawPortraitJS','getMenuImage','USER\x20TP\x20GAIN','paramId','Window_Selectable_update','sellPriceRate','itemTextAlign','getInputMultiButtonStrings','canShiftRemoveEquipment','HcWbg','tMnAs','itypeId','buNTg','powerDownColor','qZuzf','UBbRV','SUCCESS\x20RATE','Scene_Shop_onSellCancel','LabelDamageHP','actor','cfoQw','ElementWeapon','REPEAT','drawing','qxjBB','FadeLimit','wtypeId','AshWk','NonRemoveETypes','eBegy','VbjDi','down','vRgPX','consumable','ShopMenuStatusStandard','beiVv','description','dKJuu','cursorUp','width','szpHb','YCjbL','elementId','VisuMZ_0_CoreEngine','elements','statusWidth','isClearEquipOk','canUse','isOptimizeCommandAdded','Scene_ItemBase_activateItemWindow','mCDNF','setTopRow','MaxItems','Parse_Notetags_EnableJS','setNewItem','SaKDW','LabelConsume','mainAreaTop','Speed1000','commandName','show','forceChangeEquip','getItemSpeedText','XkDpl','vgyor','qmKXW','_list','WxRkT','_categoryWindow','NxRBo','forceChangeEquipSlots','create','LabelRepeats','gHjTz','getItemsEquipsCoreBackColor1','ARRAYNUM','isGoodShown','resetFontSettings','textSizeEx','jdakO','getItemConsumableText','MaxWeapons','ItemSceneAdjustItemList','+%1%','mainCommandWidth','getItemEffectsMpRecoveryLabel','Window_Selectable_refresh','ijAVY','clearNewLabelFromItem','hvfGI','ParseItemNotetags','ATK','FBEuD','1tLZzTq','initNewItemsList','addInnerChild','EquipScene','cancel','isEquipCommandAdded','_commandNameWindow','makeCommandList','buttonAssistOffset3','ParseClassNotetags','OffsetY','RdDZs','_newLabelOpacityChange','currentClass','drawItemStyleIcon','Scene_Shop_create','LqBWF','removeState','HIT\x20TYPE','drawNewLabelText','clamp','equips','AbdXW','Scene_Shop_createSellWindow','Game_Actor_tradeItemWithParty','nonRemovableEtypes','WLCtS','BtGeO','item-%1','createCategoryNameWindow','getItemDamageAmountLabelBattleCore','addOptimizeCommand','itemLineRect','toLowerCase','meetsItemConditionsNotetags','dBGmG','LabelRecoverMP','_scene','isBottomHelpMode','isEquipped','isEnabled','LabelHitType','SonqP','height','EFFECT_REMOVE_DEBUFF','TsHYS','pluKw','drawItemEffectsSelfTpGain','contents','REMOVED\x20EFFECTS','loadSystem','WaLYo','parse','ELKfa','getItemEffectsHpRecoveryText','rateHP','damageColor','TbEfL','drawActorParamDifference','UTajF','RpjQi','drawUpdatedParamName','drawParamsItemsEquipsCore','activateSellWindow','commandNameWindowDrawBackground','calcWindowHeight','nfjHH','VJDcX','AlreadyEquipMarker','+%1','TaXXe','vdjhW','visible','Himup','LGAfV','Window_EquipItem_isEnabled','mainFontFace','setupItemDamageTempActors','dOcgY','Scene_Load_reloadMapIfUpdated','updateMoneyAmount','tradeItemWithParty','IconSet','onSlotOkAutoSelect','vDaLN','getItemEffectsHpRecoveryLabel','FadeSpeed','qBncb','categoryItemTypes','isEquipCommandEnabled','bOBgd','LabelSpeed','getItemEffectsRemovedStatesBuffsText','Lagab','maxCols','paramchangeTextColor','EFFECT_RECOVER_MP','buttonAssistKey3','Game_BattlerBase_meetsItemConditions','armor-%1','lExxb','NonOptimizeETypes','NUM','changeBuff','keyItem','prepareNextScene','top','nextActor','RegExp','placeNewLabel','ygutL','ShopScene','_tempActor','DVewI','canConsumeItem','Parse_Notetags_ParamJS','_newLabelOpacityUpperLimit','toUpperCase','updateChangedSlots','EqMIK','currentSymbol','STR','ActorChangeEquipSlots','setValue','MP\x20DAMAGE','CmdCancelRename','limitedPageUpDownSceneCheck','KeyItemProtect','uiInputPosition','OnxkT','ParamChangeFontSize','isOptimizeCommandEnabled','processCursorSpecialCheckModernControls','isItem','VGNTe','possession','ScopeAlliesButUser','zwERl','onTouchSelectModern','postCreateItemsEquipsCore','446025OoLtJN','SzJfz','occasion','getItemsEquipsCoreBackColor2','uZzoQ','text','Window_ShopBuy_price','commandSell','CmdTextAlign','isBuyCommandEnabled','clear','EHfim','zkVzq','Whitelist','cursorPagedown','adjustHiddenShownGoods','slotWindowRectItemsEquipsCore','Parse_Notetags_EquipSlots','CmdIconEquip','processCursorHomeEndTrigger','LabelSelfGainTP','textWidth','sellingPrice','discardEquip','categoryNameWindowDrawBackground','meetsItemConditionsJS','isOpen','_resetFontSize','uiHelpPosition','placeItemNewLabel','MP\x20RECOVERY','addChild','LabelElement','xcGyy','createSlotWindow','processTouchModernControls','_money','newLabelEnabled','getItemEffectsTpRecoveryText','isSellCommandEnabled','_category','split','Gygcz','foreground','EFFECT_ADD_DEBUFF','LabelRemove','mainFontSize','THYuU','Window_EquipItem_includes','getDamageStyle','getItemSpeedLabel','mvroU','Step2Start','Scene_Shop_commandSell','Type','getItemEffects','right','buttonAssistItemListRequirement','drawItemDarkRect','clearEquipments','mainAreaBottom','maxItems','hideAdditionalSprites','BackRectColor','activateItemWindow','statusWindowRect','numberWindowRect','onSellOk','update','NotConsumable','pop','equipSlots','iconIndex','isClearCommandEnabled','ADDED\x20EFFECTS','updateHelp','drawItemEffectsHpDamage','SpeedNeg1999','LabelApply','\x5cI[%1]%2','ListWindowCols','shift','innerWidth','addItemCategory','bldPz','OCCASION','trim','KLNwK','center','ItemQuantityFmt','note','textColor','Game_Actor_forceChangeEquip','UofGo','LabelRecoverTP','categoryWindowRect','Parse_Notetags_Prices','doSell','categoryNameWindowDrawText','setObject','NeverUsable','drawItemCost','bMUuG','round','baseSellingPrice','XQkpv','ConvertParams','actorParams'];const _0x1d6c8a=_0x1b4e;(function(_0x259319,_0x6b897e){const _0x3a0118=_0x1b4e;while(!![]){try{const _0x1e2220=parseInt(_0x3a0118(0x3ac))*parseInt(_0x3a0118(0x339))+parseInt(_0x3a0118(0x33b))+-parseInt(_0x3a0118(0x179))+-parseInt(_0x3a0118(0x2e0))+parseInt(_0x3a0118(0x2cd))+-parseInt(_0x3a0118(0x438))+parseInt(_0x3a0118(0x24b))*parseInt(_0x3a0118(0x4df));if(_0x1e2220===_0x6b897e)break;else _0x259319['push'](_0x259319['shift']());}catch(_0x251e8e){_0x259319['push'](_0x259319['shift']());}}}(_0x18a9,0x3ca9b));function _0x1b4e(_0x3d0f66,_0x538bb4){return _0x1b4e=function(_0x18a94f,_0x1b4e95){_0x18a94f=_0x18a94f-0xde;let _0x4c26d2=_0x18a9[_0x18a94f];return _0x4c26d2;},_0x1b4e(_0x3d0f66,_0x538bb4);}var label=_0x1d6c8a(0xe4),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x1d6c8a(0x22b)](function(_0x58f545){const _0x358cf3=_0x1d6c8a;return _0x58f545[_0x358cf3(0x156)]&&_0x58f545[_0x358cf3(0x373)][_0x358cf3(0x1c3)]('['+label+']');})[0x0];VisuMZ[label][_0x1d6c8a(0x20b)]=VisuMZ[label][_0x1d6c8a(0x20b)]||{},VisuMZ[_0x1d6c8a(0x4a2)]=function(_0x2dc733,_0x193485){const _0x52dbb3=_0x1d6c8a;for(const _0x3b07ed in _0x193485){if(_0x3b07ed[_0x52dbb3(0x2b8)](/(.*):(.*)/i)){const _0x387ddd=String(RegExp['$1']),_0xda27f4=String(RegExp['$2'])[_0x52dbb3(0x421)]()['trim']();let _0x210ff7,_0x41412d,_0x3a6f7;switch(_0xda27f4){case _0x52dbb3(0x412):_0x210ff7=_0x193485[_0x3b07ed]!==''?Number(_0x193485[_0x3b07ed]):0x0;break;case _0x52dbb3(0x39a):_0x41412d=_0x193485[_0x3b07ed]!==''?JSON[_0x52dbb3(0x3e0)](_0x193485[_0x3b07ed]):[],_0x210ff7=_0x41412d[_0x52dbb3(0x19c)](_0x5098cd=>Number(_0x5098cd));break;case _0x52dbb3(0x208):_0x210ff7=_0x193485[_0x3b07ed]!==''?eval(_0x193485[_0x3b07ed]):null;break;case _0x52dbb3(0x1cd):_0x41412d=_0x193485[_0x3b07ed]!==''?JSON[_0x52dbb3(0x3e0)](_0x193485[_0x3b07ed]):[],_0x210ff7=_0x41412d[_0x52dbb3(0x19c)](_0x4a4443=>eval(_0x4a4443));break;case _0x52dbb3(0x328):_0x210ff7=_0x193485[_0x3b07ed]!==''?JSON['parse'](_0x193485[_0x3b07ed]):'';break;case'ARRAYJSON':_0x41412d=_0x193485[_0x3b07ed]!==''?JSON[_0x52dbb3(0x3e0)](_0x193485[_0x3b07ed]):[],_0x210ff7=_0x41412d['map'](_0x3caccb=>JSON[_0x52dbb3(0x3e0)](_0x3caccb));break;case _0x52dbb3(0x2c0):_0x210ff7=_0x193485[_0x3b07ed]!==''?new Function(JSON['parse'](_0x193485[_0x3b07ed])):new Function(_0x52dbb3(0x313));break;case'ARRAYFUNC':_0x41412d=_0x193485[_0x3b07ed]!==''?JSON['parse'](_0x193485[_0x3b07ed]):[],_0x210ff7=_0x41412d[_0x52dbb3(0x19c)](_0x125dbd=>new Function(JSON[_0x52dbb3(0x3e0)](_0x125dbd)));break;case _0x52dbb3(0x425):_0x210ff7=_0x193485[_0x3b07ed]!==''?String(_0x193485[_0x3b07ed]):'';break;case'ARRAYSTR':_0x41412d=_0x193485[_0x3b07ed]!==''?JSON[_0x52dbb3(0x3e0)](_0x193485[_0x3b07ed]):[],_0x210ff7=_0x41412d[_0x52dbb3(0x19c)](_0x2da7b8=>String(_0x2da7b8));break;case _0x52dbb3(0x506):_0x3a6f7=_0x193485[_0x3b07ed]!==''?JSON[_0x52dbb3(0x3e0)](_0x193485[_0x3b07ed]):{},_0x2dc733[_0x387ddd]={},VisuMZ[_0x52dbb3(0x4a2)](_0x2dc733[_0x387ddd],_0x3a6f7);continue;case _0x52dbb3(0x2e2):_0x41412d=_0x193485[_0x3b07ed]!==''?JSON[_0x52dbb3(0x3e0)](_0x193485[_0x3b07ed]):[],_0x210ff7=_0x41412d[_0x52dbb3(0x19c)](_0x383978=>VisuMZ[_0x52dbb3(0x4a2)]({},JSON[_0x52dbb3(0x3e0)](_0x383978)));break;default:continue;}_0x2dc733[_0x387ddd]=_0x210ff7;}}return _0x2dc733;},(_0x33546b=>{const _0x29f31e=_0x1d6c8a,_0x2a98cf=_0x33546b[_0x29f31e(0x51d)];for(const _0x578d80 of dependencies){if(!Imported[_0x578d80]){if(_0x29f31e(0x142)==='qYnvI'){this[_0x29f31e(0x38a)](_0x5e865e)[_0x29f31e(0x2b8)](/\\I\[(\d+)\]/i);const _0x17baa3=_0x4db12f(_0x278d32['$1'])||0x0,_0x2b000f=this[_0x29f31e(0x3cc)](_0x5e4e32),_0x450374=_0x2b000f['x']+_0x27cbba[_0x29f31e(0x17f)]((_0x2b000f['width']-_0x35a88d[_0x29f31e(0x14e)])/0x2),_0x5aae13=_0x2b000f['y']+(_0x2b000f[_0x29f31e(0x3d7)]-_0x24350a[_0x29f31e(0x12a)])/0x2;this['drawIcon'](_0x17baa3,_0x450374,_0x5aae13);}else{alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'[_0x29f31e(0x1af)](_0x2a98cf,_0x578d80)),SceneManager['exit']();break;}}}const _0x22e5c5=_0x33546b[_0x29f31e(0x373)];if(_0x22e5c5[_0x29f31e(0x2b8)](/\[Version[ ](.*?)\]/i)){const _0x46f3d8=Number(RegExp['$1']);_0x46f3d8!==VisuMZ[label]['version']&&(alert(_0x29f31e(0x116)[_0x29f31e(0x1af)](_0x2a98cf,_0x46f3d8)),SceneManager['exit']());}if(_0x22e5c5['match'](/\[Tier[ ](\d+)\]/i)){if('ZAcIQ'!=='ZAcIQ')_0x6fbb29[_0x29f31e(0x143)](_0x29f31e(0x1ee))&&this[_0x29f31e(0x446)](),_0x5c2c47[_0x29f31e(0x143)]('pageup')&&this['cursorPageup']();else{const _0x4958fe=Number(RegExp['$1']);_0x4958fe<tier?(alert(_0x29f31e(0xf9)['format'](_0x2a98cf,_0x4958fe,tier)),SceneManager[_0x29f31e(0x266)]()):_0x29f31e(0x12d)!=='OKSNX'?tier=Math[_0x29f31e(0x23c)](_0x4958fe,tier):this[_0x29f31e(0x327)]();}}VisuMZ[_0x29f31e(0x4a2)](VisuMZ[label][_0x29f31e(0x20b)],_0x33546b[_0x29f31e(0x1f5)]);})(pluginData),PluginManager[_0x1d6c8a(0x30d)](pluginData[_0x1d6c8a(0x51d)],_0x1d6c8a(0x426),_0x1bdcfa=>{const _0x2836cd=_0x1d6c8a;VisuMZ[_0x2836cd(0x4a2)](_0x1bdcfa,_0x1bdcfa);const _0x478376=_0x1bdcfa[_0x2836cd(0x15f)][_0x2836cd(0x19c)](_0xbb6a5f=>$gameActors[_0x2836cd(0x362)](_0xbb6a5f)),_0x470bc7=_0x1bdcfa[_0x2836cd(0x4ae)][_0x2836cd(0x19c)](_0x16f96b=>$dataSystem['equipTypes'][_0x2836cd(0x23d)](_0x16f96b[_0x2836cd(0x48e)]()));for(const _0x1f8b86 of _0x478376){if(!_0x1f8b86)continue;_0x1f8b86[_0x2836cd(0x395)](_0x470bc7);}}),PluginManager['registerCommand'](pluginData[_0x1d6c8a(0x51d)],'ActorResetEquipSlots',_0x2159ee=>{const _0x916c2e=_0x1d6c8a;VisuMZ['ConvertParams'](_0x2159ee,_0x2159ee);const _0x1cb45a=_0x2159ee[_0x916c2e(0x15f)][_0x916c2e(0x19c)](_0x41c164=>$gameActors[_0x916c2e(0x362)](_0x41c164));for(const _0x405d27 of _0x1cb45a){if(!_0x405d27)continue;_0x405d27[_0x916c2e(0x4b3)]();}}),PluginManager[_0x1d6c8a(0x30d)](pluginData[_0x1d6c8a(0x51d)],'BatchShop',_0x3324b5=>{const _0x2949b8=_0x1d6c8a;VisuMZ[_0x2949b8(0x4a2)](_0x3324b5,_0x3324b5);const _0x501eaa=[],_0x2c6948=_0x3324b5[_0x2949b8(0x1ba)][_0x2949b8(0x19c)](_0x293ce1=>_0x293ce1[_0x2949b8(0x421)]()[_0x2949b8(0x48e)]()),_0x596987=_0x3324b5[_0x2949b8(0x445)][_0x2949b8(0x19c)](_0x53ba2b=>_0x53ba2b[_0x2949b8(0x421)]()[_0x2949b8(0x48e)]()),_0x3e601f=_0x3324b5[_0x2949b8(0x1ad)]>=_0x3324b5[_0x2949b8(0x546)]?_0x3324b5['Step1Start']:_0x3324b5[_0x2949b8(0x1ad)],_0x40f44a=_0x3324b5[_0x2949b8(0x1ad)]>=_0x3324b5[_0x2949b8(0x546)]?_0x3324b5['Step1End']:_0x3324b5['Step1Start'],_0x324a5c=Array(_0x40f44a-_0x3e601f+0x1)[_0x2949b8(0x2ce)]()[_0x2949b8(0x19c)]((_0x4089e9,_0x2157c4)=>_0x3e601f+_0x2157c4);for(const _0x2aed2b of _0x324a5c){const _0x433c70=$dataItems[_0x2aed2b];if(!_0x433c70)continue;if(!VisuMZ[_0x2949b8(0xe4)][_0x2949b8(0x2a2)](_0x433c70,_0x2c6948,_0x596987))continue;_0x501eaa[_0x2949b8(0x221)]([0x0,_0x2aed2b,0x0,_0x433c70[_0x2949b8(0x24e)]]);}const _0x3a5751=_0x3324b5[_0x2949b8(0x4ff)]>=_0x3324b5[_0x2949b8(0x46c)]?_0x3324b5[_0x2949b8(0x46c)]:_0x3324b5[_0x2949b8(0x4ff)],_0x352f6d=_0x3324b5[_0x2949b8(0x4ff)]>=_0x3324b5['Step2Start']?_0x3324b5['Step2End']:_0x3324b5[_0x2949b8(0x46c)],_0x22faa6=Array(_0x352f6d-_0x3a5751+0x1)[_0x2949b8(0x2ce)]()['map']((_0x342f27,_0x319133)=>_0x3a5751+_0x319133);for(const _0x3c250e of _0x22faa6){const _0x323831=$dataWeapons[_0x3c250e];if(!_0x323831)continue;if(!VisuMZ[_0x2949b8(0xe4)][_0x2949b8(0x2a2)](_0x323831,_0x2c6948,_0x596987))continue;_0x501eaa[_0x2949b8(0x221)]([0x1,_0x3c250e,0x0,_0x323831[_0x2949b8(0x24e)]]);}const _0x50eb23=_0x3324b5['Step3End']>=_0x3324b5['Step3Start']?_0x3324b5['Step3Start']:_0x3324b5[_0x2949b8(0xed)],_0x32aec8=_0x3324b5['Step3End']>=_0x3324b5['Step3Start']?_0x3324b5[_0x2949b8(0xed)]:_0x3324b5[_0x2949b8(0x29b)],_0x5d5c81=Array(_0x32aec8-_0x50eb23+0x1)[_0x2949b8(0x2ce)]()[_0x2949b8(0x19c)]((_0x45a926,_0x17504c)=>_0x50eb23+_0x17504c);for(const _0x32c1dc of _0x5d5c81){const _0x8c0327=$dataArmors[_0x32c1dc];if(!_0x8c0327)continue;if(!VisuMZ[_0x2949b8(0xe4)][_0x2949b8(0x2a2)](_0x8c0327,_0x2c6948,_0x596987))continue;_0x501eaa[_0x2949b8(0x221)]([0x2,_0x32c1dc,0x0,_0x8c0327[_0x2949b8(0x24e)]]);}SceneManager[_0x2949b8(0x221)](Scene_Shop),SceneManager[_0x2949b8(0x415)](_0x501eaa,_0x3324b5[_0x2949b8(0x54d)]);}),VisuMZ['ItemsEquipsCore'][_0x1d6c8a(0x2a2)]=function(_0x176ccc,_0x2cfdcf,_0x43b179){const _0x4e42d3=_0x1d6c8a;if(_0x176ccc['name']['trim']()==='')return![];if(_0x176ccc[_0x4e42d3(0x51d)][_0x4e42d3(0x2b8)](/-----/i))return![];const _0x408c39=_0x176ccc[_0x4e42d3(0x4c3)];if(_0x2cfdcf[_0x4e42d3(0x535)]>0x0)for(const _0x59483d of _0x2cfdcf){if(_0x4e42d3(0x207)!==_0x4e42d3(0x128)){if(!_0x59483d)continue;if(_0x408c39[_0x4e42d3(0x1c3)](_0x59483d))return![];}else _0x2b2f00[_0x4e42d3(0x4c3)][_0x4e42d3(0x221)](_0x263aa0[_0x4e42d3(0x421)]()[_0x4e42d3(0x48e)]());}if(_0x43b179[_0x4e42d3(0x535)]>0x0){for(const _0x53b02f of _0x43b179){if(!_0x53b02f)continue;if(_0x408c39['includes'](_0x53b02f))return!![];}return![];}return!![];},VisuMZ[_0x1d6c8a(0xe4)][_0x1d6c8a(0x4f5)]=Scene_Boot['prototype']['onDatabaseLoaded'],Scene_Boot[_0x1d6c8a(0x17c)]['onDatabaseLoaded']=function(){const _0x1830ff=_0x1d6c8a;this[_0x1830ff(0x27d)](),VisuMZ[_0x1830ff(0xe4)][_0x1830ff(0x4f5)][_0x1830ff(0x4e1)](this),this[_0x1830ff(0x104)]();},Scene_Boot['prototype'][_0x1d6c8a(0x27d)]=function(){const _0x171bd7=_0x1d6c8a;VisuMZ['ItemsEquipsCore'][_0x171bd7(0x418)]={},VisuMZ[_0x171bd7(0xe4)]['RegExp']['EquipParams']=[],VisuMZ['ItemsEquipsCore'][_0x171bd7(0x418)][_0x171bd7(0x272)]=[];const _0x2b912d=[_0x171bd7(0x255),_0x171bd7(0x1ab),_0x171bd7(0x3aa),_0x171bd7(0x2b0),_0x171bd7(0x244),'MDF','AGI',_0x171bd7(0x4a6)];for(const _0x734bd4 of _0x2b912d){const _0x161648=_0x171bd7(0x2ec)[_0x171bd7(0x1af)](_0x734bd4);VisuMZ[_0x171bd7(0xe4)][_0x171bd7(0x418)][_0x171bd7(0x53c)]['push'](new RegExp(_0x161648,'i'));const _0x3b248a=_0x171bd7(0x518)[_0x171bd7(0x1af)](_0x734bd4);VisuMZ['ItemsEquipsCore'][_0x171bd7(0x418)][_0x171bd7(0x272)][_0x171bd7(0x221)](new RegExp(_0x3b248a,'g'));}},Scene_Boot[_0x1d6c8a(0x17c)][_0x1d6c8a(0x104)]=function(){const _0x280f40=_0x1d6c8a;if(VisuMZ['ParseAllNotetags'])return;this[_0x280f40(0x4e0)]();const _0x17b009=[$dataItems,$dataWeapons,$dataArmors];for(const _0x228710 of _0x17b009){for(const _0x4acc0d of _0x228710){if(_0x280f40(0x374)===_0x280f40(0x374)){if(!_0x4acc0d)continue;VisuMZ[_0x280f40(0xe4)][_0x280f40(0x211)](_0x4acc0d,_0x228710),VisuMZ[_0x280f40(0xe4)][_0x280f40(0x498)](_0x4acc0d,_0x228710),VisuMZ[_0x280f40(0xe4)][_0x280f40(0xee)](_0x4acc0d,_0x228710),VisuMZ['ItemsEquipsCore']['Parse_Notetags_ParamJS'](_0x4acc0d,_0x228710),VisuMZ['ItemsEquipsCore'][_0x280f40(0x384)](_0x4acc0d,_0x228710);}else{this['_calculatingJSParameters']=!![];const _0xa8754b=_0x57f8b6[_0x280f40(0xe4)][_0x280f40(0xeb)][_0x36bd2f]['call'](this,_0x2d9a31,_0x27baec);return this[_0x280f40(0x2da)]=![],_0xa8754b;}}}},Scene_Boot[_0x1d6c8a(0x17c)]['process_VisuMZ_ItemsEquipsCore_EquipSlots']=function(){const _0x560592=_0x1d6c8a;for(const _0x51dad7 of $dataClasses){if(_0x560592(0x282)!==_0x560592(0x284)){if(!_0x51dad7)continue;VisuMZ[_0x560592(0xe4)]['Parse_Notetags_EquipSlots'](_0x51dad7);}else{const _0x489194=_0x6902dc['battleMembers']()[_0x560592(0x23d)](_0x5e3959),_0x2839d2=_0x48bd10+_0x1883e5+_0x489194*_0x281ad3;this[_0x560592(0x558)](_0x4ce37c[_0x560592(0x13b)](this['_item'])),this[_0x560592(0x300)](_0x32326d,_0x2839d2+_0x2528d6/0x2,_0x7aeb20);let _0x21cbe0=_0x57f2f0;for(const _0x25485d of _0x548b1a){const _0x295bc5=_0x21cbe0-(_0x57205c-_0x2f5cca)/0x2;this['drawActorParamDifference'](_0x24c8ae,_0x25485d,_0x2839d2,_0x295bc5,_0x5bee6c),_0x21cbe0+=_0x4d327d;}}}},VisuMZ[_0x1d6c8a(0xe4)][_0x1d6c8a(0x3b5)]=VisuMZ[_0x1d6c8a(0x3b5)],VisuMZ[_0x1d6c8a(0x3b5)]=function(_0x18de4c){const _0x323993=_0x1d6c8a;VisuMZ[_0x323993(0xe4)]['ParseClassNotetags'][_0x323993(0x4e1)](this,_0x18de4c),VisuMZ[_0x323993(0xe4)]['Parse_Notetags_EquipSlots'](_0x18de4c);},VisuMZ[_0x1d6c8a(0xe4)]['ParseItemNotetags']=VisuMZ[_0x1d6c8a(0x3a9)],VisuMZ['ParseItemNotetags']=function(_0x34078a){const _0x146c60=_0x1d6c8a;VisuMZ[_0x146c60(0xe4)][_0x146c60(0x3a9)][_0x146c60(0x4e1)](this,_0x34078a),VisuMZ[_0x146c60(0xe4)][_0x146c60(0x4c0)](_0x34078a,$dataItems);},VisuMZ[_0x1d6c8a(0xe4)]['ParseWeaponNotetags']=VisuMZ['ParseWeaponNotetags'],VisuMZ['ParseWeaponNotetags']=function(_0x15510c){const _0x3a7221=_0x1d6c8a;VisuMZ['ItemsEquipsCore'][_0x3a7221(0x25d)][_0x3a7221(0x4e1)](this,_0x15510c),VisuMZ['ItemsEquipsCore'][_0x3a7221(0x4c0)](_0x15510c,$dataWeapons);},VisuMZ[_0x1d6c8a(0xe4)]['ParseArmorNotetags']=VisuMZ[_0x1d6c8a(0x4b0)],VisuMZ[_0x1d6c8a(0x4b0)]=function(_0x1dcc0b){const _0x373e94=_0x1d6c8a;VisuMZ[_0x373e94(0xe4)][_0x373e94(0x4b0)][_0x373e94(0x4e1)](this,_0x1dcc0b),VisuMZ[_0x373e94(0xe4)]['Parse_Notetags_Batch'](_0x1dcc0b,$dataArmors);},VisuMZ[_0x1d6c8a(0xe4)][_0x1d6c8a(0x449)]=function(_0x5e2384){const _0x4b61b9=_0x1d6c8a;_0x5e2384['equipSlots']=[];if(!BattleManager[_0x4b61b9(0x129)]()&&_0x5e2384[_0x4b61b9(0x492)][_0x4b61b9(0x2b8)](/<EQUIP SLOTS>\s*([\s\S]*)\s*<\/EQUIP SLOTS>/i)){const _0x5eec56=String(RegExp['$1'])['split'](/[\r\n]+/);for(const _0x1bc5c5 of _0x5eec56){if(_0x4b61b9(0x1f1)!==_0x4b61b9(0x1f1))return this[_0x4b61b9(0x1e0)]();else{const _0xe11895=$dataSystem['equipTypes'][_0x4b61b9(0x23d)](_0x1bc5c5[_0x4b61b9(0x48e)]());if(_0xe11895>0x0)_0x5e2384['equipSlots'][_0x4b61b9(0x221)](_0xe11895);}}}else for(const _0x16baea of $dataSystem[_0x4b61b9(0xf7)]){const _0x3b2933=$dataSystem['equipTypes'][_0x4b61b9(0x23d)](_0x16baea['trim']());if(_0x3b2933>0x0)_0x5e2384['equipSlots']['push'](_0x3b2933);}},VisuMZ[_0x1d6c8a(0xe4)]['Parse_Notetags_Batch']=function(_0x1eee37,_0x1347e9){const _0x11f91e=_0x1d6c8a;VisuMZ[_0x11f91e(0xe4)][_0x11f91e(0x211)](_0x1eee37,_0x1347e9),VisuMZ['ItemsEquipsCore']['Parse_Notetags_Prices'](_0x1eee37,_0x1347e9),VisuMZ['ItemsEquipsCore'][_0x11f91e(0xee)](_0x1eee37,_0x1347e9),VisuMZ['ItemsEquipsCore'][_0x11f91e(0x41f)](_0x1eee37,_0x1347e9),VisuMZ[_0x11f91e(0xe4)][_0x11f91e(0x384)](_0x1eee37,_0x1347e9);},VisuMZ[_0x1d6c8a(0xe4)]['Parse_Notetags_Category']=function(_0x393f46,_0x1b561c){const _0x47eac5=_0x1d6c8a;_0x393f46['categories']=[];const _0x1d8e61=_0x393f46[_0x47eac5(0x492)],_0x13eebf=_0x1d8e61[_0x47eac5(0x2b8)](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);if(_0x13eebf)for(const _0x4d2f31 of _0x13eebf){if(_0x47eac5(0x18c)==='ZstpI'){this[_0x47eac5(0x558)](this[_0x47eac5(0x3d4)](null));const _0x4a91fd=_0x50ba64[_0x47eac5(0xe4)]['Settings'][_0x47eac5(0x3af)],_0x1d051c=this[_0x47eac5(0x3cc)](_0x12ec74),_0x3382fa=_0x1d051c['y']+(this[_0x47eac5(0x224)]()-_0x24af16[_0x47eac5(0x12a)])/0x2,_0x4653f8=_0x403ebb[_0x47eac5(0x14e)]+0x4,_0x5dbcaa=_0x5c67d8[_0x47eac5(0x23c)](0x0,_0x1d051c[_0x47eac5(0x376)]-_0x4653f8);this['resetTextColor'](),this[_0x47eac5(0x2c8)](_0x4a91fd['RemoveEquipIcon'],_0x1d051c['x'],_0x3382fa),this[_0x47eac5(0x110)](_0x4a91fd[_0x47eac5(0x334)],_0x1d051c['x']+_0x4653f8,_0x1d051c['y'],_0x5dbcaa),this[_0x47eac5(0x558)](!![]);}else{_0x4d2f31[_0x47eac5(0x2b8)](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);const _0x38ee68=String(RegExp['$1'])['toUpperCase']()[_0x47eac5(0x48e)]()['split'](',');for(const _0x39bd32 of _0x38ee68){_0x393f46[_0x47eac5(0x4c3)][_0x47eac5(0x221)](_0x39bd32[_0x47eac5(0x48e)]());}}}if(_0x1d8e61[_0x47eac5(0x2b8)](/<(?:CATEGORY|CATEGORIES)>\s*([\s\S]*)\s*<\/(?:CATEGORY|CATEGORIES)>/i)){if('FBApJ'===_0x47eac5(0x122))_0x5bd2ab=0x0;else{const _0x944688=RegExp['$1'][_0x47eac5(0x461)](/[\r\n]+/);for(const _0x59c73f of _0x944688){'zNBUa'!==_0x47eac5(0x38f)?_0x393f46[_0x47eac5(0x4c3)][_0x47eac5(0x221)](_0x59c73f['toUpperCase']()['trim']()):this[_0x47eac5(0x327)]();}}}},VisuMZ[_0x1d6c8a(0xe4)][_0x1d6c8a(0x498)]=function(_0x1c994e,_0x15266f){const _0x43eb9b=_0x1d6c8a;_0x1c994e[_0x43eb9b(0x492)][_0x43eb9b(0x2b8)](/<PRICE:[ ](\d+)>/i)&&(_0x1c994e[_0x43eb9b(0x24e)]=Number(RegExp['$1']));},VisuMZ[_0x1d6c8a(0xe4)][_0x1d6c8a(0xee)]=function(_0x517214,_0x4c589f){const _0x16df2b=_0x1d6c8a;if(_0x4c589f===$dataItems)return;for(let _0x13f969=0x0;_0x13f969<0x8;_0x13f969++){if(_0x16df2b(0x2a0)===_0x16df2b(0x36d))return _0x228166[_0x16df2b(0xe4)][_0x16df2b(0x20b)][_0x16df2b(0x337)][_0x16df2b(0x2d2)];else{const _0x3e77f2=VisuMZ['ItemsEquipsCore'][_0x16df2b(0x418)][_0x16df2b(0x53c)][_0x13f969];if(_0x517214[_0x16df2b(0x492)][_0x16df2b(0x2b8)](_0x3e77f2)){if(_0x16df2b(0x516)===_0x16df2b(0x218)){const _0x4dcfa3=this[_0x16df2b(0x3cc)](this[_0x16df2b(0x4f7)]());let _0x54b628=this[_0x16df2b(0x38a)](this['index']());_0x54b628=_0x54b628['replace'](/\\I\[(\d+)\]/gi,''),_0x41bd1e[_0x16df2b(0x39c)](),this[_0x16df2b(0x3ec)](_0x54b628,_0x4dcfa3),this['commandNameWindowDrawText'](_0x54b628,_0x4dcfa3),this[_0x16df2b(0x1c7)](_0x54b628,_0x4dcfa3);}else _0x517214[_0x16df2b(0x127)][_0x13f969]=parseInt(RegExp['$1']);}}}},VisuMZ['ItemsEquipsCore'][_0x1d6c8a(0xeb)]={},VisuMZ[_0x1d6c8a(0xe4)][_0x1d6c8a(0x41f)]=function(_0x53b587,_0x1878da){const _0x4c4776=_0x1d6c8a;if(_0x1878da===$dataItems)return;if(_0x53b587[_0x4c4776(0x492)][_0x4c4776(0x2b8)](/<JS PARAMETERS>\s*([\s\S]*)\s*<\/JS PARAMETERS>/i)){const _0x3a3d63=String(RegExp['$1']),_0x107b00=(_0x1878da===$dataWeapons?_0x4c4776(0x2d1):_0x4c4776(0x4c4))[_0x4c4776(0x1af)](_0x53b587['id']),_0x4fb10f=_0x4c4776(0x326)['format'](_0x3a3d63);for(let _0x313178=0x0;_0x313178<0x8;_0x313178++){if(_0x4c4776(0x50c)===_0x4c4776(0x50c)){if(_0x3a3d63[_0x4c4776(0x2b8)](VisuMZ['ItemsEquipsCore'][_0x4c4776(0x418)]['BorderRegExp'][_0x313178])){const _0x200470=_0x4c4776(0x1b8)[_0x4c4776(0x1af)](_0x107b00,_0x313178);VisuMZ['ItemsEquipsCore'][_0x4c4776(0xeb)][_0x200470]=new Function(_0x4c4776(0x199),_0x4c4776(0x352),_0x4fb10f);}}else this['resetFontSettings'](),this[_0x4c4776(0x558)](!![]),this['prepareItemCustomData'](),this[_0x4c4776(0x285)]()?this[_0x4c4776(0x1d0)]():this[_0x4c4776(0x152)](),this['drawCustomShopGraphic']();}}},VisuMZ[_0x1d6c8a(0xe4)]['itemEnableJS']={},VisuMZ[_0x1d6c8a(0xe4)][_0x1d6c8a(0x384)]=function(_0x1e7c8e,_0x56ca64){const _0x147a88=_0x1d6c8a;if(_0x56ca64!==$dataItems)return;if(_0x1e7c8e[_0x147a88(0x492)][_0x147a88(0x2b8)](/<JS ITEM ENABLE>\s*([\s\S]*)\s*<\/JS ITEM ENABLE>/i)){if(_0x147a88(0x2de)!=='rpYMA'){if(!this[_0x147a88(0x285)]()&&!_0x4ed172['isItem'](this[_0x147a88(0x1a6)]))return![];if(_0x4afb5d[_0x147a88(0x4cc)](this[_0x147a88(0x1a6)])&&!_0x1707ba['optKeyItemsNumber']){const _0x353d98=_0x46c041[_0x147a88(0x414)];this[_0x147a88(0x566)](_0x353d98,_0x4d633a,_0x52dd2d,_0x5dbc7e,!![],_0x147a88(0x490));}else{const _0x2a96a4=_0x328a14[_0x147a88(0x433)];this[_0x147a88(0x566)](_0x2a96a4,_0x3a1053,_0x16c5d2,_0x524ddc,!![]);const _0x3c11d6=this[_0x147a88(0x1aa)]();this[_0x147a88(0x566)](_0x3c11d6,_0x3b66b7,_0x319449,_0x212653,![],_0x147a88(0x470));}return this['drawItemDarkRect'](_0x3e0f53,_0x1fb942,_0x13a04e),this[_0x147a88(0x39c)](),!![];}else{const _0x45f226=String(RegExp['$1']),_0x529cc3=_0x147a88(0x4f0)[_0x147a88(0x1af)](_0x45f226);VisuMZ['ItemsEquipsCore']['itemEnableJS'][_0x1e7c8e['id']]=new Function(_0x147a88(0x199),_0x529cc3);}}},DataManager[_0x1d6c8a(0x4cc)]=function(_0x528f22){const _0x9a2d72=_0x1d6c8a;return this[_0x9a2d72(0x431)](_0x528f22)&&_0x528f22[_0x9a2d72(0x35a)]===0x2;},DataManager['maxItemAmount']=function(_0x346a70){const _0x3db7e0=_0x1d6c8a;if(!_0x346a70)return 0x63;else return _0x346a70[_0x3db7e0(0x492)][_0x3db7e0(0x2b8)](/<MAX:[ ](\d+)>/i)?parseInt(RegExp['$1']):this[_0x3db7e0(0x200)](_0x346a70);},DataManager[_0x1d6c8a(0x200)]=function(_0x29b0f3){const _0x2270a1=_0x1d6c8a;if(this[_0x2270a1(0x431)](_0x29b0f3)){if(_0x2270a1(0x2c4)===_0x2270a1(0x4fe))_0x2c53fd=_0x2270a1(0x487)['format'](_0x1fb754,_0x3c5837);else return VisuMZ[_0x2270a1(0xe4)][_0x2270a1(0x20b)][_0x2270a1(0x2d0)][_0x2270a1(0x383)];}else{if(this[_0x2270a1(0x53b)](_0x29b0f3)){if(_0x2270a1(0x11e)!==_0x2270a1(0xf2))return VisuMZ[_0x2270a1(0xe4)][_0x2270a1(0x20b)][_0x2270a1(0x2d0)][_0x2270a1(0x3a0)];else _0x543e31=_0x17c561+_0x32f536-_0x3c8957[_0x2270a1(0x376)];}else{if(this[_0x2270a1(0x4c5)](_0x29b0f3))return VisuMZ[_0x2270a1(0xe4)][_0x2270a1(0x20b)]['ItemScene'][_0x2270a1(0x1fe)];}}},ColorManager[_0x1d6c8a(0xe3)]=function(_0x159cf4){const _0x5e7731=_0x1d6c8a;if(!_0x159cf4){if(_0x5e7731(0x228)===_0x5e7731(0x147))_0x381e6f=this[_0x5e7731(0x48a)]-_0x10b561;else return this[_0x5e7731(0x247)]();}else{if(_0x159cf4[_0x5e7731(0x492)]['match'](/<COLOR:[ ](\d+)>/i))return this[_0x5e7731(0x493)](Number(RegExp['$1'])[_0x5e7731(0x3c0)](0x0,0x1f));else return _0x159cf4[_0x5e7731(0x492)]['match'](/<COLOR:[ ]#(.*)>/i)?'#'+String(RegExp['$1']):this[_0x5e7731(0x247)]();}},ColorManager[_0x1d6c8a(0x500)]=function(_0x40700c){const _0x663821=_0x1d6c8a;_0x40700c=String(_0x40700c);if(_0x40700c['match'](/#(.*)/i))return'Wbifz'!=='Wbifz'?this[_0x663821(0x391)]?this[_0x663821(0x475)]():0x4:_0x663821(0x250)['format'](String(RegExp['$1']));else{if('fHyts'!=='hFXeY')return this['textColor'](Number(_0x40700c));else this[_0x663821(0x327)]();}},SceneManager[_0x1d6c8a(0x263)]=function(){const _0x2d87cc=_0x1d6c8a;return this[_0x2d87cc(0x3d1)]&&this[_0x2d87cc(0x3d1)][_0x2d87cc(0x527)]===Scene_Shop;},Game_Temp[_0x1d6c8a(0x17c)]['newLabelEnabled']=function(){const _0x59afe5=_0x1d6c8a;if(this[_0x59afe5(0x32e)])return![];return VisuMZ[_0x59afe5(0xe4)][_0x59afe5(0x20b)][_0x59afe5(0x53e)]['Enable'];},VisuMZ[_0x1d6c8a(0x371)]=VisuMZ[_0x1d6c8a(0xe4)][_0x1d6c8a(0x20b)][_0x1d6c8a(0x337)]['MultiplierStandard'],VisuMZ[_0x1d6c8a(0xe4)]['Game_BattlerBase_param']=Game_BattlerBase[_0x1d6c8a(0x17c)][_0x1d6c8a(0x4e8)],Game_BattlerBase['prototype']['param']=function(_0x590a8f){const _0x219783=_0x1d6c8a;if(this[_0x219783(0x130)]){if(_0x219783(0x381)===_0x219783(0x523)){const _0x356b92=0x0,_0x165ff5=this[_0x219783(0x318)](),_0x555200=_0x40adc2[_0x219783(0x16a)],_0x16418b=this[_0x219783(0x205)]();return new _0x4911a7(_0x356b92,_0x165ff5,_0x555200,_0x16418b);}else return this[_0x219783(0x2c7)]?VisuMZ[_0x219783(0x371)]:0x1;}else return _0x219783(0x268)!==_0x219783(0x268)?(_0x13bf19=_0x92e8d3(_0x4d3b30),_0x2bfbf8[_0x219783(0x2b8)](/#(.*)/i)?_0x219783(0x250)['format'](_0x34f6b5(_0x279e12['$1'])):this[_0x219783(0x493)](_0x297932(_0xfb8799))):VisuMZ[_0x219783(0xe4)]['Game_BattlerBase_param'][_0x219783(0x4e1)](this,_0x590a8f);},VisuMZ[_0x1d6c8a(0xe4)][_0x1d6c8a(0x40e)]=Game_BattlerBase[_0x1d6c8a(0x17c)][_0x1d6c8a(0x18b)],Game_BattlerBase[_0x1d6c8a(0x17c)][_0x1d6c8a(0x18b)]=function(_0x4e7a8a){const _0x4e9416=_0x1d6c8a;if(!_0x4e7a8a)return![];if(!VisuMZ[_0x4e9416(0xe4)][_0x4e9416(0x40e)][_0x4e9416(0x4e1)](this,_0x4e7a8a))return![];if(!this[_0x4e9416(0x3ce)](_0x4e7a8a))return![];if(!this[_0x4e9416(0x451)](_0x4e7a8a))return![];return!![];},Game_BattlerBase['prototype'][_0x1d6c8a(0x3ce)]=function(_0x16b7a3){const _0x57720e=_0x1d6c8a;if(!this[_0x57720e(0x541)](_0x16b7a3))return![];return!![];},Game_BattlerBase[_0x1d6c8a(0x17c)][_0x1d6c8a(0x541)]=function(_0x4b0177){const _0x37a7f1=_0x1d6c8a,_0xae5d73=_0x4b0177['note'];if(_0xae5d73['match'](/<ENABLE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x3983ed=JSON[_0x37a7f1(0x3e0)]('['+RegExp['$1'][_0x37a7f1(0x2b8)](/\d+/g)+']');for(const _0x148cc7 of _0x3983ed){if(_0x37a7f1(0x1df)===_0x37a7f1(0x1c2))return _0x37a7f1(0x4b9)[_0x37a7f1(0x1af)](_0x1ffea4['round'](_0x2b797b*0x64));else{if(!$gameSwitches['value'](_0x148cc7))return![];}}return!![];}if(_0xae5d73[_0x37a7f1(0x2b8)](/<ENABLE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0xa62f4e=JSON[_0x37a7f1(0x3e0)]('['+RegExp['$1'][_0x37a7f1(0x2b8)](/\d+/g)+']');for(const _0x14de00 of _0xa62f4e){if(!$gameSwitches[_0x37a7f1(0x15a)](_0x14de00))return![];}return!![];}if(_0xae5d73['match'](/<ENABLE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x4b4794=JSON[_0x37a7f1(0x3e0)]('['+RegExp['$1'][_0x37a7f1(0x2b8)](/\d+/g)+']');for(const _0xfceb94 of _0x4b4794){if($gameSwitches[_0x37a7f1(0x15a)](_0xfceb94))return!![];}return![];}if(_0xae5d73[_0x37a7f1(0x2b8)](/<DISABLE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x37a7f1(0x21c)!=='DDnwl')return _0x15b087[_0x37a7f1(0x454)];else{const _0x1283d6=JSON[_0x37a7f1(0x3e0)]('['+RegExp['$1'][_0x37a7f1(0x2b8)](/\d+/g)+']');for(const _0x5319f0 of _0x1283d6){if(!$gameSwitches['value'](_0x5319f0))return!![];}return![];}}if(_0xae5d73['match'](/<DISABLE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if('tTQJB'!==_0x37a7f1(0x331))this[_0x37a7f1(0x307)]();else{const _0x119ce9=JSON[_0x37a7f1(0x3e0)]('['+RegExp['$1'][_0x37a7f1(0x2b8)](/\d+/g)+']');for(const _0x16559a of _0x119ce9){if(_0x37a7f1(0x3ee)===_0x37a7f1(0x325)){if(!this[_0x37a7f1(0x41c)]){const _0xcd288e=_0x3e624a['makeDeepCopy'](this);_0xcd288e[_0x37a7f1(0x41c)]=!![],_0x408490[_0x37a7f1(0xe4)]['Game_Actor_changeEquip'][_0x37a7f1(0x4e1)](this,_0x54d04b,_0x46d786),this['equipAdjustHpMp'](_0xcd288e);}else _0x53e843[_0x37a7f1(0xe4)][_0x37a7f1(0x265)]['call'](this,_0x3a642c,_0x52ae28);}else{if(!$gameSwitches[_0x37a7f1(0x15a)](_0x16559a))return!![];}}return![];}}if(_0xae5d73[_0x37a7f1(0x2b8)](/<DISABLE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x37a7f1(0x1bf)===_0x37a7f1(0x226))return this[_0x37a7f1(0x2ad)]()?this[_0x37a7f1(0x23a)]():_0x293d42[_0x37a7f1(0xe4)][_0x37a7f1(0x33a)][_0x37a7f1(0x4e1)](this);else{const _0x3f6dd9=JSON[_0x37a7f1(0x3e0)]('['+RegExp['$1'][_0x37a7f1(0x2b8)](/\d+/g)+']');for(const _0x36b2d7 of _0x3f6dd9){if(_0x37a7f1(0x410)!==_0x37a7f1(0x410))return this[_0x37a7f1(0x2ad)]()?!![]:_0x3f2c0f[_0x37a7f1(0xe4)][_0x37a7f1(0x20b)][_0x37a7f1(0x2d0)]['ShowShopStatus'];else{if($gameSwitches[_0x37a7f1(0x15a)](_0x36b2d7))return![];}}return!![];}}return!![];},Game_BattlerBase[_0x1d6c8a(0x17c)]['meetsItemConditionsJS']=function(_0x477bdc){const _0x55dcd0=_0x1d6c8a,_0x4e58f5=_0x477bdc[_0x55dcd0(0x492)],_0x5abc5a=VisuMZ[_0x55dcd0(0xe4)][_0x55dcd0(0x202)];return _0x5abc5a[_0x477bdc['id']]?_0x5abc5a[_0x477bdc['id']]['call'](this,_0x477bdc):!![];},Game_Actor['prototype']['initEquips']=function(_0x2413f1){const _0x4839a1=_0x1d6c8a;_0x2413f1=this[_0x4839a1(0x2bb)](_0x2413f1);const _0x133580=this[_0x4839a1(0x47f)]();this[_0x4839a1(0x114)]=[];for(let _0x3ef5a6=0x0;_0x3ef5a6<_0x133580[_0x4839a1(0x535)];_0x3ef5a6++){this[_0x4839a1(0x114)][_0x3ef5a6]=new Game_Item();}for(let _0x5d8f23=0x0;_0x5d8f23<_0x133580[_0x4839a1(0x535)];_0x5d8f23++){const _0x4236a4=_0x133580[_0x5d8f23],_0x26fdcc=this[_0x4839a1(0x190)](_0x2413f1,_0x4236a4);if(this[_0x4839a1(0x13b)](_0x26fdcc))this['_equips'][_0x5d8f23]['setObject'](_0x26fdcc);}this[_0x4839a1(0x125)](!![]),this[_0x4839a1(0x1ae)]();},Game_Actor[_0x1d6c8a(0x17c)]['convertInitEquipsToItems']=function(_0x24e785){const _0x19f91e=_0x1d6c8a,_0x167fd9=[];for(let _0x3f65bb=0x0;_0x3f65bb<_0x24e785[_0x19f91e(0x535)];_0x3f65bb++){const _0x177bc6=_0x24e785[_0x3f65bb];if(_0x177bc6<=0x0)continue;const _0x4b949b=$dataSystem[_0x19f91e(0xf7)][_0x3f65bb+0x1];if(_0x4b949b===$dataSystem[_0x19f91e(0xf7)][0x1]||_0x3f65bb===0x1&&this[_0x19f91e(0x540)]())_0x167fd9['push']($dataWeapons[_0x177bc6]);else{if(BattleManager[_0x19f91e(0x129)]()){if(_0x19f91e(0x43c)===_0x19f91e(0x38e))return _0x23eaf2[_0x19f91e(0x17c)][_0x19f91e(0x249)][_0x19f91e(0x4e1)](this);else{const _0xd0d35=$dataArmors[_0x177bc6];if(_0xd0d35[_0x19f91e(0x230)]===_0x3f65bb+0x1){if(_0x19f91e(0x2e5)!==_0x19f91e(0x2e5)){if(_0x114b2[_0x19f91e(0x3d1)]['constructor']===_0x1f63cb)return _0x4d2143[_0x19f91e(0xe4)][_0x19f91e(0x149)][_0x19f91e(0x4e1)](this);else return _0x26f2fc['_scene']['constructor']===_0x2bf05b?_0x5a3063[_0x19f91e(0xe4)][_0x19f91e(0x149)][_0x19f91e(0x4e1)](this):_0x383250[_0x19f91e(0xe4)][_0x19f91e(0x20b)]['ItemScene'][_0x19f91e(0x488)];}else _0x167fd9['push'](_0xd0d35);}}}else{const _0x58c33d=$dataArmors[_0x177bc6];if(_0x58c33d[_0x19f91e(0x230)]===_0x3f65bb+0x1){if('QQmJO'==='SOxyD')return _0x2c9a55[_0x19f91e(0x17c)][_0x19f91e(0x249)][_0x19f91e(0x4e1)](this);else _0x167fd9[_0x19f91e(0x221)](_0x58c33d);}}}}return _0x167fd9;},Game_Actor[_0x1d6c8a(0x17c)][_0x1d6c8a(0x190)]=function(_0xfebedd,_0x3d95cb){const _0x1aa6cf=_0x1d6c8a;for(const _0x11b974 of _0xfebedd){if(!_0x11b974)continue;if(_0x11b974[_0x1aa6cf(0x230)]===_0x3d95cb){if('MHMtM'!=='DhgPe')return _0xfebedd[_0x1aa6cf(0x526)](_0xfebedd[_0x1aa6cf(0x23d)](_0x11b974),0x1),_0x11b974;else _0x506c36=this['_actor'][_0x1aa6cf(0x210)](_0x257179,!![]);}}return null;},Game_Actor[_0x1d6c8a(0x17c)]['equipSlots']=function(){const _0x57d282=_0x1d6c8a,_0x2cc500=JsonEx[_0x57d282(0x280)](this[_0x57d282(0x32b)]||this[_0x57d282(0x3b9)]()[_0x57d282(0x47f)]);if(_0x2cc500[_0x57d282(0x535)]>=0x2&&this[_0x57d282(0x540)]())_0x2cc500[0x1]=0x1;return _0x2cc500;},Game_Actor['prototype'][_0x1d6c8a(0x395)]=function(_0x301372){const _0x4c5c7c=_0x1d6c8a;_0x301372['remove'](0x0),_0x301372[_0x4c5c7c(0x4be)](-0x1),this[_0x4c5c7c(0x32b)]=_0x301372,this[_0x4c5c7c(0x1ae)](),this[_0x4c5c7c(0x422)]();},Game_Actor[_0x1d6c8a(0x17c)][_0x1d6c8a(0x4b3)]=function(){const _0x2e5ff0=_0x1d6c8a;this[_0x2e5ff0(0x32b)]=undefined,this[_0x2e5ff0(0x1ae)](),this[_0x2e5ff0(0x422)]();},Game_Actor[_0x1d6c8a(0x17c)]['updateChangedSlots']=function(){const _0x319f8e=_0x1d6c8a;let _0x3747da=this[_0x319f8e(0x47f)]()[_0x319f8e(0x535)];while(this[_0x319f8e(0x114)][_0x319f8e(0x535)]>_0x3747da){const _0x13fa71=this[_0x319f8e(0x114)][this[_0x319f8e(0x114)][_0x319f8e(0x535)]-0x1];_0x13fa71&&_0x13fa71[_0x319f8e(0x2fc)]()&&$gameParty[_0x319f8e(0xf4)](_0x13fa71[_0x319f8e(0x2fc)](),0x1),this[_0x319f8e(0x114)][_0x319f8e(0x47e)]();}while(_0x3747da>this[_0x319f8e(0x114)][_0x319f8e(0x535)]){this[_0x319f8e(0x114)]['push'](new Game_Item());}},Game_Actor[_0x1d6c8a(0x17c)][_0x1d6c8a(0x1b2)]=function(){const _0x10d6ed=_0x1d6c8a,_0x241e33=this['equipSlots']();for(let _0x8c64bb=0x0;_0x8c64bb<_0x241e33[_0x10d6ed(0x535)];_0x8c64bb++){if('QgIvp'===_0x10d6ed(0x1b4)){if(this[_0x10d6ed(0x37d)](_0x18b741))this['changeEquip'](_0x173f24,null);}else{if(!this[_0x10d6ed(0x114)][_0x8c64bb])this[_0x10d6ed(0x114)][_0x8c64bb]=new Game_Item();}}this[_0x10d6ed(0x125)](![]),this['refresh']();},VisuMZ['ItemsEquipsCore'][_0x1d6c8a(0x265)]=Game_Actor[_0x1d6c8a(0x17c)]['changeEquip'],Game_Actor[_0x1d6c8a(0x17c)][_0x1d6c8a(0x503)]=function(_0x2d6e4c,_0x461261){const _0x16c4e8=_0x1d6c8a;if(!this[_0x16c4e8(0x41c)]){const _0x2e764a=JsonEx['makeDeepCopy'](this);_0x2e764a[_0x16c4e8(0x41c)]=!![],VisuMZ[_0x16c4e8(0xe4)][_0x16c4e8(0x265)][_0x16c4e8(0x4e1)](this,_0x2d6e4c,_0x461261),this[_0x16c4e8(0x1db)](_0x2e764a);}else{if(_0x16c4e8(0x299)!==_0x16c4e8(0x299)){let _0x112fdb=this[_0x16c4e8(0x289)]();const _0x2de8de=this['_item'];return _0x112fdb=_0x5491f8['ItemsEquipsCore'][_0x16c4e8(0x20b)][_0x16c4e8(0x41b)][_0x16c4e8(0x333)][_0x16c4e8(0x4e1)](this,_0x2de8de,_0x112fdb),_0x112fdb;}else VisuMZ[_0x16c4e8(0xe4)]['Game_Actor_changeEquip'][_0x16c4e8(0x4e1)](this,_0x2d6e4c,_0x461261);}},VisuMZ[_0x1d6c8a(0xe4)][_0x1d6c8a(0x494)]=Game_Actor[_0x1d6c8a(0x17c)]['forceChangeEquip'],Game_Actor[_0x1d6c8a(0x17c)]['forceChangeEquip']=function(_0x5c0d01,_0x33452d){const _0x18d56b=_0x1d6c8a;if(!this[_0x18d56b(0x41c)]){if(_0x18d56b(0x547)!==_0x18d56b(0x547)){_0x270175[_0x18d56b(0x1d6)]();const _0x5a7e93=_0x168ef4[_0x18d56b(0x3d1)][_0x18d56b(0x50e)];_0x5a7e93[_0x18d56b(0x503)](this[_0x18d56b(0x4f7)](),null),this[_0x18d56b(0x1ae)](),this[_0x18d56b(0x15b)][_0x18d56b(0x1ae)](),this['callUpdateHelp']();const _0x6c401f=_0x4cdc1c[_0x18d56b(0x3d1)][_0x18d56b(0xfe)];if(_0x6c401f)_0x6c401f[_0x18d56b(0x1ae)]();}else{const _0x20686c=JsonEx[_0x18d56b(0x280)](this);_0x20686c[_0x18d56b(0x41c)]=!![],VisuMZ['ItemsEquipsCore'][_0x18d56b(0x494)][_0x18d56b(0x4e1)](this,_0x5c0d01,_0x33452d),this[_0x18d56b(0x1db)](_0x20686c);}}else VisuMZ[_0x18d56b(0xe4)]['Game_Actor_forceChangeEquip'][_0x18d56b(0x4e1)](this,_0x5c0d01,_0x33452d);},VisuMZ[_0x1d6c8a(0xe4)][_0x1d6c8a(0x2df)]=Game_Actor['prototype'][_0x1d6c8a(0x44f)],Game_Actor[_0x1d6c8a(0x17c)]['discardEquip']=function(_0x3a4f7c){const _0xa31f36=_0x1d6c8a;if(!this['_tempActor']){if('lqNBO'!==_0xa31f36(0x2cb)){this[_0xa31f36(0x25a)]={};if(!this['_item'])return;const _0x1d75fc=this[_0xa31f36(0x1a6)][_0xa31f36(0x492)];if(_0x1d75fc['match'](/<STATUS INFO>\s*([\s\S]*)\s*<\/STATUS INFO>/i)){const _0x23f5a8=_0x4ae002(_0x2ec209['$1'])[_0xa31f36(0x461)](/[\r\n]+/);for(const _0x1ad3b7 of _0x23f5a8){if(_0x1ad3b7['match'](/(.*):[ ](.*)/i)){const _0x4e6334=_0x300fdd(_0x1510de['$1'])[_0xa31f36(0x421)]()['trim'](),_0x5d41b0=_0x3ac107(_0x237480['$2'])['trim']();this[_0xa31f36(0x25a)][_0x4e6334]=_0x5d41b0;}}}}else{const _0x58831a=JsonEx[_0xa31f36(0x280)](this);_0x58831a[_0xa31f36(0x41c)]=!![],VisuMZ[_0xa31f36(0xe4)][_0xa31f36(0x2df)]['call'](this,_0x3a4f7c),this['equipAdjustHpMp'](_0x58831a);}}else VisuMZ[_0xa31f36(0xe4)][_0xa31f36(0x2df)][_0xa31f36(0x4e1)](this,_0x3a4f7c);},Game_Actor[_0x1d6c8a(0x17c)][_0x1d6c8a(0x125)]=function(_0x2ca1e0){const _0x3b30af=_0x1d6c8a;if(this[_0x3b30af(0x31a)])return;for(;;){const _0x1e16c6=this[_0x3b30af(0x47f)](),_0x320cee=this[_0x3b30af(0x3c1)](),_0x35f2e2=_0x320cee[_0x3b30af(0x535)];let _0x454431=![];for(let _0x362891=0x0;_0x362891<_0x35f2e2;_0x362891++){if(_0x3b30af(0x3b7)===_0x3b30af(0x2be))return this[_0x3b30af(0x2ad)]()?this[_0x3b30af(0x448)]():_0x9912ec[_0x3b30af(0xe4)][_0x3b30af(0x2b4)]['call'](this);else{const _0x49f2bf=_0x320cee[_0x362891];if(_0x49f2bf&&(!this[_0x3b30af(0x13b)](_0x49f2bf)||_0x49f2bf[_0x3b30af(0x230)]!==_0x1e16c6[_0x362891])){if(_0x3b30af(0x4b2)===_0x3b30af(0x237))_0xaa4eba[_0x3b30af(0xe4)]['ParseItemNotetags'][_0x3b30af(0x4e1)](this,_0xa1a3f4),_0x3114c9[_0x3b30af(0xe4)][_0x3b30af(0x4c0)](_0xd273c4,_0x9ebe6c);else{!_0x2ca1e0&&this[_0x3b30af(0x3fd)](null,_0x49f2bf);if(!this[_0x3b30af(0x41c)]){const _0x35f3f7=JsonEx[_0x3b30af(0x280)](this);_0x35f3f7[_0x3b30af(0x41c)]=!![],this[_0x3b30af(0x114)][_0x362891][_0x3b30af(0x49b)](null),this[_0x3b30af(0x31a)]=!![],this[_0x3b30af(0x1db)](_0x35f3f7),this['_bypassReleaseUnequippableItemsItemsEquipsCore']=undefined;}else this[_0x3b30af(0x114)][_0x362891][_0x3b30af(0x49b)](null);_0x454431=!![];}}}}if(!_0x454431)break;}},Game_Actor[_0x1d6c8a(0x17c)][_0x1d6c8a(0x1db)]=function(_0x1ab7b4){const _0x2b2fbe=_0x1d6c8a;if(this[_0x2b2fbe(0x41c)])return;if(!VisuMZ[_0x2b2fbe(0xe4)][_0x2b2fbe(0x20b)][_0x2b2fbe(0x3af)][_0x2b2fbe(0x24f)])return;const _0x6c4fa2=Math[_0x2b2fbe(0x49f)](_0x1ab7b4[_0x2b2fbe(0x512)]()*this[_0x2b2fbe(0x1ea)]),_0x30c990=Math[_0x2b2fbe(0x49f)](_0x1ab7b4[_0x2b2fbe(0x303)]()*this[_0x2b2fbe(0x2a9)]);if(this['hp']>0x0)this[_0x2b2fbe(0x343)](_0x6c4fa2);if(this['mp']>0x0)this['setMp'](_0x30c990);},Game_Actor[_0x1d6c8a(0x17c)][_0x1d6c8a(0x473)]=function(){const _0x22eb31=_0x1d6c8a,_0x3dc2d6=this[_0x22eb31(0x47f)]()[_0x22eb31(0x535)];for(let _0x5b06f6=0x0;_0x5b06f6<_0x3dc2d6;_0x5b06f6++){if('mnnqg'!==_0x22eb31(0x48c)){if(this['isClearEquipOk'](_0x5b06f6))this[_0x22eb31(0x503)](_0x5b06f6,null);}else{if(this[_0x22eb31(0x2ad)]())return this[_0x22eb31(0x347)]();else{const _0x3232cc=_0x129f85[_0x22eb31(0xe4)][_0x22eb31(0x2c1)][_0x22eb31(0x4e1)](this);return this['allowCreateStatusWindow']()&&this[_0x22eb31(0x4c8)]()&&(_0x3232cc[_0x22eb31(0x376)]-=this[_0x22eb31(0x37c)]()),_0x3232cc;}}}},Game_Actor['prototype']['isClearEquipOk']=function(_0x2cfbd6){const _0x39a828=_0x1d6c8a;return this[_0x39a828(0x3c5)]()[_0x39a828(0x1c3)](this['equipSlots']()[_0x2cfbd6])?_0x39a828(0x14a)!==_0x39a828(0x240)?![]:this[_0x39a828(0x4f1)]():this[_0x39a828(0x560)](_0x2cfbd6);},Game_Actor['prototype'][_0x1d6c8a(0x3c5)]=function(){const _0x3ce6e5=_0x1d6c8a;return VisuMZ[_0x3ce6e5(0xe4)][_0x3ce6e5(0x20b)]['EquipScene'][_0x3ce6e5(0x36b)];},Game_Actor[_0x1d6c8a(0x17c)][_0x1d6c8a(0x55a)]=function(){const _0x5aa094=_0x1d6c8a,_0x5b1e69=this[_0x5aa094(0x47f)]()['length'];for(let _0x5c1957=0x0;_0x5c1957<_0x5b1e69;_0x5c1957++){if(_0x5aa094(0x252)!==_0x5aa094(0x252))return _0x1128be['ItemsEquipsCore'][_0x5aa094(0x20b)]['ItemScene'][_0x5aa094(0x383)];else{if(this[_0x5aa094(0x4bc)](_0x5c1957))this['changeEquip'](_0x5c1957,null);}}for(let _0x559ff8=0x0;_0x559ff8<_0x5b1e69;_0x559ff8++){if(_0x5aa094(0x55b)===_0x5aa094(0x358)){const _0x46df82=this[_0x5aa094(0x3cc)](_0x361480),_0x183c5b=this[_0x5aa094(0x38a)](_0x58e874),_0x3630b7=this[_0x5aa094(0x39d)](_0x183c5b)[_0x5aa094(0x376)];this[_0x5aa094(0x558)](this[_0x5aa094(0x341)](_0x4a4790));const _0x1eb269=this[_0x5aa094(0x355)]();if(_0x1eb269===_0x5aa094(0x470))this['drawTextEx'](_0x183c5b,_0x46df82['x']+_0x46df82[_0x5aa094(0x376)]-_0x3630b7,_0x46df82['y'],_0x3630b7);else{if(_0x1eb269===_0x5aa094(0x490)){const _0x2b63c2=_0x46df82['x']+_0x10b322[_0x5aa094(0x17f)]((_0x46df82[_0x5aa094(0x376)]-_0x3630b7)/0x2);this[_0x5aa094(0x290)](_0x183c5b,_0x2b63c2,_0x46df82['y'],_0x3630b7);}else this[_0x5aa094(0x290)](_0x183c5b,_0x46df82['x'],_0x46df82['y'],_0x3630b7);}}else{if(this[_0x5aa094(0x4bc)](_0x559ff8))this[_0x5aa094(0x503)](_0x559ff8,this['bestEquipItem'](_0x559ff8));}}},Game_Actor[_0x1d6c8a(0x17c)][_0x1d6c8a(0x4bc)]=function(_0x450083){const _0x29fdc6=_0x1d6c8a;return this[_0x29fdc6(0x2e9)]()[_0x29fdc6(0x1c3)](this[_0x29fdc6(0x47f)]()[_0x450083])?![]:this[_0x29fdc6(0x560)](_0x450083);},Game_Actor['prototype'][_0x1d6c8a(0x2e9)]=function(){const _0x454c3a=_0x1d6c8a;return VisuMZ['ItemsEquipsCore'][_0x454c3a(0x20b)][_0x454c3a(0x3af)][_0x454c3a(0x411)];},VisuMZ[_0x1d6c8a(0xe4)][_0x1d6c8a(0x3c4)]=Game_Actor[_0x1d6c8a(0x17c)][_0x1d6c8a(0x3fd)],Game_Actor[_0x1d6c8a(0x17c)]['tradeItemWithParty']=function(_0x3da3e4,_0x1881d6){const _0x17981a=_0x1d6c8a;if(this[_0x17981a(0x41c)])return![];$gameTemp['_bypassNewLabel']=!![];const _0xa8d6a4=VisuMZ[_0x17981a(0xe4)]['Game_Actor_tradeItemWithParty'][_0x17981a(0x4e1)](this,_0x3da3e4,_0x1881d6);return $gameTemp[_0x17981a(0x32e)]=![],_0xa8d6a4;},Game_Actor[_0x1d6c8a(0x17c)][_0x1d6c8a(0x168)]=function(_0x6e45ce,_0x45767c){const _0x39c67e=_0x1d6c8a,_0x383622=this[_0x39c67e(0x2c3)](_0x6e45ce);if(_0x383622<0x0)return;const _0x1f4a63=_0x6e45ce===0x1?$dataWeapons[_0x45767c]:$dataArmors[_0x45767c];this[_0x39c67e(0x503)](_0x383622,_0x1f4a63);},Game_Actor[_0x1d6c8a(0x17c)][_0x1d6c8a(0x2c3)]=function(_0x586db3){const _0x5c1298=_0x1d6c8a;let _0x40ef80=0x0;const _0x44bc9c=this['equipSlots'](),_0x550189=this[_0x5c1298(0x3c1)]();for(let _0x525c28=0x0;_0x525c28<_0x44bc9c[_0x5c1298(0x535)];_0x525c28++){if(_0x5c1298(0x1d2)!==_0x5c1298(0x557)){if(_0x44bc9c[_0x525c28]===_0x586db3){_0x40ef80=_0x525c28;if(!_0x550189[_0x525c28])return _0x40ef80;}}else{if(_0x50182e)_0x509d7e+=this[_0x5c1298(0x134)](_0x156830,_0x3cc66a);}}return _0x40ef80;},VisuMZ[_0x1d6c8a(0xe4)][_0x1d6c8a(0x4aa)]=Game_Actor['prototype'][_0x1d6c8a(0x28e)],Game_Actor[_0x1d6c8a(0x17c)][_0x1d6c8a(0x28e)]=function(_0x265958){const _0x221fe0=_0x1d6c8a;let _0xd2cba7=VisuMZ['ItemsEquipsCore'][_0x221fe0(0x4aa)][_0x221fe0(0x4e1)](this,_0x265958);for(const _0x5687f3 of this['equips']()){if(_0x5687f3)_0xd2cba7+=this[_0x221fe0(0x134)](_0x5687f3,_0x265958);}return _0xd2cba7;},Game_Actor[_0x1d6c8a(0x17c)][_0x1d6c8a(0x134)]=function(_0x4b8049,_0x559413){const _0x5e2f12=_0x1d6c8a;if(this[_0x5e2f12(0x2da)])return 0x0;const _0x4f1076=(DataManager[_0x5e2f12(0x53b)](_0x4b8049)?_0x5e2f12(0x2d1):_0x5e2f12(0x4c4))[_0x5e2f12(0x1af)](_0x4b8049['id']),_0x52d9c3=_0x5e2f12(0x1b8)[_0x5e2f12(0x1af)](_0x4f1076,_0x559413);if(VisuMZ['ItemsEquipsCore'][_0x5e2f12(0xeb)][_0x52d9c3]){this[_0x5e2f12(0x2da)]=!![];const _0x25c7b7=VisuMZ[_0x5e2f12(0xe4)][_0x5e2f12(0xeb)][_0x52d9c3]['call'](this,_0x4b8049,_0x559413);return this[_0x5e2f12(0x2da)]=![],_0x25c7b7;}else return 0x0;},Game_Actor[_0x1d6c8a(0x17c)][_0x1d6c8a(0x27b)]=function(_0x1fbe7a){const _0x22d048=_0x1d6c8a;this[_0x22d048(0x130)]=!![],this[_0x22d048(0x2c7)]=_0x1fbe7a;},VisuMZ[_0x1d6c8a(0xe4)]['Game_Party_initialize']=Game_Party[_0x1d6c8a(0x17c)]['initialize'],Game_Party[_0x1d6c8a(0x17c)][_0x1d6c8a(0x4ca)]=function(){const _0x195303=_0x1d6c8a;VisuMZ[_0x195303(0xe4)]['Game_Party_initialize'][_0x195303(0x4e1)](this),this[_0x195303(0x3ad)]();},Game_Party['prototype'][_0x1d6c8a(0x3ad)]=function(){const _0x1121fb=_0x1d6c8a;this[_0x1121fb(0x4a8)]=[];},Game_Party[_0x1d6c8a(0x17c)][_0x1d6c8a(0x166)]=function(_0x54a304){const _0x1f844b=_0x1d6c8a;if(!$gameTemp[_0x1f844b(0x45d)]())return![];if(this[_0x1f844b(0x4a8)]===undefined)this[_0x1f844b(0x3ad)]();let _0xa855e9='';if(DataManager['isItem'](_0x54a304))_0xa855e9=_0x1f844b(0x3c8)[_0x1f844b(0x1af)](_0x54a304['id']);else{if(DataManager['isWeapon'](_0x54a304)){if('IBatL'===_0x1f844b(0x3c6))return this['isUseItemsEquipsCoreUpdatedLayout']()?this[_0x1f844b(0x2dd)]():_0x1eb092['ItemsEquipsCore']['Scene_Equip_commandWindowRect'][_0x1f844b(0x4e1)](this);else _0xa855e9=_0x1f844b(0x192)[_0x1f844b(0x1af)](_0x54a304['id']);}else{if(DataManager[_0x1f844b(0x4c5)](_0x54a304))_0xa855e9=_0x1f844b(0x40f)['format'](_0x54a304['id']);else{if(_0x1f844b(0x36c)!=='eBegy'){let _0x3a5d6a=this[_0x1f844b(0x47f)]()[_0x1f844b(0x535)];while(this[_0x1f844b(0x114)][_0x1f844b(0x535)]>_0x3a5d6a){const _0x19b93a=this[_0x1f844b(0x114)][this[_0x1f844b(0x114)][_0x1f844b(0x535)]-0x1];_0x19b93a&&_0x19b93a['object']()&&_0x3e9b97['gainItem'](_0x19b93a[_0x1f844b(0x2fc)](),0x1),this[_0x1f844b(0x114)][_0x1f844b(0x47e)]();}while(_0x3a5d6a>this['_equips']['length']){this['_equips']['push'](new _0x148281());}}else return;}}}return this[_0x1f844b(0x4a8)][_0x1f844b(0x1c3)](_0xa855e9);},Game_Party[_0x1d6c8a(0x17c)][_0x1d6c8a(0x385)]=function(_0x22cc4c){const _0x1c5b14=_0x1d6c8a;if(!$gameTemp[_0x1c5b14(0x45d)]())return;if(this[_0x1c5b14(0x4a8)]===undefined)this[_0x1c5b14(0x3ad)]();let _0x392ae7='';if(DataManager[_0x1c5b14(0x431)](_0x22cc4c)){if(_0x1c5b14(0x336)===_0x1c5b14(0x336))_0x392ae7=_0x1c5b14(0x3c8)[_0x1c5b14(0x1af)](_0x22cc4c['id']);else{if(!this[_0x1c5b14(0x188)]())return![];if(_0x4e9bf5[_0x1c5b14(0x3d1)]['constructor']!==_0x1b3dc6)return![];return _0x2c1e1c[_0x1c5b14(0x143)]('down')&&(this['playCursorSound'](),_0x566146['_scene'][_0x1c5b14(0x292)](),_0x5b9f7e['_scene']['_slotWindow'][_0x1c5b14(0x565)](-0x1)),![];}}else{if(DataManager[_0x1c5b14(0x53b)](_0x22cc4c)){if('HgWCE'!=='jXxKy')_0x392ae7=_0x1c5b14(0x192)[_0x1c5b14(0x1af)](_0x22cc4c['id']);else{this[_0x1c5b14(0x1f9)]=![];if(this['isCursorMovable']()){const _0x3d042a=this[_0x1c5b14(0x4f7)](),_0x1d193e=this['hitIndex']();_0x1d193e>=0x0&&_0x1d193e!==this[_0x1c5b14(0x4f7)]()&&this[_0x1c5b14(0x1e6)](_0x1d193e),_0x71ae10&&this['index']()!==_0x3d042a&&this['playCursorSound']();}}}else{if(DataManager['isArmor'](_0x22cc4c))_0x392ae7=_0x1c5b14(0x40f)[_0x1c5b14(0x1af)](_0x22cc4c['id']);else return;}}if(!this[_0x1c5b14(0x4a8)][_0x1c5b14(0x1c3)](_0x392ae7))this[_0x1c5b14(0x4a8)][_0x1c5b14(0x221)](_0x392ae7);},Game_Party['prototype'][_0x1d6c8a(0xef)]=function(_0x3f774c){const _0x97cb3d=_0x1d6c8a;if(!$gameTemp['newLabelEnabled']())return;if(this[_0x97cb3d(0x4a8)]===undefined)this[_0x97cb3d(0x3ad)]();let _0x4e1880='';if(DataManager[_0x97cb3d(0x431)](_0x3f774c))_0x97cb3d(0x171)===_0x97cb3d(0x1b1)?(_0x354e3f['ItemsEquipsCore'][_0x97cb3d(0x181)][_0x97cb3d(0x4e1)](this),this[_0x97cb3d(0x12f)]()&&this['onCategoryOk']()):_0x4e1880=_0x97cb3d(0x3c8)['format'](_0x3f774c['id']);else{if(DataManager['isWeapon'](_0x3f774c))_0x4e1880=_0x97cb3d(0x192)[_0x97cb3d(0x1af)](_0x3f774c['id']);else{if(DataManager[_0x97cb3d(0x4c5)](_0x3f774c)){if(_0x97cb3d(0x15d)!==_0x97cb3d(0x15d))return this['getItemDamageAmountTextOriginal']();else _0x4e1880=_0x97cb3d(0x40f)[_0x97cb3d(0x1af)](_0x3f774c['id']);}else return;}}if(this[_0x97cb3d(0x4a8)][_0x97cb3d(0x1c3)](_0x4e1880)){if(_0x97cb3d(0x4e4)===_0x97cb3d(0x4e4))this['_newItemsList']['splice'](this[_0x97cb3d(0x4a8)][_0x97cb3d(0x23d)](_0x4e1880),0x1);else{const _0x42c539=this[_0x97cb3d(0x159)](),_0x490048=this['isRightInputMode']()?this[_0x97cb3d(0x37c)]():0x0,_0x115c1e=this[_0x97cb3d(0x388)](),_0x1046d3=_0x37f77d['boxWidth']-this[_0x97cb3d(0x37c)](),_0x28fccf=_0x42c539?this[_0x97cb3d(0x3ed)](0x1,!![]):0x0;return new _0x4a996f(_0x490048,_0x115c1e,_0x1046d3,_0x28fccf);}}},VisuMZ[_0x1d6c8a(0xe4)][_0x1d6c8a(0x194)]=Game_Party[_0x1d6c8a(0x17c)][_0x1d6c8a(0xf4)],Game_Party[_0x1d6c8a(0x17c)]['gainItem']=function(_0xeb2ae7,_0xb60c76,_0x408407){const _0x5e6e4f=_0x1d6c8a,_0x586a6e=this[_0x5e6e4f(0x175)](_0xeb2ae7);VisuMZ[_0x5e6e4f(0xe4)][_0x5e6e4f(0x194)]['call'](this,_0xeb2ae7,_0xb60c76,_0x408407);if(this[_0x5e6e4f(0x175)](_0xeb2ae7)>_0x586a6e)this[_0x5e6e4f(0x385)](_0xeb2ae7);},Game_Party[_0x1d6c8a(0x17c)]['maxItems']=function(_0xfd22b7){const _0x4ac0ca=_0x1d6c8a;return DataManager[_0x4ac0ca(0x1f8)](_0xfd22b7);},VisuMZ['ItemsEquipsCore'][_0x1d6c8a(0x380)]=Scene_ItemBase['prototype'][_0x1d6c8a(0x478)],Scene_ItemBase[_0x1d6c8a(0x17c)][_0x1d6c8a(0x478)]=function(){const _0x52d64d=_0x1d6c8a;VisuMZ[_0x52d64d(0xe4)]['Scene_ItemBase_activateItemWindow'][_0x52d64d(0x4e1)](this),this['_itemWindow']['callUpdateHelp']();},Scene_Item[_0x1d6c8a(0x17c)][_0x1d6c8a(0x3d2)]=function(){const _0x57e3d5=_0x1d6c8a;if(ConfigManager['uiMenuStyle']&&ConfigManager[_0x57e3d5(0x454)]!==undefined)return ConfigManager[_0x57e3d5(0x454)];else{if(this['isUseItemsEquipsCoreUpdatedLayout']()){if('ZAKfA'===_0x57e3d5(0x504)){const _0x3b6202=this[_0x57e3d5(0x4d9)](_0x336c2a);_0x3b6202?_0xf3d86f[_0x57e3d5(0x17c)][_0x57e3d5(0x183)][_0x57e3d5(0x4e1)](this,_0x43c6c5):this[_0x57e3d5(0x4f6)](_0x51dbe2);}else return this[_0x57e3d5(0x16c)]()['match'](/LOWER/i);}else Scene_ItemBase[_0x57e3d5(0x17c)][_0x57e3d5(0x1b9)][_0x57e3d5(0x4e1)](this);}},Scene_Item[_0x1d6c8a(0x17c)][_0x1d6c8a(0x1b9)]=function(){const _0x500a6=_0x1d6c8a;if(ConfigManager[_0x500a6(0x11f)]&&ConfigManager['uiInputPosition']!==undefined)return ConfigManager['uiInputPosition'];else{if(this[_0x500a6(0x2ad)]())return this[_0x500a6(0x16c)]()[_0x500a6(0x2b8)](/RIGHT/i);else Scene_ItemBase['prototype']['isRightInputMode'][_0x500a6(0x4e1)](this);}},Scene_Item[_0x1d6c8a(0x17c)][_0x1d6c8a(0x16c)]=function(){const _0x224851=_0x1d6c8a;return VisuMZ['ItemsEquipsCore'][_0x224851(0x20b)][_0x224851(0x2d0)]['LayoutStyle'];},Scene_Item['prototype'][_0x1d6c8a(0x12f)]=function(){const _0x3bbe71=_0x1d6c8a;return this[_0x3bbe71(0x393)]&&this[_0x3bbe71(0x393)][_0x3bbe71(0x12f)]();},Scene_Item[_0x1d6c8a(0x17c)]['isUseItemsEquipsCoreUpdatedLayout']=function(){const _0x17e8f5=_0x1d6c8a;return VisuMZ['ItemsEquipsCore']['Settings'][_0x17e8f5(0x2d0)][_0x17e8f5(0x169)];},VisuMZ[_0x1d6c8a(0xe4)][_0x1d6c8a(0x181)]=Scene_Item[_0x1d6c8a(0x17c)][_0x1d6c8a(0x396)],Scene_Item[_0x1d6c8a(0x17c)][_0x1d6c8a(0x396)]=function(){const _0x5aa033=_0x1d6c8a;VisuMZ['ItemsEquipsCore'][_0x5aa033(0x181)][_0x5aa033(0x4e1)](this),this[_0x5aa033(0x12f)]()&&(_0x5aa033(0x189)==='LHwLH'?this[_0x5aa033(0x2aa)]():this[_0x5aa033(0x290)](_0x167cc2,_0x51ec02['x'],_0xffaecc['y'],_0x2ab62d));},Scene_Item[_0x1d6c8a(0x17c)]['helpWindowRect']=function(){const _0x1bf7fa=_0x1d6c8a;return this[_0x1bf7fa(0x2ad)]()?this[_0x1bf7fa(0x1e0)]():Scene_ItemBase[_0x1bf7fa(0x17c)][_0x1bf7fa(0x249)][_0x1bf7fa(0x4e1)](this);},Scene_Item[_0x1d6c8a(0x17c)][_0x1d6c8a(0x1e0)]=function(){const _0x4e0099=_0x1d6c8a,_0x3862db=0x0,_0x1ccb17=this[_0x4e0099(0x318)](),_0x2b0990=Graphics[_0x4e0099(0x16a)],_0x1c24e1=this[_0x4e0099(0x205)]();return new Rectangle(_0x3862db,_0x1ccb17,_0x2b0990,_0x1c24e1);},VisuMZ['ItemsEquipsCore'][_0x1d6c8a(0x551)]=Scene_Item[_0x1d6c8a(0x17c)][_0x1d6c8a(0x115)],Scene_Item[_0x1d6c8a(0x17c)][_0x1d6c8a(0x115)]=function(){const _0x29db1c=_0x1d6c8a;VisuMZ[_0x29db1c(0xe4)][_0x29db1c(0x551)][_0x29db1c(0x4e1)](this),this[_0x29db1c(0x12f)]()&&this[_0x29db1c(0x324)]();},Scene_Item['prototype']['postCreateCategoryWindowItemsEquipsCore']=function(){const _0x2aabeb=_0x1d6c8a;delete this['_categoryWindow'][_0x2aabeb(0x2f2)]['ok'],delete this[_0x2aabeb(0x393)][_0x2aabeb(0x2f2)][_0x2aabeb(0x3b0)];},VisuMZ[_0x1d6c8a(0xe4)][_0x1d6c8a(0x27e)]=Scene_Item[_0x1d6c8a(0x17c)][_0x1d6c8a(0x497)],Scene_Item[_0x1d6c8a(0x17c)][_0x1d6c8a(0x497)]=function(){const _0x50050e=_0x1d6c8a;if(this[_0x50050e(0x2ad)]())return this['categoryWindowRectItemsEquipsCore']();else{if(_0x50050e(0x3ef)!=='VJDcX')_0x37e86b=_0x5385ad[_0x50050e(0x1b6)][_0x4af1d0(_0x3ae3e6['$1'])]||'';else return VisuMZ['ItemsEquipsCore']['Scene_Item_categoryWindowRect'][_0x50050e(0x4e1)](this);}},Scene_Item[_0x1d6c8a(0x17c)][_0x1d6c8a(0x209)]=function(){const _0x480e65=_0x1d6c8a,_0x4a950f=0x0,_0xac35fb=this['mainAreaTop'](),_0x1fd553=Graphics[_0x480e65(0x16a)],_0x2487ee=this[_0x480e65(0x3ed)](0x1,!![]);return new Rectangle(_0x4a950f,_0xac35fb,_0x1fd553,_0x2487ee);},VisuMZ[_0x1d6c8a(0xe4)][_0x1d6c8a(0x538)]=Scene_Item['prototype'][_0x1d6c8a(0x1b7)],Scene_Item['prototype'][_0x1d6c8a(0x1b7)]=function(){const _0x3bfbfb=_0x1d6c8a;VisuMZ[_0x3bfbfb(0xe4)]['Scene_Item_createItemWindow'][_0x3bfbfb(0x4e1)](this);if(this['isUseModernControls']()){if('cXMBV'==='cXMBV')this[_0x3bfbfb(0x4fc)]();else{this['contents']['clear']();if(!this['_actor'])return;if(this['isMainMenuCoreMenuImageOptionAvailable']()){const _0x134df4=_0x24f77d[_0x3bfbfb(0x529)](this[_0x3bfbfb(0x50e)][_0x3bfbfb(0x350)]());_0x134df4[_0x3bfbfb(0x151)](this['onMenuImageLoad']['bind'](this));}else this[_0x3bfbfb(0x248)]();}}this['allowCreateStatusWindow']()&&this[_0x3bfbfb(0x33f)]();},VisuMZ[_0x1d6c8a(0xe4)][_0x1d6c8a(0x2c1)]=Scene_Item['prototype'][_0x1d6c8a(0x30b)],Scene_Item[_0x1d6c8a(0x17c)][_0x1d6c8a(0x30b)]=function(){const _0x30c5f5=_0x1d6c8a;if(this[_0x30c5f5(0x2ad)]())return this[_0x30c5f5(0x347)]();else{if(_0x30c5f5(0x348)===_0x30c5f5(0x348)){const _0x34fd6e=VisuMZ[_0x30c5f5(0xe4)][_0x30c5f5(0x2c1)]['call'](this);return this['allowCreateStatusWindow']()&&this[_0x30c5f5(0x4c8)]()&&(_0x34fd6e['width']-=this[_0x30c5f5(0x37c)]()),_0x34fd6e;}else{_0x5d680e[_0x30c5f5(0xe4)][_0x30c5f5(0x20b)][_0x30c5f5(0x337)][_0x30c5f5(0x184)][_0x30c5f5(0x4e1)](this);return;}}},Scene_Item[_0x1d6c8a(0x17c)][_0x1d6c8a(0x347)]=function(){const _0x4f3adc=_0x1d6c8a,_0x33105a=this['isRightInputMode']()?this[_0x4f3adc(0x37c)]():0x0,_0x4d6ec1=this[_0x4f3adc(0x393)]['y']+this['_categoryWindow'][_0x4f3adc(0x3d7)],_0x3a4e67=Graphics['boxWidth']-this[_0x4f3adc(0x37c)](),_0x1f5913=this[_0x4f3adc(0x474)]()-_0x4d6ec1;return new Rectangle(_0x33105a,_0x4d6ec1,_0x3a4e67,_0x1f5913);},Scene_Item[_0x1d6c8a(0x17c)]['postCreateItemWindowModernControls']=function(){const _0x403e8a=_0x1d6c8a;this[_0x403e8a(0x15b)][_0x403e8a(0x1c8)]('cancel',this[_0x403e8a(0x4ec)][_0x403e8a(0x238)](this));},Scene_Item[_0x1d6c8a(0x17c)][_0x1d6c8a(0x1cc)]=function(){const _0x27fd88=_0x1d6c8a;return this['isUseItemsEquipsCoreUpdatedLayout']()?!![]:VisuMZ[_0x27fd88(0xe4)][_0x27fd88(0x20b)][_0x27fd88(0x2d0)][_0x27fd88(0x2ea)];},Scene_Item[_0x1d6c8a(0x17c)][_0x1d6c8a(0x4c8)]=function(){const _0x35460a=_0x1d6c8a;return VisuMZ[_0x35460a(0xe4)][_0x35460a(0x20b)][_0x35460a(0x2d0)][_0x35460a(0x3a1)];},Scene_Item[_0x1d6c8a(0x17c)]['createStatusWindow']=function(){const _0x508535=_0x1d6c8a,_0x14ac07=this['statusWindowRect']();this[_0x508535(0xfe)]=new Window_ShopStatus(_0x14ac07),this[_0x508535(0x519)](this[_0x508535(0xfe)]),this[_0x508535(0x15b)]['setStatusWindow'](this['_statusWindow']);const _0x295603=VisuMZ[_0x508535(0xe4)][_0x508535(0x20b)][_0x508535(0x2d0)]['ItemMenuStatusBgType'];this[_0x508535(0xfe)][_0x508535(0x2fa)](_0x295603||0x0);},Scene_Item[_0x1d6c8a(0x17c)][_0x1d6c8a(0x479)]=function(){const _0x27b345=_0x1d6c8a;return this[_0x27b345(0x2ad)]()?_0x27b345(0x4f2)!=='BsBYy'?this[_0x27b345(0x12f)]()?![]:_0x255d4a['prototype'][_0x27b345(0x212)]['call'](this):this['statusWindowRectItemsEquipsCore']():_0x27b345(0x33c)===_0x27b345(0x33c)?VisuMZ[_0x27b345(0xe4)][_0x27b345(0x20b)][_0x27b345(0x2d0)][_0x27b345(0xe9)][_0x27b345(0x4e1)](this):0x0;},Scene_Item[_0x1d6c8a(0x17c)][_0x1d6c8a(0x1c9)]=function(){const _0x4a3e02=_0x1d6c8a,_0x4d03f7=this[_0x4a3e02(0x37c)](),_0x563b4b=this[_0x4a3e02(0x15b)][_0x4a3e02(0x3d7)],_0x5704e3=this[_0x4a3e02(0x1b9)]()?0x0:Graphics[_0x4a3e02(0x16a)]-this['statusWidth'](),_0x45eddf=this[_0x4a3e02(0x15b)]['y'];return new Rectangle(_0x5704e3,_0x45eddf,_0x4d03f7,_0x563b4b);},Scene_Item[_0x1d6c8a(0x17c)]['statusWidth']=function(){return Scene_Shop['prototype']['statusWidth']();},Scene_Item[_0x1d6c8a(0x17c)][_0x1d6c8a(0x471)]=function(){const _0x41a754=_0x1d6c8a;if(!this[_0x41a754(0x16c)]())return![];if(!this[_0x41a754(0x12f)]())return![];if(!this[_0x41a754(0x15b)])return![];if(!this[_0x41a754(0x15b)][_0x41a754(0x505)])return![];return this[_0x41a754(0x16c)]()&&this[_0x41a754(0x12f)]();},Scene_Item[_0x1d6c8a(0x17c)]['buttonAssistKey1']=function(){const _0x46dc36=_0x1d6c8a;if(this[_0x46dc36(0x471)]()){if(this[_0x46dc36(0x15b)][_0x46dc36(0x40a)]()===0x1)return TextManager[_0x46dc36(0x356)](_0x46dc36(0x2e8),'right');else{if(_0x46dc36(0x2a8)===_0x46dc36(0x2a8))return TextManager[_0x46dc36(0x356)](_0x46dc36(0x52e),_0x46dc36(0x1ee));else{this['_goodsCount']=0x0;for(const _0x21d8f2 of this[_0x46dc36(0x34b)]){this[_0x46dc36(0x39b)](_0x21d8f2)?this[_0x46dc36(0x108)]++:_0x21d8f2[0x0]=-0x1;}}}}return Scene_ItemBase[_0x46dc36(0x17c)][_0x46dc36(0x50d)][_0x46dc36(0x4e1)](this);},Scene_Item[_0x1d6c8a(0x17c)][_0x1d6c8a(0x31c)]=function(){const _0x1dcd32=_0x1d6c8a;if(this['buttonAssistItemListRequirement']()){if(_0x1dcd32(0x444)===_0x1dcd32(0x444))return VisuMZ['ItemsEquipsCore'][_0x1dcd32(0x20b)][_0x1dcd32(0x2d0)][_0x1dcd32(0x2b1)];else this[_0x1dcd32(0x19f)](_0x533429);}return Scene_ItemBase[_0x1dcd32(0x17c)]['buttonAssistText1']['call'](this);},Scene_Equip[_0x1d6c8a(0x17c)]['isBottomHelpMode']=function(){const _0x336e75=_0x1d6c8a;if(ConfigManager[_0x336e75(0x11f)]&&ConfigManager[_0x336e75(0x454)]!==undefined)return ConfigManager[_0x336e75(0x454)];else{if(this[_0x336e75(0x2ad)]())return this['updatedLayoutStyle']()['match'](/LOWER/i);else{if(_0x336e75(0x13e)==='iqoin')Scene_MenuBase[_0x336e75(0x17c)][_0x336e75(0x1b9)][_0x336e75(0x4e1)](this);else return this['updatedLayoutStyle']()[_0x336e75(0x2b8)](/LOWER/i);}}},Scene_Equip['prototype'][_0x1d6c8a(0x1b9)]=function(){const _0x1b1153=_0x1d6c8a;if(ConfigManager[_0x1b1153(0x11f)]&&ConfigManager[_0x1b1153(0x42c)]!==undefined)return ConfigManager[_0x1b1153(0x42c)];else{if(this[_0x1b1153(0x2ad)]())return this[_0x1b1153(0x16c)]()[_0x1b1153(0x2b8)](/RIGHT/i);else _0x1b1153(0xfb)!==_0x1b1153(0x15e)?Scene_MenuBase[_0x1b1153(0x17c)][_0x1b1153(0x1b9)]['call'](this):_0x3e9b1c['prototype'][_0x1b1153(0x1ac)][_0x1b1153(0x4e1)](this,_0x3b5e66);}},Scene_Equip['prototype']['updatedLayoutStyle']=function(){const _0x4d9802=_0x1d6c8a;return VisuMZ[_0x4d9802(0xe4)][_0x4d9802(0x20b)]['EquipScene'][_0x4d9802(0x548)];},Scene_Equip[_0x1d6c8a(0x17c)]['isUseModernControls']=function(){const _0x3744be=_0x1d6c8a;return this['_commandWindow']&&this['_commandWindow'][_0x3744be(0x12f)]();},Scene_Equip[_0x1d6c8a(0x17c)][_0x1d6c8a(0x2ad)]=function(){const _0x78d132=_0x1d6c8a;return VisuMZ['ItemsEquipsCore'][_0x78d132(0x20b)][_0x78d132(0x3af)]['EnableLayout'];},VisuMZ[_0x1d6c8a(0xe4)][_0x1d6c8a(0x2f9)]=Scene_Equip['prototype'][_0x1d6c8a(0x396)],Scene_Equip['prototype']['create']=function(){const _0x1cd87f=_0x1d6c8a;VisuMZ[_0x1cd87f(0xe4)][_0x1cd87f(0x2f9)]['call'](this),this[_0x1cd87f(0x12f)]()&&this[_0x1cd87f(0x292)]();},Scene_Equip[_0x1d6c8a(0x17c)]['helpWindowRect']=function(){const _0x2cc1d3=_0x1d6c8a;if(this['isUseItemsEquipsCoreUpdatedLayout']()){if(_0x2cc1d3(0x386)!==_0x2cc1d3(0x3e1))return this['helpWindowRectItemsEquipsCore']();else _0x25d537['prototype']['processCursorMove'][_0x2cc1d3(0x4e1)](this),this[_0x2cc1d3(0x262)]();}else return Scene_MenuBase['prototype'][_0x2cc1d3(0x249)]['call'](this);},Scene_Equip[_0x1d6c8a(0x17c)]['helpWindowRectItemsEquipsCore']=function(){const _0x3240ec=0x0,_0x3b1dd2=this['helpAreaTop'](),_0xfc4dca=Graphics['boxWidth'],_0x576c83=this['helpAreaHeight']();return new Rectangle(_0x3240ec,_0x3b1dd2,_0xfc4dca,_0x576c83);},VisuMZ[_0x1d6c8a(0xe4)][_0x1d6c8a(0x55f)]=Scene_Equip['prototype'][_0x1d6c8a(0x479)],Scene_Equip[_0x1d6c8a(0x17c)]['statusWindowRect']=function(){const _0x49b591=_0x1d6c8a;return this[_0x49b591(0x2ad)]()?this[_0x49b591(0x1c9)]():VisuMZ['ItemsEquipsCore'][_0x49b591(0x55f)]['call'](this);},Scene_Equip[_0x1d6c8a(0x17c)]['statusWindowRectItemsEquipsCore']=function(){const _0x6fcab6=_0x1d6c8a,_0x5240a4=this[_0x6fcab6(0x1b9)]()?0x0:Graphics[_0x6fcab6(0x16a)]-this[_0x6fcab6(0x37c)](),_0x4a80ef=this[_0x6fcab6(0x388)](),_0x361a07=this[_0x6fcab6(0x37c)](),_0x3417d9=this[_0x6fcab6(0x4b1)]();return new Rectangle(_0x5240a4,_0x4a80ef,_0x361a07,_0x3417d9);},VisuMZ[_0x1d6c8a(0xe4)][_0x1d6c8a(0x53f)]=Scene_Equip['prototype'][_0x1d6c8a(0x26b)],Scene_Equip[_0x1d6c8a(0x17c)]['commandWindowRect']=function(){const _0x4cdb4c=_0x1d6c8a;if(this['isUseItemsEquipsCoreUpdatedLayout']()){if(_0x4cdb4c(0x2b9)===_0x4cdb4c(0x257))_0x2fcf9d=_0x45aaea(_0x33b0f6['$1']);else return this[_0x4cdb4c(0x2dd)]();}else return VisuMZ[_0x4cdb4c(0xe4)]['Scene_Equip_commandWindowRect'][_0x4cdb4c(0x4e1)](this);},Scene_Equip[_0x1d6c8a(0x17c)][_0x1d6c8a(0x159)]=function(){const _0x5587b1=_0x1d6c8a,_0x1c15bf=VisuMZ[_0x5587b1(0xe4)][_0x5587b1(0x20b)][_0x5587b1(0x3af)];return _0x1c15bf[_0x5587b1(0x4c9)]||_0x1c15bf['CommandAddClear'];},Scene_Equip[_0x1d6c8a(0x17c)][_0x1d6c8a(0x2dd)]=function(){const _0x5b5fa8=_0x1d6c8a,_0x47e55f=this[_0x5b5fa8(0x159)](),_0x2b5bd5=this[_0x5b5fa8(0x1b9)]()?this[_0x5b5fa8(0x37c)]():0x0,_0x567377=this[_0x5b5fa8(0x388)](),_0x2903aa=Graphics[_0x5b5fa8(0x16a)]-this[_0x5b5fa8(0x37c)](),_0x417d1f=_0x47e55f?this[_0x5b5fa8(0x3ed)](0x1,!![]):0x0;return new Rectangle(_0x2b5bd5,_0x567377,_0x2903aa,_0x417d1f);},VisuMZ[_0x1d6c8a(0xe4)][_0x1d6c8a(0x198)]=Scene_Equip[_0x1d6c8a(0x17c)][_0x1d6c8a(0x45a)],Scene_Equip[_0x1d6c8a(0x17c)][_0x1d6c8a(0x45a)]=function(){const _0xd264e0=_0x1d6c8a;VisuMZ[_0xd264e0(0xe4)][_0xd264e0(0x198)][_0xd264e0(0x4e1)](this),this[_0xd264e0(0x12f)]()&&this['postCreateSlotWindowItemsEquipsCore']();},VisuMZ[_0x1d6c8a(0xe4)][_0x1d6c8a(0x2b4)]=Scene_Equip['prototype']['slotWindowRect'],Scene_Equip[_0x1d6c8a(0x17c)][_0x1d6c8a(0x23a)]=function(){const _0x3dddba=_0x1d6c8a;if(this[_0x3dddba(0x2ad)]()){if(_0x3dddba(0x4c1)===_0x3dddba(0x4c1))return this[_0x3dddba(0x448)]();else this['playCursorSound'](),_0x2e5f7f[_0x3dddba(0x3d1)][_0x3dddba(0x292)](),_0x3c6703['_scene'][_0x3dddba(0x1f0)]['smoothSelect'](-0x1);}else return _0x3dddba(0x1fc)==='DJKAY'?this['_sellWindow']['maxCols']()===0x1?_0x1d3f8c[_0x3dddba(0x356)](_0x3dddba(0x2e8),_0x3dddba(0x470)):_0x5f3d46[_0x3dddba(0x356)]('pageup',_0x3dddba(0x1ee)):VisuMZ[_0x3dddba(0xe4)][_0x3dddba(0x2b4)][_0x3dddba(0x4e1)](this);},Scene_Equip[_0x1d6c8a(0x17c)][_0x1d6c8a(0x448)]=function(){const _0x45b431=_0x1d6c8a,_0x41a73d=this['commandWindowRect'](),_0x2b8d2e=this[_0x45b431(0x1b9)]()?this[_0x45b431(0x37c)]():0x0,_0x16cfe6=_0x41a73d['y']+_0x41a73d['height'],_0x515103=Graphics['boxWidth']-this[_0x45b431(0x37c)](),_0x2f50ff=this[_0x45b431(0x4b1)]()-_0x41a73d[_0x45b431(0x3d7)];return new Rectangle(_0x2b8d2e,_0x16cfe6,_0x515103,_0x2f50ff);},VisuMZ[_0x1d6c8a(0xe4)][_0x1d6c8a(0x33a)]=Scene_Equip[_0x1d6c8a(0x17c)][_0x1d6c8a(0x30b)],Scene_Equip[_0x1d6c8a(0x17c)][_0x1d6c8a(0x30b)]=function(){const _0x139610=_0x1d6c8a;return this[_0x139610(0x2ad)]()?this[_0x139610(0x23a)]():VisuMZ[_0x139610(0xe4)][_0x139610(0x33a)][_0x139610(0x4e1)](this);},Scene_Equip[_0x1d6c8a(0x17c)][_0x1d6c8a(0x37c)]=function(){const _0x343052=_0x1d6c8a;if(this[_0x343052(0x2ad)]())return this[_0x343052(0x532)]();else{if(_0x343052(0x113)!==_0x343052(0x113)){if(this[_0x343052(0x424)]()==='equip')_0x199467[_0x343052(0x17c)][_0x343052(0x4bb)][_0x343052(0x4e1)](this);}else return VisuMZ[_0x343052(0xe4)][_0x343052(0x20b)][_0x343052(0x3af)][_0x343052(0x4bf)];}},Scene_Equip[_0x1d6c8a(0x17c)][_0x1d6c8a(0x532)]=function(){const _0x5b9d0f=_0x1d6c8a;return Math[_0x5b9d0f(0x17f)](Graphics['boxWidth']/0x2);},Scene_Equip[_0x1d6c8a(0x17c)][_0x1d6c8a(0x12c)]=function(){const _0x4bd857=_0x1d6c8a;this[_0x4bd857(0x1f0)][_0x4bd857(0x1c8)](_0x4bd857(0x3b0),this[_0x4bd857(0x4ec)][_0x4bd857(0x238)](this)),this[_0x4bd857(0x1f0)][_0x4bd857(0x1c8)](_0x4bd857(0x1ee),this[_0x4bd857(0x417)][_0x4bd857(0x238)](this)),this[_0x4bd857(0x1f0)][_0x4bd857(0x1c8)](_0x4bd857(0x52e),this[_0x4bd857(0x54e)][_0x4bd857(0x238)](this));},VisuMZ['ItemsEquipsCore'][_0x1d6c8a(0x1ce)]=Scene_Equip[_0x1d6c8a(0x17c)][_0x1d6c8a(0x292)],Scene_Equip['prototype']['commandEquip']=function(){const _0x1f2f88=_0x1d6c8a;if(this[_0x1f2f88(0x12f)]()){if(_0x1f2f88(0x35e)!==_0x1f2f88(0xe0))this[_0x1f2f88(0xec)][_0x1f2f88(0x1fa)](),this[_0x1f2f88(0xec)]['deactivate']();else return _0x283a36[_0x1f2f88(0x362)]()['canUse'](_0x4fd1c0);}VisuMZ[_0x1f2f88(0xe4)][_0x1f2f88(0x1ce)]['call'](this);},VisuMZ['ItemsEquipsCore'][_0x1d6c8a(0x27c)]=Scene_Equip[_0x1d6c8a(0x17c)][_0x1d6c8a(0xea)],Scene_Equip[_0x1d6c8a(0x17c)]['onSlotOk']=function(){const _0x4a5359=_0x1d6c8a;if(this['_slotWindow'][_0x4a5359(0x4f7)]()>=0x0)VisuMZ['ItemsEquipsCore']['Scene_Equip_onSlotOk'][_0x4a5359(0x4e1)](this),this[_0x4a5359(0x3ff)]();else{if(_0x4a5359(0x12b)!==_0x4a5359(0x20a))this[_0x4a5359(0x1f0)][_0x4a5359(0x565)](0x0),this[_0x4a5359(0x1f0)]['activate']();else return _0x327d3f[_0x4a5359(0xe4)][_0x4a5359(0x20b)][_0x4a5359(0x337)]['LabelSpeed'];}},Scene_Equip[_0x1d6c8a(0x17c)]['onSlotOkAutoSelect']=function(){const _0x3c7829=_0x1d6c8a;this[_0x3c7829(0x15b)]['refresh']();const _0xe7745a=this[_0x3c7829(0x1f0)][_0x3c7829(0x199)](),_0x508007=this['_itemWindow']['_data'][_0x3c7829(0x23d)](_0xe7745a),_0x2abaaa=Math[_0x3c7829(0x17f)](this['_itemWindow'][_0x3c7829(0x4fd)]()/0x2)-0x1;this[_0x3c7829(0x15b)][_0x3c7829(0x565)](_0x508007>=0x0?_0x508007:0x0),this[_0x3c7829(0x15b)][_0x3c7829(0x382)](this[_0x3c7829(0x15b)][_0x3c7829(0x4f7)]()-_0x2abaaa);},VisuMZ['ItemsEquipsCore']['Scene_Equip_onSlotCancel']=Scene_Equip[_0x1d6c8a(0x17c)][_0x1d6c8a(0x2fb)],Scene_Equip['prototype'][_0x1d6c8a(0x2fb)]=function(){const _0x3a97a0=_0x1d6c8a;VisuMZ[_0x3a97a0(0xe4)][_0x3a97a0(0x2a5)][_0x3a97a0(0x4e1)](this),this[_0x3a97a0(0x12f)]()&&(this[_0x3a97a0(0xec)][_0x3a97a0(0x565)](0x0),this[_0x3a97a0(0x1f0)][_0x3a97a0(0x1c5)]());},VisuMZ['ItemsEquipsCore'][_0x1d6c8a(0x1a9)]=Scene_Equip[_0x1d6c8a(0x17c)][_0x1d6c8a(0x2bf)],Scene_Equip[_0x1d6c8a(0x17c)][_0x1d6c8a(0x2bf)]=function(){const _0x1c52da=_0x1d6c8a;VisuMZ[_0x1c52da(0xe4)][_0x1c52da(0x1a9)][_0x1c52da(0x4e1)](this),this['isUseModernControls']()&&(this['_commandWindow'][_0x1c52da(0x1c5)](),this[_0x1c52da(0xec)][_0x1c52da(0x1fa)](),this[_0x1c52da(0x1f0)]['smoothSelect'](0x0),this[_0x1c52da(0x1f0)][_0x1c52da(0x16e)]());},Scene_Equip['prototype']['buttonAssistSlotWindowShift']=function(){const _0x1434f7=_0x1d6c8a;if(!this[_0x1434f7(0x1f0)])return![];if(!this[_0x1434f7(0x1f0)][_0x1434f7(0x505)])return![];return this['_slotWindow']['isShiftRemoveShortcutEnabled']();},Scene_Equip[_0x1d6c8a(0x17c)][_0x1d6c8a(0x40d)]=function(){const _0x17f077=_0x1d6c8a;if(this[_0x17f077(0x2ef)]())return TextManager['getInputButtonString'](_0x17f077(0x489));return Scene_MenuBase[_0x17f077(0x17c)][_0x17f077(0x40d)][_0x17f077(0x4e1)](this);},Scene_Equip[_0x1d6c8a(0x17c)][_0x1d6c8a(0x2c2)]=function(){const _0x24f98b=_0x1d6c8a;if(this[_0x24f98b(0x2ef)]())return VisuMZ['ItemsEquipsCore']['Settings'][_0x24f98b(0x3af)]['buttonAssistRemove'];return Scene_MenuBase[_0x24f98b(0x17c)][_0x24f98b(0x2c2)][_0x24f98b(0x4e1)](this);},Scene_Equip['prototype'][_0x1d6c8a(0x3b4)]=function(){const _0x7f933a=_0x1d6c8a;if(this[_0x7f933a(0x2ef)]()){if(_0x7f933a(0x1e4)===_0x7f933a(0x1e4))return this['_buttonAssistWindow']['width']/0x5/-0x3;else{const _0x58d23e=_0x472755[_0x7f933a(0xe4)][_0x7f933a(0x20b)][_0x7f933a(0x53e)]['FontColor'];return _0x58d23e[_0x7f933a(0x2b8)](/#(.*)/i)?'#'+_0x3b09c3(_0x3a37c6['$1']):_0x10bd5b[_0x7f933a(0x493)](_0x58d23e);}}return Scene_MenuBase[_0x7f933a(0x17c)][_0x7f933a(0x3b4)]['call'](this);},Scene_Equip['prototype']['popScene']=function(){const _0x3410c6=_0x1d6c8a;SceneManager[_0x3410c6(0x47e)]();},VisuMZ[_0x1d6c8a(0xe4)][_0x1d6c8a(0x3fb)]=Scene_Load[_0x1d6c8a(0x17c)][_0x1d6c8a(0x2eb)],Scene_Load[_0x1d6c8a(0x17c)]['reloadMapIfUpdated']=function(){const _0x5c551e=_0x1d6c8a;VisuMZ['ItemsEquipsCore'][_0x5c551e(0x3fb)]['call'](this),this['refreshActorEquipSlotsIfUpdated']();},Scene_Load[_0x1d6c8a(0x17c)]['refreshActorEquipSlotsIfUpdated']=function(){const _0x355159=_0x1d6c8a;if($gameSystem[_0x355159(0x1f6)]()!==$dataSystem[_0x355159(0x1f6)])for(const _0x3846fb of $gameActors['_data']){if(_0x355159(0x533)===_0x355159(0x3cf)){if(this['_calculatingJSParameters'])return 0x0;const _0x4e07e9=(_0x5ac548['isWeapon'](_0x40862e)?_0x355159(0x2d1):_0x355159(0x4c4))['format'](_0xe01df0['id']),_0x4342cb=_0x355159(0x1b8)[_0x355159(0x1af)](_0x4e07e9,_0x326c36);if(_0x504da6['ItemsEquipsCore'][_0x355159(0xeb)][_0x4342cb]){this['_calculatingJSParameters']=!![];const _0x499ca5=_0x146a88[_0x355159(0xe4)][_0x355159(0xeb)][_0x4342cb][_0x355159(0x4e1)](this,_0x2f176b,_0x9067fd);return this[_0x355159(0x2da)]=![],_0x499ca5;}else return 0x0;}else{if(_0x3846fb)_0x3846fb[_0x355159(0x1b2)]();}}},Scene_Shop[_0x1d6c8a(0x17c)]['isBottomHelpMode']=function(){const _0x35de0f=_0x1d6c8a;if(ConfigManager[_0x35de0f(0x11f)]&&ConfigManager[_0x35de0f(0x454)]!==undefined){if(_0x35de0f(0x234)!==_0x35de0f(0x234))this[_0x35de0f(0x110)](_0x12e9a3[_0x35de0f(0x4e8)](_0x73ea59),_0x280579+_0x2ec8eb,_0x1498db,_0x46f0a9);else return ConfigManager[_0x35de0f(0x454)];}else{if(this[_0x35de0f(0x2ad)]())return'XTrHn'!==_0x35de0f(0x242)?this[_0x35de0f(0x16c)]()[_0x35de0f(0x2b8)](/LOWER/i):_0x3f041a[_0x35de0f(0xe4)][_0x35de0f(0x20b)][_0x35de0f(0x2d0)][_0x35de0f(0x169)];else Scene_MenuBase[_0x35de0f(0x17c)][_0x35de0f(0x1b9)][_0x35de0f(0x4e1)](this);}},Scene_Shop[_0x1d6c8a(0x17c)][_0x1d6c8a(0x1b9)]=function(){const _0xab67cc=_0x1d6c8a;if(ConfigManager['uiMenuStyle']&&ConfigManager[_0xab67cc(0x42c)]!==undefined)return ConfigManager[_0xab67cc(0x42c)];else{if(this[_0xab67cc(0x2ad)]())return this[_0xab67cc(0x16c)]()['match'](/RIGHT/i);else Scene_MenuBase[_0xab67cc(0x17c)][_0xab67cc(0x1b9)][_0xab67cc(0x4e1)](this);}},Scene_Shop[_0x1d6c8a(0x17c)][_0x1d6c8a(0x16c)]=function(){const _0x47d286=_0x1d6c8a;return VisuMZ[_0x47d286(0xe4)][_0x47d286(0x20b)][_0x47d286(0x41b)]['LayoutStyle'];},Scene_Shop['prototype'][_0x1d6c8a(0x12f)]=function(){const _0x110332=_0x1d6c8a;return this[_0x110332(0x393)]&&this[_0x110332(0x393)]['isUseModernControls']();},Scene_Shop[_0x1d6c8a(0x17c)]['isUseItemsEquipsCoreUpdatedLayout']=function(){const _0x4af881=_0x1d6c8a;return VisuMZ[_0x4af881(0xe4)]['Settings'][_0x4af881(0x41b)][_0x4af881(0x169)];},VisuMZ[_0x1d6c8a(0xe4)][_0x1d6c8a(0x251)]=Scene_Shop[_0x1d6c8a(0x17c)][_0x1d6c8a(0x243)],Scene_Shop[_0x1d6c8a(0x17c)]['prepare']=function(_0x137b1b,_0x50287e){const _0xecb0e0=_0x1d6c8a;_0x137b1b=JsonEx[_0xecb0e0(0x280)](_0x137b1b),VisuMZ['ItemsEquipsCore'][_0xecb0e0(0x251)][_0xecb0e0(0x4e1)](this,_0x137b1b,_0x50287e),this[_0xecb0e0(0x447)]();},Scene_Shop['prototype'][_0x1d6c8a(0x447)]=function(){const _0x24a156=_0x1d6c8a;this['_goodsCount']=0x0;for(const _0x267b88 of this[_0x24a156(0x34b)]){if(this[_0x24a156(0x39b)](_0x267b88))this[_0x24a156(0x108)]++;else{if(_0x24a156(0x246)===_0x24a156(0x105)){const _0x4f7985=_0x439ce8['ItemsEquipsCore'][_0x24a156(0x20b)][_0x24a156(0x337)][_0x24a156(0x361)];return _0x4f7985[_0x24a156(0x1af)](_0x21769a['hp']);}else _0x267b88[0x0]=-0x1;}}},Scene_Shop['prototype'][_0x1d6c8a(0x39b)]=function(_0x42e650){const _0x3f1242=_0x1d6c8a;if(_0x42e650[0x0]>0x2||_0x42e650[0x0]<0x0)return![];const _0x1d9b52=[$dataItems,$dataWeapons,$dataArmors][_0x42e650[0x0]][_0x42e650[0x1]];if(!_0x1d9b52)return![];const _0x392886=_0x1d9b52[_0x3f1242(0x492)]||'';if(_0x392886[_0x3f1242(0x2b8)](/<SHOW SHOP[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x586694=JSON[_0x3f1242(0x3e0)]('['+RegExp['$1'][_0x3f1242(0x2b8)](/\d+/g)+']');for(const _0x5d51d2 of _0x586694){if(_0x3f1242(0x118)!==_0x3f1242(0x118))return _0x333cd7['isWeapon'](_0x1b4a4f)&&_0x57abc6[_0x3f1242(0x369)]===_0x58beac(_0x3a4d94['$1']);else{if(!$gameSwitches['value'](_0x5d51d2))return![];}}return!![];}if(_0x392886[_0x3f1242(0x2b8)](/<SHOW SHOP ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0xa378a5=JSON[_0x3f1242(0x3e0)]('['+RegExp['$1'][_0x3f1242(0x2b8)](/\d+/g)+']');for(const _0x4a7748 of _0xa378a5){if(_0x3f1242(0x253)===_0x3f1242(0x253)){if(!$gameSwitches[_0x3f1242(0x15a)](_0x4a7748))return![];}else{this[_0x3f1242(0x476)](),this[_0x3f1242(0x39c)]();if(this[_0x3f1242(0x50e)])this['_actor']['refresh']();this[_0x3f1242(0x2ad)]()?this[_0x3f1242(0x307)]():_0x44113d[_0x3f1242(0xe4)][_0x3f1242(0x556)][_0x3f1242(0x4e1)](this);}}return!![];}if(_0x392886[_0x3f1242(0x2b8)](/<SHOW SHOP ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x3f1242(0x22d)!==_0x3f1242(0x22d))this[_0x3f1242(0x114)][_0x3f1242(0x221)](new _0x3b923e());else{const _0x3d9031=JSON[_0x3f1242(0x3e0)]('['+RegExp['$1'][_0x3f1242(0x2b8)](/\d+/g)+']');for(const _0x3f55a9 of _0x3d9031){if($gameSwitches[_0x3f1242(0x15a)](_0x3f55a9))return!![];}return![];}}if(_0x392886[_0x3f1242(0x2b8)](/<HIDE SHOP[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x2c2221=JSON['parse']('['+RegExp['$1'][_0x3f1242(0x2b8)](/\d+/g)+']');for(const _0xc510f7 of _0x2c2221){if(_0x3f1242(0x259)===_0x3f1242(0x259)){if(!$gameSwitches['value'](_0xc510f7))return!![];}else _0x4f8952[_0x3f1242(0xe4)][_0x3f1242(0x27c)][_0x3f1242(0x4e1)](this),this[_0x3f1242(0x3ff)]();}return![];}if(_0x392886[_0x3f1242(0x2b8)](/<HIDE SHOP ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x5303cc=JSON[_0x3f1242(0x3e0)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x567b4a of _0x5303cc){if(_0x3f1242(0x524)===_0x3f1242(0x524)){if(!$gameSwitches[_0x3f1242(0x15a)](_0x567b4a))return!![];}else{const _0x2a31d0=this[_0x3f1242(0x3b2)];_0x2a31d0[_0x3f1242(0x110)](_0x11052e,0x0,_0x350742['y'],_0x2a31d0[_0x3f1242(0x48a)],_0x3f1242(0x490));}}return![];}if(_0x392886[_0x3f1242(0x2b8)](/<HIDE SHOP ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x3f1242(0x29f)==='pjzxa'){const _0x124d74=JSON[_0x3f1242(0x3e0)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x3579f4 of _0x124d74){if(_0x3f1242(0x322)==='egizM'){if($gameSwitches[_0x3f1242(0x15a)](_0x3579f4))return![];}else{if(!_0x3e517a['value'](_0x256988))return!![];}}return!![];}else _0x1927ac=_0x3f1242(0x3c8)[_0x3f1242(0x1af)](_0x29dedf['id']);}return!![];},VisuMZ['ItemsEquipsCore'][_0x1d6c8a(0x3bb)]=Scene_Shop[_0x1d6c8a(0x17c)][_0x1d6c8a(0x396)],Scene_Shop[_0x1d6c8a(0x17c)]['create']=function(){const _0x4d20fd=_0x1d6c8a;VisuMZ[_0x4d20fd(0xe4)][_0x4d20fd(0x3bb)][_0x4d20fd(0x4e1)](this),this[_0x4d20fd(0x2ad)]()&&this[_0x4d20fd(0x437)](),this[_0x4d20fd(0x254)]();},Scene_Shop[_0x1d6c8a(0x17c)]['postCreateItemsEquipsCore']=function(){const _0x4e9e44=_0x1d6c8a;this[_0x4e9e44(0x107)][_0x4e9e44(0x2ee)](),this[_0x4e9e44(0x135)][_0x4e9e44(0x38b)](),this[_0x4e9e44(0x135)][_0x4e9e44(0x1fa)](),this['_statusWindow'][_0x4e9e44(0x38b)]();},Scene_Shop['prototype'][_0x1d6c8a(0x249)]=function(){const _0x5cc0f2=_0x1d6c8a;if(this[_0x5cc0f2(0x2ad)]()){if(_0x5cc0f2(0x13d)!==_0x5cc0f2(0x459))return this[_0x5cc0f2(0x1e0)]();else{const _0x3ddcb0=_0x307156[_0x5cc0f2(0x3e0)]('['+_0x50e9b2['$1']['match'](/\d+/g)+']');for(const _0x493bf9 of _0x3ddcb0){if(_0x1b8fa0[_0x5cc0f2(0x15a)](_0x493bf9))return![];}}}else{if('ilokF'==='ilokF')return Scene_MenuBase[_0x5cc0f2(0x17c)]['helpWindowRect']['call'](this);else for(const _0x1e3d94 of _0x3b7e1d['values'](this[_0x5cc0f2(0x305)])){_0x1e3d94[_0x5cc0f2(0x2ee)]();}}},Scene_Shop[_0x1d6c8a(0x17c)][_0x1d6c8a(0x1e0)]=function(){const _0x347187=_0x1d6c8a,_0x24f254=0x0,_0x2561f4=this['helpAreaTop'](),_0x44efd6=Graphics['boxWidth'],_0x568872=this[_0x347187(0x205)]();return new Rectangle(_0x24f254,_0x2561f4,_0x44efd6,_0x568872);},VisuMZ[_0x1d6c8a(0xe4)][_0x1d6c8a(0x2ed)]=Scene_Shop['prototype'][_0x1d6c8a(0x1f3)],Scene_Shop[_0x1d6c8a(0x17c)]['goldWindowRect']=function(){const _0x2cf968=_0x1d6c8a;return this[_0x2cf968(0x2ad)]()?this['goldWindowRectItemsEquipsCore']():VisuMZ[_0x2cf968(0xe4)][_0x2cf968(0x2ed)][_0x2cf968(0x4e1)](this);},Scene_Shop[_0x1d6c8a(0x17c)][_0x1d6c8a(0x4b5)]=function(){const _0x277a94=_0x1d6c8a,_0x1272d3=this[_0x277a94(0x3a3)](),_0x2d4d6d=this[_0x277a94(0x3ed)](0x1,!![]),_0x251442=this[_0x277a94(0x1b9)]()?0x0:Graphics[_0x277a94(0x16a)]-_0x1272d3,_0x43b187=this[_0x277a94(0x388)]();return new Rectangle(_0x251442,_0x43b187,_0x1272d3,_0x2d4d6d);},VisuMZ[_0x1d6c8a(0xe4)]['Scene_Shop_commandWindowRect']=Scene_Shop[_0x1d6c8a(0x17c)][_0x1d6c8a(0x26b)],Scene_Shop[_0x1d6c8a(0x17c)][_0x1d6c8a(0x26b)]=function(){const _0x140c1e=_0x1d6c8a;if(this[_0x140c1e(0x2ad)]())return this['commandWindowRectItemsEquipsCore']();else{if('kfiDQ'===_0x140c1e(0x153))this[_0x140c1e(0xe7)]();else return VisuMZ[_0x140c1e(0xe4)]['Scene_Shop_commandWindowRect'][_0x140c1e(0x4e1)](this);}},Scene_Shop[_0x1d6c8a(0x17c)][_0x1d6c8a(0x2dd)]=function(){const _0x28e5b4=_0x1d6c8a,_0x5a0a44=this[_0x28e5b4(0x1b9)]()?this[_0x28e5b4(0x3a3)]():0x0,_0x94aec2=this[_0x28e5b4(0x388)](),_0x50cf00=Graphics[_0x28e5b4(0x16a)]-this[_0x28e5b4(0x3a3)](),_0x14e739=this[_0x28e5b4(0x3ed)](0x1,!![]);return new Rectangle(_0x5a0a44,_0x94aec2,_0x50cf00,_0x14e739);},VisuMZ['ItemsEquipsCore'][_0x1d6c8a(0x139)]=Scene_Shop[_0x1d6c8a(0x17c)][_0x1d6c8a(0x47a)],Scene_Shop['prototype'][_0x1d6c8a(0x47a)]=function(){const _0x33ccb0=_0x1d6c8a;if(this[_0x33ccb0(0x2ad)]()){if(_0x33ccb0(0x2e6)!==_0x33ccb0(0x435))return this[_0x33ccb0(0x1e7)]();else{const _0x20319a=_0x16a40d(_0x2d70e5['$1'])||0x1;if(_0x1e360f>=_0x20319a)return!![];}}else return VisuMZ[_0x33ccb0(0xe4)]['Scene_Shop_numberWindowRect']['call'](this);},Scene_Shop[_0x1d6c8a(0x17c)][_0x1d6c8a(0x1e7)]=function(){const _0x44b82f=_0x1d6c8a,_0x48c125=this['_commandWindow']['y']+this[_0x44b82f(0xec)]['height'],_0x1b9ccc=Graphics['boxWidth']-this[_0x44b82f(0x37c)](),_0x44fc8f=this[_0x44b82f(0x1b9)]()?Graphics['boxWidth']-_0x1b9ccc:0x0,_0x5f0cf9=this[_0x44b82f(0x4b1)]()-this[_0x44b82f(0xec)][_0x44b82f(0x3d7)];return new Rectangle(_0x44fc8f,_0x48c125,_0x1b9ccc,_0x5f0cf9);},VisuMZ[_0x1d6c8a(0xe4)][_0x1d6c8a(0x34e)]=Scene_Shop[_0x1d6c8a(0x17c)][_0x1d6c8a(0x479)],Scene_Shop[_0x1d6c8a(0x17c)][_0x1d6c8a(0x479)]=function(){const _0x4f1b7b=_0x1d6c8a;return this[_0x4f1b7b(0x2ad)]()?this['statusWindowRectItemsEquipsCore']():VisuMZ[_0x4f1b7b(0xe4)]['Scene_Shop_statusWindowRect'][_0x4f1b7b(0x4e1)](this);},Scene_Shop['prototype'][_0x1d6c8a(0x1c9)]=function(){const _0x99f8a2=_0x1d6c8a,_0x545cfd=this[_0x99f8a2(0x37c)](),_0x1473f1=this[_0x99f8a2(0x4b1)]()-this[_0x99f8a2(0xec)][_0x99f8a2(0x3d7)],_0x170d66=this['isRightInputMode']()?0x0:Graphics[_0x99f8a2(0x16a)]-_0x545cfd,_0x54f50e=this[_0x99f8a2(0xec)]['y']+this[_0x99f8a2(0xec)][_0x99f8a2(0x3d7)];return new Rectangle(_0x170d66,_0x54f50e,_0x545cfd,_0x1473f1);},VisuMZ[_0x1d6c8a(0xe4)][_0x1d6c8a(0x31d)]=Scene_Shop[_0x1d6c8a(0x17c)]['buyWindowRect'],Scene_Shop['prototype'][_0x1d6c8a(0x34c)]=function(){const _0x216977=_0x1d6c8a;return this[_0x216977(0x2ad)]()?'xZNCg'===_0x216977(0x439)?_0x573ed5===null&&this['nonRemovableEtypes']()[_0x216977(0x1c3)](this['etypeId']())?![]:_0x40214b[_0x216977(0xe4)][_0x216977(0x468)]['call'](this,_0x4a9f1b):this[_0x216977(0x26a)]():VisuMZ[_0x216977(0xe4)][_0x216977(0x31d)][_0x216977(0x4e1)](this);},Scene_Shop[_0x1d6c8a(0x17c)]['buyWindowRectItemsEquipsCore']=function(){const _0x8662c0=_0x1d6c8a,_0x47f11a=this[_0x8662c0(0xec)]['y']+this[_0x8662c0(0xec)][_0x8662c0(0x3d7)],_0x16258f=Graphics[_0x8662c0(0x16a)]-this[_0x8662c0(0x37c)](),_0x1c0ac9=this[_0x8662c0(0x4b1)]()-this[_0x8662c0(0xec)][_0x8662c0(0x3d7)],_0x353f5d=this['isRightInputMode']()?Graphics[_0x8662c0(0x16a)]-_0x16258f:0x0;return new Rectangle(_0x353f5d,_0x47f11a,_0x16258f,_0x1c0ac9);},VisuMZ[_0x1d6c8a(0xe4)]['Scene_Shop_createCategoryWindow']=Scene_Shop[_0x1d6c8a(0x17c)][_0x1d6c8a(0x115)],Scene_Shop[_0x1d6c8a(0x17c)][_0x1d6c8a(0x115)]=function(){const _0x51c93b=_0x1d6c8a;VisuMZ['ItemsEquipsCore'][_0x51c93b(0x2a6)][_0x51c93b(0x4e1)](this),this[_0x51c93b(0x12f)]()&&(_0x51c93b(0x10d)===_0x51c93b(0x10b)?(_0x21293c===this[_0x51c93b(0x4f7)]()&&(this[_0x51c93b(0x1f9)]=!![]),this[_0x51c93b(0x16e)](),this[_0x51c93b(0x1e6)](_0x4f89f3)):this[_0x51c93b(0x324)]());},VisuMZ[_0x1d6c8a(0xe4)]['Scene_Shop_categoryWindowRect']=Scene_Shop['prototype'][_0x1d6c8a(0x497)],Scene_Shop[_0x1d6c8a(0x17c)][_0x1d6c8a(0x497)]=function(){const _0x5483bd=_0x1d6c8a;if(this['isUseItemsEquipsCoreUpdatedLayout']())return this[_0x5483bd(0x209)]();else{if(_0x5483bd(0x2d7)===_0x5483bd(0x4d2))_0x11c9ab[_0x5483bd(0x17c)][_0x5483bd(0x183)]['call'](this,_0xb7ee6a);else return VisuMZ[_0x5483bd(0xe4)][_0x5483bd(0x55e)]['call'](this);}},Scene_Shop['prototype'][_0x1d6c8a(0x209)]=function(){const _0x97685e=_0x1d6c8a,_0x4951ed=this['_commandWindow']['y'],_0x518dcf=this['_commandWindow'][_0x97685e(0x376)],_0x850d56=this[_0x97685e(0x3ed)](0x1,!![]),_0x4fdc11=this['isRightInputMode']()?Graphics[_0x97685e(0x16a)]-_0x518dcf:0x0;return new Rectangle(_0x4fdc11,_0x4951ed,_0x518dcf,_0x850d56);},Scene_Shop[_0x1d6c8a(0x17c)][_0x1d6c8a(0x324)]=function(){const _0x26ba73=_0x1d6c8a;delete this['_categoryWindow'][_0x26ba73(0x2f2)]['ok'],delete this[_0x26ba73(0x393)][_0x26ba73(0x2f2)][_0x26ba73(0x3b0)];},VisuMZ[_0x1d6c8a(0xe4)][_0x1d6c8a(0x3c3)]=Scene_Shop['prototype'][_0x1d6c8a(0xe8)],Scene_Shop['prototype'][_0x1d6c8a(0xe8)]=function(){const _0x27fd13=_0x1d6c8a;VisuMZ[_0x27fd13(0xe4)][_0x27fd13(0x3c3)][_0x27fd13(0x4e1)](this),this[_0x27fd13(0x2ad)]()&&(_0x27fd13(0xe1)!==_0x27fd13(0x315)?this[_0x27fd13(0x26f)]():_0x22092f[_0x27fd13(0xe4)][_0x27fd13(0x20b)][_0x27fd13(0x337)][_0x27fd13(0x2bd)][_0x27fd13(0x4e1)](this));},VisuMZ[_0x1d6c8a(0xe4)][_0x1d6c8a(0x150)]=Scene_Shop[_0x1d6c8a(0x17c)][_0x1d6c8a(0x1fb)],Scene_Shop[_0x1d6c8a(0x17c)][_0x1d6c8a(0x1fb)]=function(){const _0x44f093=_0x1d6c8a;if(this[_0x44f093(0x2ad)]()){if('yToqg'!==_0x44f093(0x41d))return this[_0x44f093(0x4f1)]();else this[_0x44f093(0x186)](_0x1b39d3,_0x2cec16,_0x1ee368,_0x18e260,!![]),_0x456770[_0x44f093(0x274)][_0x44f093(0x20b)][_0x44f093(0x1ca)][_0x44f093(0x2c9)]&&(_0x5a019d+=_0x35700b['iconWidth']+0x4);}else{if(_0x44f093(0xf3)!==_0x44f093(0xf3))_0x421b91=this[_0x44f093(0x50e)][_0x44f093(0x4e8)](_0x322e7b),_0x4e9adb=this[_0x44f093(0x41c)][_0x44f093(0x4e8)](_0x249359),_0x4c3a79=this['_tempActor']['param'](_0x7b15d6);else return VisuMZ[_0x44f093(0xe4)][_0x44f093(0x150)][_0x44f093(0x4e1)](this);}},Scene_Shop[_0x1d6c8a(0x17c)]['sellWindowRectItemsEquipsCore']=function(){const _0x511ab7=_0x1d6c8a,_0x2fd43e=this[_0x511ab7(0x393)]['y']+this[_0x511ab7(0x393)][_0x511ab7(0x3d7)],_0x159876=Graphics[_0x511ab7(0x16a)]-this[_0x511ab7(0x37c)](),_0x53b032=this[_0x511ab7(0x4b1)]()-this[_0x511ab7(0x393)][_0x511ab7(0x3d7)],_0x1cbf48=this[_0x511ab7(0x1b9)]()?Graphics['boxWidth']-_0x159876:0x0;return new Rectangle(_0x1cbf48,_0x2fd43e,_0x159876,_0x53b032);},Scene_Shop[_0x1d6c8a(0x17c)][_0x1d6c8a(0x26f)]=function(){const _0x3c42e9=_0x1d6c8a;this[_0x3c42e9(0x29c)][_0x3c42e9(0x4a5)](this[_0x3c42e9(0xfe)]);},Scene_Shop[_0x1d6c8a(0x17c)]['statusWidth']=function(){const _0x4c3030=_0x1d6c8a;return VisuMZ['ItemsEquipsCore'][_0x4c3030(0x20b)][_0x4c3030(0x337)]['Width'];},VisuMZ['ItemsEquipsCore'][_0x1d6c8a(0x2ff)]=Scene_Shop[_0x1d6c8a(0x17c)][_0x1d6c8a(0x3eb)],Scene_Shop[_0x1d6c8a(0x17c)][_0x1d6c8a(0x3eb)]=function(){const _0x37cf2f=_0x1d6c8a;VisuMZ['ItemsEquipsCore']['Scene_Shop_activateSellWindow'][_0x37cf2f(0x4e1)](this),this[_0x37cf2f(0x2ad)]()&&this[_0x37cf2f(0xfe)][_0x37cf2f(0x38b)](),this['_sellWindow']['updateHelp']();},VisuMZ['ItemsEquipsCore'][_0x1d6c8a(0x124)]=Scene_Shop[_0x1d6c8a(0x17c)][_0x1d6c8a(0x231)],Scene_Shop['prototype']['commandBuy']=function(){const _0x51c424=_0x1d6c8a;VisuMZ[_0x51c424(0xe4)][_0x51c424(0x124)][_0x51c424(0x4e1)](this);if(this[_0x51c424(0x2ad)]()){if(_0x51c424(0x562)!==_0x51c424(0x3f2))this[_0x51c424(0x545)]();else{const _0x46c59c=_0x4e510d+(this[_0x51c424(0x224)]()-_0x2c83d8[_0x51c424(0x12a)])/0x2,_0x4472cd=_0x41512e[_0x51c424(0x14e)]+0x4,_0x2df3fa=_0x83e4de[_0x51c424(0x23c)](0x0,_0x3e9b5e-_0x4472cd);this['changeTextColor'](_0x2a3718[_0x51c424(0xe3)](_0x575577)),this[_0x51c424(0x2c8)](_0x2bb30a[_0x51c424(0x480)],_0x39d2be,_0x46c59c),this[_0x51c424(0x110)](_0x3e97b6['name'],_0x4c1860+_0x4472cd,_0x10e34f,_0x2df3fa),this[_0x51c424(0x2bc)]();}}},Scene_Shop[_0x1d6c8a(0x17c)]['commandBuyItemsEquipsCore']=function(){const _0x3a0f8f=_0x1d6c8a;this['_buyWindowLastIndex']=this['_buyWindowLastIndex']||0x0,this['_buyWindow'][_0x3a0f8f(0x565)](this['_buyWindowLastIndex']);},VisuMZ[_0x1d6c8a(0xe4)][_0x1d6c8a(0x46d)]=Scene_Shop[_0x1d6c8a(0x17c)]['commandSell'],Scene_Shop[_0x1d6c8a(0x17c)][_0x1d6c8a(0x43f)]=function(){const _0x5af491=_0x1d6c8a;VisuMZ[_0x5af491(0xe4)][_0x5af491(0x46d)][_0x5af491(0x4e1)](this);if(this[_0x5af491(0x2ad)]()){if(_0x5af491(0x217)===_0x5af491(0x217))this[_0x5af491(0x19e)]();else return this[_0x5af491(0x1c9)]();}this[_0x5af491(0x12f)]()&&(this[_0x5af491(0x393)][_0x5af491(0x565)](0x0),this[_0x5af491(0x2aa)]());},Scene_Shop[_0x1d6c8a(0x17c)][_0x1d6c8a(0x19e)]=function(){const _0x4baf5c=_0x1d6c8a;this[_0x4baf5c(0x135)][_0x4baf5c(0x2ee)](),this['_commandWindow']['hide']();},VisuMZ[_0x1d6c8a(0xe4)][_0x1d6c8a(0x10f)]=Scene_Shop['prototype'][_0x1d6c8a(0x4a9)],Scene_Shop[_0x1d6c8a(0x17c)][_0x1d6c8a(0x4a9)]=function(){const _0x4070bd=_0x1d6c8a;VisuMZ[_0x4070bd(0xe4)][_0x4070bd(0x10f)][_0x4070bd(0x4e1)](this),this[_0x4070bd(0x2ad)]()&&(_0x4070bd(0x502)==='NUflT'?this[_0x4070bd(0x173)]():this['createStatusWindow']());},Scene_Shop[_0x1d6c8a(0x17c)][_0x1d6c8a(0x173)]=function(){const _0x327f4f=_0x1d6c8a;this[_0x327f4f(0x106)]=this[_0x327f4f(0x135)][_0x327f4f(0x4f7)](),this[_0x327f4f(0x135)]['show'](),this[_0x327f4f(0x135)][_0x327f4f(0x1fa)](),this[_0x327f4f(0x135)][_0x327f4f(0x157)](0x0,0x0),this[_0x327f4f(0xfe)][_0x327f4f(0x38b)](),this[_0x327f4f(0x107)][_0x327f4f(0x2ee)]();},VisuMZ['ItemsEquipsCore'][_0x1d6c8a(0x553)]=Scene_Shop[_0x1d6c8a(0x17c)][_0x1d6c8a(0x161)],Scene_Shop[_0x1d6c8a(0x17c)]['onCategoryCancel']=function(){const _0x16cd1f=_0x1d6c8a;VisuMZ[_0x16cd1f(0xe4)][_0x16cd1f(0x553)][_0x16cd1f(0x4e1)](this);if(this[_0x16cd1f(0x2ad)]()){if(_0x16cd1f(0x103)===_0x16cd1f(0x103))this[_0x16cd1f(0x102)]();else{const _0x5127e7=_0x3034b5[_0x16cd1f(0xe4)]['Settings'][_0x16cd1f(0x337)][_0x16cd1f(0x496)];return _0x5127e7[_0x16cd1f(0x1af)](_0x347616['tp']);}}},Scene_Shop[_0x1d6c8a(0x17c)]['onCategoryCancelItemsEquipsCore']=function(){const _0x3280df=_0x1d6c8a;this[_0x3280df(0x135)]['show'](),this[_0x3280df(0xec)][_0x3280df(0x38b)]();},VisuMZ['ItemsEquipsCore'][_0x1d6c8a(0x2f0)]=Scene_Shop[_0x1d6c8a(0x17c)]['onSellOk'],Scene_Shop[_0x1d6c8a(0x17c)][_0x1d6c8a(0x47b)]=function(){const _0x5d9300=_0x1d6c8a;VisuMZ[_0x5d9300(0xe4)]['Scene_Shop_onSellOk'][_0x5d9300(0x4e1)](this),this[_0x5d9300(0x2ad)]()&&('KYufa'!==_0x5d9300(0x1d8)?_0x278a2b[_0x5d9300(0xe4)][_0x5d9300(0x556)][_0x5d9300(0x4e1)](this):this[_0x5d9300(0x2d5)]());},Scene_Shop[_0x1d6c8a(0x17c)]['onSellOkItemsEquipsCore']=function(){const _0xa3d740=_0x1d6c8a;this[_0xa3d740(0x393)][_0xa3d740(0x38b)]();},VisuMZ[_0x1d6c8a(0xe4)][_0x1d6c8a(0x360)]=Scene_Shop['prototype']['onSellCancel'],Scene_Shop['prototype'][_0x1d6c8a(0x4dc)]=function(){const _0x134d0d=_0x1d6c8a;VisuMZ[_0x134d0d(0xe4)][_0x134d0d(0x360)]['call'](this);if(this[_0x134d0d(0x12f)]()){if(_0x134d0d(0x338)===_0x134d0d(0x338))this[_0x134d0d(0x161)]();else return _0x1f21ce[_0x134d0d(0x42c)];}if(this[_0x134d0d(0x2ad)]()){if(_0x134d0d(0x403)!=='qBncb')return _0x3a5fab[_0x134d0d(0xe4)][_0x134d0d(0x20b)][_0x134d0d(0x41b)][_0x134d0d(0x214)];else this[_0x134d0d(0x107)][_0x134d0d(0x2ee)]();}},VisuMZ[_0x1d6c8a(0xe4)][_0x1d6c8a(0x1b0)]=Scene_Shop[_0x1d6c8a(0x17c)]['sellingPrice'],Scene_Shop['prototype'][_0x1d6c8a(0x44e)]=function(){const _0x341b69=_0x1d6c8a;let _0x3b3c3a=this[_0x341b69(0x289)]();const _0x4b2ac5=this[_0x341b69(0x1a6)];return _0x3b3c3a=VisuMZ[_0x341b69(0xe4)]['Settings']['ShopScene']['SellPriceJS'][_0x341b69(0x4e1)](this,_0x4b2ac5,_0x3b3c3a),_0x3b3c3a;},Scene_Shop[_0x1d6c8a(0x17c)][_0x1d6c8a(0x289)]=function(){const _0x34bf8d=_0x1d6c8a;let _0x298dae=this[_0x34bf8d(0x1a6)][_0x34bf8d(0x24e)];if(!this['_item'])return 0x0;else{if(this[_0x34bf8d(0x1a6)][_0x34bf8d(0x492)][_0x34bf8d(0x2b8)](/<JS SELL PRICE>\s*([\s\S]*)\s*<\/JS SELL PRICE>/i)){if(_0x34bf8d(0x185)===_0x34bf8d(0x28d))_0x1cb166[_0x34bf8d(0x2ee)]();else{const _0x5231c7=String(RegExp['$1']);let _0x3ddac5=this[_0x34bf8d(0x1a6)],_0x148769=_0x298dae*this[_0x34bf8d(0x354)]();try{eval(_0x5231c7);}catch(_0x5b3581){if($gameTemp[_0x34bf8d(0xfa)]())console[_0x34bf8d(0x27a)](_0x5b3581);}if(isNaN(_0x148769))_0x148769=0x0;return Math[_0x34bf8d(0x17f)](_0x148769);}}else return this[_0x34bf8d(0x1a6)]['note'][_0x34bf8d(0x2b8)](/<SELL PRICE:[ ](\d+)>/i)?'bjeTU'===_0x34bf8d(0x28c)?parseInt(RegExp['$1']):_0x34bf8d(0x28a):Math[_0x34bf8d(0x17f)](this[_0x34bf8d(0x4a0)]());}},Scene_Shop['prototype'][_0x1d6c8a(0x4a0)]=function(){const _0x18448c=_0x1d6c8a;return this[_0x18448c(0x1a6)][_0x18448c(0x24e)]*this[_0x18448c(0x354)]();},Scene_Shop[_0x1d6c8a(0x17c)]['sellPriceRate']=function(){const _0x5012b4=_0x1d6c8a;return VisuMZ[_0x5012b4(0xe4)]['Settings'][_0x5012b4(0x41b)][_0x5012b4(0x286)];},Scene_Shop['prototype'][_0x1d6c8a(0x471)]=function(){const _0x6020f9=_0x1d6c8a;if(!this[_0x6020f9(0x16c)]())return![];if(!this[_0x6020f9(0x12f)]())return![];if(!this['_sellWindow'])return![];if(!this['_sellWindow'][_0x6020f9(0x505)])return![];return this[_0x6020f9(0x16c)]()&&this['isUseModernControls']();},Scene_Shop[_0x1d6c8a(0x17c)][_0x1d6c8a(0x50d)]=function(){const _0x39f0aa=_0x1d6c8a;if(this['buttonAssistItemListRequirement']())return this[_0x39f0aa(0x29c)][_0x39f0aa(0x40a)]()===0x1?TextManager[_0x39f0aa(0x356)]('left',_0x39f0aa(0x470)):TextManager[_0x39f0aa(0x356)](_0x39f0aa(0x52e),'pagedown');else{if(this['_numberWindow']&&this['_numberWindow'][_0x39f0aa(0x505)]){if(_0x39f0aa(0x4e2)!==_0x39f0aa(0x4e2))this[_0x39f0aa(0x3dc)][_0x39f0aa(0x442)](),this[_0x39f0aa(0x4ac)]['clear'](),this[_0x39f0aa(0x1a6)]&&(this[_0x39f0aa(0x39c)](),this[_0x39f0aa(0x558)](!![]),this[_0x39f0aa(0x302)](),this[_0x39f0aa(0x285)]()?this[_0x39f0aa(0x1d0)]():this[_0x39f0aa(0x152)](),this[_0x39f0aa(0x501)]());else return TextManager['getInputMultiButtonStrings'](_0x39f0aa(0x2e8),_0x39f0aa(0x470));}}return Scene_MenuBase[_0x39f0aa(0x17c)]['buttonAssistKey1'][_0x39f0aa(0x4e1)](this);},Scene_Shop[_0x1d6c8a(0x17c)][_0x1d6c8a(0x276)]=function(){const _0x1c8cfd=_0x1d6c8a;if(this['_numberWindow']&&this['_numberWindow']['active']){if(_0x1c8cfd(0x21a)!==_0x1c8cfd(0x21a)){if(_0x28f968[_0x1c8cfd(0x2b8)](/(.*):[ ](.*)/i)){const _0x208396=_0x34479c(_0x7615dd['$1'])[_0x1c8cfd(0x421)]()[_0x1c8cfd(0x48e)](),_0x4e1f68=_0x14636a(_0x2a504a['$2'])['trim']();this[_0x1c8cfd(0x25a)][_0x208396]=_0x4e1f68;}}else return TextManager[_0x1c8cfd(0x356)]('up','down');}return Scene_MenuBase[_0x1c8cfd(0x17c)][_0x1c8cfd(0x276)][_0x1c8cfd(0x4e1)](this);},Scene_Shop['prototype'][_0x1d6c8a(0x31c)]=function(){const _0x53baca=_0x1d6c8a;if(this[_0x53baca(0x471)]())return VisuMZ[_0x53baca(0xe4)][_0x53baca(0x20b)][_0x53baca(0x2d0)][_0x53baca(0x2b1)];else{if(this[_0x53baca(0x239)]&&this[_0x53baca(0x239)][_0x53baca(0x505)]){if(_0x53baca(0x4d4)!==_0x53baca(0x3a6))return VisuMZ[_0x53baca(0xe4)][_0x53baca(0x20b)][_0x53baca(0x41b)][_0x53baca(0x4d5)];else{_0x43a315+=_0x53baca(0x17d)[_0x53baca(0x1af)](_0x5dd00f['iconIndex']),_0x5542c5++;if(_0x55abb4>=_0x2f04c5)return _0x51a1cb;}}}return Scene_MenuBase[_0x53baca(0x17c)][_0x53baca(0x31c)]['call'](this);},Scene_Shop[_0x1d6c8a(0x17c)][_0x1d6c8a(0x4a7)]=function(){const _0x2e78be=_0x1d6c8a;if(this['_numberWindow']&&this[_0x2e78be(0x239)][_0x2e78be(0x505)])return VisuMZ[_0x2e78be(0xe4)][_0x2e78be(0x20b)]['ShopScene'][_0x2e78be(0x148)];return Scene_MenuBase[_0x2e78be(0x17c)][_0x2e78be(0x4a7)]['call'](this);},Scene_Shop[_0x1d6c8a(0x17c)][_0x1d6c8a(0x254)]=function(){const _0x29c303=_0x1d6c8a;if(!SceneManager[_0x29c303(0x263)]())return;const _0x400864=VisuMZ['ItemsEquipsCore'][_0x29c303(0x20b)][_0x29c303(0x41b)];_0x400864[_0x29c303(0x15c)]&&$gameSwitches['setValue'](_0x400864['SwitchBuy'],![]);if(_0x400864['SwitchSell']){if(_0x29c303(0x295)!==_0x29c303(0x295))return _0x67cd86[_0x29c303(0x37a)]&&_0x154329[_0x29c303(0x17c)][_0x29c303(0x12f)][_0x29c303(0x4e1)](this);else $gameSwitches['setValue'](_0x400864[_0x29c303(0x235)],![]);}},VisuMZ[_0x1d6c8a(0xe4)][_0x1d6c8a(0x544)]=Scene_Shop[_0x1d6c8a(0x17c)][_0x1d6c8a(0x1c1)],Scene_Shop[_0x1d6c8a(0x17c)][_0x1d6c8a(0x1c1)]=function(_0x42d686){const _0x4bb382=_0x1d6c8a;VisuMZ[_0x4bb382(0xe4)][_0x4bb382(0x544)]['call'](this,_0x42d686);if(_0x42d686<=0x0)return;const _0x2119b9=VisuMZ[_0x4bb382(0xe4)][_0x4bb382(0x20b)][_0x4bb382(0x41b)];_0x2119b9[_0x4bb382(0x15c)]&&$gameSwitches['setValue'](_0x2119b9['SwitchBuy'],!![]);},VisuMZ[_0x1d6c8a(0xe4)][_0x1d6c8a(0x2c5)]=Scene_Shop[_0x1d6c8a(0x17c)]['doSell'],Scene_Shop[_0x1d6c8a(0x17c)][_0x1d6c8a(0x499)]=function(_0x1016f5){const _0x261ab2=_0x1d6c8a;VisuMZ[_0x261ab2(0xe4)][_0x261ab2(0x2c5)][_0x261ab2(0x4e1)](this,_0x1016f5);if(_0x1016f5<=0x0)return;const _0x361cb3=VisuMZ['ItemsEquipsCore'][_0x261ab2(0x20b)][_0x261ab2(0x41b)];_0x361cb3['SwitchBuy']&&$gameSwitches['setValue'](_0x361cb3['SwitchSell'],!![]);};function Sprite_NewLabel(){const _0x1dd8e3=_0x1d6c8a;this[_0x1dd8e3(0x4ca)](...arguments);}Sprite_NewLabel[_0x1d6c8a(0x17c)]=Object[_0x1d6c8a(0x396)](Sprite[_0x1d6c8a(0x17c)]),Sprite_NewLabel['prototype']['constructor']=Sprite_NewLabel,Sprite_NewLabel['prototype']['initialize']=function(){const _0x2cd1b1=_0x1d6c8a;Sprite[_0x2cd1b1(0x17c)]['initialize'][_0x2cd1b1(0x4e1)](this),this[_0x2cd1b1(0xe2)]();},Sprite_NewLabel[_0x1d6c8a(0x17c)]['createBitmap']=function(){const _0x23b48f=_0x1d6c8a,_0x1ab5ba=ImageManager[_0x23b48f(0x14e)],_0x262cda=ImageManager[_0x23b48f(0x12a)];this[_0x23b48f(0x1b5)]=new Bitmap(_0x1ab5ba,_0x262cda),this[_0x23b48f(0x4e3)](),this[_0x23b48f(0x3bf)]();},Sprite_NewLabel[_0x1d6c8a(0x17c)][_0x1d6c8a(0x4e3)]=function(){const _0x512d30=_0x1d6c8a,_0x20b647=VisuMZ[_0x512d30(0xe4)][_0x512d30(0x20b)][_0x512d30(0x53e)][_0x512d30(0x2cc)];if(_0x20b647<=0x0)return;const _0x42d9d7=ImageManager[_0x512d30(0x3de)](_0x512d30(0x3fe)),_0x39be47=ImageManager['iconWidth'],_0x148942=ImageManager[_0x512d30(0x12a)],_0x54be0f=_0x20b647%0x10*_0x39be47,_0x32320a=Math[_0x512d30(0x17f)](_0x20b647/0x10)*_0x148942;this[_0x512d30(0x1b5)][_0x512d30(0x54c)](_0x42d9d7,_0x54be0f,_0x32320a,_0x39be47,_0x148942,0x0,0x0);},Sprite_NewLabel['prototype'][_0x1d6c8a(0x3bf)]=function(){const _0x43a02d=_0x1d6c8a,_0x2d75c5=VisuMZ[_0x43a02d(0xe4)][_0x43a02d(0x20b)][_0x43a02d(0x53e)],_0x4907b1=_0x2d75c5[_0x43a02d(0x136)];if(_0x4907b1==='')return;const _0x336c13=ImageManager[_0x43a02d(0x14e)],_0x195348=ImageManager[_0x43a02d(0x12a)];this[_0x43a02d(0x1b5)][_0x43a02d(0x241)]=_0x2d75c5[_0x43a02d(0x1f2)]||$gameSystem[_0x43a02d(0x3f8)](),this[_0x43a02d(0x1b5)]['textColor']=this[_0x43a02d(0x514)](),this[_0x43a02d(0x1b5)]['fontSize']=_0x2d75c5['FontSize'],this[_0x43a02d(0x1b5)]['drawText'](_0x4907b1,0x0,_0x195348/0x2,_0x336c13,_0x195348/0x2,'center');},Sprite_NewLabel['prototype'][_0x1d6c8a(0x514)]=function(){const _0x5e0c60=_0x1d6c8a,_0x3d3e14=VisuMZ[_0x5e0c60(0xe4)][_0x5e0c60(0x20b)][_0x5e0c60(0x53e)][_0x5e0c60(0x133)];return _0x3d3e14['match'](/#(.*)/i)?'#'+String(RegExp['$1']):ColorManager[_0x5e0c60(0x493)](_0x3d3e14);},Window_Base[_0x1d6c8a(0x17c)][_0x1d6c8a(0x52c)]=function(_0x2c392e,_0x16e4e5,_0x3d9e8f,_0xaed03d){const _0x5b05a4=_0x1d6c8a;if(_0x2c392e){if(_0x5b05a4(0x1dc)===_0x5b05a4(0x1dc)){const _0x42eb61=_0x3d9e8f+(this['lineHeight']()-ImageManager[_0x5b05a4(0x12a)])/0x2,_0x3f9bc9=ImageManager[_0x5b05a4(0x14e)]+0x4,_0x5d67f9=Math[_0x5b05a4(0x23c)](0x0,_0xaed03d-_0x3f9bc9);this[_0x5b05a4(0x50b)](ColorManager['getItemColor'](_0x2c392e)),this[_0x5b05a4(0x2c8)](_0x2c392e[_0x5b05a4(0x480)],_0x16e4e5,_0x42eb61),this['drawText'](_0x2c392e['name'],_0x16e4e5+_0x3f9bc9,_0x3d9e8f,_0x5d67f9),this['resetTextColor']();}else _0x3ff3f9=this[_0x5b05a4(0x50e)][_0x5b05a4(0x4e8)](_0x5c06d3),_0x243a69=this[_0x5b05a4(0x41c)][_0x5b05a4(0x4e8)](_0x13f69b),_0x15bea3=_0x194d99%0x1!==0x0||_0x587ef0%0x1!==0x0;}},Window_Base['prototype'][_0x1d6c8a(0x1b3)]=function(_0x1c6b5d,_0xbbc69b,_0x1becb8,_0x2b8bc2){const _0x52782d=_0x1d6c8a;if(this[_0x52782d(0x1e1)](_0x1c6b5d)){if(_0x52782d(0x3bc)!==_0x52782d(0x14b)){this[_0x52782d(0x39c)]();const _0x4ffc69=VisuMZ['ItemsEquipsCore'][_0x52782d(0x20b)][_0x52782d(0x2d0)],_0x352eb8=_0x4ffc69['ItemQuantityFmt'],_0x256db5=_0x352eb8[_0x52782d(0x1af)]($gameParty['numItems'](_0x1c6b5d));this[_0x52782d(0x3dc)][_0x52782d(0x131)]=_0x4ffc69['ItemQuantityFontSize'],this[_0x52782d(0x110)](_0x256db5,_0xbbc69b,_0x1becb8,_0x2b8bc2,_0x52782d(0x470)),this['resetFontSettings']();}else _0x31e2e6[_0x52782d(0x17c)][_0x52782d(0x4ca)][_0x52782d(0x4e1)](this),this[_0x52782d(0xe2)]();}},Window_Base['prototype'][_0x1d6c8a(0x1e1)]=function(_0x346898){const _0xe9a139=_0x1d6c8a;if(DataManager[_0xe9a139(0x4cc)](_0x346898))return $dataSystem[_0xe9a139(0x4c2)];return!![];},Window_Base[_0x1d6c8a(0x17c)][_0x1d6c8a(0x472)]=function(_0x117345,_0x35ec53,_0x4a875c,_0x29046c,_0x23d9b3){const _0x514567=_0x1d6c8a;_0x23d9b3=Math[_0x514567(0x23c)](_0x23d9b3||0x1,0x1);while(_0x23d9b3--){_0x29046c=_0x29046c||this[_0x514567(0x224)](),this[_0x514567(0x4ac)]['paintOpacity']=0xa0;const _0x520f55=ColorManager['gaugeBackColor']();this[_0x514567(0x4ac)]['fillRect'](_0x117345+0x1,_0x35ec53+0x1,_0x4a875c-0x2,_0x29046c-0x2,_0x520f55),this['contentsBack'][_0x514567(0x245)]=0xff;}},VisuMZ[_0x1d6c8a(0xe4)]['Window_Selectable_initialize']=Window_Selectable['prototype']['initialize'],Window_Selectable[_0x1d6c8a(0x17c)][_0x1d6c8a(0x4ca)]=function(_0x2ad926){const _0x4e73de=_0x1d6c8a;this['initNewLabelSprites'](),VisuMZ[_0x4e73de(0xe4)][_0x4e73de(0x1c4)][_0x4e73de(0x4e1)](this,_0x2ad926);},Window_Selectable[_0x1d6c8a(0x17c)]['initNewLabelSprites']=function(){const _0x18448a=_0x1d6c8a;this[_0x18448a(0x305)]={},this[_0x18448a(0x197)]=0xff,this[_0x18448a(0x3b8)]=VisuMZ[_0x18448a(0xe4)][_0x18448a(0x20b)][_0x18448a(0x53e)][_0x18448a(0x402)],this[_0x18448a(0x420)]=VisuMZ['ItemsEquipsCore'][_0x18448a(0x20b)][_0x18448a(0x53e)][_0x18448a(0x368)];},Window_Selectable[_0x1d6c8a(0x17c)]['isShowNew']=function(){return![];},VisuMZ[_0x1d6c8a(0xe4)][_0x1d6c8a(0x4b8)]=Window_Selectable[_0x1d6c8a(0x17c)][_0x1d6c8a(0x542)],Window_Selectable[_0x1d6c8a(0x17c)][_0x1d6c8a(0x542)]=function(_0x33d9ca){const _0x3cbe66=_0x1d6c8a;VisuMZ[_0x3cbe66(0xe4)]['Window_Selectable_setHelpWindowItem']['call'](this,_0x33d9ca);if(this[_0x3cbe66(0x51b)]())this[_0x3cbe66(0x3a7)](_0x33d9ca);},Window_Selectable[_0x1d6c8a(0x17c)][_0x1d6c8a(0x3a7)]=function(_0x339ffe){const _0x42e7c1=_0x1d6c8a;if(!_0x339ffe)return;$gameParty['clearNewItem'](_0x339ffe);let _0x4fb5fb='';if(DataManager[_0x42e7c1(0x431)](_0x339ffe))_0x4fb5fb='item-%1'[_0x42e7c1(0x1af)](_0x339ffe['id']);else{if(DataManager['isWeapon'](_0x339ffe)){if(_0x42e7c1(0x26c)!==_0x42e7c1(0x26c)){const _0x181b35=_0x1e214a(_0x2f037f['$1']);try{_0x55633f(_0x181b35);}catch(_0x2d8f62){if(_0x2216dc[_0x42e7c1(0xfa)]())_0x24338a['log'](_0x2d8f62);}}else _0x4fb5fb=_0x42e7c1(0x192)['format'](_0x339ffe['id']);}else{if(DataManager[_0x42e7c1(0x4c5)](_0x339ffe))_0x4fb5fb='armor-%1'['format'](_0x339ffe['id']);else{if(_0x42e7c1(0x363)!==_0x42e7c1(0x1cf))return;else return this['nonRemovableEtypes']()['includes'](this[_0x42e7c1(0x47f)]()[_0x228f57])?![]:this['isEquipChangeOk'](_0x14e413);}}}const _0x4105a2=this[_0x42e7c1(0x305)][_0x4fb5fb];if(_0x4105a2)_0x4105a2[_0x42e7c1(0x2ee)]();},VisuMZ['ItemsEquipsCore']['Window_Selectable_refresh']=Window_Selectable[_0x1d6c8a(0x17c)][_0x1d6c8a(0x1ae)],Window_Selectable[_0x1d6c8a(0x17c)][_0x1d6c8a(0x1ae)]=function(){const _0x5e3730=_0x1d6c8a;this[_0x5e3730(0x308)](),VisuMZ[_0x5e3730(0xe4)][_0x5e3730(0x3a5)][_0x5e3730(0x4e1)](this);},Window_Selectable['prototype'][_0x1d6c8a(0x308)]=function(){const _0x42405a=_0x1d6c8a;for(const _0x4561b4 of Object[_0x42405a(0x510)](this[_0x42405a(0x305)])){_0x4561b4['hide']();}},VisuMZ['ItemsEquipsCore'][_0x1d6c8a(0x353)]=Window_Selectable['prototype'][_0x1d6c8a(0x47c)],Window_Selectable[_0x1d6c8a(0x17c)][_0x1d6c8a(0x47c)]=function(){const _0x53e660=_0x1d6c8a;this[_0x53e660(0x1bc)](),VisuMZ[_0x53e660(0xe4)][_0x53e660(0x353)]['call'](this);},Window_Selectable[_0x1d6c8a(0x17c)][_0x1d6c8a(0x1bc)]=function(){const _0x564254=_0x1d6c8a;if(!this[_0x564254(0x51b)]())return;const _0x4dae8e=this[_0x564254(0x420)];this[_0x564254(0x197)]+=this['_newLabelOpacityChange'];(this[_0x564254(0x197)]>=_0x4dae8e||this[_0x564254(0x197)]<=0x0)&&(this['_newLabelOpacityChange']*=-0x1);this[_0x564254(0x197)]=this['_newLabelOpacity'][_0x564254(0x3c0)](0x0,_0x4dae8e);for(const _0x143a0f of Object['values'](this['_newLabelSprites'])){_0x143a0f[_0x564254(0x4a4)]=this['_newLabelOpacity'];}},Window_Selectable[_0x1d6c8a(0x17c)][_0x1d6c8a(0x18f)]=function(_0x21c5ad){const _0xfd6cfa=_0x1d6c8a,_0x736b77=this[_0xfd6cfa(0x305)];if(_0x736b77[_0x21c5ad]){if('yCrLB'!==_0xfd6cfa(0x3a8))return _0x736b77[_0x21c5ad];else this[_0xfd6cfa(0x2d6)]();}else{if(_0xfd6cfa(0x146)===_0xfd6cfa(0x146)){const _0x3d8f09=new Sprite_NewLabel();return _0x736b77[_0x21c5ad]=_0x3d8f09,this[_0xfd6cfa(0x3ae)](_0x3d8f09),_0x3d8f09;}else{const _0xdf6c66=this[_0xfd6cfa(0x306)];_0xdf6c66[_0xfd6cfa(0x110)](_0x150abf,0x0,_0x80c5e9['y'],_0xdf6c66['innerWidth'],_0xfd6cfa(0x490));}}},Window_Selectable[_0x1d6c8a(0x17c)][_0x1d6c8a(0x419)]=function(_0x6ad24d,_0x1198e9,_0x36395d){const _0x5894a3=_0x1d6c8a;let _0x3d4c5b='';if(DataManager['isItem'](_0x6ad24d))_0x3d4c5b=_0x5894a3(0x3c8)['format'](_0x6ad24d['id']);else{if(DataManager[_0x5894a3(0x53b)](_0x6ad24d))_0x3d4c5b='weapon-%1'[_0x5894a3(0x1af)](_0x6ad24d['id']);else{if(DataManager[_0x5894a3(0x4c5)](_0x6ad24d))_0x3d4c5b=_0x5894a3(0x40f)[_0x5894a3(0x1af)](_0x6ad24d['id']);else return;}}const _0x165acb=this[_0x5894a3(0x18f)](_0x3d4c5b);_0x165acb['move'](_0x1198e9,_0x36395d),_0x165acb[_0x5894a3(0x38b)](),_0x165acb['opacity']=this[_0x5894a3(0x197)];},Window_ItemCategory[_0x1d6c8a(0x176)]=VisuMZ[_0x1d6c8a(0xe4)][_0x1d6c8a(0x20b)]['Categories'][_0x1d6c8a(0x13a)],Window_ItemCategory[_0x1d6c8a(0x404)]=[_0x1d6c8a(0x204),_0x1d6c8a(0x1a8),_0x1d6c8a(0x30e),'Consumable',_0x1d6c8a(0x191),_0x1d6c8a(0x258),_0x1d6c8a(0x52f),'NeverUsable'],VisuMZ['ItemsEquipsCore']['Window_ItemCategory_initialize']=Window_ItemCategory[_0x1d6c8a(0x17c)][_0x1d6c8a(0x4ca)],Window_ItemCategory['prototype'][_0x1d6c8a(0x4ca)]=function(_0x39c1b1){const _0x15583d=_0x1d6c8a;VisuMZ[_0x15583d(0xe4)]['Window_ItemCategory_initialize'][_0x15583d(0x4e1)](this,_0x39c1b1),this[_0x15583d(0x3c9)](_0x39c1b1);},Window_ItemCategory[_0x1d6c8a(0x17c)][_0x1d6c8a(0x3c9)]=function(_0x14f5d5){const _0x237186=_0x1d6c8a,_0x2a21bb=new Rectangle(0x0,0x0,_0x14f5d5[_0x237186(0x376)],_0x14f5d5[_0x237186(0x3d7)]);this[_0x237186(0x306)]=new Window_Base(_0x2a21bb),this['_categoryNameWindow'][_0x237186(0x4a4)]=0x0,this[_0x237186(0x457)](this['_categoryNameWindow']),this[_0x237186(0x522)]();},Window_ItemCategory['prototype'][_0x1d6c8a(0x12f)]=function(){const _0x21106a=_0x1d6c8a;return Imported[_0x21106a(0x37a)]&&Window_HorzCommand[_0x21106a(0x17c)][_0x21106a(0x12f)][_0x21106a(0x4e1)](this);},Window_ItemCategory[_0x1d6c8a(0x17c)][_0x1d6c8a(0x44b)]=function(){},Window_ItemCategory[_0x1d6c8a(0x17c)][_0x1d6c8a(0x4bb)]=function(){const _0x36c6c5=_0x1d6c8a;if(!this['isUseModernControls']())Window_HorzCommand['prototype'][_0x36c6c5(0x4bb)]['call'](this);},Window_ItemCategory[_0x1d6c8a(0x17c)][_0x1d6c8a(0x40a)]=function(){const _0xfb0daf=_0x1d6c8a;return this[_0xfb0daf(0x391)]?this['maxItems']():0x4;},Window_ItemCategory['prototype'][_0x1d6c8a(0x47c)]=function(){const _0x4690e2=_0x1d6c8a;Window_HorzCommand[_0x4690e2(0x17c)][_0x4690e2(0x47c)]['call'](this),this['_itemWindow']&&this[_0x4690e2(0x15b)][_0x4690e2(0x50f)](this[_0x4690e2(0x312)]());},Window_ItemCategory['prototype'][_0x1d6c8a(0x18d)]=function(){const _0x551eac=_0x1d6c8a;if(this['isCursorMovable']()){const _0x484fe6=this[_0x551eac(0x4f7)]();if(this[_0x551eac(0x15b)]&&this[_0x551eac(0x15b)][_0x551eac(0x40a)]()<=0x1){if(Input[_0x551eac(0x1d3)](_0x551eac(0x470))){if(_0x551eac(0x54b)!==_0x551eac(0x311))this[_0x551eac(0x287)](Input[_0x551eac(0x143)]('right'));else{const _0x1309ac=_0x317d57[_0x551eac(0x3e0)]('['+_0xbe61e6['$1'][_0x551eac(0x2b8)](/\d+/g)+']');for(const _0x230bbc of _0x1309ac){if(_0x3ccc79[_0x551eac(0x15a)](_0x230bbc))return![];}return!![];}}Input['isRepeated'](_0x551eac(0x2e8))&&this[_0x551eac(0xdf)](Input[_0x551eac(0x143)](_0x551eac(0x2e8)));}else{if(this[_0x551eac(0x15b)]&&this[_0x551eac(0x15b)][_0x551eac(0x40a)]()>0x1){if(_0x551eac(0xde)===_0x551eac(0xde))Input[_0x551eac(0x1d3)](_0x551eac(0x1ee))&&!Input['isPressed']('shift')&&this[_0x551eac(0x287)](Input['isTriggered']('pagedown')),Input[_0x551eac(0x1d3)](_0x551eac(0x52e))&&!Input['isPressed'](_0x551eac(0x489))&&this[_0x551eac(0xdf)](Input['isTriggered'](_0x551eac(0x52e)));else{if(_0x53fbb2['value'](_0x50f6ba))return![];}}}this[_0x551eac(0x4f7)]()!==_0x484fe6&&this[_0x551eac(0x327)]();}},Window_ItemCategory['prototype'][_0x1d6c8a(0x25b)]=function(){const _0x3ca7a2=_0x1d6c8a;if(this[_0x3ca7a2(0x12f)]())return;Window_HorzCommand[_0x3ca7a2(0x17c)][_0x3ca7a2(0x25b)][_0x3ca7a2(0x4e1)](this);},Window_ItemCategory[_0x1d6c8a(0x17c)][_0x1d6c8a(0x212)]=function(){const _0x22b975=_0x1d6c8a;return this[_0x22b975(0x12f)]()?![]:_0x22b975(0x423)===_0x22b975(0x367)?_0x2084db[_0x22b975(0xe4)][_0x22b975(0x20b)][_0x22b975(0x337)][_0x22b975(0x465)]:Window_HorzCommand[_0x22b975(0x17c)][_0x22b975(0x212)][_0x22b975(0x4e1)](this);},Window_ItemCategory[_0x1d6c8a(0x17c)][_0x1d6c8a(0x45b)]=function(){const _0xde83a4=_0x1d6c8a;if(this['isOpenAndActive']()){if(TouchInput[_0xde83a4(0x143)]()){if(_0xde83a4(0x4b4)!==_0xde83a4(0x4b4)){const _0x386f02=_0x528533[_0xde83a4(0x3e0)]('['+_0xf75c37['$1'][_0xde83a4(0x2b8)](/\d+/g)+']');for(const _0xa3e9f8 of _0x386f02){if(!_0x3284ed[_0xde83a4(0x15a)](_0xa3e9f8))return![];}return!![];}else this[_0xde83a4(0x1ac)](!![]);}if(TouchInput[_0xde83a4(0x132)]())this['onTouchOk']();else TouchInput['isCancelled']()&&this[_0xde83a4(0x137)]();}},Window_ItemCategory[_0x1d6c8a(0x17c)][_0x1d6c8a(0x1ac)]=function(_0x4e1230){const _0x44acc2=_0x1d6c8a;this['isUseModernControls']()?this[_0x44acc2(0x436)](!![]):Window_HorzCommand[_0x44acc2(0x17c)]['onTouchSelect'][_0x44acc2(0x4e1)](this,_0x4e1230);},Window_ItemCategory['prototype'][_0x1d6c8a(0x436)]=function(_0x833a64){const _0xc553f7=_0x1d6c8a;this[_0xc553f7(0x1f9)]=![];if(this[_0xc553f7(0x188)]()){const _0x5eb504=this[_0xc553f7(0x4f7)](),_0x208880=this[_0xc553f7(0x203)]();_0x208880>=0x0&&_0x208880!==this['index']()&&this[_0xc553f7(0x1e6)](_0x208880);if(_0x833a64&&this[_0xc553f7(0x4f7)]()!==_0x5eb504){if(_0xc553f7(0x3fa)!==_0xc553f7(0x3fa)){if(!_0x15097e)return![];if(!_0x11ec85[_0xc553f7(0xe4)][_0xc553f7(0x40e)][_0xc553f7(0x4e1)](this,_0x4d6f02))return![];if(!this[_0xc553f7(0x3ce)](_0x6ff9a8))return![];if(!this[_0xc553f7(0x451)](_0x422e7e))return![];return!![];}else this[_0xc553f7(0x327)]();}}},Window_ItemCategory['prototype'][_0x1d6c8a(0x3b3)]=function(){const _0x54d43b=_0x1d6c8a;for(const _0x1c6eea of Window_ItemCategory[_0x54d43b(0x176)]){this[_0x54d43b(0x48b)](_0x1c6eea);}this['select'](this[_0x54d43b(0x4f7)]());},Window_ItemCategory['prototype']['addItemCategory']=function(_0x3d797d){const _0x591299=_0x1d6c8a,_0x45bd0c=_0x3d797d[_0x591299(0x46e)],_0x28036a=_0x3d797d[_0x591299(0x2cc)],_0x5354c0=_0x3d797d[_0x591299(0x21b)]||0x0;if(_0x5354c0>0x0&&!$gameSwitches['value'](_0x5354c0))return;let _0x4fa7db='',_0x5d3966=_0x591299(0x2dc),_0x354b0b=_0x45bd0c;if(_0x45bd0c[_0x591299(0x2b8)](/Category:(.*)/i))_0x4fa7db=String(RegExp['$1'])[_0x591299(0x48e)]();else{if(Window_ItemCategory['categoryItemTypes']['includes'](_0x45bd0c))_0x4fa7db=VisuMZ[_0x591299(0xe4)][_0x591299(0x20b)][_0x591299(0x26d)][_0x45bd0c];else{if(['AllItems',_0x591299(0x530)][_0x591299(0x1c3)](_0x45bd0c))_0x4fa7db=TextManager[_0x591299(0x199)];else{if(_0x45bd0c==='KeyItems')_0x4fa7db=TextManager[_0x591299(0x414)];else{if(_0x45bd0c===_0x591299(0x4ab))'XbMFp'===_0x591299(0x33e)?_0x2c1637['ItemsEquipsCore'][_0x591299(0x2df)][_0x591299(0x4e1)](this,_0xce7be2):_0x4fa7db=TextManager[_0x591299(0xfc)];else{if(_0x45bd0c===_0x591299(0x309)){if(_0x591299(0x53a)===_0x591299(0x53a))_0x4fa7db=TextManager[_0x591299(0x123)];else return _0x5d6804[_0x591299(0xe4)][_0x591299(0x20b)][_0x591299(0x337)]['LabelHitType'];}else{if(_0x45bd0c[_0x591299(0x2b8)](/WTYPE:(\d+)/i))_0x4fa7db=$dataSystem[_0x591299(0x1b6)][Number(RegExp['$1'])]||'';else{if(_0x45bd0c[_0x591299(0x2b8)](/ATYPE:(\d+)/i))_0x4fa7db=$dataSystem[_0x591299(0x2e1)][Number(RegExp['$1'])]||'';else _0x45bd0c[_0x591299(0x2b8)](/ETYPE:(\d+)/i)&&(_0x4fa7db=$dataSystem['equipTypes'][Number(RegExp['$1'])]||'');}}}}}}}_0x28036a>0x0&&this['categoryStyle']()!==_0x591299(0x43d)&&(_0x4fa7db='\x5cI[%1]%2'[_0x591299(0x1af)](_0x28036a,_0x4fa7db)),this['addCommand'](_0x4fa7db,_0x5d3966,!![],_0x354b0b);},Window_ItemCategory['prototype'][_0x1d6c8a(0x355)]=function(){const _0x33354e=_0x1d6c8a;return VisuMZ[_0x33354e(0xe4)][_0x33354e(0x20b)][_0x33354e(0x26d)]['TextAlign'];},Window_ItemCategory[_0x1d6c8a(0x17c)][_0x1d6c8a(0x183)]=function(_0x1d3a5f){const _0x13b772=_0x1d6c8a,_0x88e3f5=this[_0x13b772(0x4f4)](_0x1d3a5f);if(_0x88e3f5===_0x13b772(0x28a))this[_0x13b772(0x19f)](_0x1d3a5f);else{if(_0x88e3f5===_0x13b772(0x1ff)){if(_0x13b772(0x372)===_0x13b772(0x372))this['drawItemStyleIcon'](_0x1d3a5f);else return this[_0x13b772(0x209)]();}else Window_HorzCommand[_0x13b772(0x17c)][_0x13b772(0x183)][_0x13b772(0x4e1)](this,_0x1d3a5f);}},Window_ItemCategory[_0x1d6c8a(0x17c)][_0x1d6c8a(0x564)]=function(){const _0x22a124=_0x1d6c8a;return VisuMZ[_0x22a124(0xe4)][_0x22a124(0x20b)][_0x22a124(0x26d)][_0x22a124(0x2a3)];},Window_ItemCategory[_0x1d6c8a(0x17c)][_0x1d6c8a(0x4f4)]=function(_0x293637){const _0x5c28f1=_0x1d6c8a;if(_0x293637<0x0)return _0x5c28f1(0x43d);const _0x4a248c=this[_0x5c28f1(0x564)]();if(_0x4a248c!==_0x5c28f1(0x2f8))return _0x4a248c;else{if('AKDXd'==='AKDXd'){const _0x19b026=this['commandName'](_0x293637);if(_0x19b026[_0x5c28f1(0x2b8)](/\\I\[(\d+)\]/i)){const _0x2be264=this[_0x5c28f1(0x3cc)](_0x293637),_0x19b41c=this[_0x5c28f1(0x39d)](_0x19b026)['width'];return _0x19b41c<=_0x2be264[_0x5c28f1(0x376)]?_0x5c28f1(0x28a):'icon';}else return'text';}else{_0x4ccfd3[_0x5c28f1(0x17c)][_0x5c28f1(0x1e5)][_0x5c28f1(0x4e1)](this);if(this[_0x5c28f1(0x3b2)])this[_0x5c28f1(0x144)]();}}},Window_ItemCategory[_0x1d6c8a(0x17c)][_0x1d6c8a(0x19f)]=function(_0x36484f){const _0x53cfac=_0x1d6c8a,_0x534b02=this[_0x53cfac(0x3cc)](_0x36484f),_0x52a85a=this[_0x53cfac(0x38a)](_0x36484f),_0x499cdb=this[_0x53cfac(0x39d)](_0x52a85a)[_0x53cfac(0x376)];this[_0x53cfac(0x558)](this['isCommandEnabled'](_0x36484f));const _0x573b42=this[_0x53cfac(0x355)]();if(_0x573b42==='right'){if(_0x53cfac(0x219)===_0x53cfac(0x219))this['drawTextEx'](_0x52a85a,_0x534b02['x']+_0x534b02[_0x53cfac(0x376)]-_0x499cdb,_0x534b02['y'],_0x499cdb);else return _0x28c49b['ItemsEquipsCore']['Settings'][_0x53cfac(0x41b)][_0x53cfac(0x440)];}else{if(_0x573b42==='center'){const _0x1e9cb6=_0x534b02['x']+Math[_0x53cfac(0x17f)]((_0x534b02['width']-_0x499cdb)/0x2);this[_0x53cfac(0x290)](_0x52a85a,_0x1e9cb6,_0x534b02['y'],_0x499cdb);}else this['drawTextEx'](_0x52a85a,_0x534b02['x'],_0x534b02['y'],_0x499cdb);}},Window_ItemCategory[_0x1d6c8a(0x17c)]['drawItemStyleIcon']=function(_0x56d683){const _0x1d8443=_0x1d6c8a,_0xbe7ce3=this['commandName'](_0x56d683);if(_0xbe7ce3[_0x1d8443(0x2b8)](/\\I\[(\d+)\]/i)){if(_0x1d8443(0x260)!==_0x1d8443(0x260)){if(_0x4afa4c[_0x1d8443(0x11f)]&&_0x374d7c['uiInputPosition']!==_0x3460d6)return _0x125625[_0x1d8443(0x42c)];else{if(this[_0x1d8443(0x2ad)]())return this[_0x1d8443(0x16c)]()[_0x1d8443(0x2b8)](/RIGHT/i);else _0x2d7f92[_0x1d8443(0x17c)][_0x1d8443(0x1b9)][_0x1d8443(0x4e1)](this);}}else{const _0x34063e=Number(RegExp['$1'])||0x0,_0x6093ab=this[_0x1d8443(0x3cc)](_0x56d683),_0x33f729=_0x6093ab['x']+Math[_0x1d8443(0x17f)]((_0x6093ab['width']-ImageManager['iconWidth'])/0x2),_0x2f1415=_0x6093ab['y']+(_0x6093ab[_0x1d8443(0x3d7)]-ImageManager[_0x1d8443(0x12a)])/0x2;this[_0x1d8443(0x2c8)](_0x34063e,_0x33f729,_0x2f1415);}}},VisuMZ[_0x1d6c8a(0xe4)][_0x1d6c8a(0x2ae)]=Window_ItemCategory[_0x1d6c8a(0x17c)]['setItemWindow'],Window_ItemCategory['prototype']['setItemWindow']=function(_0x34c300){const _0x349a82=_0x1d6c8a;VisuMZ['ItemsEquipsCore'][_0x349a82(0x2ae)]['call'](this,_0x34c300),_0x34c300[_0x349a82(0x393)]=this;},Window_ItemCategory['prototype'][_0x1d6c8a(0x1e5)]=function(){const _0x2f1b7d=_0x1d6c8a;Window_HorzCommand[_0x2f1b7d(0x17c)][_0x2f1b7d(0x1e5)][_0x2f1b7d(0x4e1)](this);if(this[_0x2f1b7d(0x306)])this[_0x2f1b7d(0x522)]();},Window_ItemCategory[_0x1d6c8a(0x17c)]['updateCategoryNameWindow']=function(){const _0x1cbc77=_0x1d6c8a,_0x5edd88=this[_0x1cbc77(0x306)];_0x5edd88['contents'][_0x1cbc77(0x442)]();const _0x134852=this[_0x1cbc77(0x4f4)](this[_0x1cbc77(0x4f7)]());if(_0x134852===_0x1cbc77(0x1ff)){const _0xbd064e=this[_0x1cbc77(0x3cc)](this['index']());let _0x3c8231=this['commandName'](this[_0x1cbc77(0x4f7)]());_0x3c8231=_0x3c8231['replace'](/\\I\[(\d+)\]/gi,''),_0x5edd88[_0x1cbc77(0x39c)](),this[_0x1cbc77(0x450)](_0x3c8231,_0xbd064e),this[_0x1cbc77(0x49a)](_0x3c8231,_0xbd064e),this[_0x1cbc77(0x26e)](_0x3c8231,_0xbd064e);}},Window_ItemCategory[_0x1d6c8a(0x17c)][_0x1d6c8a(0x450)]=function(_0x3f806e,_0x3babd4){},Window_ItemCategory[_0x1d6c8a(0x17c)][_0x1d6c8a(0x49a)]=function(_0x3934ac,_0x4124d6){const _0x37aa04=_0x1d6c8a,_0x522529=this[_0x37aa04(0x306)];_0x522529['drawText'](_0x3934ac,0x0,_0x4124d6['y'],_0x522529[_0x37aa04(0x48a)],_0x37aa04(0x490));},Window_ItemCategory['prototype'][_0x1d6c8a(0x26e)]=function(_0x14d770,_0x1854c6){const _0x35f899=_0x1d6c8a,_0x1cb6ca=this[_0x35f899(0x306)],_0x9d56de=$gameSystem[_0x35f899(0x4c7)](),_0x4e3df5=_0x1854c6['x']+Math[_0x35f899(0x17f)](_0x1854c6['width']/0x2)+_0x9d56de;_0x1cb6ca['x']=_0x1cb6ca[_0x35f899(0x376)]/-0x2+_0x4e3df5,_0x1cb6ca['y']=Math[_0x35f899(0x17f)](_0x1854c6[_0x35f899(0x3d7)]/0x2);},Window_ItemList[_0x1d6c8a(0x17c)][_0x1d6c8a(0x18d)]=function(){const _0x4e6d39=_0x1d6c8a;if(this['isCursorMovable']()){if(_0x4e6d39(0x467)===_0x4e6d39(0x467)){const _0x5eb560=this[_0x4e6d39(0x4f7)]();if(this[_0x4e6d39(0x40a)]()<=0x1)!this['isHandled'](_0x4e6d39(0x1ee))&&Input['isTriggered']('pagedown')&&this[_0x4e6d39(0x446)](),!this[_0x4e6d39(0x4f8)](_0x4e6d39(0x52e))&&Input[_0x4e6d39(0x143)](_0x4e6d39(0x52e))&&(_0x4e6d39(0x117)!==_0x4e6d39(0x117)?(this['_statusWindow']=_0x4d2bde,this[_0x4e6d39(0x1e5)]()):this[_0x4e6d39(0x2d6)]());else{if(this[_0x4e6d39(0x40a)]()>0x1){Input[_0x4e6d39(0x1d3)](_0x4e6d39(0x470))&&this[_0x4e6d39(0x287)](Input[_0x4e6d39(0x143)](_0x4e6d39(0x470)));Input[_0x4e6d39(0x1d3)](_0x4e6d39(0x2e8))&&this['cursorLeft'](Input['isTriggered'](_0x4e6d39(0x2e8)));if(this['limitedPageUpDownSceneCheck']()){if(Input[_0x4e6d39(0x143)]('pagedown')&&Input[_0x4e6d39(0x4d6)](_0x4e6d39(0x489))){if(_0x4e6d39(0x121)!==_0x4e6d39(0x406))this[_0x4e6d39(0x446)]();else return this[_0x4e6d39(0x200)](_0x1684e8);}if(Input[_0x4e6d39(0x143)]('pageup')&&Input[_0x4e6d39(0x4d6)](_0x4e6d39(0x489))){if(_0x4e6d39(0x4f9)===_0x4e6d39(0x2e3)){const _0x1bb084=new _0x59f1fe(0x0,0x0,_0x30941a[_0x4e6d39(0x376)],_0x31f080[_0x4e6d39(0x3d7)]);this[_0x4e6d39(0x306)]=new _0x4662eb(_0x1bb084),this[_0x4e6d39(0x306)][_0x4e6d39(0x4a4)]=0x0,this[_0x4e6d39(0x457)](this[_0x4e6d39(0x306)]),this[_0x4e6d39(0x522)]();}else this[_0x4e6d39(0x2d6)]();}}else{Input[_0x4e6d39(0x143)](_0x4e6d39(0x1ee))&&this[_0x4e6d39(0x446)]();if(Input['isTriggered'](_0x4e6d39(0x52e))){if(_0x4e6d39(0x3e8)!==_0x4e6d39(0x554))this['cursorPageup']();else return _0x39b807['prototype'][_0x4e6d39(0x249)][_0x4e6d39(0x4e1)](this);}}}}if(Input[_0x4e6d39(0x1d3)](_0x4e6d39(0x36e))){if(Input['isPressed']('shift')&&this['allowShiftScrolling']())this[_0x4e6d39(0x446)]();else{if(_0x4e6d39(0x22f)===_0x4e6d39(0x1be)){const _0x42d1dc=new _0x23f718(0x0,0x0,_0x5abfa1[_0x4e6d39(0x376)],_0x5d0910['height']);this[_0x4e6d39(0x3b2)]=new _0x3cde58(_0x42d1dc),this[_0x4e6d39(0x3b2)][_0x4e6d39(0x4a4)]=0x0,this['addChild'](this[_0x4e6d39(0x3b2)]),this[_0x4e6d39(0x144)]();}else this[_0x4e6d39(0x2ab)](Input[_0x4e6d39(0x143)](_0x4e6d39(0x36e)));}}Input[_0x4e6d39(0x1d3)]('up')&&(Input[_0x4e6d39(0x4d6)](_0x4e6d39(0x489))&&this[_0x4e6d39(0x2fd)]()?this[_0x4e6d39(0x2d6)]():this['cursorUp'](Input[_0x4e6d39(0x143)]('up'))),Imported[_0x4e6d39(0x37a)]&&this[_0x4e6d39(0x44b)](),this[_0x4e6d39(0x4f7)]()!==_0x5eb560&&this['playCursorSound']();}else{_0x87538d+=0x1;if(_0x5593d8['note'][_0x4e6d39(0x2b8)](_0x1a4c75)){const _0x4d1701=_0x2d3765(_0x4fd1a6['$1'])||0x1;if(_0x56205c>=_0x4d1701)return!![];}if(_0x1ba2df['note'][_0x4e6d39(0x2b8)](_0x314d98)){const _0x53ebea=_0xa4f8d(_0x4abfae['$1'])||0x1;if(_0x167c18>=_0x53ebea)return!![];}}}},Window_ItemList[_0x1d6c8a(0x17c)][_0x1d6c8a(0x42a)]=function(){const _0x9131ef=_0x1d6c8a,_0x559ec9=SceneManager[_0x9131ef(0x3d1)],_0x23a249=[Scene_Item,Scene_Shop];return _0x23a249[_0x9131ef(0x1c3)](_0x559ec9[_0x9131ef(0x527)]);},Window_ItemList[_0x1d6c8a(0x17c)][_0x1d6c8a(0x16e)]=function(){const _0x33421f=_0x1d6c8a;Window_Selectable[_0x33421f(0x17c)][_0x33421f(0x16e)]['call'](this),this[_0x33421f(0x393)]&&this[_0x33421f(0x393)][_0x33421f(0x12f)]()&&this[_0x33421f(0x393)][_0x33421f(0x16e)]();},Window_ItemList[_0x1d6c8a(0x17c)]['deactivate']=function(){const _0x473f3e=_0x1d6c8a;Window_Selectable['prototype'][_0x473f3e(0x1c5)]['call'](this),this[_0x473f3e(0x393)]&&this[_0x473f3e(0x393)][_0x473f3e(0x12f)]()&&this[_0x473f3e(0x393)][_0x473f3e(0x1c5)]();},Window_ItemList['prototype'][_0x1d6c8a(0x50f)]=function(_0x5e80e5){const _0x3bd581=_0x1d6c8a;if(this[_0x3bd581(0x460)]!==_0x5e80e5){this[_0x3bd581(0x460)]=_0x5e80e5,this[_0x3bd581(0x1ae)]();if(this[_0x3bd581(0x393)]&&this[_0x3bd581(0x393)][_0x3bd581(0x12f)]())_0x3bd581(0x1f4)==='elfnG'?this[_0x3bd581(0x565)](0x0):(_0x33d4d9[_0x3bd581(0xe4)]['Scene_Item_createCategoryWindow'][_0x3bd581(0x4e1)](this),this[_0x3bd581(0x12f)]()&&this['postCreateCategoryWindowItemsEquipsCore']());else{if('jvRwK'===_0x3bd581(0x2ba))this['scrollTo'](0x0,0x0);else return _0x1dab2d[_0x3bd581(0x356)](_0x3bd581(0x2e8),_0x3bd581(0x470));}}},VisuMZ[_0x1d6c8a(0xe4)]['Window_ItemList_maxCols']=Window_ItemList[_0x1d6c8a(0x17c)][_0x1d6c8a(0x40a)],Window_ItemList[_0x1d6c8a(0x17c)][_0x1d6c8a(0x40a)]=function(){const _0x31876f=_0x1d6c8a;if(SceneManager['_scene']['constructor']===Scene_Battle)return VisuMZ[_0x31876f(0xe4)][_0x31876f(0x149)][_0x31876f(0x4e1)](this);else return SceneManager[_0x31876f(0x3d1)][_0x31876f(0x527)]===Scene_Map?VisuMZ[_0x31876f(0xe4)][_0x31876f(0x149)][_0x31876f(0x4e1)](this):VisuMZ['ItemsEquipsCore'][_0x31876f(0x20b)][_0x31876f(0x2d0)][_0x31876f(0x488)];},VisuMZ[_0x1d6c8a(0xe4)]['Window_ItemList_colSpacing']=Window_ItemList[_0x1d6c8a(0x17c)][_0x1d6c8a(0x101)],Window_ItemList['prototype'][_0x1d6c8a(0x101)]=function(){const _0x320a83=_0x1d6c8a;if(this[_0x320a83(0x40a)]()<=0x1)return Window_Selectable[_0x320a83(0x17c)][_0x320a83(0x101)][_0x320a83(0x4e1)](this);else{if(_0x320a83(0x39e)==='WMIvn'){const _0x5284d5=this['itemPadding']();let _0x22cf87=0x0;_0x11e054['VisuMZ_0_CoreEngine']?_0x22cf87=this[_0x320a83(0x50e)][_0x320a83(0x210)](_0x4bd816,!![]):_0x22cf87=this['_actor'][_0x320a83(0x4e8)](_0x2bcbae);const _0x4e02bd=_0x22cf87;this[_0x320a83(0x110)](_0x22cf87,_0x4762b7,_0x4aaf1d,_0x3d93f6-_0x5284d5,_0x320a83(0x470));}else return VisuMZ[_0x320a83(0xe4)][_0x320a83(0x264)][_0x320a83(0x4e1)](this);}},Window_ItemList['prototype'][_0x1d6c8a(0x1c3)]=function(_0x15b5c2){const _0x52b566=_0x1d6c8a;switch(this[_0x52b566(0x460)]){case _0x52b566(0x213):return DataManager[_0x52b566(0x431)](_0x15b5c2);case _0x52b566(0x530):return DataManager['isItem'](_0x15b5c2)&&_0x15b5c2['itypeId']===0x1;case _0x52b566(0x550):return DataManager['isItem'](_0x15b5c2)&&_0x15b5c2[_0x52b566(0x35a)]===0x2;case _0x52b566(0x204):return DataManager['isItem'](_0x15b5c2)&&_0x15b5c2['itypeId']===0x3;case _0x52b566(0x1a8):return DataManager['isItem'](_0x15b5c2)&&_0x15b5c2['itypeId']===0x4;case _0x52b566(0x298):return DataManager['isItem'](_0x15b5c2)&&_0x15b5c2['consumable'];case _0x52b566(0x30e):return DataManager['isItem'](_0x15b5c2)&&!_0x15b5c2['consumable'];case _0x52b566(0x191):return DataManager[_0x52b566(0x431)](_0x15b5c2)&&[0x0][_0x52b566(0x1c3)](_0x15b5c2[_0x52b566(0x43a)]);case _0x52b566(0x258):return DataManager[_0x52b566(0x431)](_0x15b5c2)&&[0x0,0x1][_0x52b566(0x1c3)](_0x15b5c2[_0x52b566(0x43a)]);case _0x52b566(0x52f):return DataManager[_0x52b566(0x431)](_0x15b5c2)&&[0x0,0x2][_0x52b566(0x1c3)](_0x15b5c2['occasion']);case _0x52b566(0x49c):return DataManager[_0x52b566(0x431)](_0x15b5c2)&&[0x3][_0x52b566(0x1c3)](_0x15b5c2[_0x52b566(0x43a)]);case'AllWeapons':return DataManager[_0x52b566(0x53b)](_0x15b5c2);case _0x52b566(0x309):return DataManager[_0x52b566(0x4c5)](_0x15b5c2);default:if(this['_category']['match'](/WTYPE:(\d+)/i)){if(_0x52b566(0x170)==='JgGcu')return DataManager[_0x52b566(0x53b)](_0x15b5c2)&&_0x15b5c2[_0x52b566(0x369)]===Number(RegExp['$1']);else{const _0x55f00c=_0x154e08[_0x52b566(0x3de)](_0x52b566(0x3fe)),_0x9a189f=_0x10fb96[_0x52b566(0x14e)],_0x350ab8=_0x4f4bea['iconHeight'],_0x528aef=_0x987bac%0x10*_0x9a189f,_0x3ebe5f=_0x2238fc[_0x52b566(0x17f)](_0x523954/0x10)*_0x350ab8,_0x62afbc=_0xf91278['ceil'](_0x9a189f*this[_0x52b566(0x2d8)]()),_0xd43b50=_0x4717e2[_0x52b566(0x155)](_0x350ab8*this[_0x52b566(0x2d8)]());this[_0x52b566(0x3dc)][_0x52b566(0x54c)](_0x55f00c,_0x528aef,_0x3ebe5f,_0x9a189f,_0x350ab8,_0xfc2b3e,_0x229349,_0x62afbc,_0xd43b50);}}else{if(this[_0x52b566(0x460)][_0x52b566(0x2b8)](/WTYPE:(.*)/i)){const _0x566c12=$dataSystem[_0x52b566(0x1b6)][_0x52b566(0x23d)](String(RegExp['$1'])[_0x52b566(0x48e)]());return DataManager[_0x52b566(0x53b)](_0x15b5c2)&&_0x15b5c2['wtypeId']===_0x566c12;}else{if(this[_0x52b566(0x460)][_0x52b566(0x2b8)](/ATYPE:(\d+)/i))return DataManager[_0x52b566(0x4c5)](_0x15b5c2)&&_0x15b5c2[_0x52b566(0x4ba)]===Number(RegExp['$1']);else{if(this['_category'][_0x52b566(0x2b8)](/ATYPE:(.*)/i)){if('DSUqj'!==_0x52b566(0x329)){const _0x30c1c1=$dataSystem[_0x52b566(0x2e1)]['indexOf'](String(RegExp['$1'])[_0x52b566(0x48e)]());return DataManager[_0x52b566(0x4c5)](_0x15b5c2)&&_0x15b5c2[_0x52b566(0x4ba)]===_0x30c1c1;}else return _0xefa8ab[_0x52b566(0x17f)](this[_0x52b566(0x4a0)]());}else{if(this['_category'][_0x52b566(0x2b8)](/ETYPE:(\d+)/i)){if(_0x52b566(0x30f)===_0x52b566(0x30f))return!!_0x15b5c2&&_0x15b5c2[_0x52b566(0x230)]===Number(RegExp['$1']);else{_0x156203+=_0x52b566(0x17d)[_0x52b566(0x1af)](_0x5cacb4[_0x52b566(0x480)]),_0x58031e++;if(_0x1b18af>=_0x58b6a6)return _0x42d675;}}else{if(this[_0x52b566(0x460)]['match'](/ETYPE:(.*)/i)){const _0x3ae6bc=$dataSystem[_0x52b566(0xf7)][_0x52b566(0x23d)](String(RegExp['$1'])['trim']());return DataManager['isArmor'](_0x15b5c2)&&_0x15b5c2[_0x52b566(0x230)]===_0x3ae6bc;}else{if(this[_0x52b566(0x460)][_0x52b566(0x2b8)](/Category:(.*)/i))return _0x52b566(0x3df)!==_0x52b566(0x120)?!!_0x15b5c2&&_0x15b5c2[_0x52b566(0x4c3)][_0x52b566(0x1c3)](String(RegExp['$1'])['toUpperCase']()[_0x52b566(0x48e)]()):_0x54e1f1[_0x52b566(0xe4)][_0x52b566(0x55f)]['call'](this);}}}}}}}return![];},Window_ItemList[_0x1d6c8a(0x17c)][_0x1d6c8a(0x51b)]=function(){return!![];},VisuMZ['ItemsEquipsCore'][_0x1d6c8a(0x180)]=Window_ItemList[_0x1d6c8a(0x17c)][_0x1d6c8a(0x183)],Window_ItemList[_0x1d6c8a(0x17c)][_0x1d6c8a(0x183)]=function(_0x4d3f6e){const _0x5979a5=_0x1d6c8a;VisuMZ[_0x5979a5(0xe4)][_0x5979a5(0x180)][_0x5979a5(0x4e1)](this,_0x4d3f6e),this[_0x5979a5(0x455)](_0x4d3f6e);},Window_ItemList['prototype'][_0x1d6c8a(0x1b3)]=function(_0x4b46d8,_0x3ad1d4,_0x2e1c21,_0x175434){const _0x321b8e=_0x1d6c8a;Window_Selectable[_0x321b8e(0x17c)][_0x321b8e(0x1b3)][_0x321b8e(0x4e1)](this,_0x4b46d8,_0x3ad1d4,_0x2e1c21,_0x175434);},Window_ItemList['prototype'][_0x1d6c8a(0x455)]=function(_0x2b8d6f){const _0x16f4fd=_0x1d6c8a,_0x5ecc05=this[_0x16f4fd(0x4d9)](_0x2b8d6f);if(!_0x5ecc05||!this['isShowNew']())return;if(!$gameParty[_0x16f4fd(0x166)](_0x5ecc05))return;const _0x4deaf6=this['itemLineRect'](_0x2b8d6f),_0x585de5=_0x4deaf6['x'],_0xe07617=_0x4deaf6['y']+(this[_0x16f4fd(0x224)]()-ImageManager[_0x16f4fd(0x12a)])/0x2,_0x361ece=VisuMZ['ItemsEquipsCore'][_0x16f4fd(0x20b)][_0x16f4fd(0x53e)][_0x16f4fd(0x24a)],_0x534ffd=VisuMZ[_0x16f4fd(0xe4)][_0x16f4fd(0x20b)][_0x16f4fd(0x53e)][_0x16f4fd(0x3b6)];this['placeNewLabel'](_0x5ecc05,_0x585de5+_0x361ece,_0xe07617+_0x534ffd);},Window_ItemList[_0x1d6c8a(0x17c)][_0x1d6c8a(0x4a5)]=function(_0x1d04d1){const _0x54766e=_0x1d6c8a;this[_0x54766e(0xfe)]=_0x1d04d1,this[_0x54766e(0x1e5)]();},VisuMZ[_0x1d6c8a(0xe4)][_0x1d6c8a(0x317)]=Window_ItemList[_0x1d6c8a(0x17c)][_0x1d6c8a(0x483)],Window_ItemList[_0x1d6c8a(0x17c)]['updateHelp']=function(){const _0x494dc6=_0x1d6c8a;VisuMZ['ItemsEquipsCore'][_0x494dc6(0x317)]['call'](this),this['_statusWindow']&&this[_0x494dc6(0xfe)]['constructor']===Window_ShopStatus&&this[_0x494dc6(0xfe)][_0x494dc6(0x31e)](this[_0x494dc6(0x199)]());},Window_BattleItem[_0x1d6c8a(0x17c)][_0x1d6c8a(0x3d4)]=function(_0x43e6b4){const _0x430cbf=_0x1d6c8a;return BattleManager[_0x430cbf(0x362)]()?BattleManager[_0x430cbf(0x362)]()[_0x430cbf(0x37e)](_0x43e6b4):Window_ItemList[_0x430cbf(0x17c)]['isEnabled']['call'](this,_0x43e6b4);},Window_EventItem['prototype'][_0x1d6c8a(0x51b)]=function(){return![];},Window_EquipStatus[_0x1d6c8a(0x17c)][_0x1d6c8a(0x2ad)]=function(){const _0x528043=_0x1d6c8a;return VisuMZ[_0x528043(0xe4)][_0x528043(0x20b)][_0x528043(0x3af)][_0x528043(0x169)];},VisuMZ[_0x1d6c8a(0xe4)][_0x1d6c8a(0x556)]=Window_EquipStatus[_0x1d6c8a(0x17c)]['refresh'],Window_EquipStatus[_0x1d6c8a(0x17c)][_0x1d6c8a(0x1ae)]=function(){const _0x3687bf=_0x1d6c8a;this[_0x3687bf(0x476)](),this[_0x3687bf(0x39c)]();if(this['_actor'])this['_actor'][_0x3687bf(0x1ae)]();if(this[_0x3687bf(0x2ad)]())this['prepareRefreshItemsEquipsCoreLayout']();else{if(_0x3687bf(0x36f)!=='OYHKD')VisuMZ[_0x3687bf(0xe4)][_0x3687bf(0x556)][_0x3687bf(0x4e1)](this);else return _0x5cdeda[_0x3687bf(0x17c)][_0x3687bf(0x212)][_0x3687bf(0x4e1)](this);}},Window_EquipStatus[_0x1d6c8a(0x17c)]['prepareRefreshItemsEquipsCoreLayout']=function(){const _0x32102d=_0x1d6c8a;this[_0x32102d(0x3dc)]['clear']();if(!this['_actor'])return;if(this['isMainMenuCoreMenuImageOptionAvailable']()){if(_0x32102d(0x1a1)!=='UtTAN'){const _0x41f10b=ImageManager[_0x32102d(0x529)](this[_0x32102d(0x50e)][_0x32102d(0x350)]());_0x41f10b[_0x32102d(0x151)](this[_0x32102d(0x278)]['bind'](this));}else{const _0x4c6873=_0x2a3b55[_0x32102d(0x280)](this);_0x4c6873['_tempActor']=!![],this['_equips'][_0xd38266][_0x32102d(0x49b)](null),this[_0x32102d(0x31a)]=!![],this[_0x32102d(0x1db)](_0x4c6873),this[_0x32102d(0x31a)]=_0xc4f346;}}else this[_0x32102d(0x248)]();},Window_EquipStatus[_0x1d6c8a(0x17c)][_0x1d6c8a(0xfd)]=function(){const _0x4c0cf3=_0x1d6c8a;return Imported[_0x4c0cf3(0x29a)]&&this['_actor'][_0x4c0cf3(0x350)]()!==''&&VisuMZ[_0x4c0cf3(0xe4)][_0x4c0cf3(0x20b)][_0x4c0cf3(0x3af)][_0x4c0cf3(0x304)];},Window_EquipStatus[_0x1d6c8a(0x17c)][_0x1d6c8a(0x278)]=function(){const _0x2c4f68=_0x1d6c8a;VisuMZ[_0x2c4f68(0xe4)][_0x2c4f68(0x20b)][_0x2c4f68(0x3af)][_0x2c4f68(0x34f)]['call'](this),this[_0x2c4f68(0x3ea)]();},Window_EquipStatus[_0x1d6c8a(0x17c)]['refreshItemsEquipsCoreNoMenuImage']=function(){const _0x1f4c4c=_0x1d6c8a;VisuMZ[_0x1f4c4c(0xe4)][_0x1f4c4c(0x20b)][_0x1f4c4c(0x3af)]['DrawFaceJS'][_0x1f4c4c(0x4e1)](this),this['drawParamsItemsEquipsCore']();},Window_EquipStatus[_0x1d6c8a(0x17c)][_0x1d6c8a(0x3ea)]=function(){const _0x128bea=_0x1d6c8a;this[_0x128bea(0x39c)](),VisuMZ[_0x128bea(0xe4)][_0x128bea(0x20b)][_0x128bea(0x3af)][_0x128bea(0x178)][_0x128bea(0x4e1)](this);},Window_EquipStatus['prototype'][_0x1d6c8a(0x4cb)]=function(_0x170587,_0x463fa2,_0x2c8354,_0x262563,_0x264246){const _0x4c614d=_0x1d6c8a,_0x16f79c=ImageManager[_0x4c614d(0x529)](_0x170587[_0x4c614d(0x350)]()),_0x303864=this[_0x4c614d(0x48a)]-_0x16f79c[_0x4c614d(0x376)];_0x463fa2+=_0x303864/0x2;if(_0x303864<0x0)_0x262563-=_0x303864;Window_StatusBase[_0x4c614d(0x17c)][_0x4c614d(0x4cb)][_0x4c614d(0x4e1)](this,_0x170587,_0x463fa2,_0x2c8354,_0x262563,_0x264246);},Window_EquipStatus[_0x1d6c8a(0x17c)][_0x1d6c8a(0x4a3)]=function(){const _0x2882b2=_0x1d6c8a;return Imported[_0x2882b2(0x37a)]?VisuMZ[_0x2882b2(0x274)][_0x2882b2(0x20b)][_0x2882b2(0x1ca)][_0x2882b2(0x273)]:[0x0,0x1,0x2,0x3,0x4,0x5,0x6,0x7];},Window_EquipStatus[_0x1d6c8a(0x17c)][_0x1d6c8a(0x4f3)]=function(){const _0x54ec9d=_0x1d6c8a;return VisuMZ[_0x54ec9d(0xe4)][_0x54ec9d(0x20b)]['EquipScene'][_0x54ec9d(0x17e)];},Window_EquipStatus[_0x1d6c8a(0x17c)][_0x1d6c8a(0x2f3)]=function(){const _0x1bfd96=_0x1d6c8a;return Imported[_0x1bfd96(0x37a)]&&VisuMZ[_0x1bfd96(0x274)][_0x1bfd96(0x20b)][_0x1bfd96(0x1ca)][_0x1bfd96(0x2c9)];},Window_EquipStatus['prototype'][_0x1d6c8a(0x3e9)]=function(_0x13da21,_0x2ac13a,_0x19185e,_0xaaa230){const _0x29de9a=_0x1d6c8a,_0x4e0dce=this[_0x29de9a(0x345)]();Imported['VisuMZ_0_CoreEngine']?this[_0x29de9a(0x186)](_0x2ac13a+_0x4e0dce,_0x19185e,_0xaaa230,_0x13da21,![]):this[_0x29de9a(0x110)](TextManager[_0x29de9a(0x4e8)](_0x13da21),_0x2ac13a+_0x4e0dce,_0x19185e,_0xaaa230);},Window_EquipStatus[_0x1d6c8a(0x17c)][_0x1d6c8a(0x52a)]=function(_0x3c2cf4,_0x477147,_0x2a97ce,_0x29a95f){const _0x491ef8=_0x1d6c8a,_0x334e3c=this[_0x491ef8(0x345)]();let _0x397271=0x0;Imported[_0x491ef8(0x37a)]?_0x397271=this[_0x491ef8(0x50e)][_0x491ef8(0x210)](_0x3c2cf4,!![]):_0x397271=this[_0x491ef8(0x50e)][_0x491ef8(0x4e8)](_0x3c2cf4);const _0x4f618=_0x397271;this[_0x491ef8(0x110)](_0x397271,_0x477147,_0x2a97ce,_0x29a95f-_0x334e3c,_0x491ef8(0x470));},Window_EquipStatus[_0x1d6c8a(0x17c)][_0x1d6c8a(0x17a)]=function(_0x5da0bd,_0x659772,_0x10a83f,_0x3a3ed3){const _0x29c3be=_0x1d6c8a,_0x2df66c=this[_0x29c3be(0x345)]();let _0x2063cd=0x0,_0x4e5f44=0x0,_0x349894='';if(this[_0x29c3be(0x41c)]){Imported['VisuMZ_0_CoreEngine']?(_0x2063cd=this['_actor']['paramValueByName'](_0x5da0bd,![]),_0x4e5f44=this[_0x29c3be(0x41c)][_0x29c3be(0x210)](_0x5da0bd,![]),_0x349894=this[_0x29c3be(0x41c)][_0x29c3be(0x210)](_0x5da0bd,!![])):(_0x2063cd=this['_actor'][_0x29c3be(0x4e8)](_0x5da0bd),_0x4e5f44=this[_0x29c3be(0x41c)][_0x29c3be(0x4e8)](_0x5da0bd),_0x349894=this[_0x29c3be(0x41c)][_0x29c3be(0x4e8)](_0x5da0bd));const _0x4684ab=_0x2063cd,_0x334d8b=_0x4e5f44;diffValue=_0x334d8b-_0x4684ab,this['changeTextColor'](ColorManager[_0x29c3be(0x40b)](diffValue)),this['drawText'](_0x349894,_0x659772,_0x10a83f,_0x3a3ed3-_0x2df66c,_0x29c3be(0x470));}},Window_EquipStatus[_0x1d6c8a(0x17c)]['drawUpdatedParamValueDiff']=function(_0x16e5de,_0xfda1a3,_0x409efd,_0x17be0a){const _0x4013de=_0x1d6c8a,_0x5ec929=this[_0x4013de(0x345)]();let _0x36f204=0x0,_0x2a037d=0x0,_0xdf2737=![];if(this[_0x4013de(0x41c)]){if('hArHe'===_0x4013de(0x3c2))_0x3a8af9[_0x4013de(0x17c)]['isRightInputMode'][_0x4013de(0x4e1)](this);else{Imported[_0x4013de(0x37a)]?(_0x36f204=this['_actor'][_0x4013de(0x210)](_0x16e5de,![]),_0x2a037d=this[_0x4013de(0x41c)][_0x4013de(0x210)](_0x16e5de,![]),_0xdf2737=String(this['_actor'][_0x4013de(0x210)](_0x16e5de,!![]))[_0x4013de(0x2b8)](/([%％])/i)):(_0x36f204=this[_0x4013de(0x50e)]['param'](_0x16e5de),_0x2a037d=this[_0x4013de(0x41c)][_0x4013de(0x4e8)](_0x16e5de),_0xdf2737=_0x36f204%0x1!==0x0||_0x2a037d%0x1!==0x0);const _0x1a8f99=_0x36f204,_0x381972=_0x2a037d,_0x46d6b5=_0x381972-_0x1a8f99;let _0x23e6f0=_0x46d6b5;if(_0xdf2737)_0x23e6f0=Math[_0x4013de(0x49f)](_0x46d6b5*0x64)+'%';_0x46d6b5!==0x0&&(this[_0x4013de(0x50b)](ColorManager[_0x4013de(0x40b)](_0x46d6b5)),_0x23e6f0=(_0x46d6b5>0x0?_0x4013de(0x50a):'(%1)')[_0x4013de(0x1af)](_0x23e6f0),this[_0x4013de(0x110)](_0x23e6f0,_0xfda1a3+_0x5ec929,_0x409efd,_0x17be0a,'left'));}}},Window_EquipStatus[_0x1d6c8a(0x17c)][_0x1d6c8a(0x472)]=function(_0x3e39cc,_0x523617,_0xc82d02,_0x168830,_0x1c3be5){const _0x41db58=_0x1d6c8a;if(VisuMZ[_0x41db58(0xe4)][_0x41db58(0x20b)][_0x41db58(0x3af)][_0x41db58(0x555)]===![])return;_0x1c3be5=Math[_0x41db58(0x23c)](_0x1c3be5||0x1,0x1);while(_0x1c3be5--){_0x168830=_0x168830||this['lineHeight'](),this['contents'][_0x41db58(0x245)]=0xa0;const _0x406f2a=ColorManager[_0x41db58(0x43b)]();this[_0x41db58(0x3dc)][_0x41db58(0x1bd)](_0x3e39cc+0x1,_0x523617+0x1,_0xc82d02-0x2,_0x168830-0x2,_0x406f2a),this['contents'][_0x41db58(0x245)]=0xff;}},ColorManager[_0x1d6c8a(0x43b)]=function(){const _0x4dba5e=_0x1d6c8a,_0xd1dd81=VisuMZ[_0x4dba5e(0xe4)][_0x4dba5e(0x20b)]['EquipScene'];let _0x2b8ca3=_0xd1dd81[_0x4dba5e(0x477)]!==undefined?_0xd1dd81[_0x4dba5e(0x477)]:0x13;return ColorManager['getColor'](_0x2b8ca3);},VisuMZ[_0x1d6c8a(0xe4)]['Window_EquipCommand_initialize']=Window_EquipCommand[_0x1d6c8a(0x17c)][_0x1d6c8a(0x4ca)],Window_EquipCommand[_0x1d6c8a(0x17c)]['initialize']=function(_0x39c18e){const _0x182992=_0x1d6c8a;VisuMZ[_0x182992(0xe4)][_0x182992(0x10a)][_0x182992(0x4e1)](this,_0x39c18e),this[_0x182992(0x32a)](_0x39c18e);},Window_EquipCommand[_0x1d6c8a(0x17c)][_0x1d6c8a(0x32a)]=function(_0x26408e){const _0x22cbbf=_0x1d6c8a,_0x513edc=new Rectangle(0x0,0x0,_0x26408e[_0x22cbbf(0x376)],_0x26408e[_0x22cbbf(0x3d7)]);this[_0x22cbbf(0x3b2)]=new Window_Base(_0x513edc),this['_commandNameWindow'][_0x22cbbf(0x4a4)]=0x0,this[_0x22cbbf(0x457)](this[_0x22cbbf(0x3b2)]),this[_0x22cbbf(0x144)]();},Window_EquipCommand['prototype'][_0x1d6c8a(0x1e5)]=function(){const _0x509181=_0x1d6c8a;Window_HorzCommand[_0x509181(0x17c)][_0x509181(0x1e5)][_0x509181(0x4e1)](this);if(this[_0x509181(0x3b2)])this[_0x509181(0x144)]();},Window_EquipCommand[_0x1d6c8a(0x17c)][_0x1d6c8a(0x144)]=function(){const _0x3b834c=_0x1d6c8a,_0x27b821=this[_0x3b834c(0x3b2)];_0x27b821[_0x3b834c(0x3dc)][_0x3b834c(0x442)]();const _0x1b287a=this[_0x3b834c(0x177)](this[_0x3b834c(0x4f7)]());if(_0x1b287a==='icon'){const _0x222131=this[_0x3b834c(0x3cc)](this[_0x3b834c(0x4f7)]());let _0x5e814b=this[_0x3b834c(0x38a)](this[_0x3b834c(0x4f7)]());_0x5e814b=_0x5e814b[_0x3b834c(0x2af)](/\\I\[(\d+)\]/gi,''),_0x27b821[_0x3b834c(0x39c)](),this['commandNameWindowDrawBackground'](_0x5e814b,_0x222131),this[_0x3b834c(0x21e)](_0x5e814b,_0x222131),this[_0x3b834c(0x1c7)](_0x5e814b,_0x222131);}},Window_EquipCommand[_0x1d6c8a(0x17c)]['commandNameWindowDrawBackground']=function(_0x1bcd6b,_0x4fb23a){},Window_EquipCommand['prototype'][_0x1d6c8a(0x21e)]=function(_0x41c479,_0x1dd2f4){const _0x25ede2=_0x1d6c8a,_0x5a83f3=this[_0x25ede2(0x3b2)];_0x5a83f3[_0x25ede2(0x110)](_0x41c479,0x0,_0x1dd2f4['y'],_0x5a83f3[_0x25ede2(0x48a)],'center');},Window_EquipCommand[_0x1d6c8a(0x17c)][_0x1d6c8a(0x1c7)]=function(_0x648b03,_0x3e7d91){const _0x15951f=_0x1d6c8a,_0x4b30ff=this[_0x15951f(0x3b2)],_0x1c6bd7=$gameSystem['windowPadding'](),_0x26ee09=_0x3e7d91['x']+Math[_0x15951f(0x17f)](_0x3e7d91['width']/0x2)+_0x1c6bd7;_0x4b30ff['x']=_0x4b30ff[_0x15951f(0x376)]/-0x2+_0x26ee09,_0x4b30ff['y']=Math['floor'](_0x3e7d91[_0x15951f(0x3d7)]/0x2);},Window_EquipCommand['prototype'][_0x1d6c8a(0x12f)]=function(){const _0x45176a=_0x1d6c8a;return Imported[_0x45176a(0x37a)]&&Window_HorzCommand[_0x45176a(0x17c)][_0x45176a(0x12f)][_0x45176a(0x4e1)](this);},Window_EquipCommand[_0x1d6c8a(0x17c)][_0x1d6c8a(0x4bb)]=function(){const _0x5c8d22=_0x1d6c8a;if(this[_0x5c8d22(0x424)]()===_0x5c8d22(0x511))Window_HorzCommand[_0x5c8d22(0x17c)][_0x5c8d22(0x4bb)]['call'](this);},Window_EquipCommand['prototype'][_0x1d6c8a(0x18d)]=function(){const _0xb90b03=_0x1d6c8a;!this[_0xb90b03(0x430)]()&&Window_HorzCommand[_0xb90b03(0x17c)][_0xb90b03(0x18d)][_0xb90b03(0x4e1)](this);},Window_EquipCommand[_0x1d6c8a(0x17c)][_0x1d6c8a(0x430)]=function(){const _0x3375b5=_0x1d6c8a;if(!this['isCursorMovable']())return![];if(SceneManager[_0x3375b5(0x3d1)]['constructor']!==Scene_Equip)return![];if(Input[_0x3375b5(0x143)]('down')){if(_0x3375b5(0x4ed)===_0x3375b5(0x342))return _0x557ca8[_0x3375b5(0x17f)](_0x45aa45[_0x3375b5(0x16a)]/0x2);else this['playCursorSound'](),SceneManager[_0x3375b5(0x3d1)]['commandEquip'](),SceneManager[_0x3375b5(0x3d1)][_0x3375b5(0x1f0)][_0x3375b5(0x565)](-0x1);}return![];},Window_EquipCommand['prototype'][_0x1d6c8a(0x40a)]=function(){const _0x2078e7=_0x1d6c8a;return this[_0x2078e7(0x391)]?this[_0x2078e7(0x391)]['length']:0x3;},Window_EquipCommand[_0x1d6c8a(0x17c)][_0x1d6c8a(0x45b)]=function(){const _0x5322df=_0x1d6c8a;if(this[_0x5322df(0x452)]()&&this[_0x5322df(0x3f4)]&&SceneManager[_0x5322df(0x3d1)][_0x5322df(0x527)]===Scene_Equip){if(this[_0x5322df(0x212)]()&&TouchInput[_0x5322df(0x4b7)]()){if(_0x5322df(0x25c)!==_0x5322df(0x1d1))this['onTouchSelectModernControls'](![]);else return'#%1'[_0x5322df(0x1af)](_0xf4cc33(_0x7480f3['$1']));}else{if(TouchInput[_0x5322df(0x143)]()){if(_0x5322df(0x16b)!==_0x5322df(0x16b))return _0x2fb36d[_0x5322df(0xe4)][_0x5322df(0x20b)][_0x5322df(0x337)][_0x5322df(0x19a)];else this[_0x5322df(0x11d)](!![]);}}TouchInput[_0x5322df(0x132)]()&&this[_0x5322df(0xe7)]();}},Window_EquipCommand['prototype'][_0x1d6c8a(0x11d)]=function(_0x560e93){const _0x42dadc=_0x1d6c8a;this[_0x42dadc(0x1f9)]=![];const _0x2bb205=this[_0x42dadc(0x4f7)](),_0x406e45=this[_0x42dadc(0x203)](),_0xd5621c=SceneManager[_0x42dadc(0x3d1)][_0x42dadc(0x1f0)];if(_0xd5621c['isOpen']()&&_0xd5621c['visible']){if(_0x406e45>=0x0)_0x406e45===this[_0x42dadc(0x4f7)]()&&(_0x42dadc(0x182)!=='GlzAr'?this['_doubleTouch']=!![]:(_0x2447d7[_0x42dadc(0xe4)][_0x42dadc(0x2a5)][_0x42dadc(0x4e1)](this),this[_0x42dadc(0x12f)]()&&(this[_0x42dadc(0xec)]['smoothSelect'](0x0),this[_0x42dadc(0x1f0)]['deactivate']()))),this[_0x42dadc(0x16e)](),this['select'](_0x406e45);else{if(_0xd5621c[_0x42dadc(0x203)]()>=0x0){if(_0x42dadc(0x1a2)!=='EqIli'){if(!this['updatedLayoutStyle']())return![];if(!this['isUseModernControls']())return![];if(!this['_sellWindow'])return![];if(!this['_sellWindow']['active'])return![];return this[_0x42dadc(0x16c)]()&&this[_0x42dadc(0x12f)]();}else this['deactivate'](),this['deselect']();}}}_0x560e93&&this[_0x42dadc(0x4f7)]()!==_0x2bb205&&(_0x42dadc(0x23e)===_0x42dadc(0x462)?this[_0x42dadc(0xe7)]():this[_0x42dadc(0x327)]());},Window_EquipCommand['prototype']['makeCommandList']=function(){const _0x52444a=_0x1d6c8a;this['addEquipCommand'](),this[_0x52444a(0x3cb)](),this['addClearCommand']();},Window_EquipCommand[_0x1d6c8a(0x17c)]['refresh']=function(){const _0x139bd=_0x1d6c8a;Window_HorzCommand[_0x139bd(0x17c)][_0x139bd(0x1ae)][_0x139bd(0x4e1)](this),this['refreshCursor']();},Window_EquipCommand[_0x1d6c8a(0x17c)][_0x1d6c8a(0x297)]=function(){const _0x1a9977=_0x1d6c8a;if(!this[_0x1a9977(0x3b1)]())return;const _0x40ac11=this[_0x1a9977(0x2ac)](),_0x8ef8d5=VisuMZ[_0x1a9977(0xe4)]['Settings']['EquipScene'][_0x1a9977(0x44a)],_0x484f47=_0x40ac11===_0x1a9977(0x43d)?TextManager[_0x1a9977(0x509)]:'\x5cI[%1]%2'[_0x1a9977(0x1af)](_0x8ef8d5,TextManager[_0x1a9977(0x509)]),_0x5f0a10=this[_0x1a9977(0x405)]();this['addCommand'](_0x484f47,_0x1a9977(0x511),_0x5f0a10);},Window_EquipCommand[_0x1d6c8a(0x17c)][_0x1d6c8a(0x3b1)]=function(){const _0x2c128e=_0x1d6c8a;return!this[_0x2c128e(0x12f)]();},Window_EquipCommand[_0x1d6c8a(0x17c)][_0x1d6c8a(0x405)]=function(){return!![];},Window_EquipCommand[_0x1d6c8a(0x17c)][_0x1d6c8a(0x3cb)]=function(){const _0x39b8a9=_0x1d6c8a;if(!this[_0x39b8a9(0x37f)]())return;const _0x491aa2=this[_0x39b8a9(0x2ac)](),_0x142afb=VisuMZ['ItemsEquipsCore'][_0x39b8a9(0x20b)][_0x39b8a9(0x3af)]['CmdIconOptimize'],_0x2ef2a2=_0x491aa2==='text'?TextManager[_0x39b8a9(0x54f)]:_0x39b8a9(0x487)[_0x39b8a9(0x1af)](_0x142afb,TextManager['optimize']),_0x423f07=this[_0x39b8a9(0x42f)]();this['addCommand'](_0x2ef2a2,_0x39b8a9(0x54f),_0x423f07);},Window_EquipCommand['prototype'][_0x1d6c8a(0x37f)]=function(){const _0x41d700=_0x1d6c8a;return VisuMZ[_0x41d700(0xe4)][_0x41d700(0x20b)][_0x41d700(0x3af)][_0x41d700(0x4c9)];},Window_EquipCommand[_0x1d6c8a(0x17c)][_0x1d6c8a(0x42f)]=function(){return!![];},Window_EquipCommand[_0x1d6c8a(0x17c)]['addClearCommand']=function(){const _0xd61c33=_0x1d6c8a;if(!this[_0xd61c33(0x28f)]())return;const _0x11e7b0=this['commandStyle'](),_0xd1697a=VisuMZ[_0xd61c33(0xe4)][_0xd61c33(0x20b)][_0xd61c33(0x3af)][_0xd61c33(0x28b)],_0x11acaf=_0x11e7b0===_0xd61c33(0x43d)?TextManager[_0xd61c33(0x442)]:_0xd61c33(0x487)['format'](_0xd1697a,TextManager[_0xd61c33(0x442)]),_0x1f7cd8=this['isClearCommandEnabled']();this[_0xd61c33(0x4af)](_0x11acaf,_0xd61c33(0x442),_0x1f7cd8);},Window_EquipCommand['prototype'][_0x1d6c8a(0x28f)]=function(){const _0x1fc2ea=_0x1d6c8a;return VisuMZ[_0x1fc2ea(0xe4)][_0x1fc2ea(0x20b)][_0x1fc2ea(0x3af)]['CommandAddClear'];},Window_EquipCommand[_0x1d6c8a(0x17c)][_0x1d6c8a(0x481)]=function(){return!![];},Window_EquipCommand[_0x1d6c8a(0x17c)]['itemTextAlign']=function(){const _0x4531b7=_0x1d6c8a;return VisuMZ[_0x4531b7(0xe4)][_0x4531b7(0x20b)][_0x4531b7(0x3af)][_0x4531b7(0x440)];},Window_EquipCommand[_0x1d6c8a(0x17c)]['drawItem']=function(_0x140a0c){const _0x5659af=_0x1d6c8a,_0x6e38c4=this[_0x5659af(0x177)](_0x140a0c);if(_0x6e38c4===_0x5659af(0x28a))this[_0x5659af(0x19f)](_0x140a0c);else _0x6e38c4===_0x5659af(0x1ff)?this[_0x5659af(0x3ba)](_0x140a0c):Window_HorzCommand[_0x5659af(0x17c)]['drawItem'][_0x5659af(0x4e1)](this,_0x140a0c);},Window_EquipCommand['prototype'][_0x1d6c8a(0x2ac)]=function(){const _0x5088e7=_0x1d6c8a;return VisuMZ[_0x5088e7(0xe4)][_0x5088e7(0x20b)][_0x5088e7(0x3af)][_0x5088e7(0x214)];},Window_EquipCommand[_0x1d6c8a(0x17c)][_0x1d6c8a(0x177)]=function(_0x211314){const _0x206a49=_0x1d6c8a;if(_0x211314<0x0)return _0x206a49(0x43d);const _0x46ac87=this[_0x206a49(0x2ac)]();if(_0x46ac87!=='auto'){if('jLBXi'!==_0x206a49(0x267))return _0x46ac87;else this[_0x206a49(0x1f0)][_0x206a49(0x565)](0x0),this[_0x206a49(0x1f0)]['activate']();}else{if(this[_0x206a49(0x475)]()>0x0){if(_0x206a49(0x51c)!=='ePaeT')return _0x3b208f[_0x206a49(0xe4)]['Window_ItemList_maxCols'][_0x206a49(0x4e1)](this);else{const _0x548fd9=this[_0x206a49(0x38a)](_0x211314);if(_0x548fd9['match'](/\\I\[(\d+)\]/i)){if(_0x206a49(0x49e)!==_0x206a49(0x49e))_0x105840[_0x206a49(0xe4)]['Scene_Equip_createSlotWindow'][_0x206a49(0x4e1)](this),this[_0x206a49(0x12f)]()&&this[_0x206a49(0x12c)]();else{const _0x446bc5=this['itemLineRect'](_0x211314),_0xd0f77=this['textSizeEx'](_0x548fd9)[_0x206a49(0x376)];if(_0xd0f77<=_0x446bc5[_0x206a49(0x376)]){if(_0x206a49(0x515)!==_0x206a49(0x515))this[_0x206a49(0x3ba)](_0x2422cb);else return'iconText';}else return'icon';}}}}}return _0x206a49(0x43d);},Window_EquipCommand[_0x1d6c8a(0x17c)][_0x1d6c8a(0x19f)]=function(_0x27337d){const _0x18584e=_0x1d6c8a,_0x1deba0=this['itemLineRect'](_0x27337d),_0x4ae7b3=this[_0x18584e(0x38a)](_0x27337d),_0x244ae9=this[_0x18584e(0x39d)](_0x4ae7b3)[_0x18584e(0x376)];this[_0x18584e(0x558)](this['isCommandEnabled'](_0x27337d));const _0x3e9e4a=this[_0x18584e(0x355)]();if(_0x3e9e4a==='right')_0x18584e(0x517)===_0x18584e(0x3e5)?_0x59ec4f[_0x18584e(0x427)](_0x34a255['SwitchSell'],![]):this['drawTextEx'](_0x4ae7b3,_0x1deba0['x']+_0x1deba0['width']-_0x244ae9,_0x1deba0['y'],_0x244ae9);else{if(_0x3e9e4a==='center'){if(_0x18584e(0x35d)!=='txcOh'){const _0x211c49=_0x1deba0['x']+Math['floor']((_0x1deba0['width']-_0x244ae9)/0x2);this[_0x18584e(0x290)](_0x4ae7b3,_0x211c49,_0x1deba0['y'],_0x244ae9);}else return this[_0x18584e(0x16c)]()[_0x18584e(0x2b8)](/RIGHT/i);}else{if('SVKCR'===_0x18584e(0x140)){const _0x3b6a24=_0x369ef6['x']+_0x51b0e8[_0x18584e(0x17f)]((_0x3a38c1[_0x18584e(0x376)]-_0x26105f)/0x2);this[_0x18584e(0x290)](_0x118bfa,_0x3b6a24,_0x345ee8['y'],_0x3af807);}else this[_0x18584e(0x290)](_0x4ae7b3,_0x1deba0['x'],_0x1deba0['y'],_0x244ae9);}}},Window_EquipCommand[_0x1d6c8a(0x17c)][_0x1d6c8a(0x3ba)]=function(_0x2023d4){const _0x4232cf=_0x1d6c8a;this['commandName'](_0x2023d4)['match'](/\\I\[(\d+)\]/i);const _0x4239d1=Number(RegExp['$1'])||0x0,_0x549f50=this[_0x4232cf(0x3cc)](_0x2023d4),_0x3bd553=_0x549f50['x']+Math['floor']((_0x549f50[_0x4232cf(0x376)]-ImageManager[_0x4232cf(0x14e)])/0x2),_0x181b42=_0x549f50['y']+(_0x549f50[_0x4232cf(0x3d7)]-ImageManager[_0x4232cf(0x12a)])/0x2;this['drawIcon'](_0x4239d1,_0x3bd553,_0x181b42);},Window_EquipSlot[_0x1d6c8a(0x17c)][_0x1d6c8a(0x12f)]=function(){const _0x5d306a=_0x1d6c8a;return Imported['VisuMZ_0_CoreEngine']&&Window_HorzCommand[_0x5d306a(0x17c)][_0x5d306a(0x12f)][_0x5d306a(0x4e1)](this);},Window_EquipSlot['prototype']['activate']=function(){const _0x4b69b8=_0x1d6c8a;Window_StatusBase[_0x4b69b8(0x17c)][_0x4b69b8(0x16e)][_0x4b69b8(0x4e1)](this),this[_0x4b69b8(0x1e5)]();},Window_EquipSlot[_0x1d6c8a(0x17c)][_0x1d6c8a(0x4ef)]=function(){const _0x10b627=_0x1d6c8a;Window_StatusBase[_0x10b627(0x17c)][_0x10b627(0x4ef)][_0x10b627(0x4e1)](this),this[_0x10b627(0x262)]();},Window_EquipSlot[_0x1d6c8a(0x17c)][_0x1d6c8a(0x262)]=function(){const _0x306422=_0x1d6c8a;if(!this['isShiftRemoveShortcutEnabled']())return;if(Input['isTriggered']('shift')&&this['item']()){const _0x21008e=SceneManager['_scene'][_0x306422(0x50e)];if(_0x21008e){if(_0x306422(0x2d3)!==_0x306422(0x432)){if(this[_0x306422(0x357)](this[_0x306422(0x4f7)]())){if(_0x306422(0x54a)===_0x306422(0x1d7)){if(this[_0x306422(0x1a6)][_0x306422(0x492)]['match'](/<CUSTOM STATUS INFO>\s*([\s\S]*)\s*<\/CUSTOM STATUS INFO>/i)){const _0xd47753=_0x2a0097(_0x12a19f['$1'])['split'](/[\r\n]+/);for(const _0x4586bf of _0xd47753){if(_0x4586bf['match'](/(.*):[ ](.*)/i)){const _0x1ec55d=_0x36b375(_0x5cd963['$1'])[_0x306422(0x48e)](),_0x48e362=_0x4d7cd4(_0x1f9f5e['$2'])[_0x306422(0x48e)]();this['drawItemCustomEntryLine'](_0x1ec55d,_0x48e362,_0x18094a,_0x201491,_0x3f42ad),_0x43809b+=this[_0x306422(0x224)]();}}}return this['resetFontSettings'](),_0x3b58d3;}else this[_0x306422(0x16f)](),this[_0x306422(0x483)]();}else this[_0x306422(0x568)]();}else this[_0x306422(0x107)]['hide'](),this['_buyWindow'][_0x306422(0x38b)](),this[_0x306422(0x135)][_0x306422(0x1fa)](),this[_0x306422(0xfe)]['show']();}}},Window_EquipSlot['prototype'][_0x1d6c8a(0x357)]=function(_0x170b96){const _0x520ff5=_0x1d6c8a,_0x15a1a1=SceneManager[_0x520ff5(0x3d1)]['_actor'];if(!_0x15a1a1)return;if(!_0x15a1a1[_0x520ff5(0x560)](this[_0x520ff5(0x4f7)]()))return'uTGZj'===_0x520ff5(0x4ce)?_0x90b9a[_0x520ff5(0xe4)][_0x520ff5(0x20b)][_0x520ff5(0x3af)]['CmdStyle']:![];const _0x589a57=_0x15a1a1[_0x520ff5(0x47f)]()[this[_0x520ff5(0x4f7)]()];if(_0x15a1a1['nonRemovableEtypes']()[_0x520ff5(0x1c3)](_0x589a57)){if(_0x520ff5(0x2c6)!==_0x520ff5(0x2c6)){const _0x26205d=_0x5491d1(_0x2f8091['$1']),_0x2a027a=_0x520ff5(0x4f0)['format'](_0x26205d);_0x5b49f3[_0x520ff5(0xe4)]['itemEnableJS'][_0x4a47fd['id']]=new _0x5af790(_0x520ff5(0x199),_0x2a027a);}else return![];}return!![];;},Window_EquipSlot[_0x1d6c8a(0x17c)]['processShiftRemoveShortcut']=function(){const _0x4d155c=_0x1d6c8a;SoundManager[_0x4d155c(0x1d6)]();const _0x18d06c=SceneManager[_0x4d155c(0x3d1)][_0x4d155c(0x50e)];_0x18d06c['changeEquip'](this[_0x4d155c(0x4f7)](),null),this[_0x4d155c(0x1ae)](),this['_itemWindow'][_0x4d155c(0x1ae)](),this[_0x4d155c(0x1e5)]();const _0x1f7896=SceneManager[_0x4d155c(0x3d1)][_0x4d155c(0xfe)];if(_0x1f7896)_0x1f7896['refresh']();},Window_EquipSlot[_0x1d6c8a(0x17c)][_0x1d6c8a(0x310)]=function(){const _0xcb54e6=_0x1d6c8a;if(!this[_0xcb54e6(0x505)])return![];if(!VisuMZ[_0xcb54e6(0xe4)][_0xcb54e6(0x20b)][_0xcb54e6(0x3af)][_0xcb54e6(0x233)])return![];return!![];},Window_EquipSlot[_0x1d6c8a(0x17c)][_0x1d6c8a(0x18d)]=function(){const _0x88b68c=_0x1d6c8a;if(!this[_0x88b68c(0x430)]()){if('tynHC'===_0x88b68c(0x349)){if(this[_0x88b68c(0x471)]())return _0x13cee8[_0x88b68c(0xe4)][_0x88b68c(0x20b)][_0x88b68c(0x2d0)][_0x88b68c(0x2b1)];return _0x3a8824[_0x88b68c(0x17c)][_0x88b68c(0x31c)][_0x88b68c(0x4e1)](this);}else Window_StatusBase[_0x88b68c(0x17c)][_0x88b68c(0x18d)][_0x88b68c(0x4e1)](this);}},Window_EquipSlot[_0x1d6c8a(0x17c)][_0x1d6c8a(0x430)]=function(){const _0x5c336a=_0x1d6c8a;if(!this[_0x5c336a(0x188)]())return![];if(SceneManager['_scene'][_0x5c336a(0x527)]!==Scene_Equip)return![];if(this[_0x5c336a(0x22c)]()){if(_0x5c336a(0x3d6)!==_0x5c336a(0x3d6))_0x115999[_0x5c336a(0x427)](_0x58a18d[_0x5c336a(0x15c)],![]);else return this[_0x5c336a(0x327)](),Input[_0x5c336a(0x442)](),SceneManager['_scene'][_0x5c336a(0x2fb)](),![];}else{if(Input[_0x5c336a(0x1d3)](_0x5c336a(0x36e))){if('OnxkT'!==_0x5c336a(0x42d)){const _0x5d8321=_0xd52c0[_0x5c336a(0x3d1)][_0x5c336a(0x50e)];if(!_0x5d8321)return;if(!_0x5d8321[_0x5c336a(0x560)](this[_0x5c336a(0x4f7)]()))return![];const _0x54aabf=_0x5d8321[_0x5c336a(0x47f)]()[this[_0x5c336a(0x4f7)]()];if(_0x5d8321[_0x5c336a(0x3c5)]()['includes'](_0x54aabf))return![];return!![];;}else{const _0x222b9=this[_0x5c336a(0x4f7)]();return Input[_0x5c336a(0x4d6)](_0x5c336a(0x489))?this['cursorPagedown']():this['cursorDown'](Input[_0x5c336a(0x143)](_0x5c336a(0x36e))),this[_0x5c336a(0x4f7)]()!==_0x222b9&&this['playCursorSound'](),!![];}}else{if(this[_0x5c336a(0x10c)]()&&Input['isTriggered']('shift'))return!![];}}return![];},Window_EquipSlot['prototype'][_0x1d6c8a(0x22c)]=function(){const _0x18a85f=_0x1d6c8a;if(this[_0x18a85f(0x4f7)]()!==0x0)return![];const _0x3c69de=VisuMZ[_0x18a85f(0xe4)][_0x18a85f(0x20b)][_0x18a85f(0x3af)];if(!_0x3c69de[_0x18a85f(0x4c9)]&&!_0x3c69de[_0x18a85f(0x1a4)])return![];return Input[_0x18a85f(0x143)]('up');},Window_EquipSlot[_0x1d6c8a(0x17c)][_0x1d6c8a(0x10c)]=function(){const _0x4dbda8=_0x1d6c8a;return VisuMZ[_0x4dbda8(0xe4)][_0x4dbda8(0x20b)][_0x4dbda8(0x3af)][_0x4dbda8(0x233)];},Window_EquipSlot['prototype'][_0x1d6c8a(0x45b)]=function(){const _0x15a3a3=_0x1d6c8a;if(this[_0x15a3a3(0x452)]()&&this[_0x15a3a3(0x3f4)]&&SceneManager[_0x15a3a3(0x3d1)]['constructor']===Scene_Equip){if(this[_0x15a3a3(0x212)]()&&TouchInput[_0x15a3a3(0x4b7)]())this[_0x15a3a3(0x11d)](![]);else TouchInput[_0x15a3a3(0x143)]()&&this['onTouchSelectModernControls'](!![]);if(TouchInput['isClicked']()){if(_0x15a3a3(0xe5)!=='UDvVn')this['onTouchOk']();else return!this[_0x15a3a3(0x52d)];}else TouchInput[_0x15a3a3(0x19b)]()&&this[_0x15a3a3(0x137)]();}},Window_EquipSlot['prototype'][_0x1d6c8a(0x11d)]=function(_0x46ce7b){const _0x203188=_0x1d6c8a;this[_0x203188(0x1f9)]=![];const _0x164a5e=this[_0x203188(0x4f7)](),_0x177c57=this[_0x203188(0x203)](),_0x955518=SceneManager[_0x203188(0x3d1)][_0x203188(0xec)];if(_0x955518[_0x203188(0x452)]()&&_0x955518[_0x203188(0x3f4)]){if(_0x177c57>=0x0){if(_0x203188(0x34a)!=='lwKct')this[_0x203188(0x15b)][_0x203188(0x1c8)](_0x203188(0x3b0),this['popScene']['bind'](this));else{if(_0x177c57===this[_0x203188(0x4f7)]()){if('eGfMY'!==_0x203188(0x174))return _0x4d84e0[_0x203188(0x3d1)][_0x203188(0x2ad)]()?0x1:0x2;else this['_doubleTouch']=!![];}this[_0x203188(0x16e)](),this[_0x203188(0x1e6)](_0x177c57);}}else{if(_0x955518[_0x203188(0x203)]()>=0x0){if('IHugy'!=='tPNwz')this[_0x203188(0x1c5)](),this[_0x203188(0x1fa)]();else{const _0x5f5c2a=_0x203188(0x456);if(this['_itemData'][_0x203188(0x279)]<=0x0&&this[_0x203188(0x561)][_0x203188(0x531)]<=0x0&&!this['_customItemInfo'][_0x5f5c2a])return![];const _0x43b03c=this[_0x203188(0x3a4)]();this[_0x203188(0x566)](_0x43b03c,_0x27fdac,_0x391a70,_0x222cba,!![]);const _0x1e6e94=this['getItemEffectsMpRecoveryText']();return this[_0x203188(0x50b)](_0x552b60[_0x203188(0x3e4)](0x3)),this['drawItemKeyData'](_0x1e6e94,_0x5cbe4d,_0x169285,_0xdf75ea,![],_0x203188(0x470)),this[_0x203188(0x472)](_0x462533,_0x3c09e0,_0x311ad9),this[_0x203188(0x39c)](),!![];}}}}_0x46ce7b&&this[_0x203188(0x4f7)]()!==_0x164a5e&&this[_0x203188(0x327)]();},Window_EquipSlot[_0x1d6c8a(0x17c)][_0x1d6c8a(0x154)]=function(){const _0x405334=_0x1d6c8a;return this[_0x405334(0x4f7)]();},VisuMZ['ItemsEquipsCore']['Window_EquipItem_includes']=Window_EquipItem[_0x1d6c8a(0x17c)]['includes'],Window_EquipItem[_0x1d6c8a(0x17c)]['includes']=function(_0xb8a70c){const _0x12df68=_0x1d6c8a;return _0xb8a70c===null&&this['nonRemovableEtypes']()[_0x12df68(0x1c3)](this[_0x12df68(0x230)]())?![]:VisuMZ[_0x12df68(0xe4)][_0x12df68(0x468)]['call'](this,_0xb8a70c);},VisuMZ[_0x1d6c8a(0xe4)]['Window_EquipItem_isEnabled']=Window_EquipItem[_0x1d6c8a(0x17c)]['isEnabled'],Window_EquipItem[_0x1d6c8a(0x17c)][_0x1d6c8a(0x3d4)]=function(_0x3c2a04){const _0x18f03f=_0x1d6c8a;if(_0x3c2a04&&this['_actor']){if(this[_0x18f03f(0x1da)](_0x3c2a04))return![];if(this[_0x18f03f(0x346)](_0x3c2a04))return![];if(this[_0x18f03f(0x543)](_0x3c2a04))return![];}if(!_0x3c2a04){if(_0x18f03f(0x187)==='wZCrv')this[_0x18f03f(0x566)](_0x162cfe,_0x4ba272,_0x20976f,_0x47494c,!![]),this[_0x18f03f(0x566)](_0x203b8e,_0x99407a,_0x163643,_0x3f90af,![],'right'),this['drawItemDarkRect'](_0x31086d,_0x4ddb46,_0x411a14),this[_0x18f03f(0x39c)]();else return!this[_0x18f03f(0x3c5)]()[_0x18f03f(0x1c3)](this[_0x18f03f(0x230)]());}return VisuMZ[_0x18f03f(0xe4)][_0x18f03f(0x3f7)][_0x18f03f(0x4e1)](this,_0x3c2a04);},Window_EquipItem['prototype'][_0x1d6c8a(0x1da)]=function(_0x27b315){const _0x12c112=_0x1d6c8a,_0x48d0ce=_0x27b315[_0x12c112(0x492)];if(_0x48d0ce[_0x12c112(0x2b8)](/<EQUIP COPY LIMIT:[ ](\d+)>/i)){const _0x5241cb=Number(RegExp['$1'])||0x1;let _0x39801e=0x0;const _0x1321c9=this[_0x12c112(0x50e)][_0x12c112(0x3c1)](),_0xd57a68=SceneManager['_scene'][_0x12c112(0x1f0)][_0x12c112(0x154)]();_0x1321c9[_0xd57a68]=null;for(const _0x49a5aa of _0x1321c9){if(_0x12c112(0x34d)===_0x12c112(0x34d)){if(!_0x49a5aa)continue;if(DataManager['isWeapon'](_0x27b315)===DataManager['isWeapon'](_0x49a5aa)){if(_0x27b315['id']===_0x49a5aa['id'])_0x39801e+=0x1;}}else return!![];}return _0x39801e>=_0x5241cb;}else{if('gccSB'!==_0x12c112(0x35b))return![];else this[_0x12c112(0x460)]!==_0x21d9fe&&(this[_0x12c112(0x460)]=_0x48c05d,this[_0x12c112(0x1ae)](),this[_0x12c112(0x393)]&&this[_0x12c112(0x393)][_0x12c112(0x12f)]()?this['smoothSelect'](0x0):this['scrollTo'](0x0,0x0));}},Window_EquipItem['prototype'][_0x1d6c8a(0x346)]=function(_0x20c3db){const _0x3a9f52=_0x1d6c8a;if(!DataManager['isWeapon'](_0x20c3db))return![];const _0x2954d1=/<EQUIP WEAPON TYPE LIMIT:[ ](\d+)>/i;let _0x4d3099=0x0;const _0x2aa729=this['_actor'][_0x3a9f52(0x3c1)](),_0x402ef3=SceneManager[_0x3a9f52(0x3d1)][_0x3a9f52(0x1f0)]['equipSlotIndex']();_0x2aa729[_0x402ef3]=null;for(const _0x7c7ff4 of _0x2aa729){if(!_0x7c7ff4)continue;if(!DataManager['isWeapon'](_0x7c7ff4))continue;if(_0x20c3db['wtypeId']===_0x7c7ff4[_0x3a9f52(0x369)]){_0x4d3099+=0x1;if(_0x20c3db['note'][_0x3a9f52(0x2b8)](_0x2954d1)){const _0x390ffc=Number(RegExp['$1'])||0x1;if(_0x4d3099>=_0x390ffc)return!![];}if(_0x7c7ff4['note']['match'](_0x2954d1)){if(_0x3a9f52(0x378)===_0x3a9f52(0x53d))this[_0x3a9f52(0x446)]();else{const _0x476ac7=Number(RegExp['$1'])||0x1;if(_0x4d3099>=_0x476ac7)return!![];}}}}return![];},Window_EquipItem['prototype'][_0x1d6c8a(0x543)]=function(_0x4fd935){const _0x13fa3d=_0x1d6c8a;if(!DataManager[_0x13fa3d(0x4c5)](_0x4fd935))return![];const _0x28c7bb=/<EQUIP ARMOR TYPE LIMIT:[ ](\d+)>/i;let _0x13e0ae=0x0;const _0x483a56=this[_0x13fa3d(0x50e)]['equips'](),_0x30ac62=SceneManager[_0x13fa3d(0x3d1)][_0x13fa3d(0x1f0)][_0x13fa3d(0x154)]();_0x483a56[_0x30ac62]=null;for(const _0x3d07f0 of _0x483a56){if(!_0x3d07f0)continue;if(!DataManager[_0x13fa3d(0x4c5)](_0x3d07f0))continue;if(_0x4fd935[_0x13fa3d(0x4ba)]===_0x3d07f0[_0x13fa3d(0x4ba)]){_0x13e0ae+=0x1;if(_0x4fd935[_0x13fa3d(0x492)]['match'](_0x28c7bb)){if('FBEuD'!==_0x13fa3d(0x3ab)){const _0x4002f7=_0x2f6988[_0x13fa3d(0x3f0)];this[_0x13fa3d(0x110)](_0x4002f7,_0x544749,_0x3bccbc,_0x1eebc0,_0x13fa3d(0x490));}else{const _0x2f7b26=Number(RegExp['$1'])||0x1;if(_0x13e0ae>=_0x2f7b26)return!![];}}if(_0x3d07f0[_0x13fa3d(0x492)][_0x13fa3d(0x2b8)](_0x28c7bb)){if(_0x13fa3d(0x2ca)==='OKIcs'){const _0x449067=Number(RegExp['$1'])||0x1;if(_0x13e0ae>=_0x449067)return!![];}else{const _0x41546e=this[_0x13fa3d(0x3cc)](_0x247faf),_0x40f4a9=this[_0x13fa3d(0x39d)](_0x53701d)[_0x13fa3d(0x376)];return _0x40f4a9<=_0x41546e[_0x13fa3d(0x376)]?_0x13fa3d(0x28a):_0x13fa3d(0x1ff);}}}}return![];},Window_EquipItem[_0x1d6c8a(0x17c)][_0x1d6c8a(0x3c5)]=function(){const _0xe009e3=_0x1d6c8a;return VisuMZ[_0xe009e3(0xe4)][_0xe009e3(0x20b)][_0xe009e3(0x3af)][_0xe009e3(0x36b)];},Window_EquipItem[_0x1d6c8a(0x17c)][_0x1d6c8a(0x183)]=function(_0x38f3ab){const _0x2ac222=_0x1d6c8a,_0xbac1b7=this[_0x2ac222(0x4d9)](_0x38f3ab);_0xbac1b7?Window_ItemList['prototype']['drawItem'][_0x2ac222(0x4e1)](this,_0x38f3ab):this['drawRemoveItem'](_0x38f3ab);},Window_EquipItem[_0x1d6c8a(0x17c)][_0x1d6c8a(0x4f6)]=function(_0x297613){const _0x50dea0=_0x1d6c8a;this[_0x50dea0(0x558)](this['isEnabled'](null));const _0x1fa05d=VisuMZ[_0x50dea0(0xe4)][_0x50dea0(0x20b)][_0x50dea0(0x3af)],_0x540c0b=this['itemLineRect'](_0x297613),_0x1696e0=_0x540c0b['y']+(this[_0x50dea0(0x224)]()-ImageManager[_0x50dea0(0x12a)])/0x2,_0x5986a2=ImageManager[_0x50dea0(0x14e)]+0x4,_0x1c4dcb=Math[_0x50dea0(0x23c)](0x0,_0x540c0b[_0x50dea0(0x376)]-_0x5986a2);this[_0x50dea0(0x2bc)](),this[_0x50dea0(0x2c8)](_0x1fa05d['RemoveEquipIcon'],_0x540c0b['x'],_0x1696e0),this[_0x50dea0(0x110)](_0x1fa05d['RemoveEquipText'],_0x540c0b['x']+_0x5986a2,_0x540c0b['y'],_0x1c4dcb),this[_0x50dea0(0x558)](!![]);},Window_EquipItem[_0x1d6c8a(0x17c)][_0x1d6c8a(0x483)]=function(){const _0x290ae6=_0x1d6c8a;Window_ItemList['prototype'][_0x290ae6(0x483)][_0x290ae6(0x4e1)](this);if(this[_0x290ae6(0x50e)]&&this['_statusWindow']&&this[_0x290ae6(0x14d)]>=0x0){const _0x551363=JsonEx[_0x290ae6(0x280)](this[_0x290ae6(0x50e)]);_0x551363[_0x290ae6(0x41c)]=!![],_0x551363['forceChangeEquip'](this[_0x290ae6(0x14d)],this['item']()),this[_0x290ae6(0xfe)]['setTempActor'](_0x551363);}},VisuMZ[_0x1d6c8a(0xe4)][_0x1d6c8a(0x321)]=Window_ShopCommand[_0x1d6c8a(0x17c)][_0x1d6c8a(0x4ca)],Window_ShopCommand[_0x1d6c8a(0x17c)][_0x1d6c8a(0x4ca)]=function(_0x5e3e94){const _0xb96e40=_0x1d6c8a;VisuMZ[_0xb96e40(0xe4)]['Window_ShopCommand_initialize'][_0xb96e40(0x4e1)](this,_0x5e3e94),this[_0xb96e40(0x32a)](_0x5e3e94);},Window_ShopCommand[_0x1d6c8a(0x17c)][_0x1d6c8a(0x32a)]=function(_0x5da931){const _0x832d91=_0x1d6c8a,_0x31a484=new Rectangle(0x0,0x0,_0x5da931['width'],_0x5da931[_0x832d91(0x3d7)]);this['_commandNameWindow']=new Window_Base(_0x31a484),this[_0x832d91(0x3b2)]['opacity']=0x0,this[_0x832d91(0x457)](this[_0x832d91(0x3b2)]),this[_0x832d91(0x144)]();},Window_ShopCommand[_0x1d6c8a(0x17c)]['callUpdateHelp']=function(){const _0x11da7a=_0x1d6c8a;Window_HorzCommand[_0x11da7a(0x17c)][_0x11da7a(0x1e5)]['call'](this);if(this[_0x11da7a(0x3b2)])this[_0x11da7a(0x144)]();},Window_ShopCommand[_0x1d6c8a(0x17c)]['updateCommandNameWindow']=function(){const _0x43fab2=_0x1d6c8a,_0x49d62d=this[_0x43fab2(0x3b2)];_0x49d62d[_0x43fab2(0x3dc)][_0x43fab2(0x442)]();const _0x41239e=this[_0x43fab2(0x177)](this[_0x43fab2(0x4f7)]());if(_0x41239e===_0x43fab2(0x1ff)){const _0x41f285=this[_0x43fab2(0x3cc)](this[_0x43fab2(0x4f7)]());let _0x2ced84=this[_0x43fab2(0x38a)](this[_0x43fab2(0x4f7)]());_0x2ced84=_0x2ced84[_0x43fab2(0x2af)](/\\I\[(\d+)\]/gi,''),_0x49d62d[_0x43fab2(0x39c)](),this['commandNameWindowDrawBackground'](_0x2ced84,_0x41f285),this[_0x43fab2(0x21e)](_0x2ced84,_0x41f285),this[_0x43fab2(0x1c7)](_0x2ced84,_0x41f285);}},Window_ShopCommand['prototype'][_0x1d6c8a(0x3ec)]=function(_0x5d7e4,_0x30551b){},Window_ShopCommand[_0x1d6c8a(0x17c)][_0x1d6c8a(0x21e)]=function(_0x1c429c,_0x1dd9bf){const _0x21a6ed=_0x1d6c8a,_0x229f6f=this['_commandNameWindow'];_0x229f6f['drawText'](_0x1c429c,0x0,_0x1dd9bf['y'],_0x229f6f[_0x21a6ed(0x48a)],_0x21a6ed(0x490));},Window_ShopCommand[_0x1d6c8a(0x17c)][_0x1d6c8a(0x1c7)]=function(_0x54baf4,_0x51ac36){const _0xaa48d7=_0x1d6c8a,_0x267e44=this[_0xaa48d7(0x3b2)],_0x4a559c=$gameSystem['windowPadding'](),_0x151006=_0x51ac36['x']+Math['floor'](_0x51ac36[_0xaa48d7(0x376)]/0x2)+_0x4a559c;_0x267e44['x']=_0x267e44[_0xaa48d7(0x376)]/-0x2+_0x151006,_0x267e44['y']=Math[_0xaa48d7(0x17f)](_0x51ac36['height']/0x2);},Window_ShopCommand[_0x1d6c8a(0x17c)][_0x1d6c8a(0x40a)]=function(){const _0x2a3b43=_0x1d6c8a;return this[_0x2a3b43(0x391)]?this[_0x2a3b43(0x391)][_0x2a3b43(0x535)]:0x3;},Window_ShopCommand[_0x1d6c8a(0x17c)]['hideDisabledCommands']=function(){const _0x205c87=_0x1d6c8a;return VisuMZ['ItemsEquipsCore'][_0x205c87(0x20b)]['ShopScene']['CmdHideDisabled'];},Window_ShopCommand[_0x1d6c8a(0x17c)][_0x1d6c8a(0x3b3)]=function(){const _0x5557fb=_0x1d6c8a;this[_0x5557fb(0x1a5)](),this[_0x5557fb(0x225)](),this[_0x5557fb(0x1fd)]();},Window_ShopCommand[_0x1d6c8a(0x17c)][_0x1d6c8a(0x1ae)]=function(){const _0xd461c4=_0x1d6c8a;Window_HorzCommand[_0xd461c4(0x17c)][_0xd461c4(0x1ae)]['call'](this),this[_0xd461c4(0x4de)]();},Window_ShopCommand[_0x1d6c8a(0x17c)]['addBuyCommand']=function(){const _0x4eb188=_0x1d6c8a,_0x7b11db=this[_0x4eb188(0x2ac)](),_0x40837d=VisuMZ['ItemsEquipsCore'][_0x4eb188(0x20b)][_0x4eb188(0x41b)]['CmdIconBuy'],_0x306d89=_0x7b11db===_0x4eb188(0x43d)?TextManager[_0x4eb188(0x20e)]:'\x5cI[%1]%2'[_0x4eb188(0x1af)](_0x40837d,TextManager[_0x4eb188(0x20e)]),_0x4179d8=this[_0x4eb188(0x441)]();if(this['hideDisabledCommands']()&&!_0x4179d8)return;this[_0x4eb188(0x4af)](_0x306d89,_0x4eb188(0x20e),_0x4179d8);},Window_ShopCommand[_0x1d6c8a(0x17c)][_0x1d6c8a(0x441)]=function(){const _0x28443d=_0x1d6c8a;return SceneManager[_0x28443d(0x3d1)][_0x28443d(0x527)]===Scene_Shop?_0x28443d(0x32f)===_0x28443d(0x32f)?SceneManager['_scene'][_0x28443d(0x108)]>0x0:_0x4b21bc[_0x28443d(0xe4)][_0x28443d(0x20b)][_0x28443d(0x337)][_0x28443d(0x389)]:!![];},Window_ShopCommand[_0x1d6c8a(0x17c)][_0x1d6c8a(0x225)]=function(){const _0x48ef87=_0x1d6c8a,_0x2835b4=this['commandStyle'](),_0x1f93f9=VisuMZ[_0x48ef87(0xe4)][_0x48ef87(0x20b)][_0x48ef87(0x41b)][_0x48ef87(0x51f)],_0x3ec659=_0x2835b4===_0x48ef87(0x43d)?TextManager[_0x48ef87(0x109)]:_0x48ef87(0x487)[_0x48ef87(0x1af)](_0x1f93f9,TextManager[_0x48ef87(0x109)]),_0x36c19b=this[_0x48ef87(0x45f)]();if(this['hideDisabledCommands']()&&!_0x36c19b)return;this[_0x48ef87(0x4af)](_0x3ec659,_0x48ef87(0x109),_0x36c19b);},Window_ShopCommand[_0x1d6c8a(0x17c)]['isSellCommandEnabled']=function(){const _0x347ed1=_0x1d6c8a;return!this[_0x347ed1(0x52d)];},Window_ShopCommand[_0x1d6c8a(0x17c)][_0x1d6c8a(0x1fd)]=function(){const _0x5b12ba=_0x1d6c8a,_0x138bc1=this[_0x5b12ba(0x2ac)](),_0x6b69c1=VisuMZ[_0x5b12ba(0xe4)][_0x5b12ba(0x20b)]['ShopScene'][_0x5b12ba(0x1ed)],_0x28066f=VisuMZ[_0x5b12ba(0xe4)][_0x5b12ba(0x20b)][_0x5b12ba(0x41b)][_0x5b12ba(0x429)],_0xe3c4f1=_0x138bc1==='text'?_0x28066f:_0x5b12ba(0x487)[_0x5b12ba(0x1af)](_0x6b69c1,_0x28066f);this[_0x5b12ba(0x4af)](_0xe3c4f1,_0x5b12ba(0x3b0));},Window_ShopCommand[_0x1d6c8a(0x17c)]['itemTextAlign']=function(){const _0x1358f2=_0x1d6c8a;return VisuMZ[_0x1358f2(0xe4)][_0x1358f2(0x20b)][_0x1358f2(0x41b)]['CmdTextAlign'];},Window_ShopCommand[_0x1d6c8a(0x17c)][_0x1d6c8a(0x183)]=function(_0x2ca9d7){const _0x259dcb=_0x1d6c8a,_0x207a5b=this['commandStyleCheck'](_0x2ca9d7);if(_0x207a5b===_0x259dcb(0x28a)){if(_0x259dcb(0x48f)!==_0x259dcb(0x13c))this[_0x259dcb(0x19f)](_0x2ca9d7);else return _0x54d2f1[_0x259dcb(0xe4)][_0x259dcb(0x20b)][_0x259dcb(0x41b)][_0x259dcb(0x169)];}else{if(_0x207a5b===_0x259dcb(0x1ff)){if(_0x259dcb(0x11a)!==_0x259dcb(0x112))this[_0x259dcb(0x3ba)](_0x2ca9d7);else{const _0x10a1b6=_0x259dcb(0x2a7);if(this[_0x259dcb(0x25a)][_0x10a1b6])return this[_0x259dcb(0x25a)][_0x10a1b6];let _0x395d7a='';if(this[_0x259dcb(0x561)][_0x259dcb(0x3e3)]>0x0)_0x395d7a+=_0x259dcb(0x3a2)[_0x259dcb(0x1af)](_0x3c73b2['floor'](this[_0x259dcb(0x561)]['rateHP']*0x64));if(this[_0x259dcb(0x561)][_0x259dcb(0x3e3)]>0x0&&this[_0x259dcb(0x561)][_0x259dcb(0x158)]>0x0)_0x395d7a+='\x20';if(this[_0x259dcb(0x561)]['flatHP']>0x0)_0x395d7a+=_0x259dcb(0x3f1)[_0x259dcb(0x1af)](this[_0x259dcb(0x561)][_0x259dcb(0x158)]);return _0x395d7a;}}else _0x259dcb(0x269)!==_0x259dcb(0x32c)?Window_HorzCommand[_0x259dcb(0x17c)][_0x259dcb(0x183)][_0x259dcb(0x4e1)](this,_0x2ca9d7):this[_0x259dcb(0x1ac)](!![]);}},Window_ShopCommand['prototype'][_0x1d6c8a(0x2ac)]=function(){const _0x59937d=_0x1d6c8a;return VisuMZ[_0x59937d(0xe4)][_0x59937d(0x20b)][_0x59937d(0x41b)][_0x59937d(0x214)];},Window_ShopCommand[_0x1d6c8a(0x17c)][_0x1d6c8a(0x177)]=function(_0x152db5){const _0x2a0d17=_0x1d6c8a;if(_0x152db5<0x0)return _0x2a0d17(0x43d);const _0x123f17=this[_0x2a0d17(0x2ac)]();if(_0x123f17!==_0x2a0d17(0x2f8))return _0x123f17;else{if(this[_0x2a0d17(0x475)]()>0x0){if(_0x2a0d17(0x195)==='aRDWs'){const _0x241e7e=this['commandName'](_0x152db5);if(_0x241e7e[_0x2a0d17(0x2b8)](/\\I\[(\d+)\]/i)){const _0x5b8b2b=this[_0x2a0d17(0x3cc)](_0x152db5),_0x230133=this['textSizeEx'](_0x241e7e)[_0x2a0d17(0x376)];return _0x230133<=_0x5b8b2b[_0x2a0d17(0x376)]?_0x2a0d17(0x377)===_0x2a0d17(0x3f3)?![]:_0x2a0d17(0x28a):_0x2a0d17(0x1ff);}}else return!![];}}return'text';},Window_ShopCommand[_0x1d6c8a(0x17c)][_0x1d6c8a(0x19f)]=function(_0x5ed9bc){const _0x364ad6=_0x1d6c8a,_0x2ab421=this[_0x364ad6(0x3cc)](_0x5ed9bc),_0x39c212=this[_0x364ad6(0x38a)](_0x5ed9bc),_0x76db18=this[_0x364ad6(0x39d)](_0x39c212)['width'];this[_0x364ad6(0x558)](this['isCommandEnabled'](_0x5ed9bc));const _0x571afa=this[_0x364ad6(0x355)]();if(_0x571afa===_0x364ad6(0x470))this[_0x364ad6(0x290)](_0x39c212,_0x2ab421['x']+_0x2ab421[_0x364ad6(0x376)]-_0x76db18,_0x2ab421['y'],_0x76db18);else{if(_0x571afa==='center'){const _0x440c19=_0x2ab421['x']+Math[_0x364ad6(0x17f)]((_0x2ab421[_0x364ad6(0x376)]-_0x76db18)/0x2);this['drawTextEx'](_0x39c212,_0x440c19,_0x2ab421['y'],_0x76db18);}else this[_0x364ad6(0x290)](_0x39c212,_0x2ab421['x'],_0x2ab421['y'],_0x76db18);}},Window_ShopCommand[_0x1d6c8a(0x17c)][_0x1d6c8a(0x3ba)]=function(_0x5048b4){const _0x1757f8=_0x1d6c8a;this['commandName'](_0x5048b4)[_0x1757f8(0x2b8)](/\\I\[(\d+)\]/i);const _0xd5251f=Number(RegExp['$1'])||0x0,_0x4e289e=this['itemLineRect'](_0x5048b4),_0x197a5f=_0x4e289e['x']+Math[_0x1757f8(0x17f)]((_0x4e289e['width']-ImageManager[_0x1757f8(0x14e)])/0x2),_0x3ce3d6=_0x4e289e['y']+(_0x4e289e[_0x1757f8(0x3d7)]-ImageManager[_0x1757f8(0x12a)])/0x2;this[_0x1757f8(0x2c8)](_0xd5251f,_0x197a5f,_0x3ce3d6);},VisuMZ[_0x1d6c8a(0xe4)]['Window_ShopBuy_refresh']=Window_ShopBuy['prototype'][_0x1d6c8a(0x1ae)],Window_ShopBuy[_0x1d6c8a(0x17c)][_0x1d6c8a(0x1ae)]=function(){const _0x1cab16=_0x1d6c8a;this[_0x1cab16(0x3fc)](),VisuMZ[_0x1cab16(0xe4)][_0x1cab16(0x227)]['call'](this);},Window_ShopBuy['prototype']['updateMoneyAmount']=function(){const _0x5f170e=_0x1d6c8a;SceneManager[_0x5f170e(0x3d1)][_0x5f170e(0x527)]===Scene_Shop&&(_0x5f170e(0x51e)!==_0x5f170e(0x25f)?this[_0x5f170e(0x45c)]=SceneManager['_scene']['money']():(this[_0x5f170e(0x12f)]()&&(this[_0x5f170e(0xec)][_0x5f170e(0x1fa)](),this[_0x5f170e(0xec)]['deactivate']()),_0x5b7725[_0x5f170e(0xe4)][_0x5f170e(0x1ce)][_0x5f170e(0x4e1)](this)));},VisuMZ[_0x1d6c8a(0xe4)][_0x1d6c8a(0x43e)]=Window_ShopBuy[_0x1d6c8a(0x17c)]['price'],Window_ShopBuy[_0x1d6c8a(0x17c)][_0x1d6c8a(0x24e)]=function(_0x5cf8c4){const _0x2cafc8=_0x1d6c8a;if(!_0x5cf8c4)return 0x0;let _0xe27df6=VisuMZ[_0x2cafc8(0xe4)]['Window_ShopBuy_price']['call'](this,_0x5cf8c4);return Math[_0x2cafc8(0x23c)](0x0,this[_0x2cafc8(0x291)](_0x5cf8c4,_0xe27df6));},Window_ShopBuy['prototype'][_0x1d6c8a(0x291)]=function(_0x594b55,_0x335eeb){const _0x30e140=_0x1d6c8a,_0x45385e=_0x594b55[_0x30e140(0x492)];if(_0x45385e[_0x30e140(0x2b8)](/<JS BUY PRICE>\s*([\s\S]*)\s*<\/JS BUY PRICE>/i)){if('oIexw'!==_0x30e140(0x220))return _0x17bba1[_0x30e140(0x42c)];else{const _0x34a2e1=String(RegExp['$1']);try{if(_0x30e140(0x293)!=='tmMpQ')return _0x12bab1[_0x137dba];else eval(_0x34a2e1);}catch(_0x4875cd){if($gameTemp[_0x30e140(0xfa)]())console[_0x30e140(0x27a)](_0x4875cd);}}}_0x335eeb=VisuMZ['ItemsEquipsCore'][_0x30e140(0x20b)][_0x30e140(0x41b)][_0x30e140(0x160)]['call'](this,_0x594b55,_0x335eeb);if(isNaN(_0x335eeb))_0x335eeb=0x0;return Math['floor'](_0x335eeb);},Window_ShopBuy[_0x1d6c8a(0x17c)][_0x1d6c8a(0x183)]=function(_0xdd3a9d){const _0x3b2f25=_0x1d6c8a;this[_0x3b2f25(0x39c)]();const _0x10f6ce=this['itemAt'](_0xdd3a9d),_0x8776bb=this[_0x3b2f25(0x3cc)](_0xdd3a9d),_0x3776b3=_0x8776bb[_0x3b2f25(0x376)];this[_0x3b2f25(0x558)](this[_0x3b2f25(0x3d4)](_0x10f6ce)),this[_0x3b2f25(0x52c)](_0x10f6ce,_0x8776bb['x'],_0x8776bb['y'],_0x3776b3),this[_0x3b2f25(0x49d)](_0x10f6ce,_0x8776bb),this[_0x3b2f25(0x558)](!![]);},Window_ShopBuy['prototype'][_0x1d6c8a(0x49d)]=function(_0x2a4d0a,_0x24b386){const _0x4e1f96=_0x1d6c8a,_0x4a863b=this[_0x4e1f96(0x24e)](_0x2a4d0a);this[_0x4e1f96(0x261)](_0x4a863b,TextManager[_0x4e1f96(0x11b)],_0x24b386['x'],_0x24b386['y'],_0x24b386['width']);},Window_ShopSell[_0x1d6c8a(0x17c)][_0x1d6c8a(0x40a)]=function(){const _0x531d84=_0x1d6c8a;return SceneManager['_scene'][_0x531d84(0x2ad)]()?0x1:0x2;},VisuMZ[_0x1d6c8a(0xe4)][_0x1d6c8a(0x18e)]=Window_ShopSell[_0x1d6c8a(0x17c)]['isEnabled'],Window_ShopSell[_0x1d6c8a(0x17c)][_0x1d6c8a(0x3d4)]=function(_0x536316){const _0x3d6293=_0x1d6c8a;if(!_0x536316)return![];const _0x7edcf2=_0x536316[_0x3d6293(0x492)];if(_0x7edcf2[_0x3d6293(0x2b8)](/<CANNOT SELL>/i))return![];if(_0x7edcf2[_0x3d6293(0x2b8)](/<CAN SELL>/i))return!![];if(_0x7edcf2[_0x3d6293(0x2b8)](/<CANNOT SELL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x45f386=JSON[_0x3d6293(0x3e0)]('['+RegExp['$1'][_0x3d6293(0x2b8)](/\d+/g)+']');for(const _0x35af17 of _0x45f386){if('YPoZN'!==_0x3d6293(0x20c))this[_0x3d6293(0x107)]['hide']();else{if(!$gameSwitches[_0x3d6293(0x15a)](_0x35af17))return![];}}}if(_0x7edcf2[_0x3d6293(0x2b8)](/<CANNOT SELL ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x3d6293(0x4e5)!==_0x3d6293(0x398)){const _0x148104=JSON['parse']('['+RegExp['$1'][_0x3d6293(0x2b8)](/\d+/g)+']');for(const _0x31c356 of _0x148104){if(_0x3d6293(0x4a1)===_0x3d6293(0x4a1)){if(!$gameSwitches[_0x3d6293(0x15a)](_0x31c356))return![];}else{this[_0x3d6293(0x15b)][_0x3d6293(0x1ae)]();const _0x4fd9f4=this['_slotWindow'][_0x3d6293(0x199)](),_0x2c3ab4=this[_0x3d6293(0x15b)][_0x3d6293(0x223)]['indexOf'](_0x4fd9f4),_0x54b0d9=_0x3110d2[_0x3d6293(0x17f)](this['_itemWindow']['maxVisibleItems']()/0x2)-0x1;this[_0x3d6293(0x15b)][_0x3d6293(0x565)](_0x2c3ab4>=0x0?_0x2c3ab4:0x0),this['_itemWindow'][_0x3d6293(0x382)](this['_itemWindow']['index']()-_0x54b0d9);}}}else return!![];}if(_0x7edcf2[_0x3d6293(0x2b8)](/<CANNOT SELL ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x558852=JSON[_0x3d6293(0x3e0)]('['+RegExp['$1'][_0x3d6293(0x2b8)](/\d+/g)+']');for(const _0x3c12ea of _0x558852){if($gameSwitches['value'](_0x3c12ea))return![];}}return VisuMZ[_0x3d6293(0xe4)][_0x3d6293(0x18e)][_0x3d6293(0x4e1)](this,_0x536316);},Window_ShopStatus['prototype'][_0x1d6c8a(0x4dd)]=function(){return![];},Window_ShopStatus[_0x1d6c8a(0x17c)]['loadFaceImages']=function(){const _0xf7596f=_0x1d6c8a;Window_StatusBase['prototype']['loadFaceImages'][_0xf7596f(0x4e1)](this);for(const _0x5e398a of $gameParty[_0xf7596f(0x1f7)]()){if(_0xf7596f(0x392)!==_0xf7596f(0xf5))ImageManager[_0xf7596f(0x513)](_0x5e398a['characterName']());else return _0x12de7b[_0xf7596f(0x156)]&&_0x125f9e[_0xf7596f(0x373)][_0xf7596f(0x1c3)]('['+_0x3b9c0f+']');}},Window_ShopStatus[_0x1d6c8a(0x17c)][_0x1d6c8a(0x30a)]=function(){const _0x455375=_0x1d6c8a;return VisuMZ[_0x455375(0xe4)][_0x455375(0x20b)][_0x455375(0x337)][_0x455375(0x2b6)];},Window_ShopStatus[_0x1d6c8a(0x17c)][_0x1d6c8a(0x1ae)]=function(){const _0x1253d4=_0x1d6c8a;this['contents'][_0x1253d4(0x442)](),this[_0x1253d4(0x4ac)]['clear']();if(this['_item']){this[_0x1253d4(0x39c)](),this[_0x1253d4(0x558)](!![]),this[_0x1253d4(0x302)]();if(this[_0x1253d4(0x285)]())this[_0x1253d4(0x1d0)]();else{if(_0x1253d4(0x145)!==_0x1253d4(0x145))return _0x4b73d9[_0x2ab539['id']][_0x1253d4(0x4e1)](this,_0x1d25a1);else this[_0x1253d4(0x152)]();}this[_0x1253d4(0x501)]();}},Window_ShopStatus[_0x1d6c8a(0x17c)]['drawPossession']=function(_0x45bf30,_0x536043){const _0x2c5718=_0x1d6c8a;if(!this[_0x2c5718(0x285)]()&&!DataManager['isItem'](this[_0x2c5718(0x1a6)]))return;const _0x4071b9=this[_0x2c5718(0x48a)]-this[_0x2c5718(0x345)]()-_0x45bf30,_0x4544b4=this['textWidth'](_0x2c5718(0x162));this[_0x2c5718(0x50b)](ColorManager['systemColor']()),this[_0x2c5718(0x110)](TextManager[_0x2c5718(0x433)],_0x45bf30+this[_0x2c5718(0x345)](),_0x536043,_0x4071b9-_0x4544b4),this[_0x2c5718(0x2bc)](),this['drawItemNumber'](this[_0x2c5718(0x1a6)],_0x45bf30,_0x536043,_0x4071b9);},Window_ShopStatus['prototype'][_0x1d6c8a(0x472)]=function(_0x4c6355,_0x27b6f7,_0x2f4aca,_0x2b09f2,_0x5db727){const _0x41c5e8=_0x1d6c8a;if(VisuMZ['ItemsEquipsCore'][_0x41c5e8(0x20b)][_0x41c5e8(0x337)][_0x41c5e8(0x555)]===![])return;_0x5db727=Math['max'](_0x5db727||0x1,0x1);while(_0x5db727--){_0x2b09f2=_0x2b09f2||this[_0x41c5e8(0x224)](),this['contentsBack']['paintOpacity']=0xa0;const _0x833b41=ColorManager[_0x41c5e8(0x399)]();this[_0x41c5e8(0x4ac)][_0x41c5e8(0x1bd)](_0x4c6355+0x1,_0x27b6f7+0x1,_0x2f4aca-0x2,_0x2b09f2-0x2,_0x833b41),this[_0x41c5e8(0x4ac)][_0x41c5e8(0x245)]=0xff;}},ColorManager[_0x1d6c8a(0x399)]=function(){const _0x4942e6=_0x1d6c8a,_0x2af895=VisuMZ[_0x4942e6(0xe4)][_0x4942e6(0x20b)][_0x4942e6(0x337)];let _0x27043c=_0x2af895['BackRectColor']!==undefined?_0x2af895[_0x4942e6(0x477)]:0x13;return ColorManager['getColor'](_0x27043c);},Window_ShopStatus[_0x1d6c8a(0x17c)][_0x1d6c8a(0x1d0)]=function(){const _0x30d772=_0x1d6c8a;if(VisuMZ[_0x30d772(0xe4)]['Settings']['StatusWindow'][_0x30d772(0x184)]){VisuMZ[_0x30d772(0xe4)][_0x30d772(0x20b)][_0x30d772(0x337)][_0x30d772(0x184)][_0x30d772(0x4e1)](this);return;}const _0x265f86=this[_0x30d772(0x224)](),_0x5cf199=this[_0x30d772(0x236)]()+0x8;let _0x335aa4=0x0,_0x33f265=0x0,_0x17cb64=this['innerWidth'],_0x422b5e=this[_0x30d772(0x165)],_0x537e70=Math[_0x30d772(0x17f)](_0x17cb64/0x2),_0x3a6167=_0x335aa4+_0x17cb64-_0x537e70;this[_0x30d772(0x52c)](this[_0x30d772(0x1a6)],_0x335aa4+this[_0x30d772(0x345)](),_0x33f265,_0x17cb64-this[_0x30d772(0x345)]()*0x2),this[_0x30d772(0x472)](_0x335aa4,_0x33f265,_0x17cb64),_0x33f265+=_0x265f86;if(this[_0x30d772(0x20f)](_0x335aa4,_0x33f265,_0x537e70))_0x33f265+=0x0;if(this[_0x30d772(0x539)](_0x3a6167,_0x33f265,_0x537e70))_0x33f265+=_0x265f86;const _0x86cbf4=this[_0x30d772(0x4a3)](),_0x3540b3=_0x33f265;_0x33f265=_0x422b5e-_0x86cbf4['length']*_0x5cf199-0x4;let _0x432c5f=_0x335aa4,_0x3f15a5=0x0,_0x4324d5=_0x33f265;for(const _0x3454ba of _0x86cbf4){_0x3f15a5=Math[_0x30d772(0x23c)](this[_0x30d772(0x55d)](_0x3454ba,_0x335aa4+0x4,_0x33f265+0x4,_0x17cb64),_0x3f15a5),_0x33f265+=_0x5cf199;}const _0x3c17cd=$gameParty[_0x30d772(0x4cf)](),_0x9727de=Math[_0x30d772(0x17f)]((_0x17cb64-_0x3f15a5)/_0x3c17cd);_0x3f15a5=_0x17cb64-_0x9727de*_0x3c17cd;for(const _0x3f7755 of $gameParty['battleMembers']()){const _0x3076f5=$gameParty[_0x30d772(0x4d8)]()[_0x30d772(0x23d)](_0x3f7755),_0x5c3978=_0x432c5f+_0x3f15a5+_0x3076f5*_0x9727de;this['changePaintOpacity'](_0x3f7755[_0x30d772(0x13b)](this[_0x30d772(0x1a6)])),this[_0x30d772(0x300)](_0x3f7755,_0x5c3978+_0x9727de/0x2,_0x4324d5);let _0x57d614=_0x4324d5;for(const _0xf26292 of _0x86cbf4){const _0x4949bc=_0x57d614-(_0x265f86-_0x5cf199)/0x2;this[_0x30d772(0x3e6)](_0x3f7755,_0xf26292,_0x5c3978,_0x4949bc,_0x9727de),_0x57d614+=_0x5cf199;}}this[_0x30d772(0x472)](_0x432c5f,_0x3540b3,_0x3f15a5,_0x4324d5-_0x3540b3);for(let _0x51081a=0x0;_0x51081a<_0x3c17cd;_0x51081a++){const _0x46c867=_0x432c5f+_0x3f15a5+_0x51081a*_0x9727de;this[_0x30d772(0x472)](_0x46c867,_0x3540b3,_0x9727de,_0x4324d5-_0x3540b3);}for(const _0x372434 of _0x86cbf4){if(_0x30d772(0x4d7)!=='cHVeK')this['drawTextEx'](_0x4605fc,_0x13ef6b['x']+_0x548f35[_0x30d772(0x376)]-_0x3a4482,_0x37329d['y'],_0x40d710);else{this[_0x30d772(0x472)](_0x432c5f,_0x4324d5,_0x3f15a5,_0x5cf199);for(let _0x227970=0x0;_0x227970<_0x3c17cd;_0x227970++){const _0x4d171a=_0x432c5f+_0x3f15a5+_0x227970*_0x9727de;this[_0x30d772(0x472)](_0x4d171a,_0x4324d5,_0x9727de,_0x5cf199);}_0x4324d5+=_0x5cf199;}}},Window_ShopStatus[_0x1d6c8a(0x17c)][_0x1d6c8a(0x20f)]=function(_0x4519b6,_0xd41933,_0x4817ee){const _0xacaf39=_0x1d6c8a;if(!this[_0xacaf39(0x285)]())return![];const _0x327d87=$dataSystem['equipTypes'][this['_item'][_0xacaf39(0x230)]];return this[_0xacaf39(0x566)](_0x327d87,_0x4519b6,_0xd41933,_0x4817ee,!![]),this['drawItemDarkRect'](_0x4519b6,_0xd41933,_0x4817ee),this[_0xacaf39(0x39c)](),!![];},Window_ShopStatus[_0x1d6c8a(0x17c)][_0x1d6c8a(0x1aa)]=function(){const _0x3ed1f1=_0x1d6c8a,_0xec87f7=VisuMZ[_0x3ed1f1(0xe4)]['Settings'][_0x3ed1f1(0x2d0)][_0x3ed1f1(0x491)];return _0xec87f7[_0x3ed1f1(0x1af)]($gameParty[_0x3ed1f1(0x175)](this[_0x3ed1f1(0x1a6)]));},Window_ShopStatus[_0x1d6c8a(0x17c)][_0x1d6c8a(0x4a3)]=function(){const _0x3f4363=_0x1d6c8a;return Imported[_0x3f4363(0x37a)]?VisuMZ[_0x3f4363(0x274)][_0x3f4363(0x20b)][_0x3f4363(0x1ca)][_0x3f4363(0x273)]:[0x0,0x1,0x2,0x3,0x4,0x5,0x6,0x7];},Window_ShopStatus[_0x1d6c8a(0x17c)][_0x1d6c8a(0xf8)]=function(){const _0x3bdc1b=_0x1d6c8a;return VisuMZ[_0x3bdc1b(0xe4)][_0x3bdc1b(0x20b)][_0x3bdc1b(0x337)][_0x3bdc1b(0x42e)];},Window_ShopStatus[_0x1d6c8a(0x17c)][_0x1d6c8a(0x55d)]=function(_0x517717,_0x4e44f5,_0x5667bd,_0x4f4f59){const _0x7b6a05=_0x1d6c8a;this['resetFontSettings'](),this[_0x7b6a05(0x3dc)][_0x7b6a05(0x131)]=this[_0x7b6a05(0xf8)]();let _0x16f5ec=this[_0x7b6a05(0x44d)](TextManager['param'](_0x517717))+0x4+_0x4e44f5;if(Imported[_0x7b6a05(0x37a)]){if(_0x7b6a05(0x443)===_0x7b6a05(0x229))return _0x1244ac[_0x7b6a05(0x356)](_0x7b6a05(0x2e8),'right');else this[_0x7b6a05(0x186)](_0x4e44f5,_0x5667bd,_0x4f4f59,_0x517717,!![]),VisuMZ[_0x7b6a05(0x274)][_0x7b6a05(0x20b)][_0x7b6a05(0x1ca)][_0x7b6a05(0x2c9)]&&(_0x16f5ec+=ImageManager[_0x7b6a05(0x14e)]+0x4);}else this[_0x7b6a05(0x50b)](ColorManager[_0x7b6a05(0x288)]()),this[_0x7b6a05(0x110)](TextManager[_0x7b6a05(0x4e8)](_0x517717),_0x4e44f5,_0x5667bd,_0x4f4f59);return this[_0x7b6a05(0x39c)](),_0x16f5ec;},Window_ShopStatus['prototype'][_0x1d6c8a(0x3e6)]=function(_0x10f5c4,_0x1c7b47,_0x576da7,_0x3df14d,_0xb27604){const _0x358446=_0x1d6c8a;_0x576da7+=this[_0x358446(0x345)](),_0xb27604-=this['itemPadding']()*0x2;const _0xb06d0d=VisuMZ[_0x358446(0xe4)][_0x358446(0x20b)][_0x358446(0x337)];this['contents'][_0x358446(0x131)]=_0xb06d0d[_0x358446(0x42e)],this['changePaintOpacity'](_0x10f5c4[_0x358446(0x13b)](this[_0x358446(0x1a6)]));if(_0x10f5c4[_0x358446(0x3d3)](this[_0x358446(0x1a6)])){if('WlPGL'!==_0x358446(0x2f1))this[_0x358446(0x436)](!![]);else{const _0x3b29f9=_0xb06d0d[_0x358446(0x3f0)];this[_0x358446(0x110)](_0x3b29f9,_0x576da7,_0x3df14d,_0xb27604,'center');}}else{if(_0x10f5c4[_0x358446(0x13b)](this['_item'])){const _0x4225e2=JsonEx['makeDeepCopy'](_0x10f5c4);_0x4225e2[_0x358446(0x41c)]=!![];const _0x42b20b=_0x4225e2[_0x358446(0x47f)]()[_0x358446(0x23d)](this[_0x358446(0x1a6)]['etypeId']);if(_0x42b20b>=0x0)_0x4225e2[_0x358446(0x38c)](_0x42b20b,this['_item']);let _0x185c6b=0x0,_0x38975d=0x0,_0xaee5b7=0x0;if(Imported[_0x358446(0x37a)]){if(_0x358446(0x3c7)===_0x358446(0x536))return _0x590ce0['actor']()?_0x170888[_0x358446(0x362)]()['canUse'](_0x407f7f):_0x9e5b60[_0x358446(0x17c)]['isEnabled']['call'](this,_0x3bfdfe);else _0x185c6b=_0x4225e2[_0x358446(0x210)](_0x1c7b47),_0x38975d=_0x185c6b-_0x10f5c4['paramValueByName'](_0x1c7b47),this[_0x358446(0x50b)](ColorManager[_0x358446(0x40b)](_0x38975d)),_0xaee5b7=(_0x38975d>=0x0?'+':'')+VisuMZ[_0x358446(0x2f5)](_0x38975d,0x0,_0x1c7b47);}else _0x358446(0x46b)!==_0x358446(0x46b)?this[_0x358446(0x446)]():(_0x185c6b=_0x4225e2['param'](_0x1c7b47),_0x38975d=_0x185c6b-_0x10f5c4['param'](_0x1c7b47),this[_0x358446(0x50b)](ColorManager[_0x358446(0x40b)](_0x38975d)),_0xaee5b7=(_0x38975d>=0x0?'+':'')+_0x38975d);if(_0xaee5b7==='+0')_0xaee5b7=_0xb06d0d['NoChangeMarker'];this[_0x358446(0x110)](_0xaee5b7,_0x576da7,_0x3df14d,_0xb27604,_0x358446(0x490));}else{const _0x58dab3=_0xb06d0d[_0x358446(0x201)];this[_0x358446(0x110)](_0x58dab3,_0x576da7,_0x3df14d,_0xb27604,_0x358446(0x490));}}this[_0x358446(0x39c)](),this['changePaintOpacity'](!![]);},Window_ShopStatus['prototype'][_0x1d6c8a(0x152)]=function(){const _0x28b633=_0x1d6c8a;VisuMZ[_0x28b633(0xe4)]['Settings'][_0x28b633(0x337)][_0x28b633(0x2bd)][_0x28b633(0x4e1)](this);},Window_ShopStatus['prototype'][_0x1d6c8a(0x302)]=function(){const _0x34344b=_0x1d6c8a;this[_0x34344b(0x25a)]={};if(!this[_0x34344b(0x1a6)])return;const _0x2d2526=this[_0x34344b(0x1a6)][_0x34344b(0x492)];if(_0x2d2526[_0x34344b(0x2b8)](/<STATUS INFO>\s*([\s\S]*)\s*<\/STATUS INFO>/i)){if(_0x34344b(0x30c)==='znrUx'){const _0x1bfaab=String(RegExp['$1'])[_0x34344b(0x461)](/[\r\n]+/);for(const _0x451414 of _0x1bfaab){if(_0x451414[_0x34344b(0x2b8)](/(.*):[ ](.*)/i)){const _0x39362f=String(RegExp['$1'])[_0x34344b(0x421)]()[_0x34344b(0x48e)](),_0x3770b0=String(RegExp['$2'])['trim']();this[_0x34344b(0x25a)][_0x39362f]=_0x3770b0;}}}else _0x51b0ec='item-%1'['format'](_0x25b850['id']);}},Window_ShopStatus['prototype'][_0x1d6c8a(0x2a1)]=function(){const _0x34dfaa=_0x1d6c8a;return Math[_0x34dfaa(0x23c)](0x1,$gameSystem[_0x34dfaa(0x466)]()-0x4);},Window_ShopStatus[_0x1d6c8a(0x17c)]['resetFontSettings']=function(){const _0x3f5dda=_0x1d6c8a;Window_StatusBase[_0x3f5dda(0x17c)][_0x3f5dda(0x39c)][_0x3f5dda(0x4e1)](this),this[_0x3f5dda(0x3dc)][_0x3f5dda(0x131)]=this[_0x3f5dda(0x453)]||this[_0x3f5dda(0x3dc)][_0x3f5dda(0x131)],this['contents'][_0x3f5dda(0x493)]=this[_0x3f5dda(0x4e6)]||this['contents'][_0x3f5dda(0x493)];},Window_ShopStatus['prototype']['fontSizeRatio']=function(){const _0x579deb=_0x1d6c8a;return this[_0x579deb(0x3dc)][_0x579deb(0x131)]/$gameSystem[_0x579deb(0x466)]();},Window_ShopStatus[_0x1d6c8a(0x17c)][_0x1d6c8a(0x2c8)]=function(_0x306567,_0x524945,_0x30248a){const _0x3193cf=_0x1d6c8a,_0x581058=ImageManager[_0x3193cf(0x3de)](_0x3193cf(0x3fe)),_0x4ab3e2=ImageManager[_0x3193cf(0x14e)],_0x483988=ImageManager[_0x3193cf(0x12a)],_0x57d05a=_0x306567%0x10*_0x4ab3e2,_0x37e824=Math['floor'](_0x306567/0x10)*_0x483988,_0x4cabe3=Math[_0x3193cf(0x155)](_0x4ab3e2*this[_0x3193cf(0x2d8)]()),_0xacd9f9=Math[_0x3193cf(0x155)](_0x483988*this['fontSizeRatio']());this[_0x3193cf(0x3dc)][_0x3193cf(0x54c)](_0x581058,_0x57d05a,_0x37e824,_0x4ab3e2,_0x483988,_0x524945,_0x30248a,_0x4cabe3,_0xacd9f9);},Window_ShopStatus[_0x1d6c8a(0x17c)][_0x1d6c8a(0x4fa)]=function(_0x2d57da,_0x329419){const _0x2a7a0a=_0x1d6c8a;_0x329419[_0x2a7a0a(0x366)]&&this[_0x2a7a0a(0x2c8)](_0x2d57da,_0x329419['x'],_0x329419['y']+0x2);_0x329419['x']+=Math[_0x2a7a0a(0x155)](ImageManager[_0x2a7a0a(0x14e)]*this['fontSizeRatio']());if(this['fontSizeRatio']()===0x1)_0x329419['x']+=0x4;},Window_ShopStatus[_0x1d6c8a(0x17c)][_0x1d6c8a(0x566)]=function(_0x5eef62,_0x39aeec,_0x646790,_0x10e7e4,_0x1c00ce,_0x5b3009){const _0x198398=_0x1d6c8a;_0x5eef62=_0x5eef62||'',_0x5b3009=_0x5b3009||_0x198398(0x2e8),this['_resetFontSize']=this[_0x198398(0x2a1)](),this['_resetFontColor']=_0x1c00ce?ColorManager['systemColor']():this[_0x198398(0x3dc)][_0x198398(0x493)],_0x39aeec+=this[_0x198398(0x345)](),_0x10e7e4-=this['itemPadding']()*0x2;const _0x303e4d=this[_0x198398(0x39d)](_0x5eef62);if(_0x5b3009==='center'){if(_0x198398(0x232)!=='hAUVF')_0x39aeec=_0x39aeec+Math[_0x198398(0x17f)]((_0x10e7e4-_0x303e4d[_0x198398(0x376)])/0x2);else{_0x2ccdf1[_0x198398(0xe4)][_0x198398(0x4b8)]['call'](this,_0x34bc2d);if(this[_0x198398(0x51b)]())this[_0x198398(0x3a7)](_0x37556a);}}else{if(_0x5b3009===_0x198398(0x470)){if(_0x198398(0x206)===_0x198398(0x3d9))return _0x59c747[_0x198398(0x356)](_0x198398(0x52e),_0x198398(0x1ee));else _0x39aeec=_0x39aeec+_0x10e7e4-_0x303e4d[_0x198398(0x376)];}}_0x646790+=(this[_0x198398(0x224)]()-_0x303e4d[_0x198398(0x3d7)])/0x2,this[_0x198398(0x290)](_0x5eef62,_0x39aeec,_0x646790,_0x10e7e4),this[_0x198398(0x453)]=undefined,this['_resetFontColor']=undefined,this[_0x198398(0x39c)]();},Window_ShopStatus[_0x1d6c8a(0x17c)][_0x1d6c8a(0x525)]=function(_0x31d18c,_0x2aa739,_0x1c4e63){const _0x483872=_0x1d6c8a;if(!DataManager['isItem'](this[_0x483872(0x1a6)]))return![];const _0x108f8d=this['getItemConsumableLabel']();this[_0x483872(0x566)](_0x108f8d,_0x31d18c,_0x2aa739,_0x1c4e63,!![]);const _0x114a3c=this[_0x483872(0x39f)]();return this[_0x483872(0x566)](_0x114a3c,_0x31d18c,_0x2aa739,_0x1c4e63,![],_0x483872(0x470)),this[_0x483872(0x472)](_0x31d18c,_0x2aa739,_0x1c4e63),this[_0x483872(0x39c)](),!![];},Window_ShopStatus['prototype']['getItemConsumableLabel']=function(){const _0x4a8683=_0x1d6c8a;return VisuMZ[_0x4a8683(0xe4)][_0x4a8683(0x20b)][_0x4a8683(0x337)][_0x4a8683(0x387)];},Window_ShopStatus[_0x1d6c8a(0x17c)]['getItemConsumableText']=function(){const _0x523416=_0x1d6c8a,_0x5c3833=_0x523416(0x1e2);if(this[_0x523416(0x25a)][_0x5c3833])return this[_0x523416(0x25a)][_0x5c3833];return this[_0x523416(0x41e)]()?VisuMZ[_0x523416(0xe4)]['Settings'][_0x523416(0x337)][_0x523416(0x298)]:VisuMZ[_0x523416(0xe4)][_0x523416(0x20b)][_0x523416(0x337)][_0x523416(0x47d)];},Window_ShopStatus['prototype'][_0x1d6c8a(0x41e)]=function(){const _0x8f5601=_0x1d6c8a;return VisuMZ['CoreEngine']&&VisuMZ[_0x8f5601(0x274)][_0x8f5601(0x20b)][_0x8f5601(0x164)][_0x8f5601(0x42b)]&&DataManager[_0x8f5601(0x4cc)](this[_0x8f5601(0x1a6)])?![]:_0x8f5601(0x36a)===_0x8f5601(0x36a)?this['_item'][_0x8f5601(0x370)]:_0x3270d1[_0x8f5601(0xe4)]['Settings'][_0x8f5601(0x41b)][_0x8f5601(0x286)];},Window_ShopStatus[_0x1d6c8a(0x17c)][_0x1d6c8a(0x539)]=function(_0x532c0a,_0x34354e,_0x1b7589){const _0x29c479=_0x1d6c8a;if(!this[_0x29c479(0x285)]()&&!DataManager[_0x29c479(0x431)](this['_item']))return![];if(DataManager[_0x29c479(0x4cc)](this[_0x29c479(0x1a6)])&&!$dataSystem[_0x29c479(0x4c2)]){const _0x113cdf=TextManager['keyItem'];this[_0x29c479(0x566)](_0x113cdf,_0x532c0a,_0x34354e,_0x1b7589,!![],_0x29c479(0x490));}else{const _0xf11782=TextManager[_0x29c479(0x433)];this['drawItemKeyData'](_0xf11782,_0x532c0a,_0x34354e,_0x1b7589,!![]);const _0x42f898=this['getItemQuantityText']();this[_0x29c479(0x566)](_0x42f898,_0x532c0a,_0x34354e,_0x1b7589,![],_0x29c479(0x470));}return this[_0x29c479(0x472)](_0x532c0a,_0x34354e,_0x1b7589),this[_0x29c479(0x39c)](),!![];},Window_ShopStatus['prototype'][_0x1d6c8a(0x1aa)]=function(){const _0x1005e1=_0x1d6c8a,_0x554e2c='QUANTITY';if(this[_0x1005e1(0x25a)][_0x554e2c])return this['_customItemInfo'][_0x554e2c];const _0x1dc488=VisuMZ[_0x1005e1(0xe4)]['Settings'][_0x1005e1(0x2d0)]['ItemQuantityFmt'];return _0x1dc488[_0x1005e1(0x1af)]($gameParty[_0x1005e1(0x175)](this[_0x1005e1(0x1a6)]));},Window_ShopStatus[_0x1d6c8a(0x17c)]['drawItemOccasion']=function(_0x163f58,_0x4541ad,_0x422409){const _0x57fb0c=_0x1d6c8a,_0x5192d6=this[_0x57fb0c(0x1bb)]();return this['drawItemKeyData'](_0x5192d6,_0x163f58,_0x4541ad,_0x422409,![],_0x57fb0c(0x490)),this[_0x57fb0c(0x472)](_0x163f58,_0x4541ad,_0x422409),this['resetFontSettings'](),!![];},Window_ShopStatus[_0x1d6c8a(0x17c)][_0x1d6c8a(0x1bb)]=function(){const _0x2fe342=_0x1d6c8a,_0x25cfb8=_0x2fe342(0x48d);if(this[_0x2fe342(0x25a)][_0x25cfb8])return this['_customItemInfo'][_0x25cfb8];const _0x590f9b=VisuMZ[_0x2fe342(0xe4)][_0x2fe342(0x20b)][_0x2fe342(0x337)],_0x1091fe=_0x2fe342(0x21f)['format'](this[_0x2fe342(0x1a6)]['occasion']);return _0x590f9b[_0x1091fe];},Window_ShopStatus[_0x1d6c8a(0x17c)][_0x1d6c8a(0x141)]=function(_0x535fea,_0x249b46,_0x1df3e8){const _0x1def91=_0x1d6c8a,_0x52d72f=this[_0x1def91(0x1e3)]();return this['drawItemKeyData'](_0x52d72f,_0x535fea,_0x249b46,_0x1df3e8,![],'center'),this[_0x1def91(0x472)](_0x535fea,_0x249b46,_0x1df3e8),this['resetFontSettings'](),!![];},Window_ShopStatus[_0x1d6c8a(0x17c)]['getItemScopeText']=function(){const _0x2a37c2=_0x1d6c8a,_0x5cb5ff=_0x2a37c2(0x552);if(this[_0x2a37c2(0x25a)][_0x5cb5ff])return this[_0x2a37c2(0x25a)][_0x5cb5ff];const _0x332453=VisuMZ[_0x2a37c2(0xe4)][_0x2a37c2(0x20b)][_0x2a37c2(0x337)];if(Imported[_0x2a37c2(0x2f6)]){const _0x16d3c6=this['_item'][_0x2a37c2(0x492)];if(_0x16d3c6[_0x2a37c2(0x2b8)](/<TARGET:[ ](.*)>/i)){if(_0x2a37c2(0x3f5)===_0x2a37c2(0x3f5)){const _0x27fff6=String(RegExp['$1']);if(_0x27fff6[_0x2a37c2(0x2b8)](/(\d+) RANDOM ANY/i)){if('sCpcs'!==_0x2a37c2(0x216))return _0x332453['ScopeRandomAny'][_0x2a37c2(0x1af)](Number(RegExp['$1']));else{const _0x4ede9d=this[_0x2a37c2(0x1a6)][_0x2a37c2(0x492)];if(_0x4ede9d[_0x2a37c2(0x2b8)](/<ALWAYS HIT>/i))return _0x2a37c2(0x172);else{if(_0x4ede9d[_0x2a37c2(0x2b8)](/<ALWAYS HIT RATE: (\d+)([%％])>/i))return _0x2a37c2(0x4b9)[_0x2a37c2(0x1af)](_0x248da2(_0x5dc36a['$1']));}}}else{if(_0x27fff6[_0x2a37c2(0x2b8)](/(\d+) RANDOM (?:ENEMY|ENEMIES|FOE|FOES)/i))return _0x332453[_0x2a37c2(0x344)][_0x2a37c2(0x1af)](Number(RegExp['$1']));else{if(_0x27fff6[_0x2a37c2(0x2b8)](/(\d+) RANDOM (?:ALLY|ALLIES|FRIEND|FRIENDS)/i))return _0x332453[_0x2a37c2(0x24c)][_0x2a37c2(0x1af)](Number(RegExp['$1']));else{if(_0x27fff6[_0x2a37c2(0x2b8)](/ALL (?:ALLY|ALLIES|FRIEND|FRIENDS) (?:BUT|EXCEPT) (?:USER|SELF)/i)){if(_0x2a37c2(0x3f6)!==_0x2a37c2(0x1ec))return _0x332453[_0x2a37c2(0x434)];else _0x51259d=_0x2a37c2(0x3c8)['format'](_0x32d36e['id']);}}}}}else _0x1a9c25['ItemsEquipsCore'][_0x2a37c2(0x2b5)][_0x2a37c2(0x4e1)](this,_0x391467),this['createCategoryNameWindow'](_0xd2afe3);}}const _0x4959df=_0x2a37c2(0x23f)[_0x2a37c2(0x1af)](this[_0x2a37c2(0x1a6)]['scope']);return _0x332453[_0x4959df];},Window_ShopStatus[_0x1d6c8a(0x17c)][_0x1d6c8a(0x4d3)]=function(_0x400304,_0x5f2d66,_0x542c2f){const _0x3834e1=_0x1d6c8a,_0x5ce48b=this[_0x3834e1(0x46a)]();this[_0x3834e1(0x566)](_0x5ce48b,_0x400304,_0x5f2d66,_0x542c2f,!![]);const _0x5c4746=this[_0x3834e1(0x38d)]();return this[_0x3834e1(0x566)](_0x5c4746,_0x400304,_0x5f2d66,_0x542c2f,![],_0x3834e1(0x470)),this['drawItemDarkRect'](_0x400304,_0x5f2d66,_0x542c2f),this[_0x3834e1(0x39c)](),!![];},Window_ShopStatus[_0x1d6c8a(0x17c)]['getItemSpeedLabel']=function(){const _0xdadb54=_0x1d6c8a;return VisuMZ[_0xdadb54(0xe4)][_0xdadb54(0x20b)][_0xdadb54(0x337)][_0xdadb54(0x407)];},Window_ShopStatus[_0x1d6c8a(0x17c)][_0x1d6c8a(0x38d)]=function(){const _0xb51b4d=_0x1d6c8a,_0x56d7f2=_0xb51b4d(0x521);if(this[_0xb51b4d(0x25a)][_0x56d7f2])return this[_0xb51b4d(0x25a)][_0x56d7f2];const _0x467b29=this[_0xb51b4d(0x1a6)][_0xb51b4d(0x193)];if(_0x467b29>=0x7d0){if(_0xb51b4d(0x270)!==_0xb51b4d(0x270))_0x1651f4=_0xb51b4d(0x40f)[_0xb51b4d(0x1af)](_0x1d3a6d['id']);else return VisuMZ['ItemsEquipsCore'][_0xb51b4d(0x20b)][_0xb51b4d(0x337)][_0xb51b4d(0x19a)];}else{if(_0x467b29>=0x3e8)return'wafZJ'===_0xb51b4d(0x1eb)?VisuMZ[_0xb51b4d(0xe4)][_0xb51b4d(0x20b)][_0xb51b4d(0x337)]['Speed1000']:_0x3121b1[_0xb51b4d(0x274)]&&_0x34faf3['CoreEngine'][_0xb51b4d(0x20b)][_0xb51b4d(0x164)][_0xb51b4d(0x42b)]&&_0x3bcf7d[_0xb51b4d(0x4cc)](this[_0xb51b4d(0x1a6)])?![]:this['_item'][_0xb51b4d(0x370)];else{if(_0x467b29>0x0)return VisuMZ[_0xb51b4d(0xe4)]['Settings']['StatusWindow'][_0xb51b4d(0x4d1)];else{if(_0x467b29===0x0)return VisuMZ[_0xb51b4d(0xe4)][_0xb51b4d(0x20b)][_0xb51b4d(0x337)][_0xb51b4d(0x2d2)];else{if(_0x467b29>-0x3e8)return VisuMZ[_0xb51b4d(0xe4)][_0xb51b4d(0x20b)][_0xb51b4d(0x337)][_0xb51b4d(0x31b)];else{if(_0x467b29>-0x7d0){if(_0xb51b4d(0x283)!==_0xb51b4d(0x283)){if(_0x46a543[_0xb51b4d(0xe4)]['Settings'][_0xb51b4d(0x3af)][_0xb51b4d(0x555)]===![])return;_0x465f3e=_0xf8aa3[_0xb51b4d(0x23c)](_0x1bcb07||0x1,0x1);while(_0x633f87--){_0x31c3a2=_0x521c0b||this['lineHeight'](),this['contents'][_0xb51b4d(0x245)]=0xa0;const _0xa35056=_0x4412ff[_0xb51b4d(0x43b)]();this[_0xb51b4d(0x3dc)][_0xb51b4d(0x1bd)](_0x41f296+0x1,_0x110873+0x1,_0x1a79f0-0x2,_0x16a9a8-0x2,_0xa35056),this[_0xb51b4d(0x3dc)]['paintOpacity']=0xff;}}else return VisuMZ[_0xb51b4d(0xe4)][_0xb51b4d(0x20b)][_0xb51b4d(0x337)][_0xb51b4d(0x485)];}else{if(_0x467b29<=-0x7d0)return _0xb51b4d(0x12e)!=='Gynth'?this[_0xb51b4d(0x16c)]()['match'](/RIGHT/i):VisuMZ[_0xb51b4d(0xe4)][_0xb51b4d(0x20b)]['StatusWindow'][_0xb51b4d(0x222)];else{if('RSYQc'!=='ZUWWR')return _0xb51b4d(0x31f);else _0x68df87[_0xb51b4d(0x4d6)](_0xb51b4d(0x489))&&this[_0xb51b4d(0x2fd)]()?this[_0xb51b4d(0x2d6)]():this[_0xb51b4d(0x375)](_0x58030e['isTriggered']('up'));}}}}}}}},Window_ShopStatus[_0x1d6c8a(0x17c)][_0x1d6c8a(0x323)]=function(_0x7fad96,_0x1d0e21,_0x43865f){const _0x4a8881=_0x1d6c8a,_0x57d949=this[_0x4a8881(0x294)]();this[_0x4a8881(0x566)](_0x57d949,_0x7fad96,_0x1d0e21,_0x43865f,!![]);const _0x1e1118=this[_0x4a8881(0x507)]();return this[_0x4a8881(0x566)](_0x1e1118,_0x7fad96,_0x1d0e21,_0x43865f,![],_0x4a8881(0x470)),this[_0x4a8881(0x472)](_0x7fad96,_0x1d0e21,_0x43865f),this[_0x4a8881(0x39c)](),!![];},Window_ShopStatus[_0x1d6c8a(0x17c)][_0x1d6c8a(0x294)]=function(){const _0x2f95a8=_0x1d6c8a;return VisuMZ[_0x2f95a8(0xe4)][_0x2f95a8(0x20b)][_0x2f95a8(0x337)]['LabelSuccessRate'];},Window_ShopStatus[_0x1d6c8a(0x17c)][_0x1d6c8a(0x507)]=function(){const _0x4dc192=_0x1d6c8a,_0xbd0df=_0x4dc192(0x35f);if(this[_0x4dc192(0x25a)][_0xbd0df])return this[_0x4dc192(0x25a)][_0xbd0df];if(Imported[_0x4dc192(0x2f6)]){const _0x44346b=this[_0x4dc192(0x1a6)]['note'];if(_0x44346b['match'](/<ALWAYS HIT>/i))return _0x4dc192(0x4e9)!==_0x4dc192(0x495)?_0x4dc192(0x172):_0x384f77['ItemsEquipsCore'][_0x4dc192(0x20b)]['ShopScene'][_0x4dc192(0x4eb)];else{if(_0x44346b[_0x4dc192(0x2b8)](/<ALWAYS HIT RATE: (\d+)([%％])>/i))return'%1%'['format'](Number(RegExp['$1']));}}return'%1%'['format'](this['_item'][_0x4dc192(0x567)]);},Window_ShopStatus['prototype']['drawItemRepeats']=function(_0x2abc9d,_0x321040,_0xd04691){const _0x31420f=_0x1d6c8a,_0x1cbe8f=this[_0x31420f(0x14f)]();this[_0x31420f(0x566)](_0x1cbe8f,_0x2abc9d,_0x321040,_0xd04691,!![]);const _0x128497=this['getItemRepeatsText']();return this[_0x31420f(0x566)](_0x128497,_0x2abc9d,_0x321040,_0xd04691,![],_0x31420f(0x470)),this[_0x31420f(0x472)](_0x2abc9d,_0x321040,_0xd04691),this['resetFontSettings'](),!![];},Window_ShopStatus[_0x1d6c8a(0x17c)][_0x1d6c8a(0x14f)]=function(){const _0x164525=_0x1d6c8a;return VisuMZ[_0x164525(0xe4)][_0x164525(0x20b)][_0x164525(0x337)][_0x164525(0x397)];},Window_ShopStatus[_0x1d6c8a(0x17c)][_0x1d6c8a(0x33d)]=function(){const _0x20616a=_0x1d6c8a,_0xde2593=_0x20616a(0x365);if(this[_0x20616a(0x25a)][_0xde2593])return this['_customItemInfo'][_0xde2593];const _0x14964f=_0x20616a(0x51a);return _0x14964f[_0x20616a(0x1af)](this[_0x20616a(0x1a6)][_0x20616a(0x4e7)]);},Window_ShopStatus[_0x1d6c8a(0x17c)][_0x1d6c8a(0x316)]=function(_0x46cf77,_0x596c9e,_0x331fd1){const _0x30137f=_0x1d6c8a,_0x15bc3d=this[_0x30137f(0x1a3)]();this['drawItemKeyData'](_0x15bc3d,_0x46cf77,_0x596c9e,_0x331fd1,!![]);const _0x11093c=this[_0x30137f(0x528)]();return this[_0x30137f(0x566)](_0x11093c,_0x46cf77,_0x596c9e,_0x331fd1,![],_0x30137f(0x470)),this[_0x30137f(0x472)](_0x46cf77,_0x596c9e,_0x331fd1),this[_0x30137f(0x39c)](),!![];},Window_ShopStatus[_0x1d6c8a(0x17c)][_0x1d6c8a(0x1a3)]=function(){const _0x1199df=_0x1d6c8a;return VisuMZ[_0x1199df(0xe4)][_0x1199df(0x20b)][_0x1199df(0x337)][_0x1199df(0x3d5)];},Window_ShopStatus[_0x1d6c8a(0x17c)][_0x1d6c8a(0x528)]=function(){const _0x11bb5c=_0x1d6c8a,_0x350b64=_0x11bb5c(0x3be);if(this[_0x11bb5c(0x25a)][_0x350b64])return this[_0x11bb5c(0x25a)][_0x350b64];const _0x58fbb1=VisuMZ[_0x11bb5c(0xe4)][_0x11bb5c(0x20b)]['StatusWindow'],_0x452fef='HitType%1'['format'](this['_item'][_0x11bb5c(0x281)]);return _0x58fbb1[_0x452fef];},Window_ShopStatus[_0x1d6c8a(0x17c)][_0x1d6c8a(0x2e4)]=function(_0x53aa3b,_0x4e4588,_0x7e7c6c){const _0x341e2e=_0x1d6c8a;if(this[_0x341e2e(0x1a6)][_0x341e2e(0x330)][_0x341e2e(0x2cf)]<=0x0)return _0x4e4588;if(this[_0x341e2e(0x277)](_0x53aa3b,_0x4e4588,_0x7e7c6c))_0x4e4588+=this['lineHeight']();if(this[_0x341e2e(0x4c6)](_0x53aa3b,_0x4e4588,_0x7e7c6c))_0x4e4588+=this[_0x341e2e(0x224)]();return this[_0x341e2e(0x39c)](),_0x4e4588;},Window_ShopStatus[_0x1d6c8a(0x17c)][_0x1d6c8a(0x277)]=function(_0x1d7341,_0x41669b,_0x307d93){const _0x4caa38=_0x1d6c8a,_0x40ccd2=this[_0x4caa38(0x14c)]();this['drawItemKeyData'](_0x40ccd2,_0x1d7341,_0x41669b,_0x307d93,!![]);const _0x4a6bb5=this['getItemDamageElementText']();return this['drawItemKeyData'](_0x4a6bb5,_0x1d7341,_0x41669b,_0x307d93,![],'right'),this[_0x4caa38(0x472)](_0x1d7341,_0x41669b,_0x307d93),this[_0x4caa38(0x39c)](),!![];},Window_ShopStatus[_0x1d6c8a(0x17c)]['getItemDamageElementLabel']=function(){const _0x1a6e02=_0x1d6c8a;return VisuMZ[_0x1a6e02(0xe4)]['Settings'][_0x1a6e02(0x337)][_0x1a6e02(0x458)];},Window_ShopStatus[_0x1d6c8a(0x17c)]['getItemDamageElementText']=function(){const _0x1ce84f=_0x1d6c8a,_0x1e3fe2='ELEMENT';if(this[_0x1ce84f(0x25a)][_0x1e3fe2])return this[_0x1ce84f(0x25a)][_0x1e3fe2];if(this[_0x1ce84f(0x1a6)]['damage'][_0x1ce84f(0x379)]<=-0x1){if(_0x1ce84f(0x332)!==_0x1ce84f(0x332))_0x4d8b4f[_0x1ce84f(0xe4)][_0x1ce84f(0x46d)]['call'](this),this['isUseItemsEquipsCoreUpdatedLayout']()&&this['commandSellItemsEquipsCore'](),this[_0x1ce84f(0x12f)]()&&(this[_0x1ce84f(0x393)][_0x1ce84f(0x565)](0x0),this['onCategoryOk']());else return VisuMZ['ItemsEquipsCore']['Settings']['StatusWindow'][_0x1ce84f(0x364)];}else{if(this[_0x1ce84f(0x1a6)][_0x1ce84f(0x330)][_0x1ce84f(0x379)]===0x0)return VisuMZ[_0x1ce84f(0xe4)][_0x1ce84f(0x20b)][_0x1ce84f(0x337)]['ElementNone'];else{if(_0x1ce84f(0x335)!==_0x1ce84f(0x335)){const _0x2118c0=_0x1ce84f(0x1b8)['format'](_0x32813e,_0x2e0391);_0x24e792[_0x1ce84f(0xe4)]['paramJS'][_0x2118c0]=new _0x12e693(_0x1ce84f(0x199),'paramId',_0x56d94d);}else return $dataSystem[_0x1ce84f(0x37b)][this[_0x1ce84f(0x1a6)]['damage']['elementId']];}}},Window_ShopStatus['prototype'][_0x1d6c8a(0x4c6)]=function(_0x33ceee,_0x5b8bb0,_0x4c05fc){const _0x2ebe66=_0x1d6c8a,_0x1c5b11=this[_0x2ebe66(0x1cb)]();this[_0x2ebe66(0x566)](_0x1c5b11,_0x33ceee,_0x5b8bb0,_0x4c05fc,!![]),this[_0x2ebe66(0x3f9)]();const _0x16d7d4=this['getItemDamageAmountText'](),_0x455303=ColorManager[_0x2ebe66(0x3e4)]([0x0,0x0,0x2,0x1,0x3,0x1,0x3][this['_item'][_0x2ebe66(0x330)]['type']]);return this[_0x2ebe66(0x50b)](_0x455303),this[_0x2ebe66(0x566)](_0x16d7d4,_0x33ceee,_0x5b8bb0,_0x4c05fc,![],'right'),this[_0x2ebe66(0x472)](_0x33ceee,_0x5b8bb0,_0x4c05fc),this[_0x2ebe66(0x39c)](),!![];},Window_ShopStatus[_0x1d6c8a(0x17c)][_0x1d6c8a(0x1cb)]=function(){const _0xf79e0b=_0x1d6c8a;if(Imported[_0xf79e0b(0x2f6)]&&DataManager[_0xf79e0b(0x469)](this[_0xf79e0b(0x1a6)])!==_0xf79e0b(0x1c6))return this[_0xf79e0b(0x3ca)]();else{if(_0xf79e0b(0x301)==='UtvCR')return this['getItemDamageAmountLabelOriginal']();else{const _0x28cbb3=_0x4defc3[_0x442e2f],_0x230d70=this[_0xf79e0b(0x190)](_0x136f62,_0x28cbb3);if(this['canEquip'](_0x230d70))this['_equips'][_0x4a95bb]['setObject'](_0x230d70);}}},Window_ShopStatus[_0x1d6c8a(0x17c)][_0x1d6c8a(0xf6)]=function(){const _0x7a55d5=_0x1d6c8a,_0x59ad5f=VisuMZ['ItemsEquipsCore']['Settings'][_0x7a55d5(0x337)],_0x33e69d=_0x7a55d5(0x4ea)[_0x7a55d5(0x1af)](this['_item']['damage'][_0x7a55d5(0x2cf)]),_0x50b694=[null,TextManager['hp'],TextManager['mp'],TextManager['hp'],TextManager['mp'],TextManager['hp'],TextManager['mp']][this['_item'][_0x7a55d5(0x330)][_0x7a55d5(0x2cf)]];return _0x59ad5f[_0x33e69d][_0x7a55d5(0x1af)](_0x50b694);},Window_ShopStatus['prototype'][_0x1d6c8a(0x3f9)]=function(){const _0x4b5268=_0x1d6c8a,_0x223522=$gameActors[_0x4b5268(0x362)](0x1);this[_0x4b5268(0x1dd)]=JsonEx[_0x4b5268(0x280)](_0x223522),this['_tempActorB']=JsonEx[_0x4b5268(0x280)](_0x223522);},Window_ShopStatus[_0x1d6c8a(0x17c)][_0x1d6c8a(0x23b)]=function(){const _0x5c1d25=_0x1d6c8a,_0x2187b5=_0x5c1d25(0x138);if(this[_0x5c1d25(0x25a)][_0x2187b5])return this[_0x5c1d25(0x25a)][_0x2187b5];return Imported[_0x5c1d25(0x2f6)]&&DataManager[_0x5c1d25(0x469)](this[_0x5c1d25(0x1a6)])!=='MANUAL'?this['getItemDamageAmountTextBattleCore']():this['getItemDamageAmountTextOriginal']();},Window_ShopStatus[_0x1d6c8a(0x17c)][_0x1d6c8a(0x256)]=function(){const _0x5e0a7e=_0x1d6c8a;window['a']=this[_0x5e0a7e(0x1dd)],window['b']=this[_0x5e0a7e(0x126)],this[_0x5e0a7e(0x1dd)][_0x5e0a7e(0x27b)](!![]),this['_tempActorB']['setShopStatusWindowMode']([0x3,0x4]['includes'](this['_item'][_0x5e0a7e(0x330)]['type']));let _0x360269=this[_0x5e0a7e(0x1a6)][_0x5e0a7e(0x330)]['formula'];try{const _0x545689=Math[_0x5e0a7e(0x23c)](eval(_0x360269),0x0)/window['a']['atk'];this[_0x5e0a7e(0x534)]();if(isNaN(_0x545689))return'?????';else{if('IsluW'!=='IsluW'){const _0x44a436=_0x4af99a(_0x427937['$1'])[_0x5e0a7e(0x48e)](),_0x87f9a9=_0x190b8c(_0x172326['$2'])[_0x5e0a7e(0x48e)]();this[_0x5e0a7e(0x4ee)](_0x44a436,_0x87f9a9,_0x2a347a,_0x24789f,_0x3cc5b1),_0x494d8c+=this[_0x5e0a7e(0x224)]();}else return _0x5e0a7e(0x4b9)[_0x5e0a7e(0x1af)](Math[_0x5e0a7e(0x49f)](_0x545689*0x64));}}catch(_0x4e3631){if(_0x5e0a7e(0x1e8)!==_0x5e0a7e(0x563))return $gameTemp[_0x5e0a7e(0xfa)]()&&(console[_0x5e0a7e(0x27a)]('Damage\x20Formula\x20Error\x20for\x20%1'[_0x5e0a7e(0x1af)](this['_item'][_0x5e0a7e(0x51d)])),console[_0x5e0a7e(0x27a)](_0x4e3631)),this['revertGlobalNamespaceVariables'](),_0x5e0a7e(0x31f);else{_0x5b38a0+=_0x5e0a7e(0x17d)['format'](_0x106e47),_0x1daa2a++;if(_0x10eced>=_0x5e6f60)return _0x52e0cc;}}},Window_ShopStatus[_0x1d6c8a(0x17c)]['revertGlobalNamespaceVariables']=function(){window['a']=undefined,window['b']=undefined;},Window_ShopStatus[_0x1d6c8a(0x17c)]['drawItemEffects']=function(_0x548eb4,_0xd6b6a6,_0x1bf889){const _0x483fc2=_0x1d6c8a;if(!this[_0x483fc2(0x537)]())return _0xd6b6a6;if(this['drawItemEffectsHpRecovery'](_0x548eb4,_0xd6b6a6,_0x1bf889))_0xd6b6a6+=this[_0x483fc2(0x224)]();if(this[_0x483fc2(0x340)](_0x548eb4,_0xd6b6a6,_0x1bf889))_0xd6b6a6+=this[_0x483fc2(0x224)]();if(this[_0x483fc2(0x314)](_0x548eb4,_0xd6b6a6,_0x1bf889))_0xd6b6a6+=this[_0x483fc2(0x224)]();if(this[_0x483fc2(0x484)](_0x548eb4,_0xd6b6a6,_0x1bf889))_0xd6b6a6+=this['lineHeight']();if(this[_0x483fc2(0x559)](_0x548eb4,_0xd6b6a6,_0x1bf889))_0xd6b6a6+=this['lineHeight']();if(this['drawItemEffectsTpDamage'](_0x548eb4,_0xd6b6a6,_0x1bf889))_0xd6b6a6+=this[_0x483fc2(0x224)]();if(this[_0x483fc2(0x3db)](_0x548eb4,_0xd6b6a6,_0x1bf889))_0xd6b6a6+=this[_0x483fc2(0x224)]();if(this[_0x483fc2(0x24d)](_0x548eb4,_0xd6b6a6,_0x1bf889))_0xd6b6a6+=this[_0x483fc2(0x224)]();if(this['drawItemEffectsRemovedStatesBuffs'](_0x548eb4,_0xd6b6a6,_0x1bf889))_0xd6b6a6+=this[_0x483fc2(0x224)]();return this[_0x483fc2(0x39c)](),_0xd6b6a6;},Window_ShopStatus[_0x1d6c8a(0x17c)]['getItemEffects']=function(){const _0x12c6ea=_0x1d6c8a;return this[_0x12c6ea(0x1a6)]['effects'];},Window_ShopStatus[_0x1d6c8a(0x17c)][_0x1d6c8a(0x537)]=function(){const _0x5568a6=_0x1d6c8a;let _0x18894d=![];this[_0x5568a6(0x561)]={'rateHP':0x0,'flatHP':0x0,'rateMP':0x0,'flatMP':0x0,'gainTP':0x0,'selfTP':0x0,'addState':[],'removeState':[],'changeBuff':[0x0,0x0,0x0,0x0,0x0,0x0,0x0,0x0],'removeBuff':[],'removeDebuff':[],'addStateBuffChanges':![],'removeStateBuffChanges':![]};const _0x57057e=this[_0x5568a6(0x46f)]();for(const _0x5cb76d of _0x57057e){switch(_0x5cb76d[_0x5568a6(0x32d)]){case Game_Action[_0x5568a6(0x20d)]:this[_0x5568a6(0x561)]['rateHP']+=_0x5cb76d[_0x5568a6(0x4ad)],this[_0x5568a6(0x561)][_0x5568a6(0x158)]+=_0x5cb76d[_0x5568a6(0x271)],_0x18894d=!![];break;case Game_Action[_0x5568a6(0x40c)]:this[_0x5568a6(0x561)][_0x5568a6(0x279)]+=_0x5cb76d['value1'],this[_0x5568a6(0x561)][_0x5568a6(0x531)]+=_0x5cb76d[_0x5568a6(0x271)],_0x18894d=!![];break;case Game_Action[_0x5568a6(0x52b)]:this['_itemData']['gainTP']+=_0x5cb76d[_0x5568a6(0x4ad)],_0x18894d=!![];break;case Game_Action['EFFECT_ADD_STATE']:this[_0x5568a6(0x561)][_0x5568a6(0x1a0)][_0x5568a6(0x221)](_0x5cb76d[_0x5568a6(0x4bd)]),_0x18894d=!![];break;case Game_Action[_0x5568a6(0x1ef)]:this[_0x5568a6(0x561)][_0x5568a6(0x3bd)][_0x5568a6(0x221)](_0x5cb76d[_0x5568a6(0x4bd)]),this['_itemData'][_0x5568a6(0x55c)]=!![],_0x18894d=!![];break;case Game_Action['EFFECT_ADD_BUFF']:this['_itemData'][_0x5568a6(0x413)][_0x5cb76d['dataId']]+=0x1,_0x18894d=!![];break;case Game_Action[_0x5568a6(0x464)]:this[_0x5568a6(0x561)][_0x5568a6(0x413)][_0x5cb76d[_0x5568a6(0x4bd)]]-=0x1,_0x18894d=!![];break;case Game_Action[_0x5568a6(0x569)]:this['_itemData'][_0x5568a6(0xe6)][_0x5568a6(0x221)](_0x5cb76d[_0x5568a6(0x4bd)]),this[_0x5568a6(0x561)]['removeStateBuffChanges']=!![],_0x18894d=!![];break;case Game_Action[_0x5568a6(0x3d8)]:this[_0x5568a6(0x561)][_0x5568a6(0x275)]['push'](_0x5cb76d[_0x5568a6(0x4bd)]),this[_0x5568a6(0x561)][_0x5568a6(0x55c)]=!![],_0x18894d=!![];break;}}if(this['_itemData'][_0x5568a6(0x1a0)][_0x5568a6(0x535)]>0x0)this[_0x5568a6(0x561)][_0x5568a6(0x1de)]=!![];for(let _0x5e6a07=0x0;_0x5e6a07<this[_0x5568a6(0x561)]['changeBuff']['length'];_0x5e6a07++){if(this[_0x5568a6(0x561)][_0x5568a6(0x413)][_0x5e6a07]!==0x0)this[_0x5568a6(0x561)]['addStateBuffChanges']=!![];}this['_item'][_0x5568a6(0x4cd)]!==0x0&&(this[_0x5568a6(0x561)][_0x5568a6(0x2db)]=this[_0x5568a6(0x1a6)][_0x5568a6(0x4cd)],_0x18894d=!![]);const _0x25958a=['HP\x20RECOVERY',_0x5568a6(0x456),_0x5568a6(0xf0),_0x5568a6(0x13f),_0x5568a6(0x428),'TP\x20DAMAGE',_0x5568a6(0x351),_0x5568a6(0x482),_0x5568a6(0x3dd)];for(const _0x62cbce of _0x25958a){if(_0x5568a6(0x1d9)===_0x5568a6(0x4b6)){const _0x7b6f55=new _0x2091e3();return _0x56298e[_0x3d5801]=_0x7b6f55,this[_0x5568a6(0x3ae)](_0x7b6f55),_0x7b6f55;}else{if(this[_0x5568a6(0x25a)][_0x62cbce]){if('VRExD'!==_0x5568a6(0x3da)){_0x18894d=!![];break;}else{const _0xb9bc0d=_0x511788[_0x5568a6(0x14e)],_0x5761a9=_0x17fa75[_0x5568a6(0x12a)];this[_0x5568a6(0x1b5)]=new _0x64bccf(_0xb9bc0d,_0x5761a9),this['drawNewLabelIcon'](),this[_0x5568a6(0x3bf)]();}}}}return _0x18894d;},Window_ShopStatus[_0x1d6c8a(0x17c)][_0x1d6c8a(0x1d4)]=function(_0x1a9681,_0x371400,_0x30d3e5){const _0x13d907=_0x1d6c8a,_0x1233db=_0x13d907(0x2a7);if(this[_0x13d907(0x561)][_0x13d907(0x3e3)]<=0x0&&this[_0x13d907(0x561)]['flatHP']<=0x0&&!this[_0x13d907(0x25a)][_0x1233db])return![];const _0x556f81=this['getItemEffectsHpRecoveryLabel']();this[_0x13d907(0x566)](_0x556f81,_0x1a9681,_0x371400,_0x30d3e5,!![]);const _0x2ff9f5=this['getItemEffectsHpRecoveryText']();return this[_0x13d907(0x50b)](ColorManager[_0x13d907(0x3e4)](0x1)),this[_0x13d907(0x566)](_0x2ff9f5,_0x1a9681,_0x371400,_0x30d3e5,![],'right'),this['drawItemDarkRect'](_0x1a9681,_0x371400,_0x30d3e5),this[_0x13d907(0x39c)](),!![];},Window_ShopStatus[_0x1d6c8a(0x17c)][_0x1d6c8a(0x401)]=function(){const _0x50f388=_0x1d6c8a,_0x181e88=VisuMZ[_0x50f388(0xe4)][_0x50f388(0x20b)]['StatusWindow'][_0x50f388(0x27f)];return _0x181e88[_0x50f388(0x1af)](TextManager['hp']);},Window_ShopStatus[_0x1d6c8a(0x17c)][_0x1d6c8a(0x3e2)]=function(){const _0x5ee5bd=_0x1d6c8a,_0x4f23df=_0x5ee5bd(0x2a7);if(this[_0x5ee5bd(0x25a)][_0x4f23df])return this[_0x5ee5bd(0x25a)][_0x4f23df];let _0x4c1acc='';if(this[_0x5ee5bd(0x561)][_0x5ee5bd(0x3e3)]>0x0)_0x4c1acc+=_0x5ee5bd(0x3a2)[_0x5ee5bd(0x1af)](Math[_0x5ee5bd(0x17f)](this[_0x5ee5bd(0x561)][_0x5ee5bd(0x3e3)]*0x64));if(this['_itemData'][_0x5ee5bd(0x3e3)]>0x0&&this[_0x5ee5bd(0x561)][_0x5ee5bd(0x158)]>0x0)_0x4c1acc+='\x20';if(this['_itemData'][_0x5ee5bd(0x158)]>0x0)_0x4c1acc+=_0x5ee5bd(0x3f1)[_0x5ee5bd(0x1af)](this[_0x5ee5bd(0x561)][_0x5ee5bd(0x158)]);return _0x4c1acc;},Window_ShopStatus['prototype']['drawItemEffectsMpRecovery']=function(_0x1f6512,_0x26815f,_0x17a925){const _0x2a61fe=_0x1d6c8a,_0x3a48fe='MP\x20RECOVERY';if(this[_0x2a61fe(0x561)]['rateMP']<=0x0&&this[_0x2a61fe(0x561)][_0x2a61fe(0x531)]<=0x0&&!this[_0x2a61fe(0x25a)][_0x3a48fe])return![];const _0x5d58ce=this[_0x2a61fe(0x3a4)]();this[_0x2a61fe(0x566)](_0x5d58ce,_0x1f6512,_0x26815f,_0x17a925,!![]);const _0x305d5d=this[_0x2a61fe(0xf1)]();return this['changeTextColor'](ColorManager[_0x2a61fe(0x3e4)](0x3)),this['drawItemKeyData'](_0x305d5d,_0x1f6512,_0x26815f,_0x17a925,![],_0x2a61fe(0x470)),this[_0x2a61fe(0x472)](_0x1f6512,_0x26815f,_0x17a925),this[_0x2a61fe(0x39c)](),!![];},Window_ShopStatus['prototype'][_0x1d6c8a(0x3a4)]=function(){const _0x29331a=_0x1d6c8a,_0x4dea72=VisuMZ['ItemsEquipsCore'][_0x29331a(0x20b)][_0x29331a(0x337)][_0x29331a(0x3d0)];return _0x4dea72['format'](TextManager['mp']);},Window_ShopStatus[_0x1d6c8a(0x17c)][_0x1d6c8a(0xf1)]=function(){const _0x1a325c=_0x1d6c8a,_0xac5591='MP\x20RECOVERY';if(this[_0x1a325c(0x25a)][_0xac5591])return this[_0x1a325c(0x25a)][_0xac5591];let _0x469560='';if(this['_itemData']['rateMP']>0x0)_0x469560+=_0x1a325c(0x3a2)['format'](Math[_0x1a325c(0x17f)](this[_0x1a325c(0x561)][_0x1a325c(0x279)]*0x64));if(this[_0x1a325c(0x561)][_0x1a325c(0x279)]>0x0&&this[_0x1a325c(0x561)][_0x1a325c(0x531)]>0x0)_0x469560+='\x20';if(this[_0x1a325c(0x561)][_0x1a325c(0x531)]>0x0)_0x469560+='+%1'[_0x1a325c(0x1af)](this[_0x1a325c(0x561)][_0x1a325c(0x531)]);return _0x469560;},Window_ShopStatus['prototype'][_0x1d6c8a(0x314)]=function(_0x11320e,_0x27f4ad,_0x232f2f){const _0x57032b=_0x1d6c8a,_0x1d9c11=_0x57032b(0xf0);if(this[_0x57032b(0x561)]['gainTP']<=0x0&&!this[_0x57032b(0x25a)][_0x1d9c11])return![];const _0x23b523=this[_0x57032b(0x549)]();this['drawItemKeyData'](_0x23b523,_0x11320e,_0x27f4ad,_0x232f2f,!![]);const _0x25f71b=this[_0x57032b(0x45e)]();return this[_0x57032b(0x50b)](ColorManager[_0x57032b(0x22a)]()),this['drawItemKeyData'](_0x25f71b,_0x11320e,_0x27f4ad,_0x232f2f,![],_0x57032b(0x470)),this[_0x57032b(0x472)](_0x11320e,_0x27f4ad,_0x232f2f),this['resetFontSettings'](),!![];},Window_ShopStatus['prototype'][_0x1d6c8a(0x549)]=function(){const _0x4eac92=_0x1d6c8a,_0x9d3e24=VisuMZ[_0x4eac92(0xe4)][_0x4eac92(0x20b)][_0x4eac92(0x337)]['LabelRecoverTP'];return _0x9d3e24[_0x4eac92(0x1af)](TextManager['tp']);},Window_ShopStatus[_0x1d6c8a(0x17c)]['getItemEffectsTpRecoveryText']=function(){const _0x3ec013=_0x1d6c8a,_0x70143c=_0x3ec013(0xf0);if(this[_0x3ec013(0x25a)][_0x70143c])return this[_0x3ec013(0x25a)][_0x70143c];let _0x47601f='';return _0x47601f+='+%1'[_0x3ec013(0x1af)](this[_0x3ec013(0x561)]['gainTP']),_0x47601f;},Window_ShopStatus['prototype']['drawItemEffectsSelfTpGain']=function(_0x50ff1a,_0x18c399,_0x33d806){const _0x300680=_0x1d6c8a,_0x1034af=_0x300680(0x351);if(this[_0x300680(0x561)][_0x300680(0x2db)]===0x0&&!this[_0x300680(0x25a)][_0x1034af])return![];const _0x51a9c5=this[_0x300680(0x4fb)]();this[_0x300680(0x566)](_0x51a9c5,_0x50ff1a,_0x18c399,_0x33d806,!![]);const _0x4a2bad=this[_0x300680(0x1e9)]();if(this[_0x300680(0x561)][_0x300680(0x2db)]>0x0){if(_0x300680(0x2b2)!==_0x300680(0x2b2)){if(this[_0x300680(0x32e)])return![];return _0x5f1dc3[_0x300680(0xe4)][_0x300680(0x20b)]['New'][_0x300680(0x2b3)];}else this[_0x300680(0x50b)](ColorManager[_0x300680(0x22a)]());}else this[_0x300680(0x50b)](ColorManager[_0x300680(0x35c)]());return this[_0x300680(0x566)](_0x4a2bad,_0x50ff1a,_0x18c399,_0x33d806,![],_0x300680(0x470)),this[_0x300680(0x472)](_0x50ff1a,_0x18c399,_0x33d806),this[_0x300680(0x39c)](),!![];},Window_ShopStatus[_0x1d6c8a(0x17c)][_0x1d6c8a(0x4fb)]=function(){const _0x355eed=_0x1d6c8a,_0x2738b2=VisuMZ['ItemsEquipsCore'][_0x355eed(0x20b)][_0x355eed(0x337)][_0x355eed(0x44c)];return _0x2738b2[_0x355eed(0x1af)](TextManager['tp']);},Window_ShopStatus[_0x1d6c8a(0x17c)]['getItemEffectsSelfTpGainText']=function(){const _0x20a0f9=_0x1d6c8a,_0x2b09fb=_0x20a0f9(0x351);if(this[_0x20a0f9(0x25a)][_0x2b09fb])return this[_0x20a0f9(0x25a)][_0x2b09fb];let _0x4dd289='';return this[_0x20a0f9(0x561)][_0x20a0f9(0x2db)]>0x0?_0x4dd289+=_0x20a0f9(0x3f1)['format'](this[_0x20a0f9(0x561)][_0x20a0f9(0x2db)]):_0x20a0f9(0x520)!==_0x20a0f9(0x390)?_0x4dd289+='%1'[_0x20a0f9(0x1af)](this[_0x20a0f9(0x561)][_0x20a0f9(0x2db)]):_0xcb900c=_0xecc1c4(_0x53e2b3['$1'])['toLowerCase']()['trim'](),_0x4dd289;},Window_ShopStatus[_0x1d6c8a(0x17c)][_0x1d6c8a(0x484)]=function(_0x120e10,_0xebd82d,_0x3e2c6e){const _0x3725dd=_0x1d6c8a,_0x516b5e='HP\x20DAMAGE';if(this[_0x3725dd(0x561)][_0x3725dd(0x3e3)]>=0x0&&this[_0x3725dd(0x561)][_0x3725dd(0x158)]>=0x0&&!this[_0x3725dd(0x25a)][_0x516b5e])return![];const _0x494d83=this[_0x3725dd(0x2fe)]();this['drawItemKeyData'](_0x494d83,_0x120e10,_0xebd82d,_0x3e2c6e,!![]);const _0x293514=this['getItemEffectsHpDamageText']();return this['changeTextColor'](ColorManager['damageColor'](0x0)),this[_0x3725dd(0x566)](_0x293514,_0x120e10,_0xebd82d,_0x3e2c6e,![],_0x3725dd(0x470)),this[_0x3725dd(0x472)](_0x120e10,_0xebd82d,_0x3e2c6e),this[_0x3725dd(0x39c)](),!![];},Window_ShopStatus[_0x1d6c8a(0x17c)][_0x1d6c8a(0x2fe)]=function(){const _0x4c57ec=_0x1d6c8a,_0x1e4010=VisuMZ[_0x4c57ec(0xe4)][_0x4c57ec(0x20b)][_0x4c57ec(0x337)][_0x4c57ec(0x361)];return _0x1e4010[_0x4c57ec(0x1af)](TextManager['hp']);},Window_ShopStatus[_0x1d6c8a(0x17c)][_0x1d6c8a(0x2d4)]=function(){const _0x2a7bd6=_0x1d6c8a,_0x5892c0=_0x2a7bd6(0x13f);if(this[_0x2a7bd6(0x25a)][_0x5892c0])return this[_0x2a7bd6(0x25a)][_0x5892c0];let _0x253cf5='';if(this[_0x2a7bd6(0x561)]['rateHP']<0x0)_0x253cf5+=_0x2a7bd6(0x4b9)[_0x2a7bd6(0x1af)](Math[_0x2a7bd6(0x17f)](this[_0x2a7bd6(0x561)][_0x2a7bd6(0x3e3)]*0x64));if(this['_itemData'][_0x2a7bd6(0x3e3)]<0x0&&this[_0x2a7bd6(0x561)][_0x2a7bd6(0x158)]<0x0)_0x253cf5+='\x20';if(this[_0x2a7bd6(0x561)][_0x2a7bd6(0x158)]<0x0)_0x253cf5+='%1'[_0x2a7bd6(0x1af)](this[_0x2a7bd6(0x561)]['flatHP']);return _0x253cf5;},Window_ShopStatus['prototype'][_0x1d6c8a(0x559)]=function(_0xae0f40,_0x5d3635,_0x4aa227){const _0x28cef9=_0x1d6c8a,_0x57480d='MP\x20DAMAGE';if(this['_itemData'][_0x28cef9(0x279)]>=0x0&&this[_0x28cef9(0x561)]['flatMP']>=0x0&&!this[_0x28cef9(0x25a)][_0x57480d])return![];const _0x3a62d5=this[_0x28cef9(0x22e)]();this[_0x28cef9(0x566)](_0x3a62d5,_0xae0f40,_0x5d3635,_0x4aa227,!![]);const _0x4feacd=this[_0x28cef9(0x1d5)]();return this[_0x28cef9(0x50b)](ColorManager[_0x28cef9(0x3e4)](0x2)),this['drawItemKeyData'](_0x4feacd,_0xae0f40,_0x5d3635,_0x4aa227,![],'right'),this['drawItemDarkRect'](_0xae0f40,_0x5d3635,_0x4aa227),this[_0x28cef9(0x39c)](),!![];},Window_ShopStatus[_0x1d6c8a(0x17c)][_0x1d6c8a(0x22e)]=function(){const _0xf98a9a=_0x1d6c8a,_0x46339a=VisuMZ[_0xf98a9a(0xe4)][_0xf98a9a(0x20b)]['StatusWindow'][_0xf98a9a(0x2d9)];return _0x46339a['format'](TextManager['mp']);},Window_ShopStatus[_0x1d6c8a(0x17c)][_0x1d6c8a(0x1d5)]=function(){const _0x3f50f0=_0x1d6c8a,_0x49066c=_0x3f50f0(0x428);if(this[_0x3f50f0(0x25a)][_0x49066c])return this[_0x3f50f0(0x25a)][_0x49066c];let _0x156d86='';if(this['_itemData']['rateMP']<0x0)_0x156d86+=_0x3f50f0(0x4b9)[_0x3f50f0(0x1af)](Math[_0x3f50f0(0x17f)](this['_itemData'][_0x3f50f0(0x279)]*0x64));if(this[_0x3f50f0(0x561)][_0x3f50f0(0x279)]<0x0&&this[_0x3f50f0(0x561)][_0x3f50f0(0x531)]<0x0)_0x156d86+='\x20';if(this['_itemData']['flatMP']<0x0)_0x156d86+='%1'[_0x3f50f0(0x1af)](this[_0x3f50f0(0x561)][_0x3f50f0(0x531)]);return _0x156d86;},Window_ShopStatus[_0x1d6c8a(0x17c)]['drawItemEffectsTpDamage']=function(_0x528263,_0x3512cf,_0x161289){const _0x3200d8=_0x1d6c8a,_0x48030d='TP\x20DAMAGE';if(this[_0x3200d8(0x561)][_0x3200d8(0x296)]>=0x0&&!this[_0x3200d8(0x25a)][_0x48030d])return![];const _0x5cfff7=this[_0x3200d8(0x11c)]();this[_0x3200d8(0x566)](_0x5cfff7,_0x528263,_0x3512cf,_0x161289,!![]);const _0x4196be=this['getItemEffectsTpDamageText']();return this[_0x3200d8(0x50b)](ColorManager['powerDownColor']()),this[_0x3200d8(0x566)](_0x4196be,_0x528263,_0x3512cf,_0x161289,![],_0x3200d8(0x470)),this[_0x3200d8(0x472)](_0x528263,_0x3512cf,_0x161289),this[_0x3200d8(0x39c)](),!![];},Window_ShopStatus[_0x1d6c8a(0x17c)][_0x1d6c8a(0x11c)]=function(){const _0x20ef61=_0x1d6c8a,_0x817ed9=VisuMZ[_0x20ef61(0xe4)][_0x20ef61(0x20b)][_0x20ef61(0x337)][_0x20ef61(0x100)];return _0x817ed9[_0x20ef61(0x1af)](TextManager['tp']);},Window_ShopStatus['prototype'][_0x1d6c8a(0x19d)]=function(){const _0x3b7635=_0x1d6c8a,_0x470892='TP\x20DAMAGE';if(this[_0x3b7635(0x25a)][_0x470892])return this[_0x3b7635(0x25a)][_0x470892];let _0x25c10b='';return _0x25c10b+='%1'[_0x3b7635(0x1af)](this[_0x3b7635(0x561)][_0x3b7635(0x296)]),_0x25c10b;},Window_ShopStatus[_0x1d6c8a(0x17c)][_0x1d6c8a(0x24d)]=function(_0x4b5087,_0x4eb4bd,_0x2f484c){const _0x268be9=_0x1d6c8a,_0x46e9d9=_0x268be9(0x482);if(!this[_0x268be9(0x561)][_0x268be9(0x1de)]&&!this['_customItemInfo'][_0x46e9d9])return![];const _0x51b859=this[_0x268be9(0x1c0)]();this['drawItemKeyData'](_0x51b859,_0x4b5087,_0x4eb4bd,_0x2f484c,!![]);const _0xde7271=this[_0x268be9(0x320)]();return this[_0x268be9(0x566)](_0xde7271,_0x4b5087,_0x4eb4bd,_0x2f484c,![],'right'),this[_0x268be9(0x472)](_0x4b5087,_0x4eb4bd,_0x2f484c),this['resetFontSettings'](),!![];},Window_ShopStatus['prototype']['getItemEffectsAddedStatesBuffsLabel']=function(){const _0x4c1fd9=_0x1d6c8a;return VisuMZ[_0x4c1fd9(0xe4)][_0x4c1fd9(0x20b)][_0x4c1fd9(0x337)][_0x4c1fd9(0x486)];},Window_ShopStatus['prototype']['getItemEffectsAddedStatesBuffsText']=function(){const _0x3c3e64=_0x1d6c8a,_0x4546d5='ADDED\x20EFFECTS';if(this[_0x3c3e64(0x25a)][_0x4546d5])return this[_0x3c3e64(0x25a)][_0x4546d5];let _0x1f3233='',_0xeffbe4=0x0;const _0x160f16=0x8;for(const _0x146910 of this[_0x3c3e64(0x561)][_0x3c3e64(0x1a0)]){if(_0x3c3e64(0x2e7)!=='zfBmS'){if(!this[_0x3c3e64(0x28f)]())return;const _0x3274ac=this[_0x3c3e64(0x2ac)](),_0x9f283f=_0x557ac7[_0x3c3e64(0xe4)]['Settings'][_0x3c3e64(0x3af)][_0x3c3e64(0x28b)],_0x5cf481=_0x3274ac===_0x3c3e64(0x43d)?_0x52a478['clear']:_0x3c3e64(0x487)['format'](_0x9f283f,_0x89b10b[_0x3c3e64(0x442)]),_0x3c67da=this[_0x3c3e64(0x481)]();this[_0x3c3e64(0x4af)](_0x5cf481,'clear',_0x3c67da);}else{const _0x1ca0d7=$dataStates[_0x146910];if(_0x1ca0d7&&_0x1ca0d7[_0x3c3e64(0x480)]>0x0){_0x1f3233+='\x5cI[%1]'['format'](_0x1ca0d7[_0x3c3e64(0x480)]),_0xeffbe4++;if(_0xeffbe4>=_0x160f16)return _0x1f3233;}}}for(let _0x46ae1e=0x0;_0x46ae1e<this[_0x3c3e64(0x561)]['changeBuff'][_0x3c3e64(0x535)];_0x46ae1e++){if(_0x3c3e64(0x119)===_0x3c3e64(0x119)){const _0x1919de=this[_0x3c3e64(0x561)][_0x3c3e64(0x413)][_0x46ae1e],_0x3f30ca=Game_BattlerBase[_0x3c3e64(0x17c)][_0x3c3e64(0x4d0)](_0x1919de,_0x46ae1e);if(_0x3f30ca>0x0){if('MgyPz'===_0x3c3e64(0x2f7)){_0x1f3233+=_0x3c3e64(0x17d)[_0x3c3e64(0x1af)](_0x3f30ca),_0xeffbe4++;if(_0xeffbe4>=_0x160f16)return _0x1f3233;}else return _0x214fea[_0x3c3e64(0xe4)][_0x3c3e64(0x20b)][_0x3c3e64(0x3af)][_0x3c3e64(0x548)];}}else this[_0x3c3e64(0x50b)](_0x38b12d[_0x3c3e64(0x35c)]());}return _0x1f3233;},Window_ShopStatus[_0x1d6c8a(0x17c)]['drawItemEffectsRemovedStatesBuffs']=function(_0x5484e8,_0x1107fd,_0x156441){const _0x264be9=_0x1d6c8a,_0x254cb2=_0x264be9(0x3dd);if(!this[_0x264be9(0x561)]['removeStateBuffChanges']&&!this[_0x264be9(0x25a)][_0x254cb2])return![];const _0x21dae9=this[_0x264be9(0x25e)]();this[_0x264be9(0x566)](_0x21dae9,_0x5484e8,_0x1107fd,_0x156441,!![]);const _0x1b375d=this[_0x264be9(0x408)]();return this[_0x264be9(0x566)](_0x1b375d,_0x5484e8,_0x1107fd,_0x156441,![],_0x264be9(0x470)),this['drawItemDarkRect'](_0x5484e8,_0x1107fd,_0x156441),this[_0x264be9(0x39c)](),!![];},Window_ShopStatus[_0x1d6c8a(0x17c)]['getItemEffectsRemovedStatesBuffsLabel']=function(){const _0x2cd494=_0x1d6c8a;return VisuMZ['ItemsEquipsCore'][_0x2cd494(0x20b)][_0x2cd494(0x337)]['LabelRemove'];},Window_ShopStatus[_0x1d6c8a(0x17c)][_0x1d6c8a(0x408)]=function(){const _0x1a9200=_0x1d6c8a,_0x28b98e='REMOVED\x20EFFECTS';if(this[_0x1a9200(0x25a)][_0x28b98e])return this[_0x1a9200(0x25a)][_0x28b98e];let _0x1654c2='',_0x35eea3=0x0;const _0x426210=VisuMZ[_0x1a9200(0xe4)][_0x1a9200(0x20b)][_0x1a9200(0x337)][_0x1a9200(0x167)];for(const _0x525576 of this['_itemData'][_0x1a9200(0x3bd)]){if(_0x1a9200(0x508)==='OoPSf'){if(this[_0x1a9200(0x2ef)]())return this[_0x1a9200(0x4db)][_0x1a9200(0x376)]/0x5/-0x3;return _0x43cd27['prototype']['buttonAssistOffset3'][_0x1a9200(0x4e1)](this);}else{const _0x403158=$dataStates[_0x525576];if(_0x403158&&_0x403158[_0x1a9200(0x480)]>0x0){if(_0x1a9200(0x21d)===_0x1a9200(0x196))return this['isUseItemsEquipsCoreUpdatedLayout']()?this['helpWindowRectItemsEquipsCore']():_0xe431b3[_0x1a9200(0x17c)][_0x1a9200(0x249)][_0x1a9200(0x4e1)](this);else{_0x1654c2+=_0x1a9200(0x17d)[_0x1a9200(0x1af)](_0x403158['iconIndex']),_0x35eea3++;if(_0x35eea3>=_0x426210)return _0x1654c2;}}}}for(let _0x102306=0x0;_0x102306<this[_0x1a9200(0x561)][_0x1a9200(0xe6)][_0x1a9200(0x535)];_0x102306++){if(_0x1a9200(0x400)===_0x1a9200(0x400)){const _0x7612bf=Game_BattlerBase[_0x1a9200(0x17c)][_0x1a9200(0x4d0)](0x1,_0x102306);if(_0x7612bf>0x0){_0x1654c2+=_0x1a9200(0x17d)['format'](_0x7612bf),_0x35eea3++;if(_0x35eea3>=_0x426210)return _0x1654c2;}}else return this[_0x1a9200(0x560)](_0x4693f8);}for(let _0x321ca=0x0;_0x321ca<this[_0x1a9200(0x561)][_0x1a9200(0x275)][_0x1a9200(0x535)];_0x321ca++){if(_0x1a9200(0x4da)===_0x1a9200(0x409))return _0x2ff66b[_0x1a9200(0xe4)][_0x1a9200(0x150)][_0x1a9200(0x4e1)](this);else{const _0x1e131a=Game_BattlerBase[_0x1a9200(0x17c)][_0x1a9200(0x4d0)](-0x1,_0x321ca);if(_0x1e131a>0x0){_0x1654c2+='\x5cI[%1]'[_0x1a9200(0x1af)](_0x1e131a),_0x35eea3++;if(_0x35eea3>=_0x426210)return _0x1654c2;}}}return _0x1654c2;},Window_ShopStatus[_0x1d6c8a(0x17c)][_0x1d6c8a(0xff)]=function(_0x81ffad,_0x28e531,_0x3ad598){const _0x406155=_0x1d6c8a;if(this[_0x406155(0x1a6)][_0x406155(0x492)]['match'](/<CUSTOM STATUS INFO>\s*([\s\S]*)\s*<\/CUSTOM STATUS INFO>/i)){const _0x4c4699=String(RegExp['$1'])[_0x406155(0x461)](/[\r\n]+/);for(const _0xb741b5 of _0x4c4699){if(_0x406155(0x41a)!==_0x406155(0x3e7)){if(_0xb741b5['match'](/(.*):[ ](.*)/i)){const _0x1316a5=String(RegExp['$1'])[_0x406155(0x48e)](),_0x1cf409=String(RegExp['$2'])[_0x406155(0x48e)]();this[_0x406155(0x4ee)](_0x1316a5,_0x1cf409,_0x81ffad,_0x28e531,_0x3ad598),_0x28e531+=this[_0x406155(0x224)]();}}else{const _0x295be9=this[_0x406155(0x2ac)](),_0x2f3fcb=_0x335e58[_0x406155(0xe4)]['Settings']['ShopScene'][_0x406155(0x1ed)],_0x2e6ca9=_0x1b43a5[_0x406155(0xe4)]['Settings'][_0x406155(0x41b)][_0x406155(0x429)],_0x3341fb=_0x295be9===_0x406155(0x43d)?_0x2e6ca9:_0x406155(0x487)[_0x406155(0x1af)](_0x2f3fcb,_0x2e6ca9);this[_0x406155(0x4af)](_0x3341fb,'cancel');}}}return this['resetFontSettings'](),_0x28e531;},Window_ShopStatus['prototype']['drawItemCustomEntryLine']=function(_0x45bab7,_0x528b67,_0x38670a,_0x401bb6,_0x147041){const _0x57898e=_0x1d6c8a;this['drawItemKeyData'](_0x45bab7,_0x38670a,_0x401bb6,_0x147041,!![]),this['drawItemKeyData'](_0x528b67,_0x38670a,_0x401bb6,_0x147041,![],_0x57898e(0x470)),this['drawItemDarkRect'](_0x38670a,_0x401bb6,_0x147041),this['resetFontSettings']();},Window_ShopStatus[_0x1d6c8a(0x17c)][_0x1d6c8a(0x501)]=function(){const _0x51fc13=_0x1d6c8a;if(!this['_item'])return;const _0x193bc8=this[_0x51fc13(0x1a6)]['note'],_0x5cf750=/<SHOP (?:PICTURE|IMAGE|PICTURE NAME|PICTURE FILENAME|IMAGE NAME|IMAGE FILENAME):[ ](.*)>/gi,_0x41d9d8=_0x193bc8[_0x51fc13(0x2b8)](_0x5cf750);if(_0x41d9d8)for(const _0x2a88ba of _0x41d9d8){_0x2a88ba['match'](_0x5cf750);const _0x3a7524=String(RegExp['$1'])[_0x51fc13(0x48e)]()||'';if(_0x3a7524==='')continue;const _0x446f14=ImageManager['loadPicture'](_0x3a7524);_0x446f14[_0x51fc13(0x151)](this['drawCustomShopGraphicLoad'][_0x51fc13(0x238)](this,_0x446f14,this['_item']));}},Window_ShopStatus['prototype'][_0x1d6c8a(0x29e)]=function(_0x181066,_0x9ed0e9){const _0x1227ac=_0x1d6c8a;if(this[_0x1227ac(0x1a6)]!==_0x9ed0e9)return;if(!_0x181066)return;if(_0x181066['width']<=0x0||_0x181066['height']<=0x0)return;const _0x2f526a=_0x9ed0e9['note'];let _0x4201c4=_0x1227ac(0x2b7);_0x2f526a[_0x1227ac(0x2b8)](/<SHOP (?:PICTURE|IMAGE) LAYER:[ ]FOREGROUND>/i)&&(_0x4201c4=_0x1227ac(0x463));const _0x2129ce=_0x4201c4===_0x1227ac(0x2b7)?this[_0x1227ac(0x4ac)]:this['contents'];let _0x35035b=this[_0x1227ac(0x48a)],_0x2f080a=this[_0x1227ac(0x165)];_0x2f526a[_0x1227ac(0x2b8)](/<SHOP (?:PICTURE|IMAGE) MAX WIDTH:[ ](\d+)>/i)&&(_0x1227ac(0x215)===_0x1227ac(0x359)?(this[_0x1227ac(0x1c5)](),this[_0x1227ac(0x1fa)]()):_0x35035b=Number(RegExp['$1']));_0x2f526a[_0x1227ac(0x2b8)](/<SHOP (?:PICTURE|IMAGE) MAX HEIGHT:[ ](\d+)>/i)&&(_0x2f080a=Number(RegExp['$1']));_0x2f526a[_0x1227ac(0x2b8)](/<SHOP (?:PICTURE|IMAGE) MAX DIMENSIONS:[ ](\d+),[ ]*(\d+)>/i)&&(_0x35035b=Number(RegExp['$1']),_0x2f080a=Number(RegExp['$2']));const _0x2ad7b3=Math[_0x1227ac(0x111)](0x1,_0x35035b/_0x181066[_0x1227ac(0x376)],_0x2f080a/_0x181066['height']);let _0x484572=0x0,_0x27721e=0x0,_0x43a70a=Math[_0x1227ac(0x17f)](_0x181066[_0x1227ac(0x376)]*_0x2ad7b3),_0x4fb605=Math[_0x1227ac(0x17f)](_0x181066[_0x1227ac(0x3d7)]*_0x2ad7b3),_0x275c81='center';_0x2f526a[_0x1227ac(0x2b8)](/<SHOP (?:PICTURE|IMAGE) (?:ALIGN|ALIGNMENT):[ ](LEFT|CENTER|RIGHT)>/i)&&(_0x275c81=String(RegExp['$1'])[_0x1227ac(0x3cd)]()[_0x1227ac(0x48e)]());if(_0x275c81===_0x1227ac(0x2e8)){if(_0x1227ac(0x16d)!==_0x1227ac(0x16d)){const _0xcea3bf=_0x4629c9-(_0x302354-_0x242934)/0x2;this[_0x1227ac(0x3e6)](_0x1adc0d,_0x3ed2d0,_0x4e8194,_0xcea3bf,_0x4db404),_0x14df01+=_0x38f2fa;}else _0x484572=0x0;}else _0x275c81==='center'?_0x484572=Math['round']((this['innerWidth']-_0x43a70a)/0x2):_0x484572=this['innerWidth']-_0x43a70a;let _0x63884f=_0x1227ac(0x18a);_0x2f526a['match'](/<SHOP (?:PICTURE|IMAGE) POSITION:[ ](TOP|MIDDLE|BOTTOM)>/i)&&(_0x63884f=String(RegExp['$1'])[_0x1227ac(0x3cd)]()['trim']());if(_0x63884f===_0x1227ac(0x416)){if(_0x1227ac(0x10e)!==_0x1227ac(0x2a4))_0x27721e=0x0;else return _0x409f08[_0x1227ac(0x356)]('up',_0x1227ac(0x36e));}else _0x63884f==='middle'?_0x1227ac(0x17b)!==_0x1227ac(0x319)?_0x27721e=Math[_0x1227ac(0x49f)]((this[_0x1227ac(0x165)]-_0x4fb605)/0x2):this[_0x1227ac(0x12c)]():_0x27721e=this[_0x1227ac(0x165)]-_0x4fb605;if(_0x2f526a[_0x1227ac(0x2b8)](/<SHOP (?:PICTURE|IMAGE) OFFSET X:[ ]([\+\-]\d+)>/i)){if(_0x1227ac(0x1a7)===_0x1227ac(0x2f4)){const _0x40f55d=_0x112da0[_0x1227ac(0x3e0)]('['+_0x571fb5['$1']['match'](/\d+/g)+']');for(const _0x29830b of _0x40f55d){if(!_0x41cde1[_0x1227ac(0x15a)](_0x29830b))return!![];}return![];}else _0x484572+=Number(RegExp['$1']);}_0x2f526a['match'](/<SHOP (?:PICTURE|IMAGE) OFFSET Y:[ ]([\+\-]\d+)>/i)&&(_0x27721e+=Number(RegExp['$1']));_0x2f526a[_0x1227ac(0x2b8)](/<SHOP (?:PICTURE|IMAGE) OFFSET:[ ]([\+\-]\d+),[ ]*([\+\-]\d+)>/i)&&(_0x484572+=Number(RegExp['$1']),_0x27721e+=Number(RegExp['$2']));let _0x3778b7=0xff;if(_0x2f526a[_0x1227ac(0x2b8)](/<SHOP (?:PICTURE|IMAGE) OPACITY:[ ](\d+)>/i)){if(_0x1227ac(0x29d)!==_0x1227ac(0x29d)){if(this['_numberWindow']&&this[_0x1227ac(0x239)][_0x1227ac(0x505)])return _0xa48bb2[_0x1227ac(0xe4)][_0x1227ac(0x20b)]['ShopScene']['buttonAssistLargeIncrement'];return _0xe021[_0x1227ac(0x17c)][_0x1227ac(0x4a7)][_0x1227ac(0x4e1)](this);}else _0x3778b7=Number(RegExp['$1']);}else{if(_0x2f526a[_0x1227ac(0x2b8)](/<SHOP (?:PICTURE|IMAGE) OPACITY:[ ](\d+)([%％])>/i)){if(_0x1227ac(0x163)!==_0x1227ac(0x394))_0x3778b7=Math[_0x1227ac(0x49f)](Number(RegExp['$1'])*0.01*0xff)['clamp'](0x0,0xff);else{const _0x3366fa=_0x810c02[_0x1227ac(0xe4)]['Settings'][_0x1227ac(0x53e)][_0x1227ac(0x2cc)];if(_0x3366fa<=0x0)return;const _0xe31fe2=_0x22d0fc[_0x1227ac(0x3de)](_0x1227ac(0x3fe)),_0x2fa624=_0x4db8d2[_0x1227ac(0x14e)],_0x17069c=_0x626633[_0x1227ac(0x12a)],_0x505e31=_0x3366fa%0x10*_0x2fa624,_0x2d928a=_0xf94b6c[_0x1227ac(0x17f)](_0x3366fa/0x10)*_0x17069c;this['bitmap']['blt'](_0xe31fe2,_0x505e31,_0x2d928a,_0x2fa624,_0x17069c,0x0,0x0);}}}_0x2129ce[_0x1227ac(0x245)]=_0x3778b7,_0x2129ce['blt'](_0x181066,0x0,0x0,_0x181066['width'],_0x181066[_0x1227ac(0x3d7)],_0x484572,_0x27721e,_0x43a70a,_0x4fb605),_0x2129ce[_0x1227ac(0x245)]=0xff;};