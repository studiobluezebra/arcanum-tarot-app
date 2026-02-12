# Flipwill Card Template Structure
# Each card has: lens_keyword, core_dynamic, situation_highlight, internal_state,
# frictions, useful_responses, decision_prompts

CARD_TEMPLATES = {
    # ============================================
    # MAJOR ARCANA (0-21)
    # ============================================
    
    "m00": {  # The Fool
        "lens_keyword": "Beginning",
        "core_dynamic": "Entering the unknown without full certainty.",
        "situation_highlight": [
            "New opportunity or path emerging",
            "Limited prior experience",
            "Open field of possibilities"
        ],
        "internal_state": [
            "Curiosity and openness",
            "Willingness to explore",
            "Light attachment to outcomes"
        ],
        "frictions": [
            "Naivety about risks",
            "Acting without preparation"
        ],
        "useful_responses": [
            "Explore, but stay observant",
            "Define one safe experiment",
            "Stay flexible rather than committed"
        ],
        "decision_prompts": [
            "What would exploration look like without full commitment?",
            "What is the smallest safe first step?",
            "What do I need to learn quickly?"
        ]
    },
    
    "m01": {  # The Magician
        "lens_keyword": "Agency",
        "core_dynamic": "Ability to influence and initiate change.",
        "situation_highlight": [
            "Resources available",
            "Opportunity to act intentionally",
            "Need for focused direction"
        ],
        "internal_state": [
            "Confidence and initiative",
            "Mental clarity forming"
        ],
        "frictions": [
            "Scattered energy",
            "Overestimating control"
        ],
        "useful_responses": [
            "Choose one clear objective",
            "Act deliberately, not impulsively",
            "Use what you already have"
        ],
        "decision_prompts": [
            "What is fully within my control?",
            "What outcome am I actively creating?",
            "Where should I focus effort first?"
        ]
    },
    
    "m02": {  # The High Priestess
        "lens_keyword": "Awareness",
        "core_dynamic": "Information exists but is not fully visible.",
        "situation_highlight": [
            "Subtle signals present",
            "Something not yet revealed",
            "Need for observation"
        ],
        "internal_state": [
            "Heightened sensitivity",
            "Quiet perception"
        ],
        "frictions": [
            "Acting too quickly",
            "Ignoring intuition"
        ],
        "useful_responses": [
            "Observe before acting",
            "Let information emerge",
            "Notice patterns quietly"
        ],
        "decision_prompts": [
            "What feels unclear but important?",
            "What am I sensing but not verifying?",
            "What happens if I wait briefly?"
        ]
    },
    
    "m03": {  # The Empress
        "lens_keyword": "Growth",
        "core_dynamic": "Development through nourishment and support.",
        "situation_highlight": [
            "Conditions for growth exist",
            "Creative or relational expansion",
            "Resources developing"
        ],
        "internal_state": [
            "Receptivity and openness",
            "Emotional engagement"
        ],
        "frictions": [
            "Over-attachment",
            "Comfort replacing progress"
        ],
        "useful_responses": [
            "Support what is growing",
            "Invest time in development",
            "Protect long-term potential"
        ],
        "decision_prompts": [
            "What needs consistent care?",
            "What is growing naturally?",
            "What environment supports success?"
        ]
    },
    
    "m04": {  # The Emperor
        "lens_keyword": "Structure",
        "core_dynamic": "Need for order, boundaries, and stability.",
        "situation_highlight": [
            "Requirement for control or organization",
            "Structural decision point",
            "Authority or responsibility present"
        ],
        "internal_state": [
            "Desire for stability",
            "Strategic thinking"
        ],
        "frictions": [
            "Rigidity",
            "Resistance to flexibility"
        ],
        "useful_responses": [
            "Define clear boundaries",
            "Create structure first",
            "Make decisions deliberately"
        ],
        "decision_prompts": [
            "What needs clear structure?",
            "Where is control necessary?",
            "What must be defined before acting?"
        ]
    },
    
    "m05": {  # The Hierophant
        "lens_keyword": "Framework",
        "core_dynamic": "Established systems or traditions influencing choices.",
        "situation_highlight": [
            "Social norms or expectations present",
            "Learning from existing models",
            "Institutional influence"
        ],
        "internal_state": [
            "Desire for guidance",
            "Seeking validation"
        ],
        "frictions": [
            "Blind conformity",
            "Fear of deviation"
        ],
        "useful_responses": [
            "Understand the system",
            "Decide consciously whether to follow or adapt",
            "Learn before changing"
        ],
        "decision_prompts": [
            "What rules shape this situation?",
            "Do I align or diverge?",
            "What is the benefit of structure here?"
        ]
    },
    
    "m06": {  # The Lovers
        "lens_keyword": "Alignment",
        "core_dynamic": "Choice involving values or connection.",
        "situation_highlight": [
            "Meaningful relationship or decision",
            "Emotional investment",
            "Need for coherence"
        ],
        "internal_state": [
            "Desire for harmony",
            "Emotional clarity emerging"
        ],
        "frictions": [
            "Avoiding difficult choice",
            "Divided priorities"
        ],
        "useful_responses": [
            "Clarify what matters most",
            "Choose alignment over comfort",
            "Commit consciously"
        ],
        "decision_prompts": [
            "What truly matters here?",
            "What choice reflects my values?",
            "What am I avoiding choosing?"
        ]
    },
    
    "m07": {  # The Chariot
        "lens_keyword": "Direction",
        "core_dynamic": "Movement through focused will.",
        "situation_highlight": [
            "Momentum building",
            "Need for determination",
            "Competing forces present"
        ],
        "internal_state": [
            "Drive and ambition",
            "Desire to move forward"
        ],
        "frictions": [
            "Loss of control",
            "Forced progress"
        ],
        "useful_responses": [
            "Direct energy intentionally",
            "Maintain discipline",
            "Balance opposing pressures"
        ],
        "decision_prompts": [
            "What direction am I choosing?",
            "What must be controlled?",
            "What momentum already exists?"
        ]
    },
    
    "m08": {  # Strength
        "lens_keyword": "Regulation",
        "core_dynamic": "Influence through calm control.",
        "situation_highlight": [
            "Emotional intensity present",
            "Need for patience",
            "Slow stabilization required"
        ],
        "internal_state": [
            "Inner resilience",
            "Emotional awareness"
        ],
        "frictions": [
            "Force instead of influence",
            "Impatience"
        ],
        "useful_responses": [
            "Stay steady",
            "Respond, don't react",
            "Use consistency"
        ],
        "decision_prompts": [
            "What requires calm persistence?",
            "Where must I regulate myself?",
            "What soft control works better than force?"
        ]
    },
    
    "m09": {  # The Hermit
        "lens_keyword": "Reflection",
        "core_dynamic": "Withdrawal for clarity.",
        "situation_highlight": [
            "Need for independent thinking",
            "Reduced external noise",
            "Inner evaluation"
        ],
        "internal_state": [
            "Thoughtful distancing",
            "Seeking understanding"
        ],
        "frictions": [
            "Isolation becoming avoidance",
            "Over-analysis"
        ],
        "useful_responses": [
            "Step back intentionally",
            "Clarify perspective alone",
            "Re-enter with insight"
        ],
        "decision_prompts": [
            "What needs quiet evaluation?",
            "What am I learning privately?",
            "What becomes clear in silence?"
        ]
    },
    
    "m10": {  # Wheel of Fortune
        "lens_keyword": "Change",
        "core_dynamic": "Shifting conditions beyond full control.",
        "situation_highlight": [
            "External movement",
            "Timing factors",
            "Transition underway"
        ],
        "internal_state": [
            "Adaptation required"
        ],
        "frictions": [
            "Resisting change",
            "Misreading timing"
        ],
        "useful_responses": [
            "Adapt quickly",
            "Observe cycles",
            "Act when conditions align"
        ],
        "decision_prompts": [
            "What is changing regardless of me?",
            "Where is timing crucial?",
            "How can I adapt intelligently?"
        ]
    },
    
    "m11": {  # Justice
        "lens_keyword": "Balance",
        "core_dynamic": "Consequences and fairness.",
        "situation_highlight": [
            "Evaluation or judgment",
            "Need for objectivity",
            "Accountability present"
        ],
        "internal_state": [
            "Desire for fairness",
            "Analytical thinking"
        ],
        "frictions": [
            "Bias",
            "Avoiding responsibility"
        ],
        "useful_responses": [
            "Assess facts",
            "Accept consequences",
            "Decide based on evidence"
        ],
        "decision_prompts": [
            "What is objectively true?",
            "What is fair?",
            "What are the real consequences?"
        ]
    },
    
    "m12": {  # The Hanged Man
        "lens_keyword": "Suspension",
        "core_dynamic": "Pause leading to new perspective.",
        "situation_highlight": [
            "Delay or standstill",
            "Need for reframing",
            "Forced waiting"
        ],
        "internal_state": [
            "Adjustment",
            "Re-evaluation"
        ],
        "frictions": [
            "Resistance to pause",
            "Feeling stuck"
        ],
        "useful_responses": [
            "Change viewpoint",
            "Release urgency",
            "Learn from delay"
        ],
        "decision_prompts": [
            "What changes if I stop pushing?",
            "What is this pause revealing?",
            "What perspective is missing?"
        ]
    },
    
    "m13": {  # Death
        "lens_keyword": "Transition",
        "core_dynamic": "End of one state enabling another.",
        "situation_highlight": [
            "Irreversible change",
            "Closure necessary",
            "Transformation underway"
        ],
        "internal_state": [
            "Letting go required"
        ],
        "frictions": [
            "Clinging to past",
            "Fear of ending"
        ],
        "useful_responses": [
            "Accept closure",
            "Release outdated patterns",
            "Prepare for renewal"
        ],
        "decision_prompts": [
            "What must end for progress?",
            "What am I holding that is finished?",
            "What new state follows release?"
        ]
    },
    
    "m14": {  # Temperance
        "lens_keyword": "Integration",
        "core_dynamic": "Balance through adjustment.",
        "situation_highlight": [
            "Elements needing alignment",
            "Gradual stabilization",
            "Moderation required"
        ],
        "internal_state": [
            "Desire for harmony"
        ],
        "frictions": [
            "Extremes",
            "Impatience"
        ],
        "useful_responses": [
            "Combine gradually",
            "Adjust continuously",
            "Seek balance"
        ],
        "decision_prompts": [
            "What needs blending?",
            "Where is moderation needed?",
            "What improves with patience?"
        ]
    },
    
    "m15": {  # The Devil
        "lens_keyword": "Attachment",
        "core_dynamic": "Restriction through habit or dependency.",
        "situation_highlight": [
            "Limiting patterns present",
            "External control or internal compulsion"
        ],
        "internal_state": [
            "Feeling bound or stuck"
        ],
        "frictions": [
            "Denial of influence",
            "Loss of autonomy"
        ],
        "useful_responses": [
            "Identify constraints",
            "Reclaim agency",
            "Break automatic patterns"
        ],
        "decision_prompts": [
            "What holds me in place?",
            "What am I avoiding changing?",
            "What restores freedom?"
        ]
    },
    
    "m16": {  # The Tower
        "lens_keyword": "Disruption",
        "core_dynamic": "Sudden breakdown of existing structure.",
        "situation_highlight": [
            "Unexpected change",
            "Collapse of assumption",
            "Forced reset"
        ],
        "internal_state": [
            "Shock or destabilization"
        ],
        "frictions": [
            "Resistance to reality"
        ],
        "useful_responses": [
            "Stabilize first",
            "Rebuild intentionally",
            "Accept truth quickly"
        ],
        "decision_prompts": [
            "What assumption failed?",
            "What must be rebuilt differently?",
            "What remains stable?"
        ]
    },
    
    "m17": {  # The Star
        "lens_keyword": "Renewal",
        "core_dynamic": "Recovery and reorientation.",
        "situation_highlight": [
            "Hope after disruption",
            "Regaining clarity",
            "Gentle forward movement"
        ],
        "internal_state": [
            "Trust rebuilding"
        ],
        "frictions": [
            "Fragility",
            "Unrealistic expectation"
        ],
        "useful_responses": [
            "Restore gradually",
            "Stay realistic",
            "Maintain optimism with grounding"
        ],
        "decision_prompts": [
            "What restores confidence?",
            "What small step rebuilds momentum?",
            "What future feels possible again?"
        ]
    },
    
    "m18": {  # The Moon
        "lens_keyword": "Uncertainty",
        "core_dynamic": "Mixed signals and incomplete information.",
        "situation_highlight": [
            "Unclear path ahead",
            "Deception or self-deception possible",
            "Emotional confusion"
        ],
        "internal_state": [
            "Anxiety or unease",
            "Heightened imagination"
        ],
        "frictions": [
            "Acting on fear",
            "Misinterpreting signals"
        ],
        "useful_responses": [
            "Wait for clarity",
            "Distinguish fear from intuition",
            "Verify before committing"
        ],
        "decision_prompts": [
            "What am I not seeing clearly?",
            "What is fear versus real risk?",
            "What needs verification?"
        ]
    },
    
    "m19": {  # The Sun
        "lens_keyword": "Clarity",
        "core_dynamic": "Visibility and confidence.",
        "situation_highlight": [
            "Clear understanding",
            "Positive momentum",
            "Openness"
        ],
        "internal_state": [
            "Confidence",
            "Energy"
        ],
        "frictions": [
            "Overconfidence"
        ],
        "useful_responses": [
            "Act decisively",
            "Share openly",
            "Move forward fully"
        ],
        "decision_prompts": [
            "What is clearly working?",
            "Where can I act openly?",
            "What deserves full commitment?"
        ]
    },
    
    "m20": {  # Judgement
        "lens_keyword": "Reckoning",
        "core_dynamic": "Evaluation and calling to higher purpose.",
        "situation_highlight": [
            "Time for honest assessment",
            "Past actions being reviewed",
            "Opportunity for redemption or renewal"
        ],
        "internal_state": [
            "Self-reflection deepening",
            "Sense of accountability"
        ],
        "frictions": [
            "Avoiding self-examination",
            "Denial of past patterns"
        ],
        "useful_responses": [
            "Face the truth honestly",
            "Answer the call to change",
            "Release judgment of self"
        ],
        "decision_prompts": [
            "What is calling me forward?",
            "What past pattern needs acknowledgment?",
            "What renewal is possible now?"
        ]
    },
    
    "m21": {  # The World
        "lens_keyword": "Completion",
        "core_dynamic": "Cycle fulfilled and wholeness achieved.",
        "situation_highlight": [
            "Major milestone reached",
            "Integration of learning",
            "Readiness for new cycle"
        ],
        "internal_state": [
            "Sense of accomplishment",
            "Expanded perspective"
        ],
        "frictions": [
            "Fear of next chapter",
            "Reluctance to close"
        ],
        "useful_responses": [
            "Celebrate completion",
            "Integrate lessons learned",
            "Prepare for new beginning"
        ],
        "decision_prompts": [
            "What has been completed?",
            "What lesson carries forward?",
            "What new cycle begins?"
        ]
    },
    
    # ============================================
    # MINOR ARCANA - WANDS (Fire, Action, Will)
    # ============================================
    
    "w01": {  # Ace of Wands
        "lens_keyword": "Spark",
        "core_dynamic": "New creative or passionate impulse.",
        "situation_highlight": [
            "Fresh inspiration arriving",
            "Potential for initiative",
            "Energy available"
        ],
        "internal_state": [
            "Excitement and motivation",
            "Creative stirring"
        ],
        "frictions": [
            "Impulse without direction",
            "Burning out quickly"
        ],
        "useful_responses": [
            "Capture the idea",
            "Channel energy purposefully",
            "Start small but start now"
        ],
        "decision_prompts": [
            "What excites me most right now?",
            "Where should this energy go?",
            "What first action honors this spark?"
        ]
    },
    
    "w02": {  # Two of Wands
        "lens_keyword": "Planning",
        "core_dynamic": "Considering options and future direction.",
        "situation_highlight": [
            "Decision point ahead",
            "Multiple paths visible",
            "Vision forming"
        ],
        "internal_state": [
            "Anticipation",
            "Strategic thinking"
        ],
        "frictions": [
            "Paralysis from options",
            "Planning without acting"
        ],
        "useful_responses": [
            "Evaluate options clearly",
            "Choose direction soon",
            "Balance vision with action"
        ],
        "decision_prompts": [
            "What direction calls strongest?",
            "What information would help me choose?",
            "What happens if I delay choosing?"
        ]
    },
    
    "w03": {  # Three of Wands
        "lens_keyword": "Expansion",
        "core_dynamic": "Momentum and looking ahead.",
        "situation_highlight": [
            "Progress underway",
            "Bigger possibilities emerging",
            "Waiting for returns"
        ],
        "internal_state": [
            "Confidence building",
            "Patience with process"
        ],
        "frictions": [
            "Impatience for results",
            "Overextending"
        ],
        "useful_responses": [
            "Trust the process",
            "Expand strategically",
            "Maintain momentum"
        ],
        "decision_prompts": [
            "What is already in motion?",
            "Where can I expand carefully?",
            "What am I waiting for?"
        ]
    },
    
    "w04": {  # Four of Wands
        "lens_keyword": "Celebration",
        "core_dynamic": "Milestone achieved and stability earned.",
        "situation_highlight": [
            "Foundation established",
            "Reason to celebrate",
            "Community or support present"
        ],
        "internal_state": [
            "Satisfaction",
            "Gratitude"
        ],
        "frictions": [
            "Not pausing to appreciate",
            "Moving too quickly to next"
        ],
        "useful_responses": [
            "Acknowledge progress",
            "Celebrate with others",
            "Build on this foundation"
        ],
        "decision_prompts": [
            "What progress deserves recognition?",
            "Who should I celebrate with?",
            "What foundation exists now?"
        ]
    },
    
    "w05": {  # Five of Wands
        "lens_keyword": "Competition",
        "core_dynamic": "Conflict or tension from multiple forces.",
        "situation_highlight": [
            "Competing interests present",
            "Friction with others",
            "Struggle for position"
        ],
        "internal_state": [
            "Frustration or fighting spirit",
            "Need to prove"
        ],
        "frictions": [
            "Unnecessary conflict",
            "Ego-driven struggle"
        ],
        "useful_responses": [
            "Choose battles wisely",
            "Find common ground",
            "Channel competition constructively"
        ],
        "decision_prompts": [
            "What conflict is worth engaging?",
            "What would collaboration look like?",
            "What am I really fighting for?"
        ]
    },
    
    "w06": {  # Six of Wands
        "lens_keyword": "Recognition",
        "core_dynamic": "Success acknowledged by others.",
        "situation_highlight": [
            "Achievement visible",
            "Public acknowledgment",
            "Leadership moment"
        ],
        "internal_state": [
            "Pride and confidence",
            "Validation received"
        ],
        "frictions": [
            "Ego inflation",
            "Depending on external approval"
        ],
        "useful_responses": [
            "Accept recognition gracefully",
            "Stay grounded",
            "Share credit appropriately"
        ],
        "decision_prompts": [
            "What success can I claim?",
            "How do I handle recognition?",
            "What comes after this win?"
        ]
    },
    
    "w07": {  # Seven of Wands
        "lens_keyword": "Defense",
        "core_dynamic": "Holding ground against challenge.",
        "situation_highlight": [
            "Position being tested",
            "Need to stand firm",
            "Pressure from multiple directions"
        ],
        "internal_state": [
            "Determination",
            "Feeling challenged"
        ],
        "frictions": [
            "Exhaustion from defending",
            "Paranoia"
        ],
        "useful_responses": [
            "Defend what matters",
            "Know when to hold vs. release",
            "Conserve energy"
        ],
        "decision_prompts": [
            "What is worth defending?",
            "What position must I hold?",
            "Where can I let go?"
        ]
    },
    
    "w08": {  # Eight of Wands
        "lens_keyword": "Momentum",
        "core_dynamic": "Rapid movement and swift progress.",
        "situation_highlight": [
            "Things moving quickly",
            "Communication flowing",
            "Travel or change accelerating"
        ],
        "internal_state": [
            "Excitement about speed",
            "Feeling carried forward"
        ],
        "frictions": [
            "Losing control of pace",
            "Missing details in rush"
        ],
        "useful_responses": [
            "Ride the momentum",
            "Stay alert while moving fast",
            "Prepare for landing"
        ],
        "decision_prompts": [
            "What is accelerating?",
            "Am I ready for this pace?",
            "Where will this momentum land?"
        ]
    },
    
    "w09": {  # Nine of Wands
        "lens_keyword": "Resilience",
        "core_dynamic": "Persistence through weariness.",
        "situation_highlight": [
            "Near the finish line",
            "Fatigue present",
            "Final push needed"
        ],
        "internal_state": [
            "Tired but determined",
            "Guarded"
        ],
        "frictions": [
            "Giving up too soon",
            "Excessive defensiveness"
        ],
        "useful_responses": [
            "Keep going a bit longer",
            "Protect your energy",
            "Rest when possible"
        ],
        "decision_prompts": [
            "What is the last obstacle?",
            "What do I need to finish?",
            "How can I protect my energy?"
        ]
    },
    
    "w10": {  # Ten of Wands
        "lens_keyword": "Burden",
        "core_dynamic": "Carrying too much responsibility.",
        "situation_highlight": [
            "Overloaded with tasks",
            "Success creating weight",
            "Near burnout"
        ],
        "internal_state": [
            "Overwhelmed",
            "Struggling to manage"
        ],
        "frictions": [
            "Refusing to delegate",
            "Martyrdom"
        ],
        "useful_responses": [
            "Prioritize ruthlessly",
            "Delegate or release",
            "Reach the goal then rest"
        ],
        "decision_prompts": [
            "What can I put down?",
            "What must I carry alone?",
            "Who can help?"
        ]
    },
    
    "w11": {  # Page of Wands
        "lens_keyword": "Curiosity",
        "core_dynamic": "Eager exploration and new enthusiasm.",
        "situation_highlight": [
            "Learning phase",
            "Excitement about possibilities",
            "Message or opportunity arriving"
        ],
        "internal_state": [
            "Adventurous spirit",
            "Beginner's enthusiasm"
        ],
        "frictions": [
            "Lack of follow-through",
            "Distraction by novelty"
        ],
        "useful_responses": [
            "Explore with purpose",
            "Stay curious but focused",
            "Take the message seriously"
        ],
        "decision_prompts": [
            "What am I curious about?",
            "What new thing deserves exploration?",
            "What message is arriving?"
        ]
    },
    
    "w12": {  # Knight of Wands
        "lens_keyword": "Action",
        "core_dynamic": "Bold pursuit of passion.",
        "situation_highlight": [
            "Time to act decisively",
            "Adventure calling",
            "Energy available for pursuit"
        ],
        "internal_state": [
            "Restless energy",
            "Desire for movement"
        ],
        "frictions": [
            "Recklessness",
            "Commitment issues"
        ],
        "useful_responses": [
            "Act boldly but not blindly",
            "Channel passion constructively",
            "Keep momentum sustainable"
        ],
        "decision_prompts": [
            "What action am I avoiding?",
            "Where does passion point?",
            "What bold move is needed?"
        ]
    },
    
    "w13": {  # Queen of Wands
        "lens_keyword": "Presence",
        "core_dynamic": "Confident leadership and warmth.",
        "situation_highlight": [
            "Leadership opportunity",
            "Social influence available",
            "Creative authority"
        ],
        "internal_state": [
            "Self-assured",
            "Generous with energy"
        ],
        "frictions": [
            "Dominating others",
            "Needing spotlight"
        ],
        "useful_responses": [
            "Lead with warmth",
            "Inspire rather than control",
            "Own your space"
        ],
        "decision_prompts": [
            "Where can I lead?",
            "How do I inspire others?",
            "What does confident action look like?"
        ]
    },
    
    "w14": {  # King of Wands
        "lens_keyword": "Vision",
        "core_dynamic": "Strategic leadership with big-picture focus.",
        "situation_highlight": [
            "Leadership role active",
            "Vision needs execution",
            "Influence over direction"
        ],
        "internal_state": [
            "Commanding presence",
            "Clear sense of purpose"
        ],
        "frictions": [
            "Impatience with details",
            "Autocratic tendencies"
        ],
        "useful_responses": [
            "Lead with vision",
            "Delegate execution",
            "Inspire through example"
        ],
        "decision_prompts": [
            "What is my vision?",
            "How do I lead this forward?",
            "What example do I set?"
        ]
    },
    
    # ============================================
    # MINOR ARCANA - CUPS (Water, Emotion, Relationships)
    # ============================================
    
    "c01": {  # Ace of Cups
        "lens_keyword": "Openness",
        "core_dynamic": "New emotional beginning or connection.",
        "situation_highlight": [
            "Emotional opportunity arising",
            "Heart opening",
            "New relationship or feeling"
        ],
        "internal_state": [
            "Receptive",
            "Emotionally available"
        ],
        "frictions": [
            "Overwhelm from feeling",
            "Vulnerability fears"
        ],
        "useful_responses": [
            "Receive openly",
            "Allow feelings to flow",
            "Trust emotional signals"
        ],
        "decision_prompts": [
            "What am I feeling deeply?",
            "What emotional opening exists?",
            "What do I want to receive?"
        ]
    },
    
    "c02": {  # Two of Cups
        "lens_keyword": "Connection",
        "core_dynamic": "Partnership and mutual exchange.",
        "situation_highlight": [
            "Relationship forming",
            "Equal exchange present",
            "Attraction or agreement"
        ],
        "internal_state": [
            "Desire for union",
            "Feeling matched"
        ],
        "frictions": [
            "Losing self in other",
            "Ignoring red flags"
        ],
        "useful_responses": [
            "Engage authentically",
            "Build partnership consciously",
            "Maintain individual identity"
        ],
        "decision_prompts": [
            "What connection is forming?",
            "What makes this partnership work?",
            "What do I bring to this?"
        ]
    },
    
    "c03": {  # Three of Cups
        "lens_keyword": "Friendship",
        "core_dynamic": "Celebration and community joy.",
        "situation_highlight": [
            "Social connection thriving",
            "Reason to celebrate together",
            "Support network active"
        ],
        "internal_state": [
            "Joyful",
            "Sense of belonging"
        ],
        "frictions": [
            "Excess or indulgence",
            "Superficial connections"
        ],
        "useful_responses": [
            "Celebrate with community",
            "Nurture friendships",
            "Share joy openly"
        ],
        "decision_prompts": [
            "Who should I celebrate with?",
            "What community supports me?",
            "What joy can I share?"
        ]
    },
    
    "c04": {  # Four of Cups
        "lens_keyword": "Apathy",
        "core_dynamic": "Emotional withdrawal or dissatisfaction.",
        "situation_highlight": [
            "Feeling unfulfilled",
            "Options not appealing",
            "Missing what's offered"
        ],
        "internal_state": [
            "Bored or disconnected",
            "Emotionally flat"
        ],
        "frictions": [
            "Missing opportunities",
            "Self-pity"
        ],
        "useful_responses": [
            "Notice what's being offered",
            "Explore the source of discontent",
            "Re-engage gradually"
        ],
        "decision_prompts": [
            "What am I not seeing?",
            "What would satisfy me?",
            "What opportunity am I ignoring?"
        ]
    },
    
    "c05": {  # Five of Cups
        "lens_keyword": "Loss",
        "core_dynamic": "Grief and focus on what's gone.",
        "situation_highlight": [
            "Loss experienced",
            "Disappointment present",
            "Something remains"
        ],
        "internal_state": [
            "Sadness",
            "Regret"
        ],
        "frictions": [
            "Fixating on loss",
            "Missing what remains"
        ],
        "useful_responses": [
            "Allow grief its time",
            "Notice what's still standing",
            "Turn around when ready"
        ],
        "decision_prompts": [
            "What am I mourning?",
            "What still remains?",
            "When will I be ready to turn?"
        ]
    },
    
    "c06": {  # Six of Cups
        "lens_keyword": "Nostalgia",
        "core_dynamic": "Connection to past and innocence.",
        "situation_highlight": [
            "Past influences present",
            "Childhood memories surfacing",
            "Gifts from the past"
        ],
        "internal_state": [
            "Sentimental",
            "Longing for simplicity"
        ],
        "frictions": [
            "Living in the past",
            "Idealization"
        ],
        "useful_responses": [
            "Honor the past",
            "Take useful lessons forward",
            "Stay present"
        ],
        "decision_prompts": [
            "What from the past is relevant now?",
            "What pattern is repeating?",
            "What can I reclaim?"
        ]
    },
    
    "c07": {  # Seven of Cups
        "lens_keyword": "Fantasy",
        "core_dynamic": "Many options, some illusory.",
        "situation_highlight": [
            "Choices overwhelming",
            "Not all options real",
            "Dreams vs reality unclear"
        ],
        "internal_state": [
            "Dreamy",
            "Scattered attention"
        ],
        "frictions": [
            "Escapism",
            "Indecision"
        ],
        "useful_responses": [
            "Ground in reality",
            "Test options before committing",
            "Choose one and move"
        ],
        "decision_prompts": [
            "Which option is real?",
            "What am I fantasizing about?",
            "What can I actually have?"
        ]
    },
    
    "c08": {  # Eight of Cups
        "lens_keyword": "Departure",
        "core_dynamic": "Walking away from what no longer serves.",
        "situation_highlight": [
            "Time to leave something",
            "Emotional completion",
            "Search for something more"
        ],
        "internal_state": [
            "Ready to move on",
            "Bittersweet"
        ],
        "frictions": [
            "Fear of unknown",
            "Guilt about leaving"
        ],
        "useful_responses": [
            "Honor what was",
            "Trust the need to go",
            "Move toward, not just away"
        ],
        "decision_prompts": [
            "What am I leaving?",
            "What am I seeking?",
            "Is it time to go?"
        ]
    },
    
    "c09": {  # Nine of Cups
        "lens_keyword": "Satisfaction",
        "core_dynamic": "Emotional fulfillment and contentment.",
        "situation_highlight": [
            "Wishes coming true",
            "Emotional needs met",
            "Abundance present"
        ],
        "internal_state": [
            "Content",
            "Grateful"
        ],
        "frictions": [
            "Complacency",
            "Smugness"
        ],
        "useful_responses": [
            "Enjoy what you have",
            "Share abundance",
            "Don't stop growing"
        ],
        "decision_prompts": [
            "What am I grateful for?",
            "What wish has been granted?",
            "What comes after satisfaction?"
        ]
    },
    
    "c10": {  # Ten of Cups
        "lens_keyword": "Fulfillment",
        "core_dynamic": "Emotional completion and lasting happiness.",
        "situation_highlight": [
            "Harmony achieved",
            "Family or community thriving",
            "Lasting emotional security"
        ],
        "internal_state": [
            "Deep contentment",
            "Sense of completion"
        ],
        "frictions": [
            "Idealization",
            "Fear of losing happiness"
        ],
        "useful_responses": [
            "Appreciate fully",
            "Nurture what you have",
            "Share happiness"
        ],
        "decision_prompts": [
            "What brings lasting happiness?",
            "What relationship needs nurturing?",
            "How do I protect this joy?"
        ]
    },
    
    "c11": {  # Page of Cups
        "lens_keyword": "Imagination",
        "core_dynamic": "Emotional openness and creative intuition.",
        "situation_highlight": [
            "Intuitive message arriving",
            "Creative impulse",
            "Emotional opportunity"
        ],
        "internal_state": [
            "Open and curious",
            "Playfully emotional"
        ],
        "frictions": [
            "Over-sensitivity",
            "Immaturity in feelings"
        ],
        "useful_responses": [
            "Listen to intuition",
            "Explore feelings creatively",
            "Stay open to surprise"
        ],
        "decision_prompts": [
            "What is my intuition saying?",
            "What creative impulse is arising?",
            "What message is arriving?"
        ]
    },
    
    "c12": {  # Knight of Cups
        "lens_keyword": "Romance",
        "core_dynamic": "Pursuit of emotional or creative ideals.",
        "situation_highlight": [
            "Romantic gesture",
            "Invitation arriving",
            "Idealistic pursuit"
        ],
        "internal_state": [
            "Dreamy and romantic",
            "Following the heart"
        ],
        "frictions": [
            "Unrealistic expectations",
            "Moodiness"
        ],
        "useful_responses": [
            "Follow your heart wisely",
            "Balance dreams with reality",
            "Make the romantic gesture"
        ],
        "decision_prompts": [
            "What does my heart want?",
            "What invitation should I make?",
            "What ideal am I pursuing?"
        ]
    },
    
    "c13": {  # Queen of Cups
        "lens_keyword": "Empathy",
        "core_dynamic": "Emotional depth and intuitive understanding.",
        "situation_highlight": [
            "Emotional support needed",
            "Intuitive insight available",
            "Nurturing presence"
        ],
        "internal_state": [
            "Deeply feeling",
            "Compassionate"
        ],
        "frictions": [
            "Emotional absorption",
            "Losing boundaries"
        ],
        "useful_responses": [
            "Trust your intuition",
            "Offer compassion with boundaries",
            "Honor emotional wisdom"
        ],
        "decision_prompts": [
            "What am I intuiting?",
            "Who needs emotional support?",
            "How do I protect my energy?"
        ]
    },
    
    "c14": {  # King of Cups
        "lens_keyword": "Composure",
        "core_dynamic": "Emotional mastery and calm leadership.",
        "situation_highlight": [
            "Emotional stability needed",
            "Diplomatic approach required",
            "Feeling and thinking balanced"
        ],
        "internal_state": [
            "Emotionally balanced",
            "Wise compassion"
        ],
        "frictions": [
            "Emotional suppression",
            "Manipulation"
        ],
        "useful_responses": [
            "Lead with emotional intelligence",
            "Stay calm under pressure",
            "Balance heart and head"
        ],
        "decision_prompts": [
            "How do I stay emotionally balanced?",
            "What diplomatic approach works?",
            "What does wise compassion look like?"
        ]
    },
    
    # ============================================
    # MINOR ARCANA - SWORDS (Air, Mind, Conflict)
    # ============================================
    
    "s01": {  # Ace of Swords
        "lens_keyword": "Breakthrough",
        "core_dynamic": "Mental clarity cutting through confusion.",
        "situation_highlight": [
            "New idea or truth emerging",
            "Mental clarity available",
            "Decision point"
        ],
        "internal_state": [
            "Sharp thinking",
            "Ready to cut through"
        ],
        "frictions": [
            "Harsh truth",
            "Cold logic"
        ],
        "useful_responses": [
            "Embrace clarity",
            "Speak truth",
            "Make the decision"
        ],
        "decision_prompts": [
            "What truth is becoming clear?",
            "What must be decided now?",
            "What confusion needs cutting?"
        ]
    },
    
    "s02": {  # Two of Swords
        "lens_keyword": "Stalemate",
        "core_dynamic": "Blocked decision or avoidance.",
        "situation_highlight": [
            "Decision being avoided",
            "Information blocked",
            "Balance through inaction"
        ],
        "internal_state": [
            "Conflicted",
            "Refusing to see"
        ],
        "frictions": [
            "Denial",
            "Paralysis"
        ],
        "useful_responses": [
            "Face the decision",
            "Remove the blindfold",
            "Accept imperfect information"
        ],
        "decision_prompts": [
            "What am I avoiding deciding?",
            "What am I refusing to see?",
            "What happens if I keep waiting?"
        ]
    },
    
    "s03": {  # Three of Swords
        "lens_keyword": "Heartbreak",
        "core_dynamic": "Pain from truth or separation.",
        "situation_highlight": [
            "Painful truth revealed",
            "Heartbreak or betrayal",
            "Necessary grief"
        ],
        "internal_state": [
            "Hurt",
            "Processing pain"
        ],
        "frictions": [
            "Dwelling in pain",
            "Avoiding healing"
        ],
        "useful_responses": [
            "Allow the pain",
            "Seek understanding",
            "Begin healing"
        ],
        "decision_prompts": [
            "What painful truth must I accept?",
            "What is this pain teaching?",
            "What healing is needed?"
        ]
    },
    
    "s04": {  # Four of Swords
        "lens_keyword": "Rest",
        "core_dynamic": "Recovery through withdrawal.",
        "situation_highlight": [
            "Need for rest",
            "Recovery period",
            "Mental restoration"
        ],
        "internal_state": [
            "Exhausted",
            "Need for peace"
        ],
        "frictions": [
            "Avoiding rest",
            "Isolation as escape"
        ],
        "useful_responses": [
            "Take the rest",
            "Recover before acting",
            "Allow mental reset"
        ],
        "decision_prompts": [
            "What rest do I need?",
            "What can wait while I recover?",
            "How do I restore myself?"
        ]
    },
    
    "s05": {  # Five of Swords
        "lens_keyword": "Defeat",
        "core_dynamic": "Conflict with unclear victory.",
        "situation_highlight": [
            "Winning at a cost",
            "Conflict aftermath",
            "Someone loses"
        ],
        "internal_state": [
            "Hollow victory or defeat",
            "Conflict fatigue"
        ],
        "frictions": [
            "Winning at all costs",
            "Humiliation"
        ],
        "useful_responses": [
            "Count the real cost",
            "Know when to concede",
            "Preserve relationships"
        ],
        "decision_prompts": [
            "What is the real cost of winning?",
            "Is this battle worth fighting?",
            "What relationship is at risk?"
        ]
    },
    
    "s06": {  # Six of Swords
        "lens_keyword": "Transition",
        "core_dynamic": "Moving away from difficulty.",
        "situation_highlight": [
            "Leaving trouble behind",
            "Journey to calmer waters",
            "Necessary transition"
        ],
        "internal_state": [
            "Subdued relief",
            "Processing while moving"
        ],
        "frictions": [
            "Carrying baggage",
            "Reluctance to leave"
        ],
        "useful_responses": [
            "Accept the transition",
            "Move toward peace",
            "Process while traveling"
        ],
        "decision_prompts": [
            "What am I leaving behind?",
            "Where am I heading?",
            "What do I carry forward?"
        ]
    },
    
    "s07": {  # Seven of Swords
        "lens_keyword": "Strategy",
        "core_dynamic": "Indirect approach or deception.",
        "situation_highlight": [
            "Need for cleverness",
            "Not all is visible",
            "Strategic retreat or theft"
        ],
        "internal_state": [
            "Calculating",
            "Secretive"
        ],
        "frictions": [
            "Dishonesty",
            "Getting caught"
        ],
        "useful_responses": [
            "Be strategic, not deceptive",
            "Question motives",
            "Protect yourself"
        ],
        "decision_prompts": [
            "What requires indirect approach?",
            "Is someone being deceptive?",
            "What am I hiding or avoiding?"
        ]
    },
    
    "s08": {  # Eight of Swords
        "lens_keyword": "Restriction",
        "core_dynamic": "Feeling trapped by thoughts.",
        "situation_highlight": [
            "Mental imprisonment",
            "Options seem blocked",
            "Self-imposed limits"
        ],
        "internal_state": [
            "Trapped",
            "Helpless feeling"
        ],
        "frictions": [
            "Victim mentality",
            "Not seeing exits"
        ],
        "useful_responses": [
            "Question the constraints",
            "Look for the exit",
            "Ask for help"
        ],
        "decision_prompts": [
            "What is actually limiting me?",
            "What exit am I not seeing?",
            "What belief keeps me stuck?"
        ]
    },
    
    "s09": {  # Nine of Swords
        "lens_keyword": "Anxiety",
        "core_dynamic": "Mental anguish and worry.",
        "situation_highlight": [
            "Overthinking",
            "Night-time worries",
            "Fears amplified"
        ],
        "internal_state": [
            "Anxious",
            "Unable to rest"
        ],
        "frictions": [
            "Catastrophizing",
            "Isolation in worry"
        ],
        "useful_responses": [
            "Separate fear from fact",
            "Share your concerns",
            "Address what you can control"
        ],
        "decision_prompts": [
            "What am I really afraid of?",
            "What is fact vs fear?",
            "Who can I talk to?"
        ]
    },
    
    "s10": {  # Ten of Swords
        "lens_keyword": "Ending",
        "core_dynamic": "Complete ending or bottoming out.",
        "situation_highlight": [
            "Rock bottom reached",
            "Situation fully ended",
            "Dawn after darkness"
        ],
        "internal_state": [
            "Exhausted defeat",
            "Surrender"
        ],
        "frictions": [
            "Dramatizing pain",
            "Not accepting the end"
        ],
        "useful_responses": [
            "Accept the ending",
            "Notice the new dawn",
            "Don't prolong suffering"
        ],
        "decision_prompts": [
            "What has definitively ended?",
            "What new beginning follows?",
            "How do I accept this?"
        ]
    },
    
    "s11": {  # Page of Swords
        "lens_keyword": "Curiosity",
        "core_dynamic": "Mental eagerness and watchfulness.",
        "situation_highlight": [
            "Information gathering",
            "New ideas forming",
            "Vigilance needed"
        ],
        "internal_state": [
            "Alert and curious",
            "Quick thinking"
        ],
        "frictions": [
            "Gossip",
            "Overthinking"
        ],
        "useful_responses": [
            "Gather information carefully",
            "Think before speaking",
            "Stay curious but grounded"
        ],
        "decision_prompts": [
            "What information do I need?",
            "What am I discovering?",
            "What should I investigate?"
        ]
    },
    
    "s12": {  # Knight of Swords
        "lens_keyword": "Charge",
        "core_dynamic": "Aggressive pursuit of truth or goal.",
        "situation_highlight": [
            "Swift action needed",
            "Rushing forward",
            "Cutting through obstacles"
        ],
        "internal_state": [
            "Determined",
            "Impatient for results"
        ],
        "frictions": [
            "Recklessness",
            "Hurting others in haste"
        ],
        "useful_responses": [
            "Act decisively but carefully",
            "Consider impact on others",
            "Channel aggression productively"
        ],
        "decision_prompts": [
            "What requires swift action?",
            "Am I rushing recklessly?",
            "What's the cost of speed?"
        ]
    },
    
    "s13": {  # Queen of Swords
        "lens_keyword": "Discernment",
        "core_dynamic": "Clear perception and honest assessment.",
        "situation_highlight": [
            "Truth needs telling",
            "Clear boundaries needed",
            "Objective assessment"
        ],
        "internal_state": [
            "Clear-minded",
            "Emotionally protected"
        ],
        "frictions": [
            "Coldness",
            "Excessive criticism"
        ],
        "useful_responses": [
            "Speak truth clearly",
            "Maintain healthy boundaries",
            "Judge fairly"
        ],
        "decision_prompts": [
            "What truth needs speaking?",
            "What boundary do I need?",
            "What is the fair assessment?"
        ]
    },
    
    "s14": {  # King of Swords
        "lens_keyword": "Authority",
        "core_dynamic": "Intellectual leadership and clear judgment.",
        "situation_highlight": [
            "Decision authority present",
            "Need for clear thinking",
            "Leadership through logic"
        ],
        "internal_state": [
            "Rational and authoritative",
            "Clear judgment"
        ],
        "frictions": [
            "Emotional detachment",
            "Harsh judgments"
        ],
        "useful_responses": [
            "Lead with clarity",
            "Make fair decisions",
            "Balance logic with humanity"
        ],
        "decision_prompts": [
            "What decision must I make?",
            "What is the logical choice?",
            "How do I lead fairly?"
        ]
    },
    
    # ============================================
    # MINOR ARCANA - PENTACLES (Earth, Material, Practical)
    # ============================================
    
    "p01": {  # Ace of Pentacles
        "lens_keyword": "Opportunity",
        "core_dynamic": "New material or practical opportunity.",
        "situation_highlight": [
            "Financial opportunity",
            "New resource available",
            "Practical beginning"
        ],
        "internal_state": [
            "Grounded optimism",
            "Ready to build"
        ],
        "frictions": [
            "Missing the opportunity",
            "Greed"
        ],
        "useful_responses": [
            "Seize the opportunity",
            "Plant the seed",
            "Start building"
        ],
        "decision_prompts": [
            "What opportunity is presenting itself?",
            "What foundation can I build?",
            "What resource should I develop?"
        ]
    },
    
    "p02": {  # Two of Pentacles
        "lens_keyword": "Juggling",
        "core_dynamic": "Balancing multiple demands.",
        "situation_highlight": [
            "Multiple priorities",
            "Need for flexibility",
            "Change management"
        ],
        "internal_state": [
            "Adaptable but stretched",
            "Managing flow"
        ],
        "frictions": [
            "Dropping something",
            "Unsustainable pace"
        ],
        "useful_responses": [
            "Stay flexible",
            "Prioritize consciously",
            "Find sustainable rhythm"
        ],
        "decision_prompts": [
            "What am I juggling?",
            "What can I simplify?",
            "What rhythm works?"
        ]
    },
    
    "p03": {  # Three of Pentacles
        "lens_keyword": "Collaboration",
        "core_dynamic": "Teamwork producing quality results.",
        "situation_highlight": [
            "Skilled collaboration",
            "Learning from expertise",
            "Building something together"
        ],
        "internal_state": [
            "Engaged in craft",
            "Valuing contribution"
        ],
        "frictions": [
            "Ego conflicts",
            "Unequal contribution"
        ],
        "useful_responses": [
            "Collaborate genuinely",
            "Value different skills",
            "Focus on quality"
        ],
        "decision_prompts": [
            "Who should I collaborate with?",
            "What skills do I need help with?",
            "What quality matters most?"
        ]
    },
    
    "p04": {  # Four of Pentacles
        "lens_keyword": "Security",
        "core_dynamic": "Holding onto resources protectively.",
        "situation_highlight": [
            "Financial stability",
            "Protective stance",
            "Control over resources"
        ],
        "internal_state": [
            "Security-focused",
            "Fear of loss"
        ],
        "frictions": [
            "Hoarding",
            "Stagnation from fear"
        ],
        "useful_responses": [
            "Secure what matters",
            "Know the difference between protection and hoarding",
            "Consider what to release"
        ],
        "decision_prompts": [
            "What am I protecting?",
            "Is this security or fear?",
            "What could I release?"
        ]
    },
    
    "p05": {  # Five of Pentacles
        "lens_keyword": "Hardship",
        "core_dynamic": "Material difficulty or exclusion.",
        "situation_highlight": [
            "Financial or material struggle",
            "Feeling left out",
            "Help available nearby"
        ],
        "internal_state": [
            "Struggling",
            "Isolated in difficulty"
        ],
        "frictions": [
            "Pride preventing help",
            "Victim mentality"
        ],
        "useful_responses": [
            "Accept help available",
            "Look for resources",
            "This too shall pass"
        ],
        "decision_prompts": [
            "What help is available?",
            "What am I not seeing?",
            "Who can I ask for support?"
        ]
    },
    
    "p06": {  # Six of Pentacles
        "lens_keyword": "Generosity",
        "core_dynamic": "Giving and receiving in balance.",
        "situation_highlight": [
            "Resource sharing",
            "Charity or support",
            "Power dynamics in giving"
        ],
        "internal_state": [
            "Generous or receiving",
            "Aware of balance"
        ],
        "frictions": [
            "Strings attached",
            "Unequal exchange"
        ],
        "useful_responses": [
            "Give or receive gracefully",
            "Notice power dynamics",
            "Keep exchange balanced"
        ],
        "decision_prompts": [
            "Am I giving or receiving?",
            "Is this exchange fair?",
            "What should I share?"
        ]
    },
    
    "p07": {  # Seven of Pentacles
        "lens_keyword": "Assessment",
        "core_dynamic": "Evaluating progress and investment.",
        "situation_highlight": [
            "Results not yet complete",
            "Investment under review",
            "Patience required"
        ],
        "internal_state": [
            "Reflective",
            "Wondering if worth it"
        ],
        "frictions": [
            "Impatience",
            "Giving up too soon"
        ],
        "useful_responses": [
            "Assess honestly",
            "Stay patient",
            "Adjust strategy if needed"
        ],
        "decision_prompts": [
            "What is the progress so far?",
            "Is this investment worth continuing?",
            "What adjustment would help?"
        ]
    },
    
    "p08": {  # Eight of Pentacles
        "lens_keyword": "Mastery",
        "core_dynamic": "Dedicated skill development.",
        "situation_highlight": [
            "Learning and improving",
            "Focused practice",
            "Craftsmanship"
        ],
        "internal_state": [
            "Engaged in work",
            "Dedicated to improvement"
        ],
        "frictions": [
            "Perfectionism",
            "Missing bigger picture"
        ],
        "useful_responses": [
            "Keep practicing",
            "Focus on quality",
            "Commit to mastery"
        ],
        "decision_prompts": [
            "What skill needs development?",
            "What mastery am I building?",
            "What deserves dedicated practice?"
        ]
    },
    
    "p09": {  # Nine of Pentacles
        "lens_keyword": "Independence",
        "core_dynamic": "Self-sufficiency and earned comfort.",
        "situation_highlight": [
            "Financial independence",
            "Enjoying earned success",
            "Self-reliance"
        ],
        "internal_state": [
            "Comfortable and secure",
            "Appreciating achievements"
        ],
        "frictions": [
            "Isolation",
            "Complacency"
        ],
        "useful_responses": [
            "Enjoy what you've built",
            "Maintain independence",
            "Share abundance"
        ],
        "decision_prompts": [
            "What have I earned?",
            "What does self-sufficiency look like?",
            "How do I enjoy this success?"
        ]
    },
    
    "p10": {  # Ten of Pentacles
        "lens_keyword": "Legacy",
        "core_dynamic": "Lasting wealth and generational success.",
        "situation_highlight": [
            "Family wealth or stability",
            "Long-term security",
            "Inheritance or tradition"
        ],
        "internal_state": [
            "Secure in legacy",
            "Connected to lineage"
        ],
        "frictions": [
            "Family conflicts",
            "Burden of tradition"
        ],
        "useful_responses": [
            "Think long-term",
            "Honor tradition wisely",
            "Build lasting foundations"
        ],
        "decision_prompts": [
            "What legacy am I building?",
            "What tradition matters?",
            "What lasts beyond me?"
        ]
    },
    
    "p11": {  # Page of Pentacles
        "lens_keyword": "Study",
        "core_dynamic": "Learning practical skills with dedication.",
        "situation_highlight": [
            "New learning opportunity",
            "Practical education",
            "Beginning skill development"
        ],
        "internal_state": [
            "Studious and eager",
            "Focused on learning"
        ],
        "frictions": [
            "Slow progress",
            "Impatience with basics"
        ],
        "useful_responses": [
            "Start learning",
            "Be patient with process",
            "Build foundations"
        ],
        "decision_prompts": [
            "What should I learn?",
            "What practical skill would help?",
            "What foundation needs building?"
        ]
    },
    
    "p12": {  # Knight of Pentacles
        "lens_keyword": "Persistence",
        "core_dynamic": "Steady, reliable progress.",
        "situation_highlight": [
            "Slow and steady approach",
            "Reliable effort",
            "Methodical work"
        ],
        "internal_state": [
            "Patient determination",
            "Committed to process"
        ],
        "frictions": [
            "Stubbornness",
            "Missing opportunities from slowness"
        ],
        "useful_responses": [
            "Stay the course",
            "Trust the process",
            "Be reliable"
        ],
        "decision_prompts": [
            "What requires steady effort?",
            "Am I being patient enough?",
            "What must be done consistently?"
        ]
    },
    
    "p13": {  # Queen of Pentacles
        "lens_keyword": "Nurture",
        "core_dynamic": "Practical care and material security.",
        "situation_highlight": [
            "Home and comfort focus",
            "Practical nurturing",
            "Financial wisdom"
        ],
        "internal_state": [
            "Grounded and caring",
            "Practically supportive"
        ],
        "frictions": [
            "Over-giving",
            "Neglecting self"
        ],
        "useful_responses": [
            "Create comfortable environment",
            "Care for practical needs",
            "Balance giving with receiving"
        ],
        "decision_prompts": [
            "What needs practical care?",
            "How do I create security?",
            "What nurtures me?"
        ]
    },
    
    "p14": {  # King of Pentacles
        "lens_keyword": "Abundance",
        "core_dynamic": "Material success and wise stewardship.",
        "situation_highlight": [
            "Financial mastery",
            "Business leadership",
            "Wealth management"
        ],
        "internal_state": [
            "Secure and successful",
            "Responsible stewardship"
        ],
        "frictions": [
            "Materialism",
            "Stubbornness about money"
        ],
        "useful_responses": [
            "Lead with generosity",
            "Manage resources wisely",
            "Create lasting value"
        ],
        "decision_prompts": [
            "What does wise stewardship look like?",
            "How do I create sustainable success?",
            "What value am I building?"
        ]
    }
}

def get_card_template(card_id: str) -> dict:
    """Get the template data for a specific card."""
    return CARD_TEMPLATES.get(card_id, {})

def get_lens_keyword(card_id: str) -> str:
    """Get the lens keyword for a card."""
    template = get_card_template(card_id)
    return template.get("lens_keyword", "")

def get_core_dynamic(card_id: str) -> str:
    """Get the core dynamic for a card."""
    template = get_card_template(card_id)
    return template.get("core_dynamic", "")

def get_decision_prompts(card_id: str) -> list:
    """Get the decision prompts for a card."""
    template = get_card_template(card_id)
    return template.get("decision_prompts", [])

def get_situation_highlights(card_id: str) -> list:
    """Get situation highlights for a card."""
    template = get_card_template(card_id)
    return template.get("situation_highlight", [])

def get_useful_responses(card_id: str) -> list:
    """Get useful responses for a card."""
    template = get_card_template(card_id)
    return template.get("useful_responses", [])
