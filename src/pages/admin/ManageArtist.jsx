import {
    Spin,
    Table,
    Button,
    Avatar,
    Menu,
    Dropdown,
    Modal,
} from "antd";
import React, { useEffect, useState } from "react";
import { BiDetail } from "react-icons/bi";
import { IoIosMore } from "react-icons/io";
import { MdBlock } from "react-icons/md";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { userSelector } from "../../redux/selectors/selector";
import {
    getAllUserByAdmin,
    banAccountByAdmin,
    unBanAccountByAdmin,
    getAllArtistByAdmin
} from "../../services/user.services";
import { generateFallbackAvatar, handleActionNotSupport } from "../../utils/helpers";
import { formatDateTimeVN } from "../../utils/common";
import AccountDetail from "../../components/modal/AccountDetail";

const ManageArtist = () => {
    const userData = useSelector(userSelector);
    const [isLoading, setIsLoading] = useState(false);
    const [originalData, setOriginalData] = useState([]);
    const [processingData, setProcessingData] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [categoryFilter, setCategoryFilter] = useState(undefined);
    const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
    const [selectedArtist, setSelectedArtist] = useState(null);

    useEffect(() => {
        const fetchItems = async () => {
            if (userData) {
                setIsLoading(true);
                try {
                    const responseGetAllItem = await getAllArtistByAdmin();
                    setOriginalData([...responseGetAllItem].reverse());
                    setProcessingData([...responseGetAllItem].reverse());
                } catch (error) {
                    // toast.error("There was an error loading data!");
                    toast.error(error.response?.data?.message);
                    console.error("There was an error loading data!:", error);
                } finally {
                    setIsLoading(false);
                }
            }
        };

        fetchItems();
    }, []);

    useEffect(() => {
        let updatedData = [...originalData];

        if (searchText) {
            updatedData = updatedData.filter((item) =>
                item.email.toLowerCase().includes(searchText.toLowerCase())
            );
        }

        if (categoryFilter) {
            updatedData = updatedData.filter((item) => {
                return item.membership === categoryFilter;
            });
        }

        setProcessingData(updatedData);
    }, [searchText, categoryFilter, originalData]);

    const updateUserStatus = (userId, newStatus) => {
        const newOriginalData = originalData.map(item =>
            item._id === userId ? { ...item, status: newStatus } : item
        );
        const newProcessingData = processingData.map(item =>
            item._id === userId ? { ...item, status: newStatus } : item
        );

        setOriginalData(newOriginalData);
        setProcessingData(newProcessingData);
    };

    const handleBanUnban = async (user, type) => {
        Modal.confirm({
            title: `Confirm ${type === 'ban' ? 'Ban' : 'Unban'}`,
            content: `Are you sure you want to ${type === 'ban' ? 'ban' : 'unban'} artist ${user.fullname}?`,
            okText: type === 'ban' ? 'Ban' : 'Unban',
            cancelText: 'Cancel',
            okButtonProps: {
                style: {
                    backgroundColor: type === 'ban' ? '#FF002E' : '#00b311',
                    borderColor: type === 'ban' ? '#FF002E' : '#00b311'
                }
            },
            onOk: async () => {
                setIsLoading(true);
                try {
                    if (type === 'ban') {
                        await banAccountByAdmin(user._id);
                        updateUserStatus(user._id, false);
                        toast.success('User has been banned successfully');
                    } else {
                        await unBanAccountByAdmin(user._id);
                        updateUserStatus(user._id, true);
                        toast.success('User has been unbanned successfully');
                    }
                } catch (error) {
                    toast.error(error.response?.data?.message || "An error occurred");
                } finally {
                    setIsLoading(false);
                }
            }
        });
    };

    const handleShowDetail = (artist) => {
        setSelectedArtist(artist);
        setIsDetailModalVisible(true);
    };

    const columns = [
        {
            title: "Artist",
            dataIndex: "name",
            key: "name",
            render: (text, record) => (
                <div style={{ display: "flex", alignItems: "center" }}>
                    <Avatar
                        src={record.avatar_url || generateFallbackAvatar(record.fullname)}
                        alt={record.name}
                        style={{ marginRight: "8px", border: "1px solid #d9d9d9" }}
                        size={55}
                    />
                    <div>
                        <div className="text-base">{record.fullname}</div>
                        <div className="opacity-70">{record.email}</div>
                    </div>
                </div>
            ),
        },
        {
            title: "Phone number",
            dataIndex: "phone_number",
            key: "phone",
            render: (phone) =>
                phone ? phone : <i className="text-xs opacity-70">(Not updated yet)</i>,
        },
        {
            title: "Role",
            dataIndex: "role",
            key: "role",
            render: (role) => role
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (status) => {
                return (
                    <div className="flex items-center gap-2">
                        <span
                            style={{
                                display: "inline-block",
                                width: "7px",
                                height: "7px",
                                borderRadius: "50%",
                                backgroundColor: status ? "#00b311" : "#FF002E",
                            }}
                        />
                        <span>{(status ? 'Active' : "Inactive")}</span>
                    </div>
                );
            },
        },
        {
            title: "Joined Date",
            dataIndex: "createdAt",
            key: "createdAt",
            render: (date) => <p>{formatDateTimeVN(date)}</p>
        },
        {
            title: "Actions",
            key: "actions",
            align: "center",
            render: (text, record) => {
                const menu = (
                    <Menu>
                        <Menu.Item key="view">
                            <Button
                                type="link"
                                onClick={() => handleShowDetail(record)}
                                icon={<BiDetail style={{ fontSize: "20px" }} />}
                                style={{ color: "black" }}
                                className="flex items-center"
                            >
                                Detail
                            </Button>
                        </Menu.Item>
                        <Menu.Item key="banUnban">
                            <Button
                                type="link"
                                onClick={() => handleBanUnban(record, record.status ? 'ban' : 'unban')}
                                icon={<MdBlock style={{ fontSize: "20px" }} />}
                                style={{ color: record.status ? "#FF002E" : "#00b311" }}
                                className="flex items-center"
                            >
                                {record.status ? 'Ban Customer' : 'Unban Customer'}
                            </Button>
                        </Menu.Item>
                    </Menu>
                );

                return (
                    <Dropdown overlay={menu} trigger={["click"]}>
                        <Button
                            type="link"
                            icon={<IoIosMore style={{ fontSize: "24px" }} />}
                        />
                    </Dropdown>
                );
            },
        },
    ];

    return (
        <div style={{ margin: "24px 16px 0", minHeight: "calc(100vh - 165px)" }}>
            <div style={{ padding: 24, minHeight: 360 }}>
                <Spin spinning={isLoading}>
                    <Table
                        columns={columns}
                        dataSource={processingData}
                        rowKey={(record) => record.item_id}
                        pagination={{ pageSize: 10 }}
                    />
                </Spin>

                <Modal
                    title="Artist Details"
                    open={isDetailModalVisible}
                    onCancel={() => setIsDetailModalVisible(false)}
                    footer={null}
                    width={1200}
                    style={{ top: 20 }}
                >
                    <AccountDetail artist={selectedArtist} />
                </Modal>
            </div>
        </div>
    );
};

export default ManageArtist;