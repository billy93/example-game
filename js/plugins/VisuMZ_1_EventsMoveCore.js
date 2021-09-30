//=============================================================================
// VisuStella MZ - Events & Movement Core
// VisuMZ_1_EventsMoveCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_EventsMoveCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.EventsMoveCore = VisuMZ.EventsMoveCore || {};
VisuMZ.EventsMoveCore.version = 1.27;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.27] [EventsMoveCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Events_and_Movement_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Events & Movement Core plugin adds a lot of new functionality in terms
 * of event flexibility and movement options to RPG Maker MZ. These range from
 * adding in old capabilities from previous iterations of RPG Maker to more
 * mainstream techniques found in other game engines. Movement options are also
 * expanded to support 8-directional movement as well as sprite sheets provided
 * that the VisuStella 8 format is used.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Event commands expanded upon to include old and new functions.
 * * Event templates for Copying Events, Morphing Events, and Spawning Events.
 * * 8-directional movement option available and sprite sheet support.
 * * Aesthetics for tilting the sprite when dashing and having shadows below.
 * * Pathfinding support for event movement through custom Move Route commands.
 * * Advanced switches and variable support to run code automatically.
 * * Turn regular Switches and Variables into Self Switches and Self Variables.
 * * Put labels and icons over events.
 * * Allow numerous ways to trigger events, through clicking, proximity, or by
 *   usage of Regions.
 * * Change the hitbox sizes of events to larger in any direction.
 * * Synchronize event movement options to move when player/other events move.
 * * The ability for the player to turn in place.
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
 * Features: Advanced Switches and Variables
 * ============================================================================
 *
 * Switches and variables can now run JavaScript code and return values
 * instantly. While at first glance, this may seem no different from using
 * the Control Variables event command's Script option, this can be used to
 * instantly set up Switch and/or Variable conditions for Parallel Common
 * Events, Event Page Conditions, Enemy Skill Conditions, and Troop Page
 * Conditions instantly without needing to make an event command to do so.
 *
 * ---
 *
 * <JS> code </JS>
 * - Used for: Switch and Variable names
 * - Replace 'code' with JavaScript code on what value to return.
 *
 * ---
 *
 * NOTE: Tagged Switches/Variables are mutually exclusive from one another.
 * You cannot tag them with <JS>, <Self>, or <Global> simultaneously.
 *
 * ============================================================================
 * Features: Self Switches and Variables
 * ============================================================================
 *
 * RPG Maker MZ by default has 4 Self Switches: A, B, C, D. For some types of
 * games, this isn't enough. This plugin gives you the ability convert regular
 * Switches into Self Switches so you could have more.
 *
 * Self Variables also do not exist in RPG Maker MZ by default. Just like with
 * Switches, you can turn regular Variables into Self Variables.
 *
 * ---
 *
 * <Self>
 * - Used for: Switch and Variable names
 * - Converts the Switch/Variable into a Self Switch/Variable.
 *
 * ---
 *
 * After, just use them like you would for normal Switches and Variables in an
 * event's page conditions. If the <Self> tag is present inside the Switch or
 * Variable's name, then it will use data unique to only that event.
 *
 * NOTE: Tagged Switches/Variables are mutually exclusive from one another.
 * You cannot tag them with <JS>, <Self>, or <Global> simultaneously.
 * 
 * ---
 * 
 * If you need to use a script call to get a Self Switch or Self Variable's
 * value, you can use the following script calls.
 * 
 *   ---
 * 
 *   Get Self Switch Values:
 * 
 *   getSelfSwitchValue(mapID, eventID, switchID)
 *   - Replace 'mapID' with the map ID the target event is located on.
 *   - Replace 'eventID' with the ID of the target event.
 *   - Replace 'switchID' with the ID number if it is a Self Switch made with
 *     <Self> or a capital letter surrounded by quotes if it's A, B, C, or D.
 *   - This will return the true/false value of the Self Switch.
 *   - Example: getSelfSwitchValue(12, 34, 56)
 *   - Example: getSelfSwitchValue(12, 34, 'B')
 * 
 *   ---
 * 
 *   Get Self Variable Values:
 * 
 *   getSelfVariableValue(mapID, eventID, variableID)
 *   - Replace 'mapID' with the map ID the target event is located on.
 *   - Replace 'eventID' with the ID of the target event.
 *   - Replace 'variableID' with the ID number of the Self Variable.
 *   - This will return whatever stored value is found in the Self Variable.
 *   - Example: getSelfVariableValue(12, 34, 56)
 * 
 *   ---
 * 
 *   Set Self Switch Values:
 * 
 *   setSelfSwitchValue(mapID, eventID, switchID, value)
 *   - Replace 'mapID' with the map ID the target event is located on.
 *   - Replace 'eventID' with the ID of the target event.
 *   - Replace 'switchID' with the ID number if it is a Self Switch made with
 *     <Self> or a capital letter surrounded by quotes if it's A, B, C, or D.
 *   - Replace 'value' with either 'true' or 'false' for ON/OFF respectively.
 *     Do not use quotes.
 *   - This will change the Self Switch's value to true/false.
 *     - Example: setSelfSwitchValue(12, 34, 56, false)
 *     - Example: setSelfSwitchValue(12, 34, 'B', true)
 * 
 *   ---
 * 
 *   Set Self Variable Values:
 * 
 *   setSelfVariableValue(mapID, eventID, variableID, value)
 *   - Replace 'mapID' with the map ID the target event is located on.
 *   - Replace 'eventID' with the ID of the target event.
 *   - Replace 'variableID' with the ID number of the Self Variable.
 *   - Replace 'value' with the value you want to set the Self Variable to.
 *   - Example: setSelfVariableValue(12, 34, 56, 88888)
 * 
 *   ---
 * 
 * ---
 *
 * ============================================================================
 * Features: VisuStella-Style 8-Directional Sprite Sheets
 * ============================================================================
 *
 * This plugin provides support for the VisuStella-Style 8-Directional Sprite
 * Sheets, also know as VS8. VS8 sprite sheets offer support for walking
 * frames, dashing frames, carrying frames, and emotes.
 *
 * ---
 *
 * To designate a sprite sheet as VS8, simply add [VS8] to the filename.
 * Something like Actor1.png would become Actor1_[VS8].png.
 *
 * ---
 *
 * VS8 sprites are formatted as such. Each block below is a set of 3 frames.
 *
 * Walk Down    Walk DL     Dash Down   Dash DL
 * Walk Left    Walk DR     Dash Left   Dash DR
 * Walk Right   Walk UL     Dash Right  Dash UL
 * Walk Up      Walk UR     Dash Up     Dash UR
 *
 * Carry Down   Carry DL    Ladder      Emotes 3
 * Carry Left   Carry DR    Rope        Emotes 4
 * Carry Right  Carry UL    Emotes 1    Emotes 5
 * Carry Up     Carry UR    Emotes 2    Emotes 6
 *
 * ---
 *
 * Here are how each of the emote sets are grouped from left to right.
 *
 * Emotes 1: Item, Hmph, Victory
 * Emotes 2: Hurt, Kneel, Collapse
 * Emotes 3: !, ?, Music Note
 * Emotes 4: Heart, Anger, Sweat
 * Emotes 5: Cobweb, ..., Light Bulb
 * Emotes 6: Sleep0, Sleep1, Sleep2
 *
 * ---
 *
 * ============================================================================
 * Features: Weighted Random Movement
 * ============================================================================
 * 
 * When creating events to place on the map, you can determine what type of
 * autonomous movement the event will have. When selecting "Random", the event
 * will move randomly across the map.
 * 
 * However, with the way "Random" movement works with the RPG Maker MZ default
 * code, the event is more likely to hit a wall and then hug the said wall as
 * it maps laps around the map's outer borders making it feel very unnatural
 * for any player who's been on the map long enough.
 * 
 * This is where "Weighted Random Movement" comes in. It changes up the random
 * movement behavior to function where the farther the event is, the more
 * likely the event is to step back towards its "home" position (aka where it
 * spawned upon loading the map). This is so that a housewife NPC doesn't
 * suddenly wander off into the middle of an army's training grounds on the
 * same town map.
 * 
 * The event will stay closer to its home value depending on how high the
 * weight's value is. There are a number of ways to adjust the weighted value.
 * 
 * ---
 * 
 * Plugin Parameters > Movement > Event Movement > Random Move Weight
 * 
 * This Plugin Parameter setting allows you to set the default weight for all
 * events with "Random" autonomous movement. It is set at a default value of
 * 0.10 to give the event an understandable degree of freedom.
 * 
 * Lower numbers give events more freedom to move. Larger numbers will make the
 * events stick closer to home.
 * 
 * Change this value to 0 to disable it.
 * 
 * ---
 * 
 * You can customize this individually per event by using Notetags and/or
 * Comment Tags for the events.
 * 
 * <Random Move Weight: x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - If this tag is used on an event with random-type autonomous movement, then
 *   the event will stick closer to their home location (where they are located
 *   upon spawning on the map). How close they stick to their home location
 *   will depend on the weighted 'x' value.
 * - Replace 'x' with a number between 0 and 1. Numbers closer to 0 give the
 *   event more freedom when moving randomly while numbers closer to 1 cause
 *   the event to stick closer to their home position.
 * 
 * <True Random Move>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - If this tag is used on an event with random-type autonomous movement, then
 *   that event will ignore the effects of weighted randomized movement.
 * 
 * ---
 *
 * ============================================================================
 * Notetags and Comment Tags
 * ============================================================================
 *
 * The following are notetags that have been added through this plugin. These
 * notetags will not work with your game if this plugin is OFF or not present.
 *
 * Some of these are comment tags. Comment tags are used for events to mark and
 * affect individual event pages rather than the whole event.
 *
 * === Map Notetags ===
 *
 * The following notetags are used for maps only. While some of these options
 * are also available in the Plugin Parameters, some of these notetags extend
 * usage to specific maps marked by these notetags as well.
 *
 * ---
 *
 * <Diagonal Movement: On>
 * <Diagonal Movement: Off>
 *
 * - Used for: Map Notetags
 * - Turns on/off diagonal movement for those maps.
 * - If notetag isn't present, use Plugin Parameter setting.
 *
 * ---
 *
 * <type Allow Region: x>
 * <type Allow Region: x, x, x>
 *
 * <type Forbid Region: x>
 * <type Forbid Region: x, x, x>
 *
 * <type Dock Region: x>
 * <type Dock Region: x, x, x>
 *
 * - Used for: Map Notetags
 * - Replace 'type' with 'All', 'Walk', 'Player', 'Event', 'Vehicle', 'Boat',
 *   'Ship', or 'Airship'.
 * - 'Allow' notetag variants allow that type to pass through them no matter
 *   what other passability settings are in place.
 * - 'Forbid' notetag variants forbid that type from passing through at all.
 * - 'Dock' notetag variants allow vehicles to dock there. Boats and ships must
 *   face the region direction while airships must land directly on top.
 *
 * ---
 *
 * <Save Event Locations>
 *
 * - Used for: Maps Notetags
 * - Saves the locations of all events on the map so that when you return to
 *   that map at a later point, the events will be in the position they were
 *   last in.
 *
 * ---
 * 
 * === Page Comment Tags ===
 * 
 * The following comment tags are to be put inside of the pages of events,
 * troops, and common events for them to work!
 * 
 * ---
 * 
 * <Page Conditions>
 *   conditions
 *   conditions
 *   conditions
 * </Page Conditions>
 * 
 * - Used for: Map Event Page, Troop Page, and Common Event Page Comment Tags
 * - This allows you to create custom page conditions that utilize the
 *   Conditional Branch event command to see if the additional page conditions
 *   are met.
 * 
 * ---
 * 
 * <Conditions Met>
 * - Used for: Map Event Page, Troop Page, and Common Event Page Comment Tags
 * - If used between the <Page Conditions> and </Page Conditions> comment tag,
 *   upon reaching this part of event command list, the custom page conditions
 *   will be considered met.
 * 
 * ---
 * 
 * Example:
 * 
 * ◆Comment：<Page Conditions>
 * ◆If：Reid has equipped Potion Sword
 *   ◆Comment：If Reid has equipped the Potion Sword
 * ：       ：<Condition Met>
 *   ◆
 * ：End
 * ◆Comment：</Page Conditions>
 * 
 * If Reid has the "Potion Sword" weapon equipped, then the additional custom
 * page conditions are met and the event page will be present/active.
 * 
 * If this is a troop condition, the troop page event will activate.
 * 
 * If this is a common event, there will be a parallel common event active.
 * 
 * ---
 *
 * === Event and Event Page Notetags ===
 *
 * The following notetags have comment tag variants (with a few exceptions).
 * If a notetag is used for an event, it will affect the event constantly.
 * If a comment tag is used, it will only affect the page the comment tag is
 * on and only that page.
 *
 * ---
 *
 * <Activation Region: x>
 * <Activation Regions: x,x,x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Allows this event to be remotely activated as long as the player is
 *   standing within a tile marked by a designated region.
 * - Replace 'x' with the regions you wish to remotely activate this event in.
 *   - Action Button: Player must press OK while being in the region.
 *   - Player/Event Touch: Player must step onto the region.
 *   - Autorun/Parallel: Player be in the region.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * - NOTE: This cannot be used with any other activation tags.
 *
 * ---
 *
 * <Activation Square: x>
 * <Activation Radius: x>
 * <Activation Row: x>
 * <Activation Column: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Allows this event to be remotely activated as long as the player is
 *   within range of its activation type.
 * - Replace 'x' with a number stating the range in tiles.
 *   - Square: A square-shaped range with the event at the center.
 *   - Radius: A diamond-shaped range with the event at the center.
 *   - Row: Spans horizontally across the map. 'x' expands up and down.
 *   - Column: Spans vertically across the map. 'x' expands left and right.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * - NOTE: This cannot be used with any other activation tags.
 *
 * ---
 *
 * <Always Update Movement>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Events normally have to be within screen range for them to update their
 *   self movement. If this tag is present, the event is always updating.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Click Trigger>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Allows this event to activate upon being clicked on with the mouse.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Copy Event: Map x, Event y>
 * <Copy Event: x, y>
 *
 * <Copy Event: template>
 *
 * - Used for: Event Notetags ONLY
 * - Makes this event copy all of the event settings from a different event
 *   that can be found on a different map (as long as that map is registered
 *   inside of Plugin Parameters => Event Template Settings => Preloaded Maps).
 * - Replace 'x' with a number representing the copied event's Map ID.
 * - Replace 'y' with a number representing the copied event's Event ID.
 * - For the 'template' variant, replace 'template' with the name of the
 *   template made in Plugin Parameters => Event Template Settings =>
 *   Event Template List.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Hitbox Left: x>
 * <Hitbox Right: x>
 * <Hitbox Up: x>
 * <Hitbox Down: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Replace 'x' with a number to extend the hitbox of the event by that many
 *   tiles towards the listed direction.
 * - Use multiples of this notetag to extend them to different directions.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Icon: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Replace 'x' with the Icon ID you wish to put above this event.
 * - This will not override any Icons designated to the ID through a
 *   Plugin Command.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Icon Buffer X: +x>
 * <Icon Buffer X: -x>
 *
 * <Icon Buffer Y: +x>
 * <Icon Buffer Y: -x>
 *
 * <Icon Buffer: +x, +y>
 * <Icon Buffer: -x, -y>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Allows you to adjust the positions of the icon on the envent by buffers.
 * - Replace 'x' and 'y' with the values to adjust the position buffers by.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Icon Blend Mode: Normal>
 * <Icon Blend Mode: Additive>
 * <Icon Blend Mode: Multiply>
 * <Icon Blend Mode: Screen>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Sets the blend mode for the icon on the event.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Label: text>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Puts a label over the event's head displaying 'text'.
 * - Text codes can be used.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Label>
 * text
 * text
 * </Label>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Puts a label over the event's head displaying 'text'.
 * - This can display multiple lines.
 * - Text codes can be used.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Label Range: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Sets a range requirement for the player to be in order for the event's
 *   label to appear.
 * - Replace 'x' with a number value depicting the range in tiles.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Label Offset X: +x>
 * <Label Offset X: -x>
 *
 * <Label Offset Y: +x>
 * <Label Offset Y: -x>
 *
 * <Label Offset: +x, +y>
 * <Label Offset: -x, -y>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Allows you to adjust the positions of the label on the envent by offsets.
 * - Replace 'x' and 'y' with the values to adjust the position offsets by.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 * 
 * <Move Only Region: x>
 * <Move Only Regions: x,x,x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Sets the move range of this event to only the region(s) marked by the
 *   notetag(s) or comment tag(s).
 * - This will bypass terrain passability.
 * - This will not bypass event collision.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 * 
 * ---
 *
 * <Move Synch Target: Player>
 *
 * <Move Synch Target: Event x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Synchronizes the movement of this event with a target (either the player
 *   or another event). This event will only move whenever the synchronized
 *   target moves.
 * - For 'Event x' variant, replace 'x' with the ID of the event to synch to.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Move Synch Type: Random>
 * <Move Synch Type: Approach>
 * <Move Synch Type: Away>
 * <Move Synch Type: Custom>
 *
 * <Move Synch Type: Mimic>
 * <Move Synch Type: Reverse Mimic>
 *
 * <Move Synch Type: Mirror Horizontal>
 * <Move Synch Type: Mirror Vertical>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Choose the type of movement the event will have if it is synchronized to
 *   a target.
 *   - Random: Move to a random position.
 *   - Approach: Approaches target.
 *   - Away: Flees from target.
 *   - Custom: Follows a custom move route.
 *   - Mimic: Imitates the target's movement style.
 *   - Reverse Mimic: Does the opposite of the target's movement.
 *   - Mirror Horizontal: Moves as if a mirror is placed horizontally.
 *   - Mirror Vertical: Moves as if a mirror is placed vertically.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Move Synch Delay: x>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - If this tag is present, the event will wait a bit after each move before
 *   moving again.
 * - Replace 'x' with the number of movement instances in between.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 * 
 * <Random Move Weight: x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - If this tag is used on an event with random-type autonomous movement, then
 *   the event will stick closer to their home location (where they are located
 *   upon spawning on the map). How close they stick to their home location
 *   will depend on the weighted 'x' value.
 * - Replace 'x' with a number between 0 and 1. Numbers closer to 0 give the
 *   event more freedom when moving randomly while numbers closer to 1 cause
 *   the event to stick closer to their home position.
 * 
 * ---
 * 
 * <True Random Move>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - If this tag is used on an event with random-type autonomous movement, then
 *   that event will ignore the effects of weighted randomized movement.
 * 
 * ---
 *
 * <Save Event Location>
 *
 * - Used for: Event Notetags ONLY
 * - Saves the locations of the event on the map so that when you return to
 *   that map at a later point, the event will be in the position it was
 *   last in.
 *
 * ---
 *
 * <Hide Shadow>
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Hides the shadow for the event.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Shadow Filename: filename>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Replaces the shadow graphic used with 'filename' found in the
 *   img/system/ project folder.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Sprite Offset X: +x>
 * <Sprite Offset X: -x>
 *
 * <Sprite Offset Y: +x>
 * <Sprite Offset Y: -x>
 *
 * <Sprite Offset: +x, +y>
 * <Sprite Offset: -x, -y>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Changes how much the event's sprite is visibly offset by.
 * - Replace 'x' and 'y' with numbers indicating the offset in pixels.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
 *
 * ---
 *
 * <Step Pattern: Left to Right>
 * <Step Pattern: Right to Left>
 *
 * <Step Pattern: Spin Clockwise>
 * <Step Pattern: Spin CW>
 *
 * <Step Pattern: Spin CounterClockwise>
 * <Step Pattern: Spin CCW>
 * <Step Pattern: Spin AntiClockwise>
 * <Step Pattern: Spin ACW>
 *
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Changes the way the event animates if a tag is present.
 *   - Left to Right: Makes the event sprite's step behavior go from frame 0 to
 *     1 to 2, then back to 0 instead of looping backward.
 *   - Right to Left: Makes the event sprite's step behavior go from frame 2 to
 *     1 to 0, then back to 2 instead of looping forward.
 *   - Spin Clockwise: Makes the event sprite's step behavior spin CW.
 *   - Spin CounterClockwise: Makes the event sprite's step behavior spin CCW.
 * - If this is placed in a notetag, the effect will be present across
 *   all event pages used.
 * - If this is placed inside a page's comment, the effect will only occur
 *   if that event page is currently active.
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
 * === Auto Movement Plugin Commands ===
 * 
 * ---
 *
 * Auto Movement: Events
 * - Allow/stop events from auto movement.
 *
 *   Value:
 *   - Allow events to move automatically?
 *
 * ---
 * 
 * === Call Event Plugin Commands ===
 * 
 * ---
 *
 * Call Event: Remote Activation
 * - Runs the page of a different event remotely.
 *
 *   Map ID:
 *   - Target event's map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the event to remotely run.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Page ID:
 *   - The page of the remote event to run.
 *   - You may use JavaScript code.
 *
 * ---
 * 
 * === Dash Plugin Commands ===
 * 
 * ---
 *
 * Dash Enable: Toggle
 * - Enable/Disable Dashing on maps.
 *
 *   Value:
 *   - What do you wish to change dashing to?
 *
 * ---
 * 
 * === Event Icon Plugin Commands ===
 * 
 * ---
 *
 * Event Icon: Change
 * - Change the icon that appears on an event.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Icon Index:
 *   - Icon index used for the icon.
 *   - You may use JavaScript code.
 *
 *   Buffer X:
 *   - How much to shift the X position by?
 *   - You may use JavaScript code.
 *
 *   Buffer Y:
 *   - How much to shift the Y position by?
 *   - You may use JavaScript code.
 *
 *   Blend Mode:
 *   - What kind of blend mode do you wish to apply to the icon sprite?
 *
 * ---
 *
 * Event Icon: Delete
 * - Delete the icon that appears on an event.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 * ---
 * 
 * === Event Label Plugin Commands ===
 * 
 * ---
 *
 * Event Label: Refresh
 * - Refresh all Event Labels on screen.
 * - This is used to refresh page conditions for map changes that don't
 *   force a refresh.
 *
 * ---
 *
 * Event Label: Visible
 * - Change the visibility of Event Labels.
 *
 *   Visibility:
 *   - What do you wish to change visibility to?
 *
 * ---
 * 
 * === Event Location Plugin Commands ===
 * 
 * ---
 *
 * Event Location: Save
 * - Memorize an event's map location so it reappears there the next time the
 *   map is loaded.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * Event Location: Delete
 * - Deletes an event's saved map location.
 * - The event will reappear at its default location.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *   
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * Event Location: Create
 * - Creates a custom spawn location for a specific map's event so it appears
 *   there the next time the map is loaded.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   X Coordinate:
 *   - The X coordinate of the event.
 *   - You may use JavaScript code.
 *
 *   Y Coordinate:
 *   - The Y coordinate of the event.
 *   - You may use JavaScript code.
 *
 *   Direction:
 *   - The direction the event will be facing.
 *
 *   Optional:
 *
 *     Page ID:
 *     - The page of the event to set the move route to.
 *     - You may use JavaScript code.
 *
 *     Move Route Index:
 *     - The point in the move route for this event to be at if the page ID
 *       matches the rest of the page conditions.
 *
 * ---
 * 
 * === Event Timer Plugin Commands ===
 * 
 * ---
 *
 * Event Timer: Change Speed
 * - Changes the timer frame decrease (or increase) speed.
 *
 *   Speed:
 *   - How many 1/60ths of a second does each frame increase or decrease by?
 *   - Negative decreases.
 *   - Positive increases.
 *   - JavaScript allowed.
 *
 * ---
 *
 * Event Timer: Expire Event Assign
 * - Sets a Common Event to run upon expiration.
 * - Bypasses the default code if one is set.
 *
 *   Common Event ID:
 *   - Select the Common Event to run upon the timer's expiration.
 *
 * ---
 *
 * Event Timer: Expire Event Clear
 * - Clears any set to expire Common Event and instead, run the default
 *   Game_Timer expiration code.
 *
 * ---
 *
 * Event Timer: Frames Gain
 * - Chooses how many frames, seconds, minutes, or hours are gained or lost for
 *   the event timer.
 *
 *   Frames:
 *   - How many 1/60ths of a second are gained/lost?
 *   - Positive for gain.
 *   - Negative for lost.
 *   - JavaScript allowed.
 *
 *   Seconds:
 *   - How many seconds are gained/lost?
 *   - Positive for gain.
 *   - Negative for lost.
 *   - JavaScript allowed.
 *
 *   Minutes:
 *   - How many minutes are gained/lost?
 *   - Positive for gain.
 *   - Negative for lost.
 *   - JavaScript allowed.
 *
 *   Hours:
 *   - How many hours are gained/lost?
 *   - Positive for gain.
 *   - Negative for lost.
 *   - JavaScript allowed.
 *
 * ---
 *
 * Event Timer: Frames Set
 * - Chooses how many frames, seconds, minutes, or hours are set for the event
 *   timer.
 *
 *   Frames:
 *   - Set frame count to this value.
 *   - Each frame is 1/60th of a second.
 *   - JavaScript allowed.
 *
 *   Seconds:
 *   - Set seconds to this value.
 *   - JavaScript allowed.
 *
 *   Minutes:
 *   - Set minutes to this value.
 *   - Each minute is 60 seconds.
 *   - JavaScript allowed.
 *
 *   Hours:
 *   - Set hours to this value.
 *   - Each hour is 60 minutes.
 *   - JavaScript allowed.
 *
 * ---
 *
 * Event Timer: Pause
 * - Pauses the current event timer, but does not stop it.
 *
 * ---
 *
 * Event Timer: Resume
 * - Resumes the current event timer from the paused state.
 *
 * ---
 * 
 * === Follower Control Plugin Commands ===
 * 
 * ---
 *
 * Follower: Set Global Chase
 * - Disables all followers from chasing the player or reenables it.
 *
 *   Chase:
 *   - Sets all followers to chase the player or not.
 *
 * ---
 *
 * Follower: Set Target Chase
 * - Disables target follower from chasing the player or reenables it.
 *
 *   Follower ID:
 *   - Select which follower ID to disable/reenable chasing for.
 *
 *   Chase:
 *   - Sets target follower to chase its target or not.
 *
 * ---
 *
 * Follower: Set Control
 * - Sets the event commands to target a follower when "Player" is selected as
 *   the target.
 *
 *   Follower ID:
 *   - Select which follower ID to control.
 *   - 0 is the player.
 *
 * ---
 *
 * Follower: Reset
 * - Resets all follower controls. Event Commands that target the "Player"
 *   return to normal and followers chase again.
 *
 * ---
 * 
 * === Global Switch Plugin Commands ===
 * 
 * ---
 * 
 * Global Switch: Get Self Switch A B C D
 * - Gets the current ON/OFF value from a Self Switch and stores it onto a
 *   Global Switch.
 * 
 *   Map ID:
 *   - The map the source map. Use 0 for current map.
 *   - You may use JavaScript code.
 * 
 *   Event ID:
 *   - The ID of the source event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 * 
 *   Letter:
 *   - Letter of the target event's Self Switch to obtain data from.
 * 
 *   -
 * 
 *   Target Switch ID:
 *   - The ID of the target switch.
 * 
 * ---
 * 
 * Global Switch: Get Self Switch ID
 * - Gets the current ON/OFF value from a Self Switch and stores it onto a
 *   Global Switch.
 * 
 *   Map ID:
 *   - The map the source map. Use 0 for current map.
 *   - You may use JavaScript code.
 * 
 *   Event ID:
 *   - The ID of the source event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 * 
 *   Switch ID:
 *   - The ID of the source switch.
 * 
 *   -
 * 
 *   Target Switch ID:
 *   - The ID of the target switch.
 * 
 * ---
 * 
 * === Global Variable Plugin Commands ===
 * 
 * ---
 * 
 * Global Variable: Get Self Variable ID
 * - Gets the current stored value from a Self Variable and stores it onto a
 *   Global Variable.
 * 
 *   Map ID:
 *   - The map the source map. Use 0 for current map.
 *   - You may use JavaScript code.
 * 
 *   Event ID:
 *   - The ID of the source event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 * 
 *   Variable ID:
 *   - The ID of the source variable.
 * 
 *   -
 * 
 *   Target Variable ID:
 *   - The ID of the target variable.
 * 
 * ---
 * 
 * === Morph Event Plugin Commands ===
 * 
 * ---
 *
 * Morph Event: Change
 * - Runs the page of a different event remotely.
 *
 *   Step 1:
 *
 *     Map ID:
 *     - Target event's map. Use 0 for current map.
 *     - You may use JavaScript code.
 *
 *     Event ID:
 *     - The ID of the target event.
 *     - Use 0 for current event.
 *     - You may use JavaScript code.
 *
 *   Step 2:
 *
 *     Template Name:
 *     - Name of the target event template to morph into.
 *     - Ignored if this is called "Untitled".
 *
 *     Map ID:
 *     - Target event's map. Use 0 for current map.
 *     - You may use JavaScript code.
 *
 *     Event ID:
 *     - The ID of the target event.
 *     - Use 0 for current event.
 *     - You may use JavaScript code.
 *
 *     Preserve Morph:
 *     - Is the morph effect preserved?
 *     - Or does it expire upon leaving the map?
 *
 * ---
 *
 * Morph Event: Remove
 * - Remove the morph status of an event.
 *
 *   Map ID:
 *   - Target event's map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the event to remotely run.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Remove Preservation:
 *   - Also remove the preservation effect?
 *
 * ---
 * 
 * === Player Icon Plugin Commands ===
 * 
 * ---
 *
 * Player Icon: Change
 * - Change the icon that appears on on the player.
 *
 *   Icon Index:
 *   - Icon index used for the icon.
 *   - You may use JavaScript code.
 *
 *   Buffer X:
 *   - How much to shift the X position by?
 *   - You may use JavaScript code.
 *
 *   Buffer Y:
 *   - How much to shift the Y position by?
 *   - You may use JavaScript code.
 *
 *   Blend Mode:
 *   - What kind of blend mode do you wish to apply to the icon sprite?
 *
 * ---
 *
 * Player Icon: Delete
 * - Delete the icon that appears on the player.
 *
 * ---
 * 
 * === Player Movement Plugin Commands ===
 * 
 * ---
 * 
 * Player Movement: Control
 * - Enable or disable player control over the player character's movement.
 * 
 *   Enable?:
 *   - Let the player control where the player character moves?
 * 
 * ---
 * 
 * Player Movement: Diagonal
 * - Override settings to for player diagonal movement.
 * 
 *   Setting:
 *   - How do you want to change diagonal movement?
 *   - Default: Whatever the Map Uses
 *   - Forcefully Disable Diagonal Movement
 *   - Forcefully Enable Diagonal Movement
 * 
 * ---
 * 
 * === Self Switch Plugin Commands ===
 * 
 * ---
 *
 * Self Switch: A B C D
 * - Change the Self Switch of a different event.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Letter:
 *   - Letter of the target event's Self Switch to change.
 *
 *   Value:
 *   - What value do you want to set the Self Switch to?
 *
 * ---
 *
 * Self Switch: Switch ID
 * - Change the Self Switch of a different event.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Switch ID:
 *   - The ID of the target switch.
 *
 *   Value:
 *   - What value do you want to set the Self Switch to?
 *
 * ---
 * 
 * === Self Variable Plugin Commands ===
 * 
 * ---
 *
 * Self Variable: Variable ID
 * - Change the Self Variable of a different event.
 *
 *   Map ID:
 *   - The map the target map. Use 0 for current map.
 *   - You may use JavaScript code.
 *
 *   Event ID:
 *   - The ID of the target event.
 *   - Use 0 for current event.
 *   - You may use JavaScript code.
 *
 *   Variable ID:
 *   - The ID of the target variable.
 *
 *   Value:
 *   - What value do you want to set the Self Switch to?
 *
 * ---
 * 
 * === Spawn Event Plugin Commands ===
 * 
 * ---
 *
 * Spawn Event: Spawn At X, Y
 * - Spawns desired event at X, Y location on the current map.
 *
 *   Step 1:
 *
 *     Template Name:
 *     - Name of the target event template to spawn as.
 *     - Ignored if this is called "Untitled".
 *
 *     Map ID:
 *     - Target event's map to be used as reference.
 *     - You may use JavaScript code.
 *
 *     Event ID:
 *     - The ID of the target event to be used as reference.
 *     - You may use JavaScript code.
 *
 *   Step 2:
 *
 *     X Coordinate:
 *     - Target Location to spawn at.
 *     - You may use JavaScript code.
 *
 *     Y Coordinate:
 *     - Target Location to spawn at.
 *     - You may use JavaScript code.
 *
 *     Check Event Collision:
 *     - Check collision with any other events and player?
 *
 *     Check Passability:
 *     - Check passability of the target location.
 *
 *     Preserve Spawn:
 *     - Is the spawned event preserved?
 *     - Or does it expire upon leaving the map?
 *
 *   Step 3:
 *
 *     Success Switch ID:
 *     - Target switch ID to record spawning success.
 *     - Ignore if ID is 0. OFF means failed. ON means success.
 *
 * ---
 *
 * Spawn Event: Spawn At Region
 * - Spawns desired event at a random region-marked location on the
 *   current map.
 *
 *   Step 1:
 *
 *     Template Name:
 *     - Name of the target event template to spawn as.
 *     - Ignored if this is called "Untitled".
 *
 *     Map ID:
 *     - Target event's map to be used as reference.
 *     - You may use JavaScript code.
 *
 *     Event ID:
 *     - The ID of the target event to be used as reference.
 *     - You may use JavaScript code.
 *
 *   Step 2:
 *
 *     Region ID(s):
 *     - Pick region(s) to spawn this event at.
 *
 *     Check Event Collision:
 *     - Check collision with any other events and player?
 *
 *     Check Passability:
 *     - Check passability of the target location.
 *
 *     Preserve Spawn:
 *     - Is the spawned event preserved?
 *     - Or does it expire upon leaving the map?
 *
 *   Step 3:
 *
 *     Success Switch ID:
 *     - Target switch ID to record spawning success.
 *     - Ignore if ID is 0. OFF means failed. ON means success.
 *
 * ---
 *
 * Spawn Event: Spawn At Terrain Tag
 * - Spawns desired event at a random terrain tag-marked location on the
 *   current map.
 *
 *   Step 1:
 *
 *     Template Name:
 *     - Name of the target event template to spawn as.
 *     - Ignored if this is called "Untitled".
 *
 *     Map ID:
 *     - Target event's map to be used as reference.
 *     - You may use JavaScript code.
 *
 *     Event ID:
 *     - The ID of the target event to be used as reference.
 *     - You may use JavaScript code.
 *
 *   Step 2:
 *
 *     Terrain Tag(s):
 *     - Pick terrain tag(s) to spawn this event at.
 *     - Insert numbers between 0 and 7.
 *
 *     Check Event Collision:
 *     - Check collision with any other events and player?
 *
 *     Check Passability:
 *     - Check passability of the target location.
 *
 *     Preserve Spawn:
 *     - Is the spawned event preserved?
 *     - Or does it expire upon leaving the map?
 *
 *   Step 3:
 *
 *     Success Switch ID:
 *     - Target switch ID to record spawning success.
 *     - Ignore if ID is 0. OFF means failed. ON means success.
 *
 * ---
 *
 * Spawn Event: Despawn Event ID
 * - Despawns the selected Event ID on the current map.
 *
 *   Event ID
 *   - The ID of the target event.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * Spawn Event: Despawn At X, Y
 * - Despawns any spawned event(s) at X, Y location on the current map.
 *
 *   X Coordinate:
 *   - Target Location to despawn at.
 *   - You may use JavaScript code.
 *
 *   Y Coordinate:
 *   - Target Location to despawn at.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * Spawn Event: Despawn Region(s)
 * - Despawns the selected Region(s) on the current map.
 *
 *   Region ID(s):
 *   - Pick region(s) and despawn everything inside it.
 *
 * ---
 *
 * Spawn Event: Despawn Terrain Tag(s)
 * - Despawns the selected Terrain Tags(s) on the current map.
 *
 *   Terrain Tag(s):
 *   - Pick terrain tag(s) and despawn everything inside it.
 *   - Insert numbers between 0 and 7.
 *
 * ---
 *
 * Spawn Event: Despawn Everything
 * - Despawns all spawned events on the current map.
 *
 * ---
 *
 * ============================================================================
 * Move Route Custom Commands
 * ============================================================================
 *
 * Some custom commands have been added to the "Set Movement Route" event
 * command. These can be accessed by pressing the "Script..." command and
 * typing in the following, which don't need to be in code form.
 *
 * Keep in mind that since these are custom additions and RPG Maker MZ does not
 * allow plugins to modify the editor, the "Preview" button will not factor in
 * the effects of these commands.
 * 
 * If you wish to use a value from a variable, insert $gameVariables.value(x)
 * or \V[x] in place of the x in any of the below.
 * 
 * If you wish to use a value from a self variable, insert \SelfVar[x] in place
 * of the x in any of the below. This will only draw from the current event. If
 * you wish to draw data from outside event self variables, we recommend you
 * use the \V[x] variant after using the Plugin Commands to draw data from them
 * for the best accuracy.
 *
 * ---
 * 
 * Animation: x
 * - Replace 'x' with the ID of the animation to play on moving unit.
 *
 * ---
 * 
 * Balloon: name
 * - Replace 'name' with any of the following to play a balloon on that the
 *   target moving unit.
 * - '!', '?', 'Music Note', 'Heart', 'Anger', 'Sweat', 'Cobweb', 'Silence',
 *   'Light Bulb', 'Sleep', 'User-Defined 1', 'User-Defined 2',
 *   'User-Defined 3', 'User-Defined 4', 'User-Defined 5'
 *    - Do NOT insert quotes.
 * - Examples:
 *   - Balloon: !
 *   - Balloon: Sleep
 *   - Balloon: Heart
 *
 * ---
 * 
 * Fade In: x
 * Fade Out: x
 * - Fades in/out the sprite's opacity.
 * - Fade In will continuously raise the opacity level until it reaches 255.
 * - Fade Out will continuously lower the opacity level until it reaches 0.
 * - Replace 'x' with the speed to fade in/out the sprite.
 * 
 * ---
 * 
 * Force Carry: On
 * Force Carry: Off
 * - For usage with the VS8 sprite sheet.
 * - Use ON to turn force carrying on.
 * - Use OFF to turn force carrying off.
 * - Sprites using the VS8 sprite sheet will also show the VS8 Carry frames.
 * 
 * ---
 * 
 * Force Dash: On
 * Force Dash: Off
 * - Use ON to turn force dashing on.
 * - Use OFF to turn force dashing off.
 * - Forces dashing will prompt the player or event to be in the dashing state.
 * - Sprites using the VS8 sprite sheet will also show the VS8 Dashing frames.
 * 
 * ---
 * 
 * Hug: Left
 * Hug: Right
 * - Causes the moving unit to hug the left/right side of the wall.
 *
 * ---
 * 
 * Index: x
 * - Replace 'x' with a number depicting the character index to change the
 *   moving unit's sprite to.
 *
 * ---
 * 
 * Index: +x
 * Index: -x
 * - Replace 'x' with the value to change the character index of the moving
 *   unit's sprite by.
 *
 * ---
 * 
 * Jump Forward: x
 * - Replace 'x' with the number of tiles for the unit to jump forward by.
 *
 * ---
 * 
 * Jump To: x, y
 * - Replace 'x' and 'y' with the coordinates for the unit to jump to.
 *
 * ---
 * 
 * Jump to Event: x
 * - Replace 'x' with the ID of the event for the unit to jump to.
 *
 * ---
 * 
 * Jump to Player
 * - Causes the moving unit to jump to the player.
 *
 * ---
 * 
 * Move Lower Left Until Stop
 * Move Down Until Stop
 * Move Lower Right Until Stop
 * Move Left Until Stop
 * Move Right Until Stop
 * Move Upper Left Until Stop
 * Move Up Until Stop
 * Move Upper Right Until Stop
 * - Causes the moving unit to move that direction until it hits a stop.
 * - Events will stop moving before they make contact with the player.
 *
 * ---
 * 
 * Crash Move Lower Left Until Stop
 * Crash Move Down Until Stop
 * Crash Move Lower Right Until Stop
 * Crash Move Left Until Stop
 * Crash Move Right Until Stop
 * Crash Move Upper Left Until Stop
 * Crash Move Up Until Stop
 * Crash Move Upper Right Until Stop
 * - Causes the moving unit to move that direction until it hits a stop.
 * - Events can crash into the player and trigger an event.
 *
 * ---
 * 
 * Move To: x, y
 * - Replace 'x' and 'y' with the map coordinates to move the unit to through
 *   pathfinding.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * - Events will go around the player.
 *
 * ---
 * 
 * Crash Move To: x, y
 * - Replace 'x' and 'y' with the map coordinates to move the unit to through
 *   pathfinding.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * - Events can crash into the player and trigger an event.
 *
 * ---
 * 
 * Move to Event: x
 * - Replace 'x' with the ID of the event to move the unit to.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * - Events will go around the player.
 *
 * ---
 * 
 * Crash Move to Event: x
 * - Replace 'x' with the ID of the event to move the unit to.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 * - Events can crash into the player and trigger an event.
 *
 * ---
 * 
 * Move to Player
 * - Moves the unit to the player.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Move Lower Left: x
 * Move Down: x
 * Move Lower Right: x
 * Move Left: x
 * Move Right: x
 * Move Upper Left: x
 * Move Up: x
 * Move Upper Right: x
 * - Replace 'x' with the number of times to move the unit by in the designated
 *   direction on the map.
 * - Events can crash into the player and trigger an event.
 *
 * ---
 * 
 * Opacity: x%
 * - Replace 'x' with the percentage to change the unit's sprite opacity to.
 *
 * ---
 * 
 * Opacity: +x
 * Opacity: -x
 * - Replace 'x' with the increment to change the unit's sprite opacity by.
 *
 * ---
 *
 * Pattern Lock: x
 * - Replace 'x' with the step pattern to lock the unit's sprite to.
 *
 * ---
 *
 * Pattern Unlock
 * - Removes pattern lock effect.
 *
 * ---
 * 
 * Pose: name
 * - If using a VS8 sprite, this will cause the unit to strike a pose.
 * - Replace 'name' with any the following:
 * - 'Item', 'Hmph', 'Victory', 'Hurt', 'Kneel', 'Collapse',
 *   '!', '?', 'Music Note', 'Heart', 'Anger', 'Sweat', 'Cobweb', 'Silence',
 *   'Light Bulb', 'Sleep'
 *    - Do NOT insert quotes.
 * - Examples:
 *   - Balloon: Item
 *   - Balloon: Victory
 *   - Balloon: ?
 *
 * ---
 * 
 * Step Toward: x, y
 * - Replace 'x' and 'y' for the desired coordinates for the unit to take one
 *   step towards.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Toward Event: x
 * - Replace 'x' with the ID of the event for the unit to take one step to.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Toward Player
 * - Causes event to take one step towards the player.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Away From: x, y
 * - Replace 'x' and 'y' for the desired coordinates for the unit to take one
 *   step away from.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Away From Event: x
 * - Replace 'x' with the ID of the event for the unit to take one step from.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Step Away From Player
 * - Causes event to take one step away from the player.
 * - This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
 *   not expect the most optimal results.
 *
 * ---
 * 
 * Turn To: x, y
 * - Replace 'x' and 'y' for the coordinates to make the unit face towards.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn to Event: x
 * - Replace 'x' with the ID of the event to turn the unit towards.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn to Player
 * - Causes the unit to turn towards the player.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn Away From: x, y
 * - Replace 'x' and 'y' for the coordinates to make the unit face away from.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn Away From Event: x
 * - Replace 'x' with the ID of the event to turn the unit away from.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn Away From Player
 * - Causes the unit to turn away from the player.
 * - This supports 8 directional turning.
 *
 * ---
 * 
 * Turn Lower Left
 * Turn Lower Right
 * Turn Upper Left
 * Turn Upper Right
 * - Causes the unit to turn to one of the diagonal directions.
 *
 * ---
 * 
 * Self Switch x: On
 * Self Switch x: Off
 * Self Switch x: Toggle
 * - Replace 'x' with 'A', 'B', 'C', 'D', or a <Self> Switch ID to adjust the
 *   unit's Self Switch.
 *
 * ---
 * 
 * Self Variable x: y
 * - Replace 'x' with a <Self> Variable ID to adjust the unit's Self Variable.
 * - Replace 'y' with a number value to set the Self Variable to.
 *
 * ---
 * 
 * Teleport To: x, y
 * - Replace 'x' and 'y' with the coordinates to instantly move the unit to.
 *
 * ---
 * 
 * Teleport to Event: x
 * - Replace 'x' with the ID of the event to instantly move the unit to.
 *
 * ---
 * 
 * Teleport to Player
 * - Instantly moves the unit to the player's location.
 *
 * ---
 * 
 * If none of the commands are detected above, then a script call will be ran.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Event Label Settings
 * ============================================================================
 *
 * Event Labels are small windows created to display text over an event's head.
 * They're set up using the <Label> notetags and/or comment tags. Event Labels
 * are a great way to instantly relay information about the event's role to
 * the player.
 *
 * ---
 *
 * Event Labels
 * 
 *   Font Size:
 *   - The font size used for the Event Labels.
 * 
 *   Icon Size:
 *   - The size of the icons used in the Event Labels.
 * 
 *   Line Height:
 *   - The line height used for the Event Labels.
 * 
 *   Offset X:
 *   - Globally offset all labels horizontally by this amount.
 * 
 *   Offset Y:
 *   - Globally offset all labels vertically by this amount.
 * 
 *   Fade Speed:
 *   - Fade speed for labels.
 * 
 *   Visible Range:
 *   - Range the player has to be within the event to make its label visible.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Event Icon Settings
 * ============================================================================
 *
 * Icons can be displayed over an event's head through the <Icon> notetags
 * and/or comment tags. These can be used for a variety of things such as
 * making them look like they're carrying an item or to indicate they have a
 * specific role.
 *
 * ---
 *
 * Event Icon
 * 
 *   Buffer X:
 *   - Default X position buffer for event icons.
 * 
 *   Buffer Y:
 *   - Default Y position buffer for event icons.
 * 
 *   Blend Mode:
 *   - Default blend mode for even icons.
 *     - 0 - Normal
 *     - 1 - Additive
 *     - 2 - Multiply
 *     - 3 - Screen
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Event Template Settings
 * ============================================================================
 *
 * Event Templates allow you to store specific maps and/or event data to bring
 * out on need while having a premade set base. They're similar to prefabs but
 * aren't things that can be altered individually as one setting for an event
 * template will serve as a blueprint for all of them that use them.
 *
 * Event Templates are used for the <Copy Event> notetags, the Morph Event and
 * Spawn Event Plugin Commands.
 *
 * ---
 *
 * Settings
 * 
 *   Preloaded Maps:
 *   - A list of all the ID's of the maps that will be preloaded to serve as
 *     template maps for this plugin.
 *
 * ---
 *
 * Templates
 * - A list of all the Event Templates used by this project. Used for notetags
 *   and Plugin Commands.
 * 
 *     Name:
 *     - Name of the template. It'll be used as anchor points for notetags and
 *       Plugin Commands.
 * 
 *     Map ID:
 *     - ID of the map the template event is stored on.
 *     - This will automatically add this ID to preloaded list.
 * 
 *     Event ID:
 *     - ID of the event the template event is based on.
 * 
 *     JavaScript:
 *       JS: Pre-Copy:
 *       JS: Post-Copy:
 *       JS: Pre-Morph:
 *       JS: Post-Morph:
 *       JS: Pre-Spawn:
 *       JS: Post-Spawn:
 *       - Code that's ran during certain circumstances.
 *       - The code will occur at the same time as the ones listed in the main
 *         Event Template Settings Plugin Parameters. However, the ones listed
 *         in these individual entries will only occur for these specific
 *         templates and only if the templates are used.
 *
 * ---
 *
 * JavaScript
 * 
 *   JS: Pre-Copy:
 *   JS: Post-Copy:
 *   JS: Pre-Morph:
 *   JS: Post-Morph:
 *   JS: Pre-Spawn:
 *   JS: Post-Spawn:
 *   - Code that's ran during certain circumstances.
 *   - These are global and are ran for all copies, morphs, and/or spawns.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Movement Settings
 * ============================================================================
 *
 * These plugin parameters allow you to control how movement works in your
 * game, toggling it from 4-directional to 8-directional, setting up rules to
 * stop self-movement from events while an event or message is present, and
 * other aesthetics such as tilting the sprite while dashing, setting shadows
 * beneath the sprites, and allow for turning in place.
 *
 * ---
 *
 * 8 Directional Movement
 * 
 *   Enable:
 *   - Allow 8-directional movement by default? Players can move diagonally.
 * 
 *   Strict Collision:
 *   - Enforce strict collission rules where the player must be able to pass
 *     both cardinal directions?
 * 
 *   Favor Horizontal:
 *   - Favor horizontal if cannot pass diagonally but can pass both
 *     horizontally and vertically?
 * 
 *   Slower Diagonals?
 *   - Enforce a slower movement speed when moving diagonally?
 * 
 *     Speed Multiplier
 *     - What's the multiplier to adjust movement speed when moving diagonally?
 *
 * ---
 *
 * Automatic Movement
 * 
 *   Stop During Events:
 *   - Stop automatic event movement while events are running.
 * 
 *   Stop During Messages:
 *   - Stop automatic event movement while a message is running.
 *
 * ---
 * 
 * Bitmap
 * 
 *   Smoothing:
 *   - Do you want to smooth or pixelate the map sprites?
 *   - Pixelating them is better for zooming and tilting.
 * 
 * ---
 *
 * Dash
 * 
 *   Dash Modifier:
 *   - Alters the dash speed modifier.
 * 
 *   Enable Dash Tilt?:
 *   - Tilt any sprites that are currently dashing?
 * 
 *     Tilt Left Amount:
 *     - Amount in radians when moving left (upper left, left, lower left).
 * 
 *     Tilt Right Amount:
 *     - Amount in radians when moving right (upper right, right, lower right).
 * 
 *     Tilt Vertical Amount:
 *     - Amount in radians when moving vertical (up, down).
 *
 * ---
 * 
 * Event Movement
 * 
 *   Random Move Weight:
 *   - Use numbers between 0 and 1.
 *   - Numbers closer to 1 stay closer to their home position.
 *   - 0 to disable it.
 * 
 * ---
 *
 * Shadows
 * 
 *   Show:
 *   - Show shadows on all events and player-related sprites.
 * 
 *   Default Filename:
 *   - Default filename used for shadows found in img/system/ folder.
 *
 * ---
 *
 * Turn in Place
 * 
 *   Enable:
 *   - When not dashing, player will turn in place before moving.
 *   - This only applies with keyboard inputs.
 * 
 *   Delay in Frames:
 *   - The number of frames to wait before moving.
 *
 * ---
 * 
 * Vehicle Speeds
 * 
 *   Boat Speed:
 *   - Allows you to adjust the base speed of the boat vehicle.
 * 
 *   Ship Speed:
 *   - Allows you to adjust the base speed of the ship vehicle.
 * 
 *   Airship Speed:
 *   - Allows you to adjust the base speed of the airship vehicle.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: VisuStella 8-Dir Settings
 * ============================================================================
 *
 * These are settings for sprite sheets using the VS8 format.
 * For more information on the VS8 format, look in the help section above.
 *
 * ---
 *
 * Balloon Icon Settings
 * 
 *   Auto-Balloon Poses:
 *   - Automatically pose VS8 sprites when using balloon icons.
 * 
 *   Balloon Offset X:
 *   - Offset balloon icons on VS8 sprites by x pixels.
 * 
 *   Balloon Offset Y:
 *   - Offset balloon icons on VS8 sprites by y pixels.
 *
 * ---
 *
 * Icons
 * 
 *   Auto Buffer:
 *   - Automatically buffer the X and Y coordinates of VS8 sprites?
 * 
 *   Use Carry Pose:
 *   - Use the carry pose when moving with an icon overhead.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Region Rulings
 * ============================================================================
 *
 * These settings allow you to decide the passability of the player, events,
 * and various vehicles through the usage of Regions.
 *
 * ---
 *
 * Allow Regions
 * 
 *   All Allow:
 *   Walk Allow:
 *   Player Allow:
 *   Event Allow:
 *   Vehicle Allow:
 *   Boat Allow:
 *   Ship Allow:
 *   Airship Allow:
 *   - Insert Region ID's where the affected unit type can enter.
 *   - Region ID's range from 0 to 255.
 *
 * ---
 *
 * Forbid Regions
 * 
 *   All Forbid:
 *   Walk Forbid:
 *   Player Forbid:
 *   Event Forbid:
 *   Vehicle Forbid:
 *   Boat Forbid:
 *   Ship Forbid:
 *   Airship Forbid:
 *   - Insert Region ID's where the affected unit type cannot enter.
 *   - Region ID's range from 0 to 255.
 *
 * ---
 *
 * Dock Regions
 * 
 *   Vehicle Dock:
 *   Boat Dock:
 *   Ship Dock:
 *   Airship Dock:
 *   - Insert Region ID's where the affected vehicle can dock
 *   - Region ID's range from 0 to 255.
 * 
 *   Only Region Dockable:
 *   - Vehicles are only able to dock at designated regions.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Common Event on OK Button
 * ============================================================================
 *
 * These Plugin Parameters allow you to setup Common Events that activate using
 * Regions when pressing the OK button while standing on top of them or in
 * front of them. These let you create near universally interactable objects
 * using Regions, such as rivers to start up fishing events or locations to
 * places items on.
 *
 * ---
 *
 * Regions
 * 
 *   Regions 1 - 255:
 *   - Which Common Event does this region activate?
 *   - Use 0 to not activate any Common Events.
 *
 * ---
 *
 * Target Tile
 * 
 *   Target Tile:
 *   - Which tile should be checked for Common Event on OK Button?
 *     - Tile in front of player.
 *     - Tile player is standing on top of.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Common Event on Touch
 * ============================================================================
 *
 * These Plugin Parameters allow you to setup Common Events that trigger when
 * stepping onto Region-marked tiles. These let you create custom effects that
 * will occur such as customized damage floors, traps, and/or events.
 * 
 * Areas marked with these regions will not allow random encounters to occur.
 * This is how RPG Maker works. Assuming you are not using plugins at all, by
 * putting on touch events all over the map, tiles with those on touch events
 * will not let random encounters trigger.
 *
 * ---
 *
 * Regions
 * 
 *   Regions 1 - 255:
 *   - Which Common Event does this region activate?
 *   - Use 0 to not activate any Common Events.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Terrain Tag Settings
 * ============================================================================
 *
 * Terrain Tags are used in Database => Tilesets to mark certain tiles and
 * give them unique properties through terrain tags.
 *
 * ---
 *
 * Terrain Tag ID's
 * 
 *   Rope:
 *   - Which terrain tag number to use for ropes?
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
 * Version 1.27: September 17, 2021
 * * Bug Fixes!
 * ** Fixed event spawn templates so that they can work properly with Common
 *    Events. Fix made by Arisu.
 * 
 * Version 1.26: September 3, 2021
 * * Bug Fixes!
 * ** "Step Towards Player" custom command should now work properly. Fix made
 *    by Arisu.
 * ** Having multiple region restriction notetags for a map will no longer
 *    cause others to lock out. Fix made by Arisu.
 * 
 * Version 1.25: July 30, 2021
 * * Bug Fixes!
 * ** Fixed a problem that caused the 'setSelfSwitchValue' and
 *    'setSelfVariableValue' functions to not work properly. Fix made by Irina.
 * 
 * Version 1.24: June 4, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Added extra clarification on which commands will go around the player
 *    character and which ones won't.
 * * New Move Route Custom Commands added by Arisu:
 * ** Crash Move (direction) Until Stop
 * ** Crash Move To: x, y
 * ** Crash Move To Event: x
 * *** These allow events to collide with the player character and trigger
 *     Event Touch events.
 * 
 * Version 1.23: May 21, 2021
 * * Bug Fixes!
 * ** Morphing by templates should no longer cause a crash. Fix made by Arisu.
 * 
 * Version 1.22: May 7, 2021
 * * Bug Fixes!
 * ** Plugin Commands for Event Label Visibility should now update without
 *    needing to take steps as per distance detection. Fix made by Arisu.
 * * Documentation Update!
 * ** Added clarity to "Common Event on Touch" Plugin Parameters.
 * *** Areas marked with these regions will not allow random encounters to
 *     occur. This is how RPG Maker works. Assuming you are not using plugins
 *     at all, by putting on touch events all over the map, tiles with those on
 *     touch events will not let random encounters trigger.
 * 
 * Version 1.21: March 12, 2021
 * * Bug Fixes!
 * ** Move until stop custom move routes should no longer cause crashes.
 *    Fix made by Arisu.
 * 
 * Version 1.20: February 26, 2021
 * * Bug Fixes!
 * ** Region Restrictions regarding Player Allow will no longer affect vehicle
 *    passability. Update made by Arisu.
 * 
 * Version 1.19: February 12, 2021
 * * Bug Fixes!
 * ** "Self Variable: Variable ID" plugin command's Map ID should now be able
 *    to use "0" to self reference the current map. Fix made by Olivia.
 * 
 * Version 1.18: February 5, 2021
 * * Bug Fixes!
 * ** Event icon plugin commands should now work properly. Fix made by Arisu.
 * * Documentation Update!
 * ** Added new "Features: Weighted Random Movement" section.
 * ** Help file updated for new features.
 * * New Features!
 * ** New Notetags added by Arisu:
 * *** <Random Move Weight: x>
 * **** If this tag is used on an event with random-type autonomous movement,
 *      then the event will stick closer to their home location (where they are
 *      located upon spawning on the map). How close they stick to their home
 *      location will depend on the weighted 'x' value.
 * *** <True Random Move>
 * **** If this tag is used on an event with random-type autonomous movement,
 *      then that event will ignore the effects of weighted randomized
 *      movement.
 * ** New Plugin Commands added by Arisu and sponsored by AndyL:
 * *** Event Timer: Change Speed
 * *** Event Timer: Expire Event Assign
 * *** Event Timer: Expire Event Clear
 * *** Event Timer: Frames Gain
 * *** Event Timer: Frames Set
 * *** Event Timer: Pause
 * *** Event Timer: Resume
 * **** The above Plugin Commands allow you to control the game timer better.
 * ** New Plugin Parameters added by Arisu:
 * *** Plugin Parameters > Movement > Event Movement > Random Move Weight
 * **** Use numbers between 0 and 1. Numbers closer to 1 stay closer to their
 *      home position.
 * 
 * Version 1.17: January 29, 2021
 * * Documentation Update!
 * ** Added "Do NOT insert quotes" to "Balloon: name" and "Pose: name".
 * ** Added Examples for extra clarification.
 * * Optimization Update!
 * ** When touch clicking an event on a map with multiple events, pathfinding
 *    will utilize the non-diagonal function for less resource consumption to
 *    prevent FPS frame drops. Fix made by Arisu.
 * 
 * Version 1.16: January 22, 2021
 * * Optimization Update!
 * ** When touch clicking multiple times on an impassable tile, pathfinding
 *    will utilize the non-diagonal function for less resource consumption to
 *    prevent FPS frame drops. Fix made by Arisu.
 * 
 * Version 1.15: January 1, 2021
 * * Bug Fixes!
 * ** Spawned events should now resume their automated self movement after
 *    being interacted with. Fix made by Yanfly.
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Help file updated for updated features.
 * * Feature Updates!
 * ** Collission checks for the Spawn Event Plugin Commands now account for
 *    the spawning event's Hitbox, too. Update made by Yanfly.
 * ** Spawn Event Plugin Commands adds a new parameter "Success Switch ID" to
 *    check if the spawning has been successful or not.
 * * New Features!
 * ** New Plugin Commands added by Yanfly!
 * *** Spawn Event: Spawn At Terrain Tag
 * *** Spawn Event: Despawn Terrain Tag(s)
 * **** These function similar to their region counterparts except they target
 *      terrain tags instead.
 * 
 * Version 1.14: December 18, 2020
 * * Bug Fixes!
 * ** Caching for event label positions now account for page index.
 *    Fix made by Yanfly.
 * * Documentation Update!
 * ** Added documentation for the new features!
 * * New Features!
 * ** New Plugin Commands added by Irina.
 * *** Follower: Set Global Chase
 * *** Follower: Set Target Chase
 * *** Follower: Set Control
 * *** Follower: Reset
 * **** These plugin commands allow you to change whether or not the followers
 *      will chase their intended targets and/or shift control over their
 *      movement route from the "Player" to the target follower.
 * 
 * Version 1.13: December 4, 2020
 * * Bug Fixes!
 * ** Caching for event label positions now account for one-screen maps.
 *    Fix made by Arisu.
 * 
 * Version 1.12: November 29, 2020
 * * Bug Fixes!
 * ** Click Triggers no longer work on erased events. Fix made by Arisu.
 * ** Erased events no longer have icons appear above their heads.
 *    Fix made by Arisu.
 * * Feature Update!
 * ** Initialization of the plugin's effects no only occur if the event's
 *    current page settings have been altered. Change made by Arisu.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.11: November 15, 2020
 * * Bug Fixes!
 * ** Morph plugin command should no longer cause crashes. Fix made by Yanfly.
 * * Documentation Update!
 * ** Added documentation for the updated features!
 * * Feature Updates!
 * ** Updates to these Plugin Commands made by Yanfly:
 * *** Call Event: Remote Activation
 * *** Event Icon: Change
 * *** Event Icon: Delete
 * *** Event Location: Create
 * *** Event Location: Delete
 * *** Global Switch: Get Self Switch A B C D
 * *** Global Switch: Get Self Switch ID
 * *** Global Variable: Get Self Variable ID
 * *** Morph Event: Change
 * *** Morph Event: Remove
 * *** Self Switch: A B C D
 * *** Self Switch: Switch ID
 * *** Self Variable: Variable ID
 * **** All of the above Plugin Commands can now use 0 for their Event ID's in
 *      order to refer to the running event's ID value.
 * 
 * Version 1.10: November 1, 2020
 * * Bug Fixes!
 * ** Spawned Event preserve function now works properly. Fix made by Arisu.
 * 
 * Version 1.09: October 25, 2020
 * * Documentation Update
 * ** Added clarity on the notetags and comment tags on when their effects
 *    are present.
 * * Feature Update!
 * ** Event icons now have an unsmoothing property to them to make them
 *    look better. Update made by Irina.
 * 
 * Version 1.08: October 11, 2020
 * * Compatibility Update
 * ** Added failsafes for better compatibility.
 * 
 * Version 1.07: October 4, 2020
 * * Documentation Update!
 * ** Updated for the new features!
 * * Feature Update!
 * ** Data from deleted events will now be cleared and removed from maps if the
 *    events do not exist to prevent conflict with plugins from the VisuStella
 *    MZ library and other plugins. Feature added by Irina.
 * ** Move Route Custom Commands now support self variable values! If you wish
 *    to use a value from a self variable, insert \SelfVar[x] in place of the x
 *    in any of the below. This will only draw from the current event. If you 
 *    wish to draw data from outside event self variables, we recommend you
 *    use the \V[x] variant after using the Plugin Commands to draw data from
 *    them for the best accuracy.
 * * New Features!
 * ** New Plugin Parameter added by Yanfly!
 * *** Movement > Bitmap > Smoothing
 * **** Do you want to smooth or pixelate the map sprites? Pixelating them is
 *      better for zooming and tilting.
 * 
 * Version 1.06: September 27, 2020
 * * Bug Fixes!
 * ** Events & Movement Core no longer disables the Core Engine's Smart Event
 *    Collision plugin parameter. Fix made by Yanfly.
 * * Documentation Update!
 * ** Move Route Custom Commands updated with the new feature for inserting
 *    variable values.
 * * Feature Update!
 * ** Move Route Custom Commands now support $gameVariable.value(x) values.
 *    You can also just use \V[x] for variable values, too. Added by Irina.
 * 
 * Version 1.05: September 20, 2020
 * * Bug Fixes!
 * ** If player movement is disabled, mouse movement is disabled, too.
 *    Fix made by Arisu.
 * ** The region restriction notetags should be fixed and work again.
 *    Fix made by Arisu.
 * 
 * Version 1.04: September 13, 2020
 * * Feature Update!
 * * Some Move Route Custom Commands are updated to ignore spaces:
 * ** Jump To: x, y
 * ** Move To: x, y
 * ** Step Toward: x, y
 * ** Step Away From: x, y
 * ** Turn To: x, y
 * ** Turn Away From: x, y
 * ** Teleport To: x, y
 * *** These can now be written as x,y. There still needs to be a space between
 *     the : and x for parsing clarity, however.
 * *** Feature updated by Arisu with help from BlueMoon and Zeriab.
 * * New Features!
 * ** New 'Move Route Custom Commands' added by Arisu.
 * *** Fade In: x
 * *** Fade Out: x
 * *** Force Carry: On
 * *** Force Carry: Off
 * *** Force Dash: On
 * *** Force Dash: Off
 * ** New Plugin Commands added by Arisu.
 * *** Player Movement: Control
 * **** Enable or disable player control over the player character's movement.
 * *** Player Movement: Diagonal
 * **** Override settings to for player diagonal movement.
 * 
 * Version 1.03: September 6, 2020
 * * Bug Fixes!
 * ** Sleeping pose is now fixed and working! Fix made by Yanfly.
 * * Documentation Update!
 * ** Extended "Features: Self Switches and Variables" to explain how to use
 *    script calls to grab self switch information.
 * * New Features!
 * ** New Plugin Commands added by Yanfly:
 * *** Global Switch: Get Self Switch A B C D
 * *** Global Switch: Get Self Switch ID
 * *** Global Variable: Get Self Variable ID
 * **** These plugin commands allow you to transfer data stored in a self
 *      switch or Self Variable into a global switch or global variable.
 * 
 * Version 1.02: August 30, 2020
 * * Bug Fixes!
 * ** <Diagonal Movement: Off> notetag now works properly. Fix made by Yanfly.
 * ** Plugin Command "Event Label: Visible" now works properly. Fix made by
 *    Shaz.
 * ** Custom Move Route commands should now be working properly. Fix made by
 *    Shaz.
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** Event Cache issues fixed upon loading a saved game. Fix made by Yanfly.
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
 * @command AutoMoveEvents
 * @text Auto Movement: Events
 * @desc Allow/stop events from auto movement.
 *
 * @arg Value:str
 * @text Value
 * @type select
 * @option Allow
 * @value Allow
 * @option Stop
 * @value Stop
 * @option Toggle
 * @value Toggle
 * @desc Allow events to move automatically?
 * @default Allow
 *
 * @ --------------------------------------------------------------------------
 *
 * @command CallEvent
 * @text Call Event: Remote Activation
 * @desc Runs the page of a different event remotely.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc Target event's map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the event to remotely run. Use 0 for current event. You may use JavaScript code.
 * @default 0
 *
 * @arg PageId:eval
 * @text Page ID
 * @desc The page of the remote event to run.
 * You may use JavaScript code.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command DashEnableToggle
 * @text Dash Enable: Toggle
 * @desc Enable/Disable Dashing on maps.
 *
 * @arg Value:str
 * @text Value
 * @type select
 * @option Enable
 * @value Enable
 * @option Disable
 * @value Disable
 * @option Toggle
 * @value Toggle
 * @desc What do you wish to change dashing to?
 * @default Enable
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventIconChange
 * @text Event Icon: Change
 * @desc Change the icon that appears on an event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent MapId:eval
 * @desc The ID of the target event.  Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg IconIndex:eval
 * @text Icon Index
 * @desc Icon index used for the icon.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg IconBufferX:eval
 * @text Buffer X
 * @parent IconIndex:eval
 * @desc How much to shift the X position by?
 * You may use JavaScript code.
 * @default 0
 *
 * @arg IconBufferY:eval
 * @text Buffer Y
 * @parent IconIndex:eval
 * @desc How much to shift the Y position by?
 * You may use JavaScript code.
 * @default 12
 *
 * @arg IconBlendMode:num
 * @text Blend Mode
 * @parent IconIndex:eval
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc What kind of blend mode do you wish to apply to the icon sprite?
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventIconDelete
 * @text Event Icon: Delete
 * @desc Delete the icon that appears on an event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent MapId:eval
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventLabelRefresh
 * @text Event Label: Refresh
 * @desc Refresh all Event Labels on screen.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventLabelVisible
 * @text Event Label: Visible
 * @desc Change the visibility of Event Labels.
 *
 * @arg Visibility:str
 * @text Visibility
 * @type select
 * @option Visible
 * @value Visible
 * @option Hidden
 * @value Hidden
 * @option Toggle
 * @value Toggle
 * @desc What do you wish to change visibility to?
 * @default Visible
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventLocationSave
 * @text Event Location: Save
 * @desc Memorize an event's map location so it reappears there
 * the next time the map is loaded.
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the target event.
 * You may use JavaScript code.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventLocationCreate
 * @text Event Location: Create
 * @desc Creates a custom spawn location for a specific map's event
 * so it appears there the next time the map is loaded.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent MapId:eval
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg PosX:eval
 * @text X Coordinate
 * @parent MapId:eval
 * @desc The X coordinate of the event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg PosY:eval
 * @text Y Coordinate
 * @parent MapId:eval
 * @desc The Y coordinate of the event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Direction:num
 * @text Direction
 * @parent MapId:eval
 * @type select
 * @option 1 - Lower Left
 * @value 1
 * @option 2 - Down
 * @value 2
 * @option 3 - Lower Right
 * @value 3
 * @option 4 - Left
 * @value 4
 * @option 6 - Right
 * @value 6
 * @option 7 - Upper Left
 * @value 7
 * @option 8 - Up
 * @value 8
 * @option 9 - Upper Right
 * @value 9
 * @desc The direction the event will be facing.
 * @default 2
 *
 * @arg Optional
 *
 * @arg PageId:eval
 * @text Page ID
 * @parent Optional
 * @desc The page of the event to set the move route to.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg MoveRouteIndex:eval
 * @text Move Route Index
 * @parent Optional
 * @desc The point in the move route for this event to be at
 * if the page ID matches the rest of the page conditions.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventLocationDelete
 * @text Event Location: Delete
 * @desc Deletes an event's saved map location.
 * The event will reappear at its default location.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerExpireEvent
 * @text Event Timer: Expire Event Assign
 * @desc Sets a Common Event to run upon expiration.
 * Bypasses the default code if one is set.
 *
 * @arg CommonEventID:num
 * @text Common Event ID
 * @type common_event
 * @desc Select the Common Event to run upon the timer's expiration.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerSpeed
 * @text Event Timer: Change Speed
 * @desc Changes the timer frame decrease (or increase) speed.
 *
 * @arg Speed:eval
 * @text Speed
 * @desc How many 1/60ths of a second does each frame increase or
 * decrease by? Negative decreases. Positive increases.
 * @default -1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerExpireClear
 * @text Event Timer: Expire Event Clear
 * @desc Clears any set to expire Common Event and instead,
 * run the default Game_Timer expiration code.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerFramesGain
 * @text Event Timer: Frames Gain
 * @desc Chooses how many frames, seconds, minutes, or hours
 * are gained or lost for the event timer.
 *
 * @arg Frames:eval
 * @text Frames
 * @desc How many 1/60ths of a second are gained/lost?
 * Positive for gain. Negative for lost. JavaScript allowed.
 * @default +0
 *
 * @arg Seconds:eval
 * @text Seconds
 * @desc How many seconds are gained/lost?
 * Positive for gain. Negative for lost. JavaScript allowed.
 * @default +0
 *
 * @arg Minutes:eval
 * @text Minutes
 * @desc How many minutes are gained/lost?
 * Positive for gain. Negative for lost. JavaScript allowed.
 * @default +0
 *
 * @arg Hours:eval
 * @text Hours
 * @desc How many hours are gained/lost?
 * Positive for gain. Negative for lost. JavaScript allowed.
 * @default +0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerFramesSet
 * @text Event Timer: Frames Set
 * @desc Chooses how many frames, seconds, minutes, or hours
 * are set for the event timer.
 *
 * @arg Frames:eval
 * @text Frames
 * @desc Set frame count to this value.
 * Each frame is 1/60th of a second. JavaScript allowed.
 * @default 0
 *
 * @arg Seconds:eval
 * @text Seconds
 * @desc Set seconds to this value.
 * JavaScript allowed.
 * @default 0
 *
 * @arg Minutes:eval
 * @text Minutes
 * @desc Set minutes to this value.
 * Each minute is 60 seconds. JavaScript allowed.
 * @default 0
 *
 * @arg Hours:eval
 * @text Hours
 * @desc Set hours to this value.
 * Each hour is 60 minutes. JavaScript allowed.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerPause
 * @text Event Timer: Pause
 * @desc Pauses the current event timer, but does not stop it.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EventTimerResume
 * @text Event Timer: Resume
 * @desc Resumes the current event timer from the paused state.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FollowerSetGlobalChase
 * @text Follower: Set Global Chase
 * @desc Disables all followers from chasing the player
 * or reenables it.
 *
 * @arg Chase:eval
 * @text Chase
 * @type boolean
 * @on Chase
 * @off Don't Chase
 * @desc Sets all followers to chase the player or not.
 * @default false
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FollowerSetTargetChase
 * @text Follower: Set Target Chase
 * @desc Disables target follower from chasing the player
 * or reenables it.
 *
 * @arg FollowerID:eval
 * @text Follower ID
 * @desc Select which follower ID to disable/reenable chasing for.
 * @default 1
 *
 * @arg Chase:eval
 * @text Chase
 * @type boolean
 * @on Chase
 * @off Don't Chase
 * @desc Sets target follower to chase its target or not.
 * @default false
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FollowerSetControl
 * @text Follower: Set Control
 * @desc Sets the event commands to target a follower when "Player"
 * is selected as the target.
 *
 * @arg FollowerID:eval
 * @text Follower ID
 * @desc Select which follower ID to control.
 * 0 is the player.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FollowerReset
 * @text Follower: Reset
 * @desc Resets all follower controls. Event Commands that target
 * the "Player" return to normal and followers chase again.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchGetSelfSwitchABCD
 * @text Global Switch: Get Self Switch A B C D
 * @desc Gets the current ON/OFF value from a Self Switch and
 * stores it onto a Global Switch.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the source map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the source event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Letter:str
 * @text Letter
 * @type select
 * @option A
 * @value A
 * @option B
 * @value B
 * @option C
 * @value C
 * @option D
 * @value D
 * @desc Letter of the target event's Self Switch to obtain data from.
 * @default A
 *
 * @arg Break
 * @text -
 *
 * @arg TargetSwitchId:num
 * @text Target Switch ID
 * @type switch
 * @desc The ID of the target switch.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchGetSelfSwitchID
 * @text Global Switch: Get Self Switch ID
 * @desc Gets the current ON/OFF value from a Self Switch and
 * stores it onto a Global Switch.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the source map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the source event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg SwitchId:num
 * @text Switch ID
 * @type switch
 * @desc The ID of the source switch.
 * @default 1
 *
 * @arg Break
 * @text -
 *
 * @arg TargetSwitchId:num
 * @text Target Switch ID
 * @type switch
 * @desc The ID of the target switch.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command VariableGetSelfVariableID
 * @text Global Variable: Get Self Variable ID
 * @desc Gets the current stored value from a Self Variable and
 * stores it onto a Global Variable.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the source map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the source event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg VariableId:num
 * @text Variable ID
 * @type variable
 * @desc The ID of the source variable.
 * @default 1
 *
 * @arg Break
 * @text -
 *
 * @arg TargetVariableId:num
 * @text Target Variable ID
 * @type variable
 * @desc The ID of the target variable.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MorphEventTo
 * @text Morph Event: Change
 * @desc Runs the page of a different event remotely.
 *
 * @arg Step1
 * @text Step 1: To Be Changed
 *
 * @arg Step1MapId:eval
 * @text Map ID
 * @parent Step1
 * @desc Target event's map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Step1EventId:eval
 * @text Event ID
 * @parent Step1
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Step2
 * @text Step 2: Change Into
 *
 * @arg TemplateName:str
 * @text Template Name
 * @parent Step2
 * @desc Name of the target event template to morph into.
 * Ignored if this is called "Untitled".
 * @default Untitled
 *
 * @arg Step2MapId:eval
 * @text Map ID
 * @parent Step2
 * @desc Target event's map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg Step2EventId:eval
 * @text Event ID
 * @parent Step2
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Step2Preserve:eval
 * @text Preserve Morph
 * @parent Step2
 * @type boolean
 * @on Preserve
 * @off Expires
 * @desc Is the morph effect preserved?
 * Or does it expire upon leaving the map?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MorphEventRemove
 * @text Morph Event: Remove
 * @desc Remove the morph status of an event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @parent Step1
 * @desc Target event's map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent Step1
 * @desc The ID of the event to remove morph from. Use 0 for current event. You may use JavaScript code.
 * @default 0
 *
 * @arg RemovePreserve:eval
 * @text Remove Preservation
 * @parent Step2
 * @type boolean
 * @on Remove
 * @off Contain
 * @desc Also remove the preservation effect?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PlayerIconChange
 * @text Player Icon: Change
 * @desc Change the icon that appears on on the player.
 *
 * @arg IconIndex:eval
 * @text Icon Index
 * @desc Icon index used for the icon.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg IconBufferX:eval
 * @text Buffer X
 * @parent IconIndex:eval
 * @desc How much to shift the X position by?
 * You may use JavaScript code.
 * @default 0
 *
 * @arg IconBufferY:eval
 * @text Buffer Y
 * @parent IconIndex:eval
 * @desc How much to shift the Y position by?
 * You may use JavaScript code.
 * @default 12
 *
 * @arg IconBlendMode:num
 * @text Blend Mode
 * @parent IconIndex:eval
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc What kind of blend mode do you wish to apply to the icon sprite?
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PlayerIconDelete
 * @text Player Icon: Delete
 * @desc Delete the icon that appears on the player.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PlayerMovementChange
 * @text Player Movement: Control
 * @desc Enable or disable player control over the player character's movement.
 *
 * @arg Enable:eval
 * @text Enable?
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Let the player control where the player character moves?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PlayerMovementDiagonal
 * @text Player Movement: Diagonal
 * @desc Override settings to for player diagonal movement.
 *
 * @arg Setting:str
 * @text Setting
 * @type select
 * @option Default: Whatever the Map Uses
 * @value default
 * @option Forcefully Disable Diagonal Movement
 * @value disable
 * @option Forcefully Enable Diagonal Movement
 * @value enable
 * @desc How do you want to change diagonal movement?
 * @default default
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SelfSwitchABCD
 * @text Self Switch: A B C D
 * @desc Change the Self Switch of a different event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg Letter:str
 * @text Letter
 * @type select
 * @option A
 * @value A
 * @option B
 * @value B
 * @option C
 * @value C
 * @option D
 * @value D
 * @desc Letter of the target event's Self Switch to change.
 * @default A
 *
 * @arg Break
 * @text -
 *
 * @arg Value:str
 * @text Value
 * @type select
 * @option ON
 * @value ON
 * @option OFF
 * @value OFF
 * @option Toggle
 * @value Toggle
 * @desc What value do you want to set the Self Switch to?
 * @default ON
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SelfSwitchID
 * @text Self Switch: Switch ID
 * @desc Change the Self Switch of a different event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg SwitchId:num
 * @text Switch ID
 * @type switch
 * @desc The ID of the target switch.
 * @default 1
 *
 * @arg Break
 * @text -
 *
 * @arg Value:str
 * @text Value
 * @type select
 * @option ON
 * @value ON
 * @option OFF
 * @value OFF
 * @option Toggle
 * @value Toggle
 * @desc What value do you want to set the Self Switch to?
 * @default ON
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SelfVariableID
 * @text Self Variable: Variable ID
 * @desc Change the Self Variable of a different event.
 *
 * @arg MapId:eval
 * @text Map ID
 * @desc The map the target map. Use 0 for current map.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg EventId:eval
 * @text Event ID
 * @desc The ID of the target event. Use 0 for current event.
 * You may use JavaScript code.
 * @default 0
 *
 * @arg VariableId:num
 * @text Variable ID
 * @type variable
 * @desc The ID of the target variable.
 * @default 1
 *
 * @arg Break
 * @text -
 *
 * @arg Operation:str
 * @text Operation
 * @type select
 * @option = Set
 * @value =
 * @option + Add
 * @value +
 * @option - Subtract
 * @value -
 * @option * Multiply
 * @value *
 * @option / Divide
 * @value /
 * @option % Modulus
 * @value %
 * @desc Set the operation used.
 * @default =
 *
 * @arg Break2
 * @text -
 *
 * @arg Value:eval
 * @text Value
 * @desc Insert the value to modify the Self Variable by.
 * You may use JavaScript code.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventAtXY
 * @text Spawn Event: Spawn At X, Y
 * @desc Spawns desired event at X, Y location on the current map.
 *
 * @arg Step1
 * @text Step 1: Spawned Event
 *
 * @arg TemplateName:str
 * @text Template Name
 * @parent Step1
 * @desc Name of the target event template to spawn as.
 * Ignored if this is called "Untitled".
 * @default Untitled
 *
 * @arg MapId:eval
 * @text Map ID
 * @parent Step1
 * @desc Target event's map to be used as reference.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent Step1
 * @desc The ID of the target event to be used as reference.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg Step2
 * @text Step 2: Location
 *
 * @arg PosX:eval
 * @text X Coordinate
 * @parent Step2
 * @type combo
 * @option $gamePlayer.frontX()
 * @option $gamePlayer.backX()
 * @option Math.randomInt($gameMap.width())
 * @option 0
 * @desc Target Location to spawn at.
 * You may use JavaScript code.
 * @default $gamePlayer.frontX()
 *
 * @arg PosY:eval
 * @text Y Coordinate
 * @parent Step2
 * @type combo
 * @option $gamePlayer.frontY()
 * @option $gamePlayer.backY()
 * @option Math.randomInt($gameMap.height())
 * @option 0
 * @desc Target Location to spawn at.
 * You may use JavaScript code.
 * @default $gamePlayer.frontY()
 *
 * @arg Collision:eval
 * @text Check Event Collision
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check collision with any other events and player?
 * @default true
 *
 * @arg Passability:eval
 * @text Check Passability
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check passability of the target location.
 * @default true
 *
 * @arg Preserve:eval
 * @text Preserve Spawn
 * @parent Step2
 * @type boolean
 * @on Preserve
 * @off Expires
 * @desc Is the spawned event preserved?
 * Or does it expire upon leaving the map?
 * @default true
 *
 * @arg Step3
 * @text Step 3: Success Check
 *
 * @arg SuccessSwitchId:num
 * @text Success Switch ID
 * @parent Step3
 * @type switch
 * @desc Target switch ID to record spawning success.
 * Ignore if ID is 0. OFF means failed. ON means success.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventAtRegion
 * @text Spawn Event: Spawn At Region
 * @desc Spawns desired event at a random region-marked location on the current map.
 *
 * @arg Step1
 * @text Step 1: Spawned Event
 *
 * @arg TemplateName:str
 * @text Template Name
 * @parent Step1
 * @desc Name of the target event template to spawn as.
 * Ignored if this is called "Untitled".
 * @default Untitled
 *
 * @arg MapId:eval
 * @text Map ID
 * @parent Step1
 * @desc Target event's map.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent Step1
 * @desc The ID of the target event.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg Step2
 * @text Step 2: Location
 *
 * @arg Region:arraynum
 * @text Region ID(s)
 * @parent Step2
 * @type number[]
 * @min 0
 * @max 255
 * @desc Pick region(s) to spawn this event at.
 * @default ["1"]
 *
 * @arg Collision:eval
 * @text Check Event Collision
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check collision with any other events and player?
 * @default true
 *
 * @arg Passability:eval
 * @text Check Passability
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check passability of the target location.
 * @default true
 *
 * @arg Preserve:eval
 * @text Preserve Spawn
 * @parent Step2
 * @type boolean
 * @on Preserve
 * @off Expires
 * @desc Is the spawned event preserved?
 * Or does it expire upon leaving the map?
 * @default true
 *
 * @arg Step3
 * @text Step 3: Success Check
 *
 * @arg SuccessSwitchId:num
 * @text Success Switch ID
 * @parent Step3
 * @type switch
 * @desc Target switch ID to record spawning success.
 * Ignore if ID is 0. OFF means failed. ON means success.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventAtTerrainTag
 * @text Spawn Event: Spawn At Terrain Tag
 * @desc Spawns desired event at a random terrain tag-marked location on the current map.
 *
 * @arg Step1
 * @text Step 1: Spawned Event
 *
 * @arg TemplateName:str
 * @text Template Name
 * @parent Step1
 * @desc Name of the target event template to spawn as.
 * Ignored if this is called "Untitled".
 * @default Untitled
 *
 * @arg MapId:eval
 * @text Map ID
 * @parent Step1
 * @desc Target event's map.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg EventId:eval
 * @text Event ID
 * @parent Step1
 * @desc The ID of the target event.
 * You may use JavaScript code.
 * @default 1
 *
 * @arg Step2
 * @text Step 2: Location
 *
 * @arg TerrainTags:arraynum
 * @text Terrain Tag(s)
 * @parent Step2
 * @type number[]
 * @min 0
 * @max 7
 * @desc Pick terrain tag(s) to spawn this event at.
 * Insert numbers between 0 and 7.
 * @default ["1"]
 *
 * @arg Collision:eval
 * @text Check Event Collision
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check collision with any other events and player?
 * @default true
 *
 * @arg Passability:eval
 * @text Check Passability
 * @parent Step2
 * @type boolean
 * @on Check
 * @off Ignore
 * @desc Check passability of the target location.
 * @default true
 *
 * @arg Preserve:eval
 * @text Preserve Spawn
 * @parent Step2
 * @type boolean
 * @on Preserve
 * @off Expires
 * @desc Is the spawned event preserved?
 * Or does it expire upon leaving the map?
 * @default true
 *
 * @arg Step3
 * @text Step 3: Success Check
 *
 * @arg SuccessSwitchId:num
 * @text Success Switch ID
 * @parent Step3
 * @type switch
 * @desc Target switch ID to record spawning success.
 * Ignore if ID is 0. OFF means failed. ON means success.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventDespawnEventID
 * @text Spawn Event: Despawn Event ID
 * @desc Despawns the selected Event ID on the current map.
 *
 * @arg EventID:eval
 * @text Event ID
 * @type combo
 * @option $gameMap.firstSpawnedEventID()
 * @option $gameMap.lastSpawnedEventID()
 * @option 1001
 * @desc The ID of the target event.
 * You may use JavaScript code.
 * @default $gameMap.lastSpawnedEventID()
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventDespawnAtXY
 * @text Spawn Event: Despawn At X, Y
 * @desc Despawns any spawned event(s) at X, Y location on the current map.
 *
 * @arg PosX:eval
 * @text X Coordinate
 * @parent Step2
 * @type combo
 * @option $gamePlayer.frontX()
 * @option $gamePlayer.backX()
 * @option Math.randomInt($gameMap.width())
 * @option 0
 * @desc Target Location to despawn at.
 * You may use JavaScript code.
 * @default $gamePlayer.frontX()
 *
 * @arg PosY:eval
 * @text Y Coordinate
 * @parent Step2
 * @type combo
 * @option $gamePlayer.frontY()
 * @option $gamePlayer.backY()
 * @option Math.randomInt($gameMap.height())
 * @option 0
 * @desc Target Location to despawn at.
 * You may use JavaScript code.
 * @default $gamePlayer.frontY()
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventDespawnRegions
 * @text Spawn Event: Despawn Region(s)
 * @desc Despawns the selected Region(s) on the current map.
 *
 * @arg Region:arraynum
 * @text Region ID(s)
 * @parent Step2
 * @type number[]
 * @min 0
 * @max 255
 * @desc Pick region(s) and despawn everything inside it.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventDespawnTerrainTags
 * @text Spawn Event: Despawn Terrain Tag(s)
 * @desc Despawns the selected Terrain Tags(s) on the current map.
 *
 * @arg TerrainTags:arraynum
 * @text Terrain Tag(s)
 * @parent Step2
 * @type number[]
 * @min 0
 * @max 7
 * @desc Pick terrain tag(s) and despawn everything inside it.
 * Insert numbers between 0 and 7.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SpawnEventDespawnEverything
 * @text Spawn Event: Despawn Everything
 * @desc Despawns all spawned events on the current map.
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
 * @param EventsMoveCore
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Label:struct
 * @text Event Label Settings
 * @type struct<Label>
 * @desc Choose settings regarding the Event Labels.
 * @default {"FontSize:num":"22","IconSize:num":"26","LineHeight:num":"30","OffsetX:num":"0","OffsetY:num":"12","OpacitySpeed:num":"16","VisibleRange:num":"30"}
 *
 * @param Icon:struct
 * @text Event Icon Settings
 * @type struct<Icon>
 * @desc Choose settings regarding the Event Icons.
 * @default {"BufferX:num":"0","BufferY:num":"12","BlendMode:num":"0"}
 *
 * @param Template:struct
 * @text Event Template Settings
 * @type struct<Template>
 * @desc Choose settings regarding Event Templates.
 * @default {"Settings":"","PreloadMaps:arraynum":"[\"1\"]","Prefabs":"","List:arraystruct":"[]","JavaScript":"","PreCopyJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\"","PostCopyJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\"","PreMorphJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\"","PostMorphJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\"","PreSpawnJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\"","PostSpawnJS:func":"\"// Declare Constants\\nconst mapId = arguments[1];\\nconst eventId = arguments[2];\\nconst target = arguments[3];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\""}
 *
 * @param EventBreak
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Movement:struct
 * @text Movement Settings
 * @type struct<Movement>
 * @desc Change the rules regarding movement in the game.
 * @default {"Dir8":"","EnableDir8:eval":"true","StrictCollision:eval":"true","FavorHorz:eval":"true","SlowerSpeed:eval":"false","DiagonalSpeedMultiplier:num":"0.85","AutoMove":"","StopAutoMoveEvents:eval":"true","StopAutoMoveMessages:eval":"true","Bitmap":"","BitmapSmoothing:eval":"false","Dash":"","DashModifier:num":"+1.0","EnableDashTilt:eval":"true","TiltLeft:num":"-0.15","TiltRight:num":"0.15","TiltVert:num":"0.05","EventMove":"","RandomMoveWeight:num":"0.10","Shadows":"","ShowShadows:eval":"true","DefaultShadow:str":"Shadow1","TurnInPlace":"","EnableTurnInPlace:eval":"false","TurnInPlaceDelay:num":"10","Vehicle":"","BoatSpeed:num":"4.0","ShipSpeed:num":"5.0","AirshipSpeed:num":"6.0"}
 *
 * @param VS8:struct
 * @text VisuStella 8-Dir Settings
 * @type struct<VS8>
 * @desc Choose settings regarding VisuStella 8-Directional Sprites.
 * @default {"Balloons":"","AutoBalloon:eval":"true","BalloonOffsetX:num":"0","BalloonOffsetY:num":"12","Icons":"","AutoBuffer:eval":"true","CarryPose:eval":"true"}
 *
 * @param MovementBreak
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Region:struct
 * @text Region Rulings
 * @type struct<Region>
 * @desc Choose settings regarding regions.
 * @default {"Allow":"","AllAllow:arraynum":"[]","WalkAllow:arraynum":"[]","PlayerAllow:arraynum":"[]","EventAllow:arraynum":"[]","VehicleAllow:arraynum":"[]","BoatAllow:arraynum":"[]","ShipAllow:arraynum":"[]","AirshipAllow:arraynum":"[]","Forbid":"","AllForbid:arraynum":"[]","WalkForbid:arraynum":"[]","PlayerForbid:arraynum":"[]","EventForbid:arraynum":"[]","VehicleForbid:arraynum":"[]","BoatForbid:arraynum":"[]","ShipForbid:arraynum":"[]","AirshipForbid:arraynum":"[]","Dock":"","VehicleDock:arraynum":"[]","BoatDock:arraynum":"[]","BoatDockRegionOnly:eval":"false","ShipDock:arraynum":"[]","ShipDockRegionOnly:eval":"false","AirshipDock:arraynum":"[]","AirshipDockRegionOnly:eval":"false"}
 *
 * @param RegionOk:struct
 * @text Common Event on OK Button
 * @parent Region:struct
 * @type struct<RegionCommonEvent>
 * @desc Set Common Events that activate upon pressing the
 * OK button while standing on top of designated regions.
 * @default {"Region1:num":"0","Region2:num":"0","Region3:num":"0","Region4:num":"0","Region5:num":"0","Region6:num":"0","Region7:num":"0","Region8:num":"0","Region9:num":"0","Region10:num":"0","Region11:num":"0","Region12:num":"0","Region13:num":"0","Region14:num":"0","Region15:num":"0","Region16:num":"0","Region17:num":"0","Region18:num":"0","Region19:num":"0","Region20:num":"0","Region21:num":"0","Region22:num":"0","Region23:num":"0","Region24:num":"0","Region25:num":"0","Region26:num":"0","Region27:num":"0","Region28:num":"0","Region29:num":"0","Region30:num":"0","Region31:num":"0","Region32:num":"0","Region33:num":"0","Region34:num":"0","Region35:num":"0","Region36:num":"0","Region37:num":"0","Region38:num":"0","Region39:num":"0","Region40:num":"0","Region41:num":"0","Region42:num":"0","Region43:num":"0","Region44:num":"0","Region45:num":"0","Region46:num":"0","Region47:num":"0","Region48:num":"0","Region49:num":"0","Region50:num":"0","Region51:num":"0","Region52:num":"0","Region53:num":"0","Region54:num":"0","Region55:num":"0","Region56:num":"0","Region57:num":"0","Region58:num":"0","Region59:num":"0","Region60:num":"0","Region61:num":"0","Region62:num":"0","Region63:num":"0","Region64:num":"0","Region65:num":"0","Region66:num":"0","Region67:num":"0","Region68:num":"0","Region69:num":"0","Region70:num":"0","Region71:num":"0","Region72:num":"0","Region73:num":"0","Region74:num":"0","Region75:num":"0","Region76:num":"0","Region77:num":"0","Region78:num":"0","Region79:num":"0","Region80:num":"0","Region81:num":"0","Region82:num":"0","Region83:num":"0","Region84:num":"0","Region85:num":"0","Region86:num":"0","Region87:num":"0","Region88:num":"0","Region89:num":"0","Region90:num":"0","Region91:num":"0","Region92:num":"0","Region93:num":"0","Region94:num":"0","Region95:num":"0","Region96:num":"0","Region97:num":"0","Region98:num":"0","Region99:num":"0","Region100:num":"0","Region101:num":"0","Region102:num":"0","Region103:num":"0","Region104:num":"0","Region105:num":"0","Region106:num":"0","Region107:num":"0","Region108:num":"0","Region109:num":"0","Region110:num":"0","Region111:num":"0","Region112:num":"0","Region113:num":"0","Region114:num":"0","Region115:num":"0","Region116:num":"0","Region117:num":"0","Region118:num":"0","Region119:num":"0","Region120:num":"0","Region121:num":"0","Region122:num":"0","Region123:num":"0","Region124:num":"0","Region125:num":"0","Region126:num":"0","Region127:num":"0","Region128:num":"0","Region129:num":"0","Region130:num":"0","Region131:num":"0","Region132:num":"0","Region133:num":"0","Region134:num":"0","Region135:num":"0","Region136:num":"0","Region137:num":"0","Region138:num":"0","Region139:num":"0","Region140:num":"0","Region141:num":"0","Region142:num":"0","Region143:num":"0","Region144:num":"0","Region145:num":"0","Region146:num":"0","Region147:num":"0","Region148:num":"0","Region149:num":"0","Region150:num":"0","Region151:num":"0","Region152:num":"0","Region153:num":"0","Region154:num":"0","Region155:num":"0","Region156:num":"0","Region157:num":"0","Region158:num":"0","Region159:num":"0","Region160:num":"0","Region161:num":"0","Region162:num":"0","Region163:num":"0","Region164:num":"0","Region165:num":"0","Region166:num":"0","Region167:num":"0","Region168:num":"0","Region169:num":"0","Region170:num":"0","Region171:num":"0","Region172:num":"0","Region173:num":"0","Region174:num":"0","Region175:num":"0","Region176:num":"0","Region177:num":"0","Region178:num":"0","Region179:num":"0","Region180:num":"0","Region181:num":"0","Region182:num":"0","Region183:num":"0","Region184:num":"0","Region185:num":"0","Region186:num":"0","Region187:num":"0","Region188:num":"0","Region189:num":"0","Region190:num":"0","Region191:num":"0","Region192:num":"0","Region193:num":"0","Region194:num":"0","Region195:num":"0","Region196:num":"0","Region197:num":"0","Region198:num":"0","Region199:num":"0","Region200:num":"0","Region201:num":"0","Region202:num":"0","Region203:num":"0","Region204:num":"0","Region205:num":"0","Region206:num":"0","Region207:num":"0","Region208:num":"0","Region209:num":"0","Region210:num":"0","Region211:num":"0","Region212:num":"0","Region213:num":"0","Region214:num":"0","Region215:num":"0","Region216:num":"0","Region217:num":"0","Region218:num":"0","Region219:num":"0","Region220:num":"0","Region221:num":"0","Region222:num":"0","Region223:num":"0","Region224:num":"0","Region225:num":"0","Region226:num":"0","Region227:num":"0","Region228:num":"0","Region229:num":"0","Region230:num":"0","Region231:num":"0","Region232:num":"0","Region233:num":"0","Region234:num":"0","Region235:num":"0","Region236:num":"0","Region237:num":"0","Region238:num":"0","Region239:num":"0","Region240:num":"0","Region241:num":"0","Region242:num":"0","Region243:num":"0","Region244:num":"0","Region245:num":"0","Region246:num":"0","Region247:num":"0","Region248:num":"0","Region249:num":"0","Region250:num":"0","Region251:num":"0","Region252:num":"0","Region253:num":"0","Region254:num":"0","Region255:num":"0"}
 *
 * @param RegionOkTarget:str
 * @text Target Tile
 * @parent RegionOk:struct
 * @type select
 * @option Tile in front of player.
 * @value front
 * @option Tile player is standing on top of.
 * @value standing
 * @desc Which tile should be checked for
 * Common Event on OK Button?
 * @default front
 *
 * @param RegionTouch:struct
 * @text Common Event on Touch
 * @parent Region:struct
 * @type struct<RegionCommonEvent>
 * @desc Set Common Events that activate upon stepping the tiles
 * marked by the designated regions.
 * @default {"Region1:num":"0","Region2:num":"0","Region3:num":"0","Region4:num":"0","Region5:num":"0","Region6:num":"0","Region7:num":"0","Region8:num":"0","Region9:num":"0","Region10:num":"0","Region11:num":"0","Region12:num":"0","Region13:num":"0","Region14:num":"0","Region15:num":"0","Region16:num":"0","Region17:num":"0","Region18:num":"0","Region19:num":"0","Region20:num":"0","Region21:num":"0","Region22:num":"0","Region23:num":"0","Region24:num":"0","Region25:num":"0","Region26:num":"0","Region27:num":"0","Region28:num":"0","Region29:num":"0","Region30:num":"0","Region31:num":"0","Region32:num":"0","Region33:num":"0","Region34:num":"0","Region35:num":"0","Region36:num":"0","Region37:num":"0","Region38:num":"0","Region39:num":"0","Region40:num":"0","Region41:num":"0","Region42:num":"0","Region43:num":"0","Region44:num":"0","Region45:num":"0","Region46:num":"0","Region47:num":"0","Region48:num":"0","Region49:num":"0","Region50:num":"0","Region51:num":"0","Region52:num":"0","Region53:num":"0","Region54:num":"0","Region55:num":"0","Region56:num":"0","Region57:num":"0","Region58:num":"0","Region59:num":"0","Region60:num":"0","Region61:num":"0","Region62:num":"0","Region63:num":"0","Region64:num":"0","Region65:num":"0","Region66:num":"0","Region67:num":"0","Region68:num":"0","Region69:num":"0","Region70:num":"0","Region71:num":"0","Region72:num":"0","Region73:num":"0","Region74:num":"0","Region75:num":"0","Region76:num":"0","Region77:num":"0","Region78:num":"0","Region79:num":"0","Region80:num":"0","Region81:num":"0","Region82:num":"0","Region83:num":"0","Region84:num":"0","Region85:num":"0","Region86:num":"0","Region87:num":"0","Region88:num":"0","Region89:num":"0","Region90:num":"0","Region91:num":"0","Region92:num":"0","Region93:num":"0","Region94:num":"0","Region95:num":"0","Region96:num":"0","Region97:num":"0","Region98:num":"0","Region99:num":"0","Region100:num":"0","Region101:num":"0","Region102:num":"0","Region103:num":"0","Region104:num":"0","Region105:num":"0","Region106:num":"0","Region107:num":"0","Region108:num":"0","Region109:num":"0","Region110:num":"0","Region111:num":"0","Region112:num":"0","Region113:num":"0","Region114:num":"0","Region115:num":"0","Region116:num":"0","Region117:num":"0","Region118:num":"0","Region119:num":"0","Region120:num":"0","Region121:num":"0","Region122:num":"0","Region123:num":"0","Region124:num":"0","Region125:num":"0","Region126:num":"0","Region127:num":"0","Region128:num":"0","Region129:num":"0","Region130:num":"0","Region131:num":"0","Region132:num":"0","Region133:num":"0","Region134:num":"0","Region135:num":"0","Region136:num":"0","Region137:num":"0","Region138:num":"0","Region139:num":"0","Region140:num":"0","Region141:num":"0","Region142:num":"0","Region143:num":"0","Region144:num":"0","Region145:num":"0","Region146:num":"0","Region147:num":"0","Region148:num":"0","Region149:num":"0","Region150:num":"0","Region151:num":"0","Region152:num":"0","Region153:num":"0","Region154:num":"0","Region155:num":"0","Region156:num":"0","Region157:num":"0","Region158:num":"0","Region159:num":"0","Region160:num":"0","Region161:num":"0","Region162:num":"0","Region163:num":"0","Region164:num":"0","Region165:num":"0","Region166:num":"0","Region167:num":"0","Region168:num":"0","Region169:num":"0","Region170:num":"0","Region171:num":"0","Region172:num":"0","Region173:num":"0","Region174:num":"0","Region175:num":"0","Region176:num":"0","Region177:num":"0","Region178:num":"0","Region179:num":"0","Region180:num":"0","Region181:num":"0","Region182:num":"0","Region183:num":"0","Region184:num":"0","Region185:num":"0","Region186:num":"0","Region187:num":"0","Region188:num":"0","Region189:num":"0","Region190:num":"0","Region191:num":"0","Region192:num":"0","Region193:num":"0","Region194:num":"0","Region195:num":"0","Region196:num":"0","Region197:num":"0","Region198:num":"0","Region199:num":"0","Region200:num":"0","Region201:num":"0","Region202:num":"0","Region203:num":"0","Region204:num":"0","Region205:num":"0","Region206:num":"0","Region207:num":"0","Region208:num":"0","Region209:num":"0","Region210:num":"0","Region211:num":"0","Region212:num":"0","Region213:num":"0","Region214:num":"0","Region215:num":"0","Region216:num":"0","Region217:num":"0","Region218:num":"0","Region219:num":"0","Region220:num":"0","Region221:num":"0","Region222:num":"0","Region223:num":"0","Region224:num":"0","Region225:num":"0","Region226:num":"0","Region227:num":"0","Region228:num":"0","Region229:num":"0","Region230:num":"0","Region231:num":"0","Region232:num":"0","Region233:num":"0","Region234:num":"0","Region235:num":"0","Region236:num":"0","Region237:num":"0","Region238:num":"0","Region239:num":"0","Region240:num":"0","Region241:num":"0","Region242:num":"0","Region243:num":"0","Region244:num":"0","Region245:num":"0","Region246:num":"0","Region247:num":"0","Region248:num":"0","Region249:num":"0","Region250:num":"0","Region251:num":"0","Region252:num":"0","Region253:num":"0","Region254:num":"0","Region255:num":"0"}
 *
 * @param TerrainTag:struct
 * @text Terrain Tag Settings
 * @type struct<TerrainTag>
 * @desc Choose settings regarding terrain tags.
 * @default {"TerrainTag":"","Rope:num":"1"}
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
 * Label Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Label:
 *
 * @param FontSize:num
 * @text Font Size
 * @type number
 * @min 1
 * @desc The font size used for the Event Labels.
 * @default 22
 *
 * @param IconSize:num
 * @text Icon Size
 * @type number
 * @min 1
 * @desc The size of the icons used in the Event Labels.
 * @default 26
 *
 * @param LineHeight:num
 * @text Line Height
 * @type number
 * @min 1
 * @desc The line height used for the Event Labels.
 * @default 26
 *
 * @param OffsetX:num
 * @text Offset X
 * @type number
 * @min 0
 * @desc Globally offset all labels horizontally by this amount.
 * @default 0
 *
 * @param OffsetY:num
 * @text Offset Y
 * @type number
 * @min 0
 * @desc Globally offset all labels vertically by this amount.
 * @default 12
 *
 * @param OpacitySpeed:num
 * @text Fade Speed
 * @type number
 * @min 1
 * @desc Fade speed for labels.
 * @default 16
 *
 * @param VisibleRange:num
 * @text Visible Range
 * @type number
 * @min 1
 * @desc Range the player has to be within the event to make its label visible.
 * @default 30
 *
 */
/* ----------------------------------------------------------------------------
 * Icon Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Icon:
 *
 * @param BufferX:num
 * @text Buffer X
 * @desc Default X position buffer for event icons.
 * @default 0
 *
 * @param BufferY:num
 * @text Buffer Y
 * @desc Default Y position buffer for event icons.
 * @default 12
 *
 * @param BlendMode:num
 * @text Blend Mode
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc Default blend mode for even icons.
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * Template Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Template:
 *
 * @param Settings
 *
 * @param PreloadMaps:arraynum
 * @text Preloaded Maps
 * @parent Settings
 * @type number[]
 * @desc A list of all the ID's of the maps that will be preloaded
 * to serve as template maps for this plugin.
 * @default ["1"]
 *
 * @param Templates
 *
 * @param List:arraystruct
 * @text Event Template List
 * @parent Templates
 * @type struct<EventTemplate>[]
 * @desc A list of all the Event Templates used by this project.
 * Used for notetags and Plugin Commands.
 * @default []
 *
 * @param JavaScript
 *
 * @param PreCopyJS:func
 * @text JS: Pre-Copy
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is copied.
 * This is global and is ran for all copied events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostCopyJS:func
 * @text JS: Post-Copy
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is copied.
 * This is global and is ran for all copied events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PreMorphJS:func
 * @text JS: Pre-Morph
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is morphed.
 * This is global and is ran for all morphed events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostMorphJS:func
 * @text JS: Post-Morph
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is morphed.
 * This is global and is ran for all morphed events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PreSpawnJS:func
 * @text JS: Pre-Spawn
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is spawned.
 * This is global and is ran for all spawned events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostSpawnJS:func
 * @text JS: Post-Spawn
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is spawned.
 * This is global and is ran for all spawned events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * Event Template
 * ----------------------------------------------------------------------------
 */
/*~struct~EventTemplate:
 *
 * @param Name:str
 * @text Name
 * @desc Name of the template. It'll be used as anchor points for
 * notetags and Plugin Commands.
 * @default Untitled
 *
 * @param MapID:num
 * @text Map ID
 * @parent Name:str
 * @type number
 * @min 1
 * @max 999
 * @desc ID of the map the template event is stored on.
 * This will automatically add this ID to preloaded list.
 * @default 1
 *
 * @param EventID:num
 * @text Event ID
 * @parent Name:str
 * @type number
 * @min 1
 * @max 999
 * @desc ID of the event the template event is based on.
 * @default 1
 *
 * @param JavaScript
 *
 * @param PreCopyJS:func
 * @text JS: Pre-Copy
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is copied.
 * This is local only for this template.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostCopyJS:func
 * @text JS: Post-Copy
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is copied.
 * This is local only for this template.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PreMorphJS:func
 * @text JS: Pre-Morph
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is morphed.
 * This is local only for this template.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostMorphJS:func
 * @text JS: Post-Morph
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is morphed.
 * This is local only for this template.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PreSpawnJS:func
 * @text JS: Pre-Spawn
 * @parent JavaScript
 * @type note
 * @desc Code that's ran before an event is spawned.
 * This is global and is ran for all spawned events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 * @param PostSpawnJS:func
 * @text JS: Post-Spawn
 * @parent JavaScript
 * @type note
 * @desc Code that's ran after an event is spawned.
 * This is global and is ran for all spawned events.
 * @default "// Declare Constants\nconst mapId = arguments[1];\nconst eventId = arguments[2];\nconst target = arguments[3];\nconst player = $gamePlayer;\n\n// Perform Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * Movement Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Movement:
 *
 * @param Dir8
 * @text 8 Directional Movement
 *
 * @param EnableDir8:eval
 * @text Enable
 * @parent Dir8
 * @type boolean
 * @on Enable
 * @off Disabled
 * @desc Allow 8-directional movement by default? Players can move diagonally.
 * @default true
 *
 * @param StrictCollision:eval
 * @text Strict Collision
 * @parent Dir8
 * @type boolean
 * @on Strict
 * @off Flexible
 * @desc Enforce strict collission rules where the player must be able to pass both cardinal directions?
 * @default true
 *
 * @param FavorHorz:eval
 * @text Favor Horizontal
 * @parent StrictCollision:eval
 * @type boolean
 * @on Horizontal
 * @off Vertical
 * @desc Favor horizontal if cannot pass diagonally but can pass both horizontally and vertically?
 * @default true
 *
 * @param SlowerSpeed:eval
 * @text Slower Diagonals?
 * @parent Dir8
 * @type boolean
 * @on Slower
 * @off Normal
 * @desc Enforce a slower movement speed when moving diagonally?
 * @default false
 *
 * @param DiagonalSpeedMultiplier:num
 * @text Speed Multiplier
 * @parent SlowerSpeed:eval
 * @desc What's the multiplier to adjust movement speed when moving diagonally?
 * @default 0.85
 *
 * @param AutoMove
 * @text Automatic Movement
 *
 * @param StopAutoMoveEvents:eval
 * @text Stop During Events
 * @parent AutoMove
 * @type boolean
 * @on Stop
 * @off Wander
 * @desc Stop automatic event movement while events are running.
 * @default true
 *
 * @param StopAutoMoveMessages:eval
 * @text Stop During Messages
 * @parent AutoMove
 * @type boolean
 * @on Stop
 * @off Wander
 * @desc Stop automatic event movement while a message is running.
 * @default true
 *
 * @param Bitmap
 *
 * @param BitmapSmoothing:eval
 * @text Smoothing
 * @parent Bitmap
 * @type boolean
 * @on Smooth
 * @off Pixelated
 * @desc Do you want to smooth or pixelate the map sprites?
 * Pixelating them is better for zooming and tilting.
 * @default false
 *
 * @param Dash
 * @text Dash
 *
 * @param DashModifier:num
 * @text Dash Modifier
 * @parent Dash
 * @desc Alters the dash speed modifier.
 * @default +1.0
 *
 * @param EnableDashTilt:eval
 * @text Enable Dash Tilt?
 * @parent Dash
 * @type boolean
 * @on Enable
 * @off Disabled
 * @desc Tilt any sprites that are currently dashing?
 * @default true
 *
 * @param TiltLeft:num
 * @text Tilt Left Amount
 * @parent EnableDashTilt:eval
 * @desc Amount in radians when moving left (upper left, left, lower left).
 * @default -0.15
 *
 * @param TiltRight:num
 * @text Tilt Right Amount
 * @parent EnableDashTilt:eval
 * @desc Amount in radians when moving right (upper right, right, lower right).
 * @default 0.15
 *
 * @param TiltVert:num
 * @text Tilt Vertical Amount
 * @parent EnableDashTilt:eval
 * @desc Amount in radians when moving vertical (up, down).
 * @default 0.05
 * 
 * @param EventMove
 * @text Event Movement
 *
 * @param RandomMoveWeight:num
 * @text Random Move Weight
 * @parent EventMove
 * @desc Use numbers between 0 and 1. Numbers closer to 1 stay
 * closer to their home position. 0 to disable it.
 * @default 0.10
 *
 * @param Shadows
 *
 * @param ShowShadows:eval
 * @text Show
 * @parent Shadows
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show shadows on all events and player-related sprites.
 * @default true
 *
 * @param DefaultShadow:str
 * @text Default Filename
 * @parent Shadows
 * @type file
 * @dir img/system/
 * @desc Default filename used for shadows found in img/system/ folder.
 * @default Shadow1
 *
 * @param TurnInPlace
 * @text Turn in Place
 *
 * @param EnableTurnInPlace:eval
 * @text Enable
 * @parent TurnInPlace
 * @type boolean
 * @on Turn in Place
 * @off Skip
 * @desc When not dashing, player will turn in place before moving.
 * This only applies with keyboard inputs.
 * @default false
 *
 * @param TurnInPlaceDelay:num
 * @text Delay in Frames
 * @parent TurnInPlace
 * @type number
 * @min 0
 * @desc The number of frames to wait before moving.
 * @default 10
 *
 * @param Vehicle
 * @text Vehicle Speeds
 *
 * @param BoatSpeed:num
 * @text Boat Speed
 * @parent Vehicle
 * @desc Allows you to adjust the base speed of the boat vehicle.
 * @default 4.0
 *
 * @param ShipSpeed:num
 * @text Ship Speed
 * @parent Vehicle
 * @desc Allows you to adjust the base speed of the ship vehicle.
 * @default 5.0
 *
 * @param AirshipSpeed:num
 * @text Airship Speed
 * @parent Vehicle
 * @desc Allows you to adjust the base speed of the airship vehicle.
 * @default 6.0
 *
 */
/* ----------------------------------------------------------------------------
 * Region Rulings
 * ----------------------------------------------------------------------------
 */
/*~struct~Region:
 *
 * @param Allow
 * @text Allow Regions
 *
 * @param AllAllow:arraynum
 * @text All Allow
 * @parent Allow
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where the player can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param WalkAllow:arraynum
 * @text Walk Allow
 * @parent Allow
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where walking units can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param PlayerAllow:arraynum
 * @text Player Allow
 * @parent WalkAllow:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where the player can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param EventAllow:arraynum
 * @text Event Allow
 * @parent WalkAllow:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where events can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param VehicleAllow:arraynum
 * @text Vehicle Allow
 * @parent Allow
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where any vehicle can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param BoatAllow:arraynum
 * @text Boat Allow
 * @parent VehicleAllow:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where boats can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param ShipAllow:arraynum
 * @text Ship Allow
 * @parent VehicleAllow:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where ships can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param AirshipAllow:arraynum
 * @text Airship Allow
 * @parent VehicleAllow:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where airships can enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param Forbid
 * @text Forbid Regions
 *
 * @param AllForbid:arraynum
 * @text All Forbid
 * @parent Forbid
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where the player cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param WalkForbid:arraynum
 * @text Walk Forbid
 * @parent Forbid
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where walking units cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param PlayerForbid:arraynum
 * @text Player Forbid
 * @parent WalkForbid:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where the player cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param EventForbid:arraynum
 * @text Event Forbid
 * @parent WalkForbid:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where events cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param VehicleForbid:arraynum
 * @text Vehicle Forbid
 * @parent Forbid
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where vehicles cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param BoatForbid:arraynum
 * @text Boat Forbid
 * @parent VehicleForbid:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where ships cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param ShipForbid:arraynum
 * @text Ship Forbid
 * @parent VehicleForbid:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where ships cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param AirshipForbid:arraynum
 * @text Airship Forbid
 * @parent VehicleForbid:arraynum
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where airships cannot enter.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param Dock
 * @text Dock Regions
 *
 * @param VehicleDock:arraynum
 * @text Vehicle Dock
 * @parent Dock
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where any vehicle can dock.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param BoatDock:arraynum
 * @text Boat Dock
 * @parent Dock
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where boats can dock.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param BoatDockRegionOnly:eval
 * @text Only Region Dockable
 * @parent BoatDock:arraynum
 * @type boolean
 * @on At Regions Only
 * @off Default
 * @desc Boats can only dock at designated regions.
 * @default false
 *
 * @param ShipDock:arraynum
 * @text Ship Dock
 * @parent Dock
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where ships can dock.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param ShipDockRegionOnly:eval
 * @text Only Region Dockable
 * @parent ShipDock:arraynum
 * @type boolean
 * @on At Regions Only
 * @off Default
 * @desc Ships can only dock at designated regions.
 * @default false
 *
 * @param AirshipDock:arraynum
 * @text Airship Dock
 * @parent Dock
 * @type number[]
 * @min 0
 * @max 255
 * @desc Insert Region ID's where airships can dock.
 * Region ID's range from 0 to 255.
 * @default []
 *
 * @param AirshipDockRegionOnly:eval
 * @text Only Region Dockable
 * @parent AirshipDock:arraynum
 * @type boolean
 * @on At Regions Only
 * @off Default
 * @desc Airships can only dock at designated regions.
 * @default false
 *
 */
/* ----------------------------------------------------------------------------
 * Region Common Events
 * ----------------------------------------------------------------------------
 */
/*~struct~RegionCommonEvent:
 *
 * @param Region1:num
 * @text Region 1
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region2:num
 * @text Region 2
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region3:num
 * @text Region 3
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region4:num
 * @text Region 4
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region5:num
 * @text Region 5
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region6:num
 * @text Region 6
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region7:num
 * @text Region 7
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region8:num
 * @text Region 8
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region9:num
 * @text Region 9
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region10:num
 * @text Region 10
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region11:num
 * @text Region 11
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region12:num
 * @text Region 12
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region13:num
 * @text Region 13
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region14:num
 * @text Region 14
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region15:num
 * @text Region 15
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region16:num
 * @text Region 16
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region17:num
 * @text Region 17
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region18:num
 * @text Region 18
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region19:num
 * @text Region 19
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region20:num
 * @text Region 20
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region21:num
 * @text Region 21
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region22:num
 * @text Region 22
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region23:num
 * @text Region 23
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region24:num
 * @text Region 24
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region25:num
 * @text Region 25
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region26:num
 * @text Region 26
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region27:num
 * @text Region 27
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region28:num
 * @text Region 28
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region29:num
 * @text Region 29
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region30:num
 * @text Region 30
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region31:num
 * @text Region 31
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region32:num
 * @text Region 32
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region33:num
 * @text Region 33
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region34:num
 * @text Region 34
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region35:num
 * @text Region 35
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region36:num
 * @text Region 36
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region37:num
 * @text Region 37
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region38:num
 * @text Region 38
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region39:num
 * @text Region 39
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region40:num
 * @text Region 40
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region41:num
 * @text Region 41
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region42:num
 * @text Region 42
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region43:num
 * @text Region 43
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region44:num
 * @text Region 44
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region45:num
 * @text Region 45
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region46:num
 * @text Region 46
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region47:num
 * @text Region 47
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region48:num
 * @text Region 48
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region49:num
 * @text Region 49
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region50:num
 * @text Region 50
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region51:num
 * @text Region 51
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region52:num
 * @text Region 52
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region53:num
 * @text Region 53
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region54:num
 * @text Region 54
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region55:num
 * @text Region 55
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region56:num
 * @text Region 56
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region57:num
 * @text Region 57
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region58:num
 * @text Region 58
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region59:num
 * @text Region 59
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region60:num
 * @text Region 60
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region61:num
 * @text Region 61
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region62:num
 * @text Region 62
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region63:num
 * @text Region 63
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region64:num
 * @text Region 64
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region65:num
 * @text Region 65
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region66:num
 * @text Region 66
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region67:num
 * @text Region 67
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region68:num
 * @text Region 68
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region69:num
 * @text Region 69
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region70:num
 * @text Region 70
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region71:num
 * @text Region 71
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region72:num
 * @text Region 72
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region73:num
 * @text Region 73
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region74:num
 * @text Region 74
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region75:num
 * @text Region 75
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region76:num
 * @text Region 76
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region77:num
 * @text Region 77
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region78:num
 * @text Region 78
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region79:num
 * @text Region 79
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region80:num
 * @text Region 70
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region81:num
 * @text Region 71
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region82:num
 * @text Region 72
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region83:num
 * @text Region 73
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region84:num
 * @text Region 74
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region85:num
 * @text Region 75
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region86:num
 * @text Region 76
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region87:num
 * @text Region 77
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region88:num
 * @text Region 78
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region89:num
 * @text Region 79
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region80:num
 * @text Region 80
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region81:num
 * @text Region 81
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region82:num
 * @text Region 82
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region83:num
 * @text Region 83
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region84:num
 * @text Region 84
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region85:num
 * @text Region 85
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region86:num
 * @text Region 86
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region87:num
 * @text Region 87
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region88:num
 * @text Region 88
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region89:num
 * @text Region 89
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region90:num
 * @text Region 80
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region91:num
 * @text Region 81
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region92:num
 * @text Region 82
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region93:num
 * @text Region 83
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region94:num
 * @text Region 84
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region95:num
 * @text Region 85
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region96:num
 * @text Region 86
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region97:num
 * @text Region 87
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region98:num
 * @text Region 88
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region99:num
 * @text Region 89
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region90:num
 * @text Region 90
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region91:num
 * @text Region 91
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region92:num
 * @text Region 92
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region93:num
 * @text Region 93
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region94:num
 * @text Region 94
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region95:num
 * @text Region 95
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region96:num
 * @text Region 96
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region97:num
 * @text Region 97
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region98:num
 * @text Region 98
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region99:num
 * @text Region 99
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region100:num
 * @text Region 100
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region101:num
 * @text Region 101
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region102:num
 * @text Region 102
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region103:num
 * @text Region 103
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region104:num
 * @text Region 104
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region105:num
 * @text Region 105
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region106:num
 * @text Region 106
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region107:num
 * @text Region 107
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region108:num
 * @text Region 108
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region109:num
 * @text Region 109
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region110:num
 * @text Region 110
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region111:num
 * @text Region 111
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region112:num
 * @text Region 112
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region113:num
 * @text Region 113
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region114:num
 * @text Region 114
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region115:num
 * @text Region 115
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region116:num
 * @text Region 116
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region117:num
 * @text Region 117
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region118:num
 * @text Region 118
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region119:num
 * @text Region 119
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region120:num
 * @text Region 120
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region121:num
 * @text Region 121
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region122:num
 * @text Region 122
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region123:num
 * @text Region 123
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region124:num
 * @text Region 124
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region125:num
 * @text Region 125
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region126:num
 * @text Region 126
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region127:num
 * @text Region 127
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region128:num
 * @text Region 128
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region129:num
 * @text Region 129
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region130:num
 * @text Region 130
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region131:num
 * @text Region 131
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region132:num
 * @text Region 132
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region133:num
 * @text Region 133
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region134:num
 * @text Region 134
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region135:num
 * @text Region 135
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region136:num
 * @text Region 136
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region137:num
 * @text Region 137
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region138:num
 * @text Region 138
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region139:num
 * @text Region 139
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region140:num
 * @text Region 140
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region141:num
 * @text Region 141
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region142:num
 * @text Region 142
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region143:num
 * @text Region 143
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region144:num
 * @text Region 144
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region145:num
 * @text Region 145
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region146:num
 * @text Region 146
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region147:num
 * @text Region 147
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region148:num
 * @text Region 148
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region149:num
 * @text Region 149
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region150:num
 * @text Region 150
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region151:num
 * @text Region 151
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region152:num
 * @text Region 152
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region153:num
 * @text Region 153
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region154:num
 * @text Region 154
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region155:num
 * @text Region 155
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region156:num
 * @text Region 156
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region157:num
 * @text Region 157
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region158:num
 * @text Region 158
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region159:num
 * @text Region 159
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region160:num
 * @text Region 160
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region161:num
 * @text Region 161
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region162:num
 * @text Region 162
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region163:num
 * @text Region 163
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region164:num
 * @text Region 164
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region165:num
 * @text Region 165
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region166:num
 * @text Region 166
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region167:num
 * @text Region 167
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region168:num
 * @text Region 168
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region169:num
 * @text Region 169
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region170:num
 * @text Region 170
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region171:num
 * @text Region 171
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region172:num
 * @text Region 172
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region173:num
 * @text Region 173
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region174:num
 * @text Region 174
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region175:num
 * @text Region 175
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region176:num
 * @text Region 176
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region177:num
 * @text Region 177
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region178:num
 * @text Region 178
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region179:num
 * @text Region 179
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region180:num
 * @text Region 170
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region181:num
 * @text Region 171
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region182:num
 * @text Region 172
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region183:num
 * @text Region 173
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region184:num
 * @text Region 174
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region185:num
 * @text Region 175
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region186:num
 * @text Region 176
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region187:num
 * @text Region 177
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region188:num
 * @text Region 178
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region189:num
 * @text Region 179
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region180:num
 * @text Region 180
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region181:num
 * @text Region 181
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region182:num
 * @text Region 182
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region183:num
 * @text Region 183
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region184:num
 * @text Region 184
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region185:num
 * @text Region 185
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region186:num
 * @text Region 186
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region187:num
 * @text Region 187
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region188:num
 * @text Region 188
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region189:num
 * @text Region 189
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region190:num
 * @text Region 180
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region191:num
 * @text Region 181
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region192:num
 * @text Region 182
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region193:num
 * @text Region 183
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region194:num
 * @text Region 184
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region195:num
 * @text Region 185
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region196:num
 * @text Region 186
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region197:num
 * @text Region 187
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region198:num
 * @text Region 188
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region199:num
 * @text Region 189
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region190:num
 * @text Region 190
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region191:num
 * @text Region 191
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region192:num
 * @text Region 192
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region193:num
 * @text Region 193
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region194:num
 * @text Region 194
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region195:num
 * @text Region 195
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region196:num
 * @text Region 196
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region197:num
 * @text Region 197
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region198:num
 * @text Region 198
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region199:num
 * @text Region 199
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region200:num
 * @text Region 200
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region201:num
 * @text Region 201
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region202:num
 * @text Region 202
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region203:num
 * @text Region 203
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region204:num
 * @text Region 204
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region205:num
 * @text Region 205
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region206:num
 * @text Region 206
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region207:num
 * @text Region 207
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region208:num
 * @text Region 208
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region209:num
 * @text Region 209
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region210:num
 * @text Region 210
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region211:num
 * @text Region 211
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region212:num
 * @text Region 212
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region213:num
 * @text Region 213
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region214:num
 * @text Region 214
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region215:num
 * @text Region 215
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region216:num
 * @text Region 216
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region217:num
 * @text Region 217
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region218:num
 * @text Region 218
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region219:num
 * @text Region 219
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region220:num
 * @text Region 220
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region221:num
 * @text Region 221
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region222:num
 * @text Region 222
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region223:num
 * @text Region 223
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region224:num
 * @text Region 224
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region225:num
 * @text Region 225
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region226:num
 * @text Region 226
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region227:num
 * @text Region 227
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region228:num
 * @text Region 228
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region229:num
 * @text Region 229
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region230:num
 * @text Region 230
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region231:num
 * @text Region 231
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region232:num
 * @text Region 232
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region233:num
 * @text Region 233
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region234:num
 * @text Region 234
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region235:num
 * @text Region 235
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region236:num
 * @text Region 236
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region237:num
 * @text Region 237
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region238:num
 * @text Region 238
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region239:num
 * @text Region 239
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region240:num
 * @text Region 240
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region241:num
 * @text Region 241
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region242:num
 * @text Region 242
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region243:num
 * @text Region 243
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region244:num
 * @text Region 244
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region245:num
 * @text Region 245
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region246:num
 * @text Region 246
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region247:num
 * @text Region 247
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region248:num
 * @text Region 248
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region249:num
 * @text Region 249
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region250:num
 * @text Region 250
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region251:num
 * @text Region 251
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region252:num
 * @text Region 252
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region253:num
 * @text Region 253
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region254:num
 * @text Region 254
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 * @param Region255:num
 * @text Region 255
 * @type common_event
 * @desc Which Common Event does this region activate?
 * Use 0 to not activate any Common Events.
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * Terrain Tag Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~TerrainTag:
 *
 * @param TerrainTag
 * @text Terrain Tag ID's
 *
 * @param Rope:num
 * @text Rope
 * @parent TerrainTag
 * @type number
 * @min 0
 * @max 7
 * @desc Which terrain tag number to use for ropes?
 * @default 1
 *
 */
/* ----------------------------------------------------------------------------
 * VisuStella 8-Dir Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~VS8:
 *
 * @param Balloons
 * @text Balloon Icon Settings
 *
 * @param AutoBalloon:eval
 * @text Auto-Balloon Poses
 * @parent Balloons
 * @type boolean
 * @on Auto
 * @off Manual
 * @desc Automatically pose VS8 sprites when using balloon icons.
 * @default true
 *
 * @param BalloonOffsetX:num
 * @text Balloon Offset X
 * @parent Balloons
 * @desc Offset balloon icons on VS8 sprites by x pixels.
 * @default 0
 *
 * @param BalloonOffsetY:num
 * @text Balloon Offset Y
 * @parent Balloons
 * @desc Offset balloon icons on VS8 sprites by y pixels.
 * @default 10
 *
 * @param Icons
 * 
 * @param AutoBuffer:eval
 * @text Auto Buffer
 * @parent Icons
 * @type boolean
 * @on Auto
 * @off Manual
 * @desc Automatically buffer the X and Y coordinates of
 * VS8 sprites?
 * @default true
 * 
 * @param CarryPose:eval
 * @text Use Carry Pose
 * @parent Icons
 * @type boolean
 * @on Carry Pose
 * @off Normal
 * @desc Use the carry pose when moving with an icon overhead.
 * @default true
 *
 */
//=============================================================================

const _0x2db143=_0x20ed;(function(_0x2d0c69,_0x396f60){const _0x580d65=_0x20ed,_0x290545=_0x2d0c69();while(!![]){try{const _0x192ced=-parseInt(_0x580d65(0x479))/0x1+parseInt(_0x580d65(0xf4))/0x2+-parseInt(_0x580d65(0x190))/0x3*(-parseInt(_0x580d65(0x3f9))/0x4)+parseInt(_0x580d65(0x145))/0x5*(-parseInt(_0x580d65(0x4dd))/0x6)+-parseInt(_0x580d65(0xc0))/0x7+-parseInt(_0x580d65(0x1d9))/0x8+-parseInt(_0x580d65(0x1ed))/0x9*(-parseInt(_0x580d65(0xee))/0xa);if(_0x192ced===_0x396f60)break;else _0x290545['push'](_0x290545['shift']());}catch(_0xc9a85){_0x290545['push'](_0x290545['shift']());}}}(_0x5a59,0xa3de6));var label=_0x2db143(0x483),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x2db143(0x22b)](function(_0xaab5cf){const _0xc5704f=_0x2db143;return _0xaab5cf[_0xc5704f(0x37e)]&&_0xaab5cf['description']['includes']('['+label+']');})[0x0];function _0x20ed(_0x4afd5f,_0x185a50){const _0x5a59b1=_0x5a59();return _0x20ed=function(_0x20edd8,_0xf90748){_0x20edd8=_0x20edd8-0x71;let _0x16f37d=_0x5a59b1[_0x20edd8];return _0x16f37d;},_0x20ed(_0x4afd5f,_0x185a50);}VisuMZ[label][_0x2db143(0x516)]=VisuMZ[label][_0x2db143(0x516)]||{},VisuMZ['ConvertParams']=function(_0x41dae2,_0x497191){const _0x49bb21=_0x2db143;for(const _0x2a90e2 in _0x497191){if('MOOdP'!==_0x49bb21(0x2f1)){const _0x53b4c0=_0x30f865['parameters'][0x0];if(_0x53b4c0['match'](/<PAGE (?:CONDITION|CONDITIONS)>/i))_0x19e3c1=!![];else _0x53b4c0[_0x49bb21(0x474)](/<\/PAGE (?:CONDITION|CONDITIONS)>/i)&&(_0x518f31=![]);}else{if(_0x2a90e2['match'](/(.*):(.*)/i)){const _0x15586f=String(RegExp['$1']),_0x2e6f4d=String(RegExp['$2'])[_0x49bb21(0x2e8)]()[_0x49bb21(0x28d)]();let _0x2e857d,_0x2dc01b,_0x162378;switch(_0x2e6f4d){case _0x49bb21(0x1cf):_0x2e857d=_0x497191[_0x2a90e2]!==''?Number(_0x497191[_0x2a90e2]):0x0;break;case _0x49bb21(0x296):_0x2dc01b=_0x497191[_0x2a90e2]!==''?JSON[_0x49bb21(0x418)](_0x497191[_0x2a90e2]):[],_0x2e857d=_0x2dc01b[_0x49bb21(0x274)](_0x408de2=>Number(_0x408de2));break;case _0x49bb21(0x158):_0x2e857d=_0x497191[_0x2a90e2]!==''?eval(_0x497191[_0x2a90e2]):null;break;case'ARRAYEVAL':_0x2dc01b=_0x497191[_0x2a90e2]!==''?JSON[_0x49bb21(0x418)](_0x497191[_0x2a90e2]):[],_0x2e857d=_0x2dc01b[_0x49bb21(0x274)](_0x1cec24=>eval(_0x1cec24));break;case _0x49bb21(0x146):_0x2e857d=_0x497191[_0x2a90e2]!==''?JSON[_0x49bb21(0x418)](_0x497191[_0x2a90e2]):'';break;case _0x49bb21(0x2cb):_0x2dc01b=_0x497191[_0x2a90e2]!==''?JSON['parse'](_0x497191[_0x2a90e2]):[],_0x2e857d=_0x2dc01b[_0x49bb21(0x274)](_0x2e0f5a=>JSON[_0x49bb21(0x418)](_0x2e0f5a));break;case _0x49bb21(0x50f):_0x2e857d=_0x497191[_0x2a90e2]!==''?new Function(JSON[_0x49bb21(0x418)](_0x497191[_0x2a90e2])):new Function(_0x49bb21(0x2e9));break;case'ARRAYFUNC':_0x2dc01b=_0x497191[_0x2a90e2]!==''?JSON[_0x49bb21(0x418)](_0x497191[_0x2a90e2]):[],_0x2e857d=_0x2dc01b[_0x49bb21(0x274)](_0x1c7ffa=>new Function(JSON[_0x49bb21(0x418)](_0x1c7ffa)));break;case _0x49bb21(0x8e):_0x2e857d=_0x497191[_0x2a90e2]!==''?String(_0x497191[_0x2a90e2]):'';break;case _0x49bb21(0x4c5):_0x2dc01b=_0x497191[_0x2a90e2]!==''?JSON[_0x49bb21(0x418)](_0x497191[_0x2a90e2]):[],_0x2e857d=_0x2dc01b[_0x49bb21(0x274)](_0x4b6847=>String(_0x4b6847));break;case _0x49bb21(0x4ef):_0x162378=_0x497191[_0x2a90e2]!==''?JSON[_0x49bb21(0x418)](_0x497191[_0x2a90e2]):{},_0x41dae2[_0x15586f]={},VisuMZ['ConvertParams'](_0x41dae2[_0x15586f],_0x162378);continue;case'ARRAYSTRUCT':_0x2dc01b=_0x497191[_0x2a90e2]!==''?JSON['parse'](_0x497191[_0x2a90e2]):[],_0x2e857d=_0x2dc01b[_0x49bb21(0x274)](_0x1b8e7a=>VisuMZ[_0x49bb21(0x20a)]({},JSON['parse'](_0x1b8e7a)));break;default:continue;}_0x41dae2[_0x15586f]=_0x2e857d;}}}return _0x41dae2;},(_0x20b75a=>{const _0x43db4b=_0x2db143,_0x2dd570=_0x20b75a[_0x43db4b(0x4c2)];for(const _0x20f197 of dependencies){if(!Imported[_0x20f197]){alert(_0x43db4b(0x103)[_0x43db4b(0x183)](_0x2dd570,_0x20f197)),SceneManager[_0x43db4b(0x4f7)]();break;}}const _0x47eb8f=_0x20b75a[_0x43db4b(0xef)];if(_0x47eb8f[_0x43db4b(0x474)](/\[Version[ ](.*?)\]/i)){if(_0x43db4b(0x51a)==='qnuYw')return this[_0x43db4b(0x4cc)](0x3,_0x3de6c1(_0x59a52e['$1']));else{const _0x18457f=Number(RegExp['$1']);_0x18457f!==VisuMZ[label][_0x43db4b(0x32b)]&&(alert(_0x43db4b(0x1ce)[_0x43db4b(0x183)](_0x2dd570,_0x18457f)),SceneManager[_0x43db4b(0x4f7)]());}}if(_0x47eb8f[_0x43db4b(0x474)](/\[Tier[ ](\d+)\]/i)){const _0x371e1c=Number(RegExp['$1']);if(_0x371e1c<tier)alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[_0x43db4b(0x183)](_0x2dd570,_0x371e1c,tier)),SceneManager[_0x43db4b(0x4f7)]();else{if(_0x43db4b(0x338)===_0x43db4b(0x338))tier=Math[_0x43db4b(0x315)](_0x371e1c,tier);else return this['processMoveRouteFadeOut'](_0x11a9c8(_0x8d0f23['$1']));}}VisuMZ[_0x43db4b(0x20a)](VisuMZ[label][_0x43db4b(0x516)],_0x20b75a['parameters']);})(pluginData),VisuMZ['OperateValues']=function(_0xcb9ce,_0xad8f08,_0x225954){switch(_0x225954){case'=':return _0xad8f08;break;case'+':return _0xcb9ce+_0xad8f08;break;case'-':return _0xcb9ce-_0xad8f08;break;case'*':return _0xcb9ce*_0xad8f08;break;case'/':return _0xcb9ce/_0xad8f08;break;case'%':return _0xcb9ce%_0xad8f08;break;}return _0xcb9ce;},PluginManager['registerCommand'](pluginData[_0x2db143(0x4c2)],_0x2db143(0x3e0),_0x10158f=>{const _0x191dca=_0x2db143;VisuMZ[_0x191dca(0x20a)](_0x10158f,_0x10158f);switch(_0x10158f[_0x191dca(0x17a)]){case _0x191dca(0x194):$gameSystem[_0x191dca(0x25e)](!![]);break;case'Stop':$gameSystem['setAllowEventAutoMovement'](![]);break;case'Toggle':$gameSystem[_0x191dca(0x25e)](!$gameSystem[_0x191dca(0x4d4)]());break;}}),PluginManager[_0x2db143(0x221)](pluginData[_0x2db143(0x4c2)],_0x2db143(0x3cf),_0x12064b=>{const _0x53f783=_0x2db143;VisuMZ[_0x53f783(0x20a)](_0x12064b,_0x12064b);const _0x482aa8=$gameTemp[_0x53f783(0x179)](),_0x34874d={'mapId':_0x12064b[_0x53f783(0x3f6)],'eventId':_0x12064b[_0x53f783(0x180)]||_0x482aa8['eventId'](),'pageId':_0x12064b[_0x53f783(0x177)]};if(_0x34874d['mapId']<=0x0)_0x34874d[_0x53f783(0x346)]=$gameMap?$gameMap[_0x53f783(0x346)]():0x1;$gameTemp[_0x53f783(0x179)]()['pluginCommandCallEvent'](_0x34874d);}),PluginManager[_0x2db143(0x221)](pluginData[_0x2db143(0x4c2)],_0x2db143(0x13a),_0x20bffe=>{const _0x5984ad=_0x2db143;VisuMZ[_0x5984ad(0x20a)](_0x20bffe,_0x20bffe);switch(_0x20bffe[_0x5984ad(0x17a)]){case _0x5984ad(0x438):$gameSystem[_0x5984ad(0x3b4)](!![]);break;case _0x5984ad(0x4cd):$gameSystem['setDashingEnabled'](![]);break;case _0x5984ad(0x164):$gameSystem[_0x5984ad(0x3b4)](!$gameSystem[_0x5984ad(0x1a5)]());break;}}),PluginManager[_0x2db143(0x221)](pluginData[_0x2db143(0x4c2)],_0x2db143(0x19b),_0x1d28e5=>{const _0xc1f9e2=_0x2db143;VisuMZ['ConvertParams'](_0x1d28e5,_0x1d28e5);const _0x34b3c6=$gameTemp[_0xc1f9e2(0x179)]();_0x1d28e5[_0xc1f9e2(0x3f6)]=_0x1d28e5[_0xc1f9e2(0x3f6)]||$gameMap[_0xc1f9e2(0x346)](),$gameSystem[_0xc1f9e2(0x43e)](_0x1d28e5[_0xc1f9e2(0x3f6)],_0x1d28e5[_0xc1f9e2(0x180)]||_0x34b3c6[_0xc1f9e2(0x2b5)](),_0x1d28e5[_0xc1f9e2(0x51d)],_0x1d28e5[_0xc1f9e2(0x2ce)],_0x1d28e5['IconBufferY'],_0x1d28e5[_0xc1f9e2(0x1e3)]);}),PluginManager[_0x2db143(0x221)](pluginData[_0x2db143(0x4c2)],_0x2db143(0x163),_0x543fd9=>{const _0x16149b=_0x2db143;VisuMZ[_0x16149b(0x20a)](_0x543fd9,_0x543fd9);const _0x2b41e5=$gameTemp[_0x16149b(0x179)]();_0x543fd9[_0x16149b(0x3f6)]=_0x543fd9[_0x16149b(0x3f6)]||$gameMap['mapId'](),$gameSystem[_0x16149b(0x243)](_0x543fd9[_0x16149b(0x3f6)],_0x543fd9[_0x16149b(0x180)]||_0x2b41e5[_0x16149b(0x2b5)]());}),PluginManager[_0x2db143(0x221)](pluginData[_0x2db143(0x4c2)],_0x2db143(0x27c),_0xdc0b5b=>{const _0x481b00=_0x2db143;if($gameMap)for(const _0x500383 of $gameMap[_0x481b00(0x4e5)]()){_0x500383[_0x481b00(0x1f3)]();}}),PluginManager[_0x2db143(0x221)](pluginData[_0x2db143(0x4c2)],_0x2db143(0x22e),_0xf81e35=>{const _0x183c84=_0x2db143;VisuMZ[_0x183c84(0x20a)](_0xf81e35,_0xf81e35);switch(_0xf81e35[_0x183c84(0x43a)]){case _0x183c84(0x4df):$gameSystem[_0x183c84(0x323)](!![]);break;case _0x183c84(0x9f):$gameSystem[_0x183c84(0x323)](![]);break;case'Toggle':$gameSystem[_0x183c84(0x323)](!$gameSystem[_0x183c84(0x12a)]());break;}}),PluginManager[_0x2db143(0x221)](pluginData['name'],_0x2db143(0x417),_0x13a976=>{const _0x932eed=_0x2db143;VisuMZ[_0x932eed(0x20a)](_0x13a976,_0x13a976);const _0x21b576=$gameTemp[_0x932eed(0x179)]();if(!$gameMap)return;const _0x5d778d=$gameMap[_0x932eed(0x124)](_0x13a976[_0x932eed(0x180)]||_0x21b576[_0x932eed(0x2b5)]());if(_0x5d778d)_0x5d778d[_0x932eed(0x93)]();}),PluginManager[_0x2db143(0x221)](pluginData['name'],_0x2db143(0x2fe),_0x29d068=>{const _0x4fdfd3=_0x2db143;VisuMZ[_0x4fdfd3(0x20a)](_0x29d068,_0x29d068);const _0x24945f=$gameTemp[_0x4fdfd3(0x179)](),_0x5f8ab6=_0x29d068[_0x4fdfd3(0x3f6)]||$gameMap[_0x4fdfd3(0x346)](),_0x5cd00c=_0x29d068[_0x4fdfd3(0x180)]||_0x24945f['eventId'](),_0x33c201=_0x29d068[_0x4fdfd3(0x499)]||0x0,_0x467667=_0x29d068[_0x4fdfd3(0x2ed)]||0x0,_0x320c64=_0x29d068['Direction']||0x2,_0xcf5105=((_0x29d068['PageId']||0x1)-0x1)[_0x4fdfd3(0x17f)](0x0,0x13),_0x16a997=_0x29d068['MoveRouteIndex']||0x0;$gameSystem[_0x4fdfd3(0x392)](_0x5f8ab6,_0x5cd00c,_0x33c201,_0x467667,_0x320c64,_0xcf5105,_0x16a997);}),PluginManager['registerCommand'](pluginData[_0x2db143(0x4c2)],_0x2db143(0x46d),_0x5d45f5=>{const _0x5b1175=_0x2db143;VisuMZ[_0x5b1175(0x20a)](_0x5d45f5,_0x5d45f5);const _0x164999=$gameTemp[_0x5b1175(0x179)](),_0x4d2681=_0x5d45f5[_0x5b1175(0x3f6)]||$gameMap['mapId'](),_0x5d0de7=_0x5d45f5[_0x5b1175(0x180)]||_0x164999['eventId']();$gameSystem[_0x5b1175(0x3f1)](_0x4d2681,_0x5d0de7);}),PluginManager[_0x2db143(0x221)](pluginData[_0x2db143(0x4c2)],_0x2db143(0xc3),_0x1b7778=>{const _0x407f48=_0x2db143;VisuMZ[_0x407f48(0x20a)](_0x1b7778,_0x1b7778);const _0x284e97=_0x1b7778[_0x407f48(0x46e)];$gameTimer[_0x407f48(0x15e)](_0x284e97);}),PluginManager[_0x2db143(0x221)](pluginData[_0x2db143(0x4c2)],'EventTimerExpireClear',_0x3a7a7b=>{const _0x5b7930=_0x2db143;$gameTimer[_0x5b7930(0x15e)](0x0);}),PluginManager[_0x2db143(0x221)](pluginData[_0x2db143(0x4c2)],_0x2db143(0x25c),_0x515b86=>{const _0x11c01b=_0x2db143;if(!$gameTimer[_0x11c01b(0x34c)]())return;VisuMZ[_0x11c01b(0x20a)](_0x515b86,_0x515b86);let _0x4a51d8=0x0;_0x4a51d8+=_0x515b86[_0x11c01b(0x2d1)],_0x4a51d8+=_0x515b86[_0x11c01b(0x4b8)]*0x3c,_0x4a51d8+=_0x515b86[_0x11c01b(0x253)]*0x3c*0x3c,_0x4a51d8+=_0x515b86[_0x11c01b(0x18a)]*0x3c*0x3c*0x3c,$gameTimer[_0x11c01b(0x4da)](_0x4a51d8);}),PluginManager[_0x2db143(0x221)](pluginData['name'],_0x2db143(0x4a9),_0x1552b1=>{const _0x3c8637=_0x2db143;if(!$gameTimer[_0x3c8637(0x34c)]())return;VisuMZ[_0x3c8637(0x20a)](_0x1552b1,_0x1552b1);let _0x5977aa=0x0;_0x5977aa+=_0x1552b1['Frames'],_0x5977aa+=_0x1552b1[_0x3c8637(0x4b8)]*0x3c,_0x5977aa+=_0x1552b1[_0x3c8637(0x253)]*0x3c*0x3c,_0x5977aa+=_0x1552b1[_0x3c8637(0x18a)]*0x3c*0x3c*0x3c,$gameTimer[_0x3c8637(0x3cc)](_0x5977aa);}),PluginManager['registerCommand'](pluginData[_0x2db143(0x4c2)],'EventTimerPause',_0x93f856=>{const _0x393cb5=_0x2db143;if(!$gameTimer[_0x393cb5(0x34c)]())return;$gameTimer[_0x393cb5(0x4fc)]();}),PluginManager['registerCommand'](pluginData['name'],'EventTimerResume',_0x31b27a=>{const _0xc45d=_0x2db143;if(!$gameTimer[_0xc45d(0x34c)]())return;$gameTimer[_0xc45d(0x1d8)]();}),PluginManager['registerCommand'](pluginData[_0x2db143(0x4c2)],_0x2db143(0x4db),_0x4ea5f5=>{const _0x3f805e=_0x2db143;VisuMZ['ConvertParams'](_0x4ea5f5,_0x4ea5f5);const _0x4cdc97=_0x4ea5f5[_0x3f805e(0x13f)]||0x0;$gameTimer[_0x3f805e(0x2ea)](_0x4cdc97);}),PluginManager['registerCommand'](pluginData[_0x2db143(0x4c2)],_0x2db143(0x11c),_0x569d6e=>{const _0x178a18=_0x2db143;VisuMZ[_0x178a18(0x20a)](_0x569d6e,_0x569d6e);const _0x4ae819=!_0x569d6e['Chase'];$gameSystem[_0x178a18(0x24d)](_0x4ae819);}),PluginManager[_0x2db143(0x221)](pluginData[_0x2db143(0x4c2)],_0x2db143(0xb7),_0x5ccc9a=>{const _0x5223f4=_0x2db143;VisuMZ[_0x5223f4(0x20a)](_0x5ccc9a,_0x5ccc9a);const _0x4bceb6=(_0x5ccc9a['FollowerID']||0x0)-0x1,_0x280420=!_0x5ccc9a[_0x5223f4(0x4a2)],_0x52bd8e=$gamePlayer[_0x5223f4(0x1fd)]()[_0x5223f4(0x157)](_0x4bceb6);if(_0x52bd8e)_0x52bd8e[_0x5223f4(0x260)](_0x280420);}),PluginManager[_0x2db143(0x221)](pluginData['name'],'FollowerSetControl',_0x566a86=>{const _0x2d8440=_0x2db143;VisuMZ[_0x2d8440(0x20a)](_0x566a86,_0x566a86);const _0x5500bb=_0x566a86[_0x2d8440(0x3d5)];$gameSystem[_0x2d8440(0x136)](_0x5500bb);}),PluginManager[_0x2db143(0x221)](pluginData['name'],'FollowerReset',_0x44c3df=>{const _0x25b89f=_0x2db143;VisuMZ[_0x25b89f(0x20a)](_0x44c3df,_0x44c3df),$gameSystem[_0x25b89f(0x136)](0x0),$gameSystem[_0x25b89f(0x24d)](![]);for(const _0x4cb827 of $gamePlayer[_0x25b89f(0x1fd)]()[_0x25b89f(0x1e8)]){if(_0x4cb827)_0x4cb827[_0x25b89f(0x260)](![]);}}),PluginManager[_0x2db143(0x221)](pluginData[_0x2db143(0x4c2)],'SwitchGetSelfSwitchABCD',_0x527197=>{const _0x40c0a1=_0x2db143;VisuMZ[_0x40c0a1(0x20a)](_0x527197,_0x527197);const _0x5e12c9=$gameTemp[_0x40c0a1(0x179)]();_0x527197[_0x40c0a1(0x3f6)]=_0x527197['MapId']||$gameMap[_0x40c0a1(0x346)]();const _0xeb6840=[_0x527197[_0x40c0a1(0x3f6)],_0x527197[_0x40c0a1(0x180)]||_0x5e12c9[_0x40c0a1(0x2b5)](),_0x527197[_0x40c0a1(0x3fc)]],_0x46ad5a=_0x527197[_0x40c0a1(0x277)],_0x218ac2=$gameSelfSwitches[_0x40c0a1(0x3a6)](_0xeb6840)||![];$gameSwitches[_0x40c0a1(0x172)](_0x46ad5a,_0x218ac2);}),PluginManager[_0x2db143(0x221)](pluginData[_0x2db143(0x4c2)],_0x2db143(0x12f),_0x5b1e20=>{const _0x4c388c=_0x2db143;VisuMZ[_0x4c388c(0x20a)](_0x5b1e20,_0x5b1e20);const _0x564e7a=$gameTemp[_0x4c388c(0x179)]();_0x5b1e20[_0x4c388c(0x3f6)]=_0x5b1e20['MapId']||$gameMap[_0x4c388c(0x346)]();const _0x1dd674=[_0x5b1e20[_0x4c388c(0x3f6)],_0x5b1e20['EventId']||_0x564e7a[_0x4c388c(0x2b5)](),_0x4c388c(0xae)[_0x4c388c(0x183)](_0x5b1e20[_0x4c388c(0x1c0)])],_0x4f795f=_0x5b1e20[_0x4c388c(0x277)],_0x547f9b=$gameSelfSwitches[_0x4c388c(0x3a6)](_0x1dd674)||![];$gameSwitches[_0x4c388c(0x172)](_0x4f795f,_0x547f9b);}),PluginManager[_0x2db143(0x221)](pluginData[_0x2db143(0x4c2)],_0x2db143(0x1f5),_0x4c47c4=>{const _0x248a9e=_0x2db143;VisuMZ[_0x248a9e(0x20a)](_0x4c47c4,_0x4c47c4);const _0x5ebca4=$gameTemp[_0x248a9e(0x179)]();_0x4c47c4['MapId']=_0x4c47c4['MapId']||$gameMap[_0x248a9e(0x346)]();const _0x1935a9=[_0x4c47c4[_0x248a9e(0x3f6)],_0x4c47c4[_0x248a9e(0x180)]||_0x5ebca4[_0x248a9e(0x2b5)](),'Self\x20Variable\x20%1'[_0x248a9e(0x183)](_0x4c47c4[_0x248a9e(0x4f1)])],_0xe932db=_0x4c47c4['TargetVariableId'],_0x2a9c94=$gameSelfSwitches[_0x248a9e(0x3a6)](_0x1935a9)||![];$gameVariables[_0x248a9e(0x172)](_0xe932db,_0x2a9c94);}),PluginManager[_0x2db143(0x221)](pluginData[_0x2db143(0x4c2)],_0x2db143(0x176),_0x1f038d=>{const _0xafc227=_0x2db143;VisuMZ[_0xafc227(0x20a)](_0x1f038d,_0x1f038d);if(!$gameMap)return;const _0x574b41=$gameTemp['getLastPluginCommandInterpreter'](),_0x184ab5=_0x1f038d[_0xafc227(0x30f)];_0x1f038d[_0xafc227(0x374)]=_0x1f038d[_0xafc227(0x374)]||$gameMap[_0xafc227(0x346)](),_0x1f038d['Step2MapId']=_0x1f038d[_0xafc227(0x16a)]||$gameMap['mapId'](),_0x1f038d[_0xafc227(0x22d)]=_0x1f038d[_0xafc227(0x22d)][_0xafc227(0x2e8)]()[_0xafc227(0x28d)]();if(!_0x184ab5&&_0x1f038d[_0xafc227(0x374)]!==$gameMap['mapId']())return;if($gameMap[_0xafc227(0x346)]()===_0x1f038d[_0xafc227(0x374)]){const _0x683096=$gameMap[_0xafc227(0x124)](_0x1f038d[_0xafc227(0x35b)]||_0x574b41[_0xafc227(0x2b5)]());if(!_0x683096)return;_0x1f038d['TemplateName']!==_0xafc227(0x421)?_0x683096[_0xafc227(0x105)](_0x1f038d[_0xafc227(0x22d)]):_0x683096[_0xafc227(0x185)](_0x1f038d['Step2MapId'],_0x1f038d[_0xafc227(0x15a)]||_0x574b41[_0xafc227(0x2b5)]());}_0x184ab5&&$gameSystem['savePreservedMorphEventDataKey'](_0x1f038d[_0xafc227(0x374)],_0x1f038d[_0xafc227(0x35b)],_0x1f038d[_0xafc227(0x22d)],_0x1f038d[_0xafc227(0x16a)],_0x1f038d['Step2EventId']);}),PluginManager['registerCommand'](pluginData[_0x2db143(0x4c2)],_0x2db143(0x76),_0x4e5224=>{const _0x1bf973=_0x2db143;VisuMZ[_0x1bf973(0x20a)](_0x4e5224,_0x4e5224);if(!$gameMap)return;const _0xf7cc51=$gameTemp[_0x1bf973(0x179)]();_0x4e5224[_0x1bf973(0x3f6)]=_0x4e5224[_0x1bf973(0x3f6)]||$gameMap[_0x1bf973(0x346)]();if($gameMap[_0x1bf973(0x346)]()===_0x4e5224[_0x1bf973(0x3f6)]){const _0x4937fe=$gameMap['event'](_0x4e5224['EventId']||_0xf7cc51[_0x1bf973(0x2b5)]());_0x4937fe['removeMorph']();}if(_0x4e5224[_0x1bf973(0x4ca)]){if('ipNbM'===_0x1bf973(0x42b))return this[_0x1bf973(0x10e)](0x1);else $gameSystem[_0x1bf973(0x480)](_0x4e5224[_0x1bf973(0x3f6)],_0x4e5224[_0x1bf973(0x180)]||_0xf7cc51[_0x1bf973(0x2b5)]());}}),PluginManager[_0x2db143(0x221)](pluginData[_0x2db143(0x4c2)],'PlayerMovementChange',_0x21b730=>{const _0x21d17e=_0x2db143;VisuMZ[_0x21d17e(0x20a)](_0x21b730,_0x21b730),$gameSystem[_0x21d17e(0x1ae)](!_0x21b730[_0x21d17e(0x438)]);}),PluginManager[_0x2db143(0x221)](pluginData[_0x2db143(0x4c2)],_0x2db143(0x1ef),_0x158685=>{const _0x9898a3=_0x2db143;VisuMZ[_0x9898a3(0x20a)](_0x158685,_0x158685),$gameSystem[_0x9898a3(0x3ed)](_0x158685[_0x9898a3(0xa1)]);}),PluginManager[_0x2db143(0x221)](pluginData[_0x2db143(0x4c2)],_0x2db143(0x38d),_0x4cc96e=>{const _0x40aba3=_0x2db143;VisuMZ[_0x40aba3(0x20a)](_0x4cc96e,_0x4cc96e),$gameSystem[_0x40aba3(0x419)]($gamePlayer,_0x4cc96e[_0x40aba3(0x51d)],_0x4cc96e[_0x40aba3(0x2ce)],_0x4cc96e[_0x40aba3(0x1e2)],_0x4cc96e[_0x40aba3(0x1e3)]);}),PluginManager['registerCommand'](pluginData[_0x2db143(0x4c2)],'PlayerIconDelete',_0x5482cf=>{const _0x5dfbb6=_0x2db143;VisuMZ[_0x5dfbb6(0x20a)](_0x5482cf,_0x5482cf),$gameSystem[_0x5dfbb6(0xf5)]($gamePlayer);}),PluginManager[_0x2db143(0x221)](pluginData[_0x2db143(0x4c2)],_0x2db143(0x3e9),_0x695840=>{const _0x11394e=_0x2db143;VisuMZ[_0x11394e(0x20a)](_0x695840,_0x695840);const _0x359ba5=$gameTemp[_0x11394e(0x179)]();_0x695840[_0x11394e(0x3f6)]=_0x695840[_0x11394e(0x3f6)]||$gameMap[_0x11394e(0x346)]();const _0x383b76=[_0x695840[_0x11394e(0x3f6)],_0x695840[_0x11394e(0x180)]||_0x359ba5['eventId'](),_0x695840['Letter']];switch(_0x695840['Value']){case'ON':$gameSelfSwitches[_0x11394e(0x172)](_0x383b76,!![]);break;case _0x11394e(0x2f5):$gameSelfSwitches['setValue'](_0x383b76,![]);break;case _0x11394e(0x164):$gameSelfSwitches['setValue'](_0x383b76,!$gameSelfSwitches[_0x11394e(0x3a6)](_0x383b76));break;}}),PluginManager[_0x2db143(0x221)](pluginData[_0x2db143(0x4c2)],_0x2db143(0x32d),_0xf1c6cb=>{const _0x46e7cf=_0x2db143;VisuMZ['ConvertParams'](_0xf1c6cb,_0xf1c6cb);const _0x1fdfe0=$gameTemp[_0x46e7cf(0x179)]();_0xf1c6cb[_0x46e7cf(0x3f6)]=_0xf1c6cb[_0x46e7cf(0x3f6)]||$gameMap[_0x46e7cf(0x346)]();const _0x15aab1=[_0xf1c6cb[_0x46e7cf(0x3f6)],_0xf1c6cb[_0x46e7cf(0x180)]||_0x1fdfe0['eventId'](),_0x46e7cf(0xae)[_0x46e7cf(0x183)](_0xf1c6cb[_0x46e7cf(0x1c0)])];switch(_0xf1c6cb['Value']){case'ON':$gameSelfSwitches[_0x46e7cf(0x172)](_0x15aab1,!![]);break;case _0x46e7cf(0x2f5):$gameSelfSwitches[_0x46e7cf(0x172)](_0x15aab1,![]);break;case _0x46e7cf(0x164):$gameSelfSwitches[_0x46e7cf(0x172)](_0x15aab1,!$gameSelfSwitches[_0x46e7cf(0x3a6)](_0x15aab1));break;}}),PluginManager[_0x2db143(0x221)](pluginData[_0x2db143(0x4c2)],_0x2db143(0x23a),_0x245c95=>{const _0x1fbc5c=_0x2db143;VisuMZ[_0x1fbc5c(0x20a)](_0x245c95,_0x245c95);const _0x432240=$gameTemp[_0x1fbc5c(0x179)]();_0x245c95[_0x1fbc5c(0x3f6)]=_0x245c95['MapId']||$gameMap[_0x1fbc5c(0x346)]();const _0x25f54b=[_0x245c95[_0x1fbc5c(0x3f6)],_0x245c95[_0x1fbc5c(0x180)]||_0x432240[_0x1fbc5c(0x2b5)](),_0x1fbc5c(0x3c3)['format'](_0x245c95[_0x1fbc5c(0x4f1)])],_0x454733=VisuMZ[_0x1fbc5c(0x1b4)]($gameSelfSwitches[_0x1fbc5c(0x3a6)](_0x25f54b),_0x245c95['Value'],_0x245c95[_0x1fbc5c(0x2cd)]);$gameSelfSwitches[_0x1fbc5c(0x172)](_0x25f54b,_0x454733);}),PluginManager['registerCommand'](pluginData[_0x2db143(0x4c2)],_0x2db143(0x4ad),_0x5f2f80=>{const _0x1e639d=_0x2db143;VisuMZ['ConvertParams'](_0x5f2f80,_0x5f2f80);const _0x5887f1=$gameTemp['getLastPluginCommandInterpreter'](),_0x4ddb7b={'template':_0x5f2f80[_0x1e639d(0x22d)],'mapId':_0x5f2f80['MapId']||$gameMap[_0x1e639d(0x346)](),'eventId':_0x5f2f80['EventId']||_0x5887f1['eventId'](),'x':_0x5f2f80[_0x1e639d(0x499)],'y':_0x5f2f80[_0x1e639d(0x2ed)],'spawnPreserved':_0x5f2f80[_0x1e639d(0x18f)],'spawnEventId':$gameMap[_0x1e639d(0x435)][_0x1e639d(0x141)]+0x3e8},_0x1939f0=_0x5f2f80[_0x1e639d(0x37f)]||0x0,_0x39e1c7=$gameMap['prepareSpawnedEventAtXY'](_0x4ddb7b,_0x5f2f80[_0x1e639d(0x4b2)],_0x5f2f80[_0x1e639d(0x501)]);if(_0x1939f0){if(_0x1e639d(0x2c1)===_0x1e639d(0x2c1))$gameSwitches['setValue'](_0x1939f0,!!_0x39e1c7);else{var _0x19449f=_0x1616f3[_0x1e639d(0x483)][_0x1e639d(0x111)][_0x1e639d(0x3f0)](this,_0x443d4d);return _0x19449f&&this['CPCsMet'](_0x41e118);}}}),PluginManager[_0x2db143(0x221)](pluginData['name'],_0x2db143(0x1e9),_0x251026=>{const _0x2b9c1a=_0x2db143;VisuMZ['ConvertParams'](_0x251026,_0x251026);const _0x403f4b=$gameTemp['getLastPluginCommandInterpreter'](),_0x3f8ddc={'template':_0x251026['TemplateName'],'mapId':_0x251026[_0x2b9c1a(0x3f6)]||$gameMap['mapId'](),'eventId':_0x251026[_0x2b9c1a(0x180)]||_0x403f4b[_0x2b9c1a(0x2b5)](),'x':-0x1,'y':-0x1,'spawnPreserved':_0x251026[_0x2b9c1a(0x18f)],'spawnEventId':$gameMap[_0x2b9c1a(0x435)][_0x2b9c1a(0x141)]+0x3e8},_0x15b2f7=_0x251026['SuccessSwitchId']||0x0,_0x52c8ed=$gameMap[_0x2b9c1a(0x307)](_0x3f8ddc,_0x251026['Region'],_0x251026['Collision'],_0x251026[_0x2b9c1a(0x501)]);if(_0x15b2f7){if('Vvbxk'==='Vvbxk')$gameSwitches[_0x2b9c1a(0x172)](_0x15b2f7,!!_0x52c8ed);else{const _0x1414df=this[_0x2b9c1a(0x248)](this[_0x2b9c1a(0x453)]());return _0x2c8e11[_0x2b9c1a(0x4fe)](this['y'],_0x1414df);}}}),PluginManager['registerCommand'](pluginData[_0x2db143(0x4c2)],'SpawnEventAtTerrainTag',_0x46083d=>{const _0x957836=_0x2db143;VisuMZ['ConvertParams'](_0x46083d,_0x46083d);const _0x2a05a6=$gameTemp[_0x957836(0x179)](),_0x4636c6={'template':_0x46083d[_0x957836(0x22d)],'mapId':_0x46083d[_0x957836(0x3f6)]||$gameMap['mapId'](),'eventId':_0x46083d['EventId']||_0x2a05a6[_0x957836(0x2b5)](),'x':-0x1,'y':-0x1,'spawnPreserved':_0x46083d[_0x957836(0x18f)],'spawnEventId':$gameMap[_0x957836(0x435)][_0x957836(0x141)]+0x3e8},_0x1431f5=_0x46083d[_0x957836(0x37f)]||0x0,_0x275b48=$gameMap[_0x957836(0x3d1)](_0x4636c6,_0x46083d['TerrainTags'],_0x46083d[_0x957836(0x4b2)],_0x46083d[_0x957836(0x501)]);_0x1431f5&&$gameSwitches[_0x957836(0x172)](_0x1431f5,!!_0x275b48);}),PluginManager[_0x2db143(0x221)](pluginData[_0x2db143(0x4c2)],_0x2db143(0xa4),_0x1631f5=>{const _0x3a75fd=_0x2db143;VisuMZ[_0x3a75fd(0x20a)](_0x1631f5,_0x1631f5);const _0x3abf4b=$gameTemp['getLastPluginCommandInterpreter']();$gameMap[_0x3a75fd(0x244)](_0x1631f5[_0x3a75fd(0x4ee)]||_0x3abf4b[_0x3a75fd(0x2b5)]());}),PluginManager[_0x2db143(0x221)](pluginData[_0x2db143(0x4c2)],_0x2db143(0x468),_0x567d41=>{const _0x51622a=_0x2db143;VisuMZ[_0x51622a(0x20a)](_0x567d41,_0x567d41);const _0x4e37b7=_0x567d41['PosX'],_0x5d653e=_0x567d41[_0x51622a(0x2ed)];$gameMap[_0x51622a(0x107)](_0x4e37b7,_0x5d653e);}),PluginManager[_0x2db143(0x221)](pluginData[_0x2db143(0x4c2)],'SpawnEventDespawnRegions',_0x1bb225=>{const _0x4c9843=_0x2db143;VisuMZ[_0x4c9843(0x20a)](_0x1bb225,_0x1bb225),$gameMap[_0x4c9843(0x1e4)](_0x1bb225['Region']);}),PluginManager[_0x2db143(0x221)](pluginData[_0x2db143(0x4c2)],_0x2db143(0x429),_0x36c4c0=>{const _0x931906=_0x2db143;VisuMZ[_0x931906(0x20a)](_0x36c4c0,_0x36c4c0),$gameMap[_0x931906(0x3b6)](_0x36c4c0['TerrainTags']);}),PluginManager[_0x2db143(0x221)](pluginData[_0x2db143(0x4c2)],_0x2db143(0x2f4),_0x5c7d9e=>{VisuMZ['ConvertParams'](_0x5c7d9e,_0x5c7d9e),$gameMap['despawnEverything']();}),VisuMZ[_0x2db143(0x483)]['Scene_Boot_onDatabaseLoaded']=Scene_Boot[_0x2db143(0x287)][_0x2db143(0x2bc)],Scene_Boot['prototype']['onDatabaseLoaded']=function(){const _0x1bc67d=_0x2db143;VisuMZ[_0x1bc67d(0x483)][_0x1bc67d(0x3af)]['call'](this),this[_0x1bc67d(0x4aa)](),this[_0x1bc67d(0x451)]();if(VisuMZ['EventsMoveCore'][_0x1bc67d(0xde)])VisuMZ[_0x1bc67d(0x483)]['CustomPageConditions'][_0x1bc67d(0xbf)]();},VisuMZ[_0x2db143(0x395)]=[],VisuMZ[_0x2db143(0x500)]={},Scene_Boot[_0x2db143(0x287)][_0x2db143(0x4aa)]=function(){const _0x580d18=_0x2db143;if(DataManager[_0x580d18(0x3a3)]()||DataManager[_0x580d18(0x470)]())return;const _0x56f400=VisuMZ[_0x580d18(0x483)][_0x580d18(0x516)][_0x580d18(0x217)],_0x41cbe6=_0x56f400[_0x580d18(0x494)][_0x580d18(0x49b)](0x0);for(const _0x563c07 of _0x56f400[_0x580d18(0x77)]){if(_0x580d18(0x229)!==_0x580d18(0x229)){if(this[_0x580d18(0x198)]===_0x2940f3)this[_0x580d18(0x21d)]();this[_0x580d18(0x198)]=_0x33c275;}else{_0x563c07['Name']=_0x563c07[_0x580d18(0x15c)][_0x580d18(0x2e8)]()[_0x580d18(0x28d)](),VisuMZ[_0x580d18(0x500)][_0x563c07[_0x580d18(0x15c)]]=_0x563c07;if(!_0x41cbe6['includes'](_0x563c07[_0x580d18(0x3d8)]))_0x41cbe6[_0x580d18(0xec)](_0x563c07['MapID']);}}for(const _0x24945c of _0x41cbe6){if(_0x580d18(0xe1)==='dyKpl'){const _0x36a7d4=this[_0x580d18(0x26c)],_0x5eb060=_0x13b2a8[this['_callEventMap']],_0x5e3251=_0x5eb060[_0x580d18(0x4e5)][_0x36a7d4[_0x580d18(0x2b5)]];if(_0x5e3251&&_0x5e3251[_0x580d18(0x4b7)][_0x36a7d4[_0x580d18(0x121)]-0x1]){const _0x580e7d=_0x5e3251[_0x580d18(0x4b7)][_0x36a7d4[_0x580d18(0x121)]-0x1]['list'];this['setupChild'](_0x580e7d,this[_0x580d18(0x2b5)]());}_0x309c07[this[_0x580d18(0x40e)]]=_0x4226c1,this[_0x580d18(0x40e)]=_0x52f07b,this[_0x580d18(0x26c)]=_0x3d58f6;}else{if(VisuMZ[_0x580d18(0x395)][_0x24945c])continue;const _0x182af1=_0x580d18(0x49a)[_0x580d18(0x183)](_0x24945c[_0x580d18(0x349)](0x3)),_0x37666b=_0x580d18(0xeb)[_0x580d18(0x183)](_0x24945c);DataManager[_0x580d18(0xd1)](_0x37666b,_0x182af1),setTimeout(this[_0x580d18(0x213)]['bind'](this,_0x24945c,_0x37666b),0x64);}}},Scene_Boot[_0x2db143(0x287)][_0x2db143(0x213)]=function(_0x1dff04,_0x3a2818){const _0x2df75e=_0x2db143;if(window[_0x3a2818]){if(_0x2df75e(0x38f)!=='oCPVD')VisuMZ[_0x2df75e(0x395)][_0x1dff04]=window[_0x3a2818],window[_0x3a2818]=undefined;else for(let _0x392abb=-this['_addedHitbox']['up'];_0x392abb<=this[_0x2df75e(0x2ba)][_0x2df75e(0xd0)];_0x392abb++){if(!_0x3579b0[_0x2df75e(0x287)]['canPass']['call'](this,_0x123fc6+_0xd56511,_0x13fd09+_0x392abb,_0x35a42a))return![];}}else{if(_0x2df75e(0x308)===_0x2df75e(0x308))setTimeout(this['VisuMZ_Setup_Preload_Map'][_0x2df75e(0x4a0)](this,_0x1dff04,_0x3a2818),0x64);else{const _0x1077b8=_0x175750[_0x2df75e(0x1fe)](this[_0x2df75e(0xd6)]());this[_0x2df75e(0x291)](_0x1077b8);}}},VisuMZ[_0x2db143(0x242)]=[],VisuMZ[_0x2db143(0xa3)]=[],VisuMZ['AdvancedVariables']=[],VisuMZ[_0x2db143(0x4ae)]=[],Scene_Boot[_0x2db143(0x287)]['process_VisuMZ_EventsMoveCore_Switches_Variables']=function(){const _0x4712e1=_0x2db143;for(let _0x310320=0x1;_0x310320<$dataSystem[_0x4712e1(0x366)][_0x4712e1(0x141)];_0x310320++){if(_0x4712e1(0x329)!==_0x4712e1(0x329))this[_0x4712e1(0x23e)]=!![];else{if($dataSystem[_0x4712e1(0x366)][_0x310320]['match'](/<JS>\s*([\s\S]*)\s*<\/JS>/i))VisuMZ[_0x4712e1(0x242)]['push'](_0x310320);if($dataSystem[_0x4712e1(0x366)][_0x310320][_0x4712e1(0x474)](/<SELF>/i))VisuMZ[_0x4712e1(0xa3)][_0x4712e1(0xec)](_0x310320);}}for(let _0x2d2a11=0x1;_0x2d2a11<$dataSystem['variables'][_0x4712e1(0x141)];_0x2d2a11++){if(_0x4712e1(0x212)!==_0x4712e1(0x32e)){if($dataSystem[_0x4712e1(0x396)][_0x2d2a11][_0x4712e1(0x474)](/<JS>\s*([\s\S]*)\s*<\/JS>/i))VisuMZ[_0x4712e1(0x452)][_0x4712e1(0xec)](_0x2d2a11);if($dataSystem[_0x4712e1(0x396)][_0x2d2a11][_0x4712e1(0x474)](/<SELF>/i))VisuMZ[_0x4712e1(0x4ae)]['push'](_0x2d2a11);}else{if(_0x4218eb['BoatSpeed'])this[_0x4712e1(0xdc)](_0x4337b3[_0x4712e1(0x459)]);}}},VisuMZ['EventsMoveCore'][_0x2db143(0xde)]={},VisuMZ['EventsMoveCore']['CustomPageConditions'][_0x2db143(0xbf)]=function(){const _0x248d12=_0x2db143;this[_0x248d12(0x1ca)]=new Game_CPCInterpreter(),this[_0x248d12(0x23f)]();},VisuMZ['EventsMoveCore']['CustomPageConditions']['determineCommonEventsWithCPC']=function(){const _0x19b918=_0x2db143;this[_0x19b918(0x297)]=[];for(const _0x3d8361 of $dataCommonEvents){if(_0x19b918(0x1c6)!==_0x19b918(0x2e7)){if(!_0x3d8361)continue;VisuMZ[_0x19b918(0x483)]['CustomPageConditions'][_0x19b918(0x465)](_0x3d8361);if(_0x3d8361[_0x19b918(0x4bc)][_0x19b918(0x141)]>0x0)this[_0x19b918(0x297)][_0x19b918(0xec)](_0x3d8361['id']);}else return this[_0x19b918(0x3de)]['text'];}},VisuMZ[_0x2db143(0x483)][_0x2db143(0xde)][_0x2db143(0x348)]=function(_0x259f96,_0x4db7dd){const _0x49b81a=_0x2db143;return this[_0x49b81a(0x1ca)][_0x49b81a(0x41a)](_0x259f96,_0x4db7dd),this[_0x49b81a(0x1ca)]['execute'](),this['_interpreter'][_0x49b81a(0x403)];},VisuMZ['EventsMoveCore'][_0x2db143(0xde)]['loadCPC']=function(_0x1910f2){const _0x919c43=_0x2db143;let _0xc2ba09=![];_0x1910f2[_0x919c43(0x4bc)]=[];for(const _0x5c47e6 of _0x1910f2[_0x919c43(0x388)]){if([0x6c,0x198]['includes'](_0x5c47e6[_0x919c43(0x2c5)])){if('PtYtL'===_0x919c43(0x408)){const _0x26ba94=_0x5c47e6[_0x919c43(0xe2)][0x0];if(_0x26ba94[_0x919c43(0x474)](/<PAGE (?:CONDITION|CONDITIONS)>/i)){if(_0x919c43(0x3cb)!==_0x919c43(0x49f))_0xc2ba09=!![];else{const _0x289b1e=_0x2ecf59[_0x919c43(0x124)](_0xcd032a['Step1EventId']||_0x14f0bb['eventId']());if(!_0x289b1e)return;_0x45ac47[_0x919c43(0x22d)]!=='UNTITLED'?_0x289b1e[_0x919c43(0x105)](_0xc7e0d['TemplateName']):_0x289b1e['morphInto'](_0x4a883d[_0x919c43(0x16a)],_0x125ed2[_0x919c43(0x15a)]||_0x1e512e[_0x919c43(0x2b5)]());}}else _0x26ba94[_0x919c43(0x474)](/<\/PAGE (?:CONDITION|CONDITIONS)>/i)&&(_0xc2ba09=![]);}else{const _0x1d3134=_0x16b08d[_0x919c43(0x3a7)]()||this;if(_0x1d3134['constructor']!==_0x1235d8)_0x100338[_0x919c43(0x483)][_0x919c43(0x4f6)][_0x919c43(0x3f0)](this,_0x53683a,_0x4ee181);else{const _0x36f1b7=[_0x1d3134[_0x919c43(0x9d)],_0x1d3134[_0x919c43(0x50b)],_0x919c43(0x3c3)[_0x919c43(0x183)](_0x4af363)];_0xdaf807[_0x919c43(0x172)](_0x36f1b7,_0x5ba2e9);}}}_0xc2ba09&&(_0x919c43(0x31c)===_0x919c43(0x406)?this[_0x919c43(0x259)](_0x8120a2):_0x1910f2[_0x919c43(0x4bc)][_0x919c43(0xec)](_0x5c47e6));}},getSelfSwitchValue=function(_0x2ffe87,_0x83ad90,_0x9dfa53){const _0x2db7df=_0x2db143;let _0x3884ad=[_0x2ffe87,_0x83ad90,_0x2db7df(0xae)[_0x2db7df(0x183)](_0x9dfa53)];return typeof _0x9dfa53==='string'&&(_0x3884ad=[_0x2ffe87,_0x83ad90,_0x9dfa53[_0x2db7df(0x2e8)]()[_0x2db7df(0x28d)]()]),$gameSelfSwitches[_0x2db7df(0x3a6)](_0x3884ad);},getSelfVariableValue=function(_0xba923,_0x36aa85,_0x140841){const _0x2a990b=_0x2db143,_0xa53b54=[_0xba923,_0x36aa85,_0x2a990b(0x3c3)['format'](_0x140841)];return $gameSelfSwitches['value'](_0xa53b54);},setSelfSwitchValue=function(_0x290e80,_0x4f97d4,_0x134068,_0x52a72c){const _0x2f890c=_0x2db143;let _0x37e94f=[_0x290e80,_0x4f97d4,'Self\x20Switch\x20%1'[_0x2f890c(0x183)](_0x134068)];typeof _0x134068===_0x2f890c(0x398)&&('iixvL'!==_0x2f890c(0x2b8)?_0x1f401b===_0x2f890c(0x169)?this[_0x2f890c(0x161)]():this[_0x2f890c(0x189)]():_0x37e94f=[_0x290e80,_0x4f97d4,_0x134068['toUpperCase']()[_0x2f890c(0x28d)]()]),$gameSelfSwitches[_0x2f890c(0x172)](_0x37e94f,_0x52a72c);},setSelfVariableValue=function(_0x144b0f,_0x5a200f,_0x4b8edc,_0x13d775){const _0x4ae3a4=_0x2db143,_0x4ca576=[_0x144b0f,_0x5a200f,_0x4ae3a4(0x3c3)[_0x4ae3a4(0x183)](_0x4b8edc)];$gameSelfSwitches['setValue'](_0x4ca576,_0x13d775);},DataManager['isAdvancedSwitch']=function(_0x1d0c02){const _0x2936fb=_0x2db143;if(SceneManager[_0x2936fb(0x122)][_0x2936fb(0x12d)]===Scene_Debug)return![];return VisuMZ[_0x2936fb(0x242)][_0x2936fb(0x2c8)](_0x1d0c02);},DataManager[_0x2db143(0x2bf)]=function(_0x447480){const _0xe1d90b=_0x2db143;if(SceneManager[_0xe1d90b(0x122)]['constructor']===Scene_Debug)return![];return VisuMZ[_0xe1d90b(0x452)]['includes'](_0x447480);},DataManager[_0x2db143(0x2fd)]=function(_0x4ea1b2){const _0x5b0088=_0x2db143;if(SceneManager[_0x5b0088(0x122)][_0x5b0088(0x12d)]===Scene_Debug)return![];return VisuMZ[_0x5b0088(0xa3)]['includes'](_0x4ea1b2);},DataManager[_0x2db143(0x521)]=function(_0x432e0f){const _0x50aee1=_0x2db143;if(SceneManager[_0x50aee1(0x122)][_0x50aee1(0x12d)]===Scene_Debug)return![];return VisuMZ[_0x50aee1(0x4ae)][_0x50aee1(0x2c8)](_0x432e0f);},VisuMZ[_0x2db143(0x483)][_0x2db143(0x173)]=Game_Temp['prototype']['setDestination'],Game_Temp[_0x2db143(0x287)][_0x2db143(0x1a1)]=function(_0x53249b,_0x20f871){const _0x1e3ae8=_0x2db143;if(this['isEventClickTriggered'](_0x53249b,_0x20f871))return;VisuMZ[_0x1e3ae8(0x483)][_0x1e3ae8(0x173)][_0x1e3ae8(0x3f0)](this,_0x53249b,_0x20f871);},Game_Temp[_0x2db143(0x287)]['isEventClickTriggered']=function(_0x3f19b5,_0x4fc820){const _0x4cbf64=_0x2db143,_0x2c0afb=$gameMap[_0x4cbf64(0x218)](_0x3f19b5,_0x4fc820);for(const _0x476bd8 of _0x2c0afb){if(_0x476bd8&&_0x476bd8[_0x4cbf64(0xd2)]())return _0x476bd8['onClickTrigger'](),!![];}return![];},Game_Temp[_0x2db143(0x287)][_0x2db143(0x4c3)]=function(_0x1a8bd9){const _0x1e89f3=_0x2db143;this[_0x1e89f3(0x91)]=_0x1a8bd9;},Game_Temp[_0x2db143(0x287)][_0x2db143(0x179)]=function(){const _0x5e359e=_0x2db143;return this[_0x5e359e(0x91)];},Game_Temp[_0x2db143(0x287)][_0x2db143(0x222)]=function(_0x364054){const _0x2d225a=_0x2db143;this[_0x2d225a(0x293)]=_0x364054;},Game_Temp[_0x2db143(0x287)][_0x2db143(0x214)]=function(){const _0x3cc55a=_0x2db143;this[_0x3cc55a(0x293)]=undefined;},Game_Temp['prototype'][_0x2db143(0x3a7)]=function(){const _0x33e6f9=_0x2db143;return this[_0x33e6f9(0x293)];},VisuMZ['EventsMoveCore'][_0x2db143(0xb4)]=Game_System[_0x2db143(0x287)][_0x2db143(0xbf)],Game_System[_0x2db143(0x287)][_0x2db143(0xbf)]=function(){const _0x29f0ab=_0x2db143;VisuMZ['EventsMoveCore'][_0x29f0ab(0xb4)][_0x29f0ab(0x3f0)](this),this[_0x29f0ab(0x21d)](),this[_0x29f0ab(0x401)]();},Game_System[_0x2db143(0x287)][_0x2db143(0x21d)]=function(){const _0x444205=_0x2db143;this['_EventsMoveCoreSettings']={'DashingEnable':!![],'EventAutoMovement':!![],'VisibleEventLabels':!![]},this[_0x444205(0x294)]={},this['_MapSpawnedEventData']=[],this[_0x444205(0x267)]={},this[_0x444205(0x360)]={},this['_DisablePlayerControl']=![],this[_0x444205(0x1f4)]='default';},Game_System[_0x2db143(0x287)][_0x2db143(0x1a5)]=function(){const _0x6ee0e7=_0x2db143;if(this[_0x6ee0e7(0x35f)]===undefined)this[_0x6ee0e7(0x21d)]();if(this[_0x6ee0e7(0x35f)][_0x6ee0e7(0xa2)]===undefined)this['initEventsMoveCore']();return this[_0x6ee0e7(0x35f)][_0x6ee0e7(0xa2)];},Game_System[_0x2db143(0x287)][_0x2db143(0x3b4)]=function(_0x4eba89){const _0x2856fb=_0x2db143;if(this[_0x2856fb(0x35f)]===undefined)this['initEventsMoveCore']();if(this[_0x2856fb(0x35f)]['DashingEnable']===undefined)this[_0x2856fb(0x21d)]();this[_0x2856fb(0x35f)][_0x2856fb(0xa2)]=_0x4eba89;},Game_System['prototype'][_0x2db143(0x4d4)]=function(){const _0x13b429=_0x2db143;if(this[_0x13b429(0x35f)]===undefined)this[_0x13b429(0x21d)]();if(this[_0x13b429(0x35f)]['EventAutoMovement']===undefined)this[_0x13b429(0x21d)]();return this[_0x13b429(0x35f)]['EventAutoMovement'];},Game_System[_0x2db143(0x287)][_0x2db143(0x25e)]=function(_0xc7eea4){const _0x4e419f=_0x2db143;if(this['_EventsMoveCoreSettings']===undefined)this[_0x4e419f(0x21d)]();if(this[_0x4e419f(0x35f)][_0x4e419f(0x26a)]===undefined)this[_0x4e419f(0x21d)]();this[_0x4e419f(0x35f)][_0x4e419f(0x26a)]=_0xc7eea4;},Game_System[_0x2db143(0x287)][_0x2db143(0x12a)]=function(){const _0x280eff=_0x2db143;if(this[_0x280eff(0x35f)]===undefined)this[_0x280eff(0x21d)]();if(this['_EventsMoveCoreSettings']['VisibleEventLabels']===undefined)this[_0x280eff(0x21d)]();return this[_0x280eff(0x35f)][_0x280eff(0x3a5)];},Game_System['prototype'][_0x2db143(0x323)]=function(_0x4ee2da){const _0x1e0472=_0x2db143;if(this[_0x1e0472(0x35f)]===undefined)this['initEventsMoveCore']();if(this[_0x1e0472(0x35f)][_0x1e0472(0x3a5)]===undefined)this[_0x1e0472(0x21d)]();this[_0x1e0472(0x35f)][_0x1e0472(0x3a5)]=_0x4ee2da;},Game_System[_0x2db143(0x287)][_0x2db143(0x49d)]=function(){const _0x4014e3=_0x2db143;return this['_DisablePlayerControl']===undefined&&(this[_0x4014e3(0x365)]=![]),this[_0x4014e3(0x365)];},Game_System[_0x2db143(0x287)][_0x2db143(0x1ae)]=function(_0x884e90){const _0x2943d2=_0x2db143;this[_0x2943d2(0x365)]=_0x884e90;},Game_System[_0x2db143(0x287)]['getPlayerDiagonalSetting']=function(){const _0x3404bd=_0x2db143;return this[_0x3404bd(0x1f4)];},Game_System[_0x2db143(0x287)][_0x2db143(0x3ed)]=function(_0x4b05a2){const _0x5ea78f=_0x2db143;this[_0x5ea78f(0x1f4)]=String(_0x4b05a2)['toLowerCase']()['trim']();},Game_System['prototype'][_0x2db143(0x43f)]=function(_0xa3b6b){const _0x3778fe=_0x2db143;if(this['_EventIcons']===undefined)this[_0x3778fe(0x21d)]();if(!_0xa3b6b)return null;if(_0xa3b6b===$gamePlayer)return this[_0x3778fe(0x294)][_0x3778fe(0x286)];else{if('DcBNj'===_0x3778fe(0x443)){const _0x2df39b=VisuMZ[_0x3778fe(0x483)][_0x3778fe(0x516)],_0x3dec8b=_0x3778fe(0x47c)['format'](_0xa3b6b[_0x3778fe(0x9d)],_0xa3b6b['_eventId']);return this[_0x3778fe(0x294)][_0x3dec8b]=this['_EventIcons'][_0x3dec8b]||{'iconIndex':0x0,'bufferX':_0x2df39b[_0x3778fe(0x358)][_0x3778fe(0xd4)],'bufferY':_0x2df39b[_0x3778fe(0x358)][_0x3778fe(0x17d)],'blendMode':_0x2df39b[_0x3778fe(0x358)]['BlendMode']},this[_0x3778fe(0x294)][_0x3dec8b];}else return _0x2d8394>0x0?0x6:0x4;}},Game_System[_0x2db143(0x287)][_0x2db143(0x419)]=function(_0x372ae3,_0xffd53,_0x22af2,_0x1c9021,_0xf7d095){const _0x23cadd=_0x2db143;if(this[_0x23cadd(0x294)]===undefined)this[_0x23cadd(0x21d)]();const _0x54a040=_0x372ae3===$gamePlayer?'Player':_0x23cadd(0x47c)[_0x23cadd(0x183)](_0x372ae3[_0x23cadd(0x9d)],_0x372ae3[_0x23cadd(0x50b)]);this['_EventIcons'][_0x54a040]={'iconIndex':_0xffd53,'bufferX':_0x22af2,'bufferY':_0x1c9021,'blendMode':_0xf7d095};},Game_System['prototype'][_0x2db143(0x43e)]=function(_0x194f1c,_0x26e317,_0x21217f,_0x46cf30,_0x7170b7,_0x585733){const _0x193e1c=_0x2db143;if(this[_0x193e1c(0x294)]===undefined)this[_0x193e1c(0x21d)]();const _0x2baad6=_0x193e1c(0x47c)[_0x193e1c(0x183)](_0x194f1c,_0x26e317);this[_0x193e1c(0x294)][_0x2baad6]={'iconIndex':_0x21217f,'bufferX':_0x46cf30,'bufferY':_0x7170b7,'blendMode':_0x585733};},Game_System[_0x2db143(0x287)]['deleteIconsOnEventsData']=function(_0x1cdb3c){const _0x363c27=_0x2db143;if(this[_0x363c27(0x294)]===undefined)this[_0x363c27(0x21d)]();if(!_0x1cdb3c)return null;_0x1cdb3c===$gamePlayer?delete this[_0x363c27(0x294)][_0x363c27(0x286)]:this[_0x363c27(0x243)](_0x1cdb3c[_0x363c27(0x9d)],_0x1cdb3c[_0x363c27(0x50b)]);},Game_System[_0x2db143(0x287)][_0x2db143(0x243)]=function(_0x45523c,_0x2790a2){const _0x779955=_0x2db143;if(this[_0x779955(0x294)]===undefined)this['initEventsMoveCore']();const _0x4e3c14=_0x779955(0x47c)[_0x779955(0x183)](_0x45523c,_0x2790a2);delete this['_EventIcons'][_0x4e3c14];},Game_System['prototype'][_0x2db143(0x3c1)]=function(_0x2ff227){const _0x42bb13=_0x2db143;if(this[_0x42bb13(0x360)]===undefined)this[_0x42bb13(0x21d)]();if(!_0x2ff227)return null;const _0xabc878='Map%1-Event%2'['format'](_0x2ff227[_0x42bb13(0x9d)],_0x2ff227[_0x42bb13(0x50b)]);return this[_0x42bb13(0x360)][_0xabc878];},Game_System[_0x2db143(0x287)][_0x2db143(0x93)]=function(_0x38c29d){const _0x2092b5=_0x2db143;if(this[_0x2092b5(0x360)]===undefined)this[_0x2092b5(0x21d)]();if(!_0x38c29d)return;const _0x3592f7=_0x2092b5(0x47c)['format'](_0x38c29d[_0x2092b5(0x9d)],_0x38c29d[_0x2092b5(0x50b)]);this['_SavedEventLocations'][_0x3592f7]={'direction':_0x38c29d[_0x2092b5(0x453)](),'x':Math[_0x2092b5(0x379)](_0x38c29d['x']),'y':Math[_0x2092b5(0x379)](_0x38c29d['y']),'pageIndex':_0x38c29d[_0x2092b5(0x245)],'moveRouteIndex':_0x38c29d[_0x2092b5(0x182)]};},Game_System['prototype'][_0x2db143(0x30e)]=function(_0x421fb5){const _0x393333=_0x2db143;if(this['_SavedEventLocations']===undefined)this[_0x393333(0x21d)]();if(!_0x421fb5)return;this[_0x393333(0x3f1)](_0x421fb5[_0x393333(0x9d)],_0x421fb5['_eventId']);},Game_System[_0x2db143(0x287)][_0x2db143(0x3f1)]=function(_0x310569,_0x2e3172){const _0x2d982c=_0x2db143;if(this[_0x2d982c(0x360)]===undefined)this[_0x2d982c(0x21d)]();const _0x132bae=_0x2d982c(0x47c)[_0x2d982c(0x183)](_0x310569,_0x2e3172);delete this[_0x2d982c(0x360)][_0x132bae];},Game_System[_0x2db143(0x287)][_0x2db143(0x392)]=function(_0x3cec6a,_0x2f2d07,_0x41f277,_0x646d1,_0x4f0d71,_0x3d467e,_0x26848a){const _0x14a089=_0x2db143;if(this['_SavedEventLocations']===undefined)this[_0x14a089(0x21d)]();const _0x43567e=_0x14a089(0x47c)[_0x14a089(0x183)](_0x3cec6a,_0x2f2d07);this[_0x14a089(0x360)][_0x43567e]={'direction':_0x4f0d71,'x':Math[_0x14a089(0x379)](_0x41f277),'y':Math['round'](_0x646d1),'pageIndex':_0x3d467e,'moveRouteIndex':_0x26848a};},Game_System[_0x2db143(0x287)][_0x2db143(0x13c)]=function(_0xe9127e){const _0x4d4a50=_0x2db143;if(this[_0x4d4a50(0x267)]===undefined)this[_0x4d4a50(0x21d)]();if(!_0xe9127e)return;const _0x594e66=_0x4d4a50(0x47c)[_0x4d4a50(0x183)](_0xe9127e[_0x4d4a50(0x9d)],_0xe9127e[_0x4d4a50(0x50b)]);return this[_0x4d4a50(0x267)][_0x594e66];},Game_System[_0x2db143(0x287)][_0x2db143(0x7c)]=function(_0x12929d,_0x4376d5,_0x502cbf,_0x42bd3f,_0x180de2){const _0x3cf755=_0x2db143;if(this[_0x3cf755(0x267)]===undefined)this[_0x3cf755(0x21d)]();const _0x2e7c43=_0x3cf755(0x47c)['format'](_0x12929d,_0x4376d5);this[_0x3cf755(0x267)][_0x2e7c43]={'template':_0x502cbf,'mapId':_0x42bd3f,'eventId':_0x180de2};},Game_System['prototype']['deletePreservedMorphEventDataKey']=function(_0xc414ac,_0x727e48){const _0x5be394=_0x2db143;if(this[_0x5be394(0x267)]===undefined)this[_0x5be394(0x21d)]();const _0x47a135=_0x5be394(0x47c)[_0x5be394(0x183)](_0xc414ac,_0x727e48);delete this[_0x5be394(0x267)][_0x47a135];},Game_System[_0x2db143(0x287)][_0x2db143(0x204)]=function(_0x2016f9){const _0x51f9b1=_0x2db143;if(this['_MapSpawnedEventData']===undefined)this[_0x51f9b1(0x21d)]();return this[_0x51f9b1(0x202)][_0x2016f9]=this[_0x51f9b1(0x202)][_0x2016f9]||[],this[_0x51f9b1(0x202)][_0x2016f9];},Game_System['prototype'][_0x2db143(0xaf)]=function(_0x133389){const _0x90b675=_0x2db143,_0x4ee155=this['getMapSpawnedEventData'](_0x133389);for(const _0x3bc638 of _0x4ee155){if(!_0x3bc638)continue;if(_0x3bc638[_0x90b675(0xcd)])continue;const _0x26717d=_0x4ee155[_0x90b675(0x381)](_0x3bc638);_0x4ee155[_0x26717d]=null;}},Game_System[_0x2db143(0x287)][_0x2db143(0x401)]=function(){const _0x17b26c=_0x2db143;this[_0x17b26c(0xe6)]=0x0,this[_0x17b26c(0x120)]=![];},Game_System[_0x2db143(0x287)][_0x2db143(0x3ce)]=function(){const _0x4e2c1b=_0x2db143;if(this[_0x4e2c1b(0xe6)]===undefined)this['initFollowerController']();return this['_followerControlID'];},Game_System['prototype'][_0x2db143(0x136)]=function(_0x4fd115){const _0x4ce361=_0x2db143;if(this['_followerControlID']===undefined)this[_0x4ce361(0x401)]();this['_followerControlID']=_0x4fd115;;},VisuMZ[_0x2db143(0x483)][_0x2db143(0x135)]=Game_Interpreter[_0x2db143(0x287)][_0x2db143(0x73)],Game_Interpreter[_0x2db143(0x287)][_0x2db143(0x73)]=function(_0x1ef169){const _0x1e6043=_0x2db143;if(!$gameParty[_0x1e6043(0x2af)]()&&_0x1ef169<0x0){let _0x101bf9=$gameSystem[_0x1e6043(0x3ce)]();if(_0x101bf9>0x0)return $gamePlayer[_0x1e6043(0x1fd)]()[_0x1e6043(0x157)](_0x101bf9-0x1);}return VisuMZ[_0x1e6043(0x483)][_0x1e6043(0x135)][_0x1e6043(0x3f0)](this,_0x1ef169);},Game_System['prototype'][_0x2db143(0x281)]=function(){const _0x28b00e=_0x2db143;if(this['_followerChaseOff']===undefined)this[_0x28b00e(0x401)]();return this['_followerChaseOff'];},Game_System['prototype'][_0x2db143(0x24d)]=function(_0x27b970){const _0x488052=_0x2db143;if(this[_0x488052(0x120)]===undefined)this['initFollowerController']();this[_0x488052(0x120)]=_0x27b970;;},VisuMZ[_0x2db143(0x483)]['Game_Timer_initialize']=Game_Timer[_0x2db143(0x287)][_0x2db143(0xbf)],Game_Timer['prototype'][_0x2db143(0xbf)]=function(){const _0x3dcdb0=_0x2db143;VisuMZ[_0x3dcdb0(0x483)][_0x3dcdb0(0xf1)]['call'](this),this[_0x3dcdb0(0x21d)]();},Game_Timer[_0x2db143(0x287)][_0x2db143(0x21d)]=function(){const _0x491b0b=_0x2db143;this[_0x491b0b(0x2b1)]=![],this[_0x491b0b(0x230)]=-0x1,this[_0x491b0b(0x198)]=0x0;},Game_Timer[_0x2db143(0x287)][_0x2db143(0x4e4)]=function(_0x1319aa){const _0x38c420=_0x2db143;if(!_0x1319aa)return;if(!this[_0x38c420(0x3f3)])return;if(this['_paused'])return;if(this[_0x38c420(0x4b1)]<=0x0)return;if(this[_0x38c420(0x230)]===undefined)this[_0x38c420(0x21d)]();this[_0x38c420(0x4b1)]+=this['_speed'],this[_0x38c420(0x4b1)]<=0x0&&this[_0x38c420(0x27f)]();},VisuMZ[_0x2db143(0x483)][_0x2db143(0x148)]=Game_Timer['prototype'][_0x2db143(0x114)],Game_Timer[_0x2db143(0x287)][_0x2db143(0x114)]=function(_0x3c20c8){const _0x5cf564=_0x2db143;VisuMZ[_0x5cf564(0x483)][_0x5cf564(0x148)][_0x5cf564(0x3f0)](this,_0x3c20c8);if(this[_0x5cf564(0x2b1)]===undefined)this['initEventsMoveCore']();this['_paused']=![];},VisuMZ[_0x2db143(0x483)][_0x2db143(0x27a)]=Game_Timer[_0x2db143(0x287)]['stop'],Game_Timer[_0x2db143(0x287)][_0x2db143(0x13b)]=function(){const _0xb30243=_0x2db143;VisuMZ[_0xb30243(0x483)]['Game_Timer_stop'][_0xb30243(0x3f0)](this);if(this[_0xb30243(0x2b1)]===undefined)this[_0xb30243(0x21d)]();this['_paused']=![];},Game_Timer['prototype'][_0x2db143(0x4fc)]=function(){const _0x448a44=_0x2db143;if(this[_0x448a44(0x4b1)]<=0x0)return;this[_0x448a44(0x2b1)]=!![],this[_0x448a44(0x3f3)]=!![];},Game_Timer[_0x2db143(0x287)][_0x2db143(0x1d8)]=function(){const _0x51c737=_0x2db143;if(this[_0x51c737(0x4b1)]<=0x0)return;this['_paused']=![],this[_0x51c737(0x3f3)]=!![];},Game_Timer['prototype'][_0x2db143(0x4da)]=function(_0xb39ade){const _0x10334e=_0x2db143;this[_0x10334e(0x4b1)]=this['_frames']||0x0,this[_0x10334e(0x4b1)]+=_0xb39ade,this[_0x10334e(0x3f3)]=!![],this[_0x10334e(0x4b1)]=Math['max'](0x1,this[_0x10334e(0x4b1)]);},Game_Timer[_0x2db143(0x287)][_0x2db143(0x3cc)]=function(_0x318723){const _0x4ce340=_0x2db143;this[_0x4ce340(0x4b1)]=this[_0x4ce340(0x4b1)]||0x0,this[_0x4ce340(0x4b1)]=_0x318723,this[_0x4ce340(0x3f3)]=!![],this[_0x4ce340(0x4b1)]=Math[_0x4ce340(0x315)](0x1,this['_frames']);},Game_Timer['prototype'][_0x2db143(0x2ea)]=function(_0x4d3d42){const _0x58b994=_0x2db143;this['_speed']=_0x4d3d42,this[_0x58b994(0x3f3)]=!![],_0x4d3d42>0x0&&(this['_frames']=Math[_0x58b994(0x315)](this[_0x58b994(0x4b1)],0x1));},Game_Timer['prototype'][_0x2db143(0x15e)]=function(_0x149bc5){const _0xb4b3da=_0x2db143;if(this['_expireCommonEvent']===undefined)this[_0xb4b3da(0x21d)]();this['_expireCommonEvent']=_0x149bc5;},VisuMZ[_0x2db143(0x483)][_0x2db143(0x362)]=Game_Timer[_0x2db143(0x287)][_0x2db143(0x27f)],Game_Timer['prototype'][_0x2db143(0x27f)]=function(){const _0x4aca94=_0x2db143;if(this[_0x4aca94(0x198)]===undefined)this[_0x4aca94(0x21d)]();if(this[_0x4aca94(0x198)]){if(_0x4aca94(0x2a4)===_0x4aca94(0x155)){_0x2fb944[_0x4aca94(0x139)]=_0x5ec356;const _0x44adc6=new _0x146025(_0x363af0[_0x4aca94(0x346)],_0x37b3fe['eventId']);_0xd3f216[_0x4aca94(0x139)]=_0x2850a4,this[_0x4aca94(0x435)][_0x4aca94(0xec)](_0x44adc6),_0x44adc6[_0x4aca94(0x449)](_0x36ff30),this[_0x4aca94(0x43d)]();}else $gameTemp[_0x4aca94(0xa9)](this[_0x4aca94(0x198)]);}else VisuMZ[_0x4aca94(0x483)][_0x4aca94(0x362)][_0x4aca94(0x3f0)](this);},VisuMZ[_0x2db143(0x483)][_0x2db143(0x484)]=Game_Message['prototype'][_0x2db143(0x350)],Game_Message[_0x2db143(0x287)][_0x2db143(0x350)]=function(_0x50871a){const _0x36810a=_0x2db143;VisuMZ[_0x36810a(0x483)][_0x36810a(0x484)][_0x36810a(0x3f0)](this,_0x50871a),this['_selfEvent']=$gameTemp[_0x36810a(0x3a7)]();},Game_Message[_0x2db143(0x287)][_0x2db143(0x1dc)]=function(){const _0x39fa78=_0x2db143;$gameTemp[_0x39fa78(0x222)](this[_0x39fa78(0x2aa)]);},VisuMZ['EventsMoveCore']['Game_Switches_value']=Game_Switches['prototype'][_0x2db143(0x3a6)],Game_Switches[_0x2db143(0x287)][_0x2db143(0x3a6)]=function(_0x5b54e8){const _0x2da5ec=_0x2db143;if(DataManager[_0x2da5ec(0x17c)](_0x5b54e8))return!!this[_0x2da5ec(0x503)](_0x5b54e8);else return DataManager['isSelfSwitch'](_0x5b54e8)?!!this[_0x2da5ec(0x372)](_0x5b54e8):VisuMZ['EventsMoveCore'][_0x2da5ec(0x250)]['call'](this,_0x5b54e8);},Game_Switches[_0x2db143(0x2ad)]={},Game_Switches['prototype'][_0x2db143(0x503)]=function(_0x596cf6){const _0x4a10b9=_0x2db143;if(!Game_Switches[_0x4a10b9(0x2ad)][_0x596cf6]){$dataSystem['switches'][_0x596cf6][_0x4a10b9(0x474)](/<JS>\s*([\s\S]*)\s*<\/JS>/i);const _0x76e17c='return\x20%1'[_0x4a10b9(0x183)](String(RegExp['$1']));Game_Switches[_0x4a10b9(0x2ad)][_0x596cf6]=new Function(_0x4a10b9(0xc1),_0x76e17c);}const _0x2e7e6f=$gameTemp[_0x4a10b9(0x3a7)]()||this;return Game_Switches['advancedFunc'][_0x596cf6][_0x4a10b9(0x3f0)](_0x2e7e6f,_0x596cf6);},Game_Switches[_0x2db143(0x287)][_0x2db143(0x372)]=function(_0x564574){const _0xcfc5b2=_0x2db143,_0xd4e672=$gameTemp[_0xcfc5b2(0x3a7)]()||this;if(_0xd4e672[_0xcfc5b2(0x12d)]!==Game_Event)return VisuMZ[_0xcfc5b2(0x483)][_0xcfc5b2(0x250)][_0xcfc5b2(0x3f0)](this,_0x564574);else{if(_0xcfc5b2(0x39b)!==_0xcfc5b2(0x39b))return _0x210f1b[_0xcfc5b2(0x203)](0x0,0x0,0x0,0x0);else{const _0x2d53a8=[_0xd4e672['_mapId'],_0xd4e672[_0xcfc5b2(0x50b)],_0xcfc5b2(0xae)[_0xcfc5b2(0x183)](_0x564574)];return $gameSelfSwitches[_0xcfc5b2(0x3a6)](_0x2d53a8);}}},VisuMZ[_0x2db143(0x483)][_0x2db143(0x1e0)]=Game_Switches[_0x2db143(0x287)][_0x2db143(0x172)],Game_Switches['prototype'][_0x2db143(0x172)]=function(_0x14b03b,_0x59b620){const _0x263a50=_0x2db143;DataManager['isSelfSwitch'](_0x14b03b)?_0x263a50(0xbb)===_0x263a50(0x26b)?this[_0x263a50(0x3de)]['offsetY']=_0x262507(_0x37222d['$1']):this[_0x263a50(0x134)](_0x14b03b,_0x59b620):VisuMZ[_0x263a50(0x483)][_0x263a50(0x1e0)][_0x263a50(0x3f0)](this,_0x14b03b,_0x59b620);},Game_Switches[_0x2db143(0x287)]['setSelfValue']=function(_0x390c2a,_0x4382ec){const _0x51846f=_0x2db143,_0x328115=$gameTemp['getSelfTarget']()||this;if(_0x328115[_0x51846f(0x12d)]!==Game_Event){if(_0x51846f(0x2a0)===_0x51846f(0x2a0))VisuMZ[_0x51846f(0x483)][_0x51846f(0x1e0)][_0x51846f(0x3f0)](this,_0x390c2a,_0x4382ec);else{const _0x21286f=_0x55ef5a[_0x51846f(0x124)](_0x328b94(_0x2879ab['$1']));return this[_0x51846f(0x1da)](_0x21286f);}}else{if(_0x51846f(0x1ff)!==_0x51846f(0x1ff)){_0x562792['registerSelfTarget'](this);const _0x2be447=_0x315ad0[_0x51846f(0x483)][_0x51846f(0xd9)][_0x51846f(0x3f0)](this,_0x402383);return _0x48b7dc[_0x51846f(0x214)](),_0x2be447;}else{const _0x47d771=[_0x328115[_0x51846f(0x9d)],_0x328115[_0x51846f(0x50b)],'Self\x20Switch\x20%1'['format'](_0x390c2a)];$gameSelfSwitches['setValue'](_0x47d771,_0x4382ec);}}},VisuMZ[_0x2db143(0x483)][_0x2db143(0x21c)]=Game_Variables['prototype']['value'],Game_Variables[_0x2db143(0x287)][_0x2db143(0x3a6)]=function(_0x3c72dd){const _0xbe545f=_0x2db143;if(DataManager[_0xbe545f(0x2bf)](_0x3c72dd)){if('whmWJ'==='whmWJ')return this[_0xbe545f(0x503)](_0x3c72dd);else{if(!_0x37f8f9&&_0x4b3763[_0xbe545f(0x2f8)]())return![];if(!_0x3169a0&&_0x100dd7[_0xbe545f(0x2fb)]())return![];if([_0xbe545f(0x1d7),_0xbe545f(0x133)][_0xbe545f(0x2c8)](this[_0xbe545f(0x29b)]()))return!![];return _0x336329[_0xbe545f(0x50d)](this);}}else return DataManager[_0xbe545f(0x521)](_0x3c72dd)?this[_0xbe545f(0x372)](_0x3c72dd):VisuMZ['EventsMoveCore']['Game_Variables_value'][_0xbe545f(0x3f0)](this,_0x3c72dd);},Game_Variables['advancedFunc']={},Game_Variables['prototype'][_0x2db143(0x503)]=function(_0x5c6da9){const _0x2a33a3=_0x2db143;if(!Game_Variables['advancedFunc'][_0x5c6da9]){if(_0x2a33a3(0x328)!==_0x2a33a3(0x328)){const _0x8952b6=this['event'](_0x2ff9c5);if(_0x8952b6)_0x8952b6[_0x2a33a3(0x4fa)]();}else{$dataSystem['variables'][_0x5c6da9][_0x2a33a3(0x474)](/<JS>\s*([\s\S]*)\s*<\/JS>/i);const _0x4de5e6=_0x2a33a3(0x39a)[_0x2a33a3(0x183)](String(RegExp['$1']));Game_Variables[_0x2a33a3(0x2ad)][_0x5c6da9]=new Function(_0x2a33a3(0x3e2),_0x4de5e6);}}const _0x449616=$gameTemp[_0x2a33a3(0x3a7)]()||this;return Game_Variables[_0x2a33a3(0x2ad)][_0x5c6da9][_0x2a33a3(0x3f0)](_0x449616,_0x5c6da9);},Game_Variables['prototype']['selfValue']=function(_0x5302d2){const _0x4ace75=_0x2db143,_0x2a3570=$gameTemp['getSelfTarget']()||this;if(_0x2a3570['constructor']!==Game_Event)return VisuMZ['EventsMoveCore'][_0x4ace75(0x21c)]['call'](this,_0x5302d2);else{const _0x374145=[_0x2a3570[_0x4ace75(0x9d)],_0x2a3570[_0x4ace75(0x50b)],_0x4ace75(0x3c3)[_0x4ace75(0x183)](_0x5302d2)];return $gameSelfSwitches['value'](_0x374145);}},VisuMZ[_0x2db143(0x483)][_0x2db143(0x4f6)]=Game_Variables[_0x2db143(0x287)][_0x2db143(0x172)],Game_Variables['prototype'][_0x2db143(0x172)]=function(_0x5511cb,_0x35aaee){const _0x2bb0aa=_0x2db143;DataManager[_0x2bb0aa(0x521)](_0x5511cb)?this[_0x2bb0aa(0x134)](_0x5511cb,_0x35aaee):VisuMZ[_0x2bb0aa(0x483)][_0x2bb0aa(0x4f6)]['call'](this,_0x5511cb,_0x35aaee);},Game_Variables[_0x2db143(0x287)][_0x2db143(0x134)]=function(_0x467a0d,_0x4e3d07){const _0x153ad1=_0x2db143,_0x58a718=$gameTemp[_0x153ad1(0x3a7)]()||this;if(_0x58a718['constructor']!==Game_Event)VisuMZ[_0x153ad1(0x483)][_0x153ad1(0x4f6)][_0x153ad1(0x3f0)](this,_0x467a0d,_0x4e3d07);else{const _0x3b0865=[_0x58a718['_mapId'],_0x58a718[_0x153ad1(0x50b)],_0x153ad1(0x3c3)[_0x153ad1(0x183)](_0x467a0d)];$gameSelfSwitches[_0x153ad1(0x172)](_0x3b0865,_0x4e3d07);}},VisuMZ[_0x2db143(0x483)][_0x2db143(0x41f)]=Game_SelfSwitches[_0x2db143(0x287)][_0x2db143(0x3a6)],Game_SelfSwitches[_0x2db143(0x287)][_0x2db143(0x3a6)]=function(_0x2111bd){const _0x61b2c7=_0x2db143;if(_0x2111bd[0x2][_0x61b2c7(0x474)](/SELF/i))return this[_0x61b2c7(0x372)](_0x2111bd);else{return VisuMZ[_0x61b2c7(0x483)][_0x61b2c7(0x41f)][_0x61b2c7(0x3f0)](this,_0x2111bd);;}},Game_SelfSwitches[_0x2db143(0x287)]['selfValue']=function(_0x2fdb32){const _0x549a9f=_0x2db143;return _0x2fdb32[0x2][_0x549a9f(0x474)](/VAR/i)?this[_0x549a9f(0x1e8)][_0x2fdb32]||0x0:!!this[_0x549a9f(0x1e8)][_0x2fdb32];},VisuMZ[_0x2db143(0x483)][_0x2db143(0x4a8)]=Game_SelfSwitches[_0x2db143(0x287)][_0x2db143(0x172)],Game_SelfSwitches[_0x2db143(0x287)][_0x2db143(0x172)]=function(_0xfc081e,_0x1cc6e3){const _0x3dd749=_0x2db143;if(_0xfc081e[0x2][_0x3dd749(0x474)](/SELF/i))this['setSelfValue'](_0xfc081e,_0x1cc6e3);else{if(_0x3dd749(0x261)!==_0x3dd749(0x4d7))VisuMZ['EventsMoveCore']['Game_SelfSwitches_setValue'][_0x3dd749(0x3f0)](this,_0xfc081e,_0x1cc6e3);else return this[_0x3dd749(0x1ca)]['setup'](_0x47f136,_0x35e35f),this[_0x3dd749(0x1ca)][_0x3dd749(0x34b)](),this[_0x3dd749(0x1ca)][_0x3dd749(0x403)];}},Game_SelfSwitches[_0x2db143(0x287)]['setSelfValue']=function(_0x4b1415,_0x1fd17c){const _0x40e353=_0x2db143;this[_0x40e353(0x1e8)][_0x4b1415]=_0x4b1415[0x2][_0x40e353(0x474)](/VAR/i)?_0x1fd17c:!!_0x1fd17c,this['onChange']();},VisuMZ['EventsMoveCore']['Game_Enemy_meetsSwitchCondition']=Game_Enemy['prototype']['meetsSwitchCondition'],Game_Enemy['prototype'][_0x2db143(0x2b2)]=function(_0x20cd04){const _0x326038=_0x2db143;$gameTemp[_0x326038(0x222)](this);const _0x2ad4c0=VisuMZ[_0x326038(0x483)][_0x326038(0x310)]['call'](this,_0x20cd04);return $gameTemp[_0x326038(0x214)](),_0x2ad4c0;},VisuMZ[_0x2db143(0x483)][_0x2db143(0xd9)]=Game_Troop[_0x2db143(0x287)][_0x2db143(0x78)],Game_Troop['prototype'][_0x2db143(0x78)]=function(_0xe7ea16){const _0x1ad8ef=_0x2db143;$gameTemp[_0x1ad8ef(0x222)](this);const _0x221841=VisuMZ['EventsMoveCore'][_0x1ad8ef(0xd9)][_0x1ad8ef(0x3f0)](this,_0xe7ea16);return $gameTemp['clearSelfTarget'](),_0x221841;},VisuMZ[_0x2db143(0x483)][_0x2db143(0x24f)]=Game_Map[_0x2db143(0x287)]['setup'],Game_Map[_0x2db143(0x287)][_0x2db143(0x41a)]=function(_0xff8fc9){const _0x54c209=_0x2db143;this[_0x54c209(0xaf)](_0xff8fc9),this[_0x54c209(0x43d)](),VisuMZ[_0x54c209(0x483)]['Game_Map_setup'][_0x54c209(0x3f0)](this,_0xff8fc9),this[_0x54c209(0x43d)](),this[_0x54c209(0x3bf)](),this[_0x54c209(0x1a4)](),this[_0x54c209(0x37b)](),this[_0x54c209(0x31b)](),this[_0x54c209(0x43d)]();},VisuMZ['EventsMoveCore'][_0x2db143(0x4e2)]=Game_Map[_0x2db143(0x287)][_0x2db143(0x317)],Game_Map[_0x2db143(0x287)][_0x2db143(0x317)]=function(){const _0x4f7f77=_0x2db143;VisuMZ[_0x4f7f77(0x483)][_0x4f7f77(0x4e2)][_0x4f7f77(0x3f0)](this),this[_0x4f7f77(0x47d)]();},Game_Map[_0x2db143(0x98)]=0xc8,Game_Map[_0x2db143(0x287)][_0x2db143(0x27d)]=function(){const _0x4b7ef3=_0x2db143,_0x384e67=Game_Map[_0x4b7ef3(0x98)];this[_0x4b7ef3(0x45b)]=this[_0x4b7ef3(0x4e5)]()[_0x4b7ef3(0x141)]>_0x384e67;if(this[_0x4b7ef3(0x45b)]&&$gameTemp[_0x4b7ef3(0x199)]()){}},Game_Map[_0x2db143(0x287)]['isEventOverloaded']=function(){const _0xd43293=_0x2db143;return this[_0xd43293(0x45b)];},Game_Map[_0x2db143(0x287)]['clearEventCache']=function(){const _0x5d5099=_0x2db143;this[_0x5d5099(0x386)]=undefined;},Game_Map[_0x2db143(0x287)][_0x2db143(0x3bf)]=function(){const _0x96282c=_0x2db143;this['_diagonalSupport']=VisuMZ['EventsMoveCore']['Settings'][_0x96282c(0x496)][_0x96282c(0x487)];const _0x3ce3cd=$dataMap[_0x96282c(0x4b6)]||'';if(_0x3ce3cd[_0x96282c(0x474)](/<DIAGONAL MOVEMENT: ON>/i))this['_diagonalSupport']=!![];else{if(_0x3ce3cd[_0x96282c(0x474)](/<DIAGONAL MOVEMENT: OFF>/i)){if('jZski'!==_0x96282c(0x47f))this[_0x96282c(0x2e5)]=![];else return _0x663af9[_0x96282c(0x287)]['command108'][_0x96282c(0x3f0)](this,_0x3a0660),this['_comments'][_0x96282c(0x284)](_0x5aa285=>_0x5aa285[_0x96282c(0x474)](/<(?:CONDITION|CONDITIONS) MET>/i))&&(this[_0x96282c(0x403)]=!![]),!![];}}},Game_Map[_0x2db143(0x287)][_0x2db143(0x3d6)]=function(){const _0x150765=_0x2db143,_0x1516df=$gameSystem[_0x150765(0x2c7)]();if(_0x1516df===_0x150765(0x104))return!![];if(_0x1516df===_0x150765(0x2c4))return![];if(this['_diagonalSupport']===undefined)this['setupDiagonalSupport']();return this[_0x150765(0x2e5)];},Game_Map['prototype']['roundXWithDirection']=function(_0x4ccb39,_0x3d4545){const _0x36d0ea=_0x2db143;if([0x1,0x4,0x7]['includes'](_0x3d4545))_0x4ccb39-=0x1;if([0x3,0x6,0x9][_0x36d0ea(0x2c8)](_0x3d4545))_0x4ccb39+=0x1;return this[_0x36d0ea(0x1a8)](_0x4ccb39);},Game_Map[_0x2db143(0x287)][_0x2db143(0x4fe)]=function(_0x24a89f,_0x15d76b){const _0x554c7c=_0x2db143;if([0x1,0x2,0x3]['includes'](_0x15d76b))_0x24a89f+=0x1;if([0x7,0x8,0x9]['includes'](_0x15d76b))_0x24a89f-=0x1;return this[_0x554c7c(0x270)](_0x24a89f);},Game_Map['prototype']['absDistance']=function(_0x3b849f,_0x4f0b8e,_0xa4069c,_0x19a9b5){const _0x24b04d=_0x2db143;return Math[_0x24b04d(0x315)](Math['abs'](this[_0x24b04d(0x300)](_0x3b849f,_0xa4069c)),Math[_0x24b04d(0x187)](this[_0x24b04d(0xf8)](_0x4f0b8e,_0x19a9b5)));},Game_Map[_0x2db143(0x287)][_0x2db143(0x1a4)]=function(){const _0x313b7d=_0x2db143,_0x4ae0a1=VisuMZ['EventsMoveCore'][_0x313b7d(0x516)][_0x313b7d(0x48c)],_0x34f73c={},_0x271ad3=['Allow',_0x313b7d(0x510),'Dock'],_0x33a8e4=['All',_0x313b7d(0x3e3),_0x313b7d(0x286),'Event',_0x313b7d(0xfc),'Boat',_0x313b7d(0x231),_0x313b7d(0x188)];for(const _0x16e318 of _0x271ad3){for(const _0x30959a of _0x33a8e4){if('msjjS'!=='msjjS'){const _0x2e127b=this[_0x313b7d(0x124)]();return this['isActive']()&&_0x2e127b['trigger']>=0x1&&_0x388bc8[_0x313b7d(0x17c)](_0x2e127b[_0x313b7d(0xc1)]);}else{const _0x19dc5f=_0x313b7d(0x112)[_0x313b7d(0x183)](_0x30959a,_0x16e318);_0x4ae0a1[_0x19dc5f]&&(_0x34f73c[_0x19dc5f]=_0x4ae0a1[_0x19dc5f][_0x313b7d(0x49b)](0x0));}}}const _0x4c9739=$dataMap['note']||'',_0x172383=_0x4c9739[_0x313b7d(0x474)](/<(.*) (.*) REGION:[ ]*(\d+(?:\s*,\s*\d+)*)>/gi);if(_0x172383){if(_0x313b7d(0x1a0)===_0x313b7d(0x1a0))for(const _0x18a5b5 of _0x172383){_0x18a5b5[_0x313b7d(0x474)](/<(.*) (.*) REGION:[ ]*(\d+(?:\s*,\s*\d+)*)>/i);let _0x18756e=String(RegExp['$1'])[_0x313b7d(0x12b)]()['trim'](),_0x6c75e0=String(RegExp['$2'])[_0x313b7d(0x12b)]()[_0x313b7d(0x28d)]();const _0x4da9c3=JSON[_0x313b7d(0x418)]('['+RegExp['$3'][_0x313b7d(0x474)](/\d+/g)+']');_0x18756e=_0x18756e['charAt'](0x0)[_0x313b7d(0x2e8)]()+_0x18756e[_0x313b7d(0x49b)](0x1),_0x6c75e0=_0x6c75e0[_0x313b7d(0x319)](0x0)[_0x313b7d(0x2e8)]()+_0x6c75e0['slice'](0x1);const _0x58db8a=_0x313b7d(0x112)[_0x313b7d(0x183)](_0x18756e,_0x6c75e0);if(_0x34f73c[_0x58db8a])_0x34f73c[_0x58db8a]=_0x34f73c[_0x58db8a][_0x313b7d(0x513)](_0x4da9c3);}else return this[_0x313b7d(0xac)]();}this['_regionRules']=_0x34f73c;},Game_Map[_0x2db143(0x287)][_0x2db143(0x15f)]=function(_0x468757,_0x3ad0ca,_0x4db99e,_0x347b79){const _0x287795=_0x2db143,_0x54be63=this[_0x287795(0x19d)](_0x468757,_0x4db99e),_0x52feb1=this[_0x287795(0x4fe)](_0x3ad0ca,_0x4db99e),_0x792aa8=this[_0x287795(0x2b4)](_0x54be63,_0x52feb1),_0x4e5d71=this['_regionRules'];if(_0x4e5d71[_0x287795(0x51f)][_0x287795(0x2c8)](_0x792aa8))return!![];else{if(_0x347b79===_0x287795(0x1ec))return _0x287795(0xe7)!=='DDYsc'?_0x556de0[_0x287795(0x483)][_0x287795(0x516)][_0x287795(0x11e)][_0x287795(0x2f2)]:_0x4e5d71[_0x287795(0x138)]['includes'](_0x792aa8)||_0x4e5d71['WalkAllow'][_0x287795(0x2c8)](_0x792aa8);else{if(_0x347b79===_0x287795(0x124)){if(_0x287795(0x33a)!==_0x287795(0x33a)){if(this[_0x287795(0x360)]===_0x5c7a16)this[_0x287795(0x21d)]();const _0x108ff8=_0x287795(0x47c)['format'](_0x50d1a0,_0x35400e);this[_0x287795(0x360)][_0x108ff8]={'direction':_0x3ca100,'x':_0x4a567e[_0x287795(0x379)](_0x4e6418),'y':_0x4c38bb[_0x287795(0x379)](_0x21c1c1),'pageIndex':_0x115cba,'moveRouteIndex':_0x17f1ec};}else return _0x4e5d71['EventAllow']['includes'](_0x792aa8)||_0x4e5d71[_0x287795(0x162)]['includes'](_0x792aa8);}else{if(_0x4e5d71[_0x287795(0xc9)]['includes'](_0x792aa8))return'BtPSt'!==_0x287795(0xbe)?_0x3d4c32[_0x287795(0x483)][_0x287795(0x14c)]['call'](this):!![];else{if('qlhVf'===_0x287795(0x51c)){const _0x154e8a='%1Allow'['format'](_0x347b79['charAt'](0x0)[_0x287795(0x2e8)]()+_0x347b79[_0x287795(0x49b)](0x1));if(_0x4e5d71[_0x154e8a])return _0x4e5d71[_0x154e8a]['includes'](_0x792aa8);}else this[_0x287795(0x1f4)]=_0x160486(_0xa4b6ad)['toLowerCase']()[_0x287795(0x28d)]();}}}}return![];},Game_Map['prototype'][_0x2db143(0x2d0)]=function(_0x30699c,_0x3c8849,_0x17d8aa,_0x807dbe){const _0x5c91e8=_0x2db143,_0x38d4de=this['roundXWithDirection'](_0x30699c,_0x17d8aa),_0x14b6aa=this[_0x5c91e8(0x4fe)](_0x3c8849,_0x17d8aa),_0x3c0191=this[_0x5c91e8(0x2b4)](_0x38d4de,_0x14b6aa),_0x408d23=this[_0x5c91e8(0x492)];if(_0x408d23[_0x5c91e8(0x11b)][_0x5c91e8(0x2c8)](_0x3c0191)){if(_0x5c91e8(0x255)!==_0x5c91e8(0x255))_0x5a2155[_0x5c91e8(0xaf)](this['mapId']());else return!![];}else{if(_0x807dbe==='player'){if(_0x5c91e8(0x4c6)!=='ScLee')return _0x408d23['PlayerForbid'][_0x5c91e8(0x2c8)](_0x3c0191)||_0x408d23['WalkForbid'][_0x5c91e8(0x2c8)](_0x3c0191);else{const _0x1dd88f=[_0x5c36c6[_0x5c91e8(0x9d)],_0x126afb[_0x5c91e8(0x50b)],_0x5c91e8(0x3c3)['format'](_0x1e234f)];return _0x5cbaee[_0x5c91e8(0x3a6)](_0x1dd88f);}}else{if(_0x807dbe===_0x5c91e8(0x124))return _0x408d23[_0x5c91e8(0x4d6)][_0x5c91e8(0x2c8)](_0x3c0191)||_0x408d23['WalkForbid'][_0x5c91e8(0x2c8)](_0x3c0191);else{if(_0x408d23[_0x5c91e8(0x377)][_0x5c91e8(0x2c8)](_0x3c0191))return!![];else{const _0x3867c4=_0x5c91e8(0x23c)[_0x5c91e8(0x183)](_0x807dbe[_0x5c91e8(0x319)](0x0)[_0x5c91e8(0x2e8)]()+_0x807dbe[_0x5c91e8(0x49b)](0x1));if(_0x408d23[_0x3867c4])return _0x408d23[_0x3867c4][_0x5c91e8(0x2c8)](_0x3c0191);}}}}return![];},Game_Map[_0x2db143(0x287)][_0x2db143(0x3dd)]=function(_0xbe926f,_0x30160b,_0x542a81,_0x53b0f0){const _0x2dd46f=_0x2db143;_0x542a81=_0x53b0f0===_0x2dd46f(0x127)?0x5:_0x542a81;const _0x7ea589=this[_0x2dd46f(0x19d)](_0xbe926f,_0x542a81),_0x44f7c2=this[_0x2dd46f(0x4fe)](_0x30160b,_0x542a81),_0x22c533=this['regionId'](_0x7ea589,_0x44f7c2),_0x209737=this[_0x2dd46f(0x492)];if(_0x209737[_0x2dd46f(0x251)][_0x2dd46f(0x2c8)](_0x22c533)){if('BNAeA'===_0x2dd46f(0x440))this[_0x2dd46f(0x2e5)]=!![];else return!![];}else{const _0x35320a=_0x2dd46f(0x2dd)[_0x2dd46f(0x183)](_0x53b0f0[_0x2dd46f(0x319)](0x0)[_0x2dd46f(0x2e8)]()+_0x53b0f0['slice'](0x1));if(_0x209737[_0x35320a])return _0x209737[_0x35320a][_0x2dd46f(0x2c8)](_0x22c533);}return![];},VisuMZ[_0x2db143(0x483)]['Game_Map_refresh']=Game_Map[_0x2db143(0x287)][_0x2db143(0x1f3)],Game_Map[_0x2db143(0x287)]['refresh']=function(){const _0x35526b=_0x2db143;VisuMZ[_0x35526b(0x483)][_0x35526b(0x21b)][_0x35526b(0x3f0)](this),this['checkNeedForPeriodicRefresh']();},Game_Map[_0x2db143(0x287)][_0x2db143(0x2c9)]=function(){const _0x19013a=_0x2db143;this[_0x19013a(0x116)]=![];if(this['events']()[_0x19013a(0x284)](_0x2c1810=>_0x2c1810['hasAdvancedSwitchVariable']())){this[_0x19013a(0x116)]=!![];return;}if(this[_0x19013a(0x4e5)]()[_0x19013a(0x284)](_0x148619=>_0x148619['hasCPCs']())){if(_0x19013a(0x475)!==_0x19013a(0x4e7)){this[_0x19013a(0x116)]=!![];return;}else this[_0x19013a(0x4a7)][_0x19013a(0x2d6)](_0x1274c2['_shadowSprite']);}if(this[_0x19013a(0x297)][_0x19013a(0x284)](_0x258088=>_0x258088[_0x19013a(0x2b6)]())){if(_0x19013a(0x140)===_0x19013a(0x19a)){const _0x393dd3=_0xc68863(_0x208921['$1']);_0x393dd3!==_0x4d6e3f[_0x4df164][_0x19013a(0x32b)]&&(_0x359993(_0x19013a(0x1ce)[_0x19013a(0x183)](_0x5a8e79,_0x393dd3)),_0x33e86b[_0x19013a(0x4f7)]());}else{this['_needsPeriodicRefresh']=!![];return;}}if(this[_0x19013a(0x297)][_0x19013a(0x284)](_0x30d35a=>_0x30d35a[_0x19013a(0x283)]())){if('vcayu'==='vcayu'){this[_0x19013a(0x116)]=!![];return;}else return this[_0x19013a(0x1bd)](_0x146cdf(_0x923ed8['$1']));}},VisuMZ[_0x2db143(0x483)]['Game_Map_update']=Game_Map[_0x2db143(0x287)][_0x2db143(0x4e4)],Game_Map[_0x2db143(0x287)][_0x2db143(0x4e4)]=function(_0x4698a9){const _0x4d9057=_0x2db143;this[_0x4d9057(0x31e)](),VisuMZ[_0x4d9057(0x483)][_0x4d9057(0x4c8)][_0x4d9057(0x3f0)](this,_0x4698a9);},Game_Map[_0x2db143(0x287)][_0x2db143(0x31e)]=function(){const _0x51ca05=_0x2db143;if(!this['_needsPeriodicRefresh'])return;this[_0x51ca05(0x355)]=this[_0x51ca05(0x355)]||0x3c,this[_0x51ca05(0x355)]--,this[_0x51ca05(0x355)]<=0x0&&(this['requestRefresh'](),this[_0x51ca05(0x355)]=0x3c);},VisuMZ[_0x2db143(0x483)][_0x2db143(0x23b)]=Game_Map['prototype'][_0x2db143(0x1c5)],Game_Map[_0x2db143(0x287)][_0x2db143(0x1c5)]=function(){const _0x74cbb7=_0x2db143;if(!$gameSystem[_0x74cbb7(0x1a5)]())return!![];return VisuMZ[_0x74cbb7(0x483)][_0x74cbb7(0x23b)][_0x74cbb7(0x3f0)](this);},Game_Map[_0x2db143(0x287)][_0x2db143(0x37b)]=function(){const _0x47a672=_0x2db143;this['_saveEventLocations']=![];const _0xa4110b=$dataMap[_0x47a672(0x4b6)]||'';_0xa4110b[_0x47a672(0x474)](/<SAVE EVENT (?:LOCATION|LOCATIONS)>/i)&&(this['_saveEventLocations']=!![]);},Game_Map[_0x2db143(0x287)][_0x2db143(0x44c)]=function(){const _0x1d63c5=_0x2db143;if(this[_0x1d63c5(0x3b3)]===undefined)this['setupSaveEventLocations']();return this['_saveEventLocations'];},Game_Map['prototype']['removeTemporaryMapSpawnedEvents']=function(_0x2c20f2){const _0x13995f=_0x2db143;_0x2c20f2!==this[_0x13995f(0x346)]()&&$gamePlayer&&$gameSystem[_0x13995f(0xaf)](this['mapId']());},Game_Map[_0x2db143(0x287)][_0x2db143(0x31b)]=function(){const _0x3ae507=_0x2db143;this[_0x3ae507(0x435)]=$gameSystem[_0x3ae507(0x204)](this[_0x3ae507(0x346)]()),this[_0x3ae507(0x314)]=!![];},VisuMZ[_0x2db143(0x483)][_0x2db143(0x2c3)]=Game_Map[_0x2db143(0x287)][_0x2db143(0x4e5)],Game_Map[_0x2db143(0x287)][_0x2db143(0x4e5)]=function(){const _0x3f5a0e=_0x2db143;if(this['_eventCache'])return this[_0x3f5a0e(0x386)];const _0x3eeecc=VisuMZ[_0x3f5a0e(0x483)][_0x3f5a0e(0x2c3)]['call'](this),_0x432df5=_0x3eeecc[_0x3f5a0e(0x513)](this[_0x3f5a0e(0x435)]||[]);return this[_0x3f5a0e(0x386)]=_0x432df5[_0x3f5a0e(0x22b)](_0x4a12e0=>!!_0x4a12e0),this[_0x3f5a0e(0x386)];},VisuMZ[_0x2db143(0x483)]['Game_Map_event']=Game_Map[_0x2db143(0x287)][_0x2db143(0x124)],Game_Map[_0x2db143(0x287)][_0x2db143(0x124)]=function(_0xe71e27){const _0x3c4c4b=_0x2db143;return _0xe71e27>=0x3e8?(_0xe71e27-=0x3e8,this[_0x3c4c4b(0x435)][_0xe71e27]):VisuMZ[_0x3c4c4b(0x483)][_0x3c4c4b(0x1cc)]['call'](this,_0xe71e27);},Game_Map[_0x2db143(0x287)]['eraseEvent']=function(_0x48c6bf){const _0x463f77=this['event'](_0x48c6bf);if(_0x463f77)_0x463f77['erase']();},Game_Map['prototype']['setupSpawnTest']=function(){const _0x37315f=_0x2db143,_0x4fd60b={'template':'Button','mapId':0x1,'eventId':0xc,'x':$gamePlayer['x']+0x1,'y':$gamePlayer['y']+0x1,'spawnPreserved':!![],'spawnEventId':this[_0x37315f(0x435)][_0x37315f(0x141)]+0x3e8};this[_0x37315f(0x330)](_0x4fd60b);},Game_Map['prototype']['checkExistingEntitiesAt']=function(_0x2ad926,_0x39c135){const _0x42b2a4=_0x2db143;if(this['eventsXy'](_0x2ad926,_0x39c135)[_0x42b2a4(0x141)]>0x0)return!![];if($gamePlayer['x']===_0x2ad926&&$gamePlayer['y']===_0x39c135)return!![];if(this[_0x42b2a4(0xfd)]()[_0x42b2a4(0x4b9)](_0x2ad926,_0x39c135))return!![];if(this['ship']()[_0x42b2a4(0x4b9)](_0x2ad926,_0x39c135))return!![];return![];},Game_Map[_0x2db143(0x287)][_0x2db143(0x75)]=function(_0x499178,_0x213950,_0xf34eac){const _0x2c7359=_0x2db143;$gameTemp[_0x2c7359(0x139)]=_0x499178;const _0x163001=new Game_Event(_0x499178[_0x2c7359(0x346)],_0x499178[_0x2c7359(0x2b5)]);$gameTemp['_spawnData']=undefined,_0x163001[_0x2c7359(0x1f3)]();let _0x4d7e79=_0x213950-_0x163001[_0x2c7359(0x2ba)]['left'],_0x366160=_0x213950+_0x163001['_addedHitbox'][_0x2c7359(0x169)],_0x13b749=_0xf34eac-_0x163001['_addedHitbox']['up'],_0x42b5da=_0xf34eac+_0x163001[_0x2c7359(0x2ba)][_0x2c7359(0xd0)];for(let _0x4dca6c=_0x4d7e79;_0x4dca6c<=_0x366160;_0x4dca6c++){for(let _0x3e7a4d=_0x13b749;_0x3e7a4d<=_0x42b5da;_0x3e7a4d++){if(this[_0x2c7359(0x168)](_0x4dca6c,_0x3e7a4d))return![];}}return!![];},Game_Map[_0x2db143(0x287)]['createSpawnedEventWithData']=function(_0xd5b043){const _0x211ba6=_0x2db143;$gameTemp['_spawnData']=_0xd5b043;const _0x4e4154=new Game_Event(_0xd5b043['mapId'],_0xd5b043[_0x211ba6(0x2b5)]);$gameTemp[_0x211ba6(0x139)]=undefined,this[_0x211ba6(0x435)][_0x211ba6(0xec)](_0x4e4154),_0x4e4154[_0x211ba6(0x449)](_0xd5b043),this[_0x211ba6(0x43d)]();},Game_Map[_0x2db143(0x287)][_0x2db143(0x378)]=function(_0x4b6afa,_0x4b8968,_0x307b1c){const _0x291fc4=_0x2db143,_0x579e63=_0x4b6afa['template'][_0x291fc4(0x2e8)]()[_0x291fc4(0x28d)]();if(_0x579e63!=='UNTITLED'){if(_0x291fc4(0x195)!==_0x291fc4(0x195))return _0x187084>0x0?0x4:0x6;else{const _0x26f627=VisuMZ[_0x291fc4(0x500)][_0x579e63];if(_0x26f627){if(_0x291fc4(0x2b9)===_0x291fc4(0x2b9))_0x4b6afa['mapId']=_0x26f627[_0x291fc4(0x3d8)],_0x4b6afa[_0x291fc4(0x2b5)]=_0x26f627[_0x291fc4(0x4ee)];else{_0xb0af87[_0x291fc4(0x20a)](_0x12890d,_0x19ba78);const _0x4b7156=_0x1d8a28[_0x291fc4(0x179)]();_0x1669e6[_0x291fc4(0x3f6)]=_0x383f8c[_0x291fc4(0x3f6)]||_0x47dd99['mapId']();const _0x1f163d=[_0x37ba0a['MapId'],_0x344c47[_0x291fc4(0x180)]||_0x4b7156[_0x291fc4(0x2b5)](),'Self\x20Variable\x20%1'['format'](_0xa876d1['VariableId'])],_0xe7eedb=_0xe4bba5[_0x291fc4(0x1b4)](_0x20cba1['value'](_0x1f163d),_0xa6df0b[_0x291fc4(0x17a)],_0x5ea0d2[_0x291fc4(0x2cd)]);_0x1c7eb7[_0x291fc4(0x172)](_0x1f163d,_0xe7eedb);}}}}const _0x165f9f=_0x4b6afa['x'],_0x391deb=_0x4b6afa['y'];if(!this['isValid'](_0x165f9f,_0x391deb))return![];if(_0x4b8968){if(_0x291fc4(0xf9)===_0x291fc4(0xf9)){if(this[_0x291fc4(0x168)](_0x165f9f,_0x391deb))return![];if(!this[_0x291fc4(0x75)](_0x4b6afa,_0x165f9f,_0x391deb))return![];}else _0x1d3ad7=_0x387327(_0xb8d209['$1'])['toLowerCase']()['trim'](),this[_0x291fc4(0xa0)][_0x291fc4(0x129)]=_0x51acdf,this[_0x291fc4(0xa0)]['distance']=_0x2a6381(_0x1cf120['$2']);}if(_0x307b1c){if(!this[_0x291fc4(0x7f)](_0x165f9f,_0x391deb))return![];}return this['createSpawnedEventWithData'](_0x4b6afa),!![];},Game_Map['prototype']['prepareSpawnedEventAtRegion']=function(_0x539255,_0x5161f3,_0x2c35ac,_0x24939a){const _0x2f83c6=_0x2db143,_0x477a75=[],_0x1203a5=this[_0x2f83c6(0x45c)](),_0x5830af=this['height']();for(let _0x2e10b5=0x0;_0x2e10b5<_0x1203a5;_0x2e10b5++){for(let _0x1d724d=0x0;_0x1d724d<_0x5830af;_0x1d724d++){if(_0x2f83c6(0xcc)===_0x2f83c6(0xcc)){if(!_0x5161f3['includes'](this[_0x2f83c6(0x2b4)](_0x2e10b5,_0x1d724d)))continue;if(!this['isValid'](_0x2e10b5,_0x1d724d))continue;if(_0x2c35ac){if(_0x2f83c6(0x2a6)===_0x2f83c6(0x225)){const _0x404a32=_0x2f83c6(0x112)[_0x2f83c6(0x183)](_0x2e10ae,_0x26fb13);_0x37a6f9[_0x404a32]&&(_0xcd33cd[_0x404a32]=_0xf27281[_0x404a32][_0x2f83c6(0x49b)](0x0));}else{if(this[_0x2f83c6(0x168)](_0x2e10b5,_0x1d724d))continue;if(!this[_0x2f83c6(0x75)](_0x539255,_0x2e10b5,_0x1d724d))continue;}}if(_0x24939a){if('gccEQ'!==_0x2f83c6(0x48a))return this[_0x2f83c6(0x1f4)];else{if(!this[_0x2f83c6(0x7f)](_0x2e10b5,_0x1d724d))continue;}}_0x477a75[_0x2f83c6(0xec)]([_0x2e10b5,_0x1d724d]);}else{const _0x147612=this[_0x2f83c6(0x453)]();return _0x5888d1[_0x2f83c6(0x4fe)](this['y'],_0x147612);}}}if(_0x477a75[_0x2f83c6(0x141)]>0x0){if('FRuOS'!==_0x2f83c6(0x31f)){let _0x2005ca=this[_0x2f83c6(0x39d)];return this[_0x2f83c6(0xac)]()&&(_0x2005ca+=this[_0x2f83c6(0x463)]()),this[_0x2f83c6(0x99)](_0x2005ca);}else{const _0xd6308f=_0x477a75[Math['randomInt'](_0x477a75[_0x2f83c6(0x141)])];return _0x539255['x']=_0xd6308f[0x0],_0x539255['y']=_0xd6308f[0x1],this[_0x2f83c6(0x330)](_0x539255),!![];}}return![];},Game_Map[_0x2db143(0x287)][_0x2db143(0x3d1)]=function(_0x1f126d,_0x7b654f,_0x882530,_0x5ed3d0){const _0x40f687=_0x2db143,_0x12b89e=[],_0x4a2970=this[_0x40f687(0x45c)](),_0x3b431a=this['height']();for(let _0xb7b0c=0x0;_0xb7b0c<_0x4a2970;_0xb7b0c++){for(let _0x249409=0x0;_0x249409<_0x3b431a;_0x249409++){if(!_0x7b654f[_0x40f687(0x2c8)](this[_0x40f687(0x1ad)](_0xb7b0c,_0x249409)))continue;if(!this[_0x40f687(0x36f)](_0xb7b0c,_0x249409))continue;if(_0x882530){if(_0x40f687(0x43b)!==_0x40f687(0x44b)){if(this[_0x40f687(0x168)](_0xb7b0c,_0x249409))continue;if(!this[_0x40f687(0x75)](_0x1f126d,_0xb7b0c,_0x249409))continue;}else{const _0x1f59e2=this['getEventIconData']();if(!_0x1f59e2)return![];return _0x1f59e2[_0x40f687(0x35a)]>0x0;}}if(_0x5ed3d0){if(!this[_0x40f687(0x7f)](_0xb7b0c,_0x249409))continue;}_0x12b89e['push']([_0xb7b0c,_0x249409]);}}if(_0x12b89e[_0x40f687(0x141)]>0x0){if(_0x40f687(0x41d)===_0x40f687(0x41d)){const _0x3aea99=_0x12b89e[Math['randomInt'](_0x12b89e[_0x40f687(0x141)])];return _0x1f126d['x']=_0x3aea99[0x0],_0x1f126d['y']=_0x3aea99[0x1],this[_0x40f687(0x330)](_0x1f126d),!![];}else return this['characterName']()['match'](/\[VS8\]/i);}return![];},Game_Map[_0x2db143(0x287)][_0x2db143(0x7f)]=function(_0x12b509,_0x23c5cb){const _0x23525e=_0x2db143;if(this[_0x23525e(0x382)](_0x12b509,_0x23c5cb,0x2))return!![];if(this[_0x23525e(0x382)](_0x12b509,_0x23c5cb,0x4))return!![];if(this[_0x23525e(0x382)](_0x12b509,_0x23c5cb,0x6))return!![];if(this[_0x23525e(0x382)](_0x12b509,_0x23c5cb,0x8))return!![];return![];},Game_Map[_0x2db143(0x287)]['despawnEventId']=function(_0x59b737){const _0x246f17=_0x2db143;if(_0x59b737<0x3e8)return;if(!this[_0x246f17(0x435)])return;const _0x2b5803=this[_0x246f17(0x124)](_0x59b737);_0x2b5803['locate'](-0x1,-0x1),_0x2b5803[_0x246f17(0x12e)](),this[_0x246f17(0x435)][_0x59b737-0x3e8]=null,this[_0x246f17(0x43d)]();},Game_Map[_0x2db143(0x287)][_0x2db143(0x192)]=function(){const _0x9beb41=_0x2db143;for(const _0x1e76e0 of this[_0x9beb41(0x435)]){if('YvhGx'==='ljJcB')_0xddaad3[_0x9beb41(0x483)][_0x9beb41(0x16f)]['call'](this,_0x3fd7f9,_0x31ff6c),_0x1d714d[_0x9beb41(0x483)]['Settings'][_0x9beb41(0x4ce)][_0x9beb41(0x321)]&&this[_0x9beb41(0x37c)][_0x9beb41(0x51b)]['setBalloonPose'](_0x20af78,this['_duration']);else{if(_0x1e76e0)return _0x1e76e0;}}return null;},Game_Map[_0x2db143(0x287)][_0x2db143(0x1f7)]=function(){const _0x44bc7a=_0x2db143,_0x3133b4=this['firstSpawnedEvent']();return _0x3133b4?_0x3133b4[_0x44bc7a(0x50b)]:0x0;},Game_Map['prototype'][_0x2db143(0x144)]=function(){const _0x3da5de=_0x2db143,_0x3e0117=this['_spawnedEvents'][_0x3da5de(0x49b)](0x0)[_0x3da5de(0x7e)]();for(const _0x3e647b of _0x3e0117){if(_0x3e647b)return _0x3e647b;}return null;},Game_Map[_0x2db143(0x287)][_0x2db143(0x437)]=function(){const _0x3c9c7d=_0x2db143,_0x7b2f62=this[_0x3c9c7d(0x144)]();return _0x7b2f62?_0x7b2f62[_0x3c9c7d(0x50b)]:0x0;},Game_Map[_0x2db143(0x287)][_0x2db143(0x107)]=function(_0x3d0f72,_0x31f864){const _0x26c302=_0x2db143,_0x5217e6=this[_0x26c302(0x218)](_0x3d0f72,_0x31f864);for(const _0x5689b1 of _0x5217e6){if(_0x26c302(0xa8)===_0x26c302(0x143)){if(this[_0x26c302(0x35f)]===_0x5a5e85)this[_0x26c302(0x21d)]();if(this[_0x26c302(0x35f)][_0x26c302(0xa2)]===_0x1edb6a)this[_0x26c302(0x21d)]();return this['_EventsMoveCoreSettings']['DashingEnable'];}else{if(!_0x5689b1)continue;if(_0x5689b1[_0x26c302(0xd7)]())this[_0x26c302(0x244)](_0x5689b1['_eventId']);}}},Game_Map[_0x2db143(0x287)][_0x2db143(0x1e4)]=function(_0x5d94e9){const _0x2bfd68=_0x2db143;for(const _0x40a34e of this[_0x2bfd68(0x435)]){if(!_0x40a34e)continue;_0x5d94e9[_0x2bfd68(0x2c8)](_0x40a34e['regionId']())&&this[_0x2bfd68(0x244)](_0x40a34e[_0x2bfd68(0x50b)]);}},Game_Map['prototype']['despawnTerrainTags']=function(_0x5e9357){const _0x404c39=_0x2db143;for(const _0x49b5eb of this[_0x404c39(0x435)]){if(_0x404c39(0x97)!=='cVisZ'){this['processMoveRouteStepTo'](_0x551761,_0x3c9b71,_0x40aed4);if(this['x']!==_0x2c0d48||this['y']!==_0x9923ae)this[_0x404c39(0x182)]--;}else{if(!_0x49b5eb)continue;_0x5e9357[_0x404c39(0x2c8)](_0x49b5eb[_0x404c39(0x1ad)]())&&this[_0x404c39(0x244)](_0x49b5eb[_0x404c39(0x50b)]);}}},Game_Map[_0x2db143(0x287)][_0x2db143(0x331)]=function(){const _0x3b6c26=_0x2db143;for(const _0x5de1b1 of this['_spawnedEvents']){if(!_0x5de1b1)continue;this[_0x3b6c26(0x244)](_0x5de1b1[_0x3b6c26(0x50b)]);}},VisuMZ['EventsMoveCore'][_0x2db143(0x42c)]=Game_Map[_0x2db143(0x287)][_0x2db143(0x1b1)],Game_Map['prototype'][_0x2db143(0x1b1)]=function(_0x1b7d2d){const _0x17a4b1=_0x2db143;VisuMZ['EventsMoveCore']['Game_Map_unlockEvent']['call'](this,_0x1b7d2d);if(_0x1b7d2d>=0x3e8){if(_0x17a4b1(0x50c)==='mmFNV')this[_0x17a4b1(0x335)]=![],this[_0x17a4b1(0x137)]=_0x1749b5['zoomScale'](),this[_0x17a4b1(0x238)]=this[_0x17a4b1(0x2e6)]['screenX'](),this[_0x17a4b1(0x3bb)]=this[_0x17a4b1(0x2e6)][_0x17a4b1(0x216)](),this[_0x17a4b1(0x24b)]=this['_event']['_labelWindow'][_0x17a4b1(0x268)],this[_0x17a4b1(0x26e)]=this['_event'][_0x17a4b1(0x3de)]['offsetY'],this['_eventPageIndex']=this[_0x17a4b1(0x2e6)][_0x17a4b1(0x245)],this[_0x17a4b1(0x4ec)]=this[_0x17a4b1(0x8b)](),this[_0x17a4b1(0x2b0)]=_0x45350c['eventLabelsVisible'](),this[_0x17a4b1(0x482)]=_0x4cf9fe['x'],this[_0x17a4b1(0x132)]=_0x3b2f40['y'],this['_visibleEventX']=this['_event']['x'],this['_visibleEventY']=this['_event']['y'];else{const _0x525649=this[_0x17a4b1(0x124)](_0x1b7d2d);if(_0x525649)_0x525649['unlock']();}}},Game_CommonEvent['prototype'][_0x2db143(0x2b6)]=function(){const _0x407af6=_0x2db143,_0x41bf4e=this[_0x407af6(0x124)]();return this[_0x407af6(0x19f)]()&&_0x41bf4e[_0x407af6(0x159)]>=0x1&&DataManager[_0x407af6(0x17c)](_0x41bf4e['switchId']);},Game_CommonEvent['prototype'][_0x2db143(0x283)]=function(){const _0x6813d9=_0x2db143;return VisuMZ[_0x6813d9(0x483)][_0x6813d9(0xde)][_0x6813d9(0x297)]['includes'](this[_0x6813d9(0x36c)]);},VisuMZ[_0x2db143(0x483)]['Game_CommonEvent_isActive']=Game_CommonEvent['prototype'][_0x2db143(0x19f)],Game_CommonEvent[_0x2db143(0x287)]['isActive']=function(){const _0x5f5651=_0x2db143;if(VisuMZ['EventsMoveCore']['Game_CommonEvent_isActive'][_0x5f5651(0x3f0)](this)){if(_0x5f5651(0x109)!=='zXVsc'){if(_0x5bdfe9[_0x5f5651(0x305)]&&this['isSmartEventCollisionOn']())return this[_0x5f5651(0x265)](_0x2ce3dd,_0x3a6f53);else{const _0x364457=_0x4d5ef0[_0x5f5651(0xd8)](_0x2c28b7,_0x5b92b0)[_0x5f5651(0x22b)](_0x3fb5cc=>_0x3fb5cc!==this);return _0x364457[_0x5f5651(0x141)]>0x0;}}else return!![];}else{if(_0x5f5651(0x11f)==='ZEYHb')_0x5ecb31=_0x1c670f[_0x5f5651(0x520)](_0xd03ba6,(_0x24d89d,_0x409dfb)=>_0x2127d6(this[_0x5f5651(0x9d)],this[_0x5f5651(0x50b)],_0x1e11a5(_0x409dfb)));else return VisuMZ[_0x5f5651(0x483)][_0x5f5651(0xde)][_0x5f5651(0x348)](this[_0x5f5651(0x124)]()[_0x5f5651(0x4bc)],this[_0x5f5651(0x36c)]);}},VisuMZ[_0x2db143(0x483)][_0x2db143(0x23d)]=Game_Map['prototype']['parallelCommonEvents'],Game_Map['prototype'][_0x2db143(0x389)]=function(){const _0x33d8f9=_0x2db143,_0x287321=VisuMZ['EventsMoveCore'][_0x33d8f9(0x23d)][_0x33d8f9(0x3f0)](this),_0x2956de=VisuMZ[_0x33d8f9(0x483)][_0x33d8f9(0xde)][_0x33d8f9(0x297)][_0x33d8f9(0x274)](_0x27ecae=>$dataCommonEvents[_0x27ecae]);return _0x287321['concat'](_0x2956de)[_0x33d8f9(0x22b)]((_0x424748,_0x126713,_0x35ff0c)=>_0x35ff0c[_0x33d8f9(0x381)](_0x424748)===_0x126713);},VisuMZ[_0x2db143(0x483)][_0x2db143(0x518)]=Game_CharacterBase['prototype'][_0x2db143(0x40c)],Game_CharacterBase[_0x2db143(0x287)][_0x2db143(0x40c)]=function(){const _0xe6998b=_0x2db143;VisuMZ[_0xe6998b(0x483)]['Game_CharacterBase_initMembers'][_0xe6998b(0x3f0)](this),this[_0xe6998b(0x361)]();},Game_CharacterBase[_0x2db143(0x287)][_0x2db143(0x361)]=function(){const _0xd420b7=_0x2db143;this[_0xd420b7(0x1f6)]=![],this[_0xd420b7(0x24c)](),this['clearDashing'](),this[_0xd420b7(0x2e3)](),this[_0xd420b7(0x9b)]();},Game_CharacterBase[_0x2db143(0x287)][_0x2db143(0x44d)]=function(){const _0x45d294=_0x2db143;if(this[_0x45d294(0x12d)]===Game_Player&&this[_0x45d294(0x446)]())return _0x45d294(0x3c9)!==_0x45d294(0x3c9)?_0x1e7e50[_0x45d294(0x483)][_0x45d294(0xe3)][_0x45d294(0x3f0)](this):this['vehicle']()[_0x45d294(0x14b)]()[_0x45d294(0x474)](/\[VS8\]/i);else return Imported[_0x45d294(0x84)]&&this[_0x45d294(0x466)]()?!![]:this[_0x45d294(0x14b)]()[_0x45d294(0x474)](/\[VS8\]/i);},VisuMZ[_0x2db143(0x483)][_0x2db143(0xe3)]=Game_CharacterBase[_0x2db143(0x287)][_0x2db143(0x453)],Game_CharacterBase['prototype'][_0x2db143(0x453)]=function(){const _0x46fdca=_0x2db143;if(this[_0x46fdca(0x31a)]()&&!this[_0x46fdca(0x299)]()&&this['isSpriteVS8dir']())return this[_0x46fdca(0x266)]();else{if(this[_0x46fdca(0x31a)]()&&!this[_0x46fdca(0x299)]())return 0x8;else{if(this[_0x46fdca(0x285)]()&&this[_0x46fdca(0x44d)]()){if('lUNrU'!=='eebLj')return this[_0x46fdca(0x16c)]();else{if(this[_0x46fdca(0x285)]()&&this[_0x46fdca(0x394)]()===_0x46fdca(0x399))return!![];return _0x338e52[_0x46fdca(0x483)][_0x46fdca(0x72)][_0x46fdca(0x3f0)](this);}}else return VisuMZ['EventsMoveCore'][_0x46fdca(0xe3)]['call'](this);}}},VisuMZ['EventsMoveCore'][_0x2db143(0x4e8)]=Game_CharacterBase[_0x2db143(0x287)][_0x2db143(0x10e)],Game_CharacterBase[_0x2db143(0x287)]['setDirection']=function(_0x475733){const _0x473518=_0x2db143;if(!this[_0x473518(0x44d)]())_0x475733=this['correctFacingDirection'](_0x475733);VisuMZ[_0x473518(0x483)][_0x473518(0x4e8)][_0x473518(0x3f0)](this,_0x475733);},Game_CharacterBase['prototype'][_0x2db143(0x2ef)]=function(_0xcdd903){const _0x411262=_0x2db143;if(_0xcdd903===0x1)return this[_0x411262(0x94)](this['_x'],this['_y'],0x4)?0x4:0x2;if(_0xcdd903===0x3)return this[_0x411262(0x94)](this['_x'],this['_y'],0x6)?0x6:0x2;if(_0xcdd903===0x7)return this[_0x411262(0x94)](this['_x'],this['_y'],0x4)?0x4:0x8;if(_0xcdd903===0x9)return this[_0x411262(0x94)](this['_x'],this['_y'],0x6)?0x6:0x8;return _0xcdd903;},Game_CharacterBase[_0x2db143(0x287)]['isDiagonalDirection']=function(_0x4d1cb8){return[0x1,0x3,0x5,0x7,0x9]['includes'](_0x4d1cb8);},Game_CharacterBase[_0x2db143(0x287)][_0x2db143(0x2c2)]=function(){const _0x2eaec4=_0x2db143;return this[_0x2eaec4(0x45a)]||0x0;},VisuMZ[_0x2db143(0x483)]['Game_CharacterBase_moveStraight']=Game_CharacterBase['prototype'][_0x2db143(0x2a7)],Game_CharacterBase[_0x2db143(0x287)][_0x2db143(0x2a7)]=function(_0x460738){const _0x16f0c4=_0x2db143;this[_0x16f0c4(0x45a)]=_0x460738,VisuMZ['EventsMoveCore'][_0x16f0c4(0x2d8)][_0x16f0c4(0x3f0)](this,_0x460738);},Game_CharacterBase['prototype'][_0x2db143(0x1f2)]=function(_0x2179f5){const _0x182d16=_0x2db143;if(!this['isDiagonalDirection'](_0x2179f5))return this[_0x182d16(0x2a7)](_0x2179f5);let _0x59c006=0x0,_0x4c9765=0x0;switch(_0x2179f5){case 0x1:_0x59c006=0x4,_0x4c9765=0x2;break;case 0x3:_0x59c006=0x6,_0x4c9765=0x2;break;case 0x7:_0x59c006=0x4,_0x4c9765=0x8;break;case 0x9:_0x59c006=0x6,_0x4c9765=0x8;break;}if(VisuMZ[_0x182d16(0x483)]['Settings'][_0x182d16(0x496)][_0x182d16(0xa7)]){if(!this[_0x182d16(0x94)](this['_x'],this['_y'],_0x59c006)){if(_0x182d16(0x3ab)===_0x182d16(0x3ab))return this[_0x182d16(0x2a7)](_0x4c9765);else{if(_0x57576d>0x0&&_0x163494<0x0)return 0x1;if(_0x1d7d51<0x0&&_0x834d57<0x0)return 0x3;if(_0x45aca8>0x0&&_0x2144b0>0x0)return 0x7;if(_0xb126e7<0x0&&_0x40e6a1>0x0)return 0x9;}}if(!this[_0x182d16(0x94)](this['_x'],this['_y'],_0x4c9765))return this[_0x182d16(0x2a7)](_0x59c006);if(!this[_0x182d16(0x14a)](this['_x'],this['_y'],_0x59c006,_0x4c9765)){if(_0x182d16(0x147)!=='jZrLl')return _0x2e1395-=0x3e8,this[_0x182d16(0x435)][_0x3b9514];else{let _0x4c631=VisuMZ['EventsMoveCore']['Settings']['Movement'][_0x182d16(0x128)]?_0x59c006:_0x4c9765;return this[_0x182d16(0x2a7)](_0x4c631);}}}this[_0x182d16(0x45a)]=_0x2179f5,this[_0x182d16(0x18d)](_0x59c006,_0x4c9765);},VisuMZ['EventsMoveCore'][_0x2db143(0x1d0)]=Game_CharacterBase[_0x2db143(0x287)][_0x2db143(0xa6)],Game_CharacterBase[_0x2db143(0x287)]['realMoveSpeed']=function(){const _0x68ad30=_0x2db143;let _0x1ab3ff=this[_0x68ad30(0x39d)];if(this['isDashing']()){if(_0x68ad30(0x81)===_0x68ad30(0x38e)){const _0x1faa0d=_0x171140(_0x50c998['$1']),_0x4fa121=_0x7bdf6e(_0x343120['$2']);return this[_0x68ad30(0x50a)](_0x1faa0d,_0x4fa121);}else _0x1ab3ff+=this[_0x68ad30(0x463)]();}return this[_0x68ad30(0x99)](_0x1ab3ff);},Game_CharacterBase['prototype'][_0x2db143(0x463)]=function(){const _0x1ef1bb=_0x2db143,_0x3446d1=VisuMZ[_0x1ef1bb(0x483)][_0x1ef1bb(0x516)]['Movement'];return _0x3446d1[_0x1ef1bb(0x8f)]!==undefined?_0x3446d1[_0x1ef1bb(0x8f)]:_0x1ef1bb(0x4f3)===_0x1ef1bb(0x4f3)?VisuMZ[_0x1ef1bb(0x483)][_0x1ef1bb(0x1d0)]['call'](this)-this[_0x1ef1bb(0x39d)]:this[_0x1ef1bb(0x311)]['target'];},Game_CharacterBase['prototype'][_0x2db143(0x99)]=function(_0x39ef7f){const _0x2c42ab=_0x2db143,_0x26b1a6=VisuMZ[_0x2c42ab(0x483)]['Settings'][_0x2c42ab(0x496)];if(!_0x26b1a6[_0x2c42ab(0x506)])return _0x39ef7f;return[0x1,0x3,0x7,0x9]['includes'](this[_0x2c42ab(0x45a)])&&(_0x39ef7f*=_0x26b1a6['DiagonalSpeedMultiplier']||0.01),_0x39ef7f;},VisuMZ[_0x2db143(0x483)][_0x2db143(0x280)]=Game_CharacterBase[_0x2db143(0x287)][_0x2db143(0xac)],Game_CharacterBase[_0x2db143(0x287)][_0x2db143(0xac)]=function(){const _0x2f7416=_0x2db143;if(this['_forceDashing'])return!![];return VisuMZ[_0x2f7416(0x483)][_0x2f7416(0x280)][_0x2f7416(0x3f0)](this);},Game_CharacterBase[_0x2db143(0x287)]['isDashingAndMoving']=function(){const _0x4df0e1=_0x2db143;return this[_0x4df0e1(0xac)]();},VisuMZ[_0x2db143(0x483)][_0x2db143(0x301)]=Game_CharacterBase['prototype']['pattern'],Game_CharacterBase[_0x2db143(0x287)][_0x2db143(0x2ab)]=function(){const _0x3b8238=_0x2db143;return this['isPosing']()?_0x3b8238(0x489)!==_0x3b8238(0x489)?_0x50563c[_0x3b8238(0xa6)]():this[_0x3b8238(0x25b)]():VisuMZ['EventsMoveCore'][_0x3b8238(0x301)]['call'](this);},VisuMZ[_0x2db143(0x483)]['Game_CharacterBase_increaseSteps']=Game_CharacterBase[_0x2db143(0x287)][_0x2db143(0x15d)],Game_CharacterBase[_0x2db143(0x287)][_0x2db143(0x15d)]=function(){const _0xc0a07b=_0x2db143;VisuMZ[_0xc0a07b(0x483)][_0xc0a07b(0x4dc)]['call'](this),this[_0xc0a07b(0x24c)]();},VisuMZ[_0x2db143(0x483)][_0x2db143(0x471)]=Game_CharacterBase[_0x2db143(0x287)][_0x2db143(0x2df)],Game_CharacterBase[_0x2db143(0x287)][_0x2db143(0x2df)]=function(){const _0x5cf7ce=_0x2db143;if(this[_0x5cf7ce(0x44d)]())return this[_0x5cf7ce(0x3ef)]();return VisuMZ[_0x5cf7ce(0x483)][_0x5cf7ce(0x471)]['call'](this);},Game_CharacterBase[_0x2db143(0x287)][_0x2db143(0x3ef)]=function(){const _0x544a65=_0x2db143,_0xbd5356=this[_0x544a65(0x453)]();if(this[_0x544a65(0x299)]()){if([0x2,0x4,0x6,0x8][_0x544a65(0x2c8)](_0xbd5356))return 0x4;if([0x1,0x3,0x7,0x9][_0x544a65(0x2c8)](_0xbd5356))return 0x5;}else{if(this[_0x544a65(0x31a)]()){if(_0x544a65(0x151)!=='MRjWX')return 0x6;else{const _0xb3fe1b=_0x3f6d3e[_0x544a65(0x98)];this[_0x544a65(0x45b)]=this[_0x544a65(0x4e5)]()[_0x544a65(0x141)]>_0xb3fe1b;if(this['_eventOverload']&&_0x5e8909[_0x544a65(0x199)]()){}}}else{if(this[_0x544a65(0x285)]()){if('yxBca'!==_0x544a65(0x11d))return this[_0x544a65(0x10d)]();else{_0x5a8800[_0x544a65(0x222)](this);const _0x424627=_0x614a4d[_0x544a65(0x483)][_0x544a65(0x310)][_0x544a65(0x3f0)](this,_0x420392);return _0x5ad837['clearSelfTarget'](),_0x424627;}}else{if(this['_forceCarrying']){if([0x2,0x4,0x6,0x8][_0x544a65(0x2c8)](_0xbd5356))return 0x4;if([0x1,0x3,0x7,0x9]['includes'](_0xbd5356))return 0x5;}else{if(this[_0x544a65(0x4cb)]()&&this[_0x544a65(0x35c)]()){if([0x2,0x4,0x6,0x8][_0x544a65(0x2c8)](_0xbd5356))return 0x4;if([0x1,0x3,0x7,0x9]['includes'](_0xbd5356))return 0x5;}else{if(this[_0x544a65(0x4b0)]()){if([0x2,0x4,0x6,0x8][_0x544a65(0x2c8)](_0xbd5356))return 0x2;if([0x1,0x3,0x7,0x9]['includes'](_0xbd5356))return 0x3;}else{if(_0x544a65(0x20f)==='xIGFb'){if([0x2,0x4,0x6,0x8][_0x544a65(0x2c8)](_0xbd5356))return 0x0;if([0x1,0x3,0x7,0x9][_0x544a65(0x2c8)](_0xbd5356))return 0x1;}else this[_0x544a65(0xbf)][_0x544a65(0x47a)](this,arguments);}}}}}}},Game_CharacterBase[_0x2db143(0x287)]['useCarryPoseForIcons']=function(){const _0xd36f03=_0x2db143;return VisuMZ[_0xd36f03(0x483)][_0xd36f03(0x516)][_0xd36f03(0x4ce)]['CarryPose'];},Game_CharacterBase[_0x2db143(0x287)][_0x2db143(0x15b)]=function(){const _0x88ac16=_0x2db143;return this['isOnLadder']()&&this[_0x88ac16(0x1ad)]()===VisuMZ[_0x88ac16(0x483)][_0x88ac16(0x516)][_0x88ac16(0xb2)][_0x88ac16(0x3c5)];},Game_CharacterBase[_0x2db143(0x287)][_0x2db143(0x266)]=function(){const _0xb9dc49=_0x2db143;if(this[_0xb9dc49(0x15b)]()){if(_0xb9dc49(0x49c)===_0xb9dc49(0x49c))return 0x4;else this['contentsOpacity']-=this[_0xb9dc49(0x390)]();}else return'pYMja'===_0xb9dc49(0x508)?this[_0xb9dc49(0x91)]:0x2;},VisuMZ[_0x2db143(0x483)][_0x2db143(0x27e)]=Game_CharacterBase['prototype']['update'],Game_CharacterBase[_0x2db143(0x287)]['update']=function(){const _0x42f10d=_0x2db143;VisuMZ[_0x42f10d(0x483)][_0x42f10d(0x27e)][_0x42f10d(0x3f0)](this),this['updatePose']();},Game_CharacterBase[_0x2db143(0x287)][_0x2db143(0x24a)]=function(){const _0x4d2d13=_0x2db143;this[_0x4d2d13(0x26d)]=this['_poseDuration']||0x0;if(this[_0x4d2d13(0x26d)]>0x0){this['_poseDuration']--;if(this[_0x4d2d13(0x26d)]<=0x0&&this[_0x4d2d13(0x126)]!=='ZZZ')this[_0x4d2d13(0x24c)]();}},VisuMZ[_0x2db143(0x483)][_0x2db143(0x80)]=Game_CharacterBase['prototype'][_0x2db143(0x18d)],Game_CharacterBase[_0x2db143(0x287)]['moveDiagonally']=function(_0x5a3f1f,_0x2d4dff){const _0x5e5d6e=_0x2db143;VisuMZ[_0x5e5d6e(0x483)][_0x5e5d6e(0x80)]['call'](this,_0x5a3f1f,_0x2d4dff);if(this[_0x5e5d6e(0x44d)]())this[_0x5e5d6e(0x42f)](_0x5a3f1f,_0x2d4dff);},Game_CharacterBase[_0x2db143(0x287)][_0x2db143(0x42f)]=function(_0x30344d,_0x1a1ca0){const _0x2f0c25=_0x2db143;if(_0x30344d===0x4&&_0x1a1ca0===0x2)this['setDirection'](0x1);if(_0x30344d===0x6&&_0x1a1ca0===0x2)this[_0x2f0c25(0x10e)](0x3);if(_0x30344d===0x4&&_0x1a1ca0===0x8)this['setDirection'](0x7);if(_0x30344d===0x6&&_0x1a1ca0===0x8)this[_0x2f0c25(0x10e)](0x9);},VisuMZ[_0x2db143(0x483)]['Game_CharacterBase_hasStepAnime']=Game_CharacterBase[_0x2db143(0x287)]['hasStepAnime'],Game_CharacterBase[_0x2db143(0x287)][_0x2db143(0x4be)]=function(){const _0x3161e4=_0x2db143;if(this[_0x3161e4(0x285)]()&&this['getPose']()==='ZZZ')return!![];return VisuMZ[_0x3161e4(0x483)][_0x3161e4(0x72)][_0x3161e4(0x3f0)](this);},Game_CharacterBase[_0x2db143(0x287)][_0x2db143(0x224)]=function(_0x15acc2,_0x40a3be){const _0x4f29b1=_0x2db143;if(_0x15acc2['match'](/Z/i))_0x15acc2=_0x4f29b1(0x399);if(_0x15acc2[_0x4f29b1(0x474)](/SLEEP/i))_0x15acc2=_0x4f29b1(0x399);this[_0x4f29b1(0x44d)]()&&(this[_0x4f29b1(0x126)]=_0x15acc2[_0x4f29b1(0x2e8)]()['trim'](),this[_0x4f29b1(0x26d)]=_0x40a3be||Infinity);},Game_CharacterBase['prototype'][_0x2db143(0x394)]=function(){const _0x30ea60=_0x2db143;return this[_0x30ea60(0x44d)]()?(this[_0x30ea60(0x126)]||'')['toUpperCase']()[_0x30ea60(0x28d)]():''[_0x30ea60(0x2e8)]()[_0x30ea60(0x28d)]();},Game_CharacterBase[_0x2db143(0x287)][_0x2db143(0x197)]=function(_0x38edfc,_0xcd8f73){const _0x40e198=_0x2db143;if(this[_0x40e198(0x44d)]()){const _0x12b6b0=['',_0x40e198(0x422),_0x40e198(0x13e),_0x40e198(0x3c8),'HEART',_0x40e198(0x28c),_0x40e198(0x46f),_0x40e198(0x16d),_0x40e198(0x1e1),'LIGHT\x20BULB','ZZZ','','','','',''][_0x38edfc];this[_0x40e198(0x224)](_0x12b6b0,_0xcd8f73);}},Game_CharacterBase[_0x2db143(0x287)][_0x2db143(0x24c)]=function(){const _0xc0b04c=_0x2db143;this[_0xc0b04c(0x126)]='',this[_0xc0b04c(0x26d)]=0x0;},Game_CharacterBase[_0x2db143(0x287)][_0x2db143(0x285)]=function(){const _0x47171e=_0x2db143;return this[_0x47171e(0x44d)]()&&!!this[_0x47171e(0x126)];},Game_CharacterBase[_0x2db143(0x287)]['getPosingCharacterIndex']=function(){const _0x1d481d=_0x2db143,_0x4183e6=this['_pose'][_0x1d481d(0x2e8)]();switch(this['_pose']['toUpperCase']()[_0x1d481d(0x28d)]()){case _0x1d481d(0x2e2):case'HMPH':case _0x1d481d(0x48e):case'HURT':case _0x1d481d(0x44e):case'COLLAPSE':return 0x6;break;default:return 0x7;break;}},Game_CharacterBase[_0x2db143(0x287)][_0x2db143(0x16c)]=function(){const _0x18c42d=_0x2db143;switch(this[_0x18c42d(0x126)][_0x18c42d(0x2e8)]()){case'EXCLAMATION':case'QUESTION':case _0x18c42d(0x3c8):case'!':case'?':return 0x2;break;case _0x18c42d(0x1de):case'ANGER':case _0x18c42d(0x46f):return 0x4;break;case _0x18c42d(0x2e2):case'HMPH':case'VICTORY':case _0x18c42d(0x16d):case'SILENCE':case'LIGHT\x20BULB':return 0x6;break;case _0x18c42d(0x2ac):case _0x18c42d(0x44e):case'COLLAPSE':case _0x18c42d(0x399):case _0x18c42d(0x411):return 0x8;break;default:return VisuMZ[_0x18c42d(0x483)][_0x18c42d(0x4e8)]['call'](this);break;}},Game_CharacterBase[_0x2db143(0x287)][_0x2db143(0x25b)]=function(){const _0x40571c=_0x2db143;switch(this[_0x40571c(0x126)][_0x40571c(0x2e8)]()){case _0x40571c(0x2e2):case _0x40571c(0x2ac):case _0x40571c(0x422):case'!':case _0x40571c(0x1de):case _0x40571c(0x16d):return 0x0;break;case'HMPH':case _0x40571c(0x44e):case _0x40571c(0x13e):case'?':case _0x40571c(0x28c):case _0x40571c(0x1e1):return 0x1;break;case _0x40571c(0x48e):case'COLLAPSE':case _0x40571c(0x3c8):case _0x40571c(0x46f):case _0x40571c(0x30b):return 0x2;break;default:return VisuMZ[_0x40571c(0x483)][_0x40571c(0x301)]['call'](this);break;}},Game_CharacterBase[_0x2db143(0x287)]['forceCarrying']=function(){const _0x496431=_0x2db143;this[_0x496431(0x9c)]=!![];},Game_CharacterBase['prototype'][_0x2db143(0x292)]=function(){this['_forceCarrying']=![];},Game_CharacterBase[_0x2db143(0x287)]['forceDashing']=function(){const _0x111a35=_0x2db143;this[_0x111a35(0x4f9)]=!![];},Game_CharacterBase[_0x2db143(0x287)][_0x2db143(0x3f5)]=function(){const _0xdd1949=_0x2db143;this[_0xdd1949(0x4f9)]=![];},Game_CharacterBase['prototype']['isShadowVisible']=function(){const _0xc99f0c=_0x2db143;if(this[_0xc99f0c(0x3c6)]())return![];if(this[_0xc99f0c(0x2a8)])return![];if(this[_0xc99f0c(0x455)])return![];if(this[_0xc99f0c(0x1d2)]==='')return![];if(this[_0xc99f0c(0x12d)]===Game_Vehicle)return![];return!![];},Game_CharacterBase['prototype']['isShadowShrink']=function(){const _0x45f1c9=_0x2db143;if(this[_0x45f1c9(0x31a)]())return!![];if(this[_0x45f1c9(0x12d)]===Game_Player&&this[_0x45f1c9(0x446)]())return!![];return![];},Game_CharacterBase['prototype'][_0x2db143(0x3f4)]=function(){const _0x364e67=_0x2db143;return VisuMZ[_0x364e67(0x483)]['Settings'][_0x364e67(0x496)]['DefaultShadow'];},Game_CharacterBase['prototype'][_0x2db143(0x276)]=function(){const _0x5ef173=_0x2db143;return this[_0x5ef173(0x4f5)]();},Game_CharacterBase[_0x2db143(0x287)][_0x2db143(0x20d)]=function(){const _0x62c86=_0x2db143;return this[_0x62c86(0x216)]()+this[_0x62c86(0x1af)]()+this[_0x62c86(0x3ec)]();},Game_Character[_0x2db143(0x287)][_0x2db143(0x368)]=function(_0x132aa6,_0x41217e){const _0x85f673=_0x2db143,_0x15a077=this[_0x85f673(0x2ff)](),_0x3b4dbd=$gameMap[_0x85f673(0x45c)](),_0x2692e0=[],_0x566297=[],_0x235176=[],_0x1dc15c={};let _0x391c24=_0x1dc15c;if(this['x']===_0x132aa6&&this['y']===_0x41217e)return 0x0;_0x1dc15c[_0x85f673(0x385)]=null,_0x1dc15c['x']=this['x'],_0x1dc15c['y']=this['y'],_0x1dc15c['g']=0x0,_0x1dc15c['f']=$gameMap[_0x85f673(0x48d)](_0x1dc15c['x'],_0x1dc15c['y'],_0x132aa6,_0x41217e),_0x2692e0[_0x85f673(0xec)](_0x1dc15c),_0x566297[_0x85f673(0xec)](_0x1dc15c['y']*_0x3b4dbd+_0x1dc15c['x']);while(_0x2692e0['length']>0x0){let _0x8c1e5=0x0;for(let _0x699d36=0x0;_0x699d36<_0x2692e0['length'];_0x699d36++){if(_0x2692e0[_0x699d36]['f']<_0x2692e0[_0x8c1e5]['f']){if('QbmEj'===_0x85f673(0x181))return this[_0x85f673(0x351)](_0x85f673(0x169));else _0x8c1e5=_0x699d36;}}const _0x1343cb=_0x2692e0[_0x8c1e5],_0x5ed157=_0x1343cb['x'],_0x55ee3a=_0x1343cb['y'],_0x54d48b=_0x55ee3a*_0x3b4dbd+_0x5ed157,_0xbc7a6d=_0x1343cb['g'];_0x2692e0[_0x85f673(0x3ca)](_0x8c1e5,0x1),_0x566297['splice'](_0x566297['indexOf'](_0x54d48b),0x1),_0x235176[_0x85f673(0xec)](_0x54d48b);if(_0x1343cb['x']===_0x132aa6&&_0x1343cb['y']===_0x41217e){if(_0x85f673(0x29c)==='yZlyA'){_0x391c24=_0x1343cb;break;}else return _0x1d8ed8[_0x85f673(0x483)][_0x85f673(0x1cc)][_0x85f673(0x3f0)](this,_0x4dc536);}if(_0xbc7a6d>=_0x15a077)continue;const _0x14cc47=[0x0,0x4,0x0,0x6,0x4,0x0,0x6,0x4,0x0,0x6],_0x4fa6f2=[0x0,0x2,0x2,0x2,0x0,0x0,0x0,0x8,0x8,0x8];for(let _0x3a0903=0x1;_0x3a0903<0xa;_0x3a0903++){if('AURRl'!=='xGEHh'){if(_0x3a0903===0x5)continue;const _0x416332=_0x3a0903,_0x184f34=_0x14cc47[_0x3a0903],_0x1a4a8c=_0x4fa6f2[_0x3a0903],_0x51c2da=$gameMap[_0x85f673(0x19d)](_0x5ed157,_0x416332),_0x105f46=$gameMap[_0x85f673(0x4fe)](_0x55ee3a,_0x416332),_0x337a98=_0x105f46*_0x3b4dbd+_0x51c2da;if(_0x235176[_0x85f673(0x2c8)](_0x337a98))continue;if(this[_0x85f673(0x12d)]===Game_Player&&VisuMZ[_0x85f673(0x483)][_0x85f673(0x516)]['Movement'][_0x85f673(0xa7)]){if(!this[_0x85f673(0x94)](_0x5ed157,_0x55ee3a,_0x184f34))continue;if(!this[_0x85f673(0x94)](_0x5ed157,_0x55ee3a,_0x1a4a8c))continue;}if(!this['canPassDiagonally'](_0x5ed157,_0x55ee3a,_0x184f34,_0x1a4a8c))continue;const _0x4cad99=_0xbc7a6d+0x1,_0x353a62=_0x566297[_0x85f673(0x381)](_0x337a98);if(_0x353a62<0x0||_0x4cad99<_0x2692e0[_0x353a62]['g']){if('ISqHY'!==_0x85f673(0x22c))this['_speed']=_0x2c0e80,this[_0x85f673(0x3f3)]=!![],_0x49a4d7>0x0&&(this[_0x85f673(0x4b1)]=_0x1bd448[_0x85f673(0x315)](this['_frames'],0x1));else{let _0x3ab2a9={};if(_0x353a62>=0x0)_0x3ab2a9=_0x2692e0[_0x353a62];else{if(_0x85f673(0x30a)===_0x85f673(0x33f))return _0x27f05d['max'](_0x4d0e1b['abs'](this[_0x85f673(0x300)](_0x38f8c1,_0x1beed4)),_0x541911['abs'](this['deltaY'](_0x5bf4da,_0xd48382)));else _0x2692e0[_0x85f673(0xec)](_0x3ab2a9),_0x566297[_0x85f673(0xec)](_0x337a98);}_0x3ab2a9[_0x85f673(0x385)]=_0x1343cb,_0x3ab2a9['x']=_0x51c2da,_0x3ab2a9['y']=_0x105f46,_0x3ab2a9['g']=_0x4cad99,_0x3ab2a9['f']=_0x4cad99+$gameMap[_0x85f673(0x48d)](_0x51c2da,_0x105f46,_0x132aa6,_0x41217e),(!_0x391c24||_0x3ab2a9['f']-_0x3ab2a9['g']<_0x391c24['f']-_0x391c24['g'])&&(_0x391c24=_0x3ab2a9);}}}else return this['moveTowardPoint'](_0x2cfcd4(_0x38f96c['$1']),_0x3736f3(_0x4de571['$2']));}}let _0x272f7e=_0x391c24;while(_0x272f7e[_0x85f673(0x385)]&&_0x272f7e[_0x85f673(0x385)]!==_0x1dc15c){_0x272f7e=_0x272f7e[_0x85f673(0x385)];}const _0x39b1c4=$gameMap[_0x85f673(0x300)](_0x272f7e['x'],_0x1dc15c['x']),_0x2baff6=$gameMap[_0x85f673(0xf8)](_0x272f7e['y'],_0x1dc15c['y']);if(_0x39b1c4<0x0&&_0x2baff6>0x0)return 0x1;if(_0x39b1c4>0x0&&_0x2baff6>0x0)return 0x3;if(_0x39b1c4<0x0&&_0x2baff6<0x0)return 0x7;if(_0x39b1c4>0x0&&_0x2baff6<0x0)return 0x9;if(_0x2baff6>0x0)return 0x2;if(_0x39b1c4<0x0)return 0x4;if(_0x39b1c4>0x0)return 0x6;if(_0x2baff6<0x0)return 0x8;const _0x4074e4=this[_0x85f673(0x4a1)](_0x132aa6),_0x5acb61=this[_0x85f673(0x356)](_0x41217e);if(Math[_0x85f673(0x187)](_0x4074e4)>Math[_0x85f673(0x187)](_0x5acb61))return _0x4074e4>0x0?0x4:0x6;else{if(_0x5acb61!==0x0)return _0x5acb61>0x0?0x8:0x2;}return 0x0;},VisuMZ['EventsMoveCore'][_0x2db143(0x3dc)]=Game_CharacterBase['prototype'][_0x2db143(0x94)],Game_CharacterBase[_0x2db143(0x287)][_0x2db143(0x94)]=function(_0x243cb4,_0x3c48b0,_0x107dc8){const _0x352944=_0x2db143;return this[_0x352944(0x40b)]==='airship'?this[_0x352944(0x1f1)]()[_0x352944(0x3ea)](_0x243cb4,_0x3c48b0,_0x107dc8):VisuMZ['EventsMoveCore'][_0x352944(0x3dc)][_0x352944(0x3f0)](this,_0x243cb4,_0x3c48b0,_0x107dc8);},Game_CharacterBase['prototype']['clearSpriteOffsets']=function(){const _0x452d1d=_0x2db143;this[_0x452d1d(0x375)]=0x0,this['_spriteOffsetY']=0x0;},VisuMZ[_0x2db143(0x483)][_0x2db143(0x432)]=Game_CharacterBase[_0x2db143(0x287)]['screenX'],Game_CharacterBase[_0x2db143(0x287)]['screenX']=function(){const _0x54360d=_0x2db143;return VisuMZ[_0x54360d(0x483)][_0x54360d(0x432)]['call'](this)+(this[_0x54360d(0x375)]||0x0);},VisuMZ['EventsMoveCore'][_0x2db143(0xf0)]=Game_CharacterBase[_0x2db143(0x287)]['screenY'],Game_CharacterBase[_0x2db143(0x287)][_0x2db143(0x216)]=function(){const _0x47c5c1=_0x2db143;return VisuMZ[_0x47c5c1(0x483)][_0x47c5c1(0xf0)][_0x47c5c1(0x3f0)](this)+(this['_spriteOffsetY']||0x0);},Game_CharacterBase[_0x2db143(0x287)]['clearStepPattern']=function(){const _0x24c77e=_0x2db143;this[_0x24c77e(0x4bf)]='';},VisuMZ[_0x2db143(0x483)][_0x2db143(0x167)]=Game_CharacterBase[_0x2db143(0x287)]['updatePattern'],Game_CharacterBase['prototype'][_0x2db143(0x3ad)]=function(){const _0x2e6948=_0x2db143;if(this['_patternLocked'])return;if(this[_0x2e6948(0x3d3)]())return;VisuMZ['EventsMoveCore'][_0x2e6948(0x167)]['call'](this);},Game_CharacterBase[_0x2db143(0x287)][_0x2db143(0x3d3)]=function(){const _0x1e487a=_0x2db143;if(!this[_0x1e487a(0x4be)]()&&this[_0x1e487a(0x210)]>0x0)return![];switch(String(this[_0x1e487a(0x4bf)])[_0x1e487a(0x2e8)]()['trim']()){case _0x1e487a(0x35e):this[_0x1e487a(0x409)]+=0x1;if(this['_pattern']>0x2)this[_0x1e487a(0x367)](0x0);break;case _0x1e487a(0x4ba):this[_0x1e487a(0x409)]-=0x1;if(this[_0x1e487a(0x409)]<0x0)this['setPattern'](0x2);break;case _0x1e487a(0x3a4):case _0x1e487a(0x3f8):this[_0x1e487a(0x161)]();break;case _0x1e487a(0x2ee):case _0x1e487a(0xfa):case _0x1e487a(0x3d4):case _0x1e487a(0x4ff):this['turnLeft90']();break;default:return![];}return!![];},Game_CharacterBase[_0x2db143(0x287)][_0x2db143(0x43f)]=function(){const _0x560c2c=_0x2db143;return $gameSystem[_0x560c2c(0x43f)](this);},Game_CharacterBase['prototype'][_0x2db143(0x4cb)]=function(){const _0x4e1e05=_0x2db143,_0x51463e=this[_0x4e1e05(0x43f)]();if(!_0x51463e)return![];return _0x51463e[_0x4e1e05(0x35a)]>0x0;},Game_CharacterBase[_0x2db143(0x287)][_0x2db143(0x28a)]=function(){const _0x245764=_0x2db143,_0x17bb72=this[_0x245764(0x453)]();return $gameMap['roundXWithDirection'](this['x'],_0x17bb72);},Game_CharacterBase[_0x2db143(0x287)]['frontY']=function(){const _0x5c4312=_0x2db143,_0x2e45cd=this[_0x5c4312(0x453)]();return $gameMap['roundYWithDirection'](this['y'],_0x2e45cd);},Game_CharacterBase[_0x2db143(0x287)]['backX']=function(){const _0x2be4ca=_0x2db143,_0x55b88f=this[_0x2be4ca(0x248)](this[_0x2be4ca(0x453)]());return $gameMap['roundXWithDirection'](this['x'],_0x55b88f);},Game_CharacterBase['prototype'][_0x2db143(0xf6)]=function(){const _0x2a93a6=_0x2db143,_0x4e8de9=this[_0x2a93a6(0x248)](this[_0x2a93a6(0x453)]());return $gameMap[_0x2a93a6(0x4fe)](this['y'],_0x4e8de9);},VisuMZ[_0x2db143(0x483)][_0x2db143(0x460)]=Game_Character[_0x2db143(0x287)][_0x2db143(0x1b0)],Game_Character[_0x2db143(0x287)]['setMoveRoute']=function(_0x21eaff){const _0x3c9d21=_0x2db143;route=JsonEx['makeDeepCopy'](_0x21eaff),VisuMZ[_0x3c9d21(0x483)][_0x3c9d21(0x460)][_0x3c9d21(0x3f0)](this,route);},VisuMZ[_0x2db143(0x483)]['Game_Character_forceMoveRoute']=Game_Character[_0x2db143(0x287)]['forceMoveRoute'],Game_Character[_0x2db143(0x287)][_0x2db143(0x252)]=function(_0x386794){const _0x3b5d18=_0x2db143;route=JsonEx['makeDeepCopy'](_0x386794),VisuMZ[_0x3b5d18(0x483)][_0x3b5d18(0x3b9)][_0x3b5d18(0x3f0)](this,route);},VisuMZ[_0x2db143(0x483)][_0x2db143(0x171)]=Game_Character[_0x2db143(0x287)][_0x2db143(0x2f3)],Game_Character[_0x2db143(0x287)][_0x2db143(0x2f3)]=function(_0xba153c){const _0xf895b5=_0x2db143,_0x11fa2f=Game_Character,_0x50f536=_0xba153c[_0xf895b5(0xe2)];if(_0xba153c[_0xf895b5(0x2c5)]===_0x11fa2f[_0xf895b5(0x3e7)]){let _0x5c2a89=_0xba153c['parameters'][0x0];_0x5c2a89=this[_0xf895b5(0x1a7)](_0x5c2a89),_0x5c2a89=this[_0xf895b5(0x476)](_0x5c2a89),this[_0xf895b5(0x370)](_0xba153c,_0x5c2a89);}else{if(_0xf895b5(0x156)!==_0xf895b5(0x156))for(const _0x52607f of _0xe216fc){if(_0x52607f['match'](/<HITBOX[ ](.*?):[ ](\d+)>/i)){const _0x374b59=_0x2421ea(_0x37c647['$1'])[_0xf895b5(0x12b)]()[_0xf895b5(0x28d)](),_0xd6c150=_0x3f933b(_0x5878cc['$2']);this[_0xf895b5(0x2ba)][_0x374b59]=_0xd6c150;}}else VisuMZ[_0xf895b5(0x483)]['Game_Character_processMoveCommand']['call'](this,_0xba153c);}},Game_Character[_0x2db143(0x287)][_0x2db143(0x1a7)]=function(_0xc8a75d){const _0x57cda0=_0x2db143,_0x525800=/\$gameVariables\.value\((\d+)\)/gi,_0x554418=/\\V\[(\d+)\]/gi;while(_0xc8a75d[_0x57cda0(0x474)](_0x525800)){if(_0x57cda0(0x85)===_0x57cda0(0x497))return this[_0x57cda0(0x1cd)](_0x3f981f);else _0xc8a75d=_0xc8a75d['replace'](_0x525800,(_0x1caed5,_0x308409)=>$gameVariables[_0x57cda0(0x3a6)](parseInt(_0x308409)));}while(_0xc8a75d[_0x57cda0(0x474)](_0x554418)){_0xc8a75d=_0xc8a75d[_0x57cda0(0x520)](_0x554418,(_0xf20fcc,_0x19c4cf)=>$gameVariables[_0x57cda0(0x3a6)](parseInt(_0x19c4cf)));}return _0xc8a75d;},Game_Character['prototype'][_0x2db143(0x476)]=function(_0x45404a){const _0x59fa21=_0x2db143,_0x572961=/\\SELFVAR\[(\d+)\]/gi;while(_0x45404a[_0x59fa21(0x474)](_0x572961)){_0x59fa21(0x3be)===_0x59fa21(0x3be)?_0x45404a=_0x45404a['replace'](_0x572961,(_0x4972ba,_0x403cad)=>getSelfVariableValue(this[_0x59fa21(0x9d)],this['_eventId'],parseInt(_0x403cad))):this[_0x59fa21(0x96)]();}return _0x45404a;},Game_Character['prototype'][_0x2db143(0x370)]=function(_0x14b66e,_0x56e96f){const _0x59fbfe=_0x2db143;if(_0x56e96f[_0x59fbfe(0x474)](/ANIMATION:[ ](\d+)/i)){if(_0x59fbfe(0x1cb)!=='lkPwW'){const _0x374e4a=_0x377678[_0x59fbfe(0x139)][_0x59fbfe(0x346)],_0x232176=_0x3de5c8[_0x59fbfe(0x139)]['eventId'];return _0x2119a2[_0x59fbfe(0x395)][_0x374e4a][_0x59fbfe(0x4e5)][_0x232176];}else return this[_0x59fbfe(0x3db)](Number(RegExp['$1']));}if(_0x56e96f[_0x59fbfe(0x474)](/BALLOON:[ ](.*)/i))return this[_0x59fbfe(0x1a2)](String(RegExp['$1']));if(_0x56e96f[_0x59fbfe(0x474)](/FADE IN:[ ](\d+)/i))return this[_0x59fbfe(0x1bd)](Number(RegExp['$1']));if(_0x56e96f['match'](/FADE OUT:[ ](\d+)/i)){if(_0x59fbfe(0x191)!==_0x59fbfe(0x191))_0x351960=_0xd1c268[_0x59fbfe(0x346)],_0x3d03c8=_0xca6898[_0x59fbfe(0x2b5)];else return this[_0x59fbfe(0xba)](Number(RegExp['$1']));}if(_0x56e96f['match'](/FORCE (?:CARRY|CARRYING|HOLD|HOLDING):[ ](?:TRUE|ON)/i)){if(_0x59fbfe(0x1c8)!==_0x59fbfe(0x1c8))_0x34b59f[_0x59fbfe(0x7c)](_0x1bb7da[_0x59fbfe(0x374)],_0x5dcf30[_0x59fbfe(0x35b)],_0x2af547[_0x59fbfe(0x22d)],_0x3d56c9[_0x59fbfe(0x16a)],_0x1391f9[_0x59fbfe(0x15a)]);else return this['forceCarrying']();}if(_0x56e96f['match'](/FORCE (?:CARRY|CARRYING|HOLD|HOLDING):[ ](?:FALSE|OFF)/i)){if(_0x59fbfe(0x7d)!==_0x59fbfe(0x457))return this[_0x59fbfe(0x292)]();else _0xd8cf52[0x2]=_0x502e22(_0x27653c)['charAt'](0x0)[_0x59fbfe(0x2e8)]()[_0x59fbfe(0x28d)]();}if(_0x56e96f['match'](/FORCE (?:DASH|DASHING|RUN|RUNNING):[ ](?:TRUE|ON)/i))return this[_0x59fbfe(0x48b)]();if(_0x56e96f[_0x59fbfe(0x474)](/FORCE (?:DASH|DASHING|RUN|RUNNING):[ ](?:FALSE|OFF)/i))return this[_0x59fbfe(0x3f5)]();if(_0x56e96f[_0x59fbfe(0x474)](/HUG:[ ]LEFT/i))return this[_0x59fbfe(0x351)]('left');if(_0x56e96f[_0x59fbfe(0x474)](/HUG:[ ]RIGHT/i))return this[_0x59fbfe(0x351)](_0x59fbfe(0x1d6));if(_0x56e96f[_0x59fbfe(0x474)](/INDEX:[ ](\d+)/i))return this[_0x59fbfe(0x1a3)](Number(RegExp['$1']));if(_0x56e96f[_0x59fbfe(0x474)](/INDEX:[ ]([\+\-]\d+)/i)){const _0x17f172=this['_characterIndex']+Number(RegExp['$1']);return this[_0x59fbfe(0x1a3)](_0x17f172);}if(_0x56e96f['match'](/JUMP FORWARD:[ ](\d+)/i))return this[_0x59fbfe(0x254)](Number(RegExp['$1']));if(_0x56e96f[_0x59fbfe(0x474)](/JUMP TO:\s*(\d+)\s*[, ]\s*(\d+)/i)){if(_0x59fbfe(0x306)!=='WbHzn')return this[_0x59fbfe(0x325)](Number(RegExp['$1']),Number(RegExp['$2']));else{const _0xd0c742=_0x19bea7[_0x59fbfe(0x218)](_0x220a80,_0x201a7f);for(const _0x2531e3 of _0xd0c742){if(_0x2531e3&&_0x2531e3[_0x59fbfe(0xd2)]())return _0x2531e3['onClickTrigger'](),!![];}return![];}}if(_0x56e96f['match'](/JUMP TO EVENT:[ ](\d+)/i)){if(_0x59fbfe(0x302)===_0x59fbfe(0x302)){const _0x4d7152=$gameMap[_0x59fbfe(0x124)](Number(RegExp['$1']));return this[_0x59fbfe(0x38b)](_0x4d7152);}else _0x13e6dd[_0x59fbfe(0x483)][_0x59fbfe(0x414)]['call'](this),this[_0x59fbfe(0x119)]();}if(_0x56e96f[_0x59fbfe(0x474)](/JUMP TO PLAYER/i)){if('HUjPT'===_0x59fbfe(0x3d2)){for(let _0x4fa35d=-this['_addedHitbox']['left'];_0x4fa35d<=this['_addedHitbox'][_0x59fbfe(0x1d6)];_0x4fa35d++){for(let _0x2ce762=-this[_0x59fbfe(0x2ba)]['up'];_0x2ce762<=this[_0x59fbfe(0x2ba)][_0x59fbfe(0xd0)];_0x2ce762++){if(!_0x5fe26e['prototype'][_0x59fbfe(0x94)]['call'](this,_0x44f0d4+_0x4fa35d,_0x501053+_0x2ce762,_0x5527fa))return![];}}return!![];}else return this['processMoveRouteJumpToCharacter']($gamePlayer);}if(_0x56e96f[_0x59fbfe(0x474)](/MOVE[ ](.*)[ ]UNTIL STOP/i)){const _0xcaec78=String(RegExp['$1']),_0x3943c7=this[_0x59fbfe(0x441)](_0x56e96f);return this['processMoveRouteMoveUntilStop'](_0xcaec78,_0x3943c7);}if(_0x56e96f[_0x59fbfe(0x474)](/MOVE TO:\s*(\d+)\s*[, ]\s*(\d+)/i)){if(_0x59fbfe(0x209)===_0x59fbfe(0x2d4))this[_0x59fbfe(0x311)][_0x59fbfe(0x206)]=_0x3c50d4(_0x45354a['$1']);else{const _0x1e0e26=Number(RegExp['$1']),_0x18f3c8=Number(RegExp['$2']),_0x2d795e=this['checkCollisionKeywords'](_0x56e96f);return this[_0x59fbfe(0x123)](_0x1e0e26,_0x18f3c8,_0x2d795e);}}if(_0x56e96f[_0x59fbfe(0x474)](/MOVE TO EVENT:[ ](\d+)/i)){if('VHSfR'!==_0x59fbfe(0x95)){const _0x516bcf=$gameMap['event'](Number(RegExp['$1'])),_0x22600c=this[_0x59fbfe(0x441)](_0x56e96f);return this['processMoveRouteMoveToCharacter'](_0x516bcf,_0x22600c);}else _0x489cf6[_0x59fbfe(0x222)](_0x4a8890['_selfTargetItemChoice']),_0x36ff95[_0x59fbfe(0x483)]['Window_EventItem_onOk'][_0x59fbfe(0x3f0)](this),_0x4ac3de[_0x59fbfe(0x214)](),_0x4efd8f['_selfTargetItemChoice']=_0x59b91a;}if(_0x56e96f[_0x59fbfe(0x474)](/MOVE TO PLAYER/i)){const _0x1457fe=this[_0x59fbfe(0x441)](_0x56e96f);return this[_0x59fbfe(0x21f)]($gamePlayer,_0x1457fe);}if(_0x56e96f[_0x59fbfe(0x474)](/MOVE LOWER LEFT:[ ](\d+)/i)){if('phzDy'!==_0x59fbfe(0x1b2))return this[_0x59fbfe(0x4cc)](0x1,Number(RegExp['$1']));else{const _0x467926=_0x59fbfe(0xdb)[_0x59fbfe(0x183)](_0x3f8783[_0x59fbfe(0x319)](0x0)['toUpperCase']()+_0x1c4802[_0x59fbfe(0x49b)](0x1));if(_0x1e9c9b[_0x467926])return _0x1e16b9[_0x467926]['includes'](_0x3504b0);}}if(_0x56e96f[_0x59fbfe(0x474)](/MOVE DOWN:[ ](\d+)/i)){if(_0x59fbfe(0x3b8)!==_0x59fbfe(0x3b7))return this[_0x59fbfe(0x4cc)](0x2,Number(RegExp['$1']));else{const _0x484371=_0x35fb10[_0x59fbfe(0x124)](_0x34dac6(_0x2c0e5c['$1']));return this[_0x59fbfe(0x1cd)](_0x484371);}}if(_0x56e96f[_0x59fbfe(0x474)](/MOVE LOWER RIGHT:[ ](\d+)/i))return this[_0x59fbfe(0x4cc)](0x3,Number(RegExp['$1']));if(_0x56e96f[_0x59fbfe(0x474)](/MOVE LEFT:[ ](\d+)/i)){if(_0x59fbfe(0x3e4)===_0x59fbfe(0x1f9)){const _0x5d6f8e=_0x14d831[_0x59fbfe(0x46a)](),_0x1aced9=_0x8358c4['destinationY'](),_0x5f27d8=_0x4bf623[_0x59fbfe(0x3d6)](),_0x46f921=_0x6e4b9b[_0x59fbfe(0x7f)](_0x5d6f8e,_0x1aced9),_0x39be06=_0x5058ee[_0x59fbfe(0xd8)](_0x5d6f8e,_0x1aced9)[_0x59fbfe(0x141)]<=0x0;_0x5f27d8&&_0x46f921&&_0x39be06?_0x5cf90f=this[_0x59fbfe(0x368)](_0x5d6f8e,_0x1aced9):_0x1ff0b1=this[_0x59fbfe(0x4b4)](_0x5d6f8e,_0x1aced9);}else return this[_0x59fbfe(0x4cc)](0x4,Number(RegExp['$1']));}if(_0x56e96f[_0x59fbfe(0x474)](/MOVE RIGHT:[ ](\d+)/i)){if('SmDJT'===_0x59fbfe(0x3a2))this[_0x59fbfe(0x3b1)](),this[_0x59fbfe(0x355)]=0x3c;else return this['processMoveRouteMoveRepeat'](0x6,Number(RegExp['$1']));}if(_0x56e96f[_0x59fbfe(0x474)](/MOVE UPPER LEFT:[ ](\d+)/i)){if(_0x59fbfe(0x485)!==_0x59fbfe(0xc4))return this['processMoveRouteMoveRepeat'](0x7,Number(RegExp['$1']));else{const _0x5ca701=this[_0x59fbfe(0x124)]()[_0x59fbfe(0x4b6)];if(_0x5ca701==='')return;this[_0x59fbfe(0x393)](_0x5ca701);}}if(_0x56e96f['match'](/MOVE UP:[ ](\d+)/i))return this['processMoveRouteMoveRepeat'](0x8,Number(RegExp['$1']));if(_0x56e96f[_0x59fbfe(0x474)](/MOVE UPPER RIGHT:[ ](\d+)/i)){if(_0x59fbfe(0x165)===_0x59fbfe(0x165))return this[_0x59fbfe(0x4cc)](0x9,Number(RegExp['$1']));else{if(this[_0x59fbfe(0x44d)]()){const _0x19b5eb=['',_0x59fbfe(0x422),_0x59fbfe(0x13e),_0x59fbfe(0x3c8),_0x59fbfe(0x1de),_0x59fbfe(0x28c),'SWEAT','COBWEB',_0x59fbfe(0x1e1),_0x59fbfe(0x30b),_0x59fbfe(0x399),'','','','',''][_0x2d3fbb];this[_0x59fbfe(0x224)](_0x19b5eb,_0x3363d0);}}}if(_0x56e96f[_0x59fbfe(0x474)](/OPACITY:[ ](\d+)([%％])/i)){const _0x21edb9=Math[_0x59fbfe(0x379)](Number(RegExp['$1'])/0x64*0xff);return this[_0x59fbfe(0x49e)](_0x21edb9[_0x59fbfe(0x17f)](0x0,0xff));}if(_0x56e96f['match'](/OPACITY:[ ]([\+\-]\d+)([%％])/i)){if('DwQJO'!==_0x59fbfe(0x295)){const _0x25cacd=this[_0x59fbfe(0x24e)]+Math[_0x59fbfe(0x379)](Number(RegExp['$1'])/0x64*0xff);return this[_0x59fbfe(0x49e)](_0x25cacd[_0x59fbfe(0x17f)](0x0,0xff));}else{if(this['_followerChaseOff']===_0x392597)this[_0x59fbfe(0x401)]();return this[_0x59fbfe(0x120)];}}if(_0x56e96f[_0x59fbfe(0x474)](/OPACITY:[ ]([\+\-]\d+)/i)){const _0xe23911=this['_opacity']+Number(RegExp['$1']);return this[_0x59fbfe(0x49e)](_0xe23911[_0x59fbfe(0x17f)](0x0,0xff));}if(_0x56e96f[_0x59fbfe(0x474)](/PATTERN LOCK:[ ](\d+)/i)){if('QaDFl'!==_0x59fbfe(0x125))_0x554b07+=this[_0x59fbfe(0x463)]();else return this[_0x59fbfe(0x507)](Number(RegExp['$1']));}if(_0x56e96f[_0x59fbfe(0x474)](/PATTERN UNLOCK/i)){if('iYLLU'===_0x59fbfe(0x2cc))_0x1efbd9[_0x59fbfe(0x222)](_0x1be925[_0x59fbfe(0x1c2)]),_0x563f55['EventsMoveCore'][_0x59fbfe(0x1e7)][_0x59fbfe(0x3f0)](this),_0x6a4d51[_0x59fbfe(0x214)](),_0x3ac9fe[_0x59fbfe(0x1c2)]=_0x1e311f;else return this[_0x59fbfe(0x1f6)]=![];}if(_0x56e96f[_0x59fbfe(0x474)](/POSE:[ ](.*)/i)){const _0x419fac=String(RegExp['$1'])[_0x59fbfe(0x2e8)]()[_0x59fbfe(0x28d)]();return this[_0x59fbfe(0x224)](_0x419fac);}if(_0x56e96f['match'](/STEP TOWARD:\s*(\d+)\s*[, ]\s*(\d+)/i)){if(_0x59fbfe(0x279)!==_0x59fbfe(0x279))return this[_0x59fbfe(0x45a)]||0x0;else{const _0xe9a74f=Number(RegExp['$1']),_0x1139b8=Number(RegExp['$2']);return this[_0x59fbfe(0x50a)](_0xe9a74f,_0x1139b8);}}if(_0x56e96f['match'](/STEP TOWARD EVENT:[ ](\d+)/i)){const _0x531e71=$gameMap[_0x59fbfe(0x124)](Number(RegExp['$1']));return this[_0x59fbfe(0x89)](_0x531e71);}if(_0x56e96f[_0x59fbfe(0x474)](/STEP TOWARD PLAYER/i))return this[_0x59fbfe(0x89)]($gamePlayer);if(_0x56e96f[_0x59fbfe(0x474)](/STEP AWAY FROM:\s*(\d+)\s*[, ]\s*(\d+)/i))return this[_0x59fbfe(0x8a)](Number(RegExp['$1']),Number(RegExp['$2']));if(_0x56e96f[_0x59fbfe(0x474)](/STEP AWAY FROM EVENT:[ ](\d+)/i)){const _0x19f134=$gameMap['event'](Number(RegExp['$1']));return this['moveAwayFromCharacter'](_0x19f134);}if(_0x56e96f[_0x59fbfe(0x474)](/STEP AWAY FROM PLAYER/i))return this[_0x59fbfe(0x1da)]($gamePlayer);if(_0x56e96f[_0x59fbfe(0x474)](/TURN TO:\s*(\d+)\s*[, ]\s*(\d+)/i)){if(_0x59fbfe(0x8d)==='zamtx')this[_0x59fbfe(0x3b3)]=!![];else return this[_0x59fbfe(0x4e9)](Number(RegExp['$1']),Number(RegExp['$2']));}if(_0x56e96f['match'](/TURN TO EVENT:[ ](\d+)/i)){if(_0x59fbfe(0x20e)!==_0x59fbfe(0x20e)){if(!_0x1c5ba0[_0x59fbfe(0x2ad)][_0x191a83]){_0x5d8040['switches'][_0x410b3c][_0x59fbfe(0x474)](/<JS>\s*([\s\S]*)\s*<\/JS>/i);const _0x5633d0='return\x20%1'[_0x59fbfe(0x183)](_0x1ca05a(_0x5c140b['$1']));_0x2cf86e[_0x59fbfe(0x2ad)][_0x18b3c4]=new _0x9d8089(_0x59fbfe(0xc1),_0x5633d0);}const _0x5ee4c6=_0x43b5e1[_0x59fbfe(0x3a7)]()||this;return _0x24e3da[_0x59fbfe(0x2ad)][_0xd7ca79][_0x59fbfe(0x3f0)](_0x5ee4c6,_0x3f33e8);}else{const _0x42773=$gameMap['event'](Number(RegExp['$1']));return this[_0x59fbfe(0x1cd)](_0x42773);}}if(_0x56e96f['match'](/TURN TO PLAYER/i))return this[_0x59fbfe(0x1cd)]($gamePlayer);if(_0x56e96f['match'](/TURN AWAY FROM:\s*(\d+)\s*[, ]\s*(\d+)/i))return this[_0x59fbfe(0x4cf)](Number(RegExp['$1']),Number(RegExp['$2']));if(_0x56e96f[_0x59fbfe(0x474)](/TURN AWAY FROM EVENT:[ ](\d+)/i)){const _0x55c355=$gameMap[_0x59fbfe(0x124)](Number(RegExp['$1']));return this['turnAwayFromCharacter'](_0x55c355);}if(_0x56e96f[_0x59fbfe(0x474)](/TURN AWAY FROM PLAYER/i))return this['turnAwayFromCharacter']($gamePlayer);if(_0x56e96f[_0x59fbfe(0x474)](/TURN LOWER LEFT/i))return _0x59fbfe(0xce)===_0x59fbfe(0xce)?this[_0x59fbfe(0x10e)](0x1):this[_0x59fbfe(0x1f6)]=![];if(_0x56e96f[_0x59fbfe(0x474)](/TURN LOWER RIGHT/i))return this[_0x59fbfe(0x10e)](0x3);if(_0x56e96f[_0x59fbfe(0x474)](/TURN UPPER LEFT/i)){if('PTRwI'!==_0x59fbfe(0x207))_0x3fcb2f['EventsMoveCore'][_0x59fbfe(0x478)][_0x59fbfe(0x3f0)](this);else return this[_0x59fbfe(0x10e)](0x7);}if(_0x56e96f[_0x59fbfe(0x474)](/TURN UPPER RIGHT/i)){if(_0x59fbfe(0x334)===_0x59fbfe(0x334))return this[_0x59fbfe(0x10e)](0x9);else this[_0x59fbfe(0x311)][_0x59fbfe(0x211)]=_0x35bcb0(_0x3db7d['$1']);}if(_0x56e96f[_0x59fbfe(0x474)](/Self Switch[ ](.*):[ ](.*)/i))return this[_0x59fbfe(0xcf)](RegExp['$1'],RegExp['$2']);if(_0x56e96f['match'](/Self Variable[ ](.*):[ ](.*)/i))return this[_0x59fbfe(0x1b9)](RegExp['$1'],RegExp['$2']);if(_0x56e96f['match'](/TELEPORT TO:\s*(\d+)\s*[, ]\s*(\d+)/i)){if('ZqEsa'===_0x59fbfe(0xab)){_0x513f16['ConvertParams'](_0x2efe1e,_0x9a5cb2);const _0x5e92d4=_0xa1a359[_0x59fbfe(0x179)](),_0x11a5b2=_0x2bbf85['MapId']||_0x546d35[_0x59fbfe(0x346)](),_0x2ece2e=_0x11c095[_0x59fbfe(0x180)]||_0x5e92d4[_0x59fbfe(0x2b5)]();_0x2d1e55[_0x59fbfe(0x3f1)](_0x11a5b2,_0x2ece2e);}else return this['processMoveRouteTeleportTo'](Number(RegExp['$1']),Number(RegExp['$2']));}if(_0x56e96f[_0x59fbfe(0x474)](/TELEPORT TO EVENT:[ ](\d+)/i)){const _0x2a1ab0=$gameMap[_0x59fbfe(0x124)](Number(RegExp['$1']));return this[_0x59fbfe(0x4fd)](_0x2a1ab0);}if(_0x56e96f[_0x59fbfe(0x474)](/TELEPORT TO PLAYER/i))return this[_0x59fbfe(0x4fd)]($gamePlayer);try{VisuMZ[_0x59fbfe(0x483)][_0x59fbfe(0x171)][_0x59fbfe(0x3f0)](this,_0x14b66e);}catch(_0x148de0){if($gameTemp[_0x59fbfe(0x199)]())console['log'](_0x148de0);}},Game_Character[_0x2db143(0x287)]['processMoveRouteAnimation']=function(_0x498710){$gameTemp['requestAnimation']([this],_0x498710);},Game_Character[_0x2db143(0x287)][_0x2db143(0x1a2)]=function(_0x51154c){const _0x50807a=_0x2db143;let _0x1c39f1=0x0;switch(_0x51154c[_0x50807a(0x2e8)]()[_0x50807a(0x28d)]()){case'!':case'EXCLAMATION':_0x1c39f1=0x1;break;case'?':case _0x50807a(0x13e):_0x1c39f1=0x2;break;case _0x50807a(0x4af):case'NOTE':case _0x50807a(0x3c8):case _0x50807a(0x12c):case'MUSICNOTE':_0x1c39f1=0x3;break;case'HEART':case _0x50807a(0x4ea):_0x1c39f1=0x4;break;case _0x50807a(0x28c):_0x1c39f1=0x5;break;case _0x50807a(0x46f):_0x1c39f1=0x6;break;case _0x50807a(0x16d):case _0x50807a(0x193):case _0x50807a(0x400):_0x1c39f1=0x7;break;case _0x50807a(0x1e1):case _0x50807a(0x219):_0x1c39f1=0x8;break;case _0x50807a(0x515):case _0x50807a(0x82):case _0x50807a(0x30b):case _0x50807a(0x436):case'LIGHTBULB':_0x1c39f1=0x9;break;case'Z':case'ZZ':case'ZZZ':case _0x50807a(0x411):_0x1c39f1=0xa;break;case _0x50807a(0x236):_0x1c39f1=0xb;break;case _0x50807a(0x514):_0x1c39f1=0xc;break;case _0x50807a(0x7a):_0x1c39f1=0xd;break;case _0x50807a(0x2b7):_0x1c39f1=0xe;break;case _0x50807a(0x447):_0x1c39f1=0xf;break;}$gameTemp[_0x50807a(0x486)](this,_0x1c39f1);},Game_Character['prototype']['processMoveRouteFadeIn']=function(_0x5399f3){const _0x1db2bb=_0x2db143;_0x5399f3+=this[_0x1db2bb(0x24e)],this[_0x1db2bb(0x49e)](_0x5399f3[_0x1db2bb(0x17f)](0x0,0xff));if(this[_0x1db2bb(0x24e)]<0xff)this[_0x1db2bb(0x182)]--;},Game_Character[_0x2db143(0x287)][_0x2db143(0xba)]=function(_0x191c0e){const _0x2aa299=_0x2db143;_0x191c0e=this[_0x2aa299(0x24e)]-_0x191c0e,this[_0x2aa299(0x49e)](_0x191c0e[_0x2aa299(0x17f)](0x0,0xff));if(this[_0x2aa299(0x24e)]>0x0)this[_0x2aa299(0x182)]--;},Game_Character[_0x2db143(0x287)][_0x2db143(0x351)]=function(_0x3fa1ca){const _0x568867=_0x2db143,_0xec3f6d=[0x0,0x3,0x6,0x9,0x2,0x0,0x8,0x1,0x4,0x7],_0x1e4599=[0x0,0x7,0x4,0x1,0x8,0x0,0x2,0x9,0x6,0x3],_0x289d7a=this[_0x568867(0x453)](),_0x74bc1f=(_0x3fa1ca===_0x568867(0x169)?_0xec3f6d:_0x1e4599)[_0x289d7a],_0x36b472=(_0x3fa1ca===_0x568867(0x169)?_0x1e4599:_0xec3f6d)[_0x289d7a];if(this['canPass'](this['x'],this['y'],_0x74bc1f))_0x3fa1ca===_0x568867(0x169)?_0x568867(0x1e5)==='GzGPN'?this[_0x568867(0x189)]():_0x536a71[_0x568867(0x172)](_0x5a44a1,!!_0x26aca1):this[_0x568867(0x161)]();else{if(!this[_0x568867(0x94)](this['x'],this['y'],this[_0x568867(0x453)]())){if(this[_0x568867(0x94)](this['x'],this['y'],_0x36b472)){if(_0x3fa1ca===_0x568867(0x169)){if(_0x568867(0x205)!=='DPaWN')this['turnRight90']();else return this[_0x568867(0x23e)]=![],this[_0x568867(0x35d)]=![],this[_0x568867(0x124)]()?_0x205d47['EventsMoveCore'][_0x568867(0x404)][_0x568867(0x3f0)](this):-0x1;}else{if(_0x568867(0x201)!==_0x568867(0x106))this[_0x568867(0x189)]();else{if([0x6c,0x198][_0x568867(0x2c8)](_0x4f794d[_0x568867(0x2c5)])){if(_0x24438e!=='')_0x5d2c9c+='\x0a';_0x549266+=_0x47dbf0[_0x568867(0xe2)][0x0];}}}}else'Rftdc'===_0x568867(0x8c)?this[_0x568867(0x1ee)]():(this[_0x568867(0x4b1)]=this[_0x568867(0x4b1)]||0x0,this[_0x568867(0x4b1)]+=_0x2515b4,this[_0x568867(0x3f3)]=!![],this[_0x568867(0x4b1)]=_0x5d02be['max'](0x1,this[_0x568867(0x4b1)]));}}this[_0x568867(0x94)](this['x'],this['y'],this[_0x568867(0x453)]())&&('ATFLU'!==_0x568867(0x3e1)?this[_0x568867(0x511)]():this[_0x568867(0x102)]());},Game_Character[_0x2db143(0x287)][_0x2db143(0x1a3)]=function(_0x5bb56b){const _0x37395b=_0x2db143;if(ImageManager[_0x37395b(0x3ae)](this[_0x37395b(0x1d2)]))return;_0x5bb56b=_0x5bb56b[_0x37395b(0x17f)](0x0,0x7),this[_0x37395b(0x4a5)](this['_characterName'],_0x5bb56b);},Game_Character['prototype']['processMoveRouteJumpForward']=function(_0x97057e){const _0x399a9e=_0x2db143;switch(this['direction']()){case 0x1:this[_0x399a9e(0x14e)](-_0x97057e,_0x97057e);break;case 0x2:this['jump'](0x0,_0x97057e);break;case 0x3:this[_0x399a9e(0x14e)](_0x97057e,_0x97057e);break;case 0x4:this[_0x399a9e(0x14e)](-_0x97057e,0x0);break;case 0x6:this['jump'](_0x97057e,0x0);break;case 0x7:this[_0x399a9e(0x14e)](-_0x97057e,-_0x97057e);break;case 0x8:this['jump'](0x0,-_0x97057e);break;case 0x9:this[_0x399a9e(0x14e)](_0x97057e,-_0x97057e);break;}},Game_Character[_0x2db143(0x287)]['processMoveRouteJumpTo']=function(_0x50fe08,_0x48b4ef){const _0x1eb325=_0x2db143,_0x104e3f=Math[_0x1eb325(0x379)](_0x50fe08-this['x']),_0x172492=Math[_0x1eb325(0x379)](_0x48b4ef-this['y']);this['jump'](_0x104e3f,_0x172492);},Game_Character[_0x2db143(0x287)][_0x2db143(0x38b)]=function(_0x57b6b9){const _0x2eb816=_0x2db143;if(_0x57b6b9)this[_0x2eb816(0x325)](_0x57b6b9['x'],_0x57b6b9['y']);},Game_Character[_0x2db143(0x287)][_0x2db143(0x50a)]=function(_0x21a8e1,_0x3f0763,_0x245f88){const _0x22ea22=_0x2db143;let _0x53c576=0x0;if(_0x245f88)$gameTemp[_0x22ea22(0x2ec)]=!![];if($gameMap[_0x22ea22(0x3d6)]())_0x53c576=this[_0x22ea22(0x368)](_0x21a8e1,_0x3f0763);else{if('wdjwf'!==_0x22ea22(0x1ac)){for(const _0x2e3f9e of this[_0x22ea22(0x435)]){if(_0x2e3f9e)return _0x2e3f9e;}return null;}else _0x53c576=this[_0x22ea22(0x4b4)](_0x21a8e1,_0x3f0763);}if(_0x245f88)$gameTemp['_moveAllowPlayerCollision']=![];this[_0x22ea22(0x1f2)](_0x53c576),this[_0x22ea22(0x10c)](!![]);},Game_Character[_0x2db143(0x287)][_0x2db143(0x89)]=function(_0x52ebd4){const _0x264487=_0x2db143;if(_0x52ebd4)this[_0x264487(0x50a)](_0x52ebd4['x'],_0x52ebd4['y']);},Game_Character[_0x2db143(0x287)][_0x2db143(0xb9)]=function(_0x13a319,_0x343d28){const _0x3ebbe9=_0x2db143,_0x99c892=this['deltaXFrom'](_0x13a319),_0x50f318=this[_0x3ebbe9(0x356)](_0x343d28);},Game_Character[_0x2db143(0x287)][_0x2db143(0x441)]=function(_0x1478a1){const _0x1ec024=_0x2db143;if(_0x1478a1[_0x1ec024(0x474)](/(?:CRASH|COLLIDE|COLLISION|ENCOUNTER|TOUCH)/i))return!![];else return _0x1478a1[_0x1ec024(0x474)](/(?:AVOID|EVADE|DODGE)/i)?![]:![];},VisuMZ[_0x2db143(0x483)][_0x2db143(0x1b3)]=Game_Event[_0x2db143(0x287)][_0x2db143(0xdd)],Game_Event[_0x2db143(0x287)][_0x2db143(0xdd)]=function(_0x357d94,_0x385f16){const _0x2e2ab4=_0x2db143;if($gameTemp[_0x2e2ab4(0x2ec)])return![];return VisuMZ[_0x2e2ab4(0x483)]['Game_Event_isCollidedWithPlayerCharacters']['call'](this,_0x357d94,_0x385f16);},Game_Character[_0x2db143(0x287)][_0x2db143(0x154)]=function(_0x2df193,_0x521a7a){const _0x3e2ae6=_0x2db143,_0x1f83ad=['',_0x3e2ae6(0x249),_0x3e2ae6(0x347),_0x3e2ae6(0x2de),'LEFT','',_0x3e2ae6(0x22f),_0x3e2ae6(0x25d),'UP','UPPER\x20RIGHT'],_0x94bc66=_0x1f83ad[_0x3e2ae6(0x381)](_0x2df193[_0x3e2ae6(0x2e8)]()[_0x3e2ae6(0x28d)]());if(_0x94bc66<=0x0)return;if(_0x521a7a)$gameTemp[_0x3e2ae6(0x2ec)]=!![];if(this[_0x3e2ae6(0x94)](this['x'],this['y'],_0x94bc66)){if(_0x521a7a)$gameTemp[_0x3e2ae6(0x2ec)]=![];this[_0x3e2ae6(0x1f2)](_0x94bc66),this[_0x3e2ae6(0x182)]-=0x1;}if(_0x521a7a)$gameTemp['_moveAllowPlayerCollision']=![];},Game_Character['prototype'][_0x2db143(0x123)]=function(_0x16a962,_0x5a52f7,_0x564e5b){const _0x607a3e=_0x2db143;this[_0x607a3e(0x50a)](_0x16a962,_0x5a52f7,_0x564e5b);if(this['x']!==_0x16a962||this['y']!==_0x5a52f7)this[_0x607a3e(0x182)]--;},Game_Character[_0x2db143(0x287)][_0x2db143(0x21f)]=function(_0x2fb90e,_0x5b15bb){const _0x29ac6c=_0x2db143;if(_0x2fb90e)this[_0x29ac6c(0x123)](_0x2fb90e['x'],_0x2fb90e['y'],_0x5b15bb);},Game_Character['prototype']['processMoveRouteMoveRepeat']=function(_0x3aabfb,_0x2f4e8c){const _0x58633d=_0x2db143;_0x2f4e8c=_0x2f4e8c||0x0;const _0x42927e={'code':0x1,'indent':null,'parameters':[]};_0x42927e[_0x58633d(0x2c5)]=[0x0,0x5,0x1,0x6,0x2,0x0,0x3,0x7,0x4,0x8][_0x3aabfb],this['_moveRoute']['list'][this[_0x58633d(0x182)]][_0x58633d(0xe2)][0x0]='';while(_0x2f4e8c--){this[_0x58633d(0x2c0)][_0x58633d(0x388)]['splice'](this[_0x58633d(0x182)]+0x1,0x0,_0x42927e);}},Game_Character['prototype'][_0x2db143(0x507)]=function(_0x491688){const _0x41727b=_0x2db143;this[_0x41727b(0x1f6)]=!![],this[_0x41727b(0x367)](_0x491688);},Game_Character['prototype'][_0x2db143(0xcf)]=function(_0x1f25e5,_0x17c75){const _0x16b302=_0x2db143;if(this===$gamePlayer)return;const _0x30e97f=[this[_0x16b302(0x9d)],this[_0x16b302(0x50b)],'A'];if(_0x1f25e5[_0x16b302(0x474)](/\b[ABCD]\b/i))_0x16b302(0x215)!==_0x16b302(0x215)?(this[_0x16b302(0x2a7)](_0x38dcec>0x0?0x8:0x2),!this[_0x16b302(0x445)]()&&_0x21a182!==0x0&&this[_0x16b302(0x2a7)](_0x57973b>0x0?0x4:0x6)):_0x30e97f[0x2]=String(_0x1f25e5)['charAt'](0x0)[_0x16b302(0x2e8)]()['trim']();else{if(_0x16b302(0x41e)==='ZKJUH')_0x30e97f[0x2]=_0x16b302(0xae)[_0x16b302(0x183)](_0x1f25e5);else return(this[_0x16b302(0x126)]||'')[_0x16b302(0x2e8)]()[_0x16b302(0x28d)]();}switch(_0x17c75[_0x16b302(0x2e8)]()['trim']()){case'ON':case'TRUE':$gameSelfSwitches[_0x16b302(0x172)](_0x30e97f,!![]);break;case'OFF':case'FALSE':$gameSelfSwitches[_0x16b302(0x172)](_0x30e97f,![]);break;case _0x16b302(0x164):$gameSelfSwitches[_0x16b302(0x172)](_0x30e97f,!$gameSelfSwitches['value'](_0x30e97f));break;}},Game_Character[_0x2db143(0x287)][_0x2db143(0x1b9)]=function(_0x3144be,_0x1c2757){const _0x3dffe=_0x2db143;if(this===$gamePlayer)return;const _0x1e5ff8=[this[_0x3dffe(0x9d)],this[_0x3dffe(0x50b)],_0x3dffe(0x3c3)[_0x3dffe(0x183)](switchId)];$gameSelfSwitches[_0x3dffe(0x172)](_0x1e5ff8,Number(_0x1c2757));},Game_Character[_0x2db143(0x287)]['processMoveRouteTeleportTo']=function(_0x810ae3,_0x2b43af){const _0x823dff=_0x2db143;this[_0x823dff(0x491)](_0x810ae3,_0x2b43af);},Game_Character['prototype']['processMoveRouteTeleportToCharacter']=function(_0x1d7eb4){const _0x2fbbc0=_0x2db143;if(_0x1d7eb4)this[_0x2fbbc0(0x493)](_0x1d7eb4['x'],_0x1d7eb4['y']);},Game_Character[_0x2db143(0x287)][_0x2db143(0x161)]=function(){const _0x1ec938=_0x2db143;switch(this[_0x1ec938(0x453)]()){case 0x1:this[_0x1ec938(0x10e)](0x7);break;case 0x2:this[_0x1ec938(0x10e)](0x4);break;case 0x3:this['setDirection'](0x1);break;case 0x4:this[_0x1ec938(0x10e)](0x8);break;case 0x6:this['setDirection'](0x2);break;case 0x7:this[_0x1ec938(0x10e)](0x9);break;case 0x8:this[_0x1ec938(0x10e)](0x6);break;case 0x9:this['setDirection'](0x3);break;}},Game_Character[_0x2db143(0x287)][_0x2db143(0x189)]=function(){const _0x1a2f82=_0x2db143;switch(this[_0x1a2f82(0x453)]()){case 0x1:this[_0x1a2f82(0x10e)](0x3);break;case 0x2:this[_0x1a2f82(0x10e)](0x6);break;case 0x3:this[_0x1a2f82(0x10e)](0x9);break;case 0x4:this['setDirection'](0x2);break;case 0x6:this[_0x1a2f82(0x10e)](0x8);break;case 0x7:this['setDirection'](0x1);break;case 0x8:this[_0x1a2f82(0x10e)](0x4);break;case 0x9:this[_0x1a2f82(0x10e)](0x7);break;}},Game_Character[_0x2db143(0x287)][_0x2db143(0x1be)]=function(_0x5d9922,_0x5e3142,_0xbf0b3b){const _0x5c36cf=_0x2db143,_0x15ec42=this[_0x5c36cf(0x4a1)](_0x5d9922),_0x3708d5=this['deltaYFrom'](_0x5e3142);if($gameMap[_0x5c36cf(0x3d6)]()){if(_0xbf0b3b||this[_0x5c36cf(0x44d)]()){if(_0x15ec42>0x0&&_0x3708d5<0x0)return 0x1;if(_0x15ec42<0x0&&_0x3708d5<0x0)return 0x3;if(_0x15ec42>0x0&&_0x3708d5>0x0)return 0x7;if(_0x15ec42<0x0&&_0x3708d5>0x0)return 0x9;}}if(Math[_0x5c36cf(0x187)](_0x15ec42)>Math[_0x5c36cf(0x187)](_0x3708d5))return _0x15ec42>0x0?0x4:0x6;else{if(_0x3708d5!==0x0)return _0x3708d5>0x0?0x8:0x2;}return 0x0;},Game_Character['prototype'][_0x2db143(0x345)]=function(_0x225341,_0x3dfc6b,_0x1b622b){const _0x186a91=_0x2db143,_0x2e2f18=this['deltaXFrom'](_0x225341),_0x2f5e71=this[_0x186a91(0x356)](_0x3dfc6b);if($gameMap[_0x186a91(0x3d6)]()){if(_0x1b622b||this[_0x186a91(0x44d)]()){if(_0x186a91(0x415)===_0x186a91(0x415)){if(_0x2e2f18>0x0&&_0x2f5e71<0x0)return 0x9;if(_0x2e2f18<0x0&&_0x2f5e71<0x0)return 0x7;if(_0x2e2f18>0x0&&_0x2f5e71>0x0)return 0x3;if(_0x2e2f18<0x0&&_0x2f5e71>0x0)return 0x1;}else{if(_0x28bf0b)return _0x15e9b2;}}}if(Math['abs'](_0x2e2f18)>Math['abs'](_0x2f5e71))return _0x2e2f18>0x0?0x6:0x4;else{if(_0x2f5e71!==0x0){if(_0x186a91(0x29e)!=='Hjvil')return _0x2f5e71>0x0?0x2:0x8;else{const _0x4f6515=this[_0x186a91(0x144)]();return _0x4f6515?_0x4f6515[_0x186a91(0x50b)]:0x0;}}}return 0x0;},Game_Character[_0x2db143(0x287)][_0x2db143(0x4e9)]=function(_0x595989,_0x2519e0){const _0x59888a=_0x2db143,_0x16fdf4=this[_0x59888a(0x1be)](_0x595989,_0x2519e0,!![]);if(_0x16fdf4)this['executeMoveDir8'](_0x16fdf4);},Game_Character['prototype'][_0x2db143(0x8a)]=function(_0x3fdc75,_0x164c7c){const _0x18246b=_0x2db143,_0x554bbc=this[_0x18246b(0x345)](_0x3fdc75,_0x164c7c,!![]);if(_0x554bbc)this[_0x18246b(0x1f2)](_0x554bbc);},Game_Character['prototype'][_0x2db143(0xb1)]=function(_0x2e9837,_0x4cc120){const _0x1dbcf8=_0x2db143,_0x5788ad=this['getDirectionToPoint'](_0x2e9837,_0x4cc120,![]);if(_0x5788ad)this[_0x1dbcf8(0x10e)](_0x5788ad);},Game_Character['prototype'][_0x2db143(0x4cf)]=function(_0x297752,_0x1abadb){const _0x1b28c8=_0x2db143,_0x26db47=this['getDirectionFromPoint'](_0x297752,_0x1abadb,![]);if(_0x26db47)this[_0x1b28c8(0x10e)](_0x26db47);},Game_Character['prototype'][_0x2db143(0x291)]=function(_0x3bc256){const _0x2e8cc8=_0x2db143;if(_0x3bc256)this[_0x2e8cc8(0x4e9)](_0x3bc256['x'],_0x3bc256['y']);},Game_Character[_0x2db143(0x287)][_0x2db143(0x1da)]=function(_0x5b3bcd){const _0x332281=_0x2db143;if(_0x5b3bcd)this[_0x332281(0x8a)](_0x5b3bcd['x'],_0x5b3bcd['y']);},Game_Character['prototype'][_0x2db143(0x1cd)]=function(_0x14b852){const _0x57d97c=_0x2db143;if(_0x14b852)this[_0x57d97c(0xb1)](_0x14b852['x'],_0x14b852['y']);},Game_Character[_0x2db143(0x287)][_0x2db143(0x458)]=function(_0x3408ea){if(_0x3408ea)this['turnAwayFromPoint'](_0x3408ea['x'],_0x3408ea['y']);},VisuMZ[_0x2db143(0x483)][_0x2db143(0x44a)]=Game_Player[_0x2db143(0x287)][_0x2db143(0xac)],Game_Player[_0x2db143(0x287)][_0x2db143(0xac)]=function(){const _0x2c46a0=_0x2db143;if(this[_0x2c46a0(0x4f9)])return!![];return VisuMZ[_0x2c46a0(0x483)][_0x2c46a0(0x44a)]['call'](this);},Game_Player[_0x2db143(0x287)]['isDashingAndMoving']=function(){const _0x42723d=_0x2db143;return this['isDashing']()&&(this[_0x42723d(0x1d1)]()||this[_0x42723d(0x1c7)]()!==0x0&&this['canPass'](this['_x'],this['_y'],this['getInputDirection']())||$gameTemp[_0x42723d(0x426)]());},VisuMZ[_0x2db143(0x483)]['Game_Player_getInputDirection']=Game_Player[_0x2db143(0x287)][_0x2db143(0x1c7)],Game_Player[_0x2db143(0x287)][_0x2db143(0x1c7)]=function(){const _0x2d6da2=_0x2db143;return $gameMap[_0x2d6da2(0x3d6)]()?this[_0x2d6da2(0xca)]():VisuMZ[_0x2d6da2(0x483)]['Game_Player_getInputDirection'][_0x2d6da2(0x3f0)](this);},Game_Player[_0x2db143(0x287)][_0x2db143(0xca)]=function(){return Input['dir8'];},Game_Player[_0x2db143(0x287)][_0x2db143(0x50e)]=function(){const _0x2db008=_0x2db143;if($gameSystem[_0x2db008(0x49d)]())return 0x0;if(!this[_0x2db008(0x1d1)]()&&this[_0x2db008(0x313)]()){let _0xacffdd=this[_0x2db008(0x1c7)]();if(_0xacffdd>0x0)$gameTemp[_0x2db008(0x2a5)]();else{if($gameTemp[_0x2db008(0x426)]()){const _0x5dcdb0=$gameTemp[_0x2db008(0x46a)](),_0x38c41f=$gameTemp[_0x2db008(0x9e)](),_0x5d0b69=$gameMap['isSupportDiagonalMovement'](),_0x13a1b9=$gameMap[_0x2db008(0x7f)](_0x5dcdb0,_0x38c41f),_0x18c0a6=$gameMap['eventsXyNt'](_0x5dcdb0,_0x38c41f)[_0x2db008(0x141)]<=0x0;if(_0x5d0b69&&_0x13a1b9&&_0x18c0a6){if(_0x2db008(0x505)===_0x2db008(0x505))_0xacffdd=this[_0x2db008(0x368)](_0x5dcdb0,_0x38c41f);else{_0x16d19b[_0x2db008(0x20a)](_0x4ad0c9,_0x32c9ee);const _0x3634f0=_0x386049[_0x2db008(0x13f)]||0x0;_0x24807e[_0x2db008(0x2ea)](_0x3634f0);}}else _0xacffdd=this[_0x2db008(0x4b4)](_0x5dcdb0,_0x38c41f);}}_0xacffdd>0x0?(this[_0x2db008(0x405)]=this['_inputTime']||0x0,this[_0x2db008(0x1c3)]()?this[_0x2db008(0x10e)](_0xacffdd):_0x2db008(0x7b)!==_0x2db008(0x40a)?this[_0x2db008(0x150)](_0xacffdd):_0x28372c=_0xfe58b1[_0x2b67c9],this[_0x2db008(0x405)]++):_0x2db008(0x2dc)!==_0x2db008(0x2dc)?(_0x52d395['_shadowSprite']=new _0x4eb7b5(),_0x531656[_0x2db008(0x380)]['_filename']=_0x585f31['_character'][_0x2db008(0x3f4)](),_0xb946c[_0x2db008(0x380)][_0x2db008(0x227)]=_0x577379[_0x2db008(0x4bb)](_0x6b7577[_0x2db008(0x380)][_0x2db008(0x9a)]),_0x16ac14['_shadowSprite']['anchor']['x']=0.5,_0xcbe583[_0x2db008(0x380)][_0x2db008(0x371)]['y']=0x1,_0x141069[_0x2db008(0x380)]['z']=0x0,this[_0x2db008(0x4a7)][_0x2db008(0xc2)](_0xf658df[_0x2db008(0x380)])):this[_0x2db008(0x405)]=0x0;}},Game_Player[_0x2db143(0x287)][_0x2db143(0x1c3)]=function(){const _0x3d5d23=_0x2db143,_0x5f1870=VisuMZ['EventsMoveCore'][_0x3d5d23(0x516)]['Movement'];if(!_0x5f1870[_0x3d5d23(0xf7)])return![];if($gameTemp['isDestinationValid']())return![];if(this['isDashing']()||this[_0x3d5d23(0x1d1)]()||this[_0x3d5d23(0x31a)]())return![];return this[_0x3d5d23(0x405)]<_0x5f1870[_0x3d5d23(0xe9)];},VisuMZ[_0x2db143(0x483)]['Game_Player_executeMove']=Game_Player[_0x2db143(0x287)][_0x2db143(0x150)],Game_Player[_0x2db143(0x287)][_0x2db143(0x150)]=function(_0x2e161f){const _0x1c4e29=_0x2db143;if($gameMap[_0x1c4e29(0x3d6)]()){if(_0x1c4e29(0x304)===_0x1c4e29(0x402)){_0x1801fc[_0x1c4e29(0x20a)](_0x16e3c2,_0x192dfc);const _0x4eb6d5=_0x36aaf2[_0x1c4e29(0x179)](),_0x3e8956={'template':_0x3c0f31[_0x1c4e29(0x22d)],'mapId':_0x29fc3a[_0x1c4e29(0x3f6)]||_0xb874a8[_0x1c4e29(0x346)](),'eventId':_0x3aa2f5[_0x1c4e29(0x180)]||_0x4eb6d5[_0x1c4e29(0x2b5)](),'x':-0x1,'y':-0x1,'spawnPreserved':_0x298786[_0x1c4e29(0x18f)],'spawnEventId':_0x1fc7a6[_0x1c4e29(0x435)][_0x1c4e29(0x141)]+0x3e8},_0x20d68b=_0x3efb21[_0x1c4e29(0x37f)]||0x0,_0x2a6522=_0x351beb[_0x1c4e29(0x3d1)](_0x3e8956,_0x39c2a5[_0x1c4e29(0x88)],_0x562891[_0x1c4e29(0x4b2)],_0x31c3cf[_0x1c4e29(0x501)]);_0x20d68b&&_0x390ccc['setValue'](_0x20d68b,!!_0x2a6522);}else this[_0x1c4e29(0x1f2)](_0x2e161f);}else VisuMZ['EventsMoveCore'][_0x1c4e29(0x1bb)]['call'](this,_0x2e161f);},VisuMZ['EventsMoveCore'][_0x2db143(0x303)]=Game_Player[_0x2db143(0x287)]['isMapPassable'],Game_Player[_0x2db143(0x287)][_0x2db143(0x4f0)]=function(_0x128174,_0x59fc30,_0x4f3400){const _0x352b45=_0x2db143;if($gameMap['isRegionAllowPass'](_0x128174,_0x59fc30,_0x4f3400,_0x352b45(0x1ec))){if(_0x352b45(0x383)!=='SuDan')return this[_0x352b45(0x446)]()&&this['vehicle']()?_0x352b45(0x2d2)!=='CpWzB'?this[_0x352b45(0x1f1)]()[_0x352b45(0x4f0)](_0x128174,_0x59fc30,_0x4f3400):this['getPosingCharacterIndex']():!![];else{_0x37d774[_0x352b45(0x20a)](_0x515a7a,_0x1bd940);const _0x29dd45=_0x3c96bc[_0x352b45(0x179)]();_0x4a8c3d['MapId']=_0x2f8776[_0x352b45(0x3f6)]||_0x3d5ce2['mapId']();const _0x3e8d41=[_0xeda9cf[_0x352b45(0x3f6)],_0x5d688f['EventId']||_0x29dd45['eventId'](),_0x2bd5c5['Letter']],_0x2a2caa=_0xe0d7cc[_0x352b45(0x277)],_0xab264=_0x1bdd5f[_0x352b45(0x3a6)](_0x3e8d41)||![];_0x58a171['setValue'](_0x2a2caa,_0xab264);}}if($gameMap[_0x352b45(0x2d0)](_0x128174,_0x59fc30,_0x4f3400,_0x352b45(0x1ec)))return![];return VisuMZ[_0x352b45(0x483)]['Game_Player_isMapPassable'][_0x352b45(0x3f0)](this,_0x128174,_0x59fc30,_0x4f3400);},VisuMZ['EventsMoveCore'][_0x2db143(0x1aa)]=Game_Player[_0x2db143(0x287)][_0x2db143(0x407)],Game_Player[_0x2db143(0x287)][_0x2db143(0x407)]=function(_0x3d527d){const _0xecfb23=_0x2db143;VisuMZ[_0xecfb23(0x483)][_0xecfb23(0x1aa)][_0xecfb23(0x3f0)](this,_0x3d527d);if(this[_0xecfb23(0x413)]()){this[_0xecfb23(0x118)](_0x3d527d);if(_0x3d527d['includes'](0x0)&&this[_0xecfb23(0x288)]()===_0xecfb23(0x354))'qefoz'===_0xecfb23(0x3f7)?(this[_0xecfb23(0x31e)](),_0x2e2b17[_0xecfb23(0x483)][_0xecfb23(0x4c8)]['call'](this,_0x2e640f)):this[_0xecfb23(0xfe)](this['x'],this['y']);else(_0x3d527d['includes'](0x1)||_0x3d527d[_0xecfb23(0x2c8)](0x2))&&this[_0xecfb23(0x102)]();}},VisuMZ[_0x2db143(0x483)][_0x2db143(0x337)]=Game_Player[_0x2db143(0x287)][_0x2db143(0x272)],Game_Player[_0x2db143(0x287)][_0x2db143(0x272)]=function(_0x41f29d){const _0x42ee21=_0x2db143;VisuMZ[_0x42ee21(0x483)][_0x42ee21(0x337)]['call'](this,_0x41f29d);if(this[_0x42ee21(0x413)]()&&_0x41f29d[_0x42ee21(0x2c8)](0x0)&&this[_0x42ee21(0x288)]()==='front'){const _0x293140=this[_0x42ee21(0x453)](),_0x5e3178=$gameMap[_0x42ee21(0x19d)](this['x'],_0x293140),_0x542b53=$gameMap[_0x42ee21(0x4fe)](this['y'],_0x293140);this[_0x42ee21(0xfe)](_0x5e3178,_0x542b53);}},Game_Player[_0x2db143(0x287)][_0x2db143(0x118)]=function(_0x29ca0f){const _0x5cc1a9=_0x2db143;if($gameMap[_0x5cc1a9(0x2f8)]())return;if($gameMap[_0x5cc1a9(0x2fb)]())return;const _0x97818f=$gameMap[_0x5cc1a9(0x4e5)]();for(const _0x4e28b5 of _0x97818f){if(!_0x4e28b5)continue;if(!_0x4e28b5[_0x5cc1a9(0x241)](_0x29ca0f))continue;if(this[_0x5cc1a9(0x28f)](_0x4e28b5))return _0x4e28b5[_0x5cc1a9(0x114)]();if(this[_0x5cc1a9(0x50d)](_0x4e28b5))return _0x4e28b5[_0x5cc1a9(0x114)]();}},Game_Player['prototype'][_0x2db143(0x28f)]=function(_0x17ade4){const _0x49a67c=_0x2db143;if($gameMap[_0x49a67c(0x2f8)]())return![];if($gameMap[_0x49a67c(0x2fb)]())return![];return _0x17ade4['activationRegionList']()['includes'](this[_0x49a67c(0x2b4)]());},Game_Player[_0x2db143(0x287)]['meetActivationProximityConditions']=function(_0x55bf96){const _0x4c5e12=_0x2db143;if($gameMap['isEventRunning']())return![];if($gameMap[_0x4c5e12(0x2fb)]())return![];if(['none',_0x4c5e12(0x133)][_0x4c5e12(0x2c8)](_0x55bf96[_0x4c5e12(0x29b)]()))return![];const _0x265c73=_0x55bf96[_0x4c5e12(0x29b)](),_0x587c83=_0x55bf96[_0x4c5e12(0x2f7)]();switch(_0x265c73){case _0x4c5e12(0x18c):const _0x1edd8e=$gameMap[_0x4c5e12(0x48d)](this['x'],this['y'],_0x55bf96['x'],_0x55bf96['y']);return _0x55bf96[_0x4c5e12(0x2f7)]()>=_0x1edd8e;break;case _0x4c5e12(0x2a2):return _0x587c83>=Math['abs'](_0x55bf96['deltaXFrom'](this['x']))&&_0x587c83>=Math[_0x4c5e12(0x187)](_0x55bf96[_0x4c5e12(0x356)](this['y']));break;case'row':return _0x587c83>=Math[_0x4c5e12(0x187)](_0x55bf96[_0x4c5e12(0x356)](this['y']));break;case _0x4c5e12(0x10a):return _0x587c83>=Math[_0x4c5e12(0x187)](_0x55bf96[_0x4c5e12(0x4a1)](this['x']));break;case'default':return![];break;}},Game_Player[_0x2db143(0x287)][_0x2db143(0xfe)]=function(_0x2f1261,_0x1ae227){const _0x33d352=_0x2db143;if($gameMap['isEventRunning']())return;if($gameMap['isAnyEventStarting']())return;let _0x5a1beb=VisuMZ[_0x33d352(0x483)]['Settings'][_0x33d352(0x152)],_0x160774=$gameMap[_0x33d352(0x2b4)](_0x2f1261,_0x1ae227);const _0x428800=_0x33d352(0x512)[_0x33d352(0x183)](_0x160774);_0x5a1beb[_0x428800]&&$gameTemp['reserveCommonEvent'](_0x5a1beb[_0x428800]);},Game_Player['prototype'][_0x2db143(0x288)]=function(){const _0x2789b7=_0x2db143;return VisuMZ['EventsMoveCore'][_0x2789b7(0x516)][_0x2789b7(0x4e6)];},Game_Player[_0x2db143(0x287)][_0x2db143(0x102)]=function(){const _0x263c7d=_0x2db143;if($gameMap['isEventRunning']())return;if($gameMap[_0x263c7d(0x2fb)]())return;let _0x4510e1=VisuMZ[_0x263c7d(0x483)][_0x263c7d(0x516)][_0x263c7d(0x423)];const _0x8610ac=_0x263c7d(0x512)[_0x263c7d(0x183)](this[_0x263c7d(0x2b4)]());_0x4510e1[_0x8610ac]&&$gameTemp[_0x263c7d(0xa9)](_0x4510e1[_0x8610ac]);},VisuMZ[_0x2db143(0x483)]['Game_Player_increaseSteps']=Game_Player[_0x2db143(0x287)][_0x2db143(0x15d)],Game_Player[_0x2db143(0x287)][_0x2db143(0x15d)]=function(){const _0x3088e7=_0x2db143;VisuMZ['EventsMoveCore'][_0x3088e7(0x1fc)][_0x3088e7(0x3f0)](this),VisuMZ['MoveAllSynchTargets'](0x0);},VisuMZ[_0x2db143(0x483)][_0x2db143(0xaa)]=Game_Follower[_0x2db143(0x287)]['initialize'],Game_Follower['prototype']['initialize']=function(_0x53a32b){const _0x44a69d=_0x2db143;VisuMZ['EventsMoveCore']['Game_Follower_initialize'][_0x44a69d(0x3f0)](this,_0x53a32b),this[_0x44a69d(0x322)]=![];},Game_Follower[_0x2db143(0x287)][_0x2db143(0xac)]=function(){const _0x29c438=_0x2db143;return $gamePlayer[_0x29c438(0xac)]();},Game_Follower[_0x2db143(0x287)]['isDashingAndMoving']=function(){const _0x575369=_0x2db143;return $gamePlayer[_0x575369(0x4b0)]();},Game_Follower[_0x2db143(0x287)][_0x2db143(0xa6)]=function(){return $gamePlayer['realMoveSpeed']();},Game_Follower[_0x2db143(0x287)][_0x2db143(0x260)]=function(_0x21d120){this['_chaseOff']=_0x21d120;},VisuMZ['EventsMoveCore']['Game_Follower_chaseCharacter']=Game_Follower[_0x2db143(0x287)][_0x2db143(0xf2)],Game_Follower[_0x2db143(0x287)][_0x2db143(0xf2)]=function(_0xac97e){const _0x1f85de=_0x2db143;if(this[_0x1f85de(0x322)])return;if($gameSystem[_0x1f85de(0x281)]())return;VisuMZ['EventsMoveCore']['Game_Follower_chaseCharacter']['call'](this,_0xac97e);},VisuMZ['EventsMoveCore'][_0x2db143(0x2fa)]=Game_Vehicle[_0x2db143(0x287)][_0x2db143(0x4f0)],Game_Vehicle[_0x2db143(0x287)][_0x2db143(0x4f0)]=function(_0x209f47,_0x436972,_0x41e8e4){const _0x1b7137=_0x2db143;if($gameMap['isRegionAllowPass'](_0x209f47,_0x436972,_0x41e8e4,this[_0x1b7137(0x1b8)]))return!![];if($gameMap[_0x1b7137(0x2d0)](_0x209f47,_0x436972,_0x41e8e4,this[_0x1b7137(0x1b8)]))return![];return VisuMZ[_0x1b7137(0x483)][_0x1b7137(0x2fa)][_0x1b7137(0x3f0)](this,_0x209f47,_0x436972,_0x41e8e4);},Game_Vehicle[_0x2db143(0x287)][_0x2db143(0x3ea)]=function(_0x52e550,_0x555128,_0x46e8c7){const _0x4836a3=_0x2db143;if($gameMap[_0x4836a3(0x15f)](_0x52e550,_0x555128,_0x46e8c7,this[_0x4836a3(0x1b8)]))return!![];if($gameMap[_0x4836a3(0x2d0)](_0x52e550,_0x555128,_0x46e8c7,this[_0x4836a3(0x1b8)]))return![];return VisuMZ['EventsMoveCore']['Game_CharacterBase_canPass'][_0x4836a3(0x3f0)]($gamePlayer,_0x52e550,_0x555128,_0x46e8c7);},VisuMZ[_0x2db143(0x483)][_0x2db143(0xe0)]=Game_Vehicle[_0x2db143(0x287)][_0x2db143(0x275)],Game_Vehicle[_0x2db143(0x287)][_0x2db143(0x275)]=function(_0x19af29,_0x45fc16,_0x524f77){const _0x381cb3=_0x2db143;if($gameMap['isRegionDockable'](_0x19af29,_0x45fc16,_0x524f77,this[_0x381cb3(0x1b8)]))return!![];const _0x49e7ff=this['_type'][_0x381cb3(0x319)](0x0)[_0x381cb3(0x2e8)]()+this['_type'][_0x381cb3(0x49b)](0x1),_0x275e49=_0x381cb3(0x29f)[_0x381cb3(0x183)](_0x49e7ff);return VisuMZ[_0x381cb3(0x483)][_0x381cb3(0x516)][_0x381cb3(0x48c)][_0x275e49]?![]:VisuMZ['EventsMoveCore'][_0x381cb3(0xe0)]['call'](this,_0x19af29,_0x45fc16,_0x524f77);},VisuMZ['EventsMoveCore'][_0x2db143(0x2da)]=Game_Vehicle[_0x2db143(0x287)][_0x2db143(0x410)],Game_Vehicle[_0x2db143(0x287)]['initMoveSpeed']=function(){const _0x26bfaa=_0x2db143;VisuMZ[_0x26bfaa(0x483)][_0x26bfaa(0x2da)][_0x26bfaa(0x3f0)](this);const _0x2763db=VisuMZ[_0x26bfaa(0x483)][_0x26bfaa(0x516)]['Movement'];if(this[_0x26bfaa(0x1bf)]()){if('frNjC'===_0x26bfaa(0x4d2)){_0x40840e[_0x26bfaa(0x20a)](_0x483484,_0x1ae4b8);const _0x19fcae=_0x48f522[_0x26bfaa(0x179)]();_0x52ea2a[_0x26bfaa(0x3f6)]=_0x3e3fae[_0x26bfaa(0x3f6)]||_0x430dc2[_0x26bfaa(0x346)]();const _0x3facd7=[_0x2f3310[_0x26bfaa(0x3f6)],_0x2e14a6[_0x26bfaa(0x180)]||_0x19fcae[_0x26bfaa(0x2b5)](),_0x26bfaa(0x3c3)[_0x26bfaa(0x183)](_0x410922[_0x26bfaa(0x4f1)])],_0x468fe3=_0x1d8f60['TargetVariableId'],_0x57f93b=_0x4fd3bb[_0x26bfaa(0x3a6)](_0x3facd7)||![];_0x3d8b10[_0x26bfaa(0x172)](_0x468fe3,_0x57f93b);}else{if(_0x2763db[_0x26bfaa(0x459)])this['setMoveSpeed'](_0x2763db['BoatSpeed']);}}else{if(this[_0x26bfaa(0x1d4)]()){if(_0x2763db[_0x26bfaa(0x14f)])this[_0x26bfaa(0xdc)](_0x2763db[_0x26bfaa(0x14f)]);}else{if(this['isAirship']()){if(_0x26bfaa(0x363)!=='QhBoO')_0x14bc5e[_0x26bfaa(0x222)](this['_selfEvent']);else{if(_0x2763db[_0x26bfaa(0x2fc)])this[_0x26bfaa(0xdc)](_0x2763db[_0x26bfaa(0x2fc)]);}}}}},VisuMZ[_0x2db143(0x483)][_0x2db143(0x4de)]=Game_Event['prototype'][_0x2db143(0xbf)],Game_Event[_0x2db143(0x287)]['initialize']=function(_0x420849,_0x477271){const _0x14e846=_0x2db143;VisuMZ[_0x14e846(0x483)][_0x14e846(0x4de)][_0x14e846(0x3f0)](this,_0x420849,_0x477271),this[_0x14e846(0x509)](),this[_0x14e846(0x3ba)](),this[_0x14e846(0x431)]();},VisuMZ[_0x2db143(0x483)][_0x2db143(0x1fa)]=Game_Event[_0x2db143(0x287)][_0x2db143(0x124)],Game_Event[_0x2db143(0x287)][_0x2db143(0x124)]=function(){const _0x87ad27=_0x2db143;if(this[_0x87ad27(0x46b)]!==undefined){const _0x128e13=this['_eventMorphData'][_0x87ad27(0x346)],_0x4f83bb=this[_0x87ad27(0x46b)][_0x87ad27(0x2b5)];return VisuMZ[_0x87ad27(0x395)][_0x128e13][_0x87ad27(0x4e5)][_0x4f83bb];}if(this[_0x87ad27(0x4ab)]!==undefined){const _0x4e6d8c=this[_0x87ad27(0x4ab)][_0x87ad27(0x346)],_0x21910d=this['_eventCopyData']['eventId'];return VisuMZ['PreloadedMaps'][_0x4e6d8c][_0x87ad27(0x4e5)][_0x21910d];}if(this['_eventSpawnData']!==undefined){const _0x26b9cb=this[_0x87ad27(0x2b3)][_0x87ad27(0x346)],_0x7672e=this[_0x87ad27(0x2b3)][_0x87ad27(0x2b5)];return VisuMZ[_0x87ad27(0x395)][_0x26b9cb][_0x87ad27(0x4e5)][_0x7672e];}if($gameTemp['_spawnData']!==undefined){const _0xd54fc1=$gameTemp[_0x87ad27(0x139)][_0x87ad27(0x346)],_0x13144f=$gameTemp[_0x87ad27(0x139)]['eventId'];return VisuMZ[_0x87ad27(0x395)][_0xd54fc1][_0x87ad27(0x4e5)][_0x13144f];}return VisuMZ['EventsMoveCore'][_0x87ad27(0x1fa)][_0x87ad27(0x3f0)](this);},Game_Event[_0x2db143(0x287)]['checkValidEventerMap']=function(_0x1d8a0c,_0x325855){const _0x58eac6=_0x2db143;if(_0x1d8a0c===0x0||_0x325855===0x0)return![];if(!VisuMZ[_0x58eac6(0x395)][_0x1d8a0c]){if(_0x58eac6(0x71)!==_0x58eac6(0x71))_0x519fbf['ConvertParams'](_0x5e7a0e,_0x297bcf),_0xc1bf29[_0x58eac6(0x331)]();else return $gameTemp['isPlaytest']()&&console[_0x58eac6(0x108)](_0x58eac6(0x1b5)[_0x58eac6(0x183)](_0x1d8a0c)),![];}return!![];},VisuMZ[_0x2db143(0x483)][_0x2db143(0x39f)]=Game_Event[_0x2db143(0x287)][_0x2db143(0x114)],Game_Event[_0x2db143(0x287)][_0x2db143(0x114)]=function(){const _0x4d581d=_0x2db143;VisuMZ[_0x4d581d(0x483)][_0x4d581d(0x39f)]['call'](this),Imported['VisuMZ_1_MessageCore']&&Input[_0x4d581d(0x184)](VisuMZ[_0x4d581d(0x495)][_0x4d581d(0x516)][_0x4d581d(0x20c)][_0x4d581d(0x47e)])&&Input['clear']();},Game_Event[_0x2db143(0x287)][_0x2db143(0x509)]=function(){const _0x3479e2=_0x2db143,_0x5d6739=this['event']()['note'];if(_0x5d6739==='')return;if(DataManager[_0x3479e2(0x3a3)]()||DataManager['isEventTest']())return;const _0x594135=VisuMZ['EventsMoveCore']['Settings'][_0x3479e2(0x217)];let _0x48f190=null,_0x8d3f86=0x0,_0x4855ae=0x0;if(_0x5d6739[_0x3479e2(0x474)](/<COPY EVENT:[ ]MAP[ ](\d+),[ ]EVENT[ ](\d+)>/i))_0x8d3f86=Number(RegExp['$1']),_0x4855ae=Number(RegExp['$2']);else{if(_0x5d6739[_0x3479e2(0x474)](/<COPY EVENT:[ ](\d+),[ ](\d+)>/i))_0x8d3f86=Number(RegExp['$1']),_0x4855ae=Number(RegExp['$2']);else{if(_0x5d6739[_0x3479e2(0x474)](/<COPY EVENT:[ ](.*?)>/i)){const _0x1ba394=String(RegExp['$1'])['toUpperCase']()[_0x3479e2(0x28d)]();_0x48f190=VisuMZ[_0x3479e2(0x500)][_0x1ba394];if(!_0x48f190)return;_0x8d3f86=_0x48f190[_0x3479e2(0x3d8)],_0x4855ae=_0x48f190[_0x3479e2(0x4ee)];}}}if(!this[_0x3479e2(0x1a6)](_0x8d3f86,_0x4855ae))return;_0x594135['PreCopyJS'][_0x3479e2(0x3f0)](this,_0x8d3f86,_0x4855ae,this);if(_0x48f190)_0x48f190[_0x3479e2(0x1fb)][_0x3479e2(0x3f0)](this,_0x8d3f86,_0x4855ae,this);this[_0x3479e2(0x4ab)]={'mapId':_0x8d3f86,'eventId':_0x4855ae},this[_0x3479e2(0x245)]=-0x2,this['refresh'](),_0x594135[_0x3479e2(0x46c)][_0x3479e2(0x3f0)](this,_0x8d3f86,_0x4855ae,this);if(_0x48f190)_0x48f190[_0x3479e2(0x46c)][_0x3479e2(0x3f0)](this,_0x8d3f86,_0x4855ae,this);$gameMap[_0x3479e2(0x43d)]();},Game_Event[_0x2db143(0x287)][_0x2db143(0x3ba)]=function(){const _0x4401a4=_0x2db143,_0x251f9d=$gameSystem[_0x4401a4(0x13c)](this);if(!_0x251f9d)return;const _0x47fca0=_0x251f9d[_0x4401a4(0x342)][_0x4401a4(0x2e8)]()[_0x4401a4(0x28d)]();if(_0x47fca0!==_0x4401a4(0x421)){if(_0x4401a4(0x3c7)===_0x4401a4(0x3b5)){_0x1f934b[_0x4401a4(0x287)][_0x4401a4(0x4e4)][_0x4401a4(0x3f0)](this);if(!this[_0x4401a4(0x41b)]())return;this[_0x4401a4(0x498)](),this[_0x4401a4(0x2f6)](),this[_0x4401a4(0x42a)](),this[_0x4401a4(0x4b5)]();}else this[_0x4401a4(0x105)](_0x47fca0,!![]);}else this[_0x4401a4(0x185)](_0x251f9d[_0x4401a4(0x346)],_0x251f9d[_0x4401a4(0x2b5)],!![]);},Game_Event[_0x2db143(0x287)][_0x2db143(0x185)]=function(_0x63636d,_0x52df47,_0x1f39ef){const _0x5f30a0=_0x2db143;if(!this[_0x5f30a0(0x1a6)](_0x63636d,_0x52df47))return;const _0x23a2fa=VisuMZ[_0x5f30a0(0x483)][_0x5f30a0(0x516)][_0x5f30a0(0x217)];if(!_0x1f39ef)_0x23a2fa[_0x5f30a0(0x3d7)][_0x5f30a0(0x3f0)](this,_0x63636d,_0x52df47,this);this[_0x5f30a0(0x46b)]={'mapId':_0x63636d,'eventId':_0x52df47},this['_pageIndex']=-0x2,this[_0x5f30a0(0x1f3)]();if(!_0x1f39ef)_0x23a2fa['PostMorphJS'][_0x5f30a0(0x3f0)](this,_0x63636d,_0x52df47,this);$gameMap[_0x5f30a0(0x43d)]();},Game_Event['prototype'][_0x2db143(0x105)]=function(_0x3594f1,_0x41d310){const _0x3d98ac=_0x2db143;_0x3594f1=_0x3594f1[_0x3d98ac(0x2e8)]()[_0x3d98ac(0x28d)]();const _0x45f141=VisuMZ[_0x3d98ac(0x500)][_0x3594f1];if(!_0x45f141)return;const _0x12c9e4=_0x45f141['MapID'],_0x16106d=_0x45f141[_0x3d98ac(0x4ee)];if(!this[_0x3d98ac(0x1a6)](_0x12c9e4,_0x16106d))return;if(!_0x41d310)_0x45f141[_0x3d98ac(0x3d7)][_0x3d98ac(0x3f0)](this,_0x12c9e4,_0x16106d,this);this['morphInto'](_0x12c9e4,_0x16106d,_0x41d310);if(!_0x41d310)_0x45f141[_0x3d98ac(0x263)][_0x3d98ac(0x3f0)](this,_0x12c9e4,_0x16106d,this);if($gameMap)$gameMap['clearEventCache']();},Game_Event[_0x2db143(0x287)][_0x2db143(0x30d)]=function(){const _0x432ae5=_0x2db143;this[_0x432ae5(0x46b)]=undefined,this[_0x432ae5(0x245)]=-0x2,this[_0x432ae5(0x1f3)]();},Game_Event['prototype'][_0x2db143(0x449)]=function(_0x2e843a){const _0x4049ad=_0x2db143,_0x206991=VisuMZ[_0x4049ad(0x483)][_0x4049ad(0x516)][_0x4049ad(0x217)],_0x1a1e1e=_0x2e843a['template'][_0x4049ad(0x2e8)]()[_0x4049ad(0x28d)](),_0x50abb0=!['',_0x4049ad(0x421)][_0x4049ad(0x2c8)](_0x1a1e1e);let _0x576ff1=0x0,_0x451ae2=0x0;if(_0x50abb0){if(_0x4049ad(0x4a3)!=='IefVr'){const _0x3a7a9b=_0xc5fe6f['event'](_0x4e22c6(_0x205215['$1']));return this['processMoveRouteJumpToCharacter'](_0x3a7a9b);}else{const _0x9679af=VisuMZ[_0x4049ad(0x500)][_0x1a1e1e];if(!_0x9679af)return;_0x576ff1=_0x9679af[_0x4049ad(0x3d8)],_0x451ae2=_0x9679af[_0x4049ad(0x4ee)];}}else _0x576ff1=_0x2e843a[_0x4049ad(0x346)],_0x451ae2=_0x2e843a['eventId'];if(!this['checkValidEventerMap'](_0x576ff1,_0x451ae2))return;if(_0x50abb0){if(_0x4049ad(0x3da)===_0x4049ad(0x14d)){const _0x4abbfb=_0x4c3e51[_0x4049ad(0x483)][_0x4049ad(0x516)],_0x4c02f3='Map%1-Event%2'[_0x4049ad(0x183)](_0x1adb95['_mapId'],_0x10741b['_eventId']);return this[_0x4049ad(0x294)][_0x4c02f3]=this['_EventIcons'][_0x4c02f3]||{'iconIndex':0x0,'bufferX':_0x4abbfb['Icon']['BufferX'],'bufferY':_0x4abbfb[_0x4049ad(0x358)]['BufferY'],'blendMode':_0x4abbfb[_0x4049ad(0x358)][_0x4049ad(0x86)]},this['_EventIcons'][_0x4c02f3];}else{const _0x51af78=VisuMZ[_0x4049ad(0x500)][_0x1a1e1e];_0x51af78[_0x4049ad(0x18e)][_0x4049ad(0x3f0)](this,_0x576ff1,_0x451ae2,this);}}_0x206991['PreSpawnJS']['call'](this,_0x576ff1,_0x451ae2,this),this[_0x4049ad(0x2b3)]=_0x2e843a,this['_pageIndex']=-0x2,this['_mapId']=$gameMap['mapId'](),this[_0x4049ad(0x50b)]=_0x2e843a[_0x4049ad(0x1e6)],this['_spawnPreserved']=_0x2e843a[_0x4049ad(0x4ac)],this['locate'](_0x2e843a['x'],_0x2e843a['y']),this[_0x4049ad(0x10e)](_0x2e843a[_0x4049ad(0x453)]),this[_0x4049ad(0x1f3)]();if(_0x50abb0){const _0x4c093b=VisuMZ[_0x4049ad(0x500)][_0x1a1e1e];if(!_0x4c093b)return;_0x4c093b[_0x4049ad(0x2f0)][_0x4049ad(0x3f0)](this,_0x576ff1,_0x451ae2,this);}_0x206991[_0x4049ad(0x2f0)][_0x4049ad(0x3f0)](this,_0x576ff1,_0x451ae2,this);const _0x5967ab=SceneManager[_0x4049ad(0x122)];if(_0x5967ab&&_0x5967ab[_0x4049ad(0x38c)])_0x5967ab[_0x4049ad(0x38c)][_0x4049ad(0x369)](this);},Game_Event[_0x2db143(0x287)][_0x2db143(0xd7)]=function(){const _0x44d9d9=_0x2db143;return!!this[_0x44d9d9(0x2b3)];},VisuMZ[_0x2db143(0x483)][_0x2db143(0x339)]=Game_Event[_0x2db143(0x287)]['refresh'],Game_Event['prototype'][_0x2db143(0x1f3)]=function(){const _0x3f7870=_0x2db143,_0x3b3db0=this[_0x3f7870(0x245)];VisuMZ[_0x3f7870(0x483)]['Game_Event_refresh'][_0x3f7870(0x3f0)](this),_0x3b3db0!==this[_0x3f7870(0x245)]&&this[_0x3f7870(0x96)]();},VisuMZ[_0x2db143(0x483)][_0x2db143(0x412)]=Game_Event[_0x2db143(0x287)][_0x2db143(0x1ea)],Game_Event['prototype'][_0x2db143(0x1ea)]=function(){const _0x43bd9b=_0x2db143;VisuMZ[_0x43bd9b(0x483)][_0x43bd9b(0x412)][_0x43bd9b(0x3f0)](this),this['initEventsMoveCoreEffects']();},VisuMZ['EventsMoveCore'][_0x2db143(0x434)]=Game_Event['prototype'][_0x2db143(0xe8)],Game_Event[_0x2db143(0x287)][_0x2db143(0xe8)]=function(){const _0x343f04=_0x2db143;this['_activationProximityAutoTriggerBypass']=!![],VisuMZ['EventsMoveCore'][_0x343f04(0x434)][_0x343f04(0x3f0)](this),this[_0x343f04(0x96)](),this[_0x343f04(0x262)]=![];},Game_Event[_0x2db143(0x287)][_0x2db143(0x96)]=function(){const _0x2fd351=_0x2db143;if(!this[_0x2fd351(0x124)]())return;this[_0x2fd351(0x450)](),this[_0x2fd351(0x428)](),this['setupEventsMoveCoreCommentTags'](),this[_0x2fd351(0x29d)]();},Game_Event[_0x2db143(0x287)][_0x2db143(0x428)]=function(){const _0x155243=_0x2db143,_0x914a79=this[_0x155243(0x124)]()['note'];if(_0x914a79==='')return;this[_0x155243(0x393)](_0x914a79);},Game_Event['prototype'][_0x2db143(0x21a)]=function(){const _0x2dbd83=_0x2db143;if(!this[_0x2dbd83(0x4c4)]())return;const _0x5ecb84=this[_0x2dbd83(0x388)]();let _0x16e2de='';for(const _0x560a88 of _0x5ecb84){if([0x6c,0x198][_0x2dbd83(0x2c8)](_0x560a88['code'])){if(_0x16e2de!=='')_0x16e2de+='\x0a';_0x16e2de+=_0x560a88[_0x2dbd83(0xe2)][0x0];}}this[_0x2dbd83(0x393)](_0x16e2de);},Game_Event['prototype'][_0x2db143(0x450)]=function(){const _0x5d5357=_0x2db143,_0x4f0a83=VisuMZ[_0x5d5357(0x483)]['Settings'];this[_0x5d5357(0xa0)]={'type':_0x5d5357(0x1d7),'distance':0x0,'regionList':[]},this[_0x5d5357(0x326)]=![],this[_0x5d5357(0x3c2)]=![],this[_0x5d5357(0x2ba)]={'up':0x0,'down':0x0,'left':0x0,'right':0x0},this['_eventIcon']=$gameSystem[_0x5d5357(0x43f)](this),this[_0x5d5357(0x3de)]={'text':'','visibleRange':_0x4f0a83[_0x5d5357(0x11e)]['VisibleRange'],'offsetX':_0x4f0a83[_0x5d5357(0x11e)][_0x5d5357(0x4f8)],'offsetY':_0x4f0a83[_0x5d5357(0x11e)][_0x5d5357(0x32f)]},this[_0x5d5357(0x439)]=[],this[_0x5d5357(0x311)]={'target':-0x1,'type':'random','delay':0x1},this[_0x5d5357(0x34e)]=_0x4f0a83['Movement'][_0x5d5357(0x20b)]??0x0,this[_0x5d5357(0x3ee)]=![],this[_0x5d5357(0x373)]={'visible':!![],'filename':_0x4f0a83[_0x5d5357(0x496)][_0x5d5357(0x4eb)]},this[_0x5d5357(0x2e3)](),this[_0x5d5357(0x9b)]();},Game_Event[_0x2db143(0x287)][_0x2db143(0x393)]=function(_0x4e7932){const _0x3aa942=_0x2db143;if(_0x4e7932[_0x3aa942(0x474)](/<ACTIVATION[ ](?:REGION|REGIONS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x3aa942(0x425)==='vKlaM'){if([0x2,0x4,0x6,0x8][_0x3aa942(0x2c8)](_0x4d4ca6))return 0x4;if([0x1,0x3,0x7,0x9][_0x3aa942(0x2c8)](_0x30ddce))return 0x5;}else this[_0x3aa942(0xa0)][_0x3aa942(0x3aa)]=JSON[_0x3aa942(0x418)]('['+RegExp['$1'][_0x3aa942(0x474)](/\d+/g)+']'),this[_0x3aa942(0xa0)][_0x3aa942(0x129)]=_0x3aa942(0x133);}else _0x4e7932[_0x3aa942(0x474)](/<ACTIVATION[ ](.*?):[ ](\d+)>/i)&&(type=String(RegExp['$1'])['toLowerCase']()[_0x3aa942(0x28d)](),this[_0x3aa942(0xa0)][_0x3aa942(0x129)]=type,this['_activationProximity'][_0x3aa942(0x48d)]=Number(RegExp['$2']));if(_0x4e7932[_0x3aa942(0x474)](/<ALWAYS UPDATE MOVEMENT>/i)){if(_0x3aa942(0xda)===_0x3aa942(0xbd)){const _0x63a250=this[_0x3aa942(0x51b)]['direction'](),_0x1d9d94=[0x2,0x2,0x2,0x4,0x4,0x2,0x6,0x6,0x8,0x8];return(_0x1d9d94[_0x63a250]-0x2)/0x2;}else this[_0x3aa942(0x326)]=!![];}_0x4e7932[_0x3aa942(0x474)](/<CLICK TRIGGER>/i)&&(this['_clickTrigger']=!![]);const _0x502ae6=_0x4e7932['match'](/<HITBOX[ ](.*?):[ ](\d+)>/gi);if(_0x502ae6)for(const _0x3ae7e0 of _0x502ae6){if('kzAck'==='kzAck'){if(_0x3ae7e0[_0x3aa942(0x474)](/<HITBOX[ ](.*?):[ ](\d+)>/i)){const _0x4cdf27=String(RegExp['$1'])[_0x3aa942(0x12b)]()['trim'](),_0x5d8426=Number(RegExp['$2']);this['_addedHitbox'][_0x4cdf27]=_0x5d8426;}}else{const _0x8eb060=this[_0x3aa942(0x4ab)][_0x3aa942(0x346)],_0x45dbfd=this['_eventCopyData']['eventId'];return _0xaea560[_0x3aa942(0x395)][_0x8eb060][_0x3aa942(0x4e5)][_0x45dbfd];}}_0x4e7932[_0x3aa942(0x474)](/<ICON:[ ](\d+)>/i)&&(this['_eventIcon'][_0x3aa942(0x35a)]=Number(RegExp['$1']));if(_0x4e7932[_0x3aa942(0x474)](/<ICON (?:BUFFER|OFFSET) X:[ ]([\+\-]\d+)>/i)){if(_0x3aa942(0x3eb)!=='GrAgs')this['_eventIcon'][_0x3aa942(0x4c9)]=Number(RegExp['$1']);else while(this[_0x3aa942(0x2a3)]()){this[_0x3aa942(0x115)]();}}if(_0x4e7932[_0x3aa942(0x474)](/<ICON (?:BUFFER|OFFSET) Y:[ ]([\+\-]\d+)>/i)){if(_0x3aa942(0x1c1)!=='ErXSU')this[_0x3aa942(0x464)]['bufferY']=Number(RegExp['$1']);else return this['isDashing']()&&(this['isMoving']()||this[_0x3aa942(0x1c7)]()!==0x0&&this[_0x3aa942(0x94)](this['_x'],this['_y'],this['getInputDirection']())||_0x108ef1[_0x3aa942(0x426)]());}if(_0x4e7932[_0x3aa942(0x474)](/<ICON (?:BUFFER|OFFSET):[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)){if(_0x3aa942(0x33e)==='DDGRX')return this['selfValue'](_0x184a88);else this[_0x3aa942(0x464)][_0x3aa942(0x4c9)]=Number(RegExp['$1']),this[_0x3aa942(0x464)][_0x3aa942(0x42e)]=Number(RegExp['$2']);}if(_0x4e7932[_0x3aa942(0x474)](/<ICON BLEND MODE:[ ](.*?)>/i)){const _0x18b812=String(RegExp['$1'])['toUpperCase']()['trim'](),_0x2de4dd=['NORMAL','ADDITIVE',_0x3aa942(0x257),_0x3aa942(0xd3)];this['_eventIcon'][_0x3aa942(0x269)]=_0x2de4dd[_0x3aa942(0x381)](_0x18b812)['clamp'](0x0,0x3);}if(_0x4e7932[_0x3aa942(0x474)](/<LABEL:[ ](.*?)>/i)){if(_0x3aa942(0x3bd)!==_0x3aa942(0x433))this[_0x3aa942(0x3de)][_0x3aa942(0x28e)]=String(RegExp['$1'])['trim']();else{if(!_0x3d59dd[_0x3aa942(0x34c)]())return;_0x3aa90c[_0x3aa942(0x20a)](_0x4d82bd,_0x5d76b6);let _0x2db6d5=0x0;_0x2db6d5+=_0x1aa185[_0x3aa942(0x2d1)],_0x2db6d5+=_0x46920a[_0x3aa942(0x4b8)]*0x3c,_0x2db6d5+=_0x47fe45['Minutes']*0x3c*0x3c,_0x2db6d5+=_0x181bf5['Hours']*0x3c*0x3c*0x3c,_0x1aab77['setFrames'](_0x2db6d5);}}_0x4e7932[_0x3aa942(0x474)](/<LABEL>\s*([\s\S]*)\s*<\/LABEL>/i)&&('VioDi'!=='FxAJo'?this['_labelWindow'][_0x3aa942(0x28e)]=String(RegExp['$1'])[_0x3aa942(0x28d)]():(_0x1ac056[_0x3aa942(0xec)](_0x5d8dd1),_0x594ff3['push'](_0x398f0e)));if(_0x4e7932[_0x3aa942(0x474)](/<LABEL (?:BUFFER|OFFSET) X:[ ]([\+\-]\d+)>/i)){if(_0x3aa942(0x4fb)!==_0x3aa942(0x264))this[_0x3aa942(0x3de)][_0x3aa942(0x268)]=Number(RegExp['$1']);else return this[_0x3aa942(0x3de)][_0x3aa942(0x387)];}if(_0x4e7932['match'](/<LABEL (?:BUFFER|OFFSET) Y:[ ]([\+\-]\d+)>/i)){if(_0x3aa942(0x33d)==='xrVET')return this['getPosingCharacterPattern']();else this[_0x3aa942(0x3de)][_0x3aa942(0x175)]=Number(RegExp['$1']);}if(_0x4e7932['match'](/<LABEL (?:BUFFER|OFFSET):[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)){if(_0x3aa942(0xe4)===_0x3aa942(0x3e5))return this['screenY']()+this[_0x3aa942(0x1af)]()+this[_0x3aa942(0x3ec)]();else this[_0x3aa942(0x3de)][_0x3aa942(0x268)]=Number(RegExp['$1']),this['_labelWindow']['offsetY']=Number(RegExp['$2']);}$gameTemp['registerSelfTarget'](this);for(;;){if(this[_0x3aa942(0x3de)][_0x3aa942(0x28e)][_0x3aa942(0x474)](/\\V\[(\d+)\]/gi)){if(_0x3aa942(0x4d9)===_0x3aa942(0x502))return!!this['_eventSpawnData'];else this[_0x3aa942(0x3de)][_0x3aa942(0x28e)]=this[_0x3aa942(0x3de)]['text'][_0x3aa942(0x520)](/\\V\[(\d+)\]/gi,(_0x5d8e45,_0x3dfbc7)=>$gameVariables[_0x3aa942(0x3a6)](parseInt(_0x3dfbc7)));}else break;}$gameTemp[_0x3aa942(0x214)]();_0x4e7932[_0x3aa942(0x474)](/<LABEL RANGE:[ ](\d+)>/i)&&(this['_labelWindow']['visibleRange']=Number(RegExp['$1']));if(_0x4e7932[_0x3aa942(0x474)](/<MOVE ONLY (?:REGION|REGIONS):[ ](\d+(?:\s*,\s*\d+)*)>/i)){const _0x284a1e=JSON[_0x3aa942(0x418)]('['+RegExp['$1'][_0x3aa942(0x474)](/\d+/g)+']');this['_moveOnlyRegions']=this[_0x3aa942(0x439)][_0x3aa942(0x513)](_0x284a1e),this['_moveOnlyRegions']['remove'](0x0);}if(_0x4e7932[_0x3aa942(0x474)](/<MOVE SYNCH TARGET:[ ](.*?)>/i)){if(_0x3aa942(0x442)!==_0x3aa942(0x442)){const _0x2770c7=_0x5a5bc6(_0x2d6f25['$1']);if(_0x2770c7[_0x3aa942(0x474)](/PLAYER/i))this[_0x3aa942(0x311)][_0x3aa942(0x211)]=0x0;else _0x2770c7[_0x3aa942(0x474)](/EVENT[ ](\d+)/i)&&(this[_0x3aa942(0x311)][_0x3aa942(0x211)]=_0x234900(_0x22a63d['$1']));}else{const _0x13aa20=String(RegExp['$1']);if(_0x13aa20['match'](/PLAYER/i))this[_0x3aa942(0x311)][_0x3aa942(0x211)]=0x0;else _0x13aa20[_0x3aa942(0x474)](/EVENT[ ](\d+)/i)&&(this[_0x3aa942(0x311)]['target']=Number(RegExp['$1']));}}_0x4e7932[_0x3aa942(0x474)](/<MOVE SYNCH TYPE:[ ](.*?)>/i)&&(this['_moveSynch']['type']=String(RegExp['$1'])['toLowerCase']()[_0x3aa942(0x28d)]());_0x4e7932[_0x3aa942(0x474)](/<MOVE SYNCH DELAY:[ ](\d+)>/i)&&(this[_0x3aa942(0x311)]['delay']=Number(RegExp['$1']));if(_0x4e7932['match'](/<TRUE RANDOM MOVE>/i)){if(_0x3aa942(0x220)===_0x3aa942(0x220))this[_0x3aa942(0x34e)]=0x0;else{const _0x5ae7a8=_0x162a50[_0x3aa942(0x3a7)]()||this;if(_0x5ae7a8[_0x3aa942(0x12d)]!==_0x328394)return _0x213aae[_0x3aa942(0x483)][_0x3aa942(0x250)][_0x3aa942(0x3f0)](this,_0x2b477b);else{const _0x186637=[_0x5ae7a8[_0x3aa942(0x9d)],_0x5ae7a8[_0x3aa942(0x50b)],_0x3aa942(0xae)[_0x3aa942(0x183)](_0x2a4b1e)];return _0x3b3102[_0x3aa942(0x3a6)](_0x186637);}}}else _0x4e7932['match'](/<RANDOM MOVE WEIGHT:[ ](.*?)>/i)&&(this[_0x3aa942(0x34e)]=Number(RegExp['$1'])||0x0);if(_0x4e7932[_0x3aa942(0x474)](/<SAVE EVENT (?:LOCATION|LOCATIONS)>/i)){if(_0x3aa942(0x39c)!==_0x3aa942(0x39c)){if(_0x543bcd===0x4&&_0x535ded===0x2)this[_0x3aa942(0x10e)](0x1);if(_0x1401ef===0x6&&_0x402198===0x2)this[_0x3aa942(0x10e)](0x3);if(_0x1f5248===0x4&&_0x17cf7f===0x8)this['setDirection'](0x7);if(_0x348093===0x6&&_0x39bedb===0x8)this[_0x3aa942(0x10e)](0x9);}else this['_saveEventLocation']=!![];}if(_0x4e7932[_0x3aa942(0x474)](/<HIDE SHADOW>/i)){if(_0x3aa942(0x178)!==_0x3aa942(0x273))this[_0x3aa942(0x373)][_0x3aa942(0x22a)]=![];else{if(!_0x293cec[_0x3aa942(0x2af)]()&&_0x148fdc<0x0){let _0x5d61ed=_0x267925['getControlledFollowerID']();if(_0x5d61ed>0x0)return _0x3c82c1[_0x3aa942(0x1fd)]()[_0x3aa942(0x157)](_0x5d61ed-0x1);}return _0x29b158['EventsMoveCore'][_0x3aa942(0x135)][_0x3aa942(0x3f0)](this,_0x4210a0);}}_0x4e7932[_0x3aa942(0x474)](/<SHADOW FILENAME:[ ](.*?)>/i)&&(this[_0x3aa942(0x373)][_0x3aa942(0x26f)]=String(RegExp['$1'])),_0x4e7932[_0x3aa942(0x474)](/<SPRITE OFFSET X:[ ]([\+\-]\d+)>/i)&&(this[_0x3aa942(0x375)]=Number(RegExp['$1'])),_0x4e7932[_0x3aa942(0x474)](/<SPRITE OFFSET Y:[ ]([\+\-]\d+)>/i)&&(this[_0x3aa942(0x2bd)]=Number(RegExp['$1'])),_0x4e7932[_0x3aa942(0x474)](/<SPRITE OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(this[_0x3aa942(0x375)]=Number(RegExp['$1']),this[_0x3aa942(0x2bd)]=Number(RegExp['$2'])),_0x4e7932[_0x3aa942(0x474)](/<STEP PATTERN:[ ](.*)>/i)&&(_0x3aa942(0x45d)===_0x3aa942(0x131)?(this[_0x3aa942(0x464)][_0x3aa942(0x4c9)]=_0x37f723(_0x1dc736['$1']),this[_0x3aa942(0x464)]['bufferY']=_0x2b5f1f(_0x1aa535['$2'])):this[_0x3aa942(0x4bf)]=String(RegExp['$1'])[_0x3aa942(0x2e8)]()[_0x3aa942(0x28d)]());},Game_Event[_0x2db143(0x287)]['updateEventsMoveCoreTagChanges']=function(){const _0x2a9177=_0x2db143;this[_0x2a9177(0x427)]();},Game_Event['prototype'][_0x2db143(0x1b7)]=function(){const _0x4ef9c7=_0x2db143;if(this[_0x4ef9c7(0x326)])return!![];return Game_Character['prototype'][_0x4ef9c7(0x1b7)][_0x4ef9c7(0x3f0)](this);},VisuMZ['EventsMoveCore'][_0x2db143(0xff)]=Game_Event[_0x2db143(0x287)][_0x2db143(0x312)],Game_Event['prototype'][_0x2db143(0x312)]=function(){const _0x3df92b=_0x2db143;if(this[_0x3df92b(0x3ac)]())return;VisuMZ[_0x3df92b(0x483)][_0x3df92b(0xff)][_0x3df92b(0x3f0)](this),this[_0x3df92b(0x1d1)]()&&VisuMZ[_0x3df92b(0x1db)](this['_eventId']);},Game_Event[_0x2db143(0x287)][_0x2db143(0x3ac)]=function(){const _0x1bca05=_0x2db143,_0x13f43e=VisuMZ['EventsMoveCore'][_0x1bca05(0x516)][_0x1bca05(0x496)];if($gameMap[_0x1bca05(0x2f8)]()&&_0x13f43e[_0x1bca05(0xb0)])return!![];if($gameMessage[_0x1bca05(0xb5)]()&&_0x13f43e[_0x1bca05(0x444)])return!![];if(!$gameSystem[_0x1bca05(0x4d4)]())return!![];if(this[_0x1bca05(0xd6)]()>=0x0)return!![];return![];},Game_Event[_0x2db143(0x287)][_0x2db143(0x427)]=function(){const _0x350cad=_0x2db143,_0x50202a=SceneManager[_0x350cad(0x122)]['_spriteset'];if(_0x50202a){const _0x49b3ac=_0x50202a[_0x350cad(0x2d7)](this);_0x49b3ac&&_0x49b3ac[_0x350cad(0x380)]&&_0x49b3ac[_0x350cad(0x380)][_0x350cad(0x9a)]!==this[_0x350cad(0x3f4)]()&&(_0x49b3ac[_0x350cad(0x380)][_0x350cad(0x9a)]=this[_0x350cad(0x3f4)](),_0x49b3ac[_0x350cad(0x380)][_0x350cad(0x227)]=ImageManager['loadSystem'](_0x49b3ac[_0x350cad(0x380)][_0x350cad(0x9a)]));}},Game_Event[_0x2db143(0x287)][_0x2db143(0x3f4)]=function(){const _0x865322=_0x2db143;return this[_0x865322(0x373)][_0x865322(0x26f)];},Game_Event[_0x2db143(0x287)]['isShadowVisible']=function(){const _0x10cef4=_0x2db143;if(!this[_0x10cef4(0x373)][_0x10cef4(0x22a)])return![];return Game_CharacterBase['prototype']['isShadowVisible']['call'](this);},Game_Event['prototype']['labelWindowText']=function(){const _0x3d0e72=_0x2db143;return this[_0x3d0e72(0x3de)][_0x3d0e72(0x28e)];},Game_Event[_0x2db143(0x287)][_0x2db143(0x290)]=function(){const _0x48b91b=_0x2db143;return this[_0x48b91b(0x3de)][_0x48b91b(0x387)];},Game_Event[_0x2db143(0x287)][_0x2db143(0x4f0)]=function(_0x51e2c1,_0x5545a6,_0x57a80b){const _0x1f42ee=_0x2db143;if(this[_0x1f42ee(0x3df)]())return this[_0x1f42ee(0x40d)](_0x51e2c1,_0x5545a6,_0x57a80b);if($gameMap['isRegionAllowPass'](_0x51e2c1,_0x5545a6,_0x57a80b,'event'))return!![];if($gameMap[_0x1f42ee(0x2d0)](_0x51e2c1,_0x5545a6,_0x57a80b,_0x1f42ee(0x124)))return![];return Game_Character['prototype'][_0x1f42ee(0x4f0)][_0x1f42ee(0x3f0)](this,_0x51e2c1,_0x5545a6,_0x57a80b);},Game_Event['prototype']['hasMoveOnlyRegions']=function(){const _0x119459=_0x2db143;if(this['_moveOnlyRegions']===undefined)this[_0x119459(0x450)]();return this[_0x119459(0x439)][_0x119459(0x141)]>0x0;},Game_Event[_0x2db143(0x287)][_0x2db143(0x40d)]=function(_0x489cbb,_0x1f9e50,_0x3bb040){const _0x37170b=_0x2db143,_0x55d1b0=$gameMap[_0x37170b(0x19d)](_0x489cbb,_0x3bb040),_0x15e0b8=$gameMap[_0x37170b(0x4fe)](_0x1f9e50,_0x3bb040),_0x30face=$gameMap[_0x37170b(0x2b4)](_0x55d1b0,_0x15e0b8);return this['_moveOnlyRegions'][_0x37170b(0x2c8)](_0x30face);},VisuMZ[_0x2db143(0x483)][_0x2db143(0x404)]=Game_Event['prototype']['findProperPageIndex'],Game_Event[_0x2db143(0x287)]['findProperPageIndex']=function(){const _0x1601c5=_0x2db143;return this[_0x1601c5(0x23e)]=![],this['_CPCs']=![],this[_0x1601c5(0x124)]()?VisuMZ[_0x1601c5(0x483)][_0x1601c5(0x404)][_0x1601c5(0x3f0)](this):-0x1;},VisuMZ[_0x2db143(0x483)][_0x2db143(0x4e3)]=Game_Event['prototype'][_0x2db143(0x78)],Game_Event[_0x2db143(0x287)][_0x2db143(0x78)]=function(_0x211544){const _0x436f8f=_0x2db143;this[_0x436f8f(0x2db)](_0x211544),$gameTemp[_0x436f8f(0x222)](this);const _0x75d916=VisuMZ['EventsMoveCore'][_0x436f8f(0x4e3)][_0x436f8f(0x3f0)](this,_0x211544);return $gameTemp[_0x436f8f(0x214)](),_0x75d916;},Game_Event[_0x2db143(0x287)][_0x2db143(0x2b6)]=function(){const _0x7fb629=_0x2db143;return this[_0x7fb629(0x23e)];},Game_Event[_0x2db143(0x287)][_0x2db143(0x2db)]=function(_0xb22e32){const _0x18a689=_0x2db143,_0x4a2d46=_0xb22e32[_0x18a689(0x21e)];if(_0x4a2d46['switch1Valid']&&DataManager[_0x18a689(0x17c)](_0x4a2d46['switch1Id']))this[_0x18a689(0x23e)]=!![];else{if(_0x4a2d46[_0x18a689(0x41c)]&&DataManager[_0x18a689(0x17c)](_0x4a2d46['switch2Id']))this[_0x18a689(0x23e)]=!![];else{if(_0x4a2d46[_0x18a689(0x32a)]&&DataManager[_0x18a689(0x2bf)](_0x4a2d46[_0x18a689(0x3e2)])){if(_0x18a689(0x42d)!==_0x18a689(0x42d)){if(_0x1654a4[_0x18a689(0x2f8)]())return;if(_0x902b66[_0x18a689(0x2fb)]())return;let _0x5a0b18=_0x162a6f[_0x18a689(0x483)]['Settings']['RegionTouch'];const _0x1adc18=_0x18a689(0x512)[_0x18a689(0x183)](this[_0x18a689(0x2b4)]());_0x5a0b18[_0x1adc18]&&_0x80a372[_0x18a689(0xa9)](_0x5a0b18[_0x1adc18]);}else this['_advancedSwitchVariable']=!![];}}}},Game_Event[_0x2db143(0x287)][_0x2db143(0xd2)]=function(){const _0x5022ec=_0x2db143;if(this['_erased'])return![];return this[_0x5022ec(0x3c2)];},Game_Event['prototype']['onClickTrigger']=function(){$gameTemp['clearDestination'](),this['start']();},Game_Event[_0x2db143(0x287)]['pos']=function(_0x303226,_0x5971bc){const _0xc10d71=_0x2db143;return this[_0xc10d71(0x2ba)]?this[_0xc10d71(0x298)](_0x303226,_0x5971bc):Game_Character['prototype'][_0xc10d71(0x246)][_0xc10d71(0x3f0)](this,_0x303226,_0x5971bc);},Game_Event[_0x2db143(0x287)][_0x2db143(0x298)]=function(_0x3a9917,_0x9dd6fc){const _0xb9831d=_0x2db143;var _0x2957d2=this['x']-this[_0xb9831d(0x2ba)][_0xb9831d(0x169)],_0x44161c=this['x']+this[_0xb9831d(0x2ba)]['right'],_0x1abed4=this['y']-this[_0xb9831d(0x2ba)]['up'],_0x107a0c=this['y']+this['_addedHitbox'][_0xb9831d(0xd0)];return _0x2957d2<=_0x3a9917&&_0x3a9917<=_0x44161c&&_0x1abed4<=_0x9dd6fc&&_0x9dd6fc<=_0x107a0c;},Game_Event[_0x2db143(0x287)][_0x2db143(0x94)]=function(_0x4a9fc2,_0xeaa069,_0x252daf){const _0x272146=_0x2db143;for(let _0x5c2e24=-this['_addedHitbox'][_0x272146(0x169)];_0x5c2e24<=this['_addedHitbox'][_0x272146(0x1d6)];_0x5c2e24++){if(_0x272146(0x3a0)==='cToJh')for(let _0x530c3f=-this[_0x272146(0x2ba)]['up'];_0x530c3f<=this[_0x272146(0x2ba)][_0x272146(0xd0)];_0x530c3f++){if(!Game_Character[_0x272146(0x287)]['canPass'][_0x272146(0x3f0)](this,_0x4a9fc2+_0x5c2e24,_0xeaa069+_0x530c3f,_0x252daf))return![];}else this[_0x272146(0x365)]=_0x216cbd;}return!![];},Game_Event[_0x2db143(0x287)][_0x2db143(0x3d9)]=function(_0x1a2e16,_0x9f2299){const _0x13312c=_0x2db143;if(Imported[_0x13312c(0x305)]&&this[_0x13312c(0x17b)]())return this[_0x13312c(0x265)](_0x1a2e16,_0x9f2299);else{if(_0x13312c(0x79)===_0x13312c(0x130))return!![];else{const _0x4d80e3=$gameMap[_0x13312c(0xd8)](_0x1a2e16,_0x9f2299)[_0x13312c(0x22b)](_0x303e33=>_0x303e33!==this);return _0x4d80e3[_0x13312c(0x141)]>0x0;}}},Game_Event[_0x2db143(0x287)]['checkSmartEventCollision']=function(_0xdb0f58,_0x1c3a7e){const _0x45992a=_0x2db143;if(!this[_0x45992a(0x472)]())return![];else{if(_0x45992a(0x2bb)===_0x45992a(0x2bb)){const _0xa9c35d=$gameMap[_0x45992a(0xd8)](_0xdb0f58,_0x1c3a7e)['filter'](_0x2dd0d3=>_0x2dd0d3!==this&&_0x2dd0d3[_0x45992a(0x472)]());return _0xa9c35d[_0x45992a(0x141)]>0x0;}else return _0x2d3a73[_0x45992a(0x483)]['Game_CharacterBase_screenY'][_0x45992a(0x3f0)](this)+(this[_0x45992a(0x2bd)]||0x0);}},Game_Event[_0x2db143(0x287)][_0x2db143(0x29b)]=function(){const _0x478512=_0x2db143;return this[_0x478512(0xa0)][_0x478512(0x129)]||_0x478512(0x1d7);},Game_Event[_0x2db143(0x287)][_0x2db143(0x2f7)]=function(){return this['_activationProximity']['distance']||0x0;},Game_Event[_0x2db143(0x287)][_0x2db143(0x142)]=function(){const _0x4d590d=_0x2db143;return this['_activationProximity'][_0x4d590d(0x3aa)]||[];},Game_Event[_0x2db143(0x287)][_0x2db143(0x15d)]=function(){const _0x46bcf2=_0x2db143;Game_Character[_0x46bcf2(0x287)][_0x46bcf2(0x15d)]['call'](this);if([_0x46bcf2(0x1d7),_0x46bcf2(0x133)][_0x46bcf2(0x2c8)](this[_0x46bcf2(0x29b)]()))return;$gamePlayer[_0x46bcf2(0x118)]([0x2]);},VisuMZ[_0x2db143(0x483)][_0x2db143(0x490)]=Game_Event[_0x2db143(0x287)][_0x2db143(0x33b)],Game_Event[_0x2db143(0x287)]['checkEventTriggerAuto']=function(){const _0x3bf012=_0x2db143;if(this['_trigger']!==0x3)return;if(this['_activationProximityAutoTriggerBypass'])return;if(!this['checkRegionEventTrigger'](![]))return;if(!this['checkActivationProximity'](![]))return;VisuMZ[_0x3bf012(0x483)][_0x3bf012(0x490)]['call'](this);},VisuMZ[_0x2db143(0x483)]['Game_Event_updateParallel']=Game_Event[_0x2db143(0x287)][_0x2db143(0x289)],Game_Event[_0x2db143(0x287)][_0x2db143(0x289)]=function(){const _0x352268=_0x2db143;if(!this[_0x352268(0x1ca)])return;if(!this[_0x352268(0x1df)](!![]))return;if(!this[_0x352268(0x13d)](!![]))return;VisuMZ[_0x352268(0x483)][_0x352268(0x3c4)][_0x352268(0x3f0)](this);},Game_Event['prototype'][_0x2db143(0x1df)]=function(_0x47ce5b){const _0x37819b=_0x2db143;if(!_0x47ce5b&&$gameMap[_0x37819b(0x2f8)]())return![];if(!_0x47ce5b&&$gameMap[_0x37819b(0x2fb)]())return![];if(this[_0x37819b(0x142)]()<=0x0)return!![];return $gamePlayer[_0x37819b(0x28f)](this);},Game_Event[_0x2db143(0x287)][_0x2db143(0x13d)]=function(_0xf21277){const _0x34218b=_0x2db143;if(!_0xf21277&&$gameMap[_0x34218b(0x2f8)]())return![];if(!_0xf21277&&$gameMap[_0x34218b(0x2fb)]())return![];if([_0x34218b(0x1d7),_0x34218b(0x133)]['includes'](this['activationProximityType']()))return!![];return $gamePlayer[_0x34218b(0x50d)](this);},VisuMZ[_0x2db143(0x1db)]=function(_0x35fb96){const _0x4d6e36=_0x2db143;for(const _0x202776 of $gameMap[_0x4d6e36(0x4e5)]()){if(!_0x202776)continue;if(_0x202776['moveSynchTarget']()===_0x35fb96){if(_0x4d6e36(0x36d)==='jMITe'){if(!this['isTargetEventValidForLabelWindow'](_0x5d2171))return;const _0x37d38f=new _0x19bced(_0x4bd4a7);_0x37d38f['z']=0x8,_0x37d38f[_0x4d6e36(0x1b6)]=_0x5ca8ac[_0x4d6e36(0x416)]++,this[_0x4d6e36(0x4a7)]['addChild'](_0x37d38f),this[_0x4d6e36(0x3e8)][_0x4d6e36(0xec)](_0x37d38f);}else _0x202776['updateMoveSynch']();}}},VisuMZ[_0x2db143(0x1fe)]=function(_0x258ee6){const _0x20afd6=_0x2db143;if(_0x258ee6===0x0)return $gamePlayer;return $gameMap[_0x20afd6(0x124)](_0x258ee6);},Game_Event[_0x2db143(0x287)][_0x2db143(0xd6)]=function(){const _0x26d9bf=_0x2db143;return this[_0x26d9bf(0x311)]['target'];},Game_Event['prototype'][_0x2db143(0x101)]=function(){const _0x5b81b9=_0x2db143;return this[_0x5b81b9(0x311)][_0x5b81b9(0x129)];},Game_Event[_0x2db143(0x287)][_0x2db143(0xa6)]=function(){const _0x26c83e=_0x2db143;if(this[_0x26c83e(0xd6)]()>=0x0){if(_0x26c83e(0x4c7)!==_0x26c83e(0x4c7)){if(!this['event']())return;this[_0x26c83e(0x450)](),this[_0x26c83e(0x428)](),this[_0x26c83e(0x21a)](),this[_0x26c83e(0x29d)]();}else{const _0x1b644b=VisuMZ[_0x26c83e(0x1fe)](this[_0x26c83e(0xd6)]());if(_0x1b644b)return _0x1b644b['realMoveSpeed']();}}return Game_Character[_0x26c83e(0x287)]['realMoveSpeed'][_0x26c83e(0x3f0)](this);},Game_Event[_0x2db143(0x287)][_0x2db143(0x226)]=function(){const _0x34b730=_0x2db143;this[_0x34b730(0x311)]['timer']=this[_0x34b730(0x311)]['timer']||0x0,this['_moveSynch'][_0x34b730(0x278)]--;if(this['_moveSynch'][_0x34b730(0x278)]>0x0)return;this[_0x34b730(0x311)][_0x34b730(0x278)]=this[_0x34b730(0x311)][_0x34b730(0x206)],this[_0x34b730(0x40f)]();},Game_Event['prototype'][_0x2db143(0x40f)]=function(){const _0x15aaa3=_0x2db143;switch(this[_0x15aaa3(0x101)]()){case _0x15aaa3(0x228):this[_0x15aaa3(0xb6)]();break;case _0x15aaa3(0x1c9):this[_0x15aaa3(0xea)]();break;case'away':this['processMoveSynchAway']();break;case'custom':this[_0x15aaa3(0x481)]();break;case _0x15aaa3(0x391):case'copy':this['processMoveSynchMimic']();break;case _0x15aaa3(0x149):case _0x15aaa3(0xbc):this[_0x15aaa3(0x110)]();break;case _0x15aaa3(0x11a):case _0x15aaa3(0x327):case _0x15aaa3(0x376):case _0x15aaa3(0x2d3):this[_0x15aaa3(0x31d)]();break;case _0x15aaa3(0x336):case _0x15aaa3(0x1ba):case'mirror\x20vert':case _0x15aaa3(0x256):this['processMoveSynchMirrorVert']();break;default:this[_0x15aaa3(0xb6)]();break;}this['update']();},Game_Event[_0x2db143(0x287)][_0x2db143(0xb6)]=function(){const _0x5a30ba=_0x2db143,_0x1862f2=[0x2,0x4,0x6,0x8];$gameMap['isSupportDiagonalMovement']()&&_0x1862f2[_0x5a30ba(0xec)](0x1,0x3,0x7,0x9);const _0x1689f2=[];for(const _0x1d8156 of _0x1862f2){if(this[_0x5a30ba(0x94)](this['x'],this['y'],_0x1d8156))_0x1689f2['push'](_0x1d8156);}if(_0x1689f2[_0x5a30ba(0x141)]>0x0){const _0x38f908=_0x1689f2[Math[_0x5a30ba(0x4c0)](_0x1689f2[_0x5a30ba(0x141)])];this[_0x5a30ba(0x1f2)](_0x38f908);}},Game_Event[_0x2db143(0x287)][_0x2db143(0xea)]=function(){const _0x32b365=_0x2db143,_0xb9e876=VisuMZ[_0x32b365(0x1fe)](this[_0x32b365(0xd6)]());this[_0x32b365(0x291)](_0xb9e876);},Game_Event[_0x2db143(0x287)][_0x2db143(0x2e1)]=function(){const _0xb4bab8=_0x2db143,_0x55649c=VisuMZ[_0xb4bab8(0x1fe)](this[_0xb4bab8(0xd6)]());this[_0xb4bab8(0x1da)](_0x55649c);},Game_Event[_0x2db143(0x287)][_0x2db143(0x481)]=function(){const _0x138911=_0x2db143;this[_0x138911(0x3fe)]();},Game_Event[_0x2db143(0x287)]['processMoveSynchMimic']=function(){const _0x4966ef=_0x2db143,_0x3437be=VisuMZ[_0x4966ef(0x1fe)](this['moveSynchTarget']());this[_0x4966ef(0x1f2)](_0x3437be[_0x4966ef(0x2c2)]());},Game_Event[_0x2db143(0x287)][_0x2db143(0x110)]=function(){const _0x5b8886=_0x2db143,_0x3dd847=VisuMZ[_0x5b8886(0x1fe)](this[_0x5b8886(0xd6)]()),_0x1e345f=this[_0x5b8886(0x248)](_0x3dd847[_0x5b8886(0x2c2)]());this[_0x5b8886(0x1f2)](this['reverseDir'](_0x3dd847[_0x5b8886(0x453)]()));},Game_Event['prototype'][_0x2db143(0x31d)]=function(){const _0x2f0368=_0x2db143,_0x200263=VisuMZ[_0x2f0368(0x1fe)](this['moveSynchTarget']()),_0x134b48=[0x0,0x7,0x8,0x9,0x4,0x0,0x6,0x1,0x2,0x3][_0x200263['lastMovedDirection']()];this['executeMoveDir8'](_0x134b48);},Game_Event[_0x2db143(0x287)]['processMoveSynchMirrorVert']=function(){const _0x14a5dd=_0x2db143,_0x1f0276=VisuMZ['GetMoveSynchTarget'](this[_0x14a5dd(0xd6)]()),_0x572b8d=[0x0,0x3,0x2,0x1,0x6,0x0,0x4,0x9,0x8,0x7][_0x1f0276[_0x14a5dd(0x2c2)]()];this[_0x14a5dd(0x1f2)](_0x572b8d);},Game_Event[_0x2db143(0x287)][_0x2db143(0x431)]=function(){const _0x42258b=_0x2db143,_0x381c71=$gameSystem[_0x42258b(0x3c1)](this);if(!_0x381c71)return;this[_0x42258b(0x491)](_0x381c71['x'],_0x381c71['y']),this['setDirection'](_0x381c71[_0x42258b(0x453)]),this['_pageIndex']===_0x381c71['pageIndex']&&(this[_0x42258b(0x182)]=_0x381c71[_0x42258b(0x3f2)]);},Game_Event[_0x2db143(0x287)]['updateMove']=function(){const _0x2416a2=_0x2db143;Game_Character[_0x2416a2(0x287)][_0x2416a2(0x2a9)][_0x2416a2(0x3f0)](this),this[_0x2416a2(0x3ff)]();},Game_Event['prototype']['isSaveEventLocation']=function(){const _0x4558d5=_0x2db143;if($gameMap[_0x4558d5(0x44c)]())return!![];return this['_saveEventLocation'];},Game_Event[_0x2db143(0x287)][_0x2db143(0x3ff)]=function(){const _0x6c0914=_0x2db143;if(!this['isSaveEventLocation']())return;this[_0x6c0914(0x93)]();},Game_Event[_0x2db143(0x287)]['saveEventLocation']=function(){const _0x29c857=_0x2db143;$gameSystem[_0x29c857(0x93)](this);},Game_Event['prototype'][_0x2db143(0x353)]=function(){const _0x420802=_0x2db143;$gameSystem[_0x420802(0x30e)](this);},Game_Event['prototype'][_0x2db143(0x43f)]=function(){const _0x370fd0=_0x2db143;if($gameSystem[_0x370fd0(0x43f)](this))return Game_Character[_0x370fd0(0x287)][_0x370fd0(0x43f)]['call'](this);else{if(_0x370fd0(0x424)===_0x370fd0(0x424))return{'iconIndex':0x0,'bufferX':settings[_0x370fd0(0x358)]['BufferX'],'bufferY':settings[_0x370fd0(0x358)][_0x370fd0(0x17d)],'blendMode':settings[_0x370fd0(0x358)]['BlendMode']};else{const _0x353b47=_0x4e29b5[_0x370fd0(0x124)](_0x245025(_0x3f2258['$1']));return this[_0x370fd0(0x89)](_0x353b47);}}},Game_Event['prototype']['hasCPCs']=function(){const _0x3a746a=_0x2db143;return this[_0x3a746a(0x35d)];},VisuMZ['EventsMoveCore'][_0x2db143(0x1d3)]=Game_Event['prototype'][_0x2db143(0x78)],Game_Event[_0x2db143(0x287)][_0x2db143(0x78)]=function(_0x477a9b){const _0x5008ab=_0x2db143,_0x3ffa51=VisuMZ[_0x5008ab(0x483)][_0x5008ab(0x1d3)][_0x5008ab(0x3f0)](this,_0x477a9b);if(!_0x3ffa51)return![];return this[_0x5008ab(0x27b)](_0x477a9b);},Game_Event[_0x2db143(0x287)][_0x2db143(0x27b)]=function(_0xb919e3){const _0x83e027=_0x2db143;VisuMZ[_0x83e027(0x483)][_0x83e027(0xde)][_0x83e027(0x465)](_0xb919e3),this['_CPCs']=_0xb919e3['CPC'][_0x83e027(0x141)]>0x0;_0xb919e3[_0x83e027(0x4bc)]===undefined&&VisuMZ[_0x83e027(0x483)][_0x83e027(0xde)]['loadCPC'](_0xb919e3);if(_0xb919e3[_0x83e027(0x4bc)][_0x83e027(0x141)]>0x0)return $gameMap[_0x83e027(0x124)](this[_0x83e027(0x50b)])&&VisuMZ[_0x83e027(0x483)]['CustomPageConditions'][_0x83e027(0x348)](_0xb919e3[_0x83e027(0x4bc)],this[_0x83e027(0x50b)]);return!![];},VisuMZ[_0x2db143(0x483)][_0x2db143(0x111)]=Game_Troop[_0x2db143(0x287)][_0x2db143(0x78)],Game_Troop[_0x2db143(0x287)][_0x2db143(0x78)]=function(_0x4caf0a){const _0x389436=_0x2db143;var _0x192dd8=VisuMZ[_0x389436(0x483)][_0x389436(0x111)][_0x389436(0x3f0)](this,_0x4caf0a);return _0x192dd8&&this[_0x389436(0x117)](_0x4caf0a);},Game_Troop[_0x2db143(0x287)]['CPCsMet']=function(_0x359526){const _0x556edc=_0x2db143;_0x359526[_0x556edc(0x4bc)]===undefined&&VisuMZ['EventsMoveCore'][_0x556edc(0xde)]['loadCPC'](_0x359526);if(_0x359526[_0x556edc(0x4bc)]['length']>0x0){if(_0x556edc(0x83)!==_0x556edc(0x4d0))return VisuMZ['EventsMoveCore'][_0x556edc(0xde)][_0x556edc(0x348)](_0x359526['CPC'],0x0);else _0x2df7f1['EventsMoveCore'][_0x556edc(0x4f6)][_0x556edc(0x3f0)](this,_0x18ca24,_0x4b2392);}return!![];},VisuMZ[_0x2db143(0x483)][_0x2db143(0x309)]=Game_Event[_0x2db143(0x287)]['locate'],Game_Event[_0x2db143(0x287)][_0x2db143(0x491)]=function(_0xfed174,_0x2835f5){const _0x3159c3=_0x2db143;VisuMZ['EventsMoveCore']['Game_Event_locate'][_0x3159c3(0x3f0)](this,_0xfed174,_0x2835f5),this['_randomHomeX']=_0xfed174,this[_0x3159c3(0x25a)]=_0x2835f5;},VisuMZ['EventsMoveCore']['Game_Event_moveTypeRandom']=Game_Event[_0x2db143(0x287)][_0x2db143(0x332)],Game_Event['prototype'][_0x2db143(0x332)]=function(){const _0x470ac4=_0x2db143,_0x18015c=$gameMap[_0x470ac4(0x48d)](this['x'],this['y'],this[_0x470ac4(0x37a)],this['_randomHomeY']),_0x5d39c6=_0x18015c*(this['_randomMoveWeight']||0x0);if(Math[_0x470ac4(0x228)]()>=_0x5d39c6)VisuMZ[_0x470ac4(0x483)][_0x470ac4(0x478)][_0x470ac4(0x3f0)](this);else{if(_0x470ac4(0x4bd)===_0x470ac4(0xfb))return this[_0x470ac4(0x266)]();else this[_0x470ac4(0xed)]();}},Game_Event[_0x2db143(0x287)][_0x2db143(0xed)]=function(){const _0x295d84=_0x2db143,_0x2585ff=this[_0x295d84(0x4a1)](this[_0x295d84(0x37a)]),_0x1c871a=this[_0x295d84(0x356)](this[_0x295d84(0x25a)]);if(Math[_0x295d84(0x187)](_0x2585ff)>Math[_0x295d84(0x187)](_0x1c871a))this[_0x295d84(0x2a7)](_0x2585ff>0x0?0x4:0x6),!this[_0x295d84(0x445)]()&&_0x1c871a!==0x0&&this[_0x295d84(0x2a7)](_0x1c871a>0x0?0x8:0x2);else{if(_0x1c871a!==0x0){if(_0x295d84(0x4f2)!=='xaNnn'){this[_0x295d84(0x2a7)](_0x1c871a>0x0?0x8:0x2);if(!this['isMovementSucceeded']()&&_0x2585ff!==0x0){if(_0x295d84(0x2d9)===_0x295d84(0xb8)){if(_0x4374cc[_0x295d84(0x474)](/<HITBOX[ ](.*?):[ ](\d+)>/i)){const _0x1eb352=_0x2b8609(_0x907976['$1'])['toLowerCase']()[_0x295d84(0x28d)](),_0x5894ba=_0x4e9d3f(_0x4f61b7['$2']);this['_addedHitbox'][_0x1eb352]=_0x5894ba;}}else this['moveStraight'](_0x2585ff>0x0?0x4:0x6);}}else _0x2247c9[0x2]['match'](/SELF/i)?this[_0x295d84(0x134)](_0xc31b91,_0xf15c01):_0x3a0946[_0x295d84(0x483)][_0x295d84(0x4a8)][_0x295d84(0x3f0)](this,_0x505580,_0x15d3fa);}}},VisuMZ[_0x2db143(0x483)][_0x2db143(0x2be)]=Game_Interpreter[_0x2db143(0x287)][_0x2db143(0x3a1)],Game_Interpreter[_0x2db143(0x287)][_0x2db143(0x3a1)]=function(){const _0x1267cb=_0x2db143;if(this[_0x1267cb(0x237)]===_0x1267cb(0x3cf)){if(_0x1267cb(0x90)!==_0x1267cb(0x90)){_0x30569e[_0x1267cb(0x20a)](_0x1282bf,_0x15da38);const _0x21f6d8=_0x455515['getLastPluginCommandInterpreter']();_0x4f194a[_0x1267cb(0x3f6)]=_0x2431cf['MapId']||_0x4dcb1b[_0x1267cb(0x346)](),_0x156c88['setEventIconDataKey'](_0x2b1449[_0x1267cb(0x3f6)],_0x59772b['EventId']||_0x21f6d8[_0x1267cb(0x2b5)](),_0x591c82[_0x1267cb(0x51d)],_0x1ffce2[_0x1267cb(0x2ce)],_0x3abbfe[_0x1267cb(0x1e2)],_0x48658b[_0x1267cb(0x1e3)]);}else{if(window[this[_0x1267cb(0x40e)]])'mjEhU'===_0x1267cb(0x1d5)?(this[_0x1267cb(0x237)]='',this[_0x1267cb(0x247)]()):_0x4b12c9=!![];else{if(_0x1267cb(0xb3)==='iduhr'){this[_0x1267cb(0x26d)]--;if(this[_0x1267cb(0x26d)]<=0x0&&this[_0x1267cb(0x126)]!==_0x1267cb(0x399))this[_0x1267cb(0x24c)]();}else return!![];}}}else return _0x1267cb(0x359)===_0x1267cb(0x359)?VisuMZ[_0x1267cb(0x483)][_0x1267cb(0x2be)][_0x1267cb(0x3f0)](this):this[_0x1267cb(0x4cc)](0x9,_0x5314c5(_0x3b923a['$1']));},VisuMZ[_0x2db143(0x483)][_0x2db143(0x320)]=Game_Interpreter[_0x2db143(0x287)][_0x2db143(0x115)],Game_Interpreter['prototype'][_0x2db143(0x115)]=function(){const _0xfb6e53=_0x2db143,_0x2e3f08=$gameMap&&this[_0xfb6e53(0x50b)]?$gameMap[_0xfb6e53(0x124)](this['_eventId']):null;$gameTemp[_0xfb6e53(0x222)](_0x2e3f08);const _0x333f51=VisuMZ[_0xfb6e53(0x483)]['Game_Interpreter_executeCommand'][_0xfb6e53(0x3f0)](this);return $gameTemp[_0xfb6e53(0x214)](),_0x333f51;},VisuMZ['EventsMoveCore'][_0x2db143(0x316)]=Game_Interpreter['prototype'][_0x2db143(0x87)],Game_Interpreter[_0x2db143(0x287)]['command357']=function(_0xbf263e){const _0xe62b1=_0x2db143;return $gameTemp[_0xe62b1(0x4c3)](this),VisuMZ[_0xe62b1(0x483)]['Game_Interpreter_PluginCommand'][_0xe62b1(0x3f0)](this,_0xbf263e);},Game_Interpreter['prototype'][_0x2db143(0x318)]=function(_0x49d87a){const _0x443183=_0x2db143;this[_0x443183(0x26c)]=_0x49d87a;const _0x491231=_0x443183(0x49a)[_0x443183(0x183)](_0x49d87a[_0x443183(0x346)][_0x443183(0x349)](0x3));this[_0x443183(0x40e)]=_0x443183(0x4ed)+Graphics[_0x443183(0x74)]+'_'+this[_0x443183(0x2b5)](),DataManager[_0x443183(0xd1)](this[_0x443183(0x40e)],_0x491231);if(window[this['_callEventMap']])this[_0x443183(0x247)]();else{if(_0x443183(0x1c4)!==_0x443183(0x2ca))this[_0x443183(0x235)](_0x443183(0x3cf));else return this['processMoveRouteAnimation'](_0x3ecf9c(_0x524450['$1']));}},Game_Interpreter[_0x2db143(0x287)]['startCallEvent']=function(){const _0x573a26=_0x2db143,_0x306ef5=this[_0x573a26(0x26c)],_0x92a569=window[this[_0x573a26(0x40e)]],_0x24055d=_0x92a569[_0x573a26(0x4e5)][_0x306ef5[_0x573a26(0x2b5)]];if(_0x24055d&&_0x24055d[_0x573a26(0x4b7)][_0x306ef5[_0x573a26(0x121)]-0x1]){const _0x1b82e0=_0x24055d[_0x573a26(0x4b7)][_0x306ef5['pageId']-0x1][_0x573a26(0x388)];this['setupChild'](_0x1b82e0,this[_0x573a26(0x2b5)]());}window[this['_callEventMap']]=undefined,this['_callEventMap']=undefined,this[_0x573a26(0x26c)]=undefined;};function Game_CPCInterpreter(){const _0x5e1fad=_0x2db143;this[_0x5e1fad(0xbf)][_0x5e1fad(0x47a)](this,arguments);};Game_CPCInterpreter[_0x2db143(0x287)]=Object['create'](Game_Interpreter['prototype']),Game_CPCInterpreter[_0x2db143(0x287)]['constructor']=Game_CPCInterpreter,Game_CPCInterpreter[_0x2db143(0x287)][_0x2db143(0x17e)]=function(){const _0x48a521=_0x2db143;Game_Interpreter[_0x48a521(0x287)][_0x48a521(0x17e)][_0x48a521(0x3f0)](this),this['_cpc']=![];},Game_CPCInterpreter[_0x2db143(0x287)]['execute']=function(){const _0x58f14f=_0x2db143;while(this['isRunning']()){this[_0x58f14f(0x115)]();}},Game_CPCInterpreter[_0x2db143(0x287)][_0x2db143(0x504)]=function(_0x8ad2f1){const _0x2c8b18=_0x2db143;Game_Interpreter[_0x2c8b18(0x287)]['command108'][_0x2c8b18(0x3f0)](this,_0x8ad2f1);if(this[_0x2c8b18(0x19c)][_0x2c8b18(0x284)](_0x15bfba=>_0x15bfba[_0x2c8b18(0x474)](/<(?:CONDITION|CONDITIONS) MET>/i))){if('RawmD'===_0x2c8b18(0xa5)){if(_0x3ebf8a[_0x2c8b18(0x3ae)](this[_0x2c8b18(0x1d2)]))return;_0x37746b=_0x4d4c06[_0x2c8b18(0x17f)](0x0,0x7),this[_0x2c8b18(0x4a5)](this[_0x2c8b18(0x1d2)],_0x5c5ceb);}else this[_0x2c8b18(0x403)]=!![];}return!![];},VisuMZ[_0x2db143(0x483)]['Scene_Map_startEncounterEffect']=Scene_Map[_0x2db143(0x287)]['startEncounterEffect'],Scene_Map[_0x2db143(0x287)][_0x2db143(0x3cd)]=function(){const _0x5a9265=_0x2db143;VisuMZ['EventsMoveCore'][_0x5a9265(0x3fa)]['call'](this),this['_spriteset'][_0x5a9265(0x4a4)]();},VisuMZ['EventsMoveCore'][_0x2db143(0x2c6)]=Scene_Load[_0x2db143(0x287)]['onLoadSuccess'],Scene_Load['prototype'][_0x2db143(0x364)]=function(){const _0x1535fa=_0x2db143;if($gameMap)$gameMap[_0x1535fa(0x43d)]();VisuMZ['EventsMoveCore'][_0x1535fa(0x2c6)]['call'](this);},VisuMZ[_0x2db143(0x483)][_0x2db143(0x45f)]=Sprite_Character['prototype']['initMembers'],Sprite_Character[_0x2db143(0x287)][_0x2db143(0x40c)]=function(){const _0x4a0caa=_0x2db143;VisuMZ[_0x4a0caa(0x483)][_0x4a0caa(0x45f)][_0x4a0caa(0x3f0)](this),this[_0x4a0caa(0x4b3)](),this[_0x4a0caa(0x18b)]();},Sprite_Character[_0x2db143(0x287)][_0x2db143(0x4b3)]=function(){const _0x8b8b95=_0x2db143;this[_0x8b8b95(0x170)]=0xff;},Sprite_Character[_0x2db143(0x287)][_0x2db143(0x18b)]=function(){const _0x32947f=_0x2db143;this[_0x32947f(0x37d)]=new Sprite(),this[_0x32947f(0x37d)][_0x32947f(0x227)]=ImageManager['loadSystem'](_0x32947f(0x51e)),this['_eventIconSprite']['bitmap'][_0x32947f(0x30c)]=![],this[_0x32947f(0x37d)][_0x32947f(0x203)](0x0,0x0,0x0,0x0),this[_0x32947f(0x37d)][_0x32947f(0x371)]['x']=0.5,this['_eventIconSprite'][_0x32947f(0x371)]['y']=0x1,this['addChild'](this['_eventIconSprite']);},Sprite_Character[_0x2db143(0x287)][_0x2db143(0x44d)]=function(){const _0x5ab8a7=_0x2db143;return this[_0x5ab8a7(0x1d2)]&&this[_0x5ab8a7(0x1d2)][_0x5ab8a7(0x474)](/\[VS8\]/i);},Sprite_Character[_0x2db143(0x287)]['isAutoBufferIcon']=function(){const _0x1593b6=_0x2db143;return this[_0x1593b6(0x44d)]()&&VisuMZ[_0x1593b6(0x483)][_0x1593b6(0x516)][_0x1593b6(0x4ce)][_0x1593b6(0x44f)];},VisuMZ[_0x2db143(0x483)]['Sprite_Character_update']=Sprite_Character['prototype'][_0x2db143(0x4e4)],Sprite_Character[_0x2db143(0x287)]['update']=function(){const _0x4c9b8d=_0x2db143;VisuMZ['EventsMoveCore'][_0x4c9b8d(0x1bc)]['call'](this);if(VisuMZ[_0x4c9b8d(0x483)]['Settings'][_0x4c9b8d(0x496)]['EnableDashTilt']){if(_0x4c9b8d(0x333)===_0x4c9b8d(0x333))this[_0x4c9b8d(0x16b)]();else{if(this===_0x3a373b)return;const _0x58c0f1=[this[_0x4c9b8d(0x9d)],this['_eventId'],_0x4c9b8d(0x3c3)[_0x4c9b8d(0x183)](_0x5ef7a3)];_0x5c73b7[_0x4c9b8d(0x172)](_0x58c0f1,_0x16121d(_0x1161f2));}}this[_0x4c9b8d(0x380)]&&this[_0x4c9b8d(0x36a)](),this[_0x4c9b8d(0x37d)]&&(_0x4c9b8d(0x3e6)===_0x4c9b8d(0x3e6)?this['updateEventIconSprite']():(_0x41aa08=_0x5ebc0a[_0x4c9b8d(0x2ae)](_0x446f99),_0x42fac0[_0x4c9b8d(0x483)][_0x4c9b8d(0x3b9)][_0x4c9b8d(0x3f0)](this,_0x54d945)));},VisuMZ[_0x2db143(0x483)][_0x2db143(0x3a8)]=Sprite_Character[_0x2db143(0x287)][_0x2db143(0x2a1)],Sprite_Character[_0x2db143(0x287)]['setTileBitmap']=function(){const _0x2921ab=_0x2db143;VisuMZ[_0x2921ab(0x483)][_0x2921ab(0x3a8)][_0x2921ab(0x3f0)](this),this[_0x2921ab(0x227)][_0x2921ab(0x4a6)](this['updateBitmapSmoothing'][_0x2921ab(0x4a0)](this));},VisuMZ[_0x2db143(0x483)]['Sprite_Character_setCharacterBitmap']=Sprite_Character['prototype'][_0x2db143(0x1eb)],Sprite_Character['prototype']['setCharacterBitmap']=function(){const _0x3c756d=_0x2db143;VisuMZ['EventsMoveCore'][_0x3c756d(0x38a)][_0x3c756d(0x3f0)](this),this[_0x3c756d(0x227)][_0x3c756d(0x4a6)](this[_0x3c756d(0x29a)][_0x3c756d(0x4a0)](this));},Sprite_Character[_0x2db143(0x287)]['updateBitmapSmoothing']=function(){const _0x105915=_0x2db143;if(!this[_0x105915(0x227)])return;this['bitmap'][_0x105915(0x30c)]=!!VisuMZ[_0x105915(0x483)]['Settings'][_0x105915(0x496)][_0x105915(0xd5)];},VisuMZ['EventsMoveCore'][_0x2db143(0x352)]=Sprite_Character[_0x2db143(0x287)][_0x2db143(0xc8)],Sprite_Character[_0x2db143(0x287)][_0x2db143(0xc8)]=function(){const _0x1a14cd=_0x2db143;return this['isSpriteVS8dir']()?this[_0x1a14cd(0x2e0)]():VisuMZ[_0x1a14cd(0x483)]['Sprite_Character_characterPatternY'][_0x1a14cd(0x3f0)](this);},Sprite_Character[_0x2db143(0x287)][_0x2db143(0x2e0)]=function(){const _0x2081bc=this['_character']['direction'](),_0x1a0771=[0x2,0x2,0x2,0x4,0x4,0x2,0x6,0x6,0x8,0x8];return(_0x1a0771[_0x2081bc]-0x2)/0x2;},Sprite_Character[_0x2db143(0x287)][_0x2db143(0x16b)]=function(){const _0x3fc67a=_0x2db143;this[_0x3fc67a(0x25f)]=0x0;if(this['isAllowCharacterTilt']()){if(_0x3fc67a(0x240)!==_0x3fc67a(0xc5)){const _0x5996f5=VisuMZ[_0x3fc67a(0x483)][_0x3fc67a(0x516)]['Movement'],_0x14354f=this[_0x3fc67a(0x51b)][_0x3fc67a(0x453)]();let _0xa9fccf=0x0;if([0x1,0x4,0x7][_0x3fc67a(0x2c8)](_0x14354f))_0xa9fccf=_0x5996f5[_0x3fc67a(0x1a9)];if([0x3,0x6,0x9]['includes'](_0x14354f))_0xa9fccf=_0x5996f5[_0x3fc67a(0x477)];if([0x2,0x8]['includes'](_0x14354f)){if(_0x3fc67a(0xdf)===_0x3fc67a(0xdf))_0xa9fccf=[-_0x5996f5[_0x3fc67a(0x454)],0x0,_0x5996f5[_0x3fc67a(0x454)]][this[_0x3fc67a(0x51b)][_0x3fc67a(0x2ab)]()];else{if(this[_0x3fc67a(0x360)]===_0x28e28f)this['initEventsMoveCore']();if(!_0x214cbb)return;const _0x162df4=_0x3fc67a(0x47c)[_0x3fc67a(0x183)](_0x1a6f37[_0x3fc67a(0x9d)],_0x5f234b[_0x3fc67a(0x50b)]);this[_0x3fc67a(0x360)][_0x162df4]={'direction':_0x391419[_0x3fc67a(0x453)](),'x':_0xe07185[_0x3fc67a(0x379)](_0xa2f5dd['x']),'y':_0x35cb6d[_0x3fc67a(0x379)](_0x3dccda['y']),'pageIndex':_0x2ad89b[_0x3fc67a(0x245)],'moveRouteIndex':_0x2eaaad['_moveRouteIndex']};}}if(this['_reflection'])_0xa9fccf*=-0x1;this['rotation']=_0xa9fccf;}else return this[_0x3fc67a(0x372)](_0x407479);}},Sprite_Character[_0x2db143(0x287)][_0x2db143(0x160)]=function(){const _0x7d9053=_0x2db143;if(this[_0x7d9053(0x100)])return![];return this[_0x7d9053(0x51b)]['isDashingAndMoving']()&&!this['_character'][_0x7d9053(0x31a)]()&&!this[_0x7d9053(0x51b)][_0x7d9053(0x285)]()&&this['getEventIconIndex']()===0x0;},Sprite_Character[_0x2db143(0x287)][_0x2db143(0x36a)]=function(){const _0xf1adc0=_0x2db143;this[_0xf1adc0(0x380)]['x']=this[_0xf1adc0(0x51b)][_0xf1adc0(0x276)](),this[_0xf1adc0(0x380)]['y']=this['_character']['shadowY'](),this[_0xf1adc0(0x380)][_0xf1adc0(0x10f)]=this['opacity'],this['_shadowSprite'][_0xf1adc0(0x22a)]=this[_0xf1adc0(0x51b)][_0xf1adc0(0x2e4)](),this[_0xf1adc0(0x380)][_0xf1adc0(0x397)]=this[_0xf1adc0(0x397)];if(!this[_0xf1adc0(0x51b)][_0xf1adc0(0x271)]()){if(_0xf1adc0(0x92)!==_0xf1adc0(0x92)){if(_0x2a12dd)this['moveTowardPoint'](_0x5ed10e['x'],_0x455730['y']);}else this[_0xf1adc0(0x380)][_0xf1adc0(0x200)]['x']=Math[_0xf1adc0(0x234)](0x1,this[_0xf1adc0(0x380)]['scale']['x']+0.1),this[_0xf1adc0(0x380)][_0xf1adc0(0x200)]['y']=Math[_0xf1adc0(0x234)](0x1,this[_0xf1adc0(0x380)][_0xf1adc0(0x200)]['y']+0.1);}else this[_0xf1adc0(0x380)]['scale']['x']=Math[_0xf1adc0(0x315)](0x0,this[_0xf1adc0(0x380)][_0xf1adc0(0x200)]['x']-0.1),this[_0xf1adc0(0x380)][_0xf1adc0(0x200)]['y']=Math[_0xf1adc0(0x315)](0x0,this[_0xf1adc0(0x380)][_0xf1adc0(0x200)]['y']-0.1);},Sprite_Character['prototype']['updateEventIconSprite']=function(){const _0x208d01=_0x2db143,_0x32c393=this[_0x208d01(0x37d)],_0xa89802=this['getEventIconIndex']();if(_0xa89802<=0x0){if(_0x208d01(0x3c0)===_0x208d01(0x1dd))this['_spriteOffsetX']=_0x2ec707(_0x5453af['$1']);else return _0x32c393[_0x208d01(0x203)](0x0,0x0,0x0,0x0);}else{const _0x26126f=ImageManager[_0x208d01(0x420)],_0x2cda9b=ImageManager['iconHeight'],_0x372a2=_0xa89802%0x10*_0x26126f,_0x58cdf9=Math[_0x208d01(0x43c)](_0xa89802/0x10)*_0x2cda9b;_0x32c393['setFrame'](_0x372a2,_0x58cdf9,_0x26126f,_0x2cda9b),this[_0x208d01(0x22a)]=!![];}const _0x14cf07=this['_character'][_0x208d01(0x43f)]();this[_0x208d01(0x33c)]()?this['autoEventIconBuffer'](_0x32c393):(_0x32c393['x']=_0x14cf07?_0x14cf07[_0x208d01(0x4c9)]:0x0,_0x32c393['y']=_0x14cf07?-this[_0x208d01(0x341)]+_0x14cf07[_0x208d01(0x42e)]:0x0),_0x32c393['blendMode']=_0x14cf07?_0x14cf07[_0x208d01(0x269)]:0x0,this[_0x208d01(0x2d6)](_0x32c393),this['addChild'](_0x32c393),_0x32c393[_0x208d01(0x25f)]=-this['rotation'];},Sprite_Character[_0x2db143(0x287)][_0x2db143(0x517)]=function(_0x4d23e3){const _0x2d103a=_0x2db143;_0x4d23e3['x']=0x0,_0x4d23e3['y']=-this['height']+this['height']*0x2/0x5,this[_0x2d103a(0x51b)][_0x2d103a(0x2ab)]()!==0x1&&('dHWyy'==='VkSOP'?(_0x24d25e=_0x56cab5(_0x36954d['$1']),_0x3cfab4=_0x2bf8cf(_0x1ebf6d['$2'])):_0x4d23e3['y']+=0x1);},Sprite_Character[_0x2db143(0x287)][_0x2db143(0x430)]=function(){const _0x238d6b=_0x2db143;if(!this[_0x238d6b(0x51b)])return 0x0;if(this[_0x238d6b(0x51b)]['_erased'])return 0x0;const _0x90c021=this[_0x238d6b(0x51b)][_0x238d6b(0x43f)]();return _0x90c021?_0x90c021['iconIndex']||0x0:0x0;},VisuMZ[_0x2db143(0x483)][_0x2db143(0x16f)]=Sprite_Balloon[_0x2db143(0x287)][_0x2db143(0x41a)],Sprite_Balloon[_0x2db143(0x287)][_0x2db143(0x41a)]=function(_0x516601,_0x1c6508){const _0x1b6884=_0x2db143;VisuMZ['EventsMoveCore'][_0x1b6884(0x16f)][_0x1b6884(0x3f0)](this,_0x516601,_0x1c6508),VisuMZ['EventsMoveCore'][_0x1b6884(0x516)]['VS8'][_0x1b6884(0x321)]&&(_0x1b6884(0x19e)===_0x1b6884(0x19e)?this['_target']['_character'][_0x1b6884(0x197)](_0x1c6508,this[_0x1b6884(0x1ab)]):this[_0x1b6884(0x105)](_0x1b4378,!![]));},VisuMZ[_0x2db143(0x483)][_0x2db143(0x414)]=Sprite_Balloon[_0x2db143(0x287)]['updatePosition'],Sprite_Balloon['prototype'][_0x2db143(0x42a)]=function(){const _0x2ab051=_0x2db143;VisuMZ[_0x2ab051(0x483)]['Sprite_Balloon_updatePosition'][_0x2ab051(0x3f0)](this),this[_0x2ab051(0x119)]();},Sprite_Balloon[_0x2db143(0x287)][_0x2db143(0x119)]=function(){const _0x5e99e9=_0x2db143;this['_target'][_0x5e99e9(0x51b)][_0x5e99e9(0x44d)]()&&(this['x']+=VisuMZ[_0x5e99e9(0x483)][_0x5e99e9(0x516)][_0x5e99e9(0x4ce)][_0x5e99e9(0x223)],this['y']+=VisuMZ[_0x5e99e9(0x483)][_0x5e99e9(0x516)][_0x5e99e9(0x4ce)][_0x5e99e9(0x1f8)]);},Sprite_Timer['prototype'][_0x2db143(0x32c)]=function(){const _0x4a2af5=_0x2db143;this['bitmap']=new Bitmap(Math[_0x4a2af5(0x379)](Graphics[_0x4a2af5(0x16e)]/0x2),0x30),this[_0x4a2af5(0x227)]['fontFace']=this[_0x4a2af5(0x344)](),this[_0x4a2af5(0x227)][_0x4a2af5(0x3fb)]=this[_0x4a2af5(0x3fb)](),this[_0x4a2af5(0x227)][_0x4a2af5(0x4d3)]=ColorManager['outlineColor']();},Sprite_Timer[_0x2db143(0x287)][_0x2db143(0x461)]=function(){const _0x19f7d5=_0x2db143,_0x194ca4=Math['floor'](this[_0x19f7d5(0x4d5)]/0x3c/0x3c),_0x2db87e=Math[_0x19f7d5(0x43c)](this['_seconds']/0x3c)%0x3c,_0x3af8e8=this[_0x19f7d5(0x4d5)]%0x3c;let _0x49f674=_0x2db87e['padZero'](0x2)+':'+_0x3af8e8[_0x19f7d5(0x349)](0x2);if(_0x194ca4>0x0)_0x49f674='%1:%2'['format'](_0x194ca4,_0x49f674);return _0x49f674;},VisuMZ[_0x2db143(0x483)][_0x2db143(0xe5)]=Spriteset_Map[_0x2db143(0x287)][_0x2db143(0x196)],Spriteset_Map[_0x2db143(0x287)][_0x2db143(0x196)]=function(){const _0x49efc1=_0x2db143;VisuMZ[_0x49efc1(0x483)][_0x49efc1(0xe5)][_0x49efc1(0x3f0)](this),this[_0x49efc1(0x343)]();},VisuMZ[_0x2db143(0x483)][_0x2db143(0xad)]=Spriteset_Map[_0x2db143(0x287)][_0x2db143(0x28b)],Spriteset_Map['prototype'][_0x2db143(0x28b)]=function(){const _0x20d03d=_0x2db143;VisuMZ[_0x20d03d(0x483)]['Spriteset_Map_createShadow'][_0x20d03d(0x3f0)](this),this[_0x20d03d(0x3bc)]();},Spriteset_Map[_0x2db143(0x287)]['createShadows']=function(){const _0x245703=_0x2db143;if(!VisuMZ[_0x245703(0x483)][_0x245703(0x516)]['Movement'][_0x245703(0x456)])return;for(const _0x32eb27 of this[_0x245703(0x258)]){if(_0x245703(0x2cf)==='dGRkG')return _0x517453[_0x245703(0x483)][_0x245703(0x2be)][_0x245703(0x3f0)](this);else this[_0x245703(0x259)](_0x32eb27);}},Spriteset_Map[_0x2db143(0x287)]['createCharacterShadow']=function(_0x28d12d){const _0x246f72=_0x2db143;_0x28d12d[_0x246f72(0x380)]=new Sprite(),_0x28d12d[_0x246f72(0x380)][_0x246f72(0x9a)]=_0x28d12d[_0x246f72(0x51b)][_0x246f72(0x3f4)](),_0x28d12d[_0x246f72(0x380)]['bitmap']=ImageManager[_0x246f72(0x4bb)](_0x28d12d[_0x246f72(0x380)][_0x246f72(0x9a)]),_0x28d12d['_shadowSprite']['anchor']['x']=0.5,_0x28d12d['_shadowSprite'][_0x246f72(0x371)]['y']=0x1,_0x28d12d[_0x246f72(0x380)]['z']=0x0,this[_0x246f72(0x4a7)][_0x246f72(0xc2)](_0x28d12d['_shadowSprite']);},Spriteset_Map['prototype'][_0x2db143(0x4a4)]=function(){const _0x2545f8=_0x2db143;if(!VisuMZ[_0x2545f8(0x483)][_0x2545f8(0x516)][_0x2545f8(0x496)][_0x2545f8(0x456)])return;for(const _0x3a771e of this[_0x2545f8(0x258)]){if(_0x2545f8(0x4e1)==='SFAKn')this['_tilemap'][_0x2545f8(0x2d6)](_0x3a771e['_shadowSprite']);else{if(!_0x21041f[_0x2545f8(0x483)][_0x2545f8(0x516)]['Movement'][_0x2545f8(0x456)])return;for(const _0x11497c of this[_0x2545f8(0x258)]){this[_0x2545f8(0x4a7)][_0x2545f8(0x2d6)](_0x11497c[_0x2545f8(0x380)]);}}}},Spriteset_Map['prototype'][_0x2db143(0x343)]=function(){const _0x101a87=_0x2db143;this[_0x101a87(0x3e8)]=[];for(const _0x508ba7 of $gameMap[_0x101a87(0x4e5)]()){this[_0x101a87(0x232)](_0x508ba7);}},Spriteset_Map[_0x2db143(0x287)][_0x2db143(0x232)]=function(_0x5762c4){const _0x270b6a=_0x2db143;if(!this['isTargetEventValidForLabelWindow'](_0x5762c4))return;const _0x56ee15=new Window_EventLabel(_0x5762c4);_0x56ee15['z']=0x8,_0x56ee15['spriteId']=Sprite['_counter']++,this[_0x270b6a(0x4a7)][_0x270b6a(0xc2)](_0x56ee15),this[_0x270b6a(0x3e8)][_0x270b6a(0xec)](_0x56ee15);},Spriteset_Map[_0x2db143(0x287)][_0x2db143(0x488)]=function(_0x129740){const _0x278a41=_0x2db143,_0x18ef41=_0x129740[_0x278a41(0x124)]();if(_0x18ef41['note'][_0x278a41(0x474)](/<LABEL:[ ](.*?)>/i))return!![];if(_0x18ef41['note'][_0x278a41(0x474)](/<LABEL>\s*([\s\S]*)\s*<\/LABEL>/i))return!![];for(const _0x594a19 of _0x18ef41['pages']){let _0x299f44='';for(const _0x3ba46a of _0x594a19[_0x278a41(0x388)]){[0x6c,0x198][_0x278a41(0x2c8)](_0x3ba46a['code'])&&(_0x299f44+=_0x3ba46a['parameters'][0x0]);}if(_0x299f44[_0x278a41(0x474)](/<LABEL:[ ](.*?)>/i))return!![];if(_0x299f44['match'](/<LABEL>\s*([\s\S]*)\s*<\/LABEL>/i)){if(_0x278a41(0xf3)!=='mmGzI')return!![];else{if(_0x2dfe01[_0x278a41(0x199)]())_0x5522fd['log'](_0x3d1910);}}}return![];},Spriteset_Map[_0x2db143(0x287)][_0x2db143(0x369)]=function(_0xe23123){const _0x4ec0ae=_0x2db143;this['_characterSprites']=this[_0x4ec0ae(0x258)]||[];const _0x1020fb=new Sprite_Character(_0xe23123);this[_0x4ec0ae(0x258)][_0x4ec0ae(0xec)](_0x1020fb),this[_0x4ec0ae(0x4a7)][_0x4ec0ae(0xc2)](_0x1020fb),this[_0x4ec0ae(0x259)](_0x1020fb),this[_0x4ec0ae(0x232)](_0xe23123),_0x1020fb[_0x4ec0ae(0x4e4)]();},VisuMZ[_0x2db143(0x483)][_0x2db143(0x34d)]=Game_Message[_0x2db143(0x287)][_0x2db143(0x208)],Game_Message[_0x2db143(0x287)][_0x2db143(0x208)]=function(_0x640d1,_0x5aa523){const _0x51a33c=_0x2db143;this[_0x51a33c(0xc6)]=$gameTemp[_0x51a33c(0x3a7)](),VisuMZ[_0x51a33c(0x483)][_0x51a33c(0x34d)][_0x51a33c(0x3f0)](this,_0x640d1,_0x5aa523);},VisuMZ[_0x2db143(0x483)][_0x2db143(0x3b0)]=Window_NumberInput['prototype'][_0x2db143(0x114)],Window_NumberInput['prototype'][_0x2db143(0x114)]=function(){const _0x45ccf7=_0x2db143;$gameTemp[_0x45ccf7(0x222)]($gameMessage[_0x45ccf7(0xc6)]),VisuMZ['EventsMoveCore']['Window_NumberInput_start']['call'](this),$gameTemp[_0x45ccf7(0x214)]();},VisuMZ['EventsMoveCore'][_0x2db143(0x153)]=Window_NumberInput[_0x2db143(0x287)]['processOk'],Window_NumberInput[_0x2db143(0x287)][_0x2db143(0x4d1)]=function(){const _0x44f276=_0x2db143;$gameTemp[_0x44f276(0x222)]($gameMessage[_0x44f276(0xc6)]),VisuMZ[_0x44f276(0x483)]['Window_NumberInput_processOk'][_0x44f276(0x3f0)](this),$gameTemp[_0x44f276(0x214)](),$gameMessage[_0x44f276(0xc6)]=undefined;},VisuMZ['EventsMoveCore']['Game_Message_setItemChoice']=Game_Message[_0x2db143(0x287)]['setItemChoice'],Game_Message['prototype'][_0x2db143(0x519)]=function(_0x356cb6,_0x3a23a4){const _0x102705=_0x2db143;this['_selfTargetItemChoice']=$gameTemp['getSelfTarget'](),VisuMZ[_0x102705(0x483)]['Game_Message_setItemChoice']['call'](this,_0x356cb6,_0x3a23a4);},VisuMZ[_0x2db143(0x483)][_0x2db143(0x2d5)]=Window_EventItem[_0x2db143(0x287)][_0x2db143(0xcb)],Window_EventItem[_0x2db143(0x287)][_0x2db143(0xcb)]=function(){const _0x1d9ae5=_0x2db143;$gameTemp[_0x1d9ae5(0x222)]($gameMessage[_0x1d9ae5(0x1c2)]),VisuMZ[_0x1d9ae5(0x483)][_0x1d9ae5(0x2d5)][_0x1d9ae5(0x3f0)](this),$gameTemp[_0x1d9ae5(0x214)](),$gameMessage[_0x1d9ae5(0x1c2)]=undefined;},VisuMZ[_0x2db143(0x483)][_0x2db143(0x1e7)]=Window_EventItem[_0x2db143(0x287)][_0x2db143(0x34a)],Window_EventItem[_0x2db143(0x287)]['onCancel']=function(){const _0x2a700e=_0x2db143;$gameTemp['registerSelfTarget']($gameMessage[_0x2a700e(0x1c2)]),VisuMZ[_0x2a700e(0x483)][_0x2a700e(0x1e7)]['call'](this),$gameTemp[_0x2a700e(0x214)](),$gameMessage[_0x2a700e(0x1c2)]=undefined;},VisuMZ[_0x2db143(0x483)][_0x2db143(0x186)]=Window_Message[_0x2db143(0x287)][_0x2db143(0x4c1)],Window_Message[_0x2db143(0x287)][_0x2db143(0x4c1)]=function(){const _0x56138b=_0x2db143;$gameMessage[_0x56138b(0x1dc)](),VisuMZ[_0x56138b(0x483)][_0x56138b(0x186)][_0x56138b(0x3f0)](this),$gameTemp[_0x56138b(0x214)]();},VisuMZ[_0x2db143(0x483)][_0x2db143(0xc7)]=Window_ScrollText[_0x2db143(0x287)][_0x2db143(0x4c1)],Window_ScrollText[_0x2db143(0x287)][_0x2db143(0x4c1)]=function(){const _0x3ac76e=_0x2db143;$gameMessage[_0x3ac76e(0x1dc)](),VisuMZ[_0x3ac76e(0x483)][_0x3ac76e(0xc7)][_0x3ac76e(0x3f0)](this),$gameTemp[_0x3ac76e(0x214)]();};function Window_EventLabel(){this['initialize'](...arguments);}function _0x5a59(){const _0x3f951b=['fontFace','getDirectionFromPoint','mapId','DOWN','metCPC','padZero','onCancel','execute','isWorking','Game_Message_setNumberInput','_randomMoveWeight','innerWidth','add','processMoveRouteHugWall','Sprite_Character_characterPatternY','deleteEventLocation','standing','_periodicRefreshTimer','deltaYFrom','resizeWindow','Icon','kWRVY','iconIndex','Step1EventId','useCarryPoseForIcons','_CPCs','LEFT\x20TO\x20RIGHT','_EventsMoveCoreSettings','_SavedEventLocations','initEventsMoveCoreSettings','Game_Timer_onExpire','QhBoO','onLoadSuccess','_DisablePlayerControl','switches','setPattern','findDiagonalDirectionTo','createSpawnedEvent','updateShadow','defaultFontSize','_commonEventId','LYVpk','drawTextEx','isValid','processMoveCommandEventsMoveCore','anchor','selfValue','_shadowGraphic','Step1MapId','_spriteOffsetX','mirror\x20horz','VehicleForbid','prepareSpawnedEventAtXY','round','_randomHomeX','setupSaveEventLocations','_target','_eventIconSprite','status','SuccessSwitchId','_shadowSprite','indexOf','isPassable','wLDZE','windowPadding','parent','_eventCache','visibleRange','list','parallelCommonEvents','Sprite_Character_setCharacterBitmap','processMoveRouteJumpToCharacter','_spriteset','PlayerIconChange','eBYai','vimrZ','opacitySpeed','mimic','createSaveEventLocationData','checkEventsMoveCoreStringTags','getPose','PreloadedMaps','variables','_hidden','string','ZZZ','return\x20%1','qbiar','wgerV','_moveSpeed','pHWAK','Game_Event_start','cToJh','updateWaitMode','DRlBe','isBattleTest','SPIN\x20CLOCKWISE','VisibleEventLabels','value','getSelfTarget','Sprite_Character_setTileBitmap','createContents','regionList','eyrQr','isPreventSelfMovement','updatePattern','isBigCharacter','Scene_Boot_onDatabaseLoaded','Window_NumberInput_start','requestRefresh','textSizeEx','_saveEventLocations','setDashingEnabled','bLrrB','despawnTerrainTags','kxNgA','MRDVh','Game_Character_forceMoveRoute','setupMorphEvent','_eventScreenY','createShadows','lqGvD','yeUWH','setupDiagonalSupport','vouyW','getSavedEventLocation','_clickTrigger','Self\x20Variable\x20%1','Game_Event_updateParallel','Rope','isTile','AJpAp','MUSIC\x20NOTE','YMmBE','splice','cEkMT','setFrames','startEncounterEffect','getControlledFollowerID','CallEvent','iconSize','prepareSpawnedEventAtTerrainTag','hFfZH','updatePatternEventsMoveCore','SPIN\x20ANTICLOCKWISE','FollowerID','isSupportDiagonalMovement','PreMorphJS','MapID','isCollidedWithEvents','IcCEh','processMoveRouteAnimation','Game_CharacterBase_canPass','isRegionDockable','_labelWindow','hasMoveOnlyRegions','AutoMoveEvents','SYmRj','variableId','Walk','aKqaz','RhZtI','jeuAB','ROUTE_SCRIPT','_labelWindows','SelfSwitchABCD','isAirshipPassable','UvIkI','jumpHeight','setPlayerDiagonalSetting','_saveEventLocation','characterIndexVS8','call','deleteSavedEventLocationKey','moveRouteIndex','_working','shadowFilename','clearDashing','MapId','uUGLV','SPIN\x20CW','3441452gggFAH','Scene_Map_startEncounterEffect','fontSize','Letter','FontSize','updateRoutineMove','autosaveEventLocation','FRUSTRATION','initFollowerController','wQEye','_cpc','Game_Event_findProperPageIndex','_inputTime','yxVus','checkEventTriggerHere','PtYtL','_pattern','KdjWN','_vehicleType','initMembers','isMoveOnlyRegionPassable','_callEventMap','processMoveSynch','initMoveSpeed','SLEEP','Game_Event_clearPageSettings','canStartLocalEvents','Sprite_Balloon_updatePosition','rhMnZ','_counter','EventLocationSave','parse','setEventIconData','setup','needsUpdate','switch2Valid','Ciosp','ZKJUH','Game_SelfSwitches_value','iconWidth','UNTITLED','EXCLAMATION','RegionTouch','GadIE','hLhXt','isDestinationValid','updateShadowChanges','setupEventsMoveCoreNotetags','SpawnEventDespawnTerrainTags','updatePosition','ygZFj','Game_Map_unlockEvent','nKOfJ','bufferY','setDiagonalDirection','getEventIconIndex','restoreSavedEventPosition','Game_CharacterBase_screenX','NNybI','Game_Event_setupPageSettings','_spawnedEvents','LIGHT-BULB','lastSpawnedEventID','Enable','_moveOnlyRegions','Visibility','hqxhk','floor','clearEventCache','setEventIconDataKey','getEventIconData','nMqVM','checkCollisionKeywords','ErqOT','DcBNj','StopAutoMoveMessages','isMovementSucceeded','isInVehicle','USER-DEFINED\x205','GMHtL','setupSpawn','Game_Player_isDashing','KvKkt','isSaveEventLocations','isSpriteVS8dir','KNEEL','AutoBuffer','initEventsMoveCoreEffects','process_VisuMZ_EventsMoveCore_Switches_Variables','AdvancedVariables','direction','TiltVert','_transparent','ShowShadows','DYRgT','turnAwayFromCharacter','BoatSpeed','_lastMovedDirection','_eventOverload','width','ANLvT','lineHeight','Sprite_Character_initMembers','Game_Character_setMoveRoute','timerText','blt','dashSpeedModifier','_eventIcon','loadCPC','hasDragonbones','absDistance','SpawnEventDespawnAtXY','_text','destinationX','_eventMorphData','PostCopyJS','EventLocationDelete','CommonEventID','SWEAT','isEventTest','Game_CharacterBase_characterIndex','isNormalPriority','_visibleEventY','match','wShEB','convertSelfVariableValuesInScriptCall','TiltRight','Game_Event_moveTypeRandom','286030VxiJMw','apply','_eventPageIndex','Map%1-Event%2','refreshIfNeeded','FastForwardKey','uhVCr','deletePreservedMorphEventDataKey','processMoveSynchCustom','_visiblePlayerX','EventsMoveCore','Game_Message_add','TiXyH','requestBalloon','EnableDir8','isTargetEventValidForLabelWindow','Wozlv','gccEQ','forceDashing','Region','distance','VICTORY','iFzNR','Game_Event_checkEventTriggerAuto','locate','_regionRules','processMoveRouteTeleportTo','PreloadMaps','MessageCore','Movement','eTTpQ','updateText','PosX','Map%1.json','slice','yKtfa','isPlayerControlDisabled','setOpacity','flgPs','bind','deltaXFrom','Chase','IefVr','hideShadows','setImage','addLoadListener','_tilemap','Game_SelfSwitches_setValue','EventTimerFramesSet','process_VisuMZ_EventsMoveCore_LoadTemplateMaps','_eventCopyData','spawnPreserved','SpawnEventAtXY','SelfVariables','MUSIC','isDashingAndMoving','_frames','Collision','initMembersEventsMoveCore','findDirectionTo','updateOpacity','note','pages','Seconds','posNt','RIGHT\x20TO\x20LEFT','loadSystem','CPC','omdxk','hasStepAnime','_stepPattern','randomInt','startMessage','name','setLastPluginCommandInterpreter','page','ARRAYSTR','RCfSy','MbPBo','Game_Map_update','bufferX','RemovePreserve','hasEventIcon','processMoveRouteMoveRepeat','Disable','VS8','turnAwayFromPoint','IDyEz','processOk','EGvvc','outlineColor','isAllowEventAutoMovement','_seconds','EventForbid','nEeYG','_visibleEventX','giqqm','gainFrames','EventTimerSpeed','Game_CharacterBase_increaseSteps','36KeeSJH','Game_Event_initialize','Visible','zoomScale','SFAKn','Game_Map_setupEvents','Game_Event_meetsConditions','update','events','RegionOkTarget','iGIET','Game_CharacterBase_setDirection','moveTowardPoint','LOVE','DefaultShadow','_cacheVisibility','$callEventMap','EventID','STRUCT','isMapPassable','VariableId','MNoOw','EHdiB','iconHeight','screenX','Game_Variables_setValue','exit','OffsetX','_forceDashing','unlock','LsLzr','pause','processMoveRouteTeleportToCharacter','roundYWithDirection','SPIN\x20ACW','EventTemplates','Passability','jWIkm','advancedValue','command108','XoIvy','SlowerSpeed','processMoveRoutePatternLock','EZBxO','setupCopyEvent','processMoveRouteStepTo','_eventId','kqtwe','meetActivationProximityConditions','moveByInput','FUNC','Forbid','moveForward','Region%1','concat','USER-DEFINED\x202','LIGHT','Settings','autoEventIconBuffer','Game_CharacterBase_initMembers','setItemChoice','gHrGN','_character','qlhVf','IconIndex','IconSet','AllAllow','replace','isSelfVariable','kVESH','Game_CharacterBase_hasStepAnime','character','frameCount','isSpawnHitboxCollisionOk','MorphEventRemove','List','meetsConditions','JBzEo','USER-DEFINED\x203','ALbEu','savePreservedMorphEventDataKey','AnoZa','reverse','isPassableByAnyDirection','Game_CharacterBase_moveDiagonally','brQzS','BULB','HiMEE','VisuMZ_2_DragonbonesUnion','AqKlH','BlendMode','command357','TerrainTags','processMoveRouteStepToCharacter','moveAwayFromPoint','isLabelVisible','Rftdc','PTuMA','STR','DashModifier','PUjxY','_lastPluginCommandInterpreter','HBPhx','saveEventLocation','canPass','gnQPr','setupEventsMoveCoreEffects','cVisZ','_eventOverloadThreshold','adjustDir8MovementSpeed','_filename','clearStepPattern','_forceCarrying','_mapId','destinationY','Hidden','_activationProximity','Setting','DashingEnable','SelfSwitches','SpawnEventDespawnEventID','gkiEV','realMoveSpeed','StrictCollision','tzSab','reserveCommonEvent','Game_Follower_initialize','tYOPQ','isDashing','Spriteset_Map_createShadow','Self\x20Switch\x20%1','removeTemporaryMapSpawnedEvents','StopAutoMoveEvents','turnTowardPoint','TerrainTag','BcoJT','Game_System_initialize','isBusy','processMoveSynchRandom','FollowerSetTargetChase','RIpnU','processMoveRouteStepFrom','processMoveRouteFadeOut','MlWQD','reverse\x20copy','bqgYG','BtPSt','initialize','5575514sfMwOl','switchId','addChild','EventTimerExpireEvent','QLtCv','PIhiU','_selfTargetNumberInput','Window_ScrollText_startMessage','characterPatternY','VehicleAllow','getInputDir8','onOk','FgDZf','_spawnPreserved','oTLgf','processMoveRouteSelfSwitch','down','loadDataFile','hasClickTrigger','SCREEN','BufferX','BitmapSmoothing','moveSynchTarget','isSpawnedEvent','eventsXyNt','Game_Troop_meetsConditions','InMvs','%1Allow','setMoveSpeed','isCollidedWithPlayerCharacters','CustomPageConditions','yAstx','Game_Vehicle_isLandOk','uHFOx','parameters','Game_CharacterBase_direction','JyQfo','Spriteset_Map_createLowerLayer','_followerControlID','DDYsc','setupPageSettings','TurnInPlaceDelay','processMoveSynchApproach','$preloadedMap_%1','push','moveBackToRandomHome','15659110BaxPjM','description','Game_CharacterBase_screenY','Game_Timer_initialize','chaseCharacter','uWKMu','1033332vhwNsk','deleteIconsOnEventsData','backY','EnableTurnInPlace','deltaY','fhMKT','SPIN\x20CCW','hBKuz','Vehicle','boat','startMapCommonEventOnOK','Game_Event_updateSelfMovement','_dragonbones','moveSynchType','startMapCommonEventOnTouch','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','enable','morphIntoTemplate','WngJR','despawnAtXY','log','zXVsc','column','fittingHeight','setMovementSuccess','getPosingCharacterIndex','setDirection','opacity','processMoveSynchReverseMimic','Game_Troop_meetsConditionsCPC','%1%2','_erased','start','executeCommand','_needsPeriodicRefresh','CPCsMet','checkEventTriggerEventsMoveCore','updateVS8BalloonOffsets','mirror\x20horizontal','AllForbid','FollowerSetGlobalChase','UTOSV','Label','FzZvi','_followerChaseOff','pageId','_scene','processMoveRouteMoveTo','event','QaDFl','_pose','airship','FavorHorz','type','eventLabelsVisible','toLowerCase','MUSIC-NOTE','constructor','erase','SwitchGetSelfSwitchID','HWUvK','QyWet','_visiblePlayerY','region','setSelfValue','Game_Interpreter_character','setControlledFollowerID','_screenZoomScale','PlayerAllow','_spawnData','DashEnableToggle','stop','getPreservedMorphEventData','checkActivationProximity','QUESTION','Speed','YyeAh','length','activationRegionList','GWdLP','lastSpawnedEvent','325775PhqQXQ','JSON','jZrLl','Game_Timer_start','reverse\x20mimic','canPassDiagonally','characterName','Game_Player_getInputDirection','QOPYj','jump','ShipSpeed','executeMove','lPGQb','RegionOk','Window_NumberInput_processOk','processMoveRouteMoveUntilStop','PErdx','bcTix','follower','EVAL','trigger','Step2EventId','isOnRope','Name','increaseSteps','setCommonEvent','isRegionAllowPass','isAllowCharacterTilt','turnRight90','WalkAllow','EventIconDelete','Toggle','CPpQP','contentsOpacity','Game_CharacterBase_updatePattern','checkExistingEntitiesAt','left','Step2MapId','updateTilt','getPosingCharacterDirection','COBWEB','boxWidth','Sprite_Balloon_setup','_shadowOpacity','Game_Character_processMoveCommand','setValue','Game_Temp_setDestination','labelWindowText','offsetY','MorphEventTo','PageId','FfWLA','getLastPluginCommandInterpreter','Value','isSmartEventCollisionOn','isAdvancedSwitch','BufferY','clear','clamp','EventId','gpWZH','_moveRouteIndex','format','isPressed','morphInto','Window_Message_startMessage','abs','Airship','turnLeft90','Hours','createIconSprite','radius','moveDiagonally','PreSpawnJS','Preserve','3IfVhfl','OfbgA','firstSpawnedEvent','ANNOYED','Allow','WnmJs','createLowerLayer','setBalloonPose','_expireCommonEvent','isPlaytest','WnTDL','EventIconChange','_comments','roundXWithDirection','vCaVp','isActive','mCxHM','setDestination','processMoveRouteBalloon','processMoveRouteSetIndex','setupRegionRestrictions','isDashingEnabled','checkValidEventerMap','convertVariableValuesInScriptCall','roundX','TiltLeft','Game_Player_checkEventTriggerHere','_duration','wdjwf','terrainTag','setPlayerControlDisable','shiftY','setMoveRoute','unlockEvent','aiFGI','Game_Event_isCollidedWithPlayerCharacters','OperateValues','ERROR:\x20Map\x20%1\x20has\x20not\x20been\x20preloaded\x20for\x20<Copy\x20Event>\x20usage.','spriteId','isNearTheScreen','_type','processMoveRouteSelfVariable','vertical\x20mirror','Game_Player_executeMove','Sprite_Character_update','processMoveRouteFadeIn','getDirectionToPoint','isBoat','SwitchId','jpibP','_selfTargetItemChoice','isTurnInPlace','ZrXOY','isDashDisabled','EVYtO','getInputDirection','CeQyW','approach','_interpreter','lkPwW','Game_Map_event','turnTowardCharacter','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','NUM','Game_CharacterBase_realMoveSpeed','isMoving','_characterName','Game_Event_meetsConditionsCPC','isShip','mjEhU','right','none','resume','6386176OHfVnP','moveAwayFromCharacter','MoveAllSynchTargets','registerSelfEvent','xFqcW','HEART','checkRegionEventTrigger','Game_Switches_setValue','SILENCE','IconBufferY','IconBlendMode','despawnRegions','GzGPN','spawnEventId','Window_EventItem_onCancel','_data','SpawnEventAtRegion','clearPageSettings','setCharacterBitmap','player','9wcEJTi','turn180','PlayerMovementDiagonal','resetFontSettings','vehicle','executeMoveDir8','refresh','_PlayerDiagonalSetting','VariableGetSelfVariableID','_patternLocked','firstSpawnedEventID','BalloonOffsetY','IDOqR','Game_Event_event','PreCopyJS','Game_Player_increaseSteps','followers','GetMoveSynchTarget','rOJpz','scale','XVKDk','_MapSpawnedEventData','setFrame','getMapSpawnedEventData','MQcZs','delay','PTRwI','setNumberInput','LINvu','ConvertParams','RandomMoveWeight','General','shadowY','wTCoe','xIGFb','_stopCount','target','IAZmp','VisuMZ_Setup_Preload_Map','clearSelfTarget','hSisT','screenY','Template','eventsXy','...','setupEventsMoveCoreCommentTags','Game_Map_refresh','Game_Variables_value','initEventsMoveCore','conditions','processMoveRouteMoveToCharacter','efwni','registerCommand','registerSelfTarget','BalloonOffsetX','setPose','TXsVS','updateMoveSynch','bitmap','random','OSfaS','visible','filter','ISqHY','TemplateName','EventLabelVisible','RIGHT','_speed','Ship','createLabelWindowForTarget','processDrawIcon','min','setWaitMode','USER-DEFINED\x201','_waitMode','_eventScreenX','split','SelfVariableID','Game_Map_isDashDisabled','%1Forbid','Game_Map_parallelCommonEvents','_advancedSwitchVariable','determineCommonEventsWithCPC','OTtuL','isTriggerIn','AdvancedSwitches','deleteIconsOnEventsDataKey','despawnEventId','_pageIndex','pos','startCallEvent','reverseDir','LOWER\x20LEFT','updatePose','_eventLabelOffsetX','clearPose','setStopFollowerChasing','_opacity','Game_Map_setup','Game_Switches_value','VehicleDock','forceMoveRoute','Minutes','processMoveRouteJumpForward','UKRfa','vert\x20mirror','MULTIPLY','_characterSprites','createCharacterShadow','_randomHomeY','getPosingCharacterPattern','EventTimerFramesGain','UPPER\x20LEFT','setAllowEventAutoMovement','rotation','setChaseOff','QlzjZ','_activationProximityAutoTriggerBypass','PostMorphJS','XAQXL','checkSmartEventCollision','directionOnLadderSpriteVS8dir','_PreservedEventMorphData','offsetX','blendMode','EventAutoMovement','tHwdB','_callEventData','_poseDuration','_eventLabelOffsetY','filename','roundY','isShadowShrink','checkEventTriggerThere','ECnFt','map','isLandOk','shadowX','TargetSwitchId','timer','xqewW','Game_Timer_stop','meetsCPC','EventLabelRefresh','determineEventOverload','Game_CharacterBase_update','onExpire','Game_CharacterBase_isDashing','isStopFollowerChasing','_encounterEffectDuration','hasCPCs','some','isPosing','Player','prototype','startMapCommonEventOnOKTarget','updateParallel','frontX','createShadow','ANGER','trim','text','meetActivationRegionConditions','labelWindowRange','moveTowardCharacter','clearCarrying','_selfTarget','_EventIcons','THQWn','ARRAYNUM','_commonEvents','posEventsMoveCore','isJumping','updateBitmapSmoothing','activationProximityType','yZlyA','updateEventsMoveCoreTagChanges','nNncL','%1DockRegionOnly','KlOAW','setTileBitmap','square','isRunning','BcnWF','clearDestination','GWfQk','moveStraight','_isObjectCharacter','updateMove','_selfEvent','pattern','HURT','advancedFunc','makeDeepCopy','inBattle','_cacheSystemVisible','_paused','meetsSwitchCondition','_eventSpawnData','regionId','eventId','hasAdvancedSwitchVariable','USER-DEFINED\x204','iixvL','ymjlv','_addedHitbox','Tladc','onDatabaseLoaded','_spriteOffsetY','Game_Interpreter_updateWaitMode','isAdvancedVariable','_moveRoute','yUvku','lastMovedDirection','Game_Map_events','disable','code','Scene_Load_onLoadSuccess','getPlayerDiagonalSetting','includes','checkNeedForPeriodicRefresh','ZJvIQ','ARRAYJSON','IZWyG','Operation','IconBufferX','iaUFG','isRegionForbidPass','Frames','fszvs','horz\x20mirror','FwVGy','Window_EventItem_onOk','removeChild','findTargetSprite','Game_CharacterBase_moveStraight','nIFGZ','Game_Vehicle_initMoveSpeed','checkAdvancedSwitchVariablePresent','fKdQp','%1Dock','LOWER\x20RIGHT','characterIndex','characterPatternYVS8','processMoveSynchAway','ITEM','clearSpriteOffsets','isShadowVisible','_diagonalSupport','_event','bysQS','toUpperCase','return\x200','changeSpeed','drawing','_moveAllowPlayerCollision','PosY','SPIN\x20COUNTERCLOCKWISE','correctFacingDirection','PostSpawnJS','MOOdP','IconSize','processMoveCommand','SpawnEventDespawnEverything','OFF','updateScale','activationProximityDistance','isEventRunning','itemPadding','Game_Vehicle_isMapPassable','isAnyEventStarting','AirshipSpeed','isSelfSwitch','EventLocationCreate','searchLimit','deltaX','Game_CharacterBase_pattern','scyQz','Game_Player_isMapPassable','rwnIZ','VisuMZ_0_CoreEngine','vneMd','prepareSpawnedEventAtRegion','kGPUN','Game_Event_locate','vjjWj','LIGHT\x20BULB','smooth','removeMorph','deleteSavedEventLocation','Step2Preserve','Game_Enemy_meetsSwitchCondition','_moveSynch','updateSelfMovement','canMove','_needsRefresh','max','Game_Interpreter_PluginCommand','setupEvents','pluginCommandCallEvent','charAt','isOnLadder','setupSpawnedEvents','bLhZp','processMoveSynchMirrorHorz','updatePeriodicRefresh','FRuOS','Game_Interpreter_executeCommand','AutoBalloon','_chaseOff','setEventLabelsVisible','drawIcon','processMoveRouteJumpTo','_alwaysUpdateMove','horizontal\x20mirror','TjKfL','OLVGY','variableValid','version','createBitmap','SelfSwitchID','YDRbU','OffsetY','createSpawnedEventWithData','despawnEverything','moveTypeRandom','CObjp','kMfrX','_eventErased','mirror\x20vertical','Game_Player_checkEventTriggerThere','IBHnL','Game_Event_refresh','YARUD','checkEventTriggerAuto','isAutoBufferIcon','lKFDx','QbEZk','cpYhJ','contents','height','template','createLabelWindows'];_0x5a59=function(){return _0x3f951b;};return _0x5a59();}Window_EventLabel[_0x2db143(0x287)]=Object['create'](Window_Base['prototype']),Window_EventLabel[_0x2db143(0x287)]['constructor']=Window_EventLabel,Window_EventLabel['prototype'][_0x2db143(0xbf)]=function(_0x57ed68){const _0x264495=_0x2db143;this[_0x264495(0x2e6)]=_0x57ed68;const _0x3931c9=new Rectangle(0x0,0x0,Graphics[_0x264495(0x16e)]/0x4,this[_0x264495(0x10b)](0x1));this[_0x264495(0x40c)](),Window_Base['prototype']['initialize'][_0x264495(0x3f0)](this,_0x3931c9),this['contentsOpacity']=0x0,this['setBackgroundType'](0x2),this['_text']='';},Window_EventLabel[_0x2db143(0x287)][_0x2db143(0x40c)]=function(){const _0xc82938=_0x2db143;this[_0xc82938(0x335)]=![],this[_0xc82938(0x137)]=$gameScreen['zoomScale'](),this[_0xc82938(0x238)]=this[_0xc82938(0x2e6)][_0xc82938(0x4f5)](),this[_0xc82938(0x3bb)]=this[_0xc82938(0x2e6)][_0xc82938(0x216)](),this[_0xc82938(0x24b)]=this['_event'][_0xc82938(0x3de)][_0xc82938(0x268)],this[_0xc82938(0x26e)]=this['_event'][_0xc82938(0x3de)][_0xc82938(0x175)],this['_eventPageIndex']=this[_0xc82938(0x2e6)][_0xc82938(0x245)],this[_0xc82938(0x4ec)]=this[_0xc82938(0x8b)](),this[_0xc82938(0x2b0)]=$gameSystem[_0xc82938(0x12a)](),this['_visiblePlayerX']=$gamePlayer['x'],this[_0xc82938(0x132)]=$gamePlayer['y'],this[_0xc82938(0x4d8)]=this['_event']['x'],this[_0xc82938(0x473)]=this[_0xc82938(0x2e6)]['y'];},Window_EventLabel[_0x2db143(0x287)][_0x2db143(0x4e4)]=function(){const _0x4fe12b=_0x2db143;Window_Base[_0x4fe12b(0x287)]['update'][_0x4fe12b(0x3f0)](this);if(!this[_0x4fe12b(0x41b)]())return;this['updateText'](),this[_0x4fe12b(0x2f6)](),this[_0x4fe12b(0x42a)](),this[_0x4fe12b(0x4b5)]();},Window_EventLabel[_0x2db143(0x287)][_0x2db143(0x41b)]=function(){const _0x4817d3=_0x2db143;if(!this[_0x4817d3(0x2e6)])return![];if(!this[_0x4817d3(0x2e6)][_0x4817d3(0x3de)])return![];if(this['_eventPageIndex']!==this[_0x4817d3(0x2e6)][_0x4817d3(0x245)])return!![];if(this[_0x4817d3(0x2e6)][_0x4817d3(0x113)]&&!this[_0x4817d3(0x335)])return!![];if(this[_0x4817d3(0x2e6)][_0x4817d3(0x3de)][_0x4817d3(0x28e)]==='')return![];if(this[_0x4817d3(0x137)]!==$gameScreen['zoomScale']())return!![];if(this[_0x4817d3(0x238)]!==this[_0x4817d3(0x2e6)][_0x4817d3(0x4f5)]())return!![];if(this['_eventScreenY']!==this[_0x4817d3(0x2e6)]['screenY']())return!![];if(this['_eventLabelOffsetX']!==this[_0x4817d3(0x2e6)][_0x4817d3(0x3de)][_0x4817d3(0x268)])return!![];if(this['_eventLabelOffsetY']!==this[_0x4817d3(0x2e6)][_0x4817d3(0x3de)][_0x4817d3(0x175)])return!![];if(this[_0x4817d3(0x482)]!==$gamePlayer['x'])return!![];if(this[_0x4817d3(0x132)]!==$gamePlayer['y'])return!![];if(this[_0x4817d3(0x4d8)]!==this[_0x4817d3(0x2e6)]['x'])return!![];if(this[_0x4817d3(0x473)]!==this[_0x4817d3(0x2e6)]['y'])return!![];if(this[_0x4817d3(0x2b0)]!==$gameSystem[_0x4817d3(0x12a)]())return!![];if(this[_0x4817d3(0x4ec)]&&this[_0x4817d3(0x166)]<0xff)return!![];if(!this[_0x4817d3(0x4ec)]&&this[_0x4817d3(0x166)]>0x0)return!![];if(SceneManager[_0x4817d3(0x122)]['_encounterEffectDuration']>0x0)return!![];return![];},Window_EventLabel[_0x2db143(0x287)][_0x2db143(0x498)]=function(){const _0x115e0a=_0x2db143;if(this[_0x115e0a(0x2e6)][_0x115e0a(0x174)]()!==this[_0x115e0a(0x469)]){if(_0x115e0a(0x48f)!=='cwdnY')this['_text']=this[_0x115e0a(0x2e6)][_0x115e0a(0x174)](),this[_0x115e0a(0x1f3)]();else{_0x144cae['EventsMoveCore'][_0x115e0a(0x80)]['call'](this,_0x20452d,_0x8434d7);if(this[_0x115e0a(0x44d)]())this['setDiagonalDirection'](_0x41b1d9,_0x4bc732);}}},Window_EventLabel[_0x2db143(0x287)][_0x2db143(0x2f6)]=function(){const _0x537adb=_0x2db143;this[_0x537adb(0x200)]['x']=0x1/$gameScreen['zoomScale'](),this['scale']['y']=0x1/$gameScreen[_0x537adb(0x4e0)](),this[_0x537adb(0x137)]=$gameScreen[_0x537adb(0x4e0)]();},Window_EventLabel['prototype'][_0x2db143(0x42a)]=function(){const _0xd4e3cc=_0x2db143;if(!SceneManager['_scene'])return;if(!SceneManager[_0xd4e3cc(0x122)][_0xd4e3cc(0x38c)])return;const _0x275bff=SceneManager[_0xd4e3cc(0x122)][_0xd4e3cc(0x38c)][_0xd4e3cc(0x2d7)](this['_event']);if(!_0x275bff)return;this['x']=Math[_0xd4e3cc(0x379)](this[_0xd4e3cc(0x2e6)][_0xd4e3cc(0x4f5)]()-Math['floor'](this[_0xd4e3cc(0x45c)]*this[_0xd4e3cc(0x200)]['x']/0x2)),this['x']+=this['_event'][_0xd4e3cc(0x3de)][_0xd4e3cc(0x268)],this['y']=this[_0xd4e3cc(0x2e6)]['screenY']()-_0x275bff['height'],this['y']+=Math[_0xd4e3cc(0x379)]($gameSystem[_0xd4e3cc(0x384)]()*0.5),this['y']-=Math['round'](this[_0xd4e3cc(0x341)]*this[_0xd4e3cc(0x200)]['y']),this['y']+=this['_event']['_labelWindow'][_0xd4e3cc(0x175)],this[_0xd4e3cc(0x335)]=this[_0xd4e3cc(0x2e6)][_0xd4e3cc(0x113)],this[_0xd4e3cc(0x238)]=this['_event'][_0xd4e3cc(0x4f5)](),this[_0xd4e3cc(0x3bb)]=this[_0xd4e3cc(0x2e6)][_0xd4e3cc(0x216)](),this[_0xd4e3cc(0x24b)]=this[_0xd4e3cc(0x2e6)][_0xd4e3cc(0x3de)]['offsetX'],this[_0xd4e3cc(0x26e)]=this[_0xd4e3cc(0x2e6)][_0xd4e3cc(0x3de)][_0xd4e3cc(0x175)],this[_0xd4e3cc(0x47b)]=this[_0xd4e3cc(0x2e6)]['_pageIndex'],this[_0xd4e3cc(0x335)]&&(this[_0xd4e3cc(0x166)]=0x0);},Window_EventLabel[_0x2db143(0x287)]['updateOpacity']=function(){const _0x44846c=_0x2db143;if(this[_0x44846c(0x8b)]())this[_0x44846c(0x166)]+=this[_0x44846c(0x390)]();else SceneManager[_0x44846c(0x122)]['_encounterEffectDuration']>0x0?this[_0x44846c(0x166)]=0x0:_0x44846c(0x448)==='kGpuA'?_0x1745fb[_0x44846c(0x1f3)]():this[_0x44846c(0x166)]-=this[_0x44846c(0x390)]();},Window_EventLabel['prototype']['isLabelVisible']=function(){const _0x40968c=_0x2db143;if(!$gameSystem[_0x40968c(0x12a)]())return![];if(this['_event']?.[_0x40968c(0x113)])return![];if(SceneManager[_0x40968c(0x122)][_0x40968c(0x282)]>0x0)return![];const _0x4979a6=$gamePlayer['x'],_0x25bb69=$gamePlayer['y'],_0x221a24=this[_0x40968c(0x2e6)]['x'],_0x458abf=this['_event']['y'];if(this['_visiblePlayerX']===_0x4979a6&&this[_0x40968c(0x132)]===_0x25bb69&&this['_visibleEventX']===_0x221a24&&this[_0x40968c(0x473)]===_0x458abf)return this[_0x40968c(0x4ec)];this['_visiblePlayerX']=$gamePlayer['x'],this[_0x40968c(0x132)]=$gamePlayer['y'],this[_0x40968c(0x4d8)]=this[_0x40968c(0x2e6)]['x'],this['_visibleEventY']=this['_event']['y'];if($gameMap[_0x40968c(0x467)](_0x4979a6,_0x25bb69,_0x221a24,_0x458abf)>this['_event']['labelWindowRange']())return this['_cacheVisibility']=![],![];return this[_0x40968c(0x4ec)]=!![],!![];},Window_EventLabel[_0x2db143(0x287)][_0x2db143(0x390)]=function(){const _0x5087be=_0x2db143;return VisuMZ[_0x5087be(0x483)][_0x5087be(0x516)][_0x5087be(0x11e)]['OpacitySpeed'];},Window_EventLabel[_0x2db143(0x287)][_0x2db143(0x357)]=function(){const _0x162383=_0x2db143,_0x300089=this[_0x162383(0x3b2)](this[_0x162383(0x469)]);this['width']=_0x300089[_0x162383(0x45c)]+($gameSystem['windowPadding']()+this[_0x162383(0x2f9)]())*0x2,this[_0x162383(0x341)]=Math[_0x162383(0x315)](this[_0x162383(0x45e)](),_0x300089[_0x162383(0x341)])+$gameSystem[_0x162383(0x384)]()*0x2,this[_0x162383(0x3a9)]();},Window_EventLabel['prototype'][_0x2db143(0x45e)]=function(){const _0x2d97f1=_0x2db143;return VisuMZ[_0x2d97f1(0x483)]['Settings'][_0x2d97f1(0x11e)]['LineHeight'];},Window_EventLabel['prototype']['resetFontSettings']=function(){const _0x481aaf=_0x2db143;Window_Base[_0x481aaf(0x287)][_0x481aaf(0x1f0)]['call'](this),this[_0x481aaf(0x340)]['fontSize']=this[_0x481aaf(0x36b)]();},Window_EventLabel[_0x2db143(0x287)][_0x2db143(0x36b)]=function(){const _0x5dd215=_0x2db143;return VisuMZ[_0x5dd215(0x483)][_0x5dd215(0x516)][_0x5dd215(0x11e)][_0x5dd215(0x3fd)];},Window_EventLabel[_0x2db143(0x287)][_0x2db143(0x1f3)]=function(){const _0x5459bc=_0x2db143;this[_0x5459bc(0x357)](),this['contents'][_0x5459bc(0x17e)]();const _0x503eaf=this[_0x5459bc(0x469)][_0x5459bc(0x239)](/[\r\n]+/);let _0x1776a5=0x0;for(const _0x17a8e1 of _0x503eaf){if(_0x5459bc(0x39e)===_0x5459bc(0x39e)){const _0x1b44e6=this[_0x5459bc(0x3b2)](_0x17a8e1),_0x201c51=Math['floor']((this[_0x5459bc(0x34f)]-_0x1b44e6[_0x5459bc(0x45c)])/0x2);this[_0x5459bc(0x36e)](_0x17a8e1,_0x201c51,_0x1776a5),_0x1776a5+=_0x1b44e6[_0x5459bc(0x341)];}else{const _0x1c11c8=this[_0x5459bc(0x124)]()[_0x5459bc(0x4b6)];if(_0x1c11c8==='')return;if(_0x486471[_0x5459bc(0x3a3)]()||_0x560eb2[_0x5459bc(0x470)]())return;const _0x1e27a9=_0x57cfbc['EventsMoveCore'][_0x5459bc(0x516)][_0x5459bc(0x217)];let _0x90cf5a=null,_0x554f95=0x0,_0x58e933=0x0;if(_0x1c11c8[_0x5459bc(0x474)](/<COPY EVENT:[ ]MAP[ ](\d+),[ ]EVENT[ ](\d+)>/i))_0x554f95=_0x3a60f5(_0x56d8c8['$1']),_0x58e933=_0x1b0be2(_0x13e897['$2']);else{if(_0x1c11c8[_0x5459bc(0x474)](/<COPY EVENT:[ ](\d+),[ ](\d+)>/i))_0x554f95=_0x519b1b(_0x3efb03['$1']),_0x58e933=_0x58f5f7(_0x4e9a02['$2']);else{if(_0x1c11c8[_0x5459bc(0x474)](/<COPY EVENT:[ ](.*?)>/i)){const _0x2c622e=_0x240af5(_0x3d4cfa['$1'])[_0x5459bc(0x2e8)]()[_0x5459bc(0x28d)]();_0x90cf5a=_0x5e71fc[_0x5459bc(0x500)][_0x2c622e];if(!_0x90cf5a)return;_0x554f95=_0x90cf5a[_0x5459bc(0x3d8)],_0x58e933=_0x90cf5a['EventID'];}}}if(!this['checkValidEventerMap'](_0x554f95,_0x58e933))return;_0x1e27a9[_0x5459bc(0x1fb)][_0x5459bc(0x3f0)](this,_0x554f95,_0x58e933,this);if(_0x90cf5a)_0x90cf5a[_0x5459bc(0x1fb)][_0x5459bc(0x3f0)](this,_0x554f95,_0x58e933,this);this[_0x5459bc(0x4ab)]={'mapId':_0x554f95,'eventId':_0x58e933},this[_0x5459bc(0x245)]=-0x2,this[_0x5459bc(0x1f3)](),_0x1e27a9[_0x5459bc(0x46c)][_0x5459bc(0x3f0)](this,_0x554f95,_0x58e933,this);if(_0x90cf5a)_0x90cf5a[_0x5459bc(0x46c)]['call'](this,_0x554f95,_0x58e933,this);_0x5a3e6[_0x5459bc(0x43d)]();}}},Window_EventLabel[_0x2db143(0x287)][_0x2db143(0x233)]=function(_0x4bb7a0,_0x55946c){const _0x4ebf65=_0x2db143;_0x55946c[_0x4ebf65(0x2eb)]&&this[_0x4ebf65(0x324)](_0x4bb7a0,_0x55946c['x']+0x2,_0x55946c['y']),_0x55946c['x']+=Math[_0x4ebf65(0x234)](this[_0x4ebf65(0x3d0)](),ImageManager[_0x4ebf65(0x420)])+0x4;},Window_EventLabel[_0x2db143(0x287)][_0x2db143(0x324)]=function(_0xfe8594,_0x1d1d35,_0x4dfb48){const _0x4eed8d=_0x2db143,_0x5c162a=ImageManager['loadSystem'](_0x4eed8d(0x51e)),_0x2b2895=ImageManager[_0x4eed8d(0x420)],_0x758461=ImageManager[_0x4eed8d(0x4f4)],_0x1e64f3=_0xfe8594%0x10*_0x2b2895,_0xdb5e94=Math[_0x4eed8d(0x43c)](_0xfe8594/0x10)*_0x758461,_0x309831=Math[_0x4eed8d(0x234)](this['iconSize']()),_0xdfdc34=Math['min'](this[_0x4eed8d(0x3d0)]());this['contents'][_0x4eed8d(0x462)](_0x5c162a,_0x1e64f3,_0xdb5e94,_0x2b2895,_0x758461,_0x1d1d35,_0x4dfb48,_0x309831,_0xdfdc34);},Window_EventLabel['prototype'][_0x2db143(0x3d0)]=function(){const _0x3ee401=_0x2db143;return VisuMZ[_0x3ee401(0x483)][_0x3ee401(0x516)][_0x3ee401(0x11e)][_0x3ee401(0x2f2)];};