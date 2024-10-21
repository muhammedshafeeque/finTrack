import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Heading,
  VStack,
  HStack,
  Input,
  Select,
  Button,
  SimpleGrid,
  Text,
  useToast,
  useColorModeValue,
  Icon,
  Flex,
  Badge,
  InputGroup,
  InputLeftElement,
  Card,
  CardBody,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import { FiPlus, FiTag, FiDollarSign, FiTrendingUp, FiEdit, FiTrash2, FiMoreVertical, FiFilter } from 'react-icons/fi';
import { fetchCategories, createCategory, updateCategory, deleteCategory } from '../utils/api';

function CategoryCard({ category, onEdit, onDelete }) {
  const bgColor = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  return (
    <Card
      bg={bgColor}
      borderColor={borderColor}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      transition="all 0.3s"
      _hover={{ transform: 'translateY(-5px)', boxShadow: 'lg' }}
    >
      <CardBody>
        <Flex justifyContent="space-between" alignItems="center" mb={2}>
          <HStack>
            <Icon 
              as={category.type === 'income' ? FiTrendingUp : FiDollarSign} 
              color={category.type === 'income' ? 'green.500' : 'red.500'} 
              boxSize={5}
            />
            <Heading size="md" fontWeight="semibold">{category.name}</Heading>
          </HStack>
          <HStack>
            <Badge colorScheme={category.type === 'income' ? 'green' : 'red'}>
              {category.type}
            </Badge>
            <Menu>
              <MenuButton
                as={IconButton}
                aria-label='Options'
                icon={<FiMoreVertical />}
                variant='ghost'
                size='sm'
              />
              <MenuList>
                <MenuItem icon={<FiEdit />} onClick={() => onEdit(category)}>
                  Edit
                </MenuItem>
                <MenuItem icon={<FiTrash2 />} onClick={() => onDelete(category)}>
                  Delete
                </MenuItem>
              </MenuList>
            </Menu>
          </HStack>
        </Flex>
      </CardBody>
    </Card>
  );
}

function CategoryManager() {
  const [categories, setCategories] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryType, setNewCategoryType] = useState('expense');
  const [editingCategory, setEditingCategory] = useState(null);
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  const bgColor = useColorModeValue('gray.50', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const loadCategories = useCallback(async () => {
    try {
      const fetchedCategories = await fetchCategories();
      setCategories(fetchedCategories);
    } catch (error) {
      toast({
        title: 'Error loading categories',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  }, [toast]);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  const handleCreateOrUpdateCategory = async () => {
    if (!newCategoryName) {
      toast({
        title: 'Missing information',
        description: 'Please enter a category name',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      if (editingCategory) {
        await updateCategory(editingCategory._id, { name: newCategoryName, type: newCategoryType });
        toast({
          title: 'Category updated',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      } else {
        await createCategory({ name: newCategoryName, type: newCategoryType });
        toast({
          title: 'Category created',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      }
      setNewCategoryName('');
      setNewCategoryType('expense');
      setEditingCategory(null);
      loadCategories();
    } catch (error) {
      toast({
        title: `Error ${editingCategory ? 'updating' : 'creating'} category`,
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleEditCategory = (category) => {
    setEditingCategory(category);
    setNewCategoryName(category.name);
    setNewCategoryType(category.type);
  };

  const handleDeleteCategory = (category) => {
    setCategoryToDelete(category);
    onOpen();
  };

  const confirmDeleteCategory = async () => {
    try {
      await deleteCategory(categoryToDelete._id);
      toast({
        title: 'Category deleted',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      loadCategories();
      onClose();
    } catch (error) {
      toast({
        title: 'Error deleting category',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const filteredAndSortedCategories = categories
    .filter(category => filter === 'all' || category.type === filter)
    .sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      } else {
        return a.type.localeCompare(b.type);
      }
    });

  return (
    <Box>
      <Heading size="lg" mb={6}>Manage Categories</Heading>
      <Flex direction={{ base: 'column', md: 'row' }} gap={8}>
        <Box
          bg={bgColor}
          borderWidth="1px"
          borderColor={borderColor}
          borderRadius="lg"
          p={6}
          shadow="md"
          flex={{ base: '1', md: '0 0 300px' }}
        >
          <Heading size="md" mb={4}>{editingCategory ? 'Edit Category' : 'Add New Category'}</Heading>
          <VStack spacing={4} align="stretch">
            <InputGroup>
              <InputLeftElement pointerEvents="none" children={<Icon as={FiTag} color="gray.300" />} />
              <Input
                placeholder="Category name"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
              />
            </InputGroup>
            <Select
              value={newCategoryType}
              onChange={(e) => setNewCategoryType(e.target.value)}
              icon={<FiDollarSign />}
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </Select>
            <Button
              leftIcon={<Icon as={editingCategory ? FiEdit : FiPlus} />}
              colorScheme="brand"
              onClick={handleCreateOrUpdateCategory}
              isFullWidth
            >
              {editingCategory ? 'Update Category' : 'Add Category'}
            </Button>
            {editingCategory && (
              <Button
                variant="outline"
                onClick={() => {
                  setEditingCategory(null);
                  setNewCategoryName('');
                  setNewCategoryType('expense');
                }}
                isFullWidth
              >
                Cancel Edit
              </Button>
            )}
          </VStack>
        </Box>
        
        <Box flex="1">
          <Flex justifyContent="space-between" alignItems="center" mb={4}>
            <Heading size="md">Your Categories</Heading>
            <HStack>
              <Select
                size="sm"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                icon={<FiFilter />}
              >
                <option value="all">All</option>
                <option value="expense">Expenses</option>
                <option value="income">Income</option>
              </Select>
              <Select
                size="sm"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="name">Sort by Name</option>
                <option value="type">Sort by Type</option>
              </Select>
            </HStack>
          </Flex>
          {filteredAndSortedCategories.length === 0 ? (
            <Text color="gray.500">No categories found.</Text>
          ) : (
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
              {filteredAndSortedCategories.map((category) => (
                <CategoryCard
                  key={category._id}
                  category={category}
                  onEdit={handleEditCategory}
                  onDelete={handleDeleteCategory}
                />
              ))}
            </SimpleGrid>
          )}
        </Box>
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm Delete</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Are you sure you want to delete the category "{categoryToDelete?.name}"?
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={confirmDeleteCategory}>
              Delete
            </Button>
            <Button variant="ghost" onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default CategoryManager;
