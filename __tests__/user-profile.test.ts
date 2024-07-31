/**
 * @jest-environment node
 */
import { DELETE as handleDeleteProfile } from '@/app/api/user-profile/delete-profile-user/route';
import { POST as handleUpdatePassword } from '@/app/api/user-profile/update-password/route';
import { PUT as handleUpdateUserProfile } from '@/app/api/user-profile/update-user-data/route';
import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';

const bcrypt = require('bcrypt');

// Mock des dépendances
jest.mock('@/utils/constante.utils', () => ({
  prisma: {
    user: {
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  },
}));

jest.mock('jsonwebtoken');
jest.mock('bcrypt');

describe('User Profile API', () => {
  const mockToken = 'mock.token.here';
  const mockUserId = 'user123';

  beforeEach(() => {
    jest.resetAllMocks();
    (jwt.verify as jest.Mock).mockReturnValue({ userId: mockUserId });
  });

  describe('UPDATE_PROFIL_USER', () => {
    it('met à jour le profil utilisateur', async () => {
      const req = new NextRequest('https://example.com/api/user-profile/update-user-data', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${mockToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstname: 'John',
          lastname: 'Doe',
          pseudo: 'johndoe',
        }),
      });

      const prisma = require('@/utils/constante.utils').prisma;
      prisma.user.findUnique.mockResolvedValue({ id: mockUserId });
      prisma.user.update.mockResolvedValue({
        id: mockUserId,
        firstname: 'John',
        lastname: 'Doe',
        pseudo: 'johndoe',
      });

      const response = await handleUpdateUserProfile(req);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData).toEqual(expect.objectContaining({
        message: expect.any(String),
        user: expect.objectContaining({
          firstname: 'John',
          lastname: 'Doe',
          pseudo: 'johndoe',
        }),
      }));
    });
  });

  describe('UPDATE_PASSWORD', () => {
    it('met à jour le mot de passe de l\'utilisateur', async () => {
      const req = new NextRequest('https://example.com/api/user-profile/update-password', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${mockToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          oldPassword: 'oldPass123',
          newPassword: 'newPass123',
          confirmPassword: 'newPass123',
        }),
      });

      const prisma = require('@/utils/constante.utils').prisma;
      prisma.user.findUnique.mockResolvedValue({ id: mockUserId, password: 'hashedOldPass' });
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashedNewPass');

      const response = await handleUpdatePassword(req);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData).toEqual(expect.objectContaining({
        message: expect.any(String),
      }));
    });
  });

  describe('DELETE_ACCOUNT', () => {
    it('supprime le compte utilisateur', async () => {
      const req = new NextRequest('https://example.com/api/user-profile/delete-profile-user', {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${mockToken}`,
        },
      });

      const prisma = require('@/utils/constante.utils').prisma;
      prisma.user.findUnique.mockResolvedValue({ id: mockUserId });
      prisma.user.delete.mockResolvedValue({ id: mockUserId });

      const response = await handleDeleteProfile(req);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData).toEqual(expect.objectContaining({
        message: expect.any(String),
      }));
    });
  });
});