import os
import sys
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.enum.shapes import MSO_SHAPE

def create_presentation():
    prs = Presentation()
    prs.slide_width = Inches(13.333)
    prs.slide_height = Inches(7.5)
    blank_layout = prs.slide_layouts[6]

    # Color Palette Definitions
    DARK_BG = RGBColor(10, 25, 47)        # #0A192F Navy
    DARK_CARD = RGBColor(17, 34, 64)      # #112240 Dark Blue Card
    LIGHT_BG = RGBColor(248, 250, 252)    # #F8FAFC Off-white / light slate
    WHITE = RGBColor(255, 255, 255)       # #FFFFFF
    PRIMARY_BLUE = RGBColor(37, 99, 235)  # #2563EB Royal Blue
    NAVY_TEXT = RGBColor(15, 23, 42)      # #0F172A Dark Slate Text
    MUTED_TEXT = RGBColor(100, 116, 139)  # #64748B Slate Muted
    LIGHT_MUTED = RGBColor(148, 163, 184) # #94A3B8 Light Slate Muted
    TEAL = RGBColor(13, 148, 136)         # #0D9488 Teal Accent
    AMBER = RGBColor(217, 119, 6)         # #D97706 Amber Accent
    CARD_BG = RGBColor(255, 255, 255)     # White for cards
    CARD_BORDER = RGBColor(226, 232, 240) # #E2E8F0 Subtle Border
    LIGHT_BLUE_BG = RGBColor(239, 246, 255) # #EFF6FF
    LIGHT_AMBER_BG = RGBColor(254, 243, 199) # #FEF3C7
    LIGHT_TEAL_BG = RGBColor(204, 251, 241) # #CCFBF1

    def add_header(slide, tag_text, title_text, dark=False):
        # Tag / Category
        tag_box = slide.shapes.add_textbox(Inches(0.8), Inches(0.45), Inches(11.7), Inches(0.35))
        tf_tag = tag_box.text_frame
        tf_tag.word_wrap = True
        tf_tag.margin_left = tf_tag.margin_right = tf_tag.margin_top = tf_tag.margin_bottom = 0
        p_tag = tf_tag.paragraphs[0]
        p_tag.text = tag_text.upper()
        p_tag.font.name = "Arial"
        p_tag.font.size = Pt(10)
        p_tag.font.bold = True
        p_tag.font.color.rgb = TEAL if not dark else RGBColor(56, 189, 248)

        # Title
        title_box = slide.shapes.add_textbox(Inches(0.8), Inches(0.75), Inches(11.7), Inches(0.65))
        tf_title = title_box.text_frame
        tf_title.word_wrap = True
        tf_title.margin_left = tf_title.margin_right = tf_title.margin_top = tf_title.margin_bottom = 0
        p_title = tf_title.paragraphs[0]
        p_title.text = title_text
        p_title.font.name = "Arial"
        p_title.font.size = Pt(22)
        p_title.font.bold = True
        p_title.font.color.rgb = WHITE if dark else NAVY_TEXT

    def set_slide_background(slide, color):
        bg = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, Inches(13.333), Inches(7.5))
        bg.fill.solid()
        bg.fill.fore_color.rgb = color
        bg.line.fill.background()
        return bg

    def add_card(slide, left, top, width, height, bg_color=CARD_BG, border_color=CARD_BORDER):
        card = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, top, width, height)
        card.fill.solid()
        card.fill.fore_color.rgb = bg_color
        if border_color:
            card.line.color.rgb = border_color
            card.line.width = Pt(1.2)
        else:
            card.line.fill.background()
        return card

    def add_speaker_notes(slide, notes_text):
        notes_slide = slide.notes_slide
        text_frame = notes_slide.notes_text_frame
        text_frame.text = notes_text

    # =========================================================================
    # SLIDE 1: TITLE SLIDE (Dark Theme)
    # =========================================================================
    s1 = prs.slides.add_slide(blank_layout)
    set_slide_background(s1, DARK_BG)

    # Accent decorative bar
    bar = s1.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0.8), Inches(1.8), Inches(0.8), Inches(0.08))
    bar.fill.solid()
    bar.fill.fore_color.rgb = TEAL
    bar.line.fill.background()

    # Category Badge
    c_box = s1.shapes.add_textbox(Inches(0.8), Inches(2.1), Inches(11.5), Inches(0.4))
    p = c_box.text_frame.paragraphs[0]
    p.text = "DEPARTMENT OF BIOTECHNOLOGY  •  ADVANCED ENZYMOLOGY & BIOCHEMISTRY"
    p.font.name = "Arial"
    p.font.size = Pt(11)
    p.font.bold = True
    p.font.color.rgb = RGBColor(56, 189, 248)

    # Main Title
    t_box = s1.shapes.add_textbox(Inches(0.8), Inches(2.6), Inches(11.5), Inches(1.8))
    tf = t_box.text_frame
    tf.word_wrap = True
    p1 = tf.paragraphs[0]
    p1.text = "Preparation of Buffers and Reagents\nfor Enzyme Assays"
    p1.font.name = "Arial"
    p1.font.size = Pt(36)
    p1.font.bold = True
    p1.font.color.rgb = WHITE

    # Subtitle
    sub_box = s1.shapes.add_textbox(Inches(0.8), Inches(4.5), Inches(11.5), Inches(0.8))
    tf_sub = sub_box.text_frame
    tf_sub.word_wrap = True
    p_sub = tf_sub.paragraphs[0]
    p_sub.text = "Chemical Principles, Thermodynamic Foundations, Formulation Protocols, and Analytical Best Practices"
    p_sub.font.name = "Arial"
    p_sub.font.size = Pt(16)
    p_sub.font.color.rgb = LIGHT_MUTED

    # Presenter Card
    p_card = add_card(s1, Inches(0.8), Inches(5.6), Inches(11.7), Inches(1.2), bg_color=DARK_CARD, border_color=RGBColor(30, 58, 138))
    info_box = s1.shapes.add_textbox(Inches(1.1), Inches(5.75), Inches(11.1), Inches(0.9))
    tf_info = info_box.text_frame
    tf_info.word_wrap = True
    p_info1 = tf_info.paragraphs[0]
    p_info1.text = "Academic Seminar Presentation  |  Biotechnology Degree Program"
    p_info1.font.name = "Arial"
    p_info1.font.size = Pt(13)
    p_info1.font.bold = True
    p_info1.font.color.rgb = WHITE
    p_info2 = tf_info.add_paragraph()
    p_info2.text = "Focus Areas: Solution Chemistry, Good's Buffers, Thiol Protection, Cofactor Kinetics, SOPs & Quality Control"
    p_info2.font.name = "Arial"
    p_info2.font.size = Pt(11)
    p_info2.font.color.rgb = RGBColor(148, 163, 184)

    add_speaker_notes(s1,
        "Good morning / afternoon Dr. [Doctor's Name] and colleagues.\n\n"
        "Today, I am presenting on 'Preparation of Buffers and Reagents for Enzyme Assays: Chemical Principles, Formulation Protocols, and Analytical Best Practices.'\n\n"
        "In biotechnology and protein chemistry, enzymes are delicate biocatalysts whose reaction velocities, binding affinities (Km), and structural integrities depend entirely on their immediate microenvironment. An enzyme assay is only as reproducible as the chemical buffer in which it takes place. Today, we will examine the thermodynamic principles of buffering, how to select and formulate traditional vs. Good's buffers, the chemistry of essential reagents and stabilizers, step-by-step SOPs, and critical troubleshooting strategies to avoid common laboratory artifacts."
    )

    # =========================================================================
    # SLIDE 2: EXECUTIVE SUMMARY & ROADMAP (Light Theme)
    # =========================================================================
    s2 = prs.slides.add_slide(blank_layout)
    set_slide_background(s2, LIGHT_BG)
    add_header(s2, "EXECUTIVE SUMMARY & PRESENTATION ROADMAP", "The Architecture of an Enzyme Reaction System")

    pillars = [
        ("01. Theoretical Foundations", "• Henderson-Hasselbalch equation\n• Buffering capacity (beta)\n• Temperature coefficients (dpKa/dT)\n• Active site ionization & kinetics", PRIMARY_BLUE),
        ("02. Buffer Selection", "• Traditional vs. Good's buffers\n• Comparative matrix of biological buffers\n• Metal ion compatibility\n• Spectral transparency in UV/Vis", TEAL),
        ("03. Reagents & Additives", "• Substrate purity & cosolvents\n• Metal cofactors & chelators (EDTA/EGTA)\n• Reducing agents (DTT, BME, TCEP)\n• Stabilizers (BSA, glycerol, detergents)", AMBER),
        ("04. Protocols & QC", "• 6-step SOP for buffer formulation\n• Quantitative calculations (Molarity, C1V1)\n• Three benchmark assay protocols\n• Troubleshooting & Quality Gates", RGBColor(79, 70, 229))
    ]

    card_w = Inches(2.75)
    card_h = Inches(4.3)
    card_top = Inches(1.6)
    left_start = Inches(0.8)
    spacing = Inches(0.24)

    for i, (title, content, accent) in enumerate(pillars):
        c_left = left_start + i * (card_w + spacing)
        add_card(s2, c_left, card_top, card_w, card_h)
        # Accent top line
        acc_bar = s2.shapes.add_shape(MSO_SHAPE.RECTANGLE, c_left, card_top, card_w, Inches(0.08))
        acc_bar.fill.solid()
        acc_bar.fill.fore_color.rgb = accent
        acc_bar.line.fill.background()

        t_box = s2.shapes.add_textbox(c_left + Inches(0.2), card_top + Inches(0.25), card_w - Inches(0.4), Inches(0.6))
        p = t_box.text_frame.paragraphs[0]
        p.text = title
        p.font.name = "Arial"
        p.font.size = Pt(13)
        p.font.bold = True
        p.font.color.rgb = NAVY_TEXT

        c_box = s2.shapes.add_textbox(c_left + Inches(0.2), card_top + Inches(0.85), card_w - Inches(0.4), Inches(3.2))
        tf = c_box.text_frame
        tf.word_wrap = True
        for line in content.split("\n"):
            p_line = tf.add_paragraph() if tf.paragraphs[0].text else tf.paragraphs[0]
            p_line.text = line
            p_line.font.name = "Arial"
            p_line.font.size = Pt(11)
            p_line.font.color.rgb = NAVY_TEXT

    # Bottom Callout
    bot_card = add_card(s2, Inches(0.8), Inches(6.15), Inches(11.7), Inches(0.85), bg_color=LIGHT_BLUE_BG, border_color=PRIMARY_BLUE)
    b_box = s2.shapes.add_textbox(Inches(1.0), Inches(6.25), Inches(11.3), Inches(0.65))
    tf_b = b_box.text_frame
    tf_b.word_wrap = True
    p_b = tf_b.paragraphs[0]
    p_b.text = "Core Thesis: Enzyme assays measure microscopic velocity under strictly controlled macroscopic conditions. A deviation of 0.2 pH units or trace metal precipitation can compromise Vmax or Km by over 50%."
    p_b.font.name = "Arial"
    p_b.font.size = Pt(11)
    p_b.font.bold = True
    p_b.font.color.rgb = PRIMARY_BLUE

    add_speaker_notes(s2,
        "To give an executive roadmap of this presentation:\n\n"
        "We divide the topic into four systematic pillars:\n"
        "1. First, the theoretical principles: What happens to an enzyme at the molecular level when pH and ionic strength shift? We will examine the Henderson-Hasselbalch relationship and temperature dependence.\n"
        "2. Second, how we select the appropriate buffer: comparing classic inorganic buffers with Good's zwitterionic buffers, and why metal compatibility and UV transparency are decisive.\n"
        "3. Third, formulating critical reagents: substrates, cofactors, reducing agents to preserve thiols, and stabilizers like BSA and glycerol.\n"
        "4. Fourth, execution: standard operating procedures, mathematical formulas, real-world assay recipes, and troubleshooting common laboratory failures."
    )

    # =========================================================================
    # SLIDE 3: THE ENZYME MICROENVIRONMENT (Light Theme)
    # =========================================================================
    s3 = prs.slides.add_slide(blank_layout)
    set_slide_background(s3, LIGHT_BG)
    add_header(s3, "ENZYME KINETICS & THERMODYNAMICS", "The Enzyme Microenvironment: Why Buffers Dictate Catalysis")

    points = [
        ("1. Active Site Ionization", "Catalytic amino acid side chains (His, Cys, Asp, Glu, Lys) act as general acids or general bases.\n\n• Nucleophiles (e.g., Cys-SH, Ser-OH) require specific deprotonation states.\n• Acid catalysts (e.g., Glu-COOH) must remain protonated.\n• Shift in pH changes the ionization fraction, directly collapsing catalytic turnover (kcat)."),
        ("2. Tertiary Structure & Folding", "Proteins are stabilized by delicate electrostatic salt bridges, hydrogen bonds, and hydrophobic cores.\n\n• Non-optimal pH alters net surface charge, inducing structural unfolding or aggregation.\n• Extremes of pH completely denature the quaternary assembly of multimeric enzymes."),
        ("3. Substrate Ionization & Binding", "Many substrates possess ionizable functional groups (e.g., ATP with 4 negative charges at neutral pH, phosphate esters, carboxylic acids).\n\n• Both enzyme binding pocket and substrate must maintain complementary charges.\n• Altered pH changes Km (apparent affinity) independently of enzyme denaturation.")
    ]

    for i, (title, desc) in enumerate(points):
        c_left = Inches(0.8) + i * Inches(3.95)
        add_card(s3, c_left, Inches(1.6), Inches(3.75), Inches(3.9))
        t_box = s3.shapes.add_textbox(c_left + Inches(0.2), Inches(1.8), Inches(3.35), Inches(0.6))
        p = t_box.text_frame.paragraphs[0]
        p.text = title
        p.font.name = "Arial"
        p.font.size = Pt(14)
        p.font.bold = True
        p.font.color.rgb = PRIMARY_BLUE

        d_box = s3.shapes.add_textbox(c_left + Inches(0.2), Inches(2.4), Inches(3.35), Inches(2.9))
        tf = d_box.text_frame
        tf.word_wrap = True
        for line in desc.split("\n"):
            p_line = tf.add_paragraph() if tf.paragraphs[0].text else tf.paragraphs[0]
            p_line.text = line
            p_line.font.name = "Arial"
            p_line.font.size = Pt(11)
            p_line.font.color.rgb = NAVY_TEXT

    # Bottom Bell Curve Box
    bell_card = add_card(s3, Inches(0.8), Inches(5.7), Inches(11.7), Inches(1.3), bg_color=LIGHT_TEAL_BG, border_color=TEAL)
    b_box = s3.shapes.add_textbox(Inches(1.0), Inches(5.8), Inches(11.3), Inches(1.1))
    tf_b = b_box.text_frame
    tf_b.word_wrap = True
    p_b1 = tf_b.paragraphs[0]
    p_b1.text = "The Bell-Shaped pH-Activity Profile:"
    p_b1.font.name = "Arial"
    p_b1.font.size = Pt(12)
    p_b1.font.bold = True
    p_b1.font.color.rgb = TEAL
    p_b2 = tf_b.add_paragraph()
    p_b2.text = "Most enzymes exhibit a bell-shaped activity curve defined by two ionizing residues: pKa1 (acidic limb, deprotonation needed for activity) and pKa2 (basic limb, protonation needed for activity). Maximum velocity (Vmax) occurs at the optimum pH (pHopt = 0.5 * (pKa1 + pKa2)). Buffers must maintain pH within ±0.05 units of this plateau."
    p_b2.font.name = "Arial"
    p_b2.font.size = Pt(11)
    p_b2.font.color.rgb = NAVY_TEXT

    add_speaker_notes(s3,
        "Here we examine why the chemical microenvironment is so critical for catalysis.\n\n"
        "An enzyme is not an inert catalyst like platinum; it is a flexible protein whose active site depends on the protonation states of specific amino acid side chains.\n"
        "For example, in a cysteine protease, the active site cysteine must be in the thiolate form (deprotonated) to attack the carbonyl substrate, while an adjacent histidine must be protonated. If the pH changes even slightly, the proportion of active enzyme molecules plummets.\n\n"
        "Furthermore, substrates like ATP or phospho-peptides are polyvalent ions; their charge changes with pH, which directly alters their binding affinity (Km). That is why enzymologists observe the classic bell-shaped pH-activity curve."
    )

    # =========================================================================
    # SLIDE 4: THEORETICAL FOUNDATIONS (Light Theme)
    # =========================================================================
    s4 = prs.slides.add_slide(blank_layout)
    set_slide_background(s4, LIGHT_BG)
    add_header(s4, "PHYSICAL BIOCHEMISTRY", "Theoretical Foundations: Henderson-Hasselbalch & Buffering Capacity")

    # Left Card: HH & Buffering Capacity
    add_card(s4, Inches(0.8), Inches(1.6), Inches(5.7), Inches(5.3))
    t_left = s4.shapes.add_textbox(Inches(1.0), Inches(1.8), Inches(5.3), Inches(0.5))
    p_tl = t_left.text_frame.paragraphs[0]
    p_tl.text = "1. Henderson-Hasselbalch & Buffer Capacity"
    p_tl.font.name = "Arial"
    p_tl.font.size = Pt(14)
    p_tl.font.bold = True
    p_tl.font.color.rgb = PRIMARY_BLUE

    box_l = s4.shapes.add_textbox(Inches(1.0), Inches(2.3), Inches(5.3), Inches(4.4))
    tf_l = box_l.text_frame
    tf_l.word_wrap = True
    text_l = (
        "• The Fundamental Equation:\n"
        "  pH = pKa + log([A-] / [HA])\n"
        "  Where [A-] is the conjugate base and [HA] is the weak acid.\n\n"
        "• Van Slyke Buffering Capacity (beta):\n"
        "  beta = dB / dpH = 2.303 * C * ([H+] * Ka) / ([H+] + Ka)^2\n"
        "  Where C is the total buffer concentration ([HA] + [A-]).\n\n"
        "• The Practical Buffering Rule:\n"
        "  Buffering capacity is maximal when pH = pKa (where [A-] = [HA]).\n"
        "  A buffer is ONLY effective within pH = pKa ± 1.0 (ideally ± 0.5).\n"
        "  Outside this window, adding minute amounts of acid/base causes drastic pH spikes."
    )
    for line in text_l.split("\n"):
        p_line = tf_l.add_paragraph() if tf_l.paragraphs[0].text else tf_l.paragraphs[0]
        p_line.text = line
        p_line.font.name = "Arial"
        p_line.font.size = Pt(11)
        p_line.font.color.rgb = NAVY_TEXT

    # Right Card: The Temperature Coefficient (dpKa/dT)
    add_card(s4, Inches(6.8), Inches(1.6), Inches(5.7), Inches(5.3))
    t_right = s4.shapes.add_textbox(Inches(7.0), Inches(1.8), Inches(5.3), Inches(0.5))
    p_tr = t_right.text_frame.paragraphs[0]
    p_tr.text = "2. The Temperature Coefficient (dpKa / dT)"
    p_tr.font.name = "Arial"
    p_tr.font.size = Pt(14)
    p_tr.font.bold = True
    p_tr.font.color.rgb = AMBER

    box_r = s4.shapes.add_textbox(Inches(7.0), Inches(2.3), Inches(5.3), Inches(4.4))
    tf_r = box_r.text_frame
    tf_r.word_wrap = True
    text_r = (
        "• Temperature-Induced Dissociation:\n"
        "  Buffer pKa is a thermodynamic equilibrium constant (Delta G° = -RT ln Ka).\n"
        "  As temperature changes, ionization enthalpy alters pKa.\n\n"
        "• The Tris Buffer Hazard (dpKa/dT = -0.028 / °C):\n"
        "  If you prepare Tris-HCl at pH 7.50 at room temperature (25°C):\n"
        "  Delta T = 37°C - 25°C = +12°C\n"
        "  Delta pH = 12 * (-0.028) = -0.34 pH units!\n"
        "  In your 37°C incubator, the assay pH is 7.16, NOT 7.50!\n\n"
        "• Golden Standard in Enzymology:\n"
        "  Always calibrate the pH meter and adjust final pH at the EXACT operating temperature of the enzyme assay."
    )
    for line in text_r.split("\n"):
        p_line = tf_r.add_paragraph() if tf_r.paragraphs[0].text else tf_r.paragraphs[0]
        p_line.text = line
        p_line.font.name = "Arial"
        p_line.font.size = Pt(11)
        p_line.font.color.rgb = NAVY_TEXT

    add_speaker_notes(s4,
        "Now let's examine the mathematical and physical foundations.\n\n"
        "The Henderson-Hasselbalch equation defines the relationship between pH, pKa, and the ratio of conjugate base to weak acid. Donald Van Slyke defined buffer capacity (beta) as the moles of strong acid or base required to change the pH by one unit.\n"
        "Notice that buffer capacity is directly proportional to total buffer concentration C, but peaks sharply when pH equals pKa. Therefore, rule number one: never use a buffer outside of its pKa plus or minus 1 range.\n\n"
        "On the right side is the single most common mistake students and even senior researchers make: the temperature coefficient, dpKa/dT. Amine buffers like Tris have high temperature coefficients (-0.028 per degree Celsius). If you titrate Tris to pH 7.50 at 25 degrees on the bench, and then run your assay at 37 degrees, the actual pH drops to 7.16! This completely invalidates your kinetic data."
    )

    # =========================================================================
    # SLIDE 5: BUFFER SELECTION: TRADITIONAL VS GOOD'S (Light Theme)
    # =========================================================================
    s5 = prs.slides.add_slide(blank_layout)
    set_slide_background(s5, LIGHT_BG)
    add_header(s5, "REAGENT SELECTION", "Buffer Selection: Traditional Inorganic Salts vs. Good's Buffers")

    # Left Column: Traditional Buffers
    add_card(s5, Inches(0.8), Inches(1.6), Inches(5.7), Inches(5.3))
    t_box1 = s5.shapes.add_textbox(Inches(1.0), Inches(1.8), Inches(5.3), Inches(0.5))
    p = t_box1.text_frame.paragraphs[0]
    p.text = "Traditional Buffers (Phosphate, Tris, Citrate)"
    p.font.name = "Arial"
    p.font.size = Pt(14)
    p.font.bold = True
    p.font.color.rgb = NAVY_TEXT

    d_box1 = s5.shapes.add_textbox(Inches(1.0), Inches(2.3), Inches(5.3), Inches(4.4))
    tf1 = d_box1.text_frame
    tf1.word_wrap = True
    text_trad = (
        "• Phosphate Buffer (PBS / Na-K Phosphate):\n"
        "  - Pros: Highly physiological, inexpensive, low dpKa/dT (-0.0028/°C).\n"
        "  - Cons: Forms insoluble precipitates with divalent cations (Ca2+, Mg2+); acts as an inhibitor/substrate for kinases and phosphatases.\n\n"
        "• Tris Buffer (Tris(hydroxymethyl)aminomethane):\n"
        "  - Pros: Low cost, standard in molecular biology.\n"
        "  - Cons: High dpKa/dT (-0.028/°C); primary amine reacts with aldehydes, acylating reagents; cytotoxic at high concentrations.\n\n"
        "• Citrate & Acetate Buffers:\n"
        "  - Pros: Effective in acidic range (pH 3.0–6.0).\n"
        "  - Cons: Citrate strongly chelates essential metal cofactors (Mg2+, Zn2+, Fe2+)."
    )
    for line in text_trad.split("\n"):
        p_line = tf1.add_paragraph() if tf1.paragraphs[0].text else tf1.paragraphs[0]
        p_line.text = line
        p_line.font.name = "Arial"
        p_line.font.size = Pt(11)
        p_line.font.color.rgb = NAVY_TEXT

    # Right Column: Good's Buffers
    add_card(s5, Inches(6.8), Inches(1.6), Inches(5.7), Inches(5.3), bg_color=WHITE, border_color=PRIMARY_BLUE)
    t_box2 = s5.shapes.add_textbox(Inches(7.0), Inches(1.8), Inches(5.3), Inches(0.5))
    p = t_box2.text_frame.paragraphs[0]
    p.text = "Good's Zwitterionic Buffers (HEPES, MOPS, PIPES)"
    p.font.name = "Arial"
    p.font.size = Pt(14)
    p.font.bold = True
    p.font.color.rgb = PRIMARY_BLUE

    d_box2 = s5.shapes.add_textbox(Inches(7.0), Inches(2.3), Inches(5.3), Inches(4.4))
    tf2 = d_box2.text_frame
    tf2.word_wrap = True
    text_goods = (
        "• Formulated by Dr. Norman Good (1966) for Biochemistry:\n"
        "  Engineered specifically to overcome the flaws of traditional salts.\n\n"
        "• The 6 Golden Criteria of Good's Buffers:\n"
        "  1. pKa between 6.0 and 8.0 (matches biological neutrality).\n"
        "  2. High water solubility & low membrane permeability (zwitterionic).\n"
        "  3. Minimal salt / ionic strength effects.\n"
        "  4. Low metal-binding affinity (does not precipitate Ca2+ or Mg2+).\n"
        "  5. Complete optical transparency in UV/Vis (wavelengths >= 230 nm).\n"
        "  6. Chemical stability & resistance to enzymatic breakdown.\n\n"
        "• Key Examples: HEPES (pH 6.8–8.2), MOPS (pH 6.5–7.9), MES (pH 5.5–6.7)."
    )
    for line in text_goods.split("\n"):
        p_line = tf2.add_paragraph() if tf2.paragraphs[0].text else tf2.paragraphs[0]
        p_line.text = line
        p_line.font.name = "Arial"
        p_line.font.size = Pt(11)
        p_line.font.color.rgb = NAVY_TEXT

    add_speaker_notes(s5,
        "Why did Dr. Norman Good introduce synthetic biological buffers in 1966?\n\n"
        "Prior to Good's work, biochemists relied on phosphate, Tris, and citrate. But as you see on the left, phosphate precipitates magnesium and calcium. In an ATPase or kinase assay requiring Mg2+, phosphate is completely unusable. Tris is a primary amine that reacts with aldehydes and has a terrible temperature coefficient.\n\n"
        "Norman Good synthesized zwitterionic buffers containing ethanesulfonic acid groups, like HEPES and MOPS. Because they are zwitterions with both positive and negative charges, they do not cross biological membranes, they do not bind metal cofactors significantly, and crucially, they do not absorb ultraviolet light above 230 nanometers."
    )

    # =========================================================================
    # SLIDE 6: COMPARATIVE MATRIX TABLE (Table Slide)
    # =========================================================================
    s6 = prs.slides.add_slide(blank_layout)
    set_slide_background(s6, LIGHT_BG)
    add_header(s6, "REFERENCE GUIDE", "Comparative Matrix: Key Biological Buffers in Assay Design")

    # Table creation
    rows = 8
    cols = 6
    t_left = Inches(0.8)
    t_top = Inches(1.5)
    t_width = Inches(11.7)
    t_height = Inches(5.3)

    table_shape = s6.shapes.add_table(rows, cols, t_left, t_top, t_width, t_height)
    table = table_shape.table

    # Column widths
    table.columns[0].width = Inches(1.4)  # Buffer
    table.columns[1].width = Inches(1.1)  # pKa
    table.columns[2].width = Inches(1.5)  # Range
    table.columns[3].width = Inches(1.4)  # dpKa/dT
    table.columns[4].width = Inches(3.1)  # Advantages
    table.columns[5].width = Inches(3.2)  # Interferences

    headers = ["Buffer", "pKa (25°C)", "Useful pH", "dpKa/dT (/°C)", "Primary Advantages", "Known Interferences / Drawbacks"]
    for j, h in enumerate(headers):
        cell = table.cell(0, j)
        cell.text = h
        cell.fill.solid()
        cell.fill.fore_color.rgb = DARK_BG
        p = cell.text_frame.paragraphs[0]
        p.font.name = "Arial"
        p.font.size = Pt(11)
        p.font.bold = True
        p.font.color.rgb = WHITE
        p.alignment = PP_ALIGN.CENTER

    data = [
        ("MES", "6.15", "5.5 – 6.7", "-0.011", "Does not bind metals; UV clear", "Incompatible with neutral/alkaline assays"),
        ("PIPES", "6.76", "6.1 – 7.5", "-0.0085", "Negligible metal binding", "Low water solubility at free acid form"),
        ("MOPS", "7.14", "6.5 – 7.9", "-0.013", "Excellent physiological buffer", "Interacts with some Fe(III) complexes"),
        ("HEPES", "7.48", "6.8 – 8.2", "-0.014", "Gold standard for enzymes & cells", "Produces radicals under ambient light"),
        ("Tris", "8.06", "7.5 – 9.0", "-0.028", "Inexpensive, highly soluble", "High temp drift; reactive primary amine"),
        ("Tricine", "8.05", "7.4 – 8.8", "-0.021", "Ideal for chloroplasts & metals", "Forms weak complexes with Cu2+, Ca2+"),
        ("Phosphate", "7.20 (pK2)", "5.8 – 8.0", "-0.0028", "Physiological, low temp drift", "Precipitates Ca2+/Mg2+; inhibits phosphatases")
    ]

    for i, row in enumerate(data):
        for j, val in enumerate(row):
            cell = table.cell(i + 1, j)
            cell.text = val
            cell.fill.solid()
            cell.fill.fore_color.rgb = WHITE if i % 2 == 0 else LIGHT_BLUE_BG
            p = cell.text_frame.paragraphs[0]
            p.font.name = "Arial"
            p.font.size = Pt(10)
            p.font.color.rgb = NAVY_TEXT
            if j in [0, 1, 2, 3]:
                p.alignment = PP_ALIGN.CENTER
                if j == 0:
                    p.font.bold = True

    add_speaker_notes(s6,
        "This slide is a critical reference matrix comparing the primary biological buffers used in modern enzymology.\n\n"
        "Notice the comparison between HEPES and Tris: both cover the physiological to slightly alkaline range. However, Tris has twice the temperature sensitivity of HEPES (-0.028 vs -0.014) and possesses a reactive primary amine.\n\n"
        "Also notice Phosphate: while its temperature coefficient is practically zero (-0.0028), its fatal flaw is the precipitation of polyvalent cations like magnesium and calcium, as well as competitive inhibition of any enzyme operating on phosphate esters, such as alkaline phosphatase or hexokinase."
    )

    # =========================================================================
    # SLIDE 7: ESSENTIAL REAGENTS: SUBSTRATES & COSOLVENTS (Light Theme)
    # =========================================================================
    s7 = prs.slides.add_slide(blank_layout)
    set_slide_background(s7, LIGHT_BG)
    add_header(s7, "REAGENT FORMULATION", "Essential Assay Reagents: Substrates, Purity & Cosolvents")

    reagent_cols = [
        ("1. Purity & Kinetic Regimes",
         "• Chemical Purity Grade:\n"
         "  Must be >= 98% analytical or HPLC grade. Trace isomeric contaminants can act as potent competitive inhibitors.\n\n"
         "• Saturating vs. Sub-saturating:\n"
         "  - Vmax Determinations: [S] >= 10 * Km (pseudo-zero order kinetics, rate is independent of [S]).\n"
         "  - Inhibitor Screening: [S] ~ Km (first-order / mixed regime; sensitive to competitive inhibition).\n\n"
         "• Substrate Depletion Rule:\n"
         "  Never consume > 10% of total substrate during the linear assay window to maintain steady-state kinetics."),
        ("2. Hydrophobic Substrates & Cosolvents",
         "• The Solubility Barrier:\n"
         "  Lipids, steroids, hydrophobic peptides, and synthetic fluorophores have poor aqueous solubility.\n\n"
         "• Organic Cosolvent Stock Preparation:\n"
         "  Dissolve at 50x–1000x concentration in DMSO, Ethanol, or DMF.\n\n"
         "• Critical Cosolvent Tolerance Limits:\n"
         "  - Final assay cosolvent must strictly remain <= 1.0% to 2.0% (v/v).\n"
         "  - Excess organic solvent strips protein hydration shells, causing active-site collapse.\n"
         "  - Always include a solvent-matched vehicle control (blank) in parallel!"),
        ("3. Stability & Light Sensitivity",
         "• Auto-Hydrolysis:\n"
         "  Substrates with labile ester or anhydride bonds (e.g., p-nitrophenyl phosphate, acetyl-CoA) spontaneously hydrolyze in alkaline water.\n\n"
         "• Photolytic Degradation:\n"
         "  Fluorogenic substrates (AMC, Rhodamine derivatives) undergo photobleaching under light.\n\n"
         "• Best Practice:\n"
         "  Prepare stocks in amber/foil-wrapped microcentrifuge tubes; store desiccated at -20°C or -80°C in single-use aliquots.")
    ]

    for i, (title, content) in enumerate(reagent_cols):
        c_left = Inches(0.8) + i * Inches(3.95)
        add_card(s7, c_left, Inches(1.6), Inches(3.75), Inches(5.3))
        t_box = s7.shapes.add_textbox(c_left + Inches(0.2), Inches(1.8), Inches(3.35), Inches(0.6))
        p = t_box.text_frame.paragraphs[0]
        p.text = title
        p.font.name = "Arial"
        p.font.size = Pt(13)
        p.font.bold = True
        p.font.color.rgb = PRIMARY_BLUE

        c_box = s7.shapes.add_textbox(c_left + Inches(0.2), Inches(2.4), Inches(3.35), Inches(4.3))
        tf = c_box.text_frame
        tf.word_wrap = True
        for line in content.split("\n"):
            p_line = tf.add_paragraph() if tf.paragraphs[0].text else tf.paragraphs[0]
            p_line.text = line
            p_line.font.name = "Arial"
            p_line.font.size = Pt(11)
            p_line.font.color.rgb = NAVY_TEXT

    add_speaker_notes(s7,
        "Turning to the reagents themselves: starting with substrates.\n\n"
        "In kinetic assays, we must distinguish between measuring Vmax, where we need saturating substrate—at least 10 times the Km—and inhibitor screening, where substrate concentration must be kept close to Km so that competitive inhibitors can effectively compete.\n\n"
        "A common practical hurdle in biotechnology is that many substrates are hydrophobic (such as steroids or synthetic fluorogenic probes). We dissolve them in DMSO, but the golden rule is that the final concentration of DMSO in the reaction well must not exceed 1 to 2 percent. High organic solvent levels denature enzymes.\n\n"
        "Additionally, reagents like p-NPP spontaneously hydrolyze over time, creating high background absorbance. They must be prepared fresh or stored as single-use frozen aliquots in light-protected amber tubes."
    )

    # =========================================================================
    # SLIDE 8: ESSENTIAL REAGENTS: METAL COFACTORS & CHELATORS (Light Theme)
    # =========================================================================
    s8 = prs.slides.add_slide(blank_layout)
    set_slide_background(s8, LIGHT_BG)
    add_header(s8, "COFACTORS & METAL IONS", "Managing Divalent Cations & Chelating Systems")

    # Left Column: Metal Cofactors
    add_card(s8, Inches(0.8), Inches(1.6), Inches(5.7), Inches(4.2))
    t_box = s8.shapes.add_textbox(Inches(1.0), Inches(1.8), Inches(5.3), Inches(0.5))
    p = t_box.text_frame.paragraphs[0]
    p.text = "Essential Metal Cofactors (Mg2+, Zn2+, Mn2+, Ca2+)"
    p.font.name = "Arial"
    p.font.size = Pt(14)
    p.font.bold = True
    p.font.color.rgb = PRIMARY_BLUE

    d_box = s8.shapes.add_textbox(Inches(1.0), Inches(2.3), Inches(5.3), Inches(3.3))
    tf = d_box.text_frame
    tf.word_wrap = True
    text_metals = (
        "• Catalytic Roles: Direct coordination to substrate, polarizing bonds for nucleophilic attack (e.g., Zn2+ in carbonic anhydrase, carboxypeptidase).\n\n"
        "• Substrate Coordination (The Mg-ATP Complex):\n"
        "  In kinase and ATPase assays, free ATP4- is NOT the substrate!\n"
        "  The true substrate is the coordination complex Mg*ATP(2-).\n"
        "  Free ATP4- often acts as a competitive inhibitor of the enzyme.\n"
        "  Therefore, [Mg2+] must always exceed [ATP] by 1 to 5 mM.\n\n"
        "• Structural Roles: Ca2+ in thermolysin and trypsin prevents autolysis and stabilizes tertiary loops."
    )
    for line in text_metals.split("\n"):
        p_line = tf.add_paragraph() if tf.paragraphs[0].text else tf.paragraphs[0]
        p_line.text = line
        p_line.font.name = "Arial"
        p_line.font.size = Pt(11)
        p_line.font.color.rgb = NAVY_TEXT

    # Right Column: Chelators
    add_card(s8, Inches(6.8), Inches(1.6), Inches(5.7), Inches(4.2))
    t_box2 = s8.shapes.add_textbox(Inches(7.0), Inches(1.8), Inches(5.3), Inches(0.5))
    p2 = t_box2.text_frame.paragraphs[0]
    p2.text = "The Chelator Strategy (EDTA vs. EGTA)"
    p2.font.name = "Arial"
    p2.font.size = Pt(14)
    p2.font.bold = True
    p2.font.color.rgb = TEAL

    d_box2 = s8.shapes.add_textbox(Inches(7.0), Inches(2.3), Inches(5.3), Inches(3.3))
    tf2 = d_box2.text_frame
    tf2.word_wrap = True
    text_chel = (
        "• Purpose of Chelators:\n"
        "  Scavenge trace heavy metal poisons (Cu2+, Pb2+, Hg2+, Fe3+) that bind and irreversibly inactivate catalytic thiols (Cys).\n\n"
        "• EDTA (Ethylenediaminetetraacetic acid):\n"
        "  Broad-spectrum chelator. High affinity for Mg2+, Ca2+, Zn2+, Cu2+.\n"
        "  Risk: Strips essential catalytic Mg2+ if concentration is too high!\n\n"
        "• EGTA (Ethylene glycol tetraacetic acid):\n"
        "  Highly selective for Ca2+ over Mg2+ (affinity for Ca2+ is ~100,000x higher).\n"
        "  Indispensable when studying Mg2+-dependent enzymes in the presence of trace Ca2+ contaminants."
    )
    for line in text_chel.split("\n"):
        p_line = tf2.add_paragraph() if tf2.paragraphs[0].text else tf2.paragraphs[0]
        p_line.text = line
        p_line.font.name = "Arial"
        p_line.font.size = Pt(11)
        p_line.font.color.rgb = NAVY_TEXT

    # Bottom Warning Box
    w_card = add_card(s8, Inches(0.8), Inches(6.0), Inches(11.7), Inches(1.0), bg_color=LIGHT_AMBER_BG, border_color=AMBER)
    w_box = s8.shapes.add_textbox(Inches(1.0), Inches(6.1), Inches(11.3), Inches(0.8))
    tf_w = w_box.text_frame
    tf_w.word_wrap = True
    p_w1 = tf_w.paragraphs[0]
    p_w1.text = "CRITICAL INCOMPATIBILITY WARNING:"
    p_w1.font.name = "Arial"
    p_w1.font.size = Pt(11)
    p_w1.font.bold = True
    p_w1.font.color.rgb = AMBER
    p_w2 = tf_w.add_paragraph()
    p_w2.text = "Never formulate divalent metal ions (Mg2+, Ca2+, Mn2+) in phosphate, carbonate, or pyrophosphate buffers! Insoluble metal-phosphate salts precipitate out immediately, depleting both your essential cofactor and your buffer capacity."
    p_w2.font.name = "Arial"
    p_w2.font.size = Pt(11)
    p_w2.font.color.rgb = NAVY_TEXT

    add_speaker_notes(s8,
        "Slide 8 addresses metal cofactors and chelators.\n\n"
        "A vital biochemical fact: in kinase or ATPase assays, free ATP is actually an inhibitor. The real substrate is the magnesium-ATP complex (Mg-ATP 2-). Therefore, total magnesium concentration must always be in stoichiometric excess over ATP by at least 1 to 5 millimolar.\n\n"
        "Regarding chelators: EDTA is a wonderful tool to mop up trace heavy metals like copper or lead from laboratory water that would otherwise poison cysteine residues. However, if your enzyme requires magnesium, excess EDTA will strip that magnesium and kill activity.\n"
        "If you want to chelate calcium without touching magnesium, you use EGTA, which has a 100,000-fold higher affinity for calcium.\n\n"
        "And please note the golden warning at the bottom: never mix magnesium or calcium with phosphate buffer, because magnesium phosphate will precipitate as a milky white solid."
    )

    # =========================================================================
    # SLIDE 9: REDUCING AGENTS (Light Theme)
    # =========================================================================
    s9 = prs.slides.add_slide(blank_layout)
    set_slide_background(s9, LIGHT_BG)
    add_header(s9, "REDOX CHEMISTRY", "Protecting Catalytic Thiols: Reducing Agents Compared")

    red_agents = [
        ("beta-Mercaptoethanol (b-ME)",
         "• Concentration: 5 – 20 mM\n\n"
         "• Chemistry: Monothiol (-SH)\n\n"
         "• Characteristics:\n"
         "  - Very inexpensive, historically ubiquitous.\n"
         "  - Highly volatile with a pungent, noxious odor.\n"
         "  - Prone to rapid air oxidation (half-life < 4 hours at pH 8.0).\n"
         "  - Requires large molar excess due to equilibrium limitations.\n\n"
         "• Verdict: Avoid in modern automated assays and high-throughput screens.",
         NAVY_TEXT),
        ("Dithiothreitol (DTT)",
         "• Concentration: 0.5 – 5 mM\n\n"
         "• Chemistry: Dithiol (Cleland's Reagent)\n\n"
         "• Characteristics:\n"
         "  - Forms stable 6-membered intramolecular cyclic disulfide upon oxidation.\n"
         "  - Significantly lower redox potential than b-ME.\n"
         "  - Odorless at working concentrations.\n"
         "  - Susceptible to air oxidation over 24h at room temp.\n"
         "  - Generates UV absorbance at < 280 nm.\n\n"
         "• Verdict: Standard choice for routine enzyme kinetics.",
         PRIMARY_BLUE),
        ("TCEP-HCl",
         "• Concentration: 0.5 – 2 mM\n\n"
         "• Chemistry: Phosphine-based (Non-thiol)\n\n"
         "• Characteristics:\n"
         "  - Odorless, completely resistant to air oxidation.\n"
         "  - Stable in aqueous solution across pH 1.5 to 8.5.\n"
         "  - Does NOT absorb UV light at 280 nm.\n"
         "  - Compatible with thiol-reactive probes (maleimides).\n"
         "  - Caution: Can form adducts with NAD(P)+ and inhibit dehydrogenases.\n\n"
         "• Verdict: Gold standard for long-term assays and biophysical studies.",
         TEAL)
    ]

    for i, (name, details, accent) in enumerate(red_agents):
        c_left = Inches(0.8) + i * Inches(3.95)
        add_card(s9, c_left, Inches(1.6), Inches(3.75), Inches(5.3))
        # Top Accent Bar
        bar = s9.shapes.add_shape(MSO_SHAPE.RECTANGLE, c_left, Inches(1.6), Inches(3.75), Inches(0.08))
        bar.fill.solid()
        bar.fill.fore_color.rgb = accent
        bar.line.fill.background()

        t_box = s9.shapes.add_textbox(c_left + Inches(0.2), Inches(1.8), Inches(3.35), Inches(0.6))
        p = t_box.text_frame.paragraphs[0]
        p.text = name
        p.font.name = "Arial"
        p.font.size = Pt(13)
        p.font.bold = True
        p.font.color.rgb = accent

        d_box = s9.shapes.add_textbox(c_left + Inches(0.2), Inches(2.4), Inches(3.35), Inches(4.3))
        tf = d_box.text_frame
        tf.word_wrap = True
        for line in details.split("\n"):
            p_line = tf.add_paragraph() if tf.paragraphs[0].text else tf.paragraphs[0]
            p_line.text = line
            p_line.font.name = "Arial"
            p_line.font.size = Pt(11)
            p_line.font.color.rgb = NAVY_TEXT

    add_speaker_notes(s9,
        "Many enzymes have cysteine residues in or near their active site. In an oxidizing environment, these thiols oxidize into inactive disulfides or sulfenic acids. To maintain activity, we include reducing agents.\n\n"
        "Here we compare the three major reducing agents:\n"
        "Beta-mercaptoethanol is cheap, but it smells terrible, is volatile, and oxidizes in air within hours.\n"
        "DTT, or Cleland's reagent, is a dithiol. When oxidized, it forms a thermodynamically stable six-membered ring, making it much more potent than BME. However, DTT absorbs in the far-UV spectrum and slowly oxidizes in solution.\n\n"
        "TCEP is phosphine-based. It is odorless, does not oxidize in air, remains stable from pH 1.5 to 8.5, and does not absorb at 280 nanometers. However, TCEP can react with NAD+ or NADP+ cofactors, so always run a control if working with dehydrogenases."
    )

    # =========================================================================
    # SLIDE 10: ENZYME STABILIZERS & ADDITIVES (Light Theme)
    # =========================================================================
    s10 = prs.slides.add_slide(blank_layout)
    set_slide_background(s10, LIGHT_BG)
    add_header(s10, "ENZYME PRESERVATION", "Enzyme Stabilizers & Additives: Preventing Inactivation")

    stab_cards = [
        ("1. Carrier Proteins (BSA)",
         "• Working Concentration: 0.1 to 1.0 mg/mL (0.01–0.1% w/v)\n"
         "• Mechanism: Nanomolar enzyme concentrations rapidly adsorb to plastic microplate walls and glass surfaces.\n"
         "• Solution: Highly purified Bovine Serum Albumin saturates all non-specific binding sites, keeping the enzyme freely in solution.\n"
         "• Requirement: Must use protease-free, fatty acid-free, molecular biology grade BSA."),
        ("2. Osmolytes & Cryoprotectants",
         "• Working Reagents: Glycerol (10–50% v/v), Trehalose, Sucrose (0.2–0.5 M)\n"
         "• Mechanism: Osmolytes increase the preferential hydration of proteins, stabilizing the compact native fold.\n"
         "• Cryoprotection: Glycerol prevents ice crystal formation during -20°C storage, preventing mechanical shearing of peptide chains."),
        ("3. Non-Ionic Detergents",
         "• Working Reagents: Triton X-100, Tween-20, Brij-35 (0.01 to 0.1% v/v)\n"
         "• Mechanism: Prevent hydrophobic self-aggregation and interfacial denaturation at the air-water meniscus.\n"
         "• Caution: Use concentrations strictly below the Critical Micelle Concentration (CMC) unless assaying membrane enzymes."),
        ("4. Protease & Phosphatase Inhibitors",
         "• Protease Cocktails: PMSF/AEBSF (serine proteases), Leupeptin (serine/cysteine), Pepstatin A (aspartic proteases), EDTA (metalloproteases).\n"
         "• Phosphatase Inhibitors: Sodium Orthovanadate (protein tyrosine phosphatases), Sodium Fluoride (serine/threonine phosphatases).\n"
         "• Essential for crude cell lysates and recombinant enzyme preparations.")
    ]

    for i, (title, content) in enumerate(stab_cards):
        col = i % 2
        row = i // 2
        c_left = Inches(0.8) + col * Inches(5.95)
        c_top = Inches(1.6) + row * Inches(2.65)
        add_card(s10, c_left, c_top, Inches(5.75), Inches(2.45))

        t_box = s10.shapes.add_textbox(c_left + Inches(0.2), c_top + Inches(0.15), Inches(5.35), Inches(0.4))
        p = t_box.text_frame.paragraphs[0]
        p.text = title
        p.font.name = "Arial"
        p.font.size = Pt(13)
        p.font.bold = True
        p.font.color.rgb = PRIMARY_BLUE

        c_box = s10.shapes.add_textbox(c_left + Inches(0.2), c_top + Inches(0.6), Inches(5.35), Inches(1.75))
        tf = c_box.text_frame
        tf.word_wrap = True
        for line in content.split("\n"):
            p_line = tf.add_paragraph() if tf.paragraphs[0].text else tf.paragraphs[0]
            p_line.text = line
            p_line.font.name = "Arial"
            p_line.font.size = Pt(10.5)
            p_line.font.color.rgb = NAVY_TEXT

    add_speaker_notes(s10,
        "Enzymes are fragile, and in an assay tube, they face multiple threats to stability.\n\n"
        "First, surface adsorption: when working with dilute enzymes in the nanomolar range, a significant percentage of the protein sticks to the plastic walls of the pipette tip and 96-well plate. Adding 0.1% BSA coats the plastic surfaces, ensuring all enzyme molecules remain in solution.\n\n"
        "Second, cryoprotectants like glycerol and trehalose: they increase the hydration sphere around the enzyme, stabilizing the native conformation and preventing ice crystals from shearing the protein during freezing.\n\n"
        "Third, non-ionic detergents like Tween-20 prevent aggregation at the air-water meniscus.\n\n"
        "And fourth, if working with cell lysates, protease and phosphatase inhibitor cocktails are non-negotiable to prevent degradation."
    )

    # =========================================================================
    # SLIDE 11: QUANTITATIVE CALCULATIONS (Light Theme)
    # =========================================================================
    s11 = prs.slides.add_slide(blank_layout)
    set_slide_background(s11, LIGHT_BG)
    add_header(s11, "MATHEMATICS & FORMULATION", "Quantitative Calculations: Molarity, Dilutions & Ionic Strength")

    calc_cards = [
        ("1. Mass from Molarity Formula",
         "• Primary Equation:\n"
         "  Mass (g) = Molarity (mol/L) * Volume (L) * Molecular Weight (g/mol)\n\n"
         "• The Hydration State Trap:\n"
         "  Always inspect the exact bottle label for water of crystallization!\n"
         "  - Anhydrous MgCl2: MW = 95.21 g/mol\n"
         "  - MgCl2 * 6H2O (Hexahydrate): MW = 203.30 g/mol\n"
         "  Using anhydrous MW for hexahydrate produces an error of over 113% in cofactor concentration!"),
        ("2. Stock Solutions & Dilutions",
         "• The Dilution Law:\n"
         "  C1 * V1 = C2 * V2\n\n"
         "• The Stock Strategy:\n"
         "  - Prepare 10x Assay Buffer, 100x Cofactors, 1000x Inhibitors.\n"
         "  - Minimizes weighing micro-quantities on analytical balances.\n\n"
         "• Pipetting Accuracy Limit:\n"
         "  Never pipette volumes < 2 uL in standard spectrophotometric assays; pipette volumetric error increases exponentially below 2 uL."),
        ("3. Ionic Strength Calculation",
         "• Equation:\n"
         "  I = 0.5 * Sum(ci * zi^2)\n"
         "  Where ci is concentration and zi is ion charge.\n\n"
         "• Kinetic Significance:\n"
         "  According to Debye-Huckel theory, ionic strength shields electrostatic charges.\n"
         "  If enzyme-substrate interaction relies on charge attraction, high ionic strength increases Km.\n"
         "  Standardize with 50–150 mM NaCl or KCl to reflect physiological conditions.")
    ]

    for i, (title, content) in enumerate(calc_cards):
        c_left = Inches(0.8) + i * Inches(3.95)
        add_card(s11, c_left, Inches(1.6), Inches(3.75), Inches(5.3))
        t_box = s7.shapes.add_textbox(c_left + Inches(0.2), Inches(1.8), Inches(3.35), Inches(0.6))
        p = t_box.text_frame.paragraphs[0]
        p.text = title
        p.font.name = "Arial"
        p.font.size = Pt(13)
        p.font.bold = True
        p.font.color.rgb = PRIMARY_BLUE

        c_box = s11.shapes.add_textbox(c_left + Inches(0.2), Inches(2.4), Inches(3.35), Inches(4.3))
        tf = c_box.text_frame
        tf.word_wrap = True
        for line in content.split("\n"):
            p_line = tf.add_paragraph() if tf.paragraphs[0].text else tf.paragraphs[0]
            p_line.text = line
            p_line.font.name = "Arial"
            p_line.font.size = Pt(11)
            p_line.font.color.rgb = NAVY_TEXT

    add_speaker_notes(s11,
        "Here are the core quantitative calculations that every enzymologist must master.\n\n"
        "First, molarity calculations: please pay attention to hydration state. For example, magnesium chloride is almost always sold as hexahydrate, MgCl2 dot 6H2O, with a molecular weight of 203.3. If you use the anhydrous weight of 95.2, your actual magnesium concentration will be less than half of what you intended!\n\n"
        "Second, the stock solution strategy: we prepare 10X assay buffer and 100X cofactor stocks. Why? Because pipetting less than 2 microliters with a standard micropipette introduces a volumetric error of 5 to 10 percent.\n\n"
        "Third, ionic strength: calculated as half the sum of concentration times the square of the valence. Divalent ions like sulfate or magnesium contribute four times more to ionic strength than monovalent sodium or chloride. Ionic strength screens electrostatic charges between the enzyme's active site and charged substrates."
    )

    # =========================================================================
    # SLIDE 12: STANDARD OPERATING PROCEDURE (SOP) (Light Theme)
    # =========================================================================
    s12 = prs.slides.add_slide(blank_layout)
    set_slide_background(s12, LIGHT_BG)
    add_header(s12, "LABORATORY PROTOCOL (SOP)", "Standard Operating Procedure: Analytical Buffer Preparation")

    sop_steps = [
        ("Step 1", "Water Quality", "Use Type I Ultrapure water (Milli-Q, 18.2 MOhm*cm, TOC < 5 ppb). Never use tap or unpurified deionized water (contains heavy metals, chlorine, and dissolved CO2)."),
        ("Step 2", "Dissolution", "Weigh reagents on a calibrated 4-decimal analytical balance. Dissolve in ~80% of final target volume in a beaker with a clean magnetic stir bar."),
        ("Step 3", "pH Calibration", "Perform 3-point calibration of the pH meter using fresh reference standards (pH 4.01, 7.00, 10.01). Verify that electrode slope is between 95% and 102%."),
        ("Step 4", "Temperature & Titration", "Equilibrate the solution to the exact assay operating temperature (25°C or 37°C). Titrate dropwise with concentrated HCl or NaOH under constant stirring."),
        ("Step 5", "Volumetric Q.S.", "Quantitatively transfer the solution to a Class A volumetric flask. Rinse the beaker twice with Type I water and add rinses to the flask. Bring to final volume (Q.S.)."),
        ("Step 6", "Sterile Filtration", "Filter through a 0.22 um PES (polyethersulfone) membrane to remove dust, particulates, and microorganisms. Degas if using for optical or HPLC-coupled assays.")
    ]

    for i, (step_num, title, desc) in enumerate(sop_steps):
        col = i % 3
        row = i // 3
        c_left = Inches(0.8) + col * Inches(3.95)
        c_top = Inches(1.6) + row * Inches(2.65)
        add_card(s12, c_left, c_top, Inches(3.75), Inches(2.45))

        # Badge
        badge = s12.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, c_left + Inches(0.2), c_top + Inches(0.18), Inches(0.9), Inches(0.32))
        badge.fill.solid()
        badge.fill.fore_color.rgb = PRIMARY_BLUE
        badge.line.fill.background()
        p_b = badge.text_frame.paragraphs[0]
        p_b.text = step_num
        p_b.font.name = "Arial"
        p_b.font.size = Pt(10)
        p_b.font.bold = True
        p_b.font.color.rgb = WHITE
        p_b.alignment = PP_ALIGN.CENTER

        t_box = s12.shapes.add_textbox(c_left + Inches(1.2), c_top + Inches(0.15), Inches(2.35), Inches(0.4))
        p = t_box.text_frame.paragraphs[0]
        p.text = title
        p.font.name = "Arial"
        p.font.size = Pt(13)
        p.font.bold = True
        p.font.color.rgb = NAVY_TEXT

        d_box = s12.shapes.add_textbox(c_left + Inches(0.2), c_top + Inches(0.65), Inches(3.35), Inches(1.65))
        tf = d_box.text_frame
        tf.word_wrap = True
        p_desc = tf.paragraphs[0]
        p_desc.text = desc
        p_desc.font.name = "Arial"
        p_desc.font.size = Pt(10.5)
        p_desc.font.color.rgb = NAVY_TEXT

    add_speaker_notes(s12,
        "Here is the standard operating procedure (SOP) that should be taped on every enzymology laboratory bench.\n\n"
        "Step 1: Always use Type 1 Milli-Q water (18.2 megohm-cm resistance). Tap water and poorly maintained deionized water contain trace iron and copper that destroy enzymes.\n"
        "Step 2: Dissolve the buffer salts in approximately 80 percent of the final volume in a beaker. Never dissolve directly in a volumetric flask because you need room to titrate.\n"
        "Step 3: Calibrate your pH meter using three standard buffers: 4.01, 7.00, and 10.01, and confirm that the slope is between 95 and 102 percent.\n"
        "Step 4: Titrate at the exact assay temperature. If the assay runs at 37 degrees, warm the solution to 37 degrees before measuring pH.\n"
        "Step 5: Quantitatively transfer to a volumetric flask and bring to the mark (Q.S. - quantum satis).\n"
        "Step 6: Filter through a 0.22 micron membrane to eliminate microbes and particulates that scatter light."
    )

    # =========================================================================
    # SLIDE 13: OPTICAL & SPECTROPHOTOMETRIC CONSIDERATIONS (Light Theme)
    # =========================================================================
    s13 = prs.slides.add_slide(blank_layout)
    set_slide_background(s13, LIGHT_BG)
    add_header(s13, "ANALYTICAL SPECTROSCOPY", "Optical Considerations: Avoiding Spectral & Photometric Interferences")

    spec_cards = [
        ("1. The Ultraviolet Window (260 – 340 nm)",
         "• The Landmark Dehydrogenase Assay:\n"
         "  NADH and NADPH absorb strongly at 340 nm (molar extinction coeff = 6,220 M^-1 cm^-1), while NAD+ and NADP+ have zero absorbance at 340 nm.\n\n"
         "• Severe UV Interferences:\n"
         "  - DTT: High concentrations absorb strongly below 280 nm.\n"
         "  - Imidazole & Acetone: Absorb intensely in the far-UV.\n"
         "  - Triton X-100: Possesses an aromatic phenyl ring that absorbs heavily at 275 nm.\n"
         "  - Rule: Always measure buffer blank absorbance at 340 nm; blank absorbance must be < 0.05 OD."),
        ("2. The Visible Spectrum (400 – 650 nm)",
         "• Chromogenic Assays:\n"
         "  - Alkaline Phosphatase: p-Nitrophenol (405 nm).\n"
         "  - Peroxidase: ABTS (405–420 nm), TMB (450 nm / 650 nm).\n"
         "  - Bradford Total Protein: Coomassie G-250 (595 nm).\n\n"
         "• Buffer pH & Extinction Coefficient:\n"
         "  p-Nitrophenol is a pH indicator! It is colorless in its protonated form (pKa ~ 7.15) and bright yellow only as the phenolate anion.\n"
         "  If your buffer pH drops, the extinction coefficient plummets, creating a false perception of enzyme inhibition!"),
        ("3. Fluorescence & Microplate Artifacts",
         "• Fluorogenic Probes (AMC, Resorufin, Fluorescein):\n"
         "  Orders of magnitude more sensitive than absorbance, but prone to unique artifacts.\n\n"
         "• The Inner Filter Effect:\n"
         "  Excess substrate or colored buffer components absorb excitation or emission photons, flattening kinetic curves at high substrate levels.\n\n"
         "• Plate Selection:\n"
         "  Always use black solid-bottom microplates for fluorescence (prevents cross-talk) and clear flat-bottom UV-transparent plates for absorbance.")
    ]

    for i, (title, content) in enumerate(spec_cards):
        c_left = Inches(0.8) + i * Inches(3.95)
        add_card(s13, c_left, Inches(1.6), Inches(3.75), Inches(5.3))
        t_box = s13.shapes.add_textbox(c_left + Inches(0.2), Inches(1.8), Inches(3.35), Inches(0.6))
        p = t_box.text_frame.paragraphs[0]
        p.text = title
        p.font.name = "Arial"
        p.font.size = Pt(13)
        p.font.bold = True
        p.font.color.rgb = PRIMARY_BLUE

        c_box = s13.shapes.add_textbox(c_left + Inches(0.2), Inches(2.4), Inches(3.35), Inches(4.3))
        tf = c_box.text_frame
        tf.word_wrap = True
        for line in content.split("\n"):
            p_line = tf.add_paragraph() if tf.paragraphs[0].text else tf.paragraphs[0]
            p_line.text = line
            p_line.font.name = "Arial"
            p_line.font.size = Pt(11)
            p_line.font.color.rgb = NAVY_TEXT

    add_speaker_notes(s13,
        "Now let's examine the optical detection window.\n\n"
        "Most enzyme assays are coupled to spectrophotometric detection. In the UV range, particularly 340 nm, we monitor NADH or NADPH consumption or production. If your buffer contains Triton X-100, its aromatic ring will saturate your spectrophotometer detector. If your buffer has high DTT, background noise will obscure the signal.\n\n"
        "In the visible range, consider p-nitrophenol at 405 nm. The yellow color is only produced by the unprotonated phenolate ion. If your buffer fails to keep the pH alkaline, the product remains protonated and colorless, misleading you into thinking your enzyme has lost activity!\n\n"
        "For fluorescence assays, beware of the inner filter effect and always use black microplates to eliminate optical cross-talk between wells."
    )

    # =========================================================================
    # SLIDE 14: PRACTICAL PROTOCOLS: THREE BENCHMARK ASSAYS (Light Theme)
    # =========================================================================
    s14 = prs.slides.add_slide(blank_layout)
    set_slide_background(s14, LIGHT_BG)
    add_header(s14, "BENCHMARK PROTOCOLS", "Practical Protocols: Buffer & Reagent Recipes for 3 Landmark Assays")

    protocols = [
        ("Protocol A: Alkaline Phosphatase (ALP)",
         "• Buffer System:\n"
         "  1.0 M Diethanolamine (DEA) or 50 mM Glycine-NaOH, pH 9.8 at 37°C.\n\n"
         "• Essential Cofactor:\n"
         "  0.5 mM MgCl2 (acts as an essential catalytic activator).\n\n"
         "• Substrate:\n"
         "  10 mM p-Nitrophenyl phosphate (p-NPP, fresh in buffer).\n\n"
         "• Optical Detection:\n"
         "  Continuous kinetic read at 405 nm (formation of p-nitrophenolate, yellow, epsilon = 18,500 M^-1 cm^-1).",
         PRIMARY_BLUE),
        ("Protocol B: Lactate Dehydrogenase (LDH)",
         "• Buffer System:\n"
         "  50 mM Potassium Phosphate or Tris-HCl, pH 7.4 at 25°C.\n\n"
         "• Substrate & Coenzyme:\n"
         "  - 1.0 mM Sodium Pyruvate\n"
         "  - 0.2 mM beta-NADH (prepared fresh in 10 mM Tris, pH 8.0).\n\n"
         "• Optical Detection:\n"
         "  Continuous kinetic decrease at 340 nm (oxidation of NADH -> NAD+, epsilon = 6,220 M^-1 cm^-1).\n\n"
         "• Critical Note: Phosphate is preferred here because there are no divalent metals to precipitate.",
         TEAL),
        ("Protocol C: Horseradish Peroxidase (HRP)",
         "• Buffer System:\n"
         "  50 mM Sodium Citrate-Phosphate buffer, pH 5.0.\n\n"
         "• Substrates:\n"
         "  - 1.5 mM ABTS (2,2'-azino-bis(3-ethylbenzothiazoline-6-sulfonic acid))\n"
         "  - 0.5 mM H2O2 (diluted freshly from 30% stock).\n\n"
         "• Optical Detection:\n"
         "  Absorbance increase at 405 nm (green radical cation).\n\n"
         "• Critical Note: Never add sodium azide (NaN3) to HRP buffers—azide irreversibly inhibits heme peroxidases!",
         RGBColor(79, 70, 229))
    ]

    for i, (title, content, accent) in enumerate(protocols):
        c_left = Inches(0.8) + i * Inches(3.95)
        add_card(s14, c_left, Inches(1.6), Inches(3.75), Inches(5.3))
        # Accent top bar
        bar = s14.shapes.add_shape(MSO_SHAPE.RECTANGLE, c_left, Inches(1.6), Inches(3.75), Inches(0.08))
        bar.fill.solid()
        bar.fill.fore_color.rgb = accent
        bar.line.fill.background()

        t_box = s14.shapes.add_textbox(c_left + Inches(0.2), Inches(1.8), Inches(3.35), Inches(0.6))
        p = t_box.text_frame.paragraphs[0]
        p.text = title
        p.font.name = "Arial"
        p.font.size = Pt(12)
        p.font.bold = True
        p.font.color.rgb = accent

        c_box = s14.shapes.add_textbox(c_left + Inches(0.2), Inches(2.4), Inches(3.35), Inches(4.3))
        tf = c_box.text_frame
        tf.word_wrap = True
        for line in content.split("\n"):
            p_line = tf.add_paragraph() if tf.paragraphs[0].text else tf.paragraphs[0]
            p_line.text = line
            p_line.font.name = "Arial"
            p_line.font.size = Pt(10.5)
            p_line.font.color.rgb = NAVY_TEXT

    add_speaker_notes(s14,
        "To ground our discussion in real experimental practice, here are the buffer recipes for three landmark assays in biotechnology.\n\n"
        "First, Alkaline Phosphatase: Notice the buffer is Diethanolamine at pH 9.8 with 0.5 mM MgCl2. Magnesium is an absolute requirement for ALP catalysis. We measure p-nitrophenol production at 405 nm.\n\n"
        "Second, Lactate Dehydrogenase: Here we use 50 mM Potassium Phosphate at pH 7.4. Why phosphate? Because there are no divalent cations present, and phosphate provides superb buffering at pH 7.4 with zero temperature drift. We track the disappearance of NADH at 340 nm.\n\n"
        "Third, Horseradish Peroxidase: Here the optimum pH is acidic—pH 5.0—so we use a Citrate-Phosphate buffer. And notice the critical warning: never add sodium azide to an HRP buffer, because azide binds to the heme iron and completely abolishes peroxidase activity."
    )

    # =========================================================================
    # SLIDE 15: STORAGE & STABILITY (Light Theme)
    # =========================================================================
    s15 = prs.slides.add_slide(blank_layout)
    set_slide_background(s15, LIGHT_BG)
    add_header(s15, "LAB MANAGEMENT & STABILITY", "Reagent Storage, Shelf-Life & Stability Management")

    storage_cards = [
        ("Room Temperature (20–25°C)",
         "• Stable Reagents:\n"
         "  Concentrated stock salts (e.g., 5 M NaCl, 1 M KCl, 1 M Tris-HCl stock).\n\n"
         "• Storage Conditions:\n"
         "  Airtight glass bottles, protected from direct sunlight.\n\n"
         "• Caution:\n"
         "  Unbuffered water absorbs atmospheric CO2, forming carbonic acid (H2CO3) and dropping pH to ~5.5! Always keep sealed."),
        ("Refrigerated (2–8°C)",
         "• Stable Reagents:\n"
         "  Sterile-filtered working assay buffers (e.g., HEPES, MOPS, PBS).\n\n"
         "• Shelf Life:\n"
         "  2 to 4 weeks maximum without antimicrobial agents.\n\n"
         "• Quality Control:\n"
         "  Inspect against light for microbial cloudiness, fungal pellets, or crystalline precipitates before every experiment."),
        ("Frozen (-20°C to -80°C)",
         "• Labile Reagents:\n"
         "  Enzymes, nucleotide cofactors (ATP, NADH, NADPH), substrates (p-NPP), DTT.\n\n"
         "• The Aliquoting Rule:\n"
         "  Always prepare single-use aliquots (e.g., 50–100 uL).\n\n"
         "• Freeze-Thaw Hazard:\n"
         "  Each freeze-thaw cycle denatures 10–30% of enzyme molecules through ice crystallization and local cryo-concentration of salts!"),
        ("Light & Preservative Controls",
         "• Photoprotection:\n"
         "  Store NADH, FAD, and fluorophores in opaque amber tubes or wrap tubes completely in aluminum foil.\n\n"
         "• Sodium Azide (NaN3, 0.02% w/v):\n"
         "  Effective bacteriostatic agent for antibody and column storage.\n\n"
         "• Major Incompatibility:\n"
         "  NaN3 completely poisons HRP, catalase, and cytochrome c oxidase assays!")
    ]

    for i, (title, content) in enumerate(storage_cards):
        col = i % 2
        row = i // 2
        c_left = Inches(0.8) + col * Inches(5.95)
        c_top = Inches(1.6) + row * Inches(2.65)
        add_card(s15, c_left, c_top, Inches(5.75), Inches(2.45))

        t_box = s15.shapes.add_textbox(c_left + Inches(0.2), c_top + Inches(0.15), Inches(5.35), Inches(0.4))
        p = t_box.text_frame.paragraphs[0]
        p.text = title
        p.font.name = "Arial"
        p.font.size = Pt(13)
        p.font.bold = True
        p.font.color.rgb = PRIMARY_BLUE

        c_box = s15.shapes.add_textbox(c_left + Inches(0.2), c_top + Inches(0.6), Inches(5.35), Inches(1.75))
        tf = c_box.text_frame
        tf.word_wrap = True
        for line in content.split("\n"):
            p_line = tf.add_paragraph() if tf.paragraphs[0].text else tf.paragraphs[0]
            p_line.text = line
            p_line.font.name = "Arial"
            p_line.font.size = Pt(10.5)
            p_line.font.color.rgb = NAVY_TEXT

    add_speaker_notes(s15,
        "Proper storage and stability management represent the difference between reproducible assays and mysterious experimental failures.\n\n"
        "At room temperature, only inorganic salt stocks should be kept, and bottles must be tightly sealed because open containers absorb CO2 from the air, acidifying the water.\n\n"
        "At 4 degrees Celsius, working buffers are good for two to four weeks. Always check for microbial contamination or salt precipitation.\n\n"
        "At -20 or -80 degrees, enzymes, ATP, NADH, and DTT must be aliquoted into single-use tubes. Never freeze-thaw an enzyme repeatedly; the formation of ice crystals shears the tertiary structure and rapidly inactivates the enzyme.\n\n"
        "Finally, for light-sensitive reagents like NADH or fluorophores, always wrap tubes in aluminum foil."
    )

    # =========================================================================
    # SLIDE 16: TROUBLESHOOTING & COMMON PITFALLS (Light Theme)
    # =========================================================================
    s16 = prs.slides.add_slide(blank_layout)
    set_slide_background(s16, LIGHT_BG)
    add_header(s16, "TROUBLESHOOTING & QUALITY GATES", "Troubleshooting Common Buffer & Reagent Pitfalls")

    pitfalls = [
        ("Symptom / Problem", "Underlying Root Cause", "Corrective Action (SOP)"),
        ("Day-to-day kinetic variability (> 25% drift in Vmax)", "Buffer pH adjusted at 20°C but assay incubated at 37°C (dpKa/dT temperature drift).", "Equilibrate buffer to 37°C before pH titration; switch to low-dpKa/dT buffers (e.g., MOPS, HEPES)."),
        ("Milky white precipitate forms upon mixing assay components", "Divalent cation (Mg2+, Ca2+) added directly to phosphate or carbonate buffer.", "Switch to Good's buffers (HEPES); or prepare metal cofactor as a dilute working stock added last."),
        ("Progressive loss of activity at low enzyme concentrations", "Non-specific adsorption of enzyme to pipette tips and microplate walls.", "Supplement assay buffer with 0.1% (w/v) molecular biology grade BSA or 0.01% Tween-20."),
        ("High initial background absorbance in UV / NADH assay", "DTT oxidation products, excess imidazole, or aromatic detergent (Triton X-100) in buffer.", "Replace DTT with 1 mM TCEP; use non-aromatic detergent (Tween-20); dialyze out imidazole."),
        ("Substrate exhibits high baseline velocity in 'No-Enzyme' blank", "Spontaneous auto-hydrolysis of labile ester/anhydride bonds (e.g., p-NPP).", "Prepare substrate immediately before assay; lower stock pH slightly; keep substrate on ice.")
    ]

    t_shape = s16.shapes.add_table(6, 3, Inches(0.8), Inches(1.6), Inches(11.7), Inches(5.2))
    table = t_shape.table
    table.columns[0].width = Inches(3.2)
    table.columns[1].width = Inches(4.3)
    table.columns[2].width = Inches(4.2)

    for j in range(3):
        cell = table.cell(0, j)
        cell.text = pitfalls[0][j]
        cell.fill.solid()
        cell.fill.fore_color.rgb = DARK_BG
        p = cell.text_frame.paragraphs[0]
        p.font.name = "Arial"
        p.font.size = Pt(11)
        p.font.bold = True
        p.font.color.rgb = WHITE
        p.alignment = PP_ALIGN.CENTER

    for i in range(1, 6):
        for j in range(3):
            cell = table.cell(i, j)
            cell.text = pitfalls[i][j]
            cell.fill.solid()
            cell.fill.fore_color.rgb = WHITE if i % 2 == 1 else LIGHT_BLUE_BG
            p = cell.text_frame.paragraphs[0]
            p.font.name = "Arial"
            p.font.size = Pt(10)
            p.font.color.rgb = NAVY_TEXT
            if j == 0:
                p.font.bold = True

    add_speaker_notes(s16,
        "This troubleshooting matrix is a practical guide to diagnosing the most common failures encountered in enzyme assay preparation.\n\n"
        "If you see day-to-day variability in Vmax, 90% of the time it is due to temperature drift during pH adjustment.\n"
        "If you see a precipitate, you have mixed polyvalent cations with phosphate or carbonate.\n"
        "If activity mysteriously drops as you dilute the enzyme, the enzyme is sticking to the plastic walls of the well—add 0.1% BSA.\n"
        "If the UV background at 340 nm is abnormally high, check for oxidized DTT or Triton X-100 and switch to TCEP or Tween-20.\n"
        "And if your no-enzyme blank has high activity, your substrate is auto-hydrolyzing; prepare it fresh on ice."
    )

    # =========================================================================
    # SLIDE 17: SUMMARY CHECKLIST (Dark Theme)
    # =========================================================================
    s17 = prs.slides.add_slide(blank_layout)
    set_slide_background(s17, DARK_BG)
    add_header(s17, "SYNTHESIS & SUMMARY", "The Enzymologist's Golden Checklist", dark=True)

    check_items = [
        ("1. Buffer pKa Matching", "Target assay pH is strictly within pKa ± 0.8 units of the chosen buffer system."),
        ("2. Temperature Alignment", "pH meter calibrated and buffer titrated at the exact experimental operating temperature."),
        ("3. Ultrapure Water", "18.2 MOhm*cm Type I Milli-Q water used exclusively for all solutions and final rinses."),
        ("4. Fresh Labile Reagents", "Substrates (p-NPP), cofactors (ATP, NADH), and reducing agents (DTT) prepared fresh or single-use frozen."),
        ("5. Wall Adsorption Shield", "0.1% BSA or 0.01% non-ionic detergent included to prevent enzyme sticking at low concentrations."),
        ("6. Complete Controls", "Every plate/run includes 'No-Enzyme' (auto-hydrolysis) and 'No-Substrate' (background) blanks.")
    ]

    for i, (title, desc) in enumerate(check_items):
        col = i % 2
        row = i // 2
        c_left = Inches(0.8) + col * Inches(5.95)
        c_top = Inches(1.6) + row * Inches(1.75)
        add_card(s17, c_left, c_top, Inches(5.75), Inches(1.55), bg_color=DARK_CARD, border_color=RGBColor(30, 58, 138))

        # Check icon box
        chk = s17.shapes.add_shape(MSO_SHAPE.OVAL, c_left + Inches(0.2), c_top + Inches(0.2), Inches(0.35), Inches(0.35))
        chk.fill.solid()
        chk.fill.fore_color.rgb = TEAL
        chk.line.fill.background()
        p_c = chk.text_frame.paragraphs[0]
        p_c.text = "✓"
        p_c.font.name = "Arial"
        p_c.font.size = Pt(12)
        p_c.font.bold = True
        p_c.font.color.rgb = WHITE
        p_c.alignment = PP_ALIGN.CENTER

        t_box = s17.shapes.add_textbox(c_left + Inches(0.65), c_top + Inches(0.15), Inches(4.9), Inches(0.35))
        p = t_box.text_frame.paragraphs[0]
        p.text = title
        p.font.name = "Arial"
        p.font.size = Pt(13)
        p.font.bold = True
        p.font.color.rgb = WHITE

        d_box = s17.shapes.add_textbox(c_left + Inches(0.65), c_top + Inches(0.55), Inches(4.9), Inches(0.9))
        tf = d_box.text_frame
        tf.word_wrap = True
        p_d = tf.paragraphs[0]
        p_d.text = desc
        p_d.font.name = "Arial"
        p_d.font.size = Pt(10.5)
        p_d.font.color.rgb = LIGHT_MUTED

    # Bottom concluding note
    con_box = s17.shapes.add_textbox(Inches(0.8), Inches(6.5), Inches(11.7), Inches(0.6))
    tf_c = con_box.text_frame
    p_con = tf_c.paragraphs[0]
    p_con.text = "Takeaway: Precision in buffer and reagent preparation is the cornerstone of reproducibility in biotechnology."
    p_con.font.name = "Arial"
    p_con.font.size = Pt(12)
    p_con.font.bold = True
    p_con.font.color.rgb = RGBColor(56, 189, 248)
    p_con.alignment = PP_ALIGN.CENTER

    add_speaker_notes(s17,
        "In summary, before you load your samples into the spectrophotometer or microplate reader, run through this 6-point golden checklist:\n\n"
        "1. Is your buffer pKa within 0.8 units of your assay pH?\n"
        "2. Was the pH adjusted at the assay temperature?\n"
        "3. Was 18.2 megohm Type 1 water used?\n"
        "4. Are labile cofactors and reducing agents fresh from single-use aliquots?\n"
        "5. Did you include BSA or detergent to prevent surface loss?\n"
        "6. And finally, do you have both no-enzyme and no-substrate controls on your plate?\n\n"
        "If you check all six boxes, your kinetic data will be rock solid, fully reproducible, and ready for publication."
    )

    # =========================================================================
    # SLIDE 18: REFERENCES & SOURCES (Final Slide - Dark Theme)
    # =========================================================================
    s18 = prs.slides.add_slide(blank_layout)
    set_slide_background(s18, DARK_BG)
    add_header(s18, "ACADEMIC LITERATURE & STANDARDS", "Authoritative References & Further Reading", dark=True)

    ref_card = add_card(s18, Inches(0.8), Inches(1.6), Inches(11.7), Inches(5.3), bg_color=DARK_CARD, border_color=RGBColor(30, 58, 138))
    r_box = s18.shapes.add_textbox(Inches(1.1), Inches(1.8), Inches(11.1), Inches(4.9))
    tf_r = r_box.text_frame
    tf_r.word_wrap = True

    references = [
        ("1. Good, N. E., Winget, G. D., Winter, W., Connolly, T. N., Izawa, S., & Singh, R. M. (1966).",
         "Hydrogen ion buffers for biological research. Biochemistry, 5(2), 467–477. [Landmark paper introducing Good's zwitterionic buffers]"),
        ("2. Segel, I. H. (1976).",
         "Biochemical Calculations: How to Solve Mathematical Problems in General Biochemistry (2nd ed.). John Wiley & Sons. [Definitive reference for Henderson-Hasselbalch, ionic strength, and kinetic formulations]"),
        ("3. Eisenthal, R., & Danson, M. J. (Eds.). (2002).",
         "Enzyme Assays: A Practical Approach (2nd ed.). Oxford University Press. [Standard laboratory manual for assay design and reagent compatibility]"),
        ("4. Bisswanger, H. (2014).",
         "Enzyme Assays: High-Throughput Screening, Genetic Selection and Fingerprinting (3rd ed.). Wiley-VCH. [Comprehensive coverage of modern microplate formats, spectral interferences, and stabilizers]"),
        ("5. Copeland, R. A. (2000).",
         "Enzymes: A Practical Introduction to Structure, Mechanism, and Data Analysis (2nd ed.). Wiley-VCH. [In-depth treatment of cofactor kinetics, substrate solubility, and cosolvent effects]"),
        ("6. Beynon, R. J., & Easterby, J. S. (1996).",
         "Buffer Solutions: The Basics. BIOS Scientific Publishers / Springer. [Thermodynamic treatment of temperature coefficients (dpKa/dT) and buffering capacity]"),
        ("7. Worthington Biochemical Corporation. (2020).",
         "Worthington Enzyme Manual: Enzymes and Related Biochemicals. Freehold, NJ. [Standard assay protocols for Alkaline Phosphatase, LDH, and Peroxidase]")
    ]

    for i, (citation, annot) in enumerate(references):
        p_c = tf_r.add_paragraph() if i > 0 else tf_r.paragraphs[0]
        p_c.text = citation + " "
        p_c.font.name = "Arial"
        p_c.font.size = Pt(10.5)
        p_c.font.bold = True
        p_c.font.color.rgb = WHITE

        p_a = tf_r.add_paragraph()
        p_a.text = "   " + annot
        p_a.font.name = "Arial"
        p_a.font.size = Pt(9.5)
        p_a.font.color.rgb = LIGHT_MUTED
        if i < len(references) - 1:
            p_space = tf_r.add_paragraph()
            p_space.text = ""
            p_space.font.size = Pt(3)

    add_speaker_notes(s18,
        "Here are the authoritative references and landmark literature underpinning this presentation, including Norman Good's original 1966 Biochemistry paper, Segel's Biochemical Calculations, and standard practical manuals from Oxford University Press and Wiley-VCH.\n\n"
        "Thank you very much, Dr. [Doctor's Name] and colleagues, for your time and attention. I would be glad to answer any questions regarding buffer formulation, cofactor kinetics, or assay troubleshooting."
    )

    output_path = os.path.join(os.getcwd(), "Preparation_of_Buffers_and_Reagents_for_Enzyme_Assays.pptx")
    prs.save(output_path)
    print(f"Presentation saved successfully to: {output_path}")

if __name__ == "__main__":
    create_presentation()
