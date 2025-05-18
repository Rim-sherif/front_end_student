import {
    Add as AddIcon,
    Delete as DeleteIcon,
    Edit as EditIcon,
    FilterList as FilterIcon,
    Search as SearchIcon,
} from '@mui/icons-material';
import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    IconButton,
    InputBase,
    MenuItem,
    Paper,
    Snackbar,
    TextField,
    Typography,
    useTheme,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { announcementService } from '../../api/services/announcementService';
import type { IAnnouncement } from '../../api/types';

const Announcements: React.FC = () => {
    const theme = useTheme();
    const [announcements, setAnnouncements] = useState<IAnnouncement[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [openDialog, setOpenDialog] = useState(false);
    const [editingAnnouncement, setEditingAnnouncement] = useState<IAnnouncement | null>(null);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });
    const [formData, setFormData] = useState<Partial<IAnnouncement>>({
        title: '',
        content: '',
        author: '',
        isActive: true,
    });

    // Fetch announcements on component mount
    useEffect(() => {
        fetchAnnouncements();
    }, []);

    const fetchAnnouncements = async () => {
        try {
            const response = await announcementService.getAllAnnouncements();
            setAnnouncements(response.data);
        } catch {
            setSnackbar({
                open: true,
                message: 'Failed to fetch announcements',
                severity: 'error'
            });
        }
    };

    // Filter announcements based on search query
    const filteredAnnouncements = announcements.filter(announcement =>
        announcement.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        announcement.content.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleOpenDialog = (announcement?: IAnnouncement) => {
        if (announcement) {
            setEditingAnnouncement(announcement);
            setFormData(announcement);
        } else {
            setEditingAnnouncement(null);
            setFormData({
                title: '',
                content: '',
                author: '',
                isActive: true,
            });
        }
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setEditingAnnouncement(null);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async () => {
        if (!formData.title || !formData.content || !formData.author) {
            setSnackbar({
                open: true,
                message: 'Please fill in all required fields',
                severity: 'error'
            });
            return;
        }

        try {
            if (editingAnnouncement) {
                // Update existing announcement
                const response = await announcementService.updateAnnouncement(
                    editingAnnouncement._id!,
                    formData
                );
                setAnnouncements(prev => prev.map(announcement =>
                    announcement._id === editingAnnouncement._id ? response.data : announcement
                ));
                setSnackbar({
                    open: true,
                    message: 'Announcement updated successfully',
                    severity: 'success'
                });
            } else {
                // Create new announcement
                const response = await announcementService.createAnnouncement(formData as Omit<IAnnouncement, '_id'>);
                setAnnouncements(prev => [...prev, response.data]);
                setSnackbar({
                    open: true,
                    message: 'Announcement created successfully',
                    severity: 'success'
                });
            }
            handleCloseDialog();
        } catch {
            setSnackbar({
                open: true,
                message: 'Failed to save announcement',
                severity: 'error'
            });
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await announcementService.deleteAnnouncement(id);
            setAnnouncements(prev => prev.filter(announcement => announcement._id !== id));
            setSnackbar({
                open: true,
                message: 'Announcement deleted successfully',
                severity: 'success'
            });
        } catch {
            setSnackbar({
                open: true,
                message: 'Failed to delete announcement',
                severity: 'error'
            });
        }
    };

    const getPriorityColor = (isActive: boolean) => {
        return isActive ? theme.palette.success.main : theme.palette.error.main;
    };

    return (
        <div>
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
                    Announcements
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Stay updated with the latest news and important information
                </Typography>
            </Box>

            {/* Search and Filter Bar */}
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 4 }}>
                <Paper
                    elevation={0}
                    sx={{
                        p: '2px 4px',
                        display: 'flex',
                        alignItems: 'center',
                        flex: 1,
                        border: `1px solid ${theme.palette.divider}`,
                        borderRadius: 2,
                    }}
                >
                    <IconButton sx={{ p: '10px' }} aria-label="search">
                        <SearchIcon />
                    </IconButton>
                    <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="Search announcements..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                    <IconButton sx={{ p: '10px' }} aria-label="filter">
                        <FilterIcon />
                    </IconButton>
                </Paper>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => handleOpenDialog()}
                    sx={{ borderRadius: 2 }}
                >
                    Add Announcement
                </Button>
            </Box>

            {/* Announcements Grid */}
            <Box sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: 3,
                '@media (max-width: 900px)': {
                    gridTemplateColumns: '1fr'
                }
            }}>
                {filteredAnnouncements.map((announcement) => (
                    <Card
                        key={announcement._id}
                        elevation={0}
                        sx={{
                            border: `1px solid ${theme.palette.divider}`,
                            borderRadius: 2,
                            '&:hover': {
                                boxShadow: theme.shadows[4],
                                transition: 'box-shadow 0.3s ease-in-out',
                            },
                        }}
                    >
                        <CardContent>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                                <Box>
                                    <Typography variant="h6" gutterBottom>
                                        {announcement.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {new Date(announcement.createdAt!).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                        })}
                                    </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                                    <Chip
                                        label={announcement.isActive ? 'Active' : 'Inactive'}
                                        size="small"
                                        sx={{
                                            backgroundColor: getPriorityColor(announcement.isActive),
                                            color: 'white',
                                        }}
                                    />
                                    <IconButton
                                        size="small"
                                        onClick={() => handleOpenDialog(announcement)}
                                        sx={{ color: theme.palette.primary.main }}
                                    >
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton
                                        size="small"
                                        onClick={() => handleDelete(announcement._id!)}
                                        sx={{ color: theme.palette.error.main }}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </Box>
                            </Box>
                            <Typography variant="body1" color="text.secondary">
                                {announcement.content}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                                By: {announcement.author}
                            </Typography>
                        </CardContent>
                    </Card>
                ))}
            </Box>

            {/* Add/Edit Announcement Dialog */}
            <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
                <DialogTitle>
                    {editingAnnouncement ? 'Edit Announcement' : 'Add New Announcement'}
                </DialogTitle>
                <DialogContent>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
                        <TextField
                            fullWidth
                            label="Title"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            required
                        />
                        <TextField
                            fullWidth
                            multiline
                            rows={4}
                            label="Content"
                            name="content"
                            value={formData.content}
                            onChange={handleInputChange}
                            required
                        />
                        <TextField
                            fullWidth
                            label="Author"
                            name="author"
                            value={formData.author}
                            onChange={handleInputChange}
                            required
                        />
                        <TextField
                            fullWidth
                            select
                            label="Status"
                            name="isActive"
                            value={formData.isActive}
                            onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.value === 'true' }))}
                            required
                        >
                            <MenuItem value="true">Active</MenuItem>
                            <MenuItem value="false">Inactive</MenuItem>
                        </TextField>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancel</Button>
                    <Button onClick={handleSubmit} variant="contained">
                        {editingAnnouncement ? 'Update' : 'Create'}
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Snackbar for notifications */}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
            >
                <Alert
                    onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
                    severity={snackbar.severity}
                    sx={{ width: '100%' }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default Announcements;
