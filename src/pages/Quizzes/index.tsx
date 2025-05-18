import {
    Add as AddIcon,
    Assignment as AssignmentIcon,
    Delete as DeleteIcon,
    Edit as EditIcon,
    FilterList as FilterIcon,
    Search as SearchIcon,
    Timer as TimerIcon
} from "@mui/icons-material";
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
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { quizService } from "../../api/services/quizService";
import type { IQuiz } from "../../api/types";

const Quizzes: React.FC = () => {
  const theme = useTheme();
  const [quizzes, setQuizzes] = useState<IQuiz[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [editingQuiz, setEditingQuiz] = useState<IQuiz | null>(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" as "success" | "error" });
  const [formData, setFormData] = useState<Partial<IQuiz>>({
    title: "",
    description: "",
    timeLimit: 30,
    passingScore: 60,
    isActive: true,
    questions: [],
  });

  // Fetch quizzes on component mount
  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    try {
      const response = await quizService.getAllQuizzes();
      setQuizzes(response.data);
    } catch {
      setSnackbar({
        open: true,
        message: "Failed to fetch quizzes",
        severity: "error"
      });
    }
  };

  // Filter quizzes based on search query
  const filteredQuizzes = quizzes.filter(quiz =>
    quiz.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    quiz.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenDialog = (quiz?: IQuiz) => {
    if (quiz) {
      setEditingQuiz(quiz);
      setFormData(quiz);
    } else {
      setEditingQuiz(null);
      setFormData({
        title: "",
        description: "",
        timeLimit: 30,
        passingScore: 60,
        isActive: true,
        questions: [],
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingQuiz(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'timeLimit' || name === 'passingScore' ? parseInt(value) : value
    }));
  };

  const handleSubmit = async () => {
    if (!formData.title || !formData.description) {
      setSnackbar({
        open: true,
        message: "Please fill in all required fields",
        severity: "error"
      });
      return;
    }

    try {
      if (editingQuiz) {
        // Update existing quiz
        const response = await quizService.updateQuiz(
          editingQuiz._id!,
          formData
        );
        setQuizzes(prev => prev.map(quiz =>
          quiz._id === editingQuiz._id ? response.data : quiz
        ));
        setSnackbar({
          open: true,
          message: "Quiz updated successfully",
          severity: "success"
        });
      } else {
        // Create new quiz
        const response = await quizService.createQuiz(formData as Omit<IQuiz, '_id'>);
        setQuizzes(prev => [...prev, response.data]);
        setSnackbar({
          open: true,
          message: "Quiz created successfully",
          severity: "success"
        });
      }
      handleCloseDialog();
    } catch {
      setSnackbar({
        open: true,
        message: "Failed to save quiz",
        severity: "error"
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await quizService.deleteQuiz(id);
      setQuizzes(prev => prev.filter(quiz => quiz._id !== id));
      setSnackbar({
        open: true,
        message: "Quiz deleted successfully",
        severity: "success"
      });
    } catch {
      setSnackbar({
        open: true,
        message: "Failed to delete quiz",
        severity: "error"
      });
    }
  };

  const getStatusColor = (isActive: boolean) => {
    return isActive ? theme.palette.success.main : theme.palette.error.main;
  };

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          flexWrap: "wrap",
          mb: 4,
          gap: 2,
        }}
      >
        {/* Title + Description */}
        <Box>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
            Quizzes
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Test your knowledge and track your progress
          </Typography>
        </Box>

        {/* Search and Filter */}
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Paper
            elevation={0}
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              border: `1px solid ${theme.palette.divider}`,
              borderRadius: 2,
              minWidth: { xs: "100%", sm: "300px" },
            }}
          >
            <IconButton sx={{ p: "10px" }} aria-label="search">
              <SearchIcon />
            </IconButton>
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search quizzes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <IconButton sx={{ p: "10px" }} aria-label="filter">
              <FilterIcon />
            </IconButton>
          </Paper>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleOpenDialog()}
            sx={{ borderRadius: 2 }}
          >
            Add Quiz
          </Button>
        </Box>
      </Box>

      {/* Quiz Cards */}
      <Box sx={{ 
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: 3,
        '@media (max-width: 900px)': {
          gridTemplateColumns: "1fr"
        }
      }}>
        {filteredQuizzes.map((quiz) => (
          <Card
            key={quiz._id}
            elevation={0}
            sx={{
              border: `1px solid ${theme.palette.divider}`,
              borderRadius: 2,
              "&:hover": {
                boxShadow: theme.shadows[4],
                transition: "box-shadow 0.3s ease-in-out",
              },
            }}
          >
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  mb: 2,
                }}
              >
                <Box>
                  <Typography variant="h6" gutterBottom>
                    {quiz.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {quiz.description}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                  <Chip
                    label={quiz.isActive ? 'Active' : 'Inactive'}
                    size="small"
                    sx={{
                      backgroundColor: getStatusColor(quiz.isActive),
                      color: "white",
                      fontWeight: "bold",
                    }}
                  />
                </Box>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box sx={{ display: "flex", gap: 3 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <TimerIcon color="action" />
                    <Typography variant="body2" color="text.secondary">
                      {quiz.timeLimit} minutes
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <AssignmentIcon color="action" />
                    <Typography variant="body2" color="text.secondary">
                      {quiz.questions.length} questions
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 1 }}
                  >
                    Passing Score: {quiz.passingScore}%
                  </Typography>
                  <IconButton
                    size="small"
                    onClick={() => handleOpenDialog(quiz)}
                    sx={{ color: theme.palette.primary.main }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => handleDelete(quiz._id!)}
                    sx={{ color: theme.palette.error.main }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Add/Edit Quiz Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingQuiz ? "Edit Quiz" : "Add New Quiz"}
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
              rows={3}
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
            />
            <TextField
              fullWidth
              type="number"
              label="Time Limit (minutes)"
              name="timeLimit"
              value={formData.timeLimit}
              onChange={handleInputChange}
              required
            />
            <TextField
              fullWidth
              type="number"
              label="Passing Score (%)"
              name="passingScore"
              value={formData.passingScore}
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
            {editingQuiz ? "Update" : "Create"}
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

export default Quizzes;
