import streamlit as st

# -----------------------------
# Dummy Alumni Data
# -----------------------------
alumni_list = [
    {"name": "Ananya Sharma", "batch": "CSE 2019", "role": "Software Engineer, Google"},
    {"name": "Rohan Menon", "batch": "ECE 2020", "role": "Hardware Engineer, Intel"},
    {"name": "Priya Nair", "batch": "EEE 2018", "role": "Project Manager, Microsoft"},
    {"name": "Karthik Iyer", "batch": "ME 2017", "role": "Design Engineer, Tesla"},
    {"name": "Sneha Rao", "batch": "IT 2021", "role": "Data Scientist, Amazon"},
    {"name": "Aditya Verma", "batch": "CSE 2020", "role": "AI Engineer, OpenAI"},
    {"name": "Neha Thomas", "batch": "CIVIL 2019", "role": "Structural Engineer, L&T"},
    {"name": "Rahul Krishnan", "batch": "CSE 2018", "role": "Full Stack Developer, Meta"},
    {"name": "Divya Menon", "batch": "ECE 2019", "role": "Product Manager, Apple"},
    {"name": "Vikram Singh", "batch": "ME 2018", "role": "Aerospace Engineer, ISRO"},
]

# -----------------------------
# Page Configuration
# -----------------------------
st.set_page_config(page_title="Alumni Directory", layout="wide")
st.title("📘 Alumni Directory")
st.markdown("<hr>", unsafe_allow_html=True)

# -----------------------------
# Search Bar
# -----------------------------
search_query = st.text_input("🔍 Search alumni by name ", placeholder="Type a name or initial...")

# Filter alumni list (only names starting with query)
filtered_list = []
if search_query:
    q = search_query.lower()
    filtered_list = [alum for alum in alumni_list if alum["name"].lower().startswith(q)]
else:
    filtered_list = alumni_list

# -----------------------------
# Dynamic Theme Styles (light/dark aware)
# -----------------------------
light_card = "background-color:#ffffff; color:#000000;"
dark_card = "background-color:#262730; color:#fafafa;"

# Detect theme based on Streamlit theme settings (approx)
def get_card_style():
    theme = st.get_option("theme.base")
    if theme == "dark":
        return dark_card
    return light_card

card_style = get_card_style()

# -----------------------------
# Display Alumni Cards in Grid
# -----------------------------
if filtered_list:
    cols = st.columns(2)
    for i, alum in enumerate(filtered_list):
        with cols[i % 2]:
            st.markdown(
                f"""
                <div style='{card_style} padding:15px; border-radius:10px; 
                            box-shadow: 2px 2px 8px rgba(0,0,0,0.1); margin-bottom:15px;'>
                    <h4 style='margin-bottom:5px;'>{alum['name']}</h4>
                    <p style='margin:2px 0;'><b>Batch:</b> {alum['batch']}</p>
                    <p style='margin:2px 0;'><b>Role:</b> {alum['role']}</p>
                </div>
                """,
                unsafe_allow_html=True
            )
else:
    st.info("No alumni found starting with that input.")
