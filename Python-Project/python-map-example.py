import tkinter

from tkintermapview import TkinterMapView

root_tk = tkinter.Tk()

root_tk.geometry("600x600")

root_tk.title("Python Map Example")

map_widget = TkinterMapView(root_tk, width=600, height=400, corner_radius=1)


def add_marker_event(coords):
    print("Add marker:", coords)
    new_marker = map_widget.set_marker(coords[0], coords[0], text="new marker")


map_widget.add_right_click_menu_command(label="Add Marker",
                                        command=add_marker_event,
                                        pass_coords=True)

map_widget.set_tile_server(
    "https://mt0.google.com/vt/lyrs=m&hl=en&x={x}&y={y}&z={z}&s=Ga", max_zoom=22)


def toggle_map_style():
    if map_widget.tile_server == "https://mt0.google.com/vt/lyrs=s&hl=en&x={x}&y={y}&z={z}&s=Ga":
        # Switch to normal map style
        map_widget.set_tile_server(
            "https://mt0.google.com/vt/lyrs=m&hl=en&x={x}&y={y}&z={z}&s=Ga", max_zoom=22)
    else:
        # Switch to satellite map style
        map_widget.set_tile_server(
            "https://mt0.google.com/vt/lyrs=s&hl=en&x={x}&y={y}&z={z}&s=Ga", max_zoom=22)


button = tkinter.Button(root_tk, text="Toggle Map Style",
                        command=toggle_map_style, bg="blue", fg="white", font="Arial")
button.pack()


map_widget.set_address("Bursa teknik", marker=True)

map_widget.pack(fill="both", expand=True)

root_tk.mainloop()