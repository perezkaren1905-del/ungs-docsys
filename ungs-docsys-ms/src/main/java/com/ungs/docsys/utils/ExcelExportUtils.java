package com.ungs.docsys.utils;

import com.ungs.docsys.exception.BusinessException;
import com.ungs.docsys.models.JobApplicationResumeUser;
import com.ungs.docsys.models.UserInfo;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.http.HttpStatus;

import java.io.IOException;
import java.io.InputStream;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class ExcelExportUtils {
    public static final String EXPORT_FILENAME_PREFIX = "candidatos_";

    public static Workbook createWorkbookFromTemplate(String templatePath) {
        try (InputStream template = ExcelExportUtils.class.getClassLoader().getResourceAsStream(templatePath)) {
            return new XSSFWorkbook(template);
        } catch (IOException e) {
            throw new RuntimeException("Could not open template: " + templatePath, e);
        }
    }

    public static void writeResumeUserRow(Row row, JobApplicationResumeUser jobApplicationResumeUser) {
        final UserInfo userInfo = jobApplicationResumeUser.getResumeUser().getAppUser().getUserInfos().stream().findFirst().orElseThrow(() -> new BusinessException(HttpStatus.NOT_FOUND, "User info not found"));
        row.createCell(0).setCellValue(userInfo.getFirstName());
        row.createCell(1).setCellValue(userInfo.getLastName());
        row.createCell(2).setCellValue(userInfo.getIdentificationType().getCode());
        row.createCell(3).setCellValue(userInfo.getIdentificationNumber());
        row.createCell(4).setCellValue(userInfo.getCuilCuit());
        row.createCell(5).setCellValue(jobApplicationResumeUser.getResumeUser().getAppUser().getEmail());
        row.createCell(6).setCellValue(userInfo.getPhone());

        row.createCell(7).setCellValue(jobApplicationResumeUser.getRequirementGlobalCount());
        row.createCell(8).setCellValue(jobApplicationResumeUser.getRequirementMandatoryCount());
        row.createCell(9).setCellValue(jobApplicationResumeUser.getRequirementPreferredCount());

        row.createCell(10).setCellValue(jobApplicationResumeUser.getRequirementGlobalApplied());
        row.createCell(11).setCellValue(jobApplicationResumeUser.getRequirementMandatoryApplied());
        row.createCell(12).setCellValue(jobApplicationResumeUser.getRequirementPreferredApplied());
    }

    public static String generateExportFileName(String title) {
        String sanitizedTitle = title.replaceAll("[^a-zA-Z0-9]", "_");
        String timestamp = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMdd_HHmmss"));
        return EXPORT_FILENAME_PREFIX + sanitizedTitle + "_" + timestamp + ".xlsx";
    }}
