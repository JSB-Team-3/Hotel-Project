import { AppDispatch, RootState } from "../../../../store/auth/AuthConfig";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import {
  deleteRoomFacility,
  getAllRoomFacilities,
} from "../../../../store/facilities/facilitiesThunk";
import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import DeleteConfirmation from "../../../../shared/DeleteConfirmation/DeleteConfirmation";
import DataTable from "../../../../shared/DataTable/DataTable";
import { RoomFacility } from "../../../../Interfaces/facilities.interface";
import { Room } from "../../../../Interfaces/rooms.interface";
import { Booking } from "../../../../Interfaces/bookings.interfaces";
import { User } from "../../../../Interfaces/user.interface";
import { StyledTableCell, StyledTableRow, } from "../../../../shared/StyledTable/StyledTable";
import TableActions from "../../../../shared/TableActions/TableActions";
import Header from "../../../../shared/Header/Header";
import BasicModal from "../../../../shared/BasicModal/BasicModal";
import EditModal from "../../../../shared/EditModal/EditModal";

export default function FacilitiesList() {
  const [itemToDeleteId, setItemToDeleteId] = useState<string>("");
  const [itemToDeleteName, setItemToDeleteName] = useState<string>("");
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [showCustomModal, setShowCustomModal] = useState<boolean>(false);
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<{
    id: string;
    name: string;
  } | null>(null);

  // Pagination state
  const [page, setPage] = useState<number>(0);
  const [size, setSize] = useState<number>(5);
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch<AppDispatch>();
  const { loading, facilities, deleteLoading, totalCount } = useSelector(
    (state: RootState) => ({
      loading: state.facilities.loading,
      facilities: state.facilities.facilities,
      deleteLoading: state.facilities.deleteLoading,
      totalCount: state.facilities.totalCount,
    }),
    shallowEqual
  );

  const getAllFacilitiesList = async () => {
    try {
      await dispatch(
        getAllRoomFacilities({
          page: page + 1,
          size: size,
        })
      ).unwrap();
    } catch (err) {
      enqueueSnackbar((err as string) || "failed to get all facilities", {
        variant: "error",
      });
    }
  };

  const handleEditItem = (item: RoomFacility) => {
    setSelectedItem({ id: item._id, name: item.name });
    setEditModalOpen(true);
  };

  const handleDeleteItem = (itemId: string, itemName: string) => {
    setItemToDeleteId(itemId);
    setItemToDeleteName(itemName);
    setShowDeleteModal(true);
  };

  const ConfirmDelete = async () => {
    try {
      const response = await dispatch(
        deleteRoomFacility(itemToDeleteId)
      ).unwrap();
      setShowDeleteModal(false);
      getAllFacilitiesList();
      setItemToDeleteId("");
      setItemToDeleteName("");
      enqueueSnackbar(response?.message || "Facility deleted successfully", {
        variant: "success",
      });
    } catch (err) {
      enqueueSnackbar((err as string) || "failed to delete facility", {
        variant: "error",
      });
    }
  };

  const renderRow = (item: Room | Booking | User | RoomFacility) => {
    if ("name" in item) {
      return (
        <StyledTableRow key={item?._id} >
          <StyledTableCell component="th" scope="row">
            {item.name}
          </StyledTableCell>
          <StyledTableCell>
            {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : "-"}
          </StyledTableCell>
          <StyledTableCell>
            <TableActions
              handleDeleteItem={handleDeleteItem}
              handleEditItem={handleEditItem}
              item={item}
              route={``}
            />
          </StyledTableCell>
        </StyledTableRow>
      );
    }

    return null;
  };
  // Pagination handlers
  const handleChangePage = (
    _: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSize(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    getAllFacilitiesList();
  }, [page, size]);

  return (
    <Box>
      <Header
        title="Room Facilities"
        route=""
        onAddClick={() => setShowCustomModal(true)}
      />
      <DataTable
        loading={loading}
        items={facilities}
        page={page}
        size={size}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        totalCount={totalCount}
        rowsPerPageOptions={[5, 10, 25]}
        labelRowsPerPage="Facilities per Page:"
        columns={["Facility Name", "createdAt", ""]}
        renderRow={renderRow}
      />
      <DeleteConfirmation
        open={showDeleteModal}
        handleClose={() => {
          setShowDeleteModal(false);
        }}
        confirm={ConfirmDelete}
        message={`Delete This Facility: ${itemToDeleteName}`}
        loading={deleteLoading}
      />
      <BasicModal
      getAllFacilitiesList={getAllFacilitiesList}
        open={showCustomModal}
        handleClose={() => setShowCustomModal(false)}
      />
      {selectedItem && (
        <EditModal
          open={editModalOpen}
          handleClose={() => {
            setEditModalOpen(false);
            setSelectedItem(null);
          }}
          item={selectedItem}
          getAllFacilitiesList={getAllFacilitiesList}
        />
      )}
    </Box>
  );
}