import streamlit as st

# Dummy alumni data (hardcoded)
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

st.set_page_config(page_title="Alumni Directory", layout="centered")
st.title("📘 Alumni Directory - ARC")

# Search Bar
search_query = st.text_input("🔍 Search alumni by name")

# Filtered list
if search_query:
    filtered_list = [al for al in alumni_list if search_query.lower() in al["name"].lower()]
else:
    filtered_list = alumni_list

# Display alumni
for alum in filtered_list:
    with st.container():
        st.markdown(f"**{alum['name']}**")
        st.write(f"Batch: {alum['batch']}")
        st.write(f"Role: {alum['role']}")
        st.markdown("---")
